'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, 
  ExternalLink, 
  Bot, 
  MessageSquare, 
  Users,
  Heart,
  ThumbsUp,
  MoreVertical,
  Play,
  BarChart3,
  Loader2
} from 'lucide-react';
import discussionsData from '@/lib/mock-data/discussions.json';
import commentsData from '@/lib/mock-data/comments.json';
import usersData from '@/lib/mock-data/users.json';
import { AgentAnalysis, AnalysisRequest } from '@/lib/ai/types';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  agentResponses?: Array<{
    agentId: string;
    agentType: 'personal' | 'system';
    agentName: string;
    analysis: string;
    confidence: number;
  }>;
  influencedByAgent?: boolean;
}

interface Discussion {
  id: string;
  elementId: string;
  elementType: 'term' | 'principle' | 'rule';
  elementName: string;
  elementVersion: string;
  comments: Comment[];
  consensusLevel: number;
  status: 'active' | 'resolved';
}

interface DiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  discussion?: Discussion;
  elementId?: string;
  elementType?: 'term' | 'principle' | 'rule';
  elementName?: string;
  elementVersion?: string;
  onAssignAgent?: () => void;
}

type LensType = 'all' | 'consensus' | 'conflict' | 'evolution' | 'agent';

// Helper function to build discussion from existing mock data
const buildDiscussionFromMockData = (elementId: string, elementName: string, elementType: 'term' | 'principle' | 'rule'): Discussion | null => {
  // Find a discussion that matches the element
  const discussionEntry = Object.values(discussionsData.discussions).find((disc: any) => 
    disc.target?.elementId === elementId
  );

  if (!discussionEntry) return null;

  // Get comments for this discussion
  const discussionComments = Object.values(commentsData.comments)
    .filter((comment: any) => comment.discussionId === discussionEntry.id)
    .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // Convert comments to our format
  const formattedComments: Comment[] = discussionComments.map((comment: any) => {
    const user = usersData.users[comment.authorId as keyof typeof usersData.users];
    
    // Convert reactions object to array format
    const reactions = Object.entries(comment.reactions || {}).map(([emoji, count]) => ({
      emoji,
      count: count as number
    }));

    // Mock agent responses for AI-generated comments
    const agentResponses = comment.aiGenerated ? [
      {
        agentId: 'system-ai-analyzer',
        agentType: 'system' as const,
        agentName: 'AI Analyzer',
        analysis: comment.content,
        confidence: 92
      }
    ] : undefined;

    return {
      id: comment.id,
      userId: comment.authorId,
      userName: user?.displayName || user?.username || 'Unknown User',
      avatar: user?.avatar || '',
      content: comment.content,
      timestamp: comment.createdAt,
      reactions,
      agentResponses,
      influencedByAgent: comment.mentions?.includes('@ai-analyzer') || false
    };
  });

  return {
    id: discussionEntry.id,
    elementId,
    elementType,
    elementName,
    elementVersion: discussionEntry.target?.version || '1.0.0',
    consensusLevel: 75, // Default consensus level
    status: discussionEntry.status === 'resolved' ? 'resolved' : 'active',
    comments: formattedComments
  };
};

// Simple fallback mock discussions for elements without discussion data
const simpleMockDiscussions: Record<string, Partial<Discussion>> = {
  'transparency': {
    elementName: 'Transparency',
    elementType: 'principle',
    consensusLevel: 85
  },
  'minimize-harm': {
    elementName: 'Minimize Harm',
    elementType: 'principle',
    consensusLevel: 92
  }
};

export function DiscussionModal({ 
  isOpen, 
  onClose, 
  discussion,
  elementId,
  elementType,
  elementName,
  elementVersion,
  onAssignAgent 
}: DiscussionModalProps) {
  const [activeLens, setActiveLens] = useState<LensType>('all');
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [realAIAnalyses, setRealAIAnalyses] = useState<AgentAnalysis[]>([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState<Set<string>>(new Set());

  // Build discussion from existing mock data or use provided discussion (memoized)
  const activeDiscussion = useMemo(() => {
    return discussion || (elementId && elementName && elementType ? 
      buildDiscussionFromMockData(elementId, elementName, elementType) : null);
  }, [discussion, elementId, elementName, elementType]);

  // Load real AI analyses for this discussion
  const loadRealAIAnalyses = useCallback(async () => {
    if (!activeDiscussion) return;

    try {
      const response = await fetch(`/api/ai/analyses?discussionId=${encodeURIComponent(activeDiscussion.id)}`);
      if (response.ok) {
        const result = await response.json();
        setRealAIAnalyses(result.analyses || []);
      }
    } catch (error) {
      console.error('Failed to load real AI analyses:', error);
    }
  }, [activeDiscussion]);

  // Request AI analysis for a comment
  const requestAIAnalysis = async (commentId: string, agentType: 'personal' | 'system', taskType: string) => {
    if (!activeDiscussion || !commentId) return;

    const loadingKey = `${commentId}-${agentType}`;
    setLoadingAnalyses(prev => new Set(prev).add(loadingKey));

    try {
      // Find the comment to get context
      const comment = activeDiscussion.comments.find(c => c.id === commentId);
      if (!comment) throw new Error('Comment not found');

      const analysisRequest: AnalysisRequest = {
        user: {
          id: 'current-user',
          name: 'Current User',
          branch: 'core-dahao',
          values: ['transparency', 'equality', 'harm-prevention']
        },
        governanceItem: {
          type: activeDiscussion.elementType,
          id: activeDiscussion.elementId,
          name: activeDiscussion.elementName,
          version: activeDiscussion.elementVersion,
          data: {
            name: activeDiscussion.elementName,
            id: activeDiscussion.elementId,
            type: activeDiscussion.elementType
          }
        },
        task: {
          agentType,
          taskType,
          context: `Analyzing comment: "${comment.content.slice(0, 100)}..."`,
          discussionId: activeDiscussion.id,
          commentId: commentId
        },
        branch: {
          id: 'core-dahao',
          name: 'Core DAHAO'
        }
      };

      // Call Claude API through API endpoint (which handles saving automatically)
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analysisRequest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Analysis request failed');
      }

      const result = await response.json();
      const analysis: AgentAnalysis = result.analysis;

      // Add to real analyses list
      setRealAIAnalyses(prev => [...prev, analysis]);

    } catch (error) {
      console.error('AI analysis failed:', error);
    } finally {
      setLoadingAnalyses(prev => {
        const newSet = new Set(prev);
        newSet.delete(loadingKey);
        return newSet;
      });
    }
  };

  // Load real AI analyses when discussion changes
  useEffect(() => {
    if (isOpen && activeDiscussion) {
      loadRealAIAnalyses();
    }
  }, [isOpen, activeDiscussion?.id, loadRealAIAnalyses]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClick = () => setShowContextMenu(false);
    if (showContextMenu) {
      document.addEventListener('click', handleClick);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [showContextMenu]);

  if (!isOpen) return null;

  const hasDiscussion = activeDiscussion && activeDiscussion.comments.length > 0;
  const displayName = activeDiscussion?.elementName || elementName || 'Unknown Element';
  const displayVersion = activeDiscussion?.elementVersion || elementVersion || '1.0.0';
  const displayType = activeDiscussion?.elementType || elementType || 'element';

  const handleContextMenu = (e: React.MouseEvent, commentId: string) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setSelectedCommentId(commentId);
    setShowContextMenu(true);
  };

  const handlePersonalAIElaborate = () => {
    if (selectedCommentId) {
      requestAIAnalysis(selectedCommentId, 'personal', 'general-analysis');
    }
    setShowContextMenu(false);
  };

  const handleSystemValidation = () => {
    if (selectedCommentId) {
      requestAIAnalysis(selectedCommentId, 'system', 'philosophical-consistency');
    }
    setShowContextMenu(false);
  };

  const handleResearchRequest = () => {
    if (selectedCommentId) {
      requestAIAnalysis(selectedCommentId, 'system', 'cross-domain-impact');
    }
    setShowContextMenu(false);
  };

  const handleLensToggle = (lens: LensType) => {
    setActiveLens(lens);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'term':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700';
      case 'principle':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
      case 'rule':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // Get real AI analyses for a specific comment
  const getRealAnalysesForComment = (commentId: string) => {
    return realAIAnalyses.filter(analysis => analysis.request.commentId === commentId);
  };

  // Combine mock and real agent responses for a comment
  const getAllAgentResponses = (comment: Comment) => {
    const mockResponses = comment.agentResponses || [];
    const realResponses = getRealAnalysesForComment(comment.id).map(analysis => ({
      agentId: analysis.execution.agentId,
      agentType: analysis.request.agentType,
      agentName: analysis.request.agentType === 'personal' ? 'Personal AI Assistant' : 'System AI Validator',
      analysis: analysis.result.analysis,
      confidence: analysis.result.confidence,
      isReal: true,
      cost: analysis.usage.cost.amount,
      tokens: analysis.usage.tokenUsage.total,
      timestamp: analysis.timeline.completedAt
    }));

    return [...mockResponses, ...realResponses];
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div 
        className="w-full max-w-6xl h-[85vh] bg-gray-900 border border-gray-700 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">{displayName}</h2>
                <p className="text-sm text-gray-400">v{displayVersion}</p>
              </div>
              <Badge variant="outline" className={getTypeColor(displayType)}>
                {displayType}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => console.log('Open in new tab')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="px-8 py-4 border-b border-gray-700/50 bg-gray-800/30">
          <div className="flex gap-3">
            {(['all', 'consensus', 'conflict', 'evolution', 'agent'] as LensType[]).map((lens) => (
              <button
                key={lens}
                onClick={() => handleLensToggle(lens)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeLens === lens
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {lens === 'all' && 'All Activity'}
                {lens === 'consensus' && 'Consensus Lens'}
                {lens === 'conflict' && 'Conflict Lens'}
                {lens === 'evolution' && 'Evolution Lens'}
                {lens === 'agent' && 'Agent Lens'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 relative overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-8">
              {hasDiscussion ? (
                // Timeline Content
                <div className="relative min-h-full">
                  {/* River Flow Background */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/20 via-blue-400/40 to-blue-400/20 transform -translate-x-1/2" />
                  
                  {/* Timeline Nodes */}
                  <div className="space-y-12">
                    {activeDiscussion.comments.map((comment, index) => (
                      <div 
                        key={comment.id} 
                        className="relative"
                        style={{ 
                          opacity: activeLens === 'agent' ? (comment.agentResponses?.length ? 1 : 0.3) : 1,
                          animationDelay: `${index * 0.2}s`
                        }}
                      >
                        {/* Human Comment */}
                        <div 
                          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 max-w-2xl mx-auto relative hover:bg-gray-800/70 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                          onContextMenu={(e) => handleContextMenu(e, comment.id)}
                          onMouseEnter={() => setHoveredElement(comment.id)}
                          onMouseLeave={() => setHoveredElement(null)}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div 
                              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold"
                              style={{ background: `linear-gradient(135deg, #${comment.userId.slice(-6)}, #${comment.userId.slice(-3)}${comment.userId.slice(-3)})` }}
                            >
                              {comment.userName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white">{comment.userName}</div>
                              <div className="text-sm text-gray-400">{formatTimeAgo(comment.timestamp)}</div>
                            </div>
                            {comment.influencedByAgent && (
                              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                                Influenced by AI
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-200 leading-relaxed mb-4">{comment.content}</p>
                          
                          {/* Comment Actions */}
                          <div className="flex items-center gap-4 pt-3 border-t border-gray-700">
                            {comment.reactions.map((reaction, idx) => (
                              <button 
                                key={idx}
                                className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors"
                              >
                                <span>{reaction.emoji}</span>
                                <span>{reaction.count}</span>
                              </button>
                            ))}
                            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              Reply
                            </button>
                            <button 
                              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-200 transition-colors ml-auto"
                              onClick={(e) => handleContextMenu(e as any, comment.id)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Agent Responses */}
                        {(() => {
                          const allResponses = getAllAgentResponses(comment);
                          return allResponses.length > 0 && (
                          <div className="relative mt-8">
                            {/* SVG Connector */}
                            <svg className="absolute left-1/2 -top-8 transform -translate-x-1/2" width="200" height="64" viewBox="0 0 200 64">
                              <defs>
                                <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgb(59 130 246 / 0.3)" />
                                  <stop offset="100%" stopColor="rgb(59 130 246 / 0.6)" />
                                </linearGradient>
                              </defs>
                              <path 
                                d="M 100 0 Q 100 32 50 32 L 20 32" 
                                stroke="url(#branchGradient)" 
                                strokeWidth="2" 
                                fill="none"
                                strokeDasharray="4 2"
                                className="animate-pulse"
                              />
                              {allResponses.length > 1 && (
                                <path 
                                  d="M 100 0 Q 100 32 150 32 L 180 32" 
                                  stroke="url(#branchGradient)" 
                                  strokeWidth="2" 
                                  fill="none"
                                  strokeDasharray="4 2"
                                  className="animate-pulse"
                                />
                              )}
                            </svg>
                            
                            {/* Agent Cards */}
                            <div className="flex gap-6 justify-center flex-wrap">
                              {allResponses.map((agent, agentIdx) => (
                                <div 
                                  key={agent.agentId}
                                  className={`max-w-xs p-4 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
                                    agent.agentType === 'personal'
                                      ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20'
                                      : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20'
                                  }`}
                                  style={{
                                    opacity: activeLens === 'agent' ? 1 : (activeLens === 'all' ? 1 : 0.7)
                                  }}
                                >
                                  <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                                      agent.agentType === 'personal' ? 'bg-orange-500/20' : 'bg-blue-500/20'
                                    }`}>
                                      <Bot className={`h-4 w-4 ${
                                        agent.agentType === 'personal' ? 'text-orange-400' : 'text-blue-400'
                                      }`} />
                                    </div>
                                    <div className="flex-1">
                                      <span className={`text-sm font-semibold ${
                                        agent.agentType === 'personal' ? 'text-orange-400' : 'text-blue-400'
                                      }`}>
                                        {agent.agentName}
                                      </span>
                                      {(agent as any).isReal && (
                                        <div className="text-xs text-green-400">
                                          Real AI • ${((agent as any).cost || 0).toFixed(4)}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{agent.analysis}</p>
                                  
                                  {/* Confidence Indicator */}
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full transition-all duration-1000 ${
                                          agent.agentType === 'personal' 
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                                            : 'bg-gradient-to-r from-blue-500 to-blue-400'
                                        }`}
                                        style={{ width: `${agent.confidence}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-400">{agent.confidence}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          );
                        })()}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Empty State
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                  {/* Animated Icon */}
                  <div className="relative w-32 h-32">
                    <div className="w-full h-full border-2 border-blue-400/30 rounded-full animate-pulse">
                      <MessageSquare className="w-16 h-16 text-blue-400/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    {/* Orbiting Particles */}
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full"
                        style={{
                          animation: `orbit 4s linear infinite`,
                          animationDelay: `${i * 1}s`,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-white">Governance Evolution Awaits</h3>
                    <p className="text-gray-400 max-w-md leading-relaxed">
                      This is where governance evolves through collective intelligence. Start a discussion, assign an agent, or both. 
                      Human insights and AI analysis work together here.
                    </p>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Start Discussion
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      onClick={onAssignAgent}
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      Assign Agent
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Consensus Meter */}
          {hasDiscussion && (
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-16 bg-gray-900/80 border border-gray-700 rounded-full p-4 text-center backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-2">Consensus</div>
              <div className="w-full h-32 bg-gray-700 rounded-full relative overflow-hidden">
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                  style={{ height: `${activeDiscussion.consensusLevel}%` }}
                />
              </div>
              <div className="text-sm font-semibold text-green-400 mt-2">{activeDiscussion.consensusLevel}%</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between">
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Play className="h-4 w-4 mr-2" />
              See Evolution
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analysis Mode
            </Button>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add Your Voice
          </Button>
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div 
          className="fixed bg-gray-900 border border-gray-700 rounded-lg py-2 min-w-48 shadow-xl z-60"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            onClick={handlePersonalAIElaborate}
            disabled={selectedCommentId ? loadingAnalyses.has(`${selectedCommentId}-personal`) : false}
          >
            {selectedCommentId && loadingAnalyses.has(`${selectedCommentId}-personal`) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            Ask Personal AI to elaborate
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            onClick={handleSystemValidation}
            disabled={selectedCommentId ? loadingAnalyses.has(`${selectedCommentId}-system`) : false}
          >
            {selectedCommentId && loadingAnalyses.has(`${selectedCommentId}-system`) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            Request System validation
          </button>
          <button 
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
            onClick={handleResearchRequest}
            disabled={selectedCommentId ? loadingAnalyses.has(`${selectedCommentId}-system`) : false}
          >
            {selectedCommentId && loadingAnalyses.has(`${selectedCommentId}-system`) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
            Get research on this point
          </button>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes orbit {
          from { 
            transform: translate(-50%, -50%) rotate(0deg) translateX(60px) rotate(0deg); 
          }
          to { 
            transform: translate(-50%, -50%) rotate(360deg) translateX(60px) rotate(-360deg); 
          }
        }
      `}</style>
    </div>
  );
}