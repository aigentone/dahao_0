'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot,AlertCircle, MessageSquare, Users,Vote, CheckCircle, BookOpen, TrendingUp as TrendingUpIcon, Building, Scale, RefreshCw, ArrowRight, Shield, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            How DAHAO Works
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A self-evolving governance system that improves itself through community collaboration and AI-enhanced decision making.
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <Badge variant="outline">Meta-Governance</Badge>
            <Badge variant="outline">GitHub-Powered</Badge>
            <Badge variant="outline">AI-Enhanced</Badge>
          </div>
        </div>

        {/* The Ways of DAHAO - Multiple Ways to Engage */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Ways of DAHAO</h2>

          <Card className="border-l-4 border-l-indigo-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Many Ways to Engage
              </CardTitle>
              <CardDescription>DAHAO isn't one thing - it's a new way of creating systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6 p-4 bg-indigo-50 rounded-lg">
                <p className="text-indigo-800 font-medium">
                  You can engage with DAHAO in any of these ways, and each way strengthens the others
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-500" />
                      As a Philosophy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">Governance can govern itself</p>
                    <ul className="text-sm space-y-1">
                      <li>• Rules about rules</li>
                      <li>• Evolution mechanics</li>
                      <li>• Learning systems</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bot className="h-5 w-5 text-green-500" />
                      As a Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">GitHub + AI + democratic evolution</p>
                    <ul className="text-sm space-y-1">
                      <li>• Open participation</li>
                      <li>• AI-enhanced decisions</li>
                      <li>• Version control</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      As a Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">People building better systems</p>
                    <ul className="text-sm space-y-1">
                      <li>• Collective wisdom</li>
                      <li>• Shared values</li>
                      <li>• Democratic participation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                      As a Laboratory
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">Learning what works</p>
                    <ul className="text-sm space-y-1">
                      <li>• Safe experimentation</li>
                      <li>• Pattern recognition</li>
                      <li>• Knowledge accumulation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                      As a Movement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">Changing how we organize</p>
                    <ul className="text-sm space-y-1">
                      <li>• Building new systems</li>
                      <li>• Creating alternatives</li>
                      <li>• Evolving together</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="h-5 w-5 text-indigo-500" />
                      As an Economic System
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-2">Value creation, not extraction</p>
                    <ul className="text-sm space-y-1">
                      <li>• Profit WITH purpose</li>
                      <li>• Aligned incentives</li>
                      <li>• Sustainable funding</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Introduction - Building the System That Builds Better Systems */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Building the System That Builds Better Systems</h2>

          <Card className="border-l-4 border-l-blue-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                What is DAHAO?
              </CardTitle>
              <CardDescription>A governance system that can improve itself</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-muted-foreground mb-4">
                    DAHAO is a governance system that can improve itself. In Phase 1, we're not managing funds or running projects yet - we're creating a system that learns how to govern better through community participation and AI assistance.
                  </p>
                  <h4 className="font-semibold mb-3">Current Focus:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      Building shared vocabulary (Terms)
                    </li>
                    <li className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-500" />
                      Defining core values (Principles)
                    </li>
                    <li className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-purple-500" />
                      Creating operational rules (Rules)
                    </li>
                    <li className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-orange-500" />
                      Learning how to change the rules (Meta-Governance)
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-blue-800">Key Innovation</h4>
                    <p className="text-sm text-blue-700">
                      The system can modify its own governance through democratic processes. Even the rules about making rules can evolve.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Living Governance Foundation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Living Governance Foundation</h2>

          {/* Three Layers + Meta-Governance */}
          <Card className="border-l-4 border-l-green-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Four Layers of Governance
              </CardTitle>
              <CardDescription>Terms → Principles → Rules → Meta-Rules flow</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Terms */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <h4 className="font-semibold text-blue-800">📚 Terms</h4>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Living Vocabulary</p>
                  <p className="text-muted-foreground">Shared definitions that evolve democratically</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-blue-800">Example:</p>
                  <p className="text-blue-700">"harm" v1.2: "Actions causing physical damage, psychological distress, opportunity limitation, or dignity violation"</p>
                </div>
              </div>

              {/* Principles */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <Building className="h-5 w-5 text-green-500" />
                  <h4 className="font-semibold text-green-800">🏛️ Principles</h4>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Values Using Terms</p>
                  <p className="text-muted-foreground">Ethical guidelines built on Term definitions</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-green-800">Example:</p>
                  <p className="text-green-700">"Minimize harm@v1.2 to all beings@v1.0" - References specific term versions</p>
                </div>
              </div>

              {/* Rules */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <Scale className="h-5 w-5 text-purple-500" />
                  <h4 className="font-semibold text-purple-800">⚖️ Rules</h4>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">How to Act</p>
                  <p className="text-muted-foreground">Concrete actions implementing Principles</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-purple-800">Example:</p>
                  <p className="text-purple-700">"To minimize harm: Report any suspected harm@v1.2 within 24 hours via GitHub Issue"</p>
                </div>
              </div>

              {/* Meta-Rules */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <RefreshCw className="h-5 w-5 text-orange-500" />
                  <h4 className="font-semibold text-orange-800">🔄 Meta-Rules</h4>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">How to Change</p>
                  <p className="text-muted-foreground">Process for modifying any governance layer</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg text-sm">
                  <p className="font-medium text-orange-800">Example:</p>
                  <p className="text-orange-700">"To change 'harm' definition: Test in branch → 67% vote → Update all dependent principles/rules"</p>
                </div>
              </div>
            </div>
            </CardContent>
          </Card>

          {/* Real Evolution Example */}
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader>
              <CardTitle>Real Evolution Example</CardTitle>
              <CardDescription>How the system improved its own decision-making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="font-semibold text-emerald-800">Time Period 1:</p>
                    <p className="text-sm text-emerald-700">Rule says "All decisions need 60% approval"</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="font-semibold text-yellow-800">Time Period 3:</p>
                    <p className="text-sm text-yellow-700">Community finds 60% too high for minor fixes</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800">Time Period 4:</p>
                    <p className="text-sm text-blue-700">Proposal: "Create decision tiers with different thresholds"</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-semibold text-purple-800">Time Period 5:</p>
                    <p className="text-sm text-purple-700">AI analysis shows other systems use 50-75% range effectively</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800">Time Period 6:</p>
                    <p className="text-sm text-green-700">Vote passes → New tiered system implemented</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-300">
                    <p className="font-semibold text-green-800">Result:</p>
                    <p className="text-sm text-green-700">The system just improved its own decision-making!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Domain Network Structure */}
          <Card className="border-l-4 border-l-indigo-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Multi-Domain Network
              </CardTitle>
              <CardDescription>Specialized domains extending core governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Domain Specialization</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="font-medium text-indigo-800">Core Governance (Foundation)</p>
                      <p className="text-sm text-indigo-700">Base terms, principles, and rules</p>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="p-2 bg-blue-50 rounded border-l-4 border-l-blue-400">
                        <p className="text-sm"><strong>Animal Welfare</strong> - Extends with five freedoms</p>
                      </div>
                      <div className="p-2 bg-green-50 rounded border-l-4 border-l-green-400">
                        <p className="text-sm"><strong>Environment</strong> - Extends with sustainability metrics</p>
                      </div>
                      <div className="p-2 bg-purple-50 rounded border-l-4 border-l-purple-400">
                        <p className="text-sm"><strong>Music Industry</strong> - Extends with fair distribution</p>
                      </div>
                      <div className="p-2 bg-orange-50 rounded border-l-4 border-l-orange-400">
                        <p className="text-sm"><strong>[Your Domain]</strong> - Extends with your focus</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Cross-Domain Benefits</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="font-medium">Shared Language</p>
                        <p className="text-sm text-muted-foreground">Everyone uses same core terms</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RefreshCw className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Pattern Sharing</p>
                        <p className="text-sm text-muted-foreground">Solutions spread across domains</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUpIcon className="h-5 w-5 text-purple-500 mt-1" />
                      <div>
                        <p className="font-medium">Network Effects</p>
                        <p className="text-sm text-muted-foreground">Each domain strengthens others</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-orange-500 mt-1" />
                      <div>
                        <p className="font-medium">Interoperability</p>
                        <p className="text-sm text-muted-foreground">Cross-references between domains</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Accumulation System */}
          <Card className="border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Knowledge Accumulation
              </CardTitle>
              <CardDescription>How DAHAO learns and improves over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                  <h4 className="font-semibold text-teal-800">Every Decision</h4>
                  <p className="text-sm text-teal-700">Documented</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ArrowRight className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold text-blue-800">Every Failure</h4>
                  <p className="text-sm text-blue-700">Analyzed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <ArrowRight className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold text-purple-800">Every Success</h4>
                  <p className="text-sm text-purple-700">Replicated</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-semibold text-green-800">Every Pattern</h4>
                  <p className="text-sm text-green-700">Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Personal vs Core Governance */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Personal vs Core Governance</h2>

        <Card className="border-l-4 border-l-indigo-500 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Governance, Your Way
            </CardTitle>
            <CardDescription>Extend core governance with your personal values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-500" />
                  Core DAHAO Governance
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-medium text-blue-800 mb-2">Baseline Foundation</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Minimum viable governance</li>
                      <li>• Democratically ratified</li>
                      <li>• Conservative and stable</li>
                      <li>• Version controlled (e.g., v1.2)</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                    <div className="text-blue-600"># Core Terms</div>
                    <div>transparency: v1.1</div>
                    <div>harm: v1.2</div>
                    <div>being: v1.0</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  Your Personal Extensions
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-medium text-purple-800 mb-2">Your Value System</p>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Extends core definitions</li>
                      <li>• Adds personal values</li>
                      <li>• Lives in your branch</li>
                      <li>• Can propose to core</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs">
                    <div className="text-purple-600"># John's Extensions</div>
                    <div>transparency:</div>
                    <div className="ml-2">extends: "core:v1.1"</div>
                    <div className="ml-2">adds: "radical_honesty"</div>
                    <div className="ml-2">adds: "emotional_transparency"</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <p className="text-center font-medium text-indigo-800">
                Core provides stability • Personal enables innovation • Best ideas flow back to core
              </p>
            </div>
          </CardContent>
        </Card>


      {/* Version Evolution */}
      <Card className="border-l-4 border-l-green-500 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Version Evolution
          </CardTitle>
          <CardDescription>How governance elements evolve over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Example: The Evolution of "Harm"</h4>
              <div className="relative">
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-300"></div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">v1.0</span>
                    </div>
                    <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">Initial Definition</p>
                      <p className="text-sm text-blue-700">"Physical damage to beings"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-green-700">v1.1</span>
                    </div>
                    <div className="flex-1 p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">Community Expansion</p>
                      <p className="text-sm text-green-700">+ "Psychological distress"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-700">v1.2</span>
                    </div>
                    <div className="flex-1 p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-purple-800">Current Version</p>
                      <p className="text-sm text-purple-700">+ "Opportunity limitation" + "Dignity violation"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <ArrowRight className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <p className="text-sm font-medium text-orange-800">Terms evolve</p>
                <p className="text-xs text-orange-600">Better understanding over time</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-medium text-blue-800">History preserved</p>
                <p className="text-xs text-blue-600">Every version tracked</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm font-medium text-green-800">Community driven</p>
                <p className="text-xs text-green-600">Democratic ratification</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub-DAHAOs and Specialized Domains */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Sub-DAHAOs and Specialized Domains
          </CardTitle>
          <CardDescription>How different communities extend the core</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-800">
                Core DAHAO → Domain Extensions → Sub-DAHAOs
              </p>
              <p className="text-sm text-orange-600 mt-1">
                Each domain can become its own DAHAO while staying connected
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-indigo-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Core DAHAO</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-1">
                  <li>• Base governance</li>
                  <li>• Universal terms</li>
                  <li>• Meta-rules</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Animal Welfare DAHAO</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-1">
                  <li>• Five freedoms</li>
                  <li>• Species-specific rules</li>
                  <li>• Welfare metrics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Environmental DAHAO</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-1">
                  <li>• Sustainability metrics</li>
                  <li>• Ecosystem principles</li>
                  <li>• Carbon tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Music Industry DAHAO</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-1">
                  <li>• Fair distribution</li>
                  <li>• Artist rights</li>
                  <li>• Revenue sharing</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2">Inheritance Pattern</h5>
              <div className="bg-white p-3 rounded font-mono text-xs">
                <div>animal_welfare_dahao:</div>
                <div className="ml-2">inherits: "core:v1.2"</div>
                <div className="ml-2">extends:</div>
                <div className="ml-4">- five_freedoms</div>
                <div className="ml-4">- species_rights</div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2">Cross-Pollination</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Animal welfare monitoring → Environmental tracking</li>
                <li>• Music distribution → Fair resource allocation</li>
                <li>• Patterns spread across domains</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
        {/* How You Participate */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How You Participate (Available Now)</h2>

          <div className="space-y-8">
            {/* Step 1: Connect AI */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                  <CardTitle>Connect Your AI Assistant</CardTitle>
                </div>
                <CardDescription>Power governance analysis with your personal AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add your OpenAI or Claude API key in settings to enable AI-powered governance analysis.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li><strong>What:</strong> Add your API key in settings</li>
                      <li><strong>Why:</strong> Powers AI agents for governance analysis</li>
                      <li><strong>Cost:</strong> You pay for your own usage (~$0.01-0.10 per analysis)</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-2">Benefit</div>
                    <p className="text-sm text-blue-600">
                      Get personalized AI help in understanding proposals and governance decisions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Personal Branch */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">2</div>
                  <CardTitle>Create Your Personal Branch</CardTitle>
                </div>
                <CardDescription>Safe space to experiment with governance improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Fork the governance repository to create your own workspace for developing governance ideas.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li><strong>What:</strong> Fork the governance repository</li>
                      <li><strong>Why:</strong> Safe space to experiment with improvements</li>
                      <li><strong>How:</strong> Extend terms, modify principles, test new rules</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800 mb-2">Example</div>
                    <p className="text-sm text-green-600">
                      Add "emotional transparency" to your transparency definition
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Join Evolution */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</div>
                  <CardTitle>Join the Evolution</CardTitle>
                </div>
                <CardDescription>Participate in governance discussions on GitHub</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Every governance element has a GitHub Issue/Discussion where you can contribute.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Where:</strong> GitHub Issues and Discussions</li>
                      <li><strong>Examples:</strong></li>
                      <li>• Issue #123: "Term: Transparency" - Discuss definition improvements</li>
                      <li>• Issue #456: "Principle: Harm Prevention" - Propose extensions</li>
                      <li>• Issue #789: "Meta: Should we change voting periods?" - System improvements</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800 mb-2">Current Opportunities</div>
                    <ul className="text-sm text-purple-600 space-y-1">
                      <li>• Define core terms</li>
                      <li>• Improve voting processes</li>
                      <li>• Test AI agent patterns</li>
                      <li>• Document learnings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Use AI Agents */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">4</div>
                  <CardTitle>Use AI Agents for Analysis</CardTitle>
                </div>
                <CardDescription>Get AI assistance in any GitHub discussion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      In any GitHub Issue comment, you can call AI agents for analysis and guidance.
                    </p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      <div>@user: "@ai-analyze how would this change affect our governance?"</div>
                      <div className="text-green-600 mt-2">[AgentAssignmentPanel appears]</div>
                      <div className="mt-2">Choose:</div>
                      <div>👤 Personal AI - Uses YOUR complete value system</div>
                      <div>🛡️ System AI - Uses baseline governance only</div>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="font-semibold text-orange-800 mb-2">AI Response Examples</div>
                    <div className="text-sm text-orange-700 space-y-2">
                      <p><strong>@personal-ai:</strong> "Based on your extended transparency values, this change would..."</p>
                      <p><strong>@system-ai:</strong> "From baseline governance perspective, this change would..."</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Automating Your Participation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Automating Your Participation</h2>

          <Card className="border-l-4 border-l-indigo-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Agent Configuration
              </CardTitle>
              <CardDescription>Set up automated governance participation with your API key</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Manual Assignment</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Manually assign agents to specific tasks as needed
                  </p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-2">
                    <div className="text-green-600"># In any GitHub discussion:</div>
                    <div>@john: "@ai-analyze this proposal"</div>
                    <div className="text-blue-600">[Choose: Personal AI / System AI / Other's AI]</div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Flexibility:</strong> Choose the right AI for each situation
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Automated Configuration</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set rules for automatic AI participation
                  </p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-1">
                    <div className="text-green-600"># Your automation settings:</div>
                    <div>core_alignment:</div>
                    <div className="ml-2">- always_use: "transparency@latest"</div>
                    <div>daily_contributions:</div>
                    <div className="ml-2">- min_tasks: 5</div>
                    <div className="ml-2">- term_verification: 2</div>
                    <div className="ml-2">- discovery: 1</div>
                    <div className="ml-2">- voting: 2</div>
                  </div>
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>24/7 Participation:</strong> Your values stay represented
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <CheckCircle className="h-5 w-5 text-blue-500 mb-2" />
                  <h5 className="font-semibold text-blue-800">Verification</h5>
                  <p className="text-xs text-blue-700">Auto-check proposal alignment</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <TrendingUpIcon className="h-5 w-5 text-green-500 mb-2" />
                  <h5 className="font-semibold text-green-800">Discovery</h5>
                  <p className="text-xs text-green-700">Find governance patterns</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <MessageSquare className="h-5 w-5 text-purple-500 mb-2" />
                  <h5 className="font-semibold text-purple-800">Voting</h5>
                  <p className="text-xs text-purple-700">Participate based on values</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                  <Shield className="h-5 w-5 text-orange-500 mb-2" />
                  <h5 className="font-semibold text-orange-800">Protection</h5>
                  <p className="text-xs text-orange-700">Flag value conflicts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continuous Improvement Cycle */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Governance Hygiene
              </CardTitle>
              <CardDescription>Regular cycles of reflection and improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">W</div>
                    <h5 className="font-semibold text-blue-800">Weekly</h5>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-700">Reflection</p>
                    <p className="text-xs text-blue-600">"What friction did we hit?"</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">M</div>
                    <h5 className="font-semibold text-green-800">Monthly</h5>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-700">Review</p>
                    <p className="text-xs text-green-600">"Which rules weren't followed?"</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">Q</div>
                    <h5 className="font-semibold text-purple-800">Quarterly</h5>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-700">Evolution</p>
                    <p className="text-xs text-purple-600">"What should we sunset?"</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-semibold">Y</div>
                    <h5 className="font-semibold text-orange-800">Yearly</h5>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-700">Overhaul</p>
                    <p className="text-xs text-orange-600">"What fundamental changes?"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Evolution Cycle */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Evolution Cycle (Happening Now)</h2>

          {/* How Ideas Become Improvements */}
          <Card className="border-l-4 border-l-indigo-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                How Ideas Become Improvements
              </CardTitle>
              <CardDescription>The 6-step process for evolving governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                    <h4 className="font-semibold text-blue-800">Propose</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-blue-700">GitHub Issue</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>"Our term approval process is too slow"</li>
                      <li>"We need emergency decision procedures"</li>
                      <li>"Voting notifications should be better"</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                    <h4 className="font-semibold text-green-800">Discuss</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-green-700">Community Comments</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>Share experiences</li>
                      <li>Identify pain points</li>
                      <li>Suggest solutions</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                    <h4 className="font-semibold text-purple-800">Analyze</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-purple-700">AI Agents</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>"@ai-analyze similar systems"</li>
                      <li>"@ai-verify principle alignment"</li>
                      <li>"@ai-compare options"</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
                    <h4 className="font-semibold text-yellow-800">Experiment</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-yellow-700">Personal Branches</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>Test changes safely</li>
                      <li>Document results</li>
                      <li>Share findings</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-semibold">5</div>
                    <h4 className="font-semibold text-orange-800">Vote</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-orange-700">Democratic Decision</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>Token-weighted in future</li>
                      <li>Currently: community consensus</li>
                      <li>Clear thresholds</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-semibold">6</div>
                    <h4 className="font-semibold text-emerald-800">Implement</h4>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-emerald-700">System Updates</p>
                    <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                      <li>Update governance files</li>
                      <li>Document changes</li>
                      <li>System evolves!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Examples */}
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-center text-emerald-800">Real Examples from Our Community</CardTitle>
              <CardDescription className="text-center">Actual improvements we've made together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">Example 1: Simplifying Term Evolution</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Problem:</strong> 10-step process too complex</li>
                    <li><strong>Solution:</strong> Reduced to 3 steps</li>
                    <li><strong>Result:</strong> 300% increase in participation</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Example 2: AI Agent Differentiation</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Problem:</strong> Unclear when to use which AI</li>
                    <li><strong>Solution:</strong> Created Personal vs System AI</li>
                    <li><strong>Result:</strong> Better value-aligned analysis</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Example 3: Voting Period Optimization</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Problem:</strong> 7 days too long for everything</li>
                    <li><strong>Solution:</strong> Tiered periods (1-7 days based on impact)</li>
                    <li><strong>Result:</strong> 50% faster minor decisions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safe Experimentation & Fork Rights */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safe Experimentation & Fork Rights
              </CardTitle>
              <CardDescription>Test ideas without breaking anything</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Experimentation Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium">Personal Branches</p>
                        <p className="text-sm text-muted-foreground">Test without affecting main governance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RefreshCw className="h-5 w-5 text-blue-500 mt-1" />
                      <div>
                        <p className="font-medium">Easy Rollback</p>
                        <p className="text-sm text-muted-foreground">Undo changes if they don't work</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-purple-500 mt-1" />
                      <div>
                        <p className="font-medium">Documented Learning</p>
                        <p className="text-sm text-muted-foreground">Failed experiments teach valuable lessons</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUpIcon className="h-5 w-5 text-orange-500 mt-1" />
                      <div>
                        <p className="font-medium">Small, Measurable Tests</p>
                        <p className="text-sm text-muted-foreground">Try, measure, learn, iterate</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Fork Rights & Minority Protection</h4>
                  <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <p className="font-medium text-purple-800">Disagree? Make your version</p>
                    </div>
                    <ul className="text-sm text-purple-700 space-y-2 ml-7">
                      <li>• Value preservation in personal branches</li>
                      <li>• Parallel experiments welcome</li>
                      <li>• No forced conformity</li>
                      <li>• Diversity encouraged</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border border-purple-200">
                      <p className="text-sm text-purple-800">
                        <strong>Example:</strong> If you believe "radical transparency" should be core but community votes no, keep it in your branch and prove its value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Agents - Your Governance Assistants */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">AI Agents - Your Governance Assistants</h2>

          {/* Two Types of AI Agents */}
          <Card className="border-l-4 border-l-indigo-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Two Types of AI Agents
              </CardTitle>
              <CardDescription>Personal vs System AI for different governance needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-indigo-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-indigo-500" />
                      Personal AI Agent (Your Values)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <p className="text-sm text-indigo-700 mb-3">
                          <strong>What it sees:</strong> Your complete value system from your branch
                        </p>
                        <ul className="space-y-2 text-sm text-indigo-700">
                          <li>• <strong>Includes:</strong> All your term extensions and modifications</li>
                          <li>• <strong>Best for:</strong> Checking if proposals align with your values</li>
                          <li>• <strong>Example:</strong> "This aligns with your 'radical transparency' extension"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-purple-500" />
                      System AI Agent (Baseline Only)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-sm text-purple-700 mb-3">
                          <strong>What it sees:</strong> Only main DAHAO governance
                        </p>
                        <ul className="space-y-2 text-sm text-purple-700">
                          <li>• <strong>Excludes:</strong> Personal modifications</li>
                          <li>• <strong>Best for:</strong> Checking baseline compliance</li>
                          <li>• <strong>Example:</strong> "Meets core transparency requirements"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <AgentAssignmentPanel context="governance" />
          {/* How AI Agents Help */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">How AI Agents Help</CardTitle>
              <CardDescription className="text-center">Four key ways AI agents enhance governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-semibold mb-1">Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Check consistency across governance
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUpIcon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold mb-1">Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Compare with other systems
                  </p>
                </div>
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold mb-1">Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    Propose improvements
                  </p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold mb-1">Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Spot patterns humans miss
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pattern Recognition in Action */}
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5" />
                Pattern Recognition in Action
              </CardTitle>
              <CardDescription>AI agents discover insights humans might miss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <div className="text-green-600 mb-2">{`// Example AI Analysis Output`}</div>
                <div className="space-y-3">
                  <div>
                    <span className="text-blue-600">@ai-analyzer:</span> "Analysis of 50 governance systems shows:
                  </div>
                  <div className="ml-4 space-y-1">
                    <div>- Simple rules have <span className="text-orange-600 font-semibold">3x compliance</span></div>
                    <div>- Visual aids increase participation <span className="text-orange-600 font-semibold">40%</span></div>
                    <div>- <span className="text-orange-600 font-semibold">3-step processes</span> optimal for engagement</div>
                    <div>- Voting periods over <span className="text-orange-600 font-semibold">7 days</span> see drop-off</div>
                    <div>- Terms with examples get <span className="text-orange-600 font-semibold">85%</span> better understanding</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mt-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm font-medium text-blue-800">Compliance Insights</p>
                  <p className="text-xs text-blue-600">Simpler = Better</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-sm font-medium text-green-800">Participation Patterns</p>
                  <p className="text-xs text-green-600">Visuals Drive Engagement</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <p className="text-sm font-medium text-purple-800">Process Optimization</p>
                  <p className="text-xs text-purple-600">3 Steps = Sweet Spot</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


{/* Voting Mechanics */}
<div className="mb-16">
  <h2 className="text-3xl font-semibold mb-8 text-center">How Voting Works</h2>

  <Card className="border-l-4 border-l-indigo-500 mb-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Vote className="h-5 w-5" />
        Democratic Decision Making
      </CardTitle>
      <CardDescription>Human choice with AI assistance</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="font-semibold mb-3">Voting Options</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Manual Voting</span>
              </div>
              <p className="text-sm text-blue-700">
                You review proposals and vote directly
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">AI-Assisted Voting</span>
              </div>
              <p className="text-sm text-purple-700">
                Your AI agent votes based on your values (you can override)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Value Alignment Check</h4>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>AI analyzes proposal against your values</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <span>Flags conflicts with your governance</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>Shows reasoning for recommendation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">Important: All Votes Count</h4>
        <p className="text-sm text-yellow-700">
          Even if you vote against your AI's recommendation, your vote counts fully.
          The system simply tags it with your reasoning for transparency and learning.
        </p>
      </div>
    </CardContent>
  </Card>

  {/* Voting Example */}
  <Card>
    <CardHeader>
      <CardTitle>Voting Example</CardTitle>
      <CardDescription>How value-aligned voting works in practice</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="font-medium mb-2">Proposal: "Reduce minor change threshold to 45%"</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Your AI Analysis:</h5>
            <p className="text-sm text-blue-700 mb-2">
              "This conflicts with your 'high-consensus' value.
              You prefer 60%+ thresholds for stability."
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-50">Recommends: NO</Badge>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-800 mb-2">Your Decision:</h5>
            <p className="text-sm text-green-700 mb-2">
              "I agree with faster evolution despite my usual preference"
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100">You Vote: YES</Badge>
            </div>
          </div>
        </div>

        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            <strong>Result:</strong> Your YES vote counts fully.
            System notes: "Voted against personal AI recommendation - evolution priority"
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
        {/* Current Focus Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Current Focus Areas</h2>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5" />
                What We're Building Together
              </CardTitle>
              <CardDescription>Four key areas of development in Phase 1</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <RefreshCw className="h-6 w-6 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">🔧 Meta-Governance Systems</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• How to change rules effectively</li>
                        <li>• Decision-making optimization</li>
                        <li>• Voting mechanism improvements</li>
                        <li>• Conflict resolution processes</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <BookOpen className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">📚 Foundational Terms</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Clear, evolving definitions</li>
                        <li>• Cross-domain consistency</li>
                        <li>• Democratic ratification</li>
                        <li>• Version control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Users className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">🤝 Human-AI Collaboration</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• When to use which AI type</li>
                        <li>• Collective intelligence patterns</li>
                        <li>• Trust and verification</li>
                        <li>• Augmented decision-making</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <TrendingUpIcon className="h-6 w-6 text-orange-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">📈 System Learning</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Document what works</li>
                        <li>• Learn from failures</li>
                        <li>• Share successful patterns</li>
                        <li>• Continuous improvement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What We're Learning */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">What We're Learning</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Insights from Phase 1
                </CardTitle>
                <CardDescription>Key discoveries about self-improving governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-1" />
                    <div>
                      <p className="font-medium text-emerald-800">Governance can govern itself</p>
                      <p className="text-sm text-emerald-700">Rules about rules actually work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-blue-800">AI agents spot blind spots</p>
                      <p className="text-sm text-blue-700">Patterns humans miss become visible</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-500 mt-1" />
                    <div>
                      <p className="font-medium text-purple-800">Simple beats complex</p>
                      <p className="text-sm text-purple-700">Easier processes get more participation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-1" />
                    <div>
                      <p className="font-medium text-orange-800">Personal values matter</p>
                      <p className="text-sm text-orange-700">One size doesn't fit all governance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-green-800">Safe failure is crucial</p>
                      <p className="text-sm text-green-700">Experiments teach us what works</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Community Discoveries
                </CardTitle>
                <CardDescription>Patterns we've discovered through practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">Tiered decisions work better than one-size-fits-all</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700">AI summaries increase participation by 40%</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-700">Visual governance trees help understanding</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-700">3-step processes optimal for engagement</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-700">Personal branches encourage experimentation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Phases */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Future Phases (Vision)</h2>

          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5" />
                The Roadmap Ahead
              </CardTitle>
              <CardDescription>From learning system to global impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                        <CardTitle className="text-lg text-blue-800">Phase 1 (Now)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold text-blue-700 mb-2">Learning System</h4>
                      <ul className="text-sm text-blue-600 space-y-1">
                        <li>• Build self-improving governance</li>
                        <li>• Establish core vocabulary</li>
                        <li>• Test human-AI collaboration</li>
                        <li>• No money, just learning</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">2</div>
                        <CardTitle className="text-lg text-green-800">Phase 2</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold text-green-700 mb-2">Economic Layer - Dual Benefit Model</h4>
                      <ul className="text-sm text-green-600 space-y-1 mb-3">
                        <li>• Add token mechanics</li>
                        <li>• Contribution rewards</li>
                        <li>• Investment opportunities</li>
                        <li>• Win-win economics</li>
                      </ul>
                      <div className="mt-3 p-2 bg-white rounded border border-green-300">
                        <p className="text-xs text-green-700 font-medium">Key Innovation:</p>
                        <p className="text-xs text-green-600">Investors profit while funding community</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</div>
                        <CardTitle className="text-lg text-purple-800">Phase 3</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold text-purple-700 mb-2">Real Projects</h4>
                      <ul className="text-sm text-purple-600 space-y-1">
                        <li>• Fund actual initiatives</li>
                        <li>• Measure impact</li>
                        <li>• Scale successes</li>
                        <li>• Create value</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">4</div>
                        <CardTitle className="text-lg text-orange-800">Phase 4</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <h4 className="font-semibold text-orange-700 mb-2">Network Growth</h4>
                      <ul className="text-sm text-orange-600 space-y-1">
                        <li>• Multiple DAHAOs</li>
                        <li>• Cross-domain learning</li>
                        <li>• Avalanche integration</li>
                        <li>• Global impact</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg text-center">
                  <h4 className="font-semibold text-indigo-800 mb-2">Current Focus: Building Better Governance Together</h4>
                  <p className="text-sm text-indigo-700">
                    We're in Phase 1, focusing on learning how to create systems that can improve themselves.
                    No tokens, no investment, just building better governance through community collaboration and AI assistance.
                  </p>
                </div>

                {/* Add this detailed card after the 4-phase grid */}
                <Card className="mt-8 border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      Phase 2: The Dual Benefit Investment Model
                    </CardTitle>
                    <CardDescription>Investors profit while funding community development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="font-semibold mb-3">How It Works</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                            <p className="text-sm">Investors buy DAHAO tokens from investment pool</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                            <p className="text-sm">DAHAO success increases token value</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                            <p className="text-sm">Investors can sell for profit anytime</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
                            <p className="text-sm">Remaining value funds community work</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">5</div>
                            <p className="text-sm">Successful DAHAOs get Avalanche subchain</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">The Alex Example</h4>
                        <Card className="bg-gradient-to-r from-green-100 to-blue-100 p-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">Invests:</span>
                              <span>$1,000 → 1000 tokens @ $1</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Growth:</span>
                              <span>Token value 5x in 1 month</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Sells:</span>
                              <span>400 tokens for $2,000</span>
                            </div>
                            <div className="flex justify-between text-green-700 font-semibold">
                              <span>Profit:</span>
                              <span>$1,000 (2x return)</span>
                            </div>
                            <div className="flex justify-between text-blue-700 font-semibold">
                              <span>Community:</span>
                              <span>$3,000 for operations</span>
                            </div>
                            <div className="mt-3 pt-3 border-t text-center font-semibold text-purple-700">
                              Win-Win: Alex profits + community funded!
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3 mt-6">
                      <Card className="border-blue-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            For Contributors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <ul className="text-sm space-y-1">
                            <li>• Earn tokens for valuable work</li>
                            <li>• Governance participation rewards</li>
                            <li>• Term development incentives</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-green-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <TrendingUpIcon className="h-4 w-4 text-green-500" />
                            For Investors
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <ul className="text-sm space-y-1">
                            <li>• Token appreciation potential</li>
                            <li>• Social impact investment</li>
                            <li>• Governance voting rights</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-purple-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building className="h-4 w-4 text-purple-500" />
                            For Community
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <ul className="text-sm space-y-1">
                            <li>• Sustainable funding model</li>
                            <li>• No dependency on donations</li>
                            <li>• Aligned incentives</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join the Evolution</h2>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
            <CardHeader>
              <CardTitle className="text-green-800">Start Now</CardTitle>
              <CardDescription>Four simple ways to get involved today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mb-2">1</div>
                  <p className="font-medium text-blue-800">Connect your API key</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold mb-2">2</div>
                  <p className="font-medium text-green-800">Explore governance discussions</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold mb-2">3</div>
                  <p className="font-medium text-purple-800">Propose an improvement</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold mb-2">4</div>
                  <p className="font-medium text-orange-800">Help shape the future</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Current Opportunities</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">Define core terms</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">Improve voting processes</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700">Test AI agent patterns</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-700">Document learnings</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mb-6 max-w-2xl mx-auto">
            <p className="font-semibold text-green-800">
              No tokens, no investment, just building better governance together.
            </p>
          </div>

          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/api/auth/github">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/forum">
                View Governance Discussions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
