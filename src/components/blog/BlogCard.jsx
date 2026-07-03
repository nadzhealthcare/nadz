'use client';

import Image from "next/image";
import Link from "next/link";

// Different placeholder images for listing so each card can show a distinct fallback when post has no image
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

/** Format DB date (updatedAt or publishedAt) for display; no CMS date. */
function getDisplayDate(post) {
  const raw = post?.updatedAt || post?.publishedAt;
  if (!raw) return null;
  return new Date(raw).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export const BlogCard = ({ post, large = false, compact = false }) => {
  return (
    <article 
      className={`bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group min-w-0 w-full flex flex-col ${
        large ? "h-full rounded-2xl" : compact ? "rounded-xl" : "rounded-2xl"
      }`}
    >
      <Link href={`/blog/${post?.id ?? ''}`} className="block h-full flex flex-col">
        <div className={`relative w-full overflow-hidden bg-gray-200 flex-shrink-0 ${
          compact ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}>
          <Image
            src={getCardImage(post)}
            alt={post?.title || 'Blog post'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className={`flex flex-col ${
          large ? "p-6 pb-8" : compact ? "p-4" : "p-6"
        }`}>
          <h3 className={`font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors leading-tight ${
            large ? "text-2xl md:text-3xl mb-3" : compact ? "text-base mb-2" : "text-xl mb-3"
          }`}>
            {post.title}
          </h3>
          <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-text-gray ${
            compact ? "text-xs mb-2" : "text-sm mb-4"
          }`}>
            {getDisplayDate(post) && (
              <>
                <span>Updated: {getDisplayDate(post)}</span>
                <span>•</span>
              </>
            )}
            <span>{typeof post.author === 'object' ? post.author?.name : post.author || 'NADZ Team'}</span>
            <span>•</span>
            <span>{post.readTime || ''}</span>
          </div>
          <p className={`text-text-gray leading-relaxed ${compact ? "text-xs line-clamp-2" : "text-sm"}`}>
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
};

