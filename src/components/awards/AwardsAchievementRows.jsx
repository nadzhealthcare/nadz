'use client';

import Image from 'next/image';
import { RichTextBlock } from '@/components/blog/RichTextBlock';

const proseHtml =
  'prose prose-base sm:prose-lg max-w-none text-text-gray prose-headings:text-primary-heading prose-a:text-primary-mediumBlue';

function AwardBody({ body }) {
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

/**
 * @param {{ items: Array<{ id: string|number, title: string, body: unknown, image: { url: string|null, alt: string } }> }} props
 */
export function AwardsAchievementRows({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 max-md:gap-5 md:gap-7">
      {items.map((item, index) => (
        <article
          key={item.id ?? index}
          className="group flex flex-col md:grid md:grid-cols-[320px_minmax(0,1fr)] md:gap-8 md:items-center overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_4px_24px_-8px_rgba(79,5,43,0.1)] transition-[box-shadow,transform] duration-300 max-md:active:scale-[0.99] md:hover:shadow-[0_12px_40px_-12px_rgba(79,5,43,0.14)]"
        >
          <div className="relative flex justify-center bg-gradient-to-b from-[#FAFAFA] to-[#F3F4F6] px-4 pt-5 pb-4 md:bg-transparent md:p-0">
            <div
              className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-[#ECEEF0] shadow-inner ring-1 ring-black/[0.04] aspect-[3/4] md:w-[320px] md:max-w-none md:rounded-xl md:ring-0"
            >
              {item.image?.url ? (
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title || 'Award'}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] md:group-hover:scale-[1.01]"
                  sizes="(max-width: 768px) 90vw, 320px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[13px] leading-snug text-text-gray/45">
                  Add an image in Strapi for this item
                </div>
              )}
            </div>
          </div>

          <div className="flex min-w-0 flex-col border-t border-gray-100/90 px-5 pb-6 pt-5 max-md:bg-white md:border-t-0 md:px-6 md:pb-6 md:pt-0">
            {item.title ? (
              <h2 className="mb-2 text-[1.125rem] font-bold leading-snug tracking-tight text-primary-heading sm:text-xl md:mb-3 md:text-2xl">
                {item.title}
              </h2>
            ) : null}
            <AwardBody body={item.body} />
          </div>
        </article>
      ))}
    </div>
  );
}
