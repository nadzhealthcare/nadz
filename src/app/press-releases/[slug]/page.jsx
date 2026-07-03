import { PageLayout } from '@/components/layouts';
import { getPressRelease, getPressReleases, getGlobal } from '@/lib/strapi';
import { PressReleasePostClient } from '@/components/blog/PressReleasePostClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = null;
  let globalData = null;

  try {
    [post, globalData] = await Promise.all([
      getPressRelease(slug),
      getGlobal(),
    ]);
  } catch (error) {
    console.error('Error fetching press release metadata:', error);
  }

  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';
  const brandName = globalData?.siteName || 'NADZ Healthcare Dubai';
  const title = post?.seoTitle || post?.title || `${brandName} - Press Release`;
  const description =
    post?.seoDescription || post?.excerpt || 'Press release from NADZ Healthcare.';
  const keywords = post?.seoKeywords?.length ? post.seoKeywords : undefined;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${siteUrl}/press-releases/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/press-releases/${slug}`,
      ...(post?.image && {
        images: [{ url: post.image, alt: post.title }],
      }),
    },
    twitter: { title, description },
  };
}

export default async function PressReleaseDetailPage({ params }) {
  const { slug } = await params;

  const [post, allReleases] = await Promise.all([
    getPressRelease(slug),
    getPressReleases({ limit: 20 }),
  ]);

  const moreReleases = (allReleases || [])
    .filter((p) => p.id !== slug)
    .slice(0, 6);

  return (
    <PageLayout>
      <PressReleasePostClient post={post} moreReleases={moreReleases} />
    </PageLayout>
  );
}
