markdown# Goal: Update DAHAO for AI Agent Integration (Mock Implementation)

## Overview
Update the DAHAO platform to reflect current AI agent capabilities (GitHub Copilot, Claude Code) and fix incorrect information in existing pages. This is a MOCK implementation - no real API integrations yet.

## Priority Tasks

### 1. Fix Incorrect Information in Existing Pages

#### A. Update Home Page (`app/page.tsx`)
**Remove/Update:**
- Remove specific token name references ("Kut-Akil Token")
- Change "Token rewards" to "Contribution rewards (coming in Phase 3)"
- Update the economics section to emphasize the GitHub Actions + AI agents integration

**Key changes:**
```typescript
// In the "Intellectual Mining" section, update to:
"Contributors earn rewards based on agent-measured impact"
// Remove specific token economics details
B. Update About Page (app/about/page.tsx)
Critical fixes:

Replace "Council of verified experts" with "hybrid human-AI voting system"
Remove "Voting power based on expertise/history" - DAHAO uses equal voting
Update "Token economics" to "Contribution rewards system (Phase 3)"
Emphasize GitHub Actions as the orchestration engine

Specific text to find and replace:

"Council of verified veterinary experts" → "Hybrid human-AI governance"
"Voting power is not just based on tokens" → "Equal voting rights for all members"
"Kut-Akil Token (KUT)" → "Contribution rewards system"

C. Update Mission Page (app/mission/page.tsx)
Add new sections:

Add explanation of MCP (Model Context Protocol) integration potential
Update to mention GitHub Copilot Agent Mode and Claude Code
Emphasize "surf don't build" strategy with current AI tools

D. Update How It Works Page (app/how-it-works/page.tsx)
Add to workflow:

Insert new Step 6: "Agent Assignment & Analysis"
Update examples to show @claude mentions
Add section on GitHub Actions orchestration for agents

2. Create Mock Agent Features
A. Agent Assignment Panel Component
Create: components/governance/AgentAssignmentPanel.tsx
Mock component that shows:

List of available agents (Personal, Ethics, Claude, Domain-specific)
Assignment button with loading states
Mock analysis results after 2-second delay

B. Settings Page
Create: app/settings/page.tsx
Mock settings page with:

LLM provider selection (GitHub Copilot, Claude Code, Custom)
API key input field (disabled for mock)
Save button (shows success message but doesn't save)

C. Update Navigation
Update: components/layout/Header.tsx
Add Settings link to navigation:
typescript{ href: '/settings', label: 'Settings' },
3. Enhance Forum Features
A. Update Discussion Viewer
Update: components/governance/DiscussionViewer.tsx
Add:

Import and use AgentAssignmentPanel component
Show it below the main discussion content
Add mock "@claude analyze this" button

B. Add Comment Input
Create: components/governance/CommentInput.tsx
Simple comment input with:

Textarea for comment
"Post Comment" button
Info text: "Mention @claude to trigger AI analysis"
When submitted with @claude, show mock "Analysis requested" message

4. Update Chat Page
A. Add Agent Commands
Update: app/chat/page.tsx
Add new command handlers:
typescript// New commands to handle:
- "list agents" → Show available agents
- "assign [agent] to [discussion]" → Mock assignment
- "agent status" → Show mock active assignments
- "configure agent" → Link to settings
5. Create Mock Data
A. Mock Agent Responses
Create: lib/mock-data/agent-responses.ts
Create realistic mock responses for:

Ethics compliance analysis
Personal agent analysis
Claude code review
Domain expert analysis

Format:
typescriptexport const MOCK_AGENT_RESPONSES = {
  'ethics-compliance': {
    template: "Ethics Analysis:\n✓ Transparency: Compatible\n✓ Equality: Compatible\n✓ Harm Prevention: No issues\n✓ Sustainability: Long-term positive\nRecommendation: APPROVE"
  },
  // ... more templates
};
6. Update Type Definitions
A. Extend Discussion Type
Update: types/governance.ts
Add to GovernanceDiscussion interface:
typescriptassignedAgents?: {
  agentId: string;
  assignedBy: string;
  assignedAt: string;
  status: 'pending' | 'analyzing' | 'completed';
  mockAnalysis?: string;
}[];
Implementation Guidelines
DO:

Keep all implementations as MOCK (no real API calls)
Use setTimeout for simulating async operations
Store mock state in React component state only
Show clear UI feedback for all actions
Make it obvious this is a demo/mock version

DON'T:

Don't implement real GitHub OAuth
Don't make actual API calls
Don't create backend routes yet
Don't implement real blockchain features
Don't add complex state management (Redux, etc.)

Testing Checklist
After implementation, verify:

 All pages load without errors
 Incorrect information has been fixed
 Agent assignment shows mock loading states
 Settings page displays but clarifies it's mock
 Chat understands new agent commands
 Navigation includes Settings link
 @claude mentions show feedback

File Structure Summary
New files to create:
- app/settings/page.tsx
- components/governance/AgentAssignmentPanel.tsx
- components/governance/CommentInput.tsx
- lib/mock-data/agent-responses.ts

Files to update:
- app/page.tsx (fix token references)
- app/about/page.tsx (fix governance model)
- app/mission/page.tsx (add AI tools context)
- app/how-it-works/page.tsx (add agent workflow)
- app/chat/page.tsx (add agent commands)
- components/layout/Header.tsx (add settings)
- components/governance/DiscussionViewer.tsx (add agent panel)
- types/governance.ts (add agent fields)
Success Criteria
The implementation is successful when:

A new user can understand DAHAO uses AI agents, not token-based voting
The mock agent assignment flow works smoothly
All references to incorrect governance models are fixed
The platform clearly shows it's ready for GitHub Actions + AI integration
Users can see how @claude mentions would work
