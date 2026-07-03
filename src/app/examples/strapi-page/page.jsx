/**
 * Example: Server-Side Rendered Page with Strapi
 * This demonstrates fetching Strapi data in a Server Component
 * 
 * To use this:
 * 1. Create a "pages" content type in Strapi with fields: title, slug, content
 * 2. Create and publish a page with slug "example"
 * 3. Enable API permissions for "pages" content type
 * 4. Visit /examples/strapi-page
 */

import { fetchStrapiEntry, getStrapiImageUrl, getGlobal } from '@/lib/strapi';
import { generateSeoMetadata } from '@/lib/strapi-seo';
import { resolveCanonical } from '@/lib/canonical-url';
import Image from 'next/image';

// Generate metadata from Strapi (for SEO)
export async function generateMetadata() {
  let globalData = null;
  try {
    globalData = await getGlobal();
  } catch {
    /* ignore */
  }
  const siteUrl = globalData?.siteUrl || 'https://nadzhealthcare.com';

  try {
    const page = await fetchStrapiEntry('pages', 'example', {
      populate: {
        seo: {
          populate: ['shareImage'],
        },
      },
    });

    if (!page || !page.attributes) {
      return {
        title: 'Example Page',
        description: 'This is an example page using Strapi CMS',
        alternates: { canonical: resolveCanonical(siteUrl, undefined, '/examples/strapi-page') },
      };
    }

    const canonical = resolveCanonical(siteUrl, page.attributes.seo?.canonicalUrl, '/examples/strapi-page');

    return generateSeoMetadata(page.attributes.seo, {
      title: page.attributes.title,
      description: page.attributes.content?.substring(0, 160) || 'Example page',
      alternates: { canonical },
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Example Page',
      description: 'This is an example page using Strapi CMS',
      alternates: { canonical: resolveCanonical(siteUrl, undefined, '/examples/strapi-page') },
    };
  }
}

export default async function StrapiPageExample() {
  let page = null;
  let error = null;

  try {
    // Fetch page data from Strapi
    page = await fetchStrapiEntry('pages', 'example', {
      populate: '*', // Populate all relations
    });
  } catch (err) {
    console.error('Error fetching page:', err);
    error = err.message;
  }

  // Handle error state
  if (error || !page) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Strapi Integration Example</h1>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          <p><strong>Error:</strong> {error || 'Page not found'}</p>
          <p style={{ marginTop: '1rem' }}>To use this example:</p>
          <ol style={{ marginLeft: '1.5rem' }}>
            <li>Create a "pages" content type in Strapi</li>
            <li>Add fields: title (Text), slug (Text, Unique), content (Rich text)</li>
            <li>Create a page with slug "example"</li>
            <li>Publish the page</li>
            <li>Enable API permissions: Settings → Users & Permissions → Roles → Public → Pages → find, findOne</li>
            <li>Make sure your Strapi server is running on http://localhost:1337</li>
            <li>Check your .env.local file has NEXT_PUBLIC_STRAPI_URL=http://localhost:1337</li>
          </ol>
        </div>
      </div>
    );
  }

  const attributes = page.attributes || {};
  const imageUrl = getStrapiImageUrl(attributes.image || attributes.featuredImage);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <article>
        {imageUrl && (
          <div style={{ 
            width: '100%', 
            height: '400px', 
            position: 'relative',
            marginBottom: '2rem',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Image
              src={imageUrl}
              alt={attributes.title || 'Page image'}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        
        <h1 style={{ marginBottom: '1rem' }}>
          {attributes.title || 'Untitled Page'}
        </h1>

        {attributes.publishedAt && (
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Published: {new Date(attributes.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {attributes.content && (
          <div
            style={{
              lineHeight: '1.8',
              fontSize: '1.1rem',
            }}
            dangerouslySetInnerHTML={{ __html: attributes.content }}
          />
        )}

        {!attributes.content && (
          <p style={{ color: '#999', fontStyle: 'italic' }}>
            No content available for this page.
          </p>
        )}
      </article>
    </div>
  );
}
























