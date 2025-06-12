'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Calendar, Vote, Users } from 'lucide-react';
import { TermDefinitionCard } from '@/components/github-compatible/TermDefinitionCard';
import { DiscussionView } from '@/components/github-compatible/DiscussionView';
import { TermDiscussion, GitHubDiscussion } from '@/types/github-compatible';

interface TermsViewProps {
  organizationId: string;
}

interface TermInfo {
  name: string;
  domain: string;
  hasDiscussion: boolean;
}

export function TermsView({ organizationId }: TermsViewProps) {
  const [availableTerms, setAvailableTerms] = useState<TermInfo[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<TermDiscussion | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableTerms();
  }, [organizationId]);

  const fetchAvailableTerms = async () => {
    setLoading(true);
    try {
      // Get available terms for this organization
      const response = await fetch(`/api/terms-list/${organizationId}`);
      if (response.ok) {
        const terms = await response.json();
        setAvailableTerms(terms);
      } else {
        // Fallback to hardcoded terms if API not implemented yet
        const fallbackTerms = getTermsForOrganization(organizationId);
        setAvailableTerms(fallbackTerms);
      }
    } catch (error) {
      console.error('Failed to fetch terms:', error);
      // Fallback to hardcoded terms
      const fallbackTerms = getTermsForOrganization(organizationId);
      setAvailableTerms(fallbackTerms);
    }
    setLoading(false);
  };

  const getTermsForOrganization = (orgId: string): TermInfo[] => {
    const termMap: Record<string, TermInfo[]> = {
      'core-governance': [
        { name: 'harm', domain: 'core-governance', hasDiscussion: true },
        { name: 'wellbeing', domain: 'core-governance', hasDiscussion: true },
        { name: 'transparency', domain: 'core-governance', hasDiscussion: true },
      ],
      'animal-welfare': [
        { name: 'suffering', domain: 'animal-welfare', hasDiscussion: true },
      ],
      'environment': []
    };
    
    return termMap[orgId] || [];
  };

  const handleTermSelect = async (term: TermInfo) => {
    if (!term.hasDiscussion) return;
    
    try {
      const response = await fetch(`/api/terms/${term.domain}/${term.name}`);
      if (response.ok) {
        const termDiscussion = await response.json();
        setSelectedTerm(termDiscussion);
        setViewMode('detail');
      } else {
        console.error('Failed to fetch term discussion');
      }
    } catch (error) {
      console.error('Error fetching term discussion:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedTerm(null);
    setViewMode('list');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'detail' && selectedTerm) {
    // Convert TermDiscussion to GitHubDiscussion for DiscussionView
    const discussionAsGitHub: GitHubDiscussion = {
      id: selectedTerm.id,
      number: selectedTerm.number,
      title: selectedTerm.title,
      body: `Democratic discussion for defining the term "${selectedTerm.current_definition.version}" in the ${organizationId} domain.`,
      createdAt: selectedTerm.createdAt,
      updatedAt: selectedTerm.updatedAt,
      closed: selectedTerm.closed,
      author: selectedTerm.current_definition.author,
      category: selectedTerm.category,
      labels: selectedTerm.labels,
      comments: selectedTerm.comments,
      upvoteCount: selectedTerm.upvoteCount,
      answer: selectedTerm.comments.nodes.find(comment => 
        comment.id === selectedTerm.current_definition.ratification_comment_id
      )
    };

    return (
      <div className="space-y-4">
        <button
          onClick={handleBackToList}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to terms list
        </button>

        {/* Current Active Definition */}
        <TermDefinitionCard
          termName={selectedTerm.current_definition.version.replace('v', '')}
          domain={organizationId}
          currentDefinition={selectedTerm.current_definition}
        />

        {/* Version History Section */}
        {selectedTerm.version_history.length > 1 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Version History</h3>
            <div className="space-y-3">
              {selectedTerm.version_history.map((version) => (
                <div
                  key={version.version}
                  className={`p-4 border rounded-lg ${
                    version.status === 'active' 
                      ? 'border-green-200 bg-green-50' 
                      : version.status === 'superseded'
                      ? 'border-gray-200 bg-gray-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{version.version}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        version.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : version.status === 'superseded'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {version.status}
                      </span>
                      {version.approval_rate && (
                        <span className="text-sm text-gray-600">
                          {version.approval_rate} approval
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {version.ratified_date ? 
                        `Ratified ${new Date(version.ratified_date).toLocaleDateString()}` :
                        `Proposed ${new Date(version.proposed_date).toLocaleDateString()}`
                      }
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{version.text}"</p>
                  <div className="mt-2 text-sm text-gray-600">
                    Proposed by{' '}
                    <span className="font-medium">{version.proposer.login}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proposed Versions Section */}
        {selectedTerm.proposed_versions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposed Updates</h3>
            <div className="space-y-3">
              {selectedTerm.proposed_versions.map((proposal) => (
                <div
                  key={proposal.version}
                  className="p-4 border border-blue-200 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{proposal.version}</span>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {proposal.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">
                        {proposal.current_support} support
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Proposed {new Date(proposal.proposed_date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-2">"{proposal.text}"</p>
                  {proposal.changes_from_current && (
                    <div className="text-sm">
                      <strong>Changes:</strong>
                      <ul className="list-disc list-inside ml-2 text-gray-600">
                        {proposal.changes_from_current.map((change, index) => (
                          <li key={index}>{change}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-2 text-sm text-gray-600">
                    Proposed by{' '}
                    <span className="font-medium">{proposal.proposer.login}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discussion Thread */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Discussion</h3>
          <DiscussionView discussion={discussionAsGitHub} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Terms & Definitions
        </h3>
        <div className="text-sm text-gray-600">
          {availableTerms.length} term{availableTerms.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {availableTerms.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Terms Defined</h3>
          <p className="text-gray-600">
            This organization hasn't defined any terms yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {availableTerms.map((term) => (
            <div
              key={`${term.domain}-${term.name}`}
              className={`p-4 border rounded-lg transition-colors ${
                term.hasDiscussion
                  ? 'border-gray-200 hover:border-blue-300 cursor-pointer bg-white hover:bg-blue-50'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed'
              }`}
              onClick={() => term.hasDiscussion && handleTermSelect(term)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    term.hasDiscussion ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize">
                      {term.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {term.hasDiscussion 
                        ? 'Democratic definition with community discussion'
                        : 'Static definition (no discussion available)'
                      }
                    </p>
                  </div>
                </div>
                
                {term.hasDiscussion && (
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Community defined</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {availableTerms.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">About Terms</h4>
              <p className="text-sm text-blue-800">
                Terms are democratically defined concepts that form the foundation of governance decisions. 
                Click on a term to view its evolution, proposed updates, and community discussion.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}