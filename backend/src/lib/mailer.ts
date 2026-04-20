import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendAdminNotification(subject: string, html: string) {
  if (!process.env.ADMIN_EMAIL || !process.env.SMTP_USER) {
    console.warn("SMTP not configured, skipping email.");
    return;
  }
  await transporter.sendMail({
    from: `"Ascendify" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
}
