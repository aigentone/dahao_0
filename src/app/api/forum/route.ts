import { NextResponse } from 'next/server';
import { getAllDiscussions, getFeaturedDiscussion, getRecentDiscussions, getOrganizationStats, getForumStats } from '@/lib/governance-data';

export async function GET() {
  try {
    const discussions = getAllDiscussions();
    const featuredDiscussion = getFeaturedDiscussion();
    const recentDiscussions = getRecentDiscussions(8);
    const organizationStats = getOrganizationStats();
    const forumStats = getForumStats();
    
    const data = {
      stats: {
        activeDAHAOs: organizationStats.length,
        contributors: forumStats.totalParticipants,
        activeDiscussions: forumStats.activeDiscussions,
        consensusRate: forumStats.successRate
      },
      featured: featuredDiscussion,
      recent: recentDiscussions,
      organizations: organizationStats.map(org => ({
        id: org.domain,
        name: org.name,
        domain: org.domain,
        activeDiscussions: org.activeDiscussions,
        totalProposals: org.totalProposals,
        totalParticipants: org.totalParticipants,
        aiAgents: org.aiAgents,
        lastActivity: org.lastActivity,
        successRate: org.successRate
      }))
    };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading forum data:', error);
    return NextResponse.json(
      { error: 'Failed to load forum data' },
      { status: 500 }
    );
  }
}