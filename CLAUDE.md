# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DAHAO (道) is a **Decentralized Autonomous Hybrid-AI Organization** platform that enables humans and AI agents to collaborate on versioned governance using Git workflows. Built as a Next.js 14 application with TypeScript, it provides GitHub-native governance tools where constitutional documents and governance decisions evolve like code.

## Key Architecture

### Frontend Framework
- **Next.js 14** with App Router (`src/app/`)
- **TypeScript** with strict configuration
- **Tailwind CSS** for styling
- **Radix UI** components for accessible UI primitives

### State Management & Data Flow
- **Zustand** with Immer for state management (`src/store/`)
- **Store Slices**: Authentication, Git operations, Document management, Governance
- **React Hooks** for data fetching (`src/hooks/`)

### Core Systems

#### Git Integration (`src/lib/git/`)
- **GitOperationsManager**: Core Git operations using `simple-git`
- **GitHub Provider**: OAuth integration and repository management  
- **Version Control**: File history, diffs, branch management for governance documents

#### Document Management (`src/lib/yaml/`)
- **YamlProcessor**: YAML parsing/serialization for governance documents
- **Schema Validation**: AJV-based validation for DAHAO document structure
- **Document Types**: Constitution sections, proposals, governance rules, member profiles

#### Template System (`dahao-template/`)
- **Constitutional Framework**: Versioned governance documents
- **Member Management**: Role definitions and voting rules
- **Token Economics**: Governance token configuration
- **Proposals**: Decision-making workflow templates

## Development Commands

### Setup & Installation
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Configure GitHub OAuth in .env

# Initialize DAHAO template
npm run init:template
```

### Development Workflow
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server  
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Validate YAML structure
python scripts/validate.py
```

### Testing Commands
```bash
# Run all tests
npm test

# Watch mode for development
npm test:watch

# End-to-end tests
npm run test:e2e
```

## Component Architecture

### Layout Structure
- **Header** (`src/components/layout/Header.tsx`): Navigation and auth status
- **App Layout** (`src/app/layout.tsx`): Root layout with Inter font

### Constitution System (`src/components/constitution/`)
- **DocumentEditor**: Monaco editor with YAML validation and live preview
- **DocumentViewer**: Renders constitutional documents with metadata
- **SectionBrowser**: Navigate constitutional sections and view history
- **DiffViewer**: Git-style diff visualization for document changes

### Authentication (`src/components/auth/`)
- **LoginButton**: GitHub OAuth integration
- **Session Management**: User state persistence

## API Routes Structure

### Authentication (`src/app/api/auth/`)
- `github/route.ts`: GitHub OAuth callback handler
- `check-config/route.ts`: Validate GitHub OAuth configuration

### Document Management (`src/app/api/documents/`)
- `[...path]/route.ts`: Dynamic document CRUD operations
- Handles YAML files in the DAHAO template structure

### Git Operations (`src/app/api/git/`)
- `[...path]/route.ts`: Git repository operations (history, diff, commit)

### Governance (`src/app/api/governance/`)
- `proposals/route.ts`: Proposal management
- `proposals/[id]/route.ts`: Individual proposal operations

### Public API (`src/app/api/public/`)
- `documents/route.ts`: Public document access (read-only)

## Configuration Requirements

### Environment Variables (.env)
```bash
# GitHub OAuth (Required)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Session Security (Required)
SESSION_SECRET=your_secure_session_secret_min_32_chars

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GIT_PROVIDER=github
```

### GitHub OAuth Setup
1. Create OAuth App in GitHub Settings > Developer Settings
2. Set callback URL: `http://localhost:3000/api/auth/github/callback`
3. Add Client ID and Secret to `.env`

## DAHAO Template Structure

The `dahao-template/` directory contains the governance framework:

```
dahao-template/
├── constitution/          # Constitutional documents
│   ├── manifest.yaml     # Main constitution with sections
│   └── sections/         # Individual section files
├── governance/           # Governance framework
│   ├── members/         # Member profiles and roles  
│   ├── roles/           # Role definitions
│   └── rules/           # Voting and decision rules
├── terms/               # Term definitions and registry
│   ├── definitions/     # Glossary of governance terms
│   └── registry/        # Term registry index
├── proposals/           # Governance proposals (DIP format)
└── tokens/             # Token economics configuration
    └── economics.yaml  # Tokenomics parameters
```

## Key Development Patterns

### Document Editing Workflow
1. **Load Document**: Fetch YAML content via API
2. **Monaco Editor**: Syntax highlighting and validation
3. **Live Preview**: Real-time rendering with YAML parsing
4. **Git Integration**: Commit changes with proper messages
5. **History Tracking**: View document evolution via Git history

### Validation Pipeline
1. **YAML Syntax**: Monaco editor provides immediate feedback
2. **Schema Validation**: AJV validation against DAHAO schemas  
3. **Python Validator**: Repository structure validation (`scripts/validate.py`)
4. **Type Safety**: TypeScript interfaces for all document types

### State Management Pattern
```typescript
// Zustand store with Immer for immutable updates
const useStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createGitSlice(...a),
        ...createDocumentSlice(...a),
        ...createGovernanceSlice(...a),
        ...createAuthSlice(...a),
      }))
    )
  )
);
```

## Git Integration Workflow

### Document Version Control
- Each governance document is tracked in Git
- Changes create proper Git commits with structured messages
- Full audit trail of all governance decisions
- Branch-based proposal workflows

### Repository Operations
- **History**: View document evolution over time
- **Diffs**: Compare versions with syntax highlighting
- **Branches**: Proposal development on feature branches
- **Merging**: Governance decision implementation

## Common Development Tasks

### Adding New Document Types
1. Define TypeScript interface in `src/types/`
2. Add schema validation in `src/lib/validation/`
3. Create template in `dahao-template/`
4. Add API routes for CRUD operations
5. Build UI components for editing/viewing

### Extending Git Operations
1. Add methods to `GitOperationsManager`
2. Create corresponding API endpoints
3. Update store slices for state management
4. Build UI components for new operations

### Custom Validation Rules
1. Extend AJV schemas in `SchemaValidator`
2. Add Python validation rules in `scripts/validate.py`
3. Update TypeScript interfaces
4. Add error handling in document editor

## TypeScript Configuration

Path aliases configured in `tsconfig.json`:
- `@/*` maps to `./src/*` for clean imports
- Strict mode enabled for type safety
- Next.js plugin integration for App Router support