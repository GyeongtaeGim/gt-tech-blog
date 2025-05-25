import React, { PropsWithChildren } from 'react';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';

import { StackBlitzEmbed } from './stack-blitz-embed';
import Video from './video';

const Heading1 = ({ children }: PropsWithChildren) => {
  return <h1 className='text-4xl text-gray-900'>{children}</h1>;
};

const Heading2 = ({ children }: PropsWithChildren) => {
  return <h2 className='text-3xl text-gray-900'>{children}</h2>;
};

const Heading3 = ({ children }: PropsWithChildren) => {
  return <h3 className='text-2xl font-bold text-gray-900'>{children}</h3>;
};

const Heading4 = ({ children }: PropsWithChildren) => {
  return <h4 className='text-xl font-bold text-gray-900'>{children}</h4>;
};
const Heading5 = ({ children }: PropsWithChildren) => {
  return <h5 className='text-lg font-bold text-gray-900'>{children}</h5>;
};

const Heading6 = ({ children }: PropsWithChildren) => {
  return <h6 className='text-base font-bold text-gray-900'>{children}</h6>;
};

const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  StackBlitzEmbed,
  Video,
};

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
