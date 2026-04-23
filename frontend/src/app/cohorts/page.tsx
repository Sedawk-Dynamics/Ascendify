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
    title: "Advanced Financial Modeling & Fiancial Analysis Certifcate",
    subtitle: "4 weeks of live project based financial modeling learning",
    originalPrice: "4,500",
    price: "3,000",
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
    title: "Investment Banking & Equity Research Bootcamp",
    subtitle: "3 months of live project based learning",
    originalPrice: "13,000",
    price: "9,000",
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
    title: "Management Consulting & Strategy Associate",
    subtitle: "3 months of live project based learning",
    originalPrice: "16,000",
    price: "12,000",
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
    title: "Corporate Finance & Treasury Masterclass",
    subtitle: "8 weeks of live project based  learning",
    originalPrice: "10,000",
    price: "7,000",
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
    title: "Private Equity Associate Program",
    subtitle: "3 months of live project based learning",
    originalPrice: "16,000",
    price: "12,000",
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
    title: "Power BI Dashboard Program",
    subtitle: "10 weeks of live project-based Power BI financial & marketing dashboard building",
    originalPrice: "10,000",
    price: "7,000",
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

const programDetails = [
  {
    id: "1",
    title: "Advanced Financial Modeling & Financial Analysis Certificate",
    description: "A fast-track, hands-on program designed to build your core financial modeling foundation through real company applications.",
    whatYouLearn: [
      "Build integrated 3-statement financial models from scratch",
      "Financial statement analysis & forecasting techniques",
      "Excel modeling best practices & shortcuts",
      "Error checking, audit checks & model structuring",
      "Introduction to valuation (DCF basics)",
      "Certificate on completion",
      "Placement assistance & interview prep",
    ],
    liveProjects: [
      "Work on financial models on companies like Dabur / Nestlé",
      "Revenue & cost driver analysis",
      "Scenario & sensitivity analysis",
    ],
  },
  {
    id: "2",
    title: "Investment Banking & Equity Research Bootcamp",
    description: "A structured, end-to-end program designed to help you break into Investment Banking & Equity Research roles.",
    whatYouLearn: [
      "Advanced Financial Modeling (3-statement, DCF, comps)",
      "Equity Research report building",
      "M&A & deal structuring basics",
      "Financial statement deep-dive analysis",
      "Interview preparation (technical + HR)",
      "Certificate on completion",
    ],
    liveProjects: [
      "Working on Advanced Financial Modeling (3-statement, DCF, comps)",
      "Equity Research report building",
      "M&A & deal structuring basics",
      "Financial statement deep-dive analysis",
      "AI tools driven research",
    ],
  },
  {
    id: "3",
    title: "Management Consulting & Strategy Associate Program",
    description: "Designed to develop structured thinking, business problem-solving, and consulting frameworks.",
    whatYouLearn: [
      "Case solving frameworks (MECE, profitability, market entry)",
      "Business strategy & competitive analysis",
      "Market sizing & estimation techniques",
      "Presentation & storytelling skills",
      "Case interview practice",
      "Guesstimates & structured thinking drills",
      "Certificate on completion",
    ],
    liveProjects: [
      "Market entry strategy case",
      "Business turnaround analysis",
      "Growth strategy for real companies",
    ],
  },
  {
    id: "4",
    title: "Corporate Finance & Treasury Masterclass",
    description: "Focused on practical corporate finance and treasury operations used in real companies.",
    whatYouLearn: [
      "Cash flow management & forecasting",
      "Working capital optimization",
      "Treasury operations (FX, debt, liquidity)",
      "Capital budgeting & IRR analysis",
      "Certificate on completion",
    ],
    liveProjects: [
      "Cash flow forecasting model",
      "Working capital analysis",
      "Debt structuring case",
    ],
  },
  {
    id: "5",
    title: "Private Equity Associate Program",
    description: "A practical, career-focused program designed to help learners understand how private equity investors evaluate businesses, structure transactions, assess returns, and create value post-investment. This program is ideal for students and finance aspirants who want to build a strong foundation in private equity, investment analysis, deal evaluation, and portfolio value creation.",
    whatYouLearn: [
      "Private equity ecosystem, fund structure, and investment lifecycle",
      "How PE firms source, screen, and evaluate investment opportunities",
      "Financial statement analysis from an investor's lens",
      "Business valuation techniques relevant for PE investing",
      "Deal screening, investment memo thinking, and return assessment",
      "LBO fundamentals and how leverage impacts equity returns",
      "Value creation strategy in portfolio companies",
      "Exit routes such as IPO, strategic sale, and secondary sale",
      "Build strong deal-analysis and investor-oriented financial skills",
      "Develop practical knowledge relevant for PE, IB, and transaction advisory roles",
      "Certificate on completion",
    ],
    liveProjects: [
      "Analyze a target company from a PE investor perspective",
      "Build an investment screening framework",
      "Work on valuation and return analysis for a potential deal",
      "Prepare a basic investment note / investment thesis",
      "Assess business quality, growth visibility, and risk factors",
    ],
  },
  {
    id: "6",
    title: "Financial Planning & Wealth Management + Power BI Dashboard Program",
    description: "A hands-on program designed to help learners transform raw financial and business data into interactive dashboards, clear visuals, and management-ready presentations using Power BI.",
    whatYouLearn: [
      "Introduction to Power BI and dashboarding workflow",
      "Data cleaning, transformation, and structuring for reporting",
      "Building financial and business performance dashboards",
      "KPI tracking and management reporting design",
      "Creating charts, slicers, filters, and interactive visuals",
      "Presenting revenue, cost, profitability, and business trends visually",
      "Turning data into decision-oriented business insights",
      "Dashboard storytelling and presentation best practices",
    ],
    liveProjects: [
      "Build a financial performance dashboard using real-world style data",
      "Create MIS-style reporting views for management review",
      "Design interactive dashboards for revenue, profitability, and trend tracking",
      "Prepare a presentation-ready business dashboard for decision-making",
      "Work on practical case-based visualization assignments",
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
              ({course.subtitle})
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-lg text-white/50 line-through">₹{course.originalPrice}</span>
              <span className="text-3xl font-bold">₹{course.price}</span>
            </div>
            <div>
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
            Cohort
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Our <span className="text-cyan">Career Accelerator Programs</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-3xl mx-auto mb-4">
            Structured, cohort-based programs designed to help you break into Investment Banking, Equity Research, and Strategic Finance roles.
          </p>
          <p className="text-text-on-dark text-base max-w-3xl mx-auto mb-10">
            Explore our live and immersive cohort-based programs led by industry
            pioneers from brands like Deloitte, EY, PWC, BDO, Boutique PE &amp;
            VC firms from USA &amp; Canada many more
          </p>
          <div className="flex justify-center items-center gap-4 max-w-5xl mx-auto">
            {[
              "Live interactive sessions",
              "Real company case studies",
              "Interview-focused training",
              "Direct mentorship",
              "Institution grade research",
              "Report writing",
            ].map((item, i) => (
              <span key={i} className="px-4 py-2.5 rounded-full text-xs font-medium text-cyan bg-cyan/20 border border-cyan/30 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
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
                      ({course.subtitle})
                    </p>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="text-base text-white/50 line-through">₹{course.originalPrice}</span>
                      <span className="text-2xl font-bold">₹{course.price}</span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">
                      (Incl. all taxes)
                    </p>
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


      {/* Detailed Program Breakdown */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Program <span className="gradient-text">Details</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Explore what each program covers and the live projects you&apos;ll work on.
            </p>
          </div>

          <div className="space-y-16">
            {programDetails.map((program, index) => (
              <div key={program.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                {/* Program Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                        {program.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program Content */}
                <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                  {/* What You'll Learn */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1 h-6 rounded-full bg-indigo" />
                      <h4 className="text-lg font-bold text-text-heading">
                        What You&apos;ll Learn
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {program.whatYouLearn.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo mt-2 flex-shrink-0" />
                          <p className="text-text-muted text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corporate Live Projects */}
                  <div className="p-6 lg:p-8">
                    <h4 className="text-lg font-bold text-text-heading mb-2">
                      Corporate Live Projects You Undergo
                    </h4>
                    <p className="text-text-muted text-sm mb-6">
                      Gain hands-on experience with live projects crafted by industry leaders, ensuring you&apos;re equipped for real-world financial challenges.
                    </p>

                    {/* 4 Feature Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {courseFeatures.map((f, i) => (
                        <div key={i} className="bg-light-bg rounded-xl p-4 border border-gray-100">
                          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center mb-2">
                            <f.icon size={16} className="text-white" />
                          </div>
                          <h5 className="font-semibold text-xs text-text-heading mb-1">{f.title}</h5>
                          <p className="text-text-muted text-[11px] leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Live Project Points */}
                    <div className="bg-indigo/5 rounded-xl p-4 border border-indigo/10">
                      <div className="space-y-2">
                        {program.liveProjects.map((project, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-[10px]">✓</span>
                            </span>
                            <p className="text-text-muted text-sm">{project}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
