import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const router: Router = Router();

router.post(
  "/register",
  body("email").isString().trim(),
  body("first_name").isString().trim(),
  body("last_name").isString().trim(),
  body("password").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let salt = bcrypt.genSaltSync(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let insertQuery = `INSERT INTO users SET ?`;
      const [resultsInsertUser, fields] =
        await connection.query<ResultSetHeader>(insertQuery, req.body);
      if (!resultsInsertUser) {
        throw { message: "Error creating user account." };
      }
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
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
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      await connection.beginTransaction();
      let selectUserQuery = `SELECT * FROM users WHERE email = ?`;
      const [userExists] = await connection.query<RowDataPacket[]>(
        selectUserQuery,
        req.body.email
      );
      let passwordsMatch = await bcrypt.compareSync(
        req.body.password,
        userExists[0].password
      );
      if (!passwordsMatch) {
        throw { message: "Incorrect password." };
      }
      let getUserPermissionsQuery = `SELECT user_id, organization_id, level FROM permissions WHERE user_id = ?`;
      const [userPermissions] = await connection.query<RowDataPacket[]>(
        getUserPermissionsQuery,
        userExists[0].id
      );
      const token = jwt.sign(
        { userId: userExists[0].id, permissions: userPermissions },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );
      await connection.commit();
      await connection.end();
      res.status(200).json({ success: true, jwt: token });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
);

export { router as authRouter };
