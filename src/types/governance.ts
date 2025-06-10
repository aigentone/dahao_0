export interface GovernancePrinciple {
  version: string;
  principle_id: string;
  name: string;
  description: string;
  category: string;
  domain?: string;
  previous_version?: string;
  requirements?: Record<string, any>;
  validation_rules?: Record<string, any>;
  examples?: Record<string, any>;
  cross_domain_applications?: Record<string, string>;
  changelog?: Record<string, any>;
  freedoms?: Record<string, any>;
  harm_categories?: Record<string, any>;
  assessment_framework?: Record<string, any>;
  [key: string]: any;
}

export interface InheritanceConfig {
  version: string;
  name: string;
  description: string;
  repository: string;
  extends: string | null;
  provides?: string[];
  inheritance?: Record<string, any>;
  domain_extensions?: Record<string, any>;
  specialization?: Record<string, any>;
  governance?: Record<string, any>;
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
}

export interface GovernanceData {
  organizations: GovernanceOrganization[];
  principlesByOrg: Record<string, GovernancePrinciple[]>;
  discussionsByPrinciple: Record<string, GovernanceDiscussion[]>;
}

export type OrganizationType = 'core-governance' | 'animal-welfare' | 'environment';