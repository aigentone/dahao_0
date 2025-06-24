// AI Service Types for DAHAO Real Claude Integration
// Comprehensive type definitions for agent analysis tracking

export interface AgentAnalysis {
  id: string;

  // WHO requested the analysis
  requestedBy: {
    userId: string;
    userName: string;
    userBranch: string;
    userValues: string[];
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
  };

  // HOW it was analyzed
  execution: {
    agentId: string;
    agentProvider: 'anthropic';
    modelVersion: string;
    temperature: number;
    promptTemplate: string;
    promptTokens: number;
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
  // User context
  user: {
    id: string;
    name: string;
    branch: string;
    values: string[];
  };

  // Target element
  governanceItem: {
    type: string;
    id: string;
    name: string;
    version: string;
    data: any;
  };

  // Task details
  task: {
    agentType: 'personal' | 'system';
    taskType: string;
    context?: string;
    discussionId?: string;
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
  };
  element: {
    type: string;
    id: string;
    name: string;
    version: string;
    data: any;
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