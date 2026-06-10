"use client";

// components/Hero/Hero.tsx
// Place at: components/Hero/Hero.tsx

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Hero.module.css";

/* ─────────────────────────────────────────
   Slide data — swap images/copy as needed
───────────────────────────────────────── */

const slides = [
  {
    eyebrow: "Bauchi Investment Corporation Limited",
    title: ["Investing in", "Bauchi's Future"],
    subtitle:
      "We drive sustainable economic growth by mobilizing capital, enabling strategic partnerships, developing infrastructure and supporting businesses across Bauchi State.",
    cta1: { label: "Explore Opportunities →", href: "/investments" },
    cta2: { label: "▶ Watch Our Story",       href: "#video" },
    stat: { num: "₦50B+", label: "Capital Mobilized" },
    tag: null,
    image: "/images/bicHouse.jpg",
  },
  {
    eyebrow: null,
    title: ["Growing the", "Green Economy"],
    subtitle:
      "Bauchi State's fertile land and favorable climate present unmatched agricultural investment opportunities — from commodity farming to agro-processing and export logistics.",
    cta1: { label: "Agriculture Sector →",  href: "/sectors/agriculture" },
    cta2: { label: "Download Prospectus",   href: "/prospectus.pdf" },
    stat: { num: "2.4M", label: "Hectares of Arable Land" },
    tag: "Strategic Agriculture",
    image: "/images/agric.jpg",
  },
  {
    eyebrow: null,
    title: ["Building the", "Foundations of", "Tomorrow"],
    subtitle:
      "From roads and bridges to modern industrial parks, BIC leads transformative infrastructure projects that unlock Bauchi's vast economic potential.",
    cta1: { label: "View Projects →",      href: "/projects" },
    cta2: { label: "Partnership Inquiry",  href: "/contact" },
    stat: { num: "30+", label: "Active Projects" },
    tag: "Infrastructure Development",
    image: "/images/ore.jpg",
  },
  {
    eyebrow: null,
    title: ["Connecting", "Bauchi to the", "World"],
    subtitle:
      "BIC bridges local opportunity with global capital — facilitating joint ventures, diaspora investment, and international partnerships that deliver lasting prosperity.",
    cta1: { label: "Meet Our Partners →", href: "/partners" },
    cta2: { label: "Visit Abuja Office",  href: "/abujainvestments" },
    stat: { num: "18", label: "Global Partner Nations" },
    tag: "Global Partnerships",
    image: "/images/bauchiCityGate.jpg",
  },
];

/* ─────────────────────────────────────────
   Tag icon SVGs (keyed to tag label)
───────────────────────────────────────── */

function TagIcon({ tag }: { tag: string }) {
  if (tag === "Strategic Agriculture")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  if (tag === "Infrastructure Development")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  if (tag === "Global Partnerships")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
      </svg>
    );
  return null;
}

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function Hero() {
  const [current, setCurrent]   = useState(0);
  const [animKey, setAnimKey]   = useState(0); // forces anim replay
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef             = useRef<HTMLDivElement>(null);
  const INTERVAL                = 5500;

  const startProgress = useCallback(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.classList.remove(styles.running);
    void bar.offsetWidth; // reflow
    bar.classList.add(styles.running);
  }, []);

  const goTo = useCallback(
    (n: number) => {
      setCurrent((n + slides.length) % slides.length);
      setAnimKey((k) => k + 1);
      startProgress();
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setAnimKey((k) => k + 1);
        startProgress();
      }, INTERVAL);
    },
    [startProgress]
  );

  useEffect(() => {
    startProgress();
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setAnimKey((k) => k + 1);
      startProgress();
    }, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Progress bar */}
      <div ref={progressRef} className={styles.progressBar} />

      <div className={styles.slidesWrap}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.active : ""}`}
          >
            {/* Background image */}
            <div
              className={styles.slideImg}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Gradient overlay */}
            <div className={styles.slideOverlay} />

            {/* Content */}
            <div className={styles.slideContent}>
              <div className={styles.slideLeft}>

                {/* Eyebrow or tag — both use heroEyebrow animation */}
                {slide.eyebrow && (
                  <p key={`ey-${animKey}`} className={styles.heroEyebrow}>
                    {slide.eyebrow}
                  </p>
                )}
                {slide.tag && (
                  <div key={`tag-${animKey}`} className={`${styles.heroEyebrow} ${styles.visionTag}`}>
                    <TagIcon tag={slide.tag} />
                    {slide.tag}
                  </div>
                )}

                {/* Gold rule */}
                <span key={`rule-${animKey}`} className={styles.heroRule} />

                {/* Title — heroTitle */}
                <h1 key={`title-${animKey}`} className={styles.heroTitle}>
                  {slide.title.map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < slide.title.length - 1 && <br />}
                    </span>
                  ))}
                </h1>

                {/* Subtitle — heroSubtitle */}
                <p key={`sub-${animKey}`} className={styles.heroSubtitle}>
                  {slide.subtitle}
                </p>

                {/* CTAs — heroCTA */}
                <div key={`cta-${animKey}`} className={styles.heroCTA}>
                  <a href={slide.cta1.href} className={styles.btnGold}>
                    {slide.cta1.label}
                  </a>
                  <a href={slide.cta2.href} className={styles.btnGhost}>
                    {slide.cta2.label}
                  </a>
                </div>
              </div>

              {/* Stat card — heroStat */}
              <div className={styles.slideRight}>
                <div key={`stat-${animKey}`} className={`${styles.heroStat} ${styles.statCard}`}>
                  <div className={styles.statNum}>{slide.stat.num}</div>
                  <div className={styles.statLabel}>{slide.stat.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide counter */}
      <div className={styles.slideNum}>
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.active : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <div className={styles.navArrows}>
        <button className={styles.navBtn} onClick={() => goTo(current - 1)} aria-label="Previous slide">
          &#8592;
        </button>
        <button className={styles.navBtn} onClick={() => goTo(current + 1)} aria-label="Next slide">
          &#8594;
        </button>
      </div>
    </section>
  );
}
