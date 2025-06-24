// System Baseline Extraction Utilities for Dynamic System AI Context
// Determines appropriate DAHAO branch baseline for objective validation

import branchesData from '@/lib/mock-data/branches.json';
import termsData from '@/lib/mock-data/elements-terms.json';
import principlesData from '@/lib/mock-data/elements-principles.json';
import rulesData from '@/lib/mock-data/elements-rules.json';

export interface SystemValueContext {
  branchId: string;
  branchName: string;
  branchType: string;
  version: string;
  
  // Baseline terms that define core concepts for this domain
  baselineTerms: Array<{
    id: string;
    name: string;
    version: string;
    definition: string;
    isCore: boolean; // true if inherited from core-dahao
  }>;
  
  // Baseline principles that establish validation standards
  baselinePrinciples: Array<{
    id: string;
    statement: string;
    isCore: boolean;
    priority: 'critical' | 'important' | 'standard';
  }>;
  
  // Compliance rules that must be enforced
  complianceRules: Array<{
    id: string;
    name: string;
    purpose: string;
    category: string;
    isCritical: boolean;
  }>;
  
  // Domain specialization focus
  domainFocus: string[];
  
  // Validation criteria specific to this domain
  validationCriteria: string[];
}

// Define System AI branch configurations
export const SYSTEM_AI_BRANCHES = {
  'core': {
    id: 'system-ai-core',
    name: 'Core DAHAO Validator',
    branchId: 'core-dahao',
    description: 'Validates against core DAHAO baseline principles',
    icon: '🏠'
  },
  'animal-welfare': {
    id: 'system-ai-animal',
    name: 'Animal Welfare Validator',
    branchId: 'animal-welfare-dahao',
    description: 'Validates against Animal Welfare DAHAO standards',
    icon: '🐾'
  },
  'environmental': {
    id: 'system-ai-environmental',
    name: 'Environmental Validator',
    branchId: 'environmental-dahao',
    description: 'Validates against Environmental DAHAO standards',
    icon: '🌱'
  },
  'music-industry': {
    id: 'system-ai-music',
    name: 'Music Industry Validator',
    branchId: 'music-industry-dahao',
    description: 'Validates against Music Industry DAHAO standards',
    icon: '🎵'
  }
};

export function getSystemValuesForContext(
  elementBranchId: string,
  elementType: string,
  elementId?: string
): SystemValueContext {
  // Determine which main DAHAO branch to use for validation
  let systemBranchId = determineSystemBranch(elementBranchId, elementType, elementId);
  
  const systemBranch = branchesData.branches[systemBranchId as keyof typeof branchesData.branches];
  
  if (!systemBranch) {
    // Fallback to core DAHAO
    systemBranchId = 'core-dahao';
  }
  
  // Extract baseline components
  const baselineTerms = extractBaselineTerms(systemBranchId);
  const baselinePrinciples = extractBaselinePrinciples(systemBranchId);
  const complianceRules = extractComplianceRules(systemBranchId);
  const domainFocus = extractDomainFocus(systemBranchId);
  const validationCriteria = extractValidationCriteria(systemBranchId);
  
  return {
    branchId: systemBranchId,
    branchName: systemBranch?.name || 'Core DAHAO',
    branchType: systemBranch?.type || 'core',
    version: systemBranch?.version || '1.0.0',
    baselineTerms,
    baselinePrinciples,
    complianceRules,
    domainFocus,
    validationCriteria
  };
}

function determineSystemBranch(elementBranchId: string, elementType: string, elementId?: string): string {
  // If analyzing element from a sub-DAHAO, use that sub-DAHAO's baseline
  if (elementBranchId.includes('animal-welfare') || elementBranchId.includes('animal')) {
    return 'animal-welfare-dahao';
  }
  
  if (elementBranchId.includes('environmental') || elementBranchId.includes('eco')) {
    return 'environmental-dahao';
  }
  
  if (elementBranchId.includes('music')) {
    return 'music-industry-dahao';
  }
  
  // Check element content for domain indicators
  if (elementId) {
    const elementContent = getElementContent(elementType, elementId);
    if (elementContent) {
      const content = elementContent.toLowerCase();
      
      if (content.includes('animal') || content.includes('species') || content.includes('welfare')) {
        return 'animal-welfare-dahao';
      }
      
      if (content.includes('environment') || content.includes('carbon') || content.includes('sustainability')) {
        return 'environmental-dahao';
      }
      
      if (content.includes('music') || content.includes('artist') || content.includes('creative')) {
        return 'music-industry-dahao';
      }
    }
  }
  
  // Default to core DAHAO for general governance elements
  return 'core-dahao';
}

function getElementContent(elementType: string, elementId: string): string | null {
  let element: any = null;
  
  switch (elementType) {
    case 'term':
      element = termsData.terms[elementId as keyof typeof termsData.terms];
      break;
    case 'principle':
      element = principlesData.principles[elementId as keyof typeof principlesData.principles];
      break;
    case 'rule':
      element = rulesData.rules[elementId as keyof typeof rulesData.rules];
      break;
  }
  
  if (!element) return null;
  
  // Combine definition/statement/purpose for content analysis
  const content: string[] = [];
  
  if (element.versions) {
    const latestVersion = Object.values(element.versions)[0] as any;
    if (latestVersion.definition) content.push(latestVersion.definition);
    if (latestVersion.statement) content.push(latestVersion.statement);
    if (latestVersion.purpose) content.push(latestVersion.purpose);
  }
  
  return content.join(' ');
}

function extractBaselineTerms(systemBranchId: string): SystemValueContext['baselineTerms'] {
  const baselineTerms: SystemValueContext['baselineTerms'] = [];
  const branch = branchesData.branches[systemBranchId as keyof typeof branchesData.branches];
  
  if (!branch) return baselineTerms;
  
  // Get current elements for this branch (safely access with type assertion)
  const currentElements = (branch as any).currentElements?.terms || {};
  
  Object.entries(currentElements).forEach(([termId, version]) => {
    const term = termsData.terms[termId as keyof typeof termsData.terms];
    if (!term) return;
    
    const versionData = (term.versions as any)[version as string];
    if (!versionData) return;
    
    // Determine if this is core (inherited) or domain-specific
    const isCore = versionData.branchId === 'core-dahao' || 
                   (systemBranchId !== 'core-dahao' && !(version as string).includes('-'));
    
    baselineTerms.push({
      id: termId,
      name: term.name,
      version: version as string,
      definition: versionData.definition,
      isCore
    });
  });
  
  return baselineTerms;
}

function extractBaselinePrinciples(systemBranchId: string): SystemValueContext['baselinePrinciples'] {
  const baselinePrinciples: SystemValueContext['baselinePrinciples'] = [];
  const branch = branchesData.branches[systemBranchId as keyof typeof branchesData.branches];
  
  if (!branch) return baselinePrinciples;
  
  const currentElements = (branch as any).currentElements?.principles || {};
  
  Object.entries(currentElements).forEach(([principleId, version]) => {
    const principle = principlesData.principles[principleId as keyof typeof principlesData.principles];
    if (!principle) return;
    
    const versionData = principle.versions[version as keyof typeof principle.versions];
    if (!versionData) return;
    
    const isCore = versionData.branchId === 'core-dahao';
    
    // Determine priority based on principle importance
    let priority: 'critical' | 'important' | 'standard' = 'standard';
    
    if (principleId.includes('harm') || principleId.includes('dignity') || principleId.includes('equality')) {
      priority = 'critical';
    } else if (principleId.includes('transparency') || principleId.includes('consensus')) {
      priority = 'important';
    }
    
    baselinePrinciples.push({
      id: principleId,
      statement: versionData.statement,
      isCore,
      priority
    });
  });
  
  return baselinePrinciples;
}

function extractComplianceRules(systemBranchId: string): SystemValueContext['complianceRules'] {
  const complianceRules: SystemValueContext['complianceRules'] = [];
  const branch = branchesData.branches[systemBranchId as keyof typeof branchesData.branches];
  
  if (!branch) return complianceRules;
  
  const currentElements = (branch as any).currentElements?.rules || {};
  
  Object.entries(currentElements).forEach(([ruleId, version]) => {
    const rule = rulesData.rules[ruleId as keyof typeof rulesData.rules];
    if (!rule) return;
    
    const versionData = rule.versions[version as keyof typeof rule.versions];
    if (!versionData) return;
    
    // Focus on compliance and enforcement rules
    const isComplianceRule = ruleId.includes('compliance') || 
                            ruleId.includes('enforcement') || 
                            ruleId.includes('threshold') ||
                            ruleId.includes('requirement') ||
                            ruleId.includes('assessment');
    
    if (isComplianceRule || (versionData as any).category === 'compliance') {
      const isCritical = ruleId.includes('harm') || 
                        ruleId.includes('participation') || 
                        ruleId.includes('voting-thresholds');
      
      complianceRules.push({
        id: ruleId,
        name: rule.name,
        purpose: versionData.purpose || `Compliance rule: ${rule.name}`,
        category: (versionData as any).category || 'general',
        isCritical
      });
    }
  });
  
  return complianceRules;
}

function extractDomainFocus(systemBranchId: string): string[] {
  const focus: string[] = [];
  
  switch (systemBranchId) {
    case 'core-dahao':
      focus.push('general governance', 'foundational principles', 'democratic processes');
      break;
    case 'animal-welfare-dahao':
      focus.push('animal welfare', 'species rights', 'sentient being protection', 'habitat preservation');
      break;
    case 'environmental-dahao':
      focus.push('environmental protection', 'sustainability', 'climate impact', 'resource efficiency');
      break;
    case 'music-industry-dahao':
      focus.push('fair distribution', 'artist rights', 'creative freedom', 'revenue transparency');
      break;
  }
  
  return focus;
}

function extractValidationCriteria(systemBranchId: string): string[] {
  const criteria: string[] = [];
  
  // Universal criteria for all system validation
  criteria.push(
    'Alignment with baseline principles',
    'Consistency with established terms',
    'Compliance with governance rules',
    'Respect for democratic processes'
  );
  
  // Domain-specific criteria
  switch (systemBranchId) {
    case 'animal-welfare-dahao':
      criteria.push(
        'Impact on animal welfare',
        'Species-specific considerations',
        'Sentient being rights protection'
      );
      break;
    case 'environmental-dahao':
      criteria.push(
        'Environmental sustainability',
        'Climate impact assessment',
        'Resource efficiency evaluation'
      );
      break;
    case 'music-industry-dahao':
      criteria.push(
        'Fair compensation mechanisms',
        'Artist rights protection',
        'Creative freedom preservation'
      );
      break;
  }
  
  return criteria;
}

// Utility to get suggested System AI branch for context
export function getSuggestedSystemBranch(
  elementBranchId: string, 
  elementType: string, 
  elementId?: string
): keyof typeof SYSTEM_AI_BRANCHES {
  const systemBranchId = determineSystemBranch(elementBranchId, elementType, elementId);
  
  switch (systemBranchId) {
    case 'animal-welfare-dahao':
      return 'animal-welfare';
    case 'environmental-dahao':
      return 'environmental';
    case 'music-industry-dahao':
      return 'music-industry';
    default:
      return 'core';
  }
}

// Get all available System AI validators
export function getAvailableSystemValidators(): Array<{
  key: keyof typeof SYSTEM_AI_BRANCHES;
  id: string;
  name: string;
  description: string;
  icon: string;
  branchName: string;
}> {
  return Object.entries(SYSTEM_AI_BRANCHES).map(([key, config]) => {
    const branch = branchesData.branches[config.branchId as keyof typeof branchesData.branches];
    return {
      key: key as keyof typeof SYSTEM_AI_BRANCHES,
      ...config,
      branchName: branch?.name || 'Unknown Branch'
    };
  });
}

// Utility to validate if a system branch is appropriate for an element
export function validateSystemBranchAppropriate(
  systemBranchId: string,
  elementBranchId: string,
  elementType: string,
  elementId?: string
): {
  appropriate: boolean;
  reason: string;
  suggestion?: keyof typeof SYSTEM_AI_BRANCHES;
} {
  const suggested = getSuggestedSystemBranch(elementBranchId, elementType, elementId);
  const selectedBranch = Object.entries(SYSTEM_AI_BRANCHES).find(([_, config]) => 
    config.branchId === systemBranchId
  )?.[0] as keyof typeof SYSTEM_AI_BRANCHES;
  
  if (suggested === selectedBranch) {
    return {
      appropriate: true,
      reason: 'System branch matches element domain context'
    };
  }
  
  return {
    appropriate: false,
    reason: `Element context suggests ${SYSTEM_AI_BRANCHES[suggested].name} would be more appropriate`,
    suggestion: suggested
  };
}