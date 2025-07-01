'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot, CheckCircle, BookOpen, Building, Scale, RefreshCw, ArrowRight,
  Shield, GitBranch, Code, Network, Gauge, Database, Users, Layers,
  Workflow, Lock, Zap, Globe, Terminal, Cloud
} from 'lucide-react';
import { HeroSection, FeatureCard, ArchitectureFlow, NavigationCTA, StepProcess } from '@/components/shared';

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <HeroSection
            badge="Technical Architecture"
            title="How DAHAO Works Under the Hood"
            subtitle="The concepts, design patterns, and integration points that make DAHAO revolutionary. Built on four foundational concepts that work together to create living governance."
            maxWidth="4xl"
          >
            <NavigationCTA
              className="mb-12"
              buttons={[
                { text: "View Architecture", href: "#architecture", icon: Layers },

              ]}
            />
          </HeroSection>
        </div>
      </section>

      {/* Core Architecture Overview */}
      <section id="architecture" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Architecture Overview</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              DAHAO is built on four foundational concepts that work together
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="pt-6">
              <div className="font-mono text-sm text-center mb-4">
                <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg border inline-block text-left">
{`┌─────────────────────────────────────────────────┐
│                  DAHAO CORE                      │
├─────────────────────────────────────────────────┤
│                                                  │
│  Terms (@)    →    Principles (#)   →   Rules   │
│     ↑                    ↑                 ↑     │
│     └────────── Meta-Rules ────────────────┘     │
│                                                  │
│  Version Control │ MCP Integration │ Branches    │
└─────────────────────────────────────────────────┘`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Four Layers */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Four Layers Explained</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">@</span>
                  Terms - Living Definitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Think of terms as versioned dictionary entries that you or your community can control:
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm font-mono">
                  <div className="text-blue-600">@harm@2.0.0</div>
                  <div className="text-muted-foreground">= Base definition everyone agrees on</div>
                  <div className="text-blue-600 mt-2">@harm@2.0.0-wildlife.1</div>
                  <div className="text-muted-foreground">= Wildlife branch adds "habitat destruction"</div>
                </div>
                <p className="text-sm mt-4">
                  <strong>Why versioning matters:</strong> When rules reference @harm, they can specify which version they need, ensuring stability while allowing evolution or getting the closest meaning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">#</span>
                  Principles - Encoded Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Principles are value statements built using Terms:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use specific Term versions for clarity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cannot be directly enforced (that's what Rules do)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Guide the creation and evaluation of Rules</span>
                  </li>
                </ul>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm font-mono mt-4">
                  <span className="text-green-600">#minimize-harm</span> = "Reduce @harm@2.0.0 to all @beings@1.0.0"
                </div>
              </CardContent>
            </Card>


            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="h-5 w-5 text-purple-600" />
                    Rules - Automated Workflows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This is where DAHAO becomes revolutionary. Rules are executable governance:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Traditional Rule:</p>
                      <p className="text-sm text-muted-foreground italic">"All research must undergo peer review before publication"</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">DAHAO Rule:</p>
                      <p className="text-sm">An actual workflow that:</p>
                      <ul className="text-sm mt-2 space-y-1 ml-4">
                        <li>• Validates researcher credentials automatically</li>
                        <li>• Checks methodology against standards</li>
                        <li>• Assigns appropriate peer reviewers</li>
                        <li>• Tracks review progress in real-time</li>
                        <li>• Publishes when consensus reached</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <strong>Two ways to create Rules:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• <strong>Visual Builder:</strong> Drag and drop workflow creation</li>
                      <li>• <strong>Natural Language:</strong> Describe what you want, AI converts to workflow</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-orange-600" />
                  Meta-Rules - System Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Meta-rules govern how governance itself can change:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>How to modify Terms (voting thresholds, discussion periods)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Rule precedence and conflict resolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Branch inheritance policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>What cannot be changed (immutable safety rules)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Version Control System */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Version Control System</h2>
            <p className="text-lg text-muted-foreground">
              DAHAO treats governance like software development
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Version Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="text-blue-600">2.0.0</span>
                    <span className="text-muted-foreground"> - Core version</span>
                  </div>
                  <div>
                    <span className="text-green-600">2.0.0-env.1</span>
                    <span className="text-muted-foreground"> - Environmental branch</span>
                  </div>
                  <div>
                    <span className="text-purple-600">2.0.0-env.1-ocean.3</span>
                    <span className="text-muted-foreground"> - Ocean sub-branch</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Semantic Versioning</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• <strong>Major:</strong> Breaking changes (2.0.0 → 3.0.0)</li>
                      <li>• <strong>Minor:</strong> New features (2.0.0 → 2.1.0)</li>
                      <li>• <strong>Patch:</strong> Bug fixes (2.0.0 → 2.0.1)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Branch Extensions</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Branches extend parent versions</li>
                      <li>• Must maintain compatibility</li>
                      <li>• Can propose changes upstream</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Operations</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• <strong>Fork:</strong> Create new branch with custom rules</li>
                      <li>• <strong>Merge:</strong> Integrate successful innovations</li>
                      <li>• <strong>Rollback:</strong> Instant restoration if something breaks</li>
                      <li>• <strong>A/B Test:</strong> Try new versions with small groups</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MCP Integration */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">MCP Integration Architecture</h2>
            <p className="text-lg text-muted-foreground">
              DAHAO as MCP Hub - Connect any service or AI model
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="font-mono text-xs text-center">
                <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg border inline-block text-left">
{`┌─────────────────────────────────────────────────┐
│                 DAHAO as MCP Hub                 │
├─────────────────────────────────────────────────┤
│                                                  │
│   External Services          DAHAO              │
│   ┌─────────────┐           ┌─────┐            │
│   │   GitHub    │ ←────MCP──→│     │            │
│   ├─────────────┤           │     │            │
│   │   OpenAI    │ ←────MCP──→│ Hub │            │
│   ├─────────────┤           │     │            │
│   │   Slack     │ ←────MCP──→│     │            │
│   ├─────────────┤           └─────┘            │
│   │ Custom APIs │ ←────MCP────┘ ↑               │
│   └─────────────┘               │               │
│                                  │               │
│   External Clients              MCP              │
│   ┌─────────────┐               │               │
│   │   Claude    │ ←─────────────┘               │
│   │ Computer Use│                               │
│   └─────────────┘                               │
└─────────────────────────────────────────────────┘`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  DAHAO as Client (Outbound)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Connect to any MCP-enabled service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use in Rules for automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Examples: GitHub for code review, OpenAI for analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  DAHAO as Server (Inbound)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Other systems query DAHAO governance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Check compliance programmatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Example: Claude asks "Does this violate any principles?"</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rules Engine Architecture */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Rules Engine Architecture</h2>
            <p className="text-lg text-muted-foreground">
              How rules execute automatically
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Execution Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
                <div className="text-center space-y-2">
                  <div>Trigger → Version Check → Permission Check → Load Context</div>
                  <div>↓</div>
                  <div>Execute Workflow Steps</div>
                  <div>↓</div>
                  <div>[Query] → [Analyze] → [Decide] → [Act]</div>
                  <div>↓</div>
                  <div>Audit Log → Result</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Zap}
              iconColor="text-orange-600"
              title="Triggers"
              description="Event-based (new proposal, time-based, external webhook) and condition matching (location, type, threshold)"
              className="text-center"
            />
            <FeatureCard
              icon={Workflow}
              iconColor="text-purple-600"
              title="Actions"
              description="Query databases or APIs, run AI analysis, send notifications, update records, initiate votes"
              className="text-center"
            />
            <FeatureCard
              icon={GitBranch}
              iconColor="text-blue-600"
              title="Control Flow"
              description="Sequential execution, parallel processing, conditional branches, loop iterations"
              className="text-center"
            />
          </div>
        </div>
      </section>

      {/* Branch Architecture */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Branch Architecture</h2>
            <p className="text-lg text-muted-foreground">
              Hierarchy Model for Governance Evolution
            </p>
          </div>

          <Card className="max-w-3xl mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="font-mono text-sm">
                <pre className="bg-white dark:bg-gray-900 p-4 rounded-lg">
{`Core DAHAO (Universal principles)
    ├── Environmental Protection
    │   ├── Ocean Conservation
    │   ├── Wildlife Protection
    │   └── Climate Action
    ├── Technology Governance
    │   ├── AI Safety
    │   └── Open Source
    └── Your Custom Branch`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inheritance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Start with parent's Terms, Principles, Rules</li>
                  <li>• Override or extend as needed</li>
                  <li>• Maintain compatibility requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Isolation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Experiment without affecting parent</li>
                  <li>• Private data and rules</li>
                  <li>• Custom MCP connections</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Propose improvements upstream</li>
                  <li>• Share successful innovations</li>
                  <li>• Cross-pollinate ideas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security Architecture</h2>
            <p className="text-lg text-muted-foreground">
              Permission layers and security features
            </p>
          </div>

          <Card className="max-w-3xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Permission Layers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <pre>
{`System Level
    ├── User Permissions (read, write, admin)
    ├── Branch Permissions (member, moderator, owner)
    ├── Rule Permissions (which data, which services)
    └── MCP Permissions (per-service access control)`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Shield}
              iconColor="text-green-600"
              title="Scoped Access"
              description="Rules only access permitted data, MCP calls respect service limits, branch isolation enforced"
              className="text-center"
            />
            <FeatureCard
              icon={Database}
              iconColor="text-blue-600"
              title="Audit Trail"
              description="Every action logged, immutable history, full traceability"
              className="text-center"
            />
            <FeatureCard
              icon={Gauge}
              iconColor="text-purple-600"
              title="Rate Limiting"
              description="Per-user limits, per-service quotas, cost controls"
              className="text-center"
            />
          </div>
        </div>
      </section>

      {/* Performance & Scaling */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Performance & Scaling</h2>
            <p className="text-lg text-muted-foreground">
              Optimization strategies for enterprise-scale governance
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Caching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Cache MCP responses</li>
                  <li>• Reuse analysis results</li>
                  <li>• Version-aware invalidation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-600" />
                  Parallel Execution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Independent steps run simultaneously</li>
                  <li>• Distributed rule processing</li>
                  <li>• Optimized workflows</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-purple-600" />
                  Resource Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Token limits for AI calls</li>
                  <li>• API rate limit respect</li>
                  <li>• Cost budget enforcement</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Patterns */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Integration Patterns</h2>
            <p className="text-lg text-muted-foreground">
              For developers and organizations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  For Developers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">SDK Approach</h4>
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs font-mono">
{`// Simple, high-level API
const dahao = new DAHAO({ branch: 'environmental' });
const result = await dahao.checkCompliance(action);`}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">REST API</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Standard HTTP endpoints</li>
                      <li>• JSON request/response</li>
                      <li>• Authentication via tokens</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">WebSocket</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Real-time updates</li>
                      <li>• Event subscriptions</li>
                      <li>• Live governance feed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  For Organizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Gradual Adoption</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Start with one department/project</li>
                      <li>• Create branch for experimentation</li>
                      <li>• Connect existing tools via MCP</li>
                      <li>• Expand as confidence grows</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Integration Points</h4>
                    <ul className="text-sm space-y-1">
                      <li>• CI/CD pipelines (governance checks)</li>
                      <li>• Slack/Teams (notifications)</li>
                      <li>• Databases (data governance)</li>
                      <li>• AI tools (enhanced analysis)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Self-improvement, cross-branch learning, and future-ready design
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  Self-Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  The system can modify its own modification process:
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Meta-rules govern rule changes</li>
                  <li>• Community decides governance evolution</li>
                  <li>• A/B testing for governance changes</li>
                  <li>• Metrics-driven improvements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Cross-Branch Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Successful patterns spread</li>
                  <li>• Failed experiments contained</li>
                  <li>• Best practices emerge</li>
                  <li>• Network effects compound</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-purple-600" />
                  Technology Independent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  DAHAO abstracts away the underlying technology:
                </p>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Integration layer:</strong> MCP, REST, GraphQL, or future protocols</li>
                  <li>• <strong>AI abstraction:</strong> OpenAI, Claude, Llama, or what comes next</li>
                  <li>• <strong>Storage agnostic:</strong> Git, blockchain, or emerging solutions</li>
                  <li>• <strong>One constant:</strong> Your governance rules remain stable</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">DAHAO's architecture enables:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm"><strong>Living Governance</strong> - Rules that execute and evolve</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm"><strong>Democratic Control</strong> - Community-driven changes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm"><strong>Universal Integration</strong> - Connect any service via MCP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm"><strong>Safe Experimentation</strong> - Branch isolation with upstream contribution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm"><strong>Transparent Operation</strong> - Full audit trail and version history</span>
                  </div>
                </div>
                <p className="text-sm mt-4">
                  The technical architecture is designed to be:
                </p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Simple to use (hide complexity)</li>
                  <li>• Powerful to extend (MCP, branches, rules)</li>
                  <li>• Safe to experiment (version control, rollback)</li>
                  <li>• Democratic to govern (community decisions)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl text-center">
          <NavigationCTA
            buttons={[

              { text: "Back to Overview", href: "/", variant: "outline", icon: ArrowRight }
            ]}
          />
        </div>
      </section>
    </div>
  );
}
