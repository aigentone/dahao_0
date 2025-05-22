'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon, FileTextIcon, MessageSquareIcon, VoteIcon } from 'lucide-react';
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
      title: 'Constitution',
      description: 'Read and understand our community guidelines and principles',
      href: '/constitution',
    },
    {
      icon: VoteIcon,
      title: 'Governance',
      description: 'Participate in decision-making through proposals and voting',
      href: '/governance',
    },
    {
      icon: MessageSquareIcon,
      title: 'Forum',
      description: 'Engage in discussions with the community',
      href: '/forum',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to DaHao DAO
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A decentralized platform for community governance and collaboration
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
          <h2 className="text-2xl font-semibold mb-4">About DaHao DAO</h2>
          <div className="prose prose-gray mx-auto">
            <p className="text-muted-foreground">
              DaHao DAO is a decentralized autonomous organization that empowers communities
              to make collective decisions through transparent governance mechanisms.
              Our platform enables members to create proposals, vote on important matters,
              and engage in meaningful discussions.
            </p>
            <p className="text-muted-foreground mt-4">
              Built on principles of transparency, inclusivity, and democratic participation,
              we're creating a space where every voice matters and collective wisdom drives progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}