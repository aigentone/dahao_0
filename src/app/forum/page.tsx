'use client';

import { useState, useEffect } from 'react';
import { StatsBar } from '@/components/forum/StatsBar';
import { OrganizationCards } from '@/components/forum/OrganizationCards';
import { OrganizationHeader } from '@/components/forum/OrganizationHeader';
import { FeaturedDiscussion } from '@/components/github-compatible/FeaturedDiscussion';
import { DiscussionList } from '@/components/github-compatible/DiscussionList';
import { DiscussionView } from '@/components/github-compatible/DiscussionView';
import { PrinciplesViewWithInheritance } from '@/components/forum/PrinciplesViewWithInheritance';
import { InheritanceTree } from '@/components/forum/InheritanceTree';
import { TermsView } from '@/components/forum/TermsView';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Filter, MessageSquare, Shield, Brain, BarChart3, Sparkles, ArrowLeft, FileText } from 'lucide-react';
import { GovernanceData, GovernanceOrganization } from '@/types/governance';
import { GitHubDiscussion } from '@/types/github-compatible';

export default function ForumPage() {
  const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<GitHubDiscussion | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [orgDiscussions, setOrgDiscussions] = useState<GitHubDiscussion[]>([]);
  useEffect(() => {
    fetchGovernanceData();
  }, []);
  const fetchGovernanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/governance');
      if (response.ok) {
        const data = await response.json();
        setGovernanceData(data);
        // Auto-select animal welfare by default to show the featured discussion
        if (data.organizations.length > 0) {
          handleSelectOrg('animal-welfare');
        }
      } else {
        console.error('Failed to fetch governance data');
      }
    } catch (error) {
      console.error('Error fetching governance data:', error);
    }
    setLoading(false);
  };

  const handleSelectOrg = async (orgId: string) => {
    setSelectedOrg(orgId);
    setSelectedDiscussion(null);
    setViewMode('list');

    // Fetch GitHub discussions for this organization via API
    try {
      const response = await fetch(`/api/discussions/${orgId}`);
      if (response.ok) {
        const discussions = await response.json();
        setOrgDiscussions(discussions.nodes);
      } else {
        console.error('Failed to fetch organization discussions');
        setOrgDiscussions([]);
      }
    } catch (error) {
      console.error('Failed to fetch organization discussions:', error);
      setOrgDiscussions([]);
    }
  };

  const handleDiscussionSelect = (discussion: GitHubDiscussion) => {
    setSelectedDiscussion(discussion);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedDiscussion(null);
    setViewMode('list');
  };

  const getCurrentOrganization = (): GovernanceOrganization | null => {
    if (!governanceData || !selectedOrg) return null;
    return governanceData.organizations.find(org => org.id === selectedOrg) || null;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading governance data...</p>
        </div>
      </div>
    );
  }

  if (!governanceData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load governance data</p>
        </div>
      </div>
    );
  }

  const currentOrg = getCurrentOrganization();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" />

        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Where Ideas Evolve Through Collective Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                DAHAO Ideas Hub
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore living governance systems that adapt and grow through human-AI collaboration.
              Each DAHAO is an idea brought to life by its community.
            </p>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ideas, principles, or discussions..."
                  className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button className="px-6 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <StatsBar governanceData={governanceData} />

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Organization Cards */}
          <OrganizationCards
            organizations={governanceData.organizations}
            selectedOrg={selectedOrg}
            onSelectOrg={handleSelectOrg}
          />

          {/* Right Content - Selected DAHAO Details */}
          <div className="lg:col-span-8">
            {currentOrg ? (
              <>
                {/* Selected DAHAO Header */}
                <OrganizationHeader organization={currentOrg} />

                {/* Tabs Navigation */}
                <Tabs defaultValue="discussions" className="space-y-6">
                  <TabsList className="grid grid-cols-5 w-full bg-gray-100/50 p-1 rounded-xl">
                    <TabsTrigger value="discussions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger value="principles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Principles
                    </TabsTrigger>
                    <TabsTrigger value="terms" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Terms
                    </TabsTrigger>
                    <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Agents
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                  </TabsList>

                  {/* Discussions Tab */}
                  <TabsContent value="discussions" className="space-y-4">
                    {viewMode === 'detail' && selectedDiscussion ? (
                      /* Detail View - Show full discussion */
                      <div className="space-y-4">
                        <button
                          onClick={handleBackToList}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back to discussions
                        </button>
                        <DiscussionView discussion={selectedDiscussion} />
                      </div>
                    ) : (
                      /* List View - Show featured + list */
                      <>
                        <FeaturedDiscussion
                          discussion={orgDiscussions.find(d =>
                            !d.closed && d.category.slug === 'governance-proposals'
                          ) || orgDiscussions[0] || null}
                          onDiscussionSelect={handleDiscussionSelect}
                        />

                        {/* Other Discussions */}
                        {orgDiscussions.length > 1 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Other Discussions</h3>
                            <DiscussionList
                              discussions={orgDiscussions.filter((d) =>
                                // Exclude the featured discussion
                                d !== (orgDiscussions.find(disc =>
                                  !disc.closed && disc.category.slug === 'governance-proposals'
                                ) || orgDiscussions[0])
                              )}
                              onDiscussionSelect={handleDiscussionSelect}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>

                  {/* Principles Tab */}
                  <TabsContent value="principles" className="space-y-4">
                    {/* Inheritance Tree */}
                    <InheritanceTree
                      organizations={governanceData.organizations}
                      currentDomain={currentOrg.id}
                      onNavigate={handleSelectOrg}
                    />

                    {/* Principles with inheritance info */}
                    <PrinciplesViewWithInheritance
                      principles={currentOrg.principles}
                      organizationName={currentOrg.name}
                      organizationId={currentOrg.id}
                    />
                  </TabsContent>

                  {/* Terms Tab */}
                  <TabsContent value="terms" className="space-y-4">
                    <TermsView organizationId={currentOrg.id} />
                  </TabsContent>

                  <TabsContent value="agents" className="space-y-4">
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                      <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Agents View</h3>
                      <p className="text-gray-600">AI agents management coming soon</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics View</h3>
                      <p className="text-gray-600">Detailed analytics coming soon</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              /* No organization selected state */
              <div className="text-center py-16">
                <div className="bg-white rounded-xl p-12 shadow-lg border border-blue-100">
                  <div className="text-8xl mb-6">🏛️</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Welcome to DAHAO Ideas Hub</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Select a DAHAO from the sidebar to explore its principles and discussions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button className="rounded-full w-14 h-14 shadow-lg">
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
