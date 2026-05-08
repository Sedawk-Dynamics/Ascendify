import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert tips, career advice, and the latest trends in finance, investment banking, equity research, and professional development.",
  alternates: { canonical: "https://ascendify.in/blog" },
  openGraph: {
    title: "Blog - Ascendify Insights & Industry Updates",
    description:
      "Expert tips, career advice, and the latest trends in finance and professional development.",
    url: "https://ascendify.in/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
