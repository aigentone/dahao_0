Common Tasks and Workflows for Claude Code
Development Workflows
1. Adding a New Page
Task: Create a new page in the DAHAO application
Steps:

Create page file: app/(pages)/new-page/page.tsx
Follow the existing page pattern:
typescript'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Page Title
        </h1>
        {/* Content */}
      </div>
    </div>
  );
}

Add navigation link in components/layout/Header.tsx
Update routing if needed

Files to Modify:

app/(pages)/new-page/page.tsx (create)
components/layout/Header.tsx (add link)

2. Creating API Endpoints
Task: Add new API functionality
Steps:

Create route file: app/api/category/route.ts
Follow existing patterns from app/api/public/documents/route.ts:
typescriptimport { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

Add authentication if needed:
typescriptimport { getSession } from '@/lib/auth/session';

const session = await getSession(request);
if (!session?.accessToken) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}


Authentication Patterns:

Public endpoints: No auth required
Private endpoints: Use getSession() helper
GitHub operations: Use Octokit with session token

3. Adding New Components
Task: Create reusable UI components
Steps:

Create component in appropriate directory: components/category/ComponentName.tsx
Follow TypeScript patterns:
typescript'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const ComponentName: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div className="component-container">
      <h3>{title}</h3>
      {onAction && (
        <Button onClick={onAction}>Action</Button>
      )}
    </div>
  );
};

Export from category index if needed
Import and use in pages/components

Design Patterns:

Use shadcn/ui components as base
Follow Tailwind CSS classes from existing components
Include proper TypeScript interfaces
Handle loading and error states

4. GitHub Integration Tasks
Task: Work with GitHub API for document/governance operations
Common Operations:
Reading Files:
typescriptconst response = await fetch(
  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
  {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DAHAO-App'
    }
  }
);

const data = await response.json();
const content = Buffer.from(data.content, 'base64').toString('utf-8');
Creating/Updating Files:
typescriptimport { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: session.accessToken });

await octokit.repos.createOrUpdateFileContents({
  owner: REPO_OWNER,
  repo: REPO_NAME,
  path: filePath,
  message: 'Commit message',
  content: Buffer.from(content).toString('base64'),
  sha: existingSha, // For updates only
});
Branch Operations:
typescript// Create branch
await octokit.git.createRef({
  owner: REPO_OWNER,
  repo: REPO_NAME,
  ref: `refs/heads/${branchName}`,
  sha: mainBranch.commit.sha,
});

// List branches
const { data: branches } = await octokit.repos.listBranches({
  owner: REPO_OWNER,
  repo: REPO_NAME,
});
5. Ethics Framework Management
Task: Work with versioned ethics documents
Current Structure:

Ethics documents stored in repository at dahao-template/ path
Accessed via /api/public/documents/ endpoints
No versioning automation currently implemented

Reading Ethics:
typescript// Get specific ethics document
const response = await fetch('/api/public/documents/core-ethics.md');
const ethics = await response.json();

// List all ethics documents
const response = await fetch('/api/public/documents');
const documents = await response.json();
Creating Ethics Updates (Future):
typescript// This pattern is planned but not implemented
const proposal = {
  domain: 'animal-welfare',
  currentVersion: '1.0',
  proposedVersion: '1.1',
  changes: {
    // Proposed modifications
  },
  rationale: 'Why this change is needed'
};
6. Authentication Workflows
Task: Handle user authentication and session management
Check Authentication Status:
typescript// In components
import { useStore } from '@/store';

const { isAuthenticated, user } = useStore();

if (!isAuthenticated) {
  // Show login prompt
}
Login Flow:
typescript// Redirect to GitHub OAuth
window.location.href = '/api/auth/github';
Logout (Currently missing):
typescript// This needs to be implemented
const logout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  // Clear local state
};
Debugging Workflows
1. GitHub API Issues
Common Problems:

Rate limiting (403 errors)
Authentication failures (401 errors)
Repository not found (404 errors)
Content decoding issues

Debugging Steps:

Check environment variables:
typescriptconsole.log({
  REPO_OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER,
  REPO_NAME: process.env.NEXT_PUBLIC_GITHUB_REPO,
  DOCUMENTS_PATH: process.env.NEXT_PUBLIC_DOCUMENTS_PATH
});

Test GitHub API directly:
bashcurl -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/aigentone/dahao_0/contents/dahao-template

Check rate limits:
typescriptconst response = await fetch('https://api.github.com/rate_limit');
const limits = await response.json();
console.log(limits);


2. Authentication Issues
Common Problems:

OAuth configuration errors
Session cookie issues
Token expiration

Debugging Steps:

Check OAuth configuration at /api/auth/check-config
Verify environment variables:
bashGITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

Check session cookie in browser dev tools
Test GitHub token validity:
bashcurl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/user


3. Build and Runtime Issues
Common Problems:

TypeScript compilation errors
Missing dependencies
Environment variable mismatches

Debugging Commands:
bash# Type checking
npm run type-check

# Build test
npm run build

# Development with verbose logging
npm run dev -- --verbose

# Dependency check
npm ls
Testing Workflows
1. Manual Testing Checklist
Authentication Flow:

 Login redirects to GitHub
 OAuth callback works correctly
 User session persists across page reloads
 Logout clears session (when implemented)

Document Access:

 Public documents load without authentication
 Document content displays correctly
 Navigation between documents works
 Error handling for missing documents

UI/UX:

 Responsive design on mobile
 Loading states display
 Error messages are user-friendly
 Navigation works consistently

2. API Testing
Test Endpoints:
bash# Public document access
curl http://localhost:3000/api/public/documents

# Specific document
curl http://localhost:3000/api/public/documents/core-ethics.md

# Auth configuration check
curl http://localhost:3000/api/auth/check-config
GitHub Integration:
bash# Test GitHub API access
curl -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/repos/aigentone/dahao_0/contents/dahao-template
Deployment Workflows
1. Environment Setup
Production Environment Variables:
bash# Required for production
GITHUB_CLIENT_ID=production_client_id
GITHUB_CLIENT_SECRET=production_client_secret
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=production_secret

# Repository configuration
NEXT_PUBLIC_GITHUB_OWNER=aigentone
NEXT_PUBLIC_GITHUB_REPO=dahao_0
2. Build Process
Local Build Test:
bashnpm run build
npm start
Common Build Issues:

TypeScript errors: Fix type issues before deployment
Missing environment variables: Check all required vars
Import errors: Verify all imports are resolvable

3. Vercel Deployment
Automatic Deployment:

Pushes to main branch trigger deployment
Environment variables configured in Vercel dashboard
Build logs available in Vercel interface

Manual Deployment:
bashvercel --prod
Future Development Patterns
1. AI Agent Integration
When implementing Claude Code agents:

Create MCP server for Git operations
Design agent prompts for ethics analysis
Implement structured communication formats
Add agent authentication and permissions

2. Governance Automation
When building real governance:

Replace placeholder APIs with real implementations
Implement GitHub Issues → Proposals workflow
Add structured voting through comments
Create automatic implementation of approved changes

3. Advanced Features
Cross-domain intelligence:

Implement pattern recognition across ethics domains
Add agent-to-agent communication
Create learning from community decisions
Build reputation and trust systems

Performance optimization:

Add caching layer for GitHub API responses
Implement real-time updates via webhooks
Optimize bundle size and loading performance
Add comprehensive error monitoring
