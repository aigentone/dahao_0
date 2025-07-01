// Unified AI API Endpoint
// Single endpoint that handles both chat and analysis modes
// Replaces both /api/chat and /api/ai/analyze endpoints

import { NextRequest, NextResponse } from 'next/server';
import { unifiedAIService } from '@/lib/ai/unified-governance-ai-service';
import { unifiedRequestSchema, UnifiedAIRequest } from '@/lib/ai/unified-types';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Unified AI API: Processing request');
    const startTime = Date.now();
    
    // Parse and validate request body
    const body = await request.json();
    const validatedRequest: UnifiedAIRequest = unifiedRequestSchema.parse(body);
    
    console.log('📝 Request details:', {
      mode: validatedRequest.mode,
      responseType: validatedRequest.responseType,
      user: validatedRequest.user.name,
      element: validatedRequest.element?.name,
      taskType: validatedRequest.taskType,
      agentType: validatedRequest.agentType,
      enableRules: validatedRequest.enableRules,
      forceRule: validatedRequest.forceRule
    });
    
    // Validate environment
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }
    
    // Handle streaming requests
    if (validatedRequest.responseType === 'stream') {
      console.log('🌊 Processing streaming request');
      const stream = await unifiedAIService.streamResponse(validatedRequest);
      
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Handle complete responses
    console.log('📦 Processing complete response request');
    const response = await unifiedAIService.processRequest(validatedRequest);
    
    const processingTime = Date.now() - startTime;
    console.log('✅ Request completed successfully:', {
      id: response.id,
      mode: response.mode,
      confidence: response.confidence,
      cost: response.cost.totalCost,
      tokens: response.usage.totalTokens,
      processingTime: processingTime,
      hasRules: !!response.ruleResults?.length,
      hasTools: !!response.toolResults?.length
    });
    
    return NextResponse.json({
      success: true,
      data: response,
      meta: {
        processingTime,
        apiVersion: 'unified-v1'
      }
    });
    
  } catch (error) {
    console.error('❌ Unified AI API error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request format',
          message: 'Request validation failed',
          details: error.errors,
          type: 'validation_error'
        },
        { status: 400 }
      );
    }
    
    // Handle service errors
    if (error instanceof Error) {
      // Check for specific error types
      if (error.message.includes('ANTHROPIC_API_KEY')) {
        return NextResponse.json(
          {
            error: 'AI service configuration error',
            message: 'Claude API not properly configured',
            type: 'configuration_error'
          },
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many requests, please try again later',
            type: 'rate_limit_error'
          },
          { status: 429 }
        );
      }
      
      // Generic error handling
      return NextResponse.json(
        {
          error: 'Processing failed',
          message: error.message,
          type: 'processing_error',
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        },
        { status: 500 }
      );
    }
    
    // Unknown error
    return NextResponse.json(
      {
        error: 'Unknown error occurred',
        message: 'An unexpected error occurred while processing your request',
        type: 'unknown_error'
      },
      { status: 500 }
    );
  }
}

// Health check and service information endpoint
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    
    // Handle different GET actions
    switch (action) {
      case 'health':
        return NextResponse.json({
          status: 'healthy',
          service: 'DAHAO Unified AI',
          version: 'unified-v1',
          configured: !!process.env.ANTHROPIC_API_KEY,
          capabilities: [
            'chat_mode',
            'analysis_mode', 
            'hybrid_mode',
            'rule_detection',
            'streaming_responses',
            'tool_execution'
          ],
          timestamp: new Date().toISOString()
        });
        
      case 'rules':
        // Return available rule types
        return NextResponse.json({
          availableRules: [
            'definition-clarity',
            'usage-consistency',
            'evolution-analysis',
            'philosophical-consistency',
            'implementation-feasibility',
            'cross-domain-impact',
            'enforcement-mechanism',
            'compliance-framework',
            'implementation-requirements',
            'general-analysis'
          ],
          ruleDetection: {
            enabled: true,
            confidenceThreshold: 0.7,
            patterns: 'Natural language patterns for rule detection'
          }
        });
        
      case 'tools':
        // Return available tools
        return NextResponse.json({
          availableTools: [
            'getBranchElements',
            'getElementUsage',
            'getBranchPhilosophy',
            'compareElements'
          ],
          toolCapabilities: {
            governance_data_access: true,
            cross_branch_comparison: true,
            usage_analysis: true,
            philosophy_extraction: true
          }
        });
        
      case 'modes':
        // Return supported modes
        return NextResponse.json({
          supportedModes: [
            {
              mode: 'chat',
              description: 'Natural language conversation with optional rule detection',
              features: ['streaming', 'tool_usage', 'rule_detection'],
              responseTypes: ['stream', 'complete']
            },
            {
              mode: 'analysis',
              description: 'Formal governance analysis with specific task types',
              features: ['rule_execution', 'structured_output', 'confidence_scoring'],
              responseTypes: ['complete']
            },
            {
              mode: 'hybrid',
              description: 'Combines conversational flow with structured analysis',
              features: ['streaming', 'rule_execution', 'tool_usage'],
              responseTypes: ['stream', 'complete']
            }
          ]
        });
        
      default:
        // Default service info
        return NextResponse.json({
          service: 'DAHAO Unified AI API',
          version: 'unified-v1',
          description: 'Unified AI service supporting chat, analysis, and hybrid modes',
          endpoints: {
            'POST /': 'Process AI requests',
            'GET /?action=health': 'Health check',
            'GET /?action=rules': 'Available rules',
            'GET /?action=tools': 'Available tools',
            'GET /?action=modes': 'Supported modes'
          },
          documentation: '/docs/unified-ai-api'
        });
    }
    
  } catch (error) {
    console.error('❌ Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Health check failed'
      },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS support
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// Helper function to validate request context
function validateRequestContext(request: UnifiedAIRequest): void {
  // Mode-specific validation
  if (request.mode === 'chat') {
    if (!request.messages || request.messages.length === 0) {
      throw new Error('Messages are required for chat mode');
    }
  }
  
  if (request.mode === 'analysis') {
    if (!request.taskType) {
      throw new Error('Task type is required for analysis mode');
    }
  }
  
  // Context validation
  if (!request.user?.id || !request.user?.name) {
    throw new Error('Valid user context is required');
  }
  
  if (!request.branch?.id || !request.branch?.name) {
    throw new Error('Valid branch context is required');
  }
  
  // Element validation for analysis mode
  if (request.mode === 'analysis' && !request.element) {
    throw new Error('Element context is required for analysis mode');
  }
}

// Helper function to log request metrics
function logRequestMetrics(request: UnifiedAIRequest, response: any, processingTime: number): void {
  console.log('📊 Request metrics:', {
    mode: request.mode,
    responseType: request.responseType,
    processingTime,
    tokenUsage: response.usage?.totalTokens,
    cost: response.cost?.totalCost,
    success: true
  });
}