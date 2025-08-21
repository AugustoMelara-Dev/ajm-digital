// --- FILE: src/app/feed.xml/route.ts ---
import { NextResponse } from 'next/server';
import { getAllPostsMeta } from '@/lib/blog';

export const dynamic = 'force-static';
export const revalidate = 3600; // refresca cada 1h (ISR)

function cdata(s: string) {
  return `<![CDATA[${s.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

export async function GET() {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://ajmdigitalsolutions.com';
  let base = envBase;
  try {
    base = new URL(envBase).origin;
  } catch {
    base = 'https://ajmdigitalsolutions.com';
  }
  const baseUrl = base.replace(/\/$/, '');
  const selfUrl = `${baseUrl}/blog/feed.xml`;

  const posts = getAllPostsMeta({ includeDrafts: false });

  const items = posts
    .map((p) => {
      const link = `${baseUrl}/blog/${p.slug}`;
      const pub = new Date(p.date);
      const pubDate = Number.isNaN(pub.valueOf()) ? new Date() : pub;

      const cats = Array.isArray(p.tags)
        ? p.tags.map((t) => `<category>${cdata(t)}</category>`).join('')
        : '';

      return `
        <item>
          <title>${cdata(p.title)}</title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <pubDate>${pubDate.toUTCString()}</pubDate>
          ${cats}
          ${p.excerpt ? `<description>${cdata(p.excerpt)}</description>` : ''}
        </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>AJM Digital Solutions — Blog</title>
    <link>${baseUrl}/blog</link>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml"/>
    <description>Guías de sitios web, e-commerce y SEO</description>
    <language>es-HN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
