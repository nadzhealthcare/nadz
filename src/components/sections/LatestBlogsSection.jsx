'use client';

import Link from 'next/link';
import { BlogCard } from '@/components/blog/BlogCard';

export function LatestBlogsSection({ posts = [] }) {
  const displayPosts = Array.isArray(posts) ? posts.slice(0, 3) : [];
  const hasPosts = displayPosts.length > 0;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-primary-mediumBlue/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-primary-mediumBlue/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
              Latest from our blog
            </span>
          </h2>
          <p className="text-sm sm:text-base text-text-gray max-w-2xl mx-auto">
            Insights, health tips, and updates from the NADZ Healthcare team.
          </p>
        </div>

        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {displayPosts.map((post) => (
              <BlogCard key={post?.id ?? post?.title} post={post} compact />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 sm:py-14 rounded-2xl bg-white/80 border border-gray-200/80 shadow-sm">
            <p className="text-text-gray text-base sm:text-lg mb-2">No blog posts yet.</p>
            <p className="text-sm text-text-gray/80 max-w-md mx-auto mb-6">
              Publish articles in the CMS (Strapi → Content Manager → Article) and they will appear here.
            </p>
          </div>
        )}

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg bg-[#E3C699] text-[#5C2533] hover:bg-[#d4b588]"
          >
            {hasPosts ? 'View all blogs' : 'Visit our blog'}
          </Link>
        </div>
      </div>
    </section>
  );
}
