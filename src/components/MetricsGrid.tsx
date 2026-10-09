import React from 'react';
import { TrendingUp, Target, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricsGridProps {
  contentScore: number;
  toxicNeutralizedCount: number;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  contentScore,
  toxicNeutralizedCount
}) => {
  const metrics = [
    {
      id: 'traffic',
      title: 'Organic Traffic',
      value: '+184.2%',
      subtext: '342,800 monthly visits (vs 120,600 baseline)',
      change: '+22.4% this week',
      icon: TrendingUp,
      accent: 'from-indigo-500/10 to-indigo-500/0',
      iconColor: 'text-indigo-600',
      borderColor: 'group-hover:border-indigo-300',
      sparkline: [24, 32, 45, 52, 68, 85, 110, 145, 184]
    },
    {
      id: 'terms',
      title: 'High-Intent Terms',
      value: '1,420',
      subtext: 'Commercial & Transactional keywords in Top 3',
      change: '+118 new clusters',
      icon: Target,
      accent: 'from-purple-500/10 to-purple-500/0',
      iconColor: 'text-purple-600',
      borderColor: 'group-hover:border-purple-300',
      sparkline: [35, 42, 50, 68, 80, 92, 115, 130, 142]
    },
    {
      id: 'score',
      title: 'Claude Content Score',
      value: `${contentScore.toFixed(1)}/100`,
      subtext: 'AEO answer engine depth & EEAT verification',
      change: contentScore >= 95 ? 'Elite Tier (Claude Refined)' : 'Active Optimization',
      icon: Award,
      accent: 'from-rose-500/10 to-rose-500/0',
      iconColor: 'text-rose-600',
      borderColor: 'group-hover:border-rose-300',
      sparkline: [75, 78, 80, 82, 85, 88, 92, 94, Math.round(contentScore)]
    },
    {
      id: 'toxic',
      title: 'Toxic Backlinks Neutralized',
      value: `${toxicNeutralizedCount}`,
      subtext: 'Auto-disavowed in Google Search Console file',
      change: '100% spam defense',
      icon: ShieldCheck,
      accent: 'from-emerald-500/10 to-emerald-500/0',
      iconColor: 'text-emerald-600',
      borderColor: 'group-hover:border-emerald-300',
      sparkline: [12, 18, 22, 28, 32, 35, 38, 40, toxicNeutralizedCount]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200/80 p-5 shadow-xl shadow-indigo-500/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/10 ${item.borderColor}`}
          >
            {/* Top gradient glow overlay */}
            <div
              className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${item.accent} pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
            />

            <div className="relative z-10 flex items-start justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-xs ${item.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10 flex items-baseline justify-between mb-2">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono tabular-nums">
                {item.value}
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 font-mono">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {item.change}
              </span>
            </div>

            <p className="relative z-10 text-xs text-slate-500 line-clamp-1 mb-3">
              {item.subtext}
            </p>

            {/* Sparkline Visual */}
            <div className="relative z-10 h-7 w-full flex items-end gap-1.5 pt-2 border-t border-slate-100">
              {item.sparkline.map((val, i) => {
                const max = Math.max(...item.sparkline);
                const heightPercent = Math.max(15, Math.round((val / max) * 100));
                return (
                  <div
                    key={i}
                    className="flex-1 bg-slate-100 group-hover:bg-indigo-100 rounded-xs transition-colors overflow-hidden"
                    style={{ height: '100%' }}
                  >
                    <div
                      className={`w-full rounded-xs transition-all duration-500 ${
                        i === item.sparkline.length - 1
                          ? 'bg-gradient-to-t from-indigo-600 to-purple-600'
                          : 'bg-indigo-400/60'
                      }`}
                      style={{ height: `${heightPercent}%`, marginTop: `${100 - heightPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
