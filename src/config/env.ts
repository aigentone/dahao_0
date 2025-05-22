export interface EnvConfig {
  GITHUB_TOKEN?: string;
  GITLAB_TOKEN?: string;
  GITEA_TOKEN?: string;
  GIT_PROVIDER?: 'github' | 'gitlab' | 'gitea';
  GIT_OWNER?: string;
  GIT_BASE_URL?: string; // For self-hosted instances
}

export function getEnvConfig(): EnvConfig {
  return {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITLAB_TOKEN: process.env.GITLAB_TOKEN,
    GITEA_TOKEN: process.env.GITEA_TOKEN,
    GIT_PROVIDER: (process.env.GIT_PROVIDER as EnvConfig['GIT_PROVIDER']) || 'github',
    GIT_OWNER: process.env.GIT_OWNER,
    GIT_BASE_URL: process.env.GIT_BASE_URL,
  };
}

export function validateEnvConfig(config: EnvConfig): void {
  const provider = config.GIT_PROVIDER || 'github';
  
  switch (provider) {
    case 'github':
      if (!config.GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN environment variable is required for GitHub provider');
      }
      break;
    case 'gitlab':
      if (!config.GITLAB_TOKEN) {
        throw new Error('GITLAB_TOKEN environment variable is required for GitLab provider');
      }
      break;
    case 'gitea':
      if (!config.GITEA_TOKEN) {
        throw new Error('GITEA_TOKEN environment variable is required for Gitea provider');
      }
      if (!config.GIT_BASE_URL) {
        throw new Error('GIT_BASE_URL environment variable is required for Gitea provider');
      }
      break;
    default:
      throw new Error(`Unknown GIT_PROVIDER: ${provider}`);
  }
  
  if (!config.GIT_OWNER) {
    throw new Error('GIT_OWNER environment variable is required');
  }
}

export function getProviderToken(config: EnvConfig): string {
  const provider = config.GIT_PROVIDER || 'github';
  
  switch (provider) {
    case 'github':
      return config.GITHUB_TOKEN!;
    case 'gitlab':
      return config.GITLAB_TOKEN!;
    case 'gitea':
      return config.GITEA_TOKEN!;
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}