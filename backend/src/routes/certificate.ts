import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// GET /api/certificates/verify/:certificateId - Public verification
router.get("/verify/:certificateId", async (req: Request, res: Response) => {
  try {
    const certificateId = req.params.certificateId as string;
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId },
    });

    if (!certificate) {
      res.status(404).json({ error: "Certificate not found.", isValid: false });
      return;
    }

    res.json({
      isValid: certificate.isValid,
      certificateId: certificate.certificateId,
      holderName: certificate.holderName,
      college: certificate.college,
      birthDate: certificate.birthDate,
      batch: certificate.batch,
      programTitle: certificate.programTitle,
      issueDate: certificate.issueDate,
      certificateHostUrl: certificate.certificateHostUrl,
    });
  } catch (error) {
    console.error("Verify certificate error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/certificates - List all certificates (admin)
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(certificates);
  } catch (error) {
    console.error("List certificates error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/certificates - Create certificate (admin)
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { certificateId, holderName, email, programTitle, issueDate, isValid, college, birthDate, batch, certificateHostUrl } = req.body;

    if (!certificateId || !holderName || !email || !programTitle || !issueDate) {
      res.status(400).json({ error: "Missing required fields: certificateId, holderName, email, programTitle, issueDate." });
      return;
    }

    const existing = await prisma.certificate.findUnique({ where: { certificateId } });
    if (existing) {
      res.status(409).json({ error: "A certificate with this ID already exists." });
      return;
    }

    const certificate = await prisma.certificate.create({
      data: {
        certificateId,
        holderName,
        email,
        programTitle,
        issueDate: new Date(issueDate),
        isValid: isValid ?? true,
        college,
        birthDate,
        batch,
        certificateHostUrl,
      },
    });

    res.status(201).json(certificate);
  } catch (error) {
    console.error("Create certificate error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/certificates/:id - Update certificate (admin)
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.certificate.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Certificate not found." });
      return;
    }

    const { holderName, email, programTitle, issueDate, isValid, college, birthDate, batch, certificateHostUrl } = req.body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        ...(holderName !== undefined && { holderName }),
        ...(email !== undefined && { email }),
        ...(programTitle !== undefined && { programTitle }),
        ...(issueDate !== undefined && { issueDate: new Date(issueDate) }),
        ...(isValid !== undefined && { isValid }),
        ...(college !== undefined && { college }),
        ...(birthDate !== undefined && { birthDate }),
        ...(batch !== undefined && { batch }),
        ...(certificateHostUrl !== undefined && { certificateHostUrl }),
      },
    });

    res.json(certificate);
  } catch (error) {
    console.error("Update certificate error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/certificates/:id - Delete certificate (admin)
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.certificate.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Certificate not found." });
      return;
    }

    await prisma.certificate.delete({ where: { id } });
    res.json({ message: "Certificate deleted successfully." });
  } catch (error) {
    console.error("Delete certificate error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
