'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Circle, CheckCircle } from 'lucide-react';
import { GitHubDiscussion } from '@/types/github-compatible';

interface DiscussionListProps {
  discussions: GitHubDiscussion[];
  basePath?: string; // e.g., "/forum/core-governance/terms/harm"
  onDiscussionSelect?: (discussion: GitHubDiscussion) => void; // For in-page selection
}

export function DiscussionList({ discussions, basePath, onDiscussionSelect }: DiscussionListProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
      {discussions.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No discussions found
        </div>
      ) : (
        discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Open/Closed indicator */}
              <div className="mt-1">
                {discussion.closed ? (
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                ) : (
                  <Circle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {onDiscussionSelect ? (
                    <button
                      onClick={() => onDiscussionSelect(discussion)}
                      className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400 text-left"
                    >
                      {discussion.title}
                    </button>
                  ) : basePath ? (
                    <Link
                      href={`${basePath}/discussions/${discussion.number}`}
                      className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {discussion.title}
                    </Link>
                  ) : (
                    <span className="text-base font-semibold">
                      {discussion.title}
                    </span>
                  )}

                  {/* Labels */}
                  {discussion.labels.nodes.map((label) => (
                    <span
                      key={label.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        backgroundColor: `#${label.color}20`,
                        color: `#${label.color}`,
                        border: `1px solid #${label.color}40`,
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {discussion.category.emoji} {discussion.category.name} · opened{' '}
                  {formatDistanceToNow(new Date(discussion.createdAt))} ago by{' '}
                  <Link
                    href={discussion.author.url}
                    className="font-medium hover:underline"
                  >
                    {discussion.author.login}
                  </Link>
                  {discussion.comments.totalCount > 0 && (
                    <> · {discussion.comments.totalCount} comments</>
                  )}
                  {discussion.upvoteCount > 0 && (
                    <> · {discussion.upvoteCount} upvotes</>
                  )}
                </div>
              </div>

              {/* Comment count */}
              {discussion.comments.totalCount > 0 && (
                onDiscussionSelect ? (
                  <button
                    onClick={() => onDiscussionSelect(discussion)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {discussion.comments.totalCount}
                  </button>
                ) : basePath ? (
                  <Link
                    href={`${basePath}/discussions/${discussion.number}`}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {discussion.comments.totalCount}
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                    {discussion.comments.totalCount}
                  </div>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}