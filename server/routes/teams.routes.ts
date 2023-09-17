import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
router.use(decodeToken);

//Create a team within an organization
router.post(
  "/:organization_id/teams",
  body("name").isString().trim(),
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
      await connection.end();
      res
        .status(200)
        .json({ success: true, event_id: resultsInsertTeam.insertId });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
//GET ALL TEAMS IN AN ORGANIZATION
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
//GET A TEAM IN AN ORGANIZATION
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

export { router as teamsRouter };
