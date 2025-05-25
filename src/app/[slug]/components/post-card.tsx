import Link from 'next/link';

import { Category } from '../utils';

interface PostCardProps {
  slug: string;
  title: string;
  category: Category;
  publishedAt: string;
  summary: string;
  image?: string;
  tags?: string[];
}

export default function PostCard({
  slug,
  title,
  category,
  publishedAt,
  summary,
  image,
  tags,
}: PostCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className='flex flex-col gap-4 border rounded-lg shadow-md border-gray-200'>
      <img
        src={image || `/og?title=${encodeURIComponent(title)}`}
        alt={title}
        className='w-full h-48 object-cover border-b border-gray-200'
      />
      <div className='p-4 flex flex-col gap-4'>
        <div>
          <h2 className='text-sm text-gray-500 uppercase'>{category}</h2>

          <h1 className='text-xl font-bold'>{title}</h1>
        </div>
        <p className='text-gray-500'>{summary}</p>
        <p className='text-sm text-gray-500'>
          {new Date(publishedAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      {tags && (
        <div
          className='flex gap-2 px-4 mb-4 overflow-x-scroll flex-1 items-end'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className='bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-nowrap'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
