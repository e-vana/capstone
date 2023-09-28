import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

dotenv.config();
const router: Router = Router();
router.use(decodeToken);

// TODO: Handle event tasks that are assigned to a team within an organization

/**
 * @route GET /organizations/:organization_id/events/:event_id/tasks
 * @desc Get all tasks within the given event
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @returns { success: boolean, tasks: Task[] }
 */
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

/**
 * @route GET /organizations/:organization_id/events/:event_id/tasks/:task_id
 * @desc Get a specific task within the given event
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @param task_id - The integer id of the task
 * @returns { success: boolean, tasks: Task[] }
 */
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

/**
 * @route POST /organizations/:organization_id/events/:event_id/tasks
 * @desc Create a task within the given event
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @param name - The name of the task
 * @param description - The description of the task
 * @returns { success: boolean, task_id: number }
 */
router.post(
  "/:organization_id/events/:event_id/tasks",
  body("name").isString().trim().isLength({ min: 1, max: 150 }),
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
        .json({ success: true, task_id: resultsInsertTask.insertId });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route PUT /organizations/:organization_id/events/:event_id/tasks/:task_id
 * @desc Update a task within the given event
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @param task_id - The integer id of the task
 * @param name - The name of the task
 * @param description - The description of the task
 * @access Private (TODO: should only admins/team leaders be able to edit event info, besides completion status?)
 * @returns { success: boolean, task_id: number }
 */
router.put("/:organization_id/events/:event_id/tasks/:task_id",
  body("name").isString().trim().optional().isLength({ min: 1, max: 150 }),
  body("description").isString().optional().trim(),
  async (req: Request, res: Response) => {
    try {
      // TODO: Check if the user has permissions to edit this event
      let validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw { validationErrors: validationErrors.array() };
      }
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let updateTaskQuery = `UPDATE tasks SET ? WHERE id = ?`;
      const [resultsUpdateTask] = await connection.query<ResultSetHeader>(
        updateTaskQuery,
        [req.body, parseInt(req.params.task_id)]
      );
      await connection.end();
      return res.status(200).json({ success: true, tasks: resultsUpdateTask });
    }
    catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route POST /organizations/:organization_id/events/:event_id/tasks/:task_id
 * @desc Toggle a task's completion status
 * @param organization_id - The integer id of the organization
 * @param event_id - The integer id of the event
 * @param task_id - The integer id of the task
 * @param completed - The completion status of the task
 * @access Private (TODO: Only members in the team/org should be able to toggle completion status)
 */
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
      return res.status(200).json({ success: true, tasks: resultsUpdateTask });
    } catch (error) {
<<<<<<< HEAD
      console.log(error);
      res.status(500).json({ success: false, error });
=======
      return res.status(500).json({ success: false, error });
>>>>>>> 46929e2 (Added basic JSDoc to backend; added preliminary Update&Delete endpoints for some resources)
    }
  }
);

export { router as tasksRouter };
