import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

const sizeClasses = {
  sm: {
    title: 'text-2xl',
    subtitle: 'text-base',
    spacing: 'mb-8'
  },
  md: {
    title: 'text-3xl',
    subtitle: 'text-lg',
    spacing: 'mb-12'
  },
  lg: {
    title: 'text-4xl',
    subtitle: 'text-xl',
    spacing: 'mb-16'
  },
  xl: {
    title: 'text-5xl',
    subtitle: 'text-2xl',
    spacing: 'mb-20'
  }
};

export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  size = 'md',
  className = '',
  children
}: SectionTitleProps) {
  const sizeConfig = sizeClasses[size];

  return (
    <div className={cn(alignClasses[align], sizeConfig.spacing, className)}>
      <h2 className={cn('font-bold tracking-tight', sizeConfig.title)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-2 text-muted-foreground',
          sizeConfig.subtitle,
          align === 'center' && 'max-w-3xl mx-auto'
        )}>
          {subtitle}
        </p>
      )}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}