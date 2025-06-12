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