'use client';

import React, { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, DocumentTextIcon, FolderIcon, FolderOpenIcon } from '@heroicons/react/24/outline';

export interface Section {
  id: string;
  title: string;
  path: string;
  children?: Section[];
  isFile?: boolean;
}

interface SectionBrowserProps {
  sections: Section[];
  onSelectSection: (section: Section) => void;
  selectedSectionId?: string;
}

const SectionItem: React.FC<{
  section: Section;
  onSelect: (section: Section) => void;
  selectedId?: string;
  level?: number;
}> = ({ section, onSelect, selectedId, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = section.children && section.children.length > 0;
  const isSelected = section.id === selectedId;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect(section);
  };

  return (
    <div>
      <div
        className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isSelected ? 'bg-blue-100 dark:bg-blue-900' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="mr-1">
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            )}
          </span>
        )}
        {!hasChildren && !section.isFile && (
          <span className="mr-1 ml-5" />
        )}
        <span className="mr-2">
          {section.isFile ? (
            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
          ) : isExpanded ? (
            <FolderOpenIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <FolderIcon className="h-5 w-5 text-gray-400" />
          )}
        </span>
        <span className={`text-sm ${isSelected ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
          {section.title}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {section.children!.map((child) => (
            <SectionItem
              key={child.id}
              section={child}
              onSelect={onSelect}
              selectedId={selectedId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SectionBrowser: React.FC<SectionBrowserProps> = ({
  sections,
  onSelectSection,
  selectedSectionId
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Constitution Sections
        </h3>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {sections.map((section) => (
          <SectionItem
            key={section.id}
            section={section}
            onSelect={onSelectSection}
            selectedId={selectedSectionId}
          />
        ))}
      </div>
    </div>
  );
};