// src/app/blog/[slug]/page.tsx
// Individual blog post page

import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/sanity/lib/sanity";
import PostHero from "../PostHero";
import PostBody from "../PostBody";
import RelatedPosts from "../RelatedPosts";

export const revalidate = 60;

// Generate all static routes at build time
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

// ✅ FIXED: Dynamic metadata per post - await params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← AWAIT the params Promise
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | BIC" };
  return {
    title: `${post.title} | BIC Insights`,
    description: post.excerpt,
  };
}

// ✅ FIXED: Page component - await params
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← AWAIT the params Promise
  
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.category, slug);

  return (
    <main>
      <PostHero post={post} />
      <PostBody post={post} />
      {related.length > 0 && <RelatedPosts posts={related} />}
    </main>
  );
}