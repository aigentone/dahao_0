import React from 'react';
import { Suspense } from 'react';
import { DiscussionList } from '@/components/github-compatible/DiscussionList';
import { createGitHubDataService } from '@/services/github-data-service';

interface PageProps {
  params: {
    domain: string;
    term: string;
  };
}

export default async function TermForumPage({ params }: PageProps) {
  const basePath = `/forum/${params.domain}/terms/${params.term}`;
  
  // Fetch discussions data
  const dataService = createGitHubDataService();
  const owner = params.domain;
  const repo = `${params.domain}/${params.term}`;
  
  const discussions = await dataService.getDiscussions(owner, repo);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {params.term} Term Discussions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Community discussions for the {params.term} term definition
        </p>
      </div>

      {/* Discussions Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {discussions.totalCount} {discussions.totalCount === 1 ? 'discussion' : 'discussions'}
        </p>
      </div>

      {/* Discussion List */}
      <Suspense fallback={<div>Loading discussions...</div>}>
        <DiscussionList discussions={discussions.nodes} basePath={basePath} />
      </Suspense>
    </div>
  );
}