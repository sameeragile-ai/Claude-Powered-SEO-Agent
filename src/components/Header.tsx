import React from 'react';
import { Sparkles, Play, Pause, Download, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  autopilot: boolean;
  onToggleAutopilot: () => void;
  onSimulateFullLoop: () => void;
  isSimulating: boolean;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  autopilot,
  onToggleAutopilot,
  onSimulateFullLoop,
  isSimulating,
  onOpenExportModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/80 shadow-xs">
      {/* Top Bar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  Claude SEO Engine
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Autonomous Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Keyword Intelligence · Content Loop · Backlink Engine
              </p>
            </div>
          </div>

          {/* Autopilot Switcher & Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Autopilot Toggle Button */}
            <button
              onClick={onToggleAutopilot}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                autopilot
                  ? 'bg-emerald-50/90 text-emerald-800 border-emerald-300/80 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80'
              }`}
              title="Toggle Autonomous Orchestration Engine"
            >
              {autopilot ? (
                <>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold">Autopilot Loop Active</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-slate-400" />
                  <span>Manual Mode</span>
                </>
              )}
            </button>

            {/* Run Full Loop Cycle */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onSimulateFullLoop}
              disabled={isSimulating}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isSimulating
                  ? 'bg-indigo-100 text-indigo-700 cursor-not-allowed border border-indigo-200'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm shadow-indigo-500/25'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isSimulating ? 'Executing Loop...' : 'Simulate Full Loop Cycle'}
              </span>
              <span className="sm:hidden">Run Loop</span>
            </motion.button>

            {/* Export Next.js Codebase for Vercel */}
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-xs"
              title="View & Copy Next.js 14 Codebase for Vercel"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">Export Next.js 14 Code</span>
              <span className="md:hidden">Export</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
