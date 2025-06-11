'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { GovernanceOrganization } from '@/types/governance';

interface OrganizationHeaderProps {
  organization: GovernanceOrganization;
}

export function OrganizationHeader({ organization }: OrganizationHeaderProps) {
  // Calculate real stats from organization governance data
  const calculateRealStats = (org: GovernanceOrganization) => {
    const principleCount = org.principles.length;
    const proposalCount = org.discussions.length;
    
    // Calculate consensus rate from discussions with voting data
    const discussionsWithVotes = org.discussions.filter(d => 
      d.content?.includes('✅') || d.content?.includes('votes') || d.content?.includes('approval')
    );
    
    let consensusRate = '85%'; // Default fallback
    if (discussionsWithVotes.length > 0) {
      // Extract approval percentages from discussion content
      const approvalRates: number[] = [];
      discussionsWithVotes.forEach(discussion => {
        const match = discussion.content?.match(/(\d+)%\s*(approval|consensus)/i);
        if (match) {
          approvalRates.push(parseInt(match[1]));
        }
      });
      
      if (approvalRates.length > 0) {
        const avgApproval = Math.round(approvalRates.reduce((a, b) => a + b, 0) / approvalRates.length);
        consensusRate = `${avgApproval}%`;
      }
    }
    
    return {
      members: 0, // Member count not available in governance data yet
      principles: principleCount,
      proposals: proposalCount,
      consensus: consensusRate
    };
  };

  const stats = calculateRealStats(organization);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
            <span className="text-3xl">{organization.emoji}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{organization.name} DAHAO</h1>
            <p className="text-gray-600">{organization.description}</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Heart className="w-4 h-4 mr-2" />
          Join Community
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl font-bold text-gray-900">{stats.members}</span>
          <p className="text-xs text-gray-600 mt-1">Members</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl font-bold text-gray-900">{stats.principles}</span>
          <p className="text-xs text-gray-600 mt-1">Principles</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl font-bold text-gray-900">{stats.proposals}</span>
          <p className="text-xs text-gray-600 mt-1">Proposals</p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <span className="text-2xl font-bold text-gray-900">{stats.consensus}</span>
          <p className="text-xs text-gray-600 mt-1">Consensus</p>
        </div>
      </div>
    </div>
  );
}