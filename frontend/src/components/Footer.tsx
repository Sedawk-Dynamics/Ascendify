import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Share2,
  Link2,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/cohorts", label: "Our Cohorts" },
  { href: "/corporate", label: "Corporate Connect" },
  { href: "/contact", label: "Contact Us" },
];

const resources = [
  { href: "/verify", label: "Verify Certificate" },
  { href: "/blog", label: "Blog" },
  { href: "/hire-from-us", label: "Hire from Us" },
  { href: "/job-board", label: "Job Board" },
  { href: "/case-studies", label: "Case Studies" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/AscendifyLogo.png"
              alt="Ascendify"
              width={140}
              height={50}
              className="h-10 w-auto mb-4 brightness-200"
            />

            <p className="text-text-on-dark text-sm leading-relaxed">
              Empowering future leaders through industry-led cohort programs,
              expert mentorship, and guaranteed career outcomes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-on-dark text-sm hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-on-dark text-sm hover:text-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-on-dark text-sm">
                <Mail size={16} className="mt-0.5 text-cyan flex-shrink-0" />
                info@ascendify.in
              </li>
              <li className="flex items-start gap-3 text-text-on-dark text-sm">
                <Phone size={16} className="mt-0.5 text-cyan flex-shrink-0" />
                +91 86970 09762
              </li>
              <li className="flex items-start gap-3 text-text-on-dark text-sm">
                <MapPin size={16} className="mt-0.5 text-cyan flex-shrink-0" />
                Mumbai, India
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/ascendify-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-text-on-dark text-sm hover:text-cyan transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 text-cyan flex-shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Ascendify
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-on-dark text-sm">
            &copy; {new Date().getFullYear()} Ascendify. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[Globe, ExternalLink, Share2, Link2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-text-on-dark hover:text-cyan transition-colors"
                aria-label="Social link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
