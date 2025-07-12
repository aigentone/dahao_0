'use client';

import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface TermReferenceProps {
  term: string; // Format: @term@version
  definition?: string;
  onClick?: (term: string) => void;
  className?: string;
}

export function TermReference({ term, definition, onClick, className }: TermReferenceProps) {
  // Parse term and version
  const match = term.match(/@(\w+)@([\d.]+)/);
  const termName = match?.[1] || term;
  const version = match?.[2] || '1.0.0';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(term);
  };

  const content = (
    <Button
      variant="link"
      size="sm"
      className={`h-auto px-1 font-mono text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 ${className}`}
      onClick={handleClick}
    >
      @{termName}@{version}
    </Button>
  );

  if (!definition) {
    return content;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {content}
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {termName}
            </h4>
            <Badge variant="secondary" className="text-xs">
              v{version}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {definition}
          </p>
          <p className="text-xs text-muted-foreground">
            Click to view full definition
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}