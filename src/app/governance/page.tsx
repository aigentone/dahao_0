// app/governance/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen, Building, Scale, RefreshCw, Search, Filter,
  GitBranch, History, ExternalLink, ArrowRight, Clock,
  CheckCircle, AlertCircle, Users, TrendingUp, FileText,
  Eye, Edit, GitPullRequest, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// Mock data for governance elements
// Mock data for governance elements - Expanded for Phase 1
const GOVERNANCE_DATA = {
    terms: [
      // Core Foundational Terms
      {
        id: 'harm',
        name: 'Harm',
        version: '1.2.0',
        status: 'ratified',
        brief: 'Physical damage, psychological distress, systemic disadvantage, or dignity violation affecting any sentient being',
        lastModified: '2024-03-20',
        usedBy: ['principle:minimize-harm', 'rule:harm-reporting', 'rule:impact-assessment'],
        domain: 'core',
        githubIssue: 123
      },
      {
        id: 'transparency',
        name: 'Transparency',
        version: '1.1.0',
        status: 'ratified',
        brief: 'Open and auditable processes with clear documentation, excluding only privacy-sensitive information',
        lastModified: '2024-02-15',
        usedBy: ['principle:transparency-default', 'rule:decision-making', 'rule:public-records'],
        domain: 'core',
        githubIssue: 89
      },
      {
        id: 'being',
        name: 'Being',
        version: '1.0.0',
        status: 'ratified',
        brief: 'Any entity capable of subjective experience, including humans, sentient animals, and potentially conscious AI',
        lastModified: '2024-01-10',
        usedBy: ['principle:minimize-harm', 'principle:equality', 'principle:dignity-preservation'],
        domain: 'core',
        githubIssue: 45
      },
      {
        id: 'governance',
        name: 'Governance',
        version: '1.0.0',
        status: 'ratified',
        brief: 'System of rules, practices, and processes for collective decision-making that can evolve democratically',
        lastModified: '2024-01-05',
        usedBy: ['rule:proposal-lifecycle', 'meta:change-process', 'principle:democratic-evolution'],
        domain: 'core',
        githubIssue: 12
      },

      // Decision-Making Terms
      {
        id: 'consensus',
        name: 'Consensus',
        version: '1.0.0',
        status: 'ratified',
        brief: 'General agreement characterized by the absence of sustained opposition to substantial issues',
        lastModified: '2024-02-01',
        usedBy: ['principle:consensus-seeking', 'rule:consensus-building'],
        domain: 'core',
        githubIssue: 156
      },
      {
        id: 'proposal',
        name: 'Proposal',
        version: '1.1.0',
        status: 'ratified',
        brief: 'A formal suggestion for change to any governance element, requiring rationale and impact assessment',
        lastModified: '2024-02-28',
        usedBy: ['rule:proposal-lifecycle', 'rule:proposal-templates'],
        domain: 'core',
        githubIssue: 167
      },
      {
        id: 'vote',
        name: 'Vote',
        version: '1.0.0',
        status: 'ratified',
        brief: 'Formal expression of preference by a verified human participant in governance decisions',
        lastModified: '2024-01-15',
        usedBy: ['rule:voting-thresholds', 'rule:voting-privacy', 'principle:democratic-evolution'],
        domain: 'core',
        githubIssue: 78
      },

      // Participation Terms
      {
        id: 'participant',
        name: 'Participant',
        version: '1.0.0',
        status: 'ratified',
        brief: 'Any human who has joined DAHAO and can engage in governance activities',
        lastModified: '2024-01-20',
        usedBy: ['rule:participation-requirements', 'principle:equality'],
        domain: 'core',
        githubIssue: 92
      },
      {
        id: 'ai-agent',
        name: 'AI Agent',
        version: '1.1.0',
        status: 'ratified',
        brief: 'Artificial intelligence system that assists in governance analysis and can act on behalf of participants within defined boundaries',
        lastModified: '2024-03-10',
        usedBy: ['rule:ai-agent-participation', 'rule:ai-boundaries', 'principle:human-ai-collaboration'],
        domain: 'core',
        githubIssue: 234
      },
      {
        id: 'branch',
        name: 'Branch',
        version: '1.0.0',
        status: 'ratified',
        brief: 'A fork of governance that allows safe experimentation with modified rules while maintaining connection to core',
        lastModified: '2024-02-05',
        usedBy: ['rule:branch-creation', 'meta:fork-rights', 'principle:experimentation-freedom'],
        domain: 'core',
        githubIssue: 145
      },

      // Value Terms
      {
        id: 'dignity',
        name: 'Dignity',
        version: '1.0.0',
        status: 'ratified',
        brief: 'The inherent worth and right to respect of all beings, including autonomy and self-determination',
        lastModified: '2024-01-25',
        usedBy: ['principle:dignity-preservation', 'rule:respectful-discourse'],
        domain: 'core',
        githubIssue: 101
      },
      {
        id: 'equality',
        name: 'Equality',
        version: '1.0.0',
        status: 'ratified',
        brief: 'The state of having equal rights, opportunities, and treatment regardless of personal characteristics',
        lastModified: '2024-01-18',
        usedBy: ['principle:equality', 'rule:equal-participation'],
        domain: 'core',
        githubIssue: 67
      },
      {
        id: 'wellbeing',
        name: 'Wellbeing',
        version: '1.0.0',
        status: 'proposed',
        brief: 'The state of being comfortable, healthy, happy, and able to fulfill one\'s potential',
        lastModified: '2024-03-25',
        usedBy: ['principle:wellbeing-optimization'],
        domain: 'core',
        githubIssue: 289
      },

      // Process Terms
      {
        id: 'version',
        name: 'Version',
        version: '1.0.0',
        status: 'ratified',
        brief: 'A specific iteration of a governance element using semantic versioning (major.minor.patch)',
        lastModified: '2024-01-08',
        usedBy: ['meta:version-control', 'rule:version-dependencies'],
        domain: 'core',
        githubIssue: 34
      },
      {
        id: 'ratification',
        name: 'Ratification',
        version: '1.0.0',
        status: 'ratified',
        brief: 'The formal approval process by which proposals become active governance elements',
        lastModified: '2024-01-22',
        usedBy: ['rule:ratification-process', 'meta:change-process'],
        domain: 'core',
        githubIssue: 89
      },
      {
        id: 'deliberation',
        name: 'Deliberation',
        version: '1.0.0',
        status: 'ratified',
        brief: 'The careful consideration and discussion of proposals before decision-making',
        lastModified: '2024-02-12',
        usedBy: ['rule:deliberation-periods', 'principle:thoughtful-governance'],
        domain: 'core',
        githubIssue: 178
      }
    ],

    principles: [
      // Core Values
      {
        id: 'minimize-harm',
        name: 'Minimize Harm',
        version: '1.0.0',
        status: 'ratified',
        statement: 'All actions should minimize harm@v1.2.0 to all beings@v1.0.0',
        uses: ['term:harm@1.2.0', 'term:being@1.0.0'],
        implementedBy: ['rule:harm-reporting', 'rule:impact-assessment'],
        domain: 'core',
        githubIssue: 156
      },
      {
        id: 'transparency-default',
        name: 'Transparency by Default',
        version: '1.1.0',
        status: 'ratified',
        statement: 'All governance@v1.0.0 processes must be transparent@v1.1.0 and create permanent records',
        uses: ['term:transparency@1.1.0', 'term:governance@1.0.0'],
        implementedBy: ['rule:public-records', 'rule:open-voting'],
        domain: 'core',
        githubIssue: 178
      },
      {
        id: 'democratic-evolution',
        name: 'Democratic Evolution',
        version: '1.0.0',
        status: 'ratified',
        statement: 'All governance@v1.0.0 changes must be approved through democratic vote@v1.0.0 by participants@v1.0.0',
        uses: ['term:governance@1.0.0', 'term:vote@1.0.0', 'term:participant@1.0.0'],
        implementedBy: ['rule:proposal-lifecycle', 'rule:voting-thresholds'],
        domain: 'core',
        githubIssue: 134
      },

      // Participation Principles
      {
        id: 'equality',
        name: 'Equal Participation',
        version: '1.0.0',
        status: 'ratified',
        statement: 'All participants@v1.0.0 have equality@v1.0.0 in governance regardless of their contributions or characteristics',
        uses: ['term:participant@1.0.0', 'term:equality@1.0.0'],
        implementedBy: ['rule:equal-participation', 'rule:one-person-one-vote'],
        domain: 'core',
        githubIssue: 201
      },
      {
        id: 'dignity-preservation',
        name: 'Preserve Dignity',
        version: '1.0.0',
        status: 'ratified',
        statement: 'All interactions must preserve the dignity@v1.0.0 of all beings@v1.0.0',
        uses: ['term:dignity@1.0.0', 'term:being@1.0.0'],
        implementedBy: ['rule:respectful-discourse', 'rule:harassment-prevention'],
        domain: 'core',
        githubIssue: 212
      },
      {
        id: 'consensus-seeking',
        name: 'Seek Consensus',
        version: '1.0.0',
        status: 'ratified',
        statement: 'Decisions should seek consensus@v1.0.0 through deliberation@v1.0.0 before resorting to voting',
        uses: ['term:consensus@1.0.0', 'term:deliberation@1.0.0'],
        implementedBy: ['rule:consensus-building', 'rule:extended-discussion'],
        domain: 'core',
        githubIssue: 223
      },

      // Evolution Principles
      {
        id: 'experimentation-freedom',
        name: 'Freedom to Experiment',
        version: '1.0.0',
        status: 'ratified',
        statement: 'Participants@v1.0.0 can create branch@v1.0.0 to safely experiment with governance changes',
        uses: ['term:participant@1.0.0', 'term:branch@1.0.0'],
        implementedBy: ['rule:branch-creation', 'rule:branch-merging'],
        domain: 'core',
        githubIssue: 245
      },
      {
        id: 'continuous-improvement',
        name: 'Continuous Improvement',
        version: '1.0.0',
        status: 'ratified',
        statement: 'Governance@v1.0.0 should continuously evolve based on learning and changing needs',
        uses: ['term:governance@1.0.0'],
        implementedBy: ['rule:periodic-review', 'rule:improvement-proposals'],
        domain: 'core',
        githubIssue: 256
      },
      {
        id: 'thoughtful-governance',
        name: 'Thoughtful Decision-Making',
        version: '1.0.0',
        status: 'ratified',
        statement: 'All proposals@v1.1.0 require adequate deliberation@v1.0.0 before ratification@v1.0.0',
        uses: ['term:proposal@1.1.0', 'term:deliberation@1.0.0', 'term:ratification@1.0.0'],
        implementedBy: ['rule:deliberation-periods', 'rule:cooling-off-period'],
        domain: 'core',
        githubIssue: 267
      },

      // AI Collaboration
      {
        id: 'human-ai-collaboration',
        name: 'Human-AI Collaboration',
        version: '1.0.0',
        status: 'proposed',
        statement: 'AI agents@v1.1.0 enhance human decision-making but participants@v1.0.0 maintain ultimate authority',
        uses: ['term:ai-agent@1.1.0', 'term:participant@1.0.0'],
        implementedBy: ['rule:ai-agent-participation', 'rule:ai-boundaries'],
        domain: 'core',
        githubIssue: 278
      },
      {
        id: 'wellbeing-optimization',
        name: 'Optimize Wellbeing',
        version: '1.0.0',
        status: 'proposed',
        statement: 'Governance decisions should optimize wellbeing@v1.0.0 for all affected beings@v1.0.0',
        uses: ['term:wellbeing@1.0.0', 'term:being@1.0.0'],
        implementedBy: ['rule:wellbeing-metrics'],
        domain: 'core',
        githubIssue: 290
      }
    ],

    rules: [
      // Proposal & Voting Rules
      {
        id: 'proposal-lifecycle',
        name: 'Proposal Lifecycle',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Defines how proposals move through the system from creation to ratification',
        implements: ['principle:democratic-evolution', 'principle:transparency-default'],
        keyRequirements: [
          'GitHub Issue required for all proposals',
          '3-day minimum discussion for minor changes',
          '7-day minimum discussion for major changes',
          '7-day voting period after discussion'
        ],
        domain: 'core',
        githubIssue: 201
      },
      {
        id: 'voting-thresholds',
        name: 'Voting Thresholds',
        version: '1.2.0',
        status: 'ratified',
        purpose: 'Sets approval requirements for different types of governance changes',
        implements: ['principle:democratic-evolution'],
        keyRequirements: [
          'Term clarifications: >40% approval',
          'Minor changes: >50% approval',
          'Major changes: >67% approval',
          'Constitutional (meta-rule) changes: >75% approval'
        ],
        domain: 'core',
        githubIssue: 234
      },
      {
        id: 'proposal-templates',
        name: 'Proposal Templates',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Standardizes proposal formats for consistency and completeness',
        implements: ['principle:transparency-default', 'principle:thoughtful-governance'],
        keyRequirements: [
          'Rationale section required',
          'Impact assessment required',
          'Alternative considerations required',
          'Implementation plan required for rules'
        ],
        domain: 'core',
        githubIssue: 245
      },

      // Participation Rules
      {
        id: 'participation-requirements',
        name: 'Participation Requirements',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Defines who can participate in governance and how',
        implements: ['principle:equality', 'principle:transparency-default'],
        keyRequirements: [
          'GitHub account required',
          'Email verification required',
          'Agreement to community guidelines',
          'No other barriers to entry'
        ],
        domain: 'core',
        githubIssue: 256
      },
      {
        id: 'equal-participation',
        name: 'Equal Participation Rights',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures all participants have equal voice in governance',
        implements: ['principle:equality'],
        keyRequirements: [
          'One person, one vote',
          'No weighted voting in Phase 1',
          'Equal proposal rights',
          'Equal discussion rights'
        ],
        domain: 'core',
        githubIssue: 267
      },
      {
        id: 'respectful-discourse',
        name: 'Respectful Discourse',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Maintains dignity and constructive dialogue in all interactions',
        implements: ['principle:dignity-preservation'],
        keyRequirements: [
          'No personal attacks',
          'Focus on ideas, not individuals',
          'Assume good faith',
          'Acknowledge different perspectives'
        ],
        domain: 'core',
        githubIssue: 278
      },

      // AI Participation Rules
      {
        id: 'ai-agent-participation',
        name: 'AI Agent Participation',
        version: '1.0.0',
        status: 'proposed',
        purpose: 'Defines how AI agents participate in governance processes',
        implements: ['principle:transparency-default', 'principle:human-ai-collaboration'],
        keyRequirements: [
          'AI must identify itself clearly',
          'AI cannot vote independently',
          'AI can analyze and suggest',
          'AI actions must be auditable'
        ],
        domain: 'core',
        githubIssue: 289
      },
      {
        id: 'ai-boundaries',
        name: 'AI Agent Boundaries',
        version: '1.0.0',
        status: 'proposed',
        purpose: 'Sets clear limits on AI agent authority and capabilities',
        implements: ['principle:human-ai-collaboration'],
        keyRequirements: [
          'Humans define all terms',
          'Humans approve all changes',
          'AI cannot create meta-rules',
          'AI suggestions require human sponsor'
        ],
        domain: 'core',
        githubIssue: 290
      },

      // Process Rules
      {
        id: 'deliberation-periods',
        name: 'Deliberation Periods',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures adequate time for thoughtful consideration of proposals',
        implements: ['principle:thoughtful-governance', 'principle:consensus-seeking'],
        keyRequirements: [
          'Minimum 3 days for minor changes',
          'Minimum 7 days for major changes',
          'Minimum 14 days for meta-rule changes',
          'Extensions allowed by request'
        ],
        domain: 'core',
        githubIssue: 301
      },
      {
        id: 'consensus-building',
        name: 'Consensus Building Process',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Encourages finding common ground before formal voting',
        implements: ['principle:consensus-seeking'],
        keyRequirements: [
          'Facilitator role for contentious issues',
          'Structured dialogue process',
          'Document areas of agreement',
          'Identify core disagreements'
        ],
        domain: 'core',
        githubIssue: 312
      },
      {
        id: 'branch-creation',
        name: 'Branch Creation Rights',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Enables participants to experiment with governance variations',
        implements: ['principle:experimentation-freedom'],
        keyRequirements: [
          'Any participant can create a branch',
          'Branches must declare divergences',
          'Branches maintain connection to core',
          'Successful experiments can merge back'
        ],
        domain: 'core',
        githubIssue: 323
      },

      // Record Keeping
      {
        id: 'public-records',
        name: 'Public Record Requirements',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures all governance activities are permanently recorded',
        implements: ['principle:transparency-default'],
        keyRequirements: [
          'All proposals in GitHub Issues',
          'All votes recorded on-chain',
          'All discussions preserved',
          'Version history maintained'
        ],
        domain: 'core',
        githubIssue: 334
      },
      {
        id: 'impact-assessment',
        name: 'Impact Assessment',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Requires analysis of potential effects before changes',
        implements: ['principle:minimize-harm', 'principle:thoughtful-governance'],
        keyRequirements: [
          'Identify affected parties',
          'Analyze potential harms',
          'Consider unintended consequences',
          'Propose mitigation strategies'
        ],
        domain: 'core',
        githubIssue: 345
      },
      {
        id: 'periodic-review',
        name: 'Periodic Governance Review',
        version: '1.0.0',
        status: 'proposed',
        purpose: 'Ensures governance remains effective and relevant',
        implements: ['principle:continuous-improvement'],
        keyRequirements: [
          'Quarterly effectiveness review',
          'Annual full governance audit',
          'Community feedback collection',
          'Sunset clause evaluation'
        ],
        domain: 'core',
        githubIssue: 356
      }
    ],

    metaRules: [
      // Core Meta-Rules
      {
        id: 'change-process',
        name: 'How to Change Governance',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Defines the fundamental process for modifying any part of the governance system',
        requirements: [
          'All changes must go through proposal process',
          'Changes must be tested in branch first (recommended)',
          '75% approval required for meta-rule changes',
          'Emergency changes expire after 72 hours without ratification'
        ],
        githubIssue: 78
      },
      {
        id: 'version-control',
        name: 'Version Control Requirements',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures all governance elements are properly versioned and tracked',
        requirements: [
          'Semantic versioning (major.minor.patch) required',
          'Full history preservation mandatory',
          'Dependencies must reference specific versions',
          'Breaking changes require major version bump'
        ],
        githubIssue: 92
      },

      // Rights and Freedoms
      {
        id: 'fork-rights',
        name: 'Right to Fork',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Guarantees the right to create alternative governance branches',
        requirements: [
          'Unrestricted right to fork governance',
          'Forks must acknowledge source',
          'No permission required to fork',
          'Merge-back rights preserved'
        ],
        githubIssue: 103
      },
      {
        id: 'exit-rights',
        name: 'Right to Exit',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures participants can leave without penalty',
        requirements: [
          'Participants can leave at any time',
          'No exit penalties or restrictions',
          'Data portability guaranteed',
          'Contributions remain attributed'
        ],
        githubIssue: 114
      },

      // System Integrity
      {
        id: 'immutability-guarantee',
        name: 'Historical Immutability',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Ensures past versions and history cannot be altered',
        requirements: [
          'Published versions are immutable',
          'History cannot be rewritten',
          'Timestamps must be preserved',
          'Audit trail must be complete'
        ],
        githubIssue: 125
      },
      {
        id: 'bootstrap-protection',
        name: 'Bootstrap Protection',
        version: '1.0.0',
        status: 'ratified',
        purpose: 'Prevents fundamental system corruption during early phases',
        requirements: [
          'Core principles require 75% to modify',
          'Meta-rules require 75% to modify',
          'Emergency powers auto-expire',
          'Fork rights cannot be removed'
        ],
        githubIssue: 136
      },

      // Evolution Mechanics
      {
        id: 'deprecation-process',
        name: 'Deprecation Process',
        version: '1.0.0',
        status: 'proposed',
        purpose: 'Defines how obsolete governance elements are phased out',
        requirements: [
          'Deprecation warnings for 30 days minimum',
          'Migration path must be provided',
          'Historical versions remain accessible',
          'Dependent elements must be updated'
        ],
        githubIssue: 147
      },
      {
        id: 'emergency-powers',
        name: 'Emergency Powers Protocol',
        version: '1.0.0',
        status: 'proposed',
        purpose: 'Enables rapid response to critical situations while preventing abuse',
        requirements: [
          '3 participants can declare emergency',
          'Emergency powers last maximum 72 hours',
          'All emergency actions must be logged',
          'Full review required post-emergency'
        ],
        githubIssue: 158
      }
    ]
  };
// Component for displaying governance stats
function GovernanceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23</div>
          <p className="text-xs text-muted-foreground">+3 this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">All ratified</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Operational Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">2 proposed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Participation Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">73%</div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Component for term cards
function TermCard({ term }: { term: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {term.name}
              <Badge variant="outline" className="text-xs">v{term.version}</Badge>
            </CardTitle>
            <CardDescription className="mt-1">{term.brief}</CardDescription>
          </div>
          <Badge className={
            term.status === 'ratified' ? 'bg-green-100 text-green-800' :
            term.status === 'proposed' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }>
            {term.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(term.lastModified).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              {term.domain}
            </span>
          </div>

          {term.usedBy.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Used by:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {term.usedBy.map((item: string) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item.split(':')[1]}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/forum/issues/${term.githubIssue}`}>
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/forum/issues/${term.githubIssue}/history`}>
                <History className="h-3 w-3 mr-1" />
                History
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-3 w-3 mr-1" />
              Propose Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for principle cards
function PrincipleCard({ principle }: { principle: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {principle.name}
              <Badge variant="outline" className="text-xs">v{principle.version}</Badge>
            </CardTitle>
          </div>
          <Badge className="bg-green-100 text-green-800">
            {principle.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm font-medium">{principle.statement}</p>

          <div className="grid gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Uses terms:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {principle.uses.map((term: string) => (
                  <Badge key={term} variant="outline" className="text-xs">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Implemented by:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {principle.implementedBy.map((rule: string) => (
                  <Badge key={rule} variant="secondary" className="text-xs">
                    {rule.split(':')[1]}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/forum/issues/${principle.githubIssue}`}>
                <GitPullRequest className="h-3 w-3 mr-1" />
                GitHub Discussion
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component for rule cards
function RuleCard({ rule }: { rule: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {rule.name}
              <Badge variant="outline" className="text-xs">v{rule.version}</Badge>
            </CardTitle>
            <CardDescription className="mt-1">{rule.purpose}</CardDescription>
          </div>
          <Badge className={
            rule.status === 'ratified' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }>
            {rule.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm">
            <span className="text-muted-foreground">Key Requirements:</span>
            <ul className="mt-1 space-y-1">
              {rule.keyRequirements.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Implements:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {rule.implements.map((principle: string) => (
                <Badge key={principle} variant="secondary" className="text-xs">
                  {principle.split(':')[1]}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/forum/issues/${rule.githubIssue}`}>
                <GitPullRequest className="h-3 w-3 mr-1" />
                View Discussion
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Active Proposals component
function ActiveProposals() {
  const proposals = [
    {
      id: 1,
      title: 'Add "digital harm" to harm definition',
      type: 'term',
      proposer: '@alice',
      status: 'voting',
      support: 78,
      daysLeft: 3
    },
    {
      id: 2,
      title: 'New rule: Automated proposal summaries',
      type: 'rule',
      proposer: '@bob',
      status: 'discussion',
      support: 0,
      daysLeft: 5
    },
    {
      id: 3,
      title: 'Reduce minor change threshold to 45%',
      type: 'meta-rule',
      proposer: '@carol',
      status: 'discussion',
      support: 0,
      daysLeft: 12
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          Active Proposals
        </CardTitle>
        <CardDescription>
          Governance changes currently under consideration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proposals.map(proposal => (
            <div key={proposal.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {proposal.type}
                  </Badge>
                  <span className="font-medium">{proposal.title}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>by {proposal.proposer}</span>
                  <span>{proposal.daysLeft} days left</span>
                  {proposal.status === 'voting' && (
                    <span className="text-green-600 font-medium">{proposal.support}% support</span>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/forum/proposals/${proposal.id}`}>
                  View <ChevronRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function GovernancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPersonalBranch, setShowPersonalBranch] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">DAHAO Governance</h1>
            <p className="text-muted-foreground mt-1">
              The living constitution of our self-improving governance system
            </p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-lg px-3 py-1">
              Core v1.2.0
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: December 15, 2024
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search governance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={domainFilter} onValueChange={setDomainFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              <SelectItem value="core">Core</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ratified">Ratified</SelectItem>
              <SelectItem value="proposed">Proposed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showPersonalBranch ? "default" : "outline"}
            onClick={() => setShowPersonalBranch(!showPersonalBranch)}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            {showPersonalBranch ? "Showing Personal" : "Show Personal"}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <GovernanceStats />

      {/* Active Proposals Alert */}
      <div className="mb-8">
        <ActiveProposals />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="terms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="terms" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Terms
          </TabsTrigger>
          <TabsTrigger value="principles" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Principles
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="meta" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Meta-Rules
          </TabsTrigger>
        </TabsList>

        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Defined Terms</h2>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {GOVERNANCE_DATA.terms.map(term => (
              <TermCard key={term.id} term={term} />
            ))}
          </div>
        </TabsContent>

        {/* Principles Tab */}
        <TabsContent value="principles" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Core Principles</h2>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid gap-4">
            {GOVERNANCE_DATA.principles.map(principle => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </TabsContent>

        {/* Rules Tab */}
        <TabsContent value="rules" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Operational Rules</h2>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid gap-4">
            {GOVERNANCE_DATA.rules.map(rule => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        </TabsContent>

        {/* Meta-Rules Tab */}
        <TabsContent value="meta" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Meta-Rules</h2>
            <Badge variant="secondary">Constitutional Level</Badge>
          </div>

          <Card className="bg-orange-50 border-orange-200 mb-4">
            <CardContent className="pt-6">
              <p className="text-sm text-orange-800">
                <strong>⚠️ Important:</strong> Meta-rules govern how governance itself can be changed.
                They require 75% approval to modify.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {GOVERNANCE_DATA.metaRules.map(rule => (
              <Card key={rule.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {rule.name}
                    <Badge variant="outline" className="text-xs">v{rule.version}</Badge>
                  </CardTitle>
                  <CardDescription>{rule.purpose}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Key Requirements:</span>
                      <ul className="mt-1 space-y-1">
                        {rule.requirements.map((req: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertCircle className="h-3 w-3 text-orange-600 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/forum/issues/${rule.githubIssue}`}>
                        <GitPullRequest className="h-3 w-3 mr-1" />
                        View Discussion
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Personal Branch Comparison */}
      {showPersonalBranch && (
        <Card className="mt-8 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-purple-600" />
              Your Personal Branch Differences
            </CardTitle>
            <CardDescription>
              Showing modifications in your personal governance branch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium mb-2">Modified Terms (2)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>transparency v1.1.0 → v1.2.0-personal</span>
                    <Badge variant="outline" className="text-xs">+radical honesty</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>harm v1.2.0 → v1.3.0-personal</span>
                    <Badge variant="outline" className="text-xs">+environmental damage</Badge>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Additional Principles (1)</h4>
                <div className="text-sm">
                  <div className="flex items-center justify-between">
                    <span>ecological-sustainability</span>
                    <Badge variant="outline" className="text-xs">personal only</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <GitPullRequest className="h-4 w-4 mr-2" />
                Propose Personal Changes to Core
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
