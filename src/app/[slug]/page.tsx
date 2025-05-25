import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { baseUrl } from '../sitemap';
import { MDX } from './components/mdx';
import { getPost } from './utils';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const postSlug = (await params).slug;
  const post = await getPost(postSlug);
  if (!post) {
    return notFound();
  }

  return (
    <div className='flex w-full justify-center px-4 py-14'>
      <div className='max-w-6xl w-full flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl'>{post.metadata.title}</h1>
          <p className='text-sm text-gray-500'>
            {new Date(post.metadata.publishedAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <MDX source={post.content} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | null> {
  const postSlug = (await params).slug;
  const post = await getPost(postSlug);
  if (!post) {
    return null;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    tags = [],
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    creator: 'Gyeongtae Gim',
    keywords: tags,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      siteName: 'GT Tech Blog',
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
