// app/git-structure/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GitBranch, GitCommit, GitMerge, GitPullRequest,
  ArrowRight, ArrowDown, Users, Bot, Shield,
  Bell, Clock, CheckCircle, AlertCircle, Settings,
  Code, Layers, Network, Info, FileText, Zap
} from 'lucide-react';
import { HeroSection, FeatureCard } from '@/components/shared';

// Mock data for visualization
const GOVERNANCE_STRUCTURE = {
  core: {
    version: '1.3.0',
    terms: {
      harm: { version: '1.3.0', modified: '2024-12-10' },
      transparency: { version: '1.2.0', modified: '2024-11-15' },
      being: { version: '1.0.0', modified: '2024-01-10' }
    }
  },
  subDAHAOs: {
    'animal-welfare': {
      inherits: 'core@1.0.0',
      version: '2.1.0',
      terms: {
        harm: { version: '1.2-animal', modified: '2024-12-01', extends: 'core:harm@1.2.0' },
        'five-freedoms': { version: '1.0.0', modified: '2024-06-15', new: true }
      }
    },
    'music-industry': {
      inherits: 'core@1.0.0',
      version: '1.5.0',
      terms: {
        harm: { version: '1.2-music', modified: '2024-11-20', extends: 'core:harm@1.2.0' },
        'fair-distribution': { version: '1.1.0', modified: '2024-08-10', new: true }
      }
    }
  },
  personalBranches: {
    'john-smith': {
      inherits: 'core@1.2.0',
      participates: ['core', 'music-industry'],
      terms: {
        transparency: { version: '1.2-radical', extends: 'core:transparency@1.2.0' }
      }
    },
    'sarah-chen': {
      inherits: 'animal-welfare@2.0.0',
      participates: ['animal-welfare'],
      terms: {
        harm: { version: '1.2-animal-vegan', extends: 'animal:harm@1.2-animal' }
      }
    }
  }
};

export default function GitStructurePage() {
  const [selectedView, setSelectedView] = useState<'branching' | 'overview' | 'inheritance' | 'updates' | 'agents'>('branching');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [showUpdateFlow, setShowUpdateFlow] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection
        title="DAHAO Git Structure"
        subtitle="Fork, customize, and evolve governance - from concept to Git implementation"
        maxWidth="4xl"
        className="mb-8"
      />

      {/* Key Concepts */}
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <FeatureCard
          icon={GitCommit}
          iconColor="text-blue-600"
          title="Versioned Terms"
          description="Every term has semantic versions (1.2.3) with full history"
        />

        <FeatureCard
          icon={GitBranch}
          iconColor="text-green-600"
          title="Branch Independence"
          description="Sub-DAHAOs and personal branches evolve independently"
        />

        <FeatureCard
          icon={GitMerge}
          iconColor="text-purple-600"
          title="Update Propagation"
          description="Core updates trigger discussions in all sub-branches"
        />

        <FeatureCard
          icon={Network}
          iconColor="text-orange-600"
          title="Multi-Participation"
          description="Users and agents can work across multiple branches"
        />

        <FeatureCard
          icon={GitBranch}
          iconColor="text-indigo-600"
          title="Fork From Anywhere"
          description="Start from Core, specialized DAHAOs, or community branches"
        />
      </div>

      {/* Main Content */}
      <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="branching">Branching Concept</TabsTrigger>
          <TabsTrigger value="overview">Structure Overview</TabsTrigger>
          <TabsTrigger value="inheritance">Inheritance Chain</TabsTrigger>
          <TabsTrigger value="updates">Update Flow</TabsTrigger>
          <TabsTrigger value="agents">Agent System</TabsTrigger>
        </TabsList>

        {/* Branching Concept */}
        <TabsContent value="branching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How DAHAO Branching Works</CardTitle>
              <CardDescription>Your Governance, Your Way</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Introduction */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed">
                  DAHAO lets you create your own governance system by building on existing work. Think of it like GitHub for governance - you can fork, modify, and contribute back.
                </p>
              </div>

              {/* Starting Points */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Starting Points</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have to start from scratch. Choose any existing governance system:
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  <Card className="border-2 hover:border-blue-200 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Layers className="h-5 w-5 text-blue-600" />
                        Core DAHAO
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The vanilla foundation with basic governance rules
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-green-200 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-green-600" />
                        Specialized DAHAOs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Pre-built for specific domains (Animal Welfare, Environmental, Music Industry)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-purple-200 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        Community Branches
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Other users' innovations you can build upon
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Two Ways to Use DAHAO */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Two Ways to Use DAHAO</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        1. Reference Branch (Use As-Is)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="text-sm space-y-1">
                        <li>• Want to use existing governance without changes?</li>
                        <li>• Create a reference branch - you follow those exact rules</li>
                        <li>• No modifications needed</li>
                        <li>• Still counts as "your branch" for task automation</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-green-600" />
                        2. Forked Branch (Customize)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="text-sm space-y-1">
                        <li>• Want to modify anything? Even one word?</li>
                        <li>• Automatically creates your fork</li>
                        <li>• Inherits everything from parent</li>
                        <li>• Add your improvements on top</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Example Journey */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Example Journey</h3>
                <p className="text-sm text-muted-foreground mb-4">Sarah's path with visual cards:</p>
                
                <div className="space-y-3">
                  {[
                    { number: 1, text: "Browses available governance systems", icon: Users },
                    { number: 2, text: "Finds 'Animal Welfare DAHAO' interesting", icon: Layers },
                    { number: 3, text: "Likes it but wants to add 'wildlife protection' focus", icon: GitBranch },
                    { number: 4, text: "Edits one term → automatically forks", icon: Zap },
                    { number: 5, text: "Now has: All Animal Welfare rules + her wildlife additions", icon: CheckCircle },
                    { number: 6, text: "Others can fork from Sarah's branch too!", icon: Network }
                  ].map(step => (
                    <div key={step.number} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.number}
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <step.icon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <span className="text-sm">{step.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Agent Integration */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Agent Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Your AI agent automatically understands:</p>
                  <ul className="text-sm space-y-1 mb-4">
                    <li>• All rules from your current branch</li>
                    <li>• Everything inherited from parent branches</li>
                    <li>• Your custom modifications</li>
                  </ul>
                  
                  <p className="text-sm font-medium mb-2">Run tasks like:</p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      "Verify this follows our animal welfare principles"
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      "Research latest wildlife protection standards"
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      "Check if this proposal aligns with our values"
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Community Building */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Community Building</h3>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Start anywhere in the tree</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Build on others' work</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Share your improvements</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Create specialized governance for your needs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Propose successful experiments back upstream</span>
                  </div>
                </div>
              </div>

              {/* No Permission Needed */}
              <Card className="bg-purple-100 dark:bg-purple-950/40 border-purple-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">No Permission Needed</h3>
                    <p className="text-purple-800 dark:text-purple-200 font-medium">
                      "Fork anything. Experiment freely. Your branch is your laboratory for better governance."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Structure Overview */}
        <TabsContent value="overview" className="space-y-6">
          {/* Context Note */}
          <Card className="mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Proposed Implementation</p>
                  <p className="text-sm text-muted-foreground">
                    This GitHub structure is one possible way to implement DAHAO branching.
                    The community will decide the final technical approach.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Layer Governance Structure</CardTitle>
              <CardDescription>
                How Core, Sub-DAHAOs, and Personal branches organize
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visual Tree Structure */}
              <div className="space-y-6">
                {/* Core DAHAO */}
                <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold">Core DAHAO</h3>
                      <Badge variant="outline">v{GOVERNANCE_STRUCTURE.core.version}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Everyone votes</span>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-3">
                    {Object.entries(GOVERNANCE_STRUCTURE.core.terms).map(([term, data]) => (
                      <div
                        key={term}
                        className="bg-background p-2 rounded border cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedTerm(term)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{term}</span>
                          <Badge variant="secondary" className="text-xs">v{data.version}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {data.modified}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6 text-gray-400" />
                </div>

                {/* Sub-DAHAOs */}
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(GOVERNANCE_STRUCTURE.subDAHAOs).map(([name, data]) => (
                    <div key={name} className="border-2 border-green-200 rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold capitalize">{name.replace('-', ' ')} DAHAO</h4>
                          <Badge variant="outline">v{data.version}</Badge>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          inherits: {data.inherits}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {Object.entries(data.terms).map(([term, termData]) => (
                          <div key={term} className="bg-background p-2 rounded border text-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{term}</span>
                              <div className="flex items-center gap-2">
                                {'new' in termData && termData.new && <Badge className="text-xs bg-blue-50 dark:bg-blue-950/200">NEW</Badge>}
                                {'extends' in termData && termData.extends && <Badge variant="outline" className="text-xs">extends</Badge>}
                                <Badge variant="secondary" className="text-xs">v{termData.version}</Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>Has own System AI</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Branches */}
                <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50 dark:bg-purple-950/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Personal Branches
                  </h4>

                  <div className="grid gap-3 md:grid-cols-2">
                    {Object.entries(GOVERNANCE_STRUCTURE.personalBranches).map(([user, data]) => (
                      <div key={user} className="bg-background p-3 rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{user}</span>
                          <Badge variant="outline" className="text-xs">
                            inherits: {data.inherits}
                          </Badge>
                        </div>

                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-1">
                            <Network className="h-3 w-3" />
                            <span>Participates in: {data.participates.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bot className="h-3 w-3" />
                            <span>Personal AI agent active</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* GitHub Structure Preview */}
              <Card className="mt-6 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Actual GitHub Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`dahao/
├── core/
│   ├── governance/
│   │   ├── terms/
│   │   │   ├── harm.md (v1.3.0)
│   │   │   ├── transparency.md (v1.2.0)
│   │   │   └── being.md (v1.0.0)
│   │   ├── principles/
│   │   └── meta-rules/
│   └── agents/
│       └── core-system-ai/
│
├── domains/
│   ├── animal-welfare/
│   │   ├── governance/
│   │   ├── inheritance.yaml → core@1.0.0
│   │   └── agents/
│   │       └── animal-system-ai/
│   └── music-industry/
│       └── (same structure)
│
└── personal/
    ├── john-smith/
    │   ├── contribute_settings.yml
    │   ├── participations.yaml
    │   └── governance/
    └── sarah-chen/
        └── (same structure)`}
                  </pre>
                </CardContent>
              </Card>


{/* User Configuration */}
<Card className="mt-6 border-purple-200">
  <CardHeader>
    <CardTitle className="text-base flex items-center gap-2">
      <Settings className="h-5 w-5 text-purple-600" />
      User Contribution Settings
    </CardTitle>
    <CardDescription>
      Each user configures their automation preferences in contribute_settings.yml
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4 md:grid-cols-2">
      {/* Example Settings File */}
      <div>
        <h5 className="font-medium text-sm mb-2">John's Settings (Privacy-focused)</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`# contribute_settings.yml
agent:
  automated_voting: false
  voting_disclosure: private
  public_analysis: true

rate_limits:
  max_tasks_24h: 10
  max_analysis_per_issue: 1
  cooldown_between_tasks: 5m

tools:
  allowed:
    - analysis
    - verification
    - research
  restricted:
    - voting
    - moderation
  require_confirmation:
    - cross_domain_analysis

notifications:
  governance_updates: email
  proposal_results: in_app
  agent_reports: weekly

privacy:
  share_values: false
  allow_agent_requests: team_only
  activity_visibility: private`}</pre>
      </div>

      {/* Sarah's Open Settings */}
      <div>
        <h5 className="font-medium text-sm mb-2">Sarah's Settings (Open collaboration)</h5>
        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`# contribute_settings.yml
agent:
  automated_voting: true
  voting_threshold: 0.8
  voting_disclosure: public
  delegate_when_offline: 24h

rate_limits:
  max_tasks_24h: 100
  max_analysis_per_issue: 5
  parallel_tasks: 3

tools:
  allowed:
    - all
  auto_approve:
    - analysis
    - validation
    - verification
  require_confirmation:
    - voting

notifications:
  governance_updates: instant
  mentions: push
  agent_reports: realtime

collaboration:
  share_values: public
  allow_agent_requests: anyone
  cross_domain_sharing: true

reporting:
  daily_summary: true
  task_log: public
  voting_record: transparent`}</pre>
      </div>
    </div>

    {/* Configuration Impact */}
    <div className="mt-4 space-y-3">
      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
        <h5 className="font-medium text-sm mb-2">Automated Voting Settings</h5>
        <div className="grid gap-2 md:grid-cols-2 text-xs">
          <div>
            <Badge variant="outline" className="mb-1">Conservative</Badge>
            <p>Manual approval for each vote</p>
          </div>
          <div>
            <Badge variant="outline" className="mb-1">Delegated</Badge>
            <p>AI votes when confidence  threshold</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
        <h5 className="font-medium text-sm mb-2">Rate Limiting</h5>
        <p className="text-xs text-muted-foreground">
          Prevents spam and ensures quality analysis. Users set their own sustainable pace.
        </p>
      </div>

      <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
        <h5 className="font-medium text-sm mb-2">Privacy Controls</h5>
        <p className="text-xs text-muted-foreground">
          Users control who can request their AI and what information is shared.
        </p>
      </div>
    </div>
  </CardContent>
</Card>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Inheritance Chain */}
        <TabsContent value="inheritance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Term Inheritance & Evolution</CardTitle>
              <CardDescription>
                How terms evolve and extend across branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Term Evolution Visualization */}
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">Evolution of "harm" Term</h4>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

                    <div className="space-y-6">
                      {/* Core v1.0 */}
                      <div className="flex gap-4">
                        <div className="relative w-24">
                          <div className="w-4 h-4 bg-blue-600 rounded-full ml-10"></div>
                          <div className="absolute top-5 left-0 text-xs text-muted-foreground">
                            Jan 2024
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">Core</Badge>
                              <span className="font-medium">harm v1.0.0</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              "Physical damage to beings"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Branches inherit */}
                      <div className="flex gap-4">
                        <div className="relative w-24">
                          <GitBranch className="w-4 h-4 text-green-600 ml-10" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Animal Welfare and Music DAHAOs inherit core@1.0.0
                          </p>
                        </div>
                      </div>

                      {/* Core v1.2 */}
                      <div className="flex gap-4">
                        <div className="relative w-24">
                          <div className="w-4 h-4 bg-blue-600 rounded-full ml-10"></div>
                          <div className="absolute top-5 left-0 text-xs text-muted-foreground">
                            Jun 2024
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">Core</Badge>
                              <span className="font-medium">harm v1.2.0</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              + "Psychological distress"<br />
                              + "Opportunity limitation"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sub-DAHAO extensions */}
                      <div className="flex gap-4">
                        <div className="relative w-24">
                          <GitMerge className="w-4 h-4 text-purple-600 ml-10" />
                        </div>
                        <div className="flex-1 grid gap-3 md:grid-cols-2">
                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-900/50">Animal</Badge>
                              <span className="font-medium">harm v1.2-animal</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              extends core@1.2.0<br />
                              + "Confinement"<br />
                              + "Species-specific needs"
                            </p>
                          </div>

                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs bg-green-100 dark:bg-green-900/50">Music</Badge>
                              <span className="font-medium">harm v1.2-music</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              extends core@1.2.0<br />
                              + "Sonic pollution"<br />
                              + "Artist exploitation"
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Core v1.3 proposal */}
                      <div className="flex gap-4">
                        <div className="relative w-24">
                          <AlertCircle className="w-4 h-4 text-orange-600 ml-10" />
                          <div className="absolute top-5 left-0 text-xs text-muted-foreground">
                            NOW
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded border-2 border-orange-200 border-dashed">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs bg-orange-100 dark:bg-orange-900/50">Core Proposal</Badge>
                              <span className="font-medium">harm v1.3.0</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              + "Systemic disadvantage"<br />
                              + "Dignity violation"
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={() => setShowUpdateFlow(true)}
                            >
                              <Bell className="h-3 w-3 mr-1" />
                              See Update Flow
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Version Namespacing */}
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base">Version Namespacing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded">harm@core-v1.3.0</code>
                        <span className="text-muted-foreground">Core version</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded">harm@animal-v1.2-animal</code>
                        <span className="text-muted-foreground">Animal Welfare version</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded">harm@music-v1.2-music</code>
                        <span className="text-muted-foreground">Music Industry version</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="bg-background px-2 py-1 rounded">harm@personal-sarah-v1.2-animal-vegan</code>
                        <span className="text-muted-foreground">Personal branch version</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update Flow */}
        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Propagation Flow</CardTitle>
              <CardDescription>
                How governance updates flow through the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Update Process */}
                <div className="grid gap-4">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Core Proposal Created</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Someone proposes updating "harm" from v1.2 to v1.3
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded text-sm">
                          <code>GitHub Issue #234: Update harm definition to include systemic disadvantage</code>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Core Discussion & Vote</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          All Core DAHAO members discuss and vote (7-day period)
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline">156 participants</Badge>
                          <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">78% approval</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Automated Notifications</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          GitHub Actions creates discussions in all sub-DAHAOs
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Animal Welfare DAHAO - Discussion #45 created</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Music Industry DAHAO - Discussion #67 created</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>127 personal branches notified via email</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Sub-DAHAO Decisions</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Each sub-DAHAO independently decides how to respond
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                            <h5 className="font-medium text-sm mb-2">Animal Welfare Response</h5>
                            <Badge className="bg-green-600 text-xs">Adopt & Extend</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Creates harm v1.3-animal with core changes + their extensions
                            </p>
                          </div>
                          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded">
                            <h5 className="font-medium text-sm mb-2">Music Industry Response</h5>
                            <Badge className="bg-orange-600 text-xs">Keep Current</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              Stays with harm v1.2-music (incompatible changes)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        5
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">Personal Branch Updates</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Individual users decide for their personal branches
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">John: Updates to v1.3</Badge>
                          <Badge variant="outline" className="text-xs">Sarah: Keeps v1.2-animal-vegan</Badge>
                          <Badge variant="outline" className="text-xs">Alex: Forks new variant</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* GitHub Automation */}
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      GitHub Actions Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`name: Propagate Core Updates
on:
  pull_request:
    types: [closed]
    paths:
      - 'core/governance/**'

jobs:
  notify_sub_dahaos:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - name: Extract Changes
        run: |
          # Parse what governance elements changed

      - name: Create Sub-DAHAO Discussions
        run: |
          # For each sub-DAHAO, create a discussion
          # with impact analysis

      - name: Notify Personal Branches
        run: |
          # Send notifications to branch owners`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent System */}

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Layer Agent System & IssueOps</CardTitle>
              <CardDescription>
                How AI agents work across governance layers with automated issue analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">

                {/* IssueOps Automation */}
                <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <GitPullRequest className="h-5 w-5 text-blue-600" />
                      IssueOps: Automated Governance Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        Every comment on governance issues automatically triggers analysis by the commenter's personal AI agent.
                      </p>

                      {/* Task Types */}
                      <div className="bg-background p-3 rounded">
                        <h5 className="font-medium text-sm mb-2">Available Task Types</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          <Badge variant="outline">Analysis</Badge>
                          <Badge variant="outline">Validation</Badge>
                          <Badge variant="outline">Verification</Badge>
                          <Badge variant="outline">Moderation</Badge>
                          <Badge variant="outline">Research</Badge>
                        </div>
                      </div>

                      {/* Flow Example */}
                      <div className="bg-background p-3 rounded">
                        <h5 className="font-medium text-sm mb-2">Example Flow</h5>
                        <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
        {`Issue #234: "Update harm definition"

        @john: "This could affect our privacy rules"
          ↓ (automatic)
        @john-ai: "Analysis: This comment aligns with your
        privacy-first values. Potential conflict with
        transparency principle detected."

        @sarah: "@animal-ai validate against five freedoms"
          ↓ (manual request)
        @animal-ai: "Validation: Proposed change maintains
        compatibility with five freedoms framework."

        @alex: "@core-ai @music-ai research precedents"
          ↓ (multi-agent request)
        @core-ai: "Research: Found 3 similar updates..."
        @music-ai: "Research: Music industry impacts..."`}</pre>
                      </div>

                      {/* GitHub Action */}
                      <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                        <code>
        {`.github/workflows/issueops-analysis.yml

        on:
          issue_comment:
            types: [created]

        jobs:
          auto_analyze:
            runs-on: ubuntu-latest
            steps:
              - name: Detect User & Load Governance
                run: |
                  # Load user's personal branch
                  # Get their AI configuration

              - name: Call Personal AI via MCP
                run: |
                  mcp-tools analyze \\
                    --user $COMMENTER \\
                    --task "analysis" \\
                    --context $ISSUE_BODY`}</code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agent Types */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* System Agents */}
                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        System AI Agents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                          <h5 className="font-medium text-sm mb-1">Core System AI</h5>
                          <p className="text-xs text-muted-foreground">
                            Validates against universal DAHAO principles
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">Anyone can request</Badge>
                        </div>

                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                          <h5 className="font-medium text-sm mb-1">Animal Welfare System AI</h5>
                          <p className="text-xs text-muted-foreground">
                            Validates against animal-specific ethics
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">Anyone can request</Badge>
                        </div>

                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                          <h5 className="font-medium text-sm mb-1">Music Industry System AI</h5>
                          <p className="text-xs text-muted-foreground">
                            Validates against music industry standards
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">Anyone can request</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Agents */}
                  <Card className="border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bot className="h-5 w-5 text-purple-600" />
                        Personal AI Agents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                          <h5 className="font-medium text-sm mb-1">Your Personal AI</h5>
                          <p className="text-xs text-muted-foreground mb-2">
                            Automatically analyzes your comments
                          </p>
                          <div className="space-y-1 text-xs">
                            <div>✓ Uses your governance version</div>
                            <div>✓ Applies your value system</div>
                            <div>✓ Respects your privacy rules</div>
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                          <h5 className="font-medium text-sm mb-1">Others' Personal AIs</h5>
                          <p className="text-xs text-muted-foreground mb-2">
                            Can be requested if they allow it
                          </p>
                          <div className="space-y-1 text-xs">
                            <div>• @sarah-ai (public)</div>
                            <div>• @john-ai (private - no voting)</div>
                            <div>• @alex-ai (team only)</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Corrected Agent Access & Permissions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Agent Permissions Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Request Permissions */}
                      <div>
                        <h5 className="font-medium text-sm mb-2">Who Can REQUEST Analysis</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-muted/30">
                                <th className="text-left p-2">Agent</th>
                                <th className="text-center p-2">Anyone</th>
                                <th className="text-center p-2">Members</th>
                                <th className="text-center p-2">Owner</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="p-2 font-medium">Core System AI</td>
                                <td className="text-center p-2 text-green-600">✓</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2">-</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">Domain System AIs</td>
                                <td className="text-center p-2 text-green-600">✓</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2">-</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">Own Personal AI</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2 text-green-600">✓</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-2 font-medium">Others' Personal AI</td>
                                <td className="text-center p-2 text-orange-600">*</td>
                                <td className="text-center p-2">-</td>
                                <td className="text-center p-2">-</td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="text-xs text-muted-foreground mt-2">
                            * Only if owner has made it public
                          </p>
                        </div>
                      </div>

                      {/* Action Permissions */}
                      <div>
                        <h5 className="font-medium text-sm mb-2">What Users Can DO</h5>
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span><strong>Anyone:</strong> Comment, request analysis, create proposals</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span><strong>Members:</strong> Vote on proposals in their domains</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-600" />
                            <span><strong>Governance:</strong> Merge approved changes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                            <span><strong>Important:</strong> Analysis ≠ Authority to change</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cross-Domain Example - UPDATED */}
                <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-base">Example: Multi-Domain Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      Sarah (Animal DAHAO member) analyzes a Music DAHAO proposal:
                    </p>
                    <div className="bg-background p-3 rounded">
                      <pre className="text-xs overflow-x-auto">
        {`Issue: "Music festivals must provide water stations"

        @sarah: "This could reduce plastic waste and help animals"
          ↓ (automatic)
        @sarah-ai: "Analysis: Aligns with your environmental
        values. Cross-benefit for wildlife detected."

        @sarah: "@core-ai @animal-ai @music-ai validate"
          ↓ (multi-agent request)
        @core-ai: "Validation: Meets sustainability principle ✓"
        @animal-ai: "Validation: Reduces wildlife hazards ✓"
        @music-ai: "Validation: Industry best practice ✓"

        @sarah: "I propose adding wildlife-safe disposal requirement"
          ↓ (creates proposal)
        GitHub: "Proposal #235 created by @sarah (non-member)
        Status: Requires member sponsorship"`}</pre>
                    </div>

                    <div className="mt-3 p-3 bg-orange-100 dark:bg-orange-900/50 rounded">
                      <p className="text-xs font-medium text-orange-800">
                        Note: Sarah can analyze and propose, but can't vote in Music DAHAO
                        unless she's a member. Her proposal needs a Music DAHAO member to sponsor it.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Rule Constraints */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      Personal Rule Constraints
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      Personal branch rules follow users across all domains:
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                        <h5 className="font-medium text-sm">John's Privacy Rule</h5>
                        <code className="text-xs bg-background px-2 py-1 rounded">
                          "My AI agent cannot vote or reveal voting preferences"
                        </code>
                        <div className="mt-2 text-xs space-y-1">
                          <div>❌ John's AI cannot vote in ANY domain</div>
                          <div>❌ Cannot analyze voting patterns</div>
                          <div>✓ Can still analyze proposals</div>
                          <div>✓ Can provide non-voting recommendations</div>
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                        <h5 className="font-medium text-sm">Sarah's Open Rule</h5>
                        <code className="text-xs bg-background px-2 py-1 rounded">
                          "My AI agent is fully public and can assist anyone"
                        </code>
                        <div className="mt-2 text-xs space-y-1">
                          <div>✓ Anyone can request @sarah-ai</div>
                          <div>✓ Can vote on Sarah's behalf when offline</div>
                          <div>✓ Full transparency in all domains</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-600" />
                    Automated Operations Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Real-time Example */}
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <h5 className="font-medium text-sm mb-2">Live Activity Monitor</h5>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="text-green-600">
                          [09:15] @sarah-ai: Auto-analyzed Issue #234 (1/100 daily)
                        </div>
                        <div className="text-green-600">
                          [09:18] @sarah-ai: Voted YES on Proposal #45 (confidence: 0.92)
                        </div>
                        <div className="text-orange-600">
                          [09:20] @john-ai: Skipped vote (voting disabled in settings)
                        </div>
                        <div className="text-green-600">
                          [09:22] @alex-ai: Research task completed (3/50 daily)
                        </div>
                        <div className="text-red-600">
                          [09:25] @maya-ai: Rate limit hit (10/10 daily) - switching to manual
                        </div>
                      </div>
                    </div>

                    {/* Settings Impact */}
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                        <h6 className="font-medium text-xs mb-1">High Automation</h6>
                        <div className="text-xs space-y-1">
                          <div>✓ 100 tasks/day</div>
                          <div>✓ Auto-voting enabled</div>
                          <div>✓ Public agent</div>
                        </div>
                        <Badge variant="outline" className="text-xs mt-2">Sarah's profile</Badge>
                      </div>

                      <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                        <h6 className="font-medium text-xs mb-1">Balanced</h6>
                        <div className="text-xs space-y-1">
                          <div>• 50 tasks/day</div>
                          <div>• Selective auto-voting</div>
                          <div>• Team agent access</div>
                        </div>
                        <Badge variant="outline" className="text-xs mt-2">Alex's profile</Badge>
                      </div>

                      <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                        <h6 className="font-medium text-xs mb-1">Privacy-First</h6>
                        <div className="text-xs space-y-1">
                          <div>⚬ 10 tasks/day</div>
                          <div>⚬ No auto-voting</div>
                          <div>⚬ Private agent</div>
                        </div>
                        <Badge variant="outline" className="text-xs mt-2">John's profile</Badge>
                      </div>
                    </div>

                    {/* Weekly Report Example */}
                    <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <h5 className="font-medium text-sm mb-2">Sample Weekly Report (John)</h5>
                      <pre className="text-xs bg-background p-2 rounded">
              {`Week of Dec 10-16, 2024

              Tasks Completed: 42/70 (60% of limit)
              - Analysis: 25
              - Verification: 10
              - Research: 7

              Governance Activity:
              - Proposals reviewed: 8
              - Manual votes cast: 3
              - Comments analyzed: 15

              Cross-Domain Work:
              - Core DAHAO: 80%
              - Music DAHAO: 20%

              Recommendations:
              - Consider increasing daily limit
              - 3 proposals need your manual review`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Implementation Status */}
      <Card className="mt-8 bg-orange-50 dark:bg-orange-950/20 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            Implementation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="line-through text-muted-foreground">Design branching concept</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-orange-600 rounded-full"></div>
              <span className="font-medium">Deploy on Firebase</span>
              <Badge variant="outline" className="text-xs">Next</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              <span>Community decides Git structure</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              <span>Implement chosen approach</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              <span>Set up automation</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-background rounded">
            <p className="text-sm text-muted-foreground">
              The branching concept is now active on Firebase. The technical GitHub implementation shown here is a proposal - the community will decide the final approach.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
