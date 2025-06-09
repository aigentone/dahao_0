'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, TrendingUpIcon, ShieldIcon, EyeIcon, HeartIcon, ZapIcon, GitBranchIcon } from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Our Mission: Technology for Human Values
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Harnessing the greatest technological revolution in history to serve humanity, 
            not just shareholders.
          </p>
        </div>

        {/* The Great Acceleration */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ZapIcon className="h-6 w-6 text-blue-600" />
                The Great Acceleration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We live in an age of unprecedented technological advancement. OpenAI, Anthropic, Microsoft, 
                and Google pour billions into making AI more capable every day. Each breakthrough in reasoning, 
                each improvement in code generation, each advance in agent communication - the pace is breathtaking.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border-l-4 border-l-red-500">
                <h3 className="font-semibold text-red-800 mb-2">But there's a problem.</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Concentration Risk */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-6 w-6 text-red-600" />
                The Concentration Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                These powerful technologies serve corporate interests first. Traditional organizations can't keep up - 
                they take years to adopt innovations, while tech giants accumulate unprecedented power.
              </p>
              <div className="bg-white/70 p-4 rounded-lg border-l-4 border-l-red-500">
                <p className="font-semibold text-red-800">
                  The future is being built, but not for everyone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Our Insight */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartIcon className="h-6 w-6 text-green-600" />
                Our Insight: Surf, Don't Build
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The beauty of DAHAO lies in a simple realization: we don't need to build the technology - 
                tech giants are already doing it for us. We're not competing with these investments; we're surfing on them.
              </p>
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-green-800 mb-2">Claude Gets Better</div>
                  <div className="text-sm text-muted-foreground">→ Every DAHAO agent becomes smarter</div>
                </div>
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-blue-800 mb-2">GitHub Advances</div>
                  <div className="text-sm text-muted-foreground">→ Every DAHAO inherits new capabilities</div>
                </div>
                <div className="bg-white/70 p-4 rounded-lg text-center">
                  <div className="font-semibold text-purple-800 mb-2">Standards Emerge</div>
                  <div className="text-sm text-muted-foreground">→ Network gains new powers overnight</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Automatic Evolution */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Evolution</CardTitle>
              <CardDescription>Organizations that inherit improvements instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                What makes DAHAO revolutionary isn't just using current AI tools - it's creating a protocol 
                that automatically incorporates every future advancement. Traditional organizations must manually 
                adopt new technologies, often taking years to integrate innovations. DAHAO organizations inherit 
                improvements instantly.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">The Compound Effect</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Better AI → Better organizational decisions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Better decisions → More resources</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">More resources → Fund more innovation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">More innovation → Better outcomes for everyone</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white/70 rounded border-l-4 border-l-blue-500">
                  <p className="text-sm font-medium text-blue-800">
                    We're not building technology; we're building the vessel that will carry us wherever technology goes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Three Pillars */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Three Pillars of Evolution</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Radical Openness */}
            <Card className="bg-gradient-to-b from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranchIcon className="h-6 w-6 text-blue-600" />
                  Radical Openness
                </CardTitle>
                <CardDescription>Evolution Through Transparency</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  DAHAO isn't just built on open source - it IS open source at every level. Every line of code, 
                  every governance decision, every organizational evolution lives publicly on GitHub.
                </p>
                <div className="space-y-2">
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Why?</strong> Closed systems can't evolve. Hidden processes can't be trusted.
                  </div>
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Result:</strong> When you fork a DAHAO, you inherit transparent history, proven patterns, and collective wisdom.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decentralization as Immunity */}
            <Card className="bg-gradient-to-b from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldIcon className="h-6 w-6 text-green-600" />
                  Decentralization as Immunity
                </CardTitle>
                <CardDescription>No Single Point of Failure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Traditional organizations have vulnerabilities: CEOs who can corrupt, servers that can be shut down, 
                  headquarters that can be raided. DAHAO has none of these.
                </p>
                <div className="space-y-2">
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Structure:</strong> Each DAHAO runs on its own Avalanche subnet
                  </div>
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Agents:</strong> Operate from wherever their humans are
                  </div>
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Decisions:</strong> Emerge from collective intelligence
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transparency as Trust */}
            <Card className="bg-gradient-to-b from-purple-50 to-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <EyeIcon className="h-6 w-6 text-purple-600" />
                  Transparency as Trust
                </CardTitle>
                <CardDescription>Verify, Don't Believe</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  In DAHAO, transparency isn't a feature - it's the foundation. Every transaction on-chain. 
                  Every decision recorded. Every code change tracked.
                </p>
                <div className="space-y-2">
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Innovation:</strong> Trust without faith - you can verify everything yourself
                  </div>
                  <div className="text-xs bg-white/70 p-2 rounded">
                    <strong>Effect:</strong> Good actors drive out bad through sheer visibility
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Vision */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-center text-indigo-800">The Vision: Living Organizations</CardTitle>
              <CardDescription className="text-center">
                Organizations that emerge, evolve, and thrive as living entities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-6">
                DAHAO enables organizations to emerge, evolve, and thrive as living entities. By combining 
                personal AI agents, versioned governance components, and blockchain verification, DAHAO creates 
                the conditions for organizational life - but does not dictate its form.
              </p>
              <div className="bg-white/70 p-6 rounded-lg border-l-4 border-l-indigo-500">
                <h4 className="font-semibold text-indigo-800 mb-3">The Revolutionary Insight</h4>
                <p className="text-sm text-muted-foreground">
                  We don't need to build the technology - we need to harness its continuous evolution. 
                  As tech giants pour billions into AI development, DAHAO provides the protocol to channel 
                  these advancements into living organizations that automatically inherit every improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Future We're Building */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardHeader>
              <CardTitle>The Future We're Building</CardTitle>
              <CardDescription>A new way to grow with technology</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                This isn't just new technology - it's a new way to use continuously evolving technology 
                to grow organizations that adapt as fast as the world changes.
              </p>
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">The Dual Benefit Model</h4>
                  <p className="text-sm text-muted-foreground">
                    Profit and social impact amplify each other, transforming traditional charity 
                    into self-sustaining engines of positive change.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Adaptive Organizations</h4>
                  <p className="text-sm text-muted-foreground">
                    Organizations that adapt as fast as the world changes, powered by 
                    the continuous evolution of AI technology.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg text-center">
                <p className="font-semibold text-orange-800">
                  The future is coming whether we build it or not. DAHAO ensures it serves humanity.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Revolution</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of building organizations that evolve as fast as technology advances. 
            Where human values guide the direction, and AI acceleration provides the speed.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/api/auth/github">
                Start Building
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">
                See How It Works
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}