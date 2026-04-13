"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/Button";
import {
  GraduationCap,
  Clock,
  Users,
  Star,
  ArrowRight,
  BookOpen,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

interface Program {
  _id: string;
  title: string;
  description: string;
  image?: string;
  duration?: string;
  category?: string;
  studentsEnrolled?: number;
  rating?: number;
}

const heroStats = [
  { icon: BookOpen, value: "60+", label: "Courses" },
  { icon: TrendingUp, value: "95%", label: "Placement Rate" },
  { icon: IndianRupee, value: "4.5L", label: "Avg Salary" },
];

export default function CohortsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/programs")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.programs || [];
        setPrograms(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            Our Programs
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Explore Our <span className="text-cyan">Cohorts</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto mb-10">
            Industry-designed programs that combine live learning, hands-on
            projects, and placement support to accelerate your career.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {heroStats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <s.icon size={22} className="text-cyan" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-xl">{s.value}</p>
                  <p className="text-xs text-text-on-dark">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-50 rounded animate-pulse" />
                    <div className="h-4 bg-gray-50 rounded animate-pulse w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div
                  key={prog._id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 gradient-primary relative overflow-hidden">
                    {prog.image ? (
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap
                          size={48}
                          className="text-white/40"
                        />
                      </div>
                    )}
                    {prog.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        {prog.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-text-heading mb-2 group-hover:text-indigo transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                      {prog.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-text-muted-light mb-4">
                      {prog.duration && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {prog.duration}
                        </span>
                      )}
                      {prog.studentsEnrolled && (
                        <span className="flex items-center gap-1">
                          <Users size={14} /> {prog.studentsEnrolled}+
                        </span>
                      )}
                      {prog.rating && (
                        <span className="flex items-center gap-1">
                          <Star
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />{" "}
                          {prog.rating}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-sm font-semibold text-indigo hover:text-cyan transition-colors"
                    >
                      Enroll Now <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <GraduationCap
                size={48}
                className="text-text-muted-light mx-auto mb-4"
              />
              <p className="text-text-muted text-lg">
                Programs are loading or unavailable at the moment.
              </p>
              <p className="text-text-muted-light text-sm mt-1">
                Please check back later or contact us for more information.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Can&apos;t Find the <span className="text-cyan">Right Program</span>?
          </h2>
          <p className="text-text-on-dark text-lg mb-8 max-w-2xl mx-auto">
            Reach out to our team and we will help you find the perfect cohort
            for your career goals.
          </p>
          <PrimaryButton href="/contact">
            Talk to Our Counsellors <ArrowRight size={18} className="ml-2" />
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
