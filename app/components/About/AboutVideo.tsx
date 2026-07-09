// app/components/AboutVideo.tsx
"use client";

import { motion } from "framer-motion";
import styles from "./AboutVideo.module.css";

export default function AboutVideo() {
  return (
    <section className={styles.videoSection}>
      <div className={styles.videoInner}>
       <motion.div
          className={styles.videoHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-40px 0px" }}
        >
          <div className={styles.videoEyebrow}>Our Story</div>
          <h2 className={styles.videoTitle}>
            Building Bauchi's <span className={styles.videoHighlight}>Future</span>
          </h2>
          <div className={styles.videoRule} />
          <p className={styles.videoSub}>
            Watch our journey and see how we're investing in Bauchi's future
          </p>
        </motion.div>
        

        {/* Video Player */}
        <motion.div
          className={styles.videoWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true, margin: "-40px 0px" }}
        >
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/GAe453y7UG8"
              title="Bauchi Investment Corporation (BIC) Ltd: Our Story"
              className={styles.videoIframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className={styles.videoCaption}>
            Bauchi Investment Corporation — Investing in Bauchi's Future
          </p>
        </motion.div>
      </div>
    </section>
  );
}