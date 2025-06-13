import React from 'react';
import { notFound } from 'next/navigation';
import { DiscussionView } from '@/components/github-compatible/DiscussionView';
import { createGitHubDataService } from '@/services/github-data-service';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{
    domain: string;
    number: string;
  }>;
}

export default async function OrganizationDiscussionPage({ params }: PageProps) {
  const { domain, number } = await params;
  const dataService = createGitHubDataService();
  
  // Get all organization discussions and find the one with matching number
  const discussions = await dataService.getOrganizationDiscussions(domain);
  const discussion = discussions.nodes.find(d => d.number === parseInt(number));
  
  if (!discussion) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/forum"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to forum
        </Link>
      </div>

      {/* Discussion */}
      <DiscussionView discussion={discussion} />
    </div>
  );
}