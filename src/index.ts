import express, { Application, Request, Response } from "express";
import musicRouter from "./routes/musicRouter";
import userRouter from "./routes/userRouter";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app: Application = express();

dotenv.config();

const mongoDB = process.env.MONGO_URI!;
mongoose.connect(mongoDB);
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", musicRouter, userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
