"use client";

import Image from "next/image";
import styles from "./PartnersSection.module.css";

export const PartnersSection = ({ partnersData }) => {
  const title = partnersData?.title || "Our Partners";
  const partners = partnersData?.partners || [];

  if (!partners.length) return null;

  return (
    <section className={`relative py-16 md:py-20 overflow-hidden ${styles.sectionBg}`}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>
      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className={styles.hero}>
          <div className="head">
            <h2>{title}</h2>
          </div>
        </div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div key={partner.id ?? index} className={styles.card}>
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name || "Partner logo"}
                  width={160}
                  height={160}
                  className={styles.logo}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <span className={styles.fallbackName}>
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
