import './globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from './sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Room Designer', // Updated Title
  description: 'Transform your space with AI. Upload a room photo and receive design suggestions in seconds.', // Updated Description
  robots: 'index, follow',
  openGraph: {
    title: 'AI Room Designer', // Updated OpenGraph Title
    description: 'Transform your space with AI. Upload a room photo and receive design suggestions in seconds.', // Updated OpenGraph Description
    url: 'https://ai-room-designer.com/', // Updated URL
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ai-room-designer.com/new-app-screenshot.png', // Updated Screenshot URL
        width: 1200,
        height: 630,
        alt: 'Screenshot of the AI Room Designer app',
      },
    ],
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Sidebar />
        {children}
        {/* Removed Analytics */}
      </body>
    </html>
  );
}
