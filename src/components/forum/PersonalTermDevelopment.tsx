'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Edit, 
  Save, 
  Upload, 
  Target, 
  Lightbulb, 
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Coins,
  GitBranch,
  Bot,
  MessageSquare,
  Star
} from 'lucide-react';

interface PersonalTermDraft {
  id: string;
  termName: string;
  definition: string;
  rationale: string;
  domain: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ai_review' | 'peer_review' | 'ready_for_submission' | 'submitted';
  progress: {
    completeness: number;
    clarity: number;
    uniqueness: number;
    alignment: number;
  };
  aiReviews: {
    id: string;
    agentName: string;
    feedback: string;
    suggestions: string[];
    score: number;
    timestamp: string;
  }[];
  peerReviews: {
    id: string;
    reviewerName: string;
    feedback: string;
    rating: number;
    timestamp: string;
  }[];
  submissionReadiness: {
    criteria: {
      name: string;
      met: boolean;
      description: string;
    }[];
    overallScore: number;
  };
}

interface PersonalTermDevelopmentProps {
  branchId: string;
  userId: string;
  tokenBalance: number;
  onSubmitToPublicPool: (termDraft: PersonalTermDraft) => void;
}

export function PersonalTermDevelopment({ 
  branchId, 
  userId, 
  tokenBalance, 
  onSubmitToPublicPool 
}: PersonalTermDevelopmentProps) {
  const [activeDraft, setActiveDraft] = useState<PersonalTermDraft | null>(null);
  const [showNewDraftForm, setShowNewDraftForm] = useState(false);
  const [activeTab, setActiveTab] = useState('drafts');

  // Mock data for personal term drafts
  const mockDrafts: PersonalTermDraft[] = [
    {
      id: 'draft-1',
      termName: 'regenerative-wellbeing',
      definition: 'A state where an entity not only maintains its own wellbeing but actively contributes to the wellbeing of the systems and communities it is part of, creating positive feedback loops that enhance collective flourishing.',
      rationale: 'Current definitions of wellbeing focus on individual states without considering the interconnected nature of ecological and social systems. This term captures the dynamic relationship between personal and collective wellbeing.',
      domain: 'environment',
      tags: ['ecology', 'systems-thinking', 'collective-wellbeing'],
      createdAt: '2024-12-10T10:00:00Z',
      updatedAt: '2024-12-14T15:30:00Z',
      status: 'ai_review',
      progress: {
        completeness: 85,
        clarity: 78,
        uniqueness: 92,
        alignment: 88
      },
      aiReviews: [
        {
          id: 'ai-review-1',
          agentName: 'Personal Ethics Assistant',
          feedback: 'Strong conceptual foundation with clear systems perspective. Consider adding measurable indicators for practical implementation.',
          suggestions: [
            'Include specific examples of regenerative actions',
            'Define threshold criteria for "positive feedback loops"',
            'Add connection to existing environmental ethics frameworks'
          ],
          score: 8.2,
          timestamp: '2024-12-14T09:00:00Z'
        }
      ],
      peerReviews: [],
      submissionReadiness: {
        criteria: [
          { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
          { name: 'Unique contribution', met: true, description: 'Offers new perspective on wellbeing' },
          { name: 'Domain alignment', met: true, description: 'Fits well within environmental domain' },
          { name: 'AI review completed', met: true, description: 'Personal AI has reviewed and scored' },
          { name: 'Peer review', met: false, description: 'Needs at least 2 peer reviews' },
          { name: 'Implementation examples', met: false, description: 'Needs practical examples' }
        ],
        overallScore: 67
      }
    },
    {
      id: 'draft-2',
      termName: 'consent-transparency',
      definition: 'The practice of making all aspects of consent processes visible and understandable to all affected parties, including the information provided, decision-making process, and ongoing ability to modify or withdraw consent.',
      rationale: 'Traditional consent models often lack transparency about how decisions are made and what information is actually understood by consenting parties.',
      domain: 'core-governance',
      tags: ['consent', 'transparency', 'governance'],
      createdAt: '2024-12-08T14:00:00Z',
      updatedAt: '2024-12-12T11:20:00Z',
      status: 'ready_for_submission',
      progress: {
        completeness: 95,
        clarity: 89,
        uniqueness: 85,
        alignment: 93
      },
      aiReviews: [
        {
          id: 'ai-review-2',
          agentName: 'Personal Ethics Assistant',
          feedback: 'Excellent clarity and practical applicability. Well-aligned with core governance principles.',
          suggestions: [
            'Consider edge cases where full transparency might conflict with privacy',
            'Add examples from different cultural contexts'
          ],
          score: 9.1,
          timestamp: '2024-12-12T10:00:00Z'
        }
      ],
      peerReviews: [
        {
          id: 'peer-review-1',
          reviewerName: 'Dr. Sarah Mitchell',
          feedback: 'Very relevant for governance contexts. The transparency aspect addresses real gaps in current consent practices.',
          rating: 4.5,
          timestamp: '2024-12-12T16:00:00Z'
        },
        {
          id: 'peer-review-2',
          reviewerName: 'Alex Chen',
          feedback: 'Good foundation. Would benefit from more specific procedural guidelines.',
          rating: 4.0,
          timestamp: '2024-12-13T09:30:00Z'
        }
      ],
      submissionReadiness: {
        criteria: [
          { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
          { name: 'Unique contribution', met: true, description: 'Provides new framework for consent' },
          { name: 'Domain alignment', met: true, description: 'Well-suited for governance domain' },
          { name: 'AI review completed', met: true, description: 'High score from personal AI' },
          { name: 'Peer review', met: true, description: '2 peer reviews completed' },
          { name: 'Implementation examples', met: true, description: 'Practical examples provided' }
        ],
        overallScore: 92
      }
    }
  ];

  const [drafts, setDrafts] = useState<PersonalTermDraft[]>(mockDrafts);

  const getStatusColor = (status: PersonalTermDraft['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'ai_review': return 'bg-blue-100 text-blue-800';
      case 'peer_review': return 'bg-purple-100 text-purple-800';
      case 'ready_for_submission': return 'bg-green-100 text-green-800';
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: PersonalTermDraft['status']) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'ai_review': return <Bot className="w-4 h-4" />;
      case 'peer_review': return <Users className="w-4 h-4" />;
      case 'ready_for_submission': return <CheckCircle className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const calculateOverallProgress = (draft: PersonalTermDraft) => {
    const progressValues = Object.values(draft.progress);
    return Math.round(progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length);
  };

  const renderProgressIndicator = (label: string, value: number, target: number = 80) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2">
        <div 
          className={`h-full transition-all ${value >= target ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
          style={{ width: `${value}%` }} 
        />
      </Progress>
    </div>
  );

  const renderDraftCard = (draft: PersonalTermDraft) => (
    <Card key={draft.id} className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setActiveDraft(draft)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{draft.termName}</h3>
              <Badge className={getStatusColor(draft.status)}>
                {getStatusIcon(draft.status)}
                <span className="ml-1">{draft.status.replace('_', ' ')}</span>
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {draft.definition}
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              <span>{draft.domain}</span>
              <span>Updated {new Date(draft.updatedAt).toLocaleDateString()}</span>
              <span>{draft.aiReviews.length} AI reviews</span>
              <span>{draft.peerReviews.length} peer reviews</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          {renderProgressIndicator('Overall Progress', calculateOverallProgress(draft))}
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs">
              <span className="text-gray-600">Clarity: </span>
              <span className={draft.progress.clarity >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                {draft.progress.clarity}%
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-600">Uniqueness: </span>
              <span className={draft.progress.uniqueness >= 80 ? 'text-green-600' : 'text-yellow-600'}>
                {draft.progress.uniqueness}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {draft.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {draft.status === 'ready_for_submission' && (
          <div className="pt-2 border-t">
            <Button 
              size="sm" 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={(e) => {
                e.stopPropagation();
                onSubmitToPublicPool(draft);
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Submit to Public Pool
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderNewDraftForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create New Term Definition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Term Name</label>
          <Input placeholder="e.g., regenerative-wellbeing" />
        </div>
        
        <div>
          <label className="text-sm font-medium">Domain</label>
          <select className="w-full p-2 border rounded-md">
            <option value="core-governance">Core Governance</option>
            <option value="animal-welfare">Animal Welfare</option>
            <option value="environment">Environment</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Definition</label>
          <Textarea 
            placeholder="Enter your term definition..."
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Rationale</label>
          <Textarea 
            placeholder="Explain why this term is needed and how it differs from existing definitions..."
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tags</label>
          <Input placeholder="e.g., ecology, systems-thinking (comma-separated)" />
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setShowNewDraftForm(false)} variant="outline">
            Cancel
          </Button>
          <Button>
            Create Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDraftDetail = (draft: PersonalTermDraft) => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {draft.termName}
            </CardTitle>
            <div className="flex gap-2">
              {draft.status === 'ready_for_submission' && (
                <Button onClick={() => onSubmitToPublicPool(draft)} className="bg-green-600 hover:bg-green-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit to Public Pool
                </Button>
              )}
              <Button variant="outline" onClick={() => setActiveDraft(null)}>
                Back to Drafts
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Definition</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border">
                {draft.definition}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Rationale</h4>
              <p className="text-gray-700">{draft.rationale}</p>
            </div>

            {/* Progress Metrics */}
            <div>
              <h4 className="font-semibold mb-3">Development Progress</h4>
              <div className="grid grid-cols-2 gap-4">
                {renderProgressIndicator('Completeness', draft.progress.completeness)}
                {renderProgressIndicator('Clarity', draft.progress.clarity)}
                {renderProgressIndicator('Uniqueness', draft.progress.uniqueness)}
                {renderProgressIndicator('Alignment', draft.progress.alignment)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Reviews */}
      {draft.aiReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Reviews ({draft.aiReviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {draft.aiReviews.map((review) => (
              <div key={review.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.agentName}</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{review.score}/10</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{review.feedback}</p>
                {review.suggestions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Suggestions:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      {review.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Peer Reviews */}
      {draft.peerReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Peer Reviews ({draft.peerReviews.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {draft.peerReviews.map((review) => (
              <div key={review.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.reviewerName}</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.feedback}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Submission Readiness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Submission Readiness ({draft.submissionReadiness.overallScore}%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {draft.submissionReadiness.criteria.map((criterion, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                <div className={`w-4 h-4 rounded-full ${criterion.met ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{criterion.name}</div>
                  <div className="text-xs text-gray-600">{criterion.description}</div>
                </div>
                {criterion.met && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Personal Term Development</h2>
          <p className="text-gray-600">Develop and refine term definitions in your personal workspace</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">
            Balance: {tokenBalance.toLocaleString()} tokens
          </div>
          <Button onClick={() => setShowNewDraftForm(true)}>
            <Lightbulb className="w-4 h-4 mr-2" />
            New Term Draft
          </Button>
        </div>
      </div>

      {showNewDraftForm && (
        <div>
          {renderNewDraftForm()}
        </div>
      )}

      {activeDraft ? (
        renderDraftDetail(activeDraft)
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="drafts">My Drafts ({drafts.length})</TabsTrigger>
            <TabsTrigger value="workspace">Workspace Tools</TabsTrigger>
            <TabsTrigger value="analytics">Progress Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="drafts" className="space-y-4 mt-6">
            {drafts.length > 0 ? (
              <div className="grid gap-4">
                {drafts.map(renderDraftCard)}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center p-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Term Drafts</h3>
                  <p className="text-gray-600 mb-4">Start developing your first term definition</p>
                  <Button onClick={() => setShowNewDraftForm(true)}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Create First Draft
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="workspace" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Assistant Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Request AI Review
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Generate Term Suggestions
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Clarity Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Request Peer Review
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Compare with Public Terms
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Similar Terms
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-2xl font-bold text-blue-600">{drafts.length}</div>
                  <div className="text-sm text-gray-600">Total Drafts</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-2xl font-bold text-green-600">
                    {drafts.filter(d => d.status === 'ready_for_submission').length}
                  </div>
                  <div className="text-sm text-gray-600">Ready for Submission</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="text-center p-6">
                  <div className="text-2xl font-bold text-purple-600">
                    {drafts.reduce((sum, d) => sum + d.aiReviews.length + d.peerReviews.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}