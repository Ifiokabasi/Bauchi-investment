"use client";

// components/Sectors/Sectors.tsx
// Place at: components/Sectors/Sectors.tsx
// Requires: framer-motion, @fortawesome/react-fontawesome, @fortawesome/free-solid-svg-icons

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWheatAwn,
  faIndustry,
  faBuilding,
  faBolt,
  faRocket,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./Sectors.module.css";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

interface Sector {
  id: number;
  icon: IconDefinition;
  title: string;
  desc: string;
  accentLine: string; // short keyword shown on card accent
}

const SECTORS: Sector[] = [
  {
    id: 1,
    icon: faWheatAwn,
    title: "Agriculture & Agro-Industries",
    desc: "Enhancing food security and value creation across Bauchi's fertile agricultural belt.",
    accentLine: "Food & Export",
  },
  {
    id: 2,
    icon: faIndustry,
    title: "Manufacturing & Processing",
    desc: "Building competitive industries for local production, import substitution and global export.",
    accentLine: "Industry & Trade",
  },
  {
    id: 3,
    icon: faBuilding,
    title: "Real Estate & Infrastructure",
    desc: "Developing sustainable communities, industrial parks and critical public infrastructure.",
    accentLine: "Build & Connect",
  },
  {
    id: 4,
    icon: faBolt,
    title: "Energy & Renewables",
    desc: "Powering economic growth with clean, reliable and accessible energy solutions.",
    accentLine: "Power & Climate",
  },
  {
    id: 5,
    icon: faRocket,
    title: "SMEs & Entrepreneurship",
    desc: "Supporting emerging businesses, start-ups and local entrepreneurs with capital and mentorship.",
    accentLine: "Growth & Scale",
  },
  {
    id: 6,
    icon: faGraduationCap,
    title: "Education & Human Capital",
    desc: "Investing in skills, knowledge, vocational training and innovation ecosystems.",
    accentLine: "Learn & Grow",
  },
];

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// Cards: slide in from bottom with a slight blur
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1], // custom cinematic easing (expo out)
    },
  },
};

// Header: slides up with fade
const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const eyebrowVariants = {
  hidden: { opacity: 0, y: 20, scaleX: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background texture grid */}
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Section header ── */}
        <div className={styles.header}>
          <motion.span
            className={styles.eyebrow}
            variants={eyebrowVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            Our Focus Areas
          </motion.span>

          <motion.h2
            className={styles.heading}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            transition={{ delay: 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Sectors We&nbsp;Serve
          </motion.h2>

          <motion.p
            className={styles.subheading}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            transition={{ delay: 0.28, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Driving sustainable growth across key industries that define
            Bauchi State's economic future.
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {SECTORS.map((sector) => (
            <motion.article
              key={sector.id}
              className={styles.card}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Gold top border accent */}
              <div className={styles.cardTopAccent} />

              {/* Icon */}
              <div className={styles.iconWrap}>
                <FontAwesomeIcon icon={sector.icon} className={styles.icon} />
              </div>

              {/* Content */}
              <div className={styles.cardBody}>
                <span className={styles.accentLine}>{sector.accentLine}</span>
                <h3 className={styles.cardTitle}>{sector.title}</h3>
                <p className={styles.cardDesc}>{sector.desc}</p>
              </div>

              {/* Bottom cta arrow */}
              <div className={styles.cardFooter}>
                <span className={styles.learnMore}>
                  Learn more
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
