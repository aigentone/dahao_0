// /lib/mock-data/agent-responses.ts

export const MOCK_AGENT_RESPONSES = {
  // YOUR PERSONAL AI AGENT
  'personal-agent': {
    template: `Personal AI Analysis (Your Values):
✓ Aligns with your extended "transparency" definition
✓ Matches your "ecological-impact" custom value
✓ Consistent with your "artist-first" principles
⚠ Consider your "privacy-protection" preference

Based on YOUR governance branch:
- Uses your modified "fair-distribution" v2.1
- Applies your personal "radical-transparency" extension
- Considers your "minimal-surveillance" requirements

Personal Recommendation: SUPPORT with privacy safeguards
Token Reward: 75 tokens (1.5x personal multiplier)`,
    delay: 2000,
    agent: '@your-personal-ai'
  },

  // SYSTEM AI AGENTS (Baseline only)
  'ethics-compliance': {
    template: `System AI - Ethics Compliance:
⚖️ DAHAO Baseline Governance Check

Core Principles (v1.0):
✓ Transparency: COMPLIANT
✓ Equality: COMPLIANT
✓ Harm Prevention: COMPLIANT
✓ Democratic Process: COMPLIANT

Objective Assessment:
- Uses only baseline definitions
- No personal value modifications
- Neutral evaluation completed

System Validation: APPROVED
Authority Level: Validation`,
    delay: 1800,
    agent: '@system-compliance'
  },

  // OTHER USERS' PERSONAL AI AGENTS
  'maya-personal': {
    template: `Personal AI Analysis (Maya's Values):
🎵 Using Maya's Music-First Governance

Maya's Value Alignment:
✓ Strong "artist-empowerment" match
✓ Aligns with "cultural-preservation"
✓ Supports "fair-compensation" goals
✓ Enhances "creative-attribution"

From Maya's Branch:
- Stricter "appropriation-prevention" rules
- Enhanced "indigenous-protection" criteria
- Focus on "community-benefit"

Maya's Recommendation: STRONG SUPPORT
"This protects creators!"`,
    delay: 2200,
    agent: '@maya-personal-ai'
  },

  'jordan-personal': {
    template: `Personal AI Analysis (Jordan's Values):
💼 Using Jordan's Economic Governance

Jordan's Value Analysis:
⚠ "Market-efficiency" concerns
✓ Meets "innovation-incentive" criteria
⚠ May impact "platform-competition"
✓ Good "ROI-potential"

From Jordan's Branch:
- Heavy "economic-sustainability" weight
- Strict "profitability-metrics"
- Focus on "scalability"

Jordan's Recommendation: CONDITIONAL SUPPORT
"Needs stronger business model"`,
    delay: 1900,
    agent: '@jordan-personal-ai'
  },

  // SPECIALIZED SYSTEM AGENTS
  'domain-expert': {
    template: `System AI - Domain Analysis:
📊 Objective Domain Assessment

Technical Evaluation (Baseline):
✓ Implementation: Feasible
✓ Standards: Met
✓ Best Practices: Aligned
✓ Risk Level: Acceptable

Domain Impact:
- Affects 3 existing rules
- Requires 2 new terms
- Cross-domain effects: Minimal

System Assessment: TECHNICALLY SOUND
No personal values applied`,
    delay: 2500,
    agent: '@system-domain-expert'
  },

  'claude-analysis': {
    template: `System AI - Deep Analysis:
🔍 Comprehensive Baseline Review

Governance Structure Analysis:
- Proposal Type: Major Change (67% threshold)
- Affected Components: 5 rules, 3 terms
- Implementation Complexity: High
- Timeline: 6-9 months

Risk Assessment (Objective):
- Governance Risk: Low
- Technical Risk: Medium
- Adoption Risk: Medium-High

Recommendation: CONDITIONAL APPROVE
Requires phased implementation plan`,
    delay: 3000,
    agent: '@system-analyzer'
  }
};

export type AgentType = keyof typeof MOCK_AGENT_RESPONSES;

export const AVAILABLE_AGENTS = [
  // Your Personal AI
  {
    id: 'personal-agent',
    name: 'Your Personal AI',
    description: 'Uses YOUR complete value system',
    category: 'personal-yours'
  },

  // System AI Agents
  {
    id: 'ethics-compliance',
    name: 'System Compliance Validator',
    description: 'Baseline governance only - no personal values',
    category: 'system'
  },
  {
    id: 'claude-analysis',
    name: 'System Deep Analyzer',
    description: 'Comprehensive objective analysis',
    category: 'system'
  },
  {
    id: 'domain-expert',
    name: 'System Domain Expert',
    description: 'Technical assessment - baseline only',
    category: 'system'
  },

  // Other Users' Personal Agents
  {
    id: 'maya-personal',
    name: "Maya's Personal AI",
    description: 'Music-first values, artist empowerment',
    category: 'personal-others'
  },
  {
    id: 'jordan-personal',
    name: "Jordan's Personal AI",
    description: 'Economic focus, market efficiency',
    category: 'personal-others'
  }
] as const;

export function getRandomAnalysis(agentType: AgentType): string {
  const response = MOCK_AGENT_RESPONSES[agentType];
  return response.template;
}

export function getAgentDelay(agentType: AgentType): number {
  return MOCK_AGENT_RESPONSES[agentType].delay;
}

export function getAgentName(agentType: AgentType): string {
  return MOCK_AGENT_RESPONSES[agentType].agent;
}
