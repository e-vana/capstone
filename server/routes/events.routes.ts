import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
router.use(decodeToken);

//Create an event within an organization
router.post(
  "/:organization_id/events",
  body("name").isString().trim(),
  body("description").isString().trim(),
  body("address_street").isString().trim(),
  body("address_city").isString().trim(),
  body("address_state").isString().trim(),
  body("address_zipcode").isString().trim(),
  body("start_time").isISO8601().trim(),
  body("end_time").isISO8601().trim(),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      if (
        req.permissions.filter((permission) => {
          return (
            permission.level <= 2 &&
            permission.organization_id == parseInt(req.params.organization_id)
          );
        }).length == 0
      ) {
        throw {
          message: "You do not have permission to write to this resource.",
        };
      }
      //check permissions on token
      req.body = {
        ...req.body,
        organization_id: parseInt(req.params.organization_id),
        created_by_user_id: req.userId,
      };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let insertEventQuery = `INSERT INTO events SET ?`;
      const [resultsInsertEvent] = await connection.query<ResultSetHeader>(
        insertEventQuery,
        req.body
      );
      await connection.end();
      res
        .status(200)
        .json({ success: true, event_id: resultsInsertEvent.insertId });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
//GET ALL EVENTS IN AN ORGANIZATION
router.get("/:organization_id/events", async (req: Request, res: Response) => {
  try {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw { validationErrors: validationErrors.array() };
    }
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getEventsQuery = `SELECT * FROM events WHERE organization_id = ?`;
    const [getEventsResults] = await connection.query<RowDataPacket[]>(
      getEventsQuery,
      parseInt(req.params.organization_id)
    );
    await connection.end();
    res.status(200).json({ success: true, events: getEventsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});
//GET AN EVENT IN AN ORGANIZATION
router.get(
  "/:organization_id/events/:event_id",
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getEventsQuery = `SELECT * FROM events WHERE organization_id = ? AND id = ?`;
      const [getEventsResults] = await connection.query<RowDataPacket[]>(
        getEventsQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.event_id)]
      );
      if (getEventsResults.length == 0) {
        throw { message: "No event found." };
      }
      await connection.end();
      res.status(200).json({ success: true, event: getEventsResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as eventsRouter };
