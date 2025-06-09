import { Octokit } from '@octokit/rest';
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
} from './types';

export class GitHubProvider implements GitProvider {
  name = 'github';
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({
      auth: token,
    });
  }

  async createRepository(options: CreateRepositoryOptions): Promise<Repository> {
    const { data } = await this.octokit.repos.createForAuthenticatedUser({
      name: options.name,
      description: options.description,
      private: options.private,
      auto_init: options.autoInit,
      gitignore_template: options.gitignoreTemplate,
      license_template: options.license,
    });

    return this.mapRepository(data);
  }

  async forkRepository(owner: string, repo: string): Promise<Repository> {
    const { data } = await this.octokit.repos.createFork({
      owner,
      repo,
    });

    return this.mapRepository(data);
  }

  async deleteRepository(owner: string, repo: string): Promise<void> {
    await this.octokit.repos.delete({
      owner,
      repo,
    });
  }

  async getRepository(owner: string, repo: string): Promise<Repository> {
    const { data } = await this.octokit.repos.get({
      owner,
      repo,
    });

    return this.mapRepository(data);
  }

  async createBranch(owner: string, repo: string, branch: string, from: string): Promise<Branch> {
    // Get the commit SHA for the source branch
    const { data: refData } = await this.octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${from}`,
    });

    // Create the new branch
    const { data } = await this.octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branch}`,
      sha: refData.object.sha,
    });

    return {
      name: branch,
      commit: {
        sha: data.object.sha,
        url: data.object.url,
      },
      protected: false,
    };
  }

  async deleteBranch(owner: string, repo: string, branch: string): Promise<void> {
    await this.octokit.git.deleteRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
  }

  async listBranches(owner: string, repo: string): Promise<Branch[]> {
    const { data } = await this.octokit.repos.listBranches({
      owner,
      repo,
      per_page: 100,
    });

    return data.map(branch => ({
      name: branch.name,
      commit: {
        sha: branch.commit.sha,
        url: branch.commit.url,
      },
      protected: branch.protected,
    }));
  }

  async getBranch(owner: string, repo: string, branch: string): Promise<Branch> {
    const { data } = await this.octokit.repos.getBranch({
      owner,
      repo,
      branch,
    });

    return {
      name: data.name,
      commit: {
        sha: data.commit.sha,
        url: data.commit.url,
      },
      protected: data.protected,
    };
  }

  async readFile(owner: string, repo: string, path: string, ref?: string): Promise<FileContent> {
    const { data } = await this.octokit.repos.getContent({
      owner,
      repo,
      path,
      ref,
    });

    if (Array.isArray(data)) {
      throw new Error('Path is a directory, not a file');
    }

    if ('type' in data && data.type !== 'file') {
      throw new Error('Path is not a file');
    }

    return {
      name: data.name,
      path: data.path,
      sha: data.sha,
      size: data.size,
      content: data.content || '',
      encoding: data.encoding || 'base64',
    };
  }

  async writeFile(owner: string, repo: string, path: string, content: string, options: WriteFileOptions): Promise<FileCommit> {
    const { data } = await this.octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: options.message,
      content: Buffer.from(content).toString('base64'),
      branch: options.branch,
      committer: options.committer,
      sha: options.sha,
    });

    return {
      content: {
        name: data.content?.name || path.split('/').pop() || '',
        path: data.content?.path || path,
        sha: data.content?.sha || '',
        size: data.content?.size || 0,
        content: Buffer.from(content).toString('base64'),
        encoding: 'base64',
      },
      commit: this.mapCommit(data.commit),
    };
  }

  async deleteFile(owner: string, repo: string, path: string, options: DeleteFileOptions): Promise<FileCommit> {
    const { data } = await this.octokit.repos.deleteFile({
      owner,
      repo,
      path,
      message: options.message,
      sha: options.sha,
      branch: options.branch,
      committer: options.committer,
    });

    return {
      content: {
        name: path.split('/').pop() || '',
        path: path,
        sha: '',
        size: 0,
        content: '',
        encoding: '',
      },
      commit: this.mapCommit(data.commit),
    };
  }

  async createCommit(owner: string, repo: string, options: CreateCommitOptions): Promise<Commit> {
    const { data } = await this.octokit.git.createCommit({
      owner,
      repo,
      message: options.message,
      tree: options.tree,
      parents: options.parents,
      author: options.author,
      committer: options.committer,
    });

    return this.mapGitCommit(data);
  }

  async getCommit(owner: string, repo: string, sha: string): Promise<Commit> {
    const { data } = await this.octokit.git.getCommit({
      owner,
      repo,
      commit_sha: sha,
    });

    return this.mapGitCommit(data);
  }

  async listCommits(owner: string, repo: string, options?: ListCommitsOptions): Promise<Commit[]> {
    const { data } = await this.octokit.repos.listCommits({
      owner,
      repo,
      sha: options?.sha,
      path: options?.path,
      author: options?.author,
      since: options?.since?.toISOString(),
      until: options?.until?.toISOString(),
      per_page: options?.perPage || 100,
      page: options?.page,
    });

    return data.map(commit => this.mapCommit(commit.commit));
  }

  async createPullRequest(owner: string, repo: string, options: CreatePullRequestOptions): Promise<PullRequest> {
    const { data } = await this.octokit.pulls.create({
      owner,
      repo,
      title: options.title,
      body: options.body,
      head: options.head,
      base: options.base,
      draft: options.draft,
    });

    return this.mapPullRequest(data);
  }

  async updatePullRequest(owner: string, repo: string, number: number, options: UpdatePullRequestOptions): Promise<PullRequest> {
    const { data } = await this.octokit.pulls.update({
      owner,
      repo,
      pull_number: number,
      title: options.title,
      body: options.body,
      state: options.state,
      base: options.base,
    });

    return this.mapPullRequest(data);
  }

  async getPullRequest(owner: string, repo: string, number: number): Promise<PullRequest> {
    const { data } = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number: number,
    });

    return this.mapPullRequest(data);
  }

  async listPullRequests(owner: string, repo: string, options?: ListPullRequestsOptions): Promise<PullRequest[]> {
    const { data } = await this.octokit.pulls.list({
      owner,
      repo,
      state: options?.state,
      head: options?.head,
      base: options?.base,
      sort: options?.sort,
      direction: options?.direction,
      per_page: options?.perPage || 100,
      page: options?.page,
    });

    return data.map(pr => this.mapPullRequest(pr));
  }

  async mergePullRequest(owner: string, repo: string, number: number, options?: MergePullRequestOptions): Promise<void> {
    await this.octokit.pulls.merge({
      owner,
      repo,
      pull_number: number,
      commit_title: options?.commitTitle,
      commit_message: options?.commitMessage,
      sha: options?.sha,
      merge_method: options?.mergeMethod,
    });
  }

  private mapRepository(data: any): Repository {
    return {
      id: data.id.toString(),
      name: data.name,
      fullName: data.full_name,
      owner: data.owner.login,
      description: data.description,
      private: data.private,
      defaultBranch: data.default_branch,
      url: data.html_url,
      cloneUrl: data.clone_url,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  private mapCommit(data: any): Commit {
    return {
      sha: data.sha || data.tree.sha,
      message: data.message,
      author: {
        name: data.author.name,
        email: data.author.email,
        date: new Date(data.author.date),
      },
      committer: {
        name: data.committer.name,
        email: data.committer.email,
        date: new Date(data.committer.date),
      },
      url: data.url,
      parents: data.parents || [],
    };
  }

  private mapGitCommit(data: any): Commit {
    return {
      sha: data.sha,
      message: data.message,
      author: {
        name: data.author.name,
        email: data.author.email,
        date: new Date(data.author.date),
      },
      committer: {
        name: data.committer.name,
        email: data.committer.email,
        date: new Date(data.committer.date),
      },
      url: data.url,
      parents: data.parents.map((p: any) => ({ sha: p.sha, url: p.url })),
    };
  }

  private mapPullRequest(data: any): PullRequest {
    return {
      id: data.id,
      number: data.number,
      title: data.title,
      body: data.body,
      state: data.state,
      head: {
        ref: data.head.ref,
        sha: data.head.sha,
      },
      base: {
        ref: data.base.ref,
        sha: data.base.sha,
      },
      user: {
        login: data.user.login,
      },
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      mergedAt: data.merged_at ? new Date(data.merged_at) : undefined,
      url: data.html_url,
    };
  }
}