import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; username: string; role: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Token não enviado" });
    return;
  }

  try {
    const decoded = jwt.verify(
      auth.replace("Bearer ", ""),
      process.env.JWT_SECRET as string,
    ) as { id: string; username: string; role: string };

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
}
