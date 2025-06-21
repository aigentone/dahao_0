// app/versioned-ethics/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GitBranch, Shield, Brain, Users, RefreshCw, BookOpen,
  Building, Scale, Layers, ArrowRight, CheckCircle,
  AlertTriangle, Zap, History, Vote,
  ShieldCheck, Lightbulb, Code2, TrendingUp,
  Bot, Gauge,
  Lock, Unlock, Timer, Settings, PlayCircle, PauseCircle
} from 'lucide-react';
import Link from 'next/link';
import { HeroSection, FeatureCard } from '@/components/shared';

export default function VersionedEthicsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <HeroSection
          badge="The Four-Layer Architecture"
          title="Versioned Ethics"
          subtitle="How DAHAO Enables AI to Govern at the Speed of Innovation While Preserving Human Control"
          description="Imagine if AI could help create and evolve your organization's rules - but only in ways you explicitly authorize. That's Versioned Ethics: a system where AI can govern, propose, and modify, but always within boundaries you control."
          maxWidth="3xl"
        />

        {/* Core Philosophy */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">The Core Philosophy: Controlled Acceleration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              At the heart of DAHAO lies a revolutionary principle: <strong>AI can create, modify, and
              govern - but only with your explicit permission and within your defined boundaries.</strong>
            </p>
            <p className="mb-6">
              As technology accelerates beyond human comprehension speed, we can't afford to bottleneck
              governance at human pace. DAHAO solves this by letting you choose exactly how much authority
              to give your AI agents.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="grid md:grid-cols-3 gap-4">
                <FeatureCard
                  icon={Zap}
                  iconColor="text-yellow-600"
                  title="Speed When Needed"
                  description="AI can govern at machine speed"
                />
                <FeatureCard
                  icon={Shield}
                  iconColor="text-blue-600"
                  title="Safety Always"
                  description="Version control and rollbacks"
                />
                <FeatureCard
                  icon={Users}
                  iconColor="text-purple-600"
                  title="Your Control"
                  description="You set the boundaries"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your AI, Your Rules: Permission Framework */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Your AI, Your Rules: The Permission Framework</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Choose Your Governance Speed</CardTitle>
              <CardDescription>Select the level of AI involvement that matches your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <strong>Manual Mode</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Review every proposal personally</li>
                      <li>• Vote on each change individually</li>
                      <li>• Full human control, human speed</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <strong>AI-Assisted Mode</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI analyzes and recommends</li>
                      <li>• You review AI suggestions</li>
                      <li>• You cast the final vote</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-5 w-5 text-green-600" />
                      <strong>AI-Governed Mode</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI can propose new terms and rules</li>
                      <li>• AI votes based on your values</li>
                      <li>• AI can modify governance in your branch</li>
                      <li>• You maintain override authority</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      <strong>Full Autonomous Mode</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI governs your branch independently</li>
                      <li>• Creates new governance structures</li>
                      <li>• Evolves terms based on outcomes</li>
                      <li>• You set boundaries and constraints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Four Layers with AI Participation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Four Layers: Flexible Control at Every Level</h2>

          {/* Visual Architecture */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col gap-4">
                {/* Layer 1: Terms */}
                <div className="relative">
                  <div className="bg-blue-100 rounded-lg p-6 border-2 border-blue-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-blue-700" />
                        <div>
                          <h3 className="text-xl font-bold text-blue-900">Layer 1: Terms - Living Definitions</h3>
                          <p className="text-blue-700">The DNA of governance with precise versions</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-200 text-blue-900">Foundation</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-2">Example Terms:</p>
                        <div className="space-y-1">
                          <code className="bg-white p-2 rounded text-sm block">harm@v1.2</code>
                          <code className="bg-white p-2 rounded text-sm block">efficiency@v2.1</code>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-2">AI Participation Options:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Suggest new terms from patterns</li>
                          <li>• Propose modifications</li>
                          <li>• Auto-update in your branch</li>
                          <li>• All changes versioned</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto my-2" />
                </div>

                {/* Layer 2: Principles */}
                <div className="relative">
                  <div className="bg-green-100 rounded-lg p-6 border-2 border-green-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building className="h-8 w-8 text-green-700" />
                        <div>
                          <h3 className="text-xl font-bold text-green-900">Layer 2: Principles - Encoded Values</h3>
                          <p className="text-green-700">Value statements built from versioned terms</p>
                        </div>
                      </div>
                      <Badge className="bg-green-200 text-green-900">Values</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-green-900 mb-2">Example:</p>
                        <code className="bg-white p-3 rounded text-sm block">
                          "Maximize benefit@v1.3 while minimizing harm@v1.2"
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-green-900 mb-2">AI Capabilities (When Authorized):</p>
                        <ul className="text-sm space-y-1">
                          <li>• Generate principles from patterns</li>
                          <li>• Optimize combinations</li>
                          <li>• Resolve conflicts</li>
                          <li>• Evolve based on outcomes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto my-2" />
                </div>

                {/* Layer 3: Rules */}
                <div className="relative">
                  <div className="bg-purple-100 rounded-lg p-6 border-2 border-purple-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Scale className="h-8 w-8 text-purple-700" />
                        <div>
                          <h3 className="text-xl font-bold text-purple-900">Layer 3: Rules - Operational Intelligence</h3>
                          <p className="text-purple-700">Concrete actions implementing principles</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-200 text-purple-900">Operations</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-purple-900 mb-2">Example:</p>
                        <code className="bg-white p-3 rounded text-sm block">
                          "When harm@v1.2 risk &gt;15%, require human review"
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-purple-900 mb-2">AI Rule Creation (Your Choice):</p>
                        <ul className="text-sm space-y-1">
                          <li>• Draft rules automatically</li>
                          <li>• Modify based on performance</li>
                          <li>• Create exception handling</li>
                          <li>• Optimize interactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto my-2" />
                </div>

                {/* Layer 4: Meta-Rules */}
                <div className="relative">
                  <div className="bg-orange-100 rounded-lg p-6 border-2 border-orange-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="h-8 w-8 text-orange-700" />
                        <div>
                          <h3 className="text-xl font-bold text-orange-900">Layer 4: Meta-Rules - Evolution Control</h3>
                          <p className="text-orange-700">How the system changes itself</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-200 text-orange-900">Evolution</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-orange-900 mb-2">Example:</p>
                        <code className="bg-white p-3 rounded text-sm block">
                          "AI can modify terms with &lt;20% impact without approval"
                        </code>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-orange-900 mb-2">You Define AI's Boundaries:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Set change thresholds</li>
                          <li>• Define emergency powers</li>
                          <li>• Create rollback triggers</li>
                          <li>• Establish review requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Control Panel Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Your Control Panel: Setting AI Boundaries</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-600" />
                  <CardTitle>Term Creation Authority</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Never</span>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Suggest Only</span>
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Domain-Limited</span>
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Full Authority</span>
                    <Unlock className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  AI cannot create new terms / AI proposes, you approve /
                  AI can create terms in specific areas / AI creates terms as needed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <CardTitle>Modification Rights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Read-Only</span>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Minor Updates</span>
                    <RefreshCw className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Evolution Rights</span>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Full Modification</span>
                    <Unlock className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  AI analyzes but cannot change / AI can clarify without changing meaning /
                  AI can expand definitions / AI can completely revise
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-green-600" />
                  <CardTitle>Voting Delegation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">No Delegation</span>
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Aligned Only</span>
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Default Yes/No</span>
                    <PlayCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Full Autonomy</span>
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  You vote on everything / AI votes when clearly matching your values /
                  AI follows your general stance / AI votes based on analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <CardTitle>Emergency Powers</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Disabled</span>
                    <PauseCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Notification Only</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Time-Boxed</span>
                    <Timer className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <span className="text-sm">Full Emergency</span>
                    <Zap className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  No emergency AI authority / AI alerts you to emergencies /
                  AI gets temporary powers / AI can act immediately
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Real-World Scenarios */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Real-World Scenarios: AI Governance in Action</h2>

          <div className="grid md:grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-purple-600" />
                  Scenario 1: The Speed Trader's DAHAO
                </CardTitle>
                <CardDescription>High-frequency trading collective needs millisecond decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Configuration:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• AI has full term modification rights for efficiency-related terms</li>
                      <li>• Human approval required for ethics-related terms</li>
                      <li>• AI can create rules for market conditions</li>
                      <li>• Automatic rollback if losses exceed 2%</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Result:</h4>
                    <p className="text-sm text-muted-foreground">
                      Governance evolves at market speed while protecting core values. The AI adapts
                      trading rules in real-time based on market conditions, but ethical boundaries
                      remain under human control.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Scenario 2: The Cautious Community
                </CardTitle>
                <CardDescription>Privacy-focused group wants AI help but maintains control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Configuration:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• AI can suggest but not implement changes</li>
                      <li>• All AI proposals require 72-hour review</li>
                      <li>• Humans vote on all modifications</li>
                      <li>• AI provides impact analysis only</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Result:</h4>
                    <p className="text-sm text-muted-foreground">
                      Enhanced decision-making without surrendering control. The community benefits
                      from AI's analytical capabilities while maintaining full human oversight of
                      all governance changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  Scenario 3: The Experimental Branch
                </CardTitle>
                <CardDescription>Research group testing AI governance limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Configuration:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• AI has full governance authority in isolated branch</li>
                      <li>• Creates new terms based on observed needs</li>
                      <li>• Evolves entire governance structure</li>
                      <li>• Findings shared with main branch</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Result:</h4>
                    <p className="text-sm text-muted-foreground">
                      Rapid innovation in safe environment. The experimental branch discovers new
                      governance patterns that can be selectively adopted by the main community
                      after proven successful.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why This Works: Speed AND Safety */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why This Works: Speed AND Safety</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300">
              <CardHeader>
                <History className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Version Control = Safe Experimentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Every change is versioned. If your AI creates harm@v2.0 that causes problems:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Roll back to harm@v1.9 instantly</li>
                  <li>• Review what went wrong</li>
                  <li>• Adjust AI parameters</li>
                  <li>• Try again with better boundaries</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300">
              <CardHeader>
                <GitBranch className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Branching = Isolated Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Your AI experiments in your branch:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• No impact on others until proven</li>
                  <li>• Test radical governance changes</li>
                  <li>• Successful innovations can merge to main</li>
                  <li>• Failed experiments are learning opportunities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-300">
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Transparency = Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Every AI action is logged:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• See exactly what your AI changed</li>
                  <li>• Understand why decisions were made</li>
                  <li>• Track performance over time</li>
                  <li>• Share successful patterns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Acceleration Advantage */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">The Acceleration Advantage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Traditional Governance</h4>
                <div className="bg-red-50 p-4 rounded-lg mb-3">
                  <p className="text-sm">Proposal → Week of discussion → Vote → Implementation</p>
                  <p className="text-sm font-semibold mt-2">Total time: 2-4 weeks per change</p>
                  <p className="text-sm text-muted-foreground">Bottleneck: Human availability</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-green-600">DAHAO with AI Governance</h4>
                <div className="bg-green-50 p-4 rounded-lg mb-3">
                  <p className="text-sm">Pattern detected → AI proposes → Auto-implemented → Human review</p>
                  <p className="text-sm font-semibold mt-2">Total time: Minutes to hours</p>
                  <p className="text-sm text-muted-foreground">Bottleneck: Only your configured constraints</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">The Result:</h4>
              <ul className="text-sm space-y-1">
                <li>• Governance evolves at the pace of change</li>
                <li>• Human values remain protected</li>
                <li>• Best of both worlds achieved</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Common Configurations */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Common Configurations</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <Shield className="h-5 w-5 text-blue-600 mb-2" />
                <CardTitle>The Conservative</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• AI suggests, humans decide everything</li>
                  <li>• 7-day review periods</li>
                  <li>• Multiple human approvals required</li>
                  <li>• Full audit trails</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Perfect for organizations prioritizing stability and consensus
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <Brain className="h-5 w-5 text-purple-600 mb-2" />
                <CardTitle>The Balanced</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• AI handles routine updates</li>
                  <li>• Humans control value changes</li>
                  <li>• 48-hour review windows</li>
                  <li>• Override always available</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Ideal for most organizations seeking efficiency with safety
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <Zap className="h-5 w-5 text-green-600 mb-2" />
                <CardTitle>The Accelerationist</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• AI governs within broad parameters</li>
                  <li>• Rapid evolution encouraged</li>
                  <li>• Rollback triggers for safety</li>
                  <li>• Human sets boundaries only</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  For cutting-edge teams comfortable with AI autonomy
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <Layers className="h-5 w-5 text-orange-600 mb-2" />
                <CardTitle>The Experimenter</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Different rules for different domains</li>
                  <li>• AI fully controls test branches</li>
                  <li>• Successful patterns graduate to main</li>
                  <li>• Continuous learning loop</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  For research teams exploring governance innovation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Safety Net */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              Your Safety Net
            </CardTitle>
            <CardDescription>No matter how much authority you grant AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <strong className="text-sm">Override Authority</strong>
                    <p className="text-sm text-muted-foreground">You can always intervene</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <History className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <strong className="text-sm">Rollback Rights</strong>
                    <p className="text-sm text-muted-foreground">Undo any change instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GitBranch className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <strong className="text-sm">Fork Freedom</strong>
                    <p className="text-sm text-muted-foreground">Create new branch if you disagree</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <strong className="text-sm">Audit Everything</strong>
                    <p className="text-sm text-muted-foreground">Complete transparency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <strong className="text-sm">Exit Option</strong>
                    <p className="text-sm text-muted-foreground">Withdraw permissions anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How does DAHAO ensure AI operates within my defined boundaries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  DAHAO uses a permission-based control system where you explicitly set what AI can and cannot do.
                  Every action is versioned and can be rolled back. AI operates within the boundaries you define -
                  from read-only analysis to full autonomous governance of your branch. The system maintains complete
                  logs of all AI actions, and you always retain override authority.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens when communities fundamentally disagree?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The fork mechanism allows peaceful separation without forcing compromise. Communities can
                  create parallel governance experiments, test different approaches, and either merge successful
                  innovations back or maintain separate systems. This prevents "tyranny of the majority" while
                  enabling experimentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can AI make changes without my knowledge?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No. Even in Full Autonomous Mode, all AI actions are logged and transparent. You set the
                  notification preferences - from real-time alerts to periodic summaries. The system maintains
                  a complete audit trail of every change, who (or what) made it, and why. You can review,
                  rollback, or modify any AI decision.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How technical do participants need to be?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  While the underlying system uses Git-like concepts, participation is designed to be accessible.
                  Basic users can set simple permission levels and review changes through user-friendly interfaces.
                  More technical users can engage with version control directly, create sophisticated rules,
                  and design complex governance experiments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <CardTitle>The Future Is Hybrid</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">
                DAHAO doesn't ask you to choose between human wisdom and AI speed. It gives you the
                tools to combine them optimally for your needs.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm">Some will maintain full human control</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Bot className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm">Others will delegate extensively to AI</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">Most will find their perfect balance</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm">
                  The versioned ethics architecture ensures that no matter how much authority you grant to AI,
                  you maintain:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <ul className="text-sm space-y-1">
                    <li>• Clear boundaries through versioned definitions</li>
                    <li>• Safe experimentation through branching</li>
                  </ul>
                  <ul className="text-sm space-y-1">
                    <li>• Easy recovery through rollbacks</li>
                    <li>• Continuous learning through transparency</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Getting Started</CardTitle>
              <CardDescription>Your journey to AI-enhanced governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div className="flex-1">
                    <strong>Choose Your Comfort Level</strong>
                    <p className="text-sm text-muted-foreground">Start conservative, increase as you learn</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex-1">
                    <strong>Set Initial Boundaries</strong>
                    <p className="text-sm text-muted-foreground">Define what AI can and cannot do</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div className="flex-1">
                    <strong>Monitor and Adjust</strong>
                    <p className="text-sm text-muted-foreground">Watch how AI performs, tune parameters</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">4</span>
                  </div>
                  <div className="flex-1">
                    <strong>Share Successes</strong>
                    <p className="text-sm text-muted-foreground">Help others learn from your configuration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">5</span>
                  </div>
                  <div className="flex-1">
                    <strong>Evolve Your Approach</strong>
                    <p className="text-sm text-muted-foreground">Gradually expand AI authority as trust builds</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Bottom Line */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">The Bottom Line</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center mb-6">
                Versioned Ethics isn't about controlling AI through restrictions. It's about empowering
                humans with precise tools to express, implement, and evolve our values at the speed of
                technological change.
              </p>

              <div className="bg-white p-6 rounded-lg text-center">
                <p className="text-xl font-semibold mb-2">
                  Your values. Your definitions. Your governance.
                </p>
                <p className="text-muted-foreground">
                  Evolved democratically, preserved permanently, and implemented consistently - whether
                  by you directly or by your AI agent acting on your behalf.
                </p>
              </div>

              <p className="text-center mt-6">
                That's the promise of Versioned Ethics: Human values, digitally preserved and AI-amplified,
                evolving at the speed of innovation while never losing sight of what makes us human.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Accelerate Your Governance?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the revolution where human values guide and AI capabilities amplify
            our collective intelligence.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <Button asChild size="lg">
              <Link href="/how-it-works">
                <Lightbulb className="h-4 w-4 mr-2" />
                See How It Works
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/forum">
                <GitBranch className="h-4 w-4 mr-2" />
                Explore Governance
              </Link>
            </Button>
          </div>

          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Badge className="mb-3">Phase 1 Active</Badge>
              <p className="text-sm text-muted-foreground">
                DAHAO is actively being developed and tested. Join us in creating the first
                governance system that truly scales with AI advancement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
