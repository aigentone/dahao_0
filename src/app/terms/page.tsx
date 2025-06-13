'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, SearchIcon, GitBranchIcon, LayersIcon, ArrowRightIcon, ClockIcon, UsersIcon, NetworkIcon, Coins, TrendingUp, Vote } from 'lucide-react';
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
            Terms-as-Discussions: Democratic Evolution
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Terms evolve through community discussion and token holder voting. 
            Quality term development is rewarded with tokens from the investment pool.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">Democratic Evolution</Badge>
            <Badge variant="outline">Token Governance</Badge>
            <Badge variant="outline">Investment Pool Funded</Badge>
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

        {/* Democratic Term Evolution Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Democratic Term Evolution Process</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <GitBranchIcon className="h-8 w-8 mb-2 text-blue-500" />
                <CardTitle>Personal Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Develop term refinements in your personal branch workspace
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Private experimentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No approval needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Build on existing terms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UsersIcon className="h-8 w-8 mb-2 text-green-500" />
                <CardTitle>Public Pool Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Submit to community for discussion and refinement
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Community discussion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Collaborative improvement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Merit-based progression</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Coins className="h-8 w-8 mb-2 text-orange-500" />
                <CardTitle>Investment Pool Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Token holders fund serious term research and development
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Token holder voting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Resource allocation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Research funding</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Vote className="h-8 w-8 mb-2 text-purple-500" />
                <CardTitle>Token Holder Ratification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Final governance vote for official term adoption
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Final voting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Official adoption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Token rewards earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Token Economics for Terms */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-center text-emerald-800">Token Economics for Term Development</CardTitle>
              <CardDescription className="text-center">Quality term development creates value for the entire network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Contribution Rewards
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Quality term proposals → Token rewards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Valuable feedback → Contribution tokens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Accepted refinements → Adoption bonuses</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    Governance Participation
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Term voting → Governance rewards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Discussion participation → Activity tokens</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span>Cross-domain insights → Collaboration bonuses</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <NetworkIcon className="h-5 w-5" />
                    Network Value
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Better terms → Network intelligence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Clearer communication → Efficiency gains</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Shared vocabulary → Token value growth</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <h2 className="text-2xl font-semibold mb-4">Participate in Token-Governed Term Evolution</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Develop terms in your personal branch, contribute to community discussions, 
            and earn tokens through the democratic evolution process funded by investment pools.
          </p>
          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto mb-6">
            <div className="text-center">
              <GitBranchIcon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-semibold">Personal Development</h4>
              <p className="text-sm text-muted-foreground">Start in your workspace</p>
            </div>
            <div className="text-center">
              <Coins className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <h4 className="font-semibold">Token Rewards</h4>
              <p className="text-sm text-muted-foreground">Earn for quality contributions</p>
            </div>
            <div className="text-center">
              <Vote className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-semibold">Democratic Governance</h4>
              <p className="text-sm text-muted-foreground">Token holders decide adoption</p>
            </div>
          </div>
          <div className="space-x-4">
            <Button size="lg">
              Start Your Personal Branch
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Token Economics
            </Button>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}