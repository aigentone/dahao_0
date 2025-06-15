'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Users, 
  MessageSquare, 
  FileText, 
  GitBranch,
  Upload,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { GitHubIssue } from '@/types/github-compatible';
import { issueCreationService } from '@/services/issue-creation-service';

interface IssueToDiscussionPromotionProps {
  issue: GitHubIssue;
  onPromotionComplete?: (discussionUrl: string) => void;
  onPromotionError?: (error: string) => void;
}

export default function IssueToDiscussionPromotion({
  issue,
  onPromotionComplete,
  onPromotionError
}: IssueToDiscussionPromotionProps) {
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotionSteps, setPromotionSteps] = useState<{
    step: string;
    status: 'pending' | 'in_progress' | 'completed' | 'error';
    description: string;
  }[]>([]);

  const termDraft = issue.termDraft;
  if (!termDraft) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-700">
            <XCircle className="w-5 h-5" />
            <span>This issue does not contain term development data.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isReadyForPromotion = issueCreationService.isReadyForSubmission(issue);
  const nextAction = issueCreationService.getNextRecommendedAction(issue);

  const handlePromoteToDiscussion = async () => {
    setIsPromoting(true);
    setPromotionSteps([]);

    const steps = [
      {
        step: 'validation',
        status: 'pending' as const,
        description: 'Validating submission readiness'
      },
      {
        step: 'package_prep',
        status: 'pending' as const,
        description: 'Preparing documentation package'
      },
      {
        step: 'discussion_creation',
        status: 'pending' as const,
        description: 'Creating public discussion'
      },
      {
        step: 'history_transfer',
        status: 'pending' as const,
        description: 'Transferring development history'
      },
      {
        step: 'notification',
        status: 'pending' as const,
        description: 'Notifying domain community'
      },
      {
        step: 'finalization',
        status: 'pending' as const,
        description: 'Finalizing promotion'
      }
    ];

    setPromotionSteps(steps);

    try {
      // Step 1: Validation
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'validation' ? { ...s, status: 'in_progress' } : s
      ));
      
      if (!isReadyForPromotion) {
        throw new Error('Term is not ready for promotion. Please complete all requirements first.');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'validation' ? { ...s, status: 'completed' } : s
      ));

      // Step 2: Package Preparation
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'package_prep' ? { ...s, status: 'in_progress' } : s
      ));
      
      const documentationPackage = prepareDocumentationPackage(issue);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'package_prep' ? { ...s, status: 'completed' } : s
      ));

      // Step 3: Discussion Creation
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'discussion_creation' ? { ...s, status: 'in_progress' } : s
      ));
      
      const discussionData = createPublicDiscussionFromIssue(issue, documentationPackage);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'discussion_creation' ? { ...s, status: 'completed' } : s
      ));

      // Step 4: History Transfer
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'history_transfer' ? { ...s, status: 'in_progress' } : s
      ));
      
      await transferDevelopmentHistory(issue, discussionData.discussionId);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'history_transfer' ? { ...s, status: 'completed' } : s
      ));

      // Step 5: Notification
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'notification' ? { ...s, status: 'in_progress' } : s
      ));
      
      await notifyDomainCommunity(termDraft, discussionData.discussionUrl);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'notification' ? { ...s, status: 'completed' } : s
      ));

      // Step 6: Finalization
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'finalization' ? { ...s, status: 'in_progress' } : s
      ));
      
      await finalizePromotion(issue, discussionData.discussionId);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setPromotionSteps(prev => prev.map(s => 
        s.step === 'finalization' ? { ...s, status: 'completed' } : s
      ));

      // Success!
      if (onPromotionComplete) {
        onPromotionComplete(discussionData.discussionUrl);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      setPromotionSteps(prev => prev.map(s => 
        s.status === 'in_progress' ? { ...s, status: 'error' } : s
      ));
      
      if (onPromotionError) {
        onPromotionError(errorMessage);
      }
    } finally {
      setIsPromoting(false);
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Readiness Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Public Submission Readiness
          </CardTitle>
          <CardDescription>
            Assessment of term readiness for public governance discussion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Overall Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Readiness Score</span>
                <span className="text-sm text-gray-600">
                  {termDraft.submissionReadiness.overallScore}%
                </span>
              </div>
              <Progress value={termDraft.submissionReadiness.overallScore} className="h-2" />
            </div>

            {/* Criteria Checklist */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Submission Criteria</h4>
              {termDraft.submissionReadiness.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <div className={`w-4 h-4 rounded-full ${
                    criterion.met ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{criterion.name}</div>
                    <div className="text-xs text-gray-600">{criterion.description}</div>
                  </div>
                  {criterion.met && <Check className="w-4 h-4 text-green-600" />}
                </div>
              ))}
            </div>

            {/* Readiness Status */}
            <div className={`p-3 rounded-lg border ${
              isReadyForPromotion 
                ? 'bg-green-50 border-green-200' 
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isReadyForPromotion ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                )}
                <span className={`font-medium ${
                  isReadyForPromotion ? 'text-green-800' : 'text-yellow-800'
                }`}>
                  {isReadyForPromotion ? 'Ready for Public Submission' : 'Not Ready for Submission'}
                </span>
              </div>
              
              {!isReadyForPromotion && (
                <div className="text-sm text-yellow-700">
                  <p><strong>Next Action:</strong> {nextAction.description}</p>
                  <p><strong>Priority:</strong> {nextAction.priority}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotion Process */}
      {isReadyForPromotion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Promote to Public Discussion
            </CardTitle>
            <CardDescription>
              Transfer this term from private development to public governance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Promotion Overview */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What happens during promotion:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Complete documentation package is prepared</li>
                  <li>• Public governance discussion is created</li>
                  <li>• All development history and reviews are transferred</li>
                  <li>• Domain community is notified for review</li>
                  <li>• Public ratification process begins</li>
                </ul>
              </div>

              {/* Term Summary */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Term Summary</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Term:</strong> {termDraft.termName}</div>
                  <div><strong>Domain:</strong> {termDraft.domain}</div>
                  <div><strong>Definition:</strong> {termDraft.definition.slice(0, 100)}...</div>
                  <div><strong>Development Status:</strong> {termDraft.status}</div>
                </div>
              </div>

              {/* Promotion Button */}
              <Button 
                onClick={handlePromoteToDiscussion}
                disabled={isPromoting}
                className="w-full"
                size="lg"
              >
                {isPromoting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Promoting to Public Discussion...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Promote to Public Discussion
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Promotion Progress */}
      {promotionSteps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Promotion Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {promotionSteps.map((step, index) => (
                <div key={step.step} className="flex items-center gap-3">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{step.description}</div>
                    <div className="text-xs text-gray-600 capitalize">{step.status.replace('_', ' ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Development History Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Development History
          </CardTitle>
          <CardDescription>
            This history will be transferred to the public discussion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <Users className="w-4 h-4 text-gray-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">AI Reviews</div>
                <div className="text-xs text-gray-600">
                  {issue.assignees.nodes.length} AI agents assigned
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <MessageSquare className="w-4 h-4 text-gray-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Comments & Feedback</div>
                <div className="text-xs text-gray-600">
                  {issue.comments.totalCount} comments with reviews and suggestions
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
              <GitBranch className="w-4 h-4 text-gray-600" />
              <div className="flex-1">
                <div className="text-sm font-medium">Version History</div>
                <div className="text-xs text-gray-600">
                  Complete development timeline and iterations
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper functions for promotion workflow
function prepareDocumentationPackage(issue: GitHubIssue) {
  const termDraft = issue.termDraft!;
  
  return {
    termDefinition: {
      name: termDraft.termName,
      definition: termDraft.definition,
      rationale: termDraft.rationale,
      domain: termDraft.domain,
      tags: termDraft.tags,
      version: '1.0.0'
    },
    developmentHistory: {
      issueNumber: issue.number,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
      status: termDraft.status,
      progress: termDraft.progress
    },
    reviews: {
      aiReviews: issue.assignees.nodes.map(agent => ({
        agentId: agent.login,
        agentType: agent.bio?.includes('Personal') ? 'personal' : 'system',
        completed: true
      })),
      peerReviews: issue.comments.nodes.filter(comment => 
        !comment.isBot && comment.body.includes('Review')
      ).length,
      overallScore: termDraft.submissionReadiness.overallScore
    },
    submissionCriteria: termDraft.submissionReadiness.criteria
  };
}

function createPublicDiscussionFromIssue(issue: GitHubIssue, documentationPackage: any) {
  const termDraft = issue.termDraft!;
  
  // This would create a public discussion in the governance repository
  const discussionId = `discussion-${Date.now()}`;
  const discussionUrl = `https://github.com/dahao-governance/discussions/${discussionId}`;
  
  return {
    discussionId,
    discussionUrl,
    title: `Term Proposal: ${termDraft.termName}`,
    category: 'Term Proposals',
    labels: [termDraft.domain, 'term-proposal', 'ready-for-ratification']
  };
}

async function transferDevelopmentHistory(issue: GitHubIssue, discussionId: string) {
  // Transfer all comments, reviews, and development history to the public discussion
  // This would involve creating comments in the public discussion with the private development history
  console.log(`Transferring history from issue #${issue.number} to discussion ${discussionId}`);
}

async function notifyDomainCommunity(termDraft: any, discussionUrl: string) {
  // Notify domain experts and community members about the new term proposal
  console.log(`Notifying ${termDraft.domain} community about new term: ${termDraft.termName}`);
  console.log(`Discussion URL: ${discussionUrl}`);
}

async function finalizePromotion(issue: GitHubIssue, discussionId: string) {
  // Update the original issue with links to the public discussion
  // Mark the issue as submitted
  // Update any related tracking systems
  console.log(`Finalizing promotion of issue #${issue.number} to discussion ${discussionId}`);
}