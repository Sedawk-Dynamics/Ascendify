import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";
import { sendAdminNotification } from "../lib/mailer";

const router = Router();

// POST /api/contact - Submit contact form (public)
router.post("/", async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, city, message,
      whatsapp, contact, state, graduationYear, workExperience,
      highestAcademic, interestedToEnroll, willingFinanceCareer, studentOrProfessional
    } = req.body;

    if (!fullName || !email || !phone || !city || !message) {
      res.status(400).json({ error: "All fields are required: fullName, email, phone, city, message." });
      return;
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { fullName, email, phone, city, message },
    });

    // Check if this is an enrollment inquiry (from homepage modal)
    const isEnrollment = !!(whatsapp || highestAcademic || interestedToEnroll);

    const row = (label: string, value: string | undefined, options?: { link?: string; bold?: boolean; badge?: boolean }) => {
      if (!value) return "";
      let cell = value;
      if (options?.link) cell = `<a href="${options.link}${value}" style="color:#4f46e5;text-decoration:none;">${value}</a>`;
      if (options?.bold) cell = `<span style="font-weight:600;">${value}</span>`;
      if (options?.badge) {
        const color = value === "Yes" ? "#059669" : value === "No" ? "#dc2626" : "#4f46e5";
        cell = `<span style="background:${value === "Yes" ? "#ecfdf5" : value === "No" ? "#fef2f2" : "#eef2ff"};color:${color};padding:3px 12px;border-radius:12px;font-size:12px;font-weight:600;">${value}</span>`;
      }
      return `<tr><td style="padding:10px 12px;color:#6b7280;font-size:13px;border-bottom:1px solid #f3f4f6;width:200px;vertical-align:top;">${label}</td><td style="padding:10px 12px;color:#111827;font-size:14px;border-bottom:1px solid #f3f4f6;">${cell}</td></tr>`;
    };

    let emailHtml: string;

    if (isEnrollment) {
      emailHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:24px 28px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0 0 4px;font-size:20px;">New Enrollment Inquiry</h2>
          <p style="color:#a5b4fc;margin:0;font-size:13px;">Talk with our team — Homepage Form</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
          <div style="padding:20px 28px 8px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">Personal Details</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Full Name", fullName, { bold: true })}
            ${row("Email Address", email, { link: "mailto:" })}
            ${row("WhatsApp Number", whatsapp || phone, { link: "https://wa.me/91" })}
            ${row("Contact Number", contact || phone, { link: "tel:" })}
            ${row("State", state || city)}
          </table>
          <div style="padding:20px 28px 8px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">Academic &amp; Career Info</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Graduation Year", graduationYear)}
            ${row("Highest Academic Study", highestAcademic, { badge: true })}
            ${row("Student / Professional", studentOrProfessional, { badge: true })}
          </table>
          ${workExperience ? `<div style="padding:12px 28px;">
            <p style="color:#6b7280;font-size:12px;margin:0 0 6px;">Previous Finance Experience</p>
            <div style="background:#f9fafb;padding:10px 14px;border-radius:6px;color:#111827;font-size:14px;line-height:1.5;">${workExperience}</div>
          </div>` : ""}
          <div style="padding:20px 28px 8px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;font-weight:600;">Interest</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Interested to Enroll", interestedToEnroll, { badge: true })}
            ${row("Willing for Finance Career", willingFinanceCareer, { badge: true })}
          </table>
          <div style="height:20px;"></div>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">Sent from ascendify.in — Talk with our team form</p>
      </div>`;
    } else {
      const messageHtml = message.replace(/\n/g, "<br>");
      emailHtml = `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:24px 28px;border-radius:8px 8px 0 0;">
          <h2 style="color:#ffffff;margin:0 0 4px;font-size:20px;">New Contact Message</h2>
          <p style="color:#a5b4fc;margin:0;font-size:13px;">Contact Page Form</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;">
            ${row("Name", fullName, { bold: true })}
            ${row("Email", email, { link: "mailto:" })}
            ${row("Phone", phone, { link: "tel:" })}
            ${row("City/State", city)}
          </table>
          <div style="margin-top:16px;">
            <p style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;font-weight:600;">Message</p>
            <div style="background:#f9fafb;padding:14px 16px;border-radius:6px;color:#111827;line-height:1.6;font-size:14px;">${messageHtml}</div>
          </div>
        </div>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">Sent from ascendify.in — Contact form</p>
      </div>`;
    }

    sendAdminNotification(
      isEnrollment ? `New Enrollment Inquiry from ${fullName}` : `New Contact Message from ${fullName}`,
      emailHtml
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
