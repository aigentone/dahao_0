import { 
  GitHubDiscussion, 
  DiscussionConnection, 
  ListOptions
} from '@/types/github-compatible';
import yaml from 'js-yaml';
import { promises as fs } from 'fs';
import path from 'path';

// Interface for data service
export interface IGitHubDataService {
  getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection>;
  getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion | null>;
  getOrganizationDiscussions(orgId: string, options?: ListOptions): Promise<DiscussionConnection>;
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

  async getOrganizationDiscussions(orgId: string, options?: ListOptions): Promise<DiscussionConnection> {
    // For organization-level discussions, load from [org]/.github/discussions.yml
    const orgPath = path.join(this.basePath, orgId, '.github');
    const discussionsPath = path.join(orgPath, 'discussions.yml');
    
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

    // Apply same filters as getDiscussions
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
}

// Factory function
export function createGitHubDataService(): IGitHubDataService {
  return new MockGitHubDataService();
}