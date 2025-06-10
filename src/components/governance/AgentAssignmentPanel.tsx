'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Loader2, CheckCircle } from 'lucide-react';
import { AVAILABLE_AGENTS, getRandomAnalysis, getAgentDelay, type AgentType } from '@/lib/mock-data/agent-responses';

interface AssignedAgent {
  agentId: string;
  assignedBy: string;
  assignedAt: string;
  status: 'pending' | 'analyzing' | 'completed';
  analysis?: string;
}

export default function AgentAssignmentPanel() {
  const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const assignAgent = async (agentId: string) => {
    setLoading(prev => ({ ...prev, [agentId]: true }));

    // Create assignment immediately
    const assignment: AssignedAgent = {
      agentId,
      assignedBy: 'current_user',
      assignedAt: new Date().toISOString(),
      status: 'analyzing'
    };

    setAssignedAgents(prev => [...prev, assignment]);

    // Simulate analysis delay
    const delay = getAgentDelay(agentId as AgentType);
    await new Promise(resolve => setTimeout(resolve, delay));

    // Complete analysis
    const analysis = getRandomAnalysis(agentId as AgentType);
    setAssignedAgents(prev =>
      prev.map(agent =>
        agent.agentId === agentId && agent.status === 'analyzing'
          ? { ...agent, status: 'completed', analysis }
          : agent
      )
    );

    setLoading(prev => ({ ...prev, [agentId]: false }));
  };

  const isAgentAssigned = (agentId: string) => {
    return assignedAgents.some(agent => agent.agentId === agentId);
  };

  const getAgentStatus = (agentId: string) => {
    const assignment = assignedAgents.find(agent => agent.agentId === agentId);
    return assignment?.status || null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Agent Assignment
          </CardTitle>
          <CardDescription>
            Assign AI agents to analyze this proposal. This is a mock implementation - no real API calls are made.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {AVAILABLE_AGENTS.map((agent) => {
              const isAssigned = isAgentAssigned(agent.id);
              const status = getAgentStatus(agent.id);
              const isLoading = loading[agent.id];

              return (
                <div key={agent.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{agent.name}</h4>
                    {status && (
                      <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
                        {status === 'analyzing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                        {status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
                  <Button
                    onClick={() => assignAgent(agent.id)}
                    disabled={isAssigned || isLoading}
                    size="sm"
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {isAssigned ? 'Assigned' : 'Assign Agent'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {assignedAgents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Agent Analysis Results</CardTitle>
            <CardDescription>
              AI agent responses to this proposal (simulated)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedAgents.map((assignment, index) => {
                const agent = AVAILABLE_AGENTS.find(a => a.id === assignment.agentId);

                return (
                  <div key={index} className="border-l-4 border-l-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bot className="h-4 w-4" />
                      <span className="font-semibold">{agent?.name}</span>
                      <Badge variant="outline">{assignment.status}</Badge>
                    </div>

                    {assignment.status === 'analyzing' && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Analyzing proposal...</span>
                      </div>
                    )}

                    {assignment.analysis && (
                      <div className="bg-muted p-3 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap font-mono">
                          {assignment.analysis}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Action */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">@claude analyze this</h4>
              <p className="text-sm text-muted-foreground">
                Click to request comprehensive Claude analysis
              </p>
            </div>
            <Button
              onClick={() => assignAgent('claude-analysis')}
              disabled={isAgentAssigned('claude-analysis') || loading['claude-analysis']}
              variant="outline"
            >
              {loading['claude-analysis'] && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Assign Claude
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
