import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ascendify.in"),
  verification: {
    google: "UZ4v9K87Ym4kwOYJzQBCtII_yzz9IvV-2ucZmLzyUDo",
  },
  icons: {
    icon: "/AscendifyLogo.png",
  },
  title: {
    default: "Ascendify - Your Passport to a Dream Career",
    template: "%s | Ascendify",
  },
  description:
    "Empowering future leaders through industry-led cohort programs, expert mentorship, and guaranteed career outcomes in Investment Banking, Equity Research & Corporate Finance.",
  keywords: [
    "finance career",
    "investment banking course",
    "financial modeling",
    "equity research",
    "corporate finance",
    "MBA finance",
    "cohort programs",
    "finance mentorship",
    "valuation course",
    "DCF modeling",
    "finance interview prep",
    "Ascendify",
  ],
  authors: [{ name: "Ascendify" }],
  creator: "Ascendify",
  publisher: "Ascendify",
  alternates: {
    canonical: "https://ascendify.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ascendify.in",
    siteName: "Ascendify",
    title: "Ascendify - Your Passport to a Dream Career",
    description:
      "Empowering future leaders through industry-led cohort programs, expert mentorship, and guaranteed career outcomes.",
    images: [
      {
        url: "/AscendifyLogo.png",
        width: 1200,
        height: 630,
        alt: "Ascendify - Finance Career Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascendify - Your Passport to a Dream Career",
    description:
      "Empowering future leaders through industry-led cohort programs, expert mentorship, and guaranteed career outcomes.",
    images: ["/AscendifyLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Ascendify",
  url: "https://ascendify.in",
  logo: "https://ascendify.in/AscendifyLogo.png",
  description:
    "Empowering future leaders through industry-led cohort programs, expert mentorship, and guaranteed career outcomes in finance.",
  email: "info@ascendify.in",
  telephone: "+91-86970-09762",
  sameAs: [
    "https://www.linkedin.com/company/ascendifyy",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-18">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
