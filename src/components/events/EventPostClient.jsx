'use client';

import Link from 'next/link';
import { MdHome, MdChevronRight, MdCalendarToday, MdLocationOn } from 'react-icons/md';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { RichTextBlock } from '@/components/blog/RichTextBlock';
import { EventGallery } from './EventGallery';

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

function formatRange(post) {
  const start = post?.eventDate ? new Date(post.eventDate) : null;
  const end = post?.eventEndDate ? new Date(post.eventEndDate) : null;
  if (!start) return null;
  const opts = { year: 'numeric', month: 'short', day: 'numeric' };
  const tOpts = { ...opts, hour: 'numeric', minute: '2-digit' };
  if (!end || end.getTime() === start.getTime()) {
    return start.toLocaleString('en-US', tOpts);
  }
  return `${start.toLocaleString('en-US', tOpts)} — ${end.toLocaleString('en-US', tOpts)}`;
}

export function EventPostClient({ post, moreEvents = [] }) {
  const handleShare = (platform) => {
    if (typeof window === 'undefined') return;
    const shareUrl = getShareUrl(platform, window.location.href, post?.title);
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  if (!post) {
    return (
      <div className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <Link href="/events" className="text-primary-mediumBlue hover:underline">
          Back to Events
        </Link>
      </div>
    );
  }

  const when = formatRange(post);

  return (
    <article className="min-h-screen bg-white">
      <div className="bg-[#FAFAFA] border-b border-gray-200">
        <div className="container mx-auto max-w-5xl px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-text-gray">
            <Link href="/" className="hover:text-primary-mediumBlue transition-colors">
              <MdHome className="text-lg" />
            </Link>
            <MdChevronRight className="text-text-gray" />
            <Link href="/events" className="hover:text-primary-mediumBlue transition-colors">
              Events
            </Link>
            <MdChevronRight className="text-text-gray" />
            <span className="text-primary-darkTeal truncate">
              {post.category || post.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 pt-12 pb-8">
        {post.category && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-mediumBlue mb-3">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-primary-heading mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-text-gray mb-8">
          {when && (
            <span className="inline-flex items-center gap-2 text-sm">
              <MdCalendarToday className="text-primary-mediumBlue/70" />
              {when}
            </span>
          )}
          {post.location && (
            <span className="inline-flex items-center gap-2 text-sm">
              <MdLocationOn className="text-primary-mediumBlue/70" />
              {post.location}
            </span>
          )}
          {post.readTime && (
            <span className="text-sm">{post.readTime}</span>
          )}
        </div>

        <EventGallery gallery={post.gallery || []} title={post.title} />
      </div>

      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {post.content?.intro != null && post.content.intro !== '' && (
          <div className="mb-8">
            <RichTextBlock content={post.content.intro} />
          </div>
        )}

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

        <div className="flex items-center justify-center border-t border-b border-gray-200 py-6 my-12">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-primary-darkTeal uppercase">Share</span>
            <button type="button" onClick={() => handleShare('twitter')} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on X">
              <FaTwitter className="text-gray-600 hover:text-blue-400" />
            </button>
            <button type="button" onClick={() => handleShare('facebook')} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on Facebook">
              <FaFacebook className="text-gray-600 hover:text-blue-600" />
            </button>
            <button type="button" onClick={() => handleShare('linkedin')} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on LinkedIn">
              <FaLinkedin className="text-gray-600 hover:text-blue-700" />
            </button>
          </div>
        </div>
      </div>

      {moreEvents.length > 0 && (
        <div className="bg-[#FAFAFA] py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-primary-darkTeal mb-8">More Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moreEvents.slice(0, 3).map((ev) => (
                <Link
                  key={ev.id}
                  href={`/events/${ev.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="p-4">
                    <h3 className="font-bold text-primary-darkTeal group-hover:text-primary-mediumBlue transition-colors">
                      {ev.title}
                    </h3>
                    {ev.eventDate && (
                      <p className="text-xs text-text-gray mt-2">
                        {new Date(ev.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
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
