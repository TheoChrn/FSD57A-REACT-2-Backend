import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import musicRouter from "./routes/musicRouter";
import postRouter from "./routes/postRouter";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

const app: Application = express();

dotenv.config();

const mongoDB = process.env.MONGO_URI!;
mongoose.connect(mongoDB);
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = process.env.PORT;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", musicRouter, userRouter, postRouter, authRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
