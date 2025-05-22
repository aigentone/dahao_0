// Main exports for the git module
export { GitOperationsManager } from './operations';
export { GitProviderFactory } from './providers';
export type {
  ProviderConfig,
  ProviderType,
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