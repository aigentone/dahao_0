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
const GOVERNANCE_DATA = {
  terms: [
    {
      id: 'harm',
      name: 'Harm',
      version: '1.2.0',
      status: 'ratified',
      brief: 'Actions or states that negatively impact beings',
      lastModified: '2024-03-20',
      usedBy: ['principle:minimize-harm', 'rule:harm-reporting'],
      domain: 'core',
      githubIssue: 123
    },
    {
      id: 'transparency',
      name: 'Transparency',
      version: '1.1.0',
      status: 'ratified',
      brief: 'Open and auditable processes with clear documentation',
      lastModified: '2024-02-15',
      usedBy: ['principle:transparency-default', 'rule:decision-making'],
      domain: 'core',
      githubIssue: 89
    },
    {
      id: 'being',
      name: 'Being',
      version: '1.0.0',
      status: 'ratified',
      brief: 'Any entity capable of subjective experience',
      lastModified: '2024-01-10',
      usedBy: ['principle:minimize-harm', 'principle:equality'],
      domain: 'core',
      githubIssue: 45
    },
    {
      id: 'governance',
      name: 'Governance',
      version: '1.0.0',
      status: 'ratified',
      brief: 'System of rules, practices, and processes for collective decision-making',
      lastModified: '2024-01-05',
      usedBy: ['rule:proposal-lifecycle', 'meta:change-process'],
      domain: 'core',
      githubIssue: 12
    }
  ],
  principles: [
    {
      id: 'minimize-harm',
      name: 'Minimize Harm',
      version: '1.0.0',
      status: 'ratified',
      statement: 'All actions should minimize harm to all beings',
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
      statement: 'All governance processes must be transparent and create permanent records',
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
      statement: 'All governance changes must be approved through democratic processes',
      uses: ['term:governance@1.0.0'],
      implementedBy: ['rule:proposal-lifecycle', 'rule:voting-thresholds'],
      domain: 'core',
      githubIssue: 134
    }
  ],
  rules: [
    {
      id: 'proposal-lifecycle',
      name: 'Proposal Lifecycle',
      version: '1.0.0',
      status: 'ratified',
      purpose: 'Defines how proposals move through the system',
      implements: ['principle:democratic-evolution', 'principle:transparency-default'],
      keyRequirements: ['GitHub Issue required', '3-7 day discussion', '7 day voting'],
      domain: 'core',
      githubIssue: 201
    },
    {
      id: 'voting-thresholds',
      name: 'Voting Thresholds',
      version: '1.2.0',
      status: 'ratified',
      purpose: 'Sets approval requirements for different change types',
      implements: ['principle:democratic-evolution'],
      keyRequirements: ['Minor: >50%', 'Major: >67%', 'Constitutional: >75%'],
      domain: 'core',
      githubIssue: 234
    },
    {
      id: 'ai-agent-participation',
      name: 'AI Agent Participation',
      version: '1.0.0',
      status: 'proposed',
      purpose: 'Defines how AI agents participate in governance',
      implements: ['principle:transparency-default'],
      keyRequirements: ['AI must identify itself', 'No voting rights', 'Advisory only'],
      domain: 'core',
      githubIssue: 267
    }
  ],
  metaRules: [
    {
      id: 'change-process',
      name: 'How to Change Rules',
      version: '1.0.0',
      status: 'ratified',
      purpose: 'Defines the process for modifying governance itself',
      requirements: ['Test in branch first', '75% approval for meta changes'],
      githubIssue: 78
    },
    {
      id: 'version-control',
      name: 'Version Control Requirements',
      version: '1.0.0',
      status: 'ratified',
      purpose: 'Ensures all changes are tracked and reversible',
      requirements: ['Semantic versioning', 'Full history preservation'],
      githubIssue: 92
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
