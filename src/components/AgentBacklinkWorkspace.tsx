import React, { useState } from 'react';
import { BacklinkItem, OutreachLead } from '../types/seo';
import { ShieldAlert, ShieldCheck, Link2, ExternalLink, ArrowRight, Check, Send, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentBacklinkWorkspaceProps {
  backlinks: BacklinkItem[];
  outreachLeads: OutreachLead[];
  onDisavowLink: (id: string) => void;
  onBridgeLead: (id: string) => void;
}

export const AgentBacklinkWorkspace: React.FC<AgentBacklinkWorkspaceProps> = ({
  backlinks,
  outreachLeads,
  onDisavowLink,
  onBridgeLead
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'toxic' | 'outreach'>('toxic');

  const toxicCount = backlinks.filter((b) => b.status === 'toxic_flagged').length;
  const disavowedCount = backlinks.filter((b) => b.status === 'disavowed').length;

  return (
    <div className="space-y-6">
      
      {/* Sub-Navigation & Metrics Bar */}
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 p-5 shadow-xl shadow-indigo-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start">
          <button
            onClick={() => setActiveSubTab('toxic')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeSubTab === 'toxic'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>Toxic Link Disavow Queue</span>
            {toxicCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-700 font-bold font-mono">
                {toxicCount} Pending
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('outreach')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeSubTab === 'outreach'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>High-DA Outreach Leads & Bridge</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700 font-bold font-mono">
              {outreachLeads.length} Leads
            </span>
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Ahrefs API Live</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>Google Disavow Sync Active</span>
          </div>
        </div>

      </div>

      {/* Main Content Pane */}
      {activeSubTab === 'toxic' ? (
        
        /* TOXIC LINK DISAVOW QUEUE */
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-indigo-500/5 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Toxic Link Monitor & Automated Disavow File</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-normal">
                  Moz Spam Score &gt; 70%
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Neutralize malicious PBN links and scraped redirects before algorithmic Google penalties occur
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {disavowedCount} Disavowed in Current Cycle
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Flagged Domain & Source</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Spam Score</th>
                  <th className="py-3.5 px-3 font-semibold">Anchor Text</th>
                  <th className="py-3.5 px-3 font-semibold">Target URL</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {backlinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 font-mono">
                        {link.domain}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {link.sourceUrl}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                        link.spamScore > 80
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                        {link.spamScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-slate-700 italic font-medium">
                        &quot;{link.anchorText}&quot;
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500 truncate max-w-xs">
                      {link.targetUrl}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {link.status === 'disavowed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Disavowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          <ShieldAlert className="w-3 h-3" />
                          Toxic Flagged
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {link.status === 'toxic_flagged' ? (
                        <button
                          onClick={() => onDisavowLink(link.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs"
                        >
                          Disavow
                        </button>
                      ) : (
                        <span className="text-xs font-mono text-emerald-600 font-medium">
                          Protected
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      ) : (

        /* HIGH-DA OUTREACH LEADS WITH SIGNAL BRIDGE */
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-xl shadow-indigo-500/5 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>High-DA Editorial Outreach Opportunities</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono font-medium">
                  DA 75+ Domain Authority
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                One-click bridge transfers verified anchor text and target citation directly into Agent #02 Content Prompt
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Publication Domain</th>
                  <th className="py-3.5 px-3 font-semibold text-center">DA Score</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Relevancy</th>
                  <th className="py-3.5 px-3 font-semibold">Suggested Anchor</th>
                  <th className="py-3.5 px-3 font-semibold">Target Topic</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Signal Bridge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {outreachLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 font-mono">
                        {lead.domain}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lead.contactEmail}
                      </div>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="font-mono font-extrabold text-sm text-indigo-700">
                        {lead.da}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono font-semibold text-emerald-600">
                      {lead.relevancyScore}%
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-[11px]">
                        &quot;{lead.suggestedAnchor}&quot;
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-700">
                      {lead.targetArticleTopic}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {lead.bridged ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-xs border border-emerald-200">
                          <Check className="w-3.5 h-3.5" />
                          Bridged to Agent 2
                        </span>
                      ) : (
                        <button
                          onClick={() => onBridgeLead(lead.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs shadow-xs transition-all"
                        >
                          <Send className="w-3 h-3" />
                          <span>Bridge Signal</span>
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      )}

    </div>
  );
};
