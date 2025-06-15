// Issue templates for term development workflow
// These templates standardize the creation of GitHub Issues for private term development

export interface TermDraftData {
  termName: string;
  definition: string;
  rationale: string;
  domain: string;
  tags: string[];
  author: string;
  initialStatus?: 'draft' | 'ai_review' | 'peer_review';
}

export interface IssueTemplate {
  title: string;
  body: string;
  labels: string[];
  assignees?: string[];
}

// Main term development issue template
export function createTermDevelopmentIssue(data: TermDraftData): IssueTemplate {
  const title = `Term Development: ${data.termName}`;
  
  const body = `## Term Definition
**${data.termName}**: ${data.definition}

## Rationale
${data.rationale}

## Domain
${data.domain}

## Tags
${data.tags.join(', ')}

## Development Status
- [ ] Definition complete
- [ ] AI review requested
- [ ] AI feedback incorporated
- [ ] Peer review requested
- [ ] Peer feedback incorporated
- [ ] Ready for submission to public pool

## Development Workflow

### Phase 1: Initial Definition
- [x] Create initial term definition
- [x] Provide rationale for term need
- [x] Assign to appropriate domain
- [ ] Request AI review

### Phase 2: AI Review & Refinement
- [ ] Assign Personal AI agent for definition review
- [ ] Assign System AI agent for compliance validation
- [ ] Incorporate AI feedback and suggestions
- [ ] Update definition based on AI recommendations

### Phase 3: Peer Review
- [ ] Request peer reviews from domain experts
- [ ] Address peer feedback
- [ ] Resolve any conflicts or concerns
- [ ] Achieve consensus on final definition

### Phase 4: Submission Preparation
- [ ] Final quality check
- [ ] Ensure all criteria met
- [ ] Prepare for submission to public governance pool
- [ ] Submit to public discussion

## Quality Criteria
- [ ] **Clear Definition**: Definition is comprehensive and unambiguous
- [ ] **Unique Contribution**: Term offers new perspective not covered by existing terms
- [ ] **Domain Alignment**: Well-suited for the ${data.domain} domain
- [ ] **AI Review Completed**: Personal and/or System AI have reviewed and scored
- [ ] **Peer Review**: At least 2 peer reviews completed with positive feedback
- [ ] **Implementation Examples**: Practical examples and use cases provided

## AI Agent Assignment
Use the AI Agent Assignment panel to:
- Assign **Personal AI** agents for value-aligned analysis (1.5x token multiplier)
- Assign **System AI** agents for objective compliance validation
- Request specific analyses: definition review, clarity analysis, uniqueness check, domain alignment

## Next Steps
1. Click "Assign Agent" to request AI analysis
2. Incorporate AI feedback into definition
3. Request peer reviews from domain experts
4. Prepare for submission when all criteria are met

---
*Created by: ${data.author}*
*Issue Type: Term Development*
*Auto-generated from DAHAO term development template*`;

  const labels = [
    'term-development',
    data.domain,
    data.initialStatus || 'draft',
    'private-development'
  ];

  return {
    title,
    body,
    labels
  };
}

// AI Review specific issue template
export function createAIReviewIssue(termName: string, reviewType: string, parentIssueNumber: number): IssueTemplate {
  const title = `AI Review: ${reviewType} for ${termName}`;
  
  const body = `## AI Review Request

**Term**: ${termName}
**Review Type**: ${reviewType}
**Parent Issue**: #${parentIssueNumber}

## Review Objectives
${getReviewObjectives(reviewType)}

## Expected Deliverables
${getExpectedDeliverables(reviewType)}

## AI Agent Requirements
- **Recommended Agent Type**: ${getRecommendedAgentType(reviewType)}
- **Required Tools**: ${getRequiredTools(reviewType)}
- **Expected Timeline**: 24-48 hours

## Review Criteria
${getReviewCriteria(reviewType)}

---
*This is an AI review sub-issue. Please assign appropriate AI agents to complete the analysis.*`;

  const labels = [
    'ai-review',
    reviewType.toLowerCase().replace(' ', '-'),
    'term-development',
    'automated-task'
  ];

  return {
    title,
    body,
    labels
  };
}

// Peer review request issue template
export function createPeerReviewIssue(termName: string, domain: string, parentIssueNumber: number): IssueTemplate {
  const title = `Peer Review Request: ${termName}`;
  
  const body = `## Peer Review Request

**Term**: ${termName}
**Domain**: ${domain}
**Parent Issue**: #${parentIssueNumber}

## Review Guidelines
Thank you for volunteering to peer review this term definition. Please consider:

### Definition Quality
- Is the definition clear and unambiguous?
- Does it capture the essence of the concept?
- Are there any missing elements or unnecessary complexity?

### Domain Fit
- Does this term belong in the ${domain} domain?
- How does it relate to existing terms in this domain?
- Are there potential conflicts with established definitions?

### Practical Utility
- Would this term be useful in governance contexts?
- Can you envision practical applications?
- Are the examples sufficient and appropriate?

### Uniqueness
- Is this term sufficiently different from existing terms?
- Does it fill a genuine gap in our terminology?
- Are there simpler alternatives that could work?

## Review Format
Please provide your feedback in the following format:

\`\`\`
**Overall Assessment**: [1-5 stars]
**Domain Fit**: [Excellent/Good/Fair/Poor]
**Clarity**: [Excellent/Good/Fair/Poor]
**Uniqueness**: [Excellent/Good/Fair/Poor]

**Strengths**:
- [List key strengths]

**Areas for Improvement**:
- [List suggestions for improvement]

**Recommendation**: [Approve/Approve with changes/Needs major revision/Reject]

**Additional Comments**:
[Any additional feedback or suggestions]
\`\`\`

## Review Timeline
Please complete your review within 5-7 days. If you need more time, please comment to let us know.

---
*Thank you for contributing to the DAHAO term development process!*`;

  const labels = [
    'peer-review',
    'review-request',
    domain,
    'term-development',
    'community-task'
  ];

  return {
    title,
    body,
    labels
  };
}

// Ready for submission issue template
export function createSubmissionReadyIssue(termName: string, parentIssueNumber: number): IssueTemplate {
  const title = `Ready for Submission: ${termName}`;
  
  const body = `## Term Ready for Public Submission

**Term**: ${termName}
**Parent Development Issue**: #${parentIssueNumber}

## Submission Checklist
- [x] Definition finalized and polished
- [x] AI reviews completed with positive scores
- [x] Peer reviews completed with approval
- [x] All feedback incorporated
- [x] Quality criteria met
- [x] Domain alignment confirmed

## Submission Process
1. **Review Final Definition**: Ensure all changes are incorporated
2. **Prepare Submission Package**: Gather all documentation and reviews
3. **Submit to Public Pool**: Create public discussion with complete history
4. **Monitor Public Discussion**: Engage with community feedback
5. **Support Ratification Process**: Answer questions and address concerns

## Documentation Package
- ✅ Final term definition
- ✅ Rationale and background
- ✅ AI review reports
- ✅ Peer review feedback
- ✅ Development history
- ✅ Implementation examples

## Public Submission Requirements
Before submitting to public governance:
- [ ] Final community review completed
- [ ] Submission package prepared
- [ ] Public discussion created
- [ ] Development team ready for support

## Transition to Public
When ready, use the "Submit to Public Pool" action to:
1. Create public governance discussion
2. Transfer all development documentation
3. Notify relevant domain communities
4. Begin public ratification process

---
*This term has completed private development and is ready for public governance submission.*`;

  const labels = [
    'ready-for-submission',
    'term-development',
    'submission-ready',
    'final-review'
  ];

  return {
    title,
    body,
    labels
  };
}

// Helper functions for AI review templates
function getReviewObjectives(reviewType: string): string {
  const objectives = {
    'definition_review': `
- Analyze definition completeness and accuracy
- Assess clarity and readability
- Evaluate conceptual soundness
- Check for logical consistency`,
    
    'clarity_analysis': `
- Evaluate definition clarity and understandability
- Assess language complexity and accessibility
- Check for ambiguous or unclear phrasing
- Recommend improvements for better communication`,
    
    'uniqueness_check': `
- Compare against existing term definitions
- Identify overlaps with established concepts
- Assess novelty and unique contribution
- Evaluate differentiation from similar terms`,
    
    'domain_alignment': `
- Verify fit within specified domain
- Assess consistency with domain principles
- Check alignment with domain terminology
- Evaluate integration with domain framework`
  };
  
  return objectives[reviewType as keyof typeof objectives] || 'General analysis and feedback';
}

function getExpectedDeliverables(reviewType: string): string {
  return `
- Detailed analysis report
- Scoring on relevant criteria
- Specific recommendations for improvement
- Overall assessment and recommendation`;
}

function getRecommendedAgentType(reviewType: string): string {
  const recommendations = {
    'definition_review': 'Personal AI (for value-aligned analysis) or System AI (for objective review)',
    'clarity_analysis': 'Personal AI (considers your communication preferences)',
    'uniqueness_check': 'System AI (objective comparison with existing terms)',
    'domain_alignment': 'System AI (neutral domain standards assessment)'
  };
  
  return recommendations[reviewType as keyof typeof recommendations] || 'Personal or System AI based on preference';
}

function getRequiredTools(reviewType: string): string {
  const tools = {
    'definition_review': 'ethics_analyzer, clarity_checker, domain_validator',
    'clarity_analysis': 'clarity_checker, readability_analyzer',
    'uniqueness_check': 'term_comparator, novelty_analyzer',
    'domain_alignment': 'domain_validator, consistency_checker'
  };
  
  return tools[reviewType as keyof typeof tools] || 'standard_analyzer';
}

function getReviewCriteria(reviewType: string): string {
  const criteria = {
    'definition_review': `
- **Completeness**: Definition covers all essential aspects
- **Accuracy**: Factually correct and conceptually sound
- **Clarity**: Clear and understandable language
- **Consistency**: Logically consistent and coherent`,
    
    'clarity_analysis': `
- **Readability**: Appropriate language complexity
- **Structure**: Well-organized and logical flow
- **Precision**: Precise and unambiguous wording
- **Accessibility**: Understandable to target audience`,
    
    'uniqueness_check': `
- **Novelty**: Introduces new concepts or perspectives
- **Differentiation**: Clearly distinct from existing terms
- **Value-Add**: Provides unique utility or insight
- **Non-Redundancy**: Not duplicating existing terminology`,
    
    'domain_alignment': `
- **Domain Fit**: Appropriate for specified domain
- **Consistency**: Aligns with domain principles
- **Integration**: Works well with domain framework
- **Standards**: Meets domain quality standards`
  };
  
  return criteria[reviewType as keyof typeof criteria] || 'Standard review criteria apply';
}

// Export template types for easy access
export const TERM_DEVELOPMENT_TEMPLATES = {
  MAIN_ISSUE: 'main_issue',
  AI_REVIEW: 'ai_review',
  PEER_REVIEW: 'peer_review',
  SUBMISSION_READY: 'submission_ready'
} as const;

export type TermDevelopmentTemplateType = typeof TERM_DEVELOPMENT_TEMPLATES[keyof typeof TERM_DEVELOPMENT_TEMPLATES];