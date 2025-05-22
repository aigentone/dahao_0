'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface DocumentViewerProps {
  content: string;
  title?: string;
  metadata?: Record<string, any>;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  content,
  title,
  metadata
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {title && (
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
      )}
      
      {metadata && Object.keys(metadata).length > 0 && (
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Metadata
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {key}:
                </dt>
                <dd className="text-sm text-gray-900 dark:text-white">
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};