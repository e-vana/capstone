import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import decodeToken from "../middleware/token.middleware";
import { User } from "../interfaces/user.interface";
const router: Router = Router();

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @param email - The email of the user
 * @param first_name - The first name of the user
 * @param last_name - The last name of the user
 * @param password - The password of the user
 * @access Public
 * @returns { success: boolean, jwt: string }
 */
router.post(
  "/register",
  body("email").isString().trim(),
  body("first_name").isString().trim(),
  body("last_name").isString().trim(),
  body("password").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      // validate struct
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }

      // hash password
      let salt = bcrypt.genSaltSync(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);

      // create sql connection
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );

      // check if email exists
      const emailExistsQuery = `SELECT id FROM users WHERE email = ?`;
      const [emailExistsResult] = await connection.query<RowDataPacket[]>(
        emailExistsQuery,
        req.body.email
      );
      if (emailExistsResult.length > 0) {
        throw { message: "Email already exists" };
      }

      // query db
      let insertQuery = `INSERT INTO users SET ?`;
      const [resultsInsertUser, fields] =
        await connection.query<ResultSetHeader>(insertQuery, req.body);
      if (!resultsInsertUser) {
        throw { message: "Error creating user account." };
      }

      // generate token
      const token = jwt.sign(
        { userId: resultsInsertUser.insertId, permissions: [] },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      //close db
      await connection.end();

      // return token
      res.status(200).json({ success: true, jwt: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route POST /auth/login
 * @desc Login a user with email and password, returning a JWT
 * @param email - The email of the user
 * @param password - The password of the user
 * @access Public
 * @returns { success: boolean, jwt: string }
 */
router.post(
  "/login",
  body("email").isString().trim(),
  body("password").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      // validate struct
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }

      // create connection
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );

      // query db
      let selectUserQuery = `SELECT * FROM users WHERE email = ?`;
      const [userExists] = await connection.query<RowDataPacket[]>(
        selectUserQuery,
        req.body.email
      );

      // compare passwords
      let passwordsMatch = await bcrypt.compareSync(
        req.body.password,
        userExists[0].password
      );
      if (!passwordsMatch) {
        throw { message: "Incorrect password." };
      }

      const getUserPermissionsQuery = `SELECT user_id, organization_id, level FROM permissions WHERE user_id = ?`;
      const [userPermissions] = await connection.query<RowDataPacket[]>(
        getUserPermissionsQuery,
        userExists[0].id
      );

      // sign token
      const token = jwt.sign(
        { userId: userExists[0].id, permissions: userPermissions },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      // close connection
      await connection.end();

      // return token
      return res.status(200).json({ success: true, jwt: token });
    } catch (error) {
      console.log("POST /auth/login error: ", error);
      return res.status(500).json({ success: false });
    }
  }
);

/**
 * @route GET /auth/me
 * @desc Get the user associated with the passed JWT (currently logged in user)
 * @access Protected
 * @returns { success: boolean, data: Omit<User, "password"> }
 */
router.get("/me", decodeToken, async (req: Request, res: Response) => {
  try {
    // check if user exists on req object
    if (req.userId === undefined) {
      console.log(req.userId);
      res.status(404).json({ error: "User not found" });
    }

    const connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    const query = `SELECT * FROM users WHERE id = ?`;

    const [rows] = await connection.execute<RowDataPacket[]>(query, [
      req.userId,
    ]);

    const foundUser: User = rows[0] as User;

    const returnUser: Omit<User, "password"> = {
      first_name: foundUser.first_name,
      last_name: foundUser.last_name,
      email: foundUser.email,
      created_at: foundUser.created_at,
      updated_at: foundUser.updated_at,
    };

    // return the user
    res.status(200).json({ message: "success", data: returnUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/my-expenses", decodeToken, async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let query = `SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      we.expense_name,
      we.expense_type,
      we.amount,
      we.description,
      we.receipt_url,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_expenses we
      JOIN events e ON we.event_id = e.id
      JOIN users u ON we.user_id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE u.id = ? 
`;
    const [results, fields] = await connection.query(query, [req.userId]);
    res.status(200).json({ success: true, expenses: results });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.get(
  "/my-expense-breakdown",
  decodeToken,
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let query = `SELECT
        o.name as organization_name,
        SUM(we.amount) as total_expenses
        FROM work_expenses we
        JOIN events e ON we.event_id = e.id
        JOIN users u ON we.user_id = u.id
        JOIN teams t ON e.team_id = t.id
        JOIN organizations o ON t.organization_id = o.id
        WHERE u.id = ?
        GROUP BY organization_name
      `;

      const [results, fields] = await connection.query(query, [req.userId]);
      res.status(200).json({ success: true, expense_breakdown: results });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as authRouter };
