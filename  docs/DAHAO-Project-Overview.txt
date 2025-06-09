DAHAO Project Overview for Claude Code
Project Vision
DAHAO (Decentralized Autonomous Hybrid-AI Organization) is a revolutionary platform for human-AI collaborative governance. The core innovation is versioned ethics frameworks that evolve through community consensus, powered by AI agents that provide analytical support.
Current Architecture
Frontend (Next.js 14 + TypeScript)

Pages: App router with multiple explanation/landing pages
Components: Reusable UI components using shadcn/ui
Authentication: GitHub OAuth integration
Styling: Tailwind CSS

Backend APIs (Next.js API Routes)

Authentication: /api/auth/ - GitHub OAuth flow
Documents: /api/documents/ and /api/public/documents/ - Ethics framework management
Governance: /api/governance/ - Proposal and voting system (placeholder)
Git Integration: /api/git/ - Repository operations

Key Directories
├── app/                          # Next.js app directory
│   ├── (pages)/                  # Main application pages
│   ├── api/                      # API routes
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components (Header, etc.)
│   └── constitution/             # Ethics framework components
├── lib/                          # Utility libraries
│   ├── auth/                     # Authentication utilities
│   └── utils.ts                  # General utilities
├── hooks/                        # React hooks
├── store/                        # State management
└── types/                        # TypeScript type definitions
Core Concepts
1. Versioned Ethics

Ethics frameworks stored as YAML files (conceptually)
Version controlled like software (v1.0, v1.1, v2.0)
Domain-specific ethics (animal welfare, music industry, environment)
Backward compatibility and migration paths

2. AI Agent System (Conceptual)

Personal Agents: Represent individual users' values
System Agents: Maintain governance integrity
Domain Agents: Provide specialized expertise
Integration planned with Claude Code and GitHub Actions

3. Democratic Governance

Proposals created as GitHub Issues
Discussion phase with human-AI collaboration
Voting mechanisms with threshold requirements
Automatic implementation of approved changes

Current Implementation Status
✅ Completed

Website structure with compelling landing pages
Basic authentication flow with GitHub OAuth
Document management API endpoints
Ethics framework component structure
Professional UI/UX explaining the vision

⚠️ Partial/Placeholder

Governance API endpoints (return "not implemented")
Voting system (basic structure, no real implementation)
Agent integration (conceptual, no real Claude Code integration)
Ethics versioning (file structure exists, automation missing)

❌ Not Implemented

Actual AI agent deployment
GitHub Actions workflows for automation
Real-time collaborative governance
Cross-domain intelligence sharing

Key Files to Understand
Core Application

app/layout.tsx - Root layout with header
app/page.tsx - Main landing page explaining DAHAO vision
app/constitution/page.tsx - Ethics framework browser

Important Pages

app/about/page.tsx - Detailed project explanation
app/how-it-works/page.tsx - Technical implementation vision
app/agents/page.tsx - AI agent architecture explanation
app/mission/page.tsx - Project mission and philosophy

API Implementation

app/api/auth/github/route.ts - GitHub OAuth implementation
app/api/public/documents/route.ts - Public document access
app/api/governance/proposals/route.ts - Governance (placeholder)

Components

components/constitution/SectionBrowser.tsx - Ethics navigation
components/constitution/DocumentViewer.tsx - Document display
components/layout/Header.tsx - Main navigation

Environment Configuration
Required Environment Variables
bash# GitHub Integration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REPO_OWNER=aigentone  # Your GitHub username
GITHUB_REPO_NAME=dahao_0     # Your repository name
GITHUB_BRANCH=main

# Document Storage
NEXT_PUBLIC_GITHUB_OWNER=aigentone
NEXT_PUBLIC_GITHUB_REPO=dahao_0
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_DOCUMENTS_PATH=dahao-template

# Optional
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
Technology Stack
Frontend

Next.js 14 - React framework with app router
TypeScript - Type safety
Tailwind CSS - Styling
shadcn/ui - Component library
Lucide React - Icons

Backend

Next.js API Routes - Backend functionality
GitHub API - Repository and OAuth integration
Octokit - GitHub API client

Authentication

GitHub OAuth - User authentication
HTTP-only cookies - Session management

Development Patterns
File Naming

Pages: page.tsx (Next.js app router)
Components: PascalCase (SectionBrowser.tsx)
API routes: route.ts
Utilities: camelCase (usePublicDocument.ts)

Component Structure

Use TypeScript interfaces for props
Implement proper error handling
Include loading states
Use shadcn/ui components consistently

API Patterns

RESTful endpoints where possible
Consistent error response format
Proper HTTP status codes
Environment-based configuration

Git Repository Integration
The project uses GitHub as both:

Source code repository - Standard development workflow
Document storage - Ethics frameworks stored in repo
Governance platform - Issues for proposals, PRs for implementation

Repository Structure (Expected)
repository/
├── dahao-template/          # Ethics documents
│   ├── core-ethics.md
│   ├── animal-welfare.md
│   └── music-industry.md
├── governance/              # Governance files
└── agents/                  # Agent configurations
Common Development Tasks
Adding New Pages

Create page in app/(pages)/new-page/page.tsx
Add navigation link in components/layout/Header.tsx
Update routing if needed

API Development

Create route in app/api/endpoint/route.ts
Implement proper HTTP methods (GET, POST, PUT, DELETE)
Add authentication checks if needed
Handle errors consistently

Component Development

Create in appropriate components/ subdirectory
Use TypeScript interfaces for props
Follow shadcn/ui patterns
Add to exports if reusable

Known Issues & TODO
Priority Fixes Needed

GitHub Actions Integration - No automation workflows exist
Real Agent Deployment - Currently conceptual only
Governance Implementation - APIs return placeholders
Ethics Versioning - Manual process, needs automation

Code Cleanup

Remove placeholder API endpoints
Implement real voting mechanisms
Add proper error boundaries
Improve loading states

External Dependencies to Monitor
Note for Claude Code: Search for recent information about these when working with them:
APIs & Services

GitHub API - Check current rate limits and capabilities
Claude Code API - Latest integration patterns
Next.js - Latest app router features and best practices

Libraries

Octokit - GitHub API client updates
shadcn/ui - New component releases
Tailwind CSS - Latest utility classes

Integration Patterns

GitHub Actions - Latest workflow patterns for automation
Claude Code MCP - Model Context Protocol updates
GitHub Copilot - Integration capabilities

Success Metrics
The project will be successful when:

✅ Users can browse and understand ethics frameworks
⚠️ Community can propose and discuss ethics updates
❌ AI agents participate in governance discussions
❌ Voting and implementation is automated
❌ Organizations can fork and customize their governance

Current status: Strong foundation (1), partial implementation (2), conceptual only (3-5).
