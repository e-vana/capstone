import { Request, Response, NextFunction } from "express";
import { User } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import mysql, { RowDataPacket } from "mysql2/promise";

export const protect = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token: string;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // query here
      const connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      const query = `SELECT * FROM users WHERE id = ?`;

      const [rows] = await connection.execute<RowDataPacket[]>(query, [
        decoded.id,
      ]);

      const foundUser: User = rows[0] as User;

      // sets user in req object -> no need for extra query in controller
      req.user = foundUser;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Not Authorized" });
    }
  } else {
    res.status(401).json({ error: "Not Authorized" });
  }
};
