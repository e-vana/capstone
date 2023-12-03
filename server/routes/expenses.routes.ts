import { Request, Response, Router, query } from "express";
import { body, validationResult } from "express-validator";
import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import decodeToken from "../middleware/token.middleware";

const router: Router = Router();
router.use(decodeToken);

/**
 * @route GET /:organization_id/teams/:team_id/events/:event_id/expenses
 * @desc Get expenses for a specific event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/events/:event_id/expenses",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getExpensesQuery = `
        SELECT
        u.email as user_email,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        we.expense_name,
        we.expense_type,
        we.amount,
        we.description,
        we.receipt_url,
        o.name as organization_name,
        t.name as team_name,
        e.name as event_name,
        e.description as event_description,
        e.start_time as event_start_time,
        e.end_time as event_end_time
        FROM work_expenses we
        JOIN events e ON we.event_id = e.id
        JOIN users u ON we.user_id = u.id
        JOIN teams t ON e.team_id = t.id
        JOIN organizations o ON t.organization_id = o.id
        WHERE o.id = ?
        AND t.id = ?
        AND e.id = ?
      `;
      const [getExpensesResults] = await connection.query<RowDataPacket[]>(
        getExpensesQuery,
        [
          parseInt(req.params.organization_id),
          parseInt(req.params.team_id),
          parseInt(req.params.event_id),
        ]
      );
      await connection.end();
      res.status(200).json({ success: true, expenses: getExpensesResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/teams/:team_id/expenses
 * @desc Get expenses for a specific team
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/teams/:team_id/expenses",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getExpensesQuery = `
        SELECT
        u.email as user_email,
        u.first_name as user_first_name,
        u.last_name as user_last_name,
        we.expense_name,
        we.expense_type,
        we.amount,
        we.description,
        we.receipt_url,
        o.name as organization_name,
        t.name as team_name,
        e.name as event_name,
        e.description as event_description,
        e.start_time as event_start_time,
        e.end_time as event_end_time
        FROM work_expenses we
        JOIN events e ON we.event_id = e.id
        JOIN users u ON we.user_id = u.id
        JOIN teams t ON e.team_id = t.id
        JOIN organizations o ON t.organization_id = o.id
        WHERE o.id = ?
        AND t.id = ?
      `;
      const [getExpensesResults] = await connection.query<RowDataPacket[]>(
        getExpensesQuery,
        [parseInt(req.params.organization_id), parseInt(req.params.team_id)]
      );
      await connection.end();
      res.status(200).json({ success: true, expenses: getExpensesResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route GET /:organization_id/expenses
 * @desc Get expenses for an entire organization
 * @param organization_id - The integer id of the organization
 * @returns The event with the given id
 */
router.get(
  "/:organization_id/expenses",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let getExpensesQuery = `
      SELECT
      u.email as user_email,
      u.first_name as user_first_name,
      u.last_name as user_last_name,
      we.expense_name,
      we.expense_type,
      we.amount,
      we.description,
      we.receipt_url,
      o.name as organization_name,
      t.name as team_name,
      e.name as event_name,
      e.description as event_description,
      e.start_time as event_start_time,
      e.end_time as event_end_time
      FROM work_expenses we
      JOIN events e ON we.event_id = e.id
      JOIN users u ON we.user_id = u.id
      JOIN teams t ON e.team_id = t.id
      JOIN organizations o ON t.organization_id = o.id
      WHERE o.id = ?
    `;
      const [getExpensesResults] = await connection.query<RowDataPacket[]>(
        getExpensesQuery,
        [parseInt(req.params.organization_id)]
      );
      await connection.end();
      console.log("RESULTS FROM orgId/expenses: \n", getExpensesResults);
      res.status(200).json({ success: true, expenses: getExpensesResults });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

router.get(
  "/:organization_id/expense-breakdown",
  async (req: Request, res: Response) => {
    try {
      let connection = await mysql.createConnection(
        process.env.DATABASE_URL as string
      );
      let orgExpenseBreakdown = `SELECT
        u.first_name as user_name,
        SUM(we.amount) as total_expenses
        FROM work_expenses we 
        JOIN events e on we.event_id = e.id 
        JOIN users u on we.user_id = u.id 
        JOIN teams t on e.team_id = t.id 
        JOIN organizations o on t.organization_id = o.id 
        WHERE o.id = ?
        GROUP BY user_name;
      `;

      const [results, fields] = await connection.query(orgExpenseBreakdown, [
        req.params.organization_id,
      ]);
      res.status(200).json({ success: true, expense_breakdown: results });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

/**
 * @route POST /:organization_id/teams/:team_id/events/:event_id/expenses
 * @desc add an expense to an event
 * @param organization_id - The integer id of the organization
 * @param team_id - The integer id of the team
 * @param event_id - The integer id of the event
 * @returns success boolean T || F
 */
router.post(
  "/:organization_id/teams/:team_id/events/:event_id/expenses",
  body("expense_name").isString().trim(),
  body("expense_type").isString().trim(),
  body("amount").isFloat().trim(),
  body("description").isString().trim(),
  body("receipt_url").isString().trim(),
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
        INSERT INTO work_expenses SET ? 
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

export { router as expensesRouter };
