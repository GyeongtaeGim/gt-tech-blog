import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  category: 'portfolio';
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
        className='w-full h-48 object-cover rounded-lg'
      />
      <div className='p-4 flex flex-col gap-4'>
        <div>
          {category === 'portfolio' && (
            <h2 className='text-sm text-gray-500'>포트폴리오</h2>
          )}
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
          className='flex gap-2 px-4 mb-4 overflow-x-scroll'
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // Internet Explorer and Edge
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
          }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className='bg-gray-200 text-gray-700 px-2 py-1 rounded-full'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
