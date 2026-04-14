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
} from "lucide-react";

// --- Data ---

const whyAscendify = [
  "Learn directly from Investment Banking, Corporate Finance & Strategic Consulting professionals",
  "Hands-on case studies & real company modeling",
  "Interview-focused training (not theoretical learning)",
  "Structured cohort-based learning with accountability",
  "Designed for MBA, BBA, BCom, CFA & Economics students",
  "Customized workforce training program under corporate connect to train your corporate employees with relevant industry finance & strategy skills",
];

const testimonials = [
  {
    name: "Krishna Mulchandani",
    role: "Student TVS",
    text: "This cohort changed my perspective on finance. I rated myself 0 in Excel and PPT, but through live classes and report-making, I built confidence. Case studies and discussions on news and markets made learning practical. These skills will stay with me for life.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Bhaskar Pintu Pal",
    role: "Student TVS",
    text: "This cohort shaped my future. Parth Sir's simple yet powerful teaching gave me finance knowledge, business insights, and life advice. He guided us like a big brother. Report-making, market discussions, and the learning community created here are invaluable. This is more than a course — it's family.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Kamini Rathore",
    role: "FMBV 7 Batch",
    text: "Journey in Finocontrol is good exciting learning. Joining Finocontrol is really inspiring motivating and learning new skills. Faculty in Finocontrol is good and helpful.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Rinky",
    role: "FMBV 7 Batch",
    text: "Finocontrol has been great, actually learned what value a financial model can add to your work and how to actually mould yourself according to your work role in the corporate.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Kamini Rathore",
    role: "V 9 Batch",
    text: "Training by finocontrol turned out to be a direct investment in my future. The sessions were amazing.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
];

const studentPhotos = [
  {
    name: "Harshil",
    image:
      "https://images.unsplash.com/photo-1616728558188-101a6d4d0338?w=400&h=500&fit=crop",
  },
  {
    name: "Prannjal",
    image:
      "https://images.unsplash.com/photo-1726660194879-401a012b1ee3?w=400&h=500&fit=crop",
  },
  {
    name: "Ashish",
    image:
      "https://images.unsplash.com/photo-1698072556534-40ec6e337311?w=400&h=500&fit=crop",
  },
  {
    name: "Sahil",
    image:
      "https://images.unsplash.com/photo-1653379673133-cb7ea2197a63?w=400&h=500&fit=crop",
  },
  {
    name: "Rinky",
    image:
      "https://images.unsplash.com/photo-1653379673174-f8a9138a39b0?w=400&h=500&fit=crop",
  },
];

const partnerLogos = [
  "WADI Services",
  "PhilipCapital",
  "PWC",
  "S&P Global",
  "VERITY",
];

// --- Student Slider ---

function StudentSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const speed = 1;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const items = [...studentPhotos, ...studentPhotos];

  return (
    <div className="mt-16 overflow-hidden">
      <div ref={scrollRef} className="flex gap-6 overflow-hidden">
        {items.map((student, i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-44 h-52 rounded-3xl overflow-hidden shadow-lg bg-gray-200">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base font-semibold text-text-heading">
              {student.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Alumni Showcase ---

function AlumniShowcase() {
  return (
    <div className="mt-20 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative flex items-center justify-center min-h-[520px]">
          {/* Purple circle with person */}
          <div className="relative" style={{ width: 400, height: 400 }}>
            {/* Outer border circle */}
            <div
              className="absolute border-2 border-indigo/20"
              style={{
                width: 416,
                height: 416,
                borderRadius: "30%",
                top: -8,
                left: -8,
              }}
            />
            {/* Purple filled circle */}
            <div
              className="bg-gradient-to-b from-purple-500 to-indigo"
              style={{
                width: 400,
                height: 400,
                borderRadius: "30%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Person image fully visible inside circle */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=face"
                alt="Professional Alumni"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Floating card - Countries */}
          <div className="absolute top-4 left-4 md:left-50 md:top-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[180px]">
            <p className="text-text-muted text-xs mb-1">clients across</p>
            <p className="text-4xl font-bold text-text-heading">
              8+{" "}
              <span className="text-base font-semibold text-text-muted">
                Countries
              </span>
            </p>
          </div>

          {/* Floating card - Alumni */}
          <div className="absolute bottom-0 left-0 md:left-40  bg-white rounded-2xl shadow-xl p-5 border border-gray-100 max-w-[220px]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs">Over</p>
              <GraduationCap size={18} className="text-indigo" />
            </div>
            <p className="text-4xl font-bold text-text-heading">
              10,000+{" "}
              <span className="text-base font-semibold text-text-muted">
                Alumni&apos;s
              </span>
            </p>
            <p className="text-xs text-text-muted mt-2 leading-relaxed">
              Proven track record of producing industry-ready professionals.
            </p>
          </div>

          {/* Floating card - Testimonial Slider */}
          <AlumniTestimonialSlider />

          {/* Dashboard decorative element */}
          <div className="absolute top-0 right-16 w-32 h-24 bg-white/80 rounded-xl shadow-md border border-gray-100 hidden md:flex items-center justify-center">
            <div className="space-y-2 w-full px-3">
              <div className="h-1.5 bg-indigo/20 rounded-full w-full" />
              <div className="h-1.5 bg-cyan/20 rounded-full w-3/4" />
              <div className="h-1.5 bg-indigo/20 rounded-full w-1/2" />
              <div className="flex gap-1 mt-2">
                <div className="w-3 h-6 bg-indigo/30 rounded-sm" />
                <div className="w-3 h-8 bg-cyan/30 rounded-sm" />
                <div className="w-3 h-5 bg-indigo/30 rounded-sm" />
                <div className="w-3 h-7 bg-cyan/30 rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Alumni work at */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-text-heading italic">
            Our Alumni work at
          </h3>
        </div>
      </div>
    </div>
  );
}

// --- Alumni Testimonial Slider (floating card) ---

function AlumniTestimonialSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-[160px] right-0 md:right-18 bg-white rounded-2xl shadow-xl border border-gray-100 w-[280px] overflow-hidden">
      <div className="relative h-[180px]">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0 p-5 transition-all duration-700 ease-in-out"
            style={{
              transform: `translateX(${((i - idx + testimonials.length) % testimonials.length) * 100 - ((i - idx + testimonials.length) % testimonials.length > testimonials.length / 2 ? testimonials.length * 100 : 0)}%)`,
              opacity: i === idx ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <p className="font-bold text-sm text-text-heading">{t.name}</p>
                <p className="text-xs text-text-muted">{t.role}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-semibold">{t.rating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={10}
                        className={
                          j < Math.floor(t.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-text-muted-alt leading-relaxed line-clamp-4">
              {t.text}
            </p>
          </div>
        ))}
      </div>
      {/* Dots + Progress */}
      <div className="px-5 pb-3 flex items-center justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-500 ${
              i === idx ? "w-5 gradient-primary" : "w-1.5 bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Testimonial Slider ---

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="w-full shrink-0 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className={
                      j < Math.floor(t.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : j < t.rating
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-text-muted-alt text-base leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-text-heading">{t.name}</p>
                  <p className="text-sm text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === current ? "bg-indigo w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
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
      await fetch("/_/backend/api/contact", {
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

            {/* What describes you well */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-heading mb-2">
                What describes you well?
              </label>
              {["Achiever", "Extra Miler", "Slow Learner"].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-1">
                  <input type="checkbox" className="accent-indigo" />
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
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Build a Career in{" "}
              <span className="text-cyan">
                Finance &amp; Strategic Consulting
              </span>{" "}
              — Not Just a Degree
            </h1>
            <p className="text-lg text-text-on-dark leading-relaxed mb-8 max-w-3xl">
              Master Financial Modeling, Equity Research, Valuation, Investment
              Banking &amp; Management Consulting Skills with Industry-Led Live
              Cohorts designed for real-world roles.
            </p>

            {/* World Map Stats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={20} className="text-cyan" />
                <span className="text-sm text-text-on-dark">
                  Students across the world
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <Globe size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">3+</p>
                    <p className="text-xs text-text-on-dark">Countries</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <BookOpen size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">6+</p>
                    <p className="text-xs text-text-on-dark">
                      Upskilling Courses
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                    <Building2 size={18} className="text-cyan" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">3+</p>
                    <p className="text-xs text-text-on-dark">
                      Top Colleges (Incl. IIM)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Success tagline */}
            <p className="text-lg font-semibold text-white mb-6">
              Your Success measures Our Success
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo/30 cursor-pointer"
              >
                Talk with our team
              </button>
              <a
                href="/cohorts"
                className="inline-flex items-center px-8 py-3 rounded-lg font-semibold border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition-all duration-300 cursor-pointer"
              >
                Explore Courses
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-3 rounded-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                Join free Workshops
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why ASCENDIFY? */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Why <span className="gradient-text">ASCENDIFY</span>?
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-5">
              {whyAscendify.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-light-bg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <p className="text-text-muted-alt leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Students Say */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">
              REVIEWS
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto font-medium">
              Listen from successful professionals who transformed their careers
              with Ascendify. Here are their inspiring stories
            </p>
          </div>

          {/* Testimonial Slider */}
          <TestimonialSlider />

          {/* Student Slider - Auto sliding */}
          <StudentSlider />

          {/* Partner Logos Marquee */}
          <div className="mt-14 border-t border-gray-200 pt-10 overflow-hidden">
            <div className="flex animate-[marquee_20s_linear_infinite] gap-16 items-center w-max">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <span
                  key={i}
                  className="text-gray-400 font-bold text-xl tracking-wider whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>

          {/* Alumni Showcase Section */}
          <AlumniShowcase />
        </div>
      </section>
    </>
  );
}
