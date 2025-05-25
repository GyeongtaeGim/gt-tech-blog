import { PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Noto_Sans_KR, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

import './globals.css';

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin-ext'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'GT tech blog',
  description: "Gyeongtae Gim's tech post blog",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const year = new Date().getFullYear();

  return (
    <html lang='ko-KR'>
      <body
        className={[
          spaceGrotesk.className,
          notoSansKr.className,
          'flex flex-col',
        ].join(' ')}>
        <header className='h-16 flex flex-col bg-white/50 backdrop-blur-xl fixed w-full top-0 z-50'>
          <div className='flex-1 px-4 flex items-center justify-between'>
            <Link href='/' className='text-xl font-space'>
              GT Tech blog
            </Link>
            <Link target='_blank' href='https://github.com/GyeongtaeGim'>
              Github
            </Link>
          </div>
          <hr className='border-gray-300' />
        </header>
        <main className='min-h-svh flex flex-col pt-16'>{children}</main>
        <footer className='flex flex-col'>
          <hr className='border-gray-200' />
          <div className='p-6 flex items-center justify-center'>
            <p className='text-gray-300'>
              {year} Gyeongtae Gim All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
