// Core DAHAO types

export interface DAHAOEntry {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  participants: string[];
  tags: string[];
  relatedEntries?: string[];
  customData?: Record<string, any>;
}

export interface DAHAOFile {
  version: string;
  metadata: {
    created: string;
    lastModified: string;
    author: string;
  };
  entries: DAHAOEntry[];
}

export interface GitCommit {
  hash: string;
  author: string;
  date: string;
  message: string;
}

export interface GitDiff {
  file: string;
  additions: number;
  deletions: number;
  patch: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
}