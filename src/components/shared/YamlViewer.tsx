'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface YamlViewerProps {
  content: string;
  title?: string;
  className?: string;
}

export function YamlViewer({ content, title = 'YAML Content', className }: YamlViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Simple YAML syntax highlighting
  const highlightYaml = (yaml: string) => {
    const lines = yaml.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // Comments
      if (trimmedLine.startsWith('#')) {
        return (
          <div key={index} className="text-green-600 dark:text-green-400">
            {line}
          </div>
        );
      }
      
      // Keys (before colon)
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1 && !line.includes('"') && !line.includes("'")) {
        const key = line.substring(0, colonIndex);
        const rest = line.substring(colonIndex);
        
        // Check if it's a list item
        const leadingSpaces = line.match(/^(\s*)/)?.[1] || '';
        const keyContent = key.trim();
        
        if (keyContent.startsWith('-')) {
          return (
            <div key={index}>
              <span>{leadingSpaces}</span>
              <span className="text-orange-600 dark:text-orange-400">- </span>
              <span>{keyContent.substring(2)}</span>
              <span className="text-gray-600 dark:text-gray-400">{rest}</span>
            </div>
          );
        }
        
        return (
          <div key={index}>
            <span>{leadingSpaces}</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">{keyContent}</span>
            <span className="text-gray-600 dark:text-gray-400">{rest}</span>
          </div>
        );
      }
      
      // String values with quotes
      if (line.includes('"') || line.includes("'")) {
        return (
          <div key={index} className="text-purple-600 dark:text-purple-400">
            {line}
          </div>
        );
      }
      
      // List items
      if (trimmedLine.startsWith('-')) {
        const leadingSpaces = line.match(/^(\s*)/)?.[1] || '';
        return (
          <div key={index}>
            <span>{leadingSpaces}</span>
            <span className="text-orange-600 dark:text-orange-400">- </span>
            <span>{line.substring(leadingSpaces.length + 2)}</span>
          </div>
        );
      }
      
      // Default
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <pre className="p-4 text-sm">
            <code>{highlightYaml(content)}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}