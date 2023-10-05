import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
router.use(decodeToken);

// TODO: Is this needed since events must be tied to a team?
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

/**
 * @route GET /organizations/:organization_id/events
 * @desc Get all events within the given organization, regardless of team association
 * @param organization_id - The integer id of the organization
 * @returns { success: boolean, events: Event[] }
 */
router.get("/:organization_id/events", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    console.log(req.params);
    // let getEventsQuery = `SELECT * FROM events WHERE organization_id = ?`;
    let getEventsQuery = `SELECT t.id as team_id, t.name as team_name, e.id as event_id, e.name as event_name, e.description as event_description, e.address_street, e.address_city, e.address_state, e.address_zipcode, o.name as organization_name, o.id as organization_id FROM events e JOIN teams t ON e.team_id = t.id JOIN organizations o ON t.organization_id = o.id WHERE o.id = ?`;
    const [getEventsResults] = await connection.query<RowDataPacket[]>(
      getEventsQuery,
      [parseInt(req.params.organization_id)]
    );
    await connection.end();
    res.status(200).json({ success: true, events: getEventsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route GET /organizations/:organization_id/events/:event_id
 * @desc Get a specific event within the given organization, regardless of team association
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/events/:event_id",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getEventsQuery = `SELECT t.id as team_id, t.name as team_name, e.id as event_id, e.name as event_name, e.description as event_description, e.address_street, e.address_city, e.address_state, e.address_zipcode, o.name as organization_name, o.id as organization_id FROM events e JOIN teams t ON e.team_id = t.id JOIN organizations o ON t.organization_id = o.id WHERE o.id = ? AND e.id = ?`;
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

/**
 * @route GET /organizations/:organization_id/teams/:team_id/events
 * @desc Get all events within the given team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns { success: boolean, events: Event[] }
 */
router.get(
  "/:organization_id/teams/:team_id/events",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getEventsQuery = `SELECT * FROM events WHERE team_id = ?`;
      const [getEventsResults] = await connection.query<RowDataPacket[]>(
        getEventsQuery,
        [parseInt(req.params.team_id), parseInt(req.params.event_id)]
      );
      await connection.end();
      res.status(200).json({ success: true, events: getEventsResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /organizations/:organization_id/teams/:team_id/events/:event_id
 * @desc Get a specific event within the given team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/events/:event_id",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getEventsQuery = `SELECT * FROM events WHERE team_id = ? AND id = ?`;
      const [getEventsResults] = await connection.query<RowDataPacket[]>(
        getEventsQuery,
        [parseInt(req.params.team_id), parseInt(req.params.event_id)]
      );
      await connection.end();
      res.status(200).json({ success: true, events: getEventsResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as eventsRouter };
