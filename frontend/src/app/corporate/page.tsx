"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/Button";
import {
  UserCheck,
  BookOpen,
  TrendingUp,
  Send,
  CheckCircle,
  AlertCircle,
  Building2,
  Users,
  Award,
} from "lucide-react";

const benefits = [
  {
    icon: UserCheck,
    title: "Hire Ready Talent",
    description:
      "Access a curated pool of job-ready graduates trained with the latest industry skills and real-world project experience.",
  },
  {
    icon: BookOpen,
    title: "Custom Cohorts",
    description:
      "Design tailored training programs aligned with your company's specific technology stack, culture, and hiring needs.",
  },
  {
    icon: TrendingUp,
    title: "Upskill Workforce",
    description:
      "Invest in your existing team with targeted upskilling programs that boost productivity and retention.",
  },
];

const partnershipOptions = [
  "Hiring Partnership",
  "Custom Training Program",
  "Workforce Upskilling",
  "Campus Partnership",
  "Other",
];

export default function CorporatePage() {
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    partnershipInterest: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5001/api/corporate", {
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
          partnershipInterest: "",
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
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            For Businesses
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Partner With <span className="text-cyan">Ascendify</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            Bridge the talent gap with our industry-trained graduates and
            customized corporate training programs.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Why <span className="gradient-text">Partner</span> With Us?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We offer flexible partnership models designed to meet your
              organization&apos;s talent and training needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-light-bg rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
                  <b.icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg text-text-heading mb-3">
                  {b.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats + Form */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: Stats + Description */}
            <div>
              <h2 className="text-3xl font-bold text-text-heading mb-6">
                Trusted by <span className="gradient-text">Leading Companies</span>
              </h2>
              <p className="text-text-muted leading-relaxed mb-8">
                Our corporate partners benefit from access to a talent pool that
                is rigorously trained, project-experienced, and interview-ready.
                We work closely with HR and tech teams to ensure alignment
                between training outcomes and hiring requirements.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center bg-white rounded-xl p-5">
                  <Building2 size={24} className="text-indigo mx-auto mb-2" />
                  <p className="text-2xl font-bold gradient-text">35+</p>
                  <p className="text-text-muted text-xs">Partner Companies</p>
                </div>
                <div className="text-center bg-white rounded-xl p-5">
                  <Users size={24} className="text-indigo mx-auto mb-2" />
                  <p className="text-2xl font-bold gradient-text">500+</p>
                  <p className="text-text-muted text-xs">Placed Candidates</p>
                </div>
                <div className="text-center bg-white rounded-xl p-5">
                  <Award size={24} className="text-indigo mx-auto mb-2" />
                  <p className="text-2xl font-bold gradient-text">95%</p>
                  <p className="text-text-muted text-xs">Satisfaction Rate</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-text-heading mb-6">
                Partnership Inquiry
              </h3>

              {status === "success" && (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <CheckCircle size={18} />
                  <span className="text-sm">Thank you! Our team will contact you shortly.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
                  <AlertCircle size={18} />
                  <span className="text-sm">Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm transition-all"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactPerson}
                    onChange={(e) =>
                      setForm({ ...form, contactPerson: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm transition-all"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={(e) =>
                      setForm({ ...form, workEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm transition-all"
                    placeholder="jane@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-heading mb-1.5">
                    Partnership Interest
                  </label>
                  <select
                    required
                    value={form.partnershipInterest}
                    onChange={(e) =>
                      setForm({ ...form, partnershipInterest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm transition-all bg-white"
                  >
                    <option value="">Select an option</option>
                    {partnershipOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <PrimaryButton type="submit" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Inquiry <Send size={16} className="ml-2" />
                    </>
                  )}
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
