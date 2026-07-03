'use client';

import Image from 'next/image';
import { MdFormatQuote } from 'react-icons/md';

function Stars({ rating }) {
  const n = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= n ? 'text-[#E3C699]' : 'text-gray-200'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function initials(name) {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function TestimonialsGrid({ items = [] }) {
  if (!items.length) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
        <p className="text-lg text-text-gray mb-2">No testimonials yet.</p>
        <p className="text-sm text-text-gray">
          Add patient reviews in Strapi (Content Manager → Testimonial) and publish
          them to show here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {items.map((t) => (
        <article
          key={t.id}
          className={`relative flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_24px_-8px_rgba(79,5,43,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(79,5,43,0.12)] ${
            t.featured ? 'ring-2 ring-primary-mediumBlue/25' : ''
          }`}
        >
          {t.featured && (
            <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-primary-mediumBlue bg-primary-mediumBlue/10 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
          <MdFormatQuote className="text-4xl text-primary-mediumBlue/25 -mt-1 mb-2" aria-hidden />
          {t.headline && (
            <h2 className="text-lg font-bold text-primary-heading mb-2 leading-snug pr-14 sm:pr-0">
              {t.headline}
            </h2>
          )}
          <div className="mb-3">
            <Stars rating={t.rating} />
          </div>
          <blockquote className="text-text-gray text-sm sm:text-[15px] leading-relaxed flex-1 mb-6">
            &ldquo;{t.review}&rdquo;
          </blockquote>
          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
            {t.photoUrl ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 ring-2 ring-white shadow">
                <Image
                  src={t.photoUrl}
                  alt={t.photoAlt || t.patientName}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-mediumBlue/80 to-primary-main/70 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow"
                aria-hidden
              >
                {initials(t.patientName)}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold text-primary-darkTeal truncate">
                {t.patientName}
              </p>
              {t.serviceLabel && (
                <p className="text-xs text-text-gray truncate">{t.serviceLabel}</p>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
