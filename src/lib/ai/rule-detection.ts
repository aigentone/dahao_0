// Rule Detection Utility
// Advanced natural language processing for detecting rule execution intents in chat messages
// Supports confidence scoring, context awareness, and custom patterns

import { RuleIntent, ChatMessage, ElementContext } from './unified-types';

// Enhanced rule detection patterns with context sensitivity
const RULE_PATTERNS: Record<string, RuleDetectionConfig> = {
  'definition-clarity': {
    patterns: [
      /(?:check|analyze|review)\s+(?:the\s+)?clarity/i,
      /how\s+clear\s+is\s+(?:this|the)/i,
      /(?:is\s+)?(?:this|the)\s+definition\s+clear/i,
      /clarity\s+(?:review|check|analysis)/i,
      /(?:definition|term)\s+clarity/i,
      /clear\s+enough\s+definition/i,
      /ambiguous\s+(?:definition|term)/i,
      /vague\s+(?:definition|term)/i
    ],
    contextBoosts: {
      hasElement: 0.2,
      elementType: { term: 0.3, principle: 0.1, rule: 0.0 }
    },
    keywords: ['clear', 'clarity', 'definition', 'ambiguous', 'vague', 'precise', 'specific'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'usage-consistency': {
    patterns: [
      /(?:check|analyze|review)\s+consistency/i,
      /consistently\s+used/i,
      /usage\s+(?:consistency|check)/i,
      /used\s+(?:consistently|the\s+same\s+way)/i,
      /different\s+(?:usage|uses)/i,
      /inconsistent\s+(?:usage|use)/i,
      /same\s+meaning\s+everywhere/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { term: 0.3, principle: 0.2, rule: 0.1 }
    },
    keywords: ['consistent', 'consistency', 'usage', 'used', 'same', 'different', 'inconsistent'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'evolution-analysis': {
    patterns: [
      /(?:evolution|history|changes)\s+(?:of|in)/i,
      /how\s+(?:has\s+)?(?:this|it)\s+(?:changed|evolved)/i,
      /historical\s+(?:changes|development)/i,
      /version\s+history/i,
      /(?:track|trace)\s+changes/i,
      /development\s+over\s+time/i,
      /previous\s+versions/i
    ],
    contextBoosts: {
      hasElement: 0.2,
      elementType: { term: 0.2, principle: 0.2, rule: 0.2 }
    },
    keywords: ['evolution', 'history', 'changes', 'changed', 'evolved', 'historical', 'version', 'development'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'philosophical-consistency': {
    patterns: [
      /philosophical\s+(?:alignment|consistency)/i,
      /align\s+with\s+(?:philosophy|principles)/i,
      /(?:philosophical|ethical)\s+(?:check|review)/i,
      /values?\s+alignment/i,
      /consistent\s+with\s+(?:values|philosophy)/i,
      /philosophical\s+foundation/i,
      /core\s+principles/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { principle: 0.4, term: 0.2, rule: 0.3 }
    },
    keywords: ['philosophical', 'philosophy', 'alignment', 'values', 'principles', 'ethical', 'foundation'],
    confidence: { base: 0.8, withContext: 0.95 }
  },
  
  'implementation-feasibility': {
    patterns: [
      /(?:feasibility|feasible)\s+(?:check|analysis)/i,
      /can\s+(?:this|we)\s+(?:be\s+)?implement/i,
      /practical\s+to\s+implement/i,
      /implementation\s+(?:feasibility|challenges)/i,
      /possible\s+to\s+implement/i,
      /how\s+difficult\s+to\s+implement/i,
      /realistic\s+(?:implementation|to\s+implement)/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { rule: 0.4, principle: 0.3, term: 0.1 }
    },
    keywords: ['feasible', 'feasibility', 'implement', 'implementation', 'practical', 'possible', 'realistic'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'cross-domain-impact': {
    patterns: [
      /(?:cross-domain|cross\s+domain)\s+impact/i,
      /impact\s+(?:on|across)\s+(?:other\s+)?(?:domains|areas)/i,
      /affect\s+other\s+(?:domains|areas|branches)/i,
      /broader\s+implications/i,
      /system-wide\s+impact/i,
      /ripple\s+effects?/i,
      /consequences\s+for\s+other/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { rule: 0.3, principle: 0.4, term: 0.2 }
    },
    keywords: ['cross-domain', 'impact', 'affect', 'implications', 'consequences', 'system-wide', 'broader'],
    confidence: { base: 0.85, withContext: 0.95 }
  },
  
  'enforcement-mechanism': {
    patterns: [
      /enforcement\s+mechanism/i,
      /how\s+(?:is\s+)?(?:this|it)\s+enforced/i,
      /enforcement\s+(?:strategy|approach)/i,
      /(?:monitor|monitoring)\s+compliance/i,
      /ensure\s+compliance/i,
      /penalties?\s+for\s+violation/i,
      /consequences\s+of\s+(?:breaking|violating)/i
    ],
    contextBoosts: {
      hasElement: 0.4,
      elementType: { rule: 0.5, principle: 0.2, term: 0.0 }
    },
    keywords: ['enforcement', 'enforced', 'compliance', 'monitor', 'penalties', 'violation', 'consequences'],
    confidence: { base: 0.85, withContext: 0.95 }
  },
  
  'compliance-framework': {
    patterns: [
      /compliance\s+(?:framework|check)/i,
      /framework\s+integration/i,
      /comply\s+with\s+(?:framework|standards)/i,
      /regulatory\s+compliance/i,
      /standards?\s+compliance/i,
      /framework\s+requirements/i,
      /integration\s+with\s+(?:existing\s+)?(?:systems|frameworks)/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { rule: 0.4, principle: 0.3, term: 0.1 }
    },
    keywords: ['compliance', 'framework', 'integration', 'standards', 'regulatory', 'requirements'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'implementation-requirements': {
    patterns: [
      /implementation\s+requirements/i,
      /what\s+(?:is\s+)?(?:needed|required)\s+(?:to\s+implement|for\s+implementation)/i,
      /requirements?\s+(?:for|to)\s+implement/i,
      /(?:technical|operational)\s+requirements/i,
      /what\s+(?:does\s+)?(?:this|it)\s+require/i,
      /dependencies?\s+for\s+implementation/i,
      /prerequisites?\s+for/i
    ],
    contextBoosts: {
      hasElement: 0.3,
      elementType: { rule: 0.4, principle: 0.3, term: 0.1 }
    },
    keywords: ['requirements', 'needed', 'required', 'implement', 'dependencies', 'prerequisites'],
    confidence: { base: 0.8, withContext: 0.9 }
  },
  
  'general-analysis': {
    patterns: [
      /(?:analyze|analysis)\s+(?:this|the)/i,
      /comprehensive\s+(?:review|analysis)/i,
      /full\s+analysis/i,
      /detailed\s+(?:review|analysis)/i,
      /what\s+do\s+you\s+think\s+(?:about|of)/i,
      /your\s+thoughts?\s+on/i,
      /overall\s+assessment/i
    ],
    contextBoosts: {
      hasElement: 0.2,
      elementType: { term: 0.1, principle: 0.1, rule: 0.1 }
    },
    keywords: ['analyze', 'analysis', 'comprehensive', 'review', 'detailed', 'assessment'],
    confidence: { base: 0.7, withContext: 0.8 }
  }
};

interface RuleDetectionConfig {
  patterns: RegExp[];
  contextBoosts: {
    hasElement: number;
    elementType: Record<string, number>;
  };
  keywords: string[];
  confidence: {
    base: number;
    withContext: number;
  };
}

export class RuleDetector {
  private confidenceThreshold: number = 0.7;
  
  constructor(confidenceThreshold: number = 0.7) {
    this.confidenceThreshold = confidenceThreshold;
  }
  
  /**
   * Detect rule intent from chat messages with context awareness
   */
  detectRuleIntent(
    messages: ChatMessage[], 
    element?: ElementContext,
    customPatterns?: Record<string, RegExp[]>
  ): RuleIntent | null {
    if (!messages || messages.length === 0) {
      return null;
    }
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return null;
    }
    
    const content = lastMessage.content;
    const results: Array<{ ruleType: string; confidence: number; matches: RegExpMatchArray | null }> = [];
    
    // Check against all rule patterns (including custom ones)
    const allPatterns = { ...RULE_PATTERNS };
    if (customPatterns) {
      for (const [ruleType, patterns] of Object.entries(customPatterns)) {
        allPatterns[ruleType] = {
          patterns,
          contextBoosts: { hasElement: 0.1, elementType: {} },
          keywords: [],
          confidence: { base: 0.8, withContext: 0.9 }
        };
      }
    }
    
    for (const [ruleType, config] of Object.entries(allPatterns)) {
      const { confidence, matches } = this.calculateRuleConfidence(content, config, element);
      
      if (confidence > 0) {
        results.push({ ruleType, confidence, matches });
      }
    }
    
    // Sort by confidence and return the best match
    results.sort((a, b) => b.confidence - a.confidence);
    
    if (results.length > 0 && results[0].confidence >= this.confidenceThreshold) {
      return {
        ruleType: results[0].ruleType,
        confidence: results[0].confidence,
        detectedPhrase: results[0].matches?.[0] || ''
      };
    }
    
    return null;
  }
  
  /**
   * Calculate confidence score for a specific rule
   */
  private calculateRuleConfidence(
    content: string,
    config: RuleDetectionConfig,
    element?: ElementContext
  ): { confidence: number; matches: RegExpMatchArray | null } {
    const lowerContent = content.toLowerCase();
    let baseConfidence = 0;
    let matches: RegExpMatchArray | null = null;
    
    // Check against patterns
    for (const pattern of config.patterns) {
      const match = content.match(pattern);
      if (match) {
        matches = match;
        baseConfidence = config.confidence.base;
        break;
      }
    }
    
    if (baseConfidence === 0) {
      return { confidence: 0, matches: null };
    }
    
    // Apply context boosts
    let confidence = baseConfidence;
    
    // Element presence boost
    if (element) {
      confidence += config.contextBoosts.hasElement;
      
      // Element type boost
      const typeBoost = config.contextBoosts.elementType[element.type] || 0;
      confidence += typeBoost;
    }
    
    // Keyword density boost
    const keywordCount = config.keywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    ).length;
    
    if (keywordCount > 1) {
      confidence += (keywordCount - 1) * 0.05; // Small boost for additional keywords
    }
    
    // Length and complexity adjustment
    const words = content.split(/\s+/).length;
    if (words < 5) {
      confidence -= 0.1; // Reduce confidence for very short messages
    } else if (words > 20) {
      confidence += 0.05; // Small boost for detailed requests
    }
    
    // Ensure confidence doesn't exceed 1.0
    confidence = Math.min(confidence, 1.0);
    
    return { confidence, matches };
  }
  
  /**
   * Get rule suggestions based on element type and context
   */
  getRuleSuggestions(element?: ElementContext): Array<{ ruleType: string; description: string; confidence: number }> {
    const suggestions: Array<{ ruleType: string; description: string; confidence: number }> = [];
    
    const ruleDescriptions: Record<string, string> = {
      'definition-clarity': 'Check how clearly this element is defined',
      'usage-consistency': 'Verify consistent usage across governance documents',
      'evolution-analysis': 'Analyze historical changes and evolution',
      'philosophical-consistency': 'Check alignment with philosophical foundations',
      'implementation-feasibility': 'Assess practical implementation feasibility',
      'cross-domain-impact': 'Analyze impact across different domains',
      'enforcement-mechanism': 'Review enforcement mechanisms and strategies',
      'compliance-framework': 'Check compliance with existing frameworks',
      'implementation-requirements': 'Detail implementation requirements and dependencies',
      'general-analysis': 'Comprehensive analysis covering multiple aspects'
    };
    
    if (!element) {
      // Generic suggestions
      suggestions.push(
        { ruleType: 'general-analysis', description: ruleDescriptions['general-analysis'], confidence: 0.8 }
      );
      return suggestions;
    }
    
    // Element-type specific suggestions
    const typeSuggestions: Record<string, string[]> = {
      'term': ['definition-clarity', 'usage-consistency', 'evolution-analysis', 'general-analysis'],
      'principle': ['philosophical-consistency', 'implementation-feasibility', 'cross-domain-impact', 'general-analysis'],
      'rule': ['enforcement-mechanism', 'compliance-framework', 'implementation-requirements', 'implementation-feasibility', 'general-analysis'],
      'metarule': ['philosophical-consistency', 'cross-domain-impact', 'enforcement-mechanism', 'general-analysis']
    };
    
    const relevantRules = typeSuggestions[element.type] || ['general-analysis'];
    
    for (const ruleType of relevantRules) {
      const config = RULE_PATTERNS[ruleType];
      const elementTypeBoost = config?.contextBoosts.elementType[element.type] || 0;
      const confidence = 0.7 + elementTypeBoost; // Base suggestion confidence
      
      suggestions.push({
        ruleType,
        description: ruleDescriptions[ruleType],
        confidence: Math.min(confidence, 0.95)
      });
    }
    
    return suggestions.sort((a, b) => b.confidence - a.confidence);
  }
  
  /**
   * Check if a message contains explicit rule execution request
   */
  hasExplicitRuleRequest(content: string): boolean {
    const explicitPatterns = [
      /run\s+(?:a\s+)?(?:rule|analysis|check)/i,
      /execute\s+(?:a\s+)?(?:rule|analysis)/i,
      /perform\s+(?:a\s+)?(?:rule|analysis|check)/i,
      /do\s+(?:a\s+)?(?:rule|analysis|check)/i
    ];
    
    return explicitPatterns.some(pattern => pattern.test(content));
  }
  
  /**
   * Extract element references from message
   */
  extractElementReferences(content: string): string[] {
    const references: string[] = [];
    
    // Common element reference patterns
    const patterns = [
      /(?:term|definition)\s+"([^"]+)"/gi,
      /(?:principle|rule)\s+"([^"]+)"/gi,
      /(?:this|the)\s+([\w\s-]+)\s+(?:term|principle|rule)/gi
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        references.push(match[1].trim());
      }
    }
    
    return [...new Set(references)]; // Remove duplicates
  }
  
  /**
   * Get confidence threshold
   */
  getConfidenceThreshold(): number {
    return this.confidenceThreshold;
  }
  
  /**
   * Set confidence threshold
   */
  setConfidenceThreshold(threshold: number): void {
    this.confidenceThreshold = Math.max(0, Math.min(1, threshold));
  }
}

// Export singleton instance
export const ruleDetector = new RuleDetector();

// Export helper functions
export function detectRuleIntent(
  messages: ChatMessage[],
  element?: ElementContext,
  customPatterns?: Record<string, RegExp[]>
): RuleIntent | null {
  return ruleDetector.detectRuleIntent(messages, element, customPatterns);
}

export function getRuleSuggestions(element?: ElementContext) {
  return ruleDetector.getRuleSuggestions(element);
}

export function hasExplicitRuleRequest(content: string): boolean {
  return ruleDetector.hasExplicitRuleRequest(content);
}