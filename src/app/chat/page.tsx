'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mcpClient } from '@/lib/mcp-client';
import {
  ChatMessage,
  GovernanceProposal,
  EthicsCompatibilityResult,
  CrossDomainAnalysis,
  GOVERNANCE_DOMAINS,
  PROPOSAL_TYPES
} from '@/types/mcp';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [draftProposal, setDraftProposal] = useState<Partial<GovernanceProposal> | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      content: 'Welcome to DAHAO AI Assistant! I can help you analyze proposals, check ethics compatibility, and understand cross-domain impacts. Try asking me to analyze a proposal or check the current governance status.',
      role: 'assistant',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (content: string, role: 'user' | 'assistant', metadata?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date(),
      metadata
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage(userMessage, 'user');
    setLoading(true);

    try {
      await processUserMessage(userMessage);
    } catch (error) {
      addMessage('Sorry, I encountered an error processing your request.', 'assistant');
    } finally {
      setLoading(false);
    }
  };

  const processUserMessage = async (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Check governance status
    if (lowerMessage.includes('status') || lowerMessage.includes('governance')) {
      const result = await mcpClient.getRepoStatus();
      if (result.success) {
        const status = result.data;
        addMessage(
          `Current governance status:\n\n` +
          `• Active proposals: ${status?.activeProposals}\n` +
          `• Current branch: ${status?.currentBranch}\n` +
          `• Contributors: ${status?.collaborationMetrics.contributors}\n` +
          `• Proposals this month: ${status?.collaborationMetrics.proposalsThisMonth}\n` +
          `• Implementation rate: ${(status?.collaborationMetrics?.implementationRate * 100).toFixed(1)}%\n\n` +
          `Ethics versions:\n${Object.entries(status?.ethicsVersions || {}).map(([domain, version]) => `• ${domain}: ${version}`).join('\n')}`,
          'assistant'
        );
      } else {
        addMessage('Failed to fetch governance status.', 'assistant');
      }
    }

    // Analyze proposal
    else if (lowerMessage.includes('analyze') || lowerMessage.includes('proposal')) {
      if (draftProposal) {
        await analyzeCurrentProposal();
      } else {
        addMessage(
          'I can analyze a proposal for ethics compatibility and cross-domain impact. Please create a draft proposal first by saying something like:\n\n' +
          '"Create a proposal to improve animal welfare standards in zoos"',
          'assistant'
        );
      }
    }

    // Create proposal
    else if (lowerMessage.includes('create') && (lowerMessage.includes('proposal') || lowerMessage.includes('suggest'))) {
      const proposal = extractProposalFromMessage(message);
      setDraftProposal(proposal);
      addMessage(
        `I've created a draft proposal:\n\n` +
        `**Title:** ${proposal.title}\n` +
        `**Type:** ${proposal.type}\n` +
        `**Domain:** ${proposal.domain}\n` +
        `**Description:** ${proposal.description}\n\n` +
        `Would you like me to analyze this proposal for ethics compatibility and cross-domain impacts?`,
        'assistant',
        { proposal }
      );
    }

    // Check ethics
    else if (lowerMessage.includes('ethics') || lowerMessage.includes('compatible')) {
      const result = await mcpClient.getCurrentEthics();
      if (result.success) {
        const ethics = result.data;
        const ethicsText = Object.entries(ethics).map(([framework, data]) =>
          `• ${framework}: ${(data as any).principles?.length || 0} principles`
        ).join('\n');

        addMessage(
          `Current ethics frameworks:\n\n${ethicsText}\n\n` +
          `If you have a proposal to analyze, I can check its compatibility with these frameworks.`,
          'assistant'
        );
      } else {
        addMessage('Failed to fetch current ethics frameworks.', 'assistant');
      }
    }

    // Generic help
    else {
      addMessage(
        'I can help you with:\n\n' +
        '• **"Check governance status"** - Get current repository and proposal status\n' +
        '• **"Show current ethics"** - Display active ethics frameworks\n' +
        '• **"Create a proposal to..."** - Draft and analyze new proposals\n' +
        '• **"Analyze proposal"** - Check ethics compatibility and cross-domain impacts\n\n' +
        'Try asking me about any of these topics!',
        'assistant'
      );
    }
  };

  const extractProposalFromMessage = (message: string): Partial<GovernanceProposal> => {
    // Simple extraction logic - in a real app, this would be more sophisticated
    const title = message.replace(/create\s+(a\s+)?proposal\s+(to\s+)?/i, '').trim();

    // Detect domain based on keywords
    let domain = 'human-rights'; // default
    const domainKeywords = {
      'animal-welfare': ['animal', 'wildlife', 'zoo', 'farm', 'pet'],
      'music-industry': ['music', 'artist', 'song', 'copyright'],
      'environment': ['climate', 'carbon', 'pollution', 'sustainability'],
      'technology-ethics': ['ai', 'algorithm', 'data', 'privacy'],
      'economic-policy': ['economy', 'budget', 'tax', 'finance']
    };

    for (const [domainName, keywords] of Object.entries(domainKeywords)) {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        domain = domainName;
        break;
      }
    }

    // Detect type based on keywords
    let type: GovernanceProposal['type'] = 'policy_change'; // default
    if (message.toLowerCase().includes('ethic')) type = 'ethics_evolution';
    if (message.toLowerCase().includes('resource') || message.toLowerCase().includes('budget')) type = 'resource_allocation';
    if (message.toLowerCase().includes('structure') || message.toLowerCase().includes('organization')) type = 'structural_change';

    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description: `Proposal to ${title.toLowerCase()}`,
      type,
      domain,
      author: 'AI Assistant User'
    };
  };

  const analyzeCurrentProposal = async () => {
    if (!draftProposal) return;

    addMessage('Analyzing proposal...', 'assistant');

    // Ethics compatibility analysis
    const ethicsResult = await mcpClient.validateEthicsCompatibility(draftProposal);
    let ethicsAnalysis: EthicsCompatibilityResult | undefined;

    if (ethicsResult.success) {
      ethicsAnalysis = ethicsResult.data;
      const ethicsMessage = `**Ethics Compatibility Analysis:**\n\n` +
        `${ethicsAnalysis.compatible ? '✅ Compatible' : '❌ Conflicts detected'}\n\n` +
        (ethicsAnalysis.conflicts.length > 0 ?
          `**Conflicts:**\n${ethicsAnalysis.conflicts.map(c => `• ${c}`).join('\n')}\n\n` : '') +
        (ethicsAnalysis.recommendations.length > 0 ?
          `**Recommendations:**\n${ethicsAnalysis.recommendations.map(r => `• ${r}`).join('\n')}\n\n` : '') +
        (ethicsAnalysis.requiredUpdates.length > 0 ?
          `**Required Updates:**\n${ethicsAnalysis.requiredUpdates.map(u => `• ${u}`).join('\n')}` : '');

      addMessage(ethicsMessage, 'assistant', { ethicsAnalysis });
    }

    // Cross-domain impact analysis
    const crossDomainResult = await mcpClient.analyzeCrossDomainImpact(draftProposal);
    let crossDomainAnalysis: CrossDomainAnalysis | undefined;

    if (crossDomainResult.success) {
      crossDomainAnalysis = crossDomainResult.data;
      const crossDomainMessage = `**Cross-Domain Impact Analysis:**\n\n` +
        `**Affected Domains:** ${crossDomainAnalysis.affectedDomains.join(', ')}\n\n` +
        `**Impact Details:**\n${crossDomainAnalysis.impacts.map(impact =>
          `• ${impact.domain}: ${impact.impactLevel} impact - ${impact.description}`
        ).join('\n')}\n\n` +
        (crossDomainAnalysis.synergies.length > 0 ?
          `**Synergies:**\n${crossDomainAnalysis.synergies.map(s => `• ${s}`).join('\n')}\n\n` : '') +
        (crossDomainAnalysis.risks.length > 0 ?
          `**Risks:**\n${crossDomainAnalysis.risks.map(r => `• ${r}`).join('\n')}` : '');

      addMessage(crossDomainMessage, 'assistant', { crossDomainAnalysis });
    }

    // Summary and recommendations
    const summaryMessage = `**Analysis Summary:**\n\n` +
      `Your proposal shows ${ethicsAnalysis?.compatible ? 'good' : 'potential'} ethics compatibility ` +
      `and affects ${crossDomainAnalysis?.affectedDomains.length || 0} domains. ` +
      `${ethicsAnalysis?.conflicts.length ? 'Consider addressing the ethics conflicts before proceeding.' : ''} ` +
      `${crossDomainAnalysis?.risks.length ? 'Pay attention to the identified cross-domain risks.' : ''}\n\n` +
      `Would you like me to help you refine the proposal or create it in the forum?`;

    addMessage(summaryMessage, 'assistant');
  };

  const createProposalInForum = async () => {
    if (!draftProposal) return;

    const result = await mcpClient.createProposal(
      draftProposal.title!,
      draftProposal.description!,
      draftProposal.type!,
      draftProposal.domain!,
      draftProposal.author!
    );

    if (result.success) {
      addMessage(
        `✅ Proposal created successfully! You can view it in the forum or on GitHub.`,
        'assistant'
      );
      setDraftProposal(null);
    } else {
      addMessage('Failed to create proposal. Please try again.', 'assistant');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AI Governance Assistant</h1>
        <p className="text-gray-600 mt-2">
          Analyze proposals, check ethics compatibility, and understand cross-domain impacts
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">Chat with DAHAO AI</CardTitle>
          <CardDescription>
            Powered by your MCP server with ethics validation and cross-domain analysis
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Show metadata if available */}
                  {message.metadata?.proposal && (
                    <div className="mt-3 p-2 bg-white/10 rounded text-xs">
                      <strong>Draft Proposal:</strong> {message.metadata.proposal.title}
                    </div>
                  )}

                  {message.metadata?.ethicsAnalysis && (
                    <div className="mt-2">
                      <Badge className={message.metadata.ethicsAnalysis.compatible ? 'bg-green-600' : 'bg-red-600'}>
                        Ethics: {message.metadata.ethicsAnalysis.compatible ? 'Compatible' : 'Conflicts'}
                      </Badge>
                    </div>
                  )}

                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="animate-pulse">Analyzing...</div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {draftProposal && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium mb-2">Draft Proposal: {draftProposal.title}</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={analyzeCurrentProposal} disabled={loading}>
                  Analyze
                </Button>
                <Button size="sm" variant="outline" onClick={createProposalInForum} disabled={loading}>
                  Create in Forum
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDraftProposal(null)}>
                  Clear
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about governance, create proposals, analyze ethics..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !inputValue.trim()}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
