// Chat API Route - Governance-aware streaming chat endpoint
// Following Vercel AI SDK patterns from https://ai-sdk.dev/docs/ai-sdk-ui/chatbot

import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { GovernanceToolExecutor } from '@/lib/governance/tool-executor';
import { z } from 'zod';

// Request validation schema
const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
  })),
  element: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['term', 'principle', 'rule']),
    version: z.string(),
    data: z.any()
  }).optional(),
  branch: z.object({
    id: z.string(),
    name: z.string()
  }).optional(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    values: z.array(z.string())
  }).optional()
});

// Generate system context for governance-aware responses
function generateGovernanceContext(element: any, branch: any, user: any): any[] {
  const messages: any[] = [];

  // Base system message
  messages.push({
    role: 'system',
    content: `You are a helpful governance assistant for the DAHAO platform. You help users understand and explore governance elements within their branch context.

${element ? `Current Focus: You are discussing the "${element.name}" ${element.type} (version ${element.version}).

Element Details:
- Type: ${element.type}
- Version: ${element.version}
- ${element.type === 'term' ? `Definition: ${element.data?.definition || 'Not specified'}` : ''}
- ${element.type === 'principle' ? `Statement: ${element.data?.statement || 'Not specified'}` : ''}
- ${element.type === 'rule' ? `Requirements: ${JSON.stringify(element.data?.requirements || [])}` : ''}` : 'General governance assistance mode.'}

${branch ? `Branch Context: "${branch.name}" (ID: ${branch.id})` : ''}
${user ? `User: ${user.name} with values: ${user.values.join(', ')}` : ''}

Provide helpful, context-aware responses. When discussing governance elements, reference their specific branch customizations and relationships. Use the available tools to access real-time governance data when needed.

CRITICAL INSTRUCTION: You MUST provide a complete, helpful response to every question. You have access to governance tools, but you should ONLY use them if they would add significant value beyond what you can provide with the element context already given. In most cases, you have enough information from the element definition and branch context to provide excellent guidance.

Your primary goal is to help users understand governance concepts and provide actionable insights. Always give complete responses that include:
- Clear explanations of concepts
- Practical examples and applications
- Actionable recommendations
- Context-specific guidance

Tools are optional - your knowledge and the provided context are usually sufficient.`
  });

  return messages;
}

// Adapt governance tools for Vercel AI SDK format
// Following https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
function createGovernanceTools(toolExecutor: GovernanceToolExecutor) {
  return {
    getBranchElements: {
      description: 'Get governance elements from a specific branch',
      parameters: z.object({
        branchId: z.string().describe('The branch ID to get elements from'),
        elementType: z.enum(['term', 'principle', 'rule']).describe('Type of elements to retrieve').optional()
      }),
      execute: async ({ branchId, elementType }: { branchId: string; elementType?: 'term' | 'principle' | 'rule' }) => {
        const context = {
          branch: { id: branchId },
          element: elementType ? { type: elementType } : undefined
        } as any;

        const results = await toolExecutor.executeTools(['getBranchElements'], context);
        return results.getBranchElements || { elements: [] };
      }
    },

    getElementUsage: {
      description: 'Get usage information for a specific governance element',
      parameters: z.object({
        elementId: z.string().describe('The element ID to analyze'),
        branchId: z.string().describe('The branch context for usage analysis')
      }),
      execute: async ({ elementId, branchId }: { elementId: string; branchId: string }) => {
        const context = {
          element: { id: elementId },
          branch: { id: branchId }
        } as any;

        const results = await toolExecutor.executeTools(['getElementUsage'], context);
        return results.getElementUsage || { usage: 'No usage data available' };
      }
    },

    getBranchPhilosophy: {
      description: 'Get the philosophical approach and values of a branch',
      parameters: z.object({
        branchId: z.string().describe('The branch ID to get philosophy for')
      }),
      execute: async ({ branchId }: { branchId: string }) => {
        const context = {
          branch: { id: branchId }
        } as any;

        const results = await toolExecutor.executeTools(['getBranchPhilosophy'], context);
        return results.getBranchPhilosophy || { philosophy: 'No philosophy data available' };
      }
    },

    compareElements: {
      description: 'Compare an element across different branches or versions',
      parameters: z.object({
        elementId: z.string().describe('The element ID to compare'),
        branchIds: z.array(z.string()).describe('List of branch IDs to compare across'),
        includeVersionHistory: z.boolean().describe('Whether to include version history').optional()
      }),
      execute: async ({ elementId, branchIds, includeVersionHistory }: { elementId: string; branchIds: string[]; includeVersionHistory?: boolean }) => {
        // Aggregate data from multiple branches
        const comparisons = await Promise.all(
          branchIds.map(async (branchId: string) => {
            const context = {
              element: { id: elementId },
              branch: { id: branchId }
            } as any;

            const results = await toolExecutor.executeTools(['getBranchElements', 'getElementUsage'], context);
            return {
              branchId,
              elements: results.getBranchElements || {},
              usage: results.getElementUsage || {}
            };
          })
        );

        return { comparisons, elementId };
      }
    }
  };
}

export async function POST(request: Request) {
  try {
    // Parse and validate request
    const body = await request.json();
    const validatedData = chatRequestSchema.parse(body);

    // Extract context
    const { messages, element, branch, user } = validatedData;

    // Initialize tool executor
    const toolExecutor = new GovernanceToolExecutor();

    // Generate system context
    const systemMessages = generateGovernanceContext(element, branch, user);

    // Create governance tools
    const governanceTools = createGovernanceTools(toolExecutor);

    // Stream text with tools
    // Following https://ai-sdk.dev/docs/ai-sdk-ui/use-chat patterns
    // Note: Using toDataStreamResponse() for compatibility with useChat hook
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      messages: [...systemMessages, ...messages],
      tools: governanceTools,
      toolChoice: 'auto', // Let AI decide when to use tools
      temperature: 0.8, // Slightly increase for more creative responses
      maxTokens: 4096, // Increased to allow for tool results + response
      maxSteps: 2, // Limit tool calls to encourage final response
      onFinish: ({ usage, finishReason }) => {
        // Log usage for monitoring
        console.log('Chat completion:', {
          tokensUsed: usage.totalTokens,
          finishReason,
          cost: calculateCost(usage)
        });
      }
    });

    // Return streaming response compatible with useChat hook
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat API error:', error);

    // Return error response
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An error occurred',
        type: 'chat_error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Cost calculation helper (matching existing patterns)
function calculateCost(usage: any): number {
  const INPUT_COST_PER_1K = 0.003;  // $3 per 1M tokens
  const OUTPUT_COST_PER_1K = 0.015; // $15 per 1M tokens

  const inputCost = (usage.promptTokens || 0) / 1000 * INPUT_COST_PER_1K;
  const outputCost = (usage.completionTokens || 0) / 1000 * OUTPUT_COST_PER_1K;

  return inputCost + outputCost;
}
