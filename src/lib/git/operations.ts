import {
  GitProvider,
  Repository,
  Branch,
  FileContent,
  FileCommit,
  Commit,
  PullRequest,
  CreateRepositoryOptions,
  WriteFileOptions,
  DeleteFileOptions,
  CreateCommitOptions,
  ListCommitsOptions,
  CreatePullRequestOptions,
  UpdatePullRequestOptions,
  ListPullRequestsOptions,
  MergePullRequestOptions,
} from './providers';
import { GitProviderFactory, ProviderConfig } from './providers';

export class GitOperationsManager {
  private provider: GitProvider;
  private owner: string;

  constructor(config: ProviderConfig, owner: string) {
    this.provider = GitProviderFactory.create(config);
    this.owner = owner;
  }

  // Repository Management
  async createRepository(options: CreateRepositoryOptions): Promise<Repository> {
    return this.provider.createRepository(options);
  }

  async forkRepository(owner: string, repo: string): Promise<Repository> {
    return this.provider.forkRepository(owner, repo);
  }

  async deleteRepository(repo: string): Promise<void> {
    return this.provider.deleteRepository(this.owner, repo);
  }

  async getRepository(repo: string): Promise<Repository> {
    return this.provider.getRepository(this.owner, repo);
  }

  // Branch Operations
  async createBranch(repo: string, branch: string, from: string = 'main'): Promise<Branch> {
    return this.provider.createBranch(this.owner, repo, branch, from);
  }

  async deleteBranch(repo: string, branch: string): Promise<void> {
    return this.provider.deleteBranch(this.owner, repo, branch);
  }

  async listBranches(repo: string): Promise<Branch[]> {
    return this.provider.listBranches(this.owner, repo);
  }

  async getBranch(repo: string, branch: string): Promise<Branch> {
    return this.provider.getBranch(this.owner, repo, branch);
  }

  // File Operations
  async readFile(repo: string, path: string, ref?: string): Promise<FileContent> {
    return this.provider.readFile(this.owner, repo, path, ref);
  }

  async writeFile(repo: string, path: string, content: string, options: WriteFileOptions): Promise<FileCommit> {
    return this.provider.writeFile(this.owner, repo, path, content, options);
  }

  async deleteFile(repo: string, path: string, options: DeleteFileOptions): Promise<FileCommit> {
    return this.provider.deleteFile(this.owner, repo, path, options);
  }

  async updateFile(repo: string, path: string, content: string, message: string, branch?: string): Promise<FileCommit> {
    // First, get the current file to get its SHA
    const currentFile = await this.readFile(repo, path, branch);
    
    return this.writeFile(repo, path, content, {
      message,
      branch,
      sha: currentFile.sha,
    });
  }

  // Commit Operations
  async createCommit(repo: string, options: CreateCommitOptions): Promise<Commit> {
    return this.provider.createCommit(this.owner, repo, options);
  }

  async getCommit(repo: string, sha: string): Promise<Commit> {
    return this.provider.getCommit(this.owner, repo, sha);
  }

  async listCommits(repo: string, options?: ListCommitsOptions): Promise<Commit[]> {
    return this.provider.listCommits(this.owner, repo, options);
  }

  // Pull Request Operations
  async createPullRequest(repo: string, options: CreatePullRequestOptions): Promise<PullRequest> {
    return this.provider.createPullRequest(this.owner, repo, options);
  }

  async updatePullRequest(repo: string, number: number, options: UpdatePullRequestOptions): Promise<PullRequest> {
    return this.provider.updatePullRequest(this.owner, repo, number, options);
  }

  async getPullRequest(repo: string, number: number): Promise<PullRequest> {
    return this.provider.getPullRequest(this.owner, repo, number);
  }

  async listPullRequests(repo: string, options?: ListPullRequestsOptions): Promise<PullRequest[]> {
    return this.provider.listPullRequests(this.owner, repo, options);
  }

  async mergePullRequest(repo: string, number: number, options?: MergePullRequestOptions): Promise<void> {
    return this.provider.mergePullRequest(this.owner, repo, number, options);
  }

  // Helper Methods
  async createAndCheckoutBranch(repo: string, branch: string, from: string = 'main'): Promise<Branch> {
    const newBranch = await this.createBranch(repo, branch, from);
    return newBranch;
  }

  async commitAndPush(
    repo: string,
    files: Array<{ path: string; content: string }>,
    message: string,
    branch?: string
  ): Promise<Commit[]> {
    const commits: Commit[] = [];

    for (const file of files) {
      try {
        // Try to update existing file
        const fileCommit = await this.updateFile(repo, file.path, file.content, message, branch);
        commits.push(fileCommit.commit);
      } catch (error) {
        // If file doesn't exist, create it
        const fileCommit = await this.writeFile(repo, file.path, file.content, {
          message,
          branch,
        });
        commits.push(fileCommit.commit);
      }
    }

    return commits;
  }

  async createPullRequestFromBranch(
    repo: string,
    branch: string,
    title: string,
    body?: string,
    baseBranch: string = 'main'
  ): Promise<PullRequest> {
    return this.createPullRequest(repo, {
      title,
      body,
      head: branch,
      base: baseBranch,
    });
  }

  // Utility to get file content as string (decoded from base64)
  async readFileContent(repo: string, path: string, ref?: string): Promise<string> {
    const file = await this.readFile(repo, path, ref);
    
    if (file.encoding === 'base64') {
      return Buffer.from(file.content, 'base64').toString('utf-8');
    }
    
    return file.content;
  }

  // Get the current provider name
  getProviderName(): string {
    return this.provider.name;
  }
}