import { PageLayout } from '@/components/layouts';
import { PrimarySeo } from '@/components/seo/PrimarySeo';
import { getGlobal, getEvents } from '@/lib/strapi';
import { EventCard } from '@/components/events/EventCard';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const brandName = globalData?.siteName || 'NADZ Healthcare Dubai';
  const seoTitle = `${brandName} - Events`;
  const seoDescription =
    'Upcoming and past events, highlights, and community moments at NADZ Healthcare.';

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `${siteUrl}/events` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${siteUrl}/events`,
    },
    twitter: { title: seoTitle, description: seoDescription },
  };
}

export default async function EventsPage() {
  const [eventsResult, globalResult] = await Promise.allSettled([
    getEvents({ limit: 50, sort: 'updatedAt:desc' }),
    getGlobal(),
  ]);

  const globalData =
    globalResult.status === 'fulfilled' ? globalResult.value : null;
  const events =
    eventsResult.status === 'fulfilled' && Array.isArray(eventsResult.value)
      ? eventsResult.value
      : [];

  const sorted = [...events].sort((a, b) => {
    const ta = a.eventDate ? new Date(a.eventDate).getTime() : 0;
    const tb = b.eventDate ? new Date(b.eventDate).getTime() : 0;
    if (ta !== tb) return tb - ta;
    const ua = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const ub = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return ub - ua;
  });

  const pillText =
    globalData?.eventsPagePillText?.trim() || 'Events & Highlights';

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-mediumBlue/20 via-primary-main/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-mediumBlue/15 via-primary-main/8 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-10">
              <div className="text-left max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 backdrop-blur-md rounded-full border border-primary-mediumBlue/20 shadow-lg">
                  <span className="w-2 h-2 bg-primary-mediumBlue rounded-full" />
                  <span className="text-sm font-medium text-primary-mediumBlue">
                    {pillText}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    Events
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-text-gray font-normal italic">
                  Highlights, gatherings, and moments from our community
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FAFAFA]">
            <div className="container mx-auto max-w-7xl">
              {sorted.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                  <p className="text-lg text-text-gray mb-2">No events yet.</p>
                  <p className="text-sm text-text-gray">
                    Add entries in Strapi (Content Manager → Event) with a slug,
                    gallery images, and optional cover image.
                  </p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-stretch">
                  {sorted.map((post) => (
                    <EventCard
                      key={post.id}
                      post={post}
                      large={post.featured}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
