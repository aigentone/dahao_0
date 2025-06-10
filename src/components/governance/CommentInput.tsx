'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Send, Bot, CheckCircle } from 'lucide-react';

export default function CommentInput() {
  const [comment, setComment] = useState('');
  const [showAnalysisRequest, setShowAnalysisRequest] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Check if comment contains @claude mention
    const hasClaude = comment.toLowerCase().includes('@claude');
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (hasClaude) {
      setShowAnalysisRequest(true);
      setTimeout(() => setShowAnalysisRequest(false), 4000);
    }
    
    // Clear the comment
    setComment('');
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Analysis Request Notification */}
      {showAnalysisRequest && (
        <Alert className="border-green-200 bg-green-50">
          <Bot className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Analysis requested!</strong> @claude will analyze this discussion and provide insights shortly.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Add Comment
          </CardTitle>
          <CardDescription>
            Share your thoughts on this discussion. Mention <span className="font-mono bg-blue-100 px-1 rounded">@claude</span> to trigger AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Write your comment here... Try mentioning @claude for AI analysis!"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="resize-none"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>💡 Try: "@claude analyze this"</span>
                <span>⌘ + Enter to submit</span>
              </div>
              <span>{comment.length}/1000</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot className="h-4 w-4" />
              <span>Available agents: @claude, @ethics-validator, @domain-expert</span>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={!comment.trim() || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Post Comment
                </>
              )}
            </Button>
          </div>

          {/* Mock Implementation Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Mock Implementation:</strong> Comments aren't actually saved. This demonstrates the @claude mention workflow for future GitHub integration.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}