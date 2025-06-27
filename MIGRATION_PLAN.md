# MCP Migration Plan for DAHAO
## Converting Existing Task Types to "Rules as Instructions" Architecture

### Executive Summary

This document outlines a **clean, unified migration** to convert DAHAO's existing task-based AI analysis system into a "Rules as Instructions" architecture using MCP tools, **without creating parallel systems**. The key insight: existing task types ARE already rules - we just need to formalize them.

**Key Objectives:**
- Convert all 10 existing task types into formal rules **in-place**
- **No parallel systems** - existing API endpoints use rules internally
- **Zero breaking changes** - same API contract, same UI, same responses
- Enable branch-specific rule customization and user-personalized outputs
- **Single migration phase** with immediate rule-based benefits

**Expected Benefits:**
- **Zero Disruption**: All existing functionality preserved exactly
- **Immediate Governance Flexibility**: Branch-customizable rules from day one
- **Cleaner Architecture**: One unified rule system, no parallel code paths
- **Future-Ready**: Foundation for evolving governance through natural language
- **Simplified Maintenance**: Single rule engine instead of scattered logic

**The Insight**: Instead of building new systems alongside old ones, we recognize that `definition-clarity`, `philosophical-consistency`, etc. are already governance rules. We formalize them as "Rules as Instructions" while maintaining the exact same user experience.

---

## Current System Analysis

### Existing Task Types (Already Rules!)

The current system in `/lib/ai/prompts.ts` defines 10 task types that are already governance rules:

```typescript
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
```

### Current API Contract (Preserved Exactly)

The existing `/api/ai/analyze` endpoint accepts:

```typescript
interface AnalysisRequest {
  user: { id: string; name: string; branch: string; values: string[]; };
  governanceItem: { type: string; id: string; name: string; version: string; data: any; };
  task: {
    agentType: 'personal' | 'system';
    taskType: string;  // ← This becomes rule selection
    context?: string;
  };
  branch: { id: string; name: string; };
}
```

**Key insight**: The `taskType` field already selects which "rule" to apply. We just formalize this.

---

## Unified Rules as Instructions Architecture

### The Conversion Strategy

Instead of parallel systems, we convert existing task types into formal rules **internally** while maintaining the exact same API:

```typescript
// Internal mapping (hidden from users)
const TASK_TYPE_TO_RULE_MAPPING = {
  'definition-clarity': 'definition-clarity-rule',
  'usage-consistency': 'usage-consistency-rule',
  'evolution-analysis': 'evolution-analysis-rule',
  'philosophical-consistency': 'philosophical-consistency-rule',
  'implementation-feasibility': 'implementation-feasibility-rule',
  'cross-domain-impact': 'cross-domain-impact-rule',
  'enforcement-mechanism': 'enforcement-mechanism-rule',
  'compliance-framework': 'compliance-framework-rule',
  'implementation-requirements': 'implementation-requirements-rule',
  'general-analysis': 'general-analysis-rule'
};
```

### Rules as Instructions Format

Each task type becomes a formal rule:

```typescript
// /lib/governance/analysis-rules.json
{
  "rules": {
    "definition-clarity-rule": {
      "name": "Definition Clarity Review",
      "description": "Analyze how clearly a term is defined and suggest improvements",

      "instruction": `Analyze the clarity of the term '{elementName}' definition:
      1. Use MCP tool 'getBranchElements' to examine how this term is used across governance elements
      2. Check for ambiguity, vagueness, or circular definitions
      3. Compare with similar terms in the same branch for consistency
      4. Consider the {agentType} perspective: ${agentType === 'personal' ? 'user communication preferences' : 'objective standards'}
      5. Provide specific improvement suggestions
      6. Format response according to user's output preference`,

      "parameters": {
        "analysisDepth": {
          "default": "comprehensive",
          "type": "string",
          "branchOverrides": {
            "animal-welfare-dahao": "detailed",
            "music-industry-dahao": "practical"
          }
        },
        "focusAreas": {
          "default": ["clarity", "precision", "usability"],
          "type": "array",
          "branchOverrides": {
            "animal-welfare-dahao": ["clarity", "precision", "usability", "ethical-implications"],
            "environmental-dahao": ["clarity", "precision", "usability", "environmental-impact"]
          }
        }
      },

      "outputTemplates": {
        "personal": `🤖 Personal AI Analysis (${userContext.name}'s Values):

        **Definition Clarity Assessment:**
        - Clarity Level: {clarityScore}/10
        - Key Strengths: {strengths}
        - Areas for Improvement: {improvements}

        **Personalized Recommendations:**
        - {personalizedSuggestions}

        **Confidence:** {confidence}%`,

        "system": `⚖️ System AI - ${systemContext.branchName} Validation:

        **Baseline Compliance Check:**
        - Definition Standard: {complianceLevel}
        - Consistency Score: {consistencyScore}/10

        **Objective Assessment:**
        - {objectiveFindings}

        **System Recommendation:** {systemRecommendation}
        **Confidence:** {confidence}%`
      },

      "dependencies": ["transparency@v1.0.0"],
      "version": "1.0.0"
    },

    "philosophical-consistency-rule": {
      "name": "Philosophical Consistency Review",
      "description": "Check if principles align with core philosophical foundations",

      "instruction": `Evaluate philosophical consistency of '{elementName}':
      1. Use MCP tool 'getBranchInfo' to understand branch's philosophical foundation
      2. Use MCP tool 'getElementVersion' to get related principles and terms
      3. Check alignment with core philosophical framework
      4. Identify potential conflicts or contradictions
      5. Apply {agentType} analysis: ${agentType === 'personal' ? 'user philosophical framework' : 'DAHAO baseline principles'}
      6. Provide specific recommendations for better alignment`,

      "parameters": {
        "philosophicalDepth": {
          "default": "moderate",
          "type": "string",
          "branchOverrides": {
            "animal-welfare-dahao": "deep",
            "music-industry-dahao": "practical"
          }
        },
        "comparisonBaseline": {
          "default": "branch-specific",
          "type": "string",
          "branchOverrides": {
            "core-dahao": "fundamental-principles"
          }
        }
      },

      "outputTemplates": {
        "personal": `🤖 Personal Philosophical Analysis:

        **Value System Alignment:**
        - Compatibility with your values: {valueAlignment}
        - Potential conflicts: {personalConflicts}

        **Philosophical Consistency:**
        - {philosophicalAssessment}

        **Personal Recommendations:**
        - {personalPhilosophicalSuggestions}`,

        "system": `⚖️ System Philosophical Validation:

        **Baseline Principle Alignment:**
        - Core DAHAO Consistency: {coreAlignment}
        - Branch-Specific Fit: {branchFit}

        **Philosophical Integrity:**
        - {integrityAssessment}

        **System Validation:** {systemValidation}`
      },

      "dependencies": ["fundamental-principles@v1.0.0", "branch-philosophy@v1.0.0"],
      "version": "1.0.0"
    },

    "general-analysis-rule": {
      "name": "General Analysis",
      "description": "Comprehensive analysis of the governance element",

      "instruction": `Provide comprehensive analysis of '{elementName}':
      1. Use MCP tools to gather full context: branch info, related elements, usage patterns
      2. Analyze from multiple perspectives: clarity, consistency, feasibility, impact
      3. Apply {agentType} approach: ${agentType === 'personal' ? 'user-aligned comprehensive review' : 'objective systematic evaluation'}
      4. Identify strengths, weaknesses, opportunities, threats
      5. Provide balanced assessment with specific recommendations
      6. Consider both immediate and long-term implications`,

      "parameters": {
        "comprehensiveness": {
          "default": "balanced",
          "type": "string",
          "branchOverrides": {
            "animal-welfare-dahao": "thorough",
            "music-industry-dahao": "focused"
          }
        },
        "analysisFramework": {
          "default": ["SWOT", "feasibility", "impact"],
          "type": "array"
        }
      },

      "outputTemplates": {
        "personal": `🤖 Comprehensive Personal Analysis:

        **Overall Assessment:**
        - Element Quality: {overallScore}/10
        - Alignment with Your Values: {personalAlignment}

        **Detailed Analysis:**
        - Strengths: {strengths}
        - Areas for Improvement: {improvements}
        - Personal Impact: {personalImpact}

        **Recommendations:**
        - {comprehensiveRecommendations}`,

        "system": `⚖️ System Comprehensive Evaluation:

        **Systematic Assessment:**
        - Overall Quality: {systemScore}/10
        - Baseline Compliance: {complianceLevel}

        **Multi-Dimensional Analysis:**
        - Technical Quality: {technicalQuality}
        - Implementation Readiness: {implementationReadiness}
        - System Impact: {systemImpact}

        **System Recommendations:**
        - {systemRecommendations}`
      },

      "version": "1.0.0"
    }
  }
}
```

---

## MCP Tools Design (Data Access Layer)

### Core Tools for Rule Execution

```typescript
// /lib/mcp/analysis-tools.ts
import { tool } from 'ai';
import { z } from 'zod';

export const getBranchElementsTool = tool({
  description: 'Get governance elements for a specific branch and type',
  parameters: z.object({
    branchId: z.string().describe('Branch ID to get elements from'),
    elementType: z.enum(['term', 'principle', 'rule']).optional().describe('Filter by element type'),
  }),
  execute: async ({ branchId, elementType }) => {
    // Load branch data and resolve inheritance
    const branch = await loadBranchData(branchId);
    const elements = await resolveInheritedElements(branchId, elementType);

    return {
      branchId,
      branchName: branch.name,
      elementCount: elements.length,
      elements: elements.map(el => ({
        id: el.id,
        name: el.name,
        version: el.version,
        type: el.type,
        usage: getElementUsageCount(el.id, branchId)
      }))
    };
  },
});

export const getElementUsageTool = tool({
  description: 'Analyze how an element is used across governance documents',
  parameters: z.object({
    elementId: z.string().describe('Element ID to analyze usage for'),
    branchId: z.string().describe('Branch context for analysis'),
  }),
  execute: async ({ elementId, branchId }) => {
    const usage = await analyzeElementUsage(elementId, branchId);

    return {
      elementId,
      totalReferences: usage.references.length,
      referencingElements: usage.references.map(ref => ({
        id: ref.elementId,
        name: ref.elementName,
        type: ref.elementType,
        context: ref.contextSnippet
      })),
      consistencyScore: calculateConsistencyScore(usage.references),
      commonPatterns: identifyUsagePatterns(usage.references)
    };
  },
});

export const getBranchPhilosophyTool = tool({
  description: 'Get the philosophical foundation and principles for a branch',
  parameters: z.object({
    branchId: z.string().describe('Branch ID to get philosophy for'),
  }),
  execute: async ({ branchId }) => {
    const philosophy = await extractBranchPhilosophy(branchId);

    return {
      branchId,
      corePhilosophy: philosophy.foundation,
      keyPrinciples: philosophy.principles,
      valuePriorities: philosophy.priorities,
      philosophicalApproach: philosophy.approach,
      inheritedFrom: philosophy.parentBranch
    };
  },
});
```

---

## Internal Conversion Implementation

### Enhanced ClaudeService (Zero API Changes)

```typescript
// /lib/ai/claude-service.ts (enhanced internally)
import { RuleInterpreter } from '../governance/rule-interpreter';

export class ClaudeService {
  private ruleInterpreter: RuleInterpreter;

  constructor(model: string = 'claude-3-5-sonnet-20241022', temperature: number = 0.7) {
    this.model = model;
    this.temperature = temperature;
    this.ruleInterpreter = new RuleInterpreter();
  }

  // Existing method - SAME signature, SAME return type
  async analyzeGovernanceElement(request: AnalysisRequest): Promise<AgentAnalysis> {
    // Convert task type to rule internally (hidden from API)
    const ruleId = this.mapTaskTypeToRule(request.task.taskType);

    // Use rule interpreter instead of hardcoded prompts
    const ruleResult = await this.ruleInterpreter.interpretRule(ruleId, {
      branchId: request.branch.id,
      userId: request.user.id,
      agentType: request.task.agentType,
      elementId: request.governanceItem.id,
      elementType: request.governanceItem.type,
      context: request.task.context
    });

    // Convert rule result back to existing AgentAnalysis format
    return this.convertRuleResultToAnalysis(ruleResult, request);
  }

  private mapTaskTypeToRule(taskType: string): string {
    const mapping = {
      'definition-clarity': 'definition-clarity-rule',
      'usage-consistency': 'usage-consistency-rule',
      'evolution-analysis': 'evolution-analysis-rule',
      'philosophical-consistency': 'philosophical-consistency-rule',
      'implementation-feasibility': 'implementation-feasibility-rule',
      'cross-domain-impact': 'cross-domain-impact-rule',
      'enforcement-mechanism': 'enforcement-mechanism-rule',
      'compliance-framework': 'compliance-framework-rule',
      'implementation-requirements': 'implementation-requirements-rule',
      'general-analysis': 'general-analysis-rule'
    };

    return mapping[taskType] || 'general-analysis-rule';
  }

  private convertRuleResultToAnalysis(ruleResult: RuleResult, request: AnalysisRequest): AgentAnalysis {
    // Convert rule interpreter result back to existing AgentAnalysis format
    // This ensures API contract is maintained exactly

    return {
      id: ruleResult.id,
      requestedBy: {
        userId: request.user.id,
        userName: request.user.name,
        userBranch: request.user.branch,
        userValues: request.user.values,
        userContext: ruleResult.context?.userContext
      },
      target: {
        elementType: request.governanceItem.type as 'term' | 'principle' | 'rule',
        elementId: request.governanceItem.id,
        elementName: request.governanceItem.name,
        elementVersion: request.governanceItem.version,
        branchId: request.branch.id,
        branchName: request.branch.name
      },
      request: {
        agentType: request.task.agentType,
        taskType: request.task.taskType, // Keep original task type in response
        taskDescription: ruleResult.rule.description,
        context: request.task.context
      },
      execution: {
        agentId: `${request.task.agentType}-${this.model}`,
        agentProvider: 'anthropic',
        modelVersion: this.model,
        temperature: this.temperature,
        promptTemplate: request.task.agentType,
        promptTokens: ruleResult.usage.inputTokens
      },
      timeline: ruleResult.timeline,
      result: {
        analysis: ruleResult.interpretation,
        confidence: ruleResult.confidence,
        recommendations: ruleResult.recommendations,
        concerns: ruleResult.concerns,
        relatedElements: ruleResult.relatedElements
      },
      usage: ruleResult.usage,
      metadata: {
        version: '1.0',
        visibility: 'branch-only',
        status: 'completed',
        tags: [request.task.taskType, request.task.agentType, request.governanceItem.type]
      }
    };
  }
}
```

### Rule Interpreter Implementation

```typescript
// /lib/governance/rule-interpreter.ts
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import {
  getBranchElementsTool,
  getElementUsageTool,
  getBranchPhilosophyTool
} from '../mcp/analysis-tools';

export class RuleInterpreter {
  private tools = {
    getBranchElements: getBranchElementsTool,
    getElementUsage: getElementUsageTool,
    getBranchPhilosophy: getBranchPhilosophyTool
  };

  async interpretRule(ruleId: string, context: RuleContext): Promise<RuleResult> {
    // Load rule definition
    const rule = await this.loadRule(ruleId);

    // Get branch-specific parameters
    const parameters = await this.resolveParameters(rule, context.branchId);

    // Get user output preferences
    const outputTemplate = await this.getOutputTemplate(rule, context);

    // Build interpretation prompt with rule instruction
    const prompt = this.buildRulePrompt(rule, parameters, outputTemplate, context);

    // Execute with MCP tools
    const result = await generateText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      prompt: prompt,
      tools: this.tools,
      maxTokens: 2000,
      temperature: 0.7
    });

    return {
      id: generateId(),
      rule: rule,
      interpretation: result.text,
      toolCalls: result.toolCalls,
      parameters: parameters,
      confidence: this.extractConfidence(result.text),
      recommendations: this.extractRecommendations(result.text),
      concerns: this.extractConcerns(result.text),
      relatedElements: this.extractRelatedElements(result.text),
      usage: {
        inputTokens: result.usage.promptTokens,
        outputTokens: result.usage.completionTokens,
        totalTokens: result.usage.totalTokens,
        cost: this.calculateCost(result.usage)
      },
      timeline: {
        requestedAt: new Date().toISOString(),
        startedAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        duration: 0
      }
    };
  }

  private buildRulePrompt(rule: Rule, parameters: RuleParameters, template: string, context: RuleContext): string {
    // Substitute parameters into rule instruction
    let instruction = rule.instruction;
    for (const [key, value] of Object.entries(parameters)) {
      instruction = instruction.replace(new RegExp(`{${key}}`, 'g'), value.toString());
    }

    return `
You are analyzing a DAHAO governance element using the "${rule.name}" rule.

RULE INSTRUCTION:
${instruction}

CONTEXT:
- Element: ${context.elementId} (${context.elementType})
- Branch: ${context.branchId}
- Agent Type: ${context.agentType}
- User: ${context.userId}

PARAMETERS (Branch-Customized):
${JSON.stringify(parameters, null, 2)}

OUTPUT TEMPLATE:
${template}

REQUIREMENTS:
1. Follow the rule instruction exactly
2. Use provided MCP tools to gather necessary data
3. Apply branch-specific parameters
4. Format output using the template
5. Be specific and actionable in your analysis

Execute the rule now.
    `;
  }
}
```

---

## Migration Implementation Plan

### Single Phase Migration (3-4 days)

Instead of multiple phases, we do everything at once since there are no breaking changes:

#### Day 1: Rule Definitions
- Create `/lib/governance/analysis-rules.json` with all 10 task types converted to rules
- Each rule includes instruction, parameters, and output templates
- Maintain exact same analysis quality and format

#### Day 2: MCP Tools
- Implement core tools: `getBranchElements`, `getElementUsage`, `getBranchPhilosophy`
- Create rule interpreter class
- Add Zod validation for tool parameters

#### Day 3: Internal Conversion
- Enhance `ClaudeService.analyzeGovernanceElement()` to use rule interpreter
- Add task type to rule mapping
- Ensure response format matches existing `AgentAnalysis` interface exactly

#### Day 4: Testing & Validation
- Verify all existing functionality works unchanged
- Test branch parameter overrides
- Validate cost tracking and performance

### Zero Breaking Changes Verification

```typescript
// Before migration - existing API call
const response = await fetch('/api/ai/analyze', {
  method: 'POST',
  body: JSON.stringify({
    user: { id: 'alice', name: 'Alice', branch: 'animal-welfare-dahao', values: ['compassion'] },
    governanceItem: { type: 'term', id: 'harm', name: 'Harm', version: '1.2.0', data: {...} },
    task: { agentType: 'personal', taskType: 'definition-clarity', context: 'Review clarity' },
    branch: { id: 'animal-welfare-dahao', name: 'Animal Welfare DAHAO' }
  })
});

// After migration - EXACT SAME API call, EXACT SAME response format
// But internally uses rule interpreter with branch customization
```

---

## Benefits Analysis

### Immediate Benefits (Day 1)

#### 1. **Zero Disruption**
- **Existing API**: Same endpoints, same request/response format
- **Existing UI**: Same task type selection, same analysis display
- **Existing Functionality**: Personal vs System AI, cost tracking, cross-component integration
- **Existing Performance**: Same response times, same cost structure

#### 2. **Instant Governance Flexibility**
```typescript
// Animal welfare branch can customize rule parameters
"parameters": {
  "analysisDepth": {
    "default": "comprehensive",
    "branchOverrides": {
      "animal-welfare-dahao": "detailed"  // More thorough analysis
    }
  }
}
```

#### 3. **Cleaner Architecture**
- **Before**: Scattered prompt logic across multiple functions
- **After**: Single rule engine with centralized logic
- **Before**: Hardcoded analysis approaches
- **After**: Configurable rule parameters and output templates

### Long-term Benefits

#### 1. **Rule Evolution Through Governance**
Instead of code changes, governance rules can evolve:

```typescript
// Current: Developer must change code
if (analysisType === 'definition-clarity') {
  return buildDefinitionAnalysis(context);
}

// After: Governance can update rules
{
  "definition-clarity-rule": {
    "instruction": "Updated analysis approach based on community feedback...",
    "version": "1.1.0"
  }
}
```

#### 2. **Branch-Specific Governance**
Each branch can customize how governance works:

```typescript
// Animal welfare: More rigorous analysis
"animal-welfare-dahao": {
  "analysisDepth": "detailed",
  "ethicalConsiderations": "comprehensive",
  "consensusThreshold": 75
}

// Music industry: More practical approach
"music-industry-dahao": {
  "analysisDepth": "focused",
  "practicalConsiderations": "primary",
  "consensusThreshold": 60
}
```

#### 3. **AI-Assisted Rule Development**
Future: AI can suggest rule improvements based on usage patterns:

```typescript
// AI analyzes rule effectiveness
const suggestion = await analyzeRuleEffectiveness('definition-clarity-rule');
// "This rule could be improved by adding clarity metrics and examples"
```

---

## Implementation Examples

### Example 1: Definition Clarity Analysis

#### User Request (Unchanged)
```typescript
POST /api/ai/analyze
{
  "user": { "id": "alice", "name": "Alice", "branch": "animal-welfare-dahao" },
  "governanceItem": { "type": "term", "id": "harm", "name": "Harm" },
  "task": { "agentType": "personal", "taskType": "definition-clarity" },
  "branch": { "id": "animal-welfare-dahao", "name": "Animal Welfare DAHAO" }
}
```

#### Internal Processing (New)
```typescript
// 1. Map task type to rule
const ruleId = 'definition-clarity-rule';

// 2. Load rule with branch parameters
const rule = {
  instruction: "Analyze term clarity using {analysisDepth} approach...",
  parameters: { analysisDepth: "detailed" } // Animal welfare override
};

// 3. Execute with MCP tools
const branchElements = await getBranchElementsTool.execute({
  branchId: 'animal-welfare-dahao',
  elementType: 'term'
});

const usage = await getElementUsageTool.execute({
  elementId: 'harm',
  branchId: 'animal-welfare-dahao'
});

// 4. AI interprets rule using gathered data
```

#### Response (Unchanged Format)
```typescript
{
  "success": true,
  "analysis": {
    "id": "analysis-123",
    "target": { "elementType": "term", "elementId": "harm", ... },
    "request": { "agentType": "personal", "taskType": "definition-clarity", ... },
    "result": {
      "analysis": "🤖 Personal AI Analysis (Alice's Values): ...",
      "confidence": 85,
      "recommendations": ["Consider adding species-specific examples", ...]
    },
    "usage": { "cost": { "amount": 0.008 }, ... }
  }
}
```

### Example 2: Branch Customization

#### Core DAHAO Branch
```typescript
// Standard analysis parameters
{
  "definition-clarity-rule": {
    "parameters": {
      "analysisDepth": "comprehensive",
      "focusAreas": ["clarity", "precision", "usability"]
    }
  }
}
```

#### Animal Welfare Branch Override
```typescript
// More rigorous analysis for animal welfare
{
  "definition-clarity-rule": {
    "parameters": {
      "analysisDepth": "detailed",
      "focusAreas": ["clarity", "precision", "usability", "ethical-implications"],
      "exampleRequirement": "species-specific",
      "sensitivityLevel": "high"
    }
  }
}
```

#### Result: Same API, Different Analysis
- **Alice (Animal Welfare)**: Gets detailed analysis with ethical implications
- **Bob (Music Industry)**: Gets practical analysis focused on implementation
- **Same endpoint, same request format, customized by branch parameters**

---

## Testing Strategy

### Backward Compatibility Testing

```typescript
// /tests/migration/backward-compatibility.test.ts
describe('Migration Backward Compatibility', () => {
  test('all existing task types work unchanged', async () => {
    const taskTypes = [
      'definition-clarity', 'usage-consistency', 'evolution-analysis',
      'philosophical-consistency', 'implementation-feasibility',
      'cross-domain-impact', 'enforcement-mechanism',
      'compliance-framework', 'implementation-requirements', 'general-analysis'
    ];

    for (const taskType of taskTypes) {
      const request = createTestRequest({ taskType });
      const response = await POST('/api/ai/analyze', request);

      expect(response.status).toBe(200);
      expect(response.body.analysis).toHaveProperty('id');
      expect(response.body.analysis.request.taskType).toBe(taskType);
      expect(response.body.analysis.result.analysis).toContain('Analysis');
    }
  });

  test('response format unchanged', async () => {
    const response = await analyzeElement({
      taskType: 'definition-clarity',
      agentType: 'personal'
    });

    // Verify exact same structure as before migration
    expect(response).toMatchSchema(AgentAnalysisSchema);
    expect(response.usage.cost.amount).toBeGreaterThan(0);
    expect(response.timeline.duration).toBeGreaterThan(0);
  });
});
```

### Rule System Testing

```typescript
// /tests/governance/rule-interpreter.test.ts
describe('Rule Interpreter', () => {
  test('converts task types to rules correctly', async () => {
    const interpreter = new RuleInterpreter();

    const result = await interpreter.interpretRule('definition-clarity-rule', {
      branchId: 'animal-welfare-dahao',
      userId: 'alice',
      agentType: 'personal',
      elementId: 'harm'
    });

    expect(result.rule.name).toBe('Definition Clarity Review');
    expect(result.parameters.analysisDepth).toBe('detailed'); // Animal welfare override
    expect(result.interpretation).toContain('Personal AI Analysis');
  });

  test('branch parameters override defaults', async () => {
    const coreResult = await interpretRule('definition-clarity-rule', { branchId: 'core-dahao' });
    const animalResult = await interpretRule('definition-clarity-rule', { branchId: 'animal-welfare-dahao' });

    expect(coreResult.parameters.analysisDepth).toBe('comprehensive');
    expect(animalResult.parameters.analysisDepth).toBe('detailed');
  });
});
```

---

## Conclusion

This unified migration approach achieves DAHAO's "Rules as Instructions" vision while maintaining **zero breaking changes**:

### What Changes
- **Internal Architecture**: Everything runs on rule engine
- **Governance Flexibility**: Branch-customizable rule parameters
- **Future Evolution**: Rules can evolve through governance process
- **Code Maintainability**: Single rule system instead of scattered logic

### What Stays Exactly the Same
- **API Endpoints**: Same `/api/ai/analyze` endpoint
- **Request Format**: Same `AnalysisRequest` interface
- **Response Format**: Same `AgentAnalysis` interface
- **UI Components**: Same task type selection
- **User Experience**: Same analysis quality and format
- **Performance**: Same response times and costs

### The Result
A **cleaner, more maintainable system** that's **true to DAHAO's governance vision** while providing **immediate benefits** without any disruption to existing functionality.

**Key Insight**: Instead of building parallel systems, we recognize that governance analysis task types ARE already rules. We formalize them as "Rules as Instructions" while preserving the exact same user experience. This gives us the best of both worlds: **immediate rule-based benefits** with **zero migration pain**.
