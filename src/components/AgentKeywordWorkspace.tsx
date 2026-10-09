import React, { useState } from 'react';
import { KeywordItem, SearchIntent } from '../types/seo';
import { Search, RefreshCw, Plus, ArrowUpRight, ArrowDownRight, Layers, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentKeywordWorkspaceProps {
  keywords: KeywordItem[];
  onRecluster: () => void;
  isReclustering: boolean;
  onAddKeyword: (keyword: string, cluster: string, intent: SearchIntent) => void;
}

export const AgentKeywordWorkspace: React.FC<AgentKeywordWorkspaceProps> = ({
  keywords,
  onRecluster,
  isReclustering,
  onAddKeyword
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredKeywords = keywords.filter((k) => {
    const matchesSearch =
      k.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.cluster.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = selectedIntent === 'all' || k.intent === selectedIntent;
    return matchesSearch && matchesIntent;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeywordInput.trim()) return;
    onAddKeyword(newKeywordInput.trim(), 'LLM Content Workflows', 'commercial');
    setNewKeywordInput('');
    setShowAddForm(false);
  };

  const getIntentBadge = (intent: SearchIntent) => {
    switch (intent) {
      case 'transactional':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'commercial':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'informational':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Workspace Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/70 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        
        {/* Search & Filter */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search SERP keywords or clusters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Intent filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['all', 'commercial', 'transactional', 'informational'].map((intent) => (
              <button
                key={intent}
                onClick={() => setSelectedIntent(intent)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  selectedIntent === intent
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Add Seed Keyword</span>
          </button>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onRecluster}
            disabled={isReclustering}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white transition-all shadow-sm shadow-indigo-500/20 ${
              isReclustering
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReclustering ? 'animate-spin' : ''}`} />
            <span>{isReclustering ? 'Calculating SERP Vectors...' : 'Run SERP Re-Cluster'}</span>
          </motion.button>
        </div>
      </div>

      {/* Add Keyword Modal / Form Dropdown */}
      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddSubmit}
            className="overflow-hidden bg-white rounded-2xl border border-indigo-200 p-4 shadow-md shadow-indigo-500/5"
          >
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Enter seed keyword (e.g., 'claude sonnet ai search ranking pipeline')"
                value={newKeywordInput}
                onChange={(e) => setNewKeywordInput(e.target.value)}
                className="flex-1 w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                autoFocus
              />
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-xs"
                >
                  Embed & Cluster
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Cluster Matrix Table Card */}
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-indigo-500/5 overflow-hidden">
        
        {/* Table Header Banner */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              SERP Intelligence & Vector Cluster Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pinecone semantic clusters paired with Claude 3.5 Sonnet priority scoring and real-time competitor delta
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">
              Showing <strong className="text-slate-800">{filteredKeywords.length}</strong> keywords
            </span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Keyword & Cluster</th>
                <th className="py-3.5 px-3 font-semibold">Intent</th>
                <th className="py-3.5 px-3 font-semibold text-right">Vol / Mo</th>
                <th className="py-3.5 px-3 font-semibold text-right">CPC ($)</th>
                <th className="py-3.5 px-4 font-semibold">Difficulty (KD)</th>
                <th className="py-3.5 px-4 font-semibold text-center">Claude Priority</th>
                <th className="py-3.5 px-4 font-semibold text-right">SERP Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKeywords.map((item, index) => {
                const isTopPriority = item.claudePriority >= 95;
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className="hover:bg-indigo-50/40 transition-colors group"
                  >
                    {/* Keyword + Cluster */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.keyword}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                        <Layers className="w-3 h-3 text-slate-400" />
                        <span>{item.cluster}</span>
                        <span>·</span>
                        <span className="text-slate-400">vs {item.serpCompetitor}</span>
                      </div>
                    </td>

                    {/* Search Intent */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getIntentBadge(item.intent)}`}>
                        {item.intent}
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-800">
                      {item.volume.toLocaleString()}
                    </td>

                    {/* CPC */}
                    <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-600">
                      ${item.cpc.toFixed(2)}
                    </td>

                    {/* Difficulty */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.difficulty > 70
                                ? 'bg-rose-500'
                                : item.difficulty > 50
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${item.difficulty}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums text-slate-700 font-medium">
                          {item.difficulty}%
                        </span>
                      </div>
                    </td>

                    {/* Claude Priority */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-indigo-200 group-hover:bg-white shadow-2xs font-mono font-bold">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span className={isTopPriority ? 'text-indigo-600' : 'text-slate-700'}>
                          {item.claudePriority}
                        </span>
                      </div>
                    </td>

                    {/* SERP Rank & Delta */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-mono">
                        <span className="font-extrabold text-sm text-slate-900">
                          #{item.serpPosition}
                        </span>
                        {item.serpChange > 0 ? (
                          <span className="flex items-center text-[11px] font-semibold text-emerald-600">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            +{item.serpChange}
                          </span>
                        ) : item.serpChange < 0 ? (
                          <span className="flex items-center text-[11px] font-semibold text-rose-600">
                            <ArrowDownRight className="w-3.5 h-3.5" />
                            {item.serpChange}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">0</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
