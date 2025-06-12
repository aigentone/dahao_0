'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { GitHubDiscussion, GitHubDiscussionComment } from '@/types/github-compatible';
import { CheckCircle, Circle, ChevronUp, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';

interface DiscussionViewProps {
  discussion: GitHubDiscussion;
}

export function DiscussionView({ discussion }: DiscussionViewProps) {
  const [selectedCommentForAgent, setSelectedCommentForAgent] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {discussion.closed ? (
            <CheckCircle className="w-6 h-6 text-purple-600" />
          ) : (
            <Circle className="w-6 h-6 text-green-600" />
          )}
          <h1 className="text-2xl font-semibold">
            {discussion.title}
            <span className="text-gray-500 ml-2">#{discussion.number}</span>
          </h1>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <Link href={discussion.author.url} className="font-medium hover:underline">
            {discussion.author.login}
          </Link>
          {' '}opened this discussion {formatDistanceToNow(new Date(discussion.createdAt))} ago
          {' · '}{discussion.comments.totalCount} comments
        </div>
      </div>

      {/* Labels */}
      {discussion.labels.nodes.length > 0 && (
        <div className="mb-4 flex gap-2">
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

      {/* Main discussion body */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg mb-6">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={discussion.author.avatarUrl}
              alt={discussion.author.login}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Link href={discussion.author.url} className="font-medium hover:underline">
                {discussion.author.login}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDistanceToNow(new Date(discussion.createdAt))} ago
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{discussion.body}</ReactMarkdown>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <ChevronUp className="w-4 h-4" />
              {discussion.upvoteCount} upvotes
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {discussion.comments.nodes.map((comment) => (
          <CommentView 
            key={comment.id} 
            comment={comment} 
            isAnswer={comment.id === discussion.answer?.id}
            onBotClick={() => setSelectedCommentForAgent(
              selectedCommentForAgent === comment.id ? null : comment.id
            )}
            showAgentPanel={selectedCommentForAgent === comment.id}
          />
        ))}
      </div>
    </div>
  );
}

function CommentView({ 
  comment, 
  isAnswer, 
  onBotClick, 
  showAgentPanel 
}: { 
  comment: GitHubDiscussionComment; 
  isAnswer?: boolean;
  onBotClick: () => void;
  showAgentPanel: boolean;
}) {
  return (
    <div className={`border rounded-lg ${isAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700'}`}>
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={comment.author.avatarUrl}
              alt={comment.author.login}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <Link href={comment.author.url} className="font-medium hover:underline">
                {comment.author.login}
              </Link>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAnswer && (
              <span className="text-sm text-green-600 font-medium">✓ Answer</span>
            )}
            <button
              onClick={onBotClick}
              className={`p-2 rounded-md transition-colors ${
                showAgentPanel 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Assign AI Agent"
            >
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`${showAgentPanel ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
        {/* Comment Content */}
        <div className="p-4">
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{comment.body}</ReactMarkdown>
          </div>
          
          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <ChevronUp className="w-4 h-4" />
              {comment.upvoteCount} upvotes
            </button>
          </div>
        </div>

        {/* Agent Assignment Panel - shown on the right when bot icon is clicked */}
        {showAgentPanel && (
          <div className="p-4 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <AgentAssignmentPanel />
          </div>
        )}
      </div>
    </div>
  );
}