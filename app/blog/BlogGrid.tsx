"use client";

// src/components/blog/BlogGrid.tsx
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { urlFor, Post } from "@/sanity/lib/sanity";
import styles from "./BlogGrid.module.css";

const CATEGORY_LABELS: Record<string, string> = {
  investment:        "Investment",
  infrastructure:    "Infrastructure",
  agriculture:       "Agriculture",
  energy:            "Energy",
  "capital-markets": "Capital Markets",
  partnerships:      "Partnerships",
  news:              "News",
};

const EASE = [0.22, 1, 0.36, 1] as const;

function PostCard({ post, index }: { post: Post; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const imgUrl = post.coverImage
    ? urlFor(post.coverImage).width(800).height(480).fit("crop").url()
    : "/images/agric.jpg";

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  // ✅ Debug: Log the slug being used
  console.log(`📌 Post ${index} - ${post.title}:`, {
    slug: post.slug,
    slugType: typeof post.slug,
    href: `/blog/${post.slug}`
  });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* ✅ FIXED: Use post.slug (not post.slug.current) */}
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        <div className={styles.imgWrap}>
          <Image
            src={imgUrl}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.img}
            unoptimized
          />
          <div className={styles.imgOverlay} />
          <span className={styles.category}>
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.footer}>
            <div className={styles.authorInfo}>
              <div className={styles.avatar}>{post.author?.name?.[0] ?? "B"}</div>
              <div>
                <div className={styles.authorName}>{post.author?.name ?? "BIC Editorial"}</div>
                <div className={styles.date}>{formattedDate}</div>
              </div>
            </div>
            <span className={styles.readTime}>{post.readTime} min</span>
          </div>
        </div>

        <div className={styles.sweep} />
      </Link>
    </motion.div>
  );
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const category     = searchParams.get("category") ?? "all";

  const filtered = category === "all"
    ? posts
    : posts.filter((p) => p.category === category);

  if (filtered.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No posts found in this category yet.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {filtered.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}