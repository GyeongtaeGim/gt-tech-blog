import PostCard from '../[slug]/components/post-card';
import { getPosts } from '../[slug]/utils';

export default function Home() {
  const posts = getPosts();
  return (
    <div className='flex w-full justify-center px-4 py-14'>
      <div className='max-w-6xl w-full flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>게시글 목록</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.metadata.title}
              category={post.metadata.category}
              publishedAt={post.metadata.publishedAt}
              summary={post.metadata.summary}
              image={post.metadata.image}
              tags={post.metadata.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
