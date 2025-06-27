// Enhanced Claude Service with Rules as Instructions Integration
// Maintains exact same API as ClaudeService while using rule interpreter internally
// Zero breaking changes migration approach

import { ClaudeService } from './claude-service';
import { AnalysisRequest, AgentAnalysis } from './types';
import { createRuleInterpreter } from '../governance/rule-interpreter';
import { RuleContext, mapTaskTypeToRule } from '../governance/types';
import { getUserValuesFromBranch } from '../utils/user-values';
import { getSystemValuesForContext } from '../utils/system-values';

export class EnhancedClaudeService extends ClaudeService {
  private ruleInterpreter: any;
  private useRuleBasedAnalysis: boolean;

  constructor(model: string = 'claude-3-5-sonnet-20241022', temperature: number = 0.7) {
    super(model, temperature);
    this.ruleInterpreter = createRuleInterpreter();
    // Enable rule-based analysis - can be disabled for fallback
    this.useRuleBasedAnalysis = true;
  }

  /**
   * Override the main analysis method with rule-based implementation
   * Maintains exact same API signature and response format
   */
  async analyzeGovernanceElement(request: AnalysisRequest): Promise<AgentAnalysis> {
    // Try rule-based analysis first (if enabled)
    if (this.useRuleBasedAnalysis) {
      try {
        return await this.analyzeWithRules(request);
      } catch (ruleError: any) {
        // Fall back to legacy prompt-based analysis
        console.warn(`Rule-based analysis failed, falling back to legacy: ${ruleError.message}`);
      }
    }

    // Fall back to parent class implementation (legacy)
    return super.analyzeGovernanceElement(request);
  }

  /**
   * Rule-based analysis using Rules as Instructions architecture
   */
  private async analyzeWithRules(request: AnalysisRequest): Promise<AgentAnalysis> {
    const startTime = Date.now();

    // Extract dynamic context based on request  
    const userContext = request.user.contextOverride?.extractDynamicValues ? 
      getUserValuesFromBranch(request.user.id, request.user.contextOverride.branchId) :
      undefined;

    const systemContext = request.task.agentType === 'system' ? 
      getSystemValuesForContext(
        request.governanceItem.elementBranchId || request.branch.id,
        request.governanceItem.type,
        request.governanceItem.id
      ) : undefined;

    // Build rule context
    const ruleContext: RuleContext = {
      element: {
        id: request.governanceItem.id,
        name: request.governanceItem.name,
        type: request.governanceItem.type as 'term' | 'principle' | 'rule' | 'metarule',
        version: request.governanceItem.version,
        data: request.governanceItem.data,
        branchId: request.governanceItem.elementBranchId
      },
      branch: {
        id: request.branch.id,
        name: request.branch.name,
        type: 'governance' // Default type since branch doesn't have type property
      },
      user: {
        id: request.user.id,
        name: request.user.name,
        branch: request.user.branch,
        dynamicContext: userContext
      },
      task: {
        taskType: request.task.taskType,
        agentType: request.task.agentType,
        context: request.task.context
      },
      systemContext: systemContext
    };

    // Map task type to rule ID
    const ruleId = mapTaskTypeToRule(request.task.taskType);

    // Execute rule interpretation
    const ruleResult = await this.ruleInterpreter.interpretRule(ruleId, ruleContext);

    // Convert to exact AgentAnalysis format (zero breaking changes)
    const agentAnalysis: AgentAnalysis = {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      requestedBy: {
        userId: request.user.id,
        userName: request.user.name,
        userBranch: request.user.branch,
        userValues: request.user.values,
        userContext: userContext
      },
      target: {
        elementType: request.governanceItem.type as 'term' | 'principle' | 'rule',
        elementId: request.governanceItem.id,
        elementName: request.governanceItem.name,
        elementVersion: request.governanceItem.version,
        branchId: request.branch.id,
        branchName: request.branch.name
      },
      request: {
        agentType: request.task.agentType,
        taskType: request.task.taskType,
        taskDescription: request.task.context || `Analyze ${request.governanceItem.type}`,
        context: request.task.context,
        discussionId: request.task.discussionId,
        commentId: request.task.commentId
      },
      execution: {
        agentId: `${request.task.agentType}-rules-claude-3-5-sonnet`,
        agentProvider: 'anthropic' as const,
        modelVersion: 'claude-3-5-sonnet-20241022',
        temperature: 0.7,
        promptTemplate: `rule-based-${request.task.agentType}`,
        promptTokens: ruleResult.metadata.tokenUsage.input,
        // Track dynamic context used (existing fields)
        systemBaseline: systemContext ? {
          branchId: systemContext.branchId,
          branchName: systemContext.branchName,
          version: systemContext.version,
          domainFocus: systemContext.domainFocus
        } : undefined,
        personalContext: userContext ? {
          valueCount: userContext.coreValues.length,
          modifiedTerms: userContext.valueTerms.length,
          personalPrinciples: userContext.personalPrinciples.length
        } : undefined,
        // Rule-specific metadata (as additional properties)
        ...{
          ruleId: ruleResult.ruleId,
          ruleName: ruleResult.ruleName,
          mcpToolsUsed: ruleResult.metadata.mcpToolsUsed,
          parametersUsed: ruleResult.metadata.parametersUsed
        }
      } as any,
      timeline: {
        requestedAt: new Date(startTime).toISOString(),
        startedAt: new Date(startTime).toISOString(),
        completedAt: ruleResult.timestamp,
        duration: ruleResult.metadata.executionTime
      },
      result: {
        analysis: ruleResult.analysis,
        confidence: ruleResult.confidence,
        recommendations: this.extractRecommendationsFromAnalysis(ruleResult.analysis),
        concerns: this.extractConcernsFromAnalysis(ruleResult.analysis),
        relatedElements: this.extractRelatedElementsFromAnalysis(ruleResult.analysis)
      },
      usage: {
        tokenUsage: {
          input: ruleResult.metadata.tokenUsage.input,
          output: ruleResult.metadata.tokenUsage.output,
          total: ruleResult.metadata.tokenUsage.total
        },
        cost: {
          amount: ruleResult.metadata.cost.total,
          currency: 'USD',
          breakdown: {
            inputCost: ruleResult.metadata.cost.input,
            outputCost: ruleResult.metadata.cost.output
          }
        }
      },
      metadata: {
        version: '2.0', // Updated version to indicate rule-based analysis
        visibility: 'branch-only' as const,
        status: 'completed' as const,
        tags: [request.task.taskType, request.task.agentType, request.governanceItem.type, 'rules-engine'],
        // Rule-specific metadata (as additional properties)
        ...{
          analysisMethod: 'rule-based'
        }
      } as any
    };

    return agentAnalysis;
  }

  /**
   * Extract recommendations from rule-based analysis
   * Uses same logic as parent class but adapted for rule output
   */
  private extractRecommendationsFromAnalysis(analysis: string): string[] {
    const recommendations: string[] = [];
    
    // Look for recommendation sections
    const recSectionRegex = /(?:recommendation|suggest|propose)[s]?[:\s]+(.*?)(?:\n\n|\n(?=[A-Z])|$)/gi;
    let match;
    
    while ((match = recSectionRegex.exec(analysis)) !== null) {
      const content = match[1].trim();
      if (content) {
        const items = content.split(/[-•\d+\.]\s+/).filter((item: string) => item.trim().length > 10);
        recommendations.push(...items.map((item: string) => item.trim()));
      }
    }
    
    return recommendations.slice(0, 5);
  }

  /**
   * Extract concerns from rule-based analysis
   */
  private extractConcernsFromAnalysis(analysis: string): string[] {
    const concerns: string[] = [];
    
    const concernRegex = /(?:concern|issue|problem|risk|warning)[s]?[:\s]+(.*?)(?:\n\n|\n(?=[A-Z])|$)/gi;
    let match;
    
    while ((match = concernRegex.exec(analysis)) !== null) {
      const content = match[1].trim();
      if (content) {
        const items = content.split(/[-•\d+\.]\s+/).filter((item: string) => item.trim().length > 10);
        concerns.push(...items.map((item: string) => item.trim()));
      }
    }
    
    return concerns.slice(0, 3);
  }

  /**
   * Extract related elements from rule-based analysis
   */
  private extractRelatedElementsFromAnalysis(analysis: string): string[] {
    const related: string[] = [];
    
    const elementRegex = /(?:term|principle|rule)[s]?[:\s]+([a-z-]+)/gi;
    let match;
    
    while ((match = elementRegex.exec(analysis)) !== null) {
      const element = match[1].trim();
      if (element && element.length > 3) {
        related.push(element);
      }
    }
    
    const uniqueElements = related.filter((elem, index) => related.indexOf(elem) === index);
    return uniqueElements.slice(0, 5);
  }

  /**
   * Enable/disable rule-based analysis (for testing and fallback)
   */
  setRuleBasedAnalysis(enabled: boolean): void {
    this.useRuleBasedAnalysis = enabled;
  }

  /**
   * Get current analysis method
   */
  getAnalysisMethod(): 'rule-based' | 'prompt-based' {
    return this.useRuleBasedAnalysis ? 'rule-based' : 'prompt-based';
  }

  /**
   * Force cache invalidation for rules
   */
  invalidateRulesCache(): void {
    if (this.ruleInterpreter && this.ruleInterpreter.invalidateCache) {
      this.ruleInterpreter.invalidateCache();
    }
  }
}

// Export enhanced service factory
export function createEnhancedClaudeService(): EnhancedClaudeService {
  return new EnhancedClaudeService();
}

// Export singleton instance for immediate use
export const enhancedClaudeService = new EnhancedClaudeService();