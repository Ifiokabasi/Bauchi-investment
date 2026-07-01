"use client";

// app/contact/page.tsx  (or components/Contact/ContactPage.tsx)
// Requires: @fortawesome/react-fontawesome, @fortawesome/free-solid-svg-icons,
//           @fortawesome/free-brands-svg-icons, framer-motion

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faArrowRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedinIn,
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./ContactPage.module.css";

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */

const CONTACT_ITEMS = [
  {
    icon: faLocationDot,
    label: "Office Location",
    value: "37, Abdulkadir Ahmed Road, P.M.B 0162, Bauchi Nigeria",
  },
  {
    icon: faPhone,
    label: "Phone",
    value: "+234 (0) 7041614459",
  },
  {
    icon: faEnvelope,
    label: "Email",
    value: "info@bauchiinvestments.com.ng",
  },
  {
    icon: faClock,
    label: "Office Hours",
    value: "Mon – Fri, 8:00am – 5:00pm WAT",
  },
];

const OFFICES = [
  { name: "Bauchi State Headquarters", active: true },
  { name: "Abuja Liaison Office — Abuja Investments", active: false },
  { name: "Lagos Representative Office", active: false },
];

const INQUIRY_TYPES = [
  "Investment",
  "Partnership",
  "Project Funding",
  "Media",
  "General",
];

const SECTORS = [
  "Agriculture & Agro-Industries",
  "Manufacturing & Processing",
  "Real Estate & Infrastructure",
  "Energy & Renewables",
  "SMEs & Entrepreneurship",
  "Education & Human Capital",
  "Other",
];

const SOCIAL_LINKS = [
  { icon: faLinkedinIn, label: "LinkedIn",    href: "https://www.linkedin.com/company/bauchi-investment-corporation-ltd/" },
  { icon: faXTwitter,   label: "Twitter / X", href: "https://x.com/bauchiinvestltd"  },
  { icon: faFacebookF,  label: "Facebook",    href: "https://www.facebook.com/share/1Bbk5JWiKB/" },
  { icon: faInstagram,  label: "Instagram",   href: "https://www.instagram.com/bauchiinvestmentcorp?igsh=MWo2YndqdmxiM3JhbA=="},
];

/* ─────────────────────────────────────────
   Animation helpers
───────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */

export default function ContactPage() {
  const [activeInquiry, setActiveInquiry] = useState("Investment");
  const [submitted, setSubmitted]         = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "",
    organisation: "", sector: "", message: "",
  });

  const pageRef  = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: true, margin: "-60px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up your API / email service here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const handleClear = () => {
    setForm({ firstName: "", lastName: "", email: "", phone: "",
              organisation: "", sector: "", message: "" });
    setActiveInquiry("Investment");
  };

  return (
    <div ref={pageRef} className={styles.page}>

      {/* ── LEFT PANEL — dark cinematic ── */}
      <div className={styles.left}>
        <div className={styles.leftBg} />

        <div className={styles.leftContent}>
          <motion.div className={styles.tag} {...fadeUp(0)}>
            Get In Touch
          </motion.div>

          <motion.h1 className={styles.leftHeading} {...fadeUp(0.1)}>
            Let&rsquo;s Build<br />Something
            <span className={styles.headingOutline}>Together</span>
          </motion.h1>

          <motion.p className={styles.leftDesc} {...fadeUp(0.2)}>
            Whether you&rsquo;re an investor, a development partner, or an
            entrepreneur ready to grow in Bauchi State — we want to hear from you.
          </motion.p>

          <motion.div className={styles.contactItems} {...fadeUp(0.3)}>
            <h2 className={`${styles.ciHeader} text-white font-semibold`}>Contact Information</h2>
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className={styles.ci}>
                <div className={styles.ciIcon}>
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div>
                  <p className={styles.ciLabel}>{item.label}</p>
                  <p className={styles.ciVal}>
                    {item.value.split("\n").map((line, i) => (
                      <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <div className={styles.dividerL} />

          {/* <motion.div className={styles.offices} {...fadeUp(0.4)}>
            <p className={styles.officesLabel}>Our Offices</p>
            {OFFICES.map((o) => (
              <div key={o.name} className={styles.officeRow}>
                <div
                  className={styles.officeDot}
                  style={!o.active ? { background: "rgba(255,255,255,0.22)" } : {}}
                />
                <span className={styles.officeName}>{o.name}</span>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* Social row */}
        <motion.div className={styles.leftFooter} {...fadeUp(0.5)}>
          <h2 className={styles.followTag}>Follow Us</h2>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map(({ icon, label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sl}
                aria-label={label}
              >
                <FontAwesomeIcon icon={icon} />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — light form ── */}
      <div className={styles.right}>
        <motion.div className={styles.formAccent} {...fadeUp(0)} />

        <motion.div className={styles.formTag} {...fadeUp(0.05)}>
          Send a Message
        </motion.div>

        <motion.h2 className={styles.formHeading} {...fadeUp(0.12)}>
          Start a <em>Conversation</em>
        </motion.h2>

        <motion.p className={styles.formSub} {...fadeUp(0.18)}>
          Fill in the form below and our team will respond within one business day.
        </motion.p>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          {...fadeUp(0.24)}
        >
          {/* Inquiry type pills */}
          <p className={styles.pillLabel}>I&rsquo;m reaching out about</p>
          <div className={styles.pills}>
            {INQUIRY_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={`${styles.pill} ${activeInquiry === type ? styles.pillActive : ""}`}
                onClick={() => setActiveInquiry(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Name row */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text" id="firstName" name="firstName"
                placeholder="Abubakar"
                value={form.firstName} onChange={handleChange} required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text" id="lastName" name="lastName"
                placeholder="Suleiman"
                value={form.lastName} onChange={handleChange} required
              />
            </div>
          </div>

          {/* Contact row */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email" id="email" name="email"
                placeholder="name@company.com"
                value={form.email} onChange={handleChange} required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel" id="phone" name="phone"
                placeholder="+234 800 000 0000"
                value={form.phone} onChange={handleChange}
              />
            </div>
          </div>

          {/* Organisation */}
          <div className={styles.field}>
            <label htmlFor="organisation">Organisation / Company</label>
            <input
              type="text" id="organisation" name="organisation"
              placeholder="Company name (optional)"
              value={form.organisation} onChange={handleChange}
            />
          </div>

          {/* Sector */}
          <div className={styles.field}>
            <label htmlFor="sector">Sector of Interest</label>
            <select
              id="sector" name="sector"
              value={form.sector} onChange={handleChange}
            >
              <option value="" disabled>Select a sector…</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name="message"
              placeholder="Tell us about your interest or inquiry…"
              value={form.message} onChange={handleChange} required
            />
          </div>

          {/* Submit */}
          <div className={styles.submitRow}>
            <button type="submit" className={styles.btnSubmit}>
              Send Message <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button type="button" className={styles.btnGhost} onClick={handleClear}>
              Clear
            </button>
          </div>

          {/* Success toast */}
          {submitted && (
            <div className={styles.toast}>
              <FontAwesomeIcon icon={faCircleCheck} className={styles.toastIcon} />
              <span>Message sent! Our team will be in touch within one business day.</span>
            </div>
          )}

          <p className={styles.disclaimer}>
            By submitting this form you agree to our privacy policy. Your
            information will only be used to respond to your inquiry and will
            not be shared with third parties.
          </p>
        </motion.form>
      </div>

    </div>
  );
}
