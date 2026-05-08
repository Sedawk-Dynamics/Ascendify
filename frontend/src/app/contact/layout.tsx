import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ascendify. Reach out for queries about our finance cohort programs, corporate training, or career mentorship. Email: info@ascendify.in",
  alternates: { canonical: "https://ascendify.in/contact" },
  openGraph: {
    title: "Contact Ascendify - Get in Touch",
    description:
      "Reach out for queries about our finance cohort programs, corporate training, or career mentorship.",
    url: "https://ascendify.in/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
