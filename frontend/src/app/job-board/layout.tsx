import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Board",
  description:
    "Browse finance job opportunities curated by Ascendify. Find roles in Investment Banking, Equity Research, Corporate Finance, and Consulting.",
  alternates: { canonical: "https://ascendify.in/job-board" },
  openGraph: {
    title: "Finance Job Board - Ascendify Careers",
    description:
      "Browse curated finance job opportunities in Investment Banking, Equity Research, and Corporate Finance.",
    url: "https://ascendify.in/job-board",
  },
};

export default function JobBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
