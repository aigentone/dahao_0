// AI Prompt Templates for DAHAO Governance Analysis
// Supports Personal AI (user values) vs System AI (objective) distinction
// Enhanced with dynamic context from actual branch data

import { PromptContext } from './types';
import { getUserValuesFromBranch } from '../utils/user-values';
import { getSystemValuesForContext } from '../utils/system-values';

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
  
  // Get dynamic user context from their actual branch
  const userContext = context.user.dynamicContext || getUserValuesFromBranch(
    context.user.id, 
    context.user.branch
  );
  
  let prompt = `You are a Personal AI assistant analyzing governance for a user with these specific values and preferences:

USER PROFILE:
- Name: ${context.user.name}
- Governance Branch: ${userContext.branchName} (${userContext.branchType})
- Core Values: ${userContext.coreValues.join(', ')}
- Analysis Focus: ${taskDef?.personalPrompt || 'Provide analysis aligned with user values'}

USER'S GOVERNANCE PHILOSOPHY:
Based on ${context.user.name}'s branch modifications, they demonstrate these values:`;

  // Add modified terms that reflect user's values
  if (userContext.valueTerms.length > 0) {
    prompt += `\n\nVALUE-DEFINING TERMS (User's Modified Definitions):`;
    userContext.valueTerms.forEach(term => {
      prompt += `\n- ${term.name} (v${term.version}): ${term.definition}`;
      if (term.modifications.length > 0) {
        prompt += `\n  User's modifications: ${term.modifications.join('; ')}`;
      }
    });
  }

  // Add personal principles
  if (userContext.personalPrinciples.length > 0) {
    prompt += `\n\nPERSONAL GOVERNANCE PRINCIPLES:`;
    userContext.personalPrinciples.forEach(principle => {
      const newLabel = principle.isNew ? ' [NEW]' : '';
      prompt += `\n- ${principle.statement}${newLabel}`;
    });
  }

  // Add governance preferences
  if (userContext.governancePreferences.length > 0) {
    prompt += `\n\nGOVERNANCE PREFERENCES:`;
    userContext.governancePreferences.forEach(pref => {
      prompt += `\n- ${pref.area}: ${pref.preference}`;
    });
  }

  prompt += `

GOVERNANCE ELEMENT TO ANALYZE:
Type: ${context.element.type.toUpperCase()}
Name: ${context.element.name}
Version: ${context.element.version}
Branch: ${context.branch.name}
Context: ${context.task.context || 'General governance analysis'}

Element Data:
${JSON.stringify(context.element.data, null, 2)}

INSTRUCTIONS:
1. Analyze this ${context.element.type} from the perspective of the user's actual values extracted from their branch
2. Consider how this element aligns with their personal governance modifications
3. Reference their specific term definitions and principles when relevant
4. Provide recommendations that honor their demonstrated value system
5. Use their governance preferences to guide analysis approach
6. Suggest modifications that would better align with their branch philosophy

RESPONSE FORMAT:
🤖 Personal AI Analysis (${context.user.name}'s Values):

**Value System Analysis:**
- [How this element relates to their core values: ${userContext.coreValues.join(', ')}]

**Branch Philosophy Alignment:**
- [Compatibility with their governance branch approach and modifications]

**Personal Term Definitions:**
- [Reference any of their modified terms that are relevant]

**Personalized Recommendations:**
- [Specific suggestions based on their demonstrated values and preferences]

**Potential Value Conflicts:**
- [Any aspects that might conflict with their value system]

**Confidence Level:** [0-100]%

Remember: This analysis uses ${context.user.name}'s actual governance branch data to understand their values, not generic assumptions.`;

  return prompt;
}

export function buildSystemAIPrompt(context: PromptContext): string {
  const taskDef = TASK_DEFINITIONS[context.task.taskType as keyof typeof TASK_DEFINITIONS];
  
  // Get dynamic system context for appropriate baseline
  const systemContext = context.systemContext || getSystemValuesForContext(
    context.element.branchId || context.branch.id,
    context.element.type,
    context.element.id
  );
  
  let prompt = `You are a System AI performing objective governance validation using ${systemContext.branchName} baseline standards.

VALIDATION BASELINE: ${systemContext.branchName} (${systemContext.branchType})
Domain Focus: ${systemContext.domainFocus.join(', ')}
Analysis Type: ${taskDef?.systemPrompt || 'Provide objective analysis'}

GOVERNANCE ELEMENT TO ANALYZE:
Type: ${context.element.type.toUpperCase()}
Name: ${context.element.name}
Version: ${context.element.version}
Branch Context: ${context.branch.name}

Element Data:
${JSON.stringify(context.element.data, null, 2)}`;

  // Add baseline terms that define core concepts
  if (systemContext.baselineTerms.length > 0) {
    prompt += `\n\nBASELINE TERM DEFINITIONS:`;
    systemContext.baselineTerms.forEach(term => {
      const coreLabel = term.isCore ? ' [CORE]' : '';
      prompt += `\n- ${term.name} (v${term.version}): ${term.definition}${coreLabel}`;
    });
  }

  // Add baseline principles for validation
  if (systemContext.baselinePrinciples.length > 0) {
    prompt += `\n\nBASELINE PRINCIPLES TO ENFORCE:`;
    systemContext.baselinePrinciples.forEach(principle => {
      const priorityLabel = principle.priority === 'critical' ? ' [CRITICAL]' : 
                           principle.priority === 'important' ? ' [IMPORTANT]' : '';
      const coreLabel = principle.isCore ? ' [CORE]' : '';
      prompt += `\n- ${principle.statement}${priorityLabel}${coreLabel}`;
    });
  }

  // Add compliance rules that must be enforced
  if (systemContext.complianceRules.length > 0) {
    prompt += `\n\nCOMPLIANCE REQUIREMENTS:`;
    systemContext.complianceRules.forEach(rule => {
      const criticalLabel = rule.isCritical ? ' [CRITICAL]' : '';
      prompt += `\n- ${rule.name}: ${rule.purpose}${criticalLabel}`;
    });
  }

  // Add validation criteria
  prompt += `\n\nVALIDATION CRITERIA:`;
  systemContext.validationCriteria.forEach(criteria => {
    prompt += `\n- ${criteria}`;
  });

  prompt += `\n\nINSTRUCTIONS:
1. Validate this ${context.element.type} against the ${systemContext.branchName} baseline standards above
2. Do NOT incorporate personal values or user-specific modifications  
3. Use only the baseline terms, principles, and compliance rules listed above
4. Apply domain-specific validation criteria: ${systemContext.domainFocus.join(', ')}
5. Maintain objectivity using community-established standards
6. Reference specific baseline elements in your analysis

RESPONSE FORMAT:
⚖️ System AI - ${systemContext.branchName} Validation:

**Baseline Compliance Check:**`;

  // Add compliance checks for critical principles
  systemContext.baselinePrinciples
    .filter(p => p.priority === 'critical')
    .forEach(principle => {
      const principleKey = principle.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      prompt += `\n- ${principleKey}: [COMPLIANT/NON-COMPLIANT with explanation]`;
    });

  prompt += `\n
**Domain-Specific Validation:**`;
  
  systemContext.domainFocus.forEach(focus => {
    prompt += `\n- ${focus}: [Assessment of element's impact in this domain]`;
  });

  prompt += `\n
**Baseline Term Consistency:**
- [Check if element uses terms consistently with baseline definitions]

**Compliance Rule Assessment:**
- [Verify alignment with compliance requirements]

**Overall System Validation:** [APPROVED/REQUIRES_REVIEW/REJECTED]
**Confidence Level:** [0-100]%
**Baseline Used:** ${systemContext.branchName} v${systemContext.version}

Remember: This analysis uses ${systemContext.branchName} community standards, not personal preferences. Validate against established baseline only.`;

  return prompt;
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