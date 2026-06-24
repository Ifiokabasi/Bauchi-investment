"use client";

// src/components/blog/PostHero.tsx

import Image from "next/image";
import Link  from "next/link";
import { motion } from "framer-motion";
import { urlFor, Post } from "@/sanity/lib/sanity";
import styles from "./PostHero.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABELS: Record<string, string> = {
  investment:        "Investment",
  infrastructure:    "Infrastructure",
  agriculture:       "Agriculture",
  energy:            "Energy",
  "capital-markets": "Capital Markets",
  partnerships:      "Partnerships",
  news:              "News",
};

export default function PostHero({ post }: { post: Post }) {
  const imgUrl = urlFor(post.coverImage).width(1600).height(700).fit("crop").url();
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <section className={styles.hero}>
      <div className={styles.imgWrap}>
        <Image src={imgUrl} alt={post.title} fill style={{ objectFit: "cover" }} priority className={styles.img} />
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.inner}>
          {/* breadcrumb */}
          <motion.div className={styles.bc} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <Link href="/blog" className={styles.bcLink}>Insights</Link>
            <span className={styles.bcSep}>/</span>
            <span className={styles.bcCurrent}>{CATEGORY_LABELS[post.category] ?? post.category}</span>
          </motion.div>

          <motion.span className={styles.categoryBadge} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}>
            {CATEGORY_LABELS[post.category] ?? post.category}
          </motion.span>

          <motion.h1 className={styles.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}>
            {post.title}
          </motion.h1>

          <motion.p className={styles.excerpt} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.48 }}>
            {post.excerpt}
          </motion.p>

          <motion.div className={styles.meta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.62 }}>
            <div className={styles.author}>
              <div className={styles.avatar}>{post.author?.name?.[0] ?? "B"}</div>
              <div>
                <div className={styles.authorName}>{post.author?.name ?? "BIC Editorial"}</div>
                <div className={styles.authorRole}>{post.author?.role ?? "BIC Communications"}</div>
              </div>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.sep}>·</span>
              <span className={styles.readTime}>{post.readTime} min read</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
