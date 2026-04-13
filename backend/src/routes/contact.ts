import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// POST /api/contact - Submit contact form (public)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, city, message } = req.body;

    if (!fullName || !email || !phone || !city || !message) {
      res.status(400).json({ error: "All fields are required: fullName, email, phone, city, message." });
      return;
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { fullName, email, phone, city, message },
    });

    res.status(201).json({ message: "Message sent successfully.", id: contactMessage.id });
  } catch (error) {
    console.error("Submit contact error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/contact - List all messages (admin)
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("List contacts error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/contact/:id/read - Mark as read (admin)
router.put("/:id/read", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Message not found." });
      return;
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    res.json(message);
  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/contact/:id - Delete message (admin)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.contactMessage.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Message not found." });
      return;
    }

    await prisma.contactMessage.delete({ where: { id } });
    res.json({ message: "Message deleted successfully." });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
