import { getPosts } from "../[slug]/utils"
import { baseUrl } from "../sitemap"

export async function GET() {
    const allPosts = await getPosts()

    const itemsXml = allPosts
        .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                return -1
            }
            return 1
        })
        .map(
            (post) =>
                `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
                    post.metadata.publishedAt
                ).toUTCString()}</pubDate>
        </item>`
        )
        .join('\n')

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>GT Tech Blog</title>
        <link>${baseUrl}</link>
        <description>Gyeongtae Gim Tech blog feed</description>
        ${itemsXml}
    </channel>
  </rss>`

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'text/xml',
        },
    })
}