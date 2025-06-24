// API Route: /api/ai/analyses
// Retrieves AI analysis history with filtering and pagination

import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllAnalyses, 
  getAnalysesByElementId, 
  getAnalysesByUserId, 
  getAnalysesByBranchId,
  getAnalysesByDiscussionId,
  getAnalysesByCommentId,
  getFilteredAnalyses,
  getAnalysisStats,
  getStorageMetadata 
} from '@/lib/ai/json-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const elementId = searchParams.get('elementId');
    const userId = searchParams.get('userId');
    const branchId = searchParams.get('branchId');
    const discussionId = searchParams.get('discussionId');
    const commentId = searchParams.get('commentId');
    const elementType = searchParams.get('elementType') as 'term' | 'principle' | 'rule' | null;
    const agentType = searchParams.get('agentType') as 'personal' | 'system' | null;
    const status = searchParams.get('status') as 'pending' | 'completed' | 'failed' | null;
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : undefined;
    const stats = searchParams.get('stats') === 'true';
    const metadata = searchParams.get('metadata') === 'true';

    // Return statistics if requested
    if (stats) {
      const statistics = await getAnalysisStats();
      return NextResponse.json({
        success: true,
        stats: statistics
      });
    }

    // Return metadata if requested
    if (metadata) {
      const storageMetadata = await getStorageMetadata();
      return NextResponse.json({
        success: true,
        metadata: storageMetadata
      });
    }

    // Handle specific query types
    if (discussionId) {
      const analyses = await getAnalysesByDiscussionId(discussionId);
      return NextResponse.json({
        success: true,
        analyses: analyses,
        total: analyses.length,
        query: { discussionId }
      });
    }

    if (commentId) {
      const analyses = await getAnalysesByCommentId(commentId);
      return NextResponse.json({
        success: true,
        analyses: analyses,
        total: analyses.length,
        query: { commentId }
      });
    }

    if (elementId) {
      const analyses = await getAnalysesByElementId(elementId);
      return NextResponse.json({
        success: true,
        analyses: analyses,
        total: analyses.length,
        query: { elementId }
      });
    }

    if (userId) {
      const analyses = await getAnalysesByUserId(userId);
      return NextResponse.json({
        success: true,
        analyses: analyses,
        total: analyses.length,
        query: { userId }
      });
    }

    if (branchId) {
      const analyses = await getAnalysesByBranchId(branchId);
      return NextResponse.json({
        success: true,
        analyses: analyses,
        total: analyses.length,
        query: { branchId }
      });
    }

    // Handle filtered queries
    if (elementType || agentType || status || fromDate || toDate) {
      const result = await getFilteredAnalyses({
        elementType: elementType || undefined,
        agentType: agentType || undefined,
        status: status || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        limit,
        offset
      });

      return NextResponse.json({
        success: true,
        analyses: result.analyses,
        total: result.total,
        hasMore: result.hasMore,
        query: {
          elementType,
          agentType,
          status,
          fromDate,
          toDate,
          limit,
          offset
        }
      });
    }

    // Default: return all analyses with pagination
    const result = await getAllAnalyses(limit, offset);
    
    return NextResponse.json({
      success: true,
      analyses: result.analyses,
      total: result.total,
      hasMore: result.hasMore,
      pagination: {
        limit: limit || result.total,
        offset: offset || 0
      }
    });

  } catch (error) {
    console.error('Analyses API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve analyses',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// POST endpoint for bulk operations (future use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'export') {
      // Export all analyses
      const { exportAnalyses } = await import('@/lib/ai/json-storage');
      const data = await exportAnalyses();
      
      return NextResponse.json({
        success: true,
        data: data,
        exported: Object.keys(data.analyses).length
      });
    }

    if (action === 'stats') {
      // Get comprehensive statistics
      const stats = await getAnalysisStats();
      const metadata = await getStorageMetadata();
      
      return NextResponse.json({
        success: true,
        stats: stats,
        metadata: metadata
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Supported: export, stats' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Analyses POST API error:', error);

    return NextResponse.json(
      {
        error: 'Bulk operation failed',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}