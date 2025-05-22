import { useState, useCallback } from 'react';

export interface GitCommit {
  hash: string;
  author: string;
  date: string;
  message: string;
}

export interface GitStatus {
  modified: string[];
  added: string[];
  deleted: string[];
  untracked: string[];
}

export const useGitRepo = (repoPath: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeGitCommand = useCallback(async (command: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/git', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, repoPath }),
      });

      if (!response.ok) {
        throw new Error(`Git command failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.output;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Git operation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [repoPath]);

  const getStatus = useCallback(async (): Promise<GitStatus> => {
    const output = await executeGitCommand(['status', '--porcelain']);
    const status: GitStatus = {
      modified: [],
      added: [],
      deleted: [],
      untracked: [],
    };

    output.split('\n').forEach((line: string) => {
      if (!line.trim()) return;
      const [statusCode, ...filePathParts] = line.trim().split(' ');
      const filePath = filePathParts.join(' ');

      if (statusCode === 'M') status.modified.push(filePath);
      else if (statusCode === 'A') status.added.push(filePath);
      else if (statusCode === 'D') status.deleted.push(filePath);
      else if (statusCode === '??') status.untracked.push(filePath);
    });

    return status;
  }, [executeGitCommand]);

  const getCommits = useCallback(async (filePath?: string, limit = 10): Promise<GitCommit[]> => {
    const args = ['log', `--max-count=${limit}`, '--pretty=format:%H|%an|%ad|%s', '--date=iso'];
    if (filePath) args.push('--', filePath);

    const output = await executeGitCommand(args);
    return output.split('\n').filter(Boolean).map((line: string) => {
      const [hash, author, date, message] = line.split('|');
      return { hash, author, date, message };
    });
  }, [executeGitCommand]);

  const commit = useCallback(async (message: string, files: string[]) => {
    if (files.length > 0) {
      await executeGitCommand(['add', ...files]);
    }
    await executeGitCommand(['commit', '-m', message]);
  }, [executeGitCommand]);

  const push = useCallback(async (branch = 'main') => {
    await executeGitCommand(['push', 'origin', branch]);
  }, [executeGitCommand]);

  const pull = useCallback(async (branch = 'main') => {
    await executeGitCommand(['pull', 'origin', branch]);
  }, [executeGitCommand]);

  const getDiff = useCallback(async (filePath: string, commitHash?: string) => {
    const args = ['diff'];
    if (commitHash) args.push(commitHash);
    args.push('--', filePath);
    
    return await executeGitCommand(args);
  }, [executeGitCommand]);

  return {
    isLoading,
    error,
    getStatus,
    getCommits,
    commit,
    push,
    pull,
    getDiff,
  };
};