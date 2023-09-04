import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
router.use(decodeToken);

//GET ALL TASKS ON AN EVENT
router.get(
  "/:organization_id/events/:event_id/tasks",
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getTasksQuery = `SELECT * FROM tasks WHERE event_id = ?`;
      const [getTasksResults] = await connection.query<RowDataPacket[]>(
        getTasksQuery,
        parseInt(req.params.event_id)
      );
      await connection.end();
      res.status(200).json({ success: true, tasks: getTasksResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
//GET A TASK ON AN EVENT
router.get(
  "/:organization_id/events/:event_id/tasks/:task_id",
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getTasksQuery = `SELECT * FROM tasks WHERE id = ?`;
      const [getTasksResults] = await connection.query<RowDataPacket[]>(
        getTasksQuery,
        parseInt(req.params.task_id)
      );
      await connection.end();
      res.status(200).json({ success: true, tasks: getTasksResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
//Create a task within an organization
router.post(
  "/:organization_id/events/:event_id/tasks",
  body("name").isString().trim(),
  body("description").isString().trim(),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      req.body = {
        ...req.body,
        event_id: parseInt(req.params.event_id),
      };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let insertTaskQuery = `INSERT INTO tasks SET ?`;
      const [resultsInsertTask] = await connection.query<ResultSetHeader>(
        insertTaskQuery,
        req.body
      );
      await connection.end();
      res
        .status(200)
        .json({ success: true, event_id: resultsInsertTask.insertId });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);
//Mark a task complete /incomplete
router.post(
  "/:organization_id/events/:event_id/tasks/:task_id",
  body("completed").isInt({ max: 1, min: 0 }).trim(),
  async (req: Request, res: Response) => {
    try {
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let d = new Date();
      req.body = {
        ...req.body,
        completed_by_user_id: req.userId,
      };
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let updateTaskQuery = `UPDATE tasks SET completed = ?, completed_by_user_id = ?, completed_at = ? WHERE id = ?`;
      const [resultsUpdateTask] = await connection.query(updateTaskQuery, [
        req.body.completed == 1 ? req.body.completed : 0,
        req.body.completed == 1 ? req.body.completed_by_user_id : null,
        req.body.completed == 1 ? d : null,
        parseInt(req.params.task_id),
      ]);
      await connection.end();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

export { router as tasksRouter };
