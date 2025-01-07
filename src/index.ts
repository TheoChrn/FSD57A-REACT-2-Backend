import express, { Application, Request, Response } from "express";
import musicRouter from "./routes/musicRouter";
import dotenv from "dotenv";
import cors from "cors";

const app: Application = express();

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", musicRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
