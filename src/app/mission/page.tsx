import {
  HeroSection,
  FeatureCard,
  StepProcess,
  NavigationCTA
} from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GitBranch,
  Users,
  Zap,
  MessageSquare,
  Brain,
  Network,
  Heart,
  Music,
  Car,
  GraduationCap,
  ChevronRight,
  ArrowRight,
  Home,
  BookOpen
} from 'lucide-react';

export default function MissionPage() {
  const phases = [
    {
      number: 1,
      title: "Genesis (Planned)",
      description: "Vision: Using DAHAO to build DAHAO",
      details: [
        "Community defines what 'governance' means",
        "Create first terms, principles, rules together",
        "Test AI collaboration patterns",
        "Discover ideal Git structure through practice",
        "No tokens, just building"
      ]
    },
    {
      number: 2,
      title: "Economic Layer",
      description: "Add sustainable value flows",
      details: [
        "DAHAOs earn trust through transparent governance",
        "Launch tokens when community reaches consensus",
        "Invest in causes you believe in, earn returns",
        "See exactly how funds are allocated on-chain",
        "Transform charity into sustainable economy"
      ]
    },
    {
      number: 3,
      title: "Real-World DAHAOs",
      description: "Communities launch their own essential services",
      details: [
        "Driver-owned transport networks",
        "Artist-governed music platforms",
        "Patient-led healthcare cooperatives",
        "Farmer-controlled supply chains",
        "Each DAHAO owned by its users"
      ]
    },
    {
      number: 4,
      title: "Parallel Economy",
      description: "Alternative to corporate world",
      details: [
        "Thousands of interconnected DAHAOs",
        "Cross-DAHAO value flows",
        "True economic democracy",
        "Middlemen become obsolete",
        "People-powered future realized"
      ]
    }
  ];

  const balanceExamples = [
    {
      title: "Personal Ethics DAHAO",
      description: "You might give your AI full autonomy within your values",
      icon: Heart,
      iconColor: "text-red-500"
    },
    {
      title: "Music Creation DAHAO",
      description: "AI as creative partner with humans",
      icon: Music,
      iconColor: "text-purple-500"
    },
    {
      title: "Emergency Response DAHAO",
      description: "AI speed might be essential for crisis response",
      icon: Zap,
      iconColor: "text-yellow-500"
    }
  ];

  const applications = [
    {
      title: "Transportation Networks",
      subtitle: "Uber without Uber - Your assets work for you",
      icon: Car,
      details: [
        "Self-driving cars join autonomous delivery networks",
        "Community-defined 'fairness' in pricing algorithms",
        "Drivers keep 100% after infrastructure costs",
        "Your Tesla earns $500/night instead of sitting idle"
      ]
    },
    {
      title: "Education Networks",
      subtitle: "Learning without Debt - Knowledge that pays forward",
      icon: GraduationCap,
      details: [
        "Create courses, get paid based on student success",
        "Peer teaching with compensation",
        "AI tutoring with human wisdom",
        "Learn now, contribute back when able"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <HeroSection
          badge="Phase 1: Envisioning DAHAO"
          title="Our Mission"
          subtitle="Building the first dialectic platform where human values evolve at the speed of technology"
          maxWidth="4xl"
        />

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Technology Outpaces Human Governance</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p>
              Technology evolves exponentially while human language and ethics crawl along at biological pace.
              This gap creates a dangerous power vacuum that corporations are rushing to fill.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <FeatureCard
              title="The Definition Gap"
              description="Critical concepts resist singular meaning. Communities interpret through their lens. Experience shapes understanding.
Security sees encryption. Healthcare sees confidentiality. Legal sees rights. Each domain speaks its dialect.
Building systems that listen: versioned definitions. Contextual interpretation. Domain-specific truth."
              variant="border-left"
              borderColor="border-l-red-500"
            />
            <FeatureCard
              title="Corporate AI Dominance"
              description="Big Tech writes the rules. Their AIs optimize for engagement and profit, not human flourishing. By the time regulators react, it's already too late. The gap between AI capability and democratic control widens daily."
              variant="border-left"
              borderColor="border-l-orange-500"
            />
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-6 w-6 text-blue-600 " />
                The Agent Network Revolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As AI researcher Andrej Karpathy observes, LLMs are becoming "people spirits" - stochastic
                simulations of human thought. A new agent network is forming, like the internet but for AI minds.
                Our agents will soon coordinate automatically with other systems.
              </p>
              <p className="text-muted-foreground mt-4 font-medium">
                The question is: Will this network serve corporate interests or human values?
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Our Insight */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Insight: Dialectic Evolution</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
            <p>
              What if we could evolve language and ethics at technology speed? What if communities could
              democratically define what concepts mean in real-time? What if AI could help us think faster
              without controlling our thoughts?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={MessageSquare}
              iconColor="text-blue-600"
              title="Living Language"
              description="System evolve through democratic discussion"
            />
            <FeatureCard
              icon={GitBranch}
              iconColor="text-green-600"
              title="Versioned Ethics"
              description="Every definition tracked and reversible"
            />
            <FeatureCard
              icon={Brain}
              iconColor="text-purple-600"
              title="AI Enhancement"
              description="Technology amplifies human reasoning"
            />
            <FeatureCard
              icon={Users}
              iconColor="text-orange-600"
              title="Dynamic Balance"
              description="Each community finds its own AI-human balance"
            />
            <FeatureCard
              icon={Zap}
              iconColor="text-yellow-600"
              title="Speed Matching"
              description="Governance evolves as fast as technology"
            />
          </div>
        </section>

        {/* Why Now */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Now? Individuals Are Finally Empowered</h2>
          <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                For the first time in history, transformative technology (LLMs) empowers individuals more than corporations.
                Every person now has access to quasi-expert knowledge across all domains.
              </p>
              <p className="text-muted-foreground">
                DAHAO takes this unprecedented moment and asks: What if we organized this newly empowered population?
                What if millions of AI-enhanced individuals could coordinate dialectically without corporate intermediaries?
              </p>
              <div className="bg-background/70 rounded-lg p-4 mt-4">
                <p className="font-medium text-foreground">
                  The cognitive power is already in people's hands. DAHAO just gives them a platform to think together.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI-Human Balance */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">AI-Human Balance: Your Choice</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every DAHAO finds its own optimal balance. No universal rule. Each community experiments and finds what works.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {balanceExamples.map((example, index) => (
              <FeatureCard
                key={index}
                icon={example.icon}
                iconColor={example.iconColor}
                title={example.title}
                description={example.description}
              />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Living Balance Evolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Day 1</Badge>
                  <span className="text-sm">Community starts human-heavy, AI suggests only</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Month 1</Badge>
                  <span className="text-sm">Trust builds, AI gets more autonomy in specific areas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Crisis Mode</Badge>
                  <span className="text-sm">AI might take emergency powers within preset boundaries</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Ongoing</Badge>
                  <span className="text-sm">Balance evolves based on community needs and proven performance</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>


        {/* The Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">The Journey: From Discussion to Civilization</h2>
          <StepProcess steps={phases} />
        </section>

        {/* Three Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Three Principles of Dialectic Governance</h2>
          <div className="grid gap-6">
            <FeatureCard
              title="Radical Transparency"
              description="Every discussion, decision, and evolution recorded publicly. No hidden agendas. No corporate manipulation. Pure collective reasoning."
              variant="border-left"
              borderColor="border-l-blue-500"
            />
            <FeatureCard
              title="Democratic Evolution"
              description="Communities decide what concepts mean through discussion, not dictionaries. No final authorities except collective wisdom."
              variant="border-left"
              borderColor="border-l-green-500"
            />
            <FeatureCard
              title="Protected Experimentation"
              description="Your right to fork is sacred. Test ideas. Keep what works. Share insights. Minority perspectives can always experiment."
              variant="border-left"
              borderColor="border-l-purple-500"
            />
          </div>
        </section>



        {/* The Promise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Philosophical Promise</h2>
          <Card className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                We're not just building better discussion software. We're creating the first system where:
              </p>
              <ul className="space-y-3">
                {[
                  "Language evolves democratically at technological advancement speed",
                  "AI serves human-defined values instead of corporate goals",
                  "Communities coordinate without centralized control",
                  "Individual reasoning gets amplified by collective intelligence",
                  "Economic value flows to those who create it"
                ].map((promise, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{promise}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Interested in Dialectic Governance?</h2>
              <p className="text-xl mb-6 text-blue-100">
                Learn about our vision for the first platform where human values could evolve at the speed of innovation.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  "Genesis Vision: How we'll shape fundamental concepts together",
                  "Future Domains: Which industries could benefit from dialectic coordination",
                  "Planned Discussions: How your reasoning will improve collective understanding",
                  "AI Integration Concept: How agents could participate in collective reasoning"
                ].map((action, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <ChevronRight className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100">{action}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="text-blue-100">
                  No investment required. No permission needed. Just bring your capacity to reason
                  and willingness to have your mind changed by better arguments.
                </p>
              </div>

              <p className="text-xl font-medium">
                The future isn't built by corporations deciding what concepts mean.
                It's built by communities thinking together.
              </p>
            </CardContent>
          </Card>
        </section>

        <NavigationCTA
          buttons={[
            {
              text: "Back to Home",
              href: "/",
              variant: "outline",
              icon: Home,
              iconPosition: "left"
            },
            {
              text: "Learn More",
              href: "/how-it-works",
              variant: "default",
              icon: BookOpen,
              iconPosition: "right"
            }
          ]}
        />
      </div>
    </div>
  );
}
