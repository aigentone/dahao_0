import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  MessageSquare,
  Users,
  TrendingUp,
  GitBranch,
  Brain,
  Sparkles,
  ChevronRight,
  Clock,
  Eye,
  ThumbsUp,
  BarChart3,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

export default function ForumMockup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" />

        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Where Ideas Evolve Through Collective Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                DAHAO Ideas Hub
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore living governance systems that adapt and grow through human-AI collaboration.
              Each DAHAO is an idea brought to life by its community.
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas, principles, or discussions..."
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button className="px-6 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-6 mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">3</span>
              </div>
              <p className="text-sm text-gray-600">Active DAHAOs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">247</span>
              </div>
              <p className="text-sm text-gray-600">Contributors</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">18</span>
              </div>
              <p className="text-sm text-gray-600">Active Discussions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-3xl font-bold text-gray-900">89%</span>
              </div>
              <p className="text-sm text-gray-600">Consensus Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Organization Cards */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active DAHAOs</h2>

            {/* Core Governance Card */}
            <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      Core Governance
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Foundational principles inherited by all domain DAHAOs
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-blue-100 text-blue-700 border-0">v1.1</Badge>
                      <Badge variant="outline" className="text-xs">4 principles</Badge>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        3 active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        1.2k views
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        89 members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
            </div>

            {/* Animal Welfare Card */}
            <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">
                  <Zap className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🐾</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                      Animal Welfare
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Specialized governance for animal welfare initiatives worldwide
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-100 text-green-700 border-0">v1.0</Badge>
                      <Badge variant="outline" className="text-xs">6 principles</Badge>
                      <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
                        5 active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        3.4k views
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        156 members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
            </div>

            {/* Environment Card */}
            <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                      Environment
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Environmental protection and sustainability governance
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-purple-100 text-purple-700 border-0">v1.2</Badge>
                      <Badge variant="outline" className="text-xs">5 principles</Badge>
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        2 active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        892 views
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        67 members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </div>
            </div>

            {/* Create New DAHAO CTA */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 border-dashed">
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-700 mb-2">Have an idea?</h4>
                <p className="text-sm text-gray-500 mb-4">Start your own DAHAO and build a community</p>
                <Button variant="outline" className="w-full">
                  Create New DAHAO
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Selected DAHAO Details */}
          <div className="lg:col-span-8">
            {/* Selected DAHAO Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🐾</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Animal Welfare DAHAO</h1>
                    <p className="text-gray-600">Protecting and improving animal lives globally</p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">156</span>
                  <p className="text-xs text-gray-600 mt-1">Members</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">6</span>
                  <p className="text-xs text-gray-600 mt-1">Principles</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">24</span>
                  <p className="text-xs text-gray-600 mt-1">Proposals</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl font-bold text-gray-900">87%</span>
                  <p className="text-xs text-gray-600 mt-1">Consensus</p>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="discussions" className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full bg-gray-100/50 p-1 rounded-xl">
                <TabsTrigger value="discussions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="principles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Principles
                </TabsTrigger>
                <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Agents
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Discussions Tab */}
              <TabsContent value="discussions" className="space-y-4">
                {/* Featured Discussion */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-500 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Hot Topic
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 border-0">Active Voting</Badge>
                    </div>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      2 days left
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Turkey Municipal Veterinary System for Street Animals
                  </h3>

                  <p className="text-gray-600 mb-4">
                    Proposal to establish a transparent, blockchain-verified system for Turkish municipal
                    veterinary services to manage street animal care, track treatments, and enable direct donations.
                  </p>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>TW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">@turkey_welfare_advocate</p>
                        <p className="text-xs text-gray-500">Proposal Author</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        24 participants
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        18 comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        3 AI analyses
                      </span>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Human Votes</span>
                      <span className="text-green-600 font-medium">75% Approval</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '75%' }} />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">AI Agent Consensus</span>
                      <span className="text-blue-600 font-medium">92% Approval</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1">
                      View Full Discussion
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Vote
                    </Button>
                  </div>
                </div>

                {/* Other Discussions */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 mb-3">Recent Discussions</h4>

                  {/* Discussion Item 1 */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Five Freedoms</Badge>
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">Under Review</Badge>
                      </div>
                      <span className="text-xs text-gray-500">3 hours ago</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Outdoor Access Requirements for Farm Animals</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Mandatory outdoor access for all farm animal welfare certifications, with minimum
                      daily requirements based on species-specific needs.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        12 participants
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        8 comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        2 AI analyses
                      </span>
                    </div>
                  </div>

                  {/* Discussion Item 2 */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Emergency Care</Badge>
                        <Badge className="bg-gray-100 text-gray-700 border-0 text-xs">Draft</Badge>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">24/7 Emergency Response Protocol</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Framework for rapid response to animal welfare emergencies including life-threatening
                      conditions and disaster scenarios.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        6 participants
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        4 comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        1 AI analysis
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Other tabs would go here... */}
            </Tabs>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button className="rounded-full w-14 h-14 shadow-lg">
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
