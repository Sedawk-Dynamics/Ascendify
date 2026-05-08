import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { sendAdminNotification } from "../lib/mailer";

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

    const messageHtml = message.replace(/\n/g, "<br>");
    sendAdminNotification(
      `New Contact Message from ${fullName}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1e1b4b;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;">New Contact Form Submission</h2>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:120px;vertical-align:top;">Name</td><td style="padding:8px 0;color:#111827;font-weight:600;">${fullName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#4f46e5;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Phone</td><td style="padding:8px 0;color:#111827;"><a href="tel:${phone}" style="color:#4f46e5;">${phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">City/State</td><td style="padding:8px 0;color:#111827;">${city}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">
          <p style="color:#6b7280;margin:0 0 8px;font-size:13px;">Message / Details</p>
          <div style="background:#f9fafb;padding:12px 16px;border-radius:6px;color:#111827;line-height:1.6;">${messageHtml}</div>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">Sent from ascendify.in contact form</p>
      </div>`
    ).catch((err) => console.error("Email send failed:", err));

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
