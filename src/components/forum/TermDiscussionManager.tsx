'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  MessageSquare, 
  Vote, 
  Users, 
  Clock, 
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Coins
} from 'lucide-react';
import { TermRatificationVoting } from './TermRatificationVoting';

interface VoteRecord {
  id: string;
  voter: {
    id: string;
    name: string;
    type: 'human' | 'personal_ai' | 'system_ai';
    tokenWeight: number;
    reputation: number;
  };
  vote: 'ratify' | 'reject' | 'abstain';
  reasoning?: string;
  timestamp: string;
  tokensDelegated?: number;
}

interface VotingSession {
  id: string;
  termName: string;
  proposalId: string;
  startDate: string;
  endDate: string;
  ratificationThreshold: number; // 0.75 = 75%
  quorum: number; // 0.30 = 30% of total tokens must participate
  totalTokensInPlay: number;
  currentParticipation: number;
  votes: VoteRecord[];
  status: 'active' | 'passed' | 'failed' | 'pending';
  results?: {
    ratifyTokens: number;
    rejectTokens: number;
    abstainTokens: number;
    ratifyPercentage: number;
    rejectPercentage: number;
    participationRate: number;
  };
}

interface TermProposal {
  id: string;
  termName: string;
  proposedDefinition: string;
  currentDefinition?: string;
  proposer: {
    id: string;
    name: string;
    branch: string;
  };
  status: 'draft' | 'discussion' | 'voting' | 'ratified' | 'rejected';
  createdAt: string;
  discussionEndDate?: string;
  votingEndDate?: string;
  supportCount: number;
  opposeCount: number;
  tokenStake: number;
  requiredStake: number;
  domain: string;
  tags: string[];
  changeReason: string;
  ratificationThreshold: number;
  currentApproval: number;
}

interface TermDiscussion {
  id: string;
  termProposalId: string;
  author: {
    id: string;
    name: string;
    type: 'human' | 'personal_ai' | 'system_ai';
  };
  content: string;
  timestamp: string;
  votes: {
    helpful: number;
    unhelpful: number;
  };
  replies: TermDiscussion[];
}

interface TermDiscussionManagerProps {
  organizationId: string;
  currentUser?: {
    id: string;
    name: string;
    tokenBalance: number;
  };
  onNavigateToDiscussions?: (termName: string) => void;
}

export function TermDiscussionManager({ organizationId, currentUser, onNavigateToDiscussions }: TermDiscussionManagerProps) {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedProposal, setSelectedProposal] = useState<TermProposal | null>(null);
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [showDiscussionInterface, setShowDiscussionInterface] = useState(false);
  const [activeVotingSession, setActiveVotingSession] = useState<VotingSession | null>(null);

  // Mock data for term proposals
  const mockProposals: TermProposal[] = [
    {
      id: 'prop-1',
      termName: 'wellbeing',
      proposedDefinition: 'A holistic state encompassing physical health, mental contentment, social connection, and environmental harmony, measured through both objective indicators and subjective self-assessment.',
      currentDefinition: 'A state of physical and mental health where basic needs are met.',
      proposer: {
        id: 'user-1',
        name: 'Dr. Sarah Mitchell',
        branch: 'animal-welfare'
      },
      status: 'discussion',
      createdAt: '2024-12-10T10:00:00Z',
      discussionEndDate: '2024-12-20T23:59:59Z',
      supportCount: 23,
      opposeCount: 7,
      tokenStake: 500,
      requiredStake: 100,
      domain: 'core-governance',
      tags: ['ethics', 'measurement', 'holistic'],
      changeReason: 'Current definition is too narrow and doesn\'t account for environmental and social factors',
      ratificationThreshold: 0.75,
      currentApproval: 0.68
    },
    {
      id: 'prop-2',
      termName: 'harm',
      proposedDefinition: 'Any action, policy, or condition that reduces wellbeing, autonomy, or flourishing of sentient beings, including direct physical damage, psychological distress, restriction of natural behaviors, or environmental degradation that affects quality of life.',
      proposer: {
        id: 'user-2',
        name: 'Alex Chen',
        branch: 'environment'
      },
      status: 'voting',
      createdAt: '2024-12-05T14:30:00Z',
      votingEndDate: '2024-12-18T23:59:59Z',
      supportCount: 45,
      opposeCount: 12,
      tokenStake: 750,
      requiredStake: 100,
      domain: 'core-governance',
      tags: ['ethics', 'prevention', 'sentience'],
      changeReason: 'Expansion needed to include environmental and psychological harm',
      ratificationThreshold: 0.75,
      currentApproval: 0.82
    },
    {
      id: 'prop-3',
      termName: 'consensus',
      proposedDefinition: 'Collective agreement reached through inclusive dialogue where all perspectives are heard, concerns addressed, and decisions reflect shared understanding rather than simple majority rule.',
      proposer: {
        id: 'user-3',
        name: 'Maria Santos',
        branch: 'core-governance'
      },
      status: 'ratified',
      createdAt: '2024-11-20T09:15:00Z',
      supportCount: 67,
      opposeCount: 8,
      tokenStake: 300,
      requiredStake: 100,
      domain: 'core-governance',
      tags: ['governance', 'decision-making', 'democracy'],
      changeReason: 'Previous definition was unclear about the process of reaching consensus',
      ratificationThreshold: 0.75,
      currentApproval: 0.89
    }
  ];

  const [proposals, setProposals] = useState<TermProposal[]>(mockProposals);

  const getStatusColor = (status: TermProposal['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'discussion': return 'bg-blue-100 text-blue-800';
      case 'voting': return 'bg-purple-100 text-purple-800';
      case 'ratified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: TermProposal['status']) => {
    switch (status) {
      case 'discussion': return <MessageSquare className="w-4 h-4" />;
      case 'voting': return <Vote className="w-4 h-4" />;
      case 'ratified': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filterProposals = (status: string) => {
    switch (status) {
      case 'active':
        return proposals.filter(p => ['discussion', 'voting'].includes(p.status));
      case 'completed':
        return proposals.filter(p => ['ratified', 'rejected'].includes(p.status));
      case 'drafts':
        return proposals.filter(p => p.status === 'draft');
      default:
        return proposals;
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const handleJoinDiscussion = (proposal: TermProposal) => {
    // Navigate to existing discussions tab and find/create discussion for this term
    if (onNavigateToDiscussions) {
      onNavigateToDiscussions(proposal.termName);
    } else {
      // Fallback: show local discussion interface if no navigation callback
      setShowDiscussionInterface(true);
      setSelectedProposal(proposal);
    }
  };

  const handleMoveToVoting = (proposal: TermProposal) => {
    // Transition proposal status from 'discussion' to 'voting'
    const updatedProposal = { ...proposal, status: 'voting' as const };
    
    // Update proposals array
    setProposals(prev => prev.map(p => 
      p.id === proposal.id ? updatedProposal : p
    ));
    
    // Create voting session
    const votingSession: VotingSession = {
      id: `voting-${proposal.id}-${Date.now()}`,
      termName: proposal.termName,
      proposalId: proposal.id,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
      ratificationThreshold: proposal.ratificationThreshold,
      quorum: 0.30, // 30% participation required
      totalTokensInPlay: 10000, // Mock total tokens
      currentParticipation: 0,
      votes: [],
      status: 'active'
    };
    
    setActiveVotingSession(votingSession);
    setSelectedProposal(updatedProposal);
  };

  const handleVoteSubmit = (vote: 'ratify' | 'reject' | 'abstain', reasoning?: string) => {
    if (!activeVotingSession || !currentUser) return;

    const newVote: VoteRecord = {
      id: `vote-${Date.now()}`,
      voter: {
        id: currentUser.id,
        name: currentUser.name,
        type: 'human',
        tokenWeight: currentUser.tokenBalance,
        reputation: 100 // Mock reputation
      },
      vote,
      reasoning,
      timestamp: new Date().toISOString()
    };

    const updatedSession = {
      ...activeVotingSession,
      votes: [...activeVotingSession.votes, newVote],
      currentParticipation: activeVotingSession.currentParticipation + currentUser.tokenBalance
    };

    setActiveVotingSession(updatedSession);
  };

  const renderProposalCard = (proposal: TermProposal) => (
    <Card key={proposal.id} className="hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => setSelectedProposal(proposal)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{proposal.termName}</h3>
              <Badge className={getStatusColor(proposal.status)}>
                {getStatusIcon(proposal.status)}
                <span className="ml-1">{proposal.status}</span>
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {proposal.proposedDefinition}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>by {proposal.proposer.name}</span>
              <span>{proposal.domain}</span>
              {proposal.discussionEndDate && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getDaysRemaining(proposal.discussionEndDate)} days left
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              {proposal.supportCount} support
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <XCircle className="w-4 h-4" />
              {proposal.opposeCount} oppose
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <Coins className="w-4 h-4" />
              {proposal.tokenStake} tokens staked
            </div>
          </div>
          
          {proposal.status === 'voting' && (
            <div className="text-right">
              <div className="text-sm font-semibold">
                {Math.round(proposal.currentApproval * 100)}% approval
              </div>
              <div className="text-xs text-gray-500">
                Need {Math.round(proposal.ratificationThreshold * 100)}%
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {proposal.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderNewProposalForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Propose New Term Definition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Term Name</label>
          <Input placeholder="e.g., wellbeing, harm, consensus" />
        </div>
        
        <div>
          <label className="text-sm font-medium">Domain</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="core-governance">Core Governance</SelectItem>
              <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Proposed Definition</label>
          <Textarea 
            placeholder="Enter your proposed definition for this term..."
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Reason for Change</label>
          <Textarea 
            placeholder="Explain why this term needs a new or updated definition..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tags</label>
          <Input placeholder="e.g., ethics, measurement, holistic (comma-separated)" />
        </div>

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Token Stake Required</span>
          </div>
          <div className="text-sm text-yellow-700">
            <div>Minimum stake: 100 tokens</div>
            <div>Your balance: {currentUser?.tokenBalance || 0} tokens</div>
            <div className="mt-1">
              Higher stakes increase proposal visibility and show confidence in your definition.
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowNewProposalForm(false)} variant="outline">
            Cancel
          </Button>
          <Button>
            Propose Term Definition (100 tokens)
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Terms Democratic Evolution</h2>
          <p className="text-gray-600">Community-driven term definition and refinement</p>
        </div>
        <Button onClick={() => setShowNewProposalForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Propose New Definition
        </Button>
      </div>

      {showNewProposalForm && (
        <div>
          {renderNewProposalForm()}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Discussions</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="drafts">My Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {filterProposals('active').map(renderProposalCard)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {filterProposals('completed').map(renderProposalCard)}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4 mt-6">
          {filterProposals('drafts').length > 0 ? (
            filterProposals('drafts').map(renderProposalCard)
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Draft Proposals</h3>
                <p className="text-gray-600">Create a new term proposal to get started</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Proposal Detail Modal/Panel */}
      {selectedProposal && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Term: {selectedProposal.termName}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedProposal(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Proposed Definition</h4>
                <p className="text-gray-700 bg-white p-3 rounded border">
                  {selectedProposal.proposedDefinition}
                </p>
              </div>

              {selectedProposal.currentDefinition && (
                <div>
                  <h4 className="font-semibold mb-2">Current Definition</h4>
                  <p className="text-gray-700 bg-gray-100 p-3 rounded border">
                    {selectedProposal.currentDefinition}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Reason for Change</h4>
                <p className="text-gray-700">{selectedProposal.changeReason}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Support</h4>
                  <div className="text-2xl font-bold text-green-600">{selectedProposal.supportCount}</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Opposition</h4>
                  <div className="text-2xl font-bold text-red-600">{selectedProposal.opposeCount}</div>
                </div>
              </div>

              {selectedProposal.status === 'voting' && (
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Vote to Ratify
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <XCircle className="w-4 h-4 mr-2" />
                    Vote to Reject
                  </Button>
                </div>
              )}

              {selectedProposal.status === 'discussion' && (
                <div className="flex gap-2">
                  <Button onClick={() => handleJoinDiscussion(selectedProposal)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                  <Button variant="outline" onClick={() => handleMoveToVoting(selectedProposal)}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Move to Voting
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Voting Session Integration */}
      {activeVotingSession && (
        <div className="mt-6">
          <TermRatificationVoting
            votingSession={activeVotingSession}
            currentUser={currentUser ? {
              id: currentUser.id,
              name: currentUser.name,
              tokenBalance: currentUser.tokenBalance,
              votingWeight: currentUser.tokenBalance,
            } : undefined}
            onVote={handleVoteSubmit}
          />
        </div>
      )}

      {/* Discussion Interface */}
      {showDiscussionInterface && selectedProposal && (
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Discussion: {selectedProposal.termName}
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowDiscussionInterface(false)}>
                Close Discussion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-green-800">
                <strong>Discussion Mode Activated!</strong> You can now participate in the community discussion about this term definition.
              </p>
              <div className="p-4 bg-white rounded border">
                <h5 className="font-semibold mb-2">Current Discussion Status:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Support: {selectedProposal.supportCount} community members</li>
                  <li>• Opposition: {selectedProposal.opposeCount} community members</li>
                  <li>• Token Stake: {selectedProposal.tokenStake} tokens committed</li>
                </ul>
              </div>
              <div className="text-sm text-green-700">
                This is where the full discussion interface would be implemented with:
                <ul className="mt-2 ml-4 list-disc">
                  <li>Comment threads</li>
                  <li>Real-time discussion updates</li>
                  <li>Community feedback tools</li>
                  <li>Proposal refinement suggestions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}