'use client';

import React, { useState, useEffect } from 'react';
import { SectionBrowser, Section } from '@/components/constitution/SectionBrowser';
import { DocumentViewer } from '@/components/constitution/DocumentViewer';
import { useRouter } from 'next/navigation';

const ConstitutionPage: React.FC = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load constitution structure
    const loadSections = async () => {
      try {
        const response = await fetch('/api/constitution/structure');
        if (response.ok) {
          const data = await response.json();
          setSections(data.sections);
        }
      } catch (error) {
        console.error('Failed to load constitution structure:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSections();
  }, []);

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section);
    if (section.isFile) {
      router.push(`/constitution/${section.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Constitution of Dahao
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Browse and view the constitutional documents
          </p>
        </div>

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
                  Welcome to the Constitution
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a section from the browser to view its contents.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstitutionPage;