import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description:
    "Verify the authenticity of an Ascendify certificate. Enter the certificate ID to confirm its validity.",
  alternates: { canonical: "https://ascendify.in/verify" },
  robots: { index: false, follow: false },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
