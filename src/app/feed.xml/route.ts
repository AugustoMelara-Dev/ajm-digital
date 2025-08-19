// src/app/feed.xml/route.ts
import { NextResponse } from 'next/server';
import { getAllPostsMeta } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const items = getAllPostsMeta()
    .map((p) => `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${base}/blog/${p.slug}</link>
        <guid>${base}/blog/${p.slug}</guid>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        ${p.excerpt ? `<description><![CDATA[${p.excerpt}]]></description>` : ''}
      </item>
    `)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>AJM Digital Solutions - Blog</title>
      <link>${base}/blog</link>
      <description>Guías de diseño web, e-commerce y SEO en Honduras</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}