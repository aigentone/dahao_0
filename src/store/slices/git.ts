import { StateCreator } from 'zustand';
import { StoreState } from '..';

export interface GitFile {
  path: string;
  content: string;
  sha: string;
  type: 'file' | 'dir';
}

export interface GitCommit {
  sha: string;
  author: string;
  message: string;
  date: string;
}

export interface GitSlice {
  // State
  currentRepo: string | null;
  currentBranch: string;
  files: GitFile[];
  commits: GitCommit[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentRepo: (repo: string) => void;
  setCurrentBranch: (branch: string) => void;
  fetchFiles: (path?: string) => Promise<void>;
  fetchCommits: () => Promise<void>;
  createFile: (path: string, content: string, message: string) => Promise<void>;
  updateFile: (path: string, content: string, message: string) => Promise<void>;
  deleteFile: (path: string, message: string) => Promise<void>;
  createBranch: (branchName: string) => Promise<void>;
  createPullRequest: (title: string, body: string, base?: string) => Promise<void>;
}

export const createGitSlice: StateCreator<
  StoreState,
  [],
  [],
  GitSlice
> = (set, get) => ({
  // Initial state
  currentRepo: null,
  currentBranch: 'main',
  files: [],
  commits: [],
  isLoading: false,
  error: null,

  // Actions
  setCurrentRepo: (repo) => set((state) => {
    state.currentRepo = repo;
  }),

  setCurrentBranch: (branch) => set((state) => {
    state.currentBranch = branch;
  }),

  fetchFiles: async (path = '') => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const response = await fetch(`/api/git/files?path=${path}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      
      const files = await response.json();
      set((state) => {
        state.files = files;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  fetchCommits: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });

    try {
      const response = await fetch('/api/git/commits');
      if (!response.ok) throw new Error('Failed to fetch commits');
      
      const commits = await response.json();
      set((state) => {
        state.commits = commits;
        state.isLoading = false;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
        state.isLoading = false;
      });
    }
  },

  createFile: async (path, content, message) => {
    try {
      const response = await fetch('/api/git/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content, message }),
      });
      
      if (!response.ok) throw new Error('Failed to create file');
      await get().fetchFiles();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  updateFile: async (path, content, message) => {
    try {
      const response = await fetch('/api/git/files', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, content, message }),
      });
      
      if (!response.ok) throw new Error('Failed to update file');
      await get().fetchFiles();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  deleteFile: async (path, message) => {
    try {
      const response = await fetch('/api/git/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, message }),
      });
      
      if (!response.ok) throw new Error('Failed to delete file');
      await get().fetchFiles();
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  createBranch: async (branchName) => {
    try {
      const response = await fetch('/api/git/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branchName }),
      });
      
      if (!response.ok) throw new Error('Failed to create branch');
      set((state) => {
        state.currentBranch = branchName;
      });
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },

  createPullRequest: async (title, body, base = 'main') => {
    try {
      const response = await fetch('/api/git/pull-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body, base, head: get().currentBranch }),
      });
      
      if (!response.ok) throw new Error('Failed to create pull request');
    } catch (error) {
      set((state) => {
        state.error = error instanceof Error ? error.message : 'Unknown error';
      });
    }
  },
});