import { CrossDomainAnalysis, GovernanceProposal } from '../types/governance.js';
export declare class CrossDomainAnalyzer {
    private domains;
    private domainKeywords;
    private domainInteractions;
    analyzeCrossDomainImpact(proposal: GovernanceProposal): Promise<CrossDomainAnalysis>;
    private identifyAffectedDomains;
    private hasHighImpactKeywords;
    private calculateDomainImpacts;
    private generateImpactDescription;
    private suggestMitigations;
    private identifySynergies;
    private identifyRisks;
}
