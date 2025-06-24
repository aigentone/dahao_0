// User Value Extraction Utilities for Dynamic Personal AI Context
// Extracts actual user values from their personal governance branches

import branchesData from '@/lib/mock-data/branches.json';
import termsData from '@/lib/mock-data/elements-terms.json';
import principlesData from '@/lib/mock-data/elements-principles.json';
import rulesData from '@/lib/mock-data/elements-rules.json';

export interface UserValueContext {
  userId: string;
  userName: string;
  branchId: string;
  branchName: string;
  branchType: string;
  
  // Core values extracted from user's governance modifications
  coreValues: string[];
  
  // Modified terms that reflect user's value system
  valueTerms: Array<{
    id: string;
    name: string;
    version: string;
    definition: string;
    modifications: string[];
  }>;
  
  // Personal principles that guide user's governance philosophy
  personalPrinciples: Array<{
    id: string;
    statement: string;
    isNew: boolean;
    version: string;
  }>;
  
  // Governance preferences based on rule modifications
  governancePreferences: Array<{
    area: string;
    preference: string;
    basedOn: string; // rule or modification that indicates this preference
  }>;
  
  // Inheritance chain for context
  inheritanceChain: string[];
}

// Define user profiles for different governance participants
export const USER_PROFILES = {
  'current-user': {
    id: 'current-user',
    name: 'Current User',
    defaultBranch: 'john-main-branch' // Default to John's branch for demo
  },
  'user-john-123': {
    id: 'user-john-123',
    name: 'John',
    defaultBranch: 'john-main-branch'
  },
  'user-sarah-456': {
    id: 'user-sarah-456', 
    name: 'Sarah',
    defaultBranch: 'sarah-main-branch'
  },
  'user-alex-004': {
    id: 'user-alex-004',
    name: 'Alex',
    defaultBranch: 'alex-eco-fork'
  },
  'user-mike-789': {
    id: 'user-mike-789',
    name: 'Mike',
    defaultBranch: 'mike-gov-fork'
  }
};

export function getUserValuesFromBranch(
  userId: string,
  userBranchId?: string
): UserValueContext {
  // Get user profile
  const userProfile = USER_PROFILES[userId as keyof typeof USER_PROFILES] || USER_PROFILES['current-user'];
  
  // Use provided branch or user's default branch
  const branchId = userBranchId || userProfile.defaultBranch;
  const branch = branchesData.branches[branchId as keyof typeof branchesData.branches];
  
  if (!branch) {
    // Fallback to core DAHAO if branch not found
    return getUserValuesFromBranch(userId, 'core-dahao');
  }

  // Build inheritance chain
  const inheritanceChain = getParentChain(branchId, Object.values(branchesData.branches));
  
  // Extract core values from branch modifications and description
  const coreValues = extractCoreValuesFromBranch(branch);
  
  // Extract modified terms that reflect user's values
  const valueTerms = extractValueTermsFromBranch(branchId, inheritanceChain);
  
  // Extract personal principles
  const personalPrinciples = extractPersonalPrinciplesFromBranch(branchId, inheritanceChain);
  
  // Extract governance preferences
  const governancePreferences = extractGovernancePreferencesFromBranch(branchId, inheritanceChain);

  return {
    userId: userProfile.id,
    userName: userProfile.name,
    branchId,
    branchName: branch.name,
    branchType: branch.type,
    coreValues,
    valueTerms,
    personalPrinciples,
    governancePreferences,
    inheritanceChain
  };
}

function getParentChain(branchId: string, branches: any[]): string[] {
  const branch = branches.find(b => b.id === branchId);
  if (!branch || !branch.parentId) return [branchId];
  return [...getParentChain(branch.parentId, branches), branchId];
}

function extractCoreValuesFromBranch(branch: any): string[] {
  const values: string[] = [];
  
  // Extract from branch description
  const description = branch.description?.toLowerCase() || '';
  
  // Identify value-indicating keywords in descriptions
  if (description.includes('transparency') || description.includes('radical transparency')) {
    values.push('transparency');
    if (description.includes('radical')) values.push('radical-transparency');
  }
  if (description.includes('inclusive') || description.includes('minority protection')) {
    values.push('inclusivity', 'minority-protection');
  }
  if (description.includes('animal') || description.includes('welfare')) {
    values.push('animal-welfare', 'species-protection');
  }
  if (description.includes('environmental') || description.includes('sustainability')) {
    values.push('environmental-protection', 'sustainability');
  }
  if (description.includes('experimental') || description.includes('innovation')) {
    values.push('innovation', 'experimentation');
  }
  if (description.includes('governance') && description.includes('fast')) {
    values.push('efficiency', 'rapid-decision-making');
  }
  
  // Extract from branch modifications (safely access with type assertion)
  if ((branch as any).inheritance?.overrides) {
    for (const override of (branch as any).inheritance.overrides) {
      if (override === 'transparency') values.push('transparency-focused');
      if (override === 'harm') values.push('harm-prevention');
      if (override === 'equality') values.push('equality-focused');
    }
  }
  
  // Add branch-type based values
  if (branch.type === 'user-branch') {
    values.push('personal-governance', 'individual-expression');
  }
  if (branch.type === 'sub-dahao') {
    values.push('domain-specialization', 'community-standards');
  }
  
  // Deduplicate and return
  return Array.from(new Set(values));
}

function extractValueTermsFromBranch(branchId: string, inheritanceChain: string[]): UserValueContext['valueTerms'] {
  const valueTerms: UserValueContext['valueTerms'] = [];
  
  // Look through all terms for ones modified in this branch chain
  Object.values(termsData.terms).forEach((term: any) => {
    // Find the version used in this branch
    const branchVersion = findVersionForBranch(term, branchId);
    if (!branchVersion) return;
    
    const versionData = term.versions[branchVersion];
    if (!versionData) return;
    
    // Check if this version was created in our branch chain (not inherited from core)
    if (inheritanceChain.includes(versionData.branchId)) {
      // Extract what was modified
      const modifications: string[] = [];
      
      if (versionData.changelog) {
        modifications.push(versionData.changelog);
      }
      
      // Look at additions from branch data (safely access with type assertion)
      const branch = branchesData.branches[versionData.branchId as keyof typeof branchesData.branches];
      if ((branch as any)?.modifications?.terms?.[term.id]) {
        const termMods = (branch as any).modifications.terms[term.id];
        if (termMods.added) {
          modifications.push(`Added: ${termMods.added.join(', ')}`);
        }
      }
      
      valueTerms.push({
        id: term.id,
        name: term.name,
        version: branchVersion,
        definition: versionData.definition,
        modifications
      });
    }
  });
  
  return valueTerms;
}

function extractPersonalPrinciplesFromBranch(branchId: string, inheritanceChain: string[]): UserValueContext['personalPrinciples'] {
  const personalPrinciples: UserValueContext['personalPrinciples'] = [];
  
  // Look through principles for branch-specific ones
  Object.values(principlesData.principles).forEach((principle: any) => {
    const branchVersion = findVersionForBranch(principle, branchId);
    if (!branchVersion) return;
    
    const versionData = principle.versions[branchVersion];
    if (!versionData) return;
    
    // Check if created in our branch chain
    if (inheritanceChain.includes(versionData.branchId)) {
      personalPrinciples.push({
        id: principle.id,
        statement: versionData.statement,
        isNew: !versionData.parentVersion, // New if no parent version
        version: branchVersion
      });
    }
  });
  
  return personalPrinciples;
}

function extractGovernancePreferencesFromBranch(branchId: string, inheritanceChain: string[]): UserValueContext['governancePreferences'] {
  const preferences: UserValueContext['governancePreferences'] = [];
  
  // Extract preferences from branch description and modifications
  const branch = branchesData.branches[branchId as keyof typeof branchesData.branches];
  if (!branch) return preferences;
  
  const description = branch.description?.toLowerCase() || '';
  
  // Identify governance preferences from description
  if (description.includes('faster decision') || description.includes('rapid')) {
    preferences.push({
      area: 'decision-speed',
      preference: 'Prefers rapid decision-making processes',
      basedOn: 'branch description'
    });
  }
  
  if (description.includes('inclusive') || description.includes('minority')) {
    preferences.push({
      area: 'participation',
      preference: 'Prioritizes inclusive decision-making and minority protection',
      basedOn: 'branch description'
    });
  }
  
  if (description.includes('transparency')) {
    preferences.push({
      area: 'information-sharing',
      preference: 'Values high transparency in governance',
      basedOn: 'branch description'
    });
  }
  
  // Extract from rule overrides (safely access with type assertion)
  if ((branch as any).inheritance?.overrides) {
    for (const override of (branch as any).inheritance.overrides) {
      if (override === 'voting-thresholds') {
        preferences.push({
          area: 'voting',
          preference: 'Has modified voting threshold preferences',
          basedOn: `rule override: ${override}`
        });
      }
      if (override === 'deliberation-periods') {
        preferences.push({
          area: 'deliberation',
          preference: 'Has custom deliberation period preferences',
          basedOn: `rule override: ${override}`
        });
      }
    }
  }
  
  return preferences;
}

function findVersionForBranch(element: any, branchId: string): string | null {
  // This would normally use the inheritance resolution logic
  // For now, simplified to find the most recent version for the branch
  
  const branchVersions = Object.entries(element.versions)
    .filter(([_, versionData]: [string, any]) => 
      versionData.branchId === branchId || versionData.branchId === 'core-dahao'
    )
    .sort(([_, a]: [string, any], [__, b]: [string, any]) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  
  return branchVersions.length > 0 ? branchVersions[0][0] : null;
}

// Utility to get suggested values for a user based on their branch
export function getSuggestedUserValues(branchId: string): string[] {
  const branch = branchesData.branches[branchId as keyof typeof branchesData.branches];
  if (!branch) return ['transparency', 'equality', 'harm-prevention'];
  
  return extractCoreValuesFromBranch(branch);
}

// Get all available user profiles for switching
export function getAvailableUserProfiles(): Array<{id: string, name: string, branchName: string}> {
  return Object.values(USER_PROFILES).map(profile => {
    const branch = branchesData.branches[profile.defaultBranch as keyof typeof branchesData.branches];
    return {
      id: profile.id,
      name: profile.name,
      branchName: branch?.name || 'Unknown Branch'
    };
  });
}