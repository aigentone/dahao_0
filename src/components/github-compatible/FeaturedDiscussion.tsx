'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Circle, CheckCircle, ChevronUp, ArrowLeft } from 'lucide-react';
import { GitHubDiscussion } from '@/types/github-compatible';
import ReactMarkdown from 'react-markdown';

interface FeaturedDiscussionProps {
  discussion: GitHubDiscussion | null;
  onBack?: () => void;
  isSelected?: boolean;
  onDiscussionSelect?: (discussion: GitHubDiscussion) => void;
  basePath?: string; // For linking to discussion detail page
}

export function FeaturedDiscussion({
  discussion,
  onBack,
  isSelected = false,
  onDiscussionSelect,
  basePath
}: FeaturedDiscussionProps) {
  if (!discussion) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Discussions</h3>
        <p className="text-gray-600">No discussions available for this organization</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {discussion.closed ? (
              <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-green-600 flex-shrink-0" />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {discussion.title}
                <span className="text-gray-500 ml-2 font-normal">#{discussion.number}</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {discussion.category.emoji} {discussion.category.name} · opened{' '}
                {formatDistanceToNow(new Date(discussion.createdAt))} ago by{' '}
                <Link
                  href={discussion.author.url}
                  className="font-medium hover:underline"
                >
                  {discussion.author.login}
                </Link>
              </div>
            </div>
          </div>

          {isSelected && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>

        {/* Labels */}
        {discussion.labels.nodes.length > 0 && (
          <div className="flex gap-2 mb-4">
            {discussion.labels.nodes.map((label) => (
              <span
                key={label.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
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
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <ChevronUp className="w-4 h-4" />
            {discussion.upvoteCount} upvotes
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {discussion.comments.totalCount} comments
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="prose prose-gray max-w-none">
          <ReactMarkdown>{discussion.body}</ReactMarkdown>
        </div>
      </div>

      {/* Recent Comments Preview */}
      {discussion.comments.nodes.length > 0 && (
        <div className="border-t border-gray-100 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Recent Comments</h3>
          <div className="space-y-4">
            {discussion.comments.nodes.slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Image
                  src={comment.author.avatarUrl}
                  alt={comment.author.login}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={comment.author.url}
                      className="font-medium text-sm hover:underline"
                    >
                      {comment.author.login}
                    </Link>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt))} ago
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 line-clamp-3">
                    <ReactMarkdown>{comment.body}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {discussion.comments.totalCount > 2 && (
            <div className="mt-4 pt-4 border-t border-gray-50">
              {basePath ? (
                <Link
                  href={`${basePath}/discussions/${discussion.number}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {discussion.comments.totalCount} comments →
                </Link>
              ) : (
                <button
                  onClick={() => onDiscussionSelect?.(discussion)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {discussion.comments.totalCount} comments →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
