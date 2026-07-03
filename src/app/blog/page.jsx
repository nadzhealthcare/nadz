import { PageLayout } from "@/components/layouts";
import { PrimarySeo } from "@/components/seo/PrimarySeo";
import { getGlobal, getArticles } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { BlogCard } from "@/components/blog/BlogCard";
import Link from "next/link";

// Always fetch fresh from Strapi so blog list matches home page
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";
  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";

  const seoTitle = globalData?.defaultSeo?.title || `${brandName} - Blog`;
  const seoDescription = globalData?.defaultSeo?.description || "Insights, stories, and updates from NADZ Healthcare.";
  const seoKeywords = globalData?.defaultSeo?.keywords || [];

  const canonical = resolveCanonical(siteUrl, undefined, '/blog');

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: { canonical },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonical,
    },
    twitter: {
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function BlogPage() {
  let blogPosts = [];
  let globalData = null;
  const [articlesResult, globalResult] = await Promise.allSettled([
    getArticles({ limit: 9, sort: 'updatedAt:desc' }),
    getGlobal(),
  ]);
  globalData = globalResult.status === 'fulfilled' ? globalResult.value : null;
  const strapiPosts = articlesResult.status === 'fulfilled' && Array.isArray(articlesResult.value) ? articlesResult.value : [];
  if (strapiPosts.length > 0) {
    blogPosts = strapiPosts.slice(0, 9);
    blogPosts.sort((a, b) => {
      const dateA = (a.updatedAt || a.publishedAt) ? new Date(a.updatedAt || a.publishedAt).getTime() : 0;
      const dateB = (b.updatedAt || b.publishedAt) ? new Date(b.updatedAt || b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  // Show all posts in date order (newest first); featured posts still get large card style
  const postsByDate = [...blogPosts];
  const pillText = globalData?.blogPagePillText?.trim() || 'Insights';

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <div className="min-h-screen bg-white">
          {/* Hero – consistent with Who We Are / Vision & Mission */}
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
                  <span className="text-sm font-medium text-primary-mediumBlue">{pillText}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-primary-heading via-primary-heading to-primary-heading bg-clip-text text-transparent">
                    Our Blog
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-text-gray font-normal italic">
                  Insights, stories, and updates from our team
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-[#FAFAFA]">
            <div className="container mx-auto max-w-7xl">

              {blogPosts.length === 0 ? (
                <div className="text-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                  <p className="text-lg text-text-gray mb-2">No blog posts yet.</p>
                  <p className="text-sm text-text-gray">
                    Publish articles in the CMS (Strapi Admin → Content Manager → Article) and they will appear here.
                  </p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-stretch">
                  {postsByDate.map((post) => (
                    <BlogCard key={post.id} post={post} large={post.featured} />
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Link
                  href="/all-blogs"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#E3C699] text-[#5C2533] font-semibold rounded-lg hover:bg-[#d4b588] transition-colors shadow-md hover:shadow-lg"
                >
                  View All Blogs
                  <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
