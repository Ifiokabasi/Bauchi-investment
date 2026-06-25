// components/Investments/IncentivesLedger.tsx
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./incentivesLedger.module.css";
import { incentives, sectors, type IncentiveLevel } from "./incentivesData";

const LEVEL_FILTERS: { label: string; value: IncentiveLevel | "All" }[] = [
  { label: "All levels", value: "All" },
  { label: "State", value: "State" },
  { label: "Federal", value: "Federal" },
  { label: "State / Federal", value: "State/Federal" },
];

function levelClass(level: IncentiveLevel) {
  if (level === "State") return styles.levelState;
  if (level === "Federal") return styles.levelFederal;
  return styles.levelBoth;
}

const PDF_PATH = "/documents/bauchi-state-investment-incentives.pdf";

export default function IncentivesLedger() {
  const [levelFilter, setLevelFilter] = useState<IncentiveLevel | "All">("All");
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return incentives.filter((item) => {
      const levelOk = levelFilter === "All" || item.level === levelFilter;
      const sectorOk = sectorFilter === "All" || item.sector === sectorFilter;
      return levelOk && sectorOk;
    });
  }, [levelFilter, sectorFilter]);

  function toggleRow(no: number) {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(no)) {
        next.delete(no);
      } else {
        next.add(no);
      }
      return next;
    });
  }

  function clearFilters() {
    setLevelFilter("All");
    setSectorFilter("All");
  }

  const stateCount = incentives.filter((i) => i.level !== "Federal").length;
  const federalCount = incentives.filter((i) => i.level !== "State").length;

  return (
    <div className={styles.wrap}>
      {/* ── Intro / stats ── */}
      <section className={styles.intro}>
        <div>
          <div className={styles.introEyebrow}>The Incentive Register</div>
          <h2 className={styles.introTitle}>
            17 incentives, one place to find them
          </h2>
          <p className={styles.introBody}>
            Every fiscal, land, and regulatory incentive available to
            investors in Bauchi State — sourced directly from the official
            incentive schedule administered by the Bauchi Investment
            Corporation, the State Government, and federal agencies.
            Filter by level or sector, or download the complete schedule
            below.
          </p>
        </div>
        <div className={styles.statRow}>
          <div className={styles.stat}>
            <div className={styles.statNum}>{incentives.length}</div>
            <div className={styles.statLabel}>Total Incentives</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>{stateCount}</div>
            <div className={styles.statLabel}>State Level</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>{federalCount}</div>
            <div className={styles.statLabel}>Federal Level</div>
          </div>
        </div>
      </section>

      {/* ── Download band ── */}
      <section className={styles.downloadBand}>
        <div className={styles.downloadCard}>
          <div className={styles.downloadLeft}>
            <div className={styles.seal} aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M8 13h8M8 16.5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className={styles.downloadHead}>Official Document</div>
              <div className={styles.downloadTitle}>
                Bauchi State Investment Incentives Schedule
              </div>
              <div className={styles.downloadMeta}>PDF · 2 pages · Bauchi Investment Corporation Limited</div>
            </div>
          </div>
          <a
            href={PDF_PATH}
            download="Bauchi-State-Investment-Incentives.pdf"
            className={styles.downloadBtn}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download PDF
          </a>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          <span className={styles.filterLabel}>Level</span>
          {LEVEL_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.chip} ${levelFilter === f.value ? styles.chipActive : ""}`}
              onClick={() => setLevelFilter(f.value)}
              aria-pressed={levelFilter === f.value}
            >
              {f.label}
            </button>
          ))}

          <select
            className={styles.sectorSelect}
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            aria-label="Filter by sector"
          >
            <option value="All">All sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <span className={styles.resultCount}>
            {filtered.length} of {incentives.length} shown
          </span>
        </div>
      </div>

      {/* ── Ledger ── */}
      <section className={styles.ledger}>
        {filtered.length === 0 && (
          <div className={styles.empty}>
            No incentives match those filters.
            <br />
            <button className={styles.emptyClear} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}

        {filtered.map((item) => {
          const isOpen = openRows.has(item.no);
          return (
            <div key={item.no} className={styles.entry}>
              <button
                className={styles.entryHead}
                onClick={() => toggleRow(item.no)}
                aria-expanded={isOpen}
                aria-controls={`incentive-${item.no}`}
              >
                <span className={styles.entryNo}>
                  {String(item.no).padStart(2, "0")}
                </span>
                <span className={styles.entryMain}>
                  <span className={styles.entryName}>{item.name}</span>
                  <span className={styles.entrySector}>{item.sector}</span>
                </span>
                <span className={`${styles.levelTag} ${levelClass(item.level)}`}>
                  {item.level}
                </span>
                <span className={styles.entryYear}>{item.yearIntroduced}</span>
                <svg
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`incentive-${item.no}`}
                    className={styles.entryBody}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={styles.entryBodyInner}>
                      <div aria-hidden="true" />
                      <div className={styles.entryDetailGrid}>
                        <div className={styles.detailBlock}>
                          <div className={styles.detailLabel}>Description</div>
                          <div className={styles.detailText}>{item.description}</div>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Eligibility</div>
                          <div className={styles.detailTextMuted}>{item.eligibility}</div>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Duration</div>
                          <div className={styles.detailTextMuted}>{item.duration}</div>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Legal Instrument</div>
                          <div className={styles.detailTextMuted}>{item.legalInstrument}</div>
                        </div>
                        <div>
                          <div className={styles.detailLabel}>Implementing Agency</div>
                          <div className={styles.detailTextMuted}>{item.implementingAgency}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </div>
  );
}
