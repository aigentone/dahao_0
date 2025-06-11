export class CrossDomainAnalyzer {
    domains = [
        'animal-welfare',
        'music-industry',
        'environment',
        'human-rights',
        'technology-ethics',
        'economic-policy'
    ];
    domainKeywords = {
        'animal-welfare': ['animal', 'wildlife', 'livestock', 'pet', 'zoo', 'farm', 'veterinary', 'species'],
        'music-industry': ['music', 'artist', 'song', 'album', 'streaming', 'copyright', 'royalty', 'performance'],
        'environment': ['climate', 'carbon', 'pollution', 'renewable', 'sustainability', 'ecosystem', 'biodiversity'],
        'human-rights': ['rights', 'freedom', 'equality', 'discrimination', 'access', 'justice', 'privacy'],
        'technology-ethics': ['ai', 'algorithm', 'data', 'privacy', 'automation', 'digital', 'artificial intelligence'],
        'economic-policy': ['economy', 'finance', 'budget', 'tax', 'investment', 'market', 'trade', 'employment']
    };
    domainInteractions = {
        'animal-welfare': {
            'environment': { type: 'synergy', strength: 'high' },
            'music-industry': { type: 'neutral', strength: 'low' },
            'human-rights': { type: 'synergy', strength: 'medium' },
            'technology-ethics': { type: 'risk', strength: 'medium' },
            'economic-policy': { type: 'tension', strength: 'high' }
        },
        'music-industry': {
            'technology-ethics': { type: 'tension', strength: 'high' },
            'human-rights': { type: 'synergy', strength: 'medium' },
            'economic-policy': { type: 'synergy', strength: 'high' },
            'environment': { type: 'neutral', strength: 'low' }
        },
        'environment': {
            'economic-policy': { type: 'tension', strength: 'high' },
            'technology-ethics': { type: 'synergy', strength: 'medium' },
            'human-rights': { type: 'synergy', strength: 'medium' }
        },
        'human-rights': {
            'technology-ethics': { type: 'tension', strength: 'high' },
            'economic-policy': { type: 'tension', strength: 'medium' }
        },
        'technology-ethics': {
            'economic-policy': { type: 'synergy', strength: 'medium' }
        }
    };
    async analyzeCrossDomainImpact(proposal) {
        const proposalText = `${proposal.title} ${proposal.description}`.toLowerCase();
        const affectedDomains = this.identifyAffectedDomains(proposalText);
        const impacts = this.calculateDomainImpacts(proposalText, affectedDomains);
        const synergies = this.identifySynergies(proposal.domain, affectedDomains);
        const risks = this.identifyRisks(proposal.domain, affectedDomains);
        return {
            affectedDomains,
            impacts,
            synergies,
            risks
        };
    }
    identifyAffectedDomains(proposalText) {
        const affected = [];
        for (const [domain, keywords] of Object.entries(this.domainKeywords)) {
            const matchCount = keywords.filter(keyword => proposalText.includes(keyword)).length;
            // Domain is affected if it has multiple keyword matches or specific high-impact keywords
            if (matchCount >= 2 || this.hasHighImpactKeywords(proposalText, domain)) {
                affected.push(domain);
            }
        }
        return affected;
    }
    hasHighImpactKeywords(proposalText, domain) {
        const highImpactKeywords = {
            'animal-welfare': ['animal rights', 'animal protection', 'animal testing'],
            'music-industry': ['copyright reform', 'streaming revenue', 'artist compensation'],
            'environment': ['climate change', 'carbon emissions', 'environmental protection'],
            'human-rights': ['human rights', 'civil liberties', 'equal access'],
            'technology-ethics': ['ai ethics', 'data privacy', 'algorithmic bias'],
            'economic-policy': ['economic reform', 'fiscal policy', 'market regulation']
        };
        const keywords = highImpactKeywords[domain] || [];
        return keywords.some(keyword => proposalText.includes(keyword));
    }
    calculateDomainImpacts(proposalText, affectedDomains) {
        return affectedDomains.map(domain => {
            const keywords = this.domainKeywords[domain] || [];
            const matchCount = keywords.filter(keyword => proposalText.includes(keyword)).length;
            const hasHighImpact = this.hasHighImpactKeywords(proposalText, domain);
            let impactLevel = 'low';
            if (hasHighImpact || matchCount >= 4) {
                impactLevel = 'high';
            }
            else if (matchCount >= 2) {
                impactLevel = 'medium';
            }
            return {
                domain,
                impactLevel,
                description: this.generateImpactDescription(domain, impactLevel, proposalText),
                mitigations: this.suggestMitigations(domain, impactLevel)
            };
        });
    }
    generateImpactDescription(domain, level, proposalText) {
        const descriptions = {
            'animal-welfare': {
                high: 'Significant changes to animal protection standards and welfare practices',
                medium: 'Moderate impact on animal welfare policies and regulations',
                low: 'Minor considerations for animal welfare in implementation'
            },
            'music-industry': {
                high: 'Major shifts in music industry economics and artist rights',
                medium: 'Noticeable effects on music creation and distribution',
                low: 'Indirect implications for music industry stakeholders'
            },
            'environment': {
                high: 'Substantial environmental implications requiring careful assessment',
                medium: 'Environmental factors need consideration in implementation',
                low: 'Minimal environmental impact expected'
            },
            'human-rights': {
                high: 'Critical human rights implications requiring protection measures',
                medium: 'Human rights considerations should be addressed',
                low: 'Minor human rights considerations'
            },
            'technology-ethics': {
                high: 'Significant technology ethics concerns requiring oversight',
                medium: 'Technology ethics guidelines should be considered',
                low: 'Basic technology ethics awareness needed'
            },
            'economic-policy': {
                high: 'Major economic implications requiring thorough analysis',
                medium: 'Economic factors should be evaluated',
                low: 'Minor economic considerations'
            }
        };
        const domainDescriptions = descriptions[domain];
        if (domainDescriptions) {
            return domainDescriptions[level] || `${level} impact on ${domain}`;
        }
        return `${level} impact on ${domain}`;
    }
    suggestMitigations(domain, level) {
        const mitigations = {
            'animal-welfare': [
                'Consult with animal welfare organizations',
                'Implement gradual transition periods',
                'Establish monitoring systems for animal welfare metrics'
            ],
            'music-industry': [
                'Engage with artist representative groups',
                'Consider impact on independent musicians',
                'Ensure fair compensation mechanisms'
            ],
            'environment': [
                'Conduct environmental impact assessment',
                'Implement sustainability measures',
                'Consider carbon offset requirements'
            ],
            'human-rights': [
                'Human rights impact assessment required',
                'Ensure equal access and participation',
                'Establish grievance mechanisms'
            ],
            'technology-ethics': [
                'Technology ethics review board consultation',
                'Implement privacy protection measures',
                'Establish algorithmic accountability standards'
            ],
            'economic-policy': [
                'Economic impact analysis required',
                'Consider effects on different economic groups',
                'Implement gradual rollout with monitoring'
            ]
        };
        const domainMitigations = mitigations[domain] || [];
        return level === 'high' ? domainMitigations : domainMitigations.slice(0, 2);
    }
    identifySynergies(primaryDomain, affectedDomains) {
        const synergies = [];
        const interactions = this.domainInteractions[primaryDomain] || {};
        for (const domain of affectedDomains) {
            const interaction = interactions[domain];
            if (interaction?.type === 'synergy') {
                synergies.push(`${primaryDomain} and ${domain} alignment opportunities`);
            }
        }
        return synergies;
    }
    identifyRisks(primaryDomain, affectedDomains) {
        const risks = [];
        const interactions = this.domainInteractions[primaryDomain] || {};
        for (const domain of affectedDomains) {
            const interaction = interactions[domain];
            if (interaction?.type === 'tension' || interaction?.type === 'risk') {
                risks.push(`Potential ${interaction.strength} tension between ${primaryDomain} and ${domain}`);
            }
        }
        return risks;
    }
}
