// components/Footer/Footer.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.css";

const socials = [
  { label: "Facebook", href: "#", icon: faFacebookF },
  { label: "X", href: "#", icon: faXTwitter },
  { label: "LinkedIn", href: "#", icon: faLinkedinIn },
  { label: "Instagram", href: "#", icon: faInstagram },
];

const quickLinks = [
  { label: "Home", href: "/home" },
  { label: "Investment Opportunities", href: "/investments" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      {/* Cinematic gradient overlay */}
      <div className={styles.cinematicOverlay} />

      <div className={styles.footerInner}>
        {/* ── Brand Column ── */}
        <div className={styles.brandColumn}>
          <div className={styles.footerLogo}>
            <div className={styles.logoIcon}>
              <img
                src="/images/logo.jpeg"
                alt="Bauchi Investment Corporation Logo"
                className={styles.logoImage}
              />
            </div>
            <div className={styles.footerLogoName}>
              BAUCHI INVESTMENT
              <br />
              CORPORATION LIMITED
            </div>
          </div>
          <p className={styles.footerTagline} >
            Catalyzing Investment, Powering Prosperity.
          </p>
        </div>

        {/* ── Contact Column ── */}
        <div className={styles.contactColumn}>
          <h3 className={styles.columnTitle}>Contact</h3>
          <div className={styles.contactList}>
            <a href="tel:+2348031234567" className={styles.contactItem}>
              <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
              <span>+234 07041614459</span>
            </a>
            <a href="mailto:bauchiinvesmentcorp@gmail.com" className={styles.contactItem}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
              <span>bauchiinvesmentcorp@gmail.com</span>
            </a>
            <div className={styles.contactItem}>
              <FontAwesomeIcon icon={faLocationDot} className={styles.contactIcon} />
              <span>Bauchi State, Nigeria</span>
            </div>
          </div>
        </div>

        {/* ── Links Column ── */}
        <div className={styles.linksColumn}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.linksList}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  {/* <FontAwesomeIcon icon={faArrowRight} className={styles.linkIcon} /> */}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Socials Column ── */}
        {/* <div className={styles.socialColumn}>
          <h3 className={styles.columnTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialBtn}
                aria-label={s.label}
              >
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div> */}
      </div>

      <div className={styles.footerBottom}>
        <p>© {year} Bauchi Investment Corporation Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}