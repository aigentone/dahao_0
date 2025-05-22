import { GitProvider } from './types';
import { GitHubProvider } from './github';

export type ProviderType = 'github' | 'gitlab' | 'gitea';

export interface ProviderConfig {
  type: ProviderType;
  token: string;
  baseUrl?: string; // For self-hosted instances
}

export class GitProviderFactory {
  static create(config: ProviderConfig): GitProvider {
    switch (config.type) {
      case 'github':
        return new GitHubProvider(config.token);
      case 'gitlab':
        throw new Error('GitLab provider not implemented yet');
      case 'gitea':
        throw new Error('Gitea provider not implemented yet');
      default:
        throw new Error(`Unknown provider type: ${config.type}`);
    }
  }
}

export * from './types';
export { GitHubProvider } from './github';