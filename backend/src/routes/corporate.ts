import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { sendAdminNotification } from "../lib/mailer";

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

    const messageHtml = (message || "N/A").replace(/\n/g, "<br>");
    sendAdminNotification(
      `New Corporate Inquiry from ${companyName}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#1e1b4b;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;">New Corporate Inquiry</h2>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;vertical-align:top;">Company</td><td style="padding:8px 0;color:#111827;font-weight:600;">${companyName}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Contact Person</td><td style="padding:8px 0;color:#111827;">${contactPerson}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td><td style="padding:8px 0;color:#111827;"><a href="mailto:${workEmail}" style="color:#4f46e5;">${workEmail}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Interest</td><td style="padding:8px 0;color:#111827;"><span style="background:#eef2ff;color:#4f46e5;padding:2px 10px;border-radius:12px;font-size:13px;">${partnershipInterest}</span></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">
          <p style="color:#6b7280;margin:0 0 8px;font-size:13px;">Message / Details</p>
          <div style="background:#f9fafb;padding:12px 16px;border-radius:6px;color:#111827;line-height:1.6;">${messageHtml}</div>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">Sent from ascendify.in corporate form</p>
      </div>`
    ).catch((err) => console.error("Email send failed:", err));

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
