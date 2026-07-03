'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MdHome, MdChevronRight, MdOpenInNew, MdCalendarToday, MdAccessTime } from 'react-icons/md';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { RichTextBlock } from './RichTextBlock';

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

export function PressReleasePostClient({ post, moreReleases = [] }) {
  const handleShare = (platform) => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const shareUrl = getShareUrl(platform, url, post?.title);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  if (!post) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Press Release Not Found</h1>
        <Link
          href="/press-releases"
          className="text-primary-mediumBlue hover:underline"
        >
          Back to Press Releases
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
            <Link
              href="/"
              className="hover:text-primary-mediumBlue transition-colors"
            >
              <MdHome className="text-lg" />
            </Link>
            <MdChevronRight className="text-text-gray" />
            <Link
              href="/press-releases"
              className="hover:text-primary-mediumBlue transition-colors"
            >
              Press Releases
            </Link>
            <MdChevronRight className="text-text-gray" />
            <span className="text-primary-darkTeal truncate">
              {post.category || post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto max-w-5xl px-4 pt-12 pb-8">
        {post.source && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-mediumBlue mb-3">
            {post.source}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-primary-heading mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="mb-8">
          <div className="flex items-center gap-4 flex-wrap text-text-gray">
            {(post.date || post.updatedAt || post.publishedAt) && (
              <span className="inline-flex items-center gap-1.5 text-sm">
                <MdCalendarToday className="text-primary-mediumBlue/70" />
                {new Date(
                  post.date || post.updatedAt || post.publishedAt
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {post.time && (
              <span className="inline-flex items-center gap-1.5 text-sm">
                <MdAccessTime className="text-primary-mediumBlue/70" />
                {post.time}
              </span>
            )}
            {post.readTime && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-sm">{post.readTime}</span>
              </>
            )}
            {post.category && (
              <span className="text-xs font-medium uppercase tracking-wide text-white bg-primary-mediumBlue/80 rounded-full px-2.5 py-0.5">
                {post.category}
              </span>
            )}
          </div>
        </div>

        {post.sourceUrl && (
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-mediumBlue hover:underline mb-8"
          >
            Read original source <MdOpenInNew className="text-base" />
          </a>
        )}

        {/* Featured Image */}
        <div className="relative w-full aspect-video max-h-[500px] rounded-2xl overflow-hidden mb-8 bg-gray-100">
          <Image
            src={post.image || '/images/healthcare-professional.jpg'}
            alt={post.title || 'Press release'}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain object-center"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {post.content?.intro != null && post.content.intro !== '' && (
          <div className="mb-8">
            <RichTextBlock content={post.content.intro} />
          </div>
        )}

        {(Array.isArray(post.content?.sections)
          ? post.content.sections
          : []
        ).map((section, index) => (
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

        {/* Share */}
        <div className="flex items-center justify-center border-t border-b border-gray-200 py-6 my-12">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-primary-darkTeal uppercase">
              Share This
            </span>
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

      {/* More Releases */}
      {moreReleases.length > 0 && (
        <div className="bg-[#FAFAFA] py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary-darkTeal">
                More Press Releases
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreReleases.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/press-releases/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={
                        item.image || '/images/healthcare-professional.jpg'
                      }
                      alt={item.title || 'Press release'}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    {item.source && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-mediumBlue mb-1 block">
                        {item.source}
                      </span>
                    )}
                    <h3 className="font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors mb-2">
                      {item.title}
                    </h3>
                    {(item.date || item.updatedAt || item.publishedAt) && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-gray">
                        <MdCalendarToday className="text-primary-mediumBlue/60" />
                        {new Date(item.date || item.updatedAt || item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
