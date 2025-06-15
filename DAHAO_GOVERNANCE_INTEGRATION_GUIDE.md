# DAHAO Governance Integration Guide

## Document Overview

**Created**: December 15, 2024  
**Purpose**: Comprehensive technical specification for understanding and updating the dahao-governance folder content and its interaction with the UI system.

This guide provides complete details on how governance data flows from YAML files to UI components, enabling confident content updates while maintaining system functionality.

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [File Structure Specifications](#file-structure-specifications)
3. [Data Processing Pipeline](#data-processing-pipeline)
4. [UI Rendering System](#ui-rendering-system)
5. [Content Update Guidelines](#content-update-guidelines)
6. [File Format Specifications](#file-format-specifications)
7. [Inheritance System Deep Dive](#inheritance-system-deep-dive)
8. [Terms → Principles → Rules Flow](#terms--principles--rules-flow)
9. [Practical Update Examples](#practical-update-examples)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## System Architecture Overview

### Three-Layer Hierarchy

The DAHAO governance system implements a clear hierarchy:

```
📚 Terms (definitional foundation)
    ↓ uses_terms
🏛️ Principles (philosophical guidance) 
    ↓ derives_from_principles
⚖️ Rules (operational requirements)
```

### Data Flow Architecture

```
YAML Files → GovernanceLoader → API → UI Components → User Interface
```

1. **YAML Files**: Structured governance data in dahao-governance/
2. **GovernanceLoader**: Parses files, resolves inheritance, creates relationships
3. **API**: Serves processed data via /api/governance endpoint
4. **UI Components**: Render data with domain-specific customizations
5. **User Interface**: Seven-tab layout with cross-layer navigation

### Core Concepts

- **Inheritance**: Domains extend core-governance with modifications
- **Versioning**: All content supports version evolution
- **Cross-References**: Terms, principles, and rules reference each other
- **Democratic Evolution**: Token-based voting for content changes

---

## File Structure Specifications

### Complete Directory Layout

```
dahao-governance/
├── core-governance/                    # 🏛️ Foundation domain
│   ├── inheritance.yml                 # Domain configuration
│   ├── terms/v1.0/                    # 📚 Term definitions
│   │   ├── fundamental.yml            # Basic governance terms
│   │   └── governance.yml             # Governance-specific terms
│   ├── ethics/v1.1/                   # 🏛️ Core principles
│   │   ├── transparency.yml           # Transparency philosophy
│   │   ├── equality.yml               # Equality framework
│   │   ├── harm-prevention.yml        # Harm prevention ethics
│   │   └── sustainability.yml         # Sustainability principles
│   ├── rules/v1.1/                    # ⚖️ Operational rules
│   │   └── transparency-rules.yml     # Implementation requirements
│   └── discussions/                    # 💬 Community discussions
│       ├── transparency/
│       │   ├── ai-decision-auditability.md
│       │   └── voting-transparency.md
│       └── equality/
│           └── fair-participation.md
│
├── animal-welfare/                     # 🐾 Specialized domain
│   ├── inheritance.yml                 # Extends core-governance@v1.1
│   ├── terms/v1.0/
│   │   └── welfare-core.yml           # five_freedoms, suffering, sentience
│   ├── ethics/v1.0/
│   │   ├── five-freedoms.yml          # Five freedoms philosophy
│   │   ├── welfare-measurement.yml    # Assessment frameworks
│   │   └── emergency-care-protocol.yml
│   ├── rules/v1.0/
│   │   └── five-freedoms-rules.yml    # Implementation requirements
│   └── discussions/
│       ├── five-freedoms/
│       │   └── outdoor-access-requirement.md
│       └── emergency-care-protocol/
│           └── turkey-municipal-vet-system.md
│
└── environment/                        # 🌱 Environmental domain
    ├── inheritance.yml                 # Environmental governance
    ├── terms/v1.0/
    │   └── ecosystem-specific.yml      # Environmental terms
    ├── ethics/v1.2/
    │   ├── ecosystem-health.yml        # Ecosystem philosophy
    │   └── sustainability.yml          # Environmental sustainability
    └── discussions/
        ├── ecosystem-health/
        └── sustainability/
            └── carbon-neutral-operations.md
```

### File Naming Conventions

- **Versioned Directories**: `v1.0/`, `v1.1/`, `v1.2/` etc.
- **YAML Files**: `kebab-case.yml` (e.g., `five-freedoms.yml`)
- **Markdown Files**: `kebab-case.md` for discussions
- **IDs**: `snake_case` for principle_id, rule_id, term names

### Required vs Optional Files

#### Required for Each Domain:
- `inheritance.yml` - Domain configuration
- `ethics/v{X.Y}/` - At least one principle file per version
- `terms/v{X.Y}/` - At least one term definition file

#### Optional but Recommended:
- `rules/v{X.Y}/` - Operational implementation
- `discussions/` - Community discussion files

---

## Data Processing Pipeline

### GovernanceLoader Class

Located in `src/lib/governance-loader.ts`, this singleton class:

1. **Scans Directory Structure**: Reads all YAML files from dahao-governance/
2. **Parses Inheritance**: Resolves `extends` relationships between domains
3. **Processes Terms**: Creates term dictionaries with version tracking
4. **Compiles Principles**: Applies inheritance rules and modifications
5. **Links Rules**: Maps rules to their source principles via `derives_from_principles`
6. **Extracts Discussions**: Parses markdown files for community content

### Loading Sequence

```typescript
async loadGovernanceData(): Promise<GovernanceData> {
  // 1. Load organizations (domains)
  const organizations = await this.loadOrganizations();
  
  // 2. For each organization:
  //    - Load inheritance config
  //    - Load terms, principles, rules
  //    - Process inheritance relationships
  
  // 3. Create cross-reference mappings:
  //    - principlesByOrg
  //    - rulesByOrg  
  //    - rulesByPrinciple
  //    - discussionsByPrinciple
  
  return governanceData;
}
```

### Inheritance Processing

1. **Core Principles**: Loaded from `core-governance/ethics/v1.1/`
2. **Domain Inheritance**: Applied based on `inheritance.yml` rules:
   - `"inherited"` - Use core principle as-is
   - `"inherited_with_*_extension"` - Modify for domain
3. **Domain Extensions**: Add domain-specific principles
4. **Metadata Addition**: Mark principles with inheritance source

### Caching Strategy

- **Singleton Pattern**: Only one loader instance
- **In-Memory Cache**: Processed data cached after first load
- **Cache Invalidation**: Manual restart required for file changes
- **Performance**: Avoids re-processing on subsequent requests

---

## UI Rendering System

### Component Hierarchy

```
ForumPage (src/app/forum/page.tsx)
├── Seven-Tab Layout
│   ├── Discussions Tab
│   ├── Principles Tab → PrinciplesViewWithInheritance
│   ├── Rules Tab → RulesView
│   ├── Terms Tab → TermsView
│   ├── Term Evolution Tab → TermDiscussionManager
│   ├── AI Agents Tab → AgentAssignmentPanel
│   └── Analytics Tab
└── InheritanceTree (cross-tab visualization)
```

### Data Consumption Pattern

```typescript
// 1. Forum page loads governance data
const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);

// 2. API call to /api/governance
const response = await fetch('/api/governance');
const data = await response.json();

// 3. Data distributed to components
<PrinciplesViewWithInheritance 
  principles={currentOrg.principles}
  organizationName={currentOrg.name}
/>

<RulesView
  rules={currentOrg.rules || []}
  organizationName={currentOrg.name}
/>
```

### Dynamic Content Rendering

#### Principles Component Logic

```typescript
// Inheritance filtering
const inheritedPrinciples = principles.filter(p => p.is_inherited);
const domainPrinciples = principles.filter(p => !p.is_inherited);

// Domain-specific content rendering
if (principle.freedoms) {
  // Animal welfare: Five freedoms framework
  return <FiveFreedomsRenderer freedoms={principle.freedoms} />;
}
if (principle.ecosystem_philosophy) {
  // Environment: Ecosystem philosophy
  return <EcosystemRenderer philosophy={principle.ecosystem_philosophy} />;
}
// Core governance: Ethical foundations
return <EthicalFoundationRenderer principle={principle} />;
```

#### Rules Component Logic

```typescript
// Filter by category
switch (filter) {
  case 'implementation':
    return rule.implementation_requirements || rule.assessment_framework;
  case 'compliance':
    return rule.compliance_monitoring || rule.measurement_protocols;
  case 'enforcement':
    return rule.enforcement_mechanisms || rule.violation_responses;
}

// Show principle derivation
rule.derives_from_principles.map(principleRef => (
  <Badge>{principleRef.split(':').pop()?.split('@')[0]}</Badge>
));
```

### Inheritance Visualization

The `InheritanceTree` component:
- Reads inheritance chains from organization data
- Displays hierarchical relationships with visual indicators
- Shows version compatibility warnings
- Enables navigation between related domains

### Content Customization by Domain

#### Animal Welfare Specific:
- `freedoms` object → Five freedoms framework display
- `welfare_measurement` → Assessment protocol cards
- Custom styling with animal-themed colors

#### Environment Specific:
- `ecosystem_philosophy` → Environmental ethics display
- `monitoring_protocols` → Scientific measurement frameworks
- Green color scheme for environmental content

#### Core Governance:
- `ethical_foundation` → Philosophical foundations
- `value_system` → Core value frameworks
- Purple/blue color scheme for governance content

---

## Content Update Guidelines

### What You Can Update Without Code Changes

#### ✅ Text Content Updates
- **Descriptions**: Update principle descriptions, rationales, philosophical content
- **Documentation**: Modify requirements, examples, cross-domain applications
- **Discussions**: Add new markdown files, update existing discussions
- **Changelog**: Add version history entries with dates and approvals

#### ✅ Content Evolution
- **New Versions**: Create new version directories (v1.2, v1.3, etc.)
- **Term Definitions**: Add new terms or evolve existing ones
- **Principle Extensions**: Add new principles to existing domains
- **Rule Implementations**: Create rules that derive from existing principles

#### ✅ Structural Additions
- **Discussion Files**: Add new markdown files in discussions/ directories
- **Cross-References**: Add links between terms, principles, and rules
- **Inheritance Modifications**: Update inheritance.yml to change how domains extend core governance

### What Requires Code Changes

#### ❌ Major Structural Changes
- **New Domains**: Adding organizations beyond core-governance, animal-welfare, environment
- **New File Types**: Creating governance elements beyond terms/principles/rules
- **Directory Structure**: Changing the versioned directory pattern
- **API Endpoints**: New data access patterns or endpoints

#### ❌ UI Customizations
- **New Content Fields**: Domain-specific YAML fields that need custom UI rendering
- **New Component Types**: Entirely new types of governance visualizations
- **Navigation Changes**: Modifying the seven-tab layout or inheritance tree

### Safe Update Procedures

1. **Backup Current State**: Copy current files before making changes
2. **Validate YAML Syntax**: Ensure all YAML files are valid
3. **Check Cross-References**: Verify that referenced terms/principles exist
4. **Test Locally**: Restart development server to see changes
5. **Verify UI Rendering**: Check that content displays correctly in all tabs

---

## File Format Specifications

### inheritance.yml Schema

```yaml
version: "1.1"                          # Version of this domain
name: "Domain Display Name"             # UI display name
description: "Domain purpose"           # Description for UI
repository: "dahao-org/domain-name"     # Git repository
extends: "core-governance@v1.1"         # Parent domain (null for core)

# Core principle inheritance (for domains extending core)
inheritance:
  core_principles:
    transparency: "inherited"            # Use as-is
    equality: "inherited_with_species_extension"  # Modify for domain
    harm_prevention: "inherited_with_animal_focus"
    sustainability: "inherited"

# Domain-specific principles
domain_extensions:
  principle_name:
    version: "1.0"
    description: "What this principle covers"
    status: "core_to_domain" | "domain_specific"

# Governance configuration
governance:
  amendment_threshold: 0.75             # Voting threshold for changes
  review_period: "quarterly"            # How often to review
  token_holder_voting: true             # Enable token-based voting
  personal_workspace_enabled: true      # Support personal branches

# Token economics
token_economics:
  dual_benefit_model: true              # Economic model
  investment_pool_governance: true      # Community funding
  personal_branch_support: true         # Personal development support
```

### Principle File Schema (ethics/v{X.Y}/principle-name.yml)

```yaml
version: "1.1"                          # Version of this principle
principle_id: "unique_identifier"       # Unique ID (snake_case)
name: "Display Name"                    # UI display name
description: "Philosophical foundation" # Main principle description
category: "core" | "domain_specific"    # Classification
previous_version: "1.0"                 # Previous version reference
domain: "domain_name"                   # Which domain this belongs to

# Terms integration
uses_terms:                             # Terms this principle references
  - "core:transparency@v1.1"
  - "welfare:suffering@v1.0"

# Philosophical content (focus on ethics, not implementation)
philosophical_foundation: "String"      # Core philosophical basis
ethical_framework: "String"             # Ethical reasoning
cross_domain_applications:              # How this applies to other domains
  animal_welfare: "Application description"
  environment: "Application description"

# Domain-specific philosophical content
freedoms:                               # Animal welfare specific
  freedom_name:
    description: "Philosophical meaning"
    philosophical_basis: "Ethical foundation"
    ethical_considerations: ["dignity", "rights"]

ecosystem_philosophy:                   # Environment specific
  guiding_principles: ["List of principles"]
  ethical_considerations: ["List of ethics"]
  value_framework:
    key: "value"

ethical_foundation:                     # Core governance specific
  key: "Foundation element"

value_system:                           # Core governance values
  key: "Value description"

# Inheritance metadata (auto-populated by loader)
is_inherited: boolean                   # True if inherited from parent
inheritance_source: "domain_name"      # Which domain this came from
inheritance_modification: "string"     # How inheritance was modified

# Personal development support
personal_branch_support:
  development_workspace: true          # Enable personal workspace
  ai_agent_integration: true           # AI agent assistance
  cross_branch_deployment: true        # Deploy across branches

# Token integration
token_integration:
  contribution_rewards: "quality_based"
  implementation_funding: "investment_pool"
  cross_branch_incentives: true
  personal_development_rewards: true

# Change tracking
changelog:
  v1.1:
    changes:
      - "Description of changes"
    date: "2024-12-15"
    approved_by: "community_vote_75_percent"
```

### Rule File Schema (rules/v{X.Y}/rule-name.yml)

```yaml
version: "1.0"                          # Version of this rule
rule_id: "unique_identifier"            # Unique ID (snake_case)
name: "Display Name"                    # UI display name
description: "Implementation purpose"   # What this rule implements
category: "implementation" | "compliance" | "enforcement"
domain: "domain_name"                   # Which domain this belongs to

# Principle derivation (REQUIRED)
derives_from_principles:                # Which principles this implements
  - "domain:principle@v1.0"
  - "core_governance:transparency@v1.1"

# Terms integration (optional)
uses_terms:
  - "core:governance@v1.1"

# Implementation details
implementation_requirements:            # What must be implemented
  requirement_name:
    daily_requirements: ["List of requirements"]
    measurement_protocols:
      protocol_name: "How to measure"
    intervention_thresholds:
      threshold_name: "When to act"

# Validation and compliance
validation_requirements:
  proposal_standards:
    field: "Requirement"
  
compliance_monitoring:
  audit_frequency: "monthly_automated_checks"
  manual_review: "quarterly_governance_committee"
  community_reporting: "anonymous_violation_reporting_system"

# Enforcement mechanisms
enforcement_mechanisms:
  violation_responses:
    violation_type:
      first_offense: "Action to take"
      repeat_offense: "Escalated action"
  
  financial_penalties:
    minor_violation: "1% of operational budget"
    severe_violation: "15% of operational budget"

# Quality measurement
measurement_protocols:
  protocol_name:
    frequency: "How often"
    method: "How to measure"

intervention_thresholds:
  threshold_name: "When intervention is required"

# Cross-domain implementation
cross_domain_implementation:
  animal_welfare:
    specific_requirements:
      - "Domain-specific requirement"

# Personal rule customization
personal_branch_support:
  development_workspace: true
  ai_agent_integration: true
  custom_rule_variations: true          # Allow personal modifications

# Token integration for compliance
token_integration:
  compliance_rewards: "rewards_for_following_rules"
  violation_penalties: "penalties_for_violations"

# Change tracking
changelog:
  v1.0:
    changes:
      - "Initial rule derivation from principle"
    date: "2024-12-15"
    approved_by: "principle_derivation_process"
```

### Term File Schema (terms/v{X.Y}/namespace.yml)

```yaml
version: "1.0"                          # Version of this term set
namespace: "domain_name"                # Namespace for these terms

terms:                                  # Dictionary of terms
  term_name:
    v1.0:                              # Term version
      definition: "Clear definition"    # What this term means
      extends: "core:parent_term@v1.1"  # Optional parent term
      specificity: "How this differs"   # How it differs from parent
      components:                       # Optional: Parts of this term
        - "Component 1"
        - "Component 2"
      types:                           # Optional: Types of this term
        type_name: "Type description"
      indicators:                      # Optional: How to identify
        - "indicator_1"
        - "indicator_2"
      created: "2024-02-01"            # Creation date

# Democratic evolution support
democratic_evolution:
  community_ratification: "token_holder_voting"
  development_funding: "investment_pool"
  contributor_rewards: "token_based"
  personal_development: "branch_workspace"

# Token integration
token_integration:
  contribution_rewards: "quality_based"
  implementation_funding: "investment_pool"
  cross_branch_incentives: true
  personal_development_rewards: true

# Personal branch support
personal_branch_support:
  development_workspace: true
  ai_agent_integration: true
  cross_branch_deployment: true
```

### Discussion File Schema (discussions/category/file.md)

```markdown
# Discussion Title

**Status**: active | completed | archived
**Created**: 2024-12-15
**Author**: Author Name
**Category**: transparency | equality | harm-prevention | etc.

## Summary

Brief summary of the discussion topic.

## Background

Context and background information.

## Proposal

Specific proposal or topic for discussion.

## Community Input

Community feedback and discussion.

## Resolution

Final decision or outcome (if completed).
```

---

## Inheritance System Deep Dive

### Core Governance Foundation

The `core-governance` domain provides foundational principles:
- **transparency**: Open and auditable processes
- **equality**: Fair treatment and participation
- **harm-prevention**: Avoiding negative impacts
- **sustainability**: Long-term viability

### Inheritance Configuration

Each domain's `inheritance.yml` defines how it relates to core governance:

```yaml
extends: "core-governance@v1.1"         # Which version to inherit from

inheritance:
  core_principles:
    transparency: "inherited"            # Use exactly as defined in core
    equality: "inherited_with_species_extension"  # Modify for domain needs
    harm_prevention: "inherited_with_animal_focus"  # Domain-specific focus
    sustainability: "inherited"          # Use as-is
```

### Inheritance Processing Logic

1. **Load Core Principles**: Read from core-governance/ethics/v1.1/
2. **Apply Inheritance Rules**: For each core principle:
   - `"inherited"` → Copy principle as-is, mark as inherited
   - `"inherited_with_*"` → Copy principle, add modification note, mark as inherited
3. **Add Domain Extensions**: Load domain-specific principles
4. **Set Metadata**: Mark each principle with inheritance source and status

### Version Compatibility

- **Version Matching**: Domains specify which core version they extend
- **Compatibility Checking**: UI warns if versions are mismatched
- **Migration Support**: Domains can update their `extends` reference

### Domain Extensions

Domains add their own principles through `domain_extensions`:

```yaml
domain_extensions:
  five_freedoms:                        # New principle specific to this domain
    version: "1.0"
    description: "Five freedoms framework for animal welfare"
    status: "domain_specific"           # Not inherited from core
```

### Cross-Domain Collaboration

Domains can reference each other through `cross_domain_collaboration`:

```yaml
cross_domain_collaboration:
  environment: "ecosystem_health_alignment"
  human_rights: "one_health_approach"
```

This enables:
- **Shared Initiatives**: Projects that span multiple domains
- **Consistent Standards**: Aligned approaches across domains
- **Resource Sharing**: Coordinated funding and development

---

## Terms → Principles → Rules Flow

### Layer Relationships

#### Terms → Principles Connection

Principles reference terms through `uses_terms`:

```yaml
# In five-freedoms.yml principle
uses_terms:
  - "welfare:five_freedoms@v1.0"        # References term definition
  - "core:wellbeing@v1.1"              # References core term

description: "Implementation of {welfare:five_freedoms@v1.0} framework"
freedoms:
  freedom_from_hunger:
    description: "Freedom from hunger - ensuring {core:wellbeing@v1.1}"
```

#### Principles → Rules Connection

Rules reference principles through `derives_from_principles`:

```yaml
# In five-freedoms-rules.yml
derives_from_principles:
  - "animal_welfare:five_freedoms@v1.0"  # This rule implements this principle

implementation_requirements:
  freedom_from_hunger:                   # Implements the philosophical freedom
    daily_requirements:                  # Concrete operational requirements
      - "Ready access to fresh water must be available 24/7"
```

### Reference Resolution

The system resolves references using this pattern:
- `namespace:item_name@version`
- Examples:
  - `core:transparency@v1.1` → core-governance/ethics/v1.1/transparency.yml
  - `welfare:five_freedoms@v1.0` → animal-welfare/terms/v1.0/welfare-core.yml → five_freedoms

### Democratic Evolution Process

1. **Term Development**: Start with GitHub Issues for private development
2. **Term Ratification**: Community voting on term definitions
3. **Principle Creation**: Principles created that use ratified terms
4. **Rule Derivation**: Rules created that implement principles
5. **Implementation**: Rules guide actual governance operations

### Version Management

Each layer can evolve independently:
- **Term Evolution**: New versions of terms through democratic process
- **Principle Updates**: Principles updated to use new term versions
- **Rule Refinement**: Rules updated to reflect principle changes

### Cross-Layer Consistency

The system maintains consistency through:
- **Reference Validation**: Checks that referenced items exist
- **Version Tracking**: Ensures version compatibility
- **Dependency Analysis**: Shows impact of changes across layers

---

## Practical Update Examples

### Example 1: Adding New Text Content to Existing Principle

**Scenario**: Update the transparency principle description

**File**: `dahao-governance/core-governance/ethics/v1.1/transparency.yml`

**Safe Changes**:
```yaml
# ✅ Safe to update
description: "All decisions and processes must be open and auditable to community members"

# ✅ Safe to add philosophical content
philosophical_foundation: "Transparency builds trust and enables democratic participation"

# ✅ Safe to update cross-domain applications
cross_domain_applications:
  animal_welfare: "Welfare assessment transparency with detailed public reporting"
  environment: "Environmental impact disclosure with scientific data"
  music_industry: "Royalty distribution transparency with detailed breakdowns"
```

**Result**: UI will immediately show updated text in Principles tab

### Example 2: Creating a New Version of a Principle

**Scenario**: Create v1.2 of transparency principle with enhanced AI requirements

**Steps**:
1. Create directory: `dahao-governance/core-governance/ethics/v1.2/`
2. Copy existing principle: `cp v1.1/transparency.yml v1.2/transparency.yml`
3. Update content:

```yaml
version: "1.2"                          # ✅ Update version
previous_version: "1.1"                 # ✅ Reference previous

# ✅ Add new philosophical content
ethical_framework: "Enhanced transparency includes AI decision explainability"

# ✅ Update changelog
changelog:
  v1.2:
    changes:
      - "Enhanced AI decision transparency requirements"
      - "Added explainable AI ethical framework"
    date: "2024-12-20"
    approved_by: "community_vote_78_percent"
  # ... previous versions
```

**Update inheritance**: If other domains should use v1.2, update their inheritance.yml:
```yaml
extends: "core-governance@v1.2"         # ✅ Update reference
```

### Example 3: Adding a New Principle to a Domain

**Scenario**: Add "rehabilitation-ethics" principle to animal-welfare

**Steps**:
1. **Update inheritance.yml**:
```yaml
domain_extensions:
  # ... existing extensions
  rehabilitation_ethics:
    version: "1.0"
    description: "Ethical framework for animal rehabilitation and release"
    status: "domain_specific"
```

2. **Create principle file**: `animal-welfare/ethics/v1.0/rehabilitation-ethics.yml`
```yaml
version: "1.0"
principle_id: "rehabilitation_ethics"
name: "Rehabilitation Ethics"
description: "Ethical guidelines for animal rehabilitation programs"
category: "domain_specific"
domain: "animal_welfare"

uses_terms:
  - "welfare:suffering@v1.0"
  - "core:wellbeing@v1.1"

philosophical_foundation: "Rehabilitation must prioritize animal wellbeing over human convenience"
ethical_framework: "Evidence-based approach to maximizing successful outcomes"

# Domain-specific content
rehabilitation_principles:
  individual_assessment:
    description: "Each animal requires individual assessment"
    philosophical_basis: "Recognition of individual needs and capacities"
    ethical_considerations: ["autonomy", "welfare", "natural_behavior"]
  
  release_criteria:
    description: "Clear criteria for determining release readiness"
    philosophical_basis: "Objective measures prevent premature or delayed release"
    ethical_considerations: ["safety", "survival", "ecological_impact"]

changelog:
  v1.0:
    changes:
      - "Initial rehabilitation ethics framework"
    date: "2024-12-20"
    approved_by: "domain_expert_consensus"
```

### Example 4: Creating Rules from Existing Principles

**Scenario**: Create implementation rules for the new rehabilitation-ethics principle

**File**: `animal-welfare/rules/v1.0/rehabilitation-ethics-rules.yml`

```yaml
version: "1.0"
rule_id: "rehabilitation_ethics_implementation"
name: "Rehabilitation Ethics Implementation Rules"
description: "Operational requirements for ethical animal rehabilitation"
category: "implementation"
domain: "animal_welfare"

derives_from_principles:
  - "animal_welfare:rehabilitation_ethics@v1.0"

implementation_requirements:
  individual_assessment:
    assessment_protocols:
      - "Veterinary health evaluation within 24 hours"
      - "Behavioral assessment by certified rehabilitator"
      - "Species-specific needs evaluation"
    documentation_requirements:
      - "Complete medical history"
      - "Behavioral observation logs"
      - "Treatment plan with timelines"
  
  release_criteria:
    readiness_indicators:
      - "Physical health clearance"
      - "Natural behavior demonstration"
      - "Species-appropriate fear response to humans"
    validation_process:
      - "Multi-expert evaluation"
      - "Test environment assessment"
      - "Post-release monitoring plan"

compliance_monitoring:
  audit_frequency: "monthly_facility_review"
  success_metrics:
    - "Release survival rates >80%"
    - "Behavioral fitness assessment scores >85%"
  reporting_requirements:
    - "Monthly rehabilitation statistics"
    - "Annual outcome analysis"

enforcement_mechanisms:
  violations:
    inadequate_assessment:
      first_offense: "Additional training required"
      repeat_offense: "Rehabilitation permit review"
    premature_release:
      immediate_action: "Release suspension pending investigation"
      remediation: "Enhanced monitoring and training"
```

### Example 5: Adding Discussion Content

**Scenario**: Add community discussion about rehabilitation ethics

**File**: `animal-welfare/discussions/rehabilitation-ethics/wildlife-rehabilitation-standards.md`

```markdown
# Wildlife Rehabilitation Standards Discussion

**Status**: active
**Created**: 2024-12-20
**Author**: Dr. Sarah Mitchell
**Category**: rehabilitation-ethics

## Summary

Discussion of proposed standards for wildlife rehabilitation facilities to ensure ethical treatment and successful outcomes.

## Background

Current rehabilitation practices vary widely between facilities, leading to inconsistent outcomes and ethical concerns. We need standardized approaches that prioritize animal welfare while maximizing release success.

## Proposal

Implement mandatory certification program for rehabilitation facilities based on the rehabilitation-ethics principle framework.

### Key Requirements:
1. Certified veterinary oversight
2. Species-specific rehabilitation protocols
3. Outcome tracking and reporting
4. Regular facility inspections

## Community Input

*This section will be updated as community members provide feedback*

## Next Steps

1. Review existing rehabilitation literature
2. Consult with rehabilitation experts
3. Draft certification requirements
4. Community review and voting
```

### Example 6: Cross-Layer Content Updates

**Scenario**: Update content across all three layers for a comprehensive change

**Changes Needed**:
1. **Term Evolution**: Add "rehabilitation-success" term
2. **Principle Update**: Reference new term in rehabilitation-ethics
3. **Rule Enhancement**: Use new term in implementation rules

**Step 1 - Add Term**:
```yaml
# In animal-welfare/terms/v1.0/welfare-core.yml
terms:
  # ... existing terms
  rehabilitation_success:
    v1.0:
      definition: "Successful return of rehabilitated animal to natural habitat with sustained survival"
      components:
        - "Physical health restoration"
        - "Natural behavior recovery"
        - "Survival skills demonstration"
        - "Successful habitat reintegration"
      indicators:
        - "post_release_survival"
        - "natural_behavior_expression"
        - "habitat_integration"
      created: "2024-12-20"
```

**Step 2 - Update Principle**:
```yaml
# In rehabilitation-ethics.yml
uses_terms:
  - "welfare:suffering@v1.0"
  - "welfare:rehabilitation_success@v1.0"  # ✅ Add new term reference

rehabilitation_principles:
  success_measurement:
    description: "Measurement of {welfare:rehabilitation_success@v1.0}"
    philosophical_basis: "Objective success criteria ensure ethical outcomes"
```

**Step 3 - Update Rules**:
```yaml
# In rehabilitation-ethics-rules.yml
uses_terms:
  - "welfare:rehabilitation_success@v1.0"  # ✅ Add term reference

implementation_requirements:
  success_tracking:
    success_definition: "Achievement of {welfare:rehabilitation_success@v1.0}"
    measurement_protocols:
      - "Post-release monitoring for minimum 6 months"
      - "Survival rate tracking"
      - "Behavioral assessment in wild"
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: YAML Syntax Errors

**Symptoms**: 
- Server fails to start
- Governance data fails to load
- Console errors about YAML parsing

**Solutions**:
1. **Validate YAML Syntax**: Use online YAML validator
2. **Check Indentation**: Ensure consistent 2-space indentation
3. **Quote Strings**: Use quotes around strings with special characters
4. **Check Colons**: Ensure space after colons in key-value pairs

**Example Fix**:
```yaml
# ❌ Wrong
description:All decisions must be transparent
items:
- item 1
- item 2

# ✅ Correct  
description: "All decisions must be transparent"
items:
  - "item 1"
  - "item 2"
```

#### Issue 2: Missing Cross-References

**Symptoms**:
- UI shows broken references like `{term:missing@v1.0}`
- Console warnings about unresolved references
- Empty content where terms should be interpolated

**Solutions**:
1. **Check Term Exists**: Verify referenced term is defined
2. **Verify Namespace**: Ensure namespace matches directory name
3. **Check Version**: Confirm version exists
4. **Update Reference**: Fix typos in reference string

**Example Fix**:
```yaml
# ❌ Wrong reference
uses_terms:
  - "welfare:five_freedom@v1.0"  # Missing 's' in 'freedoms'

# ✅ Correct reference
uses_terms:
  - "welfare:five_freedoms@v1.0"
```

#### Issue 3: Inheritance Not Working

**Symptoms**:
- Domain principles not showing inherited status
- Core principles missing from domain
- Inheritance tree showing broken connections

**Solutions**:
1. **Check extends Field**: Verify inheritance.yml has correct extends value
2. **Verify Core Version**: Ensure referenced core version exists
3. **Check Inheritance Rules**: Confirm core_principles mapping is correct
4. **Restart Server**: Clear governance loader cache

**Example Fix**:
```yaml
# ❌ Wrong version reference
extends: "core-governance@v2.0"  # Version doesn't exist

# ✅ Correct version reference
extends: "core-governance@v1.1"

# ❌ Wrong principle name
inheritance:
  core_principles:
    transparancy: "inherited"  # Typo in 'transparency'

# ✅ Correct principle name
inheritance:
  core_principles:
    transparency: "inherited"
```

#### Issue 4: Rules Not Linking to Principles

**Symptoms**:
- Rules tab shows no derivation information
- Rules appear orphaned from principles
- Missing principle references in rule display

**Solutions**:
1. **Check derives_from_principles**: Ensure field exists and is correctly formatted
2. **Verify Principle References**: Confirm referenced principles exist
3. **Check Namespace Format**: Use correct domain:principle@version format
4. **Update Governance Loader**: Ensure rules loading is working

**Example Fix**:
```yaml
# ❌ Missing derives_from_principles
rule_id: "transparency_implementation"
description: "Implementation rules"

# ✅ Correct principle derivation
rule_id: "transparency_implementation"
derives_from_principles:
  - "core_governance:transparency@v1.1"
description: "Implementation rules"
```

#### Issue 5: UI Not Updating After File Changes

**Symptoms**:
- Changes to YAML files not reflected in UI
- Old content still showing
- Cache seems to be serving stale data

**Solutions**:
1. **Restart Development Server**: Stop and restart `npm run dev`
2. **Clear Browser Cache**: Hard refresh or incognito mode
3. **Check File Saving**: Ensure files are actually saved
4. **Verify File Paths**: Confirm files are in correct directories

**Debug Steps**:
```bash
# 1. Stop server
Ctrl+C

# 2. Clear any cached data
rm -rf .next/cache

# 3. Restart server
npm run dev

# 4. Check server logs for errors
# Look for YAML parsing errors or file loading issues
```

#### Issue 6: Version Compatibility Warnings

**Symptoms**:
- UI shows version mismatch warnings
- Inheritance tree displays compatibility issues
- Some content may not load properly

**Solutions**:
1. **Check Version Alignment**: Ensure domain extends correct core version
2. **Update Domain References**: Modify inheritance.yml extends field
3. **Migrate Content**: Update domain content for new core version
4. **Coordinate Updates**: Ensure all domains use compatible versions

**Example Migration**:
```yaml
# Before: Using old version
extends: "core-governance@v1.0"

# After: Updated to current version
extends: "core-governance@v1.1"

# May require updating domain content to match new core principles
```

### Validation Procedures

#### Pre-Update Checklist

1. **Backup Files**: Copy current files before making changes
2. **Plan Changes**: Document what you're updating and why
3. **Check Dependencies**: Identify what might be affected by changes
4. **Validate Syntax**: Use YAML validators before saving

#### Post-Update Verification

1. **Server Restart**: Always restart after YAML changes
2. **UI Testing**: Check all affected tabs and components
3. **Cross-Reference Testing**: Verify links and references work
4. **Inheritance Testing**: Confirm inheritance relationships display correctly
5. **Mobile Testing**: Check responsive design on mobile devices

#### Systematic Testing Approach

```
1. Forum Page Load
   ✓ All organizations load
   ✓ No console errors
   ✓ Stats display correctly

2. Principles Tab
   ✓ All principles display
   ✓ Inheritance badges correct
   ✓ Content renders properly
   ✓ Filtering works

3. Rules Tab  
   ✓ Rules load and display
   ✓ Principle derivation shows
   ✓ Categories filter correctly
   ✓ Implementation details visible

4. Terms Tab
   ✓ Terms load correctly
   ✓ Definitions display
   ✓ Cross-references resolve

5. Cross-Tab Navigation
   ✓ References between tabs work
   ✓ Inheritance tree functions
   ✓ No broken links
```

### Performance Optimization

#### Large File Sets
- **Lazy Loading**: Consider implementing if file counts grow large
- **Selective Loading**: Load only needed organization data
- **Caching Strategy**: Implement more sophisticated caching if needed

#### Memory Usage
- **Cache Management**: Monitor memory usage of governance loader cache
- **Data Structure Optimization**: Consider optimizing data structures for large datasets
- **Incremental Loading**: Load data incrementally if performance degrades

### Emergency Recovery

#### If System Breaks After Update

1. **Immediate Steps**:
   ```bash
   # Stop the server
   Ctrl+C
   
   # Restore backup files
   cp backup/* dahao-governance/
   
   # Restart server
   npm run dev
   ```

2. **Identify Issue**:
   - Check server console for error messages
   - Look for YAML syntax errors
   - Verify file paths and names
   - Check for missing required fields

3. **Gradual Fix**:
   - Start with minimal working state
   - Add changes incrementally
   - Test after each small change
   - Identify exact problematic content

This troubleshooting guide covers the most common issues you'll encounter when updating dahao-governance content. The key is systematic testing and having good backups before making changes.

---

## Conclusion

This comprehensive guide provides all the technical details needed to confidently update the dahao-governance folder content. The system is designed to separate content from presentation, allowing for extensive content updates without requiring code changes.

### Key Takeaways

1. **Content vs Code**: Most text and structural updates can be made without touching React components
2. **Validation is Critical**: YAML syntax and cross-references must be correct for proper functioning
3. **Inheritance is Powerful**: The inheritance system allows for sophisticated domain relationships
4. **Testing is Essential**: Always restart the server and test UI functionality after changes
5. **Documentation Helps**: Keep changelogs updated to track the evolution of content

The three-layer architecture (Terms → Principles → Rules) provides a clear framework for organizing governance content while maintaining flexibility for domain-specific requirements. This system scales well and supports the complex governance needs of multi-domain organizations while preserving the democratic evolution capabilities that make DAHAO unique.