import { prisma } from '@/prsima'
import yaml from 'yaml'

export type Category = 'portfolio' | 'project'

type Metadata = {
    title: string
    publishedAt: string
    summary: string
    category: Category
    image?: string
    tags?: string[]
}

function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = frontmatterRegex.exec(fileContent)
    const frontMatterBlock = match![1]
    const content = fileContent.replace(frontmatterRegex, '').trim()
    return { metadata: yaml.parse(frontMatterBlock) as Metadata, content }
}

export async function getPost(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
    })
    if (!post) {
        return null
    }
    const { metadata, content } = parseFrontmatter(post.content)
    return {
        slug: post.slug,
        metadata: {
            ...metadata,
            publishedAt: new Date(metadata.publishedAt).toISOString(),
        },
        content,
    }
}

export async function getPosts() {
    const posts = (await prisma.post.findMany()).map(post => ({
        slug: post.slug,
        ...parseFrontmatter(post.content)
    }));
    return posts.sort(
        (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )
}

export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date()
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    const targetDate = new Date(date)

    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
    const daysAgo = currentDate.getDate() - targetDate.getDate()

    let formattedDate = ''

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}년 전`
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}달 전`
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}일 전`
    } else {
        formattedDate = '오늘'
    }

    const fullDate = targetDate.toLocaleString('ko-KR', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return fullDate
    }

    return `${fullDate} (${formattedDate})`
}