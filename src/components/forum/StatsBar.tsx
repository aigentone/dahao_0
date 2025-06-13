'use client';

import React from 'react';
import { Brain, Users, MessageSquare, TrendingUp, Coins, DollarSign } from 'lucide-react';
import { GovernanceData } from '@/types/governance';
import { DiscussionParser } from '@/lib/discussion-parser';

interface StatsBarProps {
  governanceData?: GovernanceData;
  stats?: {
    activeDAHAOs: number;
    contributors: number;
    activeDiscussions: number;
    consensusRate: number;
    // NEW: Token Economics Stats
    totalTokenValue: number;
    investmentPools: number;
    tokenHolders: number;
    averageROI: number;
  };
}

export function StatsBar({ governanceData, stats: providedStats }: StatsBarProps) {
  // Calculate real stats if governance data is provided
  let stats = providedStats;
  if (governanceData && !providedStats && governanceData.organizations && governanceData.discussionsByPrinciple) {
    stats = DiscussionParser.calculatePlatformStats(
      governanceData.organizations,
      governanceData.discussionsByPrinciple
    );
  }
  
  // Fallback to calculated stats from governance data
  if (!stats) {
    const orgCount = governanceData?.organizations?.length || 0;
    const allDiscussions = governanceData?.discussionsByPrinciple 
      ? Object.values(governanceData.discussionsByPrinciple).flat() 
      : [];
    
    // Count unique contributors from discussions
    const contributors = new Set<string>();
    allDiscussions.forEach(discussion => {
      if (discussion?.author && discussion.author !== 'unknown') {
        contributors.add(discussion.author);
      }
    });
    
    // Count active discussions
    const activeDiscussions = allDiscussions.filter(discussion => 
      discussion?.status && (
        discussion.status.toLowerCase().includes('active') ||
        discussion.status.toLowerCase().includes('discussion') ||
        discussion.status.toLowerCase().includes('review')
      )
    ).length;
    
    // Calculate consensus rate from discussions with approval data
    const discussionsWithApproval = allDiscussions.filter(d => 
      d?.content?.includes('approval') || d?.content?.includes('✅')
    );
    
    let consensusRate = 85; // Default fallback
    if (discussionsWithApproval.length > 0) {
      const approvalRates: number[] = [];
      discussionsWithApproval.forEach(discussion => {
        const match = discussion.content?.match(/(\d+)%\s*(approval|consensus)/i);
        if (match) {
          approvalRates.push(parseInt(match[1]));
        }
      });
      
      if (approvalRates.length > 0) {
        consensusRate = Math.round(approvalRates.reduce((a, b) => a + b, 0) / approvalRates.length);
      }
    }
    
    stats = {
      activeDAHAOs: orgCount,
      contributors: Math.max(contributors.size, 5), // Show at least 5 if we have data
      activeDiscussions: Math.max(activeDiscussions, 1),
      consensusRate,
      // Token Economics Mock Data (would be from API in production)
      totalTokenValue: 2500000, // $2.5M total token value
      investmentPools: orgCount * 3, // 3 pools per DAHAO on average
      tokenHolders: Math.max(contributors.size * 4, 50), // 4x contributors are token holders
      averageROI: 18.5 // 18.5% average ROI
    };
  }
  return (
    <div className="container mx-auto px-6 -mt-6 mb-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.activeDAHAOs}</span>
            </div>
            <p className="text-sm text-gray-600">Active DAHAOs</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.contributors}</span>
            </div>
            <p className="text-sm text-gray-600">Contributors</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.activeDiscussions}</span>
            </div>
            <p className="text-sm text-gray-600">Active Discussions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.consensusRate}%</span>
            </div>
            <p className="text-sm text-gray-600">Consensus Rate</p>
          </div>
          {/* Token Economics Stats */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                ${(stats.totalTokenValue / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-sm text-gray-600">Token Value</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.investmentPools}</span>
            </div>
            <p className="text-sm text-gray-600">Investment Pools</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.tokenHolders}</span>
            </div>
            <p className="text-sm text-gray-600">Token Holders</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.averageROI}%</span>
            </div>
            <p className="text-sm text-gray-600">Average ROI</p>
          </div>
        </div>
      </div>
    </div>
  );
}