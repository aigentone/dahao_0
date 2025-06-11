'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, SearchIcon, GitBranchIcon, LayersIcon, ArrowRightIcon, ClockIcon, UsersIcon, NetworkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TermDictionary } from '@/types/governance';

export default function TermsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [terms, setTerms] = useState<Record<string, TermDictionary>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/terms')
      .then(res => res.json())
      .then(data => {
        setTerms(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading terms:', error);
        setLoading(false);
      });
  }, []);

  const renderTermCard = (termName: string, termVersions: any, namespace: string) => {
    const latestVersion = Object.keys(termVersions).sort().pop() || 'v1.0';
    const latestTerm = termVersions[latestVersion];
    
    return (
      <Card key={`${namespace}:${termName}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{termName}</CardTitle>
            <Badge variant="outline">{latestVersion}</Badge>
          </div>
          <CardDescription>{namespace}:{termName}@{latestVersion}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Current Definition</h4>
              <p className="text-sm text-muted-foreground">
                {latestTerm.definition}
              </p>
            </div>
            {Object.keys(termVersions).length > 1 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Version History
                </h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(termVersions).map(([version, versionData]: [string, any]) => (
                    <div key={version} className="flex items-center gap-2">
                      <Badge variant={version === latestVersion ? "default" : "secondary"} className="text-xs">
                        {version}
                      </Badge>
                      <span className={version === latestVersion ? "" : "text-muted-foreground"}>
                        {versionData.definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {latestTerm.extends && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <LayersIcon className="h-4 w-4" />
                  Extends
                </h4>
                <Badge variant="secondary">{latestTerm.extends}</Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            DAHAO Term Dictionary
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Versioned vocabulary ensuring everyone speaks the same ethical language.
            Terms evolve democratically while maintaining semantic clarity.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">Living Dictionary</Badge>
            <Badge variant="outline">Democratic Evolution</Badge>
            <Badge variant="outline">Cross-Domain Alignment</Badge>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-lg text-muted-foreground">Loading terms...</div>
          </div>
        ) : (
          <>
        {/* Search Section */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms... (e.g., harm, suffering, wellbeing)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg"
            />
          </div>
        </div>

        {/* Core Concepts */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">How Term Versioning Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <GitBranchIcon className="h-8 w-8 mb-2 text-blue-500" />
                <CardTitle>Version Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Each term has versions like software: v1.0, v1.1, v2.0
                </p>
                <div className="font-mono text-xs bg-muted p-2 rounded">
                  {`{core:harm@v1.0}`}<br/>
                  {`{core:harm@v1.1}`} ← expanded definition<br/>
                  {`{core:harm@v2.0}`} ← major revision
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <LayersIcon className="h-8 w-8 mb-2 text-green-500" />
                <CardTitle>Inheritance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Domain terms can extend core terms with specialization
                </p>
                <div className="font-mono text-xs bg-muted p-2 rounded">
                  core:harm → base definition<br/>
                  welfare:suffering extends harm<br/>
                  + conscious experience aspect
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UsersIcon className="h-8 w-8 mb-2 text-purple-500" />
                <CardTitle>Democratic Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Community proposes and votes on term evolution
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Proposal: Expand "harm" definition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Discussion: 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Vote: 73% approval → v1.1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Term Categories Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="core" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="core">Core Terms</TabsTrigger>
              <TabsTrigger value="animal">Animal Welfare</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="music">Music Industry</TabsTrigger>
            </TabsList>

            {/* Dynamic Terms */}
            <TabsContent value="core" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {terms['core-governance']?.terms && Object.entries(terms['core-governance'].terms).map(([termName, termVersions]) => 
                  renderTermCard(termName, termVersions, 'core')
                )}
              </div>
            </TabsContent>

            <TabsContent value="animal" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {terms['animal-welfare']?.terms && Object.entries(terms['animal-welfare'].terms).map(([termName, termVersions]) => 
                  renderTermCard(termName, termVersions, 'welfare')
                )}
              </div>
            </TabsContent>

            <TabsContent value="environment" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {terms['environment']?.terms && Object.entries(terms['environment'].terms).map(([termName, termVersions]) => 
                  renderTermCard(termName, termVersions, 'environment')
                )}
              </div>
            </TabsContent>

            <TabsContent value="music" className="space-y-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Music industry terms are currently being developed by the community.</p>
                <Button variant="outline" className="mt-4">
                  Propose a Term
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* How to Use Terms */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle>How to Use Terms in Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Referencing Terms</h4>
                  <div className="bg-white/70 p-4 rounded-lg font-mono text-sm">
                    <div className="text-green-600"># In your proposal:</div>
                    <div>This proposal aims to reduce {`{core:harm@v1.1}`}</div>
                    <div>for all {`{welfare:sentient@v1.0}`} beings by</div>
                    <div>improving their {`{core:wellbeing@v1.1}`}.</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Precise, shared understanding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Automatic compatibility checking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Clear evolution tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Cross-domain consistency</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Contribute to Our Living Dictionary</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Help refine our shared vocabulary. Propose new terms or suggest improvements
            to existing definitions through the democratic governance process.
          </p>
          <div className="space-x-4">
            <Button size="lg">
              Propose a Term
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Term Evolution Process
            </Button>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}