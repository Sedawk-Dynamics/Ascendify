"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Users,
  Award,
  TrendingUp,
  BookOpen,
  Target,
  Briefcase,
  Globe,
  GraduationCap,
  BarChart3,
  Shield,
  Handshake,
  Star,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Customized Training Programs",
    description:
      "Tailored workforce training aligned with your corporate objectives.",
  },
  {
    icon: GraduationCap,
    title: "Top Institution Grade Learning",
    description:
      "Programs designed by professionals from industry and IIMs, CA, CFA & Other globally recognised professional bodies, and top finance professionals for globally recognized credentials.",
  },
  {
    icon: BookOpen,
    title: "Extensive Course Portfolio",
    description:
      "From Finance to strategy to AI and office automation — covering all verticals.",
  },
  {
    icon: Users,
    title: "Hire-Ready Talent Pipeline",
    description:
      "Access a curated pool of job-ready graduates trained with real-world projects and interview-focused preparation.",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Assessment",
    description:
      "AI-powered skill gap analysis to identify training needs and build targeted upskilling roadmaps for your team.",
  },
  {
    icon: Shield,
    title: "Dedicated Corporate Support",
    description:
      "Dedicated relationship manager, progress dashboards, and customized reporting for your organization.",
  },
];

const impactStats = [
  { value: "45%", label: "Higher Employee Retention", icon: Users },
  { value: "91%", label: "Productivity Increase", icon: TrendingUp },
  { value: "93%", label: "Achieved Measurable Growth", icon: BarChart3 },
  { value: "25+", label: "Corporate Partners", icon: Building2 },
];

const corporateBenefits = [
  "Exclusive corporate scholarships",
  "Customized training calendar",
  "Complimentary finance webinars",
  "On-site upskilling workshops",
  "Dedicated learning platform access",
  "Alumni network & placement support",
];

const clientLogos = [
  "Deloitte",
  "EY",
  "PWC",
  "BDO",
  "HDFC",
  "HSBC",
  "S&P Global",
  "PhilipCapital",
  "VERITY",
  "WADI Services",
];

const industries = [
  { icon: Briefcase, name: "Investment Banking" },
  { icon: BarChart3, name: "Corporate Finance" },
  { icon: TrendingUp, name: "Equity Research" },
  { icon: Globe, name: "Management Consulting" },
  { icon: Shield, name: "Risk & Compliance" },
  { icon: Target, name: "Financial Planning" },
];

const partnershipOptions = [
  "Workforce Upskilling",
  "Hiring Partnership",
  "Custom Training Program",
  "Campus Partnership",
  "Other",
];

export default function CorporatePage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    phone: "",
    employeeCount: "",
    partnershipInterest: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/corporate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          companyName: "",
          contactPerson: "",
          workEmail: "",
          phone: "",
          employeeCount: "",
          partnershipInterest: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
                Corporate Connect
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Strengthen Your Team&apos;s{" "}
                <span className="text-cyan">Technical</span> Skills
              </h1>
              <p className="text-text-on-dark text-lg leading-relaxed mb-8 max-w-lg">
                Amplify employee performance with industry-led upskilling
                programs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#inquiry"
                  className="inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all cursor-pointer"
                >
                  Partner With Us <ArrowRight size={18} className="ml-2" />
                </a>
                <a
                  href="#programs"
                  className="inline-flex items-center px-8 py-3 rounded-lg font-semibold border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition-all cursor-pointer"
                >
                  Explore Programs
                </a>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center"
                >
                  <stat.icon size={24} className="text-cyan mx-auto mb-2" />
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-text-on-dark mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-muted text-sm mb-6">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo, i) => (
              <span
                key={i}
                className="text-gray-400 font-bold text-lg tracking-wider"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="programs" className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              One-Stop <span className="gradient-text">Corporate Training</span>{" "}
              Solution
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Comprehensive workforce development programs designed to bridge
              skill gaps and drive business outcomes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-7 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5">
                  <s.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg text-text-heading mb-2">
                  {s.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Domains */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Domains We <span className="gradient-text">Cover</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Specialized training across key finance and strategy verticals.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-light-bg rounded-xl p-5 text-center hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                  <ind.icon size={20} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-text-heading">
                  {ind.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Why Partner */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-heading mb-6">
                Why Companies{" "}
                <span className="gradient-text">Choose Ascendify</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Our corporate partners benefit from access to a talent pool
                rigorously trained with real-world projects, case studies, and
                interview-focused preparation. We work closely with HR and
                leadership teams to ensure training outcomes align with business
                goals.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {corporateBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <p className="text-sm text-text-muted-alt">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual stats */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-text-heading mb-6 text-center">
                Training Impact
              </h3>
              <div className="space-y-6">
                {impactStats.map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-text-heading">
                        {stat.label}
                      </p>
                      <p className="text-sm font-bold gradient-text">
                        {stat.value}
                      </p>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full"
                        style={{
                          width:
                            stat.value.includes("%")
                              ? stat.value
                              : "80%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo/10 text-indigo mb-4">
                Get Started
              </span>
              <h2 className="text-3xl font-bold text-text-heading mb-6">
                Let&apos;s Build Your Team&apos;s{" "}
                <span className="gradient-text">Future Together</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Fill out the form and our corporate partnerships team will reach
                out within 24 hours to discuss a tailored training solution for
                your organization.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 bg-light-bg rounded-xl p-4">
                  <Handshake size={24} className="text-indigo shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-text-heading">
                      Flexible Partnership Models
                    </p>
                    <p className="text-xs text-text-muted">
                      Hiring, upskilling, campus, or custom programs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-light-bg rounded-xl p-4">
                  <Globe size={24} className="text-indigo shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-text-heading">
                      Pan-India &amp; Global Reach
                    </p>
                    <p className="text-xs text-text-muted">
                      Training teams across 3+ countries
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-light-bg rounded-xl p-4">
                  <Award size={24} className="text-indigo shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-text-heading">
                      Certified Programs
                    </p>
                    <p className="text-xs text-text-muted">
                      Industry-recognized certifications on completion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-light-bg rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-text-heading mb-6">
                Corporate Partnership Inquiry
              </h3>

              {status === "success" && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <CheckCircle size={18} />
                  <span className="text-sm">
                    Thank you! Our team will contact you shortly.
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <AlertCircle size={18} />
                  <span className="text-sm">
                    Something went wrong. Please try again.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) =>
                        setForm({ ...form, companyName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactPerson}
                      onChange={(e) =>
                        setForm({ ...form, contactPerson: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.workEmail}
                      onChange={(e) =>
                        setForm({ ...form, workEmail: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                      placeholder="+91 9999999999"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Employee Count
                    </label>
                    <select
                      value={form.employeeCount}
                      onChange={(e) =>
                        setForm({ ...form, employeeCount: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm bg-white"
                    >
                      <option value="">Select</option>
                      <option value="1-50">1-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-heading mb-1.5">
                      Partnership Interest{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.partnershipInterest}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          partnershipInterest: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm bg-white"
                    >
                      <option value="">Select an option</option>
                      {partnershipOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Tell us about your training needs
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm resize-none"
                    placeholder="Describe your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all cursor-pointer disabled:opacity-60"
                >
                  {status === "loading" ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Inquiry <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
