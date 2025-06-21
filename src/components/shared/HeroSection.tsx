import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  title: string;
  subtitle?: string;
  description?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  className?: string;
  children?: ReactNode;
}

const maxWidthClasses = {
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl'
};

export function HeroSection({
  badge,
  badgeVariant = 'outline',
  title,
  subtitle,
  description,
  maxWidth = '3xl',
  className = '',
  children
}: HeroSectionProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {badge && (
        <Badge className="mb-4" variant={badgeVariant}>
          {badge}
        </Badge>
      )}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className={`text-xl md:text-2xl text-muted-foreground mb-8 ${maxWidthClasses[maxWidth]} mx-auto`}>
          {subtitle}
        </p>
      )}
      {description && (
        <p className={`text-lg text-muted-foreground ${maxWidthClasses['2xl']} mx-auto`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}