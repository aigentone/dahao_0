import { ButtonHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  iconPosition?: 'left' | 'right';
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children?: React.ReactNode;
}

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
};

const sizeClasses = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 py-2 text-sm gap-2',
  lg: 'h-11 px-8 text-base gap-2',
  icon: 'h-10 w-10 p-0'
};

const iconSizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  icon: 'h-5 w-5'
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    icon: Icon, 
    iconPosition = 'left', 
    variant = 'default', 
    size = 'md',
    className,
    children,
    ...props 
  }, ref) => {
    const isIconOnly = size === 'icon' || !children;

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {iconPosition === 'left' && (
          <Icon className={cn(iconSizeClasses[size], !isIconOnly && 'mr-0')} />
        )}
        {children}
        {iconPosition === 'right' && children && (
          <Icon className={cn(iconSizeClasses[size], 'ml-0')} />
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';