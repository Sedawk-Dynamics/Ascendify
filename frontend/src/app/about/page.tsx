import {
  Lightbulb,
  Target,
  Shield,
  Heart,
  Eye,
  Rocket,
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
            Empowering Careers,
            <br />
            <span className="text-cyan">Transforming Lives</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            We are on a mission to bridge the gap between education and
            employability through industry-led cohort programs.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Image placeholder */}
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-2xl gradient-primary opacity-90 flex items-center justify-center">
                <Rocket size={80} className="text-white/30" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan/20 rounded-2xl -z-10" />
            </div>

            <div>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Target size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-heading">
                    Our Mission
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed">
                  To democratize access to quality career education by creating
                  transformative, cohort-based learning experiences that combine
                  industry expertise, hands-on projects, and guaranteed placement
                  support. We believe every aspiring professional deserves a
                  clear pathway to their dream career.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-heading">
                    Our Vision
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed">
                  To become the world&apos;s most trusted career acceleration
                  platform, where talent meets opportunity and every learner
                  achieves their full potential. We envision a future where
                  career success is driven by skills, not circumstances.
                </p>
              </div>
            </div>
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

      {/* Team */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-heading mb-4">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              The passionate individuals behind Ascendify&apos;s success.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="text-center bg-light-bg rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-lg text-text-heading">
                  {member.name}
                </h3>
                <p className="text-text-muted text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
