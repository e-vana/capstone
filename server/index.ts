import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import { userRouter } from "./routes/users.routes";
import path from "path";
import { authRouter } from "./routes/auth.routes";
import { organizationsRouter } from "./routes/organizations.routes";
import { eventsRouter } from "./routes/events.routes";
import { tasksRouter } from "./routes/tasks.routes";
dotenv.config();

const app: Express = express();
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

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
