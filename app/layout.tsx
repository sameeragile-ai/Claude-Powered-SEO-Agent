import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Claude SEO Engine | Autonomous Multi-Agent Suite',
  description: 'Enterprise autonomous Claude 3.5 Sonnet SEO suite featuring Keyword Intelligence, Content Quality Loop, and Backlink Engine orchestration.',
  openGraph: {
    title: 'Claude SEO Engine | Autonomous Multi-Agent Suite',
    description: 'Enterprise autonomous Claude 3.5 Sonnet SEO suite',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
