'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GitBranch, 
  Bot, 
  Coins, 
  TrendingUp, 
  Settings, 
  Upload,
  FileText,
  MessageSquare,
  Target,
  Award,
  BarChart3
} from 'lucide-react';

interface PersonalBranchData {
  id: string;
  name: string;
  parentDAHAO: string;
  createdAt: string;
  status: 'active' | 'developing' | 'merging';
  valueSystem: {
    coreValues: string[];
    customValues: string[];
    priorityLevel: string;
  };
  aiAgent: {
    name: string;
    status: 'active' | 'training' | 'offline';
    personalityTraits: string[];
    decisionMaking: string;
    deploymentScope: string[];
  };
  tokenEarnings: {
    totalEarned: number;
    currentBalance: number;
    lastWeekEarnings: number;
    roi: number;
  };
  contributions: {
    termsProposed: number;
    discussionsParticipated: number;
    proposalsSubmitted: number;
    votesParticipated: number;
  };
  progressToPublicPool: {
    completionPercentage: number;
    requirements: Array<{
      name: string;
      completed: boolean;
      description: string;
    }>;
  };
}

interface PersonalWorkspaceProps {
  personalBranches: PersonalBranchData[];
  activeBranchId: string | null;
  onSwitchBranch: (branchId: string) => void;
  onCreateNewBranch: () => void;
}

export function PersonalWorkspace({ 
  personalBranches, 
  activeBranchId, 
  onSwitchBranch, 
  onCreateNewBranch 
}: PersonalWorkspaceProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const activeBranch = personalBranches.find(b => b.id === activeBranchId) || personalBranches[0];

  if (!activeBranch) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="text-center p-12">
          <GitBranch className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No Personal Branches</h3>
          <p className="text-gray-600 mb-6">Create your first personal DAHAO branch to get started with personal AI agents and token earnings.</p>
          <Button onClick={onCreateNewBranch}>
            <GitBranch className="w-4 h-4 mr-2" />
            Create Personal Branch
          </Button>
        </CardContent>
      </Card>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Branch Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Branch Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activeBranch.status}</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeBranch.valueSystem.coreValues.length + activeBranch.valueSystem.customValues.length}</div>
              <div className="text-sm text-gray-600">Values Defined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{activeBranch.aiAgent.status}</div>
              <div className="text-sm text-gray-600">AI Agent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{activeBranch.progressToPublicPool.completionPercentage}%</div>
              <div className="text-sm text-gray-600">To Public Pool</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Earnings Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Token Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{activeBranch.tokenEarnings.totalEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeBranch.tokenEarnings.currentBalance.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current Balance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">+{activeBranch.tokenEarnings.lastWeekEarnings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Last Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{activeBranch.tokenEarnings.roi}%</div>
              <div className="text-sm text-gray-600">ROI</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Weekly Earning Trend</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-600 mt-1">+12% increase from last week</div>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Public Pool */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Progress to Public Pool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Completion Progress</span>
              <span>{activeBranch.progressToPublicPool.completionPercentage}%</span>
            </div>
            <Progress value={activeBranch.progressToPublicPool.completionPercentage} className="h-2" />
          </div>
          <div className="space-y-2">
            {activeBranch.progressToPublicPool.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className={`w-4 h-4 rounded-full ${req.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <div className="font-medium text-sm">{req.name}</div>
                  <div className="text-xs text-gray-600">{req.description}</div>
                </div>
                {req.completed && <Award className="w-4 h-4 text-green-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIConfiguration = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Agent Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium">{activeBranch.aiAgent.name}</div>
                <div className="text-sm text-gray-600">Personal AI Agent</div>
              </div>
              <Badge variant={activeBranch.aiAgent.status === 'active' ? 'default' : 'secondary'}>
                {activeBranch.aiAgent.status}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {activeBranch.aiAgent.personalityTraits.map(trait => (
                  <Badge key={trait} variant="outline">{trait}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Decision Making Style</h4>
              <Badge>{activeBranch.aiAgent.decisionMaking}</Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Deployment Scope</h4>
              <div className="flex flex-wrap gap-2">
                {activeBranch.aiAgent.deploymentScope.map(scope => (
                  <Badge key={scope} variant="outline">{scope}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTermDevelopment = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Personal Term Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{activeBranch.contributions.termsProposed}</div>
                <div className="text-sm text-gray-600">Terms Proposed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{activeBranch.contributions.discussionsParticipated}</div>
                <div className="text-sm text-gray-600">Discussions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{activeBranch.contributions.proposalsSubmitted}</div>
                <div className="text-sm text-gray-600">Proposals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{activeBranch.contributions.votesParticipated}</div>
                <div className="text-sm text-gray-600">Votes Cast</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Draft New Term
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discussion
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit to Public Pool
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Branch Selector */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Personal Workspace
            </CardTitle>
            <Button onClick={onCreateNewBranch} size="sm">
              <GitBranch className="w-4 h-4 mr-2" />
              New Branch
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {personalBranches.map((branch) => (
              <Button
                key={branch.id}
                variant={activeBranchId === branch.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSwitchBranch(branch.id)}
              >
                {branch.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {branch.status}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Branch Details */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
          <TabsTrigger value="term-dev">Term Development</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          {renderOverview()}
        </TabsContent>
        
        <TabsContent value="ai-config" className="mt-6">
          {renderAIConfiguration()}
        </TabsContent>
        
        <TabsContent value="term-dev" className="mt-6">
          {renderTermDevelopment()}
        </TabsContent>
      </Tabs>
    </div>
  );
}