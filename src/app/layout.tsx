'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/fragment/Navbar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const disabledNavbar = ['login', 'register', 'admin'];
  const pathname = usePathname();
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          {!disabledNavbar.includes(pathname.split('/')[1]) && <Navbar />}
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
