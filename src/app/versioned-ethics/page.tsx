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
  Bot, Gauge, MessageCircle, Target,
  Lock, Unlock, Timer, Settings, PlayCircle, PauseCircle,
  GraduationCap,
  Leaf,
  Microscope,
  Code,
  Database,
  Building,
  AlertCircle
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
          subtitle="How AI Understands Your Rules Exactly as You Intend"
          description="Imagine governance where AI understands your rules exactly as you intend. DAHAO enriches natural language rules with versioned terms and principles, enabling precise execution that respects your community's unique context. Write rules naturally, and AI interprets them with perfect understanding of your community's values."
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
              as precise as versioned definitions, and as contextual as community values.</strong>
            </p>
            <p className="mb-6">
              Instead of rigid programmatic rules, DAHAO uses natural language rules enriched with versioned terms that AI interprets contextually.
              This means your community can evolve its governance through discussion, with AI understanding exactly what you mean.
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

        {/* The Power of Versioned Context */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">The Power of Versioned Context</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Why Versioning Matters Beyond Updates</CardTitle>
              <CardDescription>Versioning in DAHAO captures different interpretations, not just updates—enabling the same term to mean different things to different communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <History className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Temporal Evolution</h4>
                  <div className="text-xs space-y-1 text-left">
                    <p><strong>@privacy@1.0.0 (2020):</strong><br />"Personal data protection"</p>
                    <p><strong>@privacy@2.0.0 (2023):</strong><br />"Including AI training data rights"</p>
                    <p><strong>@privacy@3.0.0 (2025):</strong><br />"Biometric and neural pattern protection"</p>
                  </div>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GitBranch className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Cultural Variations</h4>
                  <div className="text-xs space-y-1 text-left">
                  <p><strong>@harm (Core DAHAO):</strong><br />"Physical, psychological, or economic damage to individuals or communities"</p>

                  <p><strong>@harm (Animal Protection):</strong><br />"Pain, distress, habitat loss, or inability to express natural behaviors"</p>

                  <p><strong>@harm (Creative Commons):</strong><br />"Plagiarism, artistic censorship, or denial of fair creative compensation"</p>
                  </div>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Contextual Precision</h4>
                  <div className="text-xs space-y-1 text-left">
                    <p>When a rule references <strong>@harm</strong>, AI uses YOUR branch's specific interpretation.</p>
                    <p className="mt-2">AI understands exactly what YOUR community means by "harm."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Terms + Principles = Precise Execution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-6 rounded-lg border">
                <h4 className="font-semibold mb-4">Rule Example: "Minimize harm in all decisions"</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <h5 className="font-semibold text-sm text-blue-600 mb-2">Which @harm?</h5>
                    <p className="text-xs">→ Your branch's version</p>
                    <p className="text-xs text-muted-foreground">Could be physical, psychological, environmental, or spiritual depending on your community</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <h5 className="font-semibold text-sm text-green-600 mb-2">Guided by?</h5>
                    <p className="text-xs">→ #harm-minimization principle</p>
                    <p className="text-xs text-muted-foreground">Your community's approach to balancing competing interests</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <h5 className="font-semibold text-sm text-purple-600 mb-2">Result:</h5>
                    <p className="text-xs">→ AI interprets exactly as your community intends</p>
                    <p className="text-xs text-muted-foreground">Same rule, different interpretation based on context</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Rules, Your Control */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Your Rules, Your Control</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Permission Levels for AI-Assisted Governance</CardTitle>
              <CardDescription>Choose how much AI assistance you want in interpreting your natural language rules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <strong>Manual Approval Mode</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI interprets rules and suggests actions</li>
                      <li>• You approve each interpretation</li>
                      <li>• Full human oversight</li>
                      <li>• Maximum control over rule execution</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <strong>Supervised Interpretation</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI interprets routine rules automatically</li>
                      <li>• Pause for complex interpretations</li>
                      <li>• You review decisions daily</li>
                      <li>• Balanced control and contextual understanding</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <strong>Trusted Interpretation</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI interprets rules autonomously</li>
                      <li>• Alert only on rule conflicts</li>
                      <li>• You set interpretation boundaries</li>
                      <li>• High contextual understanding, oversight when needed</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-5 w-5 text-orange-600" />
                      <strong>Full Delegation</strong>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• AI interprets complex rule interactions</li>
                      <li>• Learn from interpretation outcomes</li>
                      <li>• You maintain override authority</li>
                      <li>• Maximum contextual understanding, strategic oversight</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Rule Interpretation in Practice</CardTitle>
              <CardDescription>See how different interpretation levels handle the same natural language rule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-4 rounded-lg border mb-4">
                <h4 className="font-semibold mb-2">Rule: "New members should align with our @community-values"</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded border-l-4 border-blue-500">
                    <h5 className="font-semibold text-sm text-blue-700 dark:text-blue-300">Manual Approval</h5>
                    <p className="text-xs text-muted-foreground">AI suggests: "Based on @community-values definition, this member aligns" → You review interpretation → You decide</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded border-l-4 border-purple-500">
                    <h5 className="font-semibold text-sm text-purple-700 dark:text-purple-300">Supervised Interpretation</h5>
                    <p className="text-xs text-muted-foreground">AI interprets @community-values → If clear match, approve → If ambiguous, pause for human review</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded border-l-4 border-green-500">
                    <h5 className="font-semibold text-sm text-green-700 dark:text-green-300">Trusted Interpretation</h5>
                    <p className="text-xs text-muted-foreground">AI applies @community-values interpretation → Auto-approve most → Alert only on edge cases</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded border-l-4 border-orange-500">
                    <h5 className="font-semibold text-sm text-orange-700 dark:text-orange-300">Full Delegation</h5>
                    <p className="text-xs text-muted-foreground">AI interprets nuanced @community-values → Learns from outcomes → Refines understanding → You monitor trends</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rules as Living Instructions */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Rules as Living Instructions</h2>

          {/* From Static Text to AI-Understood Rules */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">From Static Text to AI-Understood Rules</CardTitle>
              <CardDescription>Transform community rules into enriched natural language that AI interprets with perfect contextual understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 text-red-600">Traditional: Just Text</h3>
                  <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                      "Proposals need 60% approval"
                    </p>
                    <div className="text-xs text-red-600 dark:text-red-400 space-y-1">
                      <p>• Manual vote counting</p>
                      <p>• Human interpretation required</p>
                      <p>• Inconsistent enforcement</p>
                      <p>• No automatic actions</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 text-green-600">DAHAO: Enriched Natural Language</h3>
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 dark:text-green-200 mb-3 font-semibold">
                      "Proposals need @fair approval before implementation"
                    </p>
                    <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                      <p>✅ AI interprets @fair using your branch's definition</p>
                      <p>✅ Understands context perfectly</p>
                      <p>✅ Applies #democratic-participation principle</p>
                      <p>✅ Respects community-specific thresholds</p>
                      <p>✅ No ambiguity in execution</p>
                      <p>✅ Same rule, precise interpretation across branches</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Ways to Create Rules */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Two Ways to Create Rules</CardTitle>
              <CardDescription>Choose the method that works best for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Natural Language</h4>
                  <p className="text-sm text-muted-foreground mb-3">Primary Method</p>
                  <ul className="text-xs space-y-1 text-left">
                    <li>• Write rules as you naturally speak</li>
                    <li>• Reference @terms and #principles inline</li>
                    <li>• AI understands context perfectly</li>
                    <li>• No technical knowledge needed</li>
                  </ul>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Templates</h4>
                  <p className="text-sm text-muted-foreground mb-3">Quick Start</p>
                  <ul className="text-xs space-y-1 text-left">
                    <li>• Pre-written patterns to adapt</li>
                    <li>• Learn by example</li>
                    <li>• Customize for your community</li>
                    <li>• Common governance scenarios</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Natural Language Rule Example */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Natural Language Rule Interpretation</CardTitle>
              <CardDescription>How AI understands your rules through versioned context</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border mb-4">
                <h4 className="font-semibold mb-3 text-center">Rule: "Proposals need @community-consensus before implementation"</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <h5 className="font-semibold mb-3 text-blue-700">Democracy-Focused Branch</h5>
                  <div className="space-y-2 text-sm">
                    <div><strong>@community-consensus</strong> = "60% approval"</div>
                    <div className="mt-3">
                      <strong>AI Understanding:</strong>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground mt-1">
                        <li>• Count all member votes</li>
                        <li>• Require 60% yes votes</li>
                        <li>• Simple majority focus</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <h5 className="font-semibold mb-3 text-green-700">Consensus-Focused Branch</h5>
                  <div className="space-y-2 text-sm">
                    <div><strong>@community-consensus</strong> = "no strong objections"</div>
                    <div className="mt-3">
                      <strong>AI Understanding:</strong>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground mt-1">
                        <li>• Check for blocking concerns</li>
                        <li>• Allow discussion time</li>
                        <li>• Consensus-building focus</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg border">
                <p className="text-sm text-center">
                  <strong>Same rule, different interpretations</strong> — AI uses your versioned @terms to understand exactly what your community means, no visual configuration needed.
                </p>
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
                    <RefreshCw className="h-8 w-8 text-purple-600" />
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

        {/* How AI Interprets Your Rules */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How AI Interprets Your Rules</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Context Resolution and Rule Understanding</CardTitle>
              <CardDescription>How AI uses versioned terms and principles to interpret your natural language rules with perfect contextual understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-blue-700">Context Resolution</h4>
                  <ul className="text-xs space-y-1 text-left">
                    <li>• Which version of @terms to use</li>
                    <li>• Branch-specific definitions</li>
                    <li>• Temporal context awareness</li>
                    <li>• Cultural interpretation nuances</li>
                  </ul>
                </div>

                <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-green-700">Principle Application</h4>
                  <ul className="text-xs space-y-1 text-left">
                    <li>• How #principles guide decisions</li>
                    <li>• Balancing competing values</li>
                    <li>• Community-specific priorities</li>
                    <li>• Consistent ethical framework</li>
                  </ul>
                </div>

                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GitBranch className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-purple-700">Branch-Specific Interpretation</h4>
                  <ul className="text-xs space-y-1 text-left">
                    <li>• Same rule, different meanings</li>
                    <li>• Community sovereignty respected</li>
                    <li>• Local context preserved</li>
                    <li>• Personal interpretations coexist</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Branch Context Execution Example</CardTitle>
              <CardDescription>How the same rule works differently in different branches based on their specific @term definitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border">
                  <h4 className="font-semibold mb-3 text-center">Natural Language Rule: "Content moderation should minimize @harm"</h4>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200">
                    <h5 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      Core DAHAO Branch
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div><strong>@harm</strong> = "violence, hate speech"</div>
                      <div><strong>AI Interpretation:</strong></div>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground">
                        <li>• Remove content with violence</li>
                        <li>• Flag hate speech immediately</li>
                        <li>• Standard community safety approach</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200">
                    <h5 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      Art Community DAHAO
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div><strong>@harm</strong> = "violence, hate speech"</div>
                      <div><strong>@artistic-expression</strong> = exception</div>
                      <div><strong>AI Interpretation:</strong></div>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground">
                        <li>• Allow artistic content even if violent</li>
                        <li>• Context-aware artistic evaluation</li>
                        <li>• Creative freedom prioritized</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200">
                    <h5 className="font-semibold mb-3 text-purple-700 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      Research DAHAO
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div><strong>@harm</strong> = "misinformation, unethical research"</div>
                      <div><strong>@educational-content</strong> = protected</div>
                      <div><strong>AI Interpretation:</strong></div>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground">
                        <li>• Focus on factual accuracy</li>
                        <li>• Protect educational discussions</li>
                        <li>• Research integrity prioritized</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200">
                    <h5 className="font-semibold mb-3 text-orange-700 flex items-center gap-2">
                      <GitBranch className="h-4 w-4" />
                      Gaming Community DAHAO
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div><strong>@harm</strong> = "doxxing, harassment, cheating"</div>
                      <div><strong>@competitive-banter</strong> = allowed</div>
                      <div><strong>AI Interpretation:</strong></div>
                      <ul className="ml-4 space-y-1 text-xs text-muted-foreground">
                        <li>• Allow competitive trash talk</li>
                        <li>• Strict on personal information</li>
                        <li>• Gaming culture considerations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border">
                  <p className="text-sm text-center">
                    <strong>Same rule, different execution</strong> — AI understands each community's unique context through versioned terms,
                    enabling precise interpretation without requiring separate implementations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-World Scenarios */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Real-World Scenarios</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Scenario 1 - Featured style */}
            <Card className="col-span-full bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Animal Welfare DAHAO</CardTitle>
                      <CardDescription className="text-red-700 dark:text-red-300">Tracking and preventing animal abuse through community action</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">Featured</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Settings className="h-4 w-4 text-red-600" />
                        Configuration:
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                          <Database className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Maintains verified abuse reports database</span>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                          <Building className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Tracks companies with abuse history</span>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                          <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">AI verifies evidence and patterns</span>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white/60 dark:bg-gray-800/60 rounded">
                          <Users className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Coordinates boycotts and campaigns</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        Result:
                      </h4>
                      <div className="p-4 bg-green-50/80 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                          Transparent tracking of animal abuse cases creates accountability. Companies face
                          immediate community response. AI helps verify claims to prevent false reports while
                          ensuring real abuse is documented and acted upon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example Actions */}
                <div className="mt-4 p-3 bg-yellow-50/80 dark:bg-yellow-950/30 rounded-lg">
                  <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-600" />
                    Example Actions:
                  </h5>
                  <div className="grid md:grid-cols-2 gap-2 text-xs">
                    <div>• "Factory farm violation" → Investigation protocol activated</div>
                    <div>• "Lab testing on animals" → Company added to watchlist</div>
                    <div>• "Pattern detected at supplier" → Supply chain alert issued</div>
                    <div>• "Evidence verified" → Boycott campaign coordinated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenario 2 - Compact style */}
            <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Microscope className="h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Research Collective DAHAO</CardTitle>
                </div>
                <CardDescription className="text-xs">Accelerating peer review while maintaining rigor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-lg">
                  <h4 className="font-medium text-xs text-purple-700 dark:text-purple-300 mb-2">Key Features:</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>• AI validates methodology against standards</li>
                    <li>• Quick pre-review for obvious issues</li>
                    <li>• AI matches papers with expert reviewers</li>
                    <li>• Human experts make final decisions</li>
                  </ul>
                </div>
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-purple-600">Impact:</strong> Review time drops from months to weeks.
                    AI catches methodological flaws early, experts focus on novel insights.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Scenario 3 - Icon-focused style */}
            <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Local Farming Cooperative</CardTitle>
                <CardDescription className="text-xs">Sustainable agriculture coordination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded">
                    <MessageCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Weather AI</p>
                  </div>
                  <div className="text-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded">
                    <RefreshCw className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Auto Sharing</p>
                  </div>
                  <div className="text-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded">
                    <Vote className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Crop Voting</p>
                  </div>
                  <div className="text-center p-2 bg-green-50/50 dark:bg-green-950/20 rounded">
                    <AlertTriangle className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Disease Alert</p>
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Farmers optimize yields while maintaining community control. Local food security improves.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scenario 4 - Timeline style */}
          <Card className="mt-6 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 text-orange-600" />
                  <div>
                    <CardTitle className="text-xl">Educational Community DAHAO</CardTitle>
                    <CardDescription>Personalizing learning while maintaining standards</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">Learning Path</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center text-center p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-orange-600">1</span>
                    </div>
                    <h5 className="text-xs font-medium mb-1">AI Adaptation</h5>
                    <p className="text-xs text-muted-foreground">Content adapts to learning styles</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-orange-600">2</span>
                    </div>
                    <h5 className="text-xs font-medium mb-1">Standards</h5>
                    <p className="text-xs text-muted-foreground">Community defines quality</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-orange-600">3</span>
                    </div>
                    <h5 className="text-xs font-medium mb-1">Tracking</h5>
                    <p className="text-xs text-muted-foreground">Automated progress monitoring</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-orange-600">4</span>
                    </div>
                    <h5 className="text-xs font-medium mb-1">Mentorship</h5>
                    <p className="text-xs text-muted-foreground">Human guidance for complex topics</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-center">
                    <strong className="text-orange-700 dark:text-orange-300">Outcome:</strong>
                    <span className="text-muted-foreground ml-2">
                      Each learner gets personalized path while meeting community standards.
                      AI handles routine assessment, teachers focus on inspiration and guidance.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <CardTitle className="text-lg">How do natural language rules work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When you write a rule like "Proposals need @community-discussion before voting," DAHAO enriches your natural language rule with versioned terms. The AI interprets your rule using your branch's specific definitions of @community-discussion to execute exactly as your community intends. No coding or visual workflows required—just write rules naturally and AI understands the context.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the difference between Terms and Principles?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Terms (@) are versioned concepts your community defines (like @harm or @fairness) that provide precise context and meaning. Principles (#) are the foundational guidelines that help AI interpret your rules consistently. When AI executes your natural language rules, it uses your branch's specific term definitions and principle guidelines to understand exactly what you intend.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I create complex governance without coding?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! Write sophisticated governance rules in natural language, enriched with versioned @terms and #principles. DAHAO's AI interprets your intentions precisely using your community's context. Pre-built rule templates help you start quickly, and you can create complex multi-step governance behaviors through natural conversation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a visual interface?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  While DAHAO focuses on natural language governance, there is an optional visual builder available for those who prefer it. However, it's not needed for most use cases—the core power of DAHAO comes from writing rules naturally and having AI interpret them with perfect contextual understanding through your versioned terms. The visual interface is simply a helper tool for advanced users who want to visualize complex rule interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50  dark:bg-gradient-to-r from-black-50 to-blue-900/30">
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
                Your values become natural language rules. Your versioned terms eliminate ambiguity. Your principles guide AI interpretation. Write naturally, and AI executes with your community's exact understanding—no workflows or coding required.
              </p>

              <div className="bg-background p-6 rounded-lg text-center">
                <p className="text-xl font-semibold mb-4">
                  Write rules naturally. Define terms precisely. AI interprets with your context.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                    <h4 className="font-semibold text-blue-600 mb-1">Your Values</h4>
                    <p className="text-muted-foreground">Become natural language rules</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded">
                    <h4 className="font-semibold text-green-600 mb-1">Versioned Terms</h4>
                    <p className="text-muted-foreground">Eliminate ambiguity</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                    <h4 className="font-semibold text-purple-600 mb-1">Your Principles</h4>
                    <p className="text-muted-foreground">Guide AI interpretation</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg">
                <p className="font-semibold mb-2">The Promise of Natural Language Governance:</p>
                <p className="text-muted-foreground">
                  Human wisdom interpreted with perfect context at the speed of conversation. Create sophisticated governance through natural language, maintain control through versioned definitions, and evolve rules through community discussion—no technical knowledge required.
                </p>
              </div>
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

          </div>

          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Badge className="mb-3">Phase 1 Active</Badge>
              <p className="text-sm text-muted-foreground">
              No tokens needed - just ideas. We're using DAHAO to build DAHAO, creating the first self-improving governance system through community collaboration.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
