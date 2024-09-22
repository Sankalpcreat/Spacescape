// app/components/ClientLayout.tsx (client-side)

"use client";

import { Sidebar } from '../sidebar'; // Adjust the import path if necessary
import { usePathname } from 'next/navigation';

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  // Determine if the Sidebar should be displayed
  const showSidebar = pathname !== '/'; // Hide sidebar on landing page

  // Set padding conditionally, no padding for home page
  const containerClasses = pathname === '/home' ? 'pl-0' : 'lg:pl-72';

  return (
    <>
      {showSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
      <div className={`min-h-screen flex flex-col py-10 ${containerClasses}`}>
        {children}
      </div>
    </>
  );
}
