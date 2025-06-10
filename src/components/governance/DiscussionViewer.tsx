import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { GovernanceDiscussion } from '@/types/governance';

interface DiscussionViewerProps {
  discussion: GovernanceDiscussion;
  onBack: () => void;
}

interface DiscussionComment {
  author: string;
  role: 'human' | 'ai-agent';
  date: string;
  content: string;
}

export function DiscussionViewer({ discussion, onBack }: DiscussionViewerProps) {
  // Parse the discussion content to extract structured comments
  const parseDiscussionContent = (content: string): {
    metadata: Record<string, string>;
    summary: string;
    proposedChanges?: string;
    rationale?: string;
    comments: DiscussionComment[];
    votes?: { human: string[]; ai: string[] };
  } => {
    const lines = content.split('\n');
    const metadata: Record<string, string> = {};
    let summary = '';
    let proposedChanges = '';
    let rationale = '';
    const comments: DiscussionComment[] = [];
    const votes = { human: [], ai: [] };

    let currentSection = '';
    let currentComment: Partial<DiscussionComment> | null = null;
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for code blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      }

      // Parse metadata
      if (line.startsWith('**') && line.includes(':**')) {
        const [key, value] = line.split(':**');
        metadata[key.replace('**', '').trim()] = value.trim();
        continue;
      }

      // Parse sections
      if (line.startsWith('## ')) {
        currentSection = line.substring(3).toLowerCase();
        continue;
      }

      // Capture summary
      if (currentSection === 'summary' && line.trim() && !line.startsWith('#')) {
        summary += line + ' ';
      }

      // Capture proposed changes
      if (currentSection === 'proposed changes' && !inCodeBlock) {
        proposedChanges = '';
        // Capture the code block after this section
        for (let j = i + 1; j < lines.length && !lines[j].startsWith('##'); j++) {
          proposedChanges += lines[j] + '\n';
        }
      }

      // Capture rationale
      if (currentSection === 'rationale' && line.trim() && !line.startsWith('#')) {
        rationale += line + ' ';
      }

      // Parse discussion comments
      if (currentSection === 'discussion') {
        // Check for author line (bold text with role in parentheses)
        const authorMatch = line.match(/\*\*@(.+?)\s*\((Human|AI Agent)\)\*\*/);
        if (authorMatch) {
          if (currentComment && currentComment.author) {
            comments.push(currentComment as DiscussionComment);
          }
          currentComment = {
            author: '@' + authorMatch[1],
            role: authorMatch[2].toLowerCase().replace(' ', '-') as 'human' | 'ai-agent',
            date: '',
            content: ''
          };
        }
        // Check for date line (italic text with "ago")
        else if (line.match(/\*(.+?ago)\*/)) {
          if (currentComment) {
            currentComment.date = line.replace(/\*/g, '').trim();
          }
        }
        // Collect comment content
        else if (currentComment && line.trim() && !line.startsWith('#')) {
          currentComment.content += line + '\n';
        }
      }

      // Parse votes
      if (currentSection === 'votes' || line.includes('Current Status:')) {
        if (line.includes('✅') || line.includes('🤔')) {
          const voteMatch = line.match(/([✅🤔])\s*@(.+?):\s*"(.+?)"/);
          if (voteMatch) {
            const vote = `${voteMatch[1]} @${voteMatch[2]}: "${voteMatch[3]}"`;
            if (line.includes('Agent')) {
              votes.ai.push(vote);
            } else {
              votes.human.push(vote);
            }
          }
        }
      }
    }

    // Add the last comment
    if (currentComment && currentComment.author) {
      comments.push(currentComment as DiscussionComment);
    }

    return {
      metadata,
      summary: summary.trim(),
      proposedChanges: proposedChanges.trim(),
      rationale: rationale.trim(),
      comments,
      votes: votes.human.length > 0 || votes.ai.length > 0 ? votes : undefined
    };
  };

  const parsedContent = parseDiscussionContent(discussion.content);

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('voting')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (statusLower.includes('active')) return 'bg-green-100 text-green-800 border-green-300';
    if (statusLower.includes('draft')) return 'bg-gray-100 text-gray-800 border-gray-300';
    if (statusLower.includes('review')) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{discussion.title}</h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge className={`${getStatusColor(discussion.status)} font-medium px-3 py-1`}>
                    {discussion.status}
                  </Badge>
                  {parsedContent.metadata['Proposal'] && (
                    <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
                      {parsedContent.metadata['Proposal']}
                    </Badge>
                  )}
                  <Separator orientation="vertical" className="h-5" />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Avatar className="h-6 w-6 bg-gray-200">
                      <span className="text-xs">{discussion.author.charAt(1)}</span>
                    </Avatar>
                    <span className="font-medium">{discussion.author}</span>
                    <span>opened on {discussion.created}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={onBack}
                className="hover:bg-blue-50"
              >
                ← Back to Principle
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Summary Section */}
            {parsedContent.summary && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Summary</h3>
                <p className="text-gray-700 leading-relaxed">{parsedContent.summary}</p>
              </div>
            )}

            {/* Proposed Changes */}
            {parsedContent.proposedChanges && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Proposed Changes</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none"
                  >
                    {parsedContent.proposedChanges}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Rationale */}
            {parsedContent.rationale && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Rationale</h3>
                <p className="text-gray-700 leading-relaxed">{parsedContent.rationale}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Discussion Thread */}
        {parsedContent.comments.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">💬</span>
                Discussion ({parsedContent.comments.length} comments)
              </h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {parsedContent.comments.map((comment, idx) => (
                  <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <Avatar className={`h-10 w-10 ${
                        comment.role === 'ai-agent'
                          ? 'bg-gradient-to-br from-blue-400 to-purple-400'
                          : 'bg-gradient-to-br from-green-400 to-teal-400'
                      }`}>
                        <span className="text-white font-medium">
                          {comment.role === 'ai-agent' ? '🤖' : comment.author.charAt(1)}
                        </span>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-gray-900">{comment.author}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              comment.role === 'ai-agent'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-green-50 text-green-700 border-green-200'
                            }`}
                          >
                            {comment.role === 'ai-agent' ? 'AI Agent' : 'Human'}
                          </Badge>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {comment.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Voting Status */}
        {parsedContent.votes && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-2xl">🗳️</span>
                Voting Status
              </h3>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Human Votes ({parsedContent.votes.human.length})</h4>
                  <div className="space-y-2">
                    {parsedContent.votes.human.map((vote, idx) => (
                      <div key={idx} className="text-sm text-gray-700">{vote}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">AI Agent Recommendations ({parsedContent.votes.ai.length})</h4>
                  <div className="space-y-2">
                    {parsedContent.votes.ai.map((vote, idx) => (
                      <div key={idx} className="text-sm text-gray-700">{vote}</div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
