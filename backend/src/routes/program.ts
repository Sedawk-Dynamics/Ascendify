import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET /api/programs - List all active programs (public)
router.get("/", async (_req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(programs);
  } catch (error) {
    console.error("List programs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/programs/:id - Get single program (public)
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const program = await prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      res.status(404).json({ error: "Program not found." });
      return;
    }

    res.json(program);
  } catch (error) {
    console.error("Get program error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/programs - Create program (admin)
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description, duration, students, rating, badge, image, category } = req.body;

    if (!title || !description || !duration || !students || rating === undefined || !category) {
      res.status(400).json({ error: "Missing required fields: title, description, duration, students, rating, category." });
      return;
    }

    const program = await prisma.program.create({
      data: { title, description, duration, students, rating: parseFloat(rating), badge, image, category },
    });

    res.status(201).json(program);
  } catch (error) {
    console.error("Create program error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/programs/:id - Update program (admin)
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Program not found." });
      return;
    }

    const { title, description, duration, students, rating, badge, image, category, isActive } = req.body;

    const program = await prisma.program.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(duration !== undefined && { duration }),
        ...(students !== undefined && { students }),
        ...(rating !== undefined && { rating: parseFloat(rating) }),
        ...(badge !== undefined && { badge }),
        ...(image !== undefined && { image }),
        ...(category !== undefined && { category }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json(program);
  } catch (error) {
    console.error("Update program error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/programs/:id - Delete program (admin)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.program.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Program not found." });
      return;
    }

    await prisma.program.delete({ where: { id } });
    res.json({ message: "Program deleted successfully." });
  } catch (error) {
    console.error("Delete program error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
