'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Loader2, CheckCircle, User, Shield, Coins, Target, Settings } from 'lucide-react';
import { AVAILABLE_AGENTS, getRandomAnalysis, getAgentDelay, type AgentType } from '@/lib/mock-data/agent-responses';
import { PersonalAIAgent, SystemAIAgent, AgentAssignmentRequest, TokenRewardProjection } from '@/types/agents';

interface AssignedAgent {
  agentId: string;
  assignedBy: string;
  assignedAt: string;
  status: 'pending' | 'analyzing' | 'completed';
  analysis?: string;
  agentType?: 'personal' | 'system';
  tokenReward?: number;
}

// Mock Personal AI Agents
const MOCK_PERSONAL_AGENTS: PersonalAIAgent[] = [
  {
    id: 'alex-personal-agent',
    userId: 'user-alex',
    name: "Alex's Environmental Assistant",
    type: 'personal',
    valueSystem: {
      coreValues: ['sustainability', 'transparency', 'equality'],
      customValues: ['climate-justice', 'renewable-energy'],
      priorityLevel: 'progressive',
      inheritedFrom: 'environment-dahao',
      personalModifications: ['stronger-climate-focus']
    },
    personalityTraits: ['analytical', 'environmental-focused', 'innovative'],
    decisionMaking: 'hybrid',
    deploymentTargets: ['governance-voting', 'proposal-analysis', 'research-assistance'],
    tokenEarnings: [],
    capabilities: {
      crossBranchDeployment: true,
      valueSystemOverride: false,
      personalizedReasoning: true,
      userSpecificLearning: true
    },
    performance: {
      totalDeployments: 23,
      successRate: 0.89,
      userSatisfaction: 0.94,
      tokenValue: 1250
    },
    createdAt: '2024-01-15T10:00:00Z',
    lastActive: '2024-12-15T14:30:00Z',
    status: 'active'
  },
  {
    id: 'personal-ethics-agent',
    userId: 'user-current',
    name: 'Personal Ethics Guardian',
    type: 'personal',
    valueSystem: {
      coreValues: ['harm-prevention', 'equality', 'transparency'],
      customValues: ['animal-rights', 'social-justice'],
      priorityLevel: 'balanced',
      inheritedFrom: 'core-governance',
      personalModifications: ['enhanced-animal-welfare']
    },
    personalityTraits: ['empathetic', 'cautious', 'detail-oriented'],
    decisionMaking: 'consensus',
    deploymentTargets: ['governance-voting', 'community-mediation'],
    tokenEarnings: [],
    capabilities: {
      crossBranchDeployment: true,
      valueSystemOverride: false,
      personalizedReasoning: true,
      userSpecificLearning: true
    },
    performance: {
      totalDeployments: 15,
      successRate: 0.93,
      userSatisfaction: 0.91,
      tokenValue: 850
    },
    createdAt: '2024-02-01T09:00:00Z',
    lastActive: '2024-12-15T13:45:00Z',
    status: 'active'
  }
];

// Mock System AI Agents
const MOCK_SYSTEM_AGENTS: SystemAIAgent[] = [
  {
    id: 'core-compliance-validator',
    name: 'Core Compliance Validator',
    type: 'system',
    constraints: {
      mainDAHAOValuesOnly: true,
      noPersonalModifications: true,
      strictCompliance: true
    },
    role: 'validation',
    authority: {
      level: 'validation',
      scope: ['all-proposals', 'governance-changes'],
      limitations: ['no-override', 'must-escalate-conflicts']
    },
    capabilities: {
      crossDomainValidation: true,
      principleEnforcement: true,
      systemMonitoring: false,
      emergencyResponse: false
    },
    deployment: {
      scope: 'global',
      priority: 'high',
      automated: true
    },
    performance: {
      validationsPerformed: 342,
      accuracyRate: 0.97,
      responseTime: 1.2,
      systemReliability: 0.99
    },
    createdAt: '2024-01-01T00:00:00Z',
    lastActive: '2024-12-15T15:00:00Z',
    status: 'active'
  },
  {
    id: 'integrity-monitor',
    name: 'Integrity Monitor',
    type: 'system',
    constraints: {
      mainDAHAOValuesOnly: true,
      noPersonalModifications: true,
      strictCompliance: true
    },
    role: 'integrity',
    authority: {
      level: 'enforcement',
      scope: ['conflict-detection', 'bias-analysis'],
      limitations: ['human-oversight-required']
    },
    capabilities: {
      crossDomainValidation: true,
      principleEnforcement: true,
      systemMonitoring: true,
      emergencyResponse: false
    },
    deployment: {
      scope: 'global',
      priority: 'medium',
      automated: true
    },
    performance: {
      validationsPerformed: 89,
      accuracyRate: 0.94,
      responseTime: 2.1,
      systemReliability: 0.96
    },
    createdAt: '2024-01-01T00:00:00Z',
    lastActive: '2024-12-15T14:50:00Z',
    status: 'active'
  }
];

export default function AgentAssignmentPanel() {
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedAgentType, setSelectedAgentType] = useState<'personal' | 'system'>('personal');
  const [selectedTaskType, setSelectedTaskType] = useState<string>('analysis');

  // Helper function to calculate token rewards
  const calculateTokenReward = (agentType: 'personal' | 'system', taskType: string): TokenRewardProjection => {
    const baseRewards = {
      analysis: 50,
      validation: 30,
      verification: 40,
      moderation: 25,
      research: 75
    };

    const baseReward = baseRewards[taskType as keyof typeof baseRewards] || 50;
    const personalMultiplier = agentType === 'personal' ? 1.5 : 1.0;
    const qualityMultiplier = 1.2;
    const urgencyMultiplier = 1.0;
    const complexityMultiplier = 1.1;

    const estimatedTotal = Math.round(baseReward * personalMultiplier * qualityMultiplier * urgencyMultiplier * complexityMultiplier);

    return {
      baseReward,
      qualityMultiplier,
      urgencyMultiplier,
      complexityMultiplier,
      estimatedTotal,
      paymentSchedule: {
        immediate: Math.round(estimatedTotal * 0.3),
        onCompletion: Math.round(estimatedTotal * 0.5),
        onAcceptance: Math.round(estimatedTotal * 0.2)
      }
    };
  };

  const assignAgent = async (agentId: string, agentType: 'personal' | 'system') => {
    setLoading(prev => ({ ...prev, [agentId]: true }));

    // Calculate token reward
    const tokenProjection = calculateTokenReward(agentType, selectedTaskType);

    // Create assignment immediately
    const assignment: AssignedAgent = {
      agentId,
      assignedBy: 'current_user',
      assignedAt: new Date().toISOString(),
      status: 'analyzing',
      agentType,
      tokenReward: tokenProjection.estimatedTotal
    };

    setAssignedAgents(prev => [...prev, assignment]);

    // Simulate analysis delay based on agent type
    const baseDelay = agentType === 'personal' ? 2000 : 1500;
    const delay = baseDelay + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Generate analysis based on agent type
    let analysis: string;
    if (agentType === 'personal') {
      analysis = `Personal AI Analysis:
✓ Aligned with your value system
✓ Matches your ${selectedTaskType} preferences
✓ Considers your custom values
💡 Personalized recommendation based on your priorities
Token Reward: ${tokenProjection.estimatedTotal} tokens
Overall: APPROVED with personal insights`;
    } else {
      analysis = `System AI Analysis:
✓ Compliance with core DAHAO principles
✓ Objective evaluation completed
✓ Cross-domain validation passed
⚠ Neutral assessment (no personal bias)
System Authority: Validation level
Overall: COMPLIANT`;
    }

    setAssignedAgents(prev =>
      prev.map(agent =>
        agent.agentId === agentId && agent.status === 'analyzing'
          ? { ...agent, status: 'completed', analysis }
          : agent
      )
    );

    setLoading(prev => ({ ...prev, [agentId]: false }));
  };

  const isAgentAssigned = (agentId: string) => {
    return assignedAgents.some(agent => agent.agentId === agentId);
  };

  const getAgentStatus = (agentId: string) => {
    const assignment = assignedAgents.find(agent => agent.agentId === agentId);
    return assignment?.status || null;
  };

  // Get current agents based on selected type
  const getCurrentAgents = () => {
    return selectedAgentType === 'personal' ? MOCK_PERSONAL_AGENTS : MOCK_SYSTEM_AGENTS;
  };

  const currentTokenProjection = calculateTokenReward(selectedAgentType, selectedTaskType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Agent Assignment
          </CardTitle>
          <CardDescription>
            Choose between Personal AI Agents (your values) or System AI Agents (objective validation)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Agent Type Selection */}
          <Tabs value={selectedAgentType} onValueChange={(value) => setSelectedAgentType(value as 'personal' | 'system')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal AI Agents
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                System AI Agents
              </TabsTrigger>
            </TabsList>

            {/* Task Type Selection */}
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium">Task Type</label>
              <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="validation">Validation</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="moderation">Moderation</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Token Reward Projection */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Token Reward Projection</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-yellow-700">Estimated Total</div>
                  <div className="font-semibold text-yellow-900">{currentTokenProjection.estimatedTotal} tokens</div>
                </div>
                <div>
                  <div className="text-yellow-700">On Completion</div>
                  <div className="font-semibold text-yellow-900">{currentTokenProjection.paymentSchedule.onCompletion} tokens</div>
                </div>
                <div>
                  <div className="text-yellow-700">Multiplier</div>
                  <div className="font-semibold text-yellow-900">{selectedAgentType === 'personal' ? '1.5x' : '1.0x'}</div>
                </div>
              </div>
            </div>

            {/* Agent Type Explanation */}
            <TabsContent value="personal" className="mt-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Personal AI Agent Benefits</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Aligned with your personal value system</li>
                  <li>• Can override standard decisions based on your preferences</li>
                  <li>• Learns from your feedback and improves over time</li>
                  <li>• Can deploy across multiple branches you participate in</li>
                  <li>• 50% higher token rewards for personalized insights</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">System AI Agent Benefits</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Objective evaluation based only on core DAHAO principles</li>
                  <li>• No personal bias or custom modifications</li>
                  <li>• Consistent validation across all users and proposals</li>
                  <li>• Higher system reliability and compliance guarantees</li>
                  <li>• Faster response times for standard evaluations</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          {/* Available Agents */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">
              Available {selectedAgentType === 'personal' ? 'Personal' : 'System'} AI Agents
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {getCurrentAgents().map((agent) => {
                const isAssigned = isAgentAssigned(agent.id);
                const status = getAgentStatus(agent.id);
                const isLoading = loading[agent.id];

                return (
                  <div key={agent.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {selectedAgentType === 'personal' ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                        <h4 className="font-semibold">{agent.name}</h4>
                      </div>
                      {status && (
                        <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
                          {status === 'analyzing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                          {status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {status}
                        </Badge>
                      )}
                    </div>

                    {/* Agent-specific information */}
                    {selectedAgentType === 'personal' && 'valueSystem' in agent && (
                      <div className="mb-3 space-y-1">
                        <div className="text-xs text-gray-600">
                          <strong>Values:</strong> {agent.valueSystem.coreValues.join(', ')}
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>Traits:</strong> {agent.personalityTraits.join(', ')}
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>Success Rate:</strong> {Math.round(agent.performance.successRate * 100)}%
                        </div>
                      </div>
                    )}

                    {selectedAgentType === 'system' && 'role' in agent && (
                      <div className="mb-3 space-y-1">
                        <div className="text-xs text-gray-600">
                          <strong>Role:</strong> {agent.role}
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>Authority:</strong> {agent.authority.level}
                        </div>
                        <div className="text-xs text-gray-600">
                          <strong>Accuracy:</strong> {Math.round(agent.performance.accuracyRate * 100)}%
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => assignAgent(agent.id, selectedAgentType)}
                      disabled={isAssigned || isLoading}
                      size="sm"
                      className="w-full"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      {isAssigned ? 'Assigned' : `Assign Agent (+${currentTokenProjection.estimatedTotal} tokens)`}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {assignedAgents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Analysis Results</CardTitle>
            <CardDescription>
              AI agent responses with token rewards and value system insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedAgents.map((assignment, index) => {
                const currentAgents = assignment.agentType === 'personal' ? MOCK_PERSONAL_AGENTS : MOCK_SYSTEM_AGENTS;
                const agent = currentAgents.find(a => a.id === assignment.agentId);

                return (
                  <div key={index} className={`border-l-4 pl-4 ${
                    assignment.agentType === 'personal' ? 'border-l-blue-500' : 'border-l-green-500'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {assignment.agentType === 'personal' ? (
                          <User className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Shield className="h-4 w-4 text-green-600" />
                        )}
                        <span className="font-semibold">{agent?.name}</span>
                        <Badge variant="outline">{assignment.status}</Badge>
                        {assignment.agentType === 'personal' && (
                          <Badge variant="secondary" className="text-xs">Personal AI</Badge>
                        )}
                        {assignment.agentType === 'system' && (
                          <Badge variant="outline" className="text-xs">System AI</Badge>
                        )}
                      </div>
                      {assignment.tokenReward && (
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Coins className="w-3 h-3" />
                          <span>{assignment.tokenReward} tokens</span>
                        </div>
                      )}
                    </div>

                    {assignment.status === 'analyzing' && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>
                          {assignment.agentType === 'personal' 
                            ? 'Analyzing with your personal value system...' 
                            : 'Performing objective system validation...'
                          }
                        </span>
                      </div>
                    )}

                    {assignment.analysis && (
                      <div className={`p-3 rounded-lg ${
                        assignment.agentType === 'personal' ? 'bg-blue-50' : 'bg-green-50'
                      }`}>
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {assignment.analysis}
                        </pre>
                      </div>
                    )}

                    {/* Agent Value System Info */}
                    {assignment.status === 'completed' && assignment.agentType === 'personal' && agent && 'valueSystem' in agent && (
                      <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
                        <strong>Value System Applied:</strong> {agent.valueSystem.coreValues.join(', ')}
                        {agent.valueSystem.customValues.length > 0 && (
                          <div><strong>Custom Values:</strong> {agent.valueSystem.customValues.join(', ')}</div>
                        )}
                      </div>
                    )}

                    {assignment.status === 'completed' && assignment.agentType === 'system' && agent && 'authority' in agent && (
                      <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                        <strong>System Authority:</strong> {agent.authority.level} | 
                        <strong> Role:</strong> {agent.role} |
                        <strong> Scope:</strong> {agent.deployment.scope}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cross-Branch Deployment Options */}
      {selectedAgentType === 'personal' && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-purple-900">Cross-Branch Deployment</h4>
            </div>
            <p className="text-sm text-purple-800 mb-3">
              Personal AI agents can be deployed across multiple DAHAO branches you participate in, 
              maintaining your value system while earning tokens from each deployment.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
                <Settings className="w-4 h-4 mr-2" />
                Configure Deployment
              </Button>
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
                <Coins className="w-4 h-4 mr-2" />
                View Earnings Across Branches
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
