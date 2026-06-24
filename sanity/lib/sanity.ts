// src/lib/sanity.ts
// Sanity client + GROQ queries for the BIC blog

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/* ─────────────────────────────────────────
   Client config
───────────────────────────────────────── */

export const client = createClient({
  projectId: "bpfdl4np",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

/* ─────────────────────────────────────────
   Image URL builder
───────────────────────────────────────── */

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/* ─────────────────────────────────────────
   TypeScript types
───────────────────────────────────────── */

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  coverImage: SanityImageSource;
  author: {
    name: string;
    role: string;
    avatar: SanityImageSource;
  };
  publishedAt: string;
  readTime: number;
  featured: boolean;
  body: unknown[];
}

/* ─────────────────────────────────────────
   GROQ queries
───────────────────────────────────────── */

// Core post fields (used in list views)
const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage,
  author { name, role, avatar },
  publishedAt,
  readTime,
  featured
`;

/** All published posts, newest first */
export async function getAllPosts(): Promise<Post[]> {
  console.log("📚 getAllPosts - START");
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        ${POST_FIELDS}
      }
    `);
    console.log(`📚 getAllPosts - Found ${posts?.length || 0} posts`);
    if (posts && posts.length > 0) {
      console.log("📚 getAllPosts - First post slug:", posts[0]?.slug);
      console.log("📚 getAllPosts - First post title:", posts[0]?.title);
    }
    console.log("📚 getAllPosts - END");
    return posts;
  } catch (error) {
    console.error("❌ getAllPosts - Error:", error);
    console.log("📚 getAllPosts - END (with error)");
    return [];
  }
}

/** Single featured post for the hero */
export async function getFeaturedPost(): Promise<Post | null> {
  console.log("⭐ getFeaturedPost - START");
  try {
    const post: Post | null = await client.fetch(`
      *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
        ${POST_FIELDS}
      }
    `);
    console.log("⭐ getFeaturedPost - Found:", post ? post.title : "None");
    console.log("⭐ getFeaturedPost - END");
    return post;
  } catch (error) {
    console.error("❌ getFeaturedPost - Error:", error);
    console.log("⭐ getFeaturedPost - END (with error)");
    return null;
  }
}

/** Posts filtered by category */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  console.log(`📂 getPostsByCategory - Category: ${category}`);
  try {
    const posts = await client.fetch(`
      *[_type == "post" && category == $category] | order(publishedAt desc) {
        ${POST_FIELDS}
      }
    `, { category });
    console.log(`📂 getPostsByCategory - Found ${posts?.length || 0} posts`);
    return posts;
  } catch (error) {
    console.error("❌ getPostsByCategory - Error:", error);
    return [];
  }
}

/** Single post by slug (includes full body) */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  console.log("🔍 ===== getPostBySlug START =====");
  console.log("🔍 getPostBySlug - Looking for slug:", slug);
  console.log("🔍 getPostBySlug - Slug type:", typeof slug);
  console.log("🔍 getPostBySlug - Slug length:", slug?.length);
  console.log("🔍 getPostBySlug - Is slug a string?", typeof slug === 'string');
  console.log("🔍 getPostBySlug - Slug trimmed:", slug?.trim());
  
  // Validate slug
  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    console.error("❌ getPostBySlug - Invalid slug:", slug);
    console.log("🔍 ===== getPostBySlug END (invalid slug) =====");
    return null;
  }

  try {
    // First, let's check all slugs to see if this one exists
    console.log("🔍 getPostBySlug - Checking all slugs first...");
    const allSlugs = await getAllPostSlugs();
    console.log("🔍 getPostBySlug - All slugs:", allSlugs);
    
    const slugExists = allSlugs.some(s => s.slug === slug);
    console.log("🔍 getPostBySlug - Slug exists in database?", slugExists);
    
    if (!slugExists) {
      console.warn(`⚠️ getPostBySlug - Slug "${slug}" not found in database`);
      console.log("🔍 ===== getPostBySlug END (slug not in database) =====");
      return null;
    }
    
    console.log("🔍 getPostBySlug - Executing query with slug:", slug);
    
    const query = `
      *[_type == "post" && slug.current == $slug][0] {
        ${POST_FIELDS},
        body
      }
    `;
    
    console.log("🔍 getPostBySlug - Query:", query);
    console.log("🔍 getPostBySlug - Parameters:", { slug });
    
    const post: Post | null = await client.fetch(query, { slug });
    
    console.log("📝 getPostBySlug - Raw result:", post);
    console.log("📝 getPostBySlug - Result:", post ? `Found: ${post.title}` : "Not found");
    
    if (post) {
      console.log("📝 getPostBySlug - Post title:", post.title);
      console.log("📝 getPostBySlug - Post slug:", post.slug);
    }
    
    console.log("🔍 ===== getPostBySlug END =====");
    return post;
  } catch (error) {
    console.error("❌ getPostBySlug - Error:", error);
    console.log("🔍 ===== getPostBySlug END (with error) =====");
    return null;
  }
}

/** Related posts (same category, different slug) */
export async function getRelatedPosts(category: string, currentSlug: string): Promise<Post[]> {
  console.log(`🔗 getRelatedPosts - Category: ${category}, Current Slug: ${currentSlug}`);
  try {
    const posts = await client.fetch(`
      *[_type == "post" && category == $category && slug.current != $currentSlug]
      | order(publishedAt desc)[0...3] {
        ${POST_FIELDS}
      }
    `, { category, currentSlug });
    console.log(`🔗 getRelatedPosts - Found ${posts?.length || 0} related posts`);
    return posts;
  } catch (error) {
    console.error("❌ getRelatedPosts - Error:", error);
    return [];
  }
}

/** All slugs for static generation */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  console.log("📚 getAllPostSlugs - START");
  try {
    const slugs = await client.fetch(`
      *[_type == "post"] { "slug": slug.current }
    `);
    console.log("📚 getAllPostSlugs - Found slugs:", slugs);
    console.log("📚 getAllPostSlugs - Count:", slugs?.length || 0);
    
    if (slugs && slugs.length > 0) {
      console.log("📚 getAllPostSlugs - First slug:", slugs[0]?.slug);
      console.log("📚 getAllPostSlugs - Last slug:", slugs[slugs.length - 1]?.slug);
    }
    
    console.log("📚 getAllPostSlugs - END");
    return slugs;
  } catch (error) {
    console.error("❌ getAllPostSlugs - Error:", error);
    console.log("📚 getAllPostSlugs - END (with error)");
    return [];
  }
}