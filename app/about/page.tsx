"use client";

// app/about/page.tsx  OR  components/About/AboutPage.tsx
// Requires: framer-motion, @fortawesome/react-fontawesome,
//           @fortawesome/free-solid-svg-icons

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved, faPeopleGroup, faHandshake, faBriefcase, faStar,
  faBullhorn, faBuilding, faChartLine, faMagnifyingGlassChart, faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./AboutPage.module.css";

/* ─────────────────────────────────────────
   Scroll-reveal wrapper (replaces CSS .reveal)
───────────────────────────────────────── */
type Direction = "up" | "left" | "right" | "scale";

function Reveal({
  children, direction = "up", delay = 0, className = "",
}: { children: ReactNode; direction?: Direction; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  const initial: Record<Direction, { opacity: number; x?: number; y?: number; scale?: number }> = {
    up:    { opacity: 0, y: 52 },
    left:  { opacity: 0, x: -52 },
    right: { opacity: 0, x: 52 },
    scale: { opacity: 0, scale: 0.9 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial[direction]}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */

const MILESTONES = [
  { year: "1977", title: "BIC Established",        desc: "Founded as BSIPDC with ₦3M initial share capital under Bauchi State Government.", active: true  },
  { year: "1986", title: "Capital Raised to ₦10M", desc: "Share capital increased in February 1986 to broaden scope and operational capacity.", active: false },
  { year: "2006", title: "Rebranded as BIC",        desc: "Renamed Bauchi Investment Corporation; capital raised to ₦500M to enable significant expansion.", active: false },
  { year: "2024", title: "Digital Transformation",  desc: "Launched digital investment services, e-dividend activation and CSCS account opening platforms.", active: false },
];

const VALUES = [
  { num: "01", icon: faShieldHalved, name: "Integrity" },
  { num: "02", icon: faPeopleGroup,  name: "Teamwork" },
  { num: "03", icon: faHandshake,    name: "Hospitality" },
  { num: "04", icon: faBriefcase,    name: "Professionalism" },
  { num: "05", icon: faStar,         name: "Commitment to Excellence" },
];

const SERVICES = [
  {
    num: "01", icon: faBullhorn,
    name: "Investment Promotion",
    desc: "Creating awareness on business opportunities and profit potentials of viable sectors in Bauchi State to drive foreign direct investment and private sector participation.",
    benefit: "Drives FDI and private sector participation in economic development.",
    features: "Website publications, digital marketing, radio & TV programmes, workshops & seminars.",
  },
  {
    num: "02", icon: faBuilding,
    name: "Property Development",
    desc: "Co-investing in critical infrastructural facilities such as housing, shops to let and rural power supplies through blended financing models.",
    benefit: "De-risks investment in housing & commercial outlets; land provision with direct community impact.",
    features: "Rent, leasing and Public Private Partnership (PPP) contracts.",
  },
  {
    num: "03", icon: faChartLine,
    name: "Portfolio Management",
    desc: "We manage government equity portfolios in the Nigerian stock market via our subsidiary BIC Securities Ltd, a licensed stockbroking firm facilitating capital market participation.",
    benefit: "Citizens participate in a capital market surpassing the ASI 250,000 mark in 2026.",
    features: "CSCS account opening, share dematerialisation, stockbroking & e-dividend activation.",
  },
  {
    num: "04", icon: faMagnifyingGlassChart,
    name: "Consultancy Services",
    desc: "Technical and commercial feasibility studies for prospective investors to determine business viability and structure optimal investment decisions.",
    benefit: "Structures deals, determines profitability ratios and conducts thorough risk analysis.",
    features: "NPV analysis, Internal Rate of Return (IRR), ROI modelling & investment decisions.",
  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function AboutPage() {
  return (
    <main className={styles.page}>

      {/* ══ PAGE HERO — image with slow zoom ══ */}
      <section className={styles.pageHero}>
        <div className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.3 }}
          >
            Bauchi Investment Corporation
          </motion.div>
          <motion.h1
            className={styles.heroH}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22,1,0.36,1], delay: 0.45 }}
          >
            About Us
          </motion.h1>
          <motion.div
            className={styles.heroRule}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.8 }}
          />
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22,1,0.36,1], delay: 0.65 }}
          >
            Bauchi State&rsquo;s premier development finance institution — mobilizing
            capital, enabling strategic partnerships and building a prosperous
            economy since 1977.
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
          <span className={styles.bcActive}>About Us</span>
        </div>
      </div>

      {/* ══ STORY ══ */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <Reveal direction="left" className={styles.storyText}>
            <div className={styles.tag}>Company Story</div>
            <h2 className={styles.storyH}>A Legacy of <em>Investment</em></h2>
            <p className={styles.storyP}>
              Bauchi Investment Corporation Limited (BIC) was established in June
              1977 as a development finance institution to stimulate economic growth
              and development via trade, commerce and industrialisation in Bauchi State.
            </p>
            <p className={styles.storyP}>
              Wholly owned by the Bauchi State Government, BIC commenced operations
              with an initial paid-up share capital of ₦3M — growing steadily to
              become one of Nigeria&rsquo;s most active state-level investment bodies.
            </p>
            <p className={styles.storyP}>
              Formerly known as the Bauchi State Investment and Property Development
              Company Ltd (BSIPDC), the company was rebranded as Bauchi Investment
              Corporation (BIC) in 2006, with share capital raised to ₦500M.
            </p>
          </Reveal>

          <Reveal direction="right" delay={0.1} className={styles.milestones}>
            {MILESTONES.map((m) => (
              <div key={m.year} className={`${styles.milestone} ${m.active ? styles.milestoneActive : ""}`}>
                <div className={styles.mYear}>{m.year}</div>
                <div className={styles.mDot} />
                <div className={styles.mContent}>
                  <div className={styles.mTitle}>{m.title}</div>
                  <div className={styles.mDesc}>{m.desc}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className={styles.mvSection}>
        <div className={styles.mvGrid}>
          <Reveal direction="left" className={styles.mvHalf}>
            <p className={styles.mvLabel}>Our Vision</p>
            <div className={styles.mvRule} />
            <h3 className={styles.mvTitle}>Best Destination of Choice for Investors in Nigeria</h3>
            <p className={styles.mvText}>
              To transform Bauchi State to be the leading and most attractive
              investment destination in Nigeria, offering world-class services
              and a business-friendly environment.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.1} className={`${styles.mvHalf} ${styles.mvHalfDark}`}>
            <p className={styles.mvLabel}>Our Mission</p>
            <div className={styles.mvRule} />
            <h3 className={styles.mvTitle}>One-Stop-Shop Investment Services</h3>
            <p className={styles.mvText}>
              To promote and facilitate investment, trade and competitive
              entrepreneurship by providing reliable, up-to-date information
              and one-stop-shop services to attract investment in Bauchi State.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className={styles.valuesSection}>
        <div className={styles.valBg} />
        <div className={styles.valInner}>
          <Reveal className={styles.valHeader}>
            <div className={`${styles.tag} ${styles.tagCenter}`}>Our Values</div>
            <h2 className={styles.valH}>
              The Principles <span className={styles.valOutline}>We Stand By</span>
            </h2>
          </Reveal>
          <div className={styles.valGrid}>
            {VALUES.map((v, i) => (
              <Reveal key={v.name} direction="scale" delay={i * 0.1} className={styles.valCard}>
                <div className={styles.valNum}>{v.num}</div>
                <div className={styles.valIcon}><FontAwesomeIcon icon={v.icon} /></div>
                <div className={styles.valName}>{v.name}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className={styles.servicesSection}>
        <div className={styles.svcInner}>
          <Reveal className={styles.svcHeader}>
            <div className={styles.tag}>What We Do</div>
            <h2 className={styles.svcH}>Our Core <em>Services</em></h2>
            <p className={styles.svcSub}>
              Four integrated service lines that drive investment, development
              and economic growth across Bauchi State.
            </p>
          </Reveal>
          <div className={styles.svcGrid}>
            {SERVICES.map((svc, i) => (
              <Reveal
                key={svc.num}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i % 2 === 0 ? 0 : 0.12}
                className={styles.svcCard}
              >
                <div className={styles.svcNum}>{svc.num}</div>
                <div className={styles.svcIcon}><FontAwesomeIcon icon={svc.icon} /></div>
                <h3 className={styles.svcName}>{svc.name}</h3>
                <p className={styles.svcDesc}>{svc.desc}</p>
                <div className={styles.svcDivider} />
                <div className={styles.svcDetails}>
                  <div>
                    <div className={styles.detailLabel}>Key Benefits</div>
                    <div className={styles.detailText}>{svc.benefit}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Key Features</div>
                    <div className={styles.detailText}>{svc.features}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className={styles.ctaStrip}>
        <div className={styles.ctaInner}>
          <Reveal direction="left">
            <div className={styles.ctaTag}>Ready to Invest?</div>
            <h3 className={styles.ctaH}>
              Start Your Investment Journey<br />in Bauchi State Today
            </h3>
            <p className={styles.ctaSub}>
              Talk to our team and explore the opportunities waiting for you.
            </p>
          </Reveal>
          <Reveal direction="right" delay={0.15} className={styles.ctaBtns}>
            <Link href="/investments" className={styles.btnGold}>
              Explore Opportunities <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link href="/contact" className={styles.btnOutlineW}>
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
