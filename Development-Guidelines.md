Development Guidelines for Claude Code
Working with DAHAO Codebase
Code Style & Patterns
TypeScript Standards
typescript// ✅ Good: Proper interface definition
interface ProposalProps {
  title: string;
  description: string;
  type: 'ethics_update' | 'operational' | 'emergency';
  author?: string;
}

// ✅ Good: Component with proper typing
const ProposalCard: React.FC<ProposalProps> = ({ title, description, type }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

// ❌ Avoid: Any types
const proposal: any = {...}
API Route Patterns
typescript// ✅ Follow existing pattern from app/api/public/documents/route.ts
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
Component Structure
typescript// ✅ Follow pattern from components/constitution/DocumentViewer.tsx
'use client';

import React from 'react';
import { SomeImport } from '@/lib/utils';

interface ComponentProps {
  // Define props
}

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic

  return (
    <div className="container mx-auto px-4">
      {/* Content */}
    </div>
  );
};
File Organization
When Creating New Files

Pages: Place in app/(pages)/new-page/page.tsx
API Routes: Place in app/api/category/route.ts
Components: Organize by category in components/category/
Utilities: Add to lib/category/ or lib/utils.ts
Hooks: Place in hooks/useSomething.ts
Types: Add to existing files in types/ or create new ones

Import Patterns
typescript// ✅ Use absolute imports consistently
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { someUtil } from '@/lib/utils';

// ✅ Group imports logically
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { CustomComponent } from '@/components/custom/CustomComponent';

import { apiCall } from '@/lib/api';
import { formatDate } from '@/lib/utils';
Environment & Configuration
Working with Environment Variables
typescript// ✅ Check both runtime and build-time variables
const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'aigentone';
const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO || 'dahao_0';

// ✅ Server-side only variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
GitHub Integration
typescript// ✅ Follow pattern from existing GitHub API calls
const response = await fetch(
  `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
  {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DAHAO-App'
    }
  }
);
Authentication Patterns
Checking Authentication
typescript// ✅ Follow pattern from app/api/auth/github/route.ts
import { getSession } from '@/lib/auth/session';

// In API routes
const session = await getSession(request);
if (!session?.accessToken) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// In components
const { isAuthenticated, user } = useStore();
GitHub OAuth Flow

Follow existing implementation in app/api/auth/github/route.ts
Use secure HTTP-only cookies for session management
Handle callback properly with state verification

Error Handling
API Error Patterns
typescript// ✅ Consistent error handling
try {
  const result = await someOperation();
  return NextResponse.json(result);
} catch (error) {
  console.error('Operation failed:', error);

  if (error instanceof AuthError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
Component Error Handling
typescript// ✅ Include loading and error states
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Handle async operations
const handleAction = async () => {
  setIsLoading(true);
  setError(null);

  try {
    await someAsyncOperation();
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setIsLoading(false);
  }
};
UI/UX Guidelines
Using shadcn/ui Components
typescript// ✅ Follow existing patterns from app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// ✅ Consistent styling with Tailwind
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      Title
    </CardTitle>
  </CardHeader>
</Card>
Responsive Design
typescript// ✅ Use existing responsive patterns
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Content */}
</div>

<div className="max-w-4xl mx-auto px-4 py-16">
  {/* Container pattern from existing pages */}
</div>
Data Fetching Patterns
Client-Side Fetching
typescript// ✅ Follow pattern from hooks/usePublicDocument.ts
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/endpoint')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      setData(data);
      setIsLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
Server-Side Operations
typescript// ✅ Use Octokit for GitHub operations
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: session.accessToken });
const { data } = await octokit.repos.getContent({
  owner: REPO_OWNER,
  repo: REPO_NAME,
  path: filePath
});
Specific Implementation Guidelines
Ethics Framework Development

Ethics stored as YAML/Markdown files in GitHub repository
Version following semantic versioning (v1.0, v1.1, v2.0)
Always include backward compatibility considerations
Document migration paths between versions

Governance Features

Use GitHub Issues for proposals and discussions
Implement voting through structured comments
Track participation and quorum requirements
Maintain audit trail in Git history

Agent Integration (Future)

Prepare for Claude Code integration via MCP
Design APIs that work for both humans and agents
Include structured data formats for agent consumption
Plan for agent authentication and permissions

Testing & Quality
Before Committing

Type Check: npm run type-check
Build Test: npm run build
Lint Check: npm run lint
Test Core Flows: Authentication, navigation, basic API calls

Code Quality Checklist

 TypeScript types are properly defined
 Error handling is implemented
 Loading states are shown
 Responsive design is considered
 Accessibility attributes are included
 Performance implications are considered

Common Gotchas
Next.js App Router

Use 'use client' for client-side components
Server components can't use hooks or browser APIs
Dynamic routes use [param] and [...param] syntax

GitHub API

Rate limits apply (5000 requests/hour for authenticated users)
Public repo access doesn't require authentication
Content is base64 encoded and needs decoding

Authentication

GitHub OAuth requires proper redirect URLs
Session cookies need secure configuration in production
Check authentication on both client and server side

Environment Variables

NEXT_PUBLIC_ prefix required for client-side access
Server-side variables are private by default
Build-time vs runtime variable differences

Performance Considerations
Optimization Patterns
typescript// ✅ Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// ✅ Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});

// ✅ Optimize images
import Image from 'next/image';
<Image src="/image.jpg" alt="Description" width={500} height={300} />
API Optimization

Cache GitHub API responses when appropriate
Use pagination for large datasets
Implement proper loading states
Consider rate limiting implications
