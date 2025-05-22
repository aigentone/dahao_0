import { useState, useCallback, useEffect } from 'react';
import yaml from 'js-yaml';

export interface YAMLDocument {
  content: any;
  raw: string;
  path: string;
}

export const useYAMLData = (filePath: string) => {
  const [data, setData] = useState<YAMLDocument | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(filePath)}`);
      if (!response.ok) {
        throw new Error(`Failed to load document: ${response.statusText}`);
      }

      const raw = await response.text();
      const content = yaml.load(raw);
      
      setData({
        content,
        raw,
        path: filePath,
      });
      setIsDirty(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load YAML data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [filePath]);

  const saveData = useCallback(async (newContent: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate YAML
      const parsed = yaml.load(newContent);
      
      const response = await fetch(`/api/documents/${encodeURIComponent(filePath)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'text/plain' },
        body: newContent,
      });

      if (!response.ok) {
        throw new Error(`Failed to save document: ${response.statusText}`);
      }

      setData({
        content: parsed,
        raw: newContent,
        path: filePath,
      });
      setIsDirty(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save YAML data';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [filePath]);

  const updateData = useCallback((newContent: string) => {
    try {
      const parsed = yaml.load(newContent);
      setData(prev => prev ? {
        ...prev,
        content: parsed,
        raw: newContent,
      } : null);
      setIsDirty(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid YAML format');
    }
  }, []);

  useEffect(() => {
    if (filePath) {
      loadData();
    }
  }, [filePath, loadData]);

  return {
    data,
    isLoading,
    error,
    isDirty,
    loadData,
    saveData,
    updateData,
  };
};