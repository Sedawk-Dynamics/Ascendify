import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Training",
  description:
    "Customized corporate workforce training programs in finance, technical tools & AI skills. Upskill your teams with Ascendify's industry-led training solutions.",
  alternates: { canonical: "https://ascendify.in/corporate" },
  openGraph: {
    title: "Corporate Training - Ascendify for Business",
    description:
      "Customized workforce training programs in finance, technical tools & AI skills for corporate teams.",
    url: "https://ascendify.in/corporate",
  },
};

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
