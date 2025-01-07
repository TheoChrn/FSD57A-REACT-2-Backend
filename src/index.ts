import express, { Application, Request, Response } from "express";
import { musics } from "./data/musics";
import dotenv from "dotenv";

const app: Application = express();

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/musics", (req: Request, res: Response) => {
  const { name, author, genre } = req.body;

  try {
    if (!name || !author || !genre) {
      res.status(401).json({ message: "All fields are required" });
    }

    const newMusic = {
      id: musics.length + 1,
      ...req.body,
    };
    musics.push(newMusic);

    res
      .status(200)
      .json({ message: `Music ${newMusic.name} added successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (_, res: Response) => {
  res.send("Hello World with TypeScript and Express!");
});

app.get("/musics", (_, res: Response) => {
  res.json(musics);
});

app.get("/musics/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const musicById = musics.find((music) => music.id.toString() === id);

    if (!musicById) {
      res.status(404).json({ message: "Music not found" });
    }

    res.status(200).json(musicById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
