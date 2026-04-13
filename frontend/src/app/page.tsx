"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PrimaryButton, OutlineButton } from "@/components/Button";
import {
  GraduationCap,
  Users,
  Award,
  Globe,
  Star,
  ArrowRight,
  Clock,
  BarChart3,
  TrendingUp,
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

const stats = [
  { value: "500+", label: "Alumni Network" },
  { value: "35+", label: "Hiring Partners" },
  { value: "95%", label: "Placement Rate" },
  { value: "4.8", label: "Student Rating" },
];

const features = [
  {
    icon: GraduationCap,
    title: "Industry-Led Cohorts",
    description:
      "Learn from curated programs designed with top industry professionals and real-world projects.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Get 1-on-1 guidance from mentors who have built careers at leading global companies.",
  },
  {
    icon: Award,
    title: "Guaranteed Placements",
    description:
      "Our placement-first approach ensures you land your dream role with top employers.",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description:
      "Earn certificates recognized by industry leaders across the globe.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    text: "Ascendify completely transformed my career. The mentorship and placement support were incredible. I landed my dream job within weeks of completing the cohort.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Product Manager at Microsoft",
    text: "The cohort-based learning approach made all the difference. I built real projects, connected with industry leaders, and gained skills that employers actually value.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Data Analyst at Amazon",
    text: "From a non-tech background to a data role at Amazon - Ascendify made it possible. The structured curriculum and career support are unmatched.",
    rating: 5,
  },
];

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/programs")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.programs || [];
        setPrograms(list.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
                Empowering Future Leaders
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Passport to a{" "}
                <span className="text-cyan">Dream Career</span>
              </h1>
              <p className="text-lg text-text-on-dark leading-relaxed mb-8 max-w-lg">
                Join India&apos;s most transformative cohort-based learning
                platform. Get mentored by industry experts, build real projects,
                and land your dream career.
              </p>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton href="/cohorts">
                  Explore Cohorts <ArrowRight size={18} className="ml-2" />
                </PrimaryButton>
                <OutlineButton href="/about">Learn More</OutlineButton>
              </div>
            </div>

            {/* Right side - visual */}
            <div className="relative hidden lg:block">
              <div className="w-full aspect-square max-w-md mx-auto rounded-2xl gradient-primary opacity-20" />
              <div className="absolute top-8 right-8 glass-card rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="font-bold text-lg">95%</p>
                  <p className="text-xs text-text-on-dark">Placement Rate</p>
                </div>
              </div>
              <div className="absolute bottom-12 left-4 glass-card rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div>
                  <p className="font-bold text-lg">500+</p>
                  <p className="text-xs text-text-on-dark">Alumni Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`text-center ${
                  i < stats.length - 1
                    ? "md:border-r md:border-gray-200"
                    : ""
                }`}
              >
                <p className="text-3xl lg:text-4xl font-bold gradient-text">
                  {stat.value}
                </p>
                <p className="text-text-muted text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              What Makes Us <span className="gradient-text">Exceptional</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We combine industry expertise, cutting-edge curriculum, and
              personalized mentorship to deliver career-transforming outcomes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-lg gradient-primary flex items-center justify-center mb-5">
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg text-text-heading mb-2">
                  {f.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Explore Our <span className="gradient-text">Cohorts</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Choose from our carefully curated programs designed to fast-track
              your career growth.
            </p>
          </div>

          {programs.length > 0 ? (
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
                          <Users size={14} /> {prog.studentsEnrolled}+ students
                        </span>
                      )}
                      {prog.rating && (
                        <span className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400" />{" "}
                          {prog.rating}
                        </span>
                      )}
                    </div>
                    <Link
                      href="/cohorts"
                      className="inline-flex items-center text-sm font-semibold text-indigo hover:text-cyan transition-colors"
                    >
                      Learn More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
          )}

          <div className="text-center mt-10">
            <PrimaryButton href="/cohorts">
              View All Cohorts <ArrowRight size={18} className="ml-2" />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Hear from our alumni who have transformed their careers through
              Ascendify.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-text-muted-alt text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-heading">
                      {t.name}
                    </p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="gradient-hero text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-cyan rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to <span className="text-cyan">Ascend</span> Your Career?
          </h2>
          <p className="text-text-on-dark text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
            with Ascendify. Your dream career is just one cohort away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PrimaryButton href="/cohorts">Get Started Today</PrimaryButton>
            <OutlineButton href="/contact">Talk to Us</OutlineButton>
          </div>
        </div>
      </section>
    </>
  );
}
