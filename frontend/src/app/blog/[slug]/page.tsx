import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

const BASE_URL = "https://ascendify.in";

interface BlogData {
  title: string;
  excerpt: string;
  author: string;
  coverImage?: string;
  slug: string;
  createdAt: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        title: "Blog Post",
        description: "Read the latest insights on finance careers at Ascendify.",
      };
    }

    const blog: BlogData = await res.json();

    return {
      title: blog.title,
      description: blog.excerpt,
      alternates: { canonical: `${BASE_URL}/blog/${blog.slug}` },
      openGraph: {
        type: "article",
        title: blog.title,
        description: blog.excerpt,
        url: `${BASE_URL}/blog/${blog.slug}`,
        publishedTime: blog.createdAt,
        authors: [blog.author],
        images: blog.coverImage
          ? [{ url: blog.coverImage, alt: blog.title }]
          : [{ url: `${BASE_URL}/AscendifyLogo.png`, alt: "Ascendify" }],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: blog.coverImage ? [blog.coverImage] : [`${BASE_URL}/AscendifyLogo.png`],
      },
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Read the latest insights on finance careers at Ascendify.",
    };
  }
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
