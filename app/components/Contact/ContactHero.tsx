// app/contact/page.tsx (Hero Section Only)
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./ContactHero.module.css";

export default function ContactPage() {
  return (
    <main className={styles.page}>
      {/* ══ PAGE HERO — matching About page style ══ */}
      <section className={styles.pageHero}>
        <div className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Bauchi Investment Corporation
          </motion.div>
          <motion.h1
            className={styles.heroH}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            Contact Us
          </motion.h1>
          <motion.div
            className={styles.heroRule}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          />
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          >
            Let us know how we can serve you. Reach out to our team for
            investment inquiries, partnership opportunities, or general questions.
          </motion.p>
        </div>
        <motion.div
          className={styles.heroScroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className={styles.scrollLabel}>Scroll</span>
          <div className={styles.scrollArrow} />
        </motion.div>
      </section>

      {/* breadcrumb */}
      <div className={styles.introStrip}>
        <div className={styles.bc}>
          <Link href="/" className={styles.bcLink}>Home</Link>
          <span className={styles.bcSep}>/</span>
          <span className={styles.bcActive}>Contact Us</span>
        </div>
      </div>
    </main>
  );
}