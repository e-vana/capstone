import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
// All these routes are protected by the decodeToken middleware
router.use(decodeToken);

/**
 * @route POST /organizations/:organization_id/teams
 * @desc Create a new team within the given organization
 * @param name - The name of the team
 * @returns { success: boolean, team_id: number }
 */
router.post(
  "/:organization_id/teams",
  // Ensure the name is within 1 - 100 characters
  body("name").isString().trim().isLength({ min: 1, max: 100 }),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      req.body = {
        ...req.body,
        organization_id: parseInt(req.params.organization_id),
        created_by_user_id: req.userId,
      };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let insertTeamQuery = `INSERT INTO teams SET ?`;
      const [resultsInsertTeam] = await connection.query<ResultSetHeader>(
        insertTeamQuery,
        req.body
      );
      // TODO: Give this user admin permissions on this team
      await connection.end();
      res
        .status(200)
        .json({ success: true, team_id: resultsInsertTeam.insertId });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /organizations/:organization_id/teams
 * @desc Get all teams within the given organization
 * @param organization_id - The integer id of the organization
 */
router.get("/:organization_id/teams", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    let getTeamsQuery = `SELECT * FROM teams WHERE organization_id = ?`;
    const [getTeamsResult] = await connection.query<RowDataPacket[]>(
      getTeamsQuery,
      parseInt(req.params.organization_id)
    );
    await connection.end();
    res.status(200).json({ success: true, teams: getTeamsResult });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

/**
 * @route GET /organizations/:organization_id/teams/:team_id
 * @desc Get a specific team within the given organization
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns The team with the given id
 */
router.get(
  "/:organization_id/teams/:team_id",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getTeamQuery = `SELECT * FROM teams WHERE organization_id = ? AND id = ?`;
      const [getTeamResults] = await connection.query<RowDataPacket[]>(
        getTeamQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.team_id)]
      );
      if (getTeamResults.length == 0) {
        throw { message: "No team found." };
      }
      await connection.end();
      res.status(200).json({ success: true, team: getTeamResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route PUT /organizations/:organization_id/teams/:team_id
 * @desc Update a specific team within the given organization
 * @access Private (TODO: Organization admins can update teams within their organization)
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param name - The name of the team
 * @returns The updated team info with the given id
 */
router.put("/:organization_id/teams/:team_id",
  body("name").isString().trim().isLength({ min: 1, max: 100 }),
  async (req: Request, res: Response) => {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      // TODO: Check if the user has permission to edit this team
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let updateTeamQuery = `UPDATE teams SET name = ? WHERE id = ?`;
      const [updateTeamResults] = await connection.query<ResultSetHeader>(
        updateTeamQuery,
        [req.body.name, parseInt(req.params.team_id)]
      );
      await connection.end();
      return res.status(200).json({ success: true, team: updateTeamResults });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route DELETE /organizations/:organization_id/teams/:team_id
 * @desc Delete a specific team within the given organization
 * @access Private (TODO: Organization admins can delete teams within their organization)
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns 200 OK if successful
 * @returns 500 Internal Server Error if unsuccessful
 */
router.delete("/:organization_id/teams/:team_id", async (req: Request, res: Response) => {
  try {
    let connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    // TODO: Check if the user is an admin of the organization
    let deleteTeamQuery = `DELETE FROM teams WHERE id = ?`;
    const [deleteTeamResults] = await connection.query<ResultSetHeader>(
      deleteTeamQuery,
      [parseInt(req.params.team_id)]
    );
    await connection.end();
    return res.status(200).json({ success: true, team: deleteTeamResults });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
});

export { router as teamsRouter };
