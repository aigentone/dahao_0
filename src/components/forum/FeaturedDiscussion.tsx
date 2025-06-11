'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Clock, 
  Users, 
  MessageSquare, 
  Brain, 
  ChevronRight, 
  ThumbsUp 
} from 'lucide-react';
import { GovernanceDiscussion } from '@/types/governance';
import { DiscussionParser } from '@/lib/discussion-parser';
import { FullDiscussionView } from './FullDiscussionView';

interface FeaturedDiscussionProps {
  discussion?: GovernanceDiscussion;
  onDiscussionSelect?: (discussion: GovernanceDiscussion) => void;
  onBack?: () => void;
  isSelected?: boolean;
}

export function FeaturedDiscussion({ discussion, onDiscussionSelect, onBack, isSelected }: FeaturedDiscussionProps) {
  const router = useRouter();
  
  // If discussion is selected, show full view
  if (isSelected && discussion && onBack) {
    return <FullDiscussionView discussion={discussion} onBack={onBack} />;
  }
  
  // Default featured discussion data if none provided
  const defaultData = {
    title: "Turkey Municipal Veterinary System for Street Animals",
    description: "Proposal to establish a transparent, blockchain-verified system for Turkish municipal veterinary services to manage street animal care, track treatments, and enable direct donations.",
    author: "municipal_integration_working_group",
    participants: 7,
    comments: 7,
    aiAnalyses: 2,
    humanApproval: 75,
    aiApproval: 92,
    timeLeft: "2 days left",
    status: "Active Discussion"
  };

  // Parse real discussion data if provided
  let discussionData = defaultData;
  if (discussion) {
    const parsed = DiscussionParser.parseDiscussion(discussion, 0);
    const votingData = DiscussionParser.parseVotingData(discussion);
    
    discussionData = {
      title: parsed.title,
      description: parsed.description,
      author: parsed.author.replace('@', ''),
      participants: parsed.participants,
      comments: parsed.comments,
      aiAnalyses: parsed.aiAnalyses,
      humanApproval: votingData?.humanApproval || 75,
      aiApproval: votingData?.aiApproval || 92,
      timeLeft: parsed.timeAgo,
      status: parsed.status
    };
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-orange-500 text-white">
            <Zap className="w-3 h-3 mr-1" />
            Hot Topic
          </Badge>
          <Badge className="bg-green-100 text-green-700 border-0">{discussionData.status}</Badge>
        </div>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {discussionData.timeLeft}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {discussionData.title}
      </h3>

      <p className="text-gray-600 mb-4">
        {discussionData.description}
      </p>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback>
              {discussionData.author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">@{discussionData.author}</p>
            <p className="text-xs text-gray-500">Proposal Author</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {discussionData.participants} participants
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {discussionData.comments} comments
          </span>
          <span className="flex items-center gap-1">
            <Brain className="w-4 h-4" />
            {discussionData.aiAnalyses} AI analyses
          </span>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Human Votes</span>
          <span className="text-green-600 font-medium">{discussionData.humanApproval}% Approval</span>
        </div>
        <Progress value={discussionData.humanApproval} className="h-3" />

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">AI Agent Consensus</span>
          <span className="text-blue-600 font-medium">{discussionData.aiApproval}% Approval</span>
        </div>
        <Progress value={discussionData.aiApproval} className="h-3" />
      </div>

      <div className="flex gap-3 mt-6">
        <Button 
          className="flex-1"
          onClick={() => {
            if (discussion && onDiscussionSelect) {
              onDiscussionSelect(discussion);
            } else if (isSelected && onBack) {
              onBack();
            } else {
              alert('This is a sample featured discussion. Full discussion system coming soon!');
            }
          }}
        >
          {isSelected ? 'Back to Discussions' : 'View Full Discussion'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline">
          <ThumbsUp className="w-4 h-4 mr-2" />
          Vote
        </Button>
      </div>
    </div>
  );
}