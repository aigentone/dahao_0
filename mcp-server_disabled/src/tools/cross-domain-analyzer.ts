import { CrossDomainAnalysis, DomainImpact, GovernanceProposal } from '../types/governance.js';

export class CrossDomainAnalyzer {
  private domains = [
    'animal-welfare',
    'music-industry', 
    'environment',
    'human-rights',
    'technology-ethics',
    'economic-policy'
  ];

  private domainKeywords = {
    'animal-welfare': ['animal', 'wildlife', 'livestock', 'pet', 'zoo', 'farm', 'veterinary', 'species'],
    'music-industry': ['music', 'artist', 'song', 'album', 'streaming', 'copyright', 'royalty', 'performance'],
    'environment': ['climate', 'carbon', 'pollution', 'renewable', 'sustainability', 'ecosystem', 'biodiversity'],
    'human-rights': ['rights', 'freedom', 'equality', 'discrimination', 'access', 'justice', 'privacy'],
    'technology-ethics': ['ai', 'algorithm', 'data', 'privacy', 'automation', 'digital', 'artificial intelligence'],
    'economic-policy': ['economy', 'finance', 'budget', 'tax', 'investment', 'market', 'trade', 'employment']
  };

  private domainInteractions = {
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

  async analyzeCrossDomainImpact(proposal: GovernanceProposal): Promise<CrossDomainAnalysis> {
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

  private identifyAffectedDomains(proposalText: string): string[] {
    const affected: string[] = [];

    for (const [domain, keywords] of Object.entries(this.domainKeywords)) {
      const matchCount = keywords.filter(keyword => 
        proposalText.includes(keyword)
      ).length;

      // Domain is affected if it has multiple keyword matches or specific high-impact keywords
      if (matchCount >= 2 || this.hasHighImpactKeywords(proposalText, domain)) {
        affected.push(domain);
      }
    }

    return affected;
  }

  private hasHighImpactKeywords(proposalText: string, domain: string): boolean {
    const highImpactKeywords = {
      'animal-welfare': ['animal rights', 'animal protection', 'animal testing'],
      'music-industry': ['copyright reform', 'streaming revenue', 'artist compensation'],
      'environment': ['climate change', 'carbon emissions', 'environmental protection'],
      'human-rights': ['human rights', 'civil liberties', 'equal access'],
      'technology-ethics': ['ai ethics', 'data privacy', 'algorithmic bias'],
      'economic-policy': ['economic reform', 'fiscal policy', 'market regulation']
    };

    const keywords = highImpactKeywords[domain as keyof typeof highImpactKeywords] || [];
    return keywords.some(keyword => proposalText.includes(keyword));
  }

  private calculateDomainImpacts(proposalText: string, affectedDomains: string[]): DomainImpact[] {
    return affectedDomains.map(domain => {
      const keywords = this.domainKeywords[domain as keyof typeof this.domainKeywords] || [];
      const matchCount = keywords.filter(keyword => proposalText.includes(keyword)).length;
      const hasHighImpact = this.hasHighImpactKeywords(proposalText, domain);

      let impactLevel: 'low' | 'medium' | 'high' = 'low';
      if (hasHighImpact || matchCount >= 4) {
        impactLevel = 'high';
      } else if (matchCount >= 2) {
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

  private generateImpactDescription(domain: string, level: string, proposalText: string): string {
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

    const domainDescriptions = descriptions[domain as keyof typeof descriptions];
    if (domainDescriptions) {
      return domainDescriptions[level as keyof typeof domainDescriptions] || `${level} impact on ${domain}`;
    }
    return `${level} impact on ${domain}`;
  }

  private suggestMitigations(domain: string, level: string): string[] {
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

    const domainMitigations = mitigations[domain as keyof typeof mitigations] || [];
    return level === 'high' ? domainMitigations : domainMitigations.slice(0, 2);
  }

  private identifySynergies(primaryDomain: string, affectedDomains: string[]): string[] {
    const synergies: string[] = [];
    const interactions = this.domainInteractions[primaryDomain as keyof typeof this.domainInteractions] || {};

    for (const domain of affectedDomains) {
      const interaction = interactions[domain as keyof typeof interactions];
      if (interaction?.type === 'synergy') {
        synergies.push(`${primaryDomain} and ${domain} alignment opportunities`);
      }
    }

    return synergies;
  }

  private identifyRisks(primaryDomain: string, affectedDomains: string[]): string[] {
    const risks: string[] = [];
    const interactions = this.domainInteractions[primaryDomain as keyof typeof this.domainInteractions] || {};

    for (const domain of affectedDomains) {
      const interaction = interactions[domain as keyof typeof interactions];
      if (interaction?.type === 'tension' || interaction?.type === 'risk') {
        risks.push(`Potential ${interaction.strength} tension between ${primaryDomain} and ${domain}`);
      }
    }

    return risks;
  }
}