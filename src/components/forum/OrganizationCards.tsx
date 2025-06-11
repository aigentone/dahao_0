'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Users, Sparkles, Zap } from 'lucide-react';
import { GovernanceOrganization } from '@/types/governance';

interface OrganizationCardsProps {
  organizations: GovernanceOrganization[];
  selectedOrg: string | null;
  onSelectOrg: (orgId: string) => void;
}

export function OrganizationCards({ organizations, selectedOrg, onSelectOrg }: OrganizationCardsProps) {
  const getOrgStats = (org: GovernanceOrganization) => {
    // Calculate real stats from organization data
    const principleCount = org.principles.length;
    const discussionCount = org.discussions.length;
    const activeDiscussions = org.discussions.filter(d => 
      d.status.toLowerCase().includes('active') || 
      d.status.toLowerCase().includes('discussion') ||
      d.status.toLowerCase().includes('review')
    ).length;
    
    // Base stats with real data from governance
    const baseStats = {
      views: 'N/A', // Views not available in governance data yet
      members: 0, // Member count not available in governance data yet
      principles: principleCount,
      active: activeDiscussions,
      version: org.version
    };
    
    // Organization-specific styling
    const styling = {
      'core-governance': { 
        gradient: 'from-blue-500 to-blue-600', 
        bgGradient: 'from-blue-100 to-blue-200', 
        color: 'blue' 
      },
      'animal-welfare': { 
        gradient: 'from-green-500 to-emerald-600', 
        bgGradient: 'from-green-100 to-green-200', 
        color: 'green', 
        trending: true 
      },
      'environment': { 
        gradient: 'from-purple-500 to-purple-600', 
        bgGradient: 'from-purple-100 to-purple-200', 
        color: 'purple' 
      }
    };
    
    return { 
      ...baseStats, 
      ...(styling[org.id as keyof typeof styling] || styling['core-governance']) 
    };
  };

  return (
    <div className="lg:col-span-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Active DAHAOs</h2>

      {organizations.map((org) => {
        const stats = getOrgStats(org);
        const isSelected = selectedOrg === org.id;
        
        return (
          <div
            key={org.id}
            className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border ${
              isSelected ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'
            }`}
            onClick={() => onSelectOrg(org.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stats.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
            
            {(stats as any).trending && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">
                  <Zap className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stats.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{org.emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-2 group-hover:text-${stats.color}-600 transition-colors`}>
                    {org.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {org.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`bg-${stats.color}-100 text-${stats.color}-700 border-0`}>{stats.version}</Badge>
                    <Badge variant="outline" className="text-xs">{stats.principles} principles</Badge>
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      {stats.active} active
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {stats.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {stats.members} members
                    </span>
                  </div>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stats.gradient} transform ${isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform`} />
            </div>
          </div>
        );
      })}

      {/* Create New DAHAO CTA */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 border-dashed">
        <div className="text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Have an idea?</h4>
          <p className="text-sm text-gray-500 mb-4">Start your own DAHAO and build a community</p>
          <Button variant="outline" className="w-full">
            Create New DAHAO
          </Button>
        </div>
      </div>
    </div>
  );
}