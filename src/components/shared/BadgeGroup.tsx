import { Badge } from '@/components/ui/badge';

interface BadgeItem {
  text: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

interface BadgeGroupProps {
  badges: (string | BadgeItem)[];
  className?: string;
  justify?: 'start' | 'center' | 'end';
}

export function BadgeGroup({ 
  badges, 
  className = '',
  justify = 'center'
}: BadgeGroupProps) {
  const justifyClass = {
    'start': 'justify-start',
    'center': 'justify-center', 
    'end': 'justify-end'
  };

  return (
    <div className={`flex ${justifyClass[justify]} gap-2 flex-wrap ${className}`}>
      {badges.map((badge, index) => {
        if (typeof badge === 'string') {
          return (
            <Badge key={index} variant="outline">
              {badge}
            </Badge>
          );
        }
        
        return (
          <Badge key={index} variant={badge.variant || 'outline'}>
            {badge.text}
          </Badge>
        );
      })}
    </div>
  );
}