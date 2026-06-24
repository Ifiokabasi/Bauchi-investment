"use client";

// src/components/blog/BlogFilterBar.tsx
import { useRouter, usePathname } from "next/navigation";
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

// ✅ Now a simple client component that receives the current category as a prop
export default function BlogFilterBar({ initialCategory = "all" }: { initialCategory?: string }) {
  const router   = useRouter();
  const pathname = usePathname();
  const active   = initialCategory; // ✅ No useSearchParams() needed!

  function setCategory(val: string) {
    const params = new URLSearchParams();
    if (val !== "all") params.set("category", val);
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