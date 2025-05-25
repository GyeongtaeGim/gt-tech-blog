import fs from 'fs'
import path from 'path'
import yaml from 'yaml'

type Metadata = {
    title: string
    publishedAt: string
    summary: string
    category: 'portfolio'
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

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir)
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file))
        const slug = path.basename(file, path.extname(file))

        return {
            metadata,
            slug,
            content,
        }
    })
}

export function getPosts() {
    return getMDXData(path.join(process.cwd(), 'src', 'app', '[slug]', 'posts'))
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