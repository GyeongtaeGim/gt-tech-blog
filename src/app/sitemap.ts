import { getPosts } from "./[slug]/utils"

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export default async function sitemap() {
    const posts = getPosts().map((post) => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }))

    const routes = [''].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...posts]
}