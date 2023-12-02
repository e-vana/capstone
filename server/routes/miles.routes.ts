import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

const router: Router = Router();
router.use(decodeToken);

/**
 * @route GET /:organization_id/teams/:team_id/events/:event_id/miles
 * @desc Get miles for a specific event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/events/:event_id/miles",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getMilesQuery = `
        SELECT
        u.email as user_email,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        wm.mileage,
        wm.date_traveled,
        o.name as organization_name,
        t.name as team_name,
        e.name as event_name,
        e.description as event_description,
        e.start_time as event_start_time,
        e.end_time as event_end_time
        FROM work_miles wm
        JOIN events e ON wm.event_id = e.id
        JOIN users u ON wm.user_id = u.id
        JOIN teams t ON e.team_id = t.id
        JOIN organizations o ON t.organization_id = o.id
        WHERE o.id = ?
        AND t.id = ?
        AND e.id = ?
      `;
      const [getMilesResults] = await connection.query<RowDataPacket[]>(
        getMilesQuery,
        [
          parseInt(req.params.organization_id),
          parseInt(req.params.team_id),
          parseInt(req.params.event_id),
        ]
      );
      await connection.end();
      res.status(200).json({ success: true, miles: getMilesResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/teams/:team_id/miles
 * @desc Get miles for a specific team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/miles",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getMilesQuery = `
        SELECT
        u.email as user_email,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        wm.mileage,
        wm.date_traveled,
        o.name as organization_name,
        t.name as team_name,
        e.name as event_name,
        e.description as event_description,
        e.start_time as event_start_time,
        e.end_time as event_end_time
        FROM work_miles wm
        JOIN events e ON wm.event_id = e.id
        JOIN users u ON wm.user_id = u.id
        JOIN teams t ON e.team_id = t.id
        JOIN organizations o ON t.organization_id = o.id
        WHERE o.id = ?
        AND t.id = ?
      `;
      const [getMilesResults] = await connection.query<RowDataPacket[]>(
        getMilesQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.team_id)]
      );
      await connection.end();
      res.status(200).json({ success: true, miles: getMilesResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/miles
 * @desc Get miles for an entire organization
 * @param organization_id - The integer id of the organization
 * @returns The event with the given id
 */
router.get("/:organization_id/miles", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getMilesQuery = `
      SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      wm.mileage,
      wm.date_traveled,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_miles wm
      JOIN events e ON wm.event_id = e.id
      JOIN users u ON wm.user_id = u.id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE o.id = ?
    `;
    const [getMilesResults] = await connection.query<RowDataPacket[]>(
      getMilesQuery,
      [parseInt(req.params.organization_id)]
    );
    await connection.end();
    res.status(200).json({ success: true, miles: getMilesResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route POST /:organization_id/teams/:team_id/events/:event_id/miles
 * @desc add an miles to an event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns success boolean T || F
 */
router.post(
  "/:organization_id/teams/:team_id/events/:event_id/miles",
  body("mileage").isFloat().trim(),
  body("date_traveled").isISO8601().trim(),
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
      let insertMilesQuery = `
        INSERT INTO work_miles SET ? 
      `;
      const [insertMilesResults] = await connection.query<ResultSetHeader>(
        insertMilesQuery,
        [req.body]
      );
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

router.get(
  "/:organization_id/miles-breakdown",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );

      let orgMilesBreakdown = `SELECT
        u.first_name as user_name,
        SUM(wm.mileage) as total_mileage
        FROM work_miles wm 
        JOIN events e on wm.event_id = e.id 
        JOIN users u on wm.user_id = u.id 
        JOIN teams t on e.team_id = t.id 
        JOIN organizations o on t.organization_id = o.id 
        WHERE o.id = ?
        GROUP BY user_name;
      `;

      const [results, fields] = await connection.query(
        orgMilesBreakdown,
        req.params.organization_id
      );
      res.status(200).json({ success: true, mileage_breakdown: results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as milesRouter };
