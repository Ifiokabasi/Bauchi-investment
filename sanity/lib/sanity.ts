// src/lib/sanity.ts
// Sanity client + GROQ queries for the BIC blog

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/* ─────────────────────────────────────────
   Client config
   Replace the values below with your own
   from manage.sanity.io → your project
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
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      ${POST_FIELDS}
    }
  `);
}

/** Single featured post for the hero */
export async function getFeaturedPost(): Promise<Post | null> {
  const post: Post | null = await client.fetch(`
    *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      ${POST_FIELDS}
    }
  `);
  return post;
}

/** Posts filtered by category */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && category == $category] | order(publishedAt desc) {
      ${POST_FIELDS}
    }
  `, { category }); // ✅ Fixed: parameters passed
}

/** Single post by slug (includes full body) */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      ${POST_FIELDS},
      body
    }
  `, { slug }); // ✅ FIXED: This was the error!
}

/** Related posts (same category, different slug) */
export async function getRelatedPosts(category: string, currentSlug: string): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post" && category == $category && slug.current != $currentSlug]
    | order(publishedAt desc)[0...3] {
      ${POST_FIELDS}
    }
  `, { category, currentSlug }); // ✅ Fixed: parameters passed
}

/** All slugs for static generation */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`
    *[_type == "post"] { "slug": slug.current }
  `);
}