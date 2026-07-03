'use client';

/**
 * Example component demonstrating Strapi integration
 * This is a reference implementation - customize as needed
 */

import { useStrapiCollection } from '@/hooks/useStrapiData';
import { getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';

export default function StrapiExample() {
  // Example: Fetching articles from Strapi
  const { data, loading, error, refetch } = useStrapiCollection(
    'articles', // Change this to your content type
    {
      populate: '*', // Populate all relations
      sort: ['publishedAt:desc'], // Sort by published date descending
      pagination: {
        page: 1,
        pageSize: 10,
      },
    }
  );

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading content from Strapi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <p>Error loading content: {error.message}</p>
        <button onClick={refetch} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  const articles = data?.data || [];

  if (articles.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No articles found. Make sure you have:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
          <li>Created an "articles" content type in Strapi</li>
          <li>Published some articles</li>
          <li>Enabled API permissions (Settings → Users & Permissions → Roles → Public)</li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Articles from Strapi</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem',
        }}
      >
        {articles.map((article) => {
          const attributes = article.attributes || {};
          const imageUrl = getStrapiImageUrl(attributes.image || attributes.cover);

          return (
            <article
              key={article.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#fff',
              }}
            >
              {imageUrl && (
                <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                  <Image
                    src={imageUrl}
                    alt={attributes.title || 'Article image'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ padding: '1.5rem' }}>
                <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
                  {attributes.title || 'Untitled'}
                </h2>
                {attributes.description && (
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    {attributes.description}
                  </p>
                )}
                {attributes.publishedAt && (
                  <p style={{ fontSize: '0.875rem', color: '#999' }}>
                    Published: {new Date(attributes.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
























