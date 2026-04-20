import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import programRoutes from "./routes/program";
import certificateRoutes from "./routes/certificate";
import contactRoutes from "./routes/contact";
import corporateRoutes from "./routes/corporate";
import authRoutes from "./routes/auth";
import jobRoutes from "./routes/job";
import blogRoutes from "./routes/blog";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/programs", programRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/corporate", corporateRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/blogs", blogRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
