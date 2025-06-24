// Claude API Service for DAHAO Real AI Integration
// Uses Vercel AI SDK v5 with Anthropic provider

import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { AnalysisRequest, AgentAnalysis, ClaudeResponse, PromptContext } from './types';
import { getPromptForContext, estimatePromptTokens } from './prompts';
import { v4 as uuidv4 } from 'uuid';

// Anthropic pricing (as of 2024)
const ANTHROPIC_PRICING = {
  'claude-3-5-sonnet-20241022': {
    input: 0.003,  // per 1K tokens
    output: 0.015  // per 1K tokens
  },
  'claude-3-haiku-20240307': {
    input: 0.00025,
    output: 0.00125
  }
};

export class ClaudeService {
  private model: string;
  private temperature: number;

  constructor(model: string = 'claude-3-5-sonnet-20241022', temperature: number = 0.7) {
    this.model = model;
    this.temperature = temperature;
  }

  private validateApiKey() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is required for Claude integration');
    }
  }

  async analyzeGovernanceElement(request: AnalysisRequest): Promise<AgentAnalysis> {
    // Validate API key only when actually making requests
    this.validateApiKey();
    
    const startTime = Date.now();
    const analysisId = uuidv4();

    try {
      // Build prompt context
      const promptContext: PromptContext = {
        user: request.user,
        element: {
          type: request.governanceItem.type,
          id: request.governanceItem.id,
          name: request.governanceItem.name,
          version: request.governanceItem.version,
          data: request.governanceItem.data
        },
        task: {
          agentType: request.task.agentType,
          taskType: request.task.taskType,
          description: request.task.context || `Analyze ${request.governanceItem.type}: ${request.governanceItem.name}`,
          context: request.task.context
        },
        branch: request.branch
      };

      // Generate appropriate prompt
      const prompt = getPromptForContext(promptContext);
      const estimatedInputTokens = estimatePromptTokens(prompt);

      // Call Claude API
      const response = await generateText({
        model: anthropic(this.model),
        prompt: prompt,
        temperature: this.temperature,
        maxTokens: 2000,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Calculate costs
      const inputTokens = response.usage?.promptTokens || estimatedInputTokens;
      const outputTokens = response.usage?.completionTokens || 0;
      const totalTokens = inputTokens + outputTokens;

      const pricing = ANTHROPIC_PRICING[this.model as keyof typeof ANTHROPIC_PRICING];
      const inputCost = (inputTokens / 1000) * pricing.input;
      const outputCost = (outputTokens / 1000) * pricing.output;
      const totalCost = inputCost + outputCost;

      // Parse analysis and extract confidence
      const analysis = response.text;
      const confidence = this.extractConfidence(analysis);
      const recommendations = this.extractRecommendations(analysis);
      const concerns = this.extractConcerns(analysis);

      // Build comprehensive analysis object
      const agentAnalysis: AgentAnalysis = {
        id: analysisId,
        requestedBy: {
          userId: request.user.id,
          userName: request.user.name,
          userBranch: request.user.branch,
          userValues: request.user.values
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
          discussionId: request.task.discussionId
        },
        execution: {
          agentId: `${request.task.agentType}-${this.model}`,
          agentProvider: 'anthropic',
          modelVersion: this.model,
          temperature: this.temperature,
          promptTemplate: request.task.agentType,
          promptTokens: estimatedInputTokens
        },
        timeline: {
          requestedAt: new Date(startTime).toISOString(),
          startedAt: new Date(startTime).toISOString(),
          completedAt: new Date(endTime).toISOString(),
          duration: duration
        },
        result: {
          analysis: analysis,
          confidence: confidence,
          recommendations: recommendations,
          concerns: concerns.length > 0 ? concerns : undefined,
          relatedElements: this.extractRelatedElements(analysis)
        },
        usage: {
          tokenUsage: {
            input: inputTokens,
            output: outputTokens,
            total: totalTokens
          },
          cost: {
            amount: totalCost,
            currency: 'USD',
            breakdown: {
              inputCost: inputCost,
              outputCost: outputCost
            }
          }
        },
        metadata: {
          version: '1.0',
          visibility: 'branch-only',
          status: 'completed',
          tags: [request.task.taskType, request.task.agentType, request.governanceItem.type]
        }
      };

      return agentAnalysis;

    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Return failed analysis with error details
      const failedAnalysis: AgentAnalysis = {
        id: analysisId,
        requestedBy: {
          userId: request.user.id,
          userName: request.user.name,
          userBranch: request.user.branch,
          userValues: request.user.values
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
          context: request.task.context
        },
        execution: {
          agentId: `${request.task.agentType}-${this.model}`,
          agentProvider: 'anthropic',
          modelVersion: this.model,
          temperature: this.temperature,
          promptTemplate: request.task.agentType,
          promptTokens: 0
        },
        timeline: {
          requestedAt: new Date(startTime).toISOString(),
          startedAt: new Date(startTime).toISOString(),
          completedAt: new Date(endTime).toISOString(),
          duration: duration
        },
        result: {
          analysis: '',
          confidence: 0,
          recommendations: []
        },
        usage: {
          tokenUsage: {
            input: 0,
            output: 0,
            total: 0
          },
          cost: {
            amount: 0,
            currency: 'USD',
            breakdown: {
              inputCost: 0,
              outputCost: 0
            }
          }
        },
        metadata: {
          version: '1.0',
          visibility: 'branch-only',
          status: 'failed',
          errorInfo: error instanceof Error ? error.message : 'Unknown error occurred',
          tags: [request.task.taskType, request.task.agentType, request.governanceItem.type]
        }
      };

      return failedAnalysis;
    }
  }

  private extractConfidence(analysis: string): number {
    // Look for confidence patterns in the analysis
    const confidenceRegex = /confidence[:\s]+(\d+)%?/i;
    const match = analysis.match(confidenceRegex);
    
    if (match) {
      return parseInt(match[1], 10);
    }
    
    // Default confidence based on analysis length and structure
    if (analysis.length > 1000 && analysis.includes('recommendation')) {
      return 85;
    } else if (analysis.length > 500) {
      return 75;
    } else {
      return 60;
    }
  }

  private extractRecommendations(analysis: string): string[] {
    const recommendations: string[] = [];
    
    // Look for recommendation sections (using exec instead of matchAll for compatibility)
    const recSectionRegex = /(?:recommendation|suggest|propose)[s]?[:\s]+(.*?)(?:\n\n|\n(?=[A-Z])|$)/gi;
    let match;
    
    while ((match = recSectionRegex.exec(analysis)) !== null) {
      const content = match[1].trim();
      if (content) {
        // Split by bullet points, dashes, or numbers
        const items = content.split(/[-•\d+\.]\s+/).filter((item: string) => item.trim().length > 10);
        recommendations.push(...items.map((item: string) => item.trim()));
      }
    }
    
    return recommendations.slice(0, 5); // Limit to 5 recommendations
  }

  private extractConcerns(analysis: string): string[] {
    const concerns: string[] = [];
    
    // Look for concern sections (using exec instead of matchAll for compatibility)
    const concernRegex = /(?:concern|issue|problem|risk|warning)[s]?[:\s]+(.*?)(?:\n\n|\n(?=[A-Z])|$)/gi;
    let match;
    
    while ((match = concernRegex.exec(analysis)) !== null) {
      const content = match[1].trim();
      if (content) {
        const items = content.split(/[-•\d+\.]\s+/).filter((item: string) => item.trim().length > 10);
        concerns.push(...items.map((item: string) => item.trim()));
      }
    }
    
    return concerns.slice(0, 3); // Limit to 3 concerns
  }

  private extractRelatedElements(analysis: string): string[] {
    const related: string[] = [];
    
    // Look for references to other elements (using exec instead of matchAll for compatibility)
    const elementRegex = /(?:term|principle|rule)[s]?[:\s]+([a-z-]+)/gi;
    let match;
    
    while ((match = elementRegex.exec(analysis)) !== null) {
      const element = match[1].trim();
      if (element && element.length > 3) {
        related.push(element);
      }
    }
    
    // Convert set to array for ES5 compatibility
    const uniqueElements = related.filter((elem, index) => related.indexOf(elem) === index);
    return uniqueElements.slice(0, 5); // Unique elements, limit to 5
  }
}

// Export function to create service instance (lazy loading)
export function createClaudeService(): ClaudeService {
  return new ClaudeService();
}

// Export singleton instance
export const claudeService = new ClaudeService();