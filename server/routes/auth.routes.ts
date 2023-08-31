import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { protect } from "../middleware/auth.middleware";
import { User } from "../interfaces/user.interface";
const router: Router = Router();

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
        { id: resultsInsertUser.insertId },
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

      // sign token
      const token = jwt.sign(
        { id: userExists[0].id },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      // close connection
      await connection.end();

      // return token
      res.status(200).json({ success: true, jwt: token });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
);

// call middleware function -> protect
router.get("/me", protect, async (req: Request, res: Response) => {
  try {
    // check if user exists on req object
    if (!req.user) {
      res.status(404).json({ error: "User not found" });
    }

    // bind user without password
    const user: Omit<User, "password"> = {
      first_name: req.user?.first_name!,
      last_name: req.user?.last_name!,
      email: req.user?.email!,
      created_at: req.user?.created_at!,
      updated_at: req.user?.updated_at!,
    };

    // return the user
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

export { router as authRouter };
