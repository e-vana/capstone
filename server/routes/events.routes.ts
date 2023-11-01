import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";
import dateToMySQLTimestamp from "../utils/formatMySQLTimestamp";

const router: Router = Router();
router.use(decodeToken);

// TODO: Is this needed since events must be tied to a team?
// Once the global-team function is implemented, we could use the teams endpoint to create an event
// under the global team for this org and just provide the global team id, or we could keep this one and
// determine the global team id from the passed org id
//Create an event within an organization
/* router.post(
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
      return res
        .status(201)
        .json({ success: true, event_id: resultsInsertEvent.insertId });
    } catch (error) {
      console.log("POST /organizations/:organization_id/events error: ", error);
      return res.status(500).json({ success: false, error });
    }
  }
); */

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
    let getEventsQuery = `SELECT t.id as team_id, t.name as team_name, e.id as event_id, e.start_time, e.end_time, e.name as event_name, e.description as event_description, e.address_street, e.address_city, e.address_state, e.address_zipcode, o.name as organization_name, o.id as organization_id FROM events e JOIN teams t ON e.team_id = t.id JOIN organizations o ON t.organization_id = o.id WHERE o.id = ?`;
    const [getEventsResults] = await connection.query<RowDataPacket[]>(
      getEventsQuery,
      [parseInt(req.params.organization_id)]
    );
    await connection.end();
    return res.status(200).json({ success: true, events: getEventsResults });
  } catch (error) {
    console.log("GET /organizations/:organization_id/events error: ", error);
    return res.status(500).json({ success: false, error });
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
      let getEventsQuery = `SELECT t.id as team_id, t.name as team_name, e.id as event_id, e.start_time, e.end_time, e.name as event_name, e.description as event_description, e.address_street, e.address_city, e.address_state, e.address_zipcode, o.name as organization_name, o.id as organization_id FROM events e JOIN teams t ON e.team_id = t.id JOIN organizations o ON t.organization_id = o.id WHERE o.id = ? AND e.id = ?`;
      const [getEventsResults] = await connection.query<RowDataPacket[]>(
        getEventsQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.event_id)]
      );
      if (getEventsResults.length == 0) {
        throw { message: "No event found." };
      }
      await connection.end();
      return res.status(200).json({ success: true, event: getEventsResults[0] });
    } catch (error) {
      console.log("GET /organizations/:organization_id/events/:event_id error: ", error);
      return res.status(500).json({ success: false, error });
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
      return res.status(200).json({ success: true, events: getEventsResults });
    } catch (error) {
      console.log("GET /organizations/:organization_id/teams/:team_id/events error: ", error);
      return res.status(500).json({ success: false, error });
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
      return res.status(200).json({ success: true, events: getEventsResults });
    } catch (error) {
      console.log("GET /organizations/:organization_id/teams/:team_id/events/:event_id error: ", error);
      return res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route POST /organizations/:organization_id/events/:event_id
 * @desc Create an event within an organization's team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns { success: boolean, event_id: number }
 */
router.post(
  "/:organization_id/teams/:team_id/events",
  body("event_name").isString().trim(),
  body("event_description").isString().trim(),
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
      // Check if the user has permission to write to the team's events
      if (
        req.permissions.filter((permission) => {
          return (
            permission.level <= 2 &&
            permission.organization_id == parseInt(req.params.organization_id)
          );
        }).length == 0
      ) {
        console.log("User does not have permission to write to this resource, they have the following permissions: ", req.permissions)
        throw {
          message: "You do not have permission to write to this resource.",
        };
      }
      req.body = {
        ...req.body,
        created_by_user_id: req.userId,
        // The table expects event name and description to be called "name" and "description"
        name: req.body.event_name,
        description: req.body.event_description,
        // Convert JS style Dates to MySQL style timestamps
        start_time: dateToMySQLTimestamp(new Date(req.body.start_time)),
        end_time: dateToMySQLTimestamp(new Date(req.body.end_time)),
      };

      // Remove the organization_id from the body, since it's not stored in the Events table
      delete req.body.organization_id;
      // Likewise, remove the unexpected event_name and event_description from the body
      delete req.body.event_name;
      delete req.body.event_description;

      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let insertEventQuery = `INSERT INTO events SET ?`;
      const [resultsInsertEvent] = await connection.query<ResultSetHeader>(
        insertEventQuery,
        req.body
      );
      await connection.end();
      return res
        .status(201)
        .json({ success: true, event_id: resultsInsertEvent.insertId });
    } catch (error) {
      console.log("POST /organizations/:organization_id/teams/:team_id/events error: ", error);
      return res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route PUT /organizations/:organization_id/teams/:team_id/events/:event_id
 * @desc Update an event within an organization's team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns { success: boolean, event_id: number }
 */
router.put("/:organization_id/teams/:team_id/events/:event_id", async (req: Request, res: Response) => {
  try {
    // Check if the user has permission to write to the team's events
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
    req.body = {
      ...req.body,
      id: parseInt(req.params.event_id),
      name: req.body.event_name,
      description: req.body.event_description,
      created_by_user_id: req.userId,
      // Convert JS style Dates to MySQL style timestamps
      start_time: dateToMySQLTimestamp(new Date(req.body.start_time)),
      end_time: dateToMySQLTimestamp(new Date(req.body.end_time)),
    };
    
    // Remove the organization_id from the body, since it's not stored in the Events table
    delete req.body.organization_id;
    // Likewise the Events table has columns for name and description, not event_name and event_description
    delete req.body.event_name;
    delete req.body.event_description;
    delete req.body.event_id; // The table expects `id`, not event_id

    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let updateEventQuery = `UPDATE events SET ? WHERE id = ?`;
    const [resultsUpdateEvent] = await connection.query<ResultSetHeader>(
      updateEventQuery,
      [req.body, parseInt(req.params.event_id)]
    );
    await connection.end();
    return res
      .status(200)
      .json({ success: true, event_id: resultsUpdateEvent.insertId });
  } catch (error) {
    console.log("PUT /organizations/:organization_id/teams/:team_id/events/:event_id error: ", error);
    return res.status(500).json({ success: false, error });
  }
});

/**
 * @route DELETE /organizations/:organization_id/teams/:team_id/events/:event_id
 * @desc Delete an event within an organization's team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns { success: boolean, event_id: number }
 */
router.delete("/:organization_id/teams/:team_id/events/:event_id", async (req: Request, res: Response) => {
  try {
    // Check if the user has permission to write to the team's events
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
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let deleteEventQuery = `DELETE FROM events WHERE id = ?`;
    const [resultsDeleteEvent] = await connection.query<ResultSetHeader>(
      deleteEventQuery,
      [parseInt(req.params.event_id)]
    );
    await connection.end();
    return res
      .status(200)
      .json({ success: true, event_id: resultsDeleteEvent.insertId });
  } catch (error) {
    console.log("DELETE /organizations/:organization_id/teams/:team_id/events/:event_id error: ", error);
    return res.status(500).json({ success: false, error });
  }
});

export { router as eventsRouter };
