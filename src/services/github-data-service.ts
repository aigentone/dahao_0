import { 
  GitHubDiscussion, 
  DiscussionConnection, 
  ListOptions,
  GitHubIssue,
  IssueConnection,
  IssueListOptions,
  GitHubIssueComment,
  GitHubUser
} from '@/types/github-compatible';

// Interface for data service
export interface IGitHubDataService {
  // Discussions API
  getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection>;
  getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null>;
  getOrganizationDiscussions(orgId: string, options?: ListOptions): Promise<DiscussionConnection>;
  
  // Issues API for private term development
  getIssues(owner: string, repo: string, options?: IssueListOptions): Promise<IssueConnection>;
  getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null>;
  createIssue(owner: string, repo: string, title: string, body: string, assignees?: string[], labels?: string[]): Promise<GitHubIssue>;
  updateIssue(owner: string, repo: string, number: number, updates: Partial<GitHubIssue>): Promise<GitHubIssue>;
  addIssueComment(owner: string, repo: string, number: number, body: string, author: GitHubUser): Promise<GitHubIssueComment>;
  assignAgentToIssue(owner: string, repo: string, number: number, agentId: string, taskType: string, assignedBy: string): Promise<GitHubIssue>;
}

// Mock implementation - browser-compatible (no fs operations)
export class MockGitHubDataService implements IGitHubDataService {
  private mockDiscussions: GitHubDiscussion[] = [];
  private mockIssues: GitHubIssue[] = [];

  constructor() {
    // Initialize with mock data
    this.mockIssues = generateMockTermDevelopmentIssues();
  }

  async getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection> {
    // For now, return empty discussions as we're focusing on Issues
    // In a real implementation, this would fetch from GitHub API or local data
    let discussions: GitHubDiscussion[] = [];
    
    // Filter by state
    if (options?.states && options.states.length > 0) {
      discussions = discussions.filter(d => 
        options.states!.includes(d.closed ? 'CLOSED' : 'OPEN')
      );
    }
    
    // Filter by category
    if (options?.category) {
      discussions = discussions.filter(d => d.category.slug === options.category);
    }
    
    // Filter by labels
    if (options?.labels && options.labels.length > 0) {
      discussions = discussions.filter(d => 
        d.labels.nodes.some(label => options.labels!.includes(label.name))
      );
    }
    
    // Sort
    if (options?.orderBy) {
      discussions.sort((a, b) => {
        let aVal: any, bVal: any;
        
        switch (options.orderBy!.field) {
          case 'CREATED_AT':
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
            break;
          case 'UPDATED_AT':
            aVal = new Date(a.updatedAt).getTime();
            bVal = new Date(b.updatedAt).getTime();
            break;
          case 'COMMENTS':
            aVal = a.comments.totalCount;
            bVal = b.comments.totalCount;
            break;
        }
        
        return options.orderBy!.direction === 'ASC' ? aVal - bVal : bVal - aVal;
      });
    }
    
    // Pagination
    const first = options?.first || 10;
    const after = options?.after ? parseInt(options.after) : 0;
    const paginatedDiscussions = discussions.slice(after, after + first);
    
    return {
      totalCount: discussions.length,
      pageInfo: {
        hasNextPage: after + first < discussions.length,
        hasPreviousPage: after > 0,
        startCursor: after > 0 ? String(after) : undefined,
        endCursor: after + first < discussions.length ? String(after + first) : undefined
      },
      nodes: paginatedDiscussions
    };
  }

  async getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null> {
    const discussions = await this.getDiscussions(owner, repo, { first: 1000 });
    return discussions.nodes.find(d => d.number === number) || null;
  }

  async getOrganizationDiscussions(orgId: string, options?: ListOptions): Promise<DiscussionConnection> {
    // For now, return empty discussions as we're focusing on Issues
    let discussions: GitHubDiscussion[] = [];
    
    // Filter by state
    if (options?.states && options.states.length > 0) {
      discussions = discussions.filter(d => 
        options.states!.includes(d.closed ? 'CLOSED' : 'OPEN')
      );
    }
    
    // Filter by category
    if (options?.category) {
      discussions = discussions.filter(d => d.category.slug === options.category);
    }
    
    // Filter by labels
    if (options?.labels && options.labels.length > 0) {
      discussions = discussions.filter(d => 
        d.labels.nodes.some(label => options.labels!.includes(label.name))
      );
    }
    
    // Sort
    if (options?.orderBy) {
      discussions.sort((a, b) => {
        let aVal: any, bVal: any;
        
        switch (options.orderBy!.field) {
          case 'CREATED_AT':
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
            break;
          case 'UPDATED_AT':
            aVal = new Date(a.updatedAt).getTime();
            bVal = new Date(b.updatedAt).getTime();
            break;
          case 'COMMENTS':
            aVal = a.comments.totalCount;
            bVal = b.comments.totalCount;
            break;
        }
        
        return options.orderBy!.direction === 'ASC' ? aVal - bVal : bVal - aVal;
      });
    }
    
    // Pagination
    const first = options?.first || 10;
    const after = options?.after ? parseInt(options.after) : 0;
    const paginatedDiscussions = discussions.slice(after, after + first);
    
    return {
      totalCount: discussions.length,
      pageInfo: {
        hasNextPage: after + first < discussions.length,
        hasPreviousPage: after > 0,
        startCursor: after > 0 ? String(after) : undefined,
        endCursor: after + first < discussions.length ? String(after + first) : undefined
      },
      nodes: paginatedDiscussions
    };
  }

  // Issues API implementation for private term development
  async getIssues(owner: string, repo: string, options?: IssueListOptions): Promise<IssueConnection> {
    // Use the mock data stored in this instance
    let issues = [...this.mockIssues];
    
    // Apply filters
    if (options?.states && options.states.length > 0) {
      issues = issues.filter(issue => 
        options.states!.includes(issue.state === 'closed' ? 'CLOSED' : 'OPEN')
      );
    }
    
    if (options?.labels && options.labels.length > 0) {
      issues = issues.filter(issue => 
        issue.labels.nodes.some(label => options.labels!.includes(label.name))
      );
    }
    
    if (options?.assignee) {
      issues = issues.filter(issue => 
        issue.assignees.nodes.some(assignee => assignee.login === options.assignee)
      );
    }
    
    if (options?.termDraftStatus) {
      issues = issues.filter(issue => 
        issue.termDraft?.status === options.termDraftStatus
      );
    }
    
    // Sort
    if (options?.orderBy) {
      issues.sort((a, b) => {
        let aVal: any, bVal: any;
        
        switch (options.orderBy!.field) {
          case 'CREATED_AT':
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
            break;
          case 'UPDATED_AT':
            aVal = new Date(a.updatedAt).getTime();
            bVal = new Date(b.updatedAt).getTime();
            break;
          case 'COMMENTS':
            aVal = a.comments.totalCount;
            bVal = b.comments.totalCount;
            break;
        }
        
        return options.orderBy!.direction === 'ASC' ? aVal - bVal : bVal - aVal;
      });
    }
    
    // Pagination
    const first = options?.first || 10;
    const after = options?.after ? parseInt(options.after) : 0;
    const paginatedIssues = issues.slice(after, after + first);
    
    return {
      totalCount: issues.length,
      pageInfo: {
        hasNextPage: after + first < issues.length,
        hasPreviousPage: after > 0,
        startCursor: after > 0 ? String(after) : undefined,
        endCursor: after + first < issues.length ? String(after + first) : undefined
      },
      nodes: paginatedIssues
    };
  }

  async getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null> {
    const issues = await this.getIssues(owner, repo, { first: 1000 });
    return issues.nodes.find(issue => issue.number === number) || null;
  }

  async createIssue(
    owner: string, 
    repo: string, 
    title: string, 
    body: string, 
    assignees?: string[], 
    labels?: string[]
  ): Promise<GitHubIssue> {
    const now = new Date().toISOString();
    const nextNumber = Math.max(...this.mockIssues.map(i => i.number), 0) + 1;
    
    const newIssue: GitHubIssue = {
      id: `issue-${nextNumber}`,
      number: nextNumber,
      title,
      body,
      state: 'open',
      createdAt: now,
      updatedAt: now,
      author: {
        login: 'current-user',
        id: 'user-current',
        avatarUrl: 'https://github.com/current-user.png',
        url: 'https://github.com/current-user',
        name: 'Current User'
      },
      assignees: {
        nodes: assignees ? assignees.map(login => ({
          login,
          id: `user-${login}`,
          avatarUrl: `https://github.com/${login}.png`,
          url: `https://github.com/${login}`,
          name: login
        })) : []
      },
      labels: {
        nodes: labels ? labels.map(name => ({
          id: `label-${name}`,
          name,
          color: '0366d6',
          description: `Label for ${name}`
        })) : []
      },
      comments: {
        totalCount: 0,
        nodes: []
      },
      reactions: {
        totalCount: 0,
        nodes: []
      }
    };
    
    // Add to mock storage
    this.mockIssues.push(newIssue);
    
    return newIssue;
  }

  async updateIssue(
    owner: string, 
    repo: string, 
    number: number, 
    updates: Partial<GitHubIssue>
  ): Promise<GitHubIssue> {
    const issue = await this.getIssue(owner, repo, number);
    if (!issue) {
      throw new Error(`Issue #${number} not found`);
    }
    
    const updatedIssue: GitHubIssue = {
      ...issue,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Update in mock storage
    const index = this.mockIssues.findIndex(i => i.number === number);
    if (index !== -1) {
      this.mockIssues[index] = updatedIssue;
    }
    
    return updatedIssue;
  }

  async addIssueComment(
    owner: string, 
    repo: string, 
    number: number, 
    body: string, 
    author: GitHubUser
  ): Promise<GitHubIssueComment> {
    const now = new Date().toISOString();
    
    const newComment: GitHubIssueComment = {
      id: `comment-${Date.now()}`,
      body,
      createdAt: now,
      updatedAt: now,
      author,
      reactions: {
        totalCount: 0,
        nodes: []
      }
    };
    
    return newComment;
  }

  async assignAgentToIssue(
    owner: string, 
    repo: string, 
    number: number, 
    agentId: string, 
    taskType: string, 
    assignedBy: string
  ): Promise<GitHubIssue> {
    const issue = await this.getIssue(owner, repo, number);
    if (!issue) {
      throw new Error(`Issue #${number} not found`);
    }
    
    // Add agent to assignees if not already assigned
    const agentUser: GitHubUser = {
      login: agentId,
      id: `agent-${agentId}`,
      avatarUrl: `https://github.com/${agentId}.png`,
      url: `https://github.com/${agentId}`,
      name: `AI Agent: ${agentId}`,
      bio: `AI agent specializing in ${taskType}`
    };
    
    const updatedAssignees = [...issue.assignees.nodes];
    if (!updatedAssignees.find(a => a.login === agentId)) {
      updatedAssignees.push(agentUser);
    }
    
    const updatedIssue: GitHubIssue = {
      ...issue,
      assignees: {
        nodes: updatedAssignees
      },
      updatedAt: new Date().toISOString()
    };
    
    // Update in mock storage
    const index = this.mockIssues.findIndex(i => i.number === number);
    if (index !== -1) {
      this.mockIssues[index] = updatedIssue;
    }
    
    return updatedIssue;
  }
}

// Factory function
export function createGitHubDataService(): IGitHubDataService {
  return new MockGitHubDataService();
}

// Helper function to generate mock issues data for term development
export function generateMockTermDevelopmentIssues(): GitHubIssue[] {
  return [
    {
      id: 'issue-1',
      number: 1,
      title: 'Term Development: regenerative-wellbeing',
      body: `## Term Definition
**regenerative-wellbeing**: A state where an entity not only maintains its own wellbeing but actively contributes to the wellbeing of the systems and communities it is part of, creating positive feedback loops that enhance collective flourishing.

## Rationale
Current definitions of wellbeing focus on individual states without considering the interconnected nature of ecological and social systems. This term captures the dynamic relationship between personal and collective wellbeing.

## Domain
environment

## Tags
ecology, systems-thinking, collective-wellbeing

## Status
Currently in AI review phase. Seeking feedback on clarity and uniqueness.`,
      state: 'open',
      createdAt: '2024-12-10T10:00:00Z',
      updatedAt: '2024-12-14T15:30:00Z',
      author: {
        login: 'user123',
        id: 'user-123',
        avatarUrl: 'https://github.com/user123.png',
        url: 'https://github.com/user123',
        name: 'Alice Johnson'
      },
      assignees: {
        nodes: [
          {
            login: 'personal-ethics-ai',
            id: 'agent-001',
            avatarUrl: 'https://github.com/personal-ethics-ai.png',
            url: 'https://github.com/personal-ethics-ai',
            name: 'Personal Ethics Assistant',
            bio: 'AI agent specializing in ethical analysis and term development'
          }
        ]
      },
      labels: {
        nodes: [
          { id: 'label-1', name: 'term-development', color: '0366d6', description: 'Term definition development' },
          { id: 'label-2', name: 'environment', color: '28a745', description: 'Environmental domain' },
          { id: 'label-3', name: 'ai-review', color: 'f39c12', description: 'Under AI review' }
        ]
      },
      comments: {
        totalCount: 2,
        nodes: [
          {
            id: 'comment-1',
            body: `## AI Review - Personal Ethics Assistant

**Overall Score: 8.2/10**

### Strengths
- Strong conceptual foundation with clear systems perspective
- Novel approach to interconnected wellbeing
- Good domain alignment with environmental ethics

### Suggestions for Improvement
1. Include specific examples of regenerative actions
2. Define threshold criteria for "positive feedback loops"  
3. Add connection to existing environmental ethics frameworks

### Assessment Scores
- **Clarity**: 78%
- **Uniqueness**: 92%
- **Domain Alignment**: 88%
- **Practical Applicability**: 75%

The term shows strong potential but would benefit from more concrete examples and measurable indicators.`,
            createdAt: '2024-12-14T09:00:00Z',
            updatedAt: '2024-12-14T09:00:00Z',
            author: {
              login: 'personal-ethics-ai',
              id: 'agent-001',
              avatarUrl: 'https://github.com/personal-ethics-ai.png',
              url: 'https://github.com/personal-ethics-ai',
              name: 'Personal Ethics Assistant'
            },
            isBot: true,
            hasAssignedAgent: true,
            assignedAgentId: 'agent-001',
            aiAssignment: {
              taskType: 'definition_review',
              assignedBy: 'user123',
              tools_used: ['ethics_analyzer', 'clarity_checker', 'domain_validator'],
              confidence: 0.85,
              isAutomated: false,
              assignmentType: 'user_requested',
              triggeredBy: ['manual_assignment'],
              completionStatus: 'completed',
              results: {
                score: 8.2,
                feedback: 'Strong conceptual foundation with clear systems perspective. Consider adding measurable indicators for practical implementation.',
                suggestions: [
                  'Include specific examples of regenerative actions',
                  'Define threshold criteria for "positive feedback loops"',
                  'Add connection to existing environmental ethics frameworks'
                ],
                issues: []
              }
            },
            reactions: {
              totalCount: 3,
              nodes: [
                { content: '👍', user: { login: 'user123', id: 'user-123', avatarUrl: '', url: '' } },
                { content: '💡', user: { login: 'user456', id: 'user-456', avatarUrl: '', url: '' } }
              ]
            }
          },
          {
            id: 'comment-2',
            body: `Thanks for the detailed review! I'll work on incorporating those suggestions. 

@personal-ethics-ai Could you also analyze the uniqueness compared to existing terms like "sustainable wellbeing" and "holistic health"?`,
            createdAt: '2024-12-14T11:30:00Z',
            updatedAt: '2024-12-14T11:30:00Z',
            author: {
              login: 'user123',
              id: 'user-123',
              avatarUrl: 'https://github.com/user123.png',
              url: 'https://github.com/user123',
              name: 'Alice Johnson'
            },
            reactions: {
              totalCount: 0,
              nodes: []
            }
          }
        ]
      },
      reactions: {
        totalCount: 1,
        nodes: [
          { content: '👍', user: { login: 'user456', id: 'user-456', avatarUrl: '', url: '' } }
        ]
      },
      termDraft: {
        termName: 'regenerative-wellbeing',
        definition: 'A state where an entity not only maintains its own wellbeing but actively contributes to the wellbeing of the systems and communities it is part of, creating positive feedback loops that enhance collective flourishing.',
        rationale: 'Current definitions of wellbeing focus on individual states without considering the interconnected nature of ecological and social systems. This term captures the dynamic relationship between personal and collective wellbeing.',
        domain: 'environment',
        tags: ['ecology', 'systems-thinking', 'collective-wellbeing'],
        status: 'ai_review',
        progress: {
          completeness: 85,
          clarity: 78,
          uniqueness: 92,
          alignment: 88
        },
        submissionReadiness: {
          overallScore: 67,
          criteria: [
            { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
            { name: 'Unique contribution', met: true, description: 'Offers new perspective on wellbeing' },
            { name: 'Domain alignment', met: true, description: 'Fits well within environmental domain' },
            { name: 'AI review completed', met: true, description: 'Personal AI has reviewed and scored' },
            { name: 'Peer review', met: false, description: 'Needs at least 2 peer reviews' },
            { name: 'Implementation examples', met: false, description: 'Needs practical examples' }
          ]
        }
      }
    },
    {
      id: 'issue-2',
      number: 2,
      title: 'Term Development: consent-transparency',
      body: `## Term Definition
**consent-transparency**: The practice of making all aspects of consent processes visible and understandable to all affected parties, including the information provided, decision-making process, and ongoing ability to modify or withdraw consent.

## Rationale
Traditional consent models often lack transparency about how decisions are made and what information is actually understood by consenting parties.

## Domain
core-governance

## Tags
consent, transparency, governance

## Status
Ready for submission to public pool after successful peer reviews.`,
      state: 'open',
      createdAt: '2024-12-08T14:00:00Z',
      updatedAt: '2024-12-12T11:20:00Z',
      author: {
        login: 'user123',
        id: 'user-123',
        avatarUrl: 'https://github.com/user123.png',
        url: 'https://github.com/user123',
        name: 'Alice Johnson'
      },
      assignees: {
        nodes: [
          {
            login: 'governance-specialist-ai',
            id: 'agent-002',
            avatarUrl: 'https://github.com/governance-specialist-ai.png',
            url: 'https://github.com/governance-specialist-ai',
            name: 'Governance Specialist AI',
            bio: 'AI agent specializing in governance and policy analysis'
          }
        ]
      },
      labels: {
        nodes: [
          { id: 'label-1', name: 'term-development', color: '0366d6', description: 'Term definition development' },
          { id: 'label-4', name: 'core-governance', color: 'e74c3c', description: 'Core governance domain' },
          { id: 'label-5', name: 'ready-for-submission', color: '27ae60', description: 'Ready for public submission' }
        ]
      },
      comments: {
        totalCount: 3,
        nodes: []
      },
      reactions: {
        totalCount: 2,
        nodes: [
          { content: '👍', user: { login: 'user456', id: 'user-456', avatarUrl: '', url: '' } },
          { content: '🎯', user: { login: 'user789', id: 'user-789', avatarUrl: '', url: '' } }
        ]
      },
      termDraft: {
        termName: 'consent-transparency',
        definition: 'The practice of making all aspects of consent processes visible and understandable to all affected parties, including the information provided, decision-making process, and ongoing ability to modify or withdraw consent.',
        rationale: 'Traditional consent models often lack transparency about how decisions are made and what information is actually understood by consenting parties.',
        domain: 'core-governance',
        tags: ['consent', 'transparency', 'governance'],
        status: 'ready_for_submission',
        progress: {
          completeness: 95,
          clarity: 89,
          uniqueness: 85,
          alignment: 93
        },
        submissionReadiness: {
          overallScore: 92,
          criteria: [
            { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
            { name: 'Unique contribution', met: true, description: 'Provides new framework for consent' },
            { name: 'Domain alignment', met: true, description: 'Well-suited for governance domain' },
            { name: 'AI review completed', met: true, description: 'High score from specialized AI' },
            { name: 'Peer review', met: true, description: '2 peer reviews completed' },
            { name: 'Implementation examples', met: true, description: 'Practical examples provided' }
          ]
        }
      }
    }
  ];
}