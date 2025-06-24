// AI Service Types for DAHAO Real Claude Integration
// Comprehensive type definitions for agent analysis tracking with dynamic context

import { UserValueContext } from '../utils/user-values';
import { SystemValueContext } from '../utils/system-values';

export interface AgentAnalysis {
  id: string;

  // WHO requested the analysis (enhanced with dynamic context)
  requestedBy: {
    userId: string;
    userName: string;
    userBranch: string;
    userValues: string[];
    // Dynamic user context from branch analysis
    userContext?: UserValueContext;
  };

  // WHAT was analyzed
  target: {
    elementType: 'term' | 'principle' | 'rule';
    elementId: string;
    elementName: string;
    elementVersion: string;
    branchId: string;
    branchName: string;
  };

  // WHY it was analyzed
  request: {
    agentType: 'personal' | 'system';
    taskType: string;
    taskDescription: string;
    context?: string;
    discussionId?: string;
    commentId?: string;
  };

  // HOW it was analyzed (enhanced with dynamic baseline tracking)
  execution: {
    agentId: string;
    agentProvider: 'anthropic';
    modelVersion: string;
    temperature: number;
    promptTemplate: string;
    promptTokens: number;
    // For System AI: track which baseline was used
    systemBaseline?: {
      branchId: string;
      branchName: string;
      version: string;
      domainFocus: string[];
    };
    // For Personal AI: track which user values were applied
    personalContext?: {
      valueCount: number;
      modifiedTerms: number;
      personalPrinciples: number;
    };
  };

  // WHEN it happened
  timeline: {
    requestedAt: string;
    startedAt: string;
    completedAt: string;
    duration: number;
  };

  // WHAT was the result
  result: {
    analysis: string;
    confidence: number;
    recommendations: string[];
    concerns?: string[];
    relatedElements?: string[];
  };

  // COST tracking
  usage: {
    tokenUsage: {
      input: number;
      output: number;
      total: number;
    };
    cost: {
      amount: number;
      currency: 'USD';
      breakdown: {
        inputCost: number;
        outputCost: number;
      };
    };
  };

  // META information
  metadata: {
    version: string;
    visibility: 'public' | 'private' | 'branch-only';
    status: 'pending' | 'completed' | 'failed';
    errorInfo?: string;
    tags?: string[];
  };
}

export interface AnalysisRequest {
  // User context (enhanced with dynamic values)
  user: {
    id: string;
    name: string;
    branch: string;
    values: string[];
    // Optional: override user context for analysis
    contextOverride?: {
      branchId: string;
      extractDynamicValues: boolean;
    };
  };

  // Target element
  governanceItem: {
    type: string;
    id: string;
    name: string;
    version: string;
    data: any;
    // Element's original branch for context determination
    elementBranchId?: string;
  };

  // Task details (enhanced with system baseline preferences)
  task: {
    agentType: 'personal' | 'system';
    taskType: string;
    context?: string;
    discussionId?: string;
    commentId?: string;
    // For System AI: specify which baseline to use (auto-detected if not provided)
    systemBaselinePreference?: 'core' | 'animal-welfare' | 'environmental' | 'music-industry';
  };

  // Branch context
  branch: {
    id: string;
    name: string;
  };
}

export interface PromptContext {
  user: {
    id: string;
    name: string;
    branch: string;
    values: string[];
    // Dynamic user context for Personal AI
    dynamicContext?: UserValueContext;
  };
  element: {
    type: string;
    id: string;
    name: string;
    version: string;
    data: any;
    branchId?: string;
  };
  task: {
    agentType: 'personal' | 'system';
    taskType: string;
    description: string;
    context?: string;
  };
  branch: {
    id: string;
    name: string;
  };
  // Dynamic system context for System AI
  systemContext?: SystemValueContext;
}

export interface AnalysisStorage {
  analyses: Record<string, AgentAnalysis>;
  metadata: {
    version: string;
    lastUpdated: string | null;
    totalAnalyses: number;
    totalCost: number;
  };
}

export interface ClaudeResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AnalysisError {
  code: string;
  message: string;
  details?: any;
}

// Task type definitions for different analysis contexts
export type TaskType = 
  | 'definition-clarity'
  | 'usage-consistency'
  | 'evolution-analysis'
  | 'philosophical-consistency'
  | 'implementation-feasibility'
  | 'cross-domain-impact'
  | 'enforcement-mechanism'
  | 'compliance-framework'
  | 'implementation-requirements'
  | 'general-analysis';

export interface TaskDefinition {
  id: TaskType;
  name: string;
  description: string;
  applicableToElements: ('term' | 'principle' | 'rule')[];
  estimatedTokens: number;
  baseReward: number;
}

// Dynamic Context Management Types

export interface ContextSelectionOptions {
  // User context options
  availableUsers: Array<{
    id: string;
    name: string;
    branchName: string;
    coreValues: string[];
  }>;
  
  // System baseline options
  availableSystemBaselines: Array<{
    key: string;
    name: string;
    branchName: string;
    description: string;
    appropriate: boolean;
    reason?: string;
  }>;
  
  // Current selections
  selectedUserId: string;
  suggestedSystemBaseline: string;
}

export interface AnalysisContextValidation {
  userContext: {
    valid: boolean;
    branchExists: boolean;
    hasValues: boolean;
    valueCount: number;
    warnings?: string[];
  };
  
  systemContext: {
    valid: boolean;
    appropriate: boolean;
    baselineExists: boolean;
    domainMatch: boolean;
    suggestions?: string[];
  };
  
  overall: {
    ready: boolean;
    criticalIssues: string[];
    recommendations: string[];
  };
}

// Enhanced cost estimation with context complexity
export interface ContextAwareCostEstimation {
  baseEstimate: {
    tokens: number;
    cost: number;
  };
  
  personalAIComplexity: {
    userValueTokens: number;
    modifiedTermTokens: number;
    personalPrincipleTokens: number;
    totalAdditionalTokens: number;
    complexityMultiplier: number;
  };
  
  systemAIComplexity: {
    baselineTermTokens: number;
    baselinePrincipleTokens: number;
    complianceRuleTokens: number;
    domainContextTokens: number;
    totalAdditionalTokens: number;
    complexityMultiplier: number;
  };
  
  finalEstimate: {
    tokens: number;
    cost: number;
    confidence: 'low' | 'medium' | 'high';
  };
}