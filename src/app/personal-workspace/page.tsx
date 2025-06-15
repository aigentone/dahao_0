'use client';

import React from 'react';
import TermDevelopmentWorkspace from '@/components/term-development/TermDevelopmentWorkspace';

export default function PersonalWorkspacePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Term Development Workspace</h1>
          <p className="text-xl text-gray-600">
            Develop and refine term definitions using GitHub Issues with AI agent assistance
          </p>
        </div>

        <TermDevelopmentWorkspace />
      </div>
    </div>
  );
}