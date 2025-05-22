'use client';

import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { DocumentViewer } from './DocumentViewer';
import yaml from 'js-yaml';

interface DocumentEditorProps {
  initialContent: string;
  onSave: (content: string) => Promise<void>;
  title?: string;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  initialContent,
  onSave,
  title
}) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      // Validate YAML
      yaml.load(content);
      await onSave(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  }, [content, onSave]);

  const getPreviewContent = () => {
    try {
      const data = yaml.load(content) as any;
      return data.content || data.description || JSON.stringify(data, null, 2);
    } catch {
      return 'Invalid YAML format';
    }
  };

  const getMetadata = () => {
    try {
      const data = yaml.load(content) as any;
      const { content: _, description: __, ...metadata } = data;
      return metadata;
    } catch {
      return {};
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title || 'Document Editor'}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                !isPreview
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                isPreview
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              Preview
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-4 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {isPreview ? (
          <div className="h-full overflow-auto p-4">
            <DocumentViewer
              content={getPreviewContent()}
              metadata={getMetadata()}
            />
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage="yaml"
            value={content}
            onChange={(value) => setContent(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
};