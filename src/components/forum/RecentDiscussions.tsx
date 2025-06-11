'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Brain } from 'lucide-react';
import { GovernanceDiscussion } from '@/types/governance';
import { DiscussionParser } from '@/lib/discussion-parser';

interface RecentDiscussionsProps {
  discussions?: GovernanceDiscussion[];
  onDiscussionSelect?: (discussion: GovernanceDiscussion) => void;
}

export function RecentDiscussions({ discussions: rawDiscussions, onDiscussionSelect }: RecentDiscussionsProps) {
  const router = useRouter();
  // Default discussions data if none provided
  const defaultDiscussions = [
    {
      id: '1',
      title: 'Outdoor Access Requirements for Farm Animals',
      description: 'Mandatory outdoor access for all farm animal welfare certifications, with minimum daily requirements based on species-specific needs.',
      category: 'Five Freedoms',
      status: 'Community Review',
      statusColor: 'blue',
      timeAgo: '3 days ago',
      participants: 4,
      comments: 4,
      aiAnalyses: 2
    },
    {
      id: '2',
      title: '24/7 Emergency Response Protocol',
      description: 'Framework for rapid response to animal welfare emergencies including life-threatening conditions and disaster scenarios.',
      category: 'Emergency Care',
      status: 'Draft',
      statusColor: 'gray',
      timeAgo: '1 week ago',
      participants: 0,
      comments: 0,
      aiAnalyses: 0
    }
  ];

  // Parse real discussions if provided
  let discussions = defaultDiscussions;
  if (rawDiscussions && rawDiscussions.length > 0) {
    discussions = rawDiscussions
      .slice(0, 3) // Show most recent 3 discussions
      .map((discussion, index) => {
        const parsed = DiscussionParser.parseDiscussion(discussion, index);
        return {
          id: parsed.id,
          title: parsed.title,
          description: parsed.description,
          category: parsed.category,
          status: parsed.status,
          statusColor: parsed.statusColor,
          timeAgo: parsed.timeAgo,
          participants: parsed.participants,
          comments: parsed.comments,
          aiAnalyses: parsed.aiAnalyses
        };
      });
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">Recent Discussions</h4>

      {discussions.map((discussion) => (
        <div 
          key={discussion.id}
          className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => {
            if (rawDiscussions && rawDiscussions.length > 0) {
              const originalDiscussion = rawDiscussions.find(d => 
                d.title === discussion.title || 
                d.summary === discussion.description ||
                d.title.toLowerCase().includes(discussion.title.toLowerCase())
              );
              
              if (originalDiscussion && onDiscussionSelect) {
                onDiscussionSelect(originalDiscussion);
              } else {
                alert('Discussion content not available');
              }
            } else {
              alert('This is a sample discussion. Full discussion system coming soon!');
            }
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
              <Badge 
                className={`${
                  discussion.statusColor === 'blue' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700'
                } border-0 text-xs`}
              >
                {discussion.status}
              </Badge>
            </div>
            <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
          </div>
          
          <h4 className="font-medium text-gray-900 mb-2">{discussion.title}</h4>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {discussion.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {discussion.participants} participants
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {discussion.comments} comments
            </span>
            <span className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              {discussion.aiAnalyses} AI analyses
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}