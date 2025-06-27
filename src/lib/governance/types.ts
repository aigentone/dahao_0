// Type definitions for DAHAO Rules as Instructions system
// Integration with existing AI analysis types while adding rule-based capabilities

// Core rule system types
export interface Rule {
  name: string;
  description: string;
  version: string;
  instruction: string;
  parameters: RuleParameters;
  outputTemplates: {
    personal: string;
    system: string;
  };
  dependencies: string[];
  mcp_tools: string[];
}

export interface RuleParameters {
  [key: string]: {
    default: any;
    type: string;
    description: string;
    branchOverrides?: { [branchId: string]: any };
  };
}

// Context for rule execution
export interface RuleContext {
  // Element being analyzed
  element: {
    id: string;
    name: string;
    type: 'term' | 'principle' | 'rule' | 'metarule';
    version: string;
    data: any;
    branchId?: string;
  };
  
  // Branch context
  branch: {
    id: string;
    name: string;
    type: string;
  };
  
  // User context
  user: {
    id: string;
    name: string;
    branch: string;
    dynamicContext?: any;
  };
  
  // Task context
  task: {
    taskType: string;
    agentType: 'personal' | 'system';
    context?: string;
  };
  
  // System context for baseline validation
  systemContext?: any;
}

// Result of rule interpretation
export interface RuleResult {
  // Core result data
  ruleId: string;
  ruleName: string;
  elementId: string;
  branchId: string;
  
  // Analysis content
  analysis: string;
  confidence: number;
  
  // Metadata
  metadata: {
    agentType: 'personal' | 'system';
    parametersUsed: { [key: string]: any };
    mcpToolsUsed: string[];
    executionTime: number;
    tokenUsage: {
      input: number;
      output: number;
      total: number;
    };
    cost: {
      input: number;
      output: number;
      total: number;
    };
  };
  
  // Timestamp
  timestamp: string;
}

// Rule loading and caching
export interface RuleLoader {
  loadRule(ruleId: string): Promise<Rule>;
  loadAllRules(): Promise<{ [ruleId: string]: Rule }>;
  invalidateCache(): void;
}

// Parameter resolution
export interface ParameterResolver {
  resolveParameters(
    rule: Rule, 
    branchId: string, 
    agentType: 'personal' | 'system'
  ): { [key: string]: any };
}

// Template processing
export interface TemplateProcessor {
  getOutputTemplate(
    rule: Rule, 
    agentType: 'personal' | 'system', 
    context: RuleContext
  ): string;
  
  substituteParameters(
    template: string, 
    parameters: { [key: string]: any }, 
    context: RuleContext
  ): string;
}

// MCP tool integration
export interface MCPToolExecutor {
  executeTools(
    toolNames: string[], 
    context: RuleContext
  ): Promise<{ [toolName: string]: any }>;
}

// Rule interpreter interface
export interface IRuleInterpreter {
  interpretRule(ruleId: string, context: RuleContext): Promise<RuleResult>;
  convertToAnalysis(result: RuleResult): any; // Convert to existing AgentAnalysis format
}

// Task type to rule mapping
export const TASK_TYPE_TO_RULE_MAPPING: { [taskType: string]: string } = {
  'definition-clarity': 'definition-clarity-rule',
  'usage-consistency': 'usage-consistency-rule', 
  'evolution-analysis': 'evolution-analysis-rule',
  'philosophical-consistency': 'philosophical-consistency-rule',
  'implementation-feasibility': 'implementation-feasibility-rule',
  'cross-domain-impact': 'cross-domain-impact-rule',
  'enforcement-mechanism': 'enforcement-mechanism-rule',
  'compliance-framework': 'compliance-framework-rule',
  'implementation-requirements': 'implementation-requirements-rule',
  'general-analysis': 'general-analysis-rule'
};

// Validation utilities
export function isValidRuleId(ruleId: string): boolean {
  const validRuleIds = Object.values(TASK_TYPE_TO_RULE_MAPPING);
  return validRuleIds.includes(ruleId);
}

export function mapTaskTypeToRule(taskType: string): string {
  return TASK_TYPE_TO_RULE_MAPPING[taskType] || 'general-analysis-rule';
}

// Error types
export class RuleNotFoundError extends Error {
  constructor(ruleId: string) {
    super(`Rule not found: ${ruleId}`);
    this.name = 'RuleNotFoundError';
  }
}

export class RuleExecutionError extends Error {
  constructor(ruleId: string, cause: string) {
    super(`Rule execution failed for ${ruleId}: ${cause}`);
    this.name = 'RuleExecutionError';
  }
}

export class MCPToolError extends Error {
  constructor(toolName: string, cause: string) {
    super(`MCP tool execution failed for ${toolName}: ${cause}`);
    this.name = 'MCPToolError';
  }
}