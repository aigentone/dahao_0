'use client';

import { useState, useMemo } from 'react';
import { HeroSection } from '@/components/shared/HeroSection';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  GitBranch, 
  Search, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Eye,
  Home,
  Building,
  Code,
  User,
  BookOpen,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ArrowDown,
  Edit3,
  Plus,
  ArrowUpDown,
  Bot
} from 'lucide-react';
import branchesData from '@/lib/mock-data/branches.json';
import termsData from '@/lib/mock-data/elements-terms.json';
import principlesData from '@/lib/mock-data/elements-principles.json';
import rulesData from '@/lib/mock-data/elements-rules.json';
import metaRulesData from '@/lib/mock-data/elements-metarules.json';
import discussionsData from '@/lib/mock-data/discussions.json';
import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';

interface Branch {
  id: string;
  name: string;
  type: 'core' | 'sub-dahao' | 'main-branch' | 'user-branch';
  version: string;
  description: string;
  parentId: string | null;
  childrenIds: string[];
  stats: {
    totalTerms: number;
    totalPrinciples: number;
    totalRules: number;
    totalDiscussions: number;
    childBranches: number;
    activeProposals?: number;
  };
  createdAt: string;
  createdBy: string;
  lastModified: string;
  visibility?: string;
  ownerId?: string;
}

interface TreeNode extends Branch {
  children: TreeNode[];
  level: number;
}

// Helper functions for governance data
const getParentChain = (branchId: string, branches: Branch[]): string[] => {
  const branch = branches.find(b => b.id === branchId);
  if (!branch || !branch.parentId) return [branchId];
  return [...getParentChain(branch.parentId, branches), branchId];
};

const getElementsForBranch = (elements: any, branchId: string, branches: Branch[]) => {
  const parentChain = getParentChain(branchId, branches);
  const result: any[] = [];
  
  Object.values(elements).forEach((element: any) => {
    // Check if this element applies to any branch in the parent chain
    const applicableVersion = parentChain.reverse().find(ancestorId => 
      element.branchVersions && element.branchVersions[ancestorId]
    );
    
    if (applicableVersion || element.domain === 'core') {
      result.push({
        ...element,
        _inheritanceInfo: getInheritanceInfo(element, branchId, parentChain.reverse())
      });
    }
  });
  
  return result;
};

const getInheritanceInfo = (element: any, targetBranchId: string, parentChain: string[]) => {
  // Check if element has a version specific to this branch
  if (element.branchVersions && element.branchVersions[targetBranchId]) {
    return {
      type: 'modified',
      source: targetBranchId,
      version: element.branchVersions[targetBranchId]
    };
  }
  
  // Find the closest parent that has this element
  for (let i = parentChain.length - 2; i >= 0; i--) {
    const ancestorId = parentChain[i];
    if (element.branchVersions && element.branchVersions[ancestorId]) {
      return {
        type: 'inherited',
        source: ancestorId,
        version: element.branchVersions[ancestorId]
      };
    }
  }
  
  // Fallback to current version (core)
  return {
    type: 'inherited',
    source: 'core-dahao',
    version: element.currentVersion
  };
};

const getVersionForBranch = (element: any, branchId: string) => {
  return element._inheritanceInfo?.version || element.branchVersions?.[branchId] || element.currentVersion;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ratified':
      return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
    case 'proposed':
      return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
    case 'voting':
      return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700';
    case 'approved':
      return 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700';
    case 'resolved':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 dark:border-gray-700';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 dark:border-gray-700';
  }
};

const getDiscussionsForBranch = (branchId: string) => {
  return Object.values(discussionsData.discussions).filter((discussion: any) =>
    discussion.target.branchId === branchId
  );
};

const getBranchName = (branchId: string, branches: Branch[]) => {
  const branch = branches.find(b => b.id === branchId);
  return branch?.name || branchId;
};

const getInheritanceBadge = (inheritanceInfo: any, branches: Branch[]) => {
  if (inheritanceInfo.type === 'modified') {
    return (
      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700 text-xs">
        <Edit3 className="h-3 w-3 mr-1" />
        Modified
      </Badge>
    );
  } else if (inheritanceInfo.source === 'core-dahao') {
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 text-xs">
        <ArrowDown className="h-3 w-3 mr-1" />
        From Core
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
        <ArrowDown className="h-3 w-3 mr-1" />
        From {getBranchName(inheritanceInfo.source, branches)}
      </Badge>
    );
  }
};

const sortElements = (elements: any[], sortOption: string, selectedBranchId: string, direction: 'asc' | 'desc' = 'asc') => {
  const sorted = [...elements];
  const multiplier = direction === 'desc' ? -1 : 1;
  
  switch (sortOption) {
    case 'modified-first':
      return sorted.sort((a, b) => {
        const aModified = a._inheritanceInfo?.type === 'modified';
        const bModified = b._inheritanceInfo?.type === 'modified';
        const aInherited = a._inheritanceInfo?.type === 'inherited';
        const bInherited = b._inheritanceInfo?.type === 'inherited';
        
        // Modified first
        if (aModified && !bModified) return -1 * multiplier;
        if (!aModified && bModified) return 1 * multiplier;
        
        // Then inherited
        if (aInherited && !bInherited) return -1 * multiplier;
        if (!aInherited && bInherited) return 1 * multiplier;
        
        // Within same group, sort alphabetically
        return a.name.localeCompare(b.name) * multiplier;
      });
      
    case 'alphabetical':
      return sorted.sort((a, b) => a.name.localeCompare(b.name) * multiplier);
      
    case 'recently-updated':
      return sorted.sort((a, b) => {
        const aVersion = a._inheritanceInfo?.version || a.currentVersion;
        const bVersion = b._inheritanceInfo?.version || b.currentVersion;
        const aDate = a.versions[aVersion]?.createdAt || '';
        const bDate = b.versions[bVersion]?.createdAt || '';
        return bDate.localeCompare(aDate) * multiplier; // Most recent first when asc
      });
      
    case 'by-status':
      return sorted.sort((a, b) => {
        const aVersion = a._inheritanceInfo?.version || a.currentVersion;
        const bVersion = b._inheritanceInfo?.version || b.currentVersion;
        const aStatus = a.versions[aVersion]?.status || 'unknown';
        const bStatus = b.versions[bVersion]?.status || 'unknown';
        
        const statusOrder = { 'ratified': 0, 'approved': 1, 'proposed': 2, 'voting': 3, 'unknown': 4 };
        const aOrder = statusOrder[aStatus as keyof typeof statusOrder] ?? 4;
        const bOrder = statusOrder[bStatus as keyof typeof statusOrder] ?? 4;
        
        if (aOrder !== bOrder) return (aOrder - bOrder) * multiplier;
        return a.name.localeCompare(b.name) * multiplier;
      });
      
    default:
      return sorted;
  }
};

const groupElementsByInheritance = (elements: any[]) => {
  const modified = elements.filter(el => el._inheritanceInfo?.type === 'modified');
  const inherited = elements.filter(el => el._inheritanceInfo?.type === 'inherited');
  
  return { modified, inherited };
};

const SortDropdown = ({ 
  value, 
  onChange, 
  direction, 
  onDirectionChange 
}: { 
  value: string; 
  onChange: (value: string) => void;
  direction: 'asc' | 'desc';
  onDirectionChange: () => void;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <button 
      onClick={onDirectionChange}
      className="flex items-center justify-center w-8 h-8 hover:bg-muted/30 rounded-sm transition-colors"
      title={`Sort ${direction === 'asc' ? 'descending' : 'ascending'}`}
    >
      <ArrowUpDown className={`h-4 w-4 transition-transform ${
        direction === 'desc' ? 'rotate-180' : ''
      } text-gray-500 dark:text-gray-400 hover:text-gray-700`} />
    </button>
    <span className="text-sm font-medium text-gray-700">Sort by:</span>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="modified-first">Modified First</SelectItem>
        <SelectItem value="alphabetical">Alphabetical</SelectItem>
        <SelectItem value="recently-updated">Recently Updated</SelectItem>
        <SelectItem value="by-status">By Status</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    <Badge variant="secondary" className="text-xs">
      {count}
    </Badge>
  </div>
);

export default function IdeasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['core-dahao']));
  const [selectedBranch, setSelectedBranch] = useState<TreeNode | null>(null);
  const [sortOption, setSortOption] = useState('modified-first');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Agent assignment state
  const [selectedGovernanceItem, setSelectedGovernanceItem] = useState<any>(null);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  const [activeAgents, setActiveAgents] = useState<Record<string, string[]>>({
    // Mock some assigned agents for demonstration
    'harm': ['personal-ai-001'],
    'transparency': ['system-ai-001', 'personal-ai-002'],
    'minimize-harm': ['system-ai-001']
  });

  const branches: Branch[] = Object.values(branchesData.branches).map(branch => ({
    ...branch,
    type: branch.type as 'core' | 'sub-dahao' | 'main-branch' | 'user-branch'
  }));

  // Build tree structure
  const buildTree = (branches: Branch[]): TreeNode[] => {
    const branchMap = new Map<string, TreeNode>();
    
    // Initialize all branches as tree nodes
    branches.forEach(branch => {
      branchMap.set(branch.id, {
        ...branch,
        children: [],
        level: 0
      });
    });

    // Build parent-child relationships
    const roots: TreeNode[] = [];
    branches.forEach(branch => {
      const node = branchMap.get(branch.id)!;
      
      if (!branch.parentId) {
        roots.push(node);
      } else {
        const parent = branchMap.get(branch.parentId);
        if (parent) {
          node.level = parent.level + 1;
          parent.children.push(node);
        }
      }
    });

    return roots;
  };

  const tree = useMemo(() => buildTree(branches), [branches]);

  // Filter branches based on search
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return tree;

    const filterNode = (node: TreeNode): TreeNode | null => {
      const matches = 
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.type.toLowerCase().includes(searchQuery.toLowerCase());

      const filteredChildren = node.children
        .map(filterNode)
        .filter(Boolean) as TreeNode[];

      if (matches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren
        };
      }

      return null;
    };

    return tree.map(filterNode).filter(Boolean) as TreeNode[];
  }, [tree, searchQuery]);

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (expandedNodes.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getBranchTypeInfo = (type: string) => {
    switch (type) {
      case 'core':
        return { 
          color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700', 
          label: 'Core',
          icon: Home
        };
      case 'sub-dahao':
        return { 
          color: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700', 
          label: 'Sub-DAHAO',
          icon: Building
        };
      case 'main-branch':
        return { 
          color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700', 
          label: 'Main Branch',
          icon: Code
        };
      case 'user-branch':
        return { 
          color: 'bg-orange-100 text-orange-800 border-orange-200', 
          label: 'User Branch',
          icon: User
        };
      default:
        return { 
          color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 dark:border-gray-700', 
          label: 'Branch',
          icon: GitBranch
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render tree node for sidebar (VS Code style)
  const renderSidebarNode = (node: TreeNode) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const typeInfo = getBranchTypeInfo(node.type);
    const isSelected = selectedBranch?.id === node.id;
    const IconComponent = typeInfo.icon;

    return (
      <div key={node.id}>
        <div 
          className={`flex items-center gap-1 py-1 px-2 text-sm cursor-pointer hover:bg-muted/30 rounded-sm group ${
            isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${8 + node.level * 16}px` }}
          onClick={() => {
            setSelectedBranch(node);
            if (hasChildren) {
              toggleExpanded(node.id);
            }
          }}
        >
          {hasChildren ? (
            <button className="flex items-center justify-center w-4 h-4 hover:bg-muted rounded-sm">
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}
          <IconComponent className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <span className="truncate">{node.name}</span>
          <span className="text-xs text-gray-400 ml-auto opacity-0 group-hover:opacity-100">
            v{node.version}
          </span>
        </div>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {/* Vertical line for tree structure */}
            <div 
              className="absolute border-l border-gray-200 dark:border-gray-700"
              style={{
                left: `${16 + node.level * 16}px`,
                top: 0,
                bottom: 0,
                width: '1px'
              }}
            />
            {node.children.map(child => renderSidebarNode(child))}
          </div>
        )}
      </div>
    );
  };

  const totalBranches = branches.length;
  const totalTerms = branches.reduce((sum, branch) => sum + branch.stats.totalTerms, 0);
  const totalDiscussions = branches.reduce((sum, branch) => sum + branch.stats.totalDiscussions, 0);

  // Agent assignment helpers
  const handleAssignAgent = (item: any, type: 'term' | 'principle' | 'rule') => {
    const governanceItem = {
      type,
      data: item,
      id: item.id,
      version: getVersionForBranch(item, selectedBranch?.id || ''),
      domain: selectedBranch?.name || 'Unknown'
    };
    setSelectedGovernanceItem(governanceItem);
    setShowAgentPanel(true);
  };

  const closeAgentPanel = () => {
    setShowAgentPanel(false);
    setSelectedGovernanceItem(null);
  };

  const renderAgentBadges = (itemId: string) => {
    const agents = activeAgents[itemId];
    if (!agents || agents.length === 0) return null;
    
    return (
      <div className="flex gap-1 mt-1">
        {agents.map((agentId, index) => (
          <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Bot className="h-3 w-3 mr-1" />
            AI-{agentId.slice(-3)}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <HeroSection
        badge="Governance Explorer"
        title="DAHAO Ideas"
        subtitle="Explore the ecosystem of governance branches, from core principles to specialized domains"
        description={`Discover ${totalBranches} governance branches with ${totalTerms} terms and ${totalDiscussions} active discussions`}
      />

      {/* Two-column layout */}
      <div className="flex gap-6 h-[calc(100vh-400px)]">
        {/* Left Sidebar - Tree Navigation */}
        <div className="w-80 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg bg-muted/30 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>

          {/* Tree Navigation */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredTree.length > 0 ? (
                filteredTree.map(node => renderSidebarNode(node))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No branches found matching "{searchQuery}"
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Right Content Area */}
        <ScrollArea className="flex-1">
          {selectedBranch ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const typeInfo = getBranchTypeInfo(selectedBranch.type);
                        const IconComponent = typeInfo.icon;
                        return <IconComponent className="h-6 w-6 text-gray-500 dark:text-gray-400" />;
                      })()}
                      <CardTitle className="text-2xl">{selectedBranch.name}</CardTitle>
                      <Badge variant="outline" className={getBranchTypeInfo(selectedBranch.type).color}>
                        {getBranchTypeInfo(selectedBranch.type).label}
                      </Badge>
                      <Badge variant="secondary">v{selectedBranch.version}</Badge>
                    </div>
                    <CardDescription className="text-base mb-4">
                      {selectedBranch.description}
                    </CardDescription>
                  </div>
                  {selectedBranch.visibility && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Eye className="h-4 w-4" />
                      {selectedBranch.visibility}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-lg font-semibold">{selectedBranch.stats.totalTerms}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Terms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-lg font-semibold">{selectedBranch.stats.totalPrinciples}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Principles</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-lg font-semibold">{selectedBranch.stats.totalDiscussions}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Discussions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <GitBranch className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="text-lg font-semibold">{selectedBranch.stats.childBranches}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Child Branches</div>
                    </div>
                  </div>
                </div>
                
                {selectedBranch.stats.activeProposals !== undefined && (
                  <div className="mb-6">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {selectedBranch.stats.activeProposals} Active Proposals
                    </Badge>
                  </div>
                )}

                {/* Tabs for different content */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="terms">Terms</TabsTrigger>
                    <TabsTrigger value="principles">Principles</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Created:</strong> {formatDate(selectedBranch.createdAt)}
                        </div>
                        <div>
                          <strong>Last Modified:</strong> {formatDate(selectedBranch.lastModified)}
                        </div>
                        <div>
                          <strong>Created By:</strong> {selectedBranch.createdBy}
                        </div>
                        {selectedBranch.ownerId && (
                          <div>
                            <strong>Owner:</strong> {selectedBranch.ownerId}
                          </div>
                        )}
                      </div>
                      
                      {selectedBranch.children.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Child Branches:</h4>
                          <div className="space-y-1">
                            {selectedBranch.children.map(child => (
                              <div key={child.id} className="text-sm text-gray-600 dark:text-gray-300">
                                {child.name} (v{child.version})
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="terms" className="mt-6">
                    <div className="space-y-4">
                      {(() => {
                        const branchTerms = getElementsForBranch(termsData.terms, selectedBranch.id, branches);
                        if (branchTerms.length === 0) {
                          return (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                              <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 dark:text-gray-300 mx-auto mb-4" />
                              <p>No terms defined for this branch</p>
                            </div>
                          );
                        }
                        
                        const sortedTerms = sortElements(branchTerms, sortOption, selectedBranch.id, sortDirection);
                        const { modified, inherited } = groupElementsByInheritance(sortedTerms);
                        
                        const renderTermCard = (term: any) => {
                          const version = getVersionForBranch(term, selectedBranch.id);
                          const versionData = term.versions[version];
                          const inheritanceInfo = term._inheritanceInfo;
                          
                          return (
                            <div key={term.id} className={`border rounded-lg p-4 ${
                              inheritanceInfo?.type === 'modified' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-700'
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-semibold text-lg">{term.name}</h4>
                                  <Badge variant="outline">v{version}</Badge>
                                  {inheritanceInfo && getInheritanceBadge(inheritanceInfo, branches)}
                                  {versionData?.status && (
                                    <Badge variant="outline" className={getStatusColor(versionData.status)}>
                                      {versionData.status}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleAssignAgent(term, 'term')}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Bot className="h-4 w-4" />
                                  </Button>
                                  {versionData?.githubIssue && (
                                    <a 
                                      href={`#${versionData.githubIssue}`}
                                      className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                              {inheritanceInfo?.type === 'inherited' && inheritanceInfo.source !== selectedBranch.id && (
                                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 italic">
                                  Inherited from {getBranchName(inheritanceInfo.source, branches)}
                                </div>
                              )}
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{versionData?.brief}</p>
                              <p className="text-sm mb-3">{versionData?.definition}</p>
                              {versionData?.changelog && inheritanceInfo?.type === 'modified' && (
                                <div className="text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/20 p-2 rounded mb-2">
                                  <strong>Changes in this branch:</strong> {versionData.changelog}
                                </div>
                              )}
                              {term.usedBy && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  <strong>Used by:</strong>{' '}
                                  {term.usedBy.principles && (
                                    <span>
                                      {term.usedBy.principles.length} principles
                                      {term.usedBy.rules && ', '}
                                    </span>
                                  )}
                                  {term.usedBy.rules && (
                                    <span>{term.usedBy.rules.length} rules</span>
                                  )}
                                </div>
                              )}
                              {renderAgentBadges(term.id)}
                            </div>
                          );
                        };
                        
                        return (
                          <>
                            <SortDropdown 
                              value={sortOption} 
                              onChange={setSortOption}
                              direction={sortDirection}
                              onDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                            />
                            
                            {sortOption === 'modified-first' ? (
                              <>
                                {modified.length > 0 && (
                                  <>
                                    <SectionHeader title="Modified in This Branch" count={modified.length} />
                                    {modified.map((term: any) => renderTermCard(term))}
                                  </>
                                )}
                                {inherited.length > 0 && (
                                  <>
                                    <SectionHeader title="Inherited Elements" count={inherited.length} />
                                    {inherited.map((term: any) => renderTermCard(term))}
                                  </>
                                )}
                              </>
                            ) : (
                              sortedTerms.map((term: any) => renderTermCard(term))
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="principles" className="mt-6">
                    <div className="space-y-4">
                      {(() => {
                        const branchPrinciples = getElementsForBranch(principlesData.principles, selectedBranch.id, branches);
                        if (branchPrinciples.length === 0) {
                          return (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                              <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 dark:text-gray-300 mx-auto mb-4" />
                              <p>No principles defined for this branch</p>
                            </div>
                          );
                        }
                        const sortedPrinciples = sortElements(branchPrinciples, sortOption, selectedBranch.id, sortDirection);
                        const { modified, inherited } = groupElementsByInheritance(sortedPrinciples);
                        
                        const renderPrincipleCard = (principle: any) => {
                          const version = getVersionForBranch(principle, selectedBranch.id);
                          const versionData = principle.versions[version];
                          const inheritanceInfo = principle._inheritanceInfo;
                          
                          return (
                            <div key={principle.id} className={`border rounded-lg p-4 ${
                              inheritanceInfo?.type === 'modified' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-700'
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-semibold text-lg">{principle.name}</h4>
                                  <Badge variant="outline">v{version}</Badge>
                                  {inheritanceInfo && getInheritanceBadge(inheritanceInfo, branches)}
                                  {versionData?.status && (
                                    <Badge variant="outline" className={getStatusColor(versionData.status)}>
                                      {versionData.status}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleAssignAgent(principle, 'principle')}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Bot className="h-4 w-4" />
                                  </Button>
                                  {versionData?.githubIssue && (
                                    <a 
                                      href={`#${versionData.githubIssue}`}
                                      className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                              {inheritanceInfo?.type === 'inherited' && inheritanceInfo.source !== selectedBranch.id && (
                                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 italic">
                                  Inherited from {getBranchName(inheritanceInfo.source, branches)}
                                </div>
                              )}
                              <p className="text-sm mb-3 font-medium italic">{versionData?.statement}</p>
                              {versionData?.changelog && inheritanceInfo?.type === 'modified' && (
                                <div className="text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/20 p-2 rounded mb-2">
                                  <strong>Changes in this branch:</strong> {versionData.changelog}
                                </div>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                {versionData?.termDependencies && Object.keys(versionData.termDependencies).length > 0 && (
                                  <div className="text-gray-600 dark:text-gray-300">
                                    <strong>Uses terms:</strong>{' '}
                                    {Object.entries(versionData.termDependencies).map(([term, termVersion], index) => (
                                      <span key={term}>
                                        {term}@v{termVersion as string}
                                        {index < Object.keys(versionData.termDependencies).length - 1 ? ', ' : ''}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {principle.implementedBy?.rules && (
                                  <div className="text-gray-600 dark:text-gray-300">
                                    <strong>Implemented by:</strong> {principle.implementedBy.rules.length} rules
                                  </div>
                                )}
                              </div>
                              {renderAgentBadges(principle.id)}
                            </div>
                          );
                        };
                        
                        return (
                          <>
                            <SortDropdown 
                              value={sortOption} 
                              onChange={setSortOption}
                              direction={sortDirection}
                              onDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                            />
                            
                            {sortOption === 'modified-first' ? (
                              <>
                                {modified.length > 0 && (
                                  <>
                                    <SectionHeader title="Modified in This Branch" count={modified.length} />
                                    {modified.map((principle: any) => renderPrincipleCard(principle))}
                                  </>
                                )}
                                {inherited.length > 0 && (
                                  <>
                                    <SectionHeader title="Inherited Elements" count={inherited.length} />
                                    {inherited.map((principle: any) => renderPrincipleCard(principle))}
                                  </>
                                )}
                              </>
                            ) : (
                              sortedPrinciples.map((principle: any) => renderPrincipleCard(principle))
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rules" className="mt-6">
                    <div className="space-y-4">
                      {(() => {
                        const branchRules = getElementsForBranch(rulesData.rules, selectedBranch.id, branches);
                        const branchMetaRules = getElementsForBranch(metaRulesData.metaRules, selectedBranch.id, branches);
                        const allRules = [...branchRules, ...branchMetaRules];
                        
                        if (allRules.length === 0) {
                          return (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                              <Shield className="h-12 w-12 text-gray-300 dark:text-gray-600 dark:text-gray-300 mx-auto mb-4" />
                              <p>No rules defined for this branch</p>
                            </div>
                          );
                        }
                        
                        const sortedRules = sortElements(allRules, sortOption, selectedBranch.id, sortDirection);
                        const { modified, inherited } = groupElementsByInheritance(sortedRules);
                        
                        const renderRuleCard = (rule: any) => {
                          const version = getVersionForBranch(rule, selectedBranch.id);
                          const versionData = rule.versions[version];
                          const isMetaRule = rule.type === 'meta-rule';
                          const inheritanceInfo = rule._inheritanceInfo;
                          
                          return (
                            <div key={rule.id} className={`border rounded-lg p-4 ${
                              inheritanceInfo?.type === 'modified' ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-gray-700'
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-semibold text-lg">{rule.name}</h4>
                                  <Badge variant="outline">v{version}</Badge>
                                  {inheritanceInfo && getInheritanceBadge(inheritanceInfo, branches)}
                                  <Badge variant="outline" className={isMetaRule ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700'}>
                                    {isMetaRule ? 'Meta-Rule' : 'Rule'}
                                  </Badge>
                                  {versionData?.status && (
                                    <Badge variant="outline" className={getStatusColor(versionData.status)}>
                                      {versionData.status}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleAssignAgent(rule, 'rule')}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Bot className="h-4 w-4" />
                                  </Button>
                                  {versionData?.githubIssue && (
                                    <a 
                                      href={`#${versionData.githubIssue}`}
                                      className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                              {inheritanceInfo?.type === 'inherited' && inheritanceInfo.source !== selectedBranch.id && (
                                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 italic">
                                  Inherited from {getBranchName(inheritanceInfo.source, branches)}
                                </div>
                              )}
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{versionData?.purpose}</p>
                              {versionData?.keyRequirements && (
                                <div className="mb-3">
                                  <strong className="text-sm">Key Requirements:</strong>
                                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {versionData.keyRequirements.map((req: string, index: number) => (
                                      <li key={index}>{req}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {versionData?.requirements && (
                                <div className="mb-3">
                                  <strong className="text-sm">Requirements:</strong>
                                  <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                                    {versionData.requirements.map((req: string, index: number) => (
                                      <li key={index}>{req}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {versionData?.changelog && inheritanceInfo?.type === 'modified' && (
                                <div className="text-xs text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/20 p-2 rounded mb-2">
                                  <strong>Changes in this branch:</strong> {versionData.changelog}
                                </div>
                              )}
                              {(rule.implements || rule.uses) && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {rule.implements && (
                                    <span><strong>Implements:</strong> {rule.implements.join(', ')}</span>
                                  )}
                                  {rule.implements && rule.uses && ' • '}
                                  {rule.uses && (
                                    <span><strong>Uses:</strong> {rule.uses.join(', ')}</span>
                                  )}
                                </div>
                              )}
                              {renderAgentBadges(rule.id)}
                            </div>
                          );
                        };
                        
                        return (
                          <>
                            <SortDropdown 
                              value={sortOption} 
                              onChange={setSortOption}
                              direction={sortDirection}
                              onDirectionChange={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                            />
                            
                            {sortOption === 'modified-first' ? (
                              <>
                                {modified.length > 0 && (
                                  <>
                                    <SectionHeader title="Modified in This Branch" count={modified.length} />
                                    {modified.map((rule: any) => renderRuleCard(rule))}
                                  </>
                                )}
                                {inherited.length > 0 && (
                                  <>
                                    <SectionHeader title="Inherited Elements" count={inherited.length} />
                                    {inherited.map((rule: any) => renderRuleCard(rule))}
                                  </>
                                )}
                              </>
                            ) : (
                              sortedRules.map((rule: any) => renderRuleCard(rule))
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussions" className="mt-6">
                    <div className="space-y-4">
                      {(() => {
                        const branchDiscussions = getDiscussionsForBranch(selectedBranch.id);
                        if (branchDiscussions.length === 0) {
                          return (
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                              <MessageSquare className="h-12 w-12 text-gray-300 dark:text-gray-600 dark:text-gray-300 mx-auto mb-4" />
                              <p>No active discussions for this branch</p>
                            </div>
                          );
                        }
                        return branchDiscussions.map((discussion: any) => (
                          <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-lg">{discussion.title}</h4>
                                <Badge variant="outline" className={getStatusColor(discussion.status)}>
                                  {discussion.status}
                                </Badge>
                                <Badge variant="outline">
                                  {discussion.type}
                                </Badge>
                              </div>
                              {discussion.githubIssue && (
                                <a 
                                  href={`#${discussion.githubIssue}`}
                                  className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                            {discussion.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{discussion.description}</p>
                            )}
                            {discussion.proposal && (
                              <div className="bg-muted/30 p-3 rounded mb-3">
                                <strong className="text-sm">Proposed changes:</strong>
                                <p className="text-sm text-gray-700 mt-1">{discussion.proposal.changes.changelog || discussion.proposal.changes.definition}</p>
                                {discussion.proposal.impact && (
                                  <p className="text-xs text-orange-600 mt-2">
                                    <strong>Impact:</strong> {discussion.proposal.impact}
                                  </p>
                                )}
                              </div>
                            )}
                            {discussion.voting && (
                              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                                <div className="text-center">
                                  <div className="text-green-600 font-semibold">{discussion.voting.results.yes}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Yes</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-red-600 font-semibold">{discussion.voting.results.no}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">No</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-gray-600 dark:text-gray-300 font-semibold">{discussion.voting.results.abstain}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">Abstain</div>
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {discussion.stats.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                {discussion.stats.comments} comments
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {discussion.stats.participants} participants
                              </span>
                              {discussion.lastActivity && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {new Date(discussion.lastActivity).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-12">
                <GitBranch className="h-12 w-12 text-gray-300 dark:text-gray-600 dark:text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Select a Branch</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose a branch from the tree on the left to view its details, terms, principles, and discussions.
                </p>
              </CardContent>
            </Card>
          )}
        </ScrollArea>
      </div>

      {/* Agent Assignment Panel */}
      {showAgentPanel && selectedGovernanceItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="bg-white dark:bg-gray-900 border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Assign AI Agent</h3>
              <Button variant="ghost" size="sm" onClick={closeAgentPanel}>
                ✕
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <AgentAssignmentPanel
                  context="governance"
                  governanceItem={selectedGovernanceItem}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}