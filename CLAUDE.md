# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DAHAO (Decentralized Autonomous Hybrid-AI Organization) is a Next.js 15 application showcasing a governance platform that combines human decision-making with AI assistance through a four-layer architecture system.

## Development Commands

### Setup and Run
```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
```

### Build and Deploy
```bash
npm run build        # Production build (strict TypeScript and ESLint)
npm run start        # Start production server
npm run clean        # Clean build artifacts (.next and out)
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking without emit
```

### Important Build Notes
- **ESLint errors will fail the build** (`ignoreDuringBuilds: false`)
- **TypeScript errors will fail the build** (`ignoreBuildErrors: false`)
- Production output is standalone for optimized deployment

## Architecture

### Technology Stack
- **Next.js 15** with App Router
- **React 19** with TypeScript 5.3 (strict mode)
- **Tailwind CSS 3.4** with CSS variables
- **shadcn/ui** components (New York style)
- **Radix UI** primitives
- **Lucide React** icons
- **Vercel AI SDK v5** with Anthropic provider
- **Claude 3.5 Sonnet** for real AI analysis
- **Zod** for schema validation and MCP tools

### Directory Structure
```
/src/
├── app/                    # Next.js App Router pages
│   ├── about/             # Understanding DAHAO
│   ├── api/ai/            # Real AI API routes
│   │   ├── analyze/       # Claude analysis processing
│   │   └── analyses/      # Analysis history retrieval
│   ├── git-structure/     # Technical implementation
│   ├── governance/        # Live governance dashboard
│   ├── how-it-works/      # Practical explanation
│   ├── mission/           # Vision and philosophy
│   ├── versioned-ethics/  # AI governance philosophy
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui base components
│   ├── shared/            # Reusable custom components
│   ├── layout/            # Layout components
│   └── governance/        # Domain-specific components (includes real AI integration)
├── lib/
│   ├── ai/                # Real AI service layer
│   │   ├── claude-service.ts         # Core Claude API integration
│   │   ├── enhanced-claude-service.ts # Rules-based AI analysis (MCP integration)
│   │   ├── prompts.ts               # Personal vs System AI prompts
│   │   ├── types.ts                 # AI analysis type definitions
│   │   └── json-storage.ts          # Analysis persistence
│   ├── governance/        # Rules as Instructions architecture
│   │   ├── analysis-rules.json      # 10 formal rule definitions (30KB)
│   │   ├── rule-interpreter.ts      # Rule execution engine
│   │   └── types.ts                 # Rule system type definitions
│   ├── mcp/              # Model Context Protocol tools
│   │   └── analysis-tools.ts        # MCP tools for governance data access
│   ├── utils/            # Dynamic context extraction
│   │   ├── user-values.ts           # Extract user values from branches
│   │   └── system-values.ts         # Domain-appropriate DAHAO baselines
│   └── mock-data/        # Governance data and AI analysis storage
├── services/             # API and data services
└── types/                # TypeScript type definitions
```

### Reusable Component System

The application uses a standardized component system for consistency:

#### Shared Components (`/components/shared/`)
- **HeroSection** - Page headers with title, subtitle, badges
- **FeatureCard** - Feature displays with icons
- **StepProcess** - Numbered step workflows
- **ArchitectureFlow** - 4-layer governance visualization
- **BadgeGroup** - Collections of badges
- **NavigationCTA** - Call-to-action patterns

#### Usage Pattern
```tsx
import { HeroSection } from "@/components/shared/HeroSection";
import { FeatureCard } from "@/components/shared/FeatureCard";

// Components are designed for consistency across pages
<HeroSection
  title="Page Title"
  subtitle="Description"
  badge="Category"
/>
```

### Data Architecture

#### Data Architecture
- `/lib/mock-data/agent-responses.ts` - Legacy AI simulation data (deprecated)
- `/lib/mock-data/agent-analyses.json` - Real AI analysis storage with complete audit trail
- `/services/github-data-service.ts` - GitHub integration mock
- Inline mock data in governance dashboard
- **Real Claude API integration** for AI analysis with cost tracking

#### Type System
Key type definitions in `/src/types/`:
- `governance.ts` - Governance structures
- `agents.ts` - AI agent definitions (legacy)
- `mcp.ts` - Model Context Protocol (150+ lines)
- `github-compatible.ts` - GitHub API types

Real AI type definitions in `/src/lib/ai/`:
- `types.ts` - Complete AI analysis interfaces with discussion context tracking
- `prompts.ts` - Personal vs System AI prompt templates
- `claude-service.ts` - Core Claude API integration with cost calculation
- `enhanced-claude-service.ts` - Rules-based analysis with MCP integration

Rules as Instructions system in `/src/lib/governance/`:
- `analysis-rules.json` - 10 formal rule definitions with branch-specific parameters
- `rule-interpreter.ts` - Rule execution engine with MCP tool integration
- `types.ts` - Rule system interfaces (RuleContext, RuleResult, RuleParameters)

MCP tools in `/src/lib/mcp/`:
- `analysis-tools.ts` - 4 MCP tools for governance data access (getBranchElements, getElementUsage, getBranchPhilosophy, getElementVersion)

### Page Routes
1. `/` - Overview with 4-layer architecture
2. `/about` - Deep dive into system architecture
3. `/mission` - Vision and philosophical foundation
4. `/how-it-works` - Interactive demos (AgentAssignmentPanel)
5. `/governance` - Live dashboard with tabs
6. `/ideas` - VS Code-style governance explorer (2,099 lines of data)
7. `/git-structure` - Technical implementation
8. `/versioned-ethics` - AI governance philosophy

## Key Development Patterns

### Component Development
When creating new components:
1. Use existing shared components when possible
2. Follow the established pattern in `/components/shared/`
3. Use TypeScript strict mode
4. Include Lucide React icons for consistency

### Adding New Pages
1. Create page in `/src/app/[route]/page.tsx`
2. Use `HeroSection` for consistent headers
3. Import reusable components from `@/components/shared/`
4. Follow existing page patterns

### TypeScript Path Aliases
```typescript
import { Component } from "@/components/ui/button";  // Maps to ./src/components/ui/button
import { mockData } from "@/lib/mock-data";         // Maps to ./src/lib/mock-data
```

### Styling Guidelines
- Use Tailwind CSS utilities
- Dark mode support via `dark:` prefix
- CSS variables defined in `globals.css`
- Responsive design with mobile-first approach

## Current Status

### ✅ Implemented
- 8 fully functional pages with rich content
- 35+ shadcn/ui components integrated
- Comprehensive type system
- Reusable component architecture (35% code reduction)
- Interactive governance dashboard
- Sophisticated Ideas page with VS Code-style interface
- 2,099 lines of mock governance data across 6 JSON files
- Academic-level documentation
- **Complete real AI integration with Claude API**
- **Personal vs System AI distinction with real analysis**
- **Real-time cost tracking and transparency**
- **Discussion Modal with live AI assistance**
- **Agent Assignment Panel with actual Claude analysis**
- **Analysis history with complete audit trails**
- **✅ Element analysis cross-component integration** - Ideas page → Discussion Modal
- **✅ Version-specific discussion threading** - Each element version has separate discussions
- **✅ Auto-discussion creation** - Automatic discussion threads for all governance elements
- **✅ Rules as Instructions architecture** - 10 task types converted to formal rules
- **✅ MCP tool integration** - 4 tools for dynamic governance data access
- **✅ Dynamic context system** - Real user values and domain-appropriate baselines
- **✅ Zero breaking changes migration** - Enhanced service maintains full API compatibility

### 📋 Not Implemented
- Testing framework (no Jest/Vitest)
- CI/CD pipeline
- Database integration (using JSON storage for AI analyses)
- Authentication system
- Docker configuration
- Forum/discussion pages (10+ broken links to `/forum` routes)

### ⚠️ Environment Requirements
- **ANTHROPIC_API_KEY** required for real AI functionality
- Claude API credits needed for AI analysis features
- Create `.env.local` with API key for full functionality

## Real AI Integration

### Overview
DAHAO features complete integration with Claude 3.5 Sonnet API through a sophisticated **Rules as Instructions** architecture that provides intelligent AI analysis of governance elements.

### Architecture Highlights
- **Rules as Instructions**: 10 task types converted to formal rule definitions with MCP tool integration
- **Enhanced Claude Service**: Zero breaking changes migration with automatic fallback to legacy system
- **Dynamic Context System**: Extracts real user values from governance branches and domain-appropriate baselines
- **MCP Tools**: 4 tools for accessing governance data (getBranchElements, getElementUsage, getBranchPhilosophy, getElementVersion)
- **Rule Interpreter**: 364-line TypeScript engine for executing rules with parameter customization

### Key Features
- **Personal AI**: Analyzes governance using extracted user values from actual governance branch modifications
- **System AI**: Provides domain-appropriate validation using community-specific DAHAO baselines (Animal Welfare, Environmental, etc.)
- **Cost transparency**: Real-time token usage and cost calculation ($0.006-$0.013 per analysis)
- **Discussion integration**: Right-click any comment for instant AI analysis
- **Complete audit trail**: All analyses stored with full metadata and context
- **Branch-specific parameters**: Rule customization based on governance domain (animal welfare vs music industry)
- **Smart baseline detection**: Automatic suggestion of appropriate validation standards

### Usage Examples

#### Ideas Page AI Analysis
```typescript
// Click 🤖 button on any governance element
// Select agent type (Personal/System) and task type
// View real Claude analysis with confidence scores
```

#### Discussion Modal AI Actions
```typescript
// Right-click any comment in discussion timeline
// Select from context menu:
// - "Ask Personal AI to elaborate"
// - "Request System validation"
// - "Get research on this point"
// See real AI response appear in timeline with cost info

// ✅ Element analyses from Ideas page automatically appear
// Green cards display at top of Discussion Modal timeline
// Complete cross-component integration working
```

### API Endpoints
- `POST /api/ai/analyze` - Process new AI analysis requests
- `GET /api/ai/analyses` - Retrieve analysis history
  - `?elementId=<id>` - Get analyses for governance element
  - `?discussionId=<id>` - Get all analyses in discussion
  - `?commentId=<id>` - Get analyses for specific comment

### Environment Setup
```bash
# Required for AI functionality
echo "ANTHROPIC_API_KEY=sk-ant-api03-your-key" >> .env.local

# Test integration
npm run dev
# Navigate to /ideas, click any 🤖 button
# Click external link (↗) to see analysis in Discussion Modal
```

### ✅ Recent AI Integration Fixes (2025-06-24)

**Element Analysis Display Issue Resolved**:
- **Problem**: Element analyses created via Ideas page 🤖 buttons were not displaying in Discussion Modal
- **Root Cause**: UI timeline logic only checked for comments, not element analyses
- **Solution**: Fixed `hasDiscussion` logic to show timeline when element analyses exist

**Key Technical Fix**:
```typescript
// BEFORE: Only showed timeline if comments existed
const hasDiscussion = activeDiscussion && activeDiscussion.comments.length > 0;

// AFTER: Shows timeline if comments OR element analyses exist
const hasDiscussion = activeDiscussion && (
  activeDiscussion.comments.length > 0 ||
  realAIAnalyses.filter(a => a.target?.elementId && !a.request?.commentId).length > 0
);
```

**Features Now Working**:
- ✅ Element analyses appear as green cards in Discussion Modal
- ✅ Cross-component data sharing between Ideas page and Discussion Modal
- ✅ Version-specific discussion threading
- ✅ Auto-discussion creation for elements without existing threads
- ✅ Complete debugging system with comprehensive logging

## Common Tasks

### Update Page Content
Most page content is directly in the page components. To update:
```bash
# Edit the page directly
vim src/app/[page-name]/page.tsx

# Run dev server to preview
npm run dev
```

### Add New shadcn/ui Component
```bash
# Components are already installed, import from:
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

### Work with AI Integration
- **Real AI analyses**: Stored in `/lib/mock-data/agent-analyses.json` with complete metadata
- **API endpoints**: `/api/ai/analyze` for analysis processing, `/api/ai/analyses` for retrieval
- **Cost tracking**: Real-time Claude API usage and cost calculation
- **Rules as Instructions**: Use `EnhancedClaudeService` for rule-based analysis with automatic fallback
- **Rule definitions**: Modify `/lib/governance/analysis-rules.json` to customize analysis behavior
- **MCP tools**: Located in `/lib/mcp/analysis-tools.ts` for governance data access
- **Dynamic context**: User values extracted from `/lib/utils/user-values.ts`, system baselines from `/lib/utils/system-values.ts`

### Work with Mock Data
- Legacy agent responses: `/lib/mock-data/agent-responses.ts` (deprecated)
- Governance data: Inline in `/app/governance/page.tsx`
- GitHub data: `/services/github-data-service.ts`
- Ideas page data: 6 JSON files in `/lib/mock-data/`:
  - `branches.json` - Branch hierarchy (446 lines)
  - `elements-terms.json` - Versioned terms (547 lines)
  - `elements-principles.json` - Principles (372 lines)
  - `elements-rules.json` - Rules (439 lines)
  - `elements-metarules.json` - Meta-rules (114 lines)
  - `discussions.json` - Community activity (181 lines)
  - `agent-analyses.json` - Real AI analysis storage (auto-generated)

## Performance Considerations
- Next.js 15 with server components by default
- Standalone output for optimized production builds
- Images optimized through Next.js Image component
- GitHub avatars whitelisted in `next.config.js`

## Error Handling
- TypeScript strict mode catches type errors at compile time
- ESLint configured for Next.js best practices
- Build will fail on TypeScript or ESLint errors (intentional for quality)

## Rules as Instructions Architecture

### Core Concept
The system now uses a sophisticated **Rules as Instructions** architecture where all AI analysis tasks are defined as natural language rules executed by a rule interpreter with MCP tool integration.

### Rule System Components

#### 1. Rule Definitions (`/lib/governance/analysis-rules.json`)
10 formal rules converted from task types:
- `definition-clarity-rule` - Analyze term definition clarity
- `usage-consistency-rule` - Check cross-element usage consistency  
- `evolution-analysis-rule` - Historical change analysis and prediction
- `philosophical-consistency-rule` - Philosophy alignment verification
- `implementation-feasibility-rule` - Practical implementation assessment
- `cross-domain-impact-rule` - Multi-domain effect analysis
- `enforcement-mechanism-rule` - Enforcement practicality evaluation
- `compliance-framework-rule` - Framework integration verification
- `implementation-requirements-rule` - Detailed requirement specification
- `general-analysis-rule` - Comprehensive multi-perspective analysis

#### 2. Rule Interpreter (`/lib/governance/rule-interpreter.ts`)
- Loads rule definitions dynamically
- Resolves branch-specific parameter overrides
- Executes MCP tools for governance context
- Constructs intelligent prompts with real data
- Maintains cost tracking and error handling

#### 3. MCP Tools (`/lib/mcp/analysis-tools.ts`)
- `getBranchElementsTool` - Get governance elements for specific branch
- `getBranchPhilosophyTool` - Extract philosophical foundation and principles
- `getElementUsageTool` - Analyze element usage across documents
- `getElementVersionTool` - Get specific version with full details

#### 4. Enhanced Claude Service (`/lib/ai/enhanced-claude-service.ts`)
- Extends original ClaudeService with zero breaking changes
- Maps task types to rule IDs automatically
- Provides fallback mechanism to legacy prompts
- Integrates dynamic context extraction

### Branch-Specific Customization
Rules adapt to governance domains:
- **Animal Welfare**: Detailed analysis with ethical implications focus
- **Music Industry**: Practical application with 75% consistency threshold
- **Environmental**: Comprehensive analysis with environmental impact consideration
- **Core DAHAO**: Baseline parameters for general governance

### Dynamic Context System
- **User Values**: Extracted from actual governance branch modifications
- **System Baselines**: Domain-appropriate validation standards (Animal Welfare DAHAO, Environmental DAHAO)
- **Smart Detection**: Automatic baseline suggestion based on element content
- **Context Transparency**: Full audit trail of values and baselines used

## Known Issues
- **Broken Forum Links**: Multiple pages contain links to non-existent `/forum` routes
  - Affects CTAs on Home, About, How-it-works, Governance, and Versioned-ethics pages
  - Links like `/forum`, `/forum/issues/{id}`, `/forum/proposals/{id}` will 404
  - These represent planned but unimplemented discussion features
