import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

const router: Router = Router();
router.use(decodeToken);

// Maybe we'll want to parameterize this with date ranges at some point, right now its just returning all hours worked
// for the corresponding business unit

/**
 * @route GET /:organization_id/teams/:team_id/events/:event_id/hours
 * @desc Get hours worked for a specific event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/events/:event_id/hours",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getHoursQuery = `
      SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      wh.start_time,
      wh.end_time,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_hours wh
      JOIN events e ON wh.event_id = e.id
      JOIN users u ON wh.user_id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE o.id = ?
      AND t.id = ?
      AND e.id = ?
      `;
      const [getHoursResults] = await connection.query<RowDataPacket[]>(
        getHoursQuery,
        [
          parseInt(req.params.organization_id),
          parseInt(req.params.team_id),
          parseInt(req.params.event_id),
        ]
      );
      await connection.end();
      res.status(200).json({ success: true, hours: getHoursResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/teams/:team_id/
 * @desc Get hours worked by a specific team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/hours",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getHoursQuery = `
      SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      wh.start_time,
      wh.end_time,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_hours wh
      JOIN events e ON wh.event_id = e.id
      JOIN users u ON wh.user_id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE o.id = ?
      AND t.id = ?
      `;
      const [getHoursResults] = await connection.query<RowDataPacket[]>(
        getHoursQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.team_id)]
      );
      await connection.end();
      res.status(200).json({ success: true, hours: getHoursResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/teams/:team_id/events/:event_id/hours
 * @desc Get hours worked by an entire organization
 * @param organization_id - The integer id of the organization
 * @returns The event with the given id
 */
router.get("/:organization_id/hours", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getHoursQuery = `
      SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      wh.start_time,
      wh.end_time,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_hours wh
      JOIN events e ON wh.event_id = e.id
      JOIN users u ON wh.user_id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE o.id = ?
      `;
    const [getHoursResults] = await connection.query<RowDataPacket[]>(
      getHoursQuery,
      [parseInt(req.params.organization_id)]
    );
    await connection.end();
    res.status(200).json({ success: true, hours: getHoursResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route POST /:organization_id/teams/:team_id/events/:event_id/hours
 * @desc add a users hours to a certain event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns success boolean T || F
 */
router.post(
  "/:organization_id/teams/:team_id/events/:event_id/hours",
  body("start_time").isISO8601().trim(),
  body("end_time").isISO8601().trim().optional(),
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      req.body = {
        ...req.body,
        user_id: req.userId,
        event_id: parseInt(req.params.event_id),
      };
      let insertHoursQuery = `
        INSERT INTO work_hours SET ? 
      `;
      const [insertHoursResult] = await connection.query<ResultSetHeader>(
        insertHoursQuery,
        [req.body]
      );
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as hoursRouter };
