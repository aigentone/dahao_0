// app/about/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot, Users, RefreshCw, BookOpen, Building, Shield,
  GitBranch, Lightbulb,
  CheckCircle, Scale, TrendingUp
} from 'lucide-react';
import { HeroSection, StepProcess, ArchitectureFlow, BadgeGroup, NavigationCTA } from '@/components/shared';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <HeroSection
          title="Understanding DAHAO"
          subtitle="The world's first self-improving governance system built through human-AI collaboration, where rules can evolve democratically and systematically."
          maxWidth="4xl"
        >
          <BadgeGroup
            badges={["Open Source", "Community Driven", "AI Enhanced"]}
          />
        </HeroSection>

        {/* Core Innovation Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Core Innovation</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <RefreshCw className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Governance as Living System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Governance rules, terms, and principles evolve through community consensus with full version control.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm">
                  <code>harm v1.0 → v1.1 → v1.2</code>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    Just as software evolves through versions, governance can be systematically improved while maintaining stability.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Bot className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Personal vs System AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Two types of AI agents ensure both personal values and objective compliance.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span className="text-sm"><strong>Personal AI:</strong> YOUR values</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm"><strong>System AI:</strong> Baseline only</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Meta-Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  The system can improve its own improvement process.
                </p>
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg text-sm text-green-700 dark:text-green-300">
                  Unlike fixed systems, DAHAO can modify how it makes modifications, learning from experience to evolve more effectively.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Living Vocabulary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Terms evolve democratically with precise version tracking.
                </p>
                <div className="space-y-1 text-sm">
                  <div className="font-mono bg-orange-50 dark:bg-orange-950/20 p-2 rounded">
                    transparency: v1.1
                  </div>
                  <div className="font-mono bg-orange-50 dark:bg-orange-950/20 p-2 rounded">
                    being: v1.0
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Architecture */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">System Architecture</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Four Layers of Governance</CardTitle>
            </CardHeader>
            <CardContent>
              <ArchitectureFlow
                layers={[
                  { icon: BookOpen, title: "Terms", description: "Definitions", color: "text-blue-600" },
                  { icon: Building, title: "Principles", description: "Values", color: "text-green-600" },
                  { icon: Scale, title: "Rules", description: "Operations", color: "text-purple-600" },
                  { icon: RefreshCw, title: "Meta-Rules", description: "How to Change", color: "text-orange-600" }
                ]}
                title=""
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Current</Badge>
                  Phase 1: Foundation Building
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>No tokens or money - pure governance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>GitHub-based collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>AI assistance for analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Democratic participation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-200 opacity-75">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">Future</Badge>
                  Multi-Domain Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm space-y-1">
                  <div>Core DAHAO</div>
                  <div className="ml-4">├── Music DAHAO</div>
                  <div className="ml-4">├── Animal Welfare</div>
                  <div className="ml-4">├── Environmental</div>
                  <div className="ml-4">└── [Your Domain]</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Participate */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How You Participate Today</h2>

          <StepProcess
            className="md:grid-cols-2"
            steps={[
              {
                number: 1,
                title: "Connect AI",
                description: "Optional but powerful",
                details: ["• Add API key", "• Get AI analysis", "• Personal insights"]
              },
              {
                number: 2,
                title: "Join Discussions",
                description: "GitHub Issues & PRs", 
                details: ["• Define terms", "• Propose changes", "• Share insights"]
              },
              {
                number: 3,
                title: "Create Branch",
                description: "Your governance lab",
                details: ["• Extend values", "• Test safely", "• Propose back"]
              },
              {
                number: 4,
                title: "Use Agents",
                description: "AI assistance",
                details: ["• Call in discussions", "• Compare perspectives", "• Get insights"]
              }
            ]}
          />
        </div>

        {/* Evolution Path */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Evolution Path</h2>

          <div className="space-y-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Badge className="bg-blue-600">NOW</Badge>
                    Phase 1: Foundation
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">Current</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">Building the self-improving governance system</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Focus:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• Core governance</li>
                      <li>• AI collaboration</li>
                      <li>• Community formation</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Key Features:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• No economic layer</li>
                      <li>• GitHub-based</li>
                      <li>• Open participation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gray-300 opacity-75">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">FUTURE</Badge>
                  Phase 2: Economics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Token mechanics • Dual benefit model • Investment opportunities • Self-sustaining growth
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gray-300 opacity-75">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">LATER</Badge>
                  Phase 3: Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Fund initiatives • Measure impact • Scale successes • Real-world change
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gray-300 opacity-75">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline">VISION</Badge>
                  Phase 4: Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Interconnected DAHAOs • Cross-domain learning • Global impact • Exponential growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why DAHAO Matters */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why DAHAO Matters</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <RefreshCw className="h-6 w-6 text-blue-600 mb-2" />
                <CardTitle className="text-lg">For Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Self-improving</strong> - Gets better over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Transparent</strong> - Every change tracked</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Democratic</strong> - Community decides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Forkable</strong> - Dissent drives innovation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-6 w-6 text-purple-600 mb-2" />
                <CardTitle className="text-lg">For Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Shared language</strong> - Clear definitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Collective wisdom</strong> - Best ideas win</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Protected minorities</strong> - Fork rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Continuous learning</strong> - Failures teach</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-6 w-6 text-green-600 mb-2" />
                <CardTitle className="text-lg">For the Future</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Scalable</strong> - Works for any domain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>AI-enhanced</strong> - Better outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Evolutionary</strong> - Adapts to change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span><strong>Network effects</strong> - Exponential growth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                Key Insights from Phase 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Simple beats complex</strong>
                      <p className="text-sm text-muted-foreground">3-step processes get more participation than 10-step ones</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>AI agents spot blind spots</strong>
                      <p className="text-sm text-muted-foreground">Patterns humans miss become visible through AI analysis</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Personal values matter</strong>
                      <p className="text-sm text-muted-foreground">One size doesn't fit all - personal branches enable diversity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <strong>Governance can govern itself</strong>
                      <p className="text-sm text-muted-foreground">Meta-rules actually work in practice</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Evolution</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of the first governance system that can improve itself through democratic collaboration and AI assistance.
          </p>

          <Card className="mb-8 max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Get Started in Minutes</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <span>Explore current governance discussions on GitHub</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <span>Connect your AI assistant for enhanced analysis (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <span>Propose your first improvement or join a discussion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <span>Help shape the future of governance</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <NavigationCTA
            buttons={[
              { text: "Learn How It Works", href: "/how-it-works" },
              { text: "View Governance", href: "/forum", variant: "outline", icon: GitBranch }
            ]}
          />

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Current Status:</strong> Phase 1 - Foundation Building<br />
              <strong>Requirements:</strong> GitHub account (free)<br />
              <strong>No tokens or payment required</strong> - just ideas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
