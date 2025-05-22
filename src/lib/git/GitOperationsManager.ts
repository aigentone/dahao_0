import simpleGit, { SimpleGit, LogResult, DiffResult } from 'simple-git';
import { GitCommit, GitDiff } from '@/types';

export interface IGitOperationsManager {
  init(repoPath: string): Promise<void>;
  getHistory(filePath: string, limit?: number): Promise<GitCommit[]>;
  getDiff(commitHash: string, filePath: string): Promise<GitDiff[]>;
  getFileAtCommit(commitHash: string, filePath: string): Promise<string>;
  getCurrentBranch(): Promise<string>;
  getBranches(): Promise<string[]>;
  checkout(branch: string): Promise<void>;
}

export class GitOperationsManager implements IGitOperationsManager {
  private git: SimpleGit;
  private repoPath: string = '';

  constructor() {
    this.git = simpleGit();
  }

  async init(repoPath: string): Promise<void> {
    this.repoPath = repoPath;
    this.git = simpleGit(repoPath);
    
    // Verify it's a git repository
    const isRepo = await this.git.checkIsRepo();
    if (!isRepo) {
      throw new Error('Not a git repository');
    }
  }

  async getHistory(filePath: string, limit: number = 50): Promise<GitCommit[]> {
    const log: LogResult = await this.git.log({
      file: filePath,
      n: limit,
      format: {
        hash: '%H',
        author: '%an',
        date: '%ai',
        message: '%s'
      }
    });

    return log.all.map(commit => ({
      hash: commit.hash,
      author: commit.author || '',
      date: commit.date || '',
      message: commit.message || ''
    }));
  }

  async getDiff(commitHash: string, filePath: string): Promise<GitDiff[]> {
    const diffSummary = await this.git.diffSummary([
      `${commitHash}^`,
      commitHash,
      '--',
      filePath
    ]);

    const diffs: GitDiff[] = [];
    
    for (const file of diffSummary.files) {
      const patch = await this.git.diff([
        `${commitHash}^`,
        commitHash,
        '--',
        file.file
      ]);

      diffs.push({
        file: file.file,
        additions: file.insertions,
        deletions: file.deletions,
        patch
      });
    }

    return diffs;
  }

  async getFileAtCommit(commitHash: string, filePath: string): Promise<string> {
    try {
      const content = await this.git.show([`${commitHash}:${filePath}`]);
      return content;
    } catch (error) {
      throw new Error(`Failed to get file content at commit ${commitHash}: ${error}`);
    }
  }

  async getCurrentBranch(): Promise<string> {
    const branch = await this.git.revparse(['--abbrev-ref', 'HEAD']);
    return branch.trim();
  }

  async getBranches(): Promise<string[]> {
    const branchSummary = await this.git.branch();
    return Object.keys(branchSummary.branches);
  }

  async checkout(branch: string): Promise<void> {
    await this.git.checkout(branch);
  }
}