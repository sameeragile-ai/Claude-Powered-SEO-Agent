import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound, FileEdit, Link2, ArrowRight, ArrowLeft, Zap, Sparkles, Check } from 'lucide-react';

interface VisualPipelineProps {
  activeStep: number; // 0: idle, 1: keyword, 2: bridge1, 3: content, 4: bridge2, 5: backlink, 6: loop done
  isSimulating: boolean;
  onSelectAgent: (tab: 'keyword' | 'content' | 'backlink') => void;
  activeTab: 'keyword' | 'content' | 'backlink';
}

export const VisualPipeline: React.FC<VisualPipelineProps> = ({
  activeStep,
  isSimulating,
  onSelectAgent,
  activeTab
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/75 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-7 shadow-xl shadow-indigo-500/5 mb-8">
      {/* Background Subtle Mesh Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-24 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header of Pipeline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Autonomous Multi-Agent Orchestration Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time inter-agent messaging protocol: SERP clusters stream to Claude, grounded by backlink authority bridges
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Protocol: LangGraph · Pinecone v2</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-center relative z-10">
        
        {/* NODE 1: KEYWORD AGENT */}
        <motion.div
          onClick={() => onSelectAgent('keyword')}
          whileHover={{ y: -3 }}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${
            activeStep === 1
              ? 'bg-indigo-50/90 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400'
              : activeTab === 'keyword'
              ? 'bg-white border-indigo-300 shadow-md ring-1 ring-indigo-200'
              : 'bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs'
          }`}
        >
          {activeStep === 1 && (
            <div className="absolute -top-2.5 right-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              Clustering
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <KeyRound className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500">Agent #01</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Keyword Intelligence</h4>
          <p className="text-xs text-slate-500 mb-3">SERP vectors & commercial intent classifier</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Status</span>
            <span className="font-semibold text-indigo-700">7 Active Clusters</span>
          </div>
        </motion.div>

        {/* SIGNAL CONNECTOR 1: Keyword -> Content */}
        <div className="hidden lg:flex flex-col items-center justify-center px-1">
          <div className="relative w-full flex items-center justify-center">
            {/* Base line */}
            <div className="w-full h-0.5 bg-slate-200 relative overflow-hidden">
              {(isSimulating || activeStep >= 2) && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                />
              )}
            </div>
            {/* Centered pill badge */}
            <div className="absolute bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-xs flex items-center gap-1 text-[10px] font-mono text-indigo-700 font-semibold whitespace-nowrap">
              <span>(Signals)</span>
              <ArrowRight className="w-3 h-3 text-indigo-500" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">Top Intent Vectors</span>
        </div>

        {/* NODE 2: CONTENT AGENT (CENTRAL) */}
        <motion.div
          onClick={() => onSelectAgent('content')}
          whileHover={{ y: -3 }}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${
            activeStep === 3
              ? 'bg-purple-50/90 border-purple-500 shadow-lg shadow-purple-500/20 ring-2 ring-purple-400'
              : activeTab === 'content'
              ? 'bg-white border-purple-300 shadow-md ring-1 ring-purple-200'
              : 'bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs'
          }`}
        >
          {activeStep === 3 && (
            <div className="absolute -top-2.5 right-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              Refining
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <FileEdit className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500">Agent #02 (Core)</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Content Feedback Loop</h4>
          <p className="text-xs text-slate-500 mb-3">Claude 3.5 Sonnet AEO & self-refinement</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Score</span>
            <span className="font-semibold text-purple-700">96.0 / 100 Target</span>
          </div>
        </motion.div>

        {/* SIGNAL CONNECTOR 2: Backlink -> Content */}
        <div className="hidden lg:flex flex-col items-center justify-center px-1">
          <div className="relative w-full flex items-center justify-center">
            {/* Base line */}
            <div className="w-full h-0.5 bg-slate-200 relative overflow-hidden">
              {(isSimulating || activeStep >= 4) && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                />
              )}
            </div>
            {/* Centered pill badge */}
            <div className="absolute bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-xs flex items-center gap-1 text-[10px] font-mono text-emerald-700 font-semibold whitespace-nowrap">
              <ArrowLeft className="w-3 h-3 text-emerald-500" />
              <span>(Context Links)</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 font-mono">DA 90+ Anchor Feeds</span>
        </div>

        {/* NODE 3: BACKLINK AGENT */}
        <motion.div
          onClick={() => onSelectAgent('backlink')}
          whileHover={{ y: -3 }}
          className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${
            activeStep === 5
              ? 'bg-emerald-50/90 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400'
              : activeTab === 'backlink'
              ? 'bg-white border-emerald-300 shadow-md ring-1 ring-emerald-200'
              : 'bg-white/80 border-slate-200/90 hover:border-slate-300 shadow-xs'
          }`}
        >
          {activeStep === 5 && (
            <div className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              Crawling
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Link2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500">Agent #03</span>
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Backlink Crawler & Bridge</h4>
          <p className="text-xs text-slate-500 mb-3">Toxic link disavow & high-DA outreach bridge</p>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">Queue</span>
            <span className="font-semibold text-emerald-700">42 Disavowed · 4 Leads</span>
          </div>
        </motion.div>

      </div>

      {/* Mobile Flow Indicator Note */}
      <div className="mt-3 lg:hidden flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
        <span>[Keyword Agent]</span>
        <ArrowRight className="w-3 h-3 text-indigo-500" />
        <span>[Content Agent]</span>
        <ArrowLeft className="w-3 h-3 text-emerald-500" />
        <span>[Backlink Agent]</span>
      </div>

    </div>
  );
};
