import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Step {
  number: number;
  title: string;
  description?: string;
  details?: string[];
  color?: string;
}

interface StepProcessProps {
  steps: Step[];
  variant?: 'cards' | 'list' | 'horizontal';
  className?: string;
}

export function StepProcess({ 
  steps, 
  variant = 'cards',
  className = '' 
}: StepProcessProps) {
  const getStepColor = (step: Step) => {
    if (step.color) return step.color;
    
    const colors = [
      'border-l-blue-500 bg-blue-100 text-blue-600',
      'border-l-green-500 bg-green-100 text-green-600', 
      'border-l-purple-500 bg-purple-100 text-purple-600',
      'border-l-orange-500 bg-orange-100 text-orange-600'
    ];
    
    return colors[(step.number - 1) % colors.length];
  };

  if (variant === 'list') {
    return (
      <ol className={`space-y-3 ${className}`}>
        {steps.map((step) => {
          const colorClass = getStepColor(step);
          const bgColor = colorClass.split(' ')[1];
          const textColor = colorClass.split(' ')[2];
          
          return (
            <li key={step.number} className="flex items-start gap-3">
              <div className={`w-6 h-6 ${bgColor} ${textColor} rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                {step.number}
              </div>
              <div>
                <span className="font-medium">{step.title}</span>
                {step.description && (
                  <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center justify-between gap-2 flex-wrap ${className}`}>
        {steps.map((step, index) => {
          const colorClass = getStepColor(step);
          const iconColor = colorClass.split(' ')[2];
          
          return (
            <div key={step.number} className="flex items-center gap-2">
              <div className="text-center p-4">
                <div className={`h-8 w-8 mx-auto mb-2 ${iconColor}`}>
                  {/* Icon would go here if provided */}
                </div>
                <h4 className="font-semibold">{step.title}</h4>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="h-4 w-4 text-gray-400">→</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Default: cards variant
  return (
    <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {steps.map((step) => {
        const colorClass = getStepColor(step);
        const borderColor = colorClass.split(' ')[0];
        const bgColor = colorClass.split(' ')[1];
        const textColor = colorClass.split(' ')[2];
        
        return (
          <Card key={step.number} className={`${borderColor} border-l-4`}>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${bgColor} ${textColor} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
                  {step.number}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{step.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {step.description && (
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
              )}
              {step.details && (
                <ul className="text-xs space-y-1">
                  {step.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}