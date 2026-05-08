import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire From Us",
  description:
    "Hire trained finance professionals from Ascendify. Our alumni work at PwC, Deloitte, KPMG, and more. Find pre-vetted candidates for IB, ER, and Corporate Finance roles.",
  alternates: { canonical: "https://ascendify.in/hire-from-us" },
  openGraph: {
    title: "Hire From Ascendify - Finance Talent Pipeline",
    description:
      "Hire pre-vetted finance professionals trained in financial modeling, valuation, and investment analysis.",
    url: "https://ascendify.in/hire-from-us",
  },
};

export default function HireFromUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
