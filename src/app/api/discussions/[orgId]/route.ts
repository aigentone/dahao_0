import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    const dataService = createGitHubDataService();
    const discussions = await dataService.getOrganizationDiscussions(orgId);
    
    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Failed to fetch organization discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}