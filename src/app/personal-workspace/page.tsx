'use client';

import React, { useState } from 'react';
import { PersonalBranchCreator } from '@/components/forum/PersonalBranchCreator';
import { PersonalWorkspace } from '@/components/forum/PersonalWorkspace';

// Mock data for demonstration
const mockPersonalBranches = [
  {
    id: 'alex-env-branch',
    name: "Alex's Environmental Focus",
    parentDAHAO: 'environment',
    createdAt: '2024-01-15',
    status: 'active' as const,
    valueSystem: {
      coreValues: ['sustainability', 'environmental-protection', 'transparency'],
      customValues: ['carbon-neutrality', 'biodiversity-first'],
      priorityLevel: 'progressive'
    },
    aiAgent: {
      name: 'EcoBot Alex',
      status: 'active' as const,
      personalityTraits: ['analytical', 'detail-oriented', 'empathetic'],
      decisionMaking: 'hybrid',
      deploymentScope: ['governance-voting', 'proposal-analysis', 'research-assistance']
    },
    tokenEarnings: {
      totalEarned: 15420,
      currentBalance: 12850,
      lastWeekEarnings: 320,
      roi: 18.7
    },
    contributions: {
      termsProposed: 8,
      discussionsParticipated: 24,
      proposalsSubmitted: 5,
      votesParticipated: 47
    },
    progressToPublicPool: {
      completionPercentage: 72,
      requirements: [
        {
          name: 'Define 5+ Terms',
          completed: true,
          description: 'Create at least 5 domain-specific terms'
        },
        {
          name: 'Community Validation',
          completed: true,
          description: 'Get community approval for your value system'
        },
        {
          name: 'AI Agent Training',
          completed: false,
          description: 'Complete AI agent training with 1000+ decisions'
        },
        {
          name: 'Cross-Branch Collaboration',
          completed: false,
          description: 'Participate in 3+ cross-branch initiatives'
        }
      ]
    }
  },
  {
    id: 'alex-welfare-branch',
    name: "Alex's Animal Rights Focus",
    parentDAHAO: 'animal-welfare',
    createdAt: '2024-02-01',
    status: 'developing' as const,
    valueSystem: {
      coreValues: ['harm-prevention', 'equality', 'transparency'],
      customValues: ['sentience-recognition', 'welfare-priority'],
      priorityLevel: 'balanced'
    },
    aiAgent: {
      name: 'WelfareBot Alex',
      status: 'training' as const,
      personalityTraits: ['empathetic', 'cautious', 'detail-oriented'],
      decisionMaking: 'consensus',
      deploymentScope: ['governance-voting', 'community-mediation']
    },
    tokenEarnings: {
      totalEarned: 5240,
      currentBalance: 4850,
      lastWeekEarnings: 85,
      roi: 12.3
    },
    contributions: {
      termsProposed: 3,
      discussionsParticipated: 12,
      proposalsSubmitted: 2,
      votesParticipated: 18
    },
    progressToPublicPool: {
      completionPercentage: 35,
      requirements: [
        {
          name: 'Define 5+ Terms',
          completed: false,
          description: 'Create at least 5 domain-specific terms'
        },
        {
          name: 'Community Validation',
          completed: true,
          description: 'Get community approval for your value system'
        },
        {
          name: 'AI Agent Training',
          completed: false,
          description: 'Complete AI agent training with 1000+ decisions'
        },
        {
          name: 'Cross-Branch Collaboration',
          completed: false,
          description: 'Participate in 3+ cross-branch initiatives'
        }
      ]
    }
  }
];

const availableDAHAOs = [
  { id: 'core-governance', name: 'Core Governance' },
  { id: 'animal-welfare', name: 'Animal Welfare' },
  { id: 'environment', name: 'Environment' }
];

export default function PersonalWorkspacePage() {
  const [mode, setMode] = useState<'workspace' | 'creator'>('workspace');
  const [personalBranches, setPersonalBranches] = useState(mockPersonalBranches);
  const [activeBranchId, setActiveBranchId] = useState(mockPersonalBranches[0]?.id || null);

  const handleCreateBranch = (config: any) => {
    // In a real app, this would make an API call
    const newBranch = {
      id: `branch-${Date.now()}`,
      name: config.branchName,
      parentDAHAO: config.parentDAHAO,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'developing' as const,
      valueSystem: config.valueSystem,
      aiAgent: {
        name: config.aiAgentConfig.agentName,
        status: 'training' as const,
        personalityTraits: config.aiAgentConfig.personalityTraits,
        decisionMaking: config.aiAgentConfig.decisionMaking,
        deploymentScope: config.aiAgentConfig.deploymentScope
      },
      tokenEarnings: {
        totalEarned: 0,
        currentBalance: 0,
        lastWeekEarnings: 0,
        roi: 0
      },
      contributions: {
        termsProposed: 0,
        discussionsParticipated: 0,
        proposalsSubmitted: 0,
        votesParticipated: 0
      },
      progressToPublicPool: {
        completionPercentage: 0,
        requirements: [
          {
            name: 'Define 5+ Terms',
            completed: false,
            description: 'Create at least 5 domain-specific terms'
          },
          {
            name: 'Community Validation',
            completed: false,
            description: 'Get community approval for your value system'
          },
          {
            name: 'AI Agent Training',
            completed: false,
            description: 'Complete AI agent training with 1000+ decisions'
          },
          {
            name: 'Cross-Branch Collaboration',
            completed: false,
            description: 'Participate in 3+ cross-branch initiatives'
          }
        ]
      }
    };

    setPersonalBranches(prev => [...prev, newBranch]);
    setActiveBranchId(newBranch.id);
    setMode('workspace');
  };

  const handleSwitchBranch = (branchId: string) => {
    setActiveBranchId(branchId);
  };

  const handleCreateNewBranch = () => {
    setMode('creator');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Workspace</h1>
          <p className="text-xl text-gray-600">
            Manage your personal DAHAO branches, AI agents, and token earnings
          </p>
        </div>

        {mode === 'creator' ? (
          <div>
            <div className="mb-6">
              <button
                onClick={() => setMode('workspace')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Workspace
              </button>
            </div>
            <PersonalBranchCreator
              availableDAHAOs={availableDAHAOs}
              onCreateBranch={handleCreateBranch}
            />
          </div>
        ) : (
          <PersonalWorkspace
            personalBranches={personalBranches}
            activeBranchId={activeBranchId}
            onSwitchBranch={handleSwitchBranch}
            onCreateNewBranch={handleCreateNewBranch}
          />
        )}
      </div>
    </div>
  );
}