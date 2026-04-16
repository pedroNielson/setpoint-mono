import { Router, Response } from "express";
import { Event } from "../models/Event";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// Todas as rotas exigem auth
router.use(requireAuth);

// GET /events — lista eventos do usuário logado
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find({ owner: req.user!.id }).sort({
      createdAt: -1,
    });
    res.json({ data: events });
  } catch {
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
});

// GET /events/:id — busca evento por id
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      owner: req.user!.id,
    });
    if (!event) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }
    res.json({ data: event });
  } catch {
    res.status(500).json({ error: "Erro ao buscar evento" });
  }
});

// POST /events — cria evento
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const {
      name,
      description,
      type,
      date,
      hour,
      categories,
      duration,
      progress,
      status,
    } = req.body;

    if (!name || !type || !date || !hour) {
      res
        .status(400)
        .json({ error: "name, type, date e hour são obrigatórios" });
      return;
    }

    const event = await Event.create({
      name,
      description,
      type,
      date,
      hour,
      categories: categories ?? [],
      duration: duration ?? 0,
      progress: progress ?? 0,
      owner: req.user!.id,
      status: status ?? "pending",
    });

    res.status(201).json({ data: event });
  } catch {
    res.status(500).json({ error: "Erro ao criar evento" });
  }
});

// PUT /events/:id — atualiza evento
router.put("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, owner: req.user!.id },
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }

    res.json({ data: event });
  } catch {
    res.status(500).json({ error: "Erro ao atualizar evento" });
  }
});

// DELETE /events/:id — deleta evento
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      owner: req.user!.id,
    });

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado" });
      return;
    }

    res.json({ data: { message: "Evento deletado com sucesso" } });
  } catch {
    res.status(500).json({ error: "Erro ao deletar evento" });
  }
});

export default router;
