import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';
import * as path from 'path';
export class EthicsValidator {
    ethicsPath;
    constructor(repoPath) {
        this.ethicsPath = path.join(repoPath, 'ethics');
    }
    async getCurrentEthics() {
        const ethics = {};
        try {
            // Load core ethics
            const coreEthicsPath = path.join(this.ethicsPath, 'core-ethics');
            const coreVersions = await fs.readdir(coreEthicsPath);
            const latestCoreVersion = coreVersions.sort().pop();
            if (latestCoreVersion) {
                const coreFiles = await fs.readdir(path.join(coreEthicsPath, latestCoreVersion));
                for (const file of coreFiles.filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))) {
                    const content = await fs.readFile(path.join(coreEthicsPath, latestCoreVersion, file), 'utf-8');
                    const ethicsData = yaml.load(content);
                    ethics[`core-${path.parse(file).name}`] = ethicsData;
                }
            }
            // Load domain-specific ethics
            const domainEthicsPath = path.join(this.ethicsPath, 'domain-ethics');
            const domains = await fs.readdir(domainEthicsPath);
            for (const domain of domains) {
                const domainPath = path.join(domainEthicsPath, domain);
                const versions = await fs.readdir(domainPath);
                const latestVersion = versions.sort().pop();
                if (latestVersion) {
                    const domainFiles = await fs.readdir(path.join(domainPath, latestVersion));
                    for (const file of domainFiles.filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))) {
                        const content = await fs.readFile(path.join(domainPath, latestVersion, file), 'utf-8');
                        const ethicsData = yaml.load(content);
                        ethics[`${domain}-${path.parse(file).name}`] = ethicsData;
                    }
                }
            }
        }
        catch (error) {
            console.error('Error loading ethics frameworks:', error);
        }
        return ethics;
    }
    async validateProposal(proposal) {
        const currentEthics = await this.getCurrentEthics();
        const conflicts = [];
        const recommendations = [];
        const requiredUpdates = [];
        // Get relevant ethics frameworks for the proposal domain
        const relevantEthics = Object.entries(currentEthics).filter(([key, _]) => key.includes('core-') || key.includes(`${proposal.domain}-`));
        for (const [frameworkKey, framework] of relevantEthics) {
            const analysis = this.analyzeProposalAgainstFramework(proposal, framework);
            conflicts.push(...analysis.conflicts);
            recommendations.push(...analysis.recommendations);
            requiredUpdates.push(...analysis.requiredUpdates);
        }
        return {
            compatible: conflicts.length === 0,
            conflicts: [...new Set(conflicts)],
            recommendations: [...new Set(recommendations)],
            requiredUpdates: [...new Set(requiredUpdates)]
        };
    }
    analyzeProposalAgainstFramework(proposal, framework) {
        const conflicts = [];
        const recommendations = [];
        const requiredUpdates = [];
        // Check each principle against the proposal
        for (const principle of framework.principles) {
            const analysis = this.checkPrincipleCompliance(proposal, principle);
            if (!analysis.compliant) {
                conflicts.push(`Conflicts with ${framework.domain} principle: ${principle.title}`);
            }
            recommendations.push(...analysis.recommendations);
            if (analysis.requiresUpdate) {
                requiredUpdates.push(`Update required for ${principle.title} in ${framework.domain}`);
            }
        }
        return { compatible: conflicts.length === 0, conflicts, recommendations, requiredUpdates };
    }
    checkPrincipleCompliance(proposal, principle) {
        const recommendations = [];
        let compliant = true;
        let requiresUpdate = false;
        // Basic keyword analysis for demonstration
        const proposalText = `${proposal.title} ${proposal.description}`.toLowerCase();
        // Check for common ethical concerns
        if (principle.id === 'harm-prevention') {
            const harmKeywords = ['harm', 'damage', 'hurt', 'negative impact'];
            if (harmKeywords.some(keyword => proposalText.includes(keyword))) {
                recommendations.push('Consider harm mitigation strategies');
                if (!proposalText.includes('mitigation') && !proposalText.includes('prevention')) {
                    compliant = false;
                }
            }
        }
        if (principle.id === 'transparency') {
            if (!proposalText.includes('transparent') && !proposalText.includes('public') && !proposalText.includes('open')) {
                recommendations.push('Consider adding transparency measures');
            }
        }
        if (principle.id === 'equality') {
            const inequalityKeywords = ['exclusive', 'restricted', 'limited access'];
            if (inequalityKeywords.some(keyword => proposalText.includes(keyword))) {
                recommendations.push('Ensure equal access and participation');
                if (!proposalText.includes('equal') && !proposalText.includes('fair')) {
                    compliant = false;
                }
            }
        }
        return { compliant, recommendations, requiresUpdate };
    }
    async getEthicsVersions() {
        const versions = {};
        try {
            // Core ethics versions
            const coreEthicsPath = path.join(this.ethicsPath, 'core-ethics');
            const coreVersions = await fs.readdir(coreEthicsPath);
            versions['core-ethics'] = coreVersions.sort().pop() || 'v1.0';
            // Domain ethics versions
            const domainEthicsPath = path.join(this.ethicsPath, 'domain-ethics');
            const domains = await fs.readdir(domainEthicsPath);
            for (const domain of domains) {
                const domainPath = path.join(domainEthicsPath, domain);
                const domainVersions = await fs.readdir(domainPath);
                versions[domain] = domainVersions.sort().pop() || 'v1.0';
            }
        }
        catch (error) {
            console.error('Error getting ethics versions:', error);
        }
        return versions;
    }
}
