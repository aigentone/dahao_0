'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Send, 
  Loader2, 
  MessageSquare,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  DollarSign,
  GripVertical
} from 'lucide-react';

interface GovernanceElement {
  id: string;
  name: string;
  type: 'term' | 'principle' | 'rule';
  version: string;
  data: any;
}

interface Branch {
  id: string;
  name: string;
}

interface UserData {
  id: string;
  name: string;
  values: string[];
}

interface GovernanceChatPanelProps {
  element?: GovernanceElement;
  branch?: Branch;
  user?: UserData;
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left';
  initialWidth?: number; // Width in pixels instead of Tailwind classes
}

// Smart suggestions based on element type
const getSmartSuggestions = (element?: GovernanceElement): string[] => {
  if (!element) {
    return [
      "What governance elements are available?",
      "How does this branch differ from the parent?",
      "Show me the branch philosophy"
    ];
  }

  const suggestions: Record<string, string[]> = {
    term: [
      `What does "${element.name}" mean in this branch?`,
      `How is "${element.name}" used in practice?`,
      `Show related terms to "${element.name}"`,
      `Compare "${element.name}" across branches`
    ],
    principle: [
      `How does the "${element.name}" principle guide decisions?`,
      `What are the implementation requirements?`,
      `Show examples of "${element.name}" in action`,
      `Compare with parent branch principles`
    ],
    rule: [
      `What are the enforcement mechanisms for "${element.name}"?`,
      `How does this rule interact with others?`,
      `Show compliance examples for "${element.name}"`,
      `What happens if this rule is violated?`
    ]
  };

  return suggestions[element.type] || [];
};

export function GovernanceChatPanel({
  element,
  branch,
  user,
  isOpen,
  onClose,
  position = 'right',
  initialWidth = 384 // Default 384px (equivalent to w-96)
}: GovernanceChatPanelProps) {
  const [totalCost, setTotalCost] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [panelWidth, setPanelWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Initialize useChat hook following https://ai-sdk.dev/docs/ai-sdk-ui/use-chat
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    stop
  } = useChat({
    api: '/api/chat',
    body: {
      element,
      branch,
      user
    },
    onResponse: (response) => {
      console.log('Chat response received:', response.status);
    },
    onFinish: (message, { usage, finishReason }) => {
      console.log('Message finished:', { finishReason, usage });
      
      // Update cost tracking
      if (usage) {
        const cost = calculateCost(usage);
        setTotalCost(prev => prev + cost);
        setTotalTokens(prev => prev + usage.totalTokens);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });

  // Smart suggestions
  const suggestions = getSmartSuggestions(element);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Hide suggestions once user starts chatting
  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any);
    setShowSuggestions(false);
  };

  // Calculate cost helper
  const calculateCost = (usage: any): number => {
    const INPUT_COST_PER_1K = 0.003;
    const OUTPUT_COST_PER_1K = 0.015;
    
    const inputCost = (usage.promptTokens || 0) / 1000 * INPUT_COST_PER_1K;
    const outputCost = (usage.completionTokens || 0) / 1000 * OUTPUT_COST_PER_1K;
    
    return inputCost + outputCost;
  };

  // Resize functionality
  const startResize = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizing) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newWidth = position === 'right' 
      ? window.innerWidth - clientX 
      : clientX;
    
    // Set min and max width constraints
    const minWidth = 280; // Minimum usable width
    const maxWidth = Math.min(window.innerWidth * 0.8, 800); // Max 80% of screen or 800px
    
    setPanelWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isResizing, position]);

  // Handle mouse and touch events for resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resize);
      document.addEventListener('touchend', stopResize);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
      document.removeEventListener('touchmove', resize);
      document.removeEventListener('touchend', stopResize);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, resize, stopResize]);

  // Reset width when opening/closing to prevent weird states
  useEffect(() => {
    if (isOpen && panelWidth < 280) {
      setPanelWidth(initialWidth);
    }
  }, [isOpen, panelWidth, initialWidth]);

  return (
    <>
      {/* Resize Handle - Hidden on mobile */}
      {isOpen && (
        <div
          className={cn(
            "fixed top-0 h-full w-2 bg-border hover:bg-primary/50 cursor-col-resize z-[100] transition-colors",
            "hidden sm:block", // Hide on mobile (< 640px)
            position === 'right' ? 'right-0' : 'left-0'
          )}
          style={{
            [position === 'right' ? 'right' : 'left']: `${panelWidth}px`
          }}
          onMouseDown={startResize}
          onTouchStart={startResize}
        >
          <div className="flex items-center justify-center h-full">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div
        ref={panelRef}
        className={cn(
          "fixed top-0 h-full bg-background shadow-xl transform transition-transform duration-300 ease-in-out z-[90] border-l",
          position === 'right' ? 'right-0' : 'left-0',
          isOpen ? 'translate-x-0' : position === 'right' ? 'translate-x-full' : '-translate-x-full',
          // Handle mobile responsive: full width on mobile, custom width on desktop
          "w-full sm:w-auto"
        )}
        style={{
          width: typeof window !== 'undefined' && window.innerWidth >= 640 ? `${panelWidth}px` : '100%'
        }}
      >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b bg-background">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <h2 className="font-semibold truncate">Governance Chat</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Resize indicator - only show on desktop */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <GripVertical className="h-3 w-3" />
            <span>Drag to resize</span>
          </div>
          
          {/* Context badges */}
          {(element || branch) && (
            <div className="flex flex-wrap gap-2">
              {element && (
                <Badge variant="secondary" className="text-xs">
                  {element.type}: {element.name} (v{element.version})
                </Badge>
              )}
              {branch && (
                <Badge variant="outline" className="text-xs">
                  Branch: {branch.name}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-sm">
                {element 
                  ? `Ask me about the "${element.name}" ${element.type}`
                  : "Ask me about governance elements"}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                <Card className={cn(
                  "max-w-[80%] p-3",
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : ''
                )}>
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </Card>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Card>
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Error: {error.message}</span>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => reload()}
                  className="h-auto p-0"
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
          
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>Suggestions</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap flex-shrink-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about governance..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Cost tracking */}
          {totalTokens > 0 && (
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>${totalCost.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{totalTokens.toLocaleString()} tokens</span>
              </div>
            </div>
          )}
        </form>
      </div>
      </div>
    </>
  );
}