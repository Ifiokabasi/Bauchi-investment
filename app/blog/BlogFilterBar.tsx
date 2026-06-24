"use client";

// src/components/blog/BlogFilterBar.tsx
// Category filter pills — client component (URL state)

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "./BlogFilterBar.module.css";

const CATEGORIES = [
  { label: "All",            value: "all"           },
  { label: "Investment",     value: "investment"    },
  { label: "Infrastructure", value: "infrastructure"},
  { label: "Agriculture",    value: "agriculture"   },
  { label: "Capital Markets",value: "capital-markets"},
  { label: "Energy",         value: "energy"        },
  { label: "Partnerships",   value: "partnerships"  },
  { label: "News",           value: "news"          },
];

export default function BlogFilterBar() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const active       = searchParams.get("category") ?? "all";

  function setCategory(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") params.delete("category");
    else params.set("category", val);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <span className={styles.label}>Filter by</span>
        <div className={styles.pills}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.pill} ${active === cat.value ? styles.active : ""}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
