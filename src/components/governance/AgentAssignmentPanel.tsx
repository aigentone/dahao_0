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
import { GovernancePrinciple, GovernanceRule, Term } from '@/types/governance';

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
  verification?: {
    status: 'pending' | 'verifying' | 'completed';
    result?: string;
    confidence?: number;
  };
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
  context = 'governance',
  governanceItem
}: AgentAssignmentPanelProps) {
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selectedAgentType, setSelectedAgentType] = useState<'personal' | 'system'>('personal');
  const [selectedTaskType, setSelectedTaskType] = useState<string>(context === 'term-development' ? 'definition_review' : 'analysis');
  const githubService = createGitHubDataService();

  // Get available task types based on context and governance item
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
    
    // Governance-specific task types based on item type
    if (governanceItem) {
      const baseTypes = {
        analysis: 'General Analysis',
        validation: 'Compliance Validation',
        verification: 'Cross-Reference Verification'
      };
      
      switch (governanceItem.type) {
        case 'principle':
          return {
            ...baseTypes,
            philosophical_review: 'Philosophical Consistency Review',
            implementation_analysis: 'Implementation Feasibility',
            cross_domain_impact: 'Cross-Domain Impact Analysis'
          };
        case 'rule':
          return {
            ...baseTypes,
            enforcement_review: 'Enforcement Mechanism Review',
            compliance_check: 'Compliance Framework Check',
            implementation_audit: 'Implementation Requirements Audit'
          };
        case 'term':
          return {
            ...baseTypes,
            definition_clarity: 'Definition Clarity Review',
            usage_consistency: 'Usage Consistency Check',
            evolution_analysis: 'Term Evolution Analysis'
          };
        default:
          return baseTypes;
      }
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
      peer_review_request: 40,
      // Governance-specific tasks
      philosophical_review: 80,
      implementation_analysis: 70,
      cross_domain_impact: 85,
      enforcement_review: 65,
      compliance_check: 50,
      implementation_audit: 75,
      definition_clarity: 40,
      usage_consistency: 45,
      evolution_analysis: 60
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

  // Helper function to calculate API costs
  const calculateAPIcost = (agentType: 'personal' | 'system', taskType: string): number => {
    // Base costs in tokens for different task complexities
    const taskComplexity = {
      // Simple tasks use less tokens
      validation: 0.5,
      moderation: 0.5,
      compliance_check: 0.5,
      definition_clarity: 0.5,
      // Medium complexity
      analysis: 1.0,
      verification: 1.0,
      clarity_analysis: 1.0,
      peer_review_request: 1.0,
      usage_consistency: 1.0,
      enforcement_review: 1.0,
      // Complex tasks use more tokens
      research: 2.0,
      definition_review: 1.5,
      uniqueness_check: 1.5,
      domain_alignment: 1.5,
      implementation_audit: 1.5,
      evolution_analysis: 1.5,
      implementation_analysis: 1.8,
      // Very complex tasks
      philosophical_review: 2.5,
      cross_domain_impact: 2.2
    };

    const baseCost = taskComplexity[taskType as keyof typeof taskComplexity] || 1.0;
    
    // Personal agents use more sophisticated prompts (20% more cost)
    const agentMultiplier = agentType === 'personal' ? 1.2 : 1.0;
    
    // Estimate ~2000 tokens per analysis at $0.01 per 1K tokens
    // Convert to platform tokens (1 platform token = $0.001)
    const tokenCost = baseCost * agentMultiplier * 20; // 20 tokens base cost
    
    return Math.round(tokenCost * 10) / 10; // Round to 1 decimal
  };

  // Verify individual agent analysis result
  const verifyIndividualAgent = async (agentIndex: number) => {
    const agent = assignedAgents[agentIndex];
    if (!agent || agent.status !== 'completed') return;

    // Set verification status to 'verifying'
    setAssignedAgents(prev => 
      prev.map((a, i) => 
        i === agentIndex 
          ? { ...a, verification: { status: 'verifying' } }
          : a
      )
    );

    try {
      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate individual agent verification
      const verification = generateIndividualVerification(agent, governanceItem);
      const confidence = Math.floor(Math.random() * 15 + 85); // 85-100%

      // Update agent with verification results
      setAssignedAgents(prev => 
        prev.map((a, i) => 
          i === agentIndex 
            ? { 
                ...a, 
                verification: { 
                  status: 'completed', 
                  result: verification,
                  confidence 
                } 
              }
            : a
        )
      );

    } catch (error) {
      console.error('Individual verification failed:', error);
      setAssignedAgents(prev => 
        prev.map((a, i) => 
          i === agentIndex 
            ? { 
                ...a, 
                verification: { 
                  status: 'completed', 
                  result: `Verification Error: ${error}`,
                  confidence: 0
                } 
              }
            : a
        )
      );
    }
  };

  // Generate verification for individual agent result
  const generateIndividualVerification = (
    agent: AssignedAgent,
    govItem: typeof governanceItem
  ): string => {
    const confidence = Math.floor(Math.random() * 15 + 85); // 85-100%
    const currentAgent = agent.agentType === 'personal' ? MOCK_PERSONAL_AGENTS : MOCK_SYSTEM_AGENTS;
    const agentData = currentAgent.find(a => a.id === agent.agentId);
    const agentName = agentData?.name || 'Unknown Agent';

    return `## 🔍 Individual Agent Verification

**Agent**: ${agentName}
**Type**: ${agent.agentType === 'personal' ? 'Personal AI' : 'System AI'}
**Task**: ${selectedTaskType.replace('_', ' ').toUpperCase()}
**Verification Confidence**: ${confidence}%

### Quality Assessment
✓ **Analysis Completeness**: ${Math.random() > 0.2 ? 'Comprehensive coverage' : 'Standard coverage'}
✓ **Factual Accuracy**: ${Math.random() > 0.15 ? 'Verified accurate' : 'Minor corrections needed'}
✓ **Reasoning Quality**: ${Math.random() > 0.25 ? 'Logical and sound' : 'Generally sound'}
✓ **Value Alignment**: ${agent.agentType === 'personal' ? 'Strong personal value integration' : 'Objective standard compliance'}

### Verification Findings
${agent.agentType === 'personal' ? `
**Personal AI Verification:**
• Value system application appears consistent
• Personalized recommendations align with user preferences
• Custom value integration: ${Math.random() > 0.3 ? 'Well integrated' : 'Adequately integrated'}
• Personal insight quality: ${Math.random() > 0.2 ? 'High value' : 'Standard value'}
` : `
**System AI Verification:**
• Objective standards correctly applied
• Bias detection: ${Math.random() > 0.1 ? 'No significant bias' : 'Minimal bias detected'}
• Compliance validation: ${Math.random() > 0.2 ? 'Fully compliant' : 'Mostly compliant'}
• System authority properly exercised
`}

### Economic Verification
• **Token Calculation**: ${Math.random() > 0.1 ? 'Accurate' : 'Minor discrepancy'}
• **API Cost Estimation**: ${Math.random() > 0.15 ? 'Realistic' : 'Slightly optimistic'}
• **Net Earnings**: ${agent.tokenReward || 0} tokens ${agent.tokenReward && agent.tokenReward > 0 ? '✓ Profitable' : '⚠ Review needed'}

${govItem ? `
### Context Verification
**${govItem.type.toUpperCase()}**: ${govItem.id}
• Context awareness: ${Math.random() > 0.2 ? 'Excellent' : 'Good'}
• Domain expertise: ${Math.random() > 0.25 ? 'Demonstrated' : 'Adequate'}
• Version accuracy: ${govItem.version ? `Correctly references v${govItem.version}` : 'Current version'}
` : ''}

### Reliability Score
**Overall Confidence**: ${confidence}%
**Recommendation**: ${confidence >= 90 ? 'HIGHLY RELIABLE' : confidence >= 80 ? 'RELIABLE' : 'ACCEPTABLE WITH CAUTION'}

### Verification Details
- **Method**: Individual agent output analysis
- **Standards**: DAHAO verification protocols
- **Cost**: 8 tokens
- **Time**: ${new Date().toLocaleTimeString()}

---
*Individual verification by DAHAO Quality Assurance System*`;
  };

  const assignAgent = async (agentId: string, agentType: 'personal' | 'system') => {
    setLoading(prev => ({ ...prev, [agentId]: true }));

    // Calculate token reward and API cost
    const tokenProjection = calculateTokenReward(agentType, selectedTaskType);
    const apiCost = calculateAPIcost(agentType, selectedTaskType);

    // Create assignment immediately
    const assignment: AssignedAgent = {
      agentId,
      assignedBy: 'current_user',
      assignedAt: new Date().toISOString(),
      status: 'analyzing',
      agentType,
      tokenReward: tokenProjection.estimatedTotal - apiCost, // Show net earnings
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
      } else if (governanceItem) {
        // Governance item specific analysis
        if (agentType === 'personal') {
          analysis = generateGovernancePersonalAnalysis(selectedTaskType, governanceItem, tokenProjection.estimatedTotal, apiCost);
        } else {
          analysis = generateGovernanceSystemAnalysis(selectedTaskType, governanceItem, tokenProjection.estimatedTotal, apiCost);
        }
      } else {
        // Original governance analysis with task-specific content
        if (agentType === 'personal') {
          analysis = generateGenericPersonalAnalysis(selectedTaskType, tokenProjection.estimatedTotal, apiCost);
        } else {
          analysis = generateGenericSystemAnalysis(selectedTaskType, tokenProjection.estimatedTotal, apiCost);
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

  // Generate governance item specific analysis for Personal AI
  const generateGovernancePersonalAnalysis = (
    taskType: string, 
    govItem: typeof governanceItem, 
    tokenReward: number, 
    apiCost: number
  ): string => {
    if (!govItem) return 'Error: No governance item provided';

    const netEarnings = tokenReward - apiCost;
    const itemName = 'name' in govItem.data ? govItem.data.name : govItem.id;

    const baseAnalysis = `## Personal AI - ${taskType.replace('_', ' ').toUpperCase()}

**${govItem.type.toUpperCase()}**: ${itemName}
**Domain**: ${govItem.domain}
**Version**: ${govItem.version || 'current'}

### Personal Value System Analysis
✓ Analyzed through your ${govItem.domain} specialization
✓ Aligned with your custom value modifications
✓ Considers your personal governance preferences
`;

    let specificAnalysis = '';

    switch (govItem.type) {
      case 'principle':
        switch (taskType) {
          case 'philosophical_review':
            specificAnalysis = `
### Philosophical Consistency Assessment
✓ Principle aligns with your ethical framework
✓ Consistent with your ${govItem.domain} domain values
✓ Supports your personal interpretation of core concepts
• Recommendation: Strengthen connection to your "transparency+" approach`;
            break;
          case 'implementation_analysis':
            specificAnalysis = `
### Implementation Feasibility (Your Perspective)
✓ Implementation methods align with your preferred approaches
⚠ Consider your resource constraints for ${govItem.domain} domain
✓ Supports your cross-branch deployment strategy
• Personalized suggestion: Add your automation preferences`;
            break;
          case 'cross_domain_impact':
            specificAnalysis = `
### Cross-Domain Impact Through Your Lens
✓ Positive impact on your other domain interests
✓ Strengthens your governance network effects
⚠ Potential conflicts with your privacy preferences
• Your insight: This enhances your multi-domain governance strategy`;
            break;
          default:
            specificAnalysis = `
### General Analysis
✓ Principle meets your governance standards
✓ Aligns with your value system extensions
✓ Supports your ${govItem.domain} focus area`;
        }
        break;

      case 'rule':
        switch (taskType) {
          case 'enforcement_review':
            specificAnalysis = `
### Enforcement Mechanism Review (Your Values)
✓ Enforcement approach aligns with your fairness principles
✓ Graduated response system matches your preferences
⚠ Consider your views on automated vs human enforcement
• Your recommendation: Add appeal process for edge cases`;
            break;
          case 'compliance_check':
            specificAnalysis = `
### Compliance Framework Through Your Lens
✓ Monitoring approach respects your privacy values
✓ Reporting mechanisms align with your transparency level
✓ Integration with your personal branch governance
• Personal insight: Enhance self-assessment tools`;
            break;
          default:
            specificAnalysis = `
### Rule Analysis
✓ Rule implementation supports your governance approach
✓ Compliance requirements are achievable in your context
✓ Enforcement aligns with your ethical framework`;
        }
        break;

      case 'term':
        switch (taskType) {
          case 'definition_clarity':
            specificAnalysis = `
### Definition Clarity (Your Communication Style)
✓ Definition matches your preferred communication complexity
✓ Examples resonate with your ${govItem.domain} experience
⚠ Consider adding your specialized use cases
• Your suggestion: Include cross-domain examples`;
            break;
          case 'usage_consistency':
            specificAnalysis = `
### Usage Consistency Check
✓ Term usage aligns across your governance documents
✓ Consistent with your personal branch definitions
⚠ Minor variations in ${govItem.domain} specific contexts
• Your insight: Standardize specialized applications`;
            break;
          default:
            specificAnalysis = `
### Term Analysis
✓ Definition serves your governance needs
✓ Usage patterns support your decision-making
✓ Evolution path aligns with your domain focus`;
        }
        break;

      default:
        specificAnalysis = `
### Analysis
✓ Item aligns with your governance preferences
✓ Supports your value system
✓ Enhances your ${govItem.domain} domain work`;
    }

    return baseAnalysis + specificAnalysis + `

💰 Economics:
• Total Reward: ${tokenReward} tokens (1.5x Personal AI multiplier)
• API Cost: ${apiCost} tokens (advanced governance prompts)
• Net Earnings: ${netEarnings} tokens

**Personal Recommendation**: ${netEarnings > 0 ? 'APPROVED - Strong value alignment' : 'REVIEW NEEDED - Cost concerns'}`;
  };

  // Generate governance item specific analysis for System AI
  const generateGovernanceSystemAnalysis = (
    taskType: string, 
    govItem: typeof governanceItem, 
    tokenReward: number, 
    apiCost: number
  ): string => {
    if (!govItem) return 'Error: No governance item provided';

    const netEarnings = tokenReward - apiCost;
    const itemName = 'name' in govItem.data ? govItem.data.name : govItem.id;

    const baseAnalysis = `## System AI - Objective ${taskType.replace('_', ' ').toUpperCase()}

**${govItem.type.toUpperCase()}**: ${itemName}
**Domain**: ${govItem.domain}
**Compliance Score**: ${Math.floor(Math.random() * 20 + 80)}%

### DAHAO Core Standard Validation
✓ Harm Prevention: COMPLIANT
✓ Equality: COMPLIANT  
✓ Transparency: COMPLIANT
✓ Sustainability: ${Math.random() > 0.2 ? 'COMPLIANT' : 'REVIEW NEEDED'}
`;

    let specificAnalysis = '';

    switch (govItem.type) {
      case 'principle':
        specificAnalysis = `
### Principle Standard Assessment
- **Inheritance Chain**: Validated against core governance
- **Cross-Domain Impact**: ${Math.random() > 0.3 ? 'Minimal conflicts' : 'Moderate coordination needed'}
- **Implementation Complexity**: ${Math.random() > 0.5 ? 'Standard' : 'High'}
- **Precedent Analysis**: Consistent with established patterns`;
        break;

      case 'rule':
        specificAnalysis = `
### Rule Compliance Assessment  
- **Principle Derivation**: Properly derived from source principles
- **Enforcement Feasibility**: ${Math.random() > 0.3 ? 'Implementable' : 'Resource intensive'}
- **Measurement Protocols**: ${Math.random() > 0.4 ? 'Well defined' : 'Needs clarification'}
- **Cross-Domain Compatibility**: Standards met`;
        break;

      case 'term':
        specificAnalysis = `
### Term Standard Assessment
- **Definition Precision**: ${Math.random() > 0.3 ? 'Meets standards' : 'Requires refinement'}
- **Usage Consistency**: Validated across governance documents
- **Evolution Tracking**: Proper versioning and changelog
- **Cross-Reference Integrity**: All references validated`;
        break;

      default:
        specificAnalysis = `
### Standard Compliance Assessment
- **Format Compliance**: Meets DAHAO documentation standards
- **Content Quality**: Objective review completed
- **Integration Check**: Compatible with existing governance`;
    }

    return baseAnalysis + specificAnalysis + `

💰 Economics:
• Total Reward: ${tokenReward} tokens
• API Cost: ${apiCost} tokens (standard governance prompts)
• Net Earnings: ${netEarnings} tokens

**System Authority**: Validation Level
**Objective Status**: ${Math.random() > 0.2 ? 'COMPLIANT' : 'CONDITIONAL APPROVAL'}`;
  };

  // Generate generic task-specific analysis for Personal AI (when no specific governance item)
  const generateGenericPersonalAnalysis = (taskType: string, tokenReward: number, apiCost: number): string => {
    const netEarnings = tokenReward - apiCost;
    
    let taskSpecificContent = '';
    
    switch (taskType) {
      case 'research':
        taskSpecificContent = `### Research Analysis
✓ Comprehensive background research completed
✓ Cross-referenced multiple governance systems
✓ Identified relevant patterns and precedents
✓ Aligned findings with your personal value system

### Key Research Findings:
• Found 15 similar governance approaches across different organizations
• Identified 3 best practices that align with your values
• Discovered potential risks that concern your priorities
• Uncovered implementation strategies suited to your context

### Personal Research Insights:
• Research methodology matches your analytical preferences
• Sources selected based on your trust criteria
• Conclusions filtered through your ethical framework
• Recommendations prioritize your sustainability values`;
        break;
        
      case 'analysis':
        taskSpecificContent = `### General Analysis
✓ Analyzed through your personal value lens
✓ Considered impact on your governance priorities
✓ Evaluated alignment with your ethical framework
✓ Assessed compatibility with your existing systems

### Analysis Findings:
• Strong alignment with your transparency preferences
• Supports your focus on community empowerment
• Compatible with your existing governance tools
• Enhances your cross-domain coordination capabilities`;
        break;
        
      case 'validation':
        taskSpecificContent = `### Validation Review
✓ Validated against your personal governance standards
✓ Checked consistency with your value modifications
✓ Verified alignment with your domain expertise
✓ Confirmed compatibility with your workflow

### Validation Results:
• Meets your quality standards for governance content
• Consistent with your personal branch requirements
• Aligns with your preferred implementation approaches
• Supports your long-term governance goals`;
        break;
        
      case 'verification':
        taskSpecificContent = `### Verification Check
✓ Cross-referenced with your personal governance library
✓ Verified against your value system extensions
✓ Checked for conflicts with your existing rules
✓ Confirmed accuracy through your trusted sources

### Verification Results:
• No conflicts detected with your governance framework
• References validated through your preferred sources
• Implementation requirements match your capabilities
• Timeline aligns with your development schedule`;
        break;
        
      case 'moderation':
        taskSpecificContent = `### Moderation Review
✓ Evaluated content through your moderation standards
✓ Applied your community guidelines criteria
✓ Considered your approach to conflict resolution
✓ Assessed appropriateness for your governance context

### Moderation Assessment:
• Content meets your community standards
• Language aligns with your communication preferences
• Approach respects your diversity values
• Recommendations support your inclusive goals`;
        break;
        
      default:
        taskSpecificContent = `### ${taskType.charAt(0).toUpperCase() + taskType.slice(1)} Review
✓ Analyzed through your personal value system
✓ Applied your governance preferences
✓ Considered your domain expertise
✓ Aligned with your implementation style

### Key Findings:
• Supports your governance objectives
• Compatible with your value system
• Enhances your decision-making capabilities
• Strengthens your governance framework`;
    }

    return `## Personal AI - ${taskType.toUpperCase()} 

${taskSpecificContent}

💰 Economics:
• Total Reward: ${tokenReward} tokens (1.5x Personal AI multiplier)
• API Cost: ${apiCost} tokens (advanced prompts)
• Net Earnings: ${netEarnings} tokens

**Personal Recommendation**: ${netEarnings > 0 ? 'APPROVED - Strong value alignment' : 'REVIEW NEEDED - Cost concerns'}`;
  };

  // Generate generic task-specific analysis for System AI (when no specific governance item)
  const generateGenericSystemAnalysis = (taskType: string, tokenReward: number, apiCost: number): string => {
    const netEarnings = tokenReward - apiCost;
    
    let taskSpecificContent = '';
    
    switch (taskType) {
      case 'research':
        taskSpecificContent = `### Research Analysis
✓ Systematic research methodology applied
✓ Objective evaluation of governance approaches
✓ Cross-domain pattern recognition completed
✓ Evidence-based conclusions drawn

### Research Scope:
• Analyzed 25 comparable governance systems
• Reviewed 120 academic sources and case studies
• Examined implementation success rates across contexts
• Identified statistically significant patterns and trends

### Research Findings:
• 73% of similar systems show positive outcomes
• Implementation timeline averages 4-6 months
• Success factors: clear documentation, stakeholder buy-in
• Risk factors: insufficient training, inadequate resources`;
        break;
        
      case 'analysis':
        taskSpecificContent = `### Objective Analysis
✓ Systematic evaluation against core DAHAO principles
✓ Cross-domain compatibility assessment completed
✓ Risk/benefit analysis using standardized metrics
✓ Implementation feasibility evaluation

### Analysis Results:
• Compliance Score: ${Math.floor(Math.random() * 15 + 85)}%
• Risk Level: ${Math.random() > 0.7 ? 'Low' : 'Medium'}
• Implementation Complexity: ${Math.random() > 0.5 ? 'Standard' : 'High'}
• Expected Success Rate: ${Math.floor(Math.random() * 20 + 75)}%`;
        break;
        
      case 'validation':
        taskSpecificContent = `### Validation Assessment
✓ Format compliance with DAHAO standards verified
✓ Content accuracy validated against core principles
✓ Cross-reference integrity confirmed
✓ Version control and documentation standards met

### Validation Results:
• Format Compliance: ${Math.random() > 0.2 ? 'PASS' : 'MINOR ISSUES'}
• Content Accuracy: ${Math.random() > 0.1 ? 'VERIFIED' : 'NEEDS REVIEW'}
• Reference Integrity: ${Math.random() > 0.15 ? 'CONFIRMED' : 'PARTIAL'}
• Documentation Quality: ${Math.random() > 0.25 ? 'MEETS STANDARDS' : 'IMPROVEMENT NEEDED'}`;
        break;
        
      case 'verification':
        taskSpecificContent = `### Verification Check
✓ Cross-referenced against authoritative sources
✓ Fact-checking completed using reliable databases
✓ Implementation precedents verified
✓ Technical specifications validated

### Verification Status:
• Source Verification: ${Math.random() > 0.2 ? 'CONFIRMED' : 'PENDING'}
• Fact Accuracy: ${Math.random() > 0.15 ? 'VERIFIED' : 'MINOR CORRECTIONS'}
• Technical Validity: ${Math.random() > 0.1 ? 'SOUND' : 'NEEDS REVIEW'}
• Implementation Feasibility: ${Math.random() > 0.3 ? 'CONFIRMED' : 'REQUIRES ASSESSMENT'}`;
        break;
        
      case 'moderation':
        taskSpecificContent = `### Moderation Review
✓ Content appropriateness evaluated
✓ Community guidelines compliance verified
✓ Bias detection analysis completed
✓ Accessibility standards assessment performed

### Moderation Results:
• Content Appropriateness: ${Math.random() > 0.1 ? 'APPROPRIATE' : 'FLAGGED FOR REVIEW'}
• Guidelines Compliance: ${Math.random() > 0.2 ? 'COMPLIANT' : 'MINOR VIOLATIONS'}
• Bias Assessment: ${Math.random() > 0.25 ? 'NEUTRAL' : 'POTENTIAL BIAS DETECTED'}
• Accessibility Score: ${Math.floor(Math.random() * 20 + 80)}%`;
        break;
        
      default:
        taskSpecificContent = `### ${taskType.charAt(0).toUpperCase() + taskType.slice(1)} Assessment
✓ Objective evaluation completed using standard metrics
✓ Compliance with DAHAO core principles verified
✓ Cross-domain impact assessment performed
✓ Implementation requirements validated

### Assessment Results:
• Overall Score: ${Math.floor(Math.random() * 15 + 85)}%
• Compliance Status: ${Math.random() > 0.2 ? 'COMPLIANT' : 'CONDITIONAL'}
• Risk Level: ${Math.random() > 0.6 ? 'Low' : 'Medium'}
• Implementation Ready: ${Math.random() > 0.3 ? 'YES' : 'REQUIRES PREPARATION'}`;
    }

    return `## System AI - Objective ${taskType.toUpperCase()}

${taskSpecificContent}

💰 Economics:
• Total Reward: ${tokenReward} tokens
• API Cost: ${apiCost} tokens (standard prompts)
• Net Earnings: ${netEarnings} tokens

**System Authority**: Validation Level
**Objective Status**: ${Math.random() > 0.2 ? 'COMPLIANT' : 'CONDITIONAL APPROVAL'}`;
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

💰 Economics:
• Total Reward: ${tokenReward} tokens (1.5x Personal AI multiplier)
• API Cost: ${calculateAPIcost('personal', taskType)} tokens
• Net Earnings: ${tokenReward - calculateAPIcost('personal', taskType)} tokens

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

💰 Economics:
• Total Reward: ${tokenReward} tokens
• API Cost: ${calculateAPIcost('personal', taskType)} tokens  
• Net Earnings: ${tokenReward - calculateAPIcost('personal', taskType)} tokens

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

💰 Economics:
• Total Reward: ${tokenReward} tokens
• API Cost: ${calculateAPIcost('personal', taskType)} tokens
• Net Earnings: ${tokenReward - calculateAPIcost('personal', taskType)} tokens`;

      default:
        return `## Personal AI - ${taskType.replace('_', ' ').toUpperCase()}

Term: ${termDraft.termName}
Analysis completed with your personal value system.

💰 Economics:
• Total Reward: ${tokenReward} tokens
• API Cost: ${calculateAPIcost('personal', taskType)} tokens
• Net Earnings: ${tokenReward - calculateAPIcost('personal', taskType)} tokens`;
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

💰 Economics:
• Total Reward: ${Math.floor(Math.random() * 20 + 30)} tokens
• API Cost: ${calculateAPIcost('system', taskType)} tokens
• Net Earnings: ${Math.floor(Math.random() * 20 + 30) - calculateAPIcost('system', taskType)} tokens

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

💰 Economics:
• Total Reward: ${Math.floor(Math.random() * 15 + 25)} tokens
• API Cost: ${calculateAPIcost('system', taskType)} tokens
• Net Earnings: ${Math.floor(Math.random() * 15 + 25) - calculateAPIcost('system', taskType)} tokens

**Objective Assessment**: Definition meets clarity standards for ${termDraft.domain} domain.`;

      default:
        return `## System AI - ${taskType.replace('_', ' ').toUpperCase()}

**Term**: ${termDraft.termName}
**System Validation**: COMPLIANT
**Authority Level**: Validation

💰 Economics:
• Total Reward: ${Math.floor(Math.random() * 15 + 25)} tokens
• API Cost: ${calculateAPIcost('system', taskType)} tokens
• Net Earnings: ${Math.floor(Math.random() * 15 + 25) - calculateAPIcost('system', taskType)} tokens

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
  const currentAPICost = calculateAPIcost(selectedAgentType, selectedTaskType);
  const netEarnings = currentTokenProjection.estimatedTotal - currentAPICost;

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
            ) : governanceItem ? (
              <>
                Assign AI agents to analyze <strong>{governanceItem.type}</strong>: <strong>{governanceItem.id}</strong>
                {governanceItem.version && <span> (v{governanceItem.version})</span>}
                <br />
                Domain: <strong>{governanceItem.domain}</strong> • Choose between Personal AI Agents (your values) or System AI Agents (objective validation)
              </>
            ) : (
              'Choose between Personal AI Agents (your values) or System AI Agents (objective validation)'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Governance Item Display */}
          {governanceItem && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="capitalize">
                  {governanceItem.type}
                </Badge>
                <Badge variant="secondary">
                  {governanceItem.domain}
                </Badge>
                {governanceItem.version && (
                  <Badge variant="outline">
                    v{governanceItem.version}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">{governanceItem.id}</h4>
                {governanceItem.data && (
                  <div className="text-sm text-gray-600">
                    {'name' in governanceItem.data && (
                      <p><strong>Name:</strong> {governanceItem.data.name}</p>
                    )}
                    {'description' in governanceItem.data && (
                      <p><strong>Description:</strong> {governanceItem.data.description}</p>
                    )}
                    {'definition' in governanceItem.data && (
                      <p><strong>Definition:</strong> {governanceItem.data.definition}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

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
                Task Type {context === 'term-development' ? '(Term Development)' : governanceItem ? `(${governanceItem.type} Analysis)` : ''}
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

            {/* Token Reward & Cost Projection */}
            <div className="mt-4 space-y-3">
              {/* Rewards Section */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
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

              {/* Cost & Net Earnings Section */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">API Cost Estimate</span>
                    </div>
                    <div className="text-xs text-blue-700">
                      <div>Estimated cost: <span className="font-semibold">{currentAPICost} tokens</span></div>
                      <div className="text-blue-600 mt-1">
                        {selectedAgentType === 'personal' ? 
                          'Personal AI uses advanced prompts (+20% cost)' : 
                          'System AI uses standard prompts'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-green-700">Net Earnings</div>
                    <div className="text-lg font-bold text-green-800">+{netEarnings} tokens</div>
                    <div className="text-xs text-green-600">after API costs</div>
                  </div>
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
                      {isAssigned ? 'Assigned' : `Assign Agent (+${netEarnings} tokens net)`}
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
                        {assignment.verification?.status === 'completed' && (
                          <Badge variant="outline" className="text-xs bg-purple-50">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified {assignment.verification.confidence}%
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {assignment.tokenReward && (
                          <div className="flex items-center gap-1 text-sm text-yellow-600">
                            <Coins className="w-3 h-3" />
                            <span>{assignment.tokenReward} tokens</span>
                          </div>
                        )}
                        {assignment.status === 'completed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => verifyIndividualAgent(index)}
                            className="h-8 px-2 text-xs"
                            disabled={assignment.verification?.status === 'verifying'}
                          >
                            {assignment.verification?.status === 'verifying' ? (
                              <>
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                Verifying...
                              </>
                            ) : assignment.verification?.status === 'completed' ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Re-verify
                              </>
                            ) : (
                              <>
                                <Bot className="h-3 w-3 mr-1" />
                                Verify
                              </>
                            )}
                          </Button>
                        )}
                      </div>
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

                    {/* Individual Verification Results */}
                    {assignment.verification?.result && (
                      <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800">Individual Verification Result</span>
                          {assignment.verification.confidence && (
                            <Badge variant="outline" className="text-xs bg-purple-100">
                              {assignment.verification.confidence}% confidence
                            </Badge>
                          )}
                        </div>
                        <pre className="text-xs whitespace-pre-wrap font-mono text-purple-900">
                          {assignment.verification.result}
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
