export type SearchIntent = 'commercial' | 'informational' | 'transactional' | 'navigational';

export interface KeywordItem {
  id: string;
  keyword: string;
  cluster: string;
  volume: number;
  difficulty: number; // 0 - 100
  intent: SearchIntent;
  cpc: number;
  claudePriority: number; // 0 - 100
  serpPosition: number;
  serpChange: number; // e.g. +3, -1
  serpCompetitor: string;
}

export interface ContentDraft {
  id: string;
  title: string;
  slug: string;
  targetKeyword: string;
  targetIntent: SearchIntent;
  readabilityScore: number;
  keywordDensity: number; // percentage, e.g. 1.8
  toneScore: number;
  semanticCoverage: number;
  totalScore: number;
  status: 'draft' | 'refining' | 'published';
  metaTitle: string;
  metaDescription: string;
  outline: string[];
  v1Draft: string;
  v2Draft: string;
  bridgedLinks: {
    anchor: string;
    domain: string;
    da: number;
    url: string;
  }[];
  schemaType: string;
}

export interface BacklinkItem {
  id: string;
  domain: string;
  sourceUrl: string;
  targetUrl: string;
  domainAuthority: number;
  spamScore: number; // 0 - 100
  anchorText: string;
  detectedDate: string;
  status: 'toxic_flagged' | 'disavowed' | 'whitelisted';
}

export interface OutreachLead {
  id: string;
  domain: string;
  da: number;
  relevancyScore: number; // 0 - 100
  contactEmail: string;
  suggestedAnchor: string;
  targetArticleTopic: string;
  bridged: boolean;
}

export interface PipelineStep {
  id: 'keyword' | 'bridge1' | 'content' | 'bridge2' | 'backlink';
  name: string;
  agentTitle: string;
  status: 'idle' | 'active' | 'success' | 'syncing';
  description: string;
  lastRun: string;
  metrics: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  agent: 'orchestrator' | 'keyword' | 'content' | 'backlink' | 'pinecone' | 'claude';
  level: 'info' | 'success' | 'warning' | 'tool_call';
  message: string;
  details?: string;
}
