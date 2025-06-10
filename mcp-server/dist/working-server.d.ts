#!/usr/bin/env node
/**
 * DAHAO MCP Server - Working Implementation
 * This server provides the governance tools for the DAHAO platform
 */
import { GovernanceProposal } from './types/governance.js';
declare class DAHAOServer {
    private githubIntegration;
    private ethicsValidator;
    private crossDomainAnalyzer;
    constructor();
    createProposal(title: string, description: string, type: string, domain: string, author: string): Promise<GovernanceProposal>;
    getActiveProposals(): Promise<any[]>;
    getProposalDiscussion(issueNumber: number): Promise<any[]>;
    updateProposalStatus(issueNumber: number, status: string): Promise<{
        success: boolean;
        message: string;
    }>;
    validateEthicsCompatibility(proposal: Partial<GovernanceProposal>): Promise<import("./types/governance.js").EthicsCompatibilityResult>;
    analyzeCrossDomainImpact(proposal: Partial<GovernanceProposal>): Promise<import("./types/governance.js").CrossDomainAnalysis>;
    getCurrentEthics(): Promise<{
        frameworks: Record<string, import("./types/governance.js").EthicsFramework>;
        versions: Record<string, string>;
    }>;
    getRepoStatus(): Promise<{
        currentBranch: string;
        activeProposals: number;
        ethicsVersions: Record<string, string>;
        lastActivity: string;
        collaborationMetrics: {
            contributors: number;
            proposalsThisMonth: number;
            implementationRate: number;
        };
    }>;
}
export { DAHAOServer };
