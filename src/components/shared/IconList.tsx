import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconListItem {
  content: ReactNode;
  id?: string;
}

interface IconListProps {
  items: IconListItem[] | string[];
  icon?: LucideIcon;
  iconColor?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  spacing?: 'tight' | 'normal' | 'relaxed';
  className?: string;
}

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6'
};

const spacingClasses = {
  tight: 'space-y-2',
  normal: 'space-y-3',
  relaxed: 'space-y-4'
};

export function IconList({
  items,
  icon: Icon,
  iconColor = 'text-primary',
  iconSize = 'md',
  spacing = 'normal',
  className = ''
}: IconListProps) {
  const normalizedItems = items.map((item, index) => 
    typeof item === 'string' 
      ? { content: item, id: `item-${index}` }
      : { ...item, id: item.id || `item-${index}` }
  );

  return (
    <ul className={cn(spacingClasses[spacing], className)}>
      {normalizedItems.map((item) => (
        <li key={item.id} className="flex items-start gap-2">
          {Icon && (
            <Icon className={cn(iconSizes[iconSize], iconColor, 'flex-shrink-0 mt-0.5')} />
          )}
          <span className="flex-1">{item.content}</span>
        </li>
      ))}
    </ul>
  );
}