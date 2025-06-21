import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ArchitectureLayer {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface ArchitectureFlowProps {
  layers: ArchitectureLayer[];
  title?: string;
  className?: string;
  variant?: 'horizontal' | 'vertical';
}

export function ArchitectureFlow({ 
  layers, 
  title = "Four Layers of Governance",
  className = '',
  variant = 'horizontal'
}: ArchitectureFlowProps) {
  if (variant === 'vertical') {
    return (
      <Card className={className}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-4">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div key={index}>
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Icon className={`h-8 w-8 ${layer.color}`} />
                    <div>
                      <h4 className="font-semibold">{layer.title}</h4>
                      <p className="text-sm text-muted-foreground">{layer.description}</p>
                    </div>
                  </div>
                  {index < layers.length - 1 && (
                    <div className="flex justify-center my-2">
                      <ArrowRight className="h-4 w-4 text-gray-400 transform rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default: horizontal variant
  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <div className="text-center p-4">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${layer.color}`} />
                  <h4 className="font-semibold">{layer.title}</h4>
                  <p className="text-xs text-muted-foreground">{layer.description}</p>
                </div>
                {index < layers.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}