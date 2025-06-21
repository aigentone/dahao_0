import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'border-left';
  borderColor?: string;
}

export function FeatureCard({
  icon: Icon,
  iconColor = 'text-blue-600',
  title,
  description,
  children,
  className = '',
  variant = 'default',
  borderColor = 'border-l-blue-500'
}: FeatureCardProps) {
  const getCardClassName = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200';
      case 'border-left':
        return `border-l-4 ${borderColor}`;
      default:
        return '';
    }
  };

  return (
    <Card className={`${getCardClassName()} ${className}`}>
      <CardHeader className={Icon ? 'pb-3' : ''}>
        {Icon && (
          <Icon className={`h-8 w-8 ${iconColor} mb-2`} />
        )}
        <CardTitle className={Icon ? 'text-sm' : ''}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-muted-foreground ${Icon ? 'text-xs' : ''}`}>
          {description}
        </p>
        {children}
      </CardContent>
    </Card>
  );
}