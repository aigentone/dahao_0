'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

interface LoginButtonProps {
  className?: string;
}

export function LoginButton({ className }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    // Redirect to GitHub OAuth
    window.location.href = '/api/auth/github';
  };

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      className={className}
      variant="outline"
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" />
      {isLoading ? 'Redirecting...' : 'Sign in with GitHub'}
    </Button>
  );
}