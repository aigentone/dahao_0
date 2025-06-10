import { NextRequest, NextResponse } from 'next/server';

// Import the working server directly
let DAHAOServer: any;
let mcpServer: any;

// Dynamic import to handle ES modules
async function getMCPServer() {
  if (!mcpServer) {
    try {
      const module = await import('../../../mcp-server/dist/working-server.js');
      DAHAOServer = module.DAHAOServer;
      mcpServer = new DAHAOServer();
    } catch (error) {
      console.error('Failed to import MCP server:', error);
      throw new Error('MCP server not available');
    }
  }
  return mcpServer;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    const server = await getMCPServer();
    
    switch (action) {
      case 'active-proposals':
        const proposals = await server.getActiveProposals();
        return NextResponse.json({ success: true, data: proposals });

      case 'repo-status':
        const status = await server.getRepoStatus();
        return NextResponse.json({ success: true, data: status });

      case 'current-ethics':
        const ethics = await server.getCurrentEthics();
        return NextResponse.json({ success: true, data: ethics });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('MCP API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...parameters } = body;
    const server = await getMCPServer();

    let result;
    switch (action) {
      case 'create-proposal':
        result = await server.createProposal(
          parameters.title,
          parameters.description,
          parameters.type,
          parameters.domain,
          parameters.author
        );
        break;

      case 'validate-ethics':
        result = await server.validateEthicsCompatibility(parameters.proposal);
        break;

      case 'analyze-cross-domain':
        result = await server.analyzeCrossDomainImpact(parameters.proposal);
        break;

      case 'update-proposal-status':
        result = await server.updateProposalStatus(
          parameters.issueNumber,
          parameters.status
        );
        break;

      case 'get-proposal-discussion':
        result = await server.getProposalDiscussion(parameters.issueNumber);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('MCP API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}