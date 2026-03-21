import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = Router();

// POST /auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    res.status(401).json({ error: "Usuário não encontrado" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: "Senha incorreta" });
    return;
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  res.json({ token, user: { username: user.username, role: user.role } });
});

// GET /auth/me (rota protegida de teste)
router.get("/me", async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Token não enviado" });
    return;
  }

  try {
    const decoded = jwt.verify(
      auth.replace("Bearer ", ""),
      process.env.JWT_SECRET as string,
    );
    res.json({ user: decoded });
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
});

export default router;
