"use client";

// components/Navbar/Navbar.tsx
// Place at: components/Navbar/Navbar.tsx

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Investment Opportunities", href: "/investments" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navbarInner}>

        {/* ── Logo ── */}
        <Link href="/" className={styles.navLogo}>
          <img src="/images/logo.jpeg" alt="BIC Logo" className={styles.logoImage} width="52" height="52" />
          <div className={styles.logoText}>
            <span className={styles.logoName}>
              BAUCHI INVESTMENT <br />
              CORPORATION LTD.
            </span>
          </div>
        </Link>

        {/* ── Links ── */}
        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={isActive(l.href) ? styles.active : ""}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right: CTA + hamburger ── */}
        <div className={styles.navRight}>
          <Link 
            href="/investments"  // ✅ Changed from "/invest" to "/investments"
            className={`${styles.investBtn} ${isActive("/investments") ? styles.investBtnActive : ""}`}
          >
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