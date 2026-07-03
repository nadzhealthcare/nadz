'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getStrapiImageUrl } from '@/lib/strapi';

const proseClasses = 'prose prose-lg max-w-none text-text-gray';

/** Allowed color names (CSS + theme). Theme names map to Tailwind/theme colors. */
const ALLOWED_COLOR_NAMES = new Set([
  'red', 'blue', 'green', 'orange', 'purple', 'pink', 'teal', 'cyan', 'yellow', 'indigo', 'gray', 'grey',
  'black', 'white', 'primary', 'mediumBlue', 'darkTeal', 'dark-blue', 'medium-blue', 'dark-teal',
]);
const THEME_COLOR_CLASSES = {
  primary: 'text-primary-mediumBlue',
  mediumBlue: 'text-primary-mediumBlue',
  darkTeal: 'text-primary-darkTeal',
  'dark-teal': 'text-primary-darkTeal',
  'medium-blue': 'text-primary-mediumBlue',
  'dark-blue': 'text-primary-darkTeal',
};

/** Sanitize color value for use in style or return Tailwind class name. Returns null if invalid. */
function sanitizeColor(value) {
  if (!value || typeof value !== 'string') return null;
  const v = value.trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) return { type: 'style', value: v };
  if (/^rgb\s*\([^)]+\)$/.test(v) || /^rgba\s*\([^)]+\)$/.test(v)) return { type: 'style', value: v };
  const lower = v.toLowerCase();
  if (ALLOWED_COLOR_NAMES.has(lower) || ALLOWED_COLOR_NAMES.has(v)) {
    const themeClass = THEME_COLOR_CLASSES[v] || THEME_COLOR_CLASSES[lower];
    if (themeClass) return { type: 'class', value: themeClass };
    return { type: 'style', value: lower };
  }
  return null;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Preprocess markdown: replace [color:value]text[/color] and [bg:value]text[/bg] with safe HTML.
 * Use in CMS: [color:red]red text[/color], [color:#0066cc]blue[/color], [color:primary]theme color[/color], [bg:yellow]highlight[/bg]
 */
function preprocessColors(text) {
  if (typeof text !== 'string') return text;
  let out = text;
  const colorRegex = /\[color\s*:\s*([^\]]+)\](.*?)\[\/color\]/gs;
  out = out.replace(colorRegex, (_, value, content) => {
    const sanitized = sanitizeColor(value);
    if (!sanitized) return `[color:${value}]${content}[/color]`;
    const escaped = escapeHtml(content);
    if (sanitized.type === 'class') {
      return `<span class="${sanitized.value}">${escaped}</span>`;
    }
    return `<span style="color:${sanitized.value}">${escaped}</span>`;
  });
  const bgRegex = /\[bg\s*:\s*([^\]]+)\](.*?)\[\/bg\]/gs;
  out = out.replace(bgRegex, (_, value, content) => {
    const sanitized = sanitizeColor(value);
    if (!sanitized) return `[bg:${value}]${content}[/bg]`;
    const escaped = escapeHtml(content);
    if (sanitized.type === 'class') {
      const bgClass = sanitized.value.replace('text-', 'bg-');
      return `<span class="${bgClass} bg-opacity-20 px-1 rounded">${escaped}</span>`;
    }
    return `<span style="background-color:${sanitized.value}" class="px-1 rounded">${escaped}</span>`;
  });
  return out;
}
const headingClasses = {
  1: 'text-3xl md:text-4xl font-bold text-primary-darkTeal mt-10 mb-4',
  2: 'text-2xl md:text-3xl font-bold text-primary-darkTeal mt-8 mb-3',
  3: 'text-xl md:text-2xl font-semibold text-primary-darkTeal mt-6 mb-2',
  4: 'text-lg md:text-xl font-semibold text-primary-darkTeal mt-4 mb-2',
  5: 'text-base md:text-lg font-semibold text-primary-darkTeal mt-3 mb-1',
  6: 'text-base font-semibold text-primary-darkTeal mt-2 mb-1',
};

/** Shared Markdown components including table support (GFM) */
const markdownComponents = {
  p: ({ children }) => <p className="text-lg leading-relaxed mb-4">{children}</p>,
  h1: ({ children }) => <h1 className={headingClasses[1]}>{children}</h1>,
  h2: ({ children }) => <h2 className={headingClasses[2]}>{children}</h2>,
  h3: ({ children }) => <h3 className={headingClasses[3]}>{children}</h3>,
  h4: ({ children }) => <h4 className={headingClasses[4]}>{children}</h4>,
  h5: ({ children }) => <h5 className={headingClasses[5]}>{children}</h5>,
  h6: ({ children }) => <h6 className={headingClasses[6]}>{children}</h6>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ href, children }) => {
    const url = href || '#';
    const isExternal = url.startsWith('http');
    if (isExternal) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary-mediumBlue hover:text-primary-darkTeal underline">
          {children}
        </a>
      );
    }
    return (
      <Link href={url} className="text-primary-mediumBlue hover:text-primary-darkTeal underline">
        {children}
      </Link>
    );
  },
  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 pl-4">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 pl-4">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-mediumBlue bg-primary-mediumBlue/5 pl-6 pr-6 py-4 my-6 italic text-xl text-primary-darkTeal">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) =>
    className ? (
      <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-4 font-mono">
        <code>{children}</code>
      </pre>
    ) : (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
  // GFM tables (remark-gfm)
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-primary-mediumBlue/10 text-primary-darkTeal">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-gray-50/50">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3">{children}</td>,
};

/**
 * Normalize Strapi blocks: accept flat array or root doc with children.
 * Returns array of block nodes or null.
 */
function normalizeBlocks(value) {
  if (value == null) return null;
  if (Array.isArray(value)) {
    return value.length === 0 ? null : value;
  }
  if (typeof value === 'object' && Array.isArray(value.children)) {
    return value.children.length === 0 ? null : value.children;
  }
  return null;
}

/**
 * Renders Strapi rich text: either a string (legacy) or blocks array from the Blocks editor.
 * Supports headings, bullets, numbered lists, hyperlinks, images, code, quotes, and tables.
 */
export function RichTextBlock({ content, className = '' }) {
  if (content == null || content === '') {
    return null;
  }

  // Plain string: render as Markdown (headings, bold, lists, links, tables, colors via GFM + rehype-raw)
  if (typeof content === 'string') {
    const withColors = preprocessColors(content);
    return (
      <div className={`${proseClasses} ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
          {withColors}
        </ReactMarkdown>
      </div>
    );
  }

  // Strapi Blocks: array of block objects (or root doc with children)
  const blocks = normalizeBlocks(content);
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Single paragraph with one text node that looks like markdown → render as Markdown (CMS stored typed markdown as one block)
  const single = blocks.length === 1 && blocks[0]?.type === 'paragraph' && blocks[0].children?.length === 1;
  const textNode = single && blocks[0].children[0]?.type === 'text' ? blocks[0].children[0].text : null;
  const looksLikeMarkdown = typeof textNode === 'string' && (/[*_#\[\]`|]/.test(textNode) || /^\s*#\s/m.test(textNode) || /\[(?:color|bg)\s*:/.test(textNode));
  if (textNode && looksLikeMarkdown) {
    const withColors = preprocessColors(textNode);
    return (
      <div className={`${proseClasses} ${className}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
          {withColors}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={`${proseClasses} ${className}`}>
      <BlocksRenderer
        content={blocks}
        blocks={{
          paragraph: ({ children }) => (
            <p className="text-lg leading-relaxed mb-4">{children}</p>
          ),
          heading: ({ children, level }) => {
            const levelNum = Number(level) || 1;
            const Tag = `h${Math.min(6, Math.max(1, levelNum))}`;
            return (
              <Tag className={headingClasses[levelNum] ?? headingClasses[2]}>
                {children}
              </Tag>
            );
          },
          list: ({ children, format }) => {
            const ListTag = format === 'ordered' ? 'ol' : 'ul';
            const listClass =
              format === 'ordered'
                ? 'list-decimal list-inside space-y-1 mb-4 pl-4'
                : 'list-disc list-inside space-y-1 mb-4 pl-4';
            return <ListTag className={listClass}>{children}</ListTag>;
          },
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-mediumBlue bg-primary-mediumBlue/5 pl-6 pr-6 py-4 my-6 italic text-xl text-primary-darkTeal">
              {children}
            </blockquote>
          ),
          code: ({ plainText }) => (
            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-4 font-mono">
              <code>{plainText}</code>
            </pre>
          ),
          image: ({ image }) => {
            const url = getStrapiImageUrl(image);
            if (!url) return null;
            const alt = image?.alternativeText ?? image?.caption ?? image?.name ?? 'Image';
            return (
              <span className="block my-6 rounded-xl overflow-hidden">
                <Image
                  src={url}
                  alt={alt}
                  width={800}
                  height={450}
                  className="w-full h-auto object-contain"
                />
              </span>
            );
          },
          link: ({ children, url }) => {
            const href = url || '#';
            const isExternal = href.startsWith('http');
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-mediumBlue hover:text-primary-darkTeal underline"
                >
                  {children}
                </a>
              );
            }
            return (
              <Link href={href} className="text-primary-mediumBlue hover:text-primary-darkTeal underline">
                {children}
              </Link>
            );
          },
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <span className="underline">{children}</span>,
          strikethrough: ({ children }) => <span className="line-through">{children}</span>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
          ),
        }}
      />
    </div>
  );
}
