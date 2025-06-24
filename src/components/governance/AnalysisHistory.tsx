'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, ChevronDown, Clock, DollarSign, User, Shield, TrendingUp } from 'lucide-react';
import { AgentAnalysis } from '@/lib/ai/types';

interface AnalysisHistoryProps {
  elementId: string;
  elementType: 'term' | 'principle' | 'rule';
  onViewAnalysis?: (analysis: AgentAnalysis) => void;
}

export default function AnalysisHistory({ 
  elementId, 
  elementType, 
  onViewAnalysis 
}: AnalysisHistoryProps) {
  const [analyses, setAnalyses] = useState<AgentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAnalyses, setExpandedAnalyses] = useState<Set<string>>(new Set());

  const fetchAnalyses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/ai/analyses?elementId=${encodeURIComponent(elementId)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analysis history');
      }

      const result = await response.json();
      setAnalyses(result.analyses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [elementId]);

  useEffect(() => {
    fetchAnalyses();
  }, [fetchAnalyses]);

  const toggleAnalysis = (analysisId: string) => {
    const newExpanded = new Set(expandedAnalyses);
    if (newExpanded.has(analysisId)) {
      newExpanded.delete(analysisId);
    } else {
      newExpanded.add(analysisId);
    }
    setExpandedAnalyses(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Loading analysis history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-sm text-red-600">
        Error loading analysis history: {error}
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        No AI analyses have been performed on this {elementType} yet.
      </div>
    );
  }

  // Group analyses by agent type
  const personalAnalyses = analyses.filter(a => a.request.agentType === 'personal');
  const systemAnalyses = analyses.filter(a => a.request.agentType === 'system');

  // Calculate statistics
  const totalCost = analyses.reduce((sum, a) => sum + a.usage.cost.amount, 0);
  const avgConfidence = analyses.reduce((sum, a) => sum + a.result.confidence, 0) / analyses.length;
  const totalTokens = analyses.reduce((sum, a) => sum + a.usage.tokenUsage.total, 0);

  return (
    <div className="space-y-4">
      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 dark:bg-gray-950 border rounded-lg">
        <div className="text-center">
          <div className="text-sm font-medium">{analyses.length}</div>
          <div className="text-xs text-muted-foreground">Analyses</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">${totalCost.toFixed(3)}</div>
          <div className="text-xs text-muted-foreground">Total Cost</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">{Math.round(avgConfidence)}%</div>
          <div className="text-xs text-muted-foreground">Avg Confidence</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">{totalTokens.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Tokens</div>
        </div>
      </div>

      {/* Analysis List */}
      <div className="space-y-3">
        {analyses.map((analysis) => {
          const isExpanded = expandedAnalyses.has(analysis.id);
          
          return (
            <Card key={analysis.id} className="overflow-hidden">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={() => toggleAnalysis(analysis.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {analysis.request.agentType === 'personal' ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-green-600" />
                    )}
                    <CardTitle className="text-sm font-medium">
                      {analysis.request.agentType === 'personal' ? 'Personal AI' : 'System AI'} Analysis
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {analysis.result.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">
                      ${analysis.usage.cost.amount.toFixed(4)}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                
                <CardDescription className="text-left">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(analysis.timeline.completedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bot className="w-3 h-3" />
                      {analysis.request.taskType.replace('-', ' ').toUpperCase()}
                    </span>
                    <span>by {analysis.requestedBy.userName}</span>
                  </div>
                </CardDescription>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Analysis Text */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-lg">
                        <h5 className="font-medium mb-2 text-sm">Analysis</h5>
                        <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                          {analysis.result.analysis.length > 500 && !isExpanded 
                            ? `${analysis.result.analysis.slice(0, 500)}...`
                            : analysis.result.analysis
                          }
                        </div>
                      </div>

                      {/* Recommendations */}
                      {analysis.result.recommendations.length > 0 && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <h5 className="font-medium mb-2 text-sm">Recommendations</h5>
                          <ul className="text-sm space-y-1">
                            {analysis.result.recommendations.map((rec, i) => (
                              <li key={i} className="text-blue-800 dark:text-blue-200">
                                • {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Concerns */}
                      {analysis.result.concerns && analysis.result.concerns.length > 0 && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                          <h5 className="font-medium mb-2 text-sm">Concerns</h5>
                          <ul className="text-sm space-y-1">
                            {analysis.result.concerns.map((concern, i) => (
                              <li key={i} className="text-yellow-800 dark:text-yellow-200">
                                • {concern}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technical Details */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-gray-950 rounded-lg text-xs">
                        <div>
                          <div className="font-medium">Model</div>
                          <div className="text-muted-foreground">{analysis.execution.modelVersion}</div>
                        </div>
                        <div>
                          <div className="font-medium">Duration</div>
                          <div className="text-muted-foreground">{analysis.timeline.duration}ms</div>
                        </div>
                        <div>
                          <div className="font-medium">Tokens</div>
                          <div className="text-muted-foreground">
                            {analysis.usage.tokenUsage.input}↑ {analysis.usage.tokenUsage.output}↓
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Cost</div>
                          <div className="text-muted-foreground">
                            ${analysis.usage.cost.amount.toFixed(4)}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {onViewAnalysis && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewAnalysis(analysis)}
                          >
                            View Full Analysis
                          </Button>
                        )}
                      </div>
                    </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Agent Type Summary */}
      {(personalAnalyses.length > 0 || systemAnalyses.length > 0) && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Personal AI</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {personalAnalyses.length} analyses • 
              Avg confidence: {personalAnalyses.length > 0 
                ? Math.round(personalAnalyses.reduce((sum, a) => sum + a.result.confidence, 0) / personalAnalyses.length)
                : 0}%
            </div>
          </div>
          
          <div className="p-3 bg-green-50 dark:bg-green-950 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="font-medium">System AI</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {systemAnalyses.length} analyses • 
              Avg confidence: {systemAnalyses.length > 0 
                ? Math.round(systemAnalyses.reduce((sum, a) => sum + a.result.confidence, 0) / systemAnalyses.length)
                : 0}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}