import React, { useState } from 'react';
import { ContentDraft } from '../types/seo';
import { Sparkles, CheckCircle2, Globe, FileText, Share2, ArrowRight, RefreshCw, Sliders, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface AgentContentWorkspaceProps {
  draft: ContentDraft;
  onTriggerRefinement: () => void;
  isRefining: boolean;
}

export const AgentContentWorkspace: React.FC<AgentContentWorkspaceProps> = ({
  draft,
  onTriggerRefinement,
  isRefining
}) => {
  const [activeDraftTab, setActiveDraftTab] = useState<'v2' | 'v1' | 'diff'>('v2');
  const [activePreviewTab, setActivePreviewTab] = useState<'google' | 'og'>('google');

  const handleRefineClick = () => {
    onTriggerRefinement();
    // After short delay trigger confetti celebration
    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }, 1200);
  };

  const isUpgraded = draft.totalScore >= 94;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Article Status & Trigger Refinement Button */}
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xl shadow-indigo-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Agent #02 Active Draft
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-slate-500">Target KW: &quot;{draft.targetKeyword}&quot;</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {draft.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Slug: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono">/blog/{draft.slug}</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleRefineClick}
              disabled={isRefining}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all shadow-md ${
                isRefining
                  ? 'bg-purple-400 cursor-not-allowed shadow-purple-400/20'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 shadow-purple-500/25 ring-2 ring-purple-300/50'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isRefining ? 'animate-spin' : ''}`} />
              <span>
                {isRefining
                  ? 'Claude 3.5 Sonnet Rewriting & Tuning...'
                  : isUpgraded
                  ? 'Re-Trigger Self-Refinement (96% Achieved)'
                  : 'Trigger Claude Self-Refinement (82% → 96%)'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Scoring Dial / Metrics Bar Row */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Readability Score */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Readability</span>
              <span className="text-xs font-mono font-bold text-slate-900">{draft.readabilityScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${draft.readabilityScore}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Flesch-Kincaid: Grade 8.2</span>
          </div>

          {/* Keyword Density */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">KW Density</span>
              <span className="text-xs font-mono font-bold text-slate-900">{draft.keywordDensity.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${(draft.keywordDensity / 2.5) * 100}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Target: 1.8% (Anti-Stuffing)</span>
          </div>

          {/* Tone & Intent Alignment */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Tone Authority</span>
              <span className="text-xs font-mono font-bold text-slate-900">{draft.toneScore}/100</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${draft.toneScore}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Authoritative B2B SaaS</span>
          </div>

          {/* Semantic Coverage */}
          <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Semantic Depth</span>
              <span className="text-xs font-mono font-bold text-slate-900">{draft.semanticCoverage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${draft.semanticCoverage}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Entity-Graph & LSI Synonyms</span>
          </div>

        </div>
      </div>

      {/* Main Content Layout: 2 Columns (Draft Comparison + SERP/Outline Inspector) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 Cols): Draft Viewer with Tabs */}
        <div className="lg:col-span-7 bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xl shadow-indigo-500/5">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Autonomous Article Synthesis
              </h3>
            </div>

            {/* Version Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveDraftTab('v2')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeDraftTab === 'v2'
                    ? 'bg-white text-purple-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>v2 (Claude Refined)</span>
                {isUpgraded && <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>}
              </button>
              <button
                onClick={() => setActiveDraftTab('v1')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeDraftTab === 'v1'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                v1 (Raw Baseline)
              </button>
            </div>
          </div>

          {/* Draft Prose Body */}
          <div className="space-y-4">
            {activeDraftTab === 'v2' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans"
              >
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/70 text-xs text-purple-900 flex items-center justify-between">
                  <span className="font-semibold">Claude Self-Refinement Applied:</span>
                  <span className="font-mono text-purple-700 font-bold">Readability 94% · KD 1.8% · Score 96.0</span>
                </div>

                <p className="whitespace-pre-line">
                  {draft.v2Draft}
                </p>

                {/* Bridged Anchor Links Tag */}
                {draft.bridgedLinks.length > 0 && (
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Backlink Signal Bridge Integrated</span>
                    </div>
                    {draft.bridgedLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-emerald-800">
                        <span>Anchor: &quot;<strong>{link.anchor}</strong>&quot;</span>
                        <span className="font-mono font-semibold">DA {link.da} ({link.domain})</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans"
              >
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span className="font-semibold">Baseline v1 Draft (Pre-Refinement):</span>
                  <span className="font-mono text-amber-700 font-bold">Fluff Ratio 18% · KD 1.2% · Score 82.0</span>
                </div>
                <p className="whitespace-pre-line">
                  {draft.v1Draft}
                </p>
              </motion.div>
            )}
          </div>

        </div>

        {/* Right Column (5 Cols): Meta-Tag SERP Preview & Schema & Outline */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SERP Snippet Preview Box */}
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-xl shadow-indigo-500/5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  SERP & Meta-Tag Live Preview
                </h4>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setActivePreviewTab('google')}
                  className={`px-2 py-0.5 rounded-md ${
                    activePreviewTab === 'google' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500'
                  }`}
                >
                  Google SERP
                </button>
                <button
                  onClick={() => setActivePreviewTab('og')}
                  className={`px-2 py-0.5 rounded-md ${
                    activePreviewTab === 'og' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500'
                  }`}
                >
                  OpenGraph Card
                </button>
              </div>
            </div>

            {/* Google SERP Visual */}
            {activePreviewTab === 'google' ? (
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[9px]">
                    C
                  </div>
                  <div className="truncate">
                    <span className="font-medium text-slate-800">mysaas.io</span>
                    <span className="text-slate-400"> › blog › {draft.slug}</span>
                  </div>
                </div>
                <h5 className="text-sm font-medium text-blue-700 hover:underline cursor-pointer line-clamp-1 leading-snug">
                  {draft.metaTitle}
                </h5>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {draft.metaDescription}
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50">
                <div className="h-24 bg-gradient-to-tr from-indigo-700 via-purple-700 to-pink-600 p-3 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">TechArticle Schema</span>
                  <span className="text-xs font-bold line-clamp-1">{draft.title}</span>
                </div>
                <div className="p-3 bg-white">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">mysaas.io</div>
                  <div className="text-xs font-semibold text-slate-800 line-clamp-1">{draft.metaTitle}</div>
                </div>
              </div>
            )}
          </div>

          {/* Article Outline Structure */}
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-xl shadow-indigo-500/5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Autonomous Outline & Headings
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {draft.outline.map((heading, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-4 h-4 rounded-full bg-purple-50 text-purple-600 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-slate-800">{heading}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
