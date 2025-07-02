import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureGridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'tight' | 'normal' | 'relaxed' | 'loose';
  responsive?: boolean;
  className?: string;
  children: ReactNode;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4'
};

const gapClasses = {
  tight: 'gap-4',
  normal: 'gap-6',
  relaxed: 'gap-8',
  loose: 'gap-12'
};

export function FeatureGrid({
  columns = 3,
  gap = 'normal',
  responsive = true,
  className = '',
  children
}: FeatureGridProps) {
  return (
    <div
      className={cn(
        'grid',
        responsive ? `grid-cols-1 ${columnClasses[columns]}` : `grid-cols-${columns}`,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}