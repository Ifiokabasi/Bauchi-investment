"use client";

// src/components/blog/PostBody.tsx
// Renders Sanity Portable Text body content

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { urlFor, Post } from "@/sanity/lib/sanity";
import styles from "./PostBody.module.css";

/* ─────────────────────────────────────────
   Custom Portable Text components
───────────────────────────────────────── */

const components = {
  types: {
    image: ({ value }: { value: { asset: unknown; caption?: string; alt?: string } }) => {
      const imgUrl = urlFor(value.asset as never).width(1200).url();
      return (
        <figure className={styles.figure}>
          <div className={styles.figImgWrap}>
            <Image
              src={imgUrl}
              alt={value.alt ?? "Article image"}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 800px) 100vw, 820px"
            />
          </div>
          {value.caption && (
            <figcaption className={styles.caption}>{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.h2}>{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className={styles.h3}>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className={styles.p}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className={styles.strong}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className={styles.em}>{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className={styles.ul}>{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className={styles.ol}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className={styles.li}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className={styles.li}>{children}</li>
    ),
  },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function PostBody({ post }: { post: Post }) {
  // Get the current URL for sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <article className={styles.article}>
      <div className={styles.inner}>
        <div className={styles.body}>
          <PortableText value={post.body as never} components={components} />
        </div>

        {/* Share row */}
        <div className={styles.share}>
          <span className={styles.shareLabel}>Share</span>
          <div className={styles.shareLinks}>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                post.title
              )}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareBtn}
              aria-label="Share on Twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareBtn}
              aria-label="Share on LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.shareBtn}
              aria-label="Share on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}