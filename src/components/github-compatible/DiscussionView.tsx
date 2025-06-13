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

      {/* Comments - Threaded View */}
      <div className="space-y-4">
        {(() => {
          // Build a threaded comment structure
          const commentMap = new Map<string, GitHubDiscussionComment[]>();
          const rootComments: GitHubDiscussionComment[] = [];
          
          // First pass: organize comments by parent
          discussion.comments.nodes.forEach(comment => {
            if (!comment.parentCommentId) {
              rootComments.push(comment);
            } else {
              if (!commentMap.has(comment.parentCommentId)) {
                commentMap.set(comment.parentCommentId, []);
              }
              commentMap.get(comment.parentCommentId)!.push(comment);
            }
          });
          
          // Sort root comments by date
          rootComments.sort((a, b) => 
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          
          // Sort child comments by date
          commentMap.forEach(children => {
            children.sort((a, b) => 
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
          
          // Recursive function to render comment thread
          const renderCommentThread = (
            comment: GitHubDiscussionComment, 
            indentLevel: number = 0
          ): React.JSX.Element[] => {
            const maxIndentLevel = 3;
            const actualIndentLevel = Math.min(indentLevel, maxIndentLevel);
            
            const elements: React.JSX.Element[] = [];
            
            // Render the comment itself
            elements.push(
              <div 
                key={comment.id}
                style={{ 
                  marginLeft: `${actualIndentLevel * 32}px`,
                  position: 'relative'
                }}
              >
                {/* Indent line indicator */}
                {actualIndentLevel > 0 && (
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"
                    style={{ 
                      left: `${-16}px`,
                      top: '20px'
                    }}
                  />
                )}
                
                <CommentView 
                  comment={comment} 
                  isAnswer={comment.id === discussion.answer?.id}
                  onBotClick={() => setSelectedCommentForAgent(
                    selectedCommentForAgent === comment.id ? null : comment.id
                  )}
                  showAgentPanel={selectedCommentForAgent === comment.id}
                  indentLevel={actualIndentLevel}
                />
              </div>
            );
            
            // Render child comments recursively
            const children = commentMap.get(comment.id) || [];
            children.forEach(child => {
              elements.push(...renderCommentThread(child, indentLevel + 1));
            });
            
            return elements;
          };
          
          // Render all root comments and their threads
          return rootComments.flatMap(comment => renderCommentThread(comment));
        })()}
      </div>
    </div>
  );
}

function CommentView({ 
  comment, 
  isAnswer, 
  onBotClick, 
  showAgentPanel,
  indentLevel = 0
}: { 
  comment: GitHubDiscussionComment; 
  isAnswer?: boolean;
  onBotClick: () => void;
  showAgentPanel: boolean;
  indentLevel?: number;
}) {
  const isBot = comment.isBot || false;
  const hasAssignedAgent = comment.hasAssignedAgent || false;
  const assignmentType = comment.aiAssignment?.assignmentType;
  
  // Determine border and background colors based on comment type
  const getCommentStyling = () => {
    if (isAnswer) return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    if (isBot) {
      switch (assignmentType) {
        case 'user_requested':
          return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
        case 'third_party_verification':
          return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
        case 'system_automatic':
          return 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20';
        default:
          return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20';
      }
    }
    if (hasAssignedAgent) {
      return 'border-orange-300 bg-orange-50 dark:bg-orange-900/20';
    }
    return 'border-gray-300 dark:border-gray-700';
  };
  
  return (
    <div className={`border rounded-lg ${getCommentStyling()}`}>
      <div className={`px-4 py-2 border-b ${
        isBot && assignmentType === 'user_requested'
          ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600'
          : isBot && assignmentType === 'third_party_verification'
          ? 'bg-purple-100 dark:bg-purple-800 border-purple-300 dark:border-purple-600'
          : isBot && assignmentType === 'system_automatic'
          ? 'bg-indigo-100 dark:bg-indigo-800 border-indigo-300 dark:border-indigo-600'
          : isBot
          ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600'
          : hasAssignedAgent
          ? 'bg-orange-100 dark:bg-orange-800 border-orange-300 dark:border-orange-600'
          : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={comment.author.avatarUrl}
                alt={comment.author.login}
                className={`w-8 h-8 rounded-full ${isBot ? 'ring-2 ring-blue-400' : ''}`}
              />
              {isBot && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Link href={comment.author.url} className="font-medium hover:underline">
                  {comment.author.login}
                </Link>
                {isBot && (
                  <span className={`px-2 py-0.5 text-white text-xs rounded-full font-medium ${
                    assignmentType === 'user_requested'
                      ? 'bg-blue-600'
                      : assignmentType === 'third_party_verification'
                      ? 'bg-purple-600'
                      : assignmentType === 'system_automatic'
                      ? 'bg-indigo-600'
                      : 'bg-blue-600'
                  }`}>
                    {assignmentType === 'user_requested'
                      ? 'PERSONAL AI'
                      : assignmentType === 'third_party_verification'
                      ? 'VERIFICATION AI'
                      : assignmentType === 'system_automatic'
                      ? 'AUTO AI'
                      : 'AI AGENT'
                    }
                  </span>
                )}
                {hasAssignedAgent && !isBot && (
                  <span className="px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full font-medium">
                    🤖 ASSIGNED AGENT
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
                {comment.aiAssignment && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {comment.aiAssignment.taskType.replace('_', ' ')}
                    </span>
                    {comment.aiAssignment.confidence && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 dark:text-green-400">
                          {Math.round(comment.aiAssignment.confidence * 100)}% confidence
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
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
          
          {/* Verification Target Indicator - Only show if verifying a different comment */}
          {comment.verificationTarget && comment.verificationTarget !== comment.parentCommentId && (
            <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded border-l-4 border-purple-400">
              <div className="text-sm text-purple-700 dark:text-purple-300">
                <strong>🔍 Verifying comment #{comment.verificationTarget.replace('comment-', '')}</strong>
              </div>
            </div>
          )}

          {/* AI Agent Assignment Info */}
          {hasAssignedAgent && !isBot && comment.assignedAgentId && (
            <div className="mt-2 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="text-sm text-orange-800 dark:text-orange-200">
                <strong>🤖 AI Agent Assigned:</strong>{' '}
                <span className="font-mono">{comment.assignedAgentId}</span>
                <span className="ml-2 px-2 py-0.5 bg-orange-200 text-orange-900 text-xs rounded">
                  awaiting response
                </span>
              </div>
            </div>
          )}

          {/* AI Agent Tools Used */}
          {isBot && comment.aiAssignment?.tools_used && (
            <div className={`mt-3 p-3 rounded-lg border ${
              assignmentType === 'user_requested'
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
                : assignmentType === 'third_party_verification'
                ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
                : assignmentType === 'system_automatic'
                ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700'
                : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
            }`}>
              <div className={`text-sm ${
                assignmentType === 'user_requested'
                  ? 'text-blue-800 dark:text-blue-200'
                  : assignmentType === 'third_party_verification'
                  ? 'text-purple-800 dark:text-purple-200'
                  : assignmentType === 'system_automatic'
                  ? 'text-indigo-800 dark:text-indigo-200'
                  : 'text-blue-800 dark:text-blue-200'
              }`}>
                <strong>🔧 MCP Tools Used:</strong>{' '}
                <span className="font-mono">
                  {comment.aiAssignment.tools_used.join(', ')}
                </span>
                {comment.aiAssignment.isAutomated && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                    automated
                  </span>
                )}
                {comment.aiAssignment.triggeredBy && (
                  <div className="mt-1 text-xs">
                    <strong>Triggered by:</strong> {comment.aiAssignment.triggeredBy.map(id => `#${id.replace('comment-', '')}`).join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <ChevronUp className="w-4 h-4" />
              {comment.upvoteCount} upvotes
            </button>
            {isBot && comment.aiAssignment?.assignedBy && (
              <span className="text-xs text-gray-500">
                Assigned by {comment.aiAssignment.assignedBy}
              </span>
            )}
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