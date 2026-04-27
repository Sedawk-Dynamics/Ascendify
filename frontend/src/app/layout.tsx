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
   icons: {
    icon: '/AscendifyLogo.png', // Reference from the public folder
  },
  title: "Ascendify - Your Passport to a Dream Career",
  description:
    "Empowering future leaders through industry-led cohort programs, expert mentorship, and guaranteed career outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-18">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
