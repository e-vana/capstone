import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader } from "mysql2/promise";

const router: Router = Router();

interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let query = `SELECT u.id, u.email, u.first_name, u.last_name, u.created_at, u.updated_at FROM users u`;
    const [results, fields] = await connection.query(query);
    res.status(200).json({ success: true, users: results });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
router.post(
  "/",
  //Using express validator to check all the types of the request body parameters
  body("email").isString().trim(),
  body("first_name").isString().trim(),
  body("last_name").isString().trim(),
  body("password").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      //If there's an error with request body, throw (so we dont insert bad data into the database)
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      //bcrypt or something on the req password
      //Create the database connection
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );

      //Perform the query
      let query = `INSERT INTO users SET ?`;
      const [results, fields] = await connection.query<ResultSetHeader>(
        query,
        req.body
      );

      //Tear down the database connection
      await connection.end();
      res.status(200).json({ success: true, users: results });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as userRouter };
