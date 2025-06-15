// GitHub User type
export interface GitHubUser {
  login: string;
  id: string;
  avatarUrl: string;
  url: string;
  name?: string;
  bio?: string;
}

// Label type
export interface GitHubLabel {
  id: string;
  name: string;
  color: string;
  description?: string;
}

// Discussion Comment type
export interface GitHubDiscussionComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: GitHubUser;
  isAnswer?: boolean;
  isBot?: boolean;
  hasAssignedAgent?: boolean;
  assignedAgentId?: string;
  parentCommentId?: string;
  verificationTarget?: string;
  aiAssignment?: {
    taskType: string;
    assignedBy: string;
    tools_used: string[];
    confidence: number;
    isAutomated?: boolean;
    assignmentType?: 'user_requested' | 'third_party_verification' | 'system_automatic';
    triggeredBy?: string[];
  };
  replies?: {
    totalCount: number;
    nodes: GitHubDiscussionComment[];
  };
  upvoteCount: number;
}

// Discussion type
export interface GitHubDiscussion {
  id: string;
  number: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  closed: boolean;
  closedAt?: string;
  author: GitHubUser;
  category: {
    id: string;
    name: string;
    slug: string;
    emoji?: string;
    isAnswerable?: boolean;
  };
  labels: {
    nodes: GitHubLabel[];
  };
  comments: {
    totalCount: number;
    nodes: GitHubDiscussionComment[];
  };
  upvoteCount: number;
  answerChosenAt?: string;
  answer?: GitHubDiscussionComment;
}

// GraphQL-style connection types
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface DiscussionConnection {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: GitHubDiscussion[];
}

// List options
export interface ListOptions {
  first?: number;
  after?: string;
  orderBy?: {
    field: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS';
    direction: 'ASC' | 'DESC';
  };
  labels?: string[];
  states?: ('OPEN' | 'CLOSED')[];
  category?: string;
}

// Term Discussion Types
export interface TermDefinition {
  version: string;
  text: string;
  ratified_date: string;
  approval_rate: string;
  ratification_comment_id: string;
  author: GitHubUser;
  extends?: string;
  specificity?: string;
}

export interface TermVersionHistory {
  version: string;
  text: string;
  proposed_date: string;
  ratified_date?: string;
  status: 'active' | 'superseded' | 'rejected';
  approval_rate?: string;
  proposer: GitHubUser;
  initial_adoption?: boolean;
}

export interface ProposedTermVersion {
  version: string;
  text: string;
  proposed_date: string;
  proposer: GitHubUser;
  status: 'under_discussion' | 'voting' | 'rejected';
  current_support: string;
  discussion_deadline?: string;
  changes_from_current?: string[];
}

export interface TermDiscussion {
  id: string;
  number: number;
  title: string;
  status: 'active' | 'closed';
  category: {
    id: string;
    name: string;
    slug: string;
    emoji?: string;
  };
  current_definition: TermDefinition;
  version_history: TermVersionHistory[];
  proposed_versions: ProposedTermVersion[];
  comments: {
    totalCount: number;
    nodes: GitHubDiscussionComment[];
  };
  labels: {
    nodes: GitHubLabel[];
  };
  upvoteCount: number;
  createdAt: string;
  updatedAt: string;
  closed: boolean;
}

// GitHub Issues types for private term development
export interface GitHubIssueComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: GitHubUser;
  isBot?: boolean;
  hasAssignedAgent?: boolean;
  assignedAgentId?: string;
  aiAssignment?: {
    taskType: 'definition_review' | 'clarity_analysis' | 'uniqueness_check' | 'domain_alignment' | 'peer_review_request';
    assignedBy: string;
    tools_used: string[];
    confidence: number;
    isAutomated?: boolean;
    assignmentType?: 'user_requested' | 'third_party_verification' | 'system_automatic';
    triggeredBy?: string[];
    completionStatus?: 'pending' | 'in_progress' | 'completed' | 'failed';
    results?: {
      score?: number;
      feedback?: string;
      suggestions?: string[];
      issues?: string[];
    };
  };
  reactions: {
    totalCount: number;
    nodes: Array<{
      content: string;
      user: GitHubUser;
    }>;
  };
}

export interface GitHubMilestone {
  id: string;
  number: number;
  title: string;
  description?: string;
  state: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  dueOn?: string;
  closedAt?: string;
}

export interface GitHubIssue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  author: GitHubUser;
  assignees: {
    nodes: GitHubUser[];
  };
  labels: {
    nodes: GitHubLabel[];
  };
  milestone?: GitHubMilestone;
  comments: {
    totalCount: number;
    nodes: GitHubIssueComment[];
  };
  reactions: {
    totalCount: number;
    nodes: Array<{
      content: string;
      user: GitHubUser;
    }>;
  };
  // Term development specific fields
  termDraft?: {
    termName: string;
    definition: string;
    rationale: string;
    domain: string;
    tags: string[];
    status: 'draft' | 'ai_review' | 'peer_review' | 'ready_for_submission' | 'submitted';
    progress: {
      completeness: number;
      clarity: number;
      uniqueness: number;
      alignment: number;
    };
    submissionReadiness: {
      overallScore: number;
      criteria: Array<{
        name: string;
        met: boolean;
        description: string;
      }>;
    };
  };
}

export interface IssueConnection {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: GitHubIssue[];
}

// Issue-specific list options
export interface IssueListOptions {
  first?: number;
  after?: string;
  orderBy?: {
    field: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS';
    direction: 'ASC' | 'DESC';
  };
  labels?: string[];
  states?: ('OPEN' | 'CLOSED')[];
  assignee?: string;
  milestone?: string;
  termDraftStatus?: 'draft' | 'ai_review' | 'peer_review' | 'ready_for_submission' | 'submitted';
}