'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdCalendarToday, MdLocationOn } from 'react-icons/md';

const PLACEHOLDERS = [
  '/images/healthcare-professional.jpg',
  '/images/hero-reference.png',
  '/images/doctor.png',
];

function cardImageSrc(post) {
  if (post?.image) return post.image;
  const i = (post?.id ?? '').toString().length % PLACEHOLDERS.length;
  return PLACEHOLDERS[i];
}

function formatEventDate(post) {
  const primary = post?.eventDate;
  const raw = primary || post?.updatedAt || post?.publishedAt;
  if (!raw) return null;
  const d = new Date(raw);
  if (primary) {
    return d.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function EventCard({ post, large = false }) {
  const dateLabel = formatEventDate(post);
  return (
    <article
      className={`bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group min-w-0 w-full flex flex-col ${
        large ? 'h-full rounded-2xl' : 'rounded-2xl'
      }`}
    >
      <Link href={`/events/${post?.id ?? ''}`} className="block h-full flex flex-col">
        <div className="relative w-full overflow-hidden bg-gray-200 flex-shrink-0 aspect-[4/3]">
          <Image
            src={cardImageSrc(post)}
            alt={post?.imageAlt || post?.title || 'Event'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className={`flex flex-col ${large ? 'p-6 pb-8' : 'p-6'}`}>
          {post?.category && (
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-mediumBlue mb-2">
              {post.category}
            </span>
          )}
          <h3
            className={`font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors leading-tight ${
              large ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-3'
            }`}
          >
            {post?.title}
          </h3>
          <div className="flex flex-col gap-1.5 text-sm text-text-gray mb-3">
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <MdCalendarToday className="text-primary-mediumBlue/70 shrink-0" />
                {dateLabel}
              </span>
            )}
            {post?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MdLocationOn className="text-primary-mediumBlue/70 shrink-0" />
                {post.location}
              </span>
            )}
          </div>
          {post?.readTime && (
            <span className="text-xs text-text-gray mb-2">{post.readTime}</span>
          )}
          <p className="text-text-gray leading-relaxed text-sm line-clamp-3">
            {post?.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
