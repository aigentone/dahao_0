// API Route: /api/ai/analyze
// Processes AI analysis requests and returns real Claude analysis

import { NextRequest, NextResponse } from 'next/server';
import { claudeService } from '@/lib/ai/claude-service';
import { saveAnalysis } from '@/lib/ai/json-storage';
import { AnalysisRequest } from '@/lib/ai/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: AnalysisRequest = await request.json();

    // Validate required fields
    if (!body.user || !body.governanceItem || !body.task || !body.branch) {
      return NextResponse.json(
        { error: 'Missing required fields: user, governanceItem, task, branch' },
        { status: 400 }
      );
    }

    // Validate environment
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Validate agent type
    if (!['personal', 'system'].includes(body.task.agentType)) {
      return NextResponse.json(
        { error: 'Invalid agentType. Must be "personal" or "system"' },
        { status: 400 }
      );
    }

    // Validate element type
    if (!['term', 'principle', 'rule'].includes(body.governanceItem.type)) {
      return NextResponse.json(
        { error: 'Invalid element type. Must be "term", "principle", or "rule"' },
        { status: 400 }
      );
    }

    console.log('Processing analysis request:', {
      user: body.user.name,
      element: body.governanceItem.name,
      agentType: body.task.agentType,
      taskType: body.task.taskType
    });

    // Process analysis with Claude
    const analysis = await claudeService.analyzeGovernanceElement(body);

    // Save to JSON storage
    await saveAnalysis(analysis);

    console.log('Analysis completed:', {
      id: analysis.id,
      confidence: analysis.result.confidence,
      cost: analysis.usage.cost.amount,
      duration: analysis.timeline.duration
    });

    // Return analysis result
    return NextResponse.json({
      success: true,
      analysis: analysis,
      id: analysis.id
    });

  } catch (error) {
    console.error('Analysis API error:', error);

    // Return error response
    return NextResponse.json(
      {
        error: 'Analysis failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Check if Claude API is configured
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
    
    return NextResponse.json({
      status: 'ok',
      service: 'DAHAO AI Analysis',
      configured: hasApiKey,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}