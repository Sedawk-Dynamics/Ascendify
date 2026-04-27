"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star,
  ArrowRight,
  X,
  Globe,
  BookOpen,
  Building2,
  CheckCircle2,
  Briefcase,
  Target,
  GraduationCap,
  Users,
  FileText,
  TrendingUp,
  Quote,
  Play,
  Award,
  BarChart3,
  Zap,
  ChevronRight,
} from "lucide-react";

// --- Data ---

const whyAscendify = [
  {
    icon: Users,
    title: "Industry Experts",
    text: "Learn directly from Investment Banking, Corporate Finance & Strategic Consulting professionals",
  },
  {
    icon: BarChart3,
    title: "Real Case Studies",
    text: "Hands-on case studies & real company modeling",
  },
  {
    icon: Target,
    title: "Interview-Focused",
    text: "Interview-focused training (not theoretical learning)",
  },
  {
    icon: GraduationCap,
    title: "Cohort Learning",
    text: "Structured cohort-based learning with accountability",
  },
  {
    icon: Award,
    title: "For All Backgrounds",
    text: "Designed for MBA, BBA, BCom, CFA & Economics students",
  },
  {
    icon: Building2,
    title: "Corporate Connect",
    text: "Customized workforce training program under corporate connect to train your corporate employees with relevant industry finance, technical tools & AI skills",
  },
];

const stats = [
  { value: "3+", label: "Countries", icon: Globe },
  { value: "5+", label: "Upskilling Courses", icon: BookOpen },
  { value: "5+", label: "Top Colleges (Incl. IIM)", icon: Building2 },
  { value: "100+", label: "Students Trained", icon: Users },
];

const testimonials = [
  {
    name: "Krishna Mulchandani",
    role: "Student TVS",
    text: "This cohort changed my perspective on finance. I rated myself 0 in Excel and PPT, but through live classes and report-making, I built confidence. Case studies and discussions on news and markets made learning practical. These skills will stay with me for life.",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Bhaskar Pintu Pal",
    role: "Student TVS",
    text: "This cohort shaped my future. Parth Sir's simple yet powerful teaching gave me finance knowledge, business insights, and life advice. He guided us like a big brother. Report-making, market discussions, and the learning community created here are invaluable. This is more than a course — it's family.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Kamini Rathore",
    role: "FMBV 7 Batch",
    text: "Journey in Finocontrol is good exciting learning. Joining Finocontrol is really inspiring motivating and learning new skills. Faculty in Finocontrol is good and helpful.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Rinky",
    role: "FMBV 7 Batch",
    text: "Finocontrol has been great, actually learned what value a financial model can add to your work and how to actually mould yourself according to your work role in the corporate.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const partnerLogos = [
  "WADI Services",
  "PhilipCapital",
  "PWC",
  "S&P Global",
  "VERITY",
];

const jobProfiles = [
  {
    icon: FileText,
    title: "Resume Building",
    text: "Finance-ready resume and LinkedIn optimisation",
    color: "from-indigo to-purple-500",
  },
  {
    icon: Target,
    title: "Interview Prep",
    text: "Technical interview prep: valuation, accounting, DCF, ratios, case rounds",
    color: "from-cyan to-teal-400",
  },
  {
    icon: Briefcase,
    title: "Job Placement",
    text: "Hiring guidance for IB / ER / Corp Finance / Consulting roles",
    color: "from-indigo to-cyan",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    text: "Networking and career mentorship + Live projects and case studies for portfolio proof",
    color: "from-purple-500 to-indigo",
  },
];

// --- Animated Counter ---

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const num = parseInt(value);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const increment = Math.max(1, Math.floor(num / 40));
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            setCount(current);
          }, 30);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="text-3xl lg:text-4xl font-bold">
      {count}
      {suffix}
    </div>
  );
}

// --- Testimonial Slider ---

function TestimonialSlider() {
  return (
    <div className="mt-12 relative">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} size={18} className="text-gray-200" />
          ))}
        </div>
        <p className="text-text-muted text-lg font-medium mb-2">
          Student Reviews
        </p>
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
          Pending
        </span>
        <p className="text-text-muted text-sm mt-4">
          Reviews from our students will be displayed here soon.
        </p>
      </div>
    </div>
  );
}

// --- Contact Form Modal ---

function ContactFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    contact: "",
    state: "",
    graduationYear: "",
    workExperience: "",
    highestAcademic: "",
    interestedToEnroll: "",
    willingFinanceCareer: "",
    studentOrProfessional: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-heading mb-2">
              Thank You!
            </h3>
            <p className="text-text-muted">
              We&apos;ll get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 rounded-lg gradient-primary text-white font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-xl font-bold text-text-heading mb-6">
              Talk with our team
            </h3>

            {/* Text fields */}
            {[
              {
                label: "Full Name",
                name: "fullName",
                placeholder: "Your Full Name",
                required: true,
              },
              {
                label: "Email Address",
                name: "email",
                placeholder: "Email",
                required: true,
              },
              {
                label: "WhatsApp Number",
                name: "whatsapp",
                placeholder: "Your WhatsApp Number",
                required: true,
              },
              {
                label: "Contact Number",
                name: "contact",
                placeholder: "Your Contact Number",
                required: true,
              },
              {
                label: "State you reside in?",
                name: "state",
                placeholder: "State Name",
              },
              {
                label: "Which year did you graduate?",
                name: "graduationYear",
                placeholder: "Graduation Year",
              },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-text-heading mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required={field.required}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo/30 focus:border-indigo outline-none"
                />
              </div>
            ))}

            {/* Work experience */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-heading mb-1">
                Do you have any previous working experience in the field of
                finance? If yes, please specify the domain?
              </label>
              <textarea
                name="workExperience"
                value={formData.workExperience}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo/30 focus:border-indigo outline-none"
              />
            </div>

            {/* Highest Academic Study */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-heading mb-2">
                Highest Academic Study Completed/ Pursuing?{" "}
                <span className="text-red-500">*</span>
              </label>
              {[
                "BCom/BBA/BA/BSc",
                "MBA/PGDM",
                "CA/CMA/ACCA",
                "CFA/CFP/FRM",
                "Other",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="highestAcademic"
                    value={option}
                    checked={formData.highestAcademic === option}
                    onChange={handleChange}
                    className="accent-indigo"
                  />
                  <span className="text-sm text-text-muted-alt">{option}</span>
                </label>
              ))}
            </div>

            {/* Interested to enroll */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-heading mb-2">
                Are you interested to enroll in this?{" "}
                <span className="text-red-500">*</span>
              </label>
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="interestedToEnroll"
                    value={option}
                    checked={formData.interestedToEnroll === option}
                    onChange={handleChange}
                    className="accent-indigo"
                  />
                  <span className="text-sm text-text-muted-alt">{option}</span>
                </label>
              ))}
            </div>

            {/* Willing to build career */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-heading mb-2">
                Are you willing to build a career in finance?{" "}
                <span className="text-red-500">*</span>
              </label>
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="willingFinanceCareer"
                    value={option}
                    checked={formData.willingFinanceCareer === option}
                    onChange={handleChange}
                    className="accent-indigo"
                  />
                  <span className="text-sm text-text-muted-alt">{option}</span>
                </label>
              ))}
            </div>

            {/* Student or professional */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-heading mb-2">
                Are you a student or working professional?
              </label>
              {["Student", "Working professional"].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="studentOrProfessional"
                    value={option}
                    checked={formData.studentOrProfessional === option}
                    onChange={handleChange}
                    className="accent-indigo"
                  />
                  <span className="text-sm text-text-muted-alt">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-lg gradient-primary text-white font-semibold cursor-pointer disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-text-muted font-semibold cursor-pointer hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// --- Home Page ---

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <ContactFormModal
        open={showContactForm}
        onClose={() => setShowContactForm(false)}
      />

      {/* Hero Section */}
      <section className="gradient-hero text-white relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo/5 rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                <span className="text-sm font-medium text-cyan">
                  Admissions Open for 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                Break into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal-300">
                  Core Finance Roles with Industry-Led
                </span>{" "}
                Live Cohorts
              </h1>
              <p className="text-lg text-text-on-dark leading-relaxed mb-10 max-w-xl">
                Structured, industry-led cohort programs designed for MBA, BBA, BCom, CFA & Economics students aiming for Investment Banking, Equity Research, Corporate Finance and Consulting roles.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo/30 hover:-translate-y-0.5 cursor-pointer"
                >
                  Download Curriculum
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <a
                  href="/cohorts"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  Upcoming Cohort
                </a>
              </div>

              {/* Tagline */}
              <p className="text-base text-text-on-dark flex items-center gap-2">
                <Zap size={16} className="text-cyan" />
                Learn the exact skills recruiters test in finance interviews
              </p>
            </div>

            {/* Right side - Hero Image */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <img
                  src="/hero-skyline.jpg"
                  alt="Skyscrapers financial district"
                  className="w-full h-[560px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/20" />

                {/* Floating stat card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">3+</p>
                      <p className="text-xs text-white/70">Countries</p>
                    </div>
                    <div className="border-x border-white/20">
                      <p className="text-2xl font-bold text-white">5+</p>
                      <p className="text-xs text-white/70">Courses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">5+</p>
                      <p className="text-xs text-white/70">Top Colleges</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo/20 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip - Mobile visible */}
      <section className="lg:hidden gradient-hero border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center mx-auto mb-2">
                  <stat.icon size={18} className="text-cyan" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos Strip */}
      <section className="bg-white border-b border-gray-100 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider text-center mb-4">
            Trusted by
          </p>
          <div className="overflow-hidden">
            <div className="flex animate-[marquee_20s_linear_infinite] gap-16 items-center w-max">
              {[...partnerLogos, ...partnerLogos, ...partnerLogos].map(
                (logo, i) => (
                  <span
                    key={i}
                    className="text-gray-300 font-bold text-lg tracking-wider whitespace-nowrap hover:text-gray-500 transition-colors"
                  >
                    {logo}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why ASCENDIFY? */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo/5 text-indigo mb-4">
              Our Difference
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-text-heading mb-4">
              Why <span className="gradient-text">ASCENDIFY</span>?
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              We don&apos;t just teach finance — we prepare you to get hired.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAscendify.map((item, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-light-bg hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-text-heading text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Securing a Core-Finance Job Profile */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-cyan rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-4">
              Career Outcomes
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Securing a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal-300">
                Core-Finance Job Profile
              </span>
            </h2>
            <p className="text-text-on-dark max-w-2xl mx-auto text-lg">
              Our structured approach helps you land roles in Investment
              Banking, Equity Research, Corporate Finance & Management
              Consulting.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobProfiles.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={24} className="text-white" />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-text-on-dark leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Students Say */}
      <section className="bg-light-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-indigo/5 text-indigo mb-4">
              REVIEWS
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-text-heading mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              Listen from successful professionals who transformed their careers
              with Ascendify
            </p>
          </div>

          {/* Testimonial Slider */}
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan/15 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Ready to Build Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-teal-300">
                  Finance Career
                </span>
                ?
              </h2>
              <p className="text-text-on-dark text-lg leading-relaxed mb-8">
                Join the next cohort and get mentored by top industry
                professionals. Limited seats available — start your journey
                today.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan text-navy-dark font-bold hover:bg-teal-300 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan/30 cursor-pointer"
                >
                  Talk to Us
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="/cohorts"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 transition-all cursor-pointer"
                >
                  View Cohorts
                </a>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">100+</p>
                <p className="text-sm text-text-on-dark">Students Placed</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">5+</p>
                <p className="text-sm text-text-on-dark">Industry Partners</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">4.8</p>
                <p className="text-sm text-text-on-dark">Avg. Rating</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-white mb-1">95%</p>
                <p className="text-sm text-text-on-dark">Completion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
