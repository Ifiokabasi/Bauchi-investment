"use client";

// src/components/blog/BlogHero.tsx
// Cinematic full-width hero for the featured blog post

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor, Post } from "@/sanity/lib/sanity";
import styles from "./BlogHero.module.css";




// ... rest of your component

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABELS: Record<string, string> = {
  investment:      "Investment",
  infrastructure:  "Infrastructure",
  agriculture:     "Agriculture",
  energy:          "Energy",
  "capital-markets": "Capital Markets",
  partnerships:    "Partnerships",
  news:            "News",
};

export default function BlogHero({ post }: { post: Post }) {

  console.log("BlogHero post:", post);
  console.log("BlogHero coverImage:", post.coverImage);

  const imgUrl = urlFor(post.coverImage).width(1600).height(820).fit("crop").url();
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section className={styles.hero}>
      {/* Background image with slow zoom */}
      <div className={styles.imgWrap}>
        <Image
          src={imgUrl}
          alt={post.title}
          
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
          className={styles.img}
          unoptimized
        />
      </div>

      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            className={styles.meta}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <span className={styles.featuredBadge}>Featured</span>
            <span className={styles.category}>
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
            <span className={styles.dot}>·</span>
            <span className={styles.readTime}>{post.readTime} min read</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            className={styles.excerpt}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            className={styles.footer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
          >
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                {post.author?.name?.[0] ?? "B"}
              </div>
              <div>
                <div className={styles.authorName}>{post.author?.name ?? "BIC Editorial"}</div>
                <div className={styles.authorDate}>{formattedDate}</div>
              </div>
            </div>

            <Link href={`/blog/${post.slug.current}`} className={styles.readBtn}>
              Read Article
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
