import express, { Application, Request, Response } from "express";
import { musics } from "./data/musics";

const app: Application = express();
const port = 3000;

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
      return;
    }

    res.status(200).json(musicById);
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
