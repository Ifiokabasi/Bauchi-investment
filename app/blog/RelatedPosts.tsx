"use client";

// src/components/blog/RelatedPosts.tsx

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { urlFor, Post } from "@/sanity/lib/sanity";
import styles from "./RelatedPosts.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABELS: Record<string, string> = {
  investment: "Investment",
  infrastructure: "Infrastructure",
  agriculture: "Agriculture",
  energy: "Energy",
  "capital-markets": "Capital Markets",
  partnerships: "Partnerships",
  news: "News",
};

function RelatedCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  
  // ✅ Handle missing coverImage with fallback
  let imgUrl = "/images/blog-fallback.jpg";
  try {
    if (post.coverImage) {
      imgUrl = urlFor(post.coverImage).width(600).height(380).fit("crop").url();
    }
  } catch (error) {
    console.error("Error generating image URL:", error);
  }
  
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // ✅ Debug: Log the slug being used
  console.log(`🔗 Related post ${index} - ${post.title}:`, {
    slug: post.slug,
    slugType: typeof post.slug,
    href: `/blog/${post.slug}`
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      className={styles.card}
    >
      {/* ✅ FIXED: Use post.slug (not post.slug.current) */}
      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <div className={styles.imgWrap}>
          <Image
            src={imgUrl}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, 33vw"
            className={styles.img}
            unoptimized
          />
          <span className={styles.cat}>
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.meta}>
            <span className={styles.author}>{post.author?.name ?? "BIC Editorial"}</span>
            <span className={styles.sep}>·</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
        <div className={styles.sweep} />
      </Link>
    </motion.div>
  );
}

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  console.log("🔗 RelatedPosts - Number of posts:", posts?.length || 0);
  console.log("🔗 RelatedPosts - Posts:", posts?.map(p => ({
    title: p.title,
    slug: p.slug,
    slugType: typeof p.slug
  })));

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tag}>Continue Reading</div>
          <h2 className={styles.heading}>Related <em>Articles</em></h2>
        </div>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <RelatedCard key={post._id} post={post} index={i} />
          ))}
        </div>
        <div className={styles.footer}>
          <Link href="/blog" className={styles.allLink}>
            View all insights
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}