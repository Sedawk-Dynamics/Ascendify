import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cohorts & Courses",
  description:
    "Explore Ascendify's industry-led cohort programs in Financial Modeling, Valuation, Investment Banking, and Equity Research. Live project-based learning with expert mentors.",
  alternates: { canonical: "https://ascendify.in/cohorts" },
  openGraph: {
    title: "Cohorts & Courses - Ascendify Finance Programs",
    description:
      "Industry-led cohort programs in Financial Modeling, Valuation, Investment Banking, and Equity Research.",
    url: "https://ascendify.in/cohorts",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ascendify Finance Courses",
  description:
    "Industry-led cohort programs in Financial Modeling, Valuation, and Investment Analysis.",
  provider: {
    "@type": "EducationalOrganization",
    name: "Ascendify",
    url: "https://ascendify.in",
  },
};

export default function CohortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {children}
    </>
  );
}
