import { KeywordItem, ContentDraft, BacklinkItem, OutreachLead, ExecutionLog } from '../types/seo';

export const INITIAL_KEYWORDS: KeywordItem[] = [
  {
    id: 'kw-1',
    keyword: 'autonomous seo agent architecture',
    cluster: 'Multi-Agent Frameworks',
    volume: 8400,
    difficulty: 64,
    intent: 'commercial',
    cpc: 14.2,
    claudePriority: 98,
    serpPosition: 4,
    serpChange: 3,
    serpCompetitor: 'searchengineland.com'
  },
  {
    id: 'kw-2',
    keyword: 'claude 3.5 sonnet programmatic seo loop',
    cluster: 'LLM Content Workflows',
    volume: 12200,
    difficulty: 58,
    intent: 'transactional',
    cpc: 18.5,
    claudePriority: 96,
    serpPosition: 2,
    serpChange: 4,
    serpCompetitor: 'ahrefs.com/blog'
  },
  {
    id: 'kw-3',
    keyword: 'vector search cluster ranking google core update',
    cluster: 'SERP Intelligence',
    volume: 5900,
    difficulty: 72,
    intent: 'informational',
    cpc: 8.7,
    claudePriority: 92,
    serpPosition: 7,
    serpChange: -1,
    serpCompetitor: 'moz.com/research'
  },
  {
    id: 'kw-4',
    keyword: 'automated backlink disavow crawler tool',
    cluster: 'Off-Page Authority',
    volume: 4300,
    difficulty: 49,
    intent: 'transactional',
    cpc: 11.8,
    claudePriority: 89,
    serpPosition: 3,
    serpChange: 2,
    serpCompetitor: 'semrush.com/backlinks'
  },
  {
    id: 'kw-5',
    keyword: 'langchain pinecone semantic seo indexing',
    cluster: 'Multi-Agent Frameworks',
    volume: 6800,
    difficulty: 61,
    intent: 'commercial',
    cpc: 13.4,
    claudePriority: 91,
    serpPosition: 6,
    serpChange: 1,
    serpCompetitor: 'pinecone.io/learn'
  },
  {
    id: 'kw-6',
    keyword: 'answer engine optimization aeo vs traditional serp',
    cluster: 'SERP Intelligence',
    volume: 9100,
    difficulty: 55,
    intent: 'informational',
    cpc: 9.3,
    claudePriority: 94,
    serpPosition: 5,
    serpChange: 3,
    serpCompetitor: 'hubspot.com/marketing'
  },
  {
    id: 'kw-7',
    keyword: 'enterprise internal link graph graphrag',
    cluster: 'Off-Page Authority',
    volume: 3800,
    difficulty: 68,
    intent: 'commercial',
    cpc: 16.0,
    claudePriority: 88,
    serpPosition: 9,
    serpChange: 0,
    serpCompetitor: 'neo4j.com/graphrag'
  }
];

export const INITIAL_CONTENT_DRAFT: ContentDraft = {
  id: 'doc-101',
  title: 'Architecting an Autonomous Multi-Agent SEO Engine with Claude 3.5 Sonnet',
  slug: 'autonomous-multi-agent-seo-engine-claude',
  targetKeyword: 'autonomous seo agent architecture',
  targetIntent: 'commercial',
  readabilityScore: 82,
  keywordDensity: 1.2,
  toneScore: 84,
  semanticCoverage: 79,
  totalScore: 82,
  status: 'draft',
  metaTitle: 'Autonomous Multi-Agent SEO Engine with Claude | Architecture Guide',
  metaDescription: 'Discover how to architect autonomous Claude 3.5 Sonnet SEO agents for SERP clustering, programmatic content loops, and contextual backlink routing.',
  outline: [
    '1. The Shift from Static Keyword Research to Agentic SERP Clustering',
    '2. Vector-Grounded Content Generation Loops & Flesch-Kincaid Tuning',
    '3. Autonomous Signal Bridging: Feeding Backlink Context into Prompts',
    '4. Automated Google Disavow Pipelines & Toxic Link Neutralization',
    '5. Enterprise Benchmarks: 184% Organic Inbound Traffic Expansion'
  ],
  v1Draft: `In modern digital marketing, search engine optimization is very important. Many companies use traditional tools to find keywords and write articles manually. However, this takes a lot of time and can be prone to human errors.

Using artificial intelligence can help automate parts of the workflow. Models like Claude can write blog posts and generate meta descriptions. When you combine keyword lists with writing tools, you can create more content faster. Backlinks are also essential for ranking, so keeping track of incoming links prevents penalties from search engine algorithms. By organizing these steps together, companies can improve their Google rankings over time.`,
  v2Draft: `Modern organic search has evolved beyond static keyword insertion into algorithmic Answer Engine Optimization (AEO) and entity-graph authority. Leading B2B software enterprises utilize multi-agent cognitive architectures where dedicated agents handle distinct phases of search domination.

By deploying Claude 3.5 Sonnet within an orchestrated feedback loop, the Keyword Agent streams high-intent SERP clusters directly into the Content Generation Engine. Concurrently, the Backlink Crawler identifies domain authority gaps and injects high-equity anchor bridges directly into generated schema markups. 

Empirical benchmarks demonstrate a +184.2% expansion in top-3 ranking terms within 90 days, eliminating manual copywriting latency while preserving strict EEAT editorial standards and 100% human-level readability.`,
  bridgedLinks: [
    {
      anchor: 'enterprise internal link graph graphrag',
      domain: 'searchengineland.com',
      da: 91,
      url: 'https://searchengineland.com/enterprise-seo-graphs'
    }
  ],
  schemaType: 'TechArticle'
};

export const INITIAL_BACKLINKS: BacklinkItem[] = [
  {
    id: 'bl-1',
    domain: 'pbn-blast-network-39.biz',
    sourceUrl: 'https://pbn-blast-network-39.biz/directory/seo-best-tools',
    targetUrl: 'https://mysaas.io/features/agents',
    domainAuthority: 12,
    spamScore: 84,
    anchorText: 'cheap backlinks automated tools 2026',
    detectedDate: '2 hours ago',
    status: 'toxic_flagged'
  },
  {
    id: 'bl-2',
    domain: 'crypto-casino-bonus-links.cc',
    sourceUrl: 'https://crypto-casino-bonus-links.cc/affiliates/portal',
    targetUrl: 'https://mysaas.io/pricing',
    domainAuthority: 18,
    spamScore: 92,
    anchorText: 'click here for bonus credits',
    detectedDate: '5 hours ago',
    status: 'toxic_flagged'
  },
  {
    id: 'bl-3',
    domain: 'scraped-content-aggregator.ru',
    sourceUrl: 'https://scraped-content-aggregator.ru/article/74921',
    targetUrl: 'https://mysaas.io/blog/autonomous-seo',
    domainAuthority: 14,
    spamScore: 78,
    anchorText: 'read more mirror link',
    detectedDate: '1 day ago',
    status: 'disavowed'
  },
  {
    id: 'bl-4',
    domain: 'domain-redirect-farm.info',
    sourceUrl: 'https://domain-redirect-farm.info/redirect/tracker-44',
    targetUrl: 'https://mysaas.io/',
    domainAuthority: 9,
    spamScore: 95,
    anchorText: 'sponsored anchor index',
    detectedDate: '2 days ago',
    status: 'disavowed'
  }
];

export const INITIAL_OUTREACH_LEADS: OutreachLead[] = [
  {
    id: 'lead-1',
    domain: 'searchengineland.com',
    da: 91,
    relevancyScore: 97,
    contactEmail: 'editorial@searchengineland.com',
    suggestedAnchor: 'autonomous multi-agent seo engine',
    targetArticleTopic: 'AI Agents Shaping Search Marketing in 2026',
    bridged: true
  },
  {
    id: 'lead-2',
    domain: 'venturebeat.com',
    da: 92,
    relevancyScore: 94,
    contactEmail: 'tech-pitches@venturebeat.com',
    suggestedAnchor: 'Claude 3.5 Sonnet content feedback loop',
    targetArticleTopic: 'Enterprise GenAI Architecture Case Studies',
    bridged: false
  },
  {
    id: 'lead-3',
    domain: 'ahrefs.com/blog',
    da: 90,
    relevancyScore: 91,
    contactEmail: 'contributors@ahrefs.com',
    suggestedAnchor: 'SERP re-cluster vector embeddings',
    targetArticleTopic: 'Next-Gen Semantic Keyword Clustering',
    bridged: false
  },
  {
    id: 'lead-4',
    domain: 'saasmetrics.io',
    da: 76,
    relevancyScore: 88,
    contactEmail: 'editor@saasmetrics.io',
    suggestedAnchor: 'automated organic growth loop',
    targetArticleTopic: 'How SaaS Unicorns Scale Inbound CAC to Zero',
    bridged: false
  }
];

export const INITIAL_LOGS: ExecutionLog[] = [
  {
    id: 'log-1',
    timestamp: '16:34:02.140',
    agent: 'orchestrator',
    level: 'info',
    message: 'Autonomous Autopilot daemon initiated [Cycle #4812]. Evaluating node invariants.',
  },
  {
    id: 'log-2',
    timestamp: '16:34:02.820',
    agent: 'keyword',
    level: 'tool_call',
    message: 'Executing tool: serp_cluster_query(domain="mysaas.io", geo="US", device="desktop")',
    details: 'Fetched 148 competitor ranking vectors across Google SERP index.'
  },
  {
    id: 'log-3',
    timestamp: '16:34:03.410',
    agent: 'pinecone',
    level: 'info',
    message: 'Pinecone vector query: namespace="seo-clusters-v2", top_k=25, similarity_metric="cosine"',
    details: 'Returned 7 semantic clusters with cosine similarity threshold > 0.88.'
  },
  {
    id: 'log-4',
    timestamp: '16:34:04.105',
    agent: 'claude',
    level: 'tool_call',
    message: 'Anthropic Claude 3.5 Sonnet prompt invocation: evaluate_content_quality()',
    details: 'Tokens: Prompt=3,840 | Completion=892 | Latency=410ms | Temperature=0.2'
  },
  {
    id: 'log-5',
    timestamp: '16:34:05.020',
    agent: 'content',
    level: 'success',
    message: 'Self-Refinement pass completed: Quality score upgraded to 96/100.',
    details: 'Flesch-Kincaid: Grade 8.2 | AEO Direct Answer density: Optimal'
  },
  {
    id: 'log-6',
    timestamp: '16:34:05.780',
    agent: 'backlink',
    level: 'warning',
    message: 'Backlink crawler detected 2 spam domains exceeding Moz Spam threshold (>75%).',
    details: 'Automatically queued for Google Disavow export batch.'
  }
];
