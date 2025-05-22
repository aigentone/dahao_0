export interface GitProvider {
  name: string;
  
  // Repository operations
  createRepository(options: CreateRepositoryOptions): Promise<Repository>;
  forkRepository(owner: string, repo: string): Promise<Repository>;
  deleteRepository(owner: string, repo: string): Promise<void>;
  getRepository(owner: string, repo: string): Promise<Repository>;
  
  // Branch operations
  createBranch(owner: string, repo: string, branch: string, from: string): Promise<Branch>;
  deleteBranch(owner: string, repo: string, branch: string): Promise<void>;
  listBranches(owner: string, repo: string): Promise<Branch[]>;
  getBranch(owner: string, repo: string, branch: string): Promise<Branch>;
  
  // File operations
  readFile(owner: string, repo: string, path: string, ref?: string): Promise<FileContent>;
  writeFile(owner: string, repo: string, path: string, content: string, options: WriteFileOptions): Promise<FileCommit>;
  deleteFile(owner: string, repo: string, path: string, options: DeleteFileOptions): Promise<FileCommit>;
  
  // Commit operations
  createCommit(owner: string, repo: string, options: CreateCommitOptions): Promise<Commit>;
  getCommit(owner: string, repo: string, sha: string): Promise<Commit>;
  listCommits(owner: string, repo: string, options?: ListCommitsOptions): Promise<Commit[]>;
  
  // Pull request operations
  createPullRequest(owner: string, repo: string, options: CreatePullRequestOptions): Promise<PullRequest>;
  updatePullRequest(owner: string, repo: string, number: number, options: UpdatePullRequestOptions): Promise<PullRequest>;
  getPullRequest(owner: string, repo: string, number: number): Promise<PullRequest>;
  listPullRequests(owner: string, repo: string, options?: ListPullRequestsOptions): Promise<PullRequest[]>;
  mergePullRequest(owner: string, repo: string, number: number, options?: MergePullRequestOptions): Promise<void>;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  owner: string;
  description?: string;
  private: boolean;
  defaultBranch: string;
  url: string;
  cloneUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface FileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  content: string;
  encoding: string;
}

export interface FileCommit {
  content: FileContent;
  commit: Commit;
}

export interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: Date;
  };
  committer: {
    name: string;
    email: string;
    date: Date;
  };
  url: string;
  parents: Array<{ sha: string; url: string }>;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  head: {
    ref: string;
    sha: string;
  };
  base: {
    ref: string;
    sha: string;
  };
  user: {
    login: string;
  };
  createdAt: Date;
  updatedAt: Date;
  mergedAt?: Date;
  url: string;
}

export interface CreateRepositoryOptions {
  name: string;
  description?: string;
  private?: boolean;
  autoInit?: boolean;
  gitignoreTemplate?: string;
  license?: string;
}

export interface WriteFileOptions {
  message: string;
  branch?: string;
  committer?: {
    name: string;
    email: string;
  };
  sha?: string; // Required for updates
}

export interface DeleteFileOptions {
  message: string;
  branch?: string;
  committer?: {
    name: string;
    email: string;
  };
  sha: string;
}

export interface CreateCommitOptions {
  message: string;
  tree: string;
  parents: string[];
  author?: {
    name: string;
    email: string;
    date?: string;
  };
  committer?: {
    name: string;
    email: string;
    date?: string;
  };
}

export interface ListCommitsOptions {
  sha?: string;
  path?: string;
  author?: string;
  since?: Date;
  until?: Date;
  perPage?: number;
  page?: number;
}

export interface CreatePullRequestOptions {
  title: string;
  body?: string;
  head: string;
  base: string;
  draft?: boolean;
}

export interface UpdatePullRequestOptions {
  title?: string;
  body?: string;
  state?: 'open' | 'closed';
  base?: string;
}

export interface ListPullRequestsOptions {
  state?: 'open' | 'closed' | 'all';
  head?: string;
  base?: string;
  sort?: 'created' | 'updated' | 'popularity' | 'long-running';
  direction?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
}

export interface MergePullRequestOptions {
  commitTitle?: string;
  commitMessage?: string;
  sha?: string;
  mergeMethod?: 'merge' | 'squash' | 'rebase';
}