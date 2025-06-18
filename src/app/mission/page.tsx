// app/mission/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight, TrendingUp, Shield, Eye, Heart, Zap, GitBranch,
  Users, RefreshCw, Bot, CheckCircle, Lightbulb, Building,
  Scale, BookOpen, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Our Mission
          </h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Building governance systems that improve themselves through
            democratic collaboration and AI assistance
          </p>
          <Badge variant="outline" className="text-lg px-4 py-1">
            Phase 1: Foundation Building
          </Badge>
        </div>

        {/* The Problem */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-600" />
                The Problem: Static Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Traditional governance systems are frozen in time. Constitutions written centuries ago.
                Corporate bylaws that take years to change. Rules that can't adapt to new realities.
              </p>
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Slow Evolution</h4>
                  <p className="text-sm text-muted-foreground">
                    Years to make simple changes
                  </p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">No Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Same mistakes repeated forever
                  </p>
                </div>
                <div className="bg-white/70 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Power Concentration</h4>
                  <p className="text-sm text-muted-foreground">
                    Few control the many
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Insight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-green-600" />
                Our Insight: Living Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                What if governance could improve itself? What if rules could learn from experience?
                What if communities could evolve their systems as fast as the world changes?
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Self-Improvement:</strong> Rules that can change their own rules
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Democratic Evolution:</strong> Community decides all changes
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>AI Enhancement:</strong> Better analysis, not AI control
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong>Version Control:</strong> Every change tracked and reversible
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Innovation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The DAHAO Innovation</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Bot className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Personal vs System AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Two types of AI agents ensure both personal values and objective compliance.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-purple-50 rounded">
                    <strong>Personal AI:</strong> Represents YOUR values
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>System AI:</strong> Ensures baseline compliance
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <RefreshCw className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Meta-Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  The system can modify how it modifies itself, enabling true evolution.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>Learn:</strong> From what works and what doesn't
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <strong>Adapt:</strong> Change processes, not just rules
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Living Vocabulary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Terms evolve democratically as understanding deepens.
                </p>
                <div className="font-mono text-sm bg-orange-50 p-2 rounded">
                  harm: v1.0 → v1.1 → v1.2
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Each version adds community wisdom
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GitBranch className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Fork & Merge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Disagreement drives innovation through parallel experiments.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Fork:</strong> Test your ideas safely
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <strong>Merge:</strong> Best ideas flow back
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Three Pillars of Our Mission</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-gradient-to-b from-blue-50 to-blue-100">
              <CardHeader>
                <GitBranch className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Radical Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Every decision, every change, every vote - all public on GitHub.
                  Trust through verification, not faith.
                </p>
                <div className="bg-white/70 p-3 rounded text-xs">
                  <strong>Why:</strong> Hidden governance corrupts. Open governance evolves.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-green-50 to-green-100">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Democratic Evolution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  No kings, no CEOs, no unilateral control. Every change requires
                  community consent.
                </p>
                <div className="bg-white/70 p-3 rounded text-xs">
                  <strong>How:</strong> Proposals → Discussion → AI Analysis → Vote → Implementation
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-purple-50 to-purple-100">
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Protected Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Fork rights ensure minority views can experiment. Best innovations
                  merge back to benefit all.
                </p>
                <div className="bg-white/70 p-3 rounded text-xs">
                  <strong>Result:</strong> Diversity of thought drives collective progress
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Focus */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">Phase 1: Building the Foundation</CardTitle>
              <CardDescription className="text-center">
                What we're doing right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Creating Core Governance</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Defining foundational terms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Establishing core principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Building operational rules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Testing meta-governance</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Testing AI Collaboration</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Personal AI agents for values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>System AI for compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>AI-assisted analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Human-AI collaboration patterns</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/70 p-4 rounded-lg text-center">
                <p className="font-semibold text-purple-800">
                  No tokens. No investment. Just building better governance together.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Vision */}
        <div className="mb-16">
          <Card className="border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-center text-indigo-800">
                The Vision: Governance That Learns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-6">
                We envision a world where communities can create governance systems that:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 mb-2">Adapt Rapidly</h4>
                  <p className="text-sm text-muted-foreground">
                    Change as fast as the world changes, learning from every decision
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Stay Democratic</h4>
                  <p className="text-sm text-muted-foreground">
                    Power remains with the community, not concentrated in few hands
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Scale Wisely</h4>
                  <p className="text-sm text-muted-foreground">
                    Work for small groups and large organizations alike
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Remain Human</h4>
                  <p className="text-sm text-muted-foreground">
                    AI assists but always keep humans latest value
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Future Phases */}
        <div className="mb-16">
          <Card className="bg-gray-50 border-gray-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                Future Phases
                <Badge variant="outline">After Foundation</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="p-3 border-l-4 border-l-gray-400">
                  <strong>Phase 2:</strong> Economic layer with tokens and investment pools
                </div>
                <div className="p-3 border-l-4 border-l-gray-400">
                  <strong>Phase 3:</strong> Fund real projects that create impact
                </div>
                <div className="p-3 border-l-4 border-l-gray-400">
                  <strong>Phase 4:</strong> Network of interconnected DAHAOs
                </div>
              </div>
              <p className="text-xs text-center mt-4 text-gray-600">
                Each phase builds on solid foundations. We're in Phase 1.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why This Matters */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-center text-orange-800">
                Why This Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-6">
                The world is changing faster than ever. AI is advancing exponentially.
                Global challenges require new solutions. Traditional governance can't keep up.
              </p>

              <div className="bg-white/70 p-6 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 text-center">
                  DAHAO creates governance that evolves as fast as our challenges
                </h4>

                <div className="grid gap-3 md:grid-cols-3 text-center text-sm">
                  <div>
                    <Heart className="h-6 w-6 mx-auto mb-2 text-red-500" />
                    <p>Human values guide direction</p>
                  </div>
                  <div>
                    <Bot className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                    <p>AI provides analysis</p>
                  </div>
                  <div>
                    <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p>Community makes decisions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help build the first governance system that can improve itself.
            Where every voice matters and the best ideas win.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button asChild size="lg">
              <Link href="/how-it-works">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/forum">
                <MessageSquare className="h-4 w-4 mr-2" />
                Join Discussion
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No investment required. Just bring your ideas.
          </p>
        </div>
      </div>
    </div>
  );
}
