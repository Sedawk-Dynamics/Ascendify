import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create default admin
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@ascendify.com" },
    update: {},
    create: {
      email: "admin@ascendify.com",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log(`Admin created: ${admin.email}`);

  // Create sample programs
  const programs = [
    {
      title: "Data Science & Analytics",
      description:
        "Master data science fundamentals, machine learning algorithms, and analytics tools to drive data-driven decision making in organizations.",
      duration: "12 Weeks",
      students: "150+",
      rating: 4.8,
      badge: "Popular",
      category: "Technology",
    },
    {
      title: "FinTech & Banking",
      description:
        "Explore the intersection of finance and technology. Learn about digital banking, blockchain, payment systems, and regulatory frameworks.",
      duration: "10 Weeks",
      students: "200+",
      rating: 4.9,
      badge: "Trending",
      category: "Finance",
    },
    {
      title: "Digital Marketing",
      description:
        "Learn modern digital marketing strategies including SEO, social media marketing, content marketing, and performance analytics.",
      duration: "8 Weeks",
      students: "100+",
      rating: 4.7,
      badge: "New",
      category: "Marketing",
    },
    {
      title: "Full-Stack Development",
      description:
        "Build complete web applications from front to back. Master React, Node.js, databases, and deployment in this comprehensive program.",
      duration: "16 Weeks",
      students: "120+",
      rating: 4.9,
      badge: "Popular",
      category: "Technology",
    },
    {
      title: "Product Management",
      description:
        "Learn to lead product teams, define product strategy, conduct user research, and deliver products that customers love.",
      duration: "10 Weeks",
      students: "80+",
      rating: 4.6,
      badge: "New",
      category: "Business",
    },
    {
      title: "Business Analytics",
      description:
        "Transform raw data into actionable business insights. Learn SQL, Excel modeling, Tableau, and business intelligence frameworks.",
      duration: "8 Weeks",
      students: "90+",
      rating: 4.7,
      badge: null,
      category: "Business",
    },
  ];

  for (const program of programs) {
    await prisma.program.create({ data: program });
  }
  console.log(`${programs.length} programs created.`);

  // Create sample certificates
  const certificates = [
    {
      certificateId: "ASC-2026-00001",
      holderName: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      programTitle: "Data Science & Analytics",
      issueDate: new Date("2026-03-15"),
    },
    {
      certificateId: "ASC-2026-00002",
      holderName: "Priya Patel",
      email: "priya.patel@example.com",
      programTitle: "FinTech & Banking",
      issueDate: new Date("2026-03-20"),
    },
    {
      certificateId: "ASC-2026-00003",
      holderName: "Amit Kumar",
      email: "amit.kumar@example.com",
      programTitle: "Digital Marketing",
      issueDate: new Date("2026-04-01"),
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log(`${certificates.length} certificates created.`);

  console.log("Seeding complete!");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
