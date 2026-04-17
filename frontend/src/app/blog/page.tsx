import { Clock, PenLine } from "lucide-react";

export default function BlogPage() {
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
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Insights & <span className="text-cyan">Industry Updates</span>
          </h1>
          <p className="text-text-on-dark text-lg max-w-2xl mx-auto">
            Expert tips, career advice, and the latest trends in finance and
            professional development.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-light-bg py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
              <PenLine size={28} className="text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock size={18} className="text-indigo" />
              <span className="text-sm font-semibold text-indigo uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl font-bold text-text-heading mb-4">
              Our Blog is Launching Soon
            </h2>
            <p className="text-text-muted leading-relaxed">
              We&apos;re crafting insightful articles on finance careers,
              industry trends, interview preparation, and professional growth.
              Stay tuned for expert-driven content to help you advance your
              career.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
