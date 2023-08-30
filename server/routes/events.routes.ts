import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import decodeToken from "../middleware/token.middleware";
dotenv.config();
const router: Router = Router();
router.use(decodeToken);

//GET ALL EVENTS ACROSS ALL ORGS
router.get("/", async (req: Request, res: Response) => {
  try {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw { validationErrors: validationErrors.array() };
    }
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getEventsQuery = `SELECT * FROM events`;
    const [getEventsResults] = await connection.query<RowDataPacket[]>(
      getEventsQuery
    );
    await connection.end();
    res.status(200).json({ success: true, events: getEventsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
//GET AN EVENTS ACROSS ALL ORGS
router.get("/:event_id", async (req: Request, res: Response) => {
  try {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw { validationErrors: validationErrors.array() };
    }
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getEventsQuery = `SELECT * FROM events WHERE id = ?`;
    const [getEventsResults] = await connection.query<RowDataPacket[]>(
      getEventsQuery,
      parseInt(req.params.event_id)
    );
    await connection.end();
    res.status(200).json({ success: true, event: getEventsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

export { router as organizationsRouter };
