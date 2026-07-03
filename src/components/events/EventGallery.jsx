'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { MdClose, MdChevronLeft, MdChevronRight } from 'react-icons/md';

/**
 * @param {{ gallery: Array<{ url: string, alt?: string }>, title?: string }} props
 */
export function EventGallery({ gallery = [], title = 'Event' }) {
  const [lightbox, setLightbox] = useState(null);

  const close = useCallback(() => setLightbox(null), []);
  const goPrev = useCallback(() => {
    setLightbox((i) => (i == null || i <= 0 ? i : i - 1));
  }, []);
  const goNext = useCallback(() => {
    setLightbox((i) => {
      if (i == null || !gallery.length) return i;
      return i >= gallery.length - 1 ? i : i + 1;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, goPrev, goNext]);

  if (!gallery.length) {
    return (
      <div className="relative w-full aspect-video max-h-[400px] rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
        <p className="text-sm text-text-gray px-4 text-center">
          Add images to the gallery in Strapi to showcase this event.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-mediumBlue mb-3">
          Photo gallery
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {gallery.map((item, index) => (
            <button
              key={`${item.url}-${index}`}
              type="button"
              onClick={() => setLightbox(index)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-mediumBlue group"
            >
              <Image
                src={item.url}
                alt={item.alt || `${title} — photo ${index + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox != null && gallery[lightbox] && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close gallery"
          >
            <MdClose className="text-2xl" />
          </button>
          {lightbox > 0 && (
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <MdChevronLeft className="text-3xl" />
            </button>
          )}
          {lightbox < gallery.length - 1 && (
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <MdChevronRight className="text-3xl" />
            </button>
          )}
          <div className="relative w-full max-w-5xl aspect-video max-h-[85vh]">
            <Image
              src={gallery[lightbox].url}
              alt={gallery[lightbox].alt || title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
            {lightbox + 1} / {gallery.length}
          </p>
        </div>
      )}
    </>
  );
}
