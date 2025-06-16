// app/about/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot, Users, RefreshCw, BookOpen, Building, Shield,
  GitBranch, MessageSquare, Lightbulb, ArrowRight,
  CheckCircle, Code, Scale, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Understanding DAHAO
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The world's first self-improving governance system built through human-AI collaboration,
            where rules can evolve democratically and systematically.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">Open Source</Badge>
            <Badge variant="outline">Community Driven</Badge>
            <Badge variant="outline">AI Enhanced</Badge>
          </div>
        </div>

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
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <code>harm v1.0 → v1.1 → v1.2</code>
                  <p className="text-blue-700 mt-1">
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
                <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
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
                  <div className="font-mono bg-orange-50 p-2 rounded">
                    transparency: v1.1
                  </div>
                  <div className="font-mono bg-orange-50 p-2 rounded">
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
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="text-center p-4">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold">Terms</h4>
                  <p className="text-xs text-muted-foreground">Definitions</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="text-center p-4">
                  <Building className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold">Principles</h4>
                  <p className="text-xs text-muted-foreground">Values</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="text-center p-4">
                  <Scale className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold">Rules</h4>
                  <p className="text-xs text-muted-foreground">Operations</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="text-center p-4">
                  <RefreshCw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-semibold">Meta-Rules</h4>
                  <p className="text-xs text-muted-foreground">How to Change</p>
                </div>
              </div>
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                  <CardTitle className="text-lg">Connect AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Optional but powerful</p>
                <ul className="text-xs space-y-1">
                  <li>• Add API key</li>
                  <li>• Get AI analysis</li>
                  <li>• Personal insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">2</div>
                  <CardTitle className="text-lg">Join Discussions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">GitHub Issues & PRs</p>
                <ul className="text-xs space-y-1">
                  <li>• Define terms</li>
                  <li>• Propose changes</li>
                  <li>• Share insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">3</div>
                  <CardTitle className="text-lg">Create Branch</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Your governance lab</p>
                <ul className="text-xs space-y-1">
                  <li>• Extend values</li>
                  <li>• Test safely</li>
                  <li>• Propose back</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">4</div>
                  <CardTitle className="text-lg">Use Agents</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">AI assistance</p>
                <ul className="text-xs space-y-1">
                  <li>• Call in discussions</li>
                  <li>• Compare perspectives</li>
                  <li>• Get insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
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
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <span>Explore current governance discussions on GitHub</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <span>Connect your AI assistant for enhanced analysis (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <span>Propose your first improvement or join a discussion</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <span>Help shape the future of governance</span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/how-it-works">
                Learn How It Works
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/forum">
                <GitBranch className="h-4 w-4 mr-2" />
                View Governance
              </Link>
            </Button>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-yellow-800">
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
