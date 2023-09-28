import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";
import bcrypt from "bcrypt";

const router: Router = Router();

// TODO: Should these endpoints be protected by the decodeToken middleware?

/**
 * @route GET /users
 * @desc Get all users
 */
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

// TODO: Is this the same as the POST /auth/register route's functionality?
/**
 * @route POST /users
 * @desc Create a new user, validating the request body has all the required fields
 * @param email - The email of the user
 * @param first_name - The first name of the user
 * @param last_name - The last name of the user
 * @param password - The password of the user
 */
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
      // Hash the password with 10 rounds of salting
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      //Create the database connection
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );

      //Perform the query
      let query = `INSERT INTO users SET ?`;
      const [results, fields] = await connection.query<ResultSetHeader>(
        query,
        {
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hashedPassword,
        }
      );

      //Tear down the database connection
      await connection.end();
      res.status(200).json({ success: true, users: results });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /users/:id
 * @desc Get a specific user by id
 * @param id - The integer id of the user
 * @returns The user with the given id
*/
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let query = `SELECT u.id, u.email, u.first_name, u.last_name, u.created_at, u.updated_at FROM users u WHERE u.id = ?`;
    const [results, fields] = await connection.query(query, [req.params.id]);
    res.status(200).json({ success: true, users: results });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route PUT /users/:id
 * @desc Update a specific user by id
 * @access Private (only the user with the given id can update their own user, or an admin)
 * @param id - The id of the user
 * @returns The updated user info with the given id
*/
router.put("/:id", decodeToken, async (req: Request, res: Response) => {
  try {
    // TODO: Check if the user is an admin or the user with the given id
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let query = `UPDATE users SET ? WHERE id = ?`;
    const [results, fields] = await connection.query(query, [req.body, req.params.id]);
    res.status(200).json({ success: true, users: results });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route DELETE /users/:id
 * @desc Delete a specific user by id
 * @access Private (only the user with the given id can delete their own user, or an admin)
 * @param id - The id of the user
 */
router.delete("/:id", decodeToken, async (req: Request, res: Response) => {
    try {
      // TODO: Check if the user is an admin or the user with the given id
      // If the user isn't an admin, should they have to enter their password to delete their account?
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let query = `DELETE FROM users WHERE id = ?`;
      const [results, fields] = await connection.query(query, [req.params.id]);
      res.status(200).json({ success: true, users: results });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as userRouter };
