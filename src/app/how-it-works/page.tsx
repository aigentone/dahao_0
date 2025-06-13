'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranchIcon, Bot, Workflow, MessageSquare, Users, CheckCircle, AlertTriangle, GitPullRequest, Database, Shield, Network, BookOpen, TrendingUp as TrendingUpIcon, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
            Personal DAHAO branches, progressive governance pipeline, token economics,
            and AI agent collaboration creating decentralized autonomous organizations.
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <Badge variant="outline">Personal Workspaces</Badge>
            <Badge variant="outline">Token Economics</Badge>
            <Badge variant="outline">Avalanche Subchains</Badge>
          </div>
        </div>

        {/* Personal DAHAO Creation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Step 1: Personal DAHAO Creation & Configuration</h2>

          <Card className="border-l-4 border-l-purple-500 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranchIcon className="h-5 w-5" />
                Fork Your Personal Governance Branch
              </CardTitle>
              <CardDescription>Create your own workspace to develop values and governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Personal Branch Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Fork from Main DAHAO or create fresh
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Develop your complete value system
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Extend terms beyond baseline
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Private development space
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Configuration Example</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-600"># Personal DAHAO Config</div>
                    <div>branch: "fearon/animal-welfare-extended"</div>
                    <div>parent: "main-dahao"</div>
                    <div>values:</div>
                    <div>&nbsp;&nbsp;baseline: "inherit"</div>
                    <div>&nbsp;&nbsp;extensions:</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;- "regenerative-farming"</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;- "sentient-ai-rights"</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Term Development */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Step 2: Term & Ethics Development in Personal Workspace</h2>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Develop Your Value System
              </CardTitle>
              <CardDescription>Create and refine terms that represent your complete worldview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Personal Term Development</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800">Extend Core Terms</div>
                      <p className="text-sm text-yellow-600">Add nuance to baseline definitions</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-800">Create New Terms</div>
                      <p className="text-sm text-orange-600">Define concepts unique to your values</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-800">Challenge Assumptions</div>
                      <p className="text-sm text-red-600">Question and refine existing frameworks</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Value Differentiation</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="font-mono text-sm mb-2">Your Personal AI Agent:</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✓ Uses ALL your term extensions</li>
                      <li>✓ Represents complete value system</li>
                      <li>✓ Not limited to baseline</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t font-mono text-sm">System AI Agent:</div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>⚠ Only uses Main DAHAO terms</li>
                      <li>⚠ Conservative baseline only</li>
                      <li>⚠ Cannot see extensions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progressive Governance Pipeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Step 3: Progressive Governance Pipeline</h2>

          <div className="space-y-8">
            {/* Personal Development */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                  <CardTitle>Personal Development</CardTitle>
                </div>
                <CardDescription>Private workspace for value system evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Develop terms, ethics, and governance ideas in your personal branch without constraints.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Unlimited experimentation</li>
                      <li>• No approval needed</li>
                      <li>• Full creative freedom</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-800 mb-2">Token Incentive</div>
                    <p className="text-sm text-blue-600">
                      Quality developments earn tokens when moved to public pool
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Public Pool */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">2</div>
                  <CardTitle>Public Pool Community Review</CardTitle>
                </div>
                <CardDescription>Community evaluates and refines proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Submit developed ideas for community discussion and improvement.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Open discussion and feedback</li>
                      <li>• Collaborative refinement</li>
                      <li>• Merit-based progression</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-800 mb-2">Token Rewards</div>
                    <p className="text-sm text-green-600">
                      Contributors earn tokens for valuable feedback and improvements
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Pool */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</div>
                  <CardTitle>Investment Pool Funding</CardTitle>
                </div>
                <CardDescription>Token holders allocate resources to promising proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Serious proposals receive funding from the investment pool for implementation.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Token holder voting</li>
                      <li>• Resource allocation</li>
                      <li>• Implementation funding</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-semibold text-purple-800 mb-2">NO Sponsor System</div>
                    <p className="text-sm text-purple-600">
                      Democratic token holder decisions, not sponsor approval
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Governance Decision */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">4</div>
                  <CardTitle>Governance Decision Making</CardTitle>
                </div>
                <CardDescription>Final implementation through hybrid human-AI voting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Funded proposals go to final governance vote for implementation.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Human + AI agent voting</li>
                      <li>• Ethical validation</li>
                      <li>• Official adoption</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="font-semibold text-orange-800 mb-2">Implementation</div>
                    <p className="text-sm text-orange-600">
                      Approved changes become part of Main DAHAO governance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Token Economics Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Step 4: Token Economics & Avalanche Subchain Creation</h2>

          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-center text-emerald-800">The Dual Benefit Investment Model</CardTitle>
              <CardDescription className="text-center">Investors profit while funding community development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3 text-emerald-800">How It Works</h4>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="font-semibold text-emerald-600">1.</span>
                      <span>Investors buy DAHAO tokens from investment pool</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-emerald-600">2.</span>
                      <span>DAHAO success increases token value</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-emerald-600">3.</span>
                      <span>Investors can sell for profit anytime</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-emerald-600">4.</span>
                      <span>Remaining value funds community work</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-emerald-600">5.</span>
                      <span>Successful DAHAOs get Avalanche subchain</span>
                    </li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-emerald-800">The Alex Example</h4>
                  <div className="bg-white p-4 rounded-lg border border-emerald-300">
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Invests:</span> $1,000 → 1000 tokens @ $1</p>
                      <p><span className="font-semibold">Growth:</span> Token value 5x in 1 month</p>
                      <p><span className="font-semibold">Sells:</span> 400 tokens for $2,000</p>
                      <p><span className="font-semibold">Profit:</span> $1,000 (2x return)</p>
                      <p><span className="font-semibold">Community:</span> $3,000 for operations</p>
                      <div className="mt-3 pt-3 border-t border-emerald-200">
                        <p className="font-semibold text-emerald-700">Win-Win: Alex profits + community funded!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h5 className="font-semibold text-emerald-700 mb-2">For Contributors</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Earn tokens for valuable work</li>
                    <li>• Governance participation rewards</li>
                    <li>• Term development incentives</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h5 className="font-semibold text-emerald-700 mb-2">For Investors</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Token appreciation potential</li>
                    <li>• Social impact investment</li>
                    <li>• Governance voting rights</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-emerald-200">
                  <h5 className="font-semibold text-emerald-700 mb-2">For Community</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Sustainable funding model</li>
                    <li>• No dependency on donations</li>
                    <li>• Aligned incentives</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Agent Deployment */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Step 5: AI Agent Value Differentiation & Token-Incentivized Deployment</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-indigo-500" />
                  Personal AI Agents
                </CardTitle>
                <CardDescription>Represent your complete value system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Full Value Representation</h4>
                    <ul className="space-y-2 text-sm text-indigo-700">
                      <li>• Uses ALL your personal term extensions</li>
                      <li>• Embodies your complete ethical framework</li>
                      <li>• Can reason beyond baseline values</li>
                      <li>• Deployable across other branches</li>
                    </ul>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">Token Rewards</h4>
                    <p className="text-sm text-emerald-700">
                      Deploy your agent to help other branches and earn tokens based on value provided
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  System AI Agents
                </CardTitle>
                <CardDescription>Maintain baseline integrity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Conservative Baseline</h4>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• Limited to Main DAHAO values only</li>
                      <li>• Cannot access personal extensions</li>
                      <li>• Ensures system consistency</li>
                      <li>• Guards against value drift</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Validation Role</h4>
                    <p className="text-sm text-yellow-700">
                      System agents validate that proposals align with core DAHAO principles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-center">Token-Incentivized Cross-Branch Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <Network className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold mb-1">Deploy Across Branches</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your agent's expertise with other DAHAOs
                  </p>
                </div>
                <div className="text-center">
                  <TrendingUpIcon className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-semibold mb-1">Earn Token Rewards</h4>
                  <p className="text-sm text-muted-foreground">
                    Quality analysis and help increases rewards
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold mb-1">Fund Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">
                    Investment pool covers AI operational costs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Exponential Value Creation</CardTitle>
              <CardDescription className="text-center">Each participant amplifies value for everyone else</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Individual Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                      <span>Token rewards for contributions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-blue-500" />
                      <span>Access to network intelligence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-500" />
                      <span>Personal AI agent powered by community</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Network Effects</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>More participants = higher token value</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>Success funds more development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <GitBranchIcon className="h-4 w-4 text-green-500" />
                      <span>Cross-DAHAO pattern sharing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">Avalanche Graduation</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-500" />
                      <span>Successful DAHAOs get own blockchain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-purple-500" />
                      <span>Full sovereignty and control</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-purple-500" />
                      <span>Remain connected to network</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2 text-center">The Exponential Advantage</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Unlike traditional organizations where growth creates bureaucracy,
                  DAHAO growth creates intelligence. Each new participant benefits from
                  all previous contributions while adding their own to the commons.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Implementation */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Technical Implementation Vision</h2>

          {/* Integration-First Architecture */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle>Integration-First Architecture</CardTitle>
              <CardDescription>Our technical philosophy: integrate first, build custom later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Current Integrations</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>GitHub Actions + Issues for workflow automation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Claude Code for ethical reasoning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>GitHub Copilot for development acceleration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Standard LLM APIs for agent intelligence</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Future Integrations</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Any new AI breakthrough automatically enhances the network</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Blockchain innovations can be adopted by community vote</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Novel interfaces get integrated rather than rebuilt</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">Custom Development Priority</h4>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                      <span>Ethics validation systems (unique to DAHAO)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                      <span>Cross-domain intelligence sharing (our innovation)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                      <span>Democratic governance tools (community-specific)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
                      <span>Fair value distribution (economic innovation)</span>
                    </li>
                  </ol>
                  <div className="mt-3 text-xs text-muted-foreground italic">
                    Low priority: rebuilding what already works well.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* GitHub Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  GitHub Actions Integration
                </CardTitle>
                <CardDescription>Automated workflows trigger agent analysis and voting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Workflow Triggers</h4>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      <div>on:</div>
                      <div>&nbsp;&nbsp;issues: [opened, edited, labeled]</div>
                      <div>&nbsp;&nbsp;pull_request: [opened, synchronize]</div>
                      <div>&nbsp;&nbsp;schedule: "0 12 * * *"</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Agent Actions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Load user's personal agent config</li>
                      <li>• Analyze proposal against ethics versions</li>
                      <li>• Post structured YAML analysis</li>
                      <li>• Trigger voting if thresholds met</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claude Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Claude Code Agents
                </CardTitle>
                <CardDescription>AI agents powered by Claude with ethical reasoning capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Agent Configuration</h4>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      <div>character_file: "agents/sarah-agent.yml"</div>
                      <div>adopted_ethics:</div>
                      <div>&nbsp;&nbsp;core: "v1.1"</div>
                      <div>&nbsp;&nbsp;animal_welfare: "v1.0"</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analysis Output</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Ethics compatibility check</li>
                      <li>• Impact assessment</li>
                      <li>• Implementation suggestions</li>
                      <li>• Conflict resolution recommendations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Term Dictionary System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Term Dictionary System
                </CardTitle>
                <CardDescription>Living vocabulary with Git-based versioning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Term Structure</h4>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      <div>core-governance/terms/v1.0/</div>
                      <div>&nbsp;&nbsp;fundamental.yml  # harm, being, wellbeing</div>
                      <div>&nbsp;&nbsp;governance.yml   # transparency, equality</div>
                      <div>animal-welfare/terms/v1.0/</div>
                      <div>&nbsp;&nbsp;welfare-core.yml # suffering, sentience</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Inheritance from core to domain terms</li>
                      <li>• Cross-domain term mapping</li>
                      <li>• Automatic consistency checking</li>
                      <li>• Democratic term evolution</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* MCP Server Integration */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">MCP Server Integration: Direct System Access</h2>

          <div className="space-y-8">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-center">Beyond GitHub: Direct System Integration</CardTitle>
                <CardDescription className="text-center max-w-3xl mx-auto">
                  While GitHub Actions provide the foundation, DAHAO agents gain superpower through MCP (Model Context Protocol) servers -
                  enabling direct interaction with blockchain, ethics databases, and cross-domain intelligence.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Real-Time Blockchain Operations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Real-Time Blockchain Operations
                </CardTitle>
                <CardDescription>Agents don't just analyze - they act with immutable verification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Agents don't just analyze - they act:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-semibold">Register Identity</div>
                        <div className="text-sm text-muted-foreground">
                          Automatically register on Avalanche subnet with cryptographic proof
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">Record Decisions</div>
                        <div className="text-sm text-muted-foreground">
                          Write votes and governance actions immutably to blockchain
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-semibold">Verify Authenticity</div>
                        <div className="text-sm text-muted-foreground">
                          Check other agents' signatures and reputation in real-time
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <div>
                        <div className="font-semibold">Query Network State</div>
                        <div className="text-sm text-muted-foreground">
                          Access current ethics versions, voting status, and community health
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Automated Ethics Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Automated Ethics Validation
                </CardTitle>
                <CardDescription>Before any action, agents perform instant comprehensive checks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Validation Pipeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <span className="font-mono text-sm">validate_against_ethics()</span>
                          <p className="text-xs text-muted-foreground">Ensures alignment with current framework</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <span className="font-mono text-sm">check_personal_alignment()</span>
                          <p className="text-xs text-muted-foreground">Verifies consistency with user's character</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div>
                          <span className="font-mono text-sm">analyze_cross_domain_impact()</span>
                          <p className="text-xs text-muted-foreground">Effects across animal welfare, music, environment</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div>
                          <span className="font-mono text-sm">generate_enhancements()</span>
                          <p className="text-xs text-muted-foreground">Automatic ethical improvement suggestions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Before Voting Example</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-green-600"># Agent automatically validates</div>
                      <div>ethics_check = validate_against_ethics(</div>
                      <div>&nbsp;&nbsp;proposal, my_values)</div>
                      <div>if ethics_check.compatible:</div>
                      <div>&nbsp;&nbsp;personal_check = check_personal_alignment(</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;proposal)</div>
                      <div>&nbsp;&nbsp;if personal_check.strong_match:</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;cast_vote(proposal_id, "APPROVE")</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;record_decision(vote_data)</div>
                      <div className="text-green-600">&nbsp;&nbsp;&nbsp;&nbsp;# Blockchain record</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cross-Domain Intelligence Network */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-500" />
                  Cross-Domain Intelligence Network
                </CardTitle>
                <CardDescription>Agents tap into collective knowledge across all DAHAOs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-3">Network Functions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <span className="font-mono text-sm">get_cross_domain_patterns()</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <span className="font-mono text-sm">find_compatible_agents()</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                          <span className="font-mono text-sm">check_network_health()</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                          <span className="font-mono text-sm">share_innovations()</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Learning from Network Example</h4>
                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div className="text-green-600"># Animal welfare agent discovers</div>
                        <div className="text-green-600"># environment monitoring patterns</div>
                        <div>patterns = get_cross_domain_patterns(</div>
                        <div>&nbsp;&nbsp;"environment")</div>
                        <div>applicable = filter_applicable_patterns(</div>
                        <div>&nbsp;&nbsp;patterns, "animal_welfare")</div>
                        <div>improvement = adapt_patterns_to_domain(</div>
                        <div>&nbsp;&nbsp;applicable)</div>
                        <div>submit_proposal(improvement)</div>
                        <div className="text-green-600"># Automatic innovation</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">Capabilities Breakdown</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <div className="font-medium text-purple-700">Pattern Recognition</div>
                        <p className="text-sm text-muted-foreground">Discovers successful strategies from other DAHAOs</p>
                      </div>
                      <div>
                        <div className="font-medium text-blue-700">Compatible Partners</div>
                        <p className="text-sm text-muted-foreground">Identifies collaboration opportunities</p>
                      </div>
                      <div>
                        <div className="font-medium text-green-700">Network Health</div>
                        <p className="text-sm text-muted-foreground">Monitors overall system integrity</p>
                      </div>
                      <div>
                        <div className="font-medium text-orange-700">Best Practice Propagation</div>
                        <p className="text-sm text-muted-foreground">Automatically shares innovations across domains</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* The Vision */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-800">The Vision: Autonomous Collective Intelligence</CardTitle>
                <CardDescription className="text-center">
                  MCP servers transform agents from commenters to actors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center">
                    Instead of just GitHub discussions, imagine:
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm">Agents proactively identifying ethics inconsistencies across the network</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Automatic cross-pollination of successful governance patterns</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Real-time blockchain verification preventing manipulation</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Continuous system health monitoring and self-correction</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg text-center">
                    <p className="font-semibold text-indigo-800">
                      The first truly autonomous, self-improving organizational network where human wisdom guides direction
                      while AI agents handle consistency, verification, and cross-domain learning at superhuman scale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Timeline</CardTitle>
                <CardDescription>Progressive evolution from foundation to full autonomy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border-l-4 border-l-blue-500 bg-blue-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                    <div>
                      <div className="font-semibold">Phase 1: GitHub Actions Foundation</div>
                      <div className="text-sm text-muted-foreground">(Current) Basic agent interactions via GitHub workflows</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-l-green-500 bg-green-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">2</div>
                    <div>
                      <div className="font-semibold">Phase 2: Basic MCP Server</div>
                      <div className="text-sm text-muted-foreground">Blockchain tools and ethics validation functions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-l-purple-500 bg-purple-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">3</div>
                    <div>
                      <div className="font-semibold">Phase 3: Advanced Cross-Domain Intelligence</div>
                      <div className="text-sm text-muted-foreground">Network learning and pattern recognition tools</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-l-indigo-500 bg-indigo-50">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">4</div>
                    <div>
                      <div className="font-semibold">Phase 4: Fully Autonomous Decision-Making</div>
                      <div className="text-sm text-muted-foreground">Self-improving organizational network</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Implementation Roadmap</h2>

          <div className="space-y-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Phase 1: Foundation (Current)</CardTitle>
                <CardDescription>Basic infrastructure and concept validation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-2">✅ Completed</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Website with concept explanation</li>
                      <li>• GitHub repository structure</li>
                      <li>• Basic authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🚧 In Progress</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Ethics framework YAML schemas</li>
                      <li>• Agent configuration templates</li>
                      <li>• Workflow documentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📋 Next</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Mock agent interactions</li>
                      <li>• Voting simulation UI</li>
                      <li>• Community onboarding</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Phase 2: Agent Integration</CardTitle>
                <CardDescription>Real Claude Code agents and GitHub Actions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• GitHub Actions workflow implementation</li>
                  <li>• Claude Code agent deployment</li>
                  <li>• Personal agent configuration system</li>
                  <li>• Ethics version control automation</li>
                  <li>• Community voting mechanisms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-800">Phase 3: Full Autonomy</CardTitle>
                <CardDescription>Advanced features and cross-domain collaboration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Multi-domain DAHAO network</li>
                  <li>• Advanced agent reasoning</li>
                  <li>• Real-world impact measurement</li>
                  <li>• Token economics integration</li>
                  <li>• Cross-platform expansion</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Join the Revolution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Personal governance workspaces, dual benefit token economics, and AI agents
            working together to create truly autonomous organizations. Start building your DAHAO today.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/api/auth/github">
                Join Development
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/agents">
                Explore Agent Architecture
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
