// Branch-Specific Rule Configuration
// Allows governance branches to customize AI analysis rules and parameters
// Supports inheritance, overrides, and custom patterns

import { z } from 'zod';

// Types for branch-specific rule configuration
export interface BranchRuleConfig {
  branchId: string;
  branchName: string;
  inheritFrom?: string;
  
  // Rule customizations
  ruleOverrides: Record<string, RuleParameterOverrides>;
  customRules: CustomRuleDefinition[];
  disabledRules: string[];
  
  // Detection patterns
  customPatterns: Record<string, RegExp[]>;
  
  // Branch-specific AI behavior
  defaultAgentType: 'personal' | 'system';
  confidenceThresholds: Record<string, number>;
  
  // Metadata
  version: string;
  lastModified: string;
  modifiedBy: string;
}

export interface RuleParameterOverrides {
  parameters?: Record<string, any>;
  outputTemplate?: string;
  confidenceAdjustment?: number;
  additionalInstructions?: string;
  mcpToolPreferences?: string[];
}

export interface CustomRuleDefinition {
  id: string;
  name: string;
  description: string;
  instruction: string;
  parameters: Record<string, any>;
  mcpTools: string[];
  outputTemplate: string;
  applicableElementTypes: string[];
  detectionPatterns: string[];
}

// Branch rule configuration schema
const branchRuleConfigSchema = z.object({
  branchId: z.string(),
  branchName: z.string(),
  inheritFrom: z.string().optional(),
  
  ruleOverrides: z.record(z.object({
    parameters: z.record(z.any()).optional(),
    outputTemplate: z.string().optional(),
    confidenceAdjustment: z.number().optional(),
    additionalInstructions: z.string().optional(),
    mcpToolPreferences: z.array(z.string()).optional()
  })),
  
  customRules: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    instruction: z.string(),
    parameters: z.record(z.any()),
    mcpTools: z.array(z.string()),
    outputTemplate: z.string(),
    applicableElementTypes: z.array(z.string()),
    detectionPatterns: z.array(z.string())
  })),
  
  disabledRules: z.array(z.string()),
  customPatterns: z.record(z.array(z.string())),
  defaultAgentType: z.enum(['personal', 'system']),
  confidenceThresholds: z.record(z.number()),
  
  version: z.string(),
  lastModified: z.string(),
  modifiedBy: z.string()
});

// Default configurations for different branch types
const DEFAULT_BRANCH_CONFIGS: Record<string, Partial<BranchRuleConfig>> = {
  'animal-welfare-dahao': {
    ruleOverrides: {
      'definition-clarity': {
        parameters: {
          analysisDepth: 'detailed',
          focusAreas: ['clarity', 'precision', 'usability', 'ethical-implications'],
          ethicalConsiderations: true
        },
        additionalInstructions: 'Pay special attention to animal welfare implications and ethical considerations in definitions.',
        confidenceAdjustment: 0.1
      },
      'philosophical-consistency': {
        parameters: {
          philosophicalFramework: 'sentience-focused ethics',
          priorityValues: ['sentience', 'suffering reduction', 'welfare maximization']
        },
        confidenceAdjustment: 0.15
      }
    },
    customRules: [
      {
        id: 'animal-welfare-impact',
        name: 'Animal Welfare Impact Assessment',
        description: 'Analyze the specific impact on animal welfare',
        instruction: 'Evaluate how this {elementType} affects animal welfare: 1. Direct impacts on animals 2. Indirect effects through human behavior 3. Long-term welfare implications 4. Alignment with animal welfare principles 5. Recommendations for welfare optimization',
        parameters: {
          welfareMetrics: ['physical_health', 'mental_wellbeing', 'natural_behavior', 'environment'],
          speciesConsiderations: true,
          severityAssessment: true
        },
        mcpTools: ['getBranchElements', 'getBranchPhilosophy'],
        outputTemplate: '🐾 Animal Welfare Impact Analysis:\n\n**Direct Welfare Effects:**\n{directEffects}\n\n**Behavioral Implications:**\n{behavioralImplications}\n\n**Long-term Welfare Outlook:**\n{longTermOutlook}\n\n**Welfare Optimization Recommendations:**\n{recommendations}\n\n**Confidence:** {confidence}%',
        applicableElementTypes: ['term', 'principle', 'rule'],
        detectionPatterns: [
          'animal welfare impact',
          'welfare assessment',
          'impact on animals',
          'animal effects'
        ]
      }
    ],
    customPatterns: {
      'welfare-check': [/welfare\s+(?:impact|assessment|check)/i],
      'species-analysis': [/(?:species|animal)\s+(?:specific|impact|effects)/i]
    },
    defaultAgentType: 'system',
    confidenceThresholds: {
      'definition-clarity': 0.8,
      'animal-welfare-impact': 0.75
    }
  },
  
  'music-industry-dahao': {
    ruleOverrides: {
      'implementation-feasibility': {
        parameters: {
          industryContext: 'music industry',
          practicalFocus: true,
          stakeholders: ['artists', 'labels', 'platforms', 'listeners'],
          implementationTimeframe: 'short-to-medium'
        },
        additionalInstructions: 'Focus on practical implementation in the music industry context. Consider technical, legal, and business constraints.',
        confidenceAdjustment: 0.05
      }
    },
    customRules: [
      {
        id: 'music-industry-viability',
        name: 'Music Industry Viability Assessment',
        description: 'Assess viability within music industry ecosystem',
        instruction: 'Analyze the viability of this {elementType} in the music industry: 1. Technical implementation requirements 2. Business model compatibility 3. Artist and label adoption barriers 4. Consumer impact 5. Industry transformation potential',
        parameters: {
          stakeholderAnalysis: true,
          technologyRequirements: true,
          businessModelImpact: true,
          adoptionBarriers: true
        },
        mcpTools: ['getBranchElements', 'getElementUsage'],
        outputTemplate: '🎵 Music Industry Viability Analysis:\n\n**Technical Feasibility:**\n{technicalFeasibility}\n\n**Business Impact:**\n{businessImpact}\n\n**Adoption Challenges:**\n{adoptionChallenges}\n\n**Implementation Strategy:**\n{implementationStrategy}\n\n**Confidence:** {confidence}%',
        applicableElementTypes: ['principle', 'rule'],
        detectionPatterns: [
          'music industry viability',
          'industry implementation',
          'music business impact'
        ]
      }
    ],
    customPatterns: {
      'industry-check': [/music\s+industry\s+(?:viability|feasibility|impact)/i]
    },
    defaultAgentType: 'personal',
    confidenceThresholds: {
      'implementation-feasibility': 0.75,
      'music-industry-viability': 0.8
    }
  },
  
  'environmental-dahao': {
    ruleOverrides: {
      'cross-domain-impact': {
        parameters: {
          domainFocus: ['environmental', 'sustainability', 'ecological'],
          impactScope: 'ecosystem-wide',
          timeframe: 'long-term',
          sustainabilityMetrics: true
        },
        additionalInstructions: 'Emphasize environmental sustainability and ecological impact in all assessments.',
        confidenceAdjustment: 0.12
      }
    },
    customRules: [
      {
        id: 'environmental-sustainability',
        name: 'Environmental Sustainability Assessment',
        description: 'Comprehensive environmental impact analysis',
        instruction: 'Evaluate the environmental sustainability of this {elementType}: 1. Direct environmental effects 2. Resource consumption implications 3. Waste and pollution considerations 4. Biodiversity impact 5. Climate change relevance 6. Sustainability recommendations',
        parameters: {
          environmentalMetrics: ['carbon_footprint', 'resource_usage', 'waste_generation', 'biodiversity_impact'],
          timeframeAnalysis: ['immediate', 'medium_term', 'long_term'],
          systemicEffects: true
        },
        mcpTools: ['getBranchElements', 'getBranchPhilosophy', 'getElementUsage'],
        outputTemplate: '🌍 Environmental Sustainability Analysis:\n\n**Direct Environmental Impact:**\n{directImpact}\n\n**Resource Implications:**\n{resourceImplications}\n\n**Systemic Effects:**\n{systemicEffects}\n\n**Sustainability Recommendations:**\n{sustainabilityRecommendations}\n\n**Confidence:** {confidence}%',
        applicableElementTypes: ['term', 'principle', 'rule'],
        detectionPatterns: [
          'environmental impact',
          'sustainability assessment',
          'ecological effects',
          'environmental analysis'
        ]
      }
    ],
    customPatterns: {
      'sustainability-check': [/(?:environmental|sustainability)\s+(?:impact|assessment|analysis)/i],
      'climate-analysis': [/climate\s+(?:impact|change|effects)/i]
    },
    defaultAgentType: 'system',
    confidenceThresholds: {
      'environmental-sustainability': 0.8,
      'cross-domain-impact': 0.85
    }
  }
};

export class BranchRuleConfigManager {
  private configs: Map<string, BranchRuleConfig> = new Map();
  private configCache: Map<string, { config: BranchRuleConfig; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  constructor() {
    this.loadDefaultConfigs();
  }
  
  /**
   * Load default configurations for known branch types
   */
  private loadDefaultConfigs(): void {
    for (const [branchId, config] of Object.entries(DEFAULT_BRANCH_CONFIGS)) {
      const fullConfig: BranchRuleConfig = {
        branchId,
        branchName: this.getBranchDisplayName(branchId),
        ruleOverrides: {},
        customRules: [],
        disabledRules: [],
        customPatterns: {},
        defaultAgentType: 'personal',
        confidenceThresholds: {},
        version: '1.0.0',
        lastModified: new Date().toISOString(),
        modifiedBy: 'system',
        ...config
      };
      
      this.configs.set(branchId, fullConfig);
    }
  }
  
  /**
   * Get branch rule configuration with inheritance
   */
  async getBranchConfig(branchId: string): Promise<BranchRuleConfig> {
    // Check cache first
    const cached = this.configCache.get(branchId);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.config;
    }
    
    // Get base config
    let config = this.configs.get(branchId);
    
    if (!config) {
      // Create default config for unknown branches
      config = this.createDefaultConfig(branchId);
    }
    
    // Resolve inheritance
    if (config.inheritFrom) {
      const parentConfig = await this.getBranchConfig(config.inheritFrom);
      config = this.mergeConfigs(parentConfig, config);
    }
    
    // Cache result
    this.configCache.set(branchId, {
      config,
      timestamp: Date.now()
    });
    
    return config;
  }
  
  /**
   * Get rule overrides for a specific rule and branch
   */
  async getRuleOverrides(branchId: string, ruleId: string): Promise<RuleParameterOverrides | null> {
    const config = await this.getBranchConfig(branchId);
    return config.ruleOverrides[ruleId] || null;
  }
  
  /**
   * Get custom rules for a branch
   */
  async getCustomRules(branchId: string): Promise<CustomRuleDefinition[]> {
    const config = await this.getBranchConfig(branchId);
    return config.customRules;
  }
  
  /**
   * Get detection patterns for a branch
   */
  async getDetectionPatterns(branchId: string): Promise<Record<string, RegExp[]>> {
    const config = await this.getBranchConfig(branchId);
    const patterns: Record<string, RegExp[]> = {};
    
    // Convert string patterns to RegExp
    for (const [key, stringPatterns] of Object.entries(config.customPatterns)) {
      patterns[key] = stringPatterns.map(pattern => new RegExp(pattern, 'i'));
    }
    
    return patterns;
  }
  
  /**
   * Check if a rule is disabled for a branch
   */
  async isRuleDisabled(branchId: string, ruleId: string): Promise<boolean> {
    const config = await this.getBranchConfig(branchId);
    return config.disabledRules.includes(ruleId);
  }
  
  /**
   * Get confidence threshold for a rule in a branch
   */
  async getConfidenceThreshold(branchId: string, ruleId: string): Promise<number> {
    const config = await this.getBranchConfig(branchId);
    return config.confidenceThresholds[ruleId] || 0.7; // Default threshold
  }
  
  /**
   * Update branch configuration
   */
  async updateBranchConfig(
    branchId: string, 
    updates: Partial<BranchRuleConfig>,
    modifiedBy: string
  ): Promise<BranchRuleConfig> {
    const currentConfig = await this.getBranchConfig(branchId);
    
    const updatedConfig: BranchRuleConfig = {
      ...currentConfig,
      ...updates,
      lastModified: new Date().toISOString(),
      modifiedBy,
      version: this.incrementVersion(currentConfig.version)
    };
    
    // Validate configuration
    branchRuleConfigSchema.parse(updatedConfig);
    
    // Update storage
    this.configs.set(branchId, updatedConfig);
    
    // Clear cache
    this.configCache.delete(branchId);
    
    // Save to persistent storage (implementation depends on storage choice)
    await this.persistConfig(updatedConfig);
    
    return updatedConfig;
  }
  
  /**
   * Create a new custom rule for a branch
   */
  async addCustomRule(
    branchId: string,
    rule: Omit<CustomRuleDefinition, 'id'>,
    modifiedBy: string
  ): Promise<CustomRuleDefinition> {
    const config = await this.getBranchConfig(branchId);
    
    const customRule: CustomRuleDefinition = {
      ...rule,
      id: `${branchId}-${rule.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
    };
    
    const updatedConfig = await this.updateBranchConfig(
      branchId,
      {
        customRules: [...config.customRules, customRule]
      },
      modifiedBy
    );
    
    return customRule;
  }
  
  /**
   * Remove a custom rule from a branch
   */
  async removeCustomRule(branchId: string, ruleId: string, modifiedBy: string): Promise<void> {
    const config = await this.getBranchConfig(branchId);
    
    await this.updateBranchConfig(
      branchId,
      {
        customRules: config.customRules.filter(rule => rule.id !== ruleId)
      },
      modifiedBy
    );
  }
  
  /**
   * Get all available rules for a branch (built-in + custom)
   */
  async getAvailableRules(branchId: string): Promise<Array<{ id: string; name: string; type: 'builtin' | 'custom' }>> {
    const config = await this.getBranchConfig(branchId);
    const rules: Array<{ id: string; name: string; type: 'builtin' | 'custom' }> = [];
    
    // Built-in rules (not disabled)
    const builtinRules = [
      'definition-clarity',
      'usage-consistency',
      'evolution-analysis',
      'philosophical-consistency',
      'implementation-feasibility',
      'cross-domain-impact',
      'enforcement-mechanism',
      'compliance-framework',
      'implementation-requirements',
      'general-analysis'
    ];
    
    for (const ruleId of builtinRules) {
      if (!config.disabledRules.includes(ruleId)) {
        rules.push({
          id: ruleId,
          name: this.getRuleDisplayName(ruleId),
          type: 'builtin'
        });
      }
    }
    
    // Custom rules
    for (const customRule of config.customRules) {
      rules.push({
        id: customRule.id,
        name: customRule.name,
        type: 'custom'
      });
    }
    
    return rules;
  }
  
  /**
   * Create default configuration for unknown branches
   */
  private createDefaultConfig(branchId: string): BranchRuleConfig {
    return {
      branchId,
      branchName: this.getBranchDisplayName(branchId),
      ruleOverrides: {},
      customRules: [],
      disabledRules: [],
      customPatterns: {},
      defaultAgentType: 'personal',
      confidenceThresholds: {},
      version: '1.0.0',
      lastModified: new Date().toISOString(),
      modifiedBy: 'system'
    };
  }
  
  /**
   * Merge parent and child configurations
   */
  private mergeConfigs(parent: BranchRuleConfig, child: BranchRuleConfig): BranchRuleConfig {
    return {
      ...parent,
      ...child,
      ruleOverrides: { ...parent.ruleOverrides, ...child.ruleOverrides },
      customRules: [...parent.customRules, ...child.customRules],
      disabledRules: [...new Set([...parent.disabledRules, ...child.disabledRules])],
      customPatterns: { ...parent.customPatterns, ...child.customPatterns },
      confidenceThresholds: { ...parent.confidenceThresholds, ...child.confidenceThresholds }
    };
  }
  
  /**
   * Get display name for branch
   */
  private getBranchDisplayName(branchId: string): string {
    const displayNames: Record<string, string> = {
      'animal-welfare-dahao': 'Animal Welfare DAHAO',
      'music-industry-dahao': 'Music Industry DAHAO',
      'environmental-dahao': 'Environmental DAHAO',
      'core-dahao': 'Core DAHAO',
      'main': 'Main Branch'
    };
    
    return displayNames[branchId] || branchId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  /**
   * Get display name for rule
   */
  private getRuleDisplayName(ruleId: string): string {
    const displayNames: Record<string, string> = {
      'definition-clarity': 'Definition Clarity Review',
      'usage-consistency': 'Usage Consistency Check',
      'evolution-analysis': 'Evolution Analysis',
      'philosophical-consistency': 'Philosophical Consistency Review',
      'implementation-feasibility': 'Implementation Feasibility Analysis',
      'cross-domain-impact': 'Cross-Domain Impact Assessment',
      'enforcement-mechanism': 'Enforcement Mechanism Review',
      'compliance-framework': 'Compliance Framework Check',
      'implementation-requirements': 'Implementation Requirements Audit',
      'general-analysis': 'General Analysis'
    };
    
    return displayNames[ruleId] || ruleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  /**
   * Increment version number
   */
  private incrementVersion(version: string): string {
    const parts = version.split('.');
    const patch = parseInt(parts[2]) + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  }
  
  /**
   * Persist configuration to storage
   */
  private async persistConfig(config: BranchRuleConfig): Promise<void> {
    // Implementation depends on chosen storage mechanism
    // Could be JSON files, database, etc.
    console.log(`Persisting config for branch ${config.branchId}`);
  }
  
  /**
   * Clear all caches
   */
  clearCache(): void {
    this.configCache.clear();
  }
}

// Export singleton instance
export const branchRuleConfigManager = new BranchRuleConfigManager();

// Helper functions
export async function getBranchRuleConfig(branchId: string): Promise<BranchRuleConfig> {
  return branchRuleConfigManager.getBranchConfig(branchId);
}

export async function getRuleOverrides(branchId: string, ruleId: string): Promise<RuleParameterOverrides | null> {
  return branchRuleConfigManager.getRuleOverrides(branchId, ruleId);
}

export async function getCustomRules(branchId: string): Promise<CustomRuleDefinition[]> {
  return branchRuleConfigManager.getCustomRules(branchId);
}

export async function isRuleDisabled(branchId: string, ruleId: string): Promise<boolean> {
  return branchRuleConfigManager.isRuleDisabled(branchId, ruleId);
}