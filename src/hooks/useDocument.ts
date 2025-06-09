import { useState, useCallback } from 'react';
import { useYAMLData } from './useYAMLData';
// TODO: Uncomment when git functionality is implemented
// import { useGitRepo } from './useGitRepo';

export interface DocumentMetadata {
  title: string;
  version: string;
  lastModified: string;
  author?: string;
  tags?: string[];
}

export interface Document {
  id: string;
  path: string;
  content: string;
  metadata: DocumentMetadata;
  history?: Array<{
    hash: string;
    date: string;
    message: string;
    author: string;
  }>;
}

export const useDocument = (documentPath: string, repoPath: string) => {
  const { data: yamlData, isLoading: yamlLoading, error: yamlError, saveData, isDirty } = useYAMLData(documentPath);
  // TODO: Uncomment when git functionality is implemented
  // const { getCommits, commit, getDiff } = useGitRepo(repoPath);
  const [history, setHistory] = useState<Document['history']>([]);

  const loadHistory = useCallback(async () => {
    // TODO: Implement when git is available
    console.log('Git history not yet implemented');
    /* TODO: Uncomment when git functionality is implemented
    try {
      const commits = await getCommits(documentPath, 20);
      setHistory(commits);
    } catch (err) {
      console.error('Failed to load document history:', err);
    }
    */
  }, [documentPath]);

  const saveDocument = useCallback(async (content: string, commitMessage: string) => {
    await saveData(content);
    // TODO: Implement git commit when available
    console.log('Git commit not yet implemented:', commitMessage);
    /* TODO: Uncomment when git functionality is implemented
    await commit(commitMessage, [documentPath]);
    await loadHistory();
    */
  }, [saveData, documentPath]);

  const getDocumentDiff = useCallback(async (commitHash?: string) => {
    // TODO: Implement when git is available
    console.log('Git diff not yet implemented:', commitHash);
    return null;
    /* TODO: Uncomment when git functionality is implemented
    return await getDiff(documentPath, commitHash);
    */
  }, [documentPath]);

  const document: Document | null = yamlData ? {
    id: documentPath.replace(/[^a-zA-Z0-9]/g, '-'),
    path: documentPath,
    content: yamlData.content.content || yamlData.raw,
    metadata: {
      title: yamlData.content.title || 'Untitled',
      version: yamlData.content.version || '1.0.0',
      lastModified: yamlData.content.lastModified || new Date().toISOString(),
      author: yamlData.content.author,
      tags: yamlData.content.tags,
    },
    history,
  } : null;

  return {
    document,
    isLoading: yamlLoading,
    error: yamlError,
    isDirty,
    loadHistory,
    saveDocument,
    getDocumentDiff,
  };
};