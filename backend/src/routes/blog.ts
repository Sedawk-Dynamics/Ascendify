import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware } from "../middleware/auth";

const router = Router();

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// GET /api/blogs - Public: published blogs only
router.get("/", async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (error) {
    console.error("List blogs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/blogs/admin/all - Admin: all blogs
router.get("/admin/all", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (error) {
    console.error("List all blogs error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET /api/blogs/:slug - Public: single blog by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog || !blog.isPublished) {
      res.status(404).json({ error: "Blog post not found." });
      return;
    }

    res.json(blog);
  } catch (error) {
    console.error("Get blog error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// POST /api/blogs - Admin: create blog
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, author, coverImage, category, isPublished } = req.body;

    if (!title || !content || !excerpt || !author || !category) {
      res.status(400).json({ error: "Missing required fields: title, content, excerpt, author, category." });
      return;
    }

    const slug = generateSlug(title);

    const existingSlug = await prisma.blog.findUnique({ where: { slug } });
    if (existingSlug) {
      res.status(409).json({ error: "A blog with a similar title already exists." });
      return;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        coverImage,
        category,
        isPublished: isPublished ?? false,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT /api/blogs/:id - Admin: update blog
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }

    const { title, content, excerpt, author, coverImage, category, isPublished } = req.body;

    const data: any = {};
    if (title !== undefined) {
      data.title = title;
      data.slug = generateSlug(title);
    }
    if (content !== undefined) data.content = content;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (author !== undefined) data.author = author;
    if (coverImage !== undefined) data.coverImage = coverImage;
    if (category !== undefined) data.category = category;
    if (isPublished !== undefined) data.isPublished = isPublished;

    const blog = await prisma.blog.update({ where: { id }, data });

    res.json(blog);
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// DELETE /api/blogs/:id - Admin: delete blog
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.blog.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: "Blog not found." });
      return;
    }

    await prisma.blog.delete({ where: { id } });
    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
