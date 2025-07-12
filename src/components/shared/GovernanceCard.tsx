'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp, FileText, GitBranch, Shield, Book } from 'lucide-react';
import { useState } from 'react';
import { GovernanceFileData } from '@/lib/services/github';

interface GovernanceCardProps {
  data: GovernanceFileData;
  onTermClick?: (term: string) => void;
}

const categoryIcons = {
  'meta-rules': Shield,
  'principles': GitBranch,
  'rules': FileText,
  'terms': Book
};

const categoryColors = {
  'meta-rules': 'text-red-600',
  'principles': 'text-blue-600',
  'rules': 'text-green-600',
  'terms': 'text-purple-600'
};

export function GovernanceCard({ data, onTermClick }: GovernanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = categoryIcons[data.category];
  const iconColor = categoryColors[data.category];

  const content = data.content;
  
  // Handle different content structures based on category
  let title, description;
  
  if (data.category === 'terms') {
    // For terms, use the _termKey if available, otherwise use the data name
    const termKey = content._termKey;
    
    if (termKey) {
      // Extract term name from @term@version format
      const match = termKey.match(/@(\w+)@/);
      title = match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : data.name;
    } else {
      title = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    }
    
    // For terms, the definition should be the description
    description = content.definition || '';
    
    // Ensure description is properly trimmed and formatted
    if (description && typeof description === 'string') {
      description = description.trim();
    }
  } else {
    title = content.title || content.name || data.name;
    description = content.statement || content.definition || content.description || '';
  }

  // Extract uses_terms
  const usesTerms = content.uses_terms || [];

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

  const renderWorkflow = (workflow: Record<string, string[]>) => {
    return (
      <div className="mt-4">
        <h4 className="font-semibold text-sm mb-2">Workflow:</h4>
        <div className="space-y-3">
          {Object.entries(workflow).map(([step, actions]) => (
            <div key={step} className="bg-muted/50 rounded-lg p-3">
              <h5 className="font-medium text-sm capitalize mb-1">{step.replace(/_/g, ' ')}</h5>
              <ul className="space-y-1">
                {actions.map((action, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-4 relative">
                    <span className="absolute left-0">→</span>
                    {formatContent(action)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderThresholds = (thresholds: Record<string, number>) => {
    return (
      <div className="mt-4">
        <h4 className="font-semibold text-sm mb-2">Voting Thresholds:</h4>
        <div className="text-xs text-yellow-600 mb-2">
          Debug: {JSON.stringify(thresholds)}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(thresholds).map(([type, value]) => (
            <div key={type} className="flex justify-between text-sm">
              <span className="text-muted-foreground capitalize">{type.replace(/_/g, ' ')}:</span>
              <Badge variant="secondary">{(value * 100).toFixed(0)}%</Badge>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Icon className={`h-5 w-5 mt-1 ${iconColor}`} />
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {data.category && (
                <CardDescription className="mt-1">
                  <Badge variant="outline" className="text-xs">
                    {data.category}
                  </Badge>
                  {content.version && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      v{content.version}
                    </Badge>
                  )}
                </CardDescription>
              )}
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
        {description && (
          <div className="text-sm text-muted-foreground mb-4">
            {formatContent(description)}
          </div>
        )}

        {content.rationale && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Rationale:</h4>
            <p className="text-sm text-muted-foreground">{formatContent(content.rationale)}</p>
          </div>
        )}

        {usesTerms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {usesTerms.map((term, index) => (
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
            {data.category === 'terms' ? (
              // Special rendering for terms
              <>
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

                {content.mechanisms && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-2">Mechanisms:</h4>
                    <div className="space-y-1">
                      {Object.entries(content.mechanisms).map(([mech, desc]) => (
                        <div key={mech} className="text-sm mb-2">
                          <span className="font-medium capitalize">{mech.replace(/_/g, ' ')}:</span>
                          <span className="text-muted-foreground ml-2">{desc as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {renderList(content.examples, 'Examples')}
                {content.related_terms && renderList(content.related_terms, 'Related Terms')}
                
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
              </>
            ) : (
              // Default rendering for other categories
              <>
                {renderList(content.requirements, 'Requirements')}
                {renderList(content.exceptions, 'Exceptions')}
                {renderList(content.examples, 'Examples')}
                {renderList(content.immutable_aspects, 'Immutable Aspects')}
                {renderList(content.change_process, 'Change Process')}
                
                {content.workflow && renderWorkflow(content.workflow)}
                {content.thresholds && renderThresholds(content.thresholds)}
              </>
            )}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}