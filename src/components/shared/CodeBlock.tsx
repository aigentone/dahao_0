import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code?: string;
  children?: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  variant?: 'default' | 'terminal' | 'inline';
}

export function CodeBlock({
  code,
  children,
  language,
  showLineNumbers = false,
  className = '',
  variant = 'default'
}: CodeBlockProps) {
  const content = code || children;
  
  if (variant === 'inline') {
    return (
      <code className={cn(
        'px-1.5 py-0.5 rounded text-sm font-mono',
        'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200',
        className
      )}>
        {content}
      </code>
    );
  }

  const lines = typeof content === 'string' ? content.split('\n') : [content];
  
  const baseClasses = variant === 'terminal' 
    ? 'bg-gray-900 dark:bg-gray-950 text-gray-100'
    : 'bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200';

  return (
    <div className={cn(
      'rounded-md overflow-hidden',
      className
    )}>
      {language && variant !== 'terminal' && (
        <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 text-xs font-mono text-gray-600 dark:text-gray-400">
          {language}
        </div>
      )}
      <pre className={cn(
        'p-4 overflow-x-auto text-sm font-mono',
        baseClasses,
        language && variant !== 'terminal' ? 'rounded-t-none' : 'rounded-md'
      )}>
        {showLineNumbers ? (
          <code>
            {lines.map((line, index) => (
              <div key={index} className="table-row">
                <span className="table-cell pr-4 text-gray-500 select-none text-right">
                  {index + 1}
                </span>
                <span className="table-cell">{line}</span>
              </div>
            ))}
          </code>
        ) : (
          <code>{content}</code>
        )}
      </pre>
    </div>
  );
}