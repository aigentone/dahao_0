import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  variant?: 'info' | 'warning' | 'success' | 'error' | 'neutral';
  title?: string;
  showIcon?: boolean;
  className?: string;
  children: ReactNode;
}

const variantConfig = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    icon: Info,
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600 dark:text-yellow-400'
  },
  success: {
    container: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600 dark:text-green-400'
  },
  error: {
    container: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: XCircle,
    iconColor: 'text-red-600 dark:text-red-400'
  },
  neutral: {
    container: 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700',
    text: 'text-gray-800 dark:text-gray-200',
    icon: AlertCircle,
    iconColor: 'text-gray-600 dark:text-gray-400'
  }
};

export function InfoCard({
  variant = 'info',
  title,
  showIcon = true,
  className = '',
  children
}: InfoCardProps) {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <Card className={cn(config.container, className)}>
      <CardContent className="pt-6">
        <div className={cn('text-sm', config.text)}>
          {(showIcon || title) && (
            <div className="flex items-start gap-3 mb-2">
              {showIcon && (
                <IconComponent className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconColor)} />
              )}
              {title && (
                <strong className="font-semibold">{title}</strong>
              )}
            </div>
          )}
          <div className={showIcon || title ? 'ml-8' : ''}>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}