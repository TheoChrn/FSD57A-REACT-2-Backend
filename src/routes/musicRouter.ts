import express, { Request, Response, Router } from "express";
import { musics } from "../data/musics";

const musicRouter: Router = express.Router();

musicRouter.get("/", (_, res: Response) => {
  res.send("Hello World with TypeScript and Express!");
});

musicRouter.get("/musics", (_, res: Response) => {
  res.json(musics);
});

musicRouter.get("/musics/:id", (req: Request, res: Response) => {
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

musicRouter.post("/musics", (req: Request, res: Response) => {
  const { name, author, genre } = req.body;

  try {
    if (!name || !author || !genre) {
      res.status(401).json({ message: "All fields are required" });
      return;
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

musicRouter.put("/musics/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, author, genre } = req.body;

  try {
    const musicById = musics.find((music) => music.id.toString() === id);
    if (!musicById) {
      res.status(404).json({ message: "Music not found" });
      return;
    }

    musicById.name = name || musicById.name;
    musicById.author = author || musicById.author;
    musicById.genre = genre || musicById.genre;

    res
      .status(200)
      .json({ message: `Music ${musicById.name} updated successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

musicRouter.delete("/musics/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const musicByIdIndex = musics.findIndex(
      (music) => music.id.toString() === id
    );
    if (musicByIdIndex === -1) {
      res.status(404).json({ message: "Music not found" });
      return;
    }

    musics.splice(musicByIdIndex, 1);

    res.status(200).json({ message: `Music deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default musicRouter;
