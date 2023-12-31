import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import path from "path";
import { authRouter } from "./routes/auth.routes";
import { eventsRouter } from "./routes/events.routes";
import { expensesRouter } from "./routes/expenses.routes";
import { hoursRouter } from "./routes/hours.routes";
import { organizationsRouter } from "./routes/organizations.routes";
import { tasksRouter } from "./routes/tasks.routes";
import { teamsRouter } from "./routes/teams.routes";
import { userRouter } from "./routes/users.routes";
import { milesRouter } from "./routes/miles.routes";

// Use the .env.development file in development
if (process.env.NODE_ENV !== "production") {
  // If a .env.development file exists, use it
  dotenv.config({ path: ".env.development" });
  // If there's no .env.development file, use .env
  dotenv.config();
} else {
  dotenv.config({ path: ".env.production" });
  // If there's .env but not .env.production, use .env
  dotenv.config();
}

export const app: Express = express();
const port = process.env.PORT;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/organizations", organizationsRouter);
app.use("/organizations", eventsRouter);
app.use("/organizations", tasksRouter);
app.use("/organizations", teamsRouter);
app.use("/organizations", hoursRouter);
app.use("/organizations", expensesRouter);
app.use("/organizations", milesRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
//Test commit
