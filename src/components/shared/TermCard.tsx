'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, Book, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { GovernanceFileData } from '@/lib/services/github';

interface TermCardProps {
  data: GovernanceFileData;
  onTermClick?: (term: string) => void;
}

export function TermCard({ data, onTermClick }: TermCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const content = data.content;
  const termKey = content._termKey;
  const hasParseError = content._parseError;
  
  // Extract term name from @term@version format
  let termName = data.name;
  let version = '1.0.0';
  
  if (termKey) {
    const match = termKey.match(/@(\w+)@([\d.]+)/);
    if (match) {
      termName = match[1];
      version = match[2];
    }
  }
  
  const title = termName.charAt(0).toUpperCase() + termName.slice(1);
  const definition = content.definition || '';
  
  // Format term references
  const formatContent = (text: string) => {
    if (!text) return null;
    
    // Replace @term@version patterns with clickable elements
    const termPattern = /@(\w+)@([\d.]+)/g;
    const parts = text.split(termPattern);
    
    return parts.map((part, index) => {
      if (index % 3 === 1) {
        // This is a term name
        const termName = part;
        const version = parts[index + 1];
        const fullTerm = `@${termName}@${version}`;
        
        return (
          <Button
            key={index}
            variant="link"
            size="sm"
            className="px-1 h-auto font-mono text-purple-600 hover:text-purple-700"
            onClick={() => onTermClick?.(fullTerm)}
          >
            {fullTerm}
          </Button>
        );
      } else if (index % 3 === 2) {
        // This is a version, skip it as it's handled above
        return null;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const renderList = (items: string[] | undefined, title: string) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h4 className="font-semibold text-sm mb-2">{title}:</h4>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <span className="mr-2">•</span>
              <span className="flex-1">{formatContent(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Book className="h-5 w-5 mt-1 text-purple-600" />
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {title}
                {hasParseError && (
                  <div className="inline-flex items-center ml-2" title="Parsed with fallback method">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                <Badge variant="outline" className="text-xs">
                  terms
                </Badge>
                <Badge variant="secondary" className="ml-2 text-xs">
                  v{version}
                </Badge>
                {termKey && (
                  <Badge variant="outline" className="ml-2 text-xs font-mono">
                    {termKey}
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {definition ? (
          <div className="text-sm text-muted-foreground mb-4">
            {formatContent(definition)}
          </div>
        ) : (
          <div className="text-sm text-yellow-600 mb-4">
            [No definition available - parsing issue]
          </div>
        )}

        {content.uses_terms && content.uses_terms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {content.uses_terms.map((term, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onTermClick?.(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        )}

        {isExpanded && (
          <ScrollArea className="max-h-96">
            {/* Contexts */}
            {content.contexts && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Contexts:</h4>
                <div className="space-y-2">
                  {Object.entries(content.contexts).map(([context, def]) => (
                    <div key={context} className="bg-muted/50 rounded-lg p-3">
                      <h5 className="font-medium text-sm capitalize mb-1">{context}</h5>
                      <p className="text-sm text-muted-foreground">
                        {formatContent(def as string)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mechanisms */}
            {content.mechanisms && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Mechanisms:</h4>
                <div className="text-xs text-yellow-600 mb-2">
                  Debug: {JSON.stringify(content.mechanisms)}
                </div>
                <div className="space-y-2">
                  {typeof content.mechanisms === 'object' && content.mechanisms !== null ? (
                    Object.entries(content.mechanisms).map(([mech, desc]) => (
                      <div key={mech} className="text-sm">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                          <span className="font-medium capitalize text-foreground min-w-fit">
                            {mech.replace(/_/g, ' ')}:
                          </span>
                          <span className="text-muted-foreground">
                            {formatContent(desc as string)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Raw mechanisms: {String(content.mechanisms)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Examples */}
            {renderList(content.examples, 'Examples')}
            
            {/* Related Terms */}
            {content.related_terms && renderList(content.related_terms, 'Related Terms')}
            
            {/* Changelog */}
            {content.changelog && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Changelog:</h4>
                <div className="space-y-2">
                  {Object.entries(content.changelog).map(([version, info]) => (
                    <div key={version} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">v{version}</Badge>
                        {(info as any).date && (
                          <span className="text-xs text-muted-foreground">{(info as any).date}</span>
                        )}
                      </div>
                      {(info as any).change && (
                        <p className="text-sm text-muted-foreground">{(info as any).change}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Show raw content if there was a parse error */}
            {hasParseError && isExpanded && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-yellow-800 dark:text-yellow-200">
                  Raw Content (Parse Error):
                </h4>
                <pre className="text-xs text-yellow-700 dark:text-yellow-300 whitespace-pre-wrap">
                  {data.raw.substring(0, 500)}...
                </pre>
              </div>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}