'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdAccessTime, MdCalendarToday } from 'react-icons/md';

const CARD_PLACEHOLDERS = [
  '/images/healthcare-professional.jpg',
  '/images/hero-reference.png',
  '/images/doctor.png',
];

function getCardImage(post) {
  if (post?.image) return post.image;
  const index = (post?.id ?? '').toString().length % CARD_PLACEHOLDERS.length;
  return CARD_PLACEHOLDERS[index];
}

function getDisplayDate(post) {
  const raw = post?.date || post?.updatedAt || post?.publishedAt;
  if (!raw) return null;
  return new Date(raw).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const PressReleaseCard = ({ post, large = false }) => {
  const displayDate = getDisplayDate(post);

  return (
    <article
      className={`bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group min-w-0 w-full flex flex-col ${
        large ? 'h-full rounded-2xl' : 'rounded-2xl'
      }`}
    >
      <Link
        href={`/press-releases/${post?.id ?? ''}`}
        className="block h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden bg-gray-200 flex-shrink-0 aspect-[16/10]">
          <Image
            src={getCardImage(post)}
            alt={post?.title || 'Press release'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {/* Date overlay badge */}
          {displayDate && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
              <span className="text-xs font-semibold text-primary-darkTeal">
                {displayDate}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${large ? 'p-6 pb-8' : 'p-5 sm:p-6'}`}>
          {post?.source && (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary-mediumBlue mb-2 w-fit">
              {post.source}
            </span>
          )}

          <h3
            className={`font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors leading-tight ${
              large ? 'text-xl sm:text-2xl md:text-3xl mb-3' : 'text-lg sm:text-xl mb-3'
            }`}
          >
            {post?.title}
          </h3>

          {/* Date & Time row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-text-gray mb-3">
            {displayDate && (
              <span className="inline-flex items-center gap-1.5">
                <MdCalendarToday className="text-primary-mediumBlue/60 text-sm" />
                {displayDate}
              </span>
            )}
            {post?.time && (
              <span className="inline-flex items-center gap-1.5">
                <MdAccessTime className="text-primary-mediumBlue/60 text-sm" />
                {post.time}
              </span>
            )}
            {post?.readTime && (
              <>
                <span className="text-gray-300">|</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>

          {post?.category && (
            <span className="inline-block text-[11px] font-medium uppercase tracking-wide text-white bg-primary-mediumBlue/80 rounded-full px-2.5 py-0.5 mb-3 w-fit">
              {post.category}
            </span>
          )}

          <p className="text-text-gray leading-relaxed text-sm line-clamp-3 mt-auto">
            {post?.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
};
