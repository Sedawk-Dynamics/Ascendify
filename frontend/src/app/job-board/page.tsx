"use client";

import {
  MapPin,
  Briefcase,
  Building2,
  ExternalLink,
  Search,
} from "lucide-react";
import { useState } from "react";

const jobs = [
  {
    title: "Financial Analyst",
    company: "KPMG",
    type: "Full-time",
    location: "Mumbai, India",
    url: "#",
  },
  {
    title: "Investment Banking Associate",
    company: "Ladderup",
    type: "Full-time",
    location: "Bangalore, India",
    url: "#",
  },
  {
    title: "Equity Research Intern",
    company: "Evalueserve",
    type: "Internship",
    location: "Gurgaon, India",
    url: "#",
  },
  {
    title: "Risk Analyst",
    company: "Northern Trust",
    type: "Full-time",
    location: "Pune, India",
    url: "#",
  },
  {
    title: "Corporate Finance Associate",
    company: "PwC",
    type: "Full-time",
    location: "Delhi, India",
    url: "#",
  },
  {
    title: "Wealth Management Trainee",
    company: "Acuity Knowledge Partners",
    type: "Part-time",
    location: "Mumbai, India",
    url: "#",
  },
  {
    title: "Financial Modelling Analyst",
    company: "CIEL HR",
    type: "Full-time",
    location: "Hyderabad, India",
    url: "#",
  },
  {
    title: "M&A Research Intern",
    company: "Deloitte",
    type: "Internship",
    location: "Bangalore, India",
    url: "#",
  },
];

const jobTypes = ["All", "Full-time", "Part-time", "Internship"];

export default function JobBoardPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = jobs.filter((job) => {
    const matchType = filter === "All" || job.type === filter;
    const matchSearch =
      search === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            Opportunities
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Find Your Next <span className="text-cyan">Finance Career</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            Browse curated job openings from top companies hiring Ascendify
            alumni and trained professionals.
          </p>
        </div>
      </section>

      {/* Filters & Jobs */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, company, or location..."
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo text-sm bg-white"
              />
            </div>
            <div className="flex gap-2">
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    filter === type
                      ? "gradient-primary text-white"
                      : "bg-white border border-gray-200 text-text-muted hover:border-indigo"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">
                No jobs found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((job, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-text-heading mb-3">
                    {job.title}
                  </h3>
                  <div className="space-y-2 mb-5 flex-1">
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Building2 size={16} className="text-indigo shrink-0" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <Briefcase size={16} className="text-indigo shrink-0" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                      <MapPin size={16} className="text-indigo shrink-0" />
                      {job.location}
                    </div>
                  </div>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white text-sm font-semibold gradient-primary hover:opacity-90 transition-all"
                  >
                    Apply Now <ExternalLink size={14} className="ml-2" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
