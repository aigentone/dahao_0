import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TermDefinitionCard } from '@/components/github-compatible/TermDefinitionCard';
import { DiscussionView } from '@/components/github-compatible/DiscussionView';
import { TermDiscussion, GitHubDiscussion } from '@/types/github-compatible';

interface PageProps {
  params: {
    domain: string;
    term: string;
  };
}

async function getTermDiscussion(domain: string, term: string): Promise<TermDiscussion | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/terms/${domain}/${term}`, {
      cache: 'no-store' // Always get fresh data during development
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch term discussion:', error);
    return null;
  }
}

export default async function TermDiscussionPage({ params }: PageProps) {
  const { domain, term } = await params;
  const termDiscussion = await getTermDiscussion(domain, term);

  if (!termDiscussion) {
    notFound();
  }

  // Convert TermDiscussion to GitHubDiscussion format for DiscussionView component
  const discussionAsGitHub: GitHubDiscussion = {
    id: termDiscussion.id,
    number: termDiscussion.number,
    title: termDiscussion.title,
    body: `This is the democratic discussion for defining the term "${term}" in the ${domain} domain.`,
    createdAt: termDiscussion.createdAt,
    updatedAt: termDiscussion.updatedAt,
    closed: termDiscussion.closed,
    author: termDiscussion.current_definition.author,
    category: termDiscussion.category,
    labels: termDiscussion.labels,
    comments: termDiscussion.comments,
    upvoteCount: termDiscussion.upvoteCount,
    answer: termDiscussion.comments.nodes.find(comment => 
      comment.id === termDiscussion.current_definition.ratification_comment_id
    )
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link
            href="/forum"
            className="hover:text-blue-600"
          >
            Forum
          </Link>
          <span>/</span>
          <Link
            href={`/forum`}
            className="hover:text-blue-600"
          >
            {domain}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">terms</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{term}</span>
        </nav>

        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to forum
        </Link>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Term Definition: {term}
        </h1>
        <p className="text-gray-600">
          Democratic discussion and evolution of the "{term}" term in {domain} governance
        </p>
      </div>

      {/* Current Active Definition */}
      <TermDefinitionCard
        termName={term}
        domain={domain}
        currentDefinition={termDiscussion.current_definition}
      />

      {/* Version History Section */}
      {termDiscussion.version_history.length > 1 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Version History</h2>
          <div className="space-y-3">
            {termDiscussion.version_history.map((version) => (
              <div
                key={version.version}
                className={`p-4 border rounded-lg ${
                  version.status === 'active' 
                    ? 'border-green-200 bg-green-50' 
                    : version.status === 'superseded'
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{version.version}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      version.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : version.status === 'superseded'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {version.status}
                    </span>
                    {version.approval_rate && (
                      <span className="text-sm text-gray-600">
                        {version.approval_rate} approval
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {version.ratified_date ? 
                      `Ratified ${new Date(version.ratified_date).toLocaleDateString()}` :
                      `Proposed ${new Date(version.proposed_date).toLocaleDateString()}`
                    }
                  </div>
                </div>
                <p className="text-gray-700 italic">"{version.text}"</p>
                <div className="mt-2 text-sm text-gray-600">
                  Proposed by{' '}
                  <Link href={version.proposer.url} className="font-medium hover:underline">
                    {version.proposer.login}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proposed Versions Section */}
      {termDiscussion.proposed_versions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Proposed Updates</h2>
          <div className="space-y-3">
            {termDiscussion.proposed_versions.map((proposal) => (
              <div
                key={proposal.version}
                className="p-4 border border-blue-200 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{proposal.version}</span>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {proposal.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">
                      {proposal.current_support} support
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Proposed {new Date(proposal.proposed_date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-2">"{proposal.text}"</p>
                {proposal.changes_from_current && (
                  <div className="text-sm">
                    <strong>Changes:</strong>
                    <ul className="list-disc list-inside ml-2 text-gray-600">
                      {proposal.changes_from_current.map((change, index) => (
                        <li key={index}>{change}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 text-sm text-gray-600">
                  Proposed by{' '}
                  <Link href={proposal.proposer.url} className="font-medium hover:underline">
                    {proposal.proposer.login}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussion Thread */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Discussion</h2>
        <DiscussionView discussion={discussionAsGitHub} />
      </div>
    </div>
  );
}