// src/hooks/usePublicDocument.ts
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '@/store';

export interface PublicDocument {
  id: string;
  title: string;
  content: string;
  path: string;
  lastModified: string;
  author: string;
  tags: string[];
  type: string;
}

export const usePublicDocument = (documentPath?: string) => {
  const [document, setDocument] = useState<PublicDocument | null>(null);
  const [documents, setDocuments] = useState<PublicDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get auth state from store
  const { isAuthenticated } = useStore();

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use public API if not authenticated, otherwise use authenticated API
      const apiPath = isAuthenticated ? '/api/documents' : '/api/public/documents';
      const response = await fetch(apiPath);
      
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchDocument = useCallback(async (path: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use public API if not authenticated
      const apiPath = isAuthenticated ? `/api/documents/${path}` : `/api/public/documents/${path}`;
      const response = await fetch(apiPath);
      
      if (!response.ok) {
        throw new Error('Failed to fetch document');
      }
      
      const data = await response.json();
      setDocument(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load document');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch on mount
  useEffect(() => {
    if (documentPath) {
      fetchDocument(documentPath);
    } else {
      fetchDocuments();
    }
  }, [documentPath, fetchDocument, fetchDocuments]);

  return {
    document,
    documents,
    isLoading,
    error,
    isAuthenticated,
    refetch: documentPath ? () => fetchDocument(documentPath) : fetchDocuments
  };
};