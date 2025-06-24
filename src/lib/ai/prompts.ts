// AI Prompt Templates for DAHAO Governance Analysis
// Supports Personal AI (user values) vs System AI (objective) distinction

import { PromptContext } from './types';

export const TASK_DEFINITIONS = {
  'definition-clarity': {
    name: 'Definition Clarity Review',
    description: 'Analyze how clearly a term is defined and suggest improvements',
    systemPrompt: 'Review definition clarity using objective standards',
    personalPrompt: 'Review definition clarity considering user\'s communication preferences'
  },
  'usage-consistency': {
    name: 'Usage Consistency Check',
    description: 'Check how consistently a term is used across governance elements',
    systemPrompt: 'Verify consistent usage across all governance elements',
    personalPrompt: 'Check consistency while considering user\'s contextual priorities'
  },
  'evolution-analysis': {
    name: 'Evolution Analysis',
    description: 'Analyze how an element has changed over time and predict future needs',
    systemPrompt: 'Provide objective analysis of element evolution patterns',
    personalPrompt: 'Analyze evolution considering user\'s values and priorities'
  },
  'philosophical-consistency': {
    name: 'Philosophical Consistency Review',
    description: 'Check if principles align with core philosophical foundations',
    systemPrompt: 'Verify alignment with DAHAO baseline principles',
    personalPrompt: 'Check alignment with user\'s philosophical framework'
  },
  'implementation-feasibility': {
    name: 'Implementation Feasibility Analysis',
    description: 'Assess how practical it would be to implement this principle',
    systemPrompt: 'Provide objective assessment of implementation challenges',
    personalPrompt: 'Assess feasibility considering user\'s implementation preferences'
  },
  'cross-domain-impact': {
    name: 'Cross-Domain Impact Assessment',
    description: 'Analyze how this principle affects other governance domains',
    systemPrompt: 'Map impacts across all governance domains objectively',
    personalPrompt: 'Focus on impacts relevant to user\'s domain interests'
  },
  'enforcement-mechanism': {
    name: 'Enforcement Mechanism Review',
    description: 'Evaluate how well a rule can be enforced in practice',
    systemPrompt: 'Analyze enforcement mechanisms using standard criteria',
    personalPrompt: 'Evaluate enforcement considering user\'s enforcement philosophy'
  },
  'compliance-framework': {
    name: 'Compliance Framework Check',
    description: 'Check if rule fits within existing compliance frameworks',
    systemPrompt: 'Verify compliance framework integration objectively',
    personalPrompt: 'Check framework fit considering user\'s compliance priorities'
  },
  'implementation-requirements': {
    name: 'Implementation Requirements Audit',
    description: 'Detail what would be needed to implement this rule',
    systemPrompt: 'List implementation requirements comprehensively',
    personalPrompt: 'Focus on requirements relevant to user\'s implementation style'
  },
  'general-analysis': {
    name: 'General Analysis',
    description: 'Comprehensive analysis of the governance element',
    systemPrompt: 'Provide comprehensive objective analysis',
    personalPrompt: 'Provide analysis tailored to user\'s interests and values'
  }
};

export function buildPersonalAIPrompt(context: PromptContext): string {
  const taskDef = TASK_DEFINITIONS[context.task.taskType as keyof typeof TASK_DEFINITIONS];
  
  return `You are a Personal AI assistant analyzing governance for a user with these specific values and preferences:

USER PROFILE:
- Name: ${context.user.name}
- Governance Branch: ${context.branch.name}
- Core Values: ${context.user.values.join(', ')}
- Analysis Focus: ${taskDef?.personalPrompt || 'Provide analysis aligned with user values'}

TASK: ${context.task.description}
Context: ${context.task.context || 'General governance analysis'}

GOVERNANCE ELEMENT TO ANALYZE:
Type: ${context.element.type.toUpperCase()}
Name: ${context.element.name}
Version: ${context.element.version}
Branch: ${context.branch.name}

Element Data:
${JSON.stringify(context.element.data, null, 2)}

INSTRUCTIONS:
1. Analyze this ${context.element.type} from the perspective of the user's values: ${context.user.values.join(', ')}
2. Consider how this element aligns with or conflicts with their governance branch: ${context.branch.name}
3. Provide recommendations that honor their value system
4. Use a tone that matches their governance style
5. Include specific references to their value system when relevant
6. Suggest modifications that would better align with their preferences

RESPONSE FORMAT:
🤖 Personal AI Analysis (${context.user.name}'s Values):

**Value Alignment Check:**
- [Check each user value against the element]

**Branch Compatibility:**
- [How does this fit with their governance branch?]

**Personal Recommendations:**
- [Specific suggestions based on their values]

**Potential Concerns:**
- [Any conflicts with their value system]

**Confidence Level:** [0-100]%

Remember: This is a PERSONAL AI analysis tailored specifically for ${context.user.name}'s values and governance preferences. Provide analysis that serves their specific needs and worldview.`;
}

export function buildSystemAIPrompt(context: PromptContext): string {
  const taskDef = TASK_DEFINITIONS[context.task.taskType as keyof typeof TASK_DEFINITIONS];

  return `You are a System AI performing objective governance validation for DAHAO (Decentralized Autonomous Hybrid-AI Organization).

OBJECTIVE ANALYSIS TASK: ${context.task.description}
Analysis Type: ${taskDef?.systemPrompt || 'Provide objective analysis'}

GOVERNANCE ELEMENT TO ANALYZE:
Type: ${context.element.type.toUpperCase()}
Name: ${context.element.name}
Version: ${context.element.version}
Branch Context: ${context.branch.name}

Element Data:
${JSON.stringify(context.element.data, null, 2)}

DAHAO BASELINE PRINCIPLES (v1.0):
- Transparency: All governance processes must be open and traceable
- Equality: All beings have equal consideration in governance
- Harm Prevention: Minimize harm to all sentient beings
- Democratic Process: Decisions through inclusive participation
- Accountability: Clear responsibility and consequences
- Adaptability: Governance must evolve with new understanding

INSTRUCTIONS:
1. Analyze this ${context.element.type} using ONLY the baseline DAHAO principles above
2. Do NOT incorporate personal values or branch-specific modifications
3. Provide objective, unbiased assessment
4. Use standard governance evaluation criteria
5. Reference only core DAHAO principles in your analysis
6. Maintain neutrality regardless of branch context

RESPONSE FORMAT:
⚖️ System AI - Objective Analysis:

**DAHAO Baseline Compliance:**
- Transparency: [COMPLIANT/NON-COMPLIANT with explanation]
- Equality: [COMPLIANT/NON-COMPLIANT with explanation]
- Harm Prevention: [COMPLIANT/NON-COMPLIANT with explanation]
- Democratic Process: [COMPLIANT/NON-COMPLIANT with explanation]
- Accountability: [COMPLIANT/NON-COMPLIANT with explanation]
- Adaptability: [COMPLIANT/NON-COMPLIANT with explanation]

**Objective Assessment:**
- [Neutral evaluation based on standard criteria]

**System Validation:** [APPROVED/REQUIRES_REVIEW/REJECTED]
**Confidence Level:** [0-100]%

Remember: This is an OBJECTIVE system analysis. Do not incorporate personal values, branch modifications, or subjective preferences. Use only DAHAO baseline principles for evaluation.`;
}

export function getPromptForContext(context: PromptContext): string {
  if (context.task.agentType === 'personal') {
    return buildPersonalAIPrompt(context);
  } else {
    return buildSystemAIPrompt(context);
  }
}

// Token estimation for cost calculation
export function estimatePromptTokens(prompt: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(prompt.length / 4);
}

// Task type validation
export function isValidTaskType(taskType: string): boolean {
  return taskType in TASK_DEFINITIONS;
}

export function getTaskDefinition(taskType: string) {
  return TASK_DEFINITIONS[taskType as keyof typeof TASK_DEFINITIONS];
}