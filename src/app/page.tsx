// app/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RefreshCw, Users, Bot, GitBranch, ArrowRight,
  BookOpen, Building, Scale, MessageSquare,
  CheckCircle, Lightbulb, Code, Shield,Lock,Workflow,Settings,DollarSign,Zap,Palette,FileText,Server,Network,Plug,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { HeroSection, FeatureCard, ArchitectureFlow, NavigationCTA } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';


export default function HomePage() {
  const [isMCPExpanded, setIsMCPExpanded] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <HeroSection
            badge="Open Source • Community Driven • AI Enhanced"
            title="Welcome to DAHAO"
            subtitle="The first self-improving governance system where communities democratically evolve their rules with AI assistance"
            maxWidth="4xl"
          >
            <NavigationCTA
              className="mb-12"
              buttons={[
                { text: "Learn How It Works", href: "/how-it-works" },

              ]}
            />

            <Card className="max-w-2xl mx-auto bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Phase 1:</strong> Building governance foundations.
                  No tokens or investment required - just ideas and participation!
                </p>
              </CardContent>
            </Card>
          </HeroSection>
        </div>
      </section>

      {/* Core Innovation */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Core Innovation
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={RefreshCw}
              iconColor="text-blue-600"
              title="Self-Improving Governance"
              description="Rules that can change their own rules. The system learns and evolves through democratic consensus."
              className="text-center"
            />

            <FeatureCard
              icon={Bot}
              iconColor="text-purple-600"
              title="Human-AI Collaboration"
              description="Personal AI represents your values. System AI ensures compliance. Together, better decisions."
              className="text-center"
            />

            <FeatureCard
              icon={GitBranch}
              iconColor="text-green-600"
              title="Fork-Friendly Evolution"
              description="Disagree? Fork and improve. Best innovations merge back. Dissent drives progress."
              className="text-center"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            How DAHAO Works
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Four Layers of Governance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <strong>Terms:</strong> Living definitions (e.g., "harm" v1.2)
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <strong>Principles:</strong> Values using terms
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <strong>Rules:</strong> How the system operates
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <strong>Meta-Rules:</strong> How to change rules
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Democratic Evolution Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Propose:</strong> Anyone can suggest improvements
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Discuss:</strong> Community + AI analyze together
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Vote:</strong> Democratic decision making
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Evolve:</strong> System improves itself
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agent System */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI Agent System
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  <CardTitle>Personal AI Agents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your AI agent represents YOUR complete value system,
                  including personal extensions and modifications.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Uses your governance branch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Applies your custom values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Provides personalized analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Future: Earn tokens for contributions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <CardTitle>System AI Agents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  System agents ensure objective compliance using only
                  baseline DAHAO governance.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>No personal modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Objective validation only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Ensures consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Maintains system integrity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <p className="text-center text-purple-800 dark:text-purple-200">
                <strong>Coming Soon:</strong> You'll be able to connect your OpenAI or Claude API key
                to enable AI-powered governance analysis. Personal AI agents will help you
                understand and participate in governance decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

{/* Personal Branches with MCP Orchestration */}
<section className="py-16 px-4 bg-muted/30">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-3xl font-bold text-center mb-12">
      Personal Governance Branches with MCP Orchestration
    </h2>

    <div className="max-w-5xl mx-auto space-y-8">


      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-purple-600" />
            Your Governance Laboratory + Multi-Service Orchestration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Create personal branches that not only customize governance but orchestrate
              multiple AI services. Each Rule becomes a powerful workflow engine connecting
              any MCP-enabled service.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Core Capabilities:
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Connect unlimited MCP servers per Rule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Orchestrate complex multi-service workflows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Dynamic tool discovery and adaptation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Automatic rate limiting and cost management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Security scoping for safe experimentation</span>
                  </li>
                </ul>
              </div>

              <div>

                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Workflow className="h-4 w-4" />
                    Connect External Services
                  </h4>

                  <p className="text-sm text-muted-foreground mb-3">
                    DAHAO integrates with services through MCP (Model Context Protocol) and other emerging standards.
                    Currently, many companies are creating MCP servers as their primary way to enable LLM integration.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg mb-4">
                    <p className="text-xs">
                      <strong>Why MCP?</strong> It's becoming the standard for AI-service communication.
                      Companies build MCP servers so their tools can talk to Claude, ChatGPT, and other LLMs seamlessly.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">AI Assistants</h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">🤖 OpenAI</Badge>
                        <Badge variant="outline" className="text-xs">🧠 Claude Desktop</Badge>
                        <Badge variant="outline" className="text-xs">💻 Claude Code</Badge>
                        <Badge variant="outline" className="text-xs">🦙 Local LLMs</Badge>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Development Tools</h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">🔧 GitHub</Badge>
                        <Badge variant="outline" className="text-xs">🛡️ Security Scanners</Badge>
                        <Badge variant="outline" className="text-xs">📦 Package Managers</Badge>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Research & Data</h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">📚 ArXiv</Badge>
                        <Badge variant="outline" className="text-xs">🔍 Search APIs</Badge>
                        <Badge variant="outline" className="text-xs">🌍 Climate Data</Badge>
                        <Badge variant="outline" className="text-xs">📊 Analytics</Badge>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Communication</h5>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">💬 Slack</Badge>
                        <Badge variant="outline" className="text-xs">📧 Email</Badge>
                        <Badge variant="outline" className="text-xs">🔔 Discord</Badge>
                        <Badge variant="outline" className="text-xs">🎯 Custom APIs</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 italic">
                    More services are adding MCP support daily as it becomes the de facto standard for AI integration.
                  </p>
                </div>


            </div>

            {/* MCP Explanation Section */}
            <div className="mt-8 pt-6 border-t border-border">
              <button
                onClick={() => setIsMCPExpanded(!isMCPExpanded)}
                className="w-full text-left group hover:opacity-80 transition-opacity"
              >
                <h4 className="font-semibold flex items-center justify-between cursor-pointer">
                  <span className="flex items-center gap-2">
                    <Plug className="h-4 w-4 text-purple-600" />
                    What is MCP?
                  </span>
                  {isMCPExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-purple-600" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:text-purple-600" />
                  )}
                </h4>
              </button>

              {isMCPExpanded && (
                <div className="mt-4 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Main explanation */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      Model Context Protocol (MCP) is a standardized framework designed to connect AI systems—like Claude—to
                      enterprise knowledge and tools in a modular, scalable, and consistent way. Traditionally, each AI
                      application required custom implementation for prompt logic, tool integration, and data access. MCP
                      eliminates this fragmentation by introducing a unified protocol where AI clients can interact with
                      standardized servers.
                    </p>
                  </div>

                  {/* Key Features Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Network className="h-4 w-4 text-purple-600" />
                        How MCP Works
                      </h5>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>Standardized servers expose resources (files, records)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>Tools provide functions (search, update, analyze)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>Pre-defined prompt templates ensure consistency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>Any MCP-compatible AI can access these services</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        Key Benefits
                      </h5>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>No custom integrations for each AI application</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Dramatically simplified development & maintenance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Enhanced reliability through standardization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>Enterprise-ready AI development</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Architecture Overview */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-4 rounded-lg">
                    <h5 className="font-semibold flex items-center gap-2 mb-3">
                      <Building className="h-4 w-4 text-purple-600" />
                      MCP Architecture
                    </h5>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium mb-2">AI Clients (like Claude)</p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Make requests for resources</li>
                          <li>• Invoke tools and functions</li>
                          <li>• Interpolate prompt templates</li>
                          <li>• Handle user interactions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">MCP Servers</p>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Handle backend integration</li>
                          <li>• Manage data access & security</li>
                          <li>• Execute business logic</li>
                          <li>• Provide consistent interfaces</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h5 className="font-semibold flex items-center gap-2 mb-3">
                      <Code className="h-4 w-4 text-purple-600" />
                      Real-World Applications
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Database MCP → Query & modify records</Badge>
                      <Badge variant="secondary">CRM MCP → Manage contacts & interactions</Badge>
                      <Badge variant="secondary">GitHub MCP → Code management & reviews</Badge>
                      <Badge variant="secondary">Analytics MCP → Data insights & reports</Badge>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm font-medium flex items-start gap-2">
                      <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>
                        By centralizing integration logic and separating the AI interface from backend systems,
                        MCP enables AI agents to act as personal assistants, software developers, or analysts—seamlessly
                        retrieving enterprise data and performing meaningful actions on behalf of users.
                      </span>
                    </p>
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-4 border-t border-purple-200 dark:border-purple-800">
                    <a
                      href="https://modelcontextprotocol.io/introduction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                    >
                      <span>Learn more about MCP</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Workflow Card */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            Example: AI Safety Research Validation Rule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre className="overflow-x-auto">{`Rule: "AI Safety Paper Review"@3.0.0
MCP Connections: {
  "arxiv": "@modelcontextprotocol/arxiv",
  "search": "@modelcontextprotocol/server-brave-search",
  "gpt4-analysis": "@modelcontextprotocol/openai"
  "claude-verify": "@modelcontextprotocol/claude",
  "github": "@modelcontextprotocol/server-github"
}`}</pre>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Workflow Steps:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-xs font-mono">1</span>
                  <span>Fetch paper metadata from ArXiv</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-xs font-mono">2</span>
                  <span>Check citations via Semantic Scholar</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-xs font-mono">3</span>
                  <span>Parallel AI analysis (GPT-4 + Claude)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-xs font-mono">4</span>
                  <span>Search for reproduction code on GitHub</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded text-xs font-mono">5</span>
                  <span>Compile comprehensive report</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branch-Specific Configuration */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Branch-Specific MCP Authorization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Each branch can authorize different MCP servers with custom limits:
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-medium">Climate Data API</span>
                <Badge variant="default" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Unlimited</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-medium">Carbon Calculator</span>
                <Badge variant="default" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">1000/month</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-medium">Satellite Imagery</span>
                <Badge variant="secondary" className="text-xs">Approval Required</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              Cost & Rate Limit Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Built-in budget controls and smart fallbacks:
            </p>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="font-medium">OpenAI Budget</div>
                <div className="text-xs text-muted-foreground">Max: 50k tokens / $10 per run</div>
                <div className="text-xs text-green-600">Fallback: Local model</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="font-medium">API Rate Limiting</div>
                <div className="text-xs text-muted-foreground">Auto-throttle enabled</div>
                <div className="text-xs text-green-600">Queue excess requests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Rule Builder Preview */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-purple-600" />
            Visual Rule Builder with MCP Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4 items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <p className="text-xs mt-1">Trigger</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div className="flex gap-2">
                  <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                    <Server className="h-6 w-6 text-green-600" />
                    <p className="text-xs mt-1">ArXiv</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <GitBranch className="h-6 w-6 text-purple-600" />
                    <p className="text-xs mt-1">GitHub</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                    <Bot className="h-6 w-6 text-orange-600" />
                    <p className="text-xs mt-1">GPT-4</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-red-600" />
                  <p className="text-xs mt-1">Decision</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Drag & drop MCP services to build complex workflows visually
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power of Composition */}
      <Card className="border-gradient">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            The Power of Composition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-6">
            Your Rules aren't just simple if-then statements - they're full orchestration
            engines that can coordinate any service with an MCP interface.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <Network className="h-8 w-8 mx-auto text-blue-600" />
              <h4 className="font-semibold">Unlimited Connections</h4>
              <p className="text-xs text-muted-foreground">
                Connect to any number of MCP servers
              </p>
            </div>
            <div className="text-center space-y-2">
              <Zap className="h-8 w-8 mx-auto text-yellow-600" />
              <h4 className="font-semibold">Intelligent Orchestration</h4>
              <p className="text-xs text-muted-foreground">
                Handle failures, cache results, manage costs
              </p>
            </div>
            <div className="text-center space-y-2">
              <Lock className="h-8 w-8 mx-auto text-green-600" />
              <h4 className="font-semibold">Secure by Design</h4>
              <p className="text-xs text-muted-foreground">
                Scoped permissions for safe experimentation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      {/* Current Focus */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Current Focus: Building Foundation
          </h2>

          <ArchitectureFlow
            className="mb-8"
            layers={[
              { icon: BookOpen, title: "Define Terms", description: "Creating shared vocabulary that evolves democratically", color: "text-blue-600" },
              { icon: Building, title: "Set Principles", description: "Establishing values that guide all decisions", color: "text-green-600" },
              { icon: Scale, title: "Create Rules", description: "Building operational requirements that work", color: "text-purple-600" },
              { icon: RefreshCw, title: "Enable Evolution", description: "Making the system self-improving", color: "text-orange-600" }
            ]}
          />

          <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                What We're Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-medium mb-2">Key Discoveries:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Simple rules get more participation</li>
                    <li>• AI agents spot governance blind spots</li>
                    <li>• Personal branches encourage innovation</li>
                    <li>• Meta-rules actually work in practice</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Coming Next:</p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• More domain extensions</li>
                    <li>• Enhanced AI capabilities</li>
                    <li>• Cross-domain patterns</li>
                    <li>• Community tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-t from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interested in the Future of Governance?
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            Learn about our vision for self-improving governance through
            human-AI collaboration. Join the conversation about what's possible.
          </p>

          <NavigationCTA
            className="mb-8"
            buttons={[
              { text: "Explore the Mission", href: "/mission", icon: ArrowRight, iconPosition: "right" },

            ]}
          />

          <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto text-sm">
            <div className="text-center">
              <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Open Concept</p>
              <p className="text-muted-foreground">Follow our progress</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Open Source</p>
              <p className="text-muted-foreground">All governance public</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Community Driven</p>
              <p className="text-muted-foreground">You shape the future</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
