'use client';

import Image from "next/image";
import Link from "next/link";
import { MdHome, MdChevronRight } from "react-icons/md";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { RichTextBlock } from "./RichTextBlock";

function getShareUrl(platform, url, title) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || '');
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    default:
      return url;
  }
}

export function BlogPostClient({ post, morePosts }) {
  const handleShare = (platform) => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = post?.title || '';
    const shareUrl = getShareUrl(platform, url, title);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };
  if (!post) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-primary-mediumBlue hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#FAFAFA] border-b border-gray-200">
        <div className="container mx-auto max-w-5xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-gray">
            <Link href="/" className="hover:text-primary-mediumBlue transition-colors">
              <MdHome className="text-lg" />
            </Link>
            <MdChevronRight className="text-text-gray" />
            <Link href="/blog" className="hover:text-primary-mediumBlue transition-colors">
              Blog
            </Link>
            <MdChevronRight className="text-text-gray" />
            <span className="text-primary-darkTeal truncate">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto max-w-5xl px-4 pt-12 pb-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary-heading mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap text-text-gray">
            {(post?.updatedAt || post?.publishedAt) && (
              <>
                <span className="text-sm">
                  Updated: {new Date(post.updatedAt || post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <span>•</span>
              </>
            )}
            <span className="font-semibold text-primary-darkTeal">{post?.author?.name ?? (typeof post?.author === 'string' ? post.author : 'NADZ Team')}</span>
            <span>•</span>
            <span className="text-sm">{post.readTime ?? ''}</span>
          </div>
        </div>

        {/* Featured Image - landscape, full image visible, object-fit: contain */}
        <div className="relative w-full aspect-video max-h-[500px] rounded-2xl overflow-hidden mb-8 bg-gray-100">
          <Image
            src={post?.image || '/images/healthcare-professional.jpg'}
            alt={post?.title || 'Blog post'}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain object-center"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {/* Intro - rich text (headings, bullets, links, images, tables) */}
        {(post.content?.intro != null && post.content.intro !== '') && (
          <div className="mb-8">
            <RichTextBlock content={post.content.intro} />
          </div>
        )}

        {/* Content Sections - each section body is rich text */}
        {(Array.isArray(post.content?.sections) ? post.content.sections : []).map((section, index) => (
          <div key={index} id={`section-${index}`} className="mb-8">
            {section.heading && (
              <h2 className="text-3xl font-bold text-primary-darkTeal mb-4 mt-8">
                {section.heading}
              </h2>
            )}
            {section.content != null && section.content !== '' && (
              <RichTextBlock content={section.content} className="mb-6" />
            )}
            {section.quote && (
              <blockquote className="border-l-4 border-primary-mediumBlue bg-primary-mediumBlue/5 pl-6 pr-6 py-6 my-8 italic text-xl text-primary-darkTeal">
                &quot;{section.quote}&quot;
              </blockquote>
            )}
          </div>
        ))}

        {/* Share Section */}
        <div className="flex items-center justify-center border-t border-b border-gray-200 py-6 my-12">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-primary-darkTeal uppercase">Share This</span>
            <button
              type="button"
              onClick={() => handleShare('twitter')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share on X (Twitter)"
            >
              <FaTwitter className="text-gray-600 hover:text-blue-400" />
            </button>
            <button
              type="button"
              onClick={() => handleShare('facebook')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <FaFacebook className="text-gray-600 hover:text-blue-600" />
            </button>
            <button
              type="button"
              onClick={() => handleShare('linkedin')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="text-gray-600 hover:text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {/* More Posts Section */}
      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-primary-darkTeal">More Posts</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <MdChevronRight className="rotate-180" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <MdChevronRight />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {morePosts.map((morePost) => (
              <Link
                key={morePost.id}
                href={`/blog/${morePost.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={morePost.image || '/images/healthcare-professional.jpg'}
                    alt={morePost.title || 'Blog post'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors">
                    {morePost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

