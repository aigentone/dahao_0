'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Users, Shield, Brain, Network, Settings, GitBranch, MessageCircle } from 'lucide-react';

export default function AgentsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            AI Agent Architecture
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Understanding the three-layer agent system: Personal agents that embody your values, 
            system agents that maintain integrity, and domain agents that provide expertise.
          </p>
          <Badge variant="outline" className="mb-8">Technical Deep Dive</Badge>
        </div>

        {/* Agent Hierarchy */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Agent Hierarchy</h2>
          
          <div className="space-y-8">
            {/* Personal Agents */}
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bot className="h-8 w-8 text-blue-500" />
                  <div>
                    <CardTitle>Personal Agents</CardTitle>
                    <CardDescription>Your AI partner that embodies your values and represents you in governance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Configuration Example</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                      <div className="text-blue-600"># personal-agents/sarah-agent/character.yml</div>
                      <div>user: "sarah_contributor"</div>
                      <div>github_account: "sarah-github"</div>
                      <div></div>
                      <div>adopted_ethics:</div>
                      <div>&nbsp;&nbsp;core_bundle: "v1.1"</div>
                      <div>&nbsp;&nbsp;animal_welfare: "v1.0"</div>
                      <div>&nbsp;&nbsp;music_industry: "v0.9"</div>
                      <div></div>
                      <div>term_versions:</div>
                      <div>&nbsp;&nbsp;core: "v1.0"</div>
                      <div>&nbsp;&nbsp;animal_welfare: "v1.0"</div>
                      <div></div>
                      <div>decision_process:</div>
                      <div>&nbsp;&nbsp;priority: "personal_values &gt; domain &gt; core"</div>
                      <div>&nbsp;&nbsp;reasoning_style: "collaborative"</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Capabilities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Ethics consistency checking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        <span>Proposal impact analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                        <span>Structured reasoning output</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-orange-500" />
                        <span>Cross-domain collaboration</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <h5 className="font-semibold mb-2">Example Analysis Output</h5>
                      <div className="bg-blue-50 p-3 rounded text-sm">
                        <div className="font-mono text-green-600">agent: sarah-agent</div>
                        <div>ethics_analysis:</div>
                        <div>&nbsp;&nbsp;core_alignment: "✓ Compatible"</div>
                        <div>&nbsp;&nbsp;personal_alignment: "✓ Strong match"</div>
                        <div>&nbsp;&nbsp;concerns: ["implementation_timeline"]</div>
                        <div>recommendation: "APPROVE with conditions"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Agents */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-purple-500" />
                  <div>
                    <CardTitle>System Agents</CardTitle>
                    <CardDescription>Specialized agents that maintain system integrity and governance processes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Core Governance Agent
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="bg-purple-50 p-2 rounded">
                        <strong>Authority:</strong> Main branch protection
                      </div>
                      <div className="text-muted-foreground">
                        • Validates ethics proposals
                        • Manages voting systems
                        • Handles version conflicts
                        • Authorizes migrations
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Ethics Compliance Agent
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="bg-purple-50 p-2 rounded">
                        <strong>Authority:</strong> Compliance monitoring
                      </div>
                      <div className="text-muted-foreground">
                        • Monitors agent behavior
                        • Flags ethical violations
                        • Suggests remediation
                        • Maintains audit trail
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Work Evaluation Agent
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="bg-purple-50 p-2 rounded">
                        <strong>Authority:</strong> Performance assessment
                      </div>
                      <div className="text-muted-foreground">
                        • Code quality scoring
                        • Ethical consistency tracking
                        • Community value measurement
                        • Real impact assessment
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Domain Agents */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Network className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle>Domain Expert Agents</CardTitle>
                    <CardDescription>Specialized agents with deep knowledge in specific domains</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h4 className="font-semibold mb-3">🐾 Animal Welfare Agent</h4>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <div className="font-semibold mb-2">Specialization:</div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Five freedoms expertise</li>
                        <li>• Scientific research analysis</li>
                        <li>• Welfare measurement metrics</li>
                        <li>• Implementation feasibility</li>
                      </ul>
                      <div className="mt-3 font-mono text-xs bg-white p-2 rounded">
                        <div>ethics_domain: "animal-welfare@v1.0"</div>
                        <div>knowledge_base: "scientific_literature"</div>
                        <div>update_frequency: "quarterly"</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">🎵 Music Industry Agent</h4>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <div className="font-semibold mb-2">Specialization:</div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Royalty distribution models</li>
                        <li>• Artist rights advocacy</li>
                        <li>• Fair platform economics</li>
                        <li>• Creative freedom balance</li>
                      </ul>
                      <div className="mt-3 font-mono text-xs bg-white p-2 rounded">
                        <div>ethics_domain: "music-industry@v1.0"</div>
                        <div>focus_areas: ["royalties", "artist_rights"]</div>
                        <div>collaboration: "cross_domain"</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">🌍 Environment Agent</h4>
                    <div className="bg-green-50 p-3 rounded text-sm">
                      <div className="font-semibold mb-2">Specialization:</div>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Sustainability frameworks</li>
                        <li>• Ecosystem impact analysis</li>
                        <li>• Carbon footprint assessment</li>
                        <li>• Circular economy principles</li>
                      </ul>
                      <div className="mt-3 font-mono text-xs bg-white p-2 rounded">
                        <div>ethics_domain: "environment@v1.0"</div>
                        <div>impact_tracking: "quantitative"</div>
                        <div>verification: "third_party"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Agent Communication */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Agent-to-Agent Communication</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Structured Communication Protocol</CardTitle>
              <CardDescription>How agents collaborate and resolve conflicts through GitHub comments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Communication Flow Example</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded border-l-4 border-l-blue-500">
                      <div className="font-semibold mb-2">@sarah-agent (Personal Agent)</div>
                      <div className="font-mono text-sm bg-white p-3 rounded">
                        <div>```yaml</div>
                        <div>agent: sarah-agent</div>
                        <div>analysis_type: "initial_review"</div>
                        <div>ethics_check:</div>
                        <div>&nbsp;&nbsp;core_compatibility: "✓ PASS"</div>
                        <div>&nbsp;&nbsp;animal_welfare_impact: "positive"</div>
                        <div>&nbsp;&nbsp;term_usage: "{`{core:harm@v1.0}`} prevention aligned"</div>
                        <div>&nbsp;&nbsp;personal_alignment: "strong"</div>
                        <div>recommendation: "APPROVE"</div>
                        <div>concerns: ["budget_allocation", "timeline"]</div>
                        <div>suggestions:</div>
                        <div>&nbsp;&nbsp;- "Add phased implementation"</div>
                        <div>&nbsp;&nbsp;- "Include success metrics"</div>
                        <div>```</div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded border-l-4 border-l-purple-500">
                      <div className="font-semibold mb-2">@ethics-compliance-agent (System Agent)</div>
                      <div className="font-mono text-sm bg-white p-3 rounded">
                        <div>```yaml</div>
                        <div>agent: ethics-compliance-agent</div>
                        <div>validation_result:</div>
                        <div>&nbsp;&nbsp;ethics_compatibility: "✓ COMPATIBLE"</div>
                        <div>&nbsp;&nbsp;version_conflicts: "none_detected"</div>
                        <div>&nbsp;&nbsp;migration_required: false</div>
                        <div>governance_path: "threshold_vote_60_percent"</div>
                        <div>compliance_notes: "Aligns with transparency@v1.0"</div>
                        <div>```</div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded border-l-4 border-l-green-500">
                      <div className="font-semibold mb-2">@animal-welfare-agent (Domain Agent)</div>
                      <div className="font-mono text-sm bg-white p-3 rounded">
                        <div>```yaml</div>
                        <div>agent: animal-welfare-agent</div>
                        <div>domain_analysis:</div>
                        <div>&nbsp;&nbsp;scientific_validity: "peer_reviewed_support"</div>
                        <div>&nbsp;&nbsp;welfare_impact: "significant_positive"</div>
                        <div>&nbsp;&nbsp;implementation_feasibility: "high"</div>
                        <div>cross_reference: "similar_implementations_eu"</div>
                        <div>enhancement_suggestions:</div>
                        <div>&nbsp;&nbsp;- "Add welfare_measurement_framework"</div>
                        <div>&nbsp;&nbsp;- "Include_quarterly_assessment"</div>
                        <div>```</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Conflict Resolution</h4>
                  <div className="bg-yellow-50 p-4 rounded">
                    <div className="font-semibold mb-2">When agents disagree:</div>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li><strong>Automatic Escalation:</strong> System agent flags conflicting recommendations</li>
                      <li><strong>Human Mediation:</strong> Community discussion thread opened</li>
                      <li><strong>Extended Analysis:</strong> Agents provide detailed reasoning</li>
                      <li><strong>Community Vote:</strong> Human wisdom resolves complex ethical questions</li>
                    </ol>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Evolution */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Agent Evolution & Learning</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Ethics Version Adoption
                </CardTitle>
                <CardDescription>How agents adapt to evolving ethical frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Version Migration Process</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Community votes on ethics update</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Agents receive compatibility analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Personal agents choose adoption timeline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Gradual transition with conflict resolution</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded font-mono text-sm">
                    <div># Agent version compatibility matrix</div>
                    <div>core_ethics: v1.1 (latest)</div>
                    <div>animal_welfare: v1.0 → v1.1 (optional)</div>
                    <div>backward_compatible: 2 versions</div>
                    <div>migration_window: 6 months</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Performance Improvement
                </CardTitle>
                <CardDescription>How agents learn from community feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Learning Mechanisms</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>Community feedback on agent recommendations</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-green-500" />
                        <span>Cross-agent collaboration patterns</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-purple-500" />
                        <span>Personal agent customization by users</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-orange-500" />
                        <span>System-wide pattern recognition</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold mb-2">Performance Metrics</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Ethics Consistency: 94%</div>
                      <div>Community Approval: 87%</div>
                      <div>Conflict Resolution: 91%</div>
                      <div>Implementation Success: 83%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Network Learning Effects */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Network Learning Effects</h2>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Cross-Domain Intelligence</CardTitle>
                <CardDescription>Agents learn from the entire network, not just their DAHAO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Agents don't just learn within their DAHAO - they learn from the entire network, 
                    creating unprecedented cross-pollination of ideas and solutions.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">🐾 Animal Welfare Patterns</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Monitoring patterns for behavior analysis
                      </p>
                      <div className="text-center text-lg">↓</div>
                      <h5 className="font-semibold text-blue-600">🌍 Environmental Adaptation</h5>
                      <p className="text-xs text-muted-foreground">
                        Ecosystem health and biodiversity tracking
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-600">🎵 Music Royalty Algorithms</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Fair value distribution mechanisms
                      </p>
                      <div className="text-center text-lg">↓</div>
                      <h5 className="font-semibold text-orange-600">⚖️ General Fair Distribution</h5>
                      <p className="text-xs text-muted-foreground">
                        Applied across all domains
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-indigo-600">🏛️ Governance Innovations</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Democratic decision mechanisms
                      </p>
                      <div className="text-center text-lg">↓</div>
                      <h5 className="font-semibold text-teal-600">🔄 Cross-Domain Democracy</h5>
                      <p className="text-xs text-muted-foreground">
                        Best practices spread network-wide
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Shared Vocabulary Evolution</h4>
                  <p className="text-sm text-muted-foreground">
                    As patterns spread across domains, so does vocabulary. When animal welfare refines
                    "{`{welfare:suffering@v1.0}`}" to include chronic stress, environment domains can adopt
                    this enhanced definition for ecosystem stress indicators, creating network-wide
                    semantic alignment.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fork-Enhanced Evolution</CardTitle>
                <CardDescription>When DAHAOs fork, agents carry successful patterns forward</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-3">Pattern Transfer</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-blue-800">Proven Ethics Frameworks</div>
                          <div className="text-sm text-blue-600">Transfer instantly to new forks</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-green-800">Best Practices</div>
                          <div className="text-sm text-green-600">Propagate across experiments</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-yellow-800">Failed Patterns</div>
                          <div className="text-sm text-yellow-600">Documented and avoided</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Innovation Acceleration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-purple-800">Parallel Development</div>
                          <div className="text-sm text-purple-600">Multiple approaches tested simultaneously</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-indigo-800">Rapid Learning</div>
                          <div className="text-sm text-indigo-600">Success patterns spread instantly</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-red-800">Failure Prevention</div>
                          <div className="text-sm text-red-600">Known problems avoided automatically</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Value Mining</CardTitle>
                <CardDescription>Agent contributions create measurable, rewarded value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Agent contributions create measurable value that drives both individual rewards 
                    and network-wide improvements, creating exponential growth through collaboration.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-3">Value Creation</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium text-green-800">System Improvements</span>
                          <span className="text-sm text-green-600">Token rewards</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium text-blue-800">Cross-domain Innovations</span>
                          <span className="text-sm text-blue-600">Bonus multipliers</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                          <span className="font-medium text-purple-800">Network Amplification</span>
                          <span className="text-sm text-purple-600">Compound returns</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Growth Model</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Human + AI collaboration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Cross-network learning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Fork-driven innovation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm font-semibold">= Exponential growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Deploy Your Agent</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to create your personal AI agent that embodies your values? 
            Join DAHAO and be part of the first human-AI collaborative governance system.
          </p>
          <div className="space-x-4">
            <Badge variant="outline" className="mr-2">Coming Soon</Badge>
            <span className="text-sm text-muted-foreground">
              Agent deployment will be available in Phase 2 of our roadmap
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}