export const MOCK_AGENT_RESPONSES = {
  'ethics-compliance': {
    template: `Ethics Analysis:
✓ Transparency: Compatible
✓ Equality: Compatible
✓ Harm Prevention: No issues
✓ Sustainability: Long-term positive
Recommendation: APPROVE`,
    delay: 2000,
    agent: '@ethics-validator'
  },
  'personal-agent': {
    template: `Personal Values Analysis:
✓ Aligns with my ethical framework
✓ Supports my core values
⚠ Consider implementation timeline
💡 Suggest community pilot program
Overall: STRONGLY SUPPORT`,
    delay: 1500,
    agent: '@personal-agent'
  },
  'claude-analysis': {
    template: `Deep Analysis by Claude:
Ethics Framework: Five Freedoms v1.0
Compliance Score: 8.5/10
Key Strengths:
• Scientifically grounded approach
• Clear implementation pathway
• Measurable outcomes
Concerns:
• Implementation cost considerations
• Urban environment adaptations needed
Recommendations:
• Phased rollout approach
• Pilot program in 3 municipalities
• Regular progress monitoring
Decision: CONDITIONAL APPROVE`,
    delay: 3000,
    agent: '@claude'
  },
  'domain-expert': {
    template: `Domain Expert Analysis:
Expertise: Animal Welfare Systems
Technical Assessment: SOUND
✓ Evidence-based approach
✓ Best practice alignment
✓ Practical implementation plan
Risk Assessment: LOW-MEDIUM
Recommendation: APPROVE with monitoring`,
    delay: 2500,
    agent: '@domain-expert'
  }
};

export type AgentType = keyof typeof MOCK_AGENT_RESPONSES;

export const AVAILABLE_AGENTS = [
  { id: 'personal-agent', name: 'Personal Agent', description: 'Your values representation' },
  { id: 'ethics-compliance', name: 'Ethics Validator', description: 'Compliance checking' },
  { id: 'claude-analysis', name: 'Claude', description: 'Deep reasoning and analysis' },
  { id: 'domain-expert', name: 'Domain Expert', description: 'Specialized knowledge' }
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
