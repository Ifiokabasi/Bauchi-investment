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
  console.log("🚀 ===== generateStaticParams START =====");
  
  try {
    const slugs = await getAllPostSlugs();
    console.log("📚 generateStaticParams - slugs:", slugs);
    console.log("📚 generateStaticParams - slugs count:", slugs?.length || 0);
    
    if (!slugs || slugs.length === 0) {
      console.warn("⚠️ No slugs found in generateStaticParams");
      return [];
    }
    
    const params = slugs.map((s) => ({ slug: s.slug }));
    console.log("✅ generateStaticParams - returning:", params);
    console.log("🚀 ===== generateStaticParams END =====");
    return params;
  } catch (error) {
    console.error("❌ generateStaticParams error:", error);
    console.log("🚀 ===== generateStaticParams END (with error) =====");
    return [];
  }
}

// Dynamic metadata per post - await params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  console.log("🚀 ===== generateMetadata START =====");
  
  try {
    console.log("📌 generateMetadata - raw params:", params);
    const { slug } = await params;
    console.log("📌 generateMetadata - extracted slug:", slug);
    console.log("📌 generateMetadata - slug type:", typeof slug);
    console.log("📌 generateMetadata - slug length:", slug?.length);
    
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error("❌ generateMetadata - invalid slug:", slug);
      return { title: "Post Not Found | BIC" };
    }
    
    console.log("🔍 generateMetadata - fetching post for slug:", slug);
    const post = await getPostBySlug(slug);
    console.log("📝 generateMetadata - post found:", post ? post.title : "NOT FOUND");
    
    if (!post) {
      console.warn("⚠️ generateMetadata - post not found for slug:", slug);
      return { title: "Post Not Found | BIC" };
    }
    
    console.log("✅ generateMetadata - returning metadata for:", post.title);
    console.log("🚀 ===== generateMetadata END =====");
    return {
      title: `${post.title} | BIC Insights`,
      description: post.excerpt,
    };
  } catch (error) {
    console.error("❌ generateMetadata error:", error);
    console.log("🚀 ===== generateMetadata END (with error) =====");
    return { title: "Post Not Found | BIC" };
  }
}

// Page component - await params
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  console.log("🚀 ===== PostPage START =====");
  console.log("📌 PostPage - raw params:", params);
  
  try {
    const { slug } = await params;
    console.log("📌 PostPage - extracted slug:", slug);
    console.log("📌 PostPage - slug type:", typeof slug);
    console.log("📌 PostPage - slug length:", slug?.length);
    
    // Validate slug
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      console.error("❌ PostPage - invalid slug:", slug);
      console.log("🚀 ===== PostPage END (invalid slug) =====");
      notFound();
    }
    
    console.log("🔍 PostPage - fetching post for slug:", slug);
    const post = await getPostBySlug(slug);
    console.log("📝 PostPage - post found:", post ? post.title : "NOT FOUND");
    console.log("📝 PostPage - full post data:", post);
    
    if (!post) {
      console.error("❌ PostPage - post not found for slug:", slug);
      console.log("🚀 ===== PostPage END (post not found) =====");
      notFound();
    }

    console.log("🔗 PostPage - fetching related posts for category:", post.category);
    const related = await getRelatedPosts(post.category, slug);
    console.log("🔗 PostPage - related posts count:", related?.length || 0);

    console.log("✅ PostPage - rendering post:", post.title);
    console.log("🚀 ===== PostPage END =====");

    return (
      <main>
        <PostHero post={post} />
        <PostBody post={post} />
        {related && related.length > 0 && <RelatedPosts posts={related} />}
      </main>
    );
  } catch (error) {
    console.error("❌ PostPage - error:", error);
    console.log("🚀 ===== PostPage END (with error) =====");
    throw error;
  }
}