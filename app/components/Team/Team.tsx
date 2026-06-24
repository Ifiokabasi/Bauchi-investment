"use client";

// components/ManagementTeam/ManagementTeamCinematic.tsx
// Place at: components/ManagementTeam/ManagementTeamCinematic.tsx
// Requires:
//   npm install framer-motion @fortawesome/react-fontawesome
//   npm install @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./Team.module.css";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */

interface TeamMember {
  id: number;
  name: string;
  nameLines: [string, string];   // split for line break
  roleBadge: string;             // short badge shown at rest
  roleFulls: string;             // full title shown on hover
  desc: string;
  image: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

/* ─────────────────────────────────────────
   Data  — replace image paths & socials
───────────────────────────────────────── */

const TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Sani Abdullahi Umar",
    nameLines: ["Sani Abdullahi", "Umar"],
    roleBadge: "Acting MD / CEO",
    roleFulls: "Acting Managing Director & CEO",
    desc: `Sani Abdullahi Umar is the Ag. Managing Director of Bauchi Investment Corporation (BIC) Ltd. He has about three decades of experience in staff development, talent recruitment and entrenching enabling work
environment. 

Sani has contributed immensely to BIC through organisational structuring, oversight of daily operations, institutionalisation of performance Management system, conflict resolution to mention a few.

His passion for setting priorities, execution of the company objectives, building top performance team and the entrenchment of core values that align with the company's priorities has led to a significant
improvement in the overall organisational performance.`,
    image: "/images/sani-abdullahi-umar.jpg",
    socials: {
      linkedin:  "https://www.linkedin.com/in/sani-umar-586461413/",
      twitter:   "https://twitter.com",
      facebook:  "https://www.facebook.com/share/1FLFcGwiCM/",
      instagram: "https://www.instagram.com/umar_sani1?igsh=MXEyZ3B3ZHBsOWtidQ==",
    },
  },
  {
    id: 2,
    name: "Mustapha Muhammad Makama",
    nameLines: ["Mustapha Muhammad", "Makama"],
    roleBadge: "Head, Investments",
    roleFulls: "Head Investments",
    desc: `Mustapha Muhammad Makama is a Senior Manager, Investments at Bauchi Investment Corporation Limited (BICL). He brings expertise in portfolio management, financial advisory, and consultancy services, with a strong focus on investment appraisal and financial guidance.`,
    image: "/images/mustapha-muhammad-makama.jpg",
    socials: {
      linkedin:  "https://linkedin.com",
      twitter:   "https://twitter.com",
      facebook:  "https://www.facebook.com/share/18eq1JUuVQ/",
      instagram: "https://www.instagram.com/mustaphamuhammadmakama?igsh=MWdnaWM3ZmhjOTRnMg==",
    },
  },
  {
    id: 3,
    name: "Muhammed Murtala Abdullahi",
    nameLines: ["Muhammed Murtala", "Abdullahi"],
    roleBadge: "Head, Properties",
    roleFulls: "Head Properties",
    desc: "Lorem ipsum dolor sit amet, xercitation ullamco laboris nisi ut aliquip. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do",
    image: "/images/muhammed-murtala-abdullahi.jpg",
    socials: {
      linkedin:  "https://linkedin.com",
      twitter:   "https://twitter.com",
      facebook:  "https://facebook.com",
      instagram: "https://instagram.com"
    },
  },
  {
    id: 4,
    name: "Hafsat Adamu",
    nameLines: ["Hafsat", "Adamu"],
    roleBadge: "Head, Admin & HRI",
    roleFulls: "Head Admin & HRI",
    desc: "Lorem ipsum dolor sit amet, xercitation ullamco laboris nisi ut aliquip. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do",
    image: "/images/hafsat-adamu.jpg",
    socials: {
      linkedin:  "https://linkedin.com",
      twitter:   "https://twitter.com",
      facebook:  "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: 5,
    name: "Ahmad Bello",
    nameLines: ["Ahmad", "Bello"],
    roleBadge: "Head, Finance",
    roleFulls: "Head Finance & Accounts",
    desc: `Ahmadu Bello joined Bauchi Investment Corporation (BIC) Ltd. on April 1, 2012. With extensive experience in Accounting and Finance, he has played a pivotal role in reshaping the company's financial systems to align with global best practices.

His contributions include ensuring full compliance with International Financial Reporting Standards (IFRS) and other regulatory requirements, while strengthening the organisation's overall financial operations.`,
    image: "/images/ahmad-bello.jpg",
    socials: {
      linkedin:  "https://linkedin.com",
      twitter:   "https://twitter.com",
      facebook:  "https://www.facebook.com/profile.php?id=100078686627411",
      instagram: "https://www.instagram.com/ahmadu1839?igsh=MXNnNXAzbW9oN2V5",
    },
  },
  {
    id: 6,
    name: "Abubakar Sadiq Ahmed",
    nameLines: ["Abubakar Sadiq", "Ahmed"],
    roleBadge: "Head, Internal Audit",
    roleFulls: "Head Internal Audit",
    desc: `Abubakar Sadiq of internal audit with expertise in risk assessment,internal controls, compliance monitoring, and financial analysis.skilled in conducting audits.`,
    image: "/images/abubakar-sadiq-ahmed.jpg",
    socials: {
      linkedin:  "linkedin.com/in/sadiq-yusuf-zaria-264098418",
      twitter:   "https://twitter.com",
      facebook:  "https://www.facebook.com/share/1CzymUrMvh/",
      instagram: "https://www.instagram.com/sadiqyusufzaria?igsh=OTZwZmZoMGN4MG1s",
    },
  },


  {
    id: 7,
    name: " ⁠Idris Danladi",
    nameLines: ["Idris", "Danladi"],
    roleBadge: "Head, Corporate Services",
    roleFulls: "Head Corporate Services",
    desc: `Idris Danladi is the Assistant Manager, Corporate Services at Bauchi Investment Corporation Limited (BIC). He has experience in corporate communications, administration, stakeholder engagement, and digital media management. 

He contributes to strengthening BIC’s public image and institutional operations through strategic communication and organizational support. Idris is passionate about investment promotion, business development, and corporate innovation.`,
    image: "/images/idris-danladi.jpg",
    socials: {
      linkedin:  "https://www.linkedin.com/in/idris-danladi-anipr-8bba9464",
      twitter:   "https://twitter.com",
      facebook:  "https://www.facebook.com/idris.danladi.7359?mibextid=ZbWKwL",
      instagram: "https://www.instagram.com/idrisdanladi_?igsh=N3pzZzdiMmJlY2wy",
    },
  }
];

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */

const CINEMATIC = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: CINEMATIC },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: CINEMATIC, delay },
  }),
};

/* ─────────────────────────────────────────
   Social icon map
───────────────────────────────────────── */

const SOCIAL_ICONS = [
  { key: "linkedin"  as const, icon: faLinkedinIn, label: "LinkedIn"   },
  { key: "twitter"   as const, icon: faXTwitter,   label: "Twitter / X" },
  { key: "facebook"  as const, icon: faFacebookF,  label: "Facebook"   },
  { key: "instagram" as const, icon: faInstagram,  label: "Instagram"  },
];

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function ManagementTeamCinematic() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.div
            className={styles.tag}
            custom={0}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            Leadership
          </motion.div>
          <motion.h2
            className={styles.heading}
            custom={0.1}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            Management<br />
            <span className={styles.heading}>Team</span>
          </motion.h2>
        </div>

        <div className={styles.headerRight}>
          {/* <motion.div
            className={styles.memberCount}
            custom={0.2}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {String(TEAM.length).padStart(2, "0")}
          </motion.div> */}
          <motion.p
            className={styles.headerDesc}
            custom={0.25}
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            The experienced executives steering Bauchi Investment Corporation
            toward transformative economic growth.
          </motion.p>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        {TEAM.map((member, idx) => (
          <motion.article
            key={member.id}
            className={styles.card}
            variants={cardVariants}
          >
            {/* Photo */}
            <div className={styles.imgWrap}>
              <Image
                src={member.image}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw"
              />
            </div>

            {/* Index number */}
            <span className={styles.indexNum}>
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Resting name plate (always visible) */}
            <div className={styles.namePlate}>
              <p className={styles.namePlateRole}>{member.roleBadge}</p>
              <h3 className={styles.namePlateName}>
                {member.nameLines[0]}<br />{member.nameLines[1]}
              </h3>
            </div>

            {/* Hover reveal panel */}
            <div className={styles.hoverPanel}>
              <p className={styles.hoverRole}>{member.roleFulls}</p>
              <h3 className={styles.hoverName}>
                {member.nameLines[0]}<br />{member.nameLines[1]}
              </h3>
              <div className={styles.rule} />
              <p className={styles.hoverDesc}>{member.desc}</p>

              <div className={styles.socials}>
                {SOCIAL_ICONS.map(({ key, icon, label }) =>
                  member.socials[key] ? (
                    <Link
                      key={key}
                      href={member.socials[key]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={label}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </Link>
                  ) : null
                )}
              </div>

              <Link href={`/team/${member.id}`} className={styles.profileLink}>
                Full profile{" "}
                <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
              </Link>
            </div>

            {/* Gold sweep underline on hover */}
            <div className={styles.goldSweep} />
          </motion.article>
        ))}
      </motion.div>

      {/* ── Footer bar ── */}
      <div className={styles.bar}>
        <span className={styles.barText}>
          Bauchi Investment Corporation Limited — Leadership Directory 2025
        </span>
        <Link href="/team" className={styles.barLink}>
          View All Team Members{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

    </section>
  );
}
