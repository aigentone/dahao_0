import { NextResponse } from 'next/server';
import { getAllDiscussions, getOrganizationStats } from '@/lib/governance-data';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { InheritanceConfig, GovernancePrinciple } from '@/types/governance';

export async function GET() {
  try {
    const discussions = getAllDiscussions();
    const organizationStats = getOrganizationStats();
    
    // Transform organization stats into the expected format with real inheritance
    const organizations = organizationStats.map(stat => {
      const orgDiscussions = discussions.filter(d => d.domain === stat.domain);
      const inheritance = loadInheritanceConfig(stat.domain);
      const effectivePrinciples = getEffectivePrinciples(stat.domain);
      
      return {
        id: stat.domain,
        name: inheritance.name,
        description: inheritance.description,
        version: inheritance.version,
        inheritance,
        principles: effectivePrinciples,
        discussions: orgDiscussions.map(discussion => ({
          title: discussion.title,
          status: discussion.status,
          proposal: discussion.summary,
          created: discussion.created,
          author: discussion.author,
          summary: discussion.summary,
          content: discussion.content, // Now includes full markdown content
          filename: `${discussion.id}.md`,
          path: `dahao-governance/${discussion.domain}/discussions/${discussion.category}/${discussion.id}.md`
        })),
        emoji: getEmojiForDomain(stat.domain)
      };
    });
    
    // Create discussionsByPrinciple structure
    const discussionsByPrinciple: Record<string, any[]> = {};
    organizations.forEach(org => {
      org.discussions.forEach(discussion => {
        const key = `${org.id}_discussions`;
        if (!discussionsByPrinciple[key]) {
          discussionsByPrinciple[key] = [];
        }
        discussionsByPrinciple[key].push(discussion);
      });
    });

    const data = {
      organizations,
      principlesByOrg: organizations.reduce((acc, org) => {
        acc[org.id] = org.principles;
        return acc;
      }, {} as Record<string, any>),
      discussionsByPrinciple
    };
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading governance data:', error);
    return NextResponse.json(
      { error: 'Failed to load governance data' },
      { status: 500 }
    );
  }
}

function loadInheritanceConfig(domain: string): InheritanceConfig {
  try {
    const inheritancePath = path.join(process.cwd(), 'dahao-governance', domain, 'inheritance.yml');
    if (fs.existsSync(inheritancePath)) {
      const content = fs.readFileSync(inheritancePath, 'utf-8');
      const inheritanceData = yaml.load(content) as InheritanceConfig;
      return inheritanceData;
    }
  } catch (error) {
    console.error(`Error loading inheritance config for ${domain}:`, error);
  }
  
  // Fallback for missing inheritance files
  return {
    version: '1.0',
    name: domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: `Governance for ${domain}`,
    repository: `dahao-org/${domain}`,
    extends: null
  };
}

function getCorePrinciples(): GovernancePrinciple[] {
  const coreVersion = 'v1.1'; // Core governance current version
  const corePath = path.join(process.cwd(), 'dahao-governance', 'core-governance', 'ethics', coreVersion);
  const principles: GovernancePrinciple[] = [];
  
  if (fs.existsSync(corePath)) {
    const files = fs.readdirSync(corePath).filter(f => f.endsWith('.yml'));
    
    for (const file of files) {
      try {
        const filePath = path.join(corePath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const principle = yaml.load(content) as GovernancePrinciple;
        
        // Mark as inherited
        principle.inheritance_source = 'core-governance';
        principle.is_inherited = true;
        
        principles.push(principle);
      } catch (error) {
        console.error(`Error loading core principle ${file}:`, error);
      }
    }
  }
  
  return principles;
}

function getDomainSpecificPrinciples(domain: string): GovernancePrinciple[] {
  const inheritance = loadInheritanceConfig(domain);
  const principles: GovernancePrinciple[] = [];
  
  // Get domain-specific principles from inheritance config
  if (inheritance.domain_extensions) {
    for (const [extensionId, extensionConfig] of Object.entries(inheritance.domain_extensions)) {
      try {
        const version = (extensionConfig as any).version || inheritance.version;
        const versionDir = `v${version}`;
        const filePath = path.join(process.cwd(), 'dahao-governance', domain, 'ethics', versionDir, `${extensionId}.yml`);
        
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const principle = yaml.load(content) as GovernancePrinciple;
          
          // Mark as domain-specific
          principle.inheritance_source = domain;
          principle.is_inherited = false;
          principle.extension_config = extensionConfig;
          
          principles.push(principle);
        }
      } catch (error) {
        console.error(`Error loading domain principle ${extensionId} for ${domain}:`, error);
      }
    }
  }
  
  return principles;
}

function getEffectivePrinciples(domain: string): GovernancePrinciple[] {
  const inheritance = loadInheritanceConfig(domain);
  const principles: GovernancePrinciple[] = [];
  
  // Add inherited core principles if domain extends core-governance
  if (inheritance.extends && inheritance.extends.includes('core-governance')) {
    const corePrinciples = getCorePrinciples();
    
    // Apply inheritance modifications
    for (const corePrinciple of corePrinciples) {
      const inheritanceRule = inheritance.inheritance?.core_principles?.[corePrinciple.principle_id];
      
      if (inheritanceRule === 'inherited') {
        // Use as-is
        principles.push(corePrinciple);
      } else if (typeof inheritanceRule === 'string' && inheritanceRule.startsWith('inherited_')) {
        // Modified inheritance
        const modifiedPrinciple = { ...corePrinciple };
        modifiedPrinciple.inheritance_modification = inheritanceRule;
        modifiedPrinciple.description = `${corePrinciple.description} (${inheritanceRule.replace('inherited_', '').replace(/_/g, ' ')})`;
        principles.push(modifiedPrinciple);
      }
    }
  }
  
  // Add domain-specific principles
  const domainPrinciples = getDomainSpecificPrinciples(domain);
  principles.push(...domainPrinciples);
  
  return principles;
}


function getEmojiForDomain(domain: string): string {
  const emojis = {
    'animal-welfare': '🐾',
    'core-governance': '🏛️',
    'environment': '🌱'
  };
  return emojis[domain as keyof typeof emojis] || '📋';
}