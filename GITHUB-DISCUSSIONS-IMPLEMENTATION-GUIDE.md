# GitHub Discussions/Issues Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing GitHub-compatible discussions and issues for DAHAO's term and principle governance system.

## Table of Contents
1. [Type Definitions](#1-type-definitions)
2. [Mock Data Structure](#2-mock-data-structure)
3. [Data Service Layer](#3-data-service-layer)
4. [API Routes](#4-api-routes)
5. [UI Components](#5-ui-components)
6. [Page Routes](#6-page-routes)
7. [Integration Points](#7-integration-points)
8. [Testing](#8-testing)

---

## 1. Type Definitions

### Create: `src/types/github-compatible.ts`

```typescript
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

// Milestone type
export interface GitHubMilestone {
  id: string;
  number: number;
  title: string;
  description?: string;
  state: 'OPEN' | 'CLOSED';
  dueOn?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
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

// Issue Comment type
export interface GitHubIssueComment {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: GitHubUser;
}

// Issue type
export interface GitHubIssue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'OPEN' | 'CLOSED';
  stateReason?: 'COMPLETED' | 'NOT_PLANNED' | 'REOPENED';
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

export interface IssueConnection {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: GitHubIssue[];
}

// Category type
export interface DiscussionCategory {
  id: string;
  name: string;
  slug: string;
  emoji?: string;
  description?: string;
  isAnswerable?: boolean;
}

// List options
export interface ListOptions {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  orderBy?: {
    field: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS';
    direction: 'ASC' | 'DESC';
  };
  labels?: string[];
  states?: ('OPEN' | 'CLOSED')[];
  category?: string;
}
```

---

## 2. Mock Data Structure

### Create mock data files in governance directories:

#### `dahao-governance/core-governance/terms/v1.0/harm/.github/discussions.yml`

```yaml
discussions:
  - id: "D_kwDOAE5jvM4AQz5K"
    number: 1
    title: "Expanding 'harm' definition to include systemic harm"
    body: |
      ## Current Gap
      
      The current definition of harm@v1.1 covers individual harm well, but lacks consideration for systemic and structural harm that affects communities and societies.
      
      ### Proposed Addition
      
      Add a new subsection to address:
      - Systemic discrimination
      - Environmental injustice
      - Economic exploitation patterns
      - Institutional bias
      
      ### References
      - Related to principle P003 (minimize harm)
      - Builds on equality@v1.0 definition
      
      What are your thoughts on this expansion?
    createdAt: "2024-11-20T10:00:00Z"
    updatedAt: "2024-11-21T14:30:00Z"
    closed: false
    author:
      login: "social_justice_advocate"
      id: "MDQ6VXNlcjE="
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4"
      url: "https://github.com/social_justice_advocate"
      name: "Jordan Smith"
    category:
      id: "DIC_kwDOAE5jvM4B-J8F"
      name: "Ideas"
      slug: "ideas"
      emoji: "💡"
    labels:
      nodes:
        - id: "MDU6TGFiZWwx"
          name: "enhancement"
          color: "a2eeef"
          description: "New feature or request"
        - id: "MDU6TGFiZWwy"
          name: "term-evolution"
          color: "0052cc"
          description: "Proposing term definition changes"
    comments:
      totalCount: 3
      nodes:
        - id: "DC_kwDOAE5jvM4AQ0A1"
          body: |
            Strong support for this. Modern understanding of harm must include systemic patterns.
            
            I suggest we also consider:
            - Intergenerational harm
            - Digital/algorithmic bias
            - Cultural erasure
          createdAt: "2024-11-20T11:00:00Z"
          updatedAt: "2024-11-20T11:00:00Z"
          author:
            login: "ethics_professor"
            id: "MDQ6VXNlcjI="
            avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4"
            url: "https://github.com/ethics_professor"
            name: "Dr. Sarah Chen"
          upvoteCount: 8
        - id: "DC_kwDOAE5jvM4AQ0A2"
          body: |
            While I support expanding the definition, we need to be careful about scope creep.
            
            How do we ensure the definition remains:
            1. Actionable
            2. Measurable
            3. Enforceable
            
            Perhaps we need a tiered approach?
          createdAt: "2024-11-20T15:30:00Z"
          updatedAt: "2024-11-20T15:30:00Z"
          author:
            login: "pragmatic_dev"
            id: "MDQ6VXNlcjM="
            avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4"
            url: "https://github.com/pragmatic_dev"
            name: "Alex Kumar"
          upvoteCount: 5
    upvoteCount: 15

  - id: "D_kwDOAE5jvM4AQz5L"
    number: 2
    title: "Clarifying 'immediate' in harm prevention contexts"
    body: |
      The current definition uses "immediate harm" but this is ambiguous. 
      
      Does immediate mean:
      - Temporal (happening right now)?
      - Causal (direct consequence)?
      - Priority (most urgent)?
      
      This affects how we implement harm prevention in automated systems.
    createdAt: "2024-11-22T09:00:00Z"
    updatedAt: "2024-11-22T09:00:00Z"
    closed: false
    author:
      login: "ai_safety_researcher"
      id: "MDQ6VXNlcjQ="
      avatarUrl: "https://avatars.githubusercontent.com/u/4?v=4"
      url: "https://github.com/ai_safety_researcher"
      name: "Robin Zhang"
    category:
      id: "DIC_kwDOAE5jvM4B-J8G"
      name: "Q&A"
      slug: "q-a"
      emoji: "🙏"
      isAnswerable: true
    labels:
      nodes:
        - id: "MDU6TGFiZWwz"
          name: "clarification"
          color: "d876e3"
          description: "Further information is requested"
    comments:
      totalCount: 1
      nodes: []
    upvoteCount: 7
```

#### `dahao-governance/core-governance/terms/v1.0/harm/.github/issues.yml`

```yaml
issues:
  - id: "I_kwDOAE5jvM4AQz5M"
    number: 1
    title: "Term versioning breaks when referencing future versions"
    body: |
      ## Bug Description
      
      When a document references a term version that doesn't exist yet (e.g., harm@v2.0), the system throws an error instead of gracefully handling it.
      
      ### Steps to Reproduce
      1. Create a document referencing harm@v2.0
      2. Try to validate the document
      3. System crashes with "TermNotFoundError"
      
      ### Expected Behavior
      Should show a warning but allow draft documents to reference planned versions.
      
      ### Actual Behavior
      Complete validation failure.
      
      ### Environment
      - DAHAO Version: 0.1.0
      - Browser: Chrome 119
    state: "OPEN"
    createdAt: "2024-11-19T14:20:00Z"
    updatedAt: "2024-11-20T10:15:00Z"
    author:
      login: "bug_hunter"
      id: "MDQ6VXNlcjU="
      avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4"
      url: "https://github.com/bug_hunter"
      name: "Casey Liu"
    assignees:
      nodes:
        - login: "term_system_maintainer"
          id: "MDQ6VXNlcjY="
          avatarUrl: "https://avatars.githubusercontent.com/u/6?v=4"
          url: "https://github.com/term_system_maintainer"
          name: "Sam Patel"
    labels:
      nodes:
        - id: "MDU6TGFiZWw0"
          name: "bug"
          color: "d73a4a"
          description: "Something isn't working"
        - id: "MDU6TGFiZWw1"
          name: "term-system"
          color: "fbca04"
          description: "Related to term versioning system"
    milestone:
      id: "MDk6TWlsZXN0"
      number: 1
      title: "v0.2.0 - Robust Term System"
      description: "Improve term versioning and validation"
      state: "OPEN"
      dueOn: "2024-12-31T00:00:00Z"
      createdAt: "2024-11-01T00:00:00Z"
      updatedAt: "2024-11-01T00:00:00Z"
    comments:
      totalCount: 2
      nodes:
        - id: "IC_kwDOAE5jvM4AQ0A3"
          body: |
            I can work on this. The fix would involve:
            1. Adding a "draft mode" flag
            2. Converting hard errors to warnings in draft mode
            3. Adding a "planned versions" registry
          createdAt: "2024-11-19T15:00:00Z"
          updatedAt: "2024-11-19T15:00:00Z"
          author:
            login: "term_system_maintainer"
            id: "MDQ6VXNlcjY="
            avatarUrl: "https://avatars.githubusercontent.com/u/6?v=4"
            url: "https://github.com/term_system_maintainer"
            name: "Sam Patel"
```

#### `dahao-governance/core-governance/terms/v1.0/harm/.github/labels.yml`

```yaml
labels:
  - name: "enhancement"
    color: "a2eeef"
    description: "New feature or request"
  
  - name: "bug"
    color: "d73a4a"
    description: "Something isn't working"
  
  - name: "documentation"
    color: "0075ca"
    description: "Improvements or additions to documentation"
  
  - name: "term-evolution"
    color: "0052cc"
    description: "Proposing term definition changes"
  
  - name: "clarification"
    color: "d876e3"
    description: "Further information is requested"
  
  - name: "term-system"
    color: "fbca04"
    description: "Related to term versioning system"
  
  - name: "good first issue"
    color: "7057ff"
    description: "Good for newcomers"
  
  - name: "help wanted"
    color: "008672"
    description: "Extra attention is needed"
  
  - name: "wontfix"
    color: "ffffff"
    description: "This will not be worked on"
```

#### `dahao-governance/core-governance/terms/v1.0/harm/.github/discussion-categories.yml`

```yaml
discussionCategories:
  - id: "DIC_kwDOAE5jvM4B-J8F"
    name: "Ideas"
    slug: "ideas"
    emoji: "💡"
    description: "Share ideas for new features or improvements"
  
  - id: "DIC_kwDOAE5jvM4B-J8G"
    name: "Q&A"
    slug: "q-a"
    emoji: "🙏"
    description: "Ask the community for help"
    isAnswerable: true
  
  - id: "DIC_kwDOAE5jvM4B-J8H"
    name: "General"
    slug: "general"
    emoji: "💬"
    description: "General discussions about this term"
  
  - id: "DIC_kwDOAE5jvM4B-J8I"
    name: "Show and tell"
    slug: "show-and-tell"
    emoji: "🎉"
    description: "Show how you're using this term"
  
  - id: "DIC_kwDOAE5jvM4B-J8J"
    name: "Polls"
    slug: "polls"
    emoji: "📊"
    description: "Take a vote from the community"
```

#### `dahao-governance/core-governance/terms/v1.0/harm/.github/milestones.yml`

```yaml
milestones:
  - id: "MDk6TWlsZXN0"
    number: 1
    title: "v1.2 - Systemic Harm"
    description: "Expand harm definition to include systemic patterns"
    state: "OPEN"
    dueOn: "2025-03-31T00:00:00Z"
    createdAt: "2024-11-01T00:00:00Z"
    updatedAt: "2024-11-01T00:00:00Z"
  
  - id: "MDk6TWlsZXN1"
    number: 2
    title: "v1.3 - Digital Context"
    description: "Add considerations for digital and AI-related harm"
    state: "OPEN"
    dueOn: "2025-06-30T00:00:00Z"
    createdAt: "2024-11-01T00:00:00Z"
    updatedAt: "2024-11-01T00:00:00Z"
```

---

## 3. Data Service Layer

### Create: `src/services/github-data-service.ts`

```typescript
import { 
  GitHubDiscussion, 
  GitHubIssue, 
  DiscussionConnection, 
  IssueConnection,
  ListOptions,
  DiscussionCategory,
  GitHubLabel,
  GitHubMilestone
} from '@/types/github-compatible';
import { getDataSource } from '@/lib/github/migration-status';
import yaml from 'js-yaml';
import { promises as fs } from 'fs';
import path from 'path';

// Interface for data service
export interface IGitHubDataService {
  // Discussions
  getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection>;
  getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null>;
  
  // Issues
  getIssues(owner: string, repo: string, options?: ListOptions): Promise<IssueConnection>;
  getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null>;
  
  // Metadata
  getLabels(owner: string, repo: string): Promise<GitHubLabel[]>;
  getCategories(owner: string, repo: string): Promise<DiscussionCategory[]>;
  getMilestones(owner: string, repo: string): Promise<GitHubMilestone[]>;
}

// Mock implementation
export class MockGitHubDataService implements IGitHubDataService {
  private basePath = 'dahao-governance';

  private async loadYamlFile<T>(filePath: string): Promise<T | null> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return yaml.load(content) as T;
    } catch (error) {
      console.error(`Failed to load YAML file: ${filePath}`, error);
      return null;
    }
  }

  private getRepoPath(owner: string, repo: string): string {
    // Map owner/repo to governance structure
    // Example: "core-governance/harm" -> "dahao-governance/core-governance/terms/v1.0/harm"
    const [domain, term] = repo.split('/');
    return path.join(this.basePath, owner, 'terms', 'v1.0', term, '.github');
  }

  async getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection> {
    const repoPath = this.getRepoPath(owner, repo);
    const discussionsPath = path.join(repoPath, 'discussions.yml');
    
    const data = await this.loadYamlFile<{ discussions: GitHubDiscussion[] }>(discussionsPath);
    
    if (!data || !data.discussions) {
      return {
        totalCount: 0,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        },
        nodes: []
      };
    }

    // Apply filters
    let discussions = [...data.discussions];
    
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

  async getIssues(owner: string, repo: string, options?: ListOptions): Promise<IssueConnection> {
    const repoPath = this.getRepoPath(owner, repo);
    const issuesPath = path.join(repoPath, 'issues.yml');
    
    const data = await this.loadYamlFile<{ issues: GitHubIssue[] }>(issuesPath);
    
    if (!data || !data.issues) {
      return {
        totalCount: 0,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        },
        nodes: []
      };
    }

    // Apply filters (similar to discussions)
    let issues = [...data.issues];
    
    // Filter by state
    if (options?.states && options.states.length > 0) {
      issues = issues.filter(i => 
        options.states!.includes(i.state)
      );
    }
    
    // Filter by labels
    if (options?.labels && options.labels.length > 0) {
      issues = issues.filter(i => 
        i.labels.nodes.some(label => options.labels!.includes(label.name))
      );
    }
    
    // Sort and paginate (similar to discussions)
    // ... (implement similar logic)
    
    return {
      totalCount: issues.length,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false
      },
      nodes: issues
    };
  }

  async getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null> {
    const issues = await this.getIssues(owner, repo, { first: 1000 });
    return issues.nodes.find(i => i.number === number) || null;
  }

  async getLabels(owner: string, repo: string): Promise<GitHubLabel[]> {
    const repoPath = this.getRepoPath(owner, repo);
    const labelsPath = path.join(repoPath, 'labels.yml');
    
    const data = await this.loadYamlFile<{ labels: GitHubLabel[] }>(labelsPath);
    return data?.labels || [];
  }

  async getCategories(owner: string, repo: string): Promise<DiscussionCategory[]> {
    const repoPath = this.getRepoPath(owner, repo);
    const categoriesPath = path.join(repoPath, 'discussion-categories.yml');
    
    const data = await this.loadYamlFile<{ discussionCategories: DiscussionCategory[] }>(categoriesPath);
    return data?.discussionCategories || [];
  }

  async getMilestones(owner: string, repo: string): Promise<GitHubMilestone[]> {
    const repoPath = this.getRepoPath(owner, repo);
    const milestonesPath = path.join(repoPath, 'milestones.yml');
    
    const data = await this.loadYamlFile<{ milestones: GitHubMilestone[] }>(milestonesPath);
    return data?.milestones || [];
  }
}

// Future: Real GitHub implementation
export class GitHubDataService implements IGitHubDataService {
  // This will use Octokit to fetch from real GitHub API
  // Implementation would go here
  
  async getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection> {
    // TODO: Implement with Octokit GraphQL
    throw new Error('Not implemented');
  }

  async getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null> {
    // TODO: Implement with Octokit GraphQL
    throw new Error('Not implemented');
  }

  async getIssues(owner: string, repo: string, options?: ListOptions): Promise<IssueConnection> {
    // TODO: Implement with Octokit REST/GraphQL
    throw new Error('Not implemented');
  }

  async getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null> {
    // TODO: Implement with Octokit REST
    throw new Error('Not implemented');
  }

  async getLabels(owner: string, repo: string): Promise<GitHubLabel[]> {
    // TODO: Implement with Octokit REST
    throw new Error('Not implemented');
  }

  async getCategories(owner: string, repo: string): Promise<DiscussionCategory[]> {
    // TODO: Implement with Octokit GraphQL
    throw new Error('Not implemented');
  }

  async getMilestones(owner: string, repo: string): Promise<GitHubMilestone[]> {
    // TODO: Implement with Octokit REST
    throw new Error('Not implemented');
  }
}

// Smart data service that uses migration status
export class SmartGitHubDataService implements IGitHubDataService {
  private mockService = new MockGitHubDataService();
  private githubService = new GitHubDataService();

  private getServiceForItem(owner: string, repo: string, feature: 'discussions' | 'issues'): IGitHubDataService {
    const [domain, term] = repo.split('/');
    const key = domain === owner ? term : `${domain}/${term}`;
    
    // Check migration status for this specific term
    const dataSource = getDataSource('terms', key, feature);
    return dataSource === 'github' ? this.githubService : this.mockService;
  }

  async getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection> {
    const service = this.getServiceForItem(owner, repo, 'discussions');
    return service.getDiscussions(owner, repo, options);
  }

  async getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null> {
    const service = this.getServiceForItem(owner, repo, 'discussions');
    return service.getDiscussion(owner, repo, number);
  }

  async getIssues(owner: string, repo: string, options?: ListOptions): Promise<IssueConnection> {
    const service = this.getServiceForItem(owner, repo, 'issues');
    return service.getIssues(owner, repo, options);
  }

  async getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue | null> {
    const service = this.getServiceForItem(owner, repo, 'issues');
    return service.getIssue(owner, repo, number);
  }

  async getLabels(owner: string, repo: string): Promise<GitHubLabel[]> {
    // Always use the discussions service for metadata
    const service = this.getServiceForItem(owner, repo, 'discussions');
    return service.getLabels(owner, repo);
  }

  async getCategories(owner: string, repo: string): Promise<DiscussionCategory[]> {
    const service = this.getServiceForItem(owner, repo, 'discussions');
    return service.getCategories(owner, repo);
  }

  async getMilestones(owner: string, repo: string): Promise<GitHubMilestone[]> {
    const service = this.getServiceForItem(owner, repo, 'issues');
    return service.getMilestones(owner, repo);
  }
}

// Factory function
export function createGitHubDataService(): IGitHubDataService {
  const useGlobalFlag = process.env.USE_GITHUB_API === 'true';
  
  if (useGlobalFlag) {
    // Use real GitHub for everything
    return new GitHubDataService();
  }
  
  // Use smart service that respects per-item migration status
  return new SmartGitHubDataService();
}
```

### Create: `src/lib/github/config.ts`

```typescript
export const GITHUB_CONFIG = {
  // Feature flags
  features: {
    discussions: process.env.NEXT_PUBLIC_GITHUB_DISCUSSIONS || 'mock',
    issues: process.env.NEXT_PUBLIC_GITHUB_ISSUES || 'mock',
  },
  
  // Mock data paths
  mockData: {
    basePath: 'dahao-governance',
    discussionsFile: 'discussions.yml',
    issuesFile: 'issues.yml',
    labelsFile: 'labels.yml',
    categoriesFile: 'discussion-categories.yml',
    milestonesFile: 'milestones.yml',
  },
  
  // GitHub API config (for future)
  api: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
  }
};
```

### Create: `src/lib/github/migration-status.ts`

```typescript
// Migration status tracker for gradual GitHub API migration
export type DataSource = 'mock' | 'github';

export interface MigrationStatus {
  terms: Record<string, {
    discussions: DataSource;
    issues: DataSource;
  }>;
  principles: Record<string, {
    discussions: DataSource;
    issues: DataSource;
  }>;
}

export const MIGRATION_STATUS: MigrationStatus = {
  terms: {
    // Core governance terms
    harm: { discussions: 'mock', issues: 'mock' },
    equality: { discussions: 'github', issues: 'mock' }, // Partially migrated
    fairness: { discussions: 'mock', issues: 'mock' },
    transparency: { discussions: 'mock', issues: 'mock' },
    accountability: { discussions: 'mock', issues: 'mock' },
    
    // Ethics domain terms
    'ethics/dignity': { discussions: 'mock', issues: 'mock' },
    'ethics/autonomy': { discussions: 'mock', issues: 'mock' },
    'ethics/beneficence': { discussions: 'mock', issues: 'mock' },
    
    // Environment domain terms
    'environment/sustainability': { discussions: 'mock', issues: 'mock' },
    'environment/conservation': { discussions: 'mock', issues: 'mock' },
    'environment/biodiversity': { discussions: 'mock', issues: 'mock' },
  },
  
  principles: {
    // Core governance principles
    transparency: { discussions: 'mock', issues: 'mock' },
    accountability: { discussions: 'mock', issues: 'mock' },
    participation: { discussions: 'mock', issues: 'mock' },
    
    // Ethics principles
    'ethics/minimize-harm': { discussions: 'mock', issues: 'mock' },
    'ethics/respect-autonomy': { discussions: 'mock', issues: 'mock' },
    'ethics/promote-wellbeing': { discussions: 'mock', issues: 'mock' },
    
    // Environment principles
    'environment/protect-ecosystems': { discussions: 'mock', issues: 'mock' },
    'environment/sustainable-practices': { discussions: 'mock', issues: 'mock' },
  }
};

// Helper functions
export function getDataSource(
  type: 'terms' | 'principles',
  key: string,
  feature: 'discussions' | 'issues'
): DataSource {
  const status = MIGRATION_STATUS[type][key];
  if (!status) {
    // Default to mock for unknown items
    return 'mock';
  }
  return status[feature];
}

export function isFullyMigrated(type: 'terms' | 'principles', key: string): boolean {
  const status = MIGRATION_STATUS[type][key];
  if (!status) return false;
  return status.discussions === 'github' && status.issues === 'github';
}

export function isMigrationInProgress(type: 'terms' | 'principles', key: string): boolean {
  const status = MIGRATION_STATUS[type][key];
  if (!status) return false;
  return status.discussions !== status.issues;
}

export function getMigrationProgress(): {
  total: number;
  migrated: number;
  inProgress: number;
  percentage: number;
} {
  const allItems = [
    ...Object.keys(MIGRATION_STATUS.terms),
    ...Object.keys(MIGRATION_STATUS.principles)
  ];
  
  const total = allItems.length;
  let migrated = 0;
  let inProgress = 0;
  
  allItems.forEach(key => {
    const isTerms = key in MIGRATION_STATUS.terms;
    const type = isTerms ? 'terms' : 'principles';
    
    if (isFullyMigrated(type as any, key)) {
      migrated++;
    } else if (isMigrationInProgress(type as any, key)) {
      inProgress++;
    }
  });
  
  return {
    total,
    migrated,
    inProgress,
    percentage: Math.round((migrated / total) * 100)
  };
}

// Migration utilities
export function setDataSource(
  type: 'terms' | 'principles',
  key: string,
  feature: 'discussions' | 'issues',
  source: DataSource
): void {
  if (!MIGRATION_STATUS[type][key]) {
    MIGRATION_STATUS[type][key] = { discussions: 'mock', issues: 'mock' };
  }
  MIGRATION_STATUS[type][key][feature] = source;
}

export function migrateItem(
  type: 'terms' | 'principles',
  key: string,
  feature?: 'discussions' | 'issues'
): void {
  if (!MIGRATION_STATUS[type][key]) {
    MIGRATION_STATUS[type][key] = { discussions: 'mock', issues: 'mock' };
  }
  
  if (feature) {
    // Migrate specific feature
    MIGRATION_STATUS[type][key][feature] = 'github';
  } else {
    // Migrate both
    MIGRATION_STATUS[type][key].discussions = 'github';
    MIGRATION_STATUS[type][key].issues = 'github';
  }
}

export function rollbackItem(
  type: 'terms' | 'principles',
  key: string,
  feature?: 'discussions' | 'issues'
): void {
  if (!MIGRATION_STATUS[type][key]) return;
  
  if (feature) {
    // Rollback specific feature
    MIGRATION_STATUS[type][key][feature] = 'mock';
  } else {
    // Rollback both
    MIGRATION_STATUS[type][key].discussions = 'mock';
    MIGRATION_STATUS[type][key].issues = 'mock';
  }
}
```

---

## 4. API Routes

### Create: `src/app/api/github-mock/[owner]/[repo]/discussions/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const dataService = createGitHubDataService();
    
    // Parse query parameters
    const options = {
      first: parseInt(searchParams.get('first') || '10'),
      after: searchParams.get('after') || undefined,
      orderBy: searchParams.get('orderBy') ? {
        field: searchParams.get('orderBy') as any,
        direction: (searchParams.get('direction') || 'DESC') as any
      } : undefined,
      labels: searchParams.get('labels')?.split(',').filter(Boolean),
      states: searchParams.get('states')?.split(',').filter(Boolean) as any,
      category: searchParams.get('category') || undefined,
    };
    
    const discussions = await dataService.getDiscussions(
      params.owner,
      params.repo,
      options
    );
    
    // Return GitHub GraphQL-style response
    return NextResponse.json({
      data: {
        repository: {
          owner: { login: params.owner },
          name: params.repo,
          discussions: discussions
        }
      }
    });
  } catch (error) {
    console.error('Failed to fetch discussions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    );
  }
}
```

### Create: `src/app/api/github-mock/[owner]/[repo]/discussions/[number]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string; number: string } }
) {
  try {
    const dataService = createGitHubDataService();
    const discussion = await dataService.getDiscussion(
      params.owner,
      params.repo,
      parseInt(params.number)
    );
    
    if (!discussion) {
      return NextResponse.json(
        { error: 'Discussion not found' },
        { status: 404 }
      );
    }
    
    // Return GitHub GraphQL-style response
    return NextResponse.json({
      data: {
        repository: {
          owner: { login: params.owner },
          name: params.repo,
          discussion: discussion
        }
      }
    });
  } catch (error) {
    console.error('Failed to fetch discussion:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discussion' },
      { status: 500 }
    );
  }
}
```

### Create: `src/app/api/github-mock/[owner]/[repo]/issues/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const dataService = createGitHubDataService();
    
    // Parse query parameters
    const options = {
      first: parseInt(searchParams.get('first') || '10'),
      after: searchParams.get('after') || undefined,
      orderBy: searchParams.get('orderBy') ? {
        field: searchParams.get('orderBy') as any,
        direction: (searchParams.get('direction') || 'DESC') as any
      } : undefined,
      labels: searchParams.get('labels')?.split(',').filter(Boolean),
      states: searchParams.get('states')?.split(',').filter(Boolean) as any,
    };
    
    const issues = await dataService.getIssues(
      params.owner,
      params.repo,
      options
    );
    
    // Return GitHub REST-style response
    return NextResponse.json(issues);
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
```

### Create: `src/app/api/github-mock/[owner]/[repo]/issues/[number]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string; number: string } }
) {
  try {
    const dataService = createGitHubDataService();
    const issue = await dataService.getIssue(
      params.owner,
      params.repo,
      parseInt(params.number)
    );
    
    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(issue);
  } catch (error) {
    console.error('Failed to fetch issue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issue' },
      { status: 500 }
    );
  }
}
```

### Create: `src/app/api/github-mock/[owner]/[repo]/labels/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDataService } from '@/services/github-data-service';

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  try {
    const dataService = createGitHubDataService();
    const labels = await dataService.getLabels(params.owner, params.repo);
    
    return NextResponse.json(labels);
  } catch (error) {
    console.error('Failed to fetch labels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch labels' },
      { status: 500 }
    );
  }
}
```

---

## 5. UI Components

### Create: `src/components/github-compatible/DiscussionList.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Circle, CheckCircle } from 'lucide-react';
import { GitHubDiscussion } from '@/types/github-compatible';

interface DiscussionListProps {
  discussions: GitHubDiscussion[];
  basePath: string; // e.g., "/forum/core-governance/terms/harm"
}

export function DiscussionList({ discussions, basePath }: DiscussionListProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
      {discussions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No discussions found
        </div>
      ) : (
        discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Open/Closed indicator */}
              <div className="mt-1">
                {discussion.closed ? (
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                ) : (
                  <Circle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`${basePath}/discussions/${discussion.number}`}
                    className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {discussion.title}
                  </Link>

                  {/* Labels */}
                  {discussion.labels.nodes.map((label) => (
                    <span
                      key={label.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `#${label.color}20`,
                        color: `#${label.color}`,
                        border: `1px solid #${label.color}40`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {discussion.category.emoji} {discussion.category.name} · opened{' '}
                  {formatDistanceToNow(new Date(discussion.createdAt))} ago by{' '}
                  <Link
                    href={discussion.author.url}
                    className="font-medium hover:underline"
                  >
                    {discussion.author.login}
                  </Link>
                  {discussion.comments.totalCount > 0 && (
                    <> · {discussion.comments.totalCount} comments</>
                  )}
                  {discussion.upvoteCount > 0 && (
                    <> · {discussion.upvoteCount} upvotes</>
                  )}
                </div>
              </div>

              {/* Comment count */}
              {discussion.comments.totalCount > 0 && (
                <Link
                  href={`${basePath}/discussions/${discussion.number}`}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <MessageSquare className="w-4 h-4" />
                  {discussion.comments.totalCount}
                </Link>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
```

### Create: `src/components/github-compatible/IssueList.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, CircleDot, CheckCircle2, XCircle } from 'lucide-react';
import { GitHubIssue } from '@/types/github-compatible';

interface IssueListProps {
  issues: GitHubIssue[];
  basePath: string;
}

export function IssueList({ issues, basePath }: IssueListProps) {
  const getIssueIcon = (issue: GitHubIssue) => {
    if (issue.state === 'OPEN') {
      return <CircleDot className="w-5 h-5 text-green-600" />;
    }
    if (issue.stateReason === 'COMPLETED') {
      return <CheckCircle2 className="w-5 h-5 text-purple-600" />;
    }
    return <XCircle className="w-5 h-5 text-gray-600" />;
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
      {issues.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No issues found
        </div>
      ) : (
        issues.map((issue) => (
          <div
            key={issue.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Issue state indicator */}
              <div className="mt-1">{getIssueIcon(issue)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`${basePath}/issues/${issue.number}`}
                    className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {issue.title}
                  </Link>

                  {/* Labels */}
                  {issue.labels.nodes.map((label) => (
                    <span
                      key={label.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `#${label.color}20`,
                        color: `#${label.color}`,
                        border: `1px solid #${label.color}40`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  #{issue.number} opened{' '}
                  {formatDistanceToNow(new Date(issue.createdAt))} ago by{' '}
                  <Link
                    href={issue.author.url}
                    className="font-medium hover:underline"
                  >
                    {issue.author.login}
                  </Link>
                  {issue.milestone && (
                    <> · Milestone: {issue.milestone.title}</>
                  )}
                  {issue.assignees.nodes.length > 0 && (
                    <> · Assigned to {issue.assignees.nodes.map(a => a.login).join(', ')}</>
                  )}
                </div>
              </div>

              {/* Comment count */}
              {issue.comments.totalCount > 0 && (
                <Link
                  href={`${basePath}/issues/${issue.number}`}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  <MessageSquare className="w-4 h-4" />
                  {issue.comments.totalCount}
                </Link>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
```

### Create: `src/components/github-compatible/DiscussionView.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { GitHubDiscussion, GitHubDiscussionComment } from '@/types/github-compatible';
import { CheckCircle, Circle, ChevronUp, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DiscussionViewProps {
  discussion: GitHubDiscussion;
}

export function DiscussionView({ discussion }: DiscussionViewProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {discussion.closed ? (
            <CheckCircle className="w-6 h-6 text-purple-600" />
          ) : (
            <Circle className="w-6 h-6 text-green-600" />
          )}
          <h1 className="text-2xl font-semibold">
            {discussion.title}
            <span className="text-gray-500 ml-2">#{discussion.number}</span>
          </h1>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link href={discussion.author.url} className="font-medium hover:underline">
            {discussion.author.login}
          </Link>
          {' '}opened this discussion {formatDistanceToNow(new Date(discussion.createdAt))} ago
          {' · '}{discussion.comments.totalCount} comments
        </div>
      </div>

      {/* Main discussion body */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={discussion.author.avatarUrl}
              alt={discussion.author.login}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Link href={discussion.author.url} className="font-medium hover:underline">
                {discussion.author.login}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDistanceToNow(new Date(discussion.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{discussion.body}</ReactMarkdown>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <ChevronUp className="w-4 h-4" />
              {discussion.upvoteCount} upvotes
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {discussion.comments.nodes.map((comment) => (
          <CommentView key={comment.id} comment={comment} isAnswer={comment.id === discussion.answer?.id} />
        ))}
      </div>
    </div>
  );
}

function CommentView({ comment, isAnswer }: { comment: GitHubDiscussionComment; isAnswer?: boolean }) {
  return (
    <div className={`border rounded-lg ${isAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700'}`}>
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={comment.author.avatarUrl}
              alt={comment.author.login}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Link href={comment.author.url} className="font-medium hover:underline">
                {comment.author.login}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
          </div>
          {isAnswer && (
            <span className="text-sm text-green-600 font-medium">✓ Answer</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{comment.body}</ReactMarkdown>
        </div>
        
        <div className="mt-4 flex items-center gap-4">
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
            <ChevronUp className="w-4 h-4" />
            {comment.upvoteCount} upvotes
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Create: `src/components/github-compatible/TabNavigation.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, CircleDot, Clock } from 'lucide-react';

interface TabNavigationProps {
  basePath: string;
  counts?: {
    discussions?: number;
    issues?: number;
  };
}

export function TabNavigation({ basePath, counts }: TabNavigationProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'discussions';

  const tabs = [
    {
      id: 'discussions',
      label: 'Discussions',
      icon: MessageSquare,
      count: counts?.discussions,
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: CircleDot,
      count: counts?.issues,
    },
    {
      id: 'history',
      label: 'History',
      icon: Clock,
    },
  ];

  return (
    <div className="border-b border-gray-300 dark:border-gray-700">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.id}
              href={`${basePath}?tab=${tab.id}`}
              className={`
                py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                ${isActive
                  ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 py-0.5 px-2 rounded-full bg-gray-100 dark:bg-gray-800 text-xs">
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
```

### Create: `src/components/github-compatible/MigrationDashboard.tsx`

```typescript
'use client';

import React from 'react';
import { 
  getMigrationProgress, 
  isFullyMigrated, 
  isMigrationInProgress,
  getDataSource,
  migrateItem,
  rollbackItem,
  MIGRATION_STATUS
} from '@/lib/github/migration-status';
import { CheckCircle, Clock, AlertCircle, Github, Database } from 'lucide-react';

export function MigrationDashboard() {
  const progress = getMigrationProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">GitHub Migration Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track migration progress from mock data to GitHub API
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold">{progress.migrated}</div>
              <div className="text-sm text-gray-600">Fully Migrated</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold">{progress.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-gray-600" />
            <div>
              <div className="text-2xl font-bold">{progress.total - progress.migrated - progress.inProgress}</div>
              <div className="text-sm text-gray-600">Using Mock</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded">
              <span className="text-blue-600 font-bold">{progress.percentage}%</span>
            </div>
            <div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Terms Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Terms Migration Status</h2>
        <div className="space-y-2">
          {Object.entries(MIGRATION_STATUS.terms).map(([term, status]) => (
            <MigrationItem 
              key={term}
              type="terms"
              itemKey={term}
              status={status}
            />
          ))}
        </div>
      </div>

      {/* Principles Status */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Principles Migration Status</h2>
        <div className="space-y-2">
          {Object.entries(MIGRATION_STATUS.principles).map(([principle, status]) => (
            <MigrationItem 
              key={principle}
              type="principles"
              itemKey={principle}
              status={status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MigrationItemProps {
  type: 'terms' | 'principles';
  itemKey: string;
  status: { discussions: 'mock' | 'github'; issues: 'mock' | 'github' };
}

function MigrationItem({ type, itemKey, status }: MigrationItemProps) {
  const isFullyMigratedItem = isFullyMigrated(type, itemKey);
  const isInProgress = isMigrationInProgress(type, itemKey);

  const getStatusIcon = () => {
    if (isFullyMigratedItem) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (isInProgress) {
      return <Clock className="w-5 h-5 text-yellow-600" />;
    }
    return <Database className="w-5 h-5 text-gray-600" />;
  };

  const getDataSourceIcon = (source: 'mock' | 'github') => {
    return source === 'github' 
      ? <Github className="w-4 h-4 text-green-600" />
      : <Database className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className="font-medium">{itemKey}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {type === 'terms' ? 'Term' : 'Principle'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Discussions Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Discussions:</span>
            {getDataSourceIcon(status.discussions)}
            <span className="text-xs text-gray-600">
              {status.discussions}
            </span>
          </div>

          {/* Issues Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Issues:</span>
            {getDataSourceIcon(status.issues)}
            <span className="text-xs text-gray-600">
              {status.issues}
            </span>
          </div>

          {/* Migration Controls */}
          <div className="flex gap-2">
            {status.discussions === 'mock' && (
              <button
                onClick={() => migrateItem(type, itemKey, 'discussions')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Migrate Discussions
              </button>
            )}
            {status.discussions === 'github' && (
              <button
                onClick={() => rollbackItem(type, itemKey, 'discussions')}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Rollback Discussions
              </button>
            )}
            
            {status.issues === 'mock' && (
              <button
                onClick={() => migrateItem(type, itemKey, 'issues')}
                className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                Migrate Issues
              </button>
            )}
            {status.issues === 'github' && (
              <button
                onClick={() => rollbackItem(type, itemKey, 'issues')}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
              >
                Rollback Issues
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Page Routes

### Create: `src/app/forum/[domain]/terms/[term]/page.tsx`

```typescript
import React from 'react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { TabNavigation } from '@/components/github-compatible/TabNavigation';
import { DiscussionList } from '@/components/github-compatible/DiscussionList';
import { IssueList } from '@/components/github-compatible/IssueList';
import { createGitHubDataService } from '@/services/github-data-service';

interface PageProps {
  params: {
    domain: string;
    term: string;
  };
  searchParams: {
    tab?: string;
  };
}

export default async function TermForumPage({ params, searchParams }: PageProps) {
  const tab = searchParams.tab || 'discussions';
  const basePath = `/forum/${params.domain}/terms/${params.term}`;
  
  // Fetch data based on tab
  const dataService = createGitHubDataService();
  const owner = params.domain;
  const repo = `${params.domain}/${params.term}`;
  
  // Get counts for tabs
  const [discussions, issues] = await Promise.all([
    dataService.getDiscussions(owner, repo, { first: 1 }),
    dataService.getIssues(owner, repo, { first: 1 }),
  ]);
  
  const counts = {
    discussions: discussions.totalCount,
    issues: issues.totalCount,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {params.term} Term Discussions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Community discussions and issues for the {params.term} term definition
        </p>
      </div>

      {/* Tabs */}
      <TabNavigation basePath={basePath} counts={counts} />

      {/* Content */}
      <div className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <TabContent tab={tab} domain={params.domain} term={params.term} basePath={basePath} />
        </Suspense>
      </div>
    </div>
  );
}

async function TabContent({ tab, domain, term, basePath }: {
  tab: string;
  domain: string;
  term: string;
  basePath: string;
}) {
  const dataService = createGitHubDataService();
  const owner = domain;
  const repo = `${domain}/${term}`;

  switch (tab) {
    case 'discussions': {
      const discussions = await dataService.getDiscussions(owner, repo);
      return <DiscussionList discussions={discussions.nodes} basePath={basePath} />;
    }
    
    case 'issues': {
      const issues = await dataService.getIssues(owner, repo);
      return <IssueList issues={issues.nodes} basePath={basePath} />;
    }
    
    case 'history': {
      // TODO: Implement history view
      return <div>Term version history coming soon...</div>;
    }
    
    default:
      return <div>Invalid tab</div>;
  }
}
```

### Create: `src/app/forum/[domain]/terms/[term]/discussions/[number]/page.tsx`

```typescript
import React from 'react';
import { notFound } from 'next/navigation';
import { DiscussionView } from '@/components/github-compatible/DiscussionView';
import { createGitHubDataService } from '@/services/github-data-service';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    domain: string;
    term: string;
    number: string;
  };
}

export default async function DiscussionPage({ params }: PageProps) {
  const dataService = createGitHubDataService();
  const owner = params.domain;
  const repo = `${params.domain}/${params.term}`;
  
  const discussion = await dataService.getDiscussion(
    owner,
    repo,
    parseInt(params.number)
  );
  
  if (!discussion) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href={`/forum/${params.domain}/terms/${params.term}?tab=discussions`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to discussions
        </Link>
      </div>

      {/* Discussion */}
      <DiscussionView discussion={discussion} />
    </div>
  );
}
```

### Create: `src/app/forum/[domain]/terms/[term]/issues/[number]/page.tsx`

```typescript
import React from 'react';
import { notFound } from 'next/navigation';
import { IssueView } from '@/components/github-compatible/IssueView';
import { createGitHubDataService } from '@/services/github-data-service';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    domain: string;
    term: string;
    number: string;
  };
}

export default async function IssuePage({ params }: PageProps) {
  const dataService = createGitHubDataService();
  const owner = params.domain;
  const repo = `${params.domain}/${params.term}`;
  
  const issue = await dataService.getIssue(
    owner,
    repo,
    parseInt(params.number)
  );
  
  if (!issue) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href={`/forum/${params.domain}/terms/${params.term}?tab=issues`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to issues
        </Link>
      </div>

      {/* Issue */}
      <IssueView issue={issue} />
    </div>
  );
}
```

### Create: `src/components/github-compatible/IssueView.tsx`

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { GitHubIssue, GitHubIssueComment } from '@/types/github-compatible';
import { CircleDot, CheckCircle2, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface IssueViewProps {
  issue: GitHubIssue;
}

export function IssueView({ issue }: IssueViewProps) {
  const getIssueIcon = () => {
    if (issue.state === 'OPEN') {
      return <CircleDot className="w-6 h-6 text-green-600" />;
    }
    if (issue.stateReason === 'COMPLETED') {
      return <CheckCircle2 className="w-6 h-6 text-purple-600" />;
    }
    return <XCircle className="w-6 h-6 text-gray-600" />;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {getIssueIcon()}
          <h1 className="text-2xl font-semibold">
            {issue.title}
            <span className="text-gray-500 ml-2">#{issue.number}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            <Link href={issue.author.url} className="font-medium hover:underline">
              {issue.author.login}
            </Link>
            {' '}opened this issue {formatDistanceToNow(new Date(issue.createdAt))} ago
          </span>
          {issue.assignees.nodes.length > 0 && (
            <span>
              Assigned to {issue.assignees.nodes.map(a => (
                <Link key={a.id} href={a.url} className="font-medium hover:underline">
                  {a.login}
                </Link>
              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
            </span>
          )}
          {issue.milestone && (
            <span>Milestone: {issue.milestone.title}</span>
          )}
        </div>
      </div>

      {/* Labels */}
      {issue.labels.nodes.length > 0 && (
        <div className="mb-4 flex gap-2">
          {issue.labels.nodes.map((label) => (
            <span
              key={label.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
                border: `1px solid #${label.color}40`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Main issue body */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={issue.author.avatarUrl}
              alt={issue.author.login}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Link href={issue.author.url} className="font-medium hover:underline">
                {issue.author.login}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDistanceToNow(new Date(issue.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {issue.comments.nodes.map((comment) => (
          <IssueCommentView key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

function IssueCommentView({ comment }: { comment: GitHubIssueComment }) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img
            src={comment.author.avatarUrl}
            alt={comment.author.login}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <Link href={comment.author.url} className="font-medium hover:underline">
              {comment.author.login}
            </Link>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              commented {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{comment.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Integration Points

### Update: `src/components/principles/PrinciplesView.tsx`

Add a link to discussions from the principles view:

```typescript
// Add to imports
import { MessageSquare } from 'lucide-react';

// Add after the principle content
<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
  <h3 className="text-lg font-semibold mb-4">Related Discussions</h3>
  
  {/* For each term referenced in the principle */}
  {principle.requirements?.map((req) => {
    // Extract term references (e.g., harm@v1.0)
    const termMatches = req.match(/(\w+)@v[\d.]+/g) || [];
    
    return termMatches.map((termRef) => {
      const [term, version] = termRef.split('@');
      return (
        <Link
          key={termRef}
          href={`/forum/${domain}/terms/${term}?tab=discussions`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mr-4"
        >
          <MessageSquare className="w-4 h-4" />
          Discuss {term} definition
        </Link>
      );
    });
  }).flat()}
</div>
```

### Update: Navigation Menu

Add forum links to the main navigation:

```typescript
// In your header/navigation component
<Link
  href="/forum"
  className="text-gray-700 hover:text-gray-900"
>
  Forum
</Link>
```

### Create: `src/app/forum/page.tsx`

Forum landing page listing all domains and their terms:

```typescript
import React from 'react';
import Link from 'next/link';
import { getGovernanceData } from '@/lib/governance';

export default async function ForumPage() {
  const governanceData = await getGovernanceData();
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Governance Forum</h1>
      
      <div className="grid gap-6">
        {Object.entries(governanceData).map(([domain, data]) => (
          <div key={domain} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{domain}</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Terms</h3>
                <ul className="space-y-1">
                  {Object.keys(data.terms).map((term) => (
                    <li key={term}>
                      <Link
                        href={`/forum/${domain}/terms/${term}`}
                        className="text-blue-600 hover:underline"
                      >
                        {term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Principles</h3>
                <ul className="space-y-1">
                  {data.principles.map((principle) => (
                    <li key={principle.id}>
                      <Link
                        href={`/forum/${domain}/principles/${principle.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {principle.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 8. Testing

### Create: `src/components/github-compatible/__tests__/DiscussionList.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { DiscussionList } from '../DiscussionList';
import { GitHubDiscussion } from '@/types/github-compatible';

const mockDiscussions: GitHubDiscussion[] = [
  {
    id: 'D_1',
    number: 1,
    title: 'Test Discussion',
    body: 'Test body',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    closed: false,
    author: {
      login: 'testuser',
      id: '1',
      avatarUrl: 'https://example.com/avatar.png',
      url: 'https://github.com/testuser'
    },
    category: {
      id: 'C_1',
      name: 'Ideas',
      slug: 'ideas',
      emoji: '💡'
    },
    labels: { nodes: [] },
    comments: { totalCount: 0, nodes: [] },
    upvoteCount: 0
  }
];

describe('DiscussionList', () => {
  it('renders discussions', () => {
    render(<DiscussionList discussions={mockDiscussions} basePath="/forum/test" />);
    expect(screen.getByText('Test Discussion')).toBeInTheDocument();
  });
  
  it('shows empty state', () => {
    render(<DiscussionList discussions={[]} basePath="/forum/test" />);
    expect(screen.getByText('No discussions found')).toBeInTheDocument();
  });
});
```

### Create test data script: `scripts/create-test-data.js`

```javascript
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

async function createTestData() {
  const terms = ['harm', 'equality', 'sustainability'];
  const domains = ['core-governance', 'ethics', 'environment'];
  
  for (const domain of domains) {
    for (const term of terms) {
      const termPath = path.join(
        'dahao-governance',
        domain,
        'terms',
        'v1.0',
        term,
        '.github'
      );
      
      await fs.mkdir(termPath, { recursive: true });
      
      // Create sample discussions
      const discussions = {
        discussions: [
          {
            id: `D_${domain}_${term}_1`,
            number: 1,
            title: `Improving ${term} definition`,
            body: `Discussion about improving the ${term} definition...`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            closed: false,
            author: {
              login: 'testuser',
              id: 'U_1',
              avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
              url: 'https://github.com/testuser'
            },
            category: {
              id: 'C_1',
              name: 'Ideas',
              slug: 'ideas',
              emoji: '💡'
            },
            labels: { nodes: [] },
            comments: { totalCount: 0, nodes: [] },
            upvoteCount: 5
          }
        ]
      };
      
      await fs.writeFile(
        path.join(termPath, 'discussions.yml'),
        yaml.dump(discussions)
      );
      
      console.log(`Created test data for ${domain}/${term}`);
    }
  }
}

createTestData().catch(console.error);
```

---

## Additional Configurations

### Update: `package.json`

Add required dependencies:

```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "date-fns": "^2.30.0",
    "js-yaml": "^4.1.0",
    "@types/js-yaml": "^4.0.9"
  }
}
```

### Update: `.env`

Add environment variables:

```bash
# GitHub Integration (future use)
USE_GITHUB_API=false
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=

# Feature flags
NEXT_PUBLIC_GITHUB_DISCUSSIONS=mock
NEXT_PUBLIC_GITHUB_ISSUES=mock
```

### Update: `next.config.js`

Add image domains for avatars:

```javascript
module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};
```

---

## Summary

This implementation provides:

1. **Complete GitHub-compatible type system** matching their GraphQL schema
2. **Mock data structure** in YAML files within `.github/` folders
3. **Swappable data service** for easy migration to real GitHub API
4. **Full UI components** matching GitHub's design
5. **API routes** returning GitHub-style responses
6. **Page routes** for viewing discussions and issues
7. **Integration points** with existing governance system
8. **Test setup** and utilities

The system is designed to be swapped to real GitHub API by simply changing environment variables, with no UI code changes needed.