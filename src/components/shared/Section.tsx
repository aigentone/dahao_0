import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  variant?: 'default' | 'muted' | 'gradient' | 'dark';
  className?: string;
  children: ReactNode;
  id?: string;
}

const sectionVariants = {
  default: 'bg-background',
  muted: 'bg-muted/30',
  gradient: 'bg-gradient-to-b from-muted/30 to-background',
  dark: 'bg-gray-50 dark:bg-gray-900'
};

export function Section({
  variant = 'default',
  className = '',
  children,
  id
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 px-4',
        sectionVariants[variant],
        className
      )}
    >
      {children}
    </section>
  );
}