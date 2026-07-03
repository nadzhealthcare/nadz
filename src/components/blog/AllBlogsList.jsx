'use client';

import Image from 'next/image';
import Link from 'next/link';

// Different placeholders per post so listing cards show distinct images when CMS has no image
const LIST_PLACEHOLDERS = [
  '/images/healthcare-professional.jpg',
  '/images/hero-reference.png',
  '/images/doctor.png',
];

function getListItemImage(post) {
  if (post?.image) return post.image;
  const index = (post?.id ?? '').toString().length % LIST_PLACEHOLDERS.length;
  return LIST_PLACEHOLDERS[index];
}

export function BlogListItem({ post }) {
  const imageSrc = getListItemImage(post);
  const authorName = post?.author && typeof post.author === 'object' ? post.author.name : post?.author || 'NADZ Team';
  return (
    <Link href={`/blog/${post?.id ?? ''}`}>
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row gap-0 md:gap-6 p-4">
        <div className="relative w-full md:w-80 aspect-[4/3] overflow-hidden bg-gray-200 flex-shrink-0 rounded-lg">
          <Image
            src={imageSrc}
            alt={post?.title ?? 'Blog post'}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3 text-sm text-text-gray">
            {(post?.updatedAt || post?.publishedAt) && (
              <>
                <span>Updated: {new Date(post.updatedAt || post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span>•</span>
              </>
            )}
            <span>{post?.readTime}</span>
            <span>•</span>
            <span>By {authorName}</span>
          </div>
          <h2 className="text-2xl font-bold text-primary-darkTeal mb-3 group-hover:text-primary-mediumBlue transition-colors leading-tight">
            {post?.title}
          </h2>
          <p className="text-text-gray leading-relaxed mb-3">
            {post?.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function AllBlogsList({ posts = [] }) {
  return (
    <div className="space-y-8">
      {Array.isArray(posts) && posts.map((post) => (
        <BlogListItem key={post?.id ?? post?.title} post={post} />
      ))}
    </div>
  );
}
