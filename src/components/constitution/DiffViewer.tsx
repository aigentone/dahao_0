'use client';

import React from 'react';
import { diffLines, Change } from 'diff';

interface DiffViewerProps {
  oldContent: string;
  newContent: string;
  oldTitle?: string;
  newTitle?: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({
  oldContent,
  newContent,
  oldTitle = 'Original',
  newTitle = 'Modified'
}) => {
  const changes = diffLines(oldContent, newContent);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20">
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">
            {oldTitle}
          </h3>
        </div>
        <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-l border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-green-700 dark:text-green-400">
            {newTitle}
          </h3>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {changes.map((change, index) => (
              <DiffLine key={index} change={change} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DiffLine: React.FC<{ change: Change }> = ({ change }) => {
  const lines = change.value.split('\n').filter((line, index, arr) => 
    index < arr.length - 1 || line.length > 0
  );

  return (
    <>
      {lines.map((line, lineIndex) => (
        <tr
          key={lineIndex}
          className={
            change.added
              ? 'bg-green-50 dark:bg-green-900/20'
              : change.removed
              ? 'bg-red-50 dark:bg-red-900/20'
              : ''
          }
        >
          <td className="w-12 px-2 py-1 text-right text-xs text-gray-500 dark:text-gray-400 select-none">
            {!change.added && lineIndex + 1}
          </td>
          <td className="w-12 px-2 py-1 text-right text-xs text-gray-500 dark:text-gray-400 select-none border-r border-gray-200 dark:border-gray-700">
            {!change.removed && lineIndex + 1}
          </td>
          <td className="px-4 py-1 font-mono text-sm whitespace-pre-wrap">
            <span
              className={
                change.added
                  ? 'text-green-700 dark:text-green-400'
                  : change.removed
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-gray-700 dark:text-gray-300'
              }
            >
              {change.added ? '+ ' : change.removed ? '- ' : '  '}
              {line}
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};