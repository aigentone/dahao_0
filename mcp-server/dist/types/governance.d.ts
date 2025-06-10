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
