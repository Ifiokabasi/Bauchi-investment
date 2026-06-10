"use client";

// components/StatsBand/StatsBand.tsx
// Place at: components/StatsBand/StatsBand.tsx

import styles from "./StatsBand.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faHandshake, faBuildingColumns, faChartLine } from "@fortawesome/free-solid-svg-icons";


const stats = [
  {
    icon: faBriefcase,
    value: "120,000+",
    label: "Jobs Created",
    sub: "Direct & Indirect",
  },
  {
    icon: faHandshake,
    value: "85+",
    label: "Strategic Partnerships",
    sub: "Local & International",
  },
  {
    icon: faBuildingColumns,
    value: "₦42B+",
    label: "Investments Facilitated",
    sub: "Across All Sectors",
  },
  {
    icon: faChartLine,
    value: "₦310B",
    label: "Equity Market Cap",
    sub: "Portfolio Valuation",
  },
];

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={styles.iconWrap}>
              <FontAwesomeIcon icon={stat.icon} className={styles.icon} aria-hidden="true" />
            </div>
            <div className={styles.textWrap}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.sub}>{stat.sub}</span>
            </div>
            {i < stats.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  );
}