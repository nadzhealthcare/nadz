import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layouts";
import { PrimarySeo } from "@/components/seo/PrimarySeo";
import { getGlobal, getArticle, getArticles } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { BlogPostClient } from "@/components/blog/BlogPostClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let post = null;
  try {
    post = await getArticle(id);
  } catch (e) {
    // ignore
  }

  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch (error) {
    console.error('Error fetching global settings for metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || "https://nadzhealthcare.com";
  const brandName = globalData?.siteName || "NADZ Healthcare Dubai";

  if (!post) {
    return {
      title: `${brandName} - Post Not Found`,
    };
  }

  const seoTitle = post.seoTitle || post.title || globalData?.defaultSeo?.title || `${brandName} - Blog`;
  const seoDescription = post.seoDescription || post.excerpt || post.content?.intro || globalData?.defaultSeo?.description || "";
  const seoKeywords = (Array.isArray(post.seoKeywords) && post.seoKeywords.length > 0 ? post.seoKeywords : globalData?.defaultSeo?.keywords) || [];

  const canonical = resolveCanonical(siteUrl, post.seoCanonicalUrl, `/blog/${id}`);

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
    twitter: {
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  let post = null;
  let morePosts = [];

  try {
    post = await getArticle(id);
    if (post) {
      const all = await getArticles({ limit: 20 });
      morePosts = (Array.isArray(all) ? all : [])
        .filter((p) => String(p.id) !== String(id))
        .slice(0, 6);
    }
  } catch (error) {
    console.error('Error fetching article from Strapi:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <PrimarySeo />
      <PageLayout>
        <BlogPostClient post={post} morePosts={morePosts} />
      </PageLayout>
    </>
  );
}
