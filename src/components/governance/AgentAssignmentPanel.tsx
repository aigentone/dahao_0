'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, Loader2, CheckCircle, User, Shield, AlertTriangle, DollarSign, Info } from 'lucide-react';
import { TASK_DEFINITIONS } from '@/lib/ai/prompts';
import { AgentAnalysis } from '@/lib/ai/types';
import { GitHubIssue } from '@/types/github-compatible';
import { createGitHubDataService } from '@/services/github-data-service';
import { GovernancePrinciple, GovernanceRule, Term } from '@/types/governance';
import { getUserValuesFromBranch, getAvailableUserProfiles } from '@/lib/utils/user-values';
import { getSystemValuesForContext, getSuggestedSystemBranch, getAvailableSystemValidators } from '@/lib/utils/system-values';

interface AssignedAgent {
  agentId: string;
  assignedBy: string;
  assignedAt: string;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  analysis?: AgentAnalysis;
  agentType?: 'personal' | 'system';
  estimatedCost?: number;
  actualCost?: number;
  estimatedTokens?: number;
  actualTokens?: number;
  context?: 'governance' | 'issue';
  issueNumber?: number;
  issueTitle?: string;
  error?: string;
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
  
  // Governance Item context for analysis
  governanceItem?: {
    type: 'principle' | 'rule' | 'term' | 'proposal';
    data: GovernancePrinciple | GovernanceRule | Term | any;
    id: string;
    version?: string;
    domain: string;
  };
}

// Real AI Agent Configuration
const PERSONAL_AI_CONFIG = {
  id: 'personal-ai-claude',
  name: 'Personal AI Assistant',
  description: 'AI trained with your personal values and preferences'
};

const SYSTEM_AI_CONFIG = {
  id: 'system-ai-claude',
  name: 'System AI Validator', 
  description: 'Objective AI using only DAHAO baseline principles'
};

export default function AgentAssignmentPanel({ 
  issue, 
  repoOwner = 'user', 
  repoName = 'term-development', 
  onIssueUpdated,
  context = 'governance',
  governanceItem
}: AgentAssignmentPanelProps) {
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedAgentType, setSelectedAgentType] = useState<'personal' | 'system'>('personal');
  const [selectedTaskType, setSelectedTaskType] = useState<string>('general-analysis');
  const [selectedUserId, setSelectedUserId] = useState<string>('current-user');
  const [selectedSystemBaseline, setSelectedSystemBaseline] = useState<string>('');
  const githubService = createGitHubDataService();

  // Get available user profiles for Personal AI
  const availableUsers = useMemo(() => getAvailableUserProfiles(), []);

  // Get user context for selected user
  const currentUserContext = useMemo(() => {
    return getUserValuesFromBranch(selectedUserId);
  }, [selectedUserId]);

  // Get suggested system baseline and available validators
  const systemInfo = useMemo(() => {
    if (!governanceItem) return { suggested: 'core', validators: [] };
    
    const suggested = getSuggestedSystemBranch(
      governanceItem.id,
      governanceItem.type,
      governanceItem.id
    );
    
    const validators = getAvailableSystemValidators();
    
    return { suggested, validators };
  }, [governanceItem]);

  // Get system context for selected baseline
  const currentSystemContext = useMemo(() => {
    if (!governanceItem) return null;
    
    const baselineKey = selectedSystemBaseline || systemInfo.suggested;
    const validator = systemInfo.validators.find(v => v.key === baselineKey);
    
    return validator ? getSystemValuesForContext(
      validator.branchName,
      governanceItem.type,
      governanceItem.id
    ) : null;
  }, [selectedSystemBaseline, systemInfo, governanceItem]);

  // Get available task types based on context and governance item
  const getAvailableTaskTypes = () => {
    if (context === 'term-development') {
      return {
        'definition-clarity': 'Definition Clarity Review',
        'usage-consistency': 'Usage Consistency Check',
        'evolution-analysis': 'Evolution Analysis',
        'general-analysis': 'General Analysis'
      };
    }
    
    // Governance-specific task types based on item type
    if (governanceItem) {
      const baseTypes = {
        'general-analysis': 'General Analysis'
      };
      
      switch (governanceItem.type) {
        case 'principle':
          return {
            ...baseTypes,
            'philosophical-consistency': 'Philosophical Consistency Review',
            'implementation-feasibility': 'Implementation Feasibility Analysis',
            'cross-domain-impact': 'Cross-Domain Impact Assessment'
          };
        case 'rule':
          return {
            ...baseTypes,
            'enforcement-mechanism': 'Enforcement Mechanism Review',
            'compliance-framework': 'Compliance Framework Check',
            'implementation-requirements': 'Implementation Requirements Audit'
          };
        case 'term':
          return {
            ...baseTypes,
            'definition-clarity': 'Definition Clarity Review',
            'usage-consistency': 'Usage Consistency Check',
            'evolution-analysis': 'Evolution Analysis'
          };
        default:
          return baseTypes;
      }
    }
    
    return {
      'general-analysis': 'General Analysis'
    };
  };

  // Helper function to estimate token costs
  const estimateTokenCosts = (agentType: 'personal' | 'system', taskType: string) => {
    const baseTokenEstimates = {
      'general-analysis': 1500,
      'definition-clarity': 1200,
      'usage-consistency': 1300,
      'evolution-analysis': 1800,
      'philosophical-consistency': 2000,
      'implementation-feasibility': 1700,
      'cross-domain-impact': 2200,
      'enforcement-mechanism': 1600,
      'compliance-framework': 1400,
      'implementation-requirements': 1900
    };

    const estimatedTokens = baseTokenEstimates[taskType as keyof typeof baseTokenEstimates] || 1500;
    const personalMultiplier = agentType === 'personal' ? 1.3 : 1.0; // Personal AI uses more tokens
    
    return Math.round(estimatedTokens * personalMultiplier);
  };

  // Calculate estimated costs in USD
  const calculateAPIcost = (agentType: 'personal' | 'system', taskType: string): number => {
    const estimatedTokens = estimateTokenCosts(agentType, taskType);
    
    // Claude 3.5 Sonnet pricing: $0.003/1K input, $0.015/1K output
    // Estimate 70% input, 30% output ratio
    const inputTokens = Math.round(estimatedTokens * 0.7);
    const outputTokens = Math.round(estimatedTokens * 0.3);
    
    const inputCost = (inputTokens / 1000) * 0.003;
    const outputCost = (outputTokens / 1000) * 0.015;
    
    return Math.round((inputCost + outputCost) * 100) / 100; // Round to 2 decimal places
  };

  const assignAgent = async (agentId: string, agentType: 'personal' | 'system') => {
    setLoading(prev => ({ ...prev, [agentId]: true }));

    // Calculate estimated costs
    const estimatedCost = calculateAPIcost(agentType, selectedTaskType);
    const estimatedTokens = estimateTokenCosts(agentType, selectedTaskType);

    // Create assignment immediately
    const assignment: AssignedAgent = {
      agentId,
      assignedBy: 'current_user',
      assignedAt: new Date().toISOString(),
      status: 'analyzing',
      agentType,
      estimatedCost,
      estimatedTokens,
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

      // Prepare analysis request for real Claude API
      if (!governanceItem) {
        throw new Error('No governance item provided for analysis');
      }

      // Use dynamic context for enhanced analysis
      const userContext = currentUserContext;
      const systemContext = currentSystemContext;
      
      const analysisRequest = {
        user: {
          id: selectedUserId,
          name: userContext.userName,
          branch: userContext.branchId,
          values: userContext.coreValues,
          // Pass dynamic context for enhanced prompts
          contextOverride: {
            branchId: userContext.branchId,
            extractDynamicValues: true
          }
        },
        governanceItem: {
          type: governanceItem.type,
          id: governanceItem.id,
          name: governanceItem.data.name || governanceItem.id,
          version: governanceItem.version || '1.0.0',
          data: governanceItem.data,
          elementBranchId: governanceItem.domain
        },
        task: {
          agentType,
          taskType: selectedTaskType,
          context: `Analyzing ${governanceItem.type}: ${governanceItem.data.name || governanceItem.id}`,
          // For System AI: specify which baseline to use
          systemBaselinePreference: agentType === 'system' ? 
            (selectedSystemBaseline || systemInfo.suggested) : undefined
        },
        branch: {
          id: userContext.branchId,
          name: userContext.branchName
        }
      };

      // Call real Claude API through API endpoint (which handles saving automatically)
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analysisRequest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Analysis request failed');
      }

      const result = await response.json();
      const analysis: AgentAnalysis = result.analysis;

      // Update assignment with completed analysis
      setAssignedAgents(prev =>
        prev.map(agent =>
          agent.agentId === agentId && agent.status === 'analyzing'
            ? { 
                ...agent, 
                status: 'completed', 
                analysis,
                actualCost: analysis.usage.cost.amount,
                actualTokens: analysis.usage.tokenUsage.total
              }
            : agent
        )
      );

    } catch (error) {
      console.error('Failed to assign agent:', error);
      // Update assignment status to show error
      setAssignedAgents(prev =>
        prev.map(agent =>
          agent.agentId === agentId && agent.status === 'analyzing'
            ? { 
                ...agent, 
                status: 'failed', 
                error: error instanceof Error ? error.message : 'Unknown error occurred'
              }
            : agent
        )
      );
    } finally {
      setLoading(prev => ({ ...prev, [agentId]: false }));
    }
  };

  // Helper functions for UI
  const getCurrentAgent = () => {
    return selectedAgentType === 'personal' ? PERSONAL_AI_CONFIG : SYSTEM_AI_CONFIG;
  };

  const isAgentAssigned = (agentId: string) => {
    return assignedAgents.some(agent => agent.agentId === agentId);
  };

  const getAgentStatus = (agentId: string) => {
    const agent = assignedAgents.find(agent => agent.agentId === agentId);
    return agent?.status;
  };

  const getCurrentTaskTypes = () => getAvailableTaskTypes();

  const currentAPICost = calculateAPIcost(selectedAgentType, selectedTaskType);
  const currentAgent = getCurrentAgent();
  const isAssigned = isAgentAssigned(currentAgent.id);
  const status = getAgentStatus(currentAgent.id);
  const isLoading = loading[currentAgent.id];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Agent Assignment
        </h3>
        <p className="text-sm text-muted-foreground">
          Deploy AI agents to analyze governance elements with real Claude integration.
        </p>
      </div>

      {/* Context Information */}
      {governanceItem && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 border rounded-lg">
          <div className="text-sm">
            <div className="font-medium">Analyzing: {governanceItem.data.name || governanceItem.id}</div>
            <div className="text-muted-foreground">Type: {governanceItem.type} | Version: {governanceItem.version || 'current'}</div>
            <div className="text-muted-foreground">Domain: {governanceItem.domain}</div>
          </div>
        </div>
      )}

      {/* Configuration */}
      <div className="space-y-4">
        {/* Task Type Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Analysis Task</label>
          <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
            <SelectTrigger>
              <SelectValue placeholder="Select analysis task" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(getCurrentTaskTypes()).map(([key, name]) => (
                <SelectItem key={key} value={key}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Agent Type Selection */}
        <Tabs value={selectedAgentType} onValueChange={(value) => setSelectedAgentType(value as 'personal' | 'system')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal AI</TabsTrigger>
            <TabsTrigger value="system">System AI</TabsTrigger>
          </TabsList>

          {/* Cost Information */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-950 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Estimated Cost</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">${currentAPICost}</div>
                <div className="text-xs text-muted-foreground">
                  ~{estimateTokenCosts(selectedAgentType, selectedTaskType)} tokens
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {selectedAgentType === 'personal' ? 
                'Personal AI uses advanced prompts (+30% tokens)' : 
                'System AI uses standard objective prompts'
              }
            </div>
          </div>

          {/* Agent Information with Dynamic Context */}
          <TabsContent value="personal" className="mt-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 border rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Personal AI Context</h4>
              <div className="text-sm space-y-1">
                <div><strong>User:</strong> {currentUserContext.userName}</div>
                <div><strong>Branch:</strong> {currentUserContext.branchName} ({currentUserContext.branchType})</div>
                <div><strong>Core Values:</strong> {currentUserContext.coreValues.join(', ')}</div>
                {currentUserContext.valueTerms.length > 0 && (
                  <div><strong>Modified Terms:</strong> {currentUserContext.valueTerms.length} custom definitions</div>
                )}
                {currentUserContext.personalPrinciples.length > 0 && (
                  <div><strong>Personal Principles:</strong> {currentUserContext.personalPrinciples.length} custom principles</div>
                )}
              </div>
            </div>
            
            {/* User Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">User Context</label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user context" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} - {user.branchName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950 border rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Personal AI Benefits</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Uses actual values from {currentUserContext.userName}'s governance branch</li>
                <li>• References their specific term definitions and principles</li>
                <li>• Considers their demonstrated governance preferences</li>
                <li>• Provides personalized recommendations aligned with their philosophy</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="system" className="mt-4">
            {currentSystemContext && (
              <div className="p-3 bg-green-50 dark:bg-green-950 border rounded-lg mb-4">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">System AI Context</h4>
                <div className="text-sm space-y-1">
                  <div><strong>Baseline:</strong> {currentSystemContext.branchName}</div>
                  <div><strong>Domain Focus:</strong> {currentSystemContext.domainFocus.join(', ')}</div>
                  <div><strong>Baseline Terms:</strong> {currentSystemContext.baselineTerms.length} definitions</div>
                  <div><strong>Baseline Principles:</strong> {currentSystemContext.baselinePrinciples.length} standards</div>
                  <div><strong>Compliance Rules:</strong> {currentSystemContext.complianceRules.length} requirements</div>
                </div>
              </div>
            )}

            {/* System Baseline Selection */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">Validation Baseline</label>
              <Select 
                value={selectedSystemBaseline || systemInfo.suggested} 
                onValueChange={setSelectedSystemBaseline}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select baseline standard" />
                </SelectTrigger>
                <SelectContent>
                  {systemInfo.validators.map((validator) => (
                    <SelectItem key={validator.key} value={validator.key}>
                      <div className="flex items-center gap-2">
                        <span>{validator.icon}</span>
                        <span>{validator.name}</span>
                        {validator.key === systemInfo.suggested && (
                          <Badge variant="secondary" className="text-xs">Suggested</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {systemInfo.suggested && (
                <div className="mt-1 text-xs text-muted-foreground">
                  <Info className="inline w-3 h-3 mr-1" />
                  {systemInfo.validators.find(v => v.key === systemInfo.suggested)?.description}
                </div>
              )}
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-950 border rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">System AI Benefits</h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Validates against {currentSystemContext?.branchName || 'appropriate DAHAO'} baseline standards</li>
                <li>• Uses community-established principles and definitions</li>
                <li>• Provides objective, domain-appropriate validation</li>
                <li>• Maintains consistency across all governance analysis</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>

        {/* Agent Assignment */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {selectedAgentType === 'personal' ? (
                <User className="w-4 h-4 text-blue-600" />
              ) : (
                <Shield className="w-4 h-4 text-green-600" />
              )}
              <h4 className="font-semibold">{currentAgent.name}</h4>
            </div>
            {status && (
              <Badge variant={status === 'completed' ? 'default' : status === 'failed' ? 'destructive' : 'secondary'}>
                {status === 'analyzing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                {status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                {status === 'failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {status}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">{currentAgent.description}</p>

          <Button 
            onClick={() => assignAgent(currentAgent.id, selectedAgentType)}
            disabled={isAssigned || isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isAssigned ? 'Agent Assigned' : `Assign ${selectedAgentType === 'personal' ? 'Personal' : 'System'} AI`}
          </Button>
        </div>
      </div>

      {/* Assigned Agents Results */}
      {assignedAgents.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Analysis Results</h4>
          {assignedAgents.map((agent, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {agent.agentType === 'personal' ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-green-600" />
                    )}
                    {agent.agentType === 'personal' ? 'Personal AI' : 'System AI'}
                  </CardTitle>
                  <Badge variant={
                    agent.status === 'completed' ? 'default' : 
                    agent.status === 'failed' ? 'destructive' : 'secondary'
                  }>
                    {agent.status === 'analyzing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                    {agent.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {agent.status === 'failed' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {agent.status}
                  </Badge>
                </div>
                <CardDescription>
                  Task: {(getCurrentTaskTypes() as Record<string, string>)[selectedTaskType] || selectedTaskType} | {new Date(agent.assignedAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {agent.status === 'analyzing' && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing with Claude AI...
                  </div>
                )}
                
                {agent.status === 'failed' && (
                  <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="text-sm text-red-800 dark:text-red-200">
                      <strong>Error:</strong> {agent.error}
                    </div>
                  </div>
                )}

                {agent.status === 'completed' && agent.analysis && (
                  <div className="space-y-4">
                    {/* Analysis Summary */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-950 border rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium">Confidence</div>
                          <div>{agent.analysis.result.confidence}%</div>
                        </div>
                        <div>
                          <div className="font-medium">Cost</div>
                          <div>${agent.actualCost?.toFixed(4) || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="font-medium">Tokens Used</div>
                          <div>{agent.actualTokens?.toLocaleString() || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="font-medium">Duration</div>
                          <div>{agent.analysis.timeline.duration}ms</div>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Text */}
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium mb-2">Analysis</h5>
                      <div className="text-sm whitespace-pre-wrap">{agent.analysis.result.analysis}</div>
                    </div>

                    {/* Recommendations */}
                    {agent.analysis.result.recommendations.length > 0 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 border rounded-lg">
                        <h5 className="font-medium mb-2">Recommendations</h5>
                        <ul className="text-sm space-y-1">
                          {agent.analysis.result.recommendations.map((rec, i) => (
                            <li key={i}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Concerns */}
                    {agent.analysis.result.concerns && agent.analysis.result.concerns.length > 0 && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border rounded-lg">
                        <h5 className="font-medium mb-2">Concerns</h5>
                        <ul className="text-sm space-y-1">
                          {agent.analysis.result.concerns.map((concern, i) => (
                            <li key={i}>• {concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}