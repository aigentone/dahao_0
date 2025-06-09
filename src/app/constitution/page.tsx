'use client';

import React, { useState } from 'react';
import { SectionBrowser, Section } from '@/components/constitution/SectionBrowser';
import { DocumentViewer } from '@/components/constitution/DocumentViewer';
import { useRouter } from 'next/navigation';
import { usePublicDocument } from '@/hooks/usePublicDocument';
import { useStore } from '@/store';

const ConstitutionPage: React.FC = () => {
  const router = useRouter();
  const { documents, isLoading, error } = usePublicDocument();
  const { isAuthenticated, login } = useStore();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  // Convert documents to sections format
  const sections: Section[] = documents.map(doc => ({
    id: doc.id,
    title: doc.title,
    path: doc.path,
    isFile: true
  }));

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section);
    if (section.isFile) {
      router.push(`/constitution/${section.id}`);
    }
  };

  const handleLoginClick = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              DAHAO Ethics Framework
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Explore versioned ethical principles and their evolution through community consensus
            </p>
          </div>
          
          {!isAuthenticated && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Sign in with GitHub to contribute
              </p>
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Sign in with GitHub
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              Note: Viewing in read-only mode. {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ) : (
              <SectionBrowser
                sections={sections}
                onSelectSection={handleSectionSelect}
                selectedSectionId={selectedSection?.id}
              />
            )}
          </div>

          <div className="lg:col-span-2">
            {selectedSection ? (
              <DocumentViewer
                title={selectedSection.title}
                content={`# ${selectedSection.title}\n\nNavigate to view the full document.`}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Welcome to the DAHAO Ethics Framework
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  These are our versioned ethical principles that evolve through GitHub-based governance. 
                  Select a section to explore the current ethics versions.
                </p>
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    You're viewing in read-only mode. Sign in to propose ethics updates via GitHub Issues.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConstitutionPage;