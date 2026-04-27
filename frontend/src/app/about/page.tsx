import {
  Lightbulb,
  Target,
  Shield,
  Heart,
  Eye,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly evolve our curriculum and methods to stay ahead of industry trends.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Every program is designed to create measurable career outcomes for our students.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We maintain transparency in our processes, outcomes, and partnerships.",
  },
  {
    icon: Heart,
    title: "Community",
    description:
      "We foster a supportive ecosystem of learners, mentors, and industry professionals.",
  },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", initials: "AM" },
  { name: "Sneha Kapoor", role: "Head of Academics", initials: "SK" },
  { name: "Vikram Singh", role: "Director of Placements", initials: "VS" },
  { name: "Neha Reddy", role: "Head of Partnerships", initials: "NR" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 border border-white/20 text-cyan mb-6">
            About Ascendify
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ascending your Career
            <br />
            <span className="text-cyan text-2xl sm:text-3xl lg:text-4xl"> Bridging the Gap Between Education & Real Finance Careers</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            ASCENDIFY is built to solve one problem — why talented students struggle to break into Investment Banking, Equity Research, and core finance roles despite having degrees.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-indigo/20 to-cyan/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&h=500&fit=crop"
                alt="Students working on laptops with finance charts"
                className="relative w-full aspect-[4/3] rounded-2xl object-cover shadow-xl"
              />
              {/* <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Rocket size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-heading">Real-World Training</p>
                    <p className="text-xs text-text-muted">Financial modeling, valuation & analysis</p>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="space-y-10">
              <div className="bg-light-bg rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                    <Target size={22} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-heading">
                    Our Mission
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed">
                  To equip aspiring finance professionals with practical, industry-relevant skills in financial modeling, valuation, and investment analysis through structured, cohort-based learning — enabling them to confidently secure roles in core finance domains.
                </p>
              </div>

              <div className="bg-light-bg rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-md">
                    <Eye size={22} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-heading">
                    Our Vision
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed">
                  To become a leading global platform for finance career acceleration, where students are trained not just to learn concepts, but to think, analyze, and perform like professionals in Investment Banking, Equity Research, and Corporate Finance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Different */}
      <section className="bg-light-bg py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Rocket size={26} className="text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              What Makes <span className="gradient-text">ASCENDIFY</span> Different
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              We don&apos;t just teach finance — we prepare you to perform like a professional from day one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Built by professionals from Investment Banking & Corporate Finance backgrounds",
              "Focus on real-world application, not theoretical learning",
              "Structured roadmap aligned with industry hiring requirements",
              "Hands-on modeling, valuation, and case-based learning",
              "Personalized mentorship & interview preparation",
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow"
              >
                <CheckCircle2 size={20} className="text-cyan flex-shrink-0 mt-0.5" />
                <p className="text-text-muted text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Our <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              The principles that guide everything we do at Ascendify.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="font-semibold text-lg text-text-heading mb-2">
                  {v.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </>
  );
}
