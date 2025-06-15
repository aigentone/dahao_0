'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Loader2, CheckCircle, User, Shield, Coins, Target, Settings, GitPullRequest } from 'lucide-react';
import { AVAILABLE_AGENTS, getRandomAnalysis, getAgentDelay, type AgentType } from '@/lib/mock-data/agent-responses';
import { PersonalAIAgent, SystemAIAgent, AgentAssignmentRequest, TokenRewardProjection } from '@/types/agents';
import { GitHubIssue, GitHubIssueComment } from '@/types/github-compatible';
import { createGitHubDataService } from '@/services/github-data-service';

interface AssignedAgent {
  agentId: string;
  assignedBy: string;
  assignedAt: string;
  status: 'pending' | 'analyzing' | 'completed';
  analysis?: string;
  agentType?: 'personal' | 'system';
  tokenReward?: number;
  context?: 'governance' | 'issue';
  issueNumber?: number;
  issueTitle?: string;
}

interface AgentAssignmentPanelProps {
  // Optional Issue context for term development
  issue?: GitHubIssue;
  repoOwner?: string;
  repoName?: string;
  // Optional callback for issue updates
  onIssueUpdated?: (issue: GitHubIssue) => void;
  // Context type - determines available task types and behavior
  context?: 'governance' | 'term-development';
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

export default function AgentAssignmentPanel({ 
  issue, 
  repoOwner = 'user', 
  repoName = 'term-development', 
  onIssueUpdated,
  context = 'governance' 
}: AgentAssignmentPanelProps) {
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedAgentType, setSelectedAgentType] = useState<'personal' | 'system'>('personal');
  const [selectedTaskType, setSelectedTaskType] = useState<string>(context === 'term-development' ? 'definition_review' : 'analysis');
  const githubService = createGitHubDataService();

  // Get available task types based on context
  const getAvailableTaskTypes = () => {
    if (context === 'term-development') {
      return {
        definition_review: 'Definition Review',
        clarity_analysis: 'Clarity Analysis',
        uniqueness_check: 'Uniqueness Check',
        domain_alignment: 'Domain Alignment',
        peer_review_request: 'Peer Review Request'
      };
    }
    return {
      analysis: 'Analysis',
      validation: 'Validation',
      verification: 'Verification',
      moderation: 'Moderation',
      research: 'Research'
    };
  };

  // Helper function to calculate token rewards
  const calculateTokenReward = (agentType: 'personal' | 'system', taskType: string): TokenRewardProjection => {
    const baseRewards = {
      // General governance tasks
      analysis: 50,
      validation: 30,
      verification: 40,
      moderation: 25,
      research: 75,
      // Term development specific tasks
      definition_review: 60,
      clarity_analysis: 45,
      uniqueness_check: 55,
      domain_alignment: 50,
      peer_review_request: 40
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
      tokenReward: tokenProjection.estimatedTotal,
      context: issue ? 'issue' : 'governance',
      issueNumber: issue?.number,
      issueTitle: issue?.title
    };

    setAssignedAgents(prev => [...prev, assignment]);

    try {
      // If working with an issue, assign agent to the issue
      if (issue && repoOwner && repoName) {
        const updatedIssue = await githubService.assignAgentToIssue(
          repoOwner,
          repoName,
          issue.number,
          agentId,
          selectedTaskType,
          'current_user'
        );
        
        // Notify parent component of issue update
        if (onIssueUpdated) {
          onIssueUpdated(updatedIssue);
        }
      }

      // Simulate analysis delay based on agent type
      const baseDelay = agentType === 'personal' ? 2000 : 1500;
      const delay = baseDelay + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Generate analysis based on context and agent type
      let analysis: string;
      
      if (context === 'term-development' && issue) {
        if (agentType === 'personal') {
          analysis = generateTermDevelopmentPersonalAnalysis(selectedTaskType, issue, tokenProjection.estimatedTotal);
        } else {
          analysis = generateTermDevelopmentSystemAnalysis(selectedTaskType, issue);
        }
      } else {
        // Original governance analysis
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
      }

      setAssignedAgents(prev =>
        prev.map(agent =>
          agent.agentId === agentId && agent.status === 'analyzing'
            ? { ...agent, status: 'completed', analysis }
            : agent
        )
      );

    } catch (error) {
      console.error('Failed to assign agent:', error);
      // Update assignment status to show error
      setAssignedAgents(prev =>
        prev.map(agent =>
          agent.agentId === agentId && agent.status === 'analyzing'
            ? { ...agent, status: 'completed', analysis: `Error: Failed to assign agent. ${error}` }
            : agent
        )
      );
    } finally {
      setLoading(prev => ({ ...prev, [agentId]: false }));
    }
  };

  // Generate term development specific analysis for Personal AI
  const generateTermDevelopmentPersonalAnalysis = (taskType: string, issue: GitHubIssue, tokenReward: number): string => {
    const termDraft = issue.termDraft;
    if (!termDraft) return 'Error: No term draft data found in issue.';

    switch (taskType) {
      case 'definition_review':
        return `## Personal AI - Definition Review

**Term**: ${termDraft.termName}
**Overall Score**: 8.${Math.floor(Math.random() * 5 + 3)}/10

### Personal Value System Analysis
✓ Aligns with your ${termDraft.domain} priorities
✓ Consistent with your custom value modifications
✓ Matches your preference for ${Math.random() > 0.5 ? 'progressive' : 'balanced'} approaches

### Definition Quality Assessment
- **Clarity**: ${termDraft.progress.clarity}% - ${termDraft.progress.clarity >= 80 ? 'Excellent' : 'Needs improvement'}
- **Uniqueness**: ${termDraft.progress.uniqueness}% - ${termDraft.progress.uniqueness >= 80 ? 'Novel contribution' : 'Consider differentiation'}
- **Practical Application**: ${termDraft.progress.alignment}% - ${termDraft.progress.alignment >= 80 ? 'Highly applicable' : 'Add examples'}

### Personal Recommendations
${generatePersonalizedSuggestions(termDraft)}

Token Reward: ${tokenReward} tokens (1.5x Personal AI multiplier)
**Status**: ${termDraft.progress.completeness >= 80 ? 'APPROVED for advancement' : 'NEEDS REVISION'}`;

      case 'clarity_analysis':
        return `## Personal AI - Clarity Analysis

**Current Clarity Score**: ${termDraft.progress.clarity}%

### Your Value-Aligned Assessment
${termDraft.progress.clarity >= 80 ? 
  '✓ Definition meets your standards for clear communication' : 
  '⚠ Definition could be clearer based on your preferences'}

### Personalized Clarity Recommendations
- Adjust language complexity for your target audience
- Add examples that resonate with your ${termDraft.domain} focus
- Structure definition according to your preferred format

Token Reward: ${tokenReward} tokens
**Personal Insight**: Definition clarity aligns with your communication style preferences.`;

      case 'uniqueness_check':
        return `## Personal AI - Uniqueness Analysis

**Uniqueness Score**: ${termDraft.progress.uniqueness}%

### Personal Knowledge Base Comparison
✓ Compared against your personal term library
✓ Analyzed against your ${termDraft.domain} specializations
${termDraft.progress.uniqueness >= 85 ? 
  '✓ Highly unique contribution to your value system' : 
  '⚠ Consider differentiating from similar terms in your domain'}

### Value System Integration
- Term enhances your ${termDraft.domain} governance framework
- Complements your existing custom values
- Provides new tools for your decision-making processes

Token Reward: ${tokenReward} tokens`;

      default:
        return `## Personal AI - ${taskType.replace('_', ' ').toUpperCase()}

Term: ${termDraft.termName}
Analysis completed with your personal value system.
Token Reward: ${tokenReward} tokens`;
    }
  };

  // Generate term development specific analysis for System AI
  const generateTermDevelopmentSystemAnalysis = (taskType: string, issue: GitHubIssue): string => {
    const termDraft = issue.termDraft;
    if (!termDraft) return 'Error: No term draft data found in issue.';

    switch (taskType) {
      case 'definition_review':
        return `## System AI - Objective Definition Review

**Term**: ${termDraft.termName}
**Compliance Score**: ${Math.floor(Math.random() * 20 + 80)}%

### DAHAO Core Principle Validation
✓ Harm Prevention: ${Math.random() > 0.3 ? 'COMPLIANT' : 'REVIEW NEEDED'}
✓ Equality: ${Math.random() > 0.2 ? 'COMPLIANT' : 'REVIEW NEEDED'}
✓ Transparency: ${Math.random() > 0.2 ? 'COMPLIANT' : 'REVIEW NEEDED'}

### Domain Standards Assessment
- **${termDraft.domain.toUpperCase()} Domain**: Standards met
- **Cross-Domain Impact**: ${Math.random() > 0.5 ? 'Minimal' : 'Moderate'}
- **Governance Integration**: Compatible

### Objective Quality Metrics
- Definition Length: ${Math.floor(termDraft.definition.length / 10) * 10} characters
- Concept Complexity: ${Math.random() > 0.5 ? 'Moderate' : 'High'}
- Implementation Readiness: ${termDraft.submissionReadiness.overallScore}%

**System Authority**: Validation Level
**Status**: ${termDraft.submissionReadiness.overallScore >= 80 ? 'APPROVED' : 'CONDITIONAL APPROVAL'}`;

      case 'clarity_analysis':
        return `## System AI - Objective Clarity Assessment

**Clarity Metrics**:
- Readability Score: ${Math.floor(Math.random() * 20 + 70)}
- Terminology Consistency: ${Math.random() > 0.3 ? 'PASS' : 'REVIEW'}
- Logical Structure: ${Math.random() > 0.2 ? 'PASS' : 'REVIEW'}

### Standard Compliance
✓ Follows DAHAO definition format
✓ Uses approved terminology
✓ Maintains neutral language

**Objective Assessment**: Definition meets clarity standards for ${termDraft.domain} domain.`;

      default:
        return `## System AI - ${taskType.replace('_', ' ').toUpperCase()}

**Term**: ${termDraft.termName}
**System Validation**: COMPLIANT
**Authority Level**: Validation
**Objective Status**: Standards met for ${termDraft.domain} domain`;
    }
  };

  // Generate personalized suggestions based on term draft
  const generatePersonalizedSuggestions = (termDraft: any): string => {
    const suggestions = [
      `Consider adding examples from your ${termDraft.domain} experience`,
      'Align terminology with your personal value modifications',
      'Include practical applications relevant to your context',
      'Reference connections to your custom value set',
      'Add implementation details for your specific use case'
    ];
    
    return suggestions.slice(0, 3).map(s => `• ${s}`).join('\n');
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
            {issue && (
              <>
                <GitPullRequest className="h-4 w-4 text-blue-600 ml-2" />
                <span className="text-sm font-normal text-gray-600">Issue #{issue.number}</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {issue ? (
              <>
                Assign AI agents to analyze term development issue: <strong>{issue.title}</strong>
                <br />
                Choose between Personal AI Agents (your values) or System AI Agents (objective validation)
              </>
            ) : (
              'Choose between Personal AI Agents (your values) or System AI Agents (objective validation)'
            )}
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
              <label className="text-sm font-medium">
                Task Type {context === 'term-development' && '(Term Development)'}
              </label>
              <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(getAvailableTaskTypes()).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
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
                        {assignment.context === 'issue' && assignment.issueNumber && (
                          <Badge variant="outline" className="text-xs bg-blue-50">
                            <GitPullRequest className="w-3 h-3 mr-1" />
                            Issue #{assignment.issueNumber}
                          </Badge>
                        )}
                      </div>
                      {assignment.tokenReward && (
                        <div className="flex items-center gap-1 text-sm text-yellow-600">
                          <Coins className="w-3 h-3" />
                          <span>{assignment.tokenReward} tokens</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Issue context information */}
                    {assignment.context === 'issue' && assignment.issueTitle && (
                      <div className="mb-2 p-2 bg-blue-50 rounded text-xs">
                        <strong>Issue Context:</strong> {assignment.issueTitle}
                      </div>
                    )}

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
