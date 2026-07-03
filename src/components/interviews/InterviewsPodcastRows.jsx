'use client';

import { RichTextBlock } from '@/components/blog/RichTextBlock';

const proseHtml =
  'prose prose-base sm:prose-lg max-w-none text-text-gray prose-headings:text-primary-heading prose-a:text-primary-mediumBlue';

function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function InterviewBody({ body }) {
  if (body == null || body === '') return null;
  if (typeof body === 'string' && /^\s*</.test(body)) {
    return (
      <div
        className={`${proseHtml} prose-sm md:prose-base max-w-none leading-relaxed text-[15px] md:text-base max-md:[&_p]:text-[15px] max-md:[&_p]:leading-relaxed [&_p]:mb-2.5 [&_p:last-child]:mb-0`}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    );
  }
  return (
    <RichTextBlock
      content={body}
      className="!prose-sm max-md:!text-[15px] max-md:!leading-relaxed md:!prose-base [&_p]:!mb-2.5 [&_p:last-child]:!mb-0"
    />
  );
}

export function InterviewsPodcastRows({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-5 max-md:gap-5 md:gap-7">
      {items.map((item, index) => {
        const videoId = extractYouTubeId(item.youtubeUrl);

        return (
          <article
            key={item.id ?? index}
            className="group flex flex-col md:grid md:grid-cols-[minmax(320px,480px)_minmax(0,1fr)] md:gap-8 md:items-center overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_4px_24px_-8px_rgba(79,5,43,0.1)] transition-[box-shadow,transform] duration-300 max-md:active:scale-[0.99] md:hover:shadow-[0_12px_40px_-12px_rgba(79,5,43,0.14)]"
          >
            {/* YouTube Embed */}
            <div className="relative flex justify-center bg-gradient-to-b from-[#FAFAFA] to-[#F3F4F6] px-4 pt-5 pb-4 md:bg-transparent md:p-0">
              <div className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-black shadow-inner ring-1 ring-black/[0.04] aspect-video md:w-full md:max-w-none md:rounded-xl md:ring-0">
                {videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={item.title || 'Interview video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full rounded-2xl md:rounded-xl"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] leading-snug text-white/60 bg-gray-900 rounded-2xl md:rounded-xl">
                    {item.youtubeUrl ? (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                      >
                        Watch on YouTube
                      </a>
                    ) : (
                      'Add a YouTube URL in Strapi for this item'
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex min-w-0 flex-col border-t border-gray-100/90 px-5 pb-6 pt-5 max-md:bg-white md:border-t-0 md:px-6 md:pb-6 md:pt-0">
              {item.title ? (
                <h2 className="mb-2 text-[1.125rem] font-bold leading-snug tracking-tight text-primary-heading sm:text-xl md:mb-3 md:text-2xl">
                  {item.title}
                </h2>
              ) : null}
              <InterviewBody body={item.body} />
              {videoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary-mediumBlue hover:underline w-fit"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
                  </svg>
                  Watch on YouTube
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
