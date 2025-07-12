'use client';

import { useEffect, useState } from 'react';
import {
  HeroSection,
  NavigationCTA,
  GovernanceCard,
  YamlViewer,
  TermCard
} from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  GitBranch,
  Shield,
  FileText,
  Book,
  Home,
  RefreshCw,
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Code
} from 'lucide-react';
import {
  fetchGovernanceFiles,
  clearGovernanceCache,
  GovernanceFileData
} from '@/lib/services/github';

interface CategoryInfo {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
}

const categories: CategoryInfo[] = [
  {
    id: 'meta-rules',
    label: 'Meta-Rules',
    icon: Shield,
    color: 'text-red-600',
    description: 'Core governance rules that define how rules themselves can be changed'
  },
  {
    id: 'principles',
    label: 'Principles',
    icon: GitBranch,
    color: 'text-blue-600',
    description: 'Fundamental values and philosophical foundations'
  },
  {
    id: 'rules',
    label: 'Rules',
    icon: FileText,
    color: 'text-green-600',
    description: 'Operational rules and workflows for governance processes'
  },
  {
    id: 'terms',
    label: 'Terms',
    icon: Book,
    color: 'text-purple-600',
    description: 'Versioned definitions of key concepts used throughout the system'
  }
];

export default function GovernancePage() {
  const [files, setFiles] = useState<GovernanceFileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<GovernanceFileData | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'yaml'>('cards');
  const [activeTab, setActiveTab] = useState('meta-rules');

  useEffect(() => {
    // Clear cache on mount to ensure fresh data
    clearGovernanceCache();
    loadGovernanceFiles();
  }, []);

  const loadGovernanceFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGovernanceFiles();
      setFiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load governance files');
      console.error('Error loading governance files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    clearGovernanceCache();
    await loadGovernanceFiles();
  };

  const handleTermClick = (term: string) => {
    // Find the term in the files
    const termFile = files.find(file => {
      if (file.category !== 'terms') return false;
      const termKey = file.content._termKey;
      return termKey === term;
    });

    if (termFile) {
      setSelectedFile(termFile);
      setActiveTab('terms');
    }
  };

  const filteredFiles = files.filter(file => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const name = file.name.toLowerCase();
    const content = JSON.stringify(file.content).toLowerCase();
    
    return name.includes(searchLower) || content.includes(searchLower);
  });

  const getFilesByCategory = (category: string) => {
    return filteredFiles.filter(file => file.category === category);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <HeroSection
          badge="Governance System"
          title="DAHAO Governance"
          subtitle="Explore the core governance files that define how DAHAO operates, evolves, and maintains its principles"
          maxWidth="6xl"
        />

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search governance files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'cards' ? 'yaml' : 'cards')}
              >
                {viewMode === 'cards' ? (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    YAML View
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Card View
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Status */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Loaded {files.length} governance files from GitHub</span>
              {searchTerm && (
                <Badge variant="secondary" className="ml-2">
                  {filteredFiles.length} results
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">Loading governance files...</span>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map(category => {
                const Icon = category.icon;
                const count = getFilesByCategory(category.id).length;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${category.color}`} />
                    <span className="hidden sm:inline">{category.label}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      {category.label}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>

                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="space-y-4">
                    {viewMode === 'cards' ? (
                      getFilesByCategory(category.id).map(file => (
                        category.id === 'terms' ? (
                          <TermCard
                            key={file.path}
                            data={file}
                            onTermClick={handleTermClick}
                          />
                        ) : (
                          <GovernanceCard
                            key={file.path}
                            data={file}
                            onTermClick={handleTermClick}
                          />
                        )
                      ))
                    ) : (
                      <ScrollArea className="h-[600px]">
                        <div className="space-y-4 pr-4">
                          {getFilesByCategory(category.id).map(file => (
                            <YamlViewer
                              key={file.path}
                              title={file.name}
                              content={file.raw}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    )}

                    {getFilesByCategory(category.id).length === 0 && (
                      <Card>
                        <CardContent className="pt-6 text-center text-muted-foreground">
                          No {category.label.toLowerCase()} found
                          {searchTerm && ' matching your search'}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Selected Term Modal */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                >
                  ✕
                </Button>
              </div>
              <ScrollArea className="max-h-[60vh]">
                <GovernanceCard data={selectedFile} onTermClick={handleTermClick} />
              </ScrollArea>
            </div>
          </div>
        )}

        <div className="mt-12">
          <NavigationCTA
            buttons={[
              {
                text: "Back to Home",
                href: "/",
                variant: "outline",
                icon: Home,
                iconPosition: "left"
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}