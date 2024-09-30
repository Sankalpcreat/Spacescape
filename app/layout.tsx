// app/layout.tsx (server-side)

import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // Import Script for Google Analytics

const inter = Inter({ subsets: ['latin'] });

// Replace with your Google Analytics ID from .env.local
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  title: 'SpaceScape',
  description: 'Transform your space with AI. Upload a room photo and receive design suggestions in seconds.',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
