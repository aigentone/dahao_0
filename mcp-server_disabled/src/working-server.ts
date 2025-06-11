#!/usr/bin/env node

/**
 * DAHAO MCP Server - Working Implementation
 * This server provides the governance tools for the DAHAO platform
 */

import { GitHubIntegration } from './tools/github-integration.js';
import { EthicsValidator } from './tools/ethics-validator.js';
import { CrossDomainAnalyzer } from './tools/cross-domain-analyzer.js';
import { GovernanceProposal } from './types/governance.js';

class DAHAOServer {
  private githubIntegration: GitHubIntegration;
  private ethicsValidator: EthicsValidator;
  private crossDomainAnalyzer: CrossDomainAnalyzer;

  constructor() {
    // Initialize tools with environment variables
    const githubToken = process.env.GITHUB_TOKEN || '';
    const repoOwner = process.env.REPO_OWNER || 'aigentone';
    const repoName = process.env.REPO_NAME || 'dahao_0';
    const repoPath = process.env.REPO_PATH || process.cwd();

    this.githubIntegration = new GitHubIntegration(githubToken, repoOwner, repoName);
    this.ethicsValidator = new EthicsValidator(repoPath);
    this.crossDomainAnalyzer = new CrossDomainAnalyzer();

    console.log('DAHAO Server initialized with:');
    console.log(`- Repository: ${repoOwner}/${repoName}`);
    console.log(`- GitHub Token: ${githubToken ? 'configured' : 'missing'}`);
    console.log(`- Repo Path: ${repoPath}`);
  }

  async createProposal(title: string, description: string, type: string, domain: string, author: string) {
    try {
      const proposal: GovernanceProposal = {
        id: `DIP-${Date.now()}`,
        title,
        description,
        type: type as any,
        domain,
        status: 'draft',
        createdAt: new Date().toISOString(),
        author
      };

      // Validate ethics compatibility
      const ethicsResult = await this.ethicsValidator.validateProposal(proposal);
      proposal.ethicsCompatibility = ethicsResult;

      // Analyze cross-domain impact
      const crossDomainResult = await this.crossDomainAnalyzer.analyzeCrossDomainImpact(proposal);
      proposal.crossDomainImpact = crossDomainResult;

      // Create GitHub Issue if token is available
      if (process.env.GITHUB_TOKEN) {
        const issueNumber = await this.githubIntegration.createProposalIssue(proposal);
        proposal.githubIssueNumber = issueNumber;
        proposal.status = 'discussion';
      }

      return proposal;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  }

  async getActiveProposals() {
    try {
      if (!process.env.GITHUB_TOKEN) {
        return []; // Return empty array if no GitHub token
      }
      return await this.githubIntegration.getActiveProposals();
    } catch (error) {
      console.error('Error getting active proposals:', error);
      return [];
    }
  }

  async getProposalDiscussion(issueNumber: number) {
    try {
      if (!process.env.GITHUB_TOKEN) {
        return [];
      }
      return await this.githubIntegration.getProposalDiscussion(issueNumber);
    } catch (error) {
      console.error('Error getting proposal discussion:', error);
      return [];
    }
  }

  async updateProposalStatus(issueNumber: number, status: string) {
    try {
      if (!process.env.GITHUB_TOKEN) {
        return { success: false, message: 'GitHub token not configured' };
      }
      await this.githubIntegration.updateProposalStatus(issueNumber, status);
      return { success: true, message: `Status updated to ${status}` };
    } catch (error) {
      console.error('Error updating proposal status:', error);
      throw error;
    }
  }

  async validateEthicsCompatibility(proposal: Partial<GovernanceProposal>) {
    try {
      return await this.ethicsValidator.validateProposal(proposal as GovernanceProposal);
    } catch (error) {
      console.error('Error validating ethics compatibility:', error);
      return {
        compatible: false,
        conflicts: ['Error validating proposal'],
        recommendations: [],
        requiredUpdates: []
      };
    }
  }

  async analyzeCrossDomainImpact(proposal: Partial<GovernanceProposal>) {
    try {
      return await this.crossDomainAnalyzer.analyzeCrossDomainImpact(proposal as GovernanceProposal);
    } catch (error) {
      console.error('Error analyzing cross-domain impact:', error);
      return {
        affectedDomains: [],
        impacts: [],
        synergies: [],
        risks: []
      };
    }
  }

  async getCurrentEthics() {
    try {
      const ethics = await this.ethicsValidator.getCurrentEthics();
      const versions = await this.ethicsValidator.getEthicsVersions();
      
      return {
        frameworks: ethics,
        versions: versions
      };
    } catch (error) {
      console.error('Error getting current ethics:', error);
      return {
        frameworks: {},
        versions: {}
      };
    }
  }

  async getRepoStatus() {
    try {
      const activeProposals = await this.getActiveProposals();
      const ethicsVersions = await this.ethicsValidator.getEthicsVersions();
      
      return {
        currentBranch: 'main',
        activeProposals: activeProposals.length,
        ethicsVersions,
        lastActivity: new Date().toISOString(),
        collaborationMetrics: {
          contributors: 1,
          proposalsThisMonth: activeProposals.length,
          implementationRate: 0.8
        }
      };
    } catch (error) {
      console.error('Error getting repo status:', error);
      return {
        currentBranch: 'main',
        activeProposals: 0,
        ethicsVersions: {},
        lastActivity: new Date().toISOString(),
        collaborationMetrics: {
          contributors: 0,
          proposalsThisMonth: 0,
          implementationRate: 0
        }
      };
    }
  }
}

// Export for use by API routes
export { DAHAOServer };

// If run directly, start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('DAHAO MCP Server - Working Implementation');
  console.log('Available tools:');
  console.log('- create_proposal');
  console.log('- get_active_proposals');
  console.log('- get_proposal_discussion');
  console.log('- update_proposal_status');
  console.log('- validate_ethics_compatibility');
  console.log('- analyze_cross_domain_impact');
  console.log('- get_current_ethics');
  console.log('- get_repo_status');
  
  const server = new DAHAOServer();
  console.log('Server ready for API calls');
}