"use client";

// components/Navbar/Navbar.tsx
// Place at: components/Navbar/Navbar.tsx

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home",                     href: "/" },
  { label: "About Us",                href: "/about" },
  { label: "Blog",            href: "/blog" },
  { label: "Investment Opportunities", href: "/investments" },
 
  { label: "Contact Us",              href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarInner}>

        {/* ── Logo ── */}
        <Link href="/" className={styles.navLogo}>
          <img src ="/images/logo.jpeg" alt="BIC Logo" className={styles.logoImage}  width="52" height="52"/>
          <div className={styles.logoText}>
            <span className={styles.logoName}>BAUCHI INVESTMENT <br></br>CORPORATION LTD.</span>
          
           
          </div>
        </Link>

        {/* ── Links ── */}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={l.label === "Home" ? styles.active : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right: CTA + hamburger ── */}
        <div className={styles.navRight}>
          <Link href="/invest" className={styles.investBtn}>
            Invest Now
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </nav>
  );
}
