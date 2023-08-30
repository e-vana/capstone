import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";
dotenv.config();
const router: Router = Router();
router.use(decodeToken);

//Get all organizations a user owns
router.get("/", async (req: Request, res: Response) => {
  try {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw { validationErrors: validationErrors.array() };
    }
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getOrganizationsUserOwnsQuery = `SELECT * FROM organizations WHERE owner_user_id = ?`;
    const [getOrganizationsResults] = await connection.query<RowDataPacket[]>(
      getOrganizationsUserOwnsQuery,
      req.userId
    );
    await connection.end();
    res
      .status(200)
      .json({ success: true, organizations: getOrganizationsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

//Get an organization a user owns
router.get("/:organization_id", async (req: Request, res: Response) => {
  try {
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw { validationErrors: validationErrors.array() };
    }
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getOrganizationsUserOwnsQuery = `SELECT * FROM organizations WHERE owner_user_id = ? AND id = ?`;
    const [getOrganizationsResults] = await connection.query<RowDataPacket[]>(
      getOrganizationsUserOwnsQuery,
      [req.userId, parseInt(req.params.organization_id)]
    );
    await connection.end();
    res
      .status(200)
      .json({ success: true, organization: getOrganizationsResults });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

//Create an organization
router.post(
  "/",
  body("name").isString().trim(),
  body("website_url").isString().trim(),
  body("phone_number").isString().trim(),
  body("logo_url").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      req.body = { ...req.body, owner_user_id: req.userId };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      await connection.beginTransaction();
      let insertQuery = `INSERT INTO organizations SET ?`;
      const [resultsInsertOrganization] =
        await connection.query<ResultSetHeader>(insertQuery, req.body);
      if (!resultsInsertOrganization) {
        throw { message: "Error creating organization." };
      }
      let createPermissionsQuery = `INSERT INTO permissions (user_id, organization_id, level) VALUES (?, ?, 1)`;
      const [resultsCreatePermissions] =
        await connection.query<ResultSetHeader>(createPermissionsQuery, [
          req.userId,
          resultsInsertOrganization.insertId,
        ]);
      if (!resultsCreatePermissions) {
        throw { message: "Error creating permissions." };
      }
      await connection.commit();
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

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
      await connection.end();
      res.status(200).json({ success: true, event: getEventsResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
export { router as organizationsRouter };
