import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CTAButton {
  text: string;
  href: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

interface NavigationCTAProps {
  buttons: CTAButton[];
  className?: string;
  justify?: 'start' | 'center' | 'end';
}

export function NavigationCTA({ 
  buttons, 
  className = '',
  justify = 'center'
}: NavigationCTAProps) {
  const justifyClass = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end'
  };

  return (
    <div className={`flex ${justifyClass[justify]} gap-4 flex-wrap ${className}`}>
      {buttons.map((button, index) => {
        const Icon = button.icon;
        
        return (
          <Button 
            key={index}
            asChild 
            variant={button.variant || 'default'}
            size={button.size || 'lg'}
          >
            <Link href={button.href}>
              {Icon && button.iconPosition !== 'right' && (
                <Icon className="h-4 w-4 mr-2" />
              )}
              {button.text}
              {Icon && button.iconPosition === 'right' && (
                <Icon className="h-4 w-4 ml-2" />
              )}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}