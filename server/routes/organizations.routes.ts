import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";
import dateToMySQLTimestamp from "../utils/formatMySQLTimestamp";

const router: Router = Router();
router.use(decodeToken);

// TODO: Update to allow getting organizations a user is a member of but does not own

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
    console.log(process.env.DATABASE_URL);
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
    if (getOrganizationsResults.length == 0) {
      throw { message: "No organization found." };
    }
    await connection.end();
    res
      .status(200)
      .json({ success: true, organization: getOrganizationsResults[0] });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route POST /organizations
 * @desc Create a new organization
 * @param name - The name of the organization
 * @param website_url - The website url of the organization
 * @param phone_number - The phone number of the organization
 * @param logo_url - The logo url of the organization
 * @returns { success: boolean }
 */
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
      // Mark the owner_user_id as the user who created the organization
      req.body = { ...req.body, owner_user_id: req.userId };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      await connection.beginTransaction();
      // TODO: Check if organization name already exists
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

      // Create the organization-wide team
      let createGlobalTeamQuery = `INSERT INTO teams (organization_id, name, created_by_user_id) VALUES (?, 'Organization-wide Team', ?)`;
      const [resultsCreateGlobalTeam] = await connection.query<ResultSetHeader>(
        createGlobalTeamQuery,
        [
          resultsInsertOrganization.insertId,
          req.userId, // This should be the owner of the organization
        ]
      );

      await connection.commit();
      await connection.end();

      // TODO: We need to update the user's token with the new permissions

      res.status(200).json({ success: true });
    } catch (error) {
      console.log("POST /organizations error: ", error);
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route PUT /organizations/:organization_id
 * @desc Update an organization
 * @param name - The name of the organization
 * @param website_url - The website url of the organization
 * @param phone_number - The phone number of the organization
 * @param logo_url - The logo url of the organization
 * @returns { success: boolean }
 */
router.put(
  "/:organization_id",
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
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      req.body = {
        ...req.body,
        updated_at: dateToMySQLTimestamp(new Date()),
      };
      await connection.query<ResultSetHeader>(
        `UPDATE organizations SET ? WHERE id = ?`,
        [req.body, req.params.organization_id]
      );
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as organizationsRouter };
