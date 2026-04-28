"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

const alumniCompanies = [
  "PwC",
  "Deloitte",
  "KPMG",
  "Evalueserve",
  "CIEL",
  "Northern Trust",
  "Acuity",
];

const experienceOptions = ["0-2", "2-4", "4-6", "6+"];
const salaryOptions = [
  "4LPA - 6LPA",
  "6LPA - 8LPA",
  "8LPA - 10LPA",
  "10LPA+",
];

export default function HireFromUsPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    companyName: "",
    hiringPosition: "",
    numberOfOpenings: "",
    yearOfExperience: "",
    salaryOffering: "",
    requirements: "",
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
        body: JSON.stringify({
          companyName: form.companyName,
          contactPerson: form.fullName,
          workEmail: form.email,
          phone: form.contact,
          partnershipInterest: "Hiring Partnership",
          message: `Position: ${form.hiringPosition}\nOpenings: ${form.numberOfOpenings}\nExperience: ${form.yearOfExperience}\nSalary: ${form.salaryOffering}\n\n${form.requirements}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          fullName: "",
          email: "",
          contact: "",
          companyName: "",
          hiringPosition: "",
          numberOfOpenings: "",
          yearOfExperience: "",
          salaryOffering: "",
          requirements: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      email: "",
      contact: "",
      companyName: "",
      hiringPosition: "",
      numberOfOpenings: "",
      yearOfExperience: "",
      salaryOffering: "",
      requirements: "",
    });
    setStatus("idle");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 via-purple-50 to-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-indigo leading-tight mb-6">
            Handpicked. Industry-Tested.
            <br />
            Ready to Deliver.
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto mb-8">
            Our talent pool is not just trained; they&apos;ve been tested in
            real-world finance scenarios, ready to make an impact from day one.
          </p>
          <a
            href="#hiring-form"
            className="inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all cursor-pointer"
          >
            Start Hiring <ArrowRight size={18} className="ml-2" />
          </a>

          {/* Alumni Logos */}
          <div className="mt-16">
            <p className="text-text-heading font-semibold text-lg mb-6">
              Our Alumni work at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {alumniCompanies.map((company, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl px-4 sm:px-8 py-3 sm:py-4 shadow-sm border border-gray-100 text-gray-500 font-bold text-sm sm:text-lg tracking-wider"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Form */}
      <section id="hiring-form" className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-3">
              Find your Dream Finance Hire Here
            </h2>
            <p className="text-text-muted text-sm">
              Tell us your hiring needs, and we&apos;ll connect you with
              top-tier finance professionals who match your requirements.
            </p>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Your Company Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Contact<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={form.contact}
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Your Contact Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Company Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Hiring Position<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.hiringPosition}
                onChange={(e) =>
                  setForm({ ...form, hiringPosition: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Hiring For?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Number of opening<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.numberOfOpenings}
                onChange={(e) =>
                  setForm({ ...form, numberOfOpenings: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Number of opening for the position?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Year of Experience<span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.yearOfExperience}
                onChange={(e) =>
                  setForm({ ...form, yearOfExperience: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm bg-white"
              >
                <option value="">Select</option>
                {experienceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Salary Offering<span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.salaryOffering}
                onChange={(e) =>
                  setForm({ ...form, salaryOffering: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm bg-white"
              >
                <option value="">Select</option>
                {salaryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-heading mb-1.5">
                Requirements / Description
              </label>
              <textarea
                value={form.requirements}
                onChange={(e) =>
                  setForm({ ...form, requirements: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm"
                placeholder="Description"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all cursor-pointer disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center px-8 py-3 rounded-lg font-semibold border border-gray-300 text-text-muted hover:bg-gray-50 transition-all cursor-pointer"
              >
                Reset <RotateCcw size={14} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-3">
            Looking for More Info? Drop Us a Line!
          </h2>
          <p className="text-text-muted text-sm mb-4">
            For any queries, feel free to reach out to our team
          </p>
          <a
            href="mailto:talent@ascendify.com"
            className="text-indigo font-semibold text-lg hover:underline"
          >
            talent@ascendify.in
          </a>
        </div>
      </section>
    </>
  );
}
