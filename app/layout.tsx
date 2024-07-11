import './global.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Unbounded } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL('https://elijah-segal.com'),
  title: {
    default: 'Elijah Segal',
    template: '%s | Elijah Segal',
  },
  description: 'Researcher, developer, and New Yorker.',
  openGraph: {
    title: 'Elijah Segal',
    description: 'Researcher, developer, and New Yorker.',
    url: 'https://elijah-segal.com',
    siteName: 'Elijah Segal',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Elijah Segal',
    card: 'summary_large_image',
  }
};

const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
});

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(unbounded.className, 'text-black bg-white dark:text-white dark:bg-[#111010]')}>
      <body className="antialiased flex flex-col md:flex-row mx-4 lg:mx-auto">
        <main className="flex-auto flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
