// Governance Tool Executor - Clean Interface Adapter for Rule-Based Analysis
// Bridges rule interpreter with Vercel AI SDK governance analysis tools
// Maintains separation of concerns while enabling governance context integration

import { RuleContext } from './types';
import { mcpAnalysisTools } from '../mcp/analysis-tools';

export interface ToolExecutionResult {
  [toolName: string]: any;
}

export interface ToolExecutionError {
  error: string;
  toolName: string;
  timestamp: string;
}

/**
 * Clean tool executor that adapts Vercel AI SDK tools for rule interpreter use
 * Provides governance context to rule-based analysis without MCP overhead
 */
export class GovernanceToolExecutor {
  /**
   * Execute multiple governance analysis tools with rule context
   * Returns rich governance data for rule-based analysis enhancement
   */
  async executeTools(toolNames: string[], context: RuleContext): Promise<ToolExecutionResult> {
    const results: ToolExecutionResult = {};
    
    console.log(`🔧 Executing ${toolNames.length} governance tools: ${toolNames.join(', ')}`);
    const startTime = Date.now();
    
    for (const toolName of toolNames) {
      try {
        const toolStartTime = Date.now();
        results[toolName] = await this.executeTool(toolName, context);
        const duration = Date.now() - toolStartTime;
        console.log(`✅ Tool ${toolName} executed successfully (${duration}ms)`);
      } catch (error: any) {
        console.warn(`❌ Tool execution failed for ${toolName}:`, error.message);
        results[toolName] = {
          error: error.message,
          toolName,
          timestamp: new Date().toISOString()
        } as ToolExecutionError;
      }
    }
    
    const totalDuration = Date.now() - startTime;
    console.log(`🎉 Tool execution completed in ${totalDuration}ms`);
    
    return results;
  }
  
  /**
   * Execute individual governance analysis tool with proper parameter mapping
   * Maps RuleContext to tool-specific parameters for seamless integration
   */
  private async executeTool(toolName: string, context: RuleContext): Promise<any> {
    switch (toolName) {
      case 'getBranchElements':
        return await mcpAnalysisTools.getBranchElements.execute({
          branchId: context.branch.id,
          elementType: context.element.type
        }, {} as any);
        
      case 'getElementUsage':
        return await mcpAnalysisTools.getElementUsage.execute({
          elementId: context.element.id,
          branchId: context.branch.id
        }, {} as any);
        
      case 'getBranchPhilosophy':
        return await mcpAnalysisTools.getBranchPhilosophy.execute({
          branchId: context.branch.id
        }, {} as any);
        
      case 'getElementVersion':
        return await mcpAnalysisTools.getElementVersion.execute({
          elementId: context.element.id,
          branchId: context.branch.id,
          version: context.element.version
        }, {} as any);
        
      default:
        throw new Error(`Unknown governance tool: ${toolName}. Available tools: ${this.getAvailableTools().join(', ')}`);
    }
  }
  
  /**
   * Get list of available governance analysis tools
   * Used for validation and error reporting
   */
  getAvailableTools(): string[] {
    return ['getBranchElements', 'getElementUsage', 'getBranchPhilosophy', 'getElementVersion'];
  }
  
  /**
   * Validate requested tool names against available tools
   * Helps prevent runtime errors and provides clear feedback
   */
  validateToolNames(toolNames: string[]): { valid: string[], invalid: string[] } {
    const available = this.getAvailableTools();
    const valid = toolNames.filter(name => available.includes(name));
    const invalid = toolNames.filter(name => !available.includes(name));
    return { valid, invalid };
  }
  
  /**
   * Check if a specific tool is available
   */
  isToolAvailable(toolName: string): boolean {
    return this.getAvailableTools().includes(toolName);
  }
  
  /**
   * Get detailed information about available tools
   * Useful for debugging and system introspection
   */
  getToolInfo(): Array<{ name: string, description: string, parameters: string[] }> {
    return [
      {
        name: 'getBranchElements',
        description: 'Get governance elements for specific branch and type',
        parameters: ['branchId', 'elementType']
      },
      {
        name: 'getElementUsage',
        description: 'Analyze element usage across governance documents',
        parameters: ['elementId', 'branchId']
      },
      {
        name: 'getBranchPhilosophy',
        description: 'Get philosophical foundation and principles for branch',
        parameters: ['branchId']
      },
      {
        name: 'getElementVersion',
        description: 'Get specific version of element with full details',
        parameters: ['elementId', 'branchId', 'version']
      }
    ];
  }
}