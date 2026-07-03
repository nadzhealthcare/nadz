import { PageLayout } from '@/components/layouts';
import Link from 'next/link';
import { getArticles, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import AllBlogsList from '@/components/blog/AllBlogsList';

// Always fetch fresh from Strapi so list matches home page
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
  const title = `${brandName} - All blog posts`;
  const description =
    globalData?.defaultSeo?.description ||
    'All articles, insights, and stories from NADZ Healthcare.';
  const canonical = resolveCanonical(siteUrl, undefined, '/all-blogs');

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function AllBlogsPage() {
  let posts = [];
  let globalData = null;
  const [articlesResult, globalResult] = await Promise.allSettled([
    getArticles({ limit: 100, sort: 'updatedAt:desc' }),
    getGlobal(),
  ]);
  globalData = globalResult.status === 'fulfilled' ? globalResult.value : null;
  posts = articlesResult.status === 'fulfilled' && Array.isArray(articlesResult.value) ? articlesResult.value : [];
  const pillText = globalData?.allBlogsPagePillText?.trim() || 'All Posts';

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-white via-[#FAFAFA] to-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary-mediumBlue/20 via-primary-main/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-primary-mediumBlue/15 via-primary-main/8 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8 relative z-10">
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary-mediumBlue hover:text-primary-main font-medium mb-6 transition-colors"
              >
                <span className="text-xl">←</span>
                Back to Blog
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-md rounded-full border border-primary-mediumBlue/20 shadow-lg">
                <span className="w-2 h-2 bg-primary-mediumBlue rounded-full" />
                <span className="text-sm font-medium text-primary-mediumBlue">{pillText}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                  All Blog Posts
                </span>
              </h1>
              <p className="text-sm md:text-base text-text-gray italic">
                Explore our complete collection of articles, insights, and stories
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-[#FAFAFA]">
          <div className="container mx-auto max-w-6xl">

            <AllBlogsList posts={posts} />

            <div className="flex justify-center items-center gap-2 mt-12">
              <button className="px-4 py-2 border border-primary-mediumBlue/30 rounded-lg hover:bg-primary-mediumBlue/10 text-primary-mediumBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#E3C699] text-[#5C2533] rounded-lg font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-primary-mediumBlue/30 rounded-lg hover:bg-primary-mediumBlue/10 text-primary-mediumBlue transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-primary-mediumBlue/30 rounded-lg hover:bg-primary-mediumBlue/10 text-primary-mediumBlue transition-colors">
                3
              </button>
              <button className="px-4 py-2 border border-primary-mediumBlue/30 rounded-lg hover:bg-primary-mediumBlue/10 text-primary-mediumBlue transition-colors">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
