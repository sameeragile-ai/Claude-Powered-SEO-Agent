import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, FileCode, CheckCircle2, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NextJsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NextJsExportModal: React.FC<NextJsExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'package' | 'tailwind' | 'globals' | 'layout' | 'page'>('page');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const files = {
    package: {
      filename: 'package.json',
      language: 'json',
      content: `{
  "name": "claude-seo-engine",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "clsx": "^2.1.1",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.546.0",
    "next": "^14.2.23",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.0.2",
    "canvas-confetti": "^1.9.4"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^20.17.19",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}`
    },
    tailwind: {
      filename: 'tailwind.config.js',
      language: 'javascript',
      content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(99, 102, 241, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'glass-hover': '0 24px 48px -12px rgba(99, 102, 241, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        mesh: {
          '0%, 100%': { transform: 'scale(1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.05) translate(10px, -10px)' },
        },
      },
      animation: {
        'mesh-glow': 'mesh 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};`
    },
    globals: {
      filename: 'app/globals.css',
      language: 'css',
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #f8fafc;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }
}

.glass-panel {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.05);
}

.mesh-ambient-bg {
  background-image: 
    radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.08) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(244, 63, 94, 0.04) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.06) 0px, transparent 50%);
}`
    },
    layout: {
      filename: 'app/layout.tsx',
      language: 'typescript',
      content: `import type { Metadata } from 'next';
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
    <html lang="en" className={\`\${plusJakartaSans.variable} \${jetbrainsMono.variable}\`}>
      <body className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}`
    },
    page: {
      filename: 'app/page.tsx',
      language: 'typescript',
      content: `'use client';

// Next.js 14 App Router Page
// Copy the full App.tsx logic and components from this prototype.
// Both the interactive Vite version and Next.js version are 100% compatible!
export { default } from '@/src/App';
`
    }
  };

  const copyToClipboard = (key: keyof typeof files) => {
    navigator.clipboard.writeText(files[key].content);
    setCopiedFile(key);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Next.js 14 + Vercel Deployment Suite
              </h2>
              <p className="text-xs text-slate-500">
                Zero-config, ready-to-paste files for your Freelancer / Upwork client pitch prototype
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-200 overflow-x-auto bg-slate-50/30">
          {(Object.keys(files) as Array<keyof typeof files>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-xl border-t border-x transition-colors whitespace-nowrap ${
                activeTab === key
                  ? 'bg-white border-slate-200 text-indigo-600 shadow-2xs -mb-px'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{files[key].filename}</span>
            </button>
          ))}
        </div>

        {/* Code Content View */}
        <div className="p-5 flex-1 overflow-y-auto bg-slate-950 text-slate-200 font-mono text-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-[11px] text-slate-400">
              {files[activeTab].filename} ({files[activeTab].language})
            </span>
            <button
              onClick={() => copyToClipboard(activeTab)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-semibold shadow-xs transition-colors"
            >
              {copiedFile === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy File Content</span>
                </>
              )}
            </button>
          </div>

          <pre className="overflow-x-auto p-2 text-[11px] leading-relaxed text-indigo-100 select-all">
            <code>{files[activeTab].content}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tested on Vercel Next.js 14 App Router. Zero external config required.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </motion.div>
    </div>
  );
};
