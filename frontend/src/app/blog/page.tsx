"use client";

import { useState, useEffect } from "react";
import { Clock, Loader2, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  category: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => { setBlogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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

      {/* Blog Listing */}
      <section className="bg-light-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 size={32} className="animate-spin text-indigo mx-auto mb-4" />
              <p className="text-text-muted">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Clock size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-text-heading mb-4">
                No Blog Posts Yet
              </h2>
              <p className="text-text-muted leading-relaxed max-w-md mx-auto">
                We&apos;re crafting insightful articles on finance careers,
                industry trends, and professional growth. Stay tuned!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {blog.coverImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo/10 text-indigo mb-3">
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-bold text-text-heading mb-2 group-hover:text-indigo transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <User size={14} />
                        <span>{blog.author}</span>
                        <span className="mx-1">&middot;</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <ArrowRight size={16} className="text-indigo opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
