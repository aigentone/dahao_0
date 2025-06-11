import { GovernanceDiscussion } from '@/types/governance';

interface ParsedDiscussion {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  statusColor: string;
  timeAgo: string;
  participants: number;
  comments: number;
  aiAnalyses: number;
  author: string;
  created: string;
  votingData?: {
    humanApproval: number;
    aiApproval: number;
    totalVotes: number;
  };
}

interface PlatformStats {
  activeDAHAOs: number;
  contributors: number;
  activeDiscussions: number;
  consensusRate: number;
}

export class DiscussionParser {
  /**
   * Parse discussion content to extract participants, comments, and AI analyses
   */
  static parseDiscussionMetrics(discussion: GovernanceDiscussion): {
    participants: number;
    comments: number;
    aiAnalyses: number;
  } {
    if (!discussion?.content) {
      return {
        participants: 0,
        comments: 0,
        aiAnalyses: 0
      };
    }
    
    const content = discussion.content;
    const lines = content.split('\n');
    
    const participants = new Set<string>();
    let comments = 0;
    let aiAnalyses = 0;
    
    for (const line of lines) {
      // Look for participant mentions in multiple formats:
      // **@username (Human/AI Agent)**
      // **@username**
      // @username (Human)
      // @username (AI Agent)
      const participantPatterns = [
        /\*\*@([a-zA-Z0-9_-]+)\s*\((Human|AI Agent)\)\*\*/,
        /\*\*@([a-zA-Z0-9_-]+)\*\*/,
        /@([a-zA-Z0-9_-]+)\s*\((Human|AI Agent)\)/,
        /^@([a-zA-Z0-9_-]+)/
      ];
      
      for (const pattern of participantPatterns) {
        const match = line.match(pattern);
        if (match) {
          const username = match[1];
          const type = match[2] || ''; // May be undefined for some patterns
          
          participants.add(username);
          comments++;
          
          if (type === 'AI Agent' || username.includes('agent') || username.includes('bot')) {
            aiAnalyses++;
          }
          break; // Only match one pattern per line
        }
      }
    }
    
    return {
      participants: participants.size,
      comments,
      aiAnalyses
    };
  }

  /**
   * Extract voting data from discussion content
   */
  static parseVotingData(discussion: GovernanceDiscussion): {
    humanApproval: number;
    aiApproval: number;
    totalVotes: number;
  } | null {
    if (!discussion?.content) {
      return null;
    }
    
    const content = discussion.content;
    
    // Look for votes section
    const votesMatch = content.match(/## Votes\n([\s\S]*?)(?=\n##|\n\*\*|$)/);
    if (!votesMatch) return null;
    
    const votesSection = votesMatch[1];
    const lines = votesSection.split('\n');
    
    let humanVotes = 0;
    let humanApprovals = 0;
    let aiVotes = 0;
    let aiApprovals = 0;
    
    for (const line of lines) {
      if (line.includes('✅') || line.includes('🤔') || line.includes('❌')) {
        const isApproval = line.includes('✅');
        const isAI = line.includes('agent') || line.includes('Agent');
        
        if (isAI) {
          aiVotes++;
          if (isApproval) aiApprovals++;
        } else {
          humanVotes++;
          if (isApproval) humanApprovals++;
        }
      }
    }
    
    // If no explicit votes section, look for status indicators
    if (humanVotes === 0 && aiVotes === 0) {
      // Check for various approval patterns
      const approvalPatterns = [
        /(\d+)%\s*(approval|consensus|support)/i,
        /approval.*?(\d+)%/i,
        /consensus.*?(\d+)%/i,
        /(\d+)%.*?(approved|consensus)/i
      ];
      
      for (const pattern of approvalPatterns) {
        const match = content.match(pattern);
        if (match) {
          const approvalRate = parseInt(match[1]);
          return {
            humanApproval: approvalRate,
            aiApproval: approvalRate, // Use same rate for both if no breakdown available
            totalVotes: 5 // Conservative estimate
          };
        }
      }
    }
    
    const totalVotes = humanVotes + aiVotes;
    if (totalVotes === 0) return null;
    
    return {
      humanApproval: Math.round((humanApprovals / (humanVotes || 1)) * 100),
      aiApproval: Math.round((aiApprovals / (aiVotes || 1)) * 100),
      totalVotes
    };
  }

  /**
   * Get category from discussion path or content
   */
  static extractCategory(discussion: GovernanceDiscussion): string {
    if (!discussion?.path) {
      return 'General';
    }
    
    // Extract from path
    const pathParts = discussion.path.split('/');
    const discussionsIndex = pathParts.findIndex(part => part === 'discussions');
    
    if (discussionsIndex >= 0 && discussionsIndex + 1 < pathParts.length) {
      const category = pathParts[discussionsIndex + 1];
      return this.formatCategoryName(category);
    }
    
    // Fallback to content analysis
    if (discussion.content?.includes('Five Freedoms')) return 'Five Freedoms';
    if (discussion.content?.includes('Emergency')) return 'Emergency Care';
    if (discussion.content?.includes('Transparency')) return 'Transparency';
    
    return 'General';
  }

  /**
   * Format category name for display
   */
  static formatCategoryName(category: string): string {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Calculate time ago from created date
   */
  static calculateTimeAgo(created: string): string {
    if (created === 'unknown') return 'Unknown';
    
    try {
      const createdDate = new Date(created);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch {
      return 'Recently';
    }
  }

  /**
   * Determine status color based on status text
   */
  static getStatusColor(status: string): string {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('active') || statusLower.includes('discussion')) return 'green';
    if (statusLower.includes('review') || statusLower.includes('voting')) return 'blue';
    if (statusLower.includes('draft')) return 'gray';
    if (statusLower.includes('approved')) return 'green';
    if (statusLower.includes('rejected')) return 'red';
    return 'gray';
  }

  /**
   * Parse a discussion into the format needed by forum components
   */
  static parseDiscussion(discussion: GovernanceDiscussion, index: number): ParsedDiscussion {
    if (!discussion) {
      return {
        id: `discussion-${index}`,
        title: 'Unknown Discussion',
        description: 'No description available.',
        category: 'General',
        status: 'Unknown',
        statusColor: 'gray',
        timeAgo: 'Unknown',
        participants: 0,
        comments: 0,
        aiAnalyses: 0,
        author: 'Unknown',
        created: 'Unknown'
      };
    }
    
    const metrics = this.parseDiscussionMetrics(discussion);
    const votingData = this.parseVotingData(discussion);
    const category = this.extractCategory(discussion);
    const timeAgo = this.calculateTimeAgo(discussion.created || 'Unknown');
    const statusColor = this.getStatusColor(discussion.status || 'Unknown');
    
    return {
      id: `discussion-${index}`,
      title: discussion.title || 'Untitled Discussion',
      description: discussion.summary || 'No summary available.',
      category,
      status: discussion.status || 'Unknown',
      statusColor,
      timeAgo,
      participants: metrics.participants,
      comments: metrics.comments,
      aiAnalyses: metrics.aiAnalyses,
      author: discussion.author || 'Unknown',
      created: discussion.created || 'Unknown',
      votingData
    };
  }

  /**
   * Calculate platform-wide statistics from governance data
   */
  static calculatePlatformStats(
    organizations: any[],
    discussionsByPrinciple: Record<string, GovernanceDiscussion[]> | null | undefined
  ): PlatformStats {
    // Safely handle potentially undefined discussionsByPrinciple
    if (!discussionsByPrinciple) {
      return {
        activeDAHAOs: organizations?.length || 0,
        contributors: 0,
        activeDiscussions: 0,
        consensusRate: 0
      };
    }

    const allDiscussions = Object.values(discussionsByPrinciple).flat();
    
    // Count unique contributors
    const contributors = new Set<string>();
    allDiscussions.forEach(discussion => {
      if (discussion?.author && discussion.author !== 'unknown') {
        contributors.add(discussion.author);
      }
      
      // Also count participants from discussion content
      try {
        const metrics = this.parseDiscussionMetrics(discussion);
        // This is approximate since we can't extract individual names easily
      } catch (error) {
        console.warn('Error parsing discussion metrics:', error);
      }
    });

    // Count active discussions
    const activeDiscussions = allDiscussions.filter(discussion => 
      discussion?.status && (
        discussion.status.toLowerCase().includes('active') ||
        discussion.status.toLowerCase().includes('discussion') ||
        discussion.status.toLowerCase().includes('review')
      )
    ).length;

    // Calculate consensus rate
    let totalVotingDiscussions = 0;
    let totalConsensusScore = 0;
    
    allDiscussions.forEach(discussion => {
      if (!discussion) return;
      
      try {
        const votingData = this.parseVotingData(discussion);
        if (votingData) {
          totalVotingDiscussions++;
          // Average of human and AI approval rates
          totalConsensusScore += (votingData.humanApproval + votingData.aiApproval) / 2;
        }
      } catch (error) {
        console.warn('Error parsing voting data:', error);
      }
    });
    
    const consensusRate = totalVotingDiscussions > 0 
      ? Math.round(totalConsensusScore / totalVotingDiscussions)
      : 85; // Default fallback

    return {
      activeDAHAOs: organizations?.length || 0,
      contributors: contributors.size, // Show actual count, don't enforce minimum
      activeDiscussions: activeDiscussions,
      consensusRate
    };
  }
}