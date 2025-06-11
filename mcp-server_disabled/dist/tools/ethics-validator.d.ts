import { EthicsFramework, EthicsCompatibilityResult, GovernanceProposal } from '../types/governance.js';
export declare class EthicsValidator {
    private ethicsPath;
    constructor(repoPath: string);
    getCurrentEthics(): Promise<Record<string, EthicsFramework>>;
    validateProposal(proposal: GovernanceProposal): Promise<EthicsCompatibilityResult>;
    private analyzeProposalAgainstFramework;
    private checkPrincipleCompliance;
    getEthicsVersions(): Promise<Record<string, string>>;
}
