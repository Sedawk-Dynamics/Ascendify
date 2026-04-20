import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET /api/jobs - Public: active jobs only
router.get("/", async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(jobs);
  } catch (error) {
    console.error("List jobs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/jobs/all - Admin: all jobs
router.get("/all", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(jobs);
  } catch (error) {
    console.error("List all jobs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/jobs - Admin: create job
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, company, type, location, url } = req.body;

    if (!title || !company || !type || !location || !url) {
      res.status(400).json({ error: "Missing required fields: title, company, type, location, url." });
      return;
    }

    const job = await prisma.job.create({
      data: { title, company, type, location, url },
    });

    res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/jobs/:id - Admin: update job
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Job not found." });
      return;
    }

    const { title, company, type, location, url, isActive } = req.body;

    const job = await prisma.job.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(company !== undefined && { company }),
        ...(type !== undefined && { type }),
        ...(location !== undefined && { location }),
        ...(url !== undefined && { url }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json(job);
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/jobs/:id - Admin: delete job
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.job.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Job not found." });
      return;
    }

    await prisma.job.delete({ where: { id } });
    res.json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
