/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricsGrid } from './components/MetricsGrid';
import { VisualPipeline } from './components/VisualPipeline';
import { AgentKeywordWorkspace } from './components/AgentKeywordWorkspace';
import { AgentContentWorkspace } from './components/AgentContentWorkspace';
import { AgentBacklinkWorkspace } from './components/AgentBacklinkWorkspace';
import { ExecutionConsole } from './components/ExecutionConsole';
import { NextJsExportModal } from './components/NextJsExportModal';
import {
  INITIAL_KEYWORDS,
  INITIAL_CONTENT_DRAFT,
  INITIAL_BACKLINKS,
  INITIAL_OUTREACH_LEADS,
  INITIAL_LOGS
} from './data/mockData';
import { KeywordItem, ContentDraft, BacklinkItem, OutreachLead, ExecutionLog, SearchIntent } from './types/seo';
import { KeyRound, FileEdit, Link2, Sparkles, Layers, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function App() {
  // Global Autopilot & Simulation State
  const [autopilot, setAutopilot] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<'keyword' | 'content' | 'backlink'>('keyword');

  // Next.js 14 Vercel Export Modal
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Agent State
  const [keywords, setKeywords] = useState<KeywordItem[]>(INITIAL_KEYWORDS);
  const [isReclustering, setIsReclustering] = useState<boolean>(false);

  const [contentDraft, setContentDraft] = useState<ContentDraft>(INITIAL_CONTENT_DRAFT);
  const [isRefining, setIsRefining] = useState<boolean>(false);

  const [backlinks, setBacklinks] = useState<BacklinkItem[]>(INITIAL_BACKLINKS);
  const [outreachLeads, setOutreachLeads] = useState<OutreachLead[]>(INITIAL_OUTREACH_LEADS);
  const [toxicNeutralizedCount, setToxicNeutralizedCount] = useState<number>(42);

  // Execution Console State
  const [logs, setLogs] = useState<ExecutionLog[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Helper to add log entries
  const addLog = (
    agent: ExecutionLog['agent'],
    level: ExecutionLog['level'],
    message: string,
    details?: string
  ) => {
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    const newLog: ExecutionLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: timeStr,
      agent,
      level,
      message,
      details
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
  };

  // Background Autopilot Heartbeat
  useEffect(() => {
    if (!autopilot || !isStreaming) return;
    const interval = setInterval(() => {
      const messages = [
        {
          agent: 'pinecone' as const,
          level: 'info' as const,
          msg: 'Periodic vector namespace index sync [seo-clusters-v2]. 1,420 high-intent nodes validated.',
          detail: 'Cosine index similarity standard deviation: ±0.012'
        },
        {
          agent: 'keyword' as const,
          level: 'tool_call' as const,
          msg: 'SERP prober monitored 7 target keywords. Zero competitor volatility detected.',
          detail: 'Avg position: #3.8 across US Tier-1 index'
        },
        {
          agent: 'backlink' as const,
          level: 'info' as const,
          msg: 'Disavow daemon verified Google Search Console OAuth handshake.',
          detail: 'All 42 flagged malicious origins neutralized'
        }
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      addLog(randomMsg.agent, randomMsg.level, randomMsg.msg, randomMsg.detail);
    }, 12000);

    return () => clearInterval(interval);
  }, [autopilot, isStreaming]);

  // Full Loop Simulation
  const handleSimulateFullLoop = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setPipelineStep(1);

    addLog(
      'orchestrator',
      'info',
      'Starting orchestrated 3-agent autonomous cycle [Run #1094].',
      'Orchestrating Keyword -> Content -> Backlink feedback bridges'
    );

    // Step 1: Keyword Agent
    setTimeout(() => {
      setPipelineStep(1);
      setActiveTab('keyword');
      addLog(
        'keyword',
        'tool_call',
        'Agent #01: Pinecone SERP cluster query dispatched.',
        'Embedding 148 competitor ranking vectors via Claude 3.5 Sonnet'
      );
    }, 400);

    // Step 2: Signals Bridge
    setTimeout(() => {
      setPipelineStep(2);
      addLog(
        'pinecone',
        'info',
        'Signal Bridge: Emitting 7 high-intent clusters to Content Agent.',
        'Payload: target_keyword="autonomous seo agent architecture", priority_score=98'
      );
    }, 1800);

    // Step 3: Content Agent
    setTimeout(() => {
      setPipelineStep(3);
      setActiveTab('content');
      setIsRefining(true);
      addLog(
        'claude',
        'tool_call',
        'Agent #02: Anthropic Claude 3.5 Sonnet prompt invocation: evaluate_content_quality()',
        'Optimizing Flesch-Kincaid grade level & entity Answer Engine density'
      );

      // Score upgrade
      setTimeout(() => {
        setContentDraft((prev) => ({
          ...prev,
          readabilityScore: 94,
          keywordDensity: 1.8,
          toneScore: 96,
          semanticCoverage: 98,
          totalScore: 96,
          status: 'published'
        }));
        setIsRefining(false);
        addLog(
          'content',
          'success',
          'Agent #02: Claude Self-Refinement achieved 96.0/100 quality threshold.',
          'v2 Draft published to production Headless CMS API'
        );
      }, 1400);
    }, 3200);

    // Step 4: Context Bridge
    setTimeout(() => {
      setPipelineStep(4);
      addLog(
        'orchestrator',
        'info',
        'Context Bridge: Ingesting high-DA backlink anchors from Agent #03.',
        'Matched: searchengineland.com (DA 91) anchor="enterprise internal link graph graphrag"'
      );
    }, 5200);

    // Step 5: Backlink Agent
    setTimeout(() => {
      setPipelineStep(5);
      setActiveTab('backlink');
      addLog(
        'backlink',
        'success',
        'Agent #03: Backlink crawler disavowed 2 newly detected spam origins.',
        'Google Disavow file updated and pushed to GSC API'
      );
      setToxicNeutralizedCount((c) => c + 2);
    }, 6600);

    // Completion
    setTimeout(() => {
      setPipelineStep(0);
      setIsSimulating(false);
      addLog(
        'orchestrator',
        'success',
        'Autonomous cycle finished successfully. All invariants verified.',
        'Projected Organic Traffic increment: +184.2%'
      );
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // confetti fallback
      }
    }, 8000);
  };

  // Re-Cluster Keywords Action
  const handleReclusterKeywords = () => {
    setIsReclustering(true);
    addLog(
      'keyword',
      'tool_call',
      'Triggered Pinecone SERP re-clustering across 7 target clusters.',
      'Recalculating cosine similarity & intent vectors'
    );

    setTimeout(() => {
      setKeywords((prev) =>
        prev.map((k) => {
          const shift = Math.floor(Math.random() * 3) + 1;
          const newPos = Math.max(1, k.serpPosition - 1);
          return {
            ...k,
            serpPosition: newPos,
            serpChange: shift,
            claudePriority: Math.min(99, k.claudePriority + 1)
          };
        })
      );
      setIsReclustering(false);
      addLog(
        'keyword',
        'success',
        'SERP Re-Cluster completed: 4 terms elevated into Top 3 positions.',
        'High-Intent Terms expanded to 1,420 total'
      );
    }, 1200);
  };

  // Add custom seed keyword
  const handleAddKeyword = (kw: string, cluster: string, intent: SearchIntent) => {
    const newItem: KeywordItem = {
      id: `kw-${Date.now()}`,
      keyword: kw,
      cluster,
      volume: 4800,
      difficulty: 54,
      intent,
      cpc: 12.5,
      claudePriority: 95,
      serpPosition: 5,
      serpChange: 2,
      serpCompetitor: 'g2.com/categories'
    };
    setKeywords((prev) => [newItem, ...prev]);
    addLog(
      'keyword',
      'info',
      `Custom seed keyword embedded and added: "${kw}".`,
      `Vector cluster assigned: ${cluster}`
    );
  };

  // Trigger Content Refinement
  const handleTriggerRefinement = () => {
    setIsRefining(true);
    addLog(
      'claude',
      'tool_call',
      'Claude 3.5 Sonnet executing iterative multi-pass refinement prompt.',
      'Target metrics: Readability > 90, Entity Graph Density = 1.8%'
    );

    setTimeout(() => {
      setContentDraft((prev) => ({
        ...prev,
        readabilityScore: 94,
        keywordDensity: 1.8,
        toneScore: 96,
        semanticCoverage: 98,
        totalScore: 96,
        status: 'published'
      }));
      setIsRefining(false);
      addLog(
        'content',
        'success',
        'Claude Self-Refinement completed. Content Score elevated from 82% → 96%.',
        'All EEAT criteria met with zero fluff phrases.'
      );
    }, 1300);
  };

  // Disavow single link
  const handleDisavowLink = (id: string) => {
    setBacklinks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'disavowed' } : b))
    );
    setToxicNeutralizedCount((c) => c + 1);
    const item = backlinks.find((b) => b.id === id);
    addLog(
      'backlink',
      'warning',
      `Disavowed toxic link from domain: ${item?.domain || id}`,
      'Appended domain entry to Google Search Console Disavow batch'
    );
  };

  // Bridge outreach lead to Content Agent
  const handleBridgeLead = (id: string) => {
    const lead = outreachLeads.find((l) => l.id === id);
    if (!lead) return;

    setOutreachLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, bridged: true } : l))
    );

    // Ingest into content draft
    setContentDraft((prev) => ({
      ...prev,
      bridgedLinks: [
        ...prev.bridgedLinks,
        {
          anchor: lead.suggestedAnchor,
          domain: lead.domain,
          da: lead.da,
          url: `https://${lead.domain}/article/${lead.id}`
        }
      ]
    }));

    addLog(
      'orchestrator',
      'success',
      `Signal bridged: Injected DA ${lead.da} anchor "${lead.suggestedAnchor}" from ${lead.domain} into Content Agent.`,
      'Contextual schema hyperlink node generated'
    );

    // Switch to content tab to highlight the connection
    setActiveTab('content');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 mesh-ambient-bg flex flex-col font-sans">
      
      {/* Top Bar Header */}
      <Header
        autopilot={autopilot}
        onToggleAutopilot={() => {
          setAutopilot(!autopilot);
          addLog(
            'orchestrator',
            'info',
            !autopilot ? 'Autopilot Loop activated.' : 'Autopilot switched to Manual Mode.'
          );
        }}
        onSimulateFullLoop={handleSimulateFullLoop}
        isSimulating={isSimulating}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Kicker & Enterprise Value Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-700 font-mono uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Multi-Agent Cognitive Framework · Claude 3.5 Sonnet</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Autonomous Search Dominance Engine
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 max-w-2xl">
              Continuous loop uniting real-time SERP vector clustering, autonomous EEAT article generation with self-refinement, and proactive toxic backlink neutralization.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-slate-500 bg-white/80 border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
              Live Index: <strong>Google US Desktop</strong>
            </span>
          </div>
        </div>

        {/* 4 Core High-Impact Metric KPI Cards */}
        <MetricsGrid
          contentScore={contentDraft.totalScore}
          toxicNeutralizedCount={toxicNeutralizedCount}
        />

        {/* Visual Agent Orchestration Pipeline Graph */}
        <VisualPipeline
          activeStep={pipelineStep}
          isSimulating={isSimulating}
          onSelectAgent={(tab) => setActiveTab(tab)}
          activeTab={activeTab}
        />

        {/* Three-Agent Workspace Section */}
        <div className="space-y-4">
          
          {/* Main Workspace Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('keyword')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'keyword'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Agent 1: Keyword Intelligence</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'keyword' ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {keywords.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'content'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Agent 2: Content Feedback Loop</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'content' ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {contentDraft.totalScore} pts
                </span>
              </button>

              <button
                onClick={() => setActiveTab('backlink')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                  activeTab === 'backlink'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>Agent 3: Backlink Crawler & Bridge</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  activeTab === 'backlink' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {backlinks.length + outreachLeads.length}
                </span>
              </button>
            </div>
          </div>

          {/* Tab Workspaces */}
          <AnimatePresence mode="wait">
            {activeTab === 'keyword' && (
              <motion.div
                key="tab-keyword"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgentKeywordWorkspace
                  keywords={keywords}
                  onRecluster={handleReclusterKeywords}
                  isReclustering={isReclustering}
                  onAddKeyword={handleAddKeyword}
                />
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                key="tab-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgentContentWorkspace
                  draft={contentDraft}
                  onTriggerRefinement={handleTriggerRefinement}
                  isRefining={isRefining}
                />
              </motion.div>
            )}

            {activeTab === 'backlink' && (
              <motion.div
                key="tab-backlink"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgentBacklinkWorkspace
                  backlinks={backlinks}
                  outreachLeads={outreachLeads}
                  onDisavowLink={handleDisavowLink}
                  onBridgeLead={handleBridgeLead}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Live Execution Console (Docked Terminal) */}
        <div className="pt-4">
          <ExecutionConsole
            logs={logs}
            onClearLogs={() => setLogs([])}
            isStreaming={isStreaming}
            onToggleStreaming={() => setIsStreaming(!isStreaming)}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Claude SEO Engine</span>
            <span>·</span>
            <span>Autonomous Multi-Agent Enterprise Suite</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Export Next.js 14 Codebase
            </button>
            <span>·</span>
            <span>Zero-Config Vercel Ready</span>
          </div>
        </div>
      </footer>

      {/* Next.js 14 Code Export Modal */}
      <NextJsExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </div>
  );
}
