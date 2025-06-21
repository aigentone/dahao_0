// app/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RefreshCw, Users, Bot, GitBranch, ArrowRight,
  BookOpen, Building, Scale, MessageSquare,
  CheckCircle, Lightbulb, Code, Shield
} from 'lucide-react';
import { HeroSection, FeatureCard, ArchitectureFlow, NavigationCTA } from '@/components/shared';

export default function HomePage() {
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
                { text: "View Governance", href: "/governance", variant: "outline", icon: GitBranch }
              ]}
            />

            <Card className="max-w-2xl mx-auto bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Phase 1 (Current):</strong> Building governance foundations.
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
                <strong>Try it now:</strong> Connect your OpenAI or Claude API key
                to enable AI-powered governance analysis. Your agents help you
                understand and participate in governance decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Personal Branches */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Personal Governance Branches
          </h2>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-600" />
                  Your Governance Laboratory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Create your personal workspace to develop governance that
                    matches your values. Like Git for code, but for governance.
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-semibold">What You Can Do:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Extend term definitions</li>
                        <li>• Add personal principles</li>
                        <li>• Modify rules for your context</li>
                        <li>• Test governance ideas safely</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">How It Works:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Fork from core governance</li>
                        <li>• Make your modifications</li>
                        <li>• AI agents use your version</li>
                        <li>• Propose best ideas back</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Example:</strong> Add "radical transparency" to your
                      transparency definition, test it in your branch, then propose
                      it to core if it works well.
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
            Ready to Shape the Future of Governance?
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            Join the first community building self-improving governance through
            human-AI collaboration. No tokens needed - just ideas.
          </p>

          <NavigationCTA
            className="mb-8"
            buttons={[
              { text: "Get Started", href: "/how-it-works", icon: ArrowRight, iconPosition: "right" },
              { text: "Join Discussions", href: "/forum", variant: "outline", icon: MessageSquare }
            ]}
          />

          <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto text-sm">
            <div className="text-center">
              <CheckCircle className="h-5 w-5 mx-auto mb-2 text-green-600" />
              <p className="font-medium">Free to Join</p>
              <p className="text-muted-foreground">GitHub account only</p>
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
