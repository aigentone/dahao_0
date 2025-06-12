# Enhancement Goal: GitHub-Compatible Term & Principle Discussions/Issues

## Overview
Build term and principle-level discussions/issues that exactly mirror GitHub's structure and UI, using mock data that matches GitHub's API response format. This ensures seamless migration to real GitHub API later.

## Design Principle
**"Build once, swap data source"** - Every component, type, and API response should exactly match GitHub's structure.

## 1. GitHub-Exact Type Definitions

```typescript
// types/github-compatible.ts
// These types match GitHub's GraphQL API exactly

interface GitHubUser {
  login: string;
  id: string;
  avatarUrl: string;
  url: string;
}

interface GitHubLabel {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface GitHubDiscussion {
  id: string;
  number: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  closed: boolean;
  closedAt?: string;
  author: GitHubUser;
  category: {
    id: string;
    name: string;
    slug: string;
    emoji?: string;
  };
  labels: {
    nodes: GitHubLabel[];
  };
  comments: {
    totalCount: number;
    nodes: GitHubDiscussionComment[];
  };
  upvoteCount: number;
  answerChosenAt?: string;
  answer?: GitHubDiscussionComment;
}

interface GitHubIssue {
  id: string;
  number: number;
  title: string;
  body: string;
  state: 'OPEN' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  author: GitHubUser;
  assignees: {
    nodes: GitHubUser[];
  };
  labels: {
    nodes: GitHubLabel[];
  };
  milestone?: GitHubMilestone;
  comments: {
    totalCount: number;
    nodes: GitHubIssueComment[];
  };
}
2. Mock Data Structure (GitHub-Compatible)
yaml# dahao-governance/core-governance/terms/v1.0/harm/.github/discussions.yml
# This structure exactly matches GitHub's API response
discussions:
  - id: "D_kwDOAE5jvM4AQz5K"
    number: 1
    title: "Expanding 'harm' definition to include systemic harm"
    body: |
      ## Current Gap
      Current definition of harm@v1.1 covers individual harm well...
    createdAt: "2024-11-20T10:00:00Z"
    updatedAt: "2024-11-21T14:30:00Z"
    closed: false
    author:
      login: "social_justice_advocate"
      id: "MDQ6VXNlcjE="
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4"
      url: "https://github.com/social_justice_advocate"
    category:
      id: "DIC_kwDOAE5jvM4B-J8F"
      name: "Ideas"
      slug: "ideas"
      emoji: "💡"
    labels:
      nodes:
        - id: "MDU6TGFiZWwx"
          name: "enhancement"
          color: "a2eeef"
          description: "New feature or request"
    comments:
      totalCount: 2
      nodes:
        - id: "DC_kwDOAE5jvM4AQ0A1"
          body: "Strong support. Aligns with modern understanding..."
          createdAt: "2024-11-20T11:00:00Z"
          author:
            login: "ethics_professor"
            # ... full user object
    upvoteCount: 15
3. API Routes (GitHub-Compatible Responses)
typescript// app/api/github-mock/[owner]/[repo]/discussions/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const first = parseInt(searchParams.get('first') || '10');
  const after = searchParams.get('after');

  // Return GitHub GraphQL-style response
  return NextResponse.json({
    data: {
      repository: {
        discussions: {
          totalCount: 42,
          pageInfo: {
            hasNextPage: true,
            endCursor: "Y3Vyc29yOnYyOpK5MjAyNC0xMS0yMVQ..."
          },
          nodes: discussions, // From YAML, formatted as GitHub objects
        }
      }
    }
  });
}
4. UI Components (GitHub-Style)
tsx// components/github-compatible/DiscussionList.tsx
export function DiscussionList({ discussions }: { discussions: GitHubDiscussion[] }) {
  return (
    <div className="border rounded-lg">
      {discussions.map((discussion) => (
        <div key={discussion.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            {/* GitHub-style open/closed indicator */}
            <div className={`mt-1 ${discussion.closed ? 'text-purple-600' : 'text-green-600'}`}>
              {discussion.closed ? <CheckCircle /> : <Circle />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/forum/core-governance/terms/harm/discussions/${discussion.number}`}
                  className="text-base font-semibold hover:text-blue-600"
                >
                  {discussion.title}
                </Link>

                {/* GitHub-style labels */}
                {discussion.labels.nodes.map(label => (
                  <span
                    key={label.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `#${label.color}20`,
                      color: `#${label.color}`,
                      border: `1px solid #${label.color}40`
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>

              {/* GitHub-style metadata */}
              <div className="mt-1 text-sm text-gray-600">
                {discussion.category.emoji} {discussion.category.name} ·
                opened {formatDistanceToNow(new Date(discussion.createdAt))} ago by
                <Link href={discussion.author.url} className="font-medium">
                  {discussion.author.login}
                </Link>
                {discussion.comments.totalCount > 0 && (
                  <> · {discussion.comments.totalCount} comments</>
                )}
              </div>
            </div>

            {/* GitHub-style comment count */}
            {discussion.comments.totalCount > 0 && (
              <Link
                href={`/forum/core-governance/terms/harm/discussions/${discussion.number}`}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
              >
                <MessageSquare className="w-4 h-4" />
                {discussion.comments.totalCount}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
5. Routes (GitHub-Style URLs)
# GitHub-style routes
/forum/[domain]/terms/[term]/discussions              # List discussions
/forum/[domain]/terms/[term]/discussions/[number]     # Single discussion
/forum/[domain]/terms/[term]/issues                   # List issues
/forum/[domain]/terms/[term]/issues/[number]          # Single issue

# Match GitHub's tab structure
/forum/[domain]/terms/[term]                          # Overview (default to discussions)
/forum/[domain]/terms/[term]?tab=discussions
/forum/[domain]/terms/[term]?tab=issues
/forum/[domain]/terms/[term]?tab=history
6. Mock Data Service (Swappable Layer)
typescript// services/github-data-service.ts
interface IGitHubDataService {
  getDiscussions(owner: string, repo: string, options?: ListOptions): Promise<DiscussionConnection>;
  getDiscussion(owner: string, repo: string, number: number): Promise<GitHubDiscussion>;
  getIssues(owner: string, repo: string, options?: ListOptions): Promise<IssueConnection>;
  getIssue(owner: string, repo: string, number: number): Promise<GitHubIssue>;
}

// Mock implementation
export class MockGitHubDataService implements IGitHubDataService {
  async getDiscussions(owner: string, repo: string, options?: ListOptions) {
    // Load from YAML files
    const yamlPath = `dahao-governance/${owner}/terms/${repo}/.github/discussions.yml`;
    const data = await loadYaml(yamlPath);

    // Format exactly like GitHub's GraphQL response
    return {
      totalCount: data.discussions.length,
      pageInfo: {
        hasNextPage: false,
        endCursor: null
      },
      nodes: data.discussions
    };
  }
}

// Future: Real GitHub implementation
export class GitHubDataService implements IGitHubDataService {
  async getDiscussions(owner: string, repo: string, options?: ListOptions) {
    // Use Octokit or GraphQL to fetch from real GitHub
    const response = await octokit.graphql(`
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          discussions(first: 10) {
            totalCount
            nodes { ... }
          }
        }
      }
    `, { owner, repo });

    return response.repository.discussions;
  }
}

// In your app, use dependency injection
const dataService = process.env.USE_GITHUB_API
  ? new GitHubDataService()
  : new MockGitHubDataService();
7. Key Implementation Details
Label System (Exactly Like GitHub)
yaml# .github/labels.yml
labels:
  - name: "enhancement"
    color: "a2eeef"
    description: "New feature or request"
  - name: "bug"
    color: "d73a4a"
    description: "Something isn't working"
  - name: "documentation"
    color: "0075ca"
    description: "Improvements or additions to documentation"
Milestone System
yaml# .github/milestones.yml
milestones:
  - number: 1
    title: "v1.2 - Systemic Harm"
    description: "Expand harm definition to include systemic patterns"
    dueOn: "2025-03-31T00:00:00Z"
    state: "OPEN"
    closedAt: null
Category Configuration
yaml# .github/discussion-categories.yml
discussionCategories:
  - id: "DIC_kwDOAE5jvM4B-J8F"
    name: "Ideas"
    slug: "ideas"
    emoji: "💡"
    description: "Share ideas for new features"
  - id: "DIC_kwDOAE5jvM4B-J8G"
    name: "Q&A"
    slug: "q-a"
    emoji: "🙏"
    description: "Ask the community for help"
    isAnswerable: true
8. Benefits of This Approach

Zero UI Changes Later: When you switch to real GitHub API, all components work as-is
Exact Feature Parity: Labels, milestones, assignees all work like GitHub
Familiar to Users: Anyone who uses GitHub will instantly understand
Type Safety: Using GitHub's exact types prevents mismatches
Progressive Migration: Can switch one feature at a time

9. Migration Path
When ready to switch to real GitHub:
typescript// config/data-source.ts
export const dataSource = {
  // Just change this flag
  useRealGitHub: true,

  // Or do it per feature
  features: {
    discussions: 'github',  // or 'mock'
    issues: 'mock',        // migrate gradually
  }
};
No component changes needed - just swap the data service implementation!

This approach ensures that every piece of UI you build now will work identically when you connect to the real GitHub API later. You're essentially building a GitHub clone for your governance system that can seamlessly become GitHub-powered.
