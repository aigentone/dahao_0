'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Vote, 
  Coins, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Info,
  Shield,
  User
} from 'lucide-react';

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

interface TermRatificationVotingProps {
  votingSession: VotingSession;
  currentUser?: {
    id: string;
    name: string;
    tokenBalance: number;
    votingWeight: number;
    delegatedTo?: string;
  };
  onVote: (vote: 'ratify' | 'reject' | 'abstain', reasoning?: string) => void;
  onDelegate?: (delegateToId: string) => void;
}

export function TermRatificationVoting({ 
  votingSession, 
  currentUser, 
  onVote,
  onDelegate 
}: TermRatificationVotingProps) {
  const [selectedVote, setSelectedVote] = useState<'ratify' | 'reject' | 'abstain' | null>(null);
  const [reasoning, setReasoning] = useState('');
  const [showVoteDetails, setShowVoteDetails] = useState(false);
  const [selectedVoteTab, setSelectedVoteTab] = useState<'all' | 'ratify' | 'reject' | 'abstain'>('all');

  // Calculate current results
  const calculateResults = () => {
    const ratifyVotes = votingSession.votes.filter(v => v.vote === 'ratify');
    const rejectVotes = votingSession.votes.filter(v => v.vote === 'reject');
    const abstainVotes = votingSession.votes.filter(v => v.vote === 'abstain');

    const ratifyTokens = ratifyVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
    const rejectTokens = rejectVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
    const abstainTokens = abstainVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
    
    const totalVotedTokens = ratifyTokens + rejectTokens + abstainTokens;
    const participationRate = totalVotedTokens / votingSession.totalTokensInPlay;

    const ratifyPercentage = totalVotedTokens > 0 ? (ratifyTokens / totalVotedTokens) * 100 : 0;
    const rejectPercentage = totalVotedTokens > 0 ? (rejectTokens / totalVotedTokens) * 100 : 0;

    return {
      ratifyTokens,
      rejectTokens,
      abstainTokens,
      ratifyPercentage,
      rejectPercentage,
      participationRate: participationRate * 100,
      totalVotedTokens
    };
  };

  const results = calculateResults();
  const timeRemaining = Math.max(0, Math.ceil((new Date(votingSession.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  
  const hasUserVoted = currentUser ? votingSession.votes.some(v => v.voter.id === currentUser.id) : false;
  const userVote = hasUserVoted && currentUser ? votingSession.votes.find(v => v.voter.id === currentUser.id) : null;

  const canVote = currentUser && !hasUserVoted && votingSession.status === 'active';
  const meetsQuorum = results.participationRate >= votingSession.quorum * 100;
  const willPass = results.ratifyPercentage >= votingSession.ratificationThreshold * 100 && meetsQuorum;

  const handleVote = () => {
    if (selectedVote && canVote) {
      onVote(selectedVote, reasoning);
      setSelectedVote(null);
      setReasoning('');
    }
  };

  const getVoteIcon = (vote: string) => {
    switch (vote) {
      case 'ratify': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'reject': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'abstain': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  const getVoterTypeIcon = (type: string) => {
    switch (type) {
      case 'human': return <User className="w-3 h-3 text-blue-600" />;
      case 'personal_ai': return <User className="w-3 h-3 text-purple-600" />;
      case 'system_ai': return <Shield className="w-3 h-3 text-green-600" />;
      default: return <User className="w-3 h-3" />;
    }
  };

  const filterVotes = (votes: VoteRecord[]) => {
    if (selectedVoteTab === 'all') return votes;
    return votes.filter(v => v.vote === selectedVoteTab);
  };

  return (
    <div className="space-y-6">
      {/* Voting Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5" />
              Term Ratification Voting: {votingSession.termName}
            </CardTitle>
            <Badge className={
              votingSession.status === 'active' ? 'bg-blue-100 text-blue-800' :
              votingSession.status === 'passed' ? 'bg-green-100 text-green-800' :
              votingSession.status === 'failed' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }>
              {votingSession.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{timeRemaining}</div>
              <div className="text-sm text-gray-600">Days Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{results.participationRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Participation Rate</div>
              <div className="text-xs text-gray-500">Need {votingSession.quorum * 100}% quorum</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{results.ratifyPercentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
              <div className="text-xs text-gray-500">Need {votingSession.ratificationThreshold * 100}% to pass</div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Ratify ({results.ratifyTokens.toLocaleString()} tokens)</span>
                <span>{results.ratifyPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={results.ratifyPercentage} className="h-3 bg-gray-200">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${results.ratifyPercentage}%` }} />
              </Progress>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reject ({results.rejectTokens.toLocaleString()} tokens)</span>
                <span>{results.rejectPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={results.rejectPercentage} className="h-3 bg-gray-200">
                <div className="h-full bg-red-500 transition-all" style={{ width: `${results.rejectPercentage}%` }} />
              </Progress>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Quorum Progress</span>
                <span>{results.participationRate.toFixed(1)}% / {votingSession.quorum * 100}%</span>
              </div>
              <Progress value={results.participationRate} className="h-2 bg-gray-200">
                <div className="h-full bg-purple-500 transition-all" style={{ width: `${Math.min(100, results.participationRate)}%` }} />
              </Progress>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-4 flex gap-2">
            {meetsQuorum ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Quorum Met
              </Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Needs {((votingSession.quorum * 100) - results.participationRate).toFixed(1)}% more participation
              </Badge>
            )}

            {willPass ? (
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                On Track to Pass
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">
                <TrendingDown className="w-3 h-3 mr-1" />
                Unlikely to Pass
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Voting Interface */}
      {currentUser && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Your Vote ({currentUser.votingWeight.toLocaleString()} tokens)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasUserVoted ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getVoteIcon(userVote!.vote)}
                  <span className="font-semibold">You voted to {userVote!.vote}</span>
                  <Badge variant="outline">{userVote!.voter.tokenWeight.toLocaleString()} tokens</Badge>
                </div>
                {userVote!.reasoning && (
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Reasoning:</strong> {userVote!.reasoning}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Voted on {new Date(userVote!.timestamp).toLocaleDateString()}
                </p>
              </div>
            ) : canVote ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={selectedVote === 'ratify' ? 'default' : 'outline'}
                    onClick={() => setSelectedVote('ratify')}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Ratify
                  </Button>
                  <Button
                    variant={selectedVote === 'reject' ? 'default' : 'outline'}
                    onClick={() => setSelectedVote('reject')}
                    className="flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                  <Button
                    variant={selectedVote === 'abstain' ? 'default' : 'outline'}
                    onClick={() => setSelectedVote('abstain')}
                    className="flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Abstain
                  </Button>
                </div>

                {selectedVote && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Reasoning (Optional)</label>
                      <Textarea
                        value={reasoning}
                        onChange={(e) => setReasoning(e.target.value)}
                        placeholder="Explain your vote to help others understand your perspective..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleVote} className="w-full">
                      Submit Vote ({currentUser.votingWeight.toLocaleString()} tokens)
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-4">
                {votingSession.status !== 'active' ? 'Voting has ended' : 'Loading voting interface...'}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Vote Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Vote Details ({votingSession.votes.length} votes)
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowVoteDetails(!showVoteDetails)}
            >
              {showVoteDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </CardHeader>
        {showVoteDetails && (
          <CardContent>
            <div className="space-y-4">
              {/* Vote Filter Tabs */}
              <div className="flex gap-2">
                {['all', 'ratify', 'reject', 'abstain'].map((tab) => (
                  <Button
                    key={tab}
                    variant={selectedVoteTab === tab ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedVoteTab(tab as any)}
                  >
                    {tab === 'all' ? 'All Votes' : `${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
                    <Badge variant="secondary" className="ml-2">
                      {tab === 'all' ? votingSession.votes.length : votingSession.votes.filter(v => v.vote === tab).length}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* Vote List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filterVotes(votingSession.votes).map((vote) => (
                  <div key={vote.id} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getVoterTypeIcon(vote.voter.type)}
                        <span className="font-medium">{vote.voter.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {vote.voter.tokenWeight.toLocaleString()} tokens
                        </Badge>
                        {vote.voter.type !== 'human' && (
                          <Badge variant="secondary" className="text-xs">
                            {vote.voter.type.replace('_', ' ')}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getVoteIcon(vote.vote)}
                        <span className="text-sm text-gray-600">
                          {new Date(vote.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {vote.reasoning && (
                      <p className="text-sm text-gray-700 mt-2 italic">
                        "{vote.reasoning}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Information Panel */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <h4 className="font-semibold mb-2">How Token Voting Works</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Your voting power equals your token balance at the start of the voting period</li>
                <li>A {votingSession.ratificationThreshold * 100}% approval rate is required for ratification</li>
                <li>At least {votingSession.quorum * 100}% of all tokens must participate (quorum)</li>
                <li>Personal AI agents can vote with delegated tokens</li>
                <li>System AI agents provide validation but cannot vote</li>
                <li>Votes are weighted by token holdings to align with investment stakes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}