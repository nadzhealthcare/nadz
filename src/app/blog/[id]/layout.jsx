export async function generateMetadata({ params }) {
  const { id } = params;
  
  // You can fetch blog post data here for dynamic metadata
  return {
    title: `Blog Post ${id}`,
    description: "Read our latest healthcare insights and articles from NADZ Healthcare Dubai.",
  };
}

export default function BlogPostLayout({ children }) {
  return children;
}

