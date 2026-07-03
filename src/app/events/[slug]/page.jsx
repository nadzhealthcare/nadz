import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getGlobal, getEvent, getEvents } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { EventPostClient } from '@/components/events/EventPostClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = null;
  let globalData = null;
  try {
    [post, globalData] = await Promise.all([
      getEvent(slug),
      getGlobal(),
    ]);
  } catch (e) {
    // ignore
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const brandName = globalData?.siteName || 'NADZ Healthcare Dubai';

  if (!post) {
    return { title: `${brandName} - Event Not Found` };
  }

  const seoTitle = post.seoTitle || post.title || `${brandName} - Events`;
  const seoDescription =
    post.seoDescription ||
    post.excerpt ||
    globalData?.defaultSeo?.description ||
    '';
  const seoKeywords = Array.isArray(post.seoKeywords) && post.seoKeywords.length > 0
    ? post.seoKeywords
    : globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, undefined, `/events/${slug}`);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: { title: seoTitle, description: seoDescription },
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  const [post, allEvents] = await Promise.all([
    getEvent(slug),
    getEvents({ limit: 20 }),
  ]);

  if (!post) {
    notFound();
  }

  const moreEvents = (allEvents || [])
    .filter((e) => String(e.id) !== String(slug))
    .slice(0, 6);

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <EventPostClient post={post} moreEvents={moreEvents} />
      </PageLayout>
    </>
  );
}
