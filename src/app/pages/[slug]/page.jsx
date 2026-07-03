import { notFound } from 'next/navigation';
import { getPage, getAllPages, getGlobal } from '@/lib/strapi';
import { resolveCanonical } from '@/lib/canonical-url';
import { PageLayout } from '@/components/layouts';
import DynamicPageRenderer from '@/components/pages/DynamicPageRenderer';

export const dynamic = 'force-dynamic';


export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    if (pages && pages.length > 0) {
      return pages.map((p) => ({ slug: p.slug }));
    }
  } catch (error) {
    console.error('Error fetching pages from Strapi:', error);
  }
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch {
    /* ignore */
  }
  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';

  try {
    const page = await getPage(slug);
    if (page && page.metadata) {
      const m = page.metadata;
      const pathname = `/pages/${slug}`;
      const canonical = resolveCanonical(siteUrl, m.canonicalUrl, pathname);
      const baseOg =
        m.openGraph && typeof m.openGraph === 'object' && !Array.isArray(m.openGraph)
          ? m.openGraph
          : {};

      return {
        title: m.title,
        description: m.description,
        keywords: Array.isArray(m.keywords) && m.keywords.length > 0 ? m.keywords : undefined,
        alternates: { canonical },
        openGraph: {
          ...baseOg,
          url: canonical,
        },
        ...(m.twitter && typeof m.twitter === 'object' ? { twitter: m.twitter } : {}),
      };
    }
  } catch (error) {
    console.error('Error fetching page metadata from Strapi:', error);
  }
  return {};
}

export default async function GenericPage({ params }) {
  const { slug } = await params;
  let page = null;

  try {
    page = await getPage(slug);
  } catch (error) {
    console.error('Error fetching page from Strapi:', error);
  }

  if (!page) {
    notFound();
  }

  return (
    <PageLayout>
      <DynamicPageRenderer sections={page.sections} slug={slug} />
    </PageLayout>
  );
}
