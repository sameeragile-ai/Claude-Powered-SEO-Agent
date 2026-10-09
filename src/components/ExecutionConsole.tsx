import React, { useState, useRef, useEffect } from 'react';
import { ExecutionLog } from '../types/seo';
import { Terminal, ChevronUp, ChevronDown, Play, Pause, Trash2, Copy, Check, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExecutionConsoleProps {
  logs: ExecutionLog[];
  onClearLogs: () => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

export const ExecutionConsole: React.FC<ExecutionConsoleProps> = ({
  logs,
  onClearLogs,
  isStreaming,
  onToggleStreaming
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [filterAgent, setFilterAgent] = useState<string>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isExpanded]);

  const filteredLogs = logs.filter((log) => {
    if (filterAgent === 'all') return true;
    return log.agent === filterAgent;
  });

  const handleCopyLogs = () => {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.agent.toUpperCase()}] ${l.message} ${l.details ? '|| ' + l.details : ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAgentBadgeColor = (agent: string) => {
    switch (agent) {
      case 'claude':
        return 'text-purple-400 bg-purple-950/60 border-purple-800';
      case 'pinecone':
        return 'text-blue-400 bg-blue-950/60 border-blue-800';
      case 'keyword':
        return 'text-indigo-400 bg-indigo-950/60 border-indigo-800';
      case 'content':
        return 'text-pink-400 bg-pink-950/60 border-pink-800';
      case 'backlink':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden border border-slate-800 bg-[#0B0F19] text-slate-200 shadow-2xl font-mono text-xs">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111726] border-b border-slate-800/80">
        
        {/* Left: Window controls & title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300 tracking-tight text-[11px]">
              LangChain & Claude 3.5 Sonnet Event Stream
            </span>
            <span className="text-[10px] text-slate-500">
              ({filteredLogs.length} events)
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          
          {/* Agent Filter selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-[10px]">
            <Filter className="w-3 h-3 text-slate-500" />
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">All Agents</option>
              <option value="orchestrator">Orchestrator</option>
              <option value="keyword">Keyword Agent</option>
              <option value="content">Content Loop</option>
              <option value="backlink">Backlink Engine</option>
              <option value="claude">Anthropic Claude</option>
              <option value="pinecone">Pinecone Vector</option>
            </select>
          </div>

          {/* Pause / Resume Live Stream */}
          <button
            onClick={onToggleStreaming}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isStreaming ? 'Pause Stream' : 'Resume Stream'}
          >
            {isStreaming ? (
              <Pause className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Play className="w-3.5 h-3.5 text-emerald-400" />
            )}
          </button>

          {/* Copy Logs */}
          <button
            onClick={handleCopyLogs}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy Terminal Logs"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Clear Logs */}
          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Clear Logs"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400 hover:text-rose-400" />
          </button>

          {/* Expand / Minimize Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isExpanded ? 'Collapse Terminal' : 'Expand Terminal'}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>

        </div>

      </div>

      {/* Terminal Body */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 220, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            ref={scrollRef}
            className="overflow-y-auto p-4 space-y-2 bg-[#0B0F19] divide-y divide-slate-900/60 font-mono text-[11px] leading-relaxed select-text"
          >
            {filteredLogs.length === 0 ? (
              <div className="text-slate-600 italic py-4 text-center">
                Terminal buffer empty. Run Full Loop Cycle to trigger live agent event streams.
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="pt-2 first:pt-0 flex items-start gap-2.5">
                  <span className="text-slate-600 shrink-0 font-mono select-none">
                    {log.timestamp}
                  </span>

                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider shrink-0 border ${getAgentBadgeColor(log.agent)}`}>
                    {log.agent}
                  </span>

                  <div className="flex-1">
                    <span
                      className={
                        log.level === 'success'
                          ? 'text-emerald-300 font-semibold'
                          : log.level === 'warning'
                          ? 'text-amber-300'
                          : log.level === 'tool_call'
                          ? 'text-indigo-300'
                          : 'text-slate-300'
                      }
                    >
                      {log.message}
                    </span>
                    {log.details && (
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        ↳ {log.details}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
