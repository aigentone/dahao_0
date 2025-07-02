import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ColoredBadgeProps {
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'subtle';
  className?: string;
  children: ReactNode;
}

const colorClasses = {
  solid: {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    yellow: 'bg-yellow-600 text-white',
    red: 'bg-red-600 text-white',
    purple: 'bg-purple-600 text-white',
    gray: 'bg-gray-600 text-white',
    orange: 'bg-orange-600 text-white'
  },
  subtle: {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    gray: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
  }
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5'
};

export function ColoredBadge({
  color = 'blue',
  size = 'md',
  variant = 'subtle',
  className = '',
  children
}: ColoredBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full',
        colorClasses[variant][color],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}