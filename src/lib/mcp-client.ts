import { 
  GovernanceProposal, 
  EthicsCompatibilityResult, 
  CrossDomainAnalysis,
  RepoStatus 
} from '@/types/mcp';

export interface MCPResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export class MCPClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/mcp') {
    this.baseUrl = baseUrl;
  }

  async createProposal(
    title: string,
    description: string,
    type: 'ethics_evolution' | 'policy_change' | 'resource_allocation' | 'structural_change',
    domain: string,
    author: string
  ): Promise<MCPResponse<GovernanceProposal>> {
    return this.post('/create-proposal', {
      title,
      description,
      type,
      domain,
      author
    });
  }

  async getActiveProposals(): Promise<MCPResponse<GovernanceProposal[]>> {
    return this.get('/active-proposals');
  }

  async getProposal(id: string): Promise<MCPResponse<GovernanceProposal>> {
    return this.get(`/proposals/${id}`);
  }

  async validateEthicsCompatibility(
    proposal: Partial<GovernanceProposal>
  ): Promise<MCPResponse<EthicsCompatibilityResult>> {
    return this.post('/validate-ethics', { proposal });
  }

  async analyzeCrossDomainImpact(
    proposal: Partial<GovernanceProposal>
  ): Promise<MCPResponse<CrossDomainAnalysis>> {
    return this.post('/analyze-cross-domain', { proposal });
  }

  async getRepoStatus(): Promise<MCPResponse<RepoStatus>> {
    return this.get('/repo-status');
  }

  async getCurrentEthics(): Promise<MCPResponse<Record<string, any>>> {
    return this.get('/current-ethics');
  }

  async getProposalDiscussion(issueNumber: number): Promise<MCPResponse<any[]>> {
    return this.get(`/proposals/${issueNumber}/discussion`);
  }

  async updateProposalStatus(
    issueNumber: number, 
    status: string
  ): Promise<MCPResponse<void>> {
    return this.post(`/proposals/${issueNumber}/status`, { status });
  }

  private async get<T>(endpoint: string): Promise<MCPResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async post<T>(endpoint: string, body: any): Promise<MCPResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Singleton instance
export const mcpClient = new MCPClient();