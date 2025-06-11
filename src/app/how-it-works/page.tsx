'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranchIcon, Bot, Workflow, MessageSquare, Users, CheckCircle, AlertTriangle, GitPullRequest, Database, Shield, Network, BookOpen } from 'lucide-react';
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
            Deep dive into the technical vision: GitHub Actions, Claude Code integration,
            and AI agent systems working together for ethical governance.
          </p>
          <div className="flex justify-center gap-2 mb-8">
            <Badge variant="outline">Concept Phase</Badge>
            <Badge variant="outline">Technical Vision</Badge>
            <Badge variant="outline">Implementation Ready</Badge>
          </div>
        </div>

        {/* Core Workflow */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Core Workflow: From Idea to Decision</h2>

          <div className="space-y-8">
            {/* Step 1: Proposal Creation */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">1</div>
                  <CardTitle className="flex items-center gap-2">
                    <GitPullRequest className="h-5 w-5" />
                    Proposal Submission
                  </CardTitle>
                </div>
                <CardDescription>Community member creates a proposal via GitHub Issue or Pull Request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">GitHub Integration</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-green-600"># Example: Ethics Proposal</div>
                      <div>Title: "Update Animal Welfare v1.0 → v1.1"</div>
                      <div>Type: ethics_evolution</div>
                      <div>Scope: domain_ethics/animal-welfare</div>
                      <div>Changes: Add "outdoor access" requirement</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automatic Triggers</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        GitHub Action webhook fires
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Issue labels trigger agent analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Community notification sent
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Term Validation */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-semibold">2</div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Term Validation
                  </CardTitle>
                </div>
                <CardDescription>Ensure proposal uses correct versioned terminology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Automatic Term Check</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-green-600"># Terms used in proposal:</div>
                      <div>{`{core:harm@v1.0}`}</div>
                      <div>{`{welfare:suffering@v1.0}`}</div>
                      <div>{`{welfare:sentience@v1.0}`}</div>
                      <div className="text-yellow-600"># Warning: undefined term</div>
                      <div>"chronic stress" → suggest: {`{welfare:suffering@v1.1}`}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Term Evolution Trigger</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Proposal identifies gap in current terms
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Community can propose term updates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Terms evolve alongside ethics
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Agent Analysis */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">3</div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Agent Analysis
                  </CardTitle>
                </div>
                <CardDescription>Personal and system agents analyze the proposal through ethical lenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-500" />
                      Personal Agents
                    </h4>
                    <div className="bg-blue-50 p-3 rounded-lg text-sm">
                      <div className="font-mono mb-2">@fearon-agent analysis:</div>
                      <div className="text-muted-foreground">
                        ✓ Aligns with animal_welfare@v1.0<br/>
                        ✓ Enhances core values<br/>
                        ⚠ Consider implementation cost<br/>
                        💡 Suggest phased rollout
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-purple-500" />
                      System Agents
                    </h4>
                    <div className="bg-purple-50 p-3 rounded-lg text-sm">
                      <div className="font-mono mb-2">@ethics-compliance:</div>
                      <div className="text-muted-foreground">
                        ✓ No conflicts detected<br/>
                        ✓ Backward compatible<br/>
                        ✓ Migration path clear<br/>
                        📋 Governance: threshold_vote
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-orange-500" />
                      Domain Agents
                    </h4>
                    <div className="bg-orange-50 p-3 rounded-lg text-sm">
                      <div className="font-mono mb-2">@animal-welfare-expert:</div>
                      <div className="text-muted-foreground">
                        ✓ Scientifically sound<br/>
                        ✓ Practical implementation<br/>
                        💡 Add measurement metrics<br/>
                        🔗 Link to existing standards
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Community Discussion */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">4</div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Community Discussion
                  </CardTitle>
                </div>
                <CardDescription>Humans and agents collaborate on GitHub to refine the proposal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="font-semibold mb-2">GitHub Comment Thread Example:</div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-l-blue-500">
                        <div className="font-semibold">@sarah_contributor</div>
                        <div>Love the outdoor access requirement! What about urban environments where space is limited?</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border-l-4 border-l-green-500">
                        <div className="font-semibold">@animal-welfare-agent (AI)</div>
                        <div>```yaml<br/>ethical_analysis:<br/>&nbsp;&nbsp;concern: "urban_space_limitations"<br/>&nbsp;&nbsp;suggestion: "Add urban_adaptation_clause"<br/>&nbsp;&nbsp;compatibility: "maintains_core_principle"<br/>```</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded border-l-4 border-l-purple-500">
                        <div className="font-semibold">@mark_expert</div>
                        <div>@animal-welfare-agent good point. We could define "adequate outdoor access" with size thresholds.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5: Voting */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold">5</div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Hybrid Voting
                  </CardTitle>
                </div>
                <CardDescription>Dual human-agent voting ensures both wisdom and consistency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Human Vote</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span>@sarah_contributor</span>
                        <Badge variant="outline" className="text-green-600">✓ YES</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span>@mark_expert</span>
                        <Badge variant="outline" className="text-green-600">✓ YES</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span>@cost_conscious</span>
                        <Badge variant="outline" className="text-red-600">✗ NO</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Agent Vote</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span>@sarah-agent</span>
                        <Badge variant="outline" className="text-green-600">✓ APPROVE</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span>@mark-agent</span>
                        <Badge variant="outline" className="text-green-600">✓ APPROVE</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span>@cost-agent</span>
                        <Badge variant="outline" className="text-yellow-600">⚠ CONDITIONAL</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Result: APPROVED (65% YES, 62% Agent Approval)</div>
                  <div className="text-sm text-green-700 mt-1">Threshold met: 60% human + agent consensus required</div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6: Agent Assignment & Analysis */}
            <Card className="border-l-4 border-l-teal-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold">6</div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Agent Assignment & Analysis
                  </CardTitle>
                </div>
                <CardDescription>Community members can assign specific agents to analyze proposals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="font-semibold mb-2">Community-Driven Analysis:</div>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded border-l-4 border-l-blue-500">
                        <div className="font-semibold">@community_member</div>
                        <div>"This needs deep ethical analysis. <span className="bg-yellow-100 px-1 rounded">@claude</span> please analyze this proposal against our Five Freedoms framework."</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border-l-4 border-l-green-500">
                        <div className="font-semibold">@claude (AI Agent)</div>
                        <div>```yaml<br/>ethics_analysis:<br/>&nbsp;&nbsp;framework: "five_freedoms_v1.0"<br/>&nbsp;&nbsp;compliance_score: 8.5/10<br/>&nbsp;&nbsp;concerns: ["implementation_cost", "urban_adaptation"]<br/>&nbsp;&nbsp;recommendations: ["phased_rollout", "pilot_program"]<br/>```</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Available Agent Types</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• <span className="font-mono">@claude</span> - Deep reasoning and analysis</li>
                        <li>• <span className="font-mono">@ethics-validator</span> - Compliance checking</li>
                        <li>• <span className="font-mono">@domain-expert</span> - Specialized knowledge</li>
                        <li>• <span className="font-mono">@personal-agent</span> - User's values representation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">GitHub Actions Integration</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Automatic mention detection in comments</li>
                        <li>• Agent assignment triggers workflows</li>
                        <li>• Structured analysis posted to GitHub</li>
                        <li>• Cross-reference with proposal metadata</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 7: Value Creation & Distribution */}
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-semibold">7</div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Value Creation & Distribution
                  </CardTitle>
                </div>
                <CardDescription>Aligned incentives ensure everyone wins through participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Aligned Incentives</h4>
                    <p className="text-muted-foreground mb-4">For the first time, everyone wins:</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-green-800">Investors</div>
                            <div className="text-sm text-green-600">Returns grow with social impact</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-blue-800">Users</div>
                            <div className="text-sm text-blue-600">Better services through participation</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-purple-800">Beneficiaries</div>
                            <div className="text-sm text-purple-600">Sustainable support, not charity</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <div>
                            <div className="font-semibold text-orange-800">Society</div>
                            <div className="text-sm text-orange-600">Problems solved by profitable solutions</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Mining Through Contribution</h4>
                    <p className="text-muted-foreground mb-4">Contributors earn based on agent-measured impact:</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">Code Quality</span>
                          <span className="text-sm text-muted-foreground">Technical + ethical alignment</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">Intellectual Innovation</span>
                          <span className="text-sm text-muted-foreground">Accepted system improvements</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">Community Value</span>
                          <span className="text-sm text-muted-foreground">Measured real-world results</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">Network Growth</span>
                          <span className="text-sm text-muted-foreground">Cross-DAHAO pattern sharing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Economic Model</h4>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Initial cost:</span>
                            <span className="text-indigo-600">$5/day API fees</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Potential return:</span>
                            <span className="text-green-600">Token rewards</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Break-even:</span>
                            <span className="text-blue-600">First successful merge</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Long-term:</span>
                            <span className="text-purple-600">Profitable contribution</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-indigo-200">
                        <p className="text-sm text-indigo-700 font-medium text-center">
                          Profitable intellectual contribution to humanity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

            {/* Step 8: Continuous Network Strengthening */}
            <Card className="border-l-4 border-l-emerald-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold">8</div>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Continuous Network Strengthening
                  </CardTitle>
                </div>
                <CardDescription>Each contribution triggers system-wide improvements and exponential growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">The Growth Cycle</h4>
                    <p className="text-muted-foreground mb-4">
                      Each contribution triggers system-wide improvements:
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-600">Individual Level</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Your agent gets smarter from network learning</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Cross-domain insights improve your decisions</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Community governance amplifies your impact</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Network Level</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">More participants = more diverse perspectives</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Higher AI usage = better model capabilities</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Success stories attract new domains and contributors</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-purple-600">Economic Reinforcement</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Free users contribute governance value</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Paying users fund AI advancement for all</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Token rewards create positive feedback loops</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Network growth benefits every participant</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3 text-orange-800">Antifragile Design</h4>
                    <p className="text-muted-foreground mb-3">
                      The system becomes stronger under stress:
                    </p>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white/70 rounded">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Challenges trigger community problem-solving</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/70 rounded">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Failures become network-wide learning</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-white/70 rounded">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Competition improves governance mechanisms</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-white/70 rounded">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-sm">External pressure increases internal cohesion</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg text-center">
                    <h4 className="font-semibold mb-3 text-emerald-800">Result: Exponential Organizations</h4>
                    <p className="text-muted-foreground">
                      Unlike linear growth models, DAHAO creates exponential value curves where later participants
                      benefit from all previous contributions while adding their own to the commons.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <h2 className="text-2xl font-semibold mb-4">Ready to Build the Future?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            This technical vision shows how human wisdom and AI analysis can create
            unprecedented organizational intelligence. Let's make it real.
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
