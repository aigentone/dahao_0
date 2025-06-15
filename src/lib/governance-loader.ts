import yaml from 'js-yaml';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { 
  GovernanceData, 
  GovernanceOrganization, 
  GovernancePrinciple,
  GovernanceRule,
  InheritanceConfig,
  GovernanceDiscussion,
  OrganizationType 
} from '@/types/governance';

const GOVERNANCE_ROOT = path.join(process.cwd(), 'dahao-governance');

export class GovernanceLoader {
  private static instance: GovernanceLoader;
  private cached: GovernanceData | null = null;

  static getInstance(): GovernanceLoader {
    if (!GovernanceLoader.instance) {
      GovernanceLoader.instance = new GovernanceLoader();
    }
    return GovernanceLoader.instance;
  }

  async loadGovernanceData(): Promise<GovernanceData> {
    if (this.cached) {
      return this.cached;
    }

    const organizations = await this.loadOrganizations();
    
    const principlesByOrg: Record<string, GovernancePrinciple[]> = {};
    const rulesByOrg: Record<string, GovernanceRule[]> = {};
    const rulesByPrinciple: Record<string, GovernanceRule[]> = {};
    const discussionsByPrinciple: Record<string, GovernanceDiscussion[]> = {};

    for (const org of organizations) {
      principlesByOrg[org.id] = org.principles;
      rulesByOrg[org.id] = org.rules;
      
      // Group rules by the principles they derive from
      for (const rule of org.rules) {
        if (rule.derives_from_principles) {
          for (const principleRef of rule.derives_from_principles) {
            if (!rulesByPrinciple[principleRef]) {
              rulesByPrinciple[principleRef] = [];
            }
            rulesByPrinciple[principleRef].push(rule);
          }
        }
      }
      
      // Group discussions by principle
      for (const discussion of org.discussions) {
        const principleKey = this.extractPrincipleFromPath(discussion.path);
        if (principleKey) {
          if (!discussionsByPrinciple[principleKey]) {
            discussionsByPrinciple[principleKey] = [];
          }
          discussionsByPrinciple[principleKey].push(discussion);
        }
      }
    }

    this.cached = {
      organizations,
      principlesByOrg,
      rulesByOrg,
      rulesByPrinciple,
      discussionsByPrinciple
    };

    return this.cached;
  }

  private async loadOrganizations(): Promise<GovernanceOrganization[]> {
    const orgConfigs: Array<{id: OrganizationType, name: string, emoji: string}> = [
      { id: 'core-governance', name: 'Core Governance', emoji: '🏛️' },
      { id: 'animal-welfare', name: 'Animal Welfare', emoji: '🐾' },
      { id: 'environment', name: 'Environment', emoji: '🌍' }
    ];

    const organizations: GovernanceOrganization[] = [];

    for (const config of orgConfigs) {
      try {
        const orgPath = path.join(GOVERNANCE_ROOT, config.id);
        
        // Load inheritance config
        const inheritancePath = path.join(orgPath, 'inheritance.yml');
        const inheritanceContent = await fs.readFile(inheritancePath, 'utf-8');
        const inheritance = yaml.load(inheritanceContent) as InheritanceConfig;

        // Load principles
        const principles = await this.loadPrinciples(orgPath);
        
        // Load rules
        const rules = await this.loadRules(orgPath);
        
        // Load discussions
        const discussions = await this.loadDiscussions(orgPath);

        organizations.push({
          id: config.id,
          name: config.name,
          version: inheritance.version,
          description: inheritance.description,
          inheritance,
          principles,
          rules,
          discussions,
          emoji: config.emoji
        });
      } catch (error) {
        console.error(`Error loading organization ${config.id}:`, error);
      }
    }

    return organizations;
  }

  private async loadPrinciples(orgPath: string): Promise<GovernancePrinciple[]> {
    const principles: GovernancePrinciple[] = [];
    
    try {
      const ethicsPath = path.join(orgPath, 'ethics');
      const versions = await fs.readdir(ethicsPath);
      
      for (const version of versions) {
        if (version.startsWith('.')) continue;
        
        const versionPath = path.join(ethicsPath, version);
        const stat = await fs.stat(versionPath);
        
        if (stat.isDirectory()) {
          const files = await fs.readdir(versionPath);
          
          for (const file of files) {
            if (file.endsWith('.yml') || file.endsWith('.yaml')) {
              try {
                const filePath = path.join(versionPath, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const principle = yaml.load(content) as GovernancePrinciple;
                principles.push(principle);
              } catch (error) {
                console.error(`Error loading principle ${file}:`, error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error loading principles from ${orgPath}:`, error);
    }

    return principles;
  }

  private async loadRules(orgPath: string): Promise<GovernanceRule[]> {
    const rules: GovernanceRule[] = [];
    
    try {
      const rulesPath = path.join(orgPath, 'rules');
      const versions = await fs.readdir(rulesPath);
      
      for (const version of versions) {
        if (version.startsWith('.')) continue;
        
        const versionPath = path.join(rulesPath, version);
        const stat = await fs.stat(versionPath);
        
        if (stat.isDirectory()) {
          const files = await fs.readdir(versionPath);
          
          for (const file of files) {
            if (file.endsWith('.yml') || file.endsWith('.yaml')) {
              try {
                const filePath = path.join(versionPath, file);
                const content = await fs.readFile(filePath, 'utf-8');
                const rule = yaml.load(content) as GovernanceRule;
                rules.push(rule);
              } catch (error) {
                console.error(`Error loading rule ${file}:`, error);
              }
            }
          }
        }
      }
    } catch (error) {
      // Rules directory might not exist yet, that's okay
      console.log(`No rules directory found for ${orgPath}, skipping rules loading`);
    }

    return rules;
  }

  private async loadDiscussions(orgPath: string): Promise<GovernanceDiscussion[]> {
    const discussions: GovernanceDiscussion[] = [];
    
    try {
      const discussionsPath = path.join(orgPath, 'discussions');
      await this.loadDiscussionsRecursive(discussionsPath, discussions);
    } catch (error) {
      console.error(`Error loading discussions from ${orgPath}:`, error);
    }

    return discussions;
  }

  private async loadDiscussionsRecursive(dirPath: string, discussions: GovernanceDiscussion[]): Promise<void> {
    try {
      const items = await fs.readdir(dirPath);
      
      for (const item of items) {
        if (item.startsWith('.')) continue;
        
        const itemPath = path.join(dirPath, item);
        const stat = await fs.stat(itemPath);
        
        if (stat.isDirectory()) {
          await this.loadDiscussionsRecursive(itemPath, discussions);
        } else if (item.endsWith('.md')) {
          try {
            const content = await fs.readFile(itemPath, 'utf-8');
            const parsed = matter(content);
            
            // Extract metadata from markdown content
            const lines = content.split('\n');
            let title = '', status = '', created = '', author = '', summary = '';
            
            for (const line of lines) {
              if (line.startsWith('# ')) {
                title = line.substring(2).trim();
              } else if (line.startsWith('**Status:**')) {
                status = line.replace('**Status:**', '').trim();
              } else if (line.startsWith('**Created:**')) {
                created = line.replace('**Created:**', '').trim();
              } else if (line.startsWith('**Author:**')) {
                author = line.replace('**Author:**', '').trim();
              } else if (line.startsWith('## Summary')) {
                const summaryIndex = lines.indexOf(line);
                if (summaryIndex >= 0 && summaryIndex + 1 < lines.length) {
                  summary = lines[summaryIndex + 1]?.trim() || '';
                }
                break;
              }
            }

            discussions.push({
              title: title || item.replace('.md', ''),
              status: status || 'unknown',
              created: created || 'unknown',
              author: author || 'unknown',
              summary: summary || '',
              content: content,
              filename: item,
              path: itemPath
            });
          } catch (error) {
            console.error(`Error loading discussion ${item}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
  }

  private extractPrincipleFromPath(discussionPath: string): string | null {
    // Extract principle name from discussion path
    // e.g., "/path/to/discussions/transparency/file.md" -> "transparency"
    const pathParts = discussionPath.split('/');
    const discussionsIndex = pathParts.findIndex(part => part === 'discussions');
    
    if (discussionsIndex >= 0 && discussionsIndex + 1 < pathParts.length) {
      return pathParts[discussionsIndex + 1];
    }
    
    return null;
  }

  clearCache(): void {
    this.cached = null;
  }
}

export const governanceLoader = GovernanceLoader.getInstance();