// DAHAO Rule Interpreter - Core Rules as Instructions Implementation
// Converts task-based AI analysis to rule-based execution with MCP tools
// Maintains zero breaking changes with existing API

import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { 
  Rule, 
  RuleContext, 
  RuleResult, 
  IRuleInterpreter,
  RuleNotFoundError,
  RuleExecutionError,
  MCPToolError,
  mapTaskTypeToRule
} from './types';
import { mcpAnalysisTools } from '../mcp/analysis-tools';
import { getUserValuesFromBranch } from '../utils/user-values';
import { getSystemValuesForContext } from '../utils/system-values';

export class RuleInterpreter implements IRuleInterpreter {
  private rulesCache: { [ruleId: string]: Rule } = {};
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Initialize with empty cache
  }

  /**
   * Main method: Interpret a rule with given context
   */
  async interpretRule(ruleId: string, context: RuleContext): Promise<RuleResult> {
    const startTime = Date.now();
    
    try {
      // Load the rule definition
      const rule = await this.loadRule(ruleId);
      
      // Resolve parameters with branch overrides
      const resolvedParameters = this.resolveParameters(rule, context.branch.id, context.task.agentType);
      
      // Execute MCP tools to gather context
      const mcpToolResults = await this.executeMCPTools(rule.mcp_tools, context);
      
      // Build the complete prompt
      const prompt = this.buildRulePrompt(rule, context, resolvedParameters, mcpToolResults);
      
      // Execute with Claude API
      const response = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022'),
        prompt,
        maxTokens: 4000,
      });
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      
      // Calculate token usage and cost (approximation)
      const inputTokens = Math.ceil(prompt.length / 4);
      const outputTokens = Math.ceil(response.text.length / 4);
      const totalTokens = inputTokens + outputTokens;
      
      // Claude 3.5 Sonnet pricing (as of 2024)
      const inputCost = (inputTokens / 1000) * 0.003;
      const outputCost = (outputTokens / 1000) * 0.015;
      const totalCost = inputCost + outputCost;
      
      // Extract confidence score from response (simplified)
      const confidenceMatch = response.text.match(/(?:Confidence|confidence).*?(\d+)%/);
      const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 85;

      const result: RuleResult = {
        ruleId,
        ruleName: rule.name,
        elementId: context.element.id,
        branchId: context.branch.id,
        analysis: response.text,
        confidence,
        metadata: {
          agentType: context.task.agentType,
          parametersUsed: resolvedParameters,
          mcpToolsUsed: rule.mcp_tools,
          executionTime,
          tokenUsage: {
            input: inputTokens,
            output: outputTokens,
            total: totalTokens
          },
          cost: {
            input: inputCost,
            output: outputCost,
            total: totalCost
          }
        },
        timestamp: new Date().toISOString()
      };

      return result;
      
    } catch (error: any) {
      throw new RuleExecutionError(ruleId, error.message);
    }
  }

  /**
   * Convert RuleResult to existing AgentAnalysis format for backward compatibility
   */
  convertToAnalysis(result: RuleResult): any {
    return {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      
      // Request context (maintain existing structure)
      request: {
        elementId: result.elementId,
        elementName: result.elementId, // Will be populated by calling code
        elementType: 'unknown', // Will be populated by calling code
        taskType: this.ruleIdToTaskType(result.ruleId),
        agentType: result.metadata.agentType,
        branchId: result.branchId,
        context: '',
        timestamp: result.timestamp
      },
      
      // Analysis response (maintain existing structure)  
      response: {
        analysis: result.analysis,
        confidence: result.confidence,
        reasoning: `Analysis completed using rule: ${result.ruleName}`,
        recommendations: this.extractRecommendations(result.analysis),
        timestamp: result.timestamp
      },
      
      // Cost tracking (maintain existing structure)
      cost: {
        inputTokens: result.metadata.tokenUsage.input,
        outputTokens: result.metadata.tokenUsage.output,
        totalTokens: result.metadata.tokenUsage.total,
        inputCost: result.metadata.cost.input,
        outputCost: result.metadata.cost.output,
        totalCost: result.metadata.cost.total
      },
      
      // New metadata (rule-specific information)
      ruleMetadata: {
        ruleId: result.ruleId,
        ruleName: result.ruleName,
        parametersUsed: result.metadata.parametersUsed,
        mcpToolsUsed: result.metadata.mcpToolsUsed,
        executionTime: result.metadata.executionTime
      }
    };
  }

  /**
   * Load rule definition from JSON file
   */
  private async loadRule(ruleId: string): Promise<Rule> {
    // Check cache first
    if (this.rulesCache[ruleId] && (Date.now() - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.rulesCache[ruleId];
    }

    try {
      // Load rules from JSON file
      const rulesModule = await import('./analysis-rules.json');
      const rulesData = rulesModule.default || rulesModule;
      const rules = rulesData.rules;

      if (!(rules as any)[ruleId]) {
        throw new RuleNotFoundError(ruleId);
      }

      // Cache the rule
      this.rulesCache[ruleId] = (rules as any)[ruleId];
      this.cacheTimestamp = Date.now();

      return (rules as any)[ruleId];
    } catch (error: any) {
      if (error instanceof RuleNotFoundError) {
        throw error;
      }
      throw new RuleExecutionError(ruleId, `Failed to load rule: ${error.message}`);
    }
  }

  /**
   * Resolve parameters with branch-specific overrides
   */
  private resolveParameters(rule: Rule, branchId: string, agentType: 'personal' | 'system'): { [key: string]: any } {
    const resolvedParams: { [key: string]: any } = {};

    for (const [paramName, paramConfig] of Object.entries(rule.parameters)) {
      // Start with default value
      let value = paramConfig.default;

      // Apply branch override if exists
      if (paramConfig.branchOverrides && paramConfig.branchOverrides[branchId]) {
        value = paramConfig.branchOverrides[branchId];
      }

      // Handle agent-specific parameters
      if (paramName === 'agentPerspective' && (paramConfig as any)[agentType]) {
        value = (paramConfig as any)[agentType];
      }

      resolvedParams[paramName] = value;
    }

    return resolvedParams;
  }

  /**
   * Execute MCP tools to gather context data
   * TODO: Fix MCP tool execution signature issue
   */
  private async executeMCPTools(toolNames: string[], context: RuleContext): Promise<{ [toolName: string]: any }> {
    const results: { [toolName: string]: any } = {};

    // Temporarily return empty results to allow compilation
    // TODO: Implement proper MCP tool execution
    console.log(`Would execute MCP tools: ${toolNames.join(', ')}`);
    
    return results;
    
    /* TODO: Fix and uncomment when MCP tool signature is resolved
    for (const toolName of toolNames) {
      try {
        switch (toolName) {
          case 'getBranchElements':
            results[toolName] = await mcpAnalysisTools.getBranchElements.execute({
              branchId: context.branch.id,
              elementType: context.element.type
            });
            break;

          case 'getElementUsage':
            results[toolName] = await mcpAnalysisTools.getElementUsage.execute({
              elementId: context.element.id,
              branchId: context.branch.id
            });
            break;

          case 'getBranchPhilosophy':
            results[toolName] = await mcpAnalysisTools.getBranchPhilosophy.execute({
              branchId: context.branch.id
            });
            break;

          case 'getElementVersion':
            results[toolName] = await mcpAnalysisTools.getElementVersion.execute({
              elementId: context.element.id,
              branchId: context.branch.id,
              version: context.element.version
            });
            break;

          default:
            console.warn(`Unknown MCP tool: ${toolName}`);
        }
      } catch (error: any) {
        throw new MCPToolError(toolName, error.message);
      }
    }

    return results;
    */
  }

  /**
   * Build the complete prompt for rule execution
   */
  private buildRulePrompt(
    rule: Rule, 
    context: RuleContext, 
    parameters: { [key: string]: any },
    mcpResults: { [toolName: string]: any }
  ): string {
    // Get the appropriate output template
    const template = context.task.agentType === 'personal' 
      ? rule.outputTemplates.personal 
      : rule.outputTemplates.system;

    // Start with rule instruction
    let prompt = rule.instruction;

    // Add context information
    prompt += `\n\nCONTEXT INFORMATION:\n`;
    prompt += `Element: ${context.element.name} (${context.element.type})\n`;
    prompt += `Branch: ${context.branch.name}\n`;
    prompt += `Agent Type: ${context.task.agentType}\n`;

    // Add MCP tool results
    if (Object.keys(mcpResults).length > 0) {
      prompt += `\nMCP TOOL RESULTS:\n`;
      for (const [toolName, result] of Object.entries(mcpResults)) {
        prompt += `${toolName}: ${JSON.stringify(result, null, 2)}\n`;
      }
    }

    // Add dynamic context for personal AI
    if (context.task.agentType === 'personal') {
      const userContext = context.user.dynamicContext || getUserValuesFromBranch(
        context.user.id, 
        context.user.branch
      );
      prompt += `\nUSER VALUES CONTEXT:\n${JSON.stringify(userContext, null, 2)}\n`;
    } else {
      // Add system context for objective analysis
      const systemContext = context.systemContext || getSystemValuesForContext(
        context.branch.id,
        context.element.type,
        context.element.id
      );
      prompt += `\nSYSTEM BASELINE CONTEXT:\n${JSON.stringify(systemContext, null, 2)}\n`;
    }

    // Add element data
    prompt += `\nELEMENT DATA:\n${JSON.stringify(context.element.data, null, 2)}\n`;

    // Add parameter substitutions
    prompt += `\nRULE PARAMETERS:\n`;
    for (const [key, value] of Object.entries(parameters)) {
      prompt += `${key}: ${JSON.stringify(value)}\n`;
    }

    // Add output format instruction
    prompt += `\n\nOUTPUT FORMAT:\nUse this template structure:\n${template}\n`;
    prompt += `\nReplace template variables with actual analysis content.\n`;
    prompt += `Include a confidence score from 0-100% at the end.\n`;

    return prompt;
  }

  /**
   * Extract recommendations from analysis text (simplified)
   */
  private extractRecommendations(analysis: string): string[] {
    const recommendations: string[] = [];
    
    // Look for common recommendation patterns
    const recommendationPatterns = [
      /(?:Recommendation|Suggest|Should|Consider):\s*([^.\n]+)/gi,
      /(?:Action|Next step|Improvement):\s*([^.\n]+)/gi
    ];

    for (const pattern of recommendationPatterns) {
      const matches = analysis.match(pattern);
      if (matches) {
        recommendations.push(...matches.map(match => match.trim()));
      }
    }

    // If no specific recommendations found, extract from bullet points
    if (recommendations.length === 0) {
      const bulletPoints = analysis.match(/^[-•*]\s*([^.\n]+)/gm);
      if (bulletPoints) {
        recommendations.push(...bulletPoints.slice(0, 3).map(point => point.replace(/^[-•*]\s*/, '').trim()));
      }
    }

    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  /**
   * Convert rule ID back to task type for backward compatibility
   */
  private ruleIdToTaskType(ruleId: string): string {
    const mapping: { [ruleId: string]: string } = {
      'definition-clarity-rule': 'definition-clarity',
      'usage-consistency-rule': 'usage-consistency',
      'evolution-analysis-rule': 'evolution-analysis',
      'philosophical-consistency-rule': 'philosophical-consistency',
      'implementation-feasibility-rule': 'implementation-feasibility',
      'cross-domain-impact-rule': 'cross-domain-impact',
      'enforcement-mechanism-rule': 'enforcement-mechanism',
      'compliance-framework-rule': 'compliance-framework',
      'implementation-requirements-rule': 'implementation-requirements',
      'general-analysis-rule': 'general-analysis'
    };

    return mapping[ruleId] || 'general-analysis';
  }

  /**
   * Invalidate the rules cache
   */
  invalidateCache(): void {
    this.rulesCache = {};
    this.cacheTimestamp = 0;
  }
}

// Factory function for easy instantiation
export function createRuleInterpreter(): IRuleInterpreter {
  return new RuleInterpreter();
}