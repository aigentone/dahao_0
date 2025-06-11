#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { GitHubIntegration } from './tools/github-integration.js';
import { EthicsValidator } from './tools/ethics-validator.js';
import { CrossDomainAnalyzer } from './tools/cross-domain-analyzer.js';
import { GovernanceProposal } from './types/governance.js';

class DAHAOMCPServer {
  private server: Server;
  private githubIntegration: GitHubIntegration;
  private ethicsValidator: EthicsValidator;
  private crossDomainAnalyzer: CrossDomainAnalyzer;

  constructor() {
    this.server = new Server(
      {
        name: 'dahao-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Initialize tools
    const githubToken = process.env.GITHUB_TOKEN || '';
    const repoOwner = process.env.REPO_OWNER || 'aigentone';
    const repoName = process.env.REPO_NAME || 'dahao_0';
    const repoPath = process.env.REPO_PATH || process.cwd();

    this.githubIntegration = new GitHubIntegration(githubToken, repoOwner, repoName);
    this.ethicsValidator = new EthicsValidator(repoPath);
    this.crossDomainAnalyzer = new CrossDomainAnalyzer();

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'create_proposal',
            description: 'Create a new governance proposal with GitHub Issue integration',
            inputSchema: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                type: { type: 'string', enum: ['ethics_evolution', 'policy_change', 'resource_allocation', 'structural_change'] },
                domain: { type: 'string' },
                author: { type: 'string' }
              },
              required: ['title', 'description', 'type', 'domain', 'author']
            }
          },
          {
            name: 'get_active_proposals',
            description: 'Get all active governance proposals from GitHub Issues',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          },
          {
            name: 'get_proposal_discussion',
            description: 'Get discussion comments for a specific proposal',
            inputSchema: {
              type: 'object',
              properties: {
                issueNumber: { type: 'number' }
              },
              required: ['issueNumber']
            }
          },
          {
            name: 'update_proposal_status',
            description: 'Update the status of a proposal',
            inputSchema: {
              type: 'object',
              properties: {
                issueNumber: { type: 'number' },
                status: { type: 'string' }
              },
              required: ['issueNumber', 'status']
            }
          },
          {
            name: 'validate_ethics_compatibility',
            description: 'Validate a proposal against current ethics frameworks',
            inputSchema: {
              type: 'object',
              properties: {
                proposal: { type: 'object' }
              },
              required: ['proposal']
            }
          },
          {
            name: 'analyze_cross_domain_impact',
            description: 'Analyze the cross-domain impact of a proposal',
            inputSchema: {
              type: 'object',
              properties: {
                proposal: { type: 'object' }
              },
              required: ['proposal']
            }
          },
          {
            name: 'get_current_ethics',
            description: 'Get current ethics framework versions and content',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          },
          {
            name: 'get_repo_status',
            description: 'Get current repository governance status',
            inputSchema: {
              type: 'object',
              properties: {}
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'create_proposal':
            return await this.createProposal(args);
          
          case 'get_active_proposals':
            return await this.getActiveProposals();
          
          case 'get_proposal_discussion':
            return await this.getProposalDiscussion(args);
          
          case 'update_proposal_status':
            return await this.updateProposalStatus(args);
          
          case 'validate_ethics_compatibility':
            return await this.validateEthicsCompatibility(args);
          
          case 'analyze_cross_domain_impact':
            return await this.analyzeCrossDomainImpact(args);
          
          case 'get_current_ethics':
            return await this.getCurrentEthics();
          
          case 'get_repo_status':
            return await this.getRepoStatus();
          
          default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  private async createProposal(args: any) {
    const proposal: GovernanceProposal = {
      id: `DIP-${Date.now()}`,
      title: args.title,
      description: args.description,
      type: args.type,
      domain: args.domain,
      status: 'draft',
      createdAt: new Date().toISOString(),
      author: args.author
    };

    // Validate ethics compatibility
    const ethicsResult = await this.ethicsValidator.validateProposal(proposal);
    proposal.ethicsCompatibility = ethicsResult;

    // Analyze cross-domain impact
    const crossDomainResult = await this.crossDomainAnalyzer.analyzeCrossDomainImpact(proposal);
    proposal.crossDomainImpact = crossDomainResult;

    // Create GitHub Issue
    const issueNumber = await this.githubIntegration.createProposalIssue(proposal);
    proposal.githubIssueNumber = issueNumber;
    proposal.status = 'discussion';

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(proposal, null, 2)
      }]
    };
  }

  private async getActiveProposals() {
    const proposals = await this.githubIntegration.getActiveProposals();
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(proposals, null, 2)
      }]
    };
  }

  private async getProposalDiscussion(args: any) {
    const discussion = await this.githubIntegration.getProposalDiscussion(args.issueNumber);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(discussion, null, 2)
      }]
    };
  }

  private async updateProposalStatus(args: any) {
    await this.githubIntegration.updateProposalStatus(args.issueNumber, args.status);
    return {
      content: [{
        type: 'text',
        text: `Proposal ${args.issueNumber} status updated to ${args.status}`
      }]
    };
  }

  private async validateEthicsCompatibility(args: any) {
    const result = await this.ethicsValidator.validateProposal(args.proposal);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }

  private async analyzeCrossDomainImpact(args: any) {
    const result = await this.crossDomainAnalyzer.analyzeCrossDomainImpact(args.proposal);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  }

  private async getCurrentEthics() {
    const ethics = await this.ethicsValidator.getCurrentEthics();
    const versions = await this.ethicsValidator.getEthicsVersions();
    
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          frameworks: ethics,
          versions: versions
        }, null, 2)
      }]
    };
  }

  private async getRepoStatus() {
    const activeProposals = await this.githubIntegration.getActiveProposals();
    const ethicsVersions = await this.ethicsValidator.getEthicsVersions();
    
    const status = {
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

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(status, null, 2)
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('DAHAO MCP Server running on stdio');
  }
}

// Start the server
async function main() {
  const server = new DAHAOMCPServer();
  await server.run();
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});