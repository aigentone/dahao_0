'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DocumentViewer } from '@/components/constitution/DocumentViewer';
import { DocumentEditor } from '@/components/constitution/DocumentEditor';
import { DiffViewer } from '@/components/constitution/DiffViewer';
import { useDocument } from '@/hooks/useDocument';
import { ArrowLeftIcon, PencilIcon, ClockIcon } from '@heroicons/react/24/outline';

const SectionPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const sectionId = params.sectionId as string;
  const [isEditMode, setIsEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [compareVersion, setCompareVersion] = useState<string | null>(null);

  // Mock document path - in real app, map sectionId to actual file path
  const documentPath = `constitution/${sectionId}.yaml`;
  const repoPath = process.env.NEXT_PUBLIC_REPO_PATH || '.';

  const {
    document,
    isLoading,
    error,
    isDirty,
    loadHistory,
    saveDocument,
    getDocumentDiff,
  } = useDocument(documentPath, repoPath);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleSave = async (content: string) => {
    const message = `Update ${document?.metadata.title || sectionId}`;
    await saveDocument(content, message);
    setIsEditMode(false);
  };

  const handleCompare = async (commitHash: string) => {
    setCompareVersion(commitHash);
    // Load diff for comparison
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/constitution')}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Constitution
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {document?.metadata.title || 'Loading...'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md shadow hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ClockIcon className="h-5 w-5" />
              History
            </button>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              <PencilIcon className="h-5 w-5" />
              {isEditMode ? 'Cancel Edit' : 'Edit'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className={showHistory ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {isEditMode && document ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px]">
                <DocumentEditor
                  initialContent={document.content}
                  onSave={handleSave}
                  title={document.metadata.title}
                />
              </div>
            ) : compareVersion ? (
              <DiffViewer
                oldContent="Original content here"
                newContent={document?.content || ''}
                oldTitle={`Version at ${compareVersion}`}
                newTitle="Current Version"
              />
            ) : (
              <DocumentViewer
                content={document?.content || ''}
                metadata={document?.metadata}
              />
            )}
          </div>

          {showHistory && document?.history && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Version History
                </h3>
                <div className="space-y-3">
                  {document.history.map((commit) => (
                    <div
                      key={commit.hash}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleCompare(commit.hash)}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {commit.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(commit.date).toLocaleDateString()} by {commit.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionPage;