export interface GovernancePrinciple {
  version: string;
  principle_id: string;
  name: string;
  description: string;
  category: string;
  domain?: string;
  previous_version?: string;
  
  // Standard fields
  requirements?: Record<string, any>;
  validation_rules?: Record<string, any>;
  examples?: Record<string, any>;
  cross_domain_applications?: Record<string, string>;
  changelog?: Record<string, any>;
  
  // Animal welfare specific
  freedoms?: Record<string, {
    description: string;
    requirements: string[];
    indicators: string[];
  }>;
  implementation?: {
    assessment_frequency: string;
    reporting_requirement: string;
    intervention_threshold: string;
  };
  
  // Environment specific
  ecosystem_assessment_framework?: {
    structural_indicators?: Record<string, any>;
    functional_indicators?: Record<string, any>;
    resilience_indicators?: Record<string, any>;
  };
  monitoring_protocols?: Record<string, any>;
  intervention_strategies?: Record<string, any>;
  decision_making_framework?: Record<string, any>;
  emergency_response?: {
    ecosystem_crisis_triggers?: string[];
    emergency_protocols?: string[];
  };
  
  // Core governance specific
  harm_categories?: Record<string, any>;
  assessment_framework?: Record<string, any>;
  
  // Inheritance metadata
  inheritance_source?: string; // Which domain this principle comes from
  is_inherited?: boolean; // True if inherited from parent domain
  inheritance_modification?: string; // How inheritance was modified
  extension_config?: any; // Domain extension configuration
  
  // Term-related fields
  uses_terms?: string[]; // Array of term references like "core:harm@v1.1"
  term_definitions?: Record<string, any>; // Resolved term definitions
  
  // Flexible for other domain-specific structures
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