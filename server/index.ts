import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import { testRouter } from "./routes/test.routes";
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

app.use("/", testRouter);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
