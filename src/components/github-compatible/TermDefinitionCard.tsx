'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, Vote, Users, Calendar } from 'lucide-react';

interface TermDefinition {
  version: string;
  text: string;
  ratified_date: string;
  approval_rate: string;
  author: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  extends?: string;
  specificity?: string;
}

interface TermDefinitionCardProps {
  termName: string;
  domain: string;
  currentDefinition: TermDefinition;
  discussionUrl?: string;
}

export function TermDefinitionCard({ 
  termName, 
  domain, 
  currentDefinition, 
  discussionUrl 
}: TermDefinitionCardProps) {
  const formatApprovalRate = (rate: string) => {
    const numericRate = parseInt(rate.replace('%', ''));
    let colorClass = 'text-gray-600';
    if (numericRate >= 80) colorClass = 'text-green-600';
    else if (numericRate >= 60) colorClass = 'text-yellow-600';
    else colorClass = 'text-red-600';
    
    return <span className={colorClass}>{rate}</span>;
  };

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'core-governance': return 'blue';
      case 'animal-welfare': return 'emerald';
      case 'environment': return 'green';
      default: return 'gray';
    }
  };

  const domainColor = getDomainColor(domain);

  return (
    <div className={`bg-${domainColor}-50 border-l-4 border-${domainColor}-500 rounded-lg p-6 mb-6 shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className={`text-2xl font-bold text-${domainColor}-900`}>
            {termName}
            <span className="text-lg font-normal text-gray-600 ml-2">
              @{currentDefinition.version}
            </span>
          </h2>
          {currentDefinition.extends && (
            <span className={`text-sm bg-${domainColor}-200 text-${domainColor}-800 px-2 py-1 rounded`}>
              extends {currentDefinition.extends}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Active Definition
          </span>
        </div>
      </div>

      {/* Definition Text */}
      <blockquote className={`text-lg text-${domainColor}-800 mb-4 italic leading-relaxed`}>
        "{currentDefinition.text}"
      </blockquote>

      {/* Specificity Note */}
      {currentDefinition.specificity && (
        <div className={`text-sm text-${domainColor}-700 mb-4 p-3 bg-${domainColor}-100 rounded`}>
          <strong>Specificity:</strong> {currentDefinition.specificity}
        </div>
      )}

      {/* Metadata Row */}
      <div className="flex items-center gap-6 text-sm">
        {/* Ratification Date */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">
            Ratified {formatDistanceToNow(new Date(currentDefinition.ratified_date))} ago
          </span>
        </div>

        {/* Approval Rate */}
        <div className="flex items-center gap-2">
          <Vote className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">
            {formatApprovalRate(currentDefinition.approval_rate)} community approval
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600">by</span>
          <Link 
            href={currentDefinition.author.url}
            className={`text-${domainColor}-700 hover:text-${domainColor}-900 font-medium`}
          >
            {currentDefinition.author.login}
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      {discussionUrl && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Link
              href={discussionUrl}
              className={`inline-flex items-center px-4 py-2 bg-${domainColor}-600 text-white rounded-lg hover:bg-${domainColor}-700 transition-colors`}
            >
              View Discussion & History
            </Link>
            <Link
              href={`${discussionUrl}#propose-update`}
              className={`inline-flex items-center px-4 py-2 border border-${domainColor}-600 text-${domainColor}-700 rounded-lg hover:bg-${domainColor}-50 transition-colors`}
            >
              Propose Update
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}