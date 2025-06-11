'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Users, 
  MessageSquare, 
  Brain, 
  TrendingUp,
  Vote,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Shield,
  Zap,
  Share,
  Bell,
  BarChart3
} from 'lucide-react';
import { GovernanceDiscussion } from '@/types/governance';
import { DiscussionParser } from '@/lib/discussion-parser';
import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';

interface FullDiscussionViewProps {
  discussion: GovernanceDiscussion;
  onBack: () => void;
}

export function FullDiscussionView({ discussion, onBack }: FullDiscussionViewProps) {
  // Parse discussion data
  const parsedDiscussion = DiscussionParser.parseDiscussion(discussion, 0);
  const votingData = DiscussionParser.parseVotingData(discussion);
  const metrics = DiscussionParser.parseDiscussionMetrics(discussion);

  // Parse comments from content
  const parseComments = (content: string) => {
    const lines = content.split('\n');
    const comments = [];
    let currentComment = null;
    
    for (const line of lines) {
      const commentMatch = line.match(/\*\*@([a-zA-Z0-9_-]+)(?:\s*\(([^)]+)\))?\*\*/);
      if (commentMatch) {
        if (currentComment) {
          comments.push(currentComment);
        }
        currentComment = {
          author: commentMatch[1],
          type: commentMatch[2] || 'Human',
          content: '',
          timestamp: ''
        };
      } else if (line.match(/^\*\d+\s*(days?|hours?|minutes?)\s*ago\*/)) {
        if (currentComment) {
          currentComment.timestamp = line.replace(/^\*/, '').replace(/\*$/, '');
        }
      } else if (currentComment && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
        currentComment.content += line + '\n';
      }
    }
    
    if (currentComment) {
      comments.push(currentComment);
    }
    
    return comments;
  };

  const comments = parseComments(discussion.content);

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discussions
          </Button>
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              {discussion.status}
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-700">
              {parsedDiscussion.category}
            </Badge>
            <Badge className="bg-red-100 text-red-700">
              🔥 Hot Topic
            </Badge>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{discussion.title}</h1>
        <p className="text-gray-600 mb-4">{discussion.summary}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback>
                {discussion.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">@{discussion.author}</div>
              <div className="text-xs">Proposal Author</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {metrics.participants} participants
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {metrics.comments} comments
            </span>
            <span className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              {metrics.aiAnalyses} AI analyses
            </span>
          </div>
        </div>

        {/* Voting Progress */}
        {votingData && (
          <div className="bg-white/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Vote className="w-5 h-5" />
              Voting Progress
            </h3>
            
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span><strong>Human Votes</strong></span>
                  <span className="text-green-600 font-semibold">{votingData.humanApproval}% Approval</span>
                </div>
                <Progress value={votingData.humanApproval} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span><strong>AI Agent Consensus</strong></span>
                  <span className="text-blue-600 font-semibold">{votingData.aiApproval}% Approval</span>
                </div>
                <Progress value={votingData.aiApproval} className="h-3" />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button size="sm" className="flex-1">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Vote Approve
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <ThumbsDown className="w-4 h-4 mr-2" />
                Vote Reject
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid with Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Discussion Thread - Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-b from-gray-50 to-white p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                💬 Discussion Thread
              </h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={comment.type === 'AI Agent' ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-br from-blue-500 to-green-500 text-white'}>
                          {comment.author.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">@{comment.author}</span>
                          <Badge 
                            variant="outline" 
                            className={comment.type === 'AI Agent' ? 'bg-purple-100 text-purple-700 text-xs' : 'bg-green-100 text-green-700 text-xs'}
                          >
                            {comment.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <p className="whitespace-pre-wrap">{comment.content.trim()}</p>
                          {comment.type === 'AI Agent' && comment.content.includes('analysis') && (
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="text-xs text-blue-800">
                                {comment.content.includes('✅') && <div>✅ Analysis indicates approval</div>}
                                {comment.content.includes('💡') && <div>💡 Technical recommendations provided</div>}
                                {comment.content.includes('🔧') && <div>🔧 Implementation details analyzed</div>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* AI Agent Assignment - Use existing sophisticated component */}
          <AgentAssignmentPanel />

          {/* Related Principles */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Related Principles
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'Five Freedoms v1.0', desc: 'Core animal welfare framework' },
                { name: 'Emergency Care Protocol v1.0', desc: 'Rapid response framework' },
                { name: 'Transparency v1.1', desc: 'Open and auditable processes' }
              ].map((principle, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                  <div className="font-medium text-sm mb-1">{principle.name}</div>
                  <div className="text-xs text-gray-600">{principle.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Quick Actions
            </h3>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Share className="w-4 h-4 mr-2" />
                Share Discussion
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Follow Updates
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}