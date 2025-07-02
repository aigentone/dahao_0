'use client';

import {
  HeroSection,
  NavigationCTA,
  Section,
  SectionTitle,
  CodeBlock,
  IconList,
  InfoCard,
  FeatureGrid,
  FeatureCard
} from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DollarSign,
  TrendingUp,
  Building,
  Globe,
  Rocket,
  ArrowRight,
  Home,
  Layers,
  GitBranch,
  Vote,
  Scale,
  TrendingDown,
  Heart
} from 'lucide-react';

export default function EconomicsPage() {
  const economicRules = `Rule #47: "@funding-threshold triggers at 1000 verified impact points"
Rule #48: "Token distribution: @community-allocation"
Rule #49: "Treasury spending requires @economic-consensus"`;

  const scaleExamples = [
    {
      icon: Home,
      iconColor: 'text-blue-500',
      title: 'Your Apartment Building',
      description: 'Local governance for 50 people'
    },
    {
      icon: Building,
      iconColor: 'text-purple-500',
      title: 'Your City',
      description: 'Municipal decisions for 5 million residents'
    },
    {
      icon: Globe,
      iconColor: 'text-green-500',
      title: 'Your Nation',
      description: 'National coordination at scale'
    },
    {
      icon: Globe,
      iconColor: 'text-orange-500',
      title: 'Your Planet',
      description: 'Global climate coordination for 8 billion'
    }
  ];

  const applications = [
    'A local farmers market (50 people)',
    'An open-source project (5,000 contributors)',
    'A city\'s budget decisions (5 million residents)',
    'Global climate coordination (8 billion stakeholders)'
  ];

  const futureApplications = [
    'Startups incorporate as DAHAOs',
    'Cities run on DAHAO governance',
    'NGOs coordinate through DAHAOs',
    'Even nations could democratize via DAHAO'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section variant="gradient" className="text-center">
        <div className="container mx-auto max-w-4xl">
          <HeroSection
            badge="Economic Democracy"
            badgeVariant="secondary"
            title="Economics as Governance"
            subtitle="In DAHAO, financial decisions are democratic rules that evolve with your community"
            description="From local markets to global coordination - one framework, infinite applications"
            maxWidth="3xl"
          />
        </div>
      </Section>

      {/* Economics Through Democratic Rules */}
      <Section>
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Economics Through Democratic Rules"
            subtitle="Every financial decision is a democratically-controlled rule that can evolve"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Example Economic Rules
              </h3>
              <CodeBlock variant="default" className="mb-6">
                {economicRules}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Vote className="h-5 w-5 text-blue-600" />
                Your Community Defines
              </h3>
              <IconList
                items={[
                  'When to launch tokens (through rules)',
                  'How value flows (through rules)',
                  'What metrics matter (through @terms)',
                  'Financial transparency standards (through rules)'
                ]}
                icon={ArrowRight}
                iconColor="text-primary"
              />
              
              <InfoCard variant="info" className="mt-6" showIcon={false}>
                The same system that governs decisions governs money. Democratic. Versioned. Transparent.
              </InfoCard>
            </div>
          </div>
        </div>
      </Section>

      {/* Universal Operating System */}
      <Section variant="muted">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Universal Operating System for Organizations"
            subtitle="DAHAO isn't just for small communities - it's an operating system for human organization at any scale"
          />

          <FeatureGrid columns={4} gap="normal">
            {scaleExamples.map((example, index) => (
              <FeatureCard
                key={index}
                icon={example.icon}
                iconColor={example.iconColor}
                title={example.title}
                description={example.description}
                className="text-center"
              />
            ))}
          </FeatureGrid>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              The same core system can power:
            </p>
            <IconList
              items={applications}
              icon={Scale}
              iconColor="text-purple-600"
              className="max-w-2xl mx-auto text-left"
            />
          </div>
        </div>
      </Section>

      {/* One Framework, Infinite Applications */}
      <Section>
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="One Framework, Infinite Applications"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-red-600" />
                  Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every organization builds governance from scratch
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-green-600" />
                  Tomorrow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fork DAHAO, customize, deploy
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-600" />
              Imagine
            </h3>
            <IconList
              items={futureApplications}
              icon={TrendingUp}
              iconColor="text-green-600"
              spacing="relaxed"
            />
            
            <InfoCard variant="success" className="mt-8 max-w-2xl mx-auto" showIcon={false}>
              <strong>Build once. Humanity uses forever.</strong>
            </InfoCard>
          </div>
        </div>
      </Section>

      {/* Start Small, Think Big */}
      <Section variant="gradient">
        <div className="container mx-auto max-w-4xl text-center">
          <SectionTitle
            title="Start Small, Think Big"
            subtitle="Begin with your community's specific needs. As you prove what works, your innovations can spread to others."
          />

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-lg mb-4">
                A small animal welfare DAHAO today could inspire citywide policy tomorrow.
              </p>
              <p className="text-muted-foreground">
                The revolution isn't top-down. It's bottom-up, spreading one successful DAHAO at a time.
              </p>
            </CardContent>
          </Card>

          <NavigationCTA
            className="mt-12"
            buttons={[
              { text: "Explore How It Works", href: "/how-it-works" },
              { text: "Join the Mission", href: "/mission" }
            ]}
          />
        </div>
      </Section>

      {/* Dual Benefit: Impact + Returns */}
      <Section>
        <div className="container mx-auto max-w-6xl">
          <SectionTitle
            title="Dual Benefit: Impact + Returns"
            subtitle="Invest in the future you want to see while earning sustainable returns"
          />

          <FeatureGrid columns={2} gap="normal">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Social Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <IconList
                  items={[
                    'Support causes you believe in directly',
                    'See transparent impact metrics on-chain',
                    'Vote on how funds create change',
                    'Build communities around shared values'
                  ]}
                  icon={ArrowRight}
                  iconColor="text-green-600"
                  spacing="tight"
                />
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Financial Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <IconList
                  items={[
                    'Earn from successful DAHAO growth',
                    'Transparent tokenomics via rules',
                    'Community-driven value creation',
                    'Sustainable economic models'
                  ]}
                  icon={ArrowRight}
                  iconColor="text-blue-600"
                  spacing="tight"
                />
              </CardContent>
            </Card>
          </FeatureGrid>

          <InfoCard variant="success" className="mt-8 max-w-3xl mx-auto" showIcon={false}>
            <strong>Transform charity into investment.</strong> When DAHAOs succeed in their missions, 
            early supporters benefit both from the positive impact created and from the economic value generated. 
            It's not charity - it's sustainable economics aligned with your values.
          </InfoCard>
        </div>
      </Section>
    </div>
  );
}