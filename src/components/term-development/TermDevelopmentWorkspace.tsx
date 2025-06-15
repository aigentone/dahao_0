'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitPullRequest, 
  Plus, 
  Bot, 
  ArrowRight, 
  FileText, 
  Users,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { GitHubIssue } from '@/types/github-compatible';
import { generateMockTermDevelopmentIssues } from '@/services/github-data-service';
import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';
import IssueToDiscussionPromotion from './IssueToDiscussionPromotion';

export default function TermDevelopmentWorkspace() {
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>(generateMockTermDevelopmentIssues());
  const [activeTab, setActiveTab] = useState('issues');

  const handleIssueSelect = (issue: GitHubIssue) => {
    setSelectedIssue(issue);
    setActiveTab('agent-assignment');
  };

  const handleIssueUpdate = (updatedIssue: GitHubIssue) => {
    setIssues(prev => prev.map(issue => 
      issue.number === updatedIssue.number ? updatedIssue : issue
    ));
    setSelectedIssue(updatedIssue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'ai_review': return 'bg-blue-100 text-blue-800';
      case 'peer_review': return 'bg-purple-100 text-purple-800';
      case 'ready_for_submission': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'ai_review': return <Bot className="w-4 h-4" />;
      case 'peer_review': return <Users className="w-4 h-4" />;
      case 'ready_for_submission': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <ArrowRight className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderIssueCard = (issue: GitHubIssue) => (
    <Card 
      key={issue.id} 
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        selectedIssue?.id === issue.id ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => handleIssueSelect(issue)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <GitPullRequest className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-lg">#{issue.number}</h3>
              <Badge className={getStatusColor(issue.termDraft?.status || 'draft')}>
                {getStatusIcon(issue.termDraft?.status || 'draft')}
                <span className="ml-1">{issue.termDraft?.status.replace('_', ' ')}</span>
              </Badge>
            </div>
            <h4 className="font-medium mb-2">{issue.termDraft?.termName}</h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {issue.termDraft?.definition}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span>{issue.termDraft?.domain}</span>
              <span>Updated {new Date(issue.updatedAt).toLocaleDateString()}</span>
              <span>{issue.assignees.nodes.length} AI agents</span>
              <span>{issue.comments.totalCount} comments</span>
            </div>
          </div>
        </div>

        {issue.termDraft && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{issue.termDraft.submissionReadiness.overallScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  issue.termDraft.submissionReadiness.overallScore >= 85 
                    ? 'bg-green-500' 
                    : issue.termDraft.submissionReadiness.overallScore >= 60 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`}
                style={{ width: `${issue.termDraft.submissionReadiness.overallScore}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-600">Clarity: </span>
                <span className={issue.termDraft.progress.clarity >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                  {issue.termDraft.progress.clarity}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Uniqueness: </span>
                <span className={issue.termDraft.progress.uniqueness >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                  {issue.termDraft.progress.uniqueness}%
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-3">
          {issue.termDraft?.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Term Development Workspace</h2>
          <p className="text-gray-600">
            Develop and refine term definitions using GitHub Issues with AI agent assistance
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Term Issue
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">My Issues ({issues.length})</TabsTrigger>
          <TabsTrigger value="agent-assignment" disabled={!selectedIssue}>
            AI Assignment
          </TabsTrigger>
          <TabsTrigger value="promotion" disabled={!selectedIssue}>
            Public Promotion
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4 mt-6">
          {/* Status Filter */}
          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className="cursor-pointer">All ({issues.length})</Badge>
            <Badge variant="outline" className="cursor-pointer">
              Draft ({issues.filter(i => i.termDraft?.status === 'draft').length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              AI Review ({issues.filter(i => i.termDraft?.status === 'ai_review').length})
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Ready ({issues.filter(i => i.termDraft?.status === 'ready_for_submission').length})
            </Badge>
          </div>

          {/* Issues Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {issues.map(renderIssueCard)}
          </div>

          {issues.length === 0 && (
            <Card>
              <CardContent className="text-center p-8">
                <GitPullRequest className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Term Development Issues</h3>
                <p className="text-gray-600 mb-4">Start developing your first term definition</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Term Issue
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="agent-assignment" className="mt-6">
          {selectedIssue ? (
            <div className="space-y-6">
              {/* Selected Issue Summary */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <GitPullRequest className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold">Issue #{selectedIssue.number}: {selectedIssue.termDraft?.termName}</h3>
                    <Badge className={getStatusColor(selectedIssue.termDraft?.status || 'draft')}>
                      {selectedIssue.termDraft?.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">
                    {selectedIssue.termDraft?.definition}
                  </p>
                  <div className="flex gap-4 text-xs text-blue-700">
                    <span>Domain: {selectedIssue.termDraft?.domain}</span>
                    <span>Progress: {selectedIssue.termDraft?.submissionReadiness.overallScore}%</span>
                    <span>Agents: {selectedIssue.assignees.nodes.length}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Assignment Panel */}
              <AgentAssignmentPanel
                issue={selectedIssue}
                repoOwner="user"
                repoName="term-development"
                onIssueUpdated={handleIssueUpdate}
                context="term-development"
              />
            </div>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Issue Selected</h3>
                <p className="text-gray-600">Select a term development issue to assign AI agents</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="promotion" className="mt-6">
          {selectedIssue ? (
            <IssueToDiscussionPromotion
              issue={selectedIssue}
              onPromotionComplete={(discussionUrl) => {
                console.log('Promotion completed:', discussionUrl);
                // Handle successful promotion
                if (selectedIssue.termDraft) {
                  handleIssueUpdate({
                    ...selectedIssue,
                    termDraft: {
                      ...selectedIssue.termDraft,
                      status: 'submitted'
                    }
                  });
                }
              }}
              onPromotionError={(error) => {
                console.error('Promotion failed:', error);
                // Handle promotion error
              }}
            />
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <ArrowRight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Issue Selected</h3>
                <p className="text-gray-600">Select a term development issue to promote to public discussion</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-2xl font-bold text-blue-600">{issues.length}</div>
                <div className="text-sm text-gray-600">Total Issues</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-2xl font-bold text-green-600">
                  {issues.filter(i => i.termDraft?.status === 'ready_for_submission').length}
                </div>
                <div className="text-sm text-gray-600">Ready for Submission</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="text-center p-6">
                <div className="text-2xl font-bold text-purple-600">
                  {issues.reduce((sum, i) => sum + i.assignees.nodes.length, 0)}
                </div>
                <div className="text-sm text-gray-600">AI Agents Assigned</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Development Progress</CardTitle>
              <CardDescription>Progress distribution across all term development issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {issues.map(issue => (
                  <div key={issue.id} className="flex items-center gap-3">
                    <div className="w-32 text-sm truncate">{issue.termDraft?.termName}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${issue.termDraft?.submissionReadiness.overallScore || 0}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{issue.termDraft?.submissionReadiness.overallScore}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}