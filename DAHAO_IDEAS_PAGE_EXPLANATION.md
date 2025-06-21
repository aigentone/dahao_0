# DAHAO Ideas Page - Technical Documentation

## Overview

The DAHAO Ideas Page (`/src/app/ideas/page.tsx`) is a sophisticated governance explorer that displays the complete ecosystem of DAHAO governance branches in an interactive, VS Code-style interface. It provides deep visibility into the governance structure, from core principles to specialized domains.

## Page Architecture

### Two-Column Layout

The page uses a **VS Code-inspired two-column layout**:

- **Left Sidebar (320px)**: Tree navigation with search functionality
- **Right Content Area**: Detailed view of selected branch with tabbed content

### Data Sources

The page imports and integrates data from 6 mock JSON files:

1. **`branches.json`** - Branch hierarchy and metadata
2. **`elements-terms.json`** - Governance term definitions with versions
3. **`elements-principles.json`** - Governance principles and their statements
4. **`elements-rules.json`** - Operational governance rules
5. **`elements-metarules.json`** - High-level meta-governance rules
6. **`discussions.json`** - Active community discussions and proposals

## Key Features

### 1. Hierarchical Branch Navigation

**Tree Structure Building**:
```typescript
const buildTree = (branches: Branch[]): TreeNode[] => {
  // Creates parent-child relationships
  // Assigns proper indentation levels
  // Maintains connection to core DAHAO
}
```

**Branch Types with Visual Icons**:
- 🏠 **Core DAHAO** - The foundational governance system
- 🏢 **Sub-DAHAOs** - Specialized domains (Animal Welfare, Environmental, Music Industry)
- 💻 **Main Branches** - Experimental governance improvements
- 👤 **User Branches** - Individual user governance experiments

### 2. Advanced Search & Filtering

- **Real-time search** across branch names, descriptions, and types
- **Hierarchical filtering** - maintains parent-child relationships in results
- **Search preserves tree structure** - shows relevant branches with their context

### 3. Inheritance-Aware Data Display

The page uses sophisticated inheritance logic that shows ALL applicable governance elements:

```typescript
// Gets complete inheritance chain for a branch
const getParentChain = (branchId: string, branches: Branch[]): string[] => {
  const branch = branches.find(b => b.id === branchId);
  if (!branch || !branch.parentId) return [branchId];
  return [...getParentChain(branch.parentId, branches), branchId];
};

// Gets ALL elements that apply to a branch (inherited + modified)
const getElementsForBranch = (elements: any, branchId: string, branches: Branch[]) => {
  const parentChain = getParentChain(branchId, branches);
  // Shows inherited elements from parent branches + branch-specific modifications
};

// Determines inheritance status and source
const getInheritanceInfo = (element: any, targetBranchId: string, parentChain: string[]) => {
  // Returns: { type: 'modified'|'inherited', source: branchId, version: string }
};
```

**Inheritance Types**:
- 🔵 **Modified** - Element has branch-specific changes (blue highlight)
- ⬇️ **Inherited from Core** - Uses base governance version (gray badge)
- ⬇️ **Inherited from Parent** - Uses parent branch version (green badge)

### 4. Advanced Sorting & Organization System

The page implements sophisticated sorting that respects governance inheritance while providing multiple organizational views:

**Sort Options**:
- **Modified First** (default) - Prioritizes branch-specific changes over inherited elements
- **Alphabetical** - Standard A-Z sorting with directional control
- **Recently Updated** - Sorts by version creation date (newest first)
- **By Status** - Groups by ratification status (ratified → proposed → voting)

**Interactive Controls**:
- **Sort Direction Toggle** - Click the ⬍⬍ icon to reverse any sort order
- **Visual Feedback** - Icon rotates 180° when sorting descending
- **Consistent Behavior** - All sort options work across Terms, Principles, and Rules tabs

**Visual Organization**:
```typescript
// Smart grouping for "Modified First" option
const { modified, inherited } = groupElementsByInheritance(sortedElements);

// Section headers with counts
<SectionHeader title="Modified in This Branch" count={modified.length} />
<SectionHeader title="Inherited Elements" count={inherited.length} />
```

**Sorting Logic**:
```typescript
const sortElements = (elements: any[], sortOption: string, branchId: string, direction: 'asc' | 'desc') => {
  const multiplier = direction === 'desc' ? -1 : 1;
  // Handles inheritance-aware sorting with directional control
};
```

## Tabbed Content System

### Overview Tab
- **Branch metadata** - creation date, owner, version info
- **Statistics grid** - terms, principles, discussions, child branches
- **Child branches list** - direct descendants in the hierarchy
- **Active proposals count** - current governance activity

### Terms Tab
Displays governance vocabulary with:
- **Term definitions** - full and brief descriptions
- **Version management** - semantic versioning with changelogs
- **Status indicators** - ratified (green), proposed (yellow), voting (blue)
- **Usage relationships** - which principles and rules reference each term
- **GitHub issue links** - traceability to development discussions
- **Advanced sorting** - multiple sort options with directional control
- **Visual grouping** - section headers separate modified from inherited elements

**Complete Governance Picture Example**:
When viewing **John's Main Branch**, you now see ALL applicable terms:

- **"Harm" v1.3.0-john** 🔵 *Modified* - "Adds emotional and informational harm"
- **"Transparency" v1.2.0-john** 🔵 *Modified* - "Complete openness including financial details" 
- **"Being" v1.0.0** ⬇️ *From Core* - "Entity capable of subjective experience"
- **"Governance" v1.0.0** ⬇️ *From Core* - "System for collective decision-making"
- **"Consensus" v1.0.0** ⬇️ *From Core* - "General agreement without sustained opposition"
- **...** (all other core terms inherited automatically)

This gives users the **complete governance picture** instead of just branch-specific elements.

### Principles Tab
Shows governance principles with:
- **Principle statements** - formal governance declarations
- **Term dependencies** - shows which terms are referenced (e.g., "harm@v1.2.0", "being@v1.0.0")
- **Implementation details** - which rules operationalize each principle
- **Version evolution** - how principles adapt across branches
- **Intelligent sorting** - prioritizes modified elements with grouping options
- **Section organization** - clear separation between branch modifications and inherited principles

**Example: "Minimize Harm" principle**:
- Core: "All actions should minimize harm@v1.2.0 to all beings@v1.0.0"
- Animal Welfare: "All actions must **actively** minimize harm@v1.2.1-animal to all beings@v1.1.0-animal, with **special consideration for species-specific needs**"

### Rules Tab
Displays operational governance with:
- **Rule vs Meta-Rule distinction** - color-coded badges
- **Purpose statements** - what each rule accomplishes
- **Key requirements** - specific operational mandates
- **Implementation relationships** - which principles each rule serves
- **Comprehensive sorting** - handles both rules and meta-rules with unified controls
- **Grouped presentation** - modified rules appear first, followed by inherited governance

**Rule Types**:
- 🔵 **Rules** - Operational governance (Voting Thresholds, Proposal Lifecycle)
- 🟣 **Meta-Rules** - System-level governance (Right to Fork, Version Control)

### Discussions Tab
Shows community governance activity:
- **Discussion types** - proposals, discussions, bugs
- **Voting status** - real-time vote tallies (yes/no/abstain)
- **Proposal details** - specific changes being suggested
- **Community engagement** - views, comments, participants
- **Timeline information** - creation and last activity dates

## Technical Implementation

### State Management
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['core-dahao']));
const [selectedBranch, setSelectedBranch] = useState<TreeNode | null>(null);
const [sortOption, setSortOption] = useState('modified-first');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
```

### Data Processing Pipeline
1. **Import** all governance data files
2. **Build tree structure** from flat branch data
3. **Filter by search** while maintaining hierarchy
4. **Select branch** for detailed view
5. **Filter elements** by selected branch with inheritance
6. **Sort and group elements** based on user preferences
7. **Display version-specific** content with visual organization

### Visual Design System

**Status Color Coding**:
- 🟢 `ratified` - Approved and active governance
- 🟡 `proposed` - Under consideration
- 🔵 `voting` - Currently being voted on
- 🟢 `approved` - Passed but not yet implemented
- ⚫ `resolved` - Completed or closed

**Inheritance Indicators**:
- 🔵 **Modified Badge** (blue) - Element has branch-specific changes
- ⬇️ **From Core Badge** (gray) - Inherited from Core DAHAO
- ⬇️ **From Parent Badge** (green) - Inherited from parent branch
- **Blue Border/Background** - Highlights modified elements
- **Italic Text** - Shows inheritance source ("Inherited from Core DAHAO")

**Branch Type Icons**:
- 🏠 Home - Core DAHAO
- 🏢 Building - Sub-DAHAOs
- 💻 Code - Main branches
- 👤 User - User branches

## Inheritance System

### Complete Governance View
The updated implementation ensures **no empty tabs** by showing ALL applicable governance elements:

1. **Inherited Elements** - Core governance that applies to all branches
2. **Modified Elements** - Branch-specific adaptations with clear change tracking
3. **Parent Chain Resolution** - Inherits from closest applicable ancestor

### Inheritance Resolution Logic
```
User Branch → Parent Branch → Core DAHAO
     ↓             ↓            ↓
  Modified    →  Inherited  →  Base
```

**Example: Animal Welfare Branch viewing "Harm" term**:
- Shows Animal Welfare's modified version: `v1.2.1-animal` 🔵 *Modified*
- Not Core's version: `v1.2.0` (hidden, overridden)
- Clear indication: "Adds species-specific suffering"

**Example: John's Branch viewing "Being" term**:
- Shows Core's version: `v1.0.0` ⬇️ *From Core*
- Clear indication: "Inherited from Core DAHAO"
- No modifications in John's branch

### Benefits for Users
- **Complete Picture** - See all governance that applies
- **Clear Attribution** - Know where each rule comes from
- **Change Tracking** - Understand what's modified vs inherited
- **No Empty Tabs** - Every branch shows rich governance content
- **Efficient Navigation** - Smart sorting puts most relevant content first
- **Flexible Organization** - Multiple sort options adapt to different user needs

## Data Relationships

### Version Dependencies
Terms, principles, and rules form a dependency graph:
```
Terms (v1.2.0) → Principles (reference specific term versions) → Rules (implement principles)
```

### Branch Inheritance
Branches inherit and modify governance elements:
```
Core DAHAO → Sub-DAHAOs → User Branches
     ↓            ↓           ↓
  v1.2.0    v1.2.1-animal  v1.3.0-john
```

### Cross-References
- **Terms** show which principles and rules use them
- **Principles** show which rules implement them
- **Rules** show which principles they serve
- **Discussions** link to specific governance elements

## Performance Considerations

### Efficient Filtering
- Uses `useMemo` for expensive tree building operations
- Filters happen client-side for instant search results
- Tree structure is built once and reused

### Lazy Loading
- Content is rendered only when branches are selected
- Large datasets are processed incrementally
- Search results maintain full context without performance impact

## Future Extensibility

The page architecture supports:
- **Additional data sources** - easy to add new JSON files
- **New tab types** - extensible tab system
- **Enhanced filtering** - can add date ranges, status filters, etc.
- **Real-time updates** - prepared for WebSocket integration
- **Export functionality** - data is already structured for export

## User Experience Flow

1. **Landing** - See hierarchical tree of all governance branches
2. **Search** - Find specific branches or governance concepts
3. **Navigate** - Expand/collapse tree sections, click to select
4. **Explore** - Browse tabs to understand governance in detail
5. **Organize** - Use sorting controls to prioritize relevant content
6. **Focus** - Section headers separate modifications from inherited elements
7. **Deep Dive** - Follow links to GitHub issues, see version history
8. **Compare** - Switch between branches to see governance variations

## Integration with DAHAO Ecosystem

The Ideas page serves as the **governance explorer** in the broader DAHAO system:
- **Connects to** `/governance` (live dashboard)
- **References** `/versioned-ethics` (AI governance philosophy)
- **Supports** `/how-it-works` (practical explanations)
- **Feeds into** future proposal and voting interfaces

This page transforms the complex, versioned governance data into an intuitive, explorable interface that helps users understand how DAHAO's democratic governance system works across different domains and experimentation contexts.

## Latest Enhancement: Intelligent Sorting System

The recent addition of the **Advanced Sorting & Organization System** represents a significant usability improvement:

### Key Features Added:
- **Default "Modified First" sorting** - Immediately shows what's unique to each branch
- **Visual section separation** - Clear headers distinguish modified from inherited elements
- **Bidirectional sorting** - Click the sort icon to reverse any sort order
- **Four sort strategies** - Modified First, Alphabetical, Recently Updated, By Status
- **Consistent across tabs** - Same sorting controls work for Terms, Principles, and Rules
- **Element count badges** - Shows how many items are in each section

### Impact on User Experience:
- **Faster content discovery** - Users immediately see branch-specific modifications
- **Reduced cognitive load** - Clear visual grouping separates different types of content
- **Flexible exploration** - Multiple sort options support different research workflows
- **Complete governance view** - Never miss inherited elements while prioritizing modifications

This enhancement transforms the Ideas page from a comprehensive governance browser into an **intelligent governance explorer** that adapts to user needs while maintaining the complete inheritance picture that makes DAHAO's branching governance system transparent and accessible.