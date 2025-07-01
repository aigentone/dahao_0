// Unified AI Types - Common types for the unified governance AI system

export type UnifiedAIMode = 'chat' | 'analysis' | 'hybrid';
export type ResponseType = 'stream' | 'complete';
export type AgentType = 'personal' | 'system';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface UserContext {
  id: string;
  name: string;
  branch?: string;
  values?: string[];
  contextOverride?: {
    branchId?: string;
    extractDynamicValues?: boolean;
  };
}

export interface BranchContext {
  id: string;
  name: string;
  type?: string;
}

export interface ElementContext {
  id: string;
  name: string;
  type: 'term' | 'principle' | 'rule' | 'metarule';
  version: string;
  data?: any;
  branchId?: string;
}

export interface CustomRule {
  id: string;
  name: string;
  pattern: string;
  parameters?: Record<string, any>;
}

export interface UnifiedAIRequest {
  // Core fields
  mode: UnifiedAIMode;
  responseType?: ResponseType;
  
  // Context (always required)
  user: UserContext;
  branch: BranchContext;
  element?: ElementContext;
  
  // Mode-specific fields
  messages?: ChatMessage[];                    // For chat mode
  taskType?: string;                          // For analysis mode
  agentType?: AgentType;                      // For analysis mode
  taskContext?: string;                       // Additional context
  
  // Advanced options
  enableRules?: boolean;                      // Enable rule detection in chat (default: true)
  forceRule?: string;                         // Force specific rule execution
  customRules?: CustomRule[];                 // Branch-specific rules
  saveAnalysis?: boolean;                     // Save to analysis history
  
  // System options
  maxTokens?: number;
  temperature?: number;
  systemBaselinePreference?: string;          // For system AI
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface CostBreakdown {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: string;
}

export interface AnalysisResult {
  text: string;
  confidence: number;
  recommendations: string[];
  concerns: string[];
}

export interface RuleResult {
  ruleId: string;
  ruleName: string;
  elementId: string;
  branchId: string;
  analysis: string;
  confidence: number;
  metadata: {
    agentType: string;
    parametersUsed: Record<string, any>;
    mcpToolsUsed: string[];
    executionTime: number;
    tokenUsage: TokenUsage;
    cost: CostBreakdown;
  };
  timestamp: string;
}

export interface ToolResult {
  toolName: string;
  result: any;
}

export interface UnifiedAIResponse {
  // Core fields
  mode: UnifiedAIMode;
  id: string;
  timestamp: string;
  
  // Usage and cost
  usage: TokenUsage;
  cost: CostBreakdown;
  
  // Response data (mode-dependent)
  content?: string;                           // For chat responses
  analysis?: AnalysisResult;                  // For structured analysis
  ruleResults?: RuleResult[];                 // If rules were executed
  toolResults?: ToolResult[];                 // If tools were used
  
  // Metadata
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface RuleIntent {
  ruleType: string;
  confidence: number;
  detectedPhrase?: string;
}

// Validation schemas using Zod
import { z } from 'zod';

export const unifiedRequestSchema = z.object({
  mode: z.enum(['chat', 'analysis', 'hybrid']),
  responseType: z.enum(['stream', 'complete']).optional(),
  
  user: z.object({
    id: z.string(),
    name: z.string(),
    branch: z.string().optional(),
    values: z.array(z.string()).optional(),
    contextOverride: z.object({
      branchId: z.string().optional(),
      extractDynamicValues: z.boolean().optional()
    }).optional()
  }),
  
  branch: z.object({
    id: z.string(),
    name: z.string(),
    type: z.string().optional()
  }),
  
  element: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['term', 'principle', 'rule', 'metarule']),
    version: z.string(),
    data: z.any().optional(),
    branchId: z.string().optional()
  }).optional(),
  
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })).optional(),
  
  taskType: z.string().optional(),
  agentType: z.enum(['personal', 'system']).optional(),
  taskContext: z.string().optional(),
  
  enableRules: z.boolean().optional(),
  forceRule: z.string().optional(),
  customRules: z.array(z.object({
    id: z.string(),
    name: z.string(),
    pattern: z.string(),
    parameters: z.record(z.any()).optional()
  })).optional(),
  
  saveAnalysis: z.boolean().optional(),
  maxTokens: z.number().optional(),
  temperature: z.number().optional(),
  systemBaselinePreference: z.string().optional()
});

// Helper type guards
export function isChatMode(request: UnifiedAIRequest): boolean {
  return request.mode === 'chat';
}

export function isAnalysisMode(request: UnifiedAIRequest): boolean {
  return request.mode === 'analysis';
}

export function isHybridMode(request: UnifiedAIRequest): boolean {
  return request.mode === 'hybrid';
}

export function hasRuleIntent(response: UnifiedAIResponse): boolean {
  return !!response.ruleResults && response.ruleResults.length > 0;
}

export function hasToolResults(response: UnifiedAIResponse): boolean {
  return !!response.toolResults && response.toolResults.length > 0;
}