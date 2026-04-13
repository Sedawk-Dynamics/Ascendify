import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, ExternalLink, Share2, Link2 } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/cohorts", label: "Our Cohorts" },
  { href: "/corporate", label: "Corporate Connect" },
  { href: "/contact", label: "Contact Us" },
];

const resources = [
  { href: "/verify", label: "Verify Certificate" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/Ascendify.png"
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
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-text-on-dark text-sm">
                <MapPin size={16} className="mt-0.5 text-cyan flex-shrink-0" />
                Bangalore, India
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
