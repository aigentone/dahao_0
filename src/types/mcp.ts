// MCP Types for DAHAO Governance Platform
// These types mirror the MCP server's TypeScript interfaces

export interface EthicsFramework {
  version: string;
  domain: string;
  principles: EthicsPrinciple[];
  lastUpdated: string;
  compatibility: string[];
}

export interface EthicsPrinciple {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  examples: string[];
}

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  type: 'ethics_evolution' | 'policy_change' | 'resource_allocation' | 'structural_change';
  domain: string;
  status: 'draft' | 'discussion' | 'voting' | 'approved' | 'rejected' | 'implemented';
  createdAt: string;
  author: string;
  githubIssueNumber?: number;
  ethicsCompatibility?: EthicsCompatibilityResult;
  crossDomainImpact?: CrossDomainAnalysis;
}

export interface EthicsCompatibilityResult {
  compatible: boolean;
  conflicts: string[];
  recommendations: string[];
  requiredUpdates: string[];
}

export interface CrossDomainAnalysis {
  affectedDomains: string[];
  impacts: DomainImpact[];
  synergies: string[];
  risks: string[];
}

export interface DomainImpact {
  domain: string;
  impactLevel: 'low' | 'medium' | 'high';
  description: string;
  mitigations: string[];
}

export interface RepoStatus {
  currentBranch: string;
  activeProposals: number;
  ethicsVersions: Record<string, string>;
  lastActivity: string;
  collaborationMetrics: {
    contributors: number;
    proposalsThisMonth: number;
    implementationRate: number;
  };
}

// GitHub Discussion interfaces
export interface GitHubComment {
  author: string;
  body: string;
  createdAt: string;
  reactions: any;
}

export interface GitHubProposal {
  number: number;
  title: string;
  body: string;
  labels: string[];
  createdAt: string;
  author: string;
  comments: number;
}

// MCP Tool Request/Response types
export interface CreateProposalRequest {
  title: string;
  description: string;
  type: GovernanceProposal['type'];
  domain: string;
  author: string;
}

export interface ValidateEthicsRequest {
  proposal: Partial<GovernanceProposal>;
}

export interface AnalyzeCrossDomainRequest {
  proposal: Partial<GovernanceProposal>;
}

export interface UpdateProposalStatusRequest {
  status: string;
}

// Frontend-specific types
export interface ProposalFormData {
  title: string;
  description: string;
  type: GovernanceProposal['type'];
  domain: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: {
    proposal?: GovernanceProposal;
    ethicsAnalysis?: EthicsCompatibilityResult;
    crossDomainAnalysis?: CrossDomainAnalysis;
  };
}

// Domain configuration
export const GOVERNANCE_DOMAINS = [
  'animal-welfare',
  'music-industry',
  'environment',
  'human-rights',
  'technology-ethics',
  'economic-policy'
] as const;

export const PROPOSAL_TYPES = [
  'ethics_evolution',
  'policy_change',
  'resource_allocation',
  'structural_change'
] as const;

export const PROPOSAL_STATUSES = [
  'draft',
  'discussion',
  'voting',
  'approved',
  'rejected',
  'implemented'
] as const;

export type GovernanceDomain = typeof GOVERNANCE_DOMAINS[number];
export type ProposalType = typeof PROPOSAL_TYPES[number];
export type ProposalStatus = typeof PROPOSAL_STATUSES[number];