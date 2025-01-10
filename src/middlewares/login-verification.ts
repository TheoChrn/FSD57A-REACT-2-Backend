import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const loginVerification: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).json({ message: "Please provide an email and a password" });
    return;
  }
  next();
};

interface IUser {
  user_id: string;
  iat: number;
}

export interface RequestWithUser extends Request {
  user?: IUser;
}

export const verifyUser: RequestHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied, no token provided" });
    return;
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET!) as IUser;

    if (!verify) {
      res.status(401).json({ message: "Access denied, no token provided" });
      return;
    }

    req.user = verify;

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
