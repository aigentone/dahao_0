'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DocumentViewer } from '@/components/constitution/DocumentViewer';
import { DocumentEditor } from '@/components/constitution/DocumentEditor';
import { usePublicDocument } from '@/hooks/usePublicDocument';
import { useStore } from '@/store';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

const SectionPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const sectionId = params.sectionId as string;
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { document, isLoading, error } = usePublicDocument(sectionId);
  const { isAuthenticated, login } = useStore();

  const handleEditClick = () => {
    if (!isAuthenticated) {
      // Check if GitHub OAuth is configured
      fetch('/api/auth/check-config')
        .then(res => res.json())
        .then(data => {
          if (!data.configured) {
            alert('GitHub authentication is not configured. Please follow the setup instructions in the README.');
          } else if (confirm('You need to sign in with GitHub to edit documents. Sign in now?')) {
            login();
          }
        })
        .catch(() => {
          alert('Unable to check authentication configuration.');
        });
      return;
    }
    setIsEditMode(true);
  };

  const handleSave = async (content: string) => {
    // This would use the authenticated API
    alert('Saving functionality requires full authentication setup');
    setIsEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error || 'Document not found'}
          </div>
          <button
            onClick={() => router.push('/constitution')}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back to Constitution
          </button>
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
              {document.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                <PencilIcon className="h-5 w-5" />
                {isEditMode ? 'Cancel Edit' : 'Edit'}
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <PencilIcon className="h-5 w-5" />
                Sign in to Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div>
            {isEditMode && document ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px]">
                <DocumentEditor
                  initialContent={document.content}
                  onSave={handleSave}
                  title={document.title}
                />
              </div>
            ) : (
              <DocumentViewer
                content={document.content}
                metadata={{
                  title: document.title,
                  lastModified: document.lastModified,
                  author: document.author
                }}
              />
            )}
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
            <p className="text-blue-800 dark:text-blue-200 mb-3">
              Want to contribute to this document?
            </p>
            <button
              onClick={() => login()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign in with GitHub to Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionPage;