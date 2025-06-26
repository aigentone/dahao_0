// app/versioned-ethics/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  GitBranch, Shield, Brain, Users, RefreshCw, BookOpen,
  Layers, CheckCircle,
  AlertTriangle, Zap, History, Vote,
  ShieldCheck, Lightbulb, Code2, TrendingUp,
  Bot, Gauge, MessageCircle, Target, Workflow,
  Lock, Unlock, Timer, Settings, PlayCircle, PauseCircle
} from 'lucide-react';
import Link from 'next/link';
import { HeroSection, FeatureCard } from '@/components/shared';

export default function VersionedEthicsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <HeroSection
          badge="Natural Language Governance"
          title="Living Governance"
          subtitle="How DAHAO Combines Human Wisdom with AI Through Natural Language Rules"
          description="Imagine governance that evolves through conversation, not code. DAHAO uses natural language rules that AI interprets contextually, making sophisticated governance accessible to everyone while maintaining precision and reliability."
          maxWidth="3xl"
        />

        {/* Core Philosophy */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl">The Core Philosophy: Governance Through Conversation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              At the heart of DAHAO lies a revolutionary principle: <strong>Governance should be as natural as conversation,
              as powerful as code, and as accessible as asking a question.</strong>
            </p>
            <p className="mb-6">
              Instead of rigid programmatic rules, DAHAO uses natural language instructions that AI interprets contextually.
              This means your community can evolve its governance through discussion, not through writing code.
            </p>

            {/* Conversational Example */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-lg border">
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Example Daily Interaction:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <strong className="text-blue-600">You:</strong>
                  <span>"What do I need to do today?"</span>
                </div>
                <div className="flex gap-2">
                  <strong className="text-green-600">DAHAO:</strong>
                  <div>
                    <p>"Good morning! You have 3 governance tasks:</p>
                    <p>1. 🗳️ Vote on 'AI transparency in decisions' (2 hours left)</p>
                    <p>2. 💬 Join 'Urban farming integration' discussion</p>
                    <p>3. 📋 New tasks matching your skills</p>
                    <p><br />Which would you like to start with?"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <FeatureCard
                icon={MessageCircle}
                iconColor="text-green-600"
                title="Natural Language"
                description="Rules evolve through discussion"
              />
              <FeatureCard
                icon={Brain}
                iconColor="text-blue-600"
                title="AI Interpretation"
                description="Contextual understanding, not rigid code"
              />
              <FeatureCard
                icon={Users}
                iconColor="text-purple-600"
                title="Community Accessible"
                description="No technical knowledge required"
              />
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
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
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

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
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
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
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

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
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

        {/* Rules as Instructions */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Rules as Instructions: Natural Language Governance</h2>

          {/* Visual Architecture */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Traditional Programming Rules</h3>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200">
                    <code className="text-sm block text-red-800 dark:text-red-200">
                      if (proposal.votes.yes / proposal.votes.total &gt; 0.6) &#123;<br />
                      &nbsp;&nbsp;proposal.status = "approved";<br />
                      &#125;
                    </code>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      ❌ Requires coding knowledge • Hard to modify • Rigid interpretation
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">DAHAO Natural Language Rules</h3>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-800 dark:text-green-200">
                      <p className="font-semibold mb-2">"discussion-first" rule:</p>
                      <p className="mb-2">"Before proposals, ensure discussion with at least 3 participants and 60% consensus threshold."</p>
                      <div className="text-xs">
                        <strong>Parameters:</strong> minParticipants: 3, consensusThreshold: 60<br />
                        <strong>Branch Override:</strong> Your community can adjust these numbers
                      </div>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      ✅ Anyone can understand • Easy to modify • Contextual interpretation
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Example Rule Structure</h3>
                <div className="bg-background p-4 rounded-lg border">
                  <pre className="text-sm overflow-x-auto">
{`{
  "discussion-first": {
    instruction: "Before proposals, ensure discussion with...",
    parameters: {
      minParticipants: 3,
      consensusThreshold: 60
    },
    outputTemplate: {
      notification: "Discussion needed: {participants} of {minParticipants} participated",
      summary: "Ready to proceed with {consensusLevel}% support"
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* From Proposals to Living Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">From Proposals to Living Projects</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Organic Growth Through AI Collaboration</CardTitle>
              <CardDescription>How approved proposals evolve into continuously growing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Vote className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Community Approval</h4>
                  <p className="text-sm text-muted-foreground">
                    Your community votes on proposals using natural language discussions
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">2. AI Task Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    AI generates specific tasks with confidence scores and resource estimates
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Workflow className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Organic Evolution</h4>
                  <p className="text-sm text-muted-foreground">
                    Tasks spawn new tasks as they're completed, growing based on community needs
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-semibold mb-2">Example Project Evolution:</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Week 1:</strong> "Urban Farming Initiative" approved → AI generates initial tasks</p>
                  <p><strong>Week 2:</strong> Soil testing task completed → AI suggests water system design</p>
                  <p><strong>Week 3:</strong> Community feedback → AI adapts plan for winter growing</p>
                  <p><strong>Week 4:</strong> Success metrics → AI proposes expansion to neighboring areas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Control Panel Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Your Control Panel: Setting AI Boundaries</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-blue-600" />
                  <CardTitle>Term Creation Authority</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Never</span>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Suggest Only</span>
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Domain-Limited</span>
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
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
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Read-Only</span>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Minor Updates</span>
                    <RefreshCw className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Evolution Rights</span>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
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
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">No Delegation</span>
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Aligned Only</span>
                    <CheckCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Default Yes/No</span>
                    <PlayCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
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
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <CardTitle>Rule Interpretation Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Literal Only</span>
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Context-Aware</span>
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Personal AI Priority</span>
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">System AI Priority</span>
                    <Bot className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  AI follows rules exactly / AI interprets context and intent /
                  Personal AI guides interpretation / System AI maintains objectivity
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  <CardTitle>Output Customization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Minimal</span>
                    <Timer className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Structured</span>
                    <Code2 className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Detailed</span>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Conversational</span>
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Brief summaries only / Data tables and charts /
                  Full explanations and context / Natural dialogue format
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
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Disabled</span>
                    <PauseCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Notification Only</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <span className="text-sm">Time-Boxed</span>
                    <Timer className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
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

        {/* Three-Layer AI Integration */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Three-Layer AI Integration</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/30 border-purple-300">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Personal AI</CardTitle>
                <CardDescription>Your governance coach and advisor</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Learns from your branch modifications</li>
                  <li>• Provides personalized guidance</li>
                  <li>• Acts as your governance coach</li>
                  <li>• Understands your community's values</li>
                  <li>• Suggests improvements based on your goals</li>
                </ul>
                <div className="mt-4 p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Example:</strong> "Based on your branch's focus on transparency,
                    I suggest adding discussion requirements to this proposal."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/30 border-blue-300">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>System AI</CardTitle>
                <CardDescription>Objective governance validator</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Maintains objectivity using core principles</li>
                  <li>• Domain-aware for specialized DAHAOs</li>
                  <li>• Facilitates cross-branch learning</li>
                  <li>• Ensures baseline governance standards</li>
                  <li>• Prevents conflicts and inconsistencies</li>
                </ul>
                <div className="mt-4 p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Example:</strong> "This rule conflicts with the Animal Welfare baseline.
                    Consider adjusting the harm definition to include species impact."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/30 border-green-300">
              <CardHeader>
                <Bot className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Worker Agents</CardTitle>
                <CardDescription>Background task automation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>• Execute routine tasks automatically</li>
                  <li>• Handle notifications and validations</li>
                  <li>• Operate 24/7 in background</li>
                  <li>• Monitor compliance and performance</li>
                  <li>• Generate reports and summaries</li>
                </ul>
                <div className="mt-4 p-3 bg-background rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Example:</strong> "Daily summary: 3 proposals need votes,
                    2 discussions require moderator attention, 1 rule effectiveness report ready."
                  </p>
                </div>
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-orange-600" />
                  Scenario 4: The Evolving Community
                </CardTitle>
                <CardDescription>A community discovers their voting rules need adjustment through discussion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Configuration:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Discussion opens about voting improvements</li>
                      <li>• AI facilitates natural language rule evolution</li>
                      <li>• Community votes on rule changes with rich feedback</li>
                      <li>• Rules update without any code changes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Result:</h4>
                    <p className="text-sm text-muted-foreground">
                      Governance evolves through conversation. The community can modify their rules using natural language,
                      making governance accessible to non-technical members while maintaining precision and effectiveness.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2">Example Evolution:</h5>
                  <div className="text-sm space-y-1">
                    <p><strong>Week 1:</strong> "Our 60% threshold feels too high for minor proposals"</p>
                    <p><strong>Week 2:</strong> Discussion reveals need for tiered voting thresholds</p>
                    <p><strong>Week 3:</strong> AI suggests: "Minor changes need 40%, major changes need 75%"</p>
                    <p><strong>Week 4:</strong> Community refines and approves new natural language rule</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why This Works: Speed AND Safety */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why This Works: Speed AND Safety</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/30 border-blue-300">
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

            <Card className="bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/30 border-purple-300">
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

            <Card className="bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/30 border-green-300">
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

            <Card className="bg-gradient-to-br from-orange-50/50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/30 border-orange-300">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Natural Language = Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  Rules evolve through discussion:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• No coding knowledge required</li>
                  <li>• AI interprets intent, not syntax</li>
                  <li>• Community-driven evolution</li>
                  <li>• Everyone can participate in governance</li>
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
                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg mb-3">
                  <p className="text-sm">Proposal → Week of discussion → Vote → Implementation</p>
                  <p className="text-sm font-semibold mt-2">Total time: 2-4 weeks per change</p>
                  <p className="text-sm text-muted-foreground">Bottleneck: Human availability</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-green-600">DAHAO with AI Governance</h4>
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg mb-3">
                  <p className="text-sm">Pattern detected → AI proposes → Auto-implemented → Human review</p>
                  <p className="text-sm font-semibold mt-2">Total time: Minutes to hours</p>
                  <p className="text-sm text-muted-foreground">Bottleneck: Only your configured constraints</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
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
        <Card className="mb-16 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200">
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

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do rules work if they're not hard-coded?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rules in DAHAO are natural language instructions that LLMs interpret contextually. Each rule includes
                  parameters your branch can customize and output templates you can personalize. This makes governance
                  accessible to everyone while maintaining consistency through AI interpretation. For example, instead of
                  coding "if votes  60% then approve", you write "Proposals need 60% support to pass" and your branch
                  can adjust that threshold through discussion.
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
                <div className="text-center p-4 bg-background rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm">Some will maintain full human control</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <Bot className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm">Others will delegate extensively to AI</p>
                </div>
                <div className="text-center p-4 bg-background rounded-lg">
                  <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">Most will find their perfect balance</p>
                </div>
              </div>

              <div className="bg-background p-4 rounded-lg">
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
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div className="flex-1">
                    <strong>Choose Your Comfort Level</strong>
                    <p className="text-sm text-muted-foreground">Start conservative, increase as you learn</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex-1">
                    <strong>Customize Your Rules</strong>
                    <p className="text-sm text-muted-foreground">Modify rule parameters for your branch, set your preferred output formats, choose AI interpretation strictness</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">3</span>
                  </div>
                  <div className="flex-1">
                    <strong>Monitor and Adjust</strong>
                    <p className="text-sm text-muted-foreground">Watch how AI performs, tune parameters</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">4</span>
                  </div>
                  <div className="flex-1">
                    <strong>Share Successes</strong>
                    <p className="text-sm text-muted-foreground">Help others learn from your configuration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
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
          <Card className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">The Bottom Line</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center mb-6">
                Versioned Ethics isn't about controlling AI through restrictions. It's about empowering
                humans with precise tools to express, implement, and evolve our values at the speed of
                technological change.
              </p>

              <div className="bg-background p-6 rounded-lg text-center">
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
