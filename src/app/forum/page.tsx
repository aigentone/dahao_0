'use client';

import { useState, useEffect } from 'react';
import { OrganizationSelector } from '@/components/governance/OrganizationSelector';
import { PrinciplesList } from '@/components/governance/PrinciplesList';
import { ContentDisplay } from '@/components/governance/ContentDisplay';
import { GovernanceData, GovernanceOrganization, GovernancePrinciple, GovernanceDiscussion } from '@/types/governance';

export default function ForumPage() {
  const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<GovernanceDiscussion | null>(null);

  useEffect(() => {
    fetchGovernanceData();
  }, []);

  const fetchGovernanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/governance');
      if (response.ok) {
        const data = await response.json();
        setGovernanceData(data);
        // Auto-select core governance by default
        if (data.organizations.length > 0) {
          setSelectedOrg('core-governance');
        }
      } else {
        console.error('Failed to fetch governance data');
      }
    } catch (error) {
      console.error('Error fetching governance data:', error);
    }
    setLoading(false);
  };

  const handleSelectOrg = (orgId: string) => {
    setSelectedOrg(orgId);
    setSelectedPrinciple(null);
    setSelectedDiscussion(null);
  };

  const handleSelectPrinciple = (principleId: string) => {
    setSelectedPrinciple(principleId);
    setSelectedDiscussion(null);
  };

  const getCurrentOrganization = (): GovernanceOrganization | null => {
    if (!governanceData || !selectedOrg) return null;
    return governanceData.organizations.find(org => org.id === selectedOrg) || null;
  };

  const getCurrentPrinciples = (): GovernancePrinciple[] => {
    if (!governanceData || !selectedOrg) return [];
    return governanceData.principlesByOrg[selectedOrg] || [];
  };

  const getCurrentPrinciple = (): GovernancePrinciple | null => {
    if (!selectedPrinciple) return null;
    const principles = getCurrentPrinciples();
    return principles.find(p => p.principle_id === selectedPrinciple) || null;
  };

  const getCurrentDiscussions = (): GovernanceDiscussion[] => {
    if (!governanceData || !selectedPrinciple) return [];
    return governanceData.discussionsByPrinciple[selectedPrinciple] || [];
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading governance data...</p>
        </div>
      </div>
    );
  }

  if (!governanceData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load governance data</p>
        </div>
      </div>
    );
  }

  const currentOrg = getCurrentOrganization();
  const currentPrinciples = getCurrentPrinciples();
  const currentPrinciple = getCurrentPrinciple();
  const currentDiscussions = getCurrentDiscussions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              <span className="text-5xl mr-3">道</span>
              DAHAO Governance Browser
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore versioned ethics principles and community discussions in our decentralized governance system
            </p>
          </div>
        </div>

      {/* Organization Selector */}
      <OrganizationSelector
        organizations={governanceData.organizations}
        selectedOrg={selectedOrg}
        onSelectOrg={handleSelectOrg}
      />

        {/* Selected Organization Info */}
        {currentOrg && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-blue-100">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{currentOrg.emoji}</span>
              <div>
                <h3 className="font-bold text-xl text-gray-900">{currentOrg.name}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{currentOrg.description}</p>
                {currentOrg.inheritance.extends && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    🔗 Inherits from: {currentOrg.inheritance.extends}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {selectedOrg && (
          <div className="flex gap-8">
            {/* Principles List */}
            <PrinciplesList
              principles={currentPrinciples}
              discussionsByPrinciple={governanceData.discussionsByPrinciple}
              selectedPrinciple={selectedPrinciple}
              onSelectPrinciple={handleSelectPrinciple}
              organizationName={currentOrg?.name || ''}
            />

            {/* Content Display */}
            <ContentDisplay
              selectedPrinciple={currentPrinciple}
              discussions={currentDiscussions}
              selectedDiscussion={selectedDiscussion}
              onSelectDiscussion={setSelectedDiscussion}
            />
          </div>
        )}

        {/* No organization selected state */}
        {!selectedOrg && (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-12 shadow-lg border border-blue-100 max-w-2xl mx-auto">
              <div className="text-8xl mb-6">🏛️</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Welcome to DAHAO Governance</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Select an organization above to explore its principles and community discussions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}