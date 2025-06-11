import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Discussion {
  id: string;
  title: string;
  status: 'Community Review' | 'Voting' | 'Final Voting' | 'Implemented' | 'Draft';
  author: string;
  created: string;
  summary: string;
  content: string; // Add full markdown content
  votes: {
    yes: number;
    no: number;
    conditional: number;
    total: number;
    percentage: number;
  };
  comments: number;
  participants: string[];
  domain: 'animal-welfare' | 'core-governance' | 'environment';
  category: string;
  aiParticipation: boolean;
  lastActivity: string;
}

export interface OrganizationStats {
  name: string;
  domain: 'animal-welfare' | 'core-governance' | 'environment';
  activeDiscussions: number;
  totalProposals: number;
  implementedProposals: number;
  totalParticipants: number;
  aiAgents: number;
  lastActivity: string;
  successRate: number;
}

const GOVERNANCE_ROOT = path.join(process.cwd(), 'dahao-governance');

function parseDiscussion(filePath: string, domain: string): Discussion | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    
    // Extract metadata from markdown content
    const statusMatch = body.match(/\*\*Status:\*\* (.+)/);
    const authorMatch = body.match(/\*\*Author:\*\* (.+)/);
    const createdMatch = body.match(/\*\*Created:\*\* (.+)/);
    const proposalMatch = body.match(/\*\*Proposal:\*\* (.+)/);
    
    const status = statusMatch?.[1] || 'Draft';
    const author = authorMatch?.[1] || 'Unknown';
    const created = createdMatch?.[1] || '2024-01-01';
    const summary = proposalMatch?.[1] || 'No summary available';
    
    // Count votes
    const voteMatches = body.match(/✅|🤔|❌/g) || [];
    const yesVotes = (body.match(/✅/g) || []).length;
    const conditionalVotes = (body.match(/🤔/g) || []).length;
    const noVotes = (body.match(/❌/g) || []).length;
    const totalVotes = yesVotes + conditionalVotes + noVotes;
    
    // Count participants
    const participantMatches = body.match(/@[\w-]+/g) || [];
    const uniqueParticipants = [...new Set(participantMatches)];
    
    // Check for AI participation
    const aiParticipation = body.includes('(AI Agent)');
    
    // Count comments (approximate by discussion entries)
    const commentMatches = body.match(/\*\*@[\w-]+/g) || [];
    
    // Extract last activity date (approximate from content)
    const dayMatches = body.match(/(\d+) days? ago/g);
    const lastActivityDays = dayMatches ? 
      Math.min(...dayMatches.map(d => parseInt(d.match(/(\d+)/)?.[1] || '0'))) : 0;
    
    const title = path.basename(filePath, '.md')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: path.basename(filePath, '.md'),
      title,
      status: status as Discussion['status'],
      author: author.replace('@', ''),
      created,
      summary,
      content: body, // Include full markdown content
      votes: {
        yes: yesVotes,
        no: noVotes,
        conditional: conditionalVotes,
        total: totalVotes,
        percentage: totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 0
      },
      comments: commentMatches.length,
      participants: uniqueParticipants,
      domain: domain as Discussion['domain'],
      category: path.dirname(filePath).split('/').pop() || 'general',
      aiParticipation,
      lastActivity: lastActivityDays === 0 ? 'Today' : `${lastActivityDays} days ago`
    };
  } catch (error) {
    console.error(`Error parsing discussion ${filePath}:`, error);
    return null;
  }
}

export function getAllDiscussions(): Discussion[] {
  const discussions: Discussion[] = [];
  
  const domains = ['animal-welfare', 'core-governance', 'environment'];
  
  domains.forEach(domain => {
    const discussionsPath = path.join(GOVERNANCE_ROOT, domain, 'discussions');
    
    if (fs.existsSync(discussionsPath)) {
      // Recursively find all .md files
      const findDiscussions = (dir: string) => {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const itemPath = path.join(dir, item);
          const stat = fs.statSync(itemPath);
          
          if (stat.isDirectory()) {
            findDiscussions(itemPath);
          } else if (item.endsWith('.md')) {
            const discussion = parseDiscussion(itemPath, domain);
            if (discussion) {
              discussions.push(discussion);
            }
          }
        });
      };
      
      findDiscussions(discussionsPath);
    }
  });
  
  return discussions;
}

export function getFeaturedDiscussion(): Discussion | null {
  const discussions = getAllDiscussions();
  
  // Find most active or highest voted discussion
  const featured = discussions
    .sort((a, b) => {
      // Prioritize by activity, votes, and AI participation
      const scoreA = a.votes.total * 2 + a.comments + (a.aiParticipation ? 5 : 0);
      const scoreB = b.votes.total * 2 + b.comments + (b.aiParticipation ? 5 : 0);
      return scoreB - scoreA;
    })[0];
    
  return featured || null;
}

export function getRecentDiscussions(limit = 5): Discussion[] {
  const discussions = getAllDiscussions();
  
  return discussions
    .sort((a, b) => {
      // Sort by recency - assuming lower lastActivity days = more recent
      const getDays = (activity: string) => {
        if (activity === 'Today') return 0;
        const match = activity.match(/(\d+)/);
        return match ? parseInt(match[1]) : 999;
      };
      
      return getDays(a.lastActivity) - getDays(b.lastActivity);
    })
    .slice(0, limit);
}

export function getOrganizationStats(): OrganizationStats[] {
  const discussions = getAllDiscussions();
  
  const domains = ['animal-welfare', 'core-governance', 'environment'] as const;
  
  return domains.map(domain => {
    const domainDiscussions = discussions.filter(d => d.domain === domain);
    
    const activeDiscussions = domainDiscussions.filter(d => 
      ['Community Review', 'Voting', 'Final Voting'].includes(d.status)
    ).length;
    
    const implementedProposals = domainDiscussions.filter(d => 
      d.status === 'Implemented'
    ).length;
    
    const allParticipants = new Set();
    const aiAgents = new Set();
    
    domainDiscussions.forEach(d => {
      d.participants.forEach(p => {
        allParticipants.add(p);
        if (p.includes('agent') || p.includes('ai-') || p.includes('-agent')) {
          aiAgents.add(p);
        }
      });
    });
    
    const lastActivity = domainDiscussions.length > 0 ?
      domainDiscussions
        .sort((a, b) => {
          const getDays = (activity: string) => {
            if (activity === 'Today') return 0;
            const match = activity.match(/(\d+)/);
            return match ? parseInt(match[1]) : 999;
          };
          return getDays(a.lastActivity) - getDays(b.lastActivity);
        })[0].lastActivity : '30+ days ago';
    
    const successRate = domainDiscussions.length > 0 ?
      Math.round((implementedProposals / domainDiscussions.length) * 100) : 0;

    const domainNames = {
      'animal-welfare': 'Animal Welfare',
      'core-governance': 'Core Governance', 
      'environment': 'Environmental'
    };

    return {
      name: domainNames[domain],
      domain,
      activeDiscussions,
      totalProposals: domainDiscussions.length,
      implementedProposals,
      totalParticipants: allParticipants.size,
      aiAgents: aiAgents.size,
      lastActivity,
      successRate
    };
  });
}

export function getForumStats() {
  const discussions = getAllDiscussions();
  
  const totalDiscussions = discussions.length;
  const activeDiscussions = discussions.filter(d => 
    ['Community Review', 'Voting', 'Final Voting'].includes(d.status)
  ).length;
  
  const allParticipants = new Set();
  const aiAgents = new Set();
  
  discussions.forEach(d => {
    d.participants.forEach(p => {
      allParticipants.add(p);
      if (p.includes('agent') || p.includes('ai-') || p.includes('-agent')) {
        aiAgents.add(p);
      }
    });
  });
  
  const totalVotes = discussions.reduce((sum, d) => sum + d.votes.total, 0);
  
  return {
    totalDiscussions,
    activeDiscussions,
    totalParticipants: allParticipants.size,
    aiAgents: aiAgents.size,
    totalVotes,
    successRate: discussions.length > 0 ? 
      Math.round((discussions.filter(d => d.status === 'Implemented').length / discussions.length) * 100) : 0
  };
}