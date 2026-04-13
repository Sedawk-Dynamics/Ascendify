import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// POST /api/corporate - Submit corporate inquiry (public)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { companyName, contactPerson, workEmail, partnershipInterest, message } = req.body;

    if (!companyName || !contactPerson || !workEmail || !partnershipInterest) {
      res.status(400).json({ error: "Required fields: companyName, contactPerson, workEmail, partnershipInterest." });
      return;
    }

    const inquiry = await prisma.corporateInquiry.create({
      data: { companyName, contactPerson, workEmail, partnershipInterest, message },
    });

    res.status(201).json({ message: "Inquiry submitted successfully.", id: inquiry.id });
  } catch (error) {
    console.error("Submit corporate inquiry error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/corporate - List all inquiries (admin)
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const inquiries = await prisma.corporateInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(inquiries);
  } catch (error) {
    console.error("List corporate inquiries error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/corporate/:id/read - Mark as read (admin)
router.put("/:id/read", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.corporateInquiry.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }

    const inquiry = await prisma.corporateInquiry.update({
      where: { id },
      data: { isRead: true },
    });

    res.json(inquiry);
  } catch (error) {
    console.error("Mark read error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/corporate/:id - Delete inquiry (admin)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.corporateInquiry.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }

    await prisma.corporateInquiry.delete({ where: { id } });
    res.json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Delete corporate inquiry error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
