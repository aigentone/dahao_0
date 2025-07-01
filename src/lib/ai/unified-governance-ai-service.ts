// Unified Governance AI Service
// Combines streaming chat and rule-based analysis capabilities
// Eliminates duplication between GovernanceChatPanel and AgentAssignmentPanel

import { streamText, generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { createStreamableValue } from 'ai/rsc';
import { 
  UnifiedAIRequest, 
  UnifiedAIResponse, 
  UnifiedAIMode,
  RuleIntent,
  ChatMessage,
  TokenUsage,
  CostBreakdown
} from './unified-types';
import { RuleInterpreter } from '../governance/rule-interpreter';
import { GovernanceToolExecutor } from '../governance/tool-executor';
import { mapTaskTypeToRule, RuleContext } from '../governance/types';
import { getUserValuesFromBranch } from '../utils/user-values';
import { getSystemValuesForContext } from '../utils/system-values';
import { saveAnalysis } from './json-storage';
import { z } from 'zod';

// Rule detection patterns for natural language
const RULE_PATTERNS: Record<string, RegExp> = {
  'definition-clarity': /check clarity|clarity review|how clear|is.*clear|definition.*clear/i,
  'usage-consistency': /check consistency|usage check|consistently used|consistency.*check/i,
  'evolution-analysis': /evolution|historical changes|version history|how.*changed/i,
  'philosophical-consistency': /philosophical alignment|philosophy check|align.*philosophy/i,
  'implementation-feasibility': /feasibility|can this be implemented|practical.*implement/i,
  'cross-domain-impact': /impact assessment|cross-domain|affect.*other|impact.*on/i,
  'enforcement-mechanism': /enforcement|how enforced|enforce.*mechanism/i,
  'compliance-framework': /compliance check|framework integration|comply.*with/i,
  'implementation-requirements': /requirements|what's needed|need.*implement/i,
  'general-analysis': /analyze this|general analysis|comprehensive.*review/i
};

export class UnifiedGovernanceAIService {
  private ruleInterpreter: RuleInterpreter;
  private toolExecutor: GovernanceToolExecutor;
  private model: string;
  private temperature: number;

  constructor(
    model: string = 'claude-3-5-sonnet-20241022',
    temperature: number = 0.7
  ) {
    this.ruleInterpreter = new RuleInterpreter();
    this.toolExecutor = new GovernanceToolExecutor();
    this.model = model;
    this.temperature = temperature;
  }

  /**
   * Main entry point for all AI requests
   */
  async processRequest(request: UnifiedAIRequest): Promise<UnifiedAIResponse> {
    const startTime = Date.now();
    
    // Validate request
    this.validateRequest(request);
    
    // Detect rule intent if in chat mode with rule detection enabled
    let ruleIntent: RuleIntent | null = null;
    if (request.mode === 'chat' && request.enableRules !== false) {
      ruleIntent = this.detectRuleIntent(request);
    }
    
    // Force rule if specified
    if (request.forceRule) {
      ruleIntent = {
        ruleType: request.forceRule,
        confidence: 1.0
      };
    }
    
    // Process based on mode and detected intent
    let response: UnifiedAIResponse;
    
    if (ruleIntent && ruleIntent.confidence > 0.7) {
      // Execute rule (even in chat mode)
      response = await this.executeRuleWithResponse(request, ruleIntent);
    } else {
      // Normal processing based on mode
      switch (request.mode) {
        case 'chat':
          response = await this.handleChatMode(request);
          break;
        case 'analysis':
          response = await this.handleAnalysisMode(request);
          break;
        case 'hybrid':
          response = await this.handleHybridMode(request);
          break;
        default:
          throw new Error(`Unknown mode: ${request.mode}`);
      }
    }
    
    // Add timing metadata
    response.metadata = {
      ...response.metadata,
      processingTime: Date.now() - startTime
    };
    
    return response;
  }

  /**
   * Stream response for real-time chat interactions
   */
  async streamResponse(request: UnifiedAIRequest): Promise<ReadableStream> {
    // Detect rule intent
    const ruleIntent = request.enableRules !== false ? 
      this.detectRuleIntent(request) : null;
    
    if (ruleIntent && ruleIntent.confidence > 0.7) {
      // Execute rule and stream the result
      return this.streamRuleExecution(request, ruleIntent);
    }
    
    // Normal streaming chat
    return this.streamChat(request);
  }

  /**
   * Detect if a chat message contains a rule execution intent
   */
  private detectRuleIntent(request: UnifiedAIRequest): RuleIntent | null {
    if (!request.messages || request.messages.length === 0) {
      return null;
    }
    
    // Get the last user message
    const lastMessage = request.messages[request.messages.length - 1];
    if (lastMessage.role !== 'user') {
      return null;
    }
    
    const content = lastMessage.content.toLowerCase();
    
    // Check against all rule patterns
    for (const [ruleType, pattern] of Object.entries(RULE_PATTERNS)) {
      if (pattern.test(content)) {
        // Calculate confidence based on match strength
        const matches = content.match(pattern);
        const confidence = matches && matches[0].length > 10 ? 0.9 : 0.8;
        
        return {
          ruleType,
          confidence,
          detectedPhrase: matches?.[0] || ''
        };
      }
    }
    
    return null;
  }

  /**
   * Handle chat mode with optional tool usage
   */
  private async handleChatMode(request: UnifiedAIRequest): Promise<UnifiedAIResponse> {
    const systemPrompt = this.buildChatSystemPrompt(request);
    const tools = this.createGovernanceTools();
    
    const result = await generateText({
      model: anthropic(this.model),
      messages: [
        { role: 'system', content: systemPrompt },
        ...request.messages!
      ],
      tools,
      toolChoice: 'auto',
      temperature: this.temperature,
      maxTokens: 4096
    });
    
    // Calculate costs
    const usage = this.calculateUsage(result.usage);
    const cost = this.calculateCost(usage);
    
    return {
      mode: 'chat',
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      content: result.text,
      toolResults: result.toolCalls?.map(tc => ({
        toolName: tc.toolName,
        result: tc.result
      })),
      usage,
      cost,
      confidence: undefined,
      metadata: {
        finishReason: result.finishReason,
        model: this.model
      }
    };
  }

  /**
   * Handle analysis mode with rule execution
   */
  private async handleAnalysisMode(request: UnifiedAIRequest): Promise<UnifiedAIResponse> {
    const ruleId = mapTaskTypeToRule(request.taskType!);
    const ruleContext = this.buildRuleContext(request);
    
    // Execute rule
    const ruleResult = await this.ruleInterpreter.interpretRule(ruleId, ruleContext);
    
    // Save analysis if requested
    if (request.saveAnalysis) {
      await this.saveAsAgentAnalysis(request, ruleResult);
    }
    
    // Format response
    return {
      mode: 'analysis',
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      analysis: {
        text: ruleResult.analysis,
        confidence: ruleResult.confidence,
        recommendations: this.extractRecommendations(ruleResult.analysis),
        concerns: this.extractConcerns(ruleResult.analysis)
      },
      ruleResults: [ruleResult],
      usage: ruleResult.metadata.tokenUsage,
      cost: ruleResult.metadata.cost,
      confidence: ruleResult.confidence,
      metadata: {
        ruleId: ruleResult.ruleId,
        ruleName: ruleResult.ruleName,
        executionTime: ruleResult.metadata.executionTime,
        agentType: request.agentType
      }
    };
  }

  /**
   * Handle hybrid mode - conversational with structured analysis
   */
  private async handleHybridMode(request: UnifiedAIRequest): Promise<UnifiedAIResponse> {
    // First, get conversational response
    const chatResponse = await this.handleChatMode(request);
    
    // Then, if a task type is specified, run analysis
    if (request.taskType) {
      const analysisResponse = await this.handleAnalysisMode(request);
      
      // Combine responses
      return {
        ...chatResponse,
        mode: 'hybrid',
        analysis: analysisResponse.analysis,
        ruleResults: analysisResponse.ruleResults,
        content: `${chatResponse.content}\n\n---\n\n## Detailed Analysis\n\n${analysisResponse.analysis?.text}`
      };
    }
    
    return { ...chatResponse, mode: 'hybrid' };
  }

  /**
   * Execute a rule and format for chat response
   */
  private async executeRuleWithResponse(
    request: UnifiedAIRequest, 
    ruleIntent: RuleIntent
  ): Promise<UnifiedAIResponse> {
    // Map detected rule type to task type
    const taskType = ruleIntent.ruleType;
    
    // Build analysis request
    const analysisRequest = {
      ...request,
      mode: 'analysis' as UnifiedAIMode,
      taskType
    };
    
    // Execute rule
    const analysisResponse = await this.handleAnalysisMode(analysisRequest);
    
    // Format for chat if original mode was chat
    if (request.mode === 'chat') {
      const chatIntro = this.getRuleChatIntro(ruleIntent);
      return {
        ...analysisResponse,
        mode: 'chat',
        content: `${chatIntro}\n\n${analysisResponse.analysis?.text}`,
        metadata: {
          ...analysisResponse.metadata,
          detectedRule: ruleIntent.ruleType,
          ruleConfidence: ruleIntent.confidence
        }
      };
    }
    
    return analysisResponse;
  }

  /**
   * Stream chat responses with tool support
   */
  private async streamChat(request: UnifiedAIRequest): Promise<ReadableStream> {
    const systemPrompt = this.buildChatSystemPrompt(request);
    const tools = this.createGovernanceTools();
    
    const result = await streamText({
      model: anthropic(this.model),
      messages: [
        { role: 'system', content: systemPrompt },
        ...request.messages!
      ],
      tools,
      toolChoice: 'auto',
      temperature: this.temperature,
      maxTokens: 4096
    });
    
    return result.toDataStream();
  }

  /**
   * Stream rule execution results
   */
  private async streamRuleExecution(
    request: UnifiedAIRequest,
    ruleIntent: RuleIntent
  ): Promise<ReadableStream> {
    const stream = createStreamableValue<string>();
    
    // Execute rule in background
    (async () => {
      try {
        // Send intro
        const intro = this.getRuleChatIntro(ruleIntent);
        stream.update(intro + '\n\n');
        
        // Execute rule
        const response = await this.executeRuleWithResponse(request, ruleIntent);
        
        // Stream the analysis
        if (response.analysis?.text) {
          // Simulate streaming by chunking the response
          const chunks = this.chunkText(response.analysis.text, 50);
          for (const chunk of chunks) {
            stream.update(chunk);
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
        
        stream.done();
      } catch (error) {
        stream.error(error as Error);
      }
    })();
    
    return stream.value;
  }

  /**
   * Build system prompt for chat mode
   */
  private buildChatSystemPrompt(request: UnifiedAIRequest): string {
    const { element, branch, user } = request;
    
    return `You are a helpful governance assistant for the DAHAO platform. 
You help users understand and explore governance elements within their branch context.

${element ? `Current Focus: "${element.name}" ${element.type} (v${element.version})` : ''}
${branch ? `Branch: ${branch.name}` : ''}
${user ? `User: ${user.name} with values: ${user.values?.join(', ')}` : ''}

Provide helpful, context-aware responses. Use available tools when they would add value.
${request.enableRules !== false ? 'If the user asks for specific analysis (clarity check, consistency review, etc.), mention that you\'re running the appropriate analysis.' : ''}`;
  }

  /**
   * Build rule context from unified request
   */
  private buildRuleContext(request: UnifiedAIRequest): RuleContext {
    const userContext = request.user.contextOverride?.extractDynamicValues ?
      getUserValuesFromBranch(request.user.id, request.user.contextOverride.branchId) :
      undefined;
    
    const systemContext = request.agentType === 'system' ?
      getSystemValuesForContext(
        request.element?.branchId || request.branch.id,
        request.element?.type || 'term',
        request.element?.id || ''
      ) : undefined;
    
    return {
      element: {
        id: request.element?.id || '',
        name: request.element?.name || '',
        type: request.element?.type || 'term',
        version: request.element?.version || '1.0.0',
        data: request.element?.data || {},
        branchId: request.element?.branchId || request.branch.id
      },
      branch: {
        id: request.branch.id,
        name: request.branch.name,
        type: 'governance'
      },
      user: {
        id: request.user.id,
        name: request.user.name,
        branch: request.user.branch || request.branch.id,
        dynamicContext: userContext
      },
      task: {
        taskType: request.taskType!,
        agentType: request.agentType || 'personal',
        context: request.taskContext || ''
      },
      systemContext
    };
  }

  /**
   * Create governance tools for chat mode
   */
  private createGovernanceTools() {
    return {
      getBranchElements: {
        description: 'Get governance elements from a specific branch',
        parameters: z.object({
          branchId: z.string(),
          elementType: z.enum(['term', 'principle', 'rule']).optional()
        }),
        execute: async (params: any) => {
          const results = await this.toolExecutor.executeTools(
            ['getBranchElements'], 
            { branch: { id: params.branchId }, element: { type: params.elementType } } as any
          );
          return results.getBranchElements;
        }
      },
      getElementUsage: {
        description: 'Get usage information for a governance element',
        parameters: z.object({
          elementId: z.string(),
          branchId: z.string()
        }),
        execute: async (params: any) => {
          const results = await this.toolExecutor.executeTools(
            ['getElementUsage'],
            { element: { id: params.elementId }, branch: { id: params.branchId } } as any
          );
          return results.getElementUsage;
        }
      },
      getBranchPhilosophy: {
        description: 'Get philosophical foundation of a branch',
        parameters: z.object({
          branchId: z.string()
        }),
        execute: async (params: any) => {
          const results = await this.toolExecutor.executeTools(
            ['getBranchPhilosophy'],
            { branch: { id: params.branchId } } as any
          );
          return results.getBranchPhilosophy;
        }
      },
      compareElements: {
        description: 'Compare element across branches',
        parameters: z.object({
          elementId: z.string(),
          branchIds: z.array(z.string())
        }),
        execute: async (params: any) => {
          // Execute for each branch
          const comparisons = await Promise.all(
            params.branchIds.map(async (branchId: string) => {
              const results = await this.toolExecutor.executeTools(
                ['getBranchElements', 'getElementUsage'],
                { element: { id: params.elementId }, branch: { id: branchId } } as any
              );
              return { branchId, ...results };
            })
          );
          return { comparisons };
        }
      }
    };
  }

  /**
   * Helper: Get chat introduction for detected rule
   */
  private getRuleChatIntro(ruleIntent: RuleIntent): string {
    const intros: Record<string, string> = {
      'definition-clarity': '🔍 I\'ll analyze the clarity of this definition for you:',
      'usage-consistency': '🔄 Let me check the consistency of usage across the governance system:',
      'evolution-analysis': '📈 I\'ll examine the historical evolution and changes:',
      'philosophical-consistency': '🧭 Let me verify the philosophical alignment:',
      'implementation-feasibility': '⚙️ I\'ll assess the implementation feasibility:',
      'cross-domain-impact': '🌐 Let me analyze the cross-domain impact:',
      'enforcement-mechanism': '⚖️ I\'ll review the enforcement mechanisms:',
      'compliance-framework': '📋 Let me check the compliance framework integration:',
      'implementation-requirements': '📝 I\'ll detail the implementation requirements:',
      'general-analysis': '📊 Here\'s a comprehensive analysis:'
    };
    
    return intros[ruleIntent.ruleType] || '🤖 Running analysis...';
  }

  /**
   * Helper: Calculate token usage
   */
  private calculateUsage(rawUsage: any): TokenUsage {
    return {
      promptTokens: rawUsage?.promptTokens || 0,
      completionTokens: rawUsage?.completionTokens || 0,
      totalTokens: rawUsage?.totalTokens || 0
    };
  }

  /**
   * Helper: Calculate costs
   */
  private calculateCost(usage: TokenUsage): CostBreakdown {
    const INPUT_COST_PER_1K = 0.003;
    const OUTPUT_COST_PER_1K = 0.015;
    
    const inputCost = (usage.promptTokens / 1000) * INPUT_COST_PER_1K;
    const outputCost = (usage.completionTokens / 1000) * OUTPUT_COST_PER_1K;
    
    return {
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
      currency: 'USD'
    };
  }

  /**
   * Helper: Extract recommendations from analysis
   */
  private extractRecommendations(analysis: string): string[] {
    const recommendations: string[] = [];
    const lines = analysis.split('\n');
    
    let inRecommendations = false;
    for (const line of lines) {
      if (line.toLowerCase().includes('recommendation') || line.includes('suggest')) {
        inRecommendations = true;
      }
      if (inRecommendations && line.trim().startsWith('•') || line.trim().startsWith('-')) {
        recommendations.push(line.trim().substring(1).trim());
      }
    }
    
    return recommendations;
  }

  /**
   * Helper: Extract concerns from analysis
   */
  private extractConcerns(analysis: string): string[] {
    const concerns: string[] = [];
    const lines = analysis.split('\n');
    
    let inConcerns = false;
    for (const line of lines) {
      if (line.toLowerCase().includes('concern') || line.includes('issue')) {
        inConcerns = true;
      }
      if (inConcerns && line.trim().startsWith('•') || line.trim().startsWith('-')) {
        concerns.push(line.trim().substring(1).trim());
      }
    }
    
    return concerns;
  }

  /**
   * Helper: Chunk text for streaming simulation
   */
  private chunkText(text: string, chunkSize: number): string[] {
    const words = text.split(' ');
    const chunks: string[] = [];
    
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' ') + ' ');
    }
    
    return chunks;
  }

  /**
   * Helper: Generate unique ID
   */
  private generateId(): string {
    return `unified-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Helper: Validate request
   */
  private validateRequest(request: UnifiedAIRequest): void {
    if (!request.mode) {
      throw new Error('Request mode is required');
    }
    
    if (request.mode === 'chat' && (!request.messages || request.messages.length === 0)) {
      throw new Error('Messages are required for chat mode');
    }
    
    if (request.mode === 'analysis' && !request.taskType) {
      throw new Error('Task type is required for analysis mode');
    }
    
    if (!request.user || !request.branch) {
      throw new Error('User and branch context are required');
    }
  }

  /**
   * Helper: Save as agent analysis for compatibility
   */
  private async saveAsAgentAnalysis(request: UnifiedAIRequest, ruleResult: any): Promise<void> {
    const agentAnalysis = {
      id: this.generateId(),
      requestedBy: {
        userId: request.user.id,
        userName: request.user.name,
        userBranch: request.user.branch || request.branch.id,
        userValues: request.user.values || []
      },
      target: {
        elementId: request.element?.id,
        elementName: request.element?.name,
        elementType: request.element?.type,
        elementVersion: request.element?.version
      },
      request: {
        taskType: request.taskType!,
        agentType: request.agentType || 'personal',
        context: request.taskContext || ''
      },
      result: {
        analysis: ruleResult.analysis,
        confidence: ruleResult.confidence,
        recommendations: this.extractRecommendations(ruleResult.analysis),
        concerns: this.extractConcerns(ruleResult.analysis)
      },
      usage: {
        model: this.model,
        tokenUsage: ruleResult.metadata.tokenUsage,
        cost: ruleResult.metadata.cost
      },
      timeline: {
        requestedAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        duration: ruleResult.metadata.executionTime
      }
    };
    
    await saveAnalysis(agentAnalysis as any);
  }
}

// Export singleton instance for convenience
export const unifiedAIService = new UnifiedGovernanceAIService();