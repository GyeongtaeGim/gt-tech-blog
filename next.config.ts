import createMDX from '@next/mdx';

const nextConfig = createMDX()({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});

export default nextConfig;
