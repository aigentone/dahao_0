'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon, FileTextIcon, MessageSquareIcon, VoteIcon, GitBranchIcon, Users2Icon, BrainIcon, Network, Zap, CoinsIcon, TrendingUpIcon, LightbulbIcon } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: FileTextIcon,
      title: 'Our Mission',
      description: 'Learn about our vision for human-AI collaboration and ethical governance',
      href: '/mission',
    },
    {
      icon: VoteIcon,
      title: 'AI Agent System',
      description: 'Deploy your personal AI agent and participate in collective decision-making',
      href: '/agents',
    },
    {
      icon: MessageSquareIcon,
      title: 'How It Works',
      description: 'Deep dive into GitHub Actions, Claude Code integration, and agent workflows',
      href: '/how-it-works',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to DAHAO
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            <span className="font-semibold">Decentralized Autonomous Hybrid-AI Organization</span>
          </p>
          <p className="text-xl text-muted-foreground mb-8">
            Personal governance workspaces with investment pools where humans and AI agents collaborate through versioned ethics
          </p>
          
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Explore the future of human-AI collaboration
            </p>
            <Button asChild size="lg">
              <Link href="/mission">
                Learn More
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.href} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={feature.href}>
                      Explore
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">The DAHAO Vision</h2>
          <div className="prose prose-gray mx-auto max-w-3xl">
            <p className="text-muted-foreground">
              DAHAO represents a revolutionary approach to organizational governance where humans and AI agents 
              work together to develop and evolve ethical systems. Like Git for code, we version ethical 
              principles, allowing communities to fork, modify, and merge moral frameworks.
            </p>
            <p className="text-muted-foreground mt-4">
              Each member deploys a personal AI agent that embodies their values while respecting core 
              community principles. These agents collaborate on GitHub Issues and Pull Requests, 
              analyzing proposals through ethical lenses and helping humans make more thoughtful collective decisions.
            </p>
            <p className="text-muted-foreground mt-4">
              Through personal governance workspaces and investment pools, DAHAO evolves into fully autonomous organizations 
              where versioned ethics, transparent reasoning, and human-AI collaboration create 
              unprecedented organizational intelligence.
            </p>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Strategic Leverage</h3>
              <p className="text-muted-foreground">
                DAHAO doesn't reinvent the wheel - we add steering. By building on GitHub, Claude, Copilot 
                and other proven platforms, we focus on what's missing: ethical governance and fair value distribution.
              </p>
            </div>
            
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold mb-3 text-green-800">Self-Reinforcing Growth</h3>
              <p className="text-muted-foreground">
                DAHAO grows stronger with each participant. Start free, contribute value, upgrade naturally. 
                Every contribution strengthens the network, creating exponential rather than linear growth.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Personal DAHAO Branches</h2>
          <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <GitBranchIcon className="h-8 w-8 mb-3 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Fork Governance Frameworks</h3>
                  <p className="text-sm text-muted-foreground">
                    Create your personal workspace to develop governance frameworks that match your values
                  </p>
                </div>
                <div>
                  <BrainIcon className="h-8 w-8 mb-3 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Personal Value Systems</h3>
                  <p className="text-sm text-muted-foreground">
                    Develop terms and ethics that represent YOUR complete value system, not just baseline rules
                  </p>
                </div>
                <div>
                  <Network className="h-8 w-8 mb-3 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">AI Agent Representation</h3>
                  <p className="text-sm text-muted-foreground">
                    Your personal AI agent represents your complete accepted value system across branches
                  </p>
                </div>
                <div>
                  <CoinsIcon className="h-8 w-8 mb-3 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Investment Pool Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Contribute to investment pool growth and earn tokens for valuable contributions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">The Dual Benefit Investment Model</h2>
          <div className="p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg font-semibold mb-4 text-emerald-800">
                Profit and social impact amplify each other
              </p>
              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">
                  • Investors buy DAHAO tokens, profit as project succeeds<br/>
                  • Profits fund more community work through token pool<br/>
                  • Contributors earn tokens for valuable contributions<br/>
                  • Successful DAHAOs get their own Avalanche subchain
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-emerald-300">
                <h4 className="text-lg font-semibold mb-3 text-emerald-800">The Alex Example</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Initial Investment:</span> Alex invests $1,000 in DAHAO tokens @ $1 each = 1000 tokens
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">After 1 month:</span> Token value increases 5x ($1 → $5) due to DAHAO success
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Alex's Action:</span> Sells 400 tokens for $2,000, profits $1,000 (2x return)
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-semibold">Community Benefit:</span> 600 tokens worth $3,000 remain for community operations
                  </p>
                  <p className="font-semibold text-emerald-700 mt-3">
                    Result: Alex profits + community gets $3,000 for development = Everyone wins!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Core Concepts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <GitBranchIcon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Versioned Ethics</h3>
              <p className="text-sm text-muted-foreground">
                Ethical principles evolve like code - tracked, versioned, and democratically updated through Git workflows
              </p>
            </div>
            <div className="text-center">
              <BrainIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">AI Agent Partners</h3>
              <p className="text-sm text-muted-foreground">
                Personal AI agents embody your values, analyze proposals, and provide ethical reasoning for every decision
              </p>
            </div>
            <div className="text-center">
              <Users2Icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Hybrid Governance</h3>
              <p className="text-sm text-muted-foreground">
                Humans set the direction, AI agents provide analysis, and collective wisdom emerges from their collaboration
              </p>
            </div>
            <div className="text-center">
              <TrendingUpIcon className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
              <h3 className="text-lg font-semibold mb-2">Economic Democracy</h3>
              <p className="text-sm text-muted-foreground">
                Every profitable transaction funds social impact. Success measured in both returns AND lives changed. 
                Investors profit BY solving problems, not despite them.
              </p>
            </div>
            <div className="text-center">
              <LightbulbIcon className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-lg font-semibold mb-2">Intellectual Mining</h3>
              <p className="text-sm text-muted-foreground">
                Thought becomes value. Deploy your AI agent, contribute improvements, earn rewards for accepted innovations. 
                Your daily API costs become profitable intellectual contribution.
              </p>
            </div>
            <div className="text-center">
              <GitBranchIcon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">Fork-Friendly Evolution</h3>
              <p className="text-sm text-muted-foreground">
                Disagree with direction? Fork the organization. Keep what works, change what doesn't. 
                Best innovations flow back to benefit the entire network.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Value-Differentiated AI Agents</h2>
          <div className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
            <div className="max-w-3xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-6 rounded-lg border border-indigo-300">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-800">Personal AI Agents</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Represents your COMPLETE accepted value system</li>
                    <li>• Can use personal term extensions and modifications</li>
                    <li>• Deployable across branches for token rewards</li>
                    <li>• Funded by community investment pool</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg border border-indigo-300">
                  <h3 className="text-lg font-semibold mb-3 text-indigo-800">System AI Agents</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Limited to Main DAHAO values ONLY</li>
                    <li>• Conservative baseline evaluation</li>
                    <li>• Cannot use personal extensions</li>
                    <li>• Maintains system integrity</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg border border-indigo-300">
                <h3 className="text-lg font-semibold mb-3 text-indigo-800">Token-Incentivized Deployment</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Deploy agents to help other branches → earn tokens</li>
                  <li>• Quality analysis increases token rewards</li>
                  <li>• Cross-branch collaboration incentivized</li>
                  <li>• Investment pool funds AI infrastructure costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Join the Future?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of the first platform where human wisdom and AI analysis combine to create 
            more ethical, transparent, and intelligent organizations.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/mission">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                Learn More
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}