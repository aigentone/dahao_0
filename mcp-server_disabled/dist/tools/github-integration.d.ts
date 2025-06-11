import { GovernanceProposal } from '../types/governance.js';
export declare class GitHubIntegration {
    private octokit;
    private owner;
    private repo;
    constructor(token: string, owner: string, repo: string);
    createProposalIssue(proposal: GovernanceProposal): Promise<number>;
    updateProposalStatus(issueNumber: number, status: string): Promise<void>;
    getProposalDiscussion(issueNumber: number): Promise<any[]>;
    getActiveProposals(): Promise<any[]>;
    private formatProposalAsIssue;
    private formatEthicsCompatibility;
    private formatCrossDomainImpact;
}
