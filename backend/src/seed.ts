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
    where: { email: "admin@ascendify.in" },
    update: {},
    create: {
      email: "admin@ascendify.in",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log(`Admin created: ${admin.email}`);

  // Create sample programs (skip if already exist)
  const existingPrograms = await prisma.program.count();
  if (existingPrograms === 0) {
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
  } else {
    console.log(`Programs already exist (${existingPrograms}), skipping.`);
  }

  // Create sample certificates (upsert to avoid duplicates)
  const certificates = [
    {
      certificateId: "ASC202673157",
      holderName: "Aarav Kumar Anand",
      email: "aarav.anand@example.com",
      college: "IIM SIRMAUR",
      birthDate: "20/06/2000",
      batch: "FIN MODLEING APR26",
      programTitle: "Financial Modeling",
      issueDate: new Date("2026-04-20"),
      certificateHostUrl: "https://bgtfventures-my.sharepoint.com/:b:/g/personal/bishal_agarwal_bgtf_in/IQDsVqhWOU_qQoPGZ8UVl5D7AZhut-q-jiPLv3I8-doIKeU?e=cu8ReB",
    },
    {
      certificateId: "ASC202618256",
      holderName: "HIMANSHU GARG",
      email: "himanshu.garg@example.com",
      college: "IIM SIRMAUR",
      birthDate: "17/01/2003",
      batch: "FIN MODLEING APR26",
      programTitle: "Financial Modeling",
      issueDate: new Date("2026-04-20"),
      certificateHostUrl: "https://bgtfventures-my.sharepoint.com/:b:/g/personal/bishal_agarwal_bgtf_in/IQArUAhdRB_HRaXEJdKMUspbAST-0B2ISLq6LDD2JPbYbTo?e=Rgi1TU",
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.upsert({
      where: { certificateId: cert.certificateId },
      update: {},
      create: cert,
    });
  }
  console.log(`${certificates.length} certificates seeded.`);

  // Create sample blog post
  const existingBlogs = await prisma.blog.count();
  if (existingBlogs === 0) {
    await prisma.blog.create({
      data: {
        title: "Why Financial Modeling is a Must-Have Skill for MBA Students",
        slug: "why-financial-modeling-is-must-have-skill-for-mba-students",
        excerpt:
          "Financial modeling is one of the most sought-after skills in the finance industry. Here's why every MBA student should master it before graduating.",
        content: `## The Growing Demand for Financial Modeling

In today's competitive finance landscape, theoretical knowledge alone isn't enough. Employers across investment banking, private equity, and corporate finance are actively seeking candidates who can build and interpret financial models.

## What is Financial Modeling?

Financial modeling is the process of creating a mathematical representation of a company's financial performance. It involves building spreadsheet models that forecast a company's future earnings, cash flows, and valuation based on historical data and assumptions.

## Why MBA Students Need This Skill

**1. Interview Readiness**
Top finance recruiters expect candidates to demonstrate hands-on modeling skills during interviews. A well-built DCF or LBO model can set you apart from hundreds of applicants.

**2. Practical Decision Making**
Financial models are used daily in corporate finance for budgeting, forecasting, and strategic planning. Understanding how to build and interpret these models makes you immediately valuable to any team.

**3. Higher Starting Salaries**
Professionals with strong financial modeling skills command 20-30% higher starting salaries compared to their peers without these skills.

**4. Career Flexibility**
Whether you want to work in investment banking, consulting, venture capital, or corporate strategy, financial modeling is a transferable skill that opens doors across industries.

## How Ascendify Helps

At Ascendify, our Financial Modeling cohort is designed specifically for MBA students and early-career professionals. With live sessions led by industry practitioners, real-world case studies, and mock interview preparation, we ensure you're not just learning theory — you're building job-ready skills.

**Ready to level up your finance career?** [Explore our upcoming cohorts](/cohorts) and take the first step toward mastering financial modeling.`,
        author: "Ascendify Team",
        category: "Finance Careers",
        coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        isPublished: true,
      },
    });
    console.log("Sample blog post created.");
  } else {
    console.log(`Blogs already exist (${existingBlogs}), skipping.`);
  }

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
