// MCP Analysis Tools for DAHAO Governance
// Provides data access tools for rule interpretation
// Integration with existing governance data structure

import { tool } from 'ai';
import { z } from 'zod';

// Governance data will be loaded dynamically to avoid import issues

// Types for MCP tool responses
interface BranchInfo {
  branchId: string;
  branchName: string;
  branchType: string;
  parentBranch?: string;
  customizations: any;
  elementCount: number;
  elements: ElementSummary[];
}

interface ElementSummary {
  id: string;
  name: string;
  version: string;
  type: 'term' | 'principle' | 'rule' | 'metarule';
  usage: number;
  lastModified?: string;
}

interface ElementUsage {
  elementId: string;
  elementName: string;
  totalReferences: number;
  referencingElements: ElementReference[];
  consistencyScore: number;
  commonPatterns: string[];
  contextVariations: string[];
}

interface ElementReference {
  id: string;
  name: string;
  type: string;
  context: string;
  relationship: string;
}

interface BranchPhilosophy {
  branchId: string;
  branchName: string;
  corePhilosophy: string;
  keyPrinciples: string[];
  valuePriorities: string[];
  philosophicalApproach: string;
  inheritedFrom?: string;
  customizations: string[];
}

// Helper function to load governance data
async function loadGovernanceData() {
  const branchesData = await import('../mock-data/branches.json');
  const elementsTerms = await import('../mock-data/elements-terms.json');
  const elementsPrinciples = await import('../mock-data/elements-principles.json');
  const elementsRules = await import('../mock-data/elements-rules.json');
  const elementsMetarules = await import('../mock-data/elements-metarules.json');
  
  return {
    branchesData: branchesData.default || branchesData,
    elementsTerms: elementsTerms.default || elementsTerms,
    elementsPrinciples: elementsPrinciples.default || elementsPrinciples,
    elementsRules: elementsRules.default || elementsRules,
    elementsMetarules: elementsMetarules.default || elementsMetarules
  };
}

// Helper function to load branch data
async function loadBranchData(branchId: string): Promise<any> {
  const { branchesData } = await loadGovernanceData();
  const branches = branchesData.branches as any;
  const branch = branches[branchId];
  if (!branch) {
    throw new Error(`Branch ${branchId} not found`);
  }
  return branch;
}

// Helper function to resolve inherited elements for a branch
async function resolveInheritedElements(branchId: string, elementType?: 'term' | 'principle' | 'rule' | 'metarule'): Promise<any[]> {
  const branch = await loadBranchData(branchId);
  const { elementsTerms, elementsPrinciples, elementsRules, elementsMetarules } = await loadGovernanceData();
  const allElements: any[] = [];
  
  // Get elements from all sources - convert objects to arrays
  const elementSources = {
    'term': Object.values(elementsTerms.terms || {}),
    'principle': Object.values(elementsPrinciples.principles || {}),
    'rule': Object.values(elementsRules.rules || {}),
    'metarule': Object.values(elementsMetarules.metaRules || {})
  };
  
  // If specific type requested, get only that type
  if (elementType) {
    const elements = elementSources[elementType] || [];
    // Filter by branch relevance (elements that apply to this branch)
    const relevantElements = elements.filter((element: any) => {
      // For this simplified implementation, include all elements
      // In a real system, you'd check branch-specific versions
      return true;
    });
    allElements.push(...relevantElements.map((el: any) => ({ ...el, type: elementType })));
  } else {
    // Get all types
    for (const [type, elements] of Object.entries(elementSources)) {
      const relevantElements = elements.filter((element: any) => {
        // For this simplified implementation, include all elements
        // In a real system, you'd check branch-specific versions
        return true;
      });
      allElements.push(...relevantElements.map((el: any) => ({ ...el, type })));
    }
  }
  
  return allElements;
}

// Helper function to analyze element usage patterns
async function analyzeElementUsage(elementId: string, branchId: string): Promise<ElementUsage> {
  const { elementsTerms, elementsPrinciples, elementsRules, elementsMetarules } = await loadGovernanceData();
  const allElements = [
    ...Object.values(elementsTerms.terms || {}),
    ...Object.values(elementsPrinciples.principles || {}),
    ...Object.values(elementsRules.rules || {}),
    ...Object.values(elementsMetarules.metaRules || {})
  ];
  
  const references: ElementReference[] = [];
  let patterns: string[] = [];
  let variations: string[] = [];
  
  // Find all references to this element
  allElements.forEach(element => {
    // Get the current version of the element
    const currentVersionData = (element.versions as any)?.[element.currentVersion] || {};
    
    // Check in definition
    if (currentVersionData.definition && currentVersionData.definition.includes(elementId)) {
      references.push({
        id: element.id,
        name: element.name,
        type: element.type || 'unknown',
        context: currentVersionData.definition.substring(0, 100) + '...',
        relationship: 'definition'
      });
    }
    
    // Check in statement (for principles)
    if (currentVersionData.statement && currentVersionData.statement.includes(elementId)) {
      references.push({
        id: element.id,
        name: element.name,
        type: element.type || 'unknown',
        context: currentVersionData.statement.substring(0, 100) + '...',
        relationship: 'statement'
      });
    }
    
    // Check in requirements (for rules)
    if (currentVersionData.keyRequirements) {
      currentVersionData.keyRequirements.forEach((req: string) => {
        if (req.includes(elementId)) {
          references.push({
            id: element.id,
            name: element.name,
            type: element.type || 'unknown',
            context: req,
            relationship: 'requirement'
          });
        }
      });
    }
    
    // Check in term dependencies
    if (currentVersionData.termDependencies) {
      Object.keys(currentVersionData.termDependencies).forEach(depKey => {
        if (depKey === elementId || currentVersionData.termDependencies[depKey] === elementId) {
          references.push({
            id: element.id,
            name: element.name,
            type: element.type || 'unknown',
            context: `Term dependency: ${depKey}`,
            relationship: 'dependency'
          });
        }
      });
    }
  });
  
  // Calculate consistency score (simplified)
  const consistencyScore = references.length > 0 ? 
    Math.min(95, 60 + (references.length * 5)) : 0;
  
  // Identify common patterns
  patterns = Array.from(new Set(references.map(ref => ref.relationship)));
  
  // Identify context variations
  variations = references.length > 1 ? 
    ['formal-definition', 'practical-application', 'requirement-context'] : [];
  
  return {
    elementId,
    elementName: elementId, // Will be resolved from actual element
    totalReferences: references.length,
    referencingElements: references,
    consistencyScore,
    commonPatterns: patterns,
    contextVariations: variations
  };
}

// Helper function to extract branch philosophy
async function extractBranchPhilosophy(branchId: string): Promise<BranchPhilosophy> {
  const branch = await loadBranchData(branchId);
  
  // Extract philosophy from branch data
  const philosophy = branch.description || '';
  const principles = branch.customPrinciples || [];
  const priorities = branch.valuePriorities || [];
  
  // Determine philosophical approach based on branch type
  let approach = 'balanced';
  if (branchId.includes('animal-welfare')) {
    approach = 'sentience-focused ethics';
  } else if (branchId.includes('environmental')) {
    approach = 'ecological sustainability';
  } else if (branchId.includes('music-industry')) {
    approach = 'practical implementation';
  }
  
  return {
    branchId,
    branchName: branch.name,
    corePhilosophy: philosophy,
    keyPrinciples: principles,
    valuePriorities: priorities,
    philosophicalApproach: approach,
    inheritedFrom: branch.inheritance?.from,
    customizations: branch.inheritance?.overrides || []
  };
}

// Helper function to get element usage count
async function getElementUsageCount(elementId: string, branchId: string): Promise<number> {
  const usage = await analyzeElementUsage(elementId, branchId);
  return usage.totalReferences;
}

// MCP Tool 1: Get Branch Elements
export const getBranchElementsTool = tool({
  description: 'Get governance elements for a specific branch and type',
  parameters: z.object({
    branchId: z.string().describe('Branch ID to get elements from'),
    elementType: z.enum(['term', 'principle', 'rule', 'metarule']).optional().describe('Filter by element type'),
  }),
  execute: async ({ branchId, elementType }) => {
    try {
      // Load branch data and resolve inheritance
      const branch = await loadBranchData(branchId);
      const elements = await resolveInheritedElements(branchId, elementType);
      
      // Transform to element summaries
      const elementSummaries: ElementSummary[] = await Promise.all(elements.map(async el => {
        const currentVersionData = el.versions?.[el.currentVersion] || {};
        return {
          id: el.id,
          name: el.name,
          version: el.currentVersion || '1.0.0',
          type: el.type,
          usage: await getElementUsageCount(el.id, branchId),
          lastModified: currentVersionData.ratifiedAt || currentVersionData.createdAt
        };
      }));
      
      const result: BranchInfo = {
        branchId,
        branchName: branch.name,
        branchType: branch.type || 'governance',
        parentBranch: branch.inheritance?.from,
        customizations: branch.inheritance || {},
        elementCount: elementSummaries.length,
        elements: elementSummaries
      };
      
      return result;
    } catch (error: any) {
      throw new Error(`Failed to get branch elements: ${error.message}`);
    }
  },
});

// MCP Tool 2: Get Element Usage Analysis
export const getElementUsageTool = tool({
  description: 'Analyze how an element is used across governance documents',
  parameters: z.object({
    elementId: z.string().describe('Element ID to analyze usage for'),
    branchId: z.string().describe('Branch context for analysis'),
  }),
  execute: async ({ elementId, branchId }) => {
    try {
      const usage = await analyzeElementUsage(elementId, branchId);
      
      // Find the actual element name
      const { elementsTerms, elementsPrinciples, elementsRules, elementsMetarules } = await loadGovernanceData();
      const allElements = [
        ...Object.values(elementsTerms.terms || {}),
        ...Object.values(elementsPrinciples.principles || {}),
        ...Object.values(elementsRules.rules || {}),
        ...Object.values(elementsMetarules.metaRules || {})
      ];
      
      const element = allElements.find(el => el.id === elementId);
      if (element) {
        usage.elementName = element.name;
      }
      
      return usage;
    } catch (error: any) {
      throw new Error(`Failed to analyze element usage: ${error.message}`);
    }
  },
});

// MCP Tool 3: Get Branch Philosophy
export const getBranchPhilosophyTool = tool({
  description: 'Get the philosophical foundation and principles for a branch',
  parameters: z.object({
    branchId: z.string().describe('Branch ID to get philosophy for'),
  }),
  execute: async ({ branchId }) => {
    try {
      const philosophy = await extractBranchPhilosophy(branchId);
      return philosophy;
    } catch (error: any) {
      throw new Error(`Failed to get branch philosophy: ${error.message}`);
    }
  },
});

// Additional helper tool for element version resolution
export const getElementVersionTool = tool({
  description: 'Get specific version of an element with full details',
  parameters: z.object({
    elementId: z.string().describe('Element ID to get'),
    branchId: z.string().describe('Branch context for version resolution'),
    version: z.string().optional().describe('Specific version to get (defaults to latest)'),
  }),
  execute: async ({ elementId, branchId, version }) => {
    try {
      const { elementsTerms, elementsPrinciples, elementsRules, elementsMetarules } = await loadGovernanceData();
      const allElements = [
        ...Object.values(elementsTerms.terms || {}),
        ...Object.values(elementsPrinciples.principles || {}),
        ...Object.values(elementsRules.rules || {}),
        ...Object.values(elementsMetarules.metaRules || {})
      ];
      
      let element = allElements.find(el => el.id === elementId);
      
      if (!element) {
        throw new Error(`Element ${elementId} not found`);
      }
      
      // If specific version requested, try to find it
      if (version && element.currentVersion !== version) {
        // Check if the requested version exists in the element's versions
        if (element.versions && (element.versions as any)[version]) {
          // Version exists, element can be used with that version
          // In a full implementation, you'd modify the element data accordingly
        }
      }
      
      return {
        ...element,
        branchContext: branchId,
        usage: await getElementUsageCount(elementId, branchId)
      };
    } catch (error: any) {
      throw new Error(`Failed to get element version: ${error.message}`);
    }
  },
});

// Export all tools as an object for easy import
export const mcpAnalysisTools = {
  getBranchElements: getBranchElementsTool,
  getElementUsage: getElementUsageTool,
  getBranchPhilosophy: getBranchPhilosophyTool,
  getElementVersion: getElementVersionTool
};