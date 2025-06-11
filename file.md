# GOAL: Create Term Dictionary YML Files and Update Ethics to Use Terms

## STEP 1: Create Term Dictionary Files

### CREATE: dahao-governance/core-governance/terms/v1.0/fundamental.yml
```yaml
version: "1.0"
namespace: "core"
terms:
  harm:
    v1.0:
      definition: "Physical damage to a being"
      created: "2024-01-01"
    v1.1:
      definition: "Any reduction in wellbeing, including physical damage, psychological distress, opportunity limitation, or dignity violation"
      created: "2024-06-15"
      changes:
        - "Expanded beyond physical to include psychological harm"
        - "Added opportunity and dignity aspects"

  being:
    v1.0:
      definition: "Any entity capable of experience"
      created: "2024-01-01"
    v1.1:
      definition: "Any entity capable of subjective experience"
      created: "2024-03-10"
    v2.0:
      definition: "Any entity with interests that can be affected"
      created: "2024-09-20"
      changes:
        - "Expanded to include future AIs and collective entities"

  wellbeing:
    v1.0:
      definition: "State of positive functioning"
      dimensions: ["physical", "mental"]
      created: "2024-01-01"
    v1.1:
      definition: "Holistic state of thriving"
      dimensions: ["physical", "mental", "social", "environmental"]
      created: "2024-07-15"
CREATE: dahao-governance/core-governance/terms/v1.0/governance.yml
yamlversion: "1.0"
namespace: "core"
terms:
  transparency:
    v1.0:
      definition: "All decisions and processes must be open and auditable"
      created: "2024-01-01"
    v1.1:
      definition: "All decisions and processes must be open, auditable, and include AI agent reasoning traces"
      created: "2024-12-15"

  equality:
    v1.0:
      definition: "All humans have equal fundamental rights"
      created: "2024-01-01"
    v1.1:
      definition: "All humans have equal fundamental rights regardless of background"
      created: "2024-06-15"

  sustainability:
    v1.0:
      definition: "Consider long-term impact on community and environment"
      created: "2024-01-01"
    v1.1:
      definition: "Actively improve rather than just maintain conditions for future generations"
      created: "2024-08-20"
CREATE: dahao-governance/animal-welfare/terms/v1.0/welfare-core.yml
yamlversion: "1.0"
namespace: "welfare"
terms:
  suffering:
    v1.0:
      definition: "Negative subjective experience of sentient beings"
      extends: "core:harm@v1.1"
      specificity: "Conscious experience requirement"
      types:
        physical: "Pain, discomfort, illness"
        psychological: "Fear, distress, frustration"
        behavioral: "Inability to express natural behaviors"
      created: "2024-02-01"

  sentience:
    v1.0:
      definition: "Capacity to have subjective experiences"
      extends: "core:being@v1.1"
      indicators:
        - "nociception"
        - "cognitive_complexity"
        - "behavioral_responses"
      created: "2024-02-01"

  five_freedoms:
    v1.0:
      definition: "Framework for assessing animal welfare"
      components:
        - "Freedom from hunger and thirst"
        - "Freedom from discomfort"
        - "Freedom from pain, injury, disease"
        - "Freedom to express normal behavior"
        - "Freedom from fear and distress"
      created: "2024-02-01"
CREATE: dahao-governance/environment/terms/v1.0/ecosystem-specific.yml
yamlversion: "1.0"
namespace: "environment"
terms:
  ecosystem_health:
    v1.2:
      definition: "Integrated wellbeing of all beings in a system"
      uses_terms:
        - "core:wellbeing@v1.1"
        - "core:being@v2.0"
      aspects:
        - "non-sentient entities"
        - "emergent properties"
        - "temporal sustainability"
      created: "2024-03-15"

  sustainability_enhanced:
    v1.2:
      definition: "Beyond maintaining to actively improving environmental conditions"
      extends: "core:sustainability@v1.1"
      focus: "regenerative approach"
      created: "2024-03-15"
STEP 2: Update Ethics YML Files to Use Terms
UPDATE: dahao-governance/core-governance/ethics/v1.1/harm-prevention.yml
Add after description:
yamluses_terms:
  - "core:harm@v1.1"
  - "core:being@v2.0"
  - "core:wellbeing@v1.1"

# Update description to:
description: "Actively prevent {core:harm@v1.1} to all {core:being@v2.0} with proactive measures"

# Update harm_categories descriptions:
harm_categories:
  physical:
    description: "Direct physical {core:harm@v1.1} to {core:being@v2.0}"
UPDATE: dahao-governance/animal-welfare/ethics/v1.0/five-freedoms.yml
Add after description:
yamluses_terms:
  - "welfare:five_freedoms@v1.0"
  - "welfare:suffering@v1.0"
  - "core:wellbeing@v1.1"

# Update description to:
description: "Implementation of {welfare:five_freedoms@v1.0} framework for all animal-related decisions"

# Update freedom descriptions:
freedom_from_hunger:
  description: "Freedom from hunger and thirst - ensuring {core:wellbeing@v1.1}"
STEP 3: Update Type System
UPDATE: types/governance.ts
Add to GovernancePrinciple interface:
typescript// Term-related fields
uses_terms?: string[]; // Array of term references like "core:harm@v1.1"
term_definitions?: Record<string, any>; // Resolved term definitions
Add new interfaces:
typescriptexport interface Term {
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
STEP 4: Update API to Load Terms
UPDATE: app/api/governance/route.ts
Add term loading:
typescriptasync function loadTermsForDomain(domain: string): Promise<TermDictionary | null> {
  const termsPath = path.join(process.cwd(), 'dahao-governance', domain, 'terms');

  if (!fs.existsSync(termsPath)) {
    return null;
  }

  // Load all term files
  const termFiles = fs.readdirSync(termsPath, { recursive: true })
    .filter(file => file.endsWith('.yml'));

  const terms: TermDictionary = {
    version: "1.0",
    namespace: domain,
    terms: {}
  };

  for (const file of termFiles) {
    const content = fs.readFileSync(path.join(termsPath, file), 'utf8');
    const termData = yaml.load(content) as TermDictionary;

    // Merge terms
    Object.assign(terms.terms, termData.terms);
  }

  return terms;
}
STEP 5: Create Dynamic Terms API
CREATE: app/api/terms/route.ts
typescriptimport { NextResponse } from 'next/server';
import { loadGovernanceData } from '@/lib/governance-loader';

export async function GET() {
  try {
    const data = await loadGovernanceData();
    const allTerms: Record<string, any> = {};

    // Load terms from each organization
    for (const org of data.organizations) {
      const terms = await loadTermsForDomain(org.id);
      if (terms) {
        allTerms[org.id] = terms;
      }
    }

    return NextResponse.json(allTerms);
  } catch (error) {
    console.error('Error loading terms:', error);
    return NextResponse.json({ error: 'Failed to load terms' }, { status: 500 });
  }
}
STEP 6: Update Terms Page to be Dynamic
UPDATE: app/terms/page.tsx
Replace static content with:
typescriptconst [terms, setTerms] = useState<Record<string, TermDictionary>>({});
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/terms')
    .then(res => res.json())
    .then(data => {
      setTerms(data);
      setLoading(false);
    });
}, []);

// Then dynamically render terms from the loaded data
