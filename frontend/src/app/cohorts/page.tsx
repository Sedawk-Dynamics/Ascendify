"use client";

import { useState } from "react";
import {
  Star,
  Users,
  Briefcase,
  Building2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Wifi,
  X,
} from "lucide-react";

const courses = [
  {
    id: "1",
    title: "Certified Financial Modeling & Business Valuations Associate",
    duration: "4 Months",
    price: "17,999",
    features: [
      "Live project-based learning with real companies",
      "Financial statement analysis & modeling",
      "Business valuation techniques (DCF, Comparable, Precedent)",
      "Industry expert mentors from top firms",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
  },
  {
    id: "2",
    title: "Investment Banking & Equity Research Program",
    duration: "3 Months",
    price: "19,999",
    features: [
      "Equity research report writing",
      "IPO & M&A deal analysis",
      "Pitch book & presentation creation",
      "Live case studies from IB professionals",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
  },
  {
    id: "3",
    title: "Management Consulting & Strategy",
    duration: "3 Months",
    price: "15,999",
    features: [
      "Strategy frameworks & problem solving",
      "Market sizing & case interview prep",
      "Client presentation & deck building",
      "Real consulting project experience",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
  },
  {
    id: "4",
    title: "Corporate Finance & M&A",
    duration: "4 Months",
    price: "18,999",
    features: [
      "Capital budgeting & financial planning",
      "Mergers & acquisitions deal structuring",
      "Due diligence process & analysis",
      "Live case studies with industry experts",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
  },
  {
    id: "5",
    title: "CFA Level 1 Preparation",
    duration: "6 Months",
    price: "24,999",
    features: [
      "Complete CFA Level 1 curriculum coverage",
      "Practice questions & mock exams",
      "Ethics & professional standards",
      "Quantitative methods & economics",
      "Certificate on completion",
      "Dedicated doubt-solving sessions",
    ],
  },
  {
    id: "6",
    title: "Financial Planning & Wealth Management",
    duration: "3 Months",
    price: "14,999",
    features: [
      "Personal financial planning frameworks",
      "Investment portfolio management",
      "Insurance & retirement planning",
      "Tax planning strategies",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
  },
];

const courseFeatures = [
  {
    icon: Briefcase,
    title: "Real-World Application",
    description:
      "Work on live case scenarios like financial forecasting, mergers and acquisitions, equity research, and investment analysis.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Receive direct guidance from finance experts and learn how to deliver actionable insights that align with corporate goals.",
  },
  {
    icon: Building2,
    title: "Industry Exposure",
    description:
      "Collaborate with leading companies to experience how financial modeling drives strategic decision-making.",
  },
  {
    icon: FolderOpen,
    title: "Portfolio Building",
    description:
      "Add tangible, impactful projects to your resume that showcase your technical expertise and practical experience.",
  },
];

const learnerReviews = [
  {
    name: "Krishna Mulchandani",
    role: "Student TVS",
    text: "This cohort changed my perspective on finance. I rated myself 0 in Excel and PPT, but through live classes and report-making, I built confidence. Case studies and discussions on news and markets made learning practical.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Bhaskar Pintu Pal",
    role: "Student TVS",
    text: "This cohort shaped my future. Parth Sir's simple yet powerful teaching gave me finance knowledge, business insights, and life advice. He guided us like a big brother. This is more than a course — it's family.",
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
];

// --- Know More Modal ---

function KnowMoreModal({
  course,
  onClose,
}: {
  course: (typeof courses)[0];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer z-10"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div
          className="relative p-8 text-white overflow-hidden rounded-t-2xl"
          style={{
            background:
              "linear-gradient(135deg, #6B46C1 0%, #805AD5 50%, #9F7AEA 100%)",
          }}
        >
          <div className="absolute top-6 left-6 opacity-40">
            <Wifi size={28} />
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-bold leading-snug mb-2">
              {course.title}
            </h2>
            <p className="text-white/80 text-sm">
              ({course.duration} of live project based learning)
            </p>
            <div className="mt-4">
              <p className="text-3xl font-bold">₹{course.price}</p>
              <p className="text-xs text-white/70">(Incl. all taxes)</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Course Features */}
          <h3 className="text-lg font-bold text-text-heading mb-4">
            What You&apos;ll Learn
          </h3>
          <div className="space-y-3 mb-8">
            {course.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </span>
                <p className="text-text-muted-alt text-sm">{feature}</p>
              </div>
            ))}
          </div>

          {/* Corporate Live Projects */}
          <h3 className="text-lg font-bold text-text-heading mb-4">
            Corporate Live Projects You Undergo
          </h3>
          <p className="text-text-muted text-sm mb-6">
            Gain hands-on experience with live projects crafted by industry
            leaders, ensuring you&apos;re equipped for real-world financial
            challenges.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {courseFeatures.map((f, i) => (
              <div
                key={i}
                className="bg-light-bg rounded-xl p-5 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
                  <f.icon size={18} className="text-white" />
                </div>
                <h4 className="font-semibold text-sm text-text-heading mb-1">
                  {f.title}
                </h4>
                <p className="text-text-muted text-xs leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="/contact"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all cursor-pointer"
            >
              Pay &amp; Enroll
            </a>
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-text-muted hover:bg-gray-50 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Page ---

export default function CohortsPage() {
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof courses)[0] | null
  >(null);

  return (
    <>
      {selectedCourse && (
        <KnowMoreModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            Our Courses
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Our <span className="text-cyan">Courses</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-3xl mx-auto mb-4">
            Accelerate your career Journey Today. Industry-Relevant Programs
            &amp; Workshops Designed to build your dream Careers
          </p>
          <p className="text-text-on-dark text-base max-w-3xl mx-auto mb-10">
            Explore our live and immersive cohort-based programs led by industry
            pioneers from brands like Deloitte, EY, PWC, BDO, Boutique PE &amp;
            VC firms from USA &amp; Canada many more
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="bg-light-bg py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Purple gradient header */}
                <div
                  className="relative p-6 text-white overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #6B46C1 0%, #805AD5 50%, #9F7AEA 100%)",
                  }}
                >
                  {/* WiFi icon */}
                  <div className="absolute top-5 left-5 opacity-40">
                    <Wifi size={24} />
                  </div>
                  {/* Razorpay label */}
                  <div className="absolute top-5 right-5">
                    <span className="text-white/60 text-xs font-semibold tracking-wide">
                      ▲ Razorpay
                    </span>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-bold text-lg leading-snug mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      ({course.duration} of live project based learning)
                    </p>
                    <div className="mt-4">
                      <p className="text-2xl font-bold">₹{course.price}</p>
                      <p className="text-xs text-white/70">
                        (Incl. all taxes)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="p-5 flex gap-3">
                  <a
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm border-2 border-indigo text-indigo hover:bg-indigo hover:text-white transition-all cursor-pointer"
                  >
                    Pay &amp; Enroll
                  </a>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition-all cursor-pointer"
                  >
                    Know More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* What Our Learners Say */}
      <section className="bg-light-bg py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">
              REVIEWS
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-2">
              What Our Learners Say
            </h2>
            <p className="text-text-muted">
              Their words. Their journeys. Their results.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {learnerReviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={
                        j < Math.floor(review.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : j < review.rating
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-text-muted-alt text-sm leading-relaxed mb-6">
                  {review.text}
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-text-heading">
                      {review.name}
                    </p>
                    <p className="text-xs text-text-muted">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
