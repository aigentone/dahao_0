// Simplified GovernancePrinciple focused on guidance and philosophy
export interface GovernancePrinciple {
  version: string;
  principle_id: string;
  name: string;
  description: string;
  category: string;
  domain?: string;
  previous_version?: string;
  
  // Core principle fields
  cross_domain_applications?: Record<string, string>;
  philosophical_foundation?: string;
  ethical_framework?: string;
  
  // Animal welfare principle-specific (philosophical content only)
  freedoms?: Record<string, {
    description: string;
    philosophical_basis: string;
    ethical_considerations: string[];
  }>;
  
  // Environment principle-specific (framework only)
  ecosystem_philosophy?: {
    guiding_principles?: string[];
    ethical_considerations?: string[];
    value_framework?: Record<string, any>;
  };
  
  // Core governance principle-specific (philosophy only)
  ethical_foundation?: Record<string, any>;
  value_system?: Record<string, any>;
  
  // Inheritance metadata
  inheritance_source?: string;
  is_inherited?: boolean;
  inheritance_modification?: string;
  extension_config?: any;
  
  // Term-related fields
  uses_terms?: string[];
  term_definitions?: Record<string, any>;
  
  // Personal branch and economics (philosophical level)
  token_integration?: {
    contribution_rewards: string;
    implementation_funding: string;
    cross_branch_incentives: boolean;
    personal_development_rewards: boolean;
  };
  
  economic_alignment?: {
    dual_benefit_principle: boolean;
    sustainable_funding: string;
    community_ownership: string;
  };
  
  personal_branch_support?: {
    development_workspace: boolean;
    ai_agent_integration: boolean;
    cross_branch_deployment: boolean;
  };
  
  changelog?: Record<string, any>;
  
  // Flexible for other domain-specific philosophical structures
  [key: string]: any;
}

// New GovernanceRule interface for operational requirements
export interface GovernanceRule {
  version: string;
  rule_id: string;
  name: string;
  description: string;
  category: string;
  domain?: string;
  previous_version?: string;
  
  // Core rule fields
  derives_from_principles: string[]; // References to principles this rule implements
  uses_terms?: string[];
  
  // Implementation requirements (moved from principles)
  implementation_requirements?: Record<string, any>;
  validation_requirements?: Record<string, any>;
  assessment_framework?: Record<string, any>;
  
  // Compliance and enforcement
  compliance_monitoring?: Record<string, any>;
  enforcement_mechanisms?: Record<string, any>;
  violation_responses?: Record<string, any>;
  
  // Metrics and measurement
  measurement_protocols?: Record<string, any>;
  intervention_thresholds?: Record<string, any>;
  quality_indicators?: Record<string, any>;
  
  // Cross-domain implementation
  cross_domain_implementation?: Record<string, any>;
  
  // Inheritance metadata for rules
  inheritance_source?: string;
  is_inherited?: boolean;
  inheritance_modification?: string;
  
  // Personal branch support for rule customization
  personal_branch_support?: {
    development_workspace: boolean;
    ai_agent_integration: boolean;
    cross_branch_deployment: boolean;
    custom_rule_variations: boolean;
  };
  
  // Token integration for rule compliance
  token_integration?: {
    compliance_rewards: string;
    improvement_incentives: string;
    violation_penalties: string;
    community_oversight?: string;
  };
  
  changelog?: Record<string, any>;
  
  // Flexible for domain-specific rule structures
  [key: string]: any;
}

export interface InheritanceConfig {
  version: string;
  name: string;
  description: string;
  repository: string;
  extends: string | null;
  
  // Core governance specific
  provides?: string[];
  governance?: {
    amendment_threshold?: number;
    review_period?: string;
    emergency_override?: string;
  };
  
  // Domain extension specific
  inheritance?: {
    core_principles?: Record<string, string>; // principle_id -> inheritance_rule
  };
  domain_extensions?: Record<string, {
    version: string;
    description: string;
    status: 'core_to_domain' | 'domain_specific';
  }>;
  specialization?: {
    decision_authority?: Record<string, string>;
    municipal_coordination?: Record<string, string>;
    cross_domain_collaboration?: Record<string, string>;
  };
}

export interface GovernanceDiscussion {
  title: string;
  status: string;
  proposal?: string;
  created: string;
  author: string;
  summary: string;
  content: string;
  filename: string;
  path: string;
}

export interface GovernanceOrganization {
  id: string;
  name: string;
  version: string;
  description: string;
  inheritance: InheritanceConfig;
  principles: GovernancePrinciple[];
  rules: GovernanceRule[]; // New: operational rules separate from principles
  discussions: GovernanceDiscussion[];
  emoji: string;
  
  // Computed inheritance info
  inherits_from?: string[];
  extended_by?: string[];
  inheritance_chain?: InheritanceConfig[];
}

export interface GovernanceData {
  organizations: GovernanceOrganization[];
  principlesByOrg: Record<string, GovernancePrinciple[]>;
  rulesByOrg: Record<string, GovernanceRule[]>; // New: rules by organization
  rulesByPrinciple: Record<string, GovernanceRule[]>; // New: rules derived from principles
  discussionsByPrinciple: Record<string, GovernanceDiscussion[]>;
}

export type OrganizationType = 'core-governance' | 'animal-welfare' | 'environment';

export interface Term {
  namespace: string;
  name: string;
  version: string;
  definition: string;
  extends?: string;
  created: string;
  changes?: string[];
  dimensions?: string[];
  types?: Record<string, string>;
  [key: string]: any;
}

export interface TermDictionary {
  version: string;
  namespace: string;
  terms: Record<string, Record<string, Term>>;
}