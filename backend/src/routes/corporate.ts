import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { sendAdminNotification } from "../lib/mailer";

const router = Router();

// POST /api/corporate - Submit corporate inquiry (public)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { companyName, contactPerson, workEmail, phone, partnershipInterest, message } = req.body;

    if (!companyName || !contactPerson || !workEmail || !partnershipInterest) {
      res.status(400).json({ error: "Required fields: companyName, contactPerson, workEmail, partnershipInterest." });
      return;
    }

    const inquiry = await prisma.corporateInquiry.create({
      data: { companyName, contactPerson, workEmail, partnershipInterest, message },
    });

    const isHiring = partnershipInterest === "Hiring Partnership";
    const messageHtml = (message || "N/A").replace(/\n/g, "<br>");

    const row = (label: string, value: string | undefined, options?: { link?: string; bold?: boolean; badge?: boolean }) => {
      if (!value) return "";
      let cell = value;
      if (options?.link) cell = `<a href="${options.link}${value}" style="color:#4f46e5;text-decoration:none;">${value}</a>`;
      if (options?.bold) cell = `<span style="font-weight:600;">${value}</span>`;
      if (options?.badge) cell = `<span style="background:#eef2ff;color:#4f46e5;padding:3px 12px;border-radius:12px;font-size:12px;font-weight:600;">${value}</span>`;
      return `<tr><td style="padding:10px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;width:180px;vertical-align:top;">${label}</td><td style="padding:10px 12px;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${cell}</td></tr>`;
    };

    const title = isHiring ? "New Hiring Request" : "New Corporate Inquiry";
    const subtitle = isHiring ? "Hire from Us — Hiring Form" : "Corporate Connect — Partnership Form";

    sendAdminNotification(
      isHiring ? `New Hiring Request from ${companyName}` : `New Corporate Inquiry from ${companyName}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:24px 28px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0 0 4px;font-size:20px;">${title}</h2>
          <p style="color:#a5b4fc;margin:0;font-size:13px;">${subtitle}</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <div style="padding:20px 28px 8px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">Contact Information</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Company", companyName, { bold: true })}
            ${row("Contact Person", contactPerson)}
            ${row("Email", workEmail, { link: "mailto:" })}
            ${row("Phone", phone, { link: "tel:" })}
            ${row("Partnership Interest", partnershipInterest, { badge: true })}
          </table>
          ${message ? `
          <div style="padding:20px 28px 8px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">${isHiring ? "Hiring Details" : "Message"}</p>
          </div>
          <div style="margin:0 28px 20px;background:#f9fafb;padding:14px 16px;border-radius:6px;color:#111827;line-height:1.8;font-size:14px;">${messageHtml}</div>` : ""}
          <div style="height:12px;"></div>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">Sent from ascendify.in — ${isHiring ? "Hire from Us" : "Corporate Connect"} form</p>
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
