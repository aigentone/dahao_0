'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Users, 
  MessageSquare, 
  Brain, 
  TrendingUp,
  Vote,
  Share,
  Bell,
  BarChart3,
  Shield,
  BookOpen,
  Zap,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { GovernanceData, GovernanceDiscussion } from '@/types/governance';
import { DiscussionParser } from '@/lib/discussion-parser';

export default function DiscussionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
  const [discussion, setDiscussion] = useState<GovernanceDiscussion | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscussionData();
  }, [params.id]);

  const fetchDiscussionData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/governance');
      if (response.ok) {
        const data = await response.json();
        setGovernanceData(data);
        
        // Find the specific discussion
        const allDiscussions = data.organizations.flatMap((org: any) => 
          org.discussions.map((d: any) => ({ ...d, orgId: org.id, orgName: org.name }))
        );
        
        const foundDiscussion = allDiscussions.find((d: any) => 
          d.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === params.id ||
          d.filename === `${params.id}.md` ||
          d.title.toLowerCase().includes(decodeURIComponent(params.id as string).toLowerCase())
        );
        
        setDiscussion(foundDiscussion || null);
      }
    } catch (error) {
      console.error('Error fetching discussion data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Discussion Not Found</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Parse discussion data
  const parsedDiscussion = DiscussionParser.parseDiscussion(discussion, 0);
  const votingData = DiscussionParser.parseVotingData(discussion);
  const metrics = DiscussionParser.parseDiscussionMetrics(discussion);

  // Parse comments from content
  const parseComments = (content: string) => {
    const lines = content.split('\n');
    const comments = [];
    let currentComment = null;
    
    for (const line of lines) {
      const commentMatch = line.match(/\*\*@([a-zA-Z0-9_-]+)(?:\s*\(([^)]+)\))?\*\*/);
      if (commentMatch) {
        if (currentComment) {
          comments.push(currentComment);
        }
        currentComment = {
          author: commentMatch[1],
          type: commentMatch[2] || 'Human',
          content: '',
          timestamp: ''
        };
      } else if (line.match(/^\*\d+\s*(days?|hours?|minutes?)\s*ago\*/)) {
        if (currentComment) {
          currentComment.timestamp = line.replace(/^\*/, '').replace(/\*$/, '');
        }
      } else if (currentComment && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
        currentComment.content += line + '\n';
      }
    }
    
    if (currentComment) {
      comments.push(currentComment);
    }
    
    return comments;
  };

  const comments = parseComments(discussion.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => router.push('/')} className="hover:text-blue-600">Home</button>
          <span>›</span>
          <button onClick={() => router.push('/forum')} className="hover:text-blue-600">Forum</button>
          <span>›</span>
          <button onClick={() => router.push('/forum')} className="hover:text-blue-600">
            {(discussion as any).orgName || 'Animal Welfare'}
          </button>
          <span>›</span>
          <span className="truncate max-w-xs">{discussion.title}</span>
        </div>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge className="bg-orange-500 text-white flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  {discussion.status}
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  {parsedDiscussion.category}
                </Badge>
                <Badge className="bg-red-100 text-red-700">
                  🔥 Hot Topic
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{discussion.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{discussion.summary}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {discussion.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">@{discussion.author}</div>
                    <div className="text-xs">Proposal Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Created {discussion.created}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{parsedDiscussion.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{metrics.participants}</h3>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{metrics.comments}</h3>
                <p className="text-sm text-gray-600">Comments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{metrics.aiAnalyses}</h3>
                <p className="text-sm text-gray-600">AI Analyses</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {votingData ? Math.round((votingData.humanApproval + votingData.aiApproval) / 2) : 85}%
                </h3>
                <p className="text-sm text-gray-600">Consensus</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Voting Section */}
            {votingData && (
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  Voting Progress
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span><strong>Human Votes</strong> ({votingData.totalVotes || 15}/20 voted)</span>
                      <span className="text-green-600 font-semibold">{votingData.humanApproval}% Approval</span>
                    </div>
                    <Progress value={votingData.humanApproval} className="h-3" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span><strong>AI Agent Consensus</strong> ({metrics.aiAnalyses}/4 analyzed)</span>
                      <span className="text-blue-600 font-semibold">{votingData.aiApproval}% Approval</span>
                    </div>
                    <Progress value={votingData.aiApproval} className="h-3" />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Vote Approve
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Vote Reject
                  </Button>
                </div>
              </div>
            )}

            {/* Discussion Content */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-b from-gray-50 to-white p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  📋 Summary
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-6">{discussion.summary}</p>
                
                {/* Discussion Thread */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    💬 Discussion
                  </h3>
                  
                  {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={comment.type === 'AI Agent' ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-br from-blue-500 to-green-500 text-white'}>
                            {comment.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">@{comment.author}</span>
                            <Badge 
                              variant="outline" 
                              className={comment.type === 'AI Agent' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}
                            >
                              {comment.type}
                            </Badge>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <div className="text-gray-700">
                            <p className="whitespace-pre-wrap">{comment.content.trim()}</p>
                            {comment.type === 'AI Agent' && comment.content.includes('analysis') && (
                              <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-sm text-blue-800">
                                  {comment.content.includes('✅') && <div>✅ Analysis indicates approval</div>}
                                  {comment.content.includes('💡') && <div>💡 Technical recommendations provided</div>}
                                  {comment.content.includes('🔧') && <div>🔧 Implementation details analyzed</div>}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Agent Assignment */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🤖 AI Agent Analysis
              </h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: '⚖️', name: 'Ethics Agent', active: true },
                  { icon: '🧠', name: 'Claude Code', active: false },
                  { icon: '🐾', name: 'Animal Expert', active: true },
                  { icon: '💻', name: 'Tech Analyst', active: false }
                ].map((agent, index) => (
                  <div 
                    key={index}
                    className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${
                      agent.active 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{agent.icon}</div>
                    <div className="text-xs font-medium">{agent.name}</div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full">
                Request New Analysis
              </Button>
            </div>

            {/* Related Principles */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Related Principles
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Five Freedoms v1.0', desc: 'Core animal welfare framework' },
                  { name: 'Emergency Care Protocol v1.0', desc: 'Rapid response framework' },
                  { name: 'Transparency v1.1', desc: 'Open and auditable processes' }
                ].map((principle, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <div className="font-medium text-sm mb-1">{principle.name}</div>
                    <div className="text-xs text-gray-600">{principle.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Follow Updates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}