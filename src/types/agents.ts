export interface TokenRecord {
  amount: number;
  timestamp: string;
  source: 'contribution' | 'deployment' | 'governance' | 'roi';
  description: string;
}

export interface CompleteValueSystem {
  coreValues: string[];
  customValues: string[];
  priorityLevel: 'conservative' | 'balanced' | 'progressive';
  inheritedFrom: string; // Parent DAHAO ID
  personalModifications: string[];
}

export interface SystemAuthority {
  level: 'readonly' | 'validation' | 'enforcement' | 'override';
  scope: string[];
  limitations: string[];
}

export interface PersonalAIAgent {
  id: string;
  userId: string;
  name: string;
  type: 'personal';
  valueSystem: CompleteValueSystem;
  personalityTraits: string[];
  decisionMaking: 'consensus' | 'autonomous' | 'hybrid';
  deploymentTargets: string[];
  tokenEarnings: TokenRecord[];
  capabilities: {
    crossBranchDeployment: boolean;
    valueSystemOverride: boolean;
    personalizedReasoning: boolean;
    userSpecificLearning: boolean;
  };
  performance: {
    totalDeployments: number;
    successRate: number;
    userSatisfaction: number;
    tokenValue: number;
  };
  createdAt: string;
  lastActive: string;
  status: 'active' | 'training' | 'offline' | 'pending';
}

export interface SystemAIAgent {
  id: string;
  name: string;
  type: 'system';
  constraints: {
    mainDAHAOValuesOnly: boolean;
    noPersonalModifications: boolean;
    strictCompliance: boolean;
  };
  role: 'validation' | 'compliance' | 'integrity' | 'moderation';
  authority: SystemAuthority;
  capabilities: {
    crossDomainValidation: boolean;
    principleEnforcement: boolean;
    systemMonitoring: boolean;
    emergencyResponse: boolean;
  };
  deployment: {
    scope: 'global' | 'domain' | 'specific';
    priority: 'high' | 'medium' | 'low';
    automated: boolean;
  };
  performance: {
    validationsPerformed: number;
    accuracyRate: number;
    responseTime: number;
    systemReliability: number;
  };
  createdAt: string;
  lastActive: string;
  status: 'active' | 'maintenance' | 'offline';
}

export type AIAgent = PersonalAIAgent | SystemAIAgent;

export interface AgentAssignmentRequest {
  targetId: string; // Discussion, comment, or proposal ID
  agentType: 'personal' | 'system';
  agentId?: string; // Specific agent, or auto-assign if not provided
  requestedBy: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  taskType: 'analysis' | 'validation' | 'verification' | 'moderation' | 'research';
  context?: string;
  expectedTokenReward?: number;
}

export interface AgentAssignmentResult {
  assignmentId: string;
  agent: AIAgent;
  request: AgentAssignmentRequest;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  result?: {
    analysis: string;
    confidence: number;
    recommendation: string;
    tokenReward: number;
    flags?: string[];
  };
  error?: string;
}

export interface TokenRewardProjection {
  baseReward: number;
  qualityMultiplier: number;
  urgencyMultiplier: number;
  complexityMultiplier: number;
  estimatedTotal: number;
  paymentSchedule: {
    immediate: number;
    onCompletion: number;
    onAcceptance: number;
  };
}