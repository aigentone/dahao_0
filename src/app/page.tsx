'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon, FileTextIcon, MessageSquareIcon, VoteIcon, GitBranchIcon, Users2Icon, BrainIcon, Network, Zap, CoinsIcon, TrendingUpIcon, LightbulbIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Session } from '@/lib/auth/types';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setSession(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const features = [
    {
      icon: FileTextIcon,
      title: 'Ethics Framework',
      description: 'Explore versioned ethical principles and their evolution through community consensus',
      href: '/constitution',
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
            Where humans and AI agents collaborate to evolve ethical systems through versioned governance
          </p>
          
          {loading ? (
            <div className="inline-block h-10 w-32 animate-pulse bg-muted rounded" />
          ) : session ? (
            <div className="space-y-2">
              <p className="text-lg">
                Welcome back, <span className="font-semibold">{session.user.name || session.user.username}</span>!
              </p>
              <Button asChild>
                <Link href="/governance">
                  Go to Governance
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Sign in to participate in governance and join the community
              </p>
              <Button asChild size="lg">
                <Link href="/api/auth/github">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
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
              Starting as a forum-like platform, DAHAO evolves into fully autonomous organizations 
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

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Join the Future?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of the first platform where human wisdom and AI analysis combine to create 
            more ethical, transparent, and intelligent organizations.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/api/auth/github">
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