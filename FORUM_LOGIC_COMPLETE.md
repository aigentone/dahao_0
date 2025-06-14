# Table of Contents
- src/app/forum/page.tsx
- src/components/forum/FeaturedDiscussion.tsx
- src/components/forum/FullDiscussionView.tsx
- src/components/forum/InheritanceTree.tsx
- src/components/forum/OrganizationCards.tsx
- src/components/forum/OrganizationHeader.tsx
- src/components/forum/PersonalBranchCreator.tsx
- src/components/forum/PersonalTermDevelopment.tsx
- src/components/forum/PersonalWorkspace.tsx
- src/components/forum/PrinciplesView.tsx
- src/components/forum/PrinciplesViewWithInheritance.tsx
- src/components/forum/RecentDiscussions.tsx
- src/components/forum/StatsBar.tsx
- src/components/forum/TermDiscussionManager.tsx
- src/components/forum/TermRatificationVoting.tsx
- src/components/forum/TermsView.tsx
- src/components/governance/AgentAssignmentPanel.tsx
- src/components/governance/DiscussionViewer.tsx
- src/components/github-compatible/FeaturedDiscussion.tsx
- src/components/github-compatible/DiscussionList.tsx
- src/components/github-compatible/DiscussionView.tsx
- src/types/governance.ts
- src/types/github-compatible.ts
- src/types/agents.ts
- src/app/api/governance/route.ts
- src/app/api/discussions/[orgId]/route.ts
- src/app/api/forum/route.ts
- src/app/api/terms/route.ts
- src/app/api/terms-list/[domain]/route.ts
- src/app/api/terms/[domain]/[term]/route.ts
- src/app/forum/[domain]/discussions/[number]/page.tsx
- src/app/forum/[domain]/terms/[term]/page.tsx
- src/app/forum/discussion/[id]/page.tsx
- src/lib/discussion-parser.ts

## File: src/app/forum/page.tsx

- Extension: .tsx
- Language: typescript
- Size: 15689 bytes
- Created: 2025-06-13 18:53:20
- Modified: 2025-06-13 18:53:20

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import { useState, useEffect, useCallback } from 'react';
  4 | import { StatsBar } from '@/components/forum/StatsBar';
  5 | import { OrganizationCards } from '@/components/forum/OrganizationCards';
  6 | import { OrganizationHeader } from '@/components/forum/OrganizationHeader';
  7 | import { FeaturedDiscussion } from '@/components/github-compatible/FeaturedDiscussion';
  8 | import { DiscussionList } from '@/components/github-compatible/DiscussionList';
  9 | import { DiscussionView } from '@/components/github-compatible/DiscussionView';
 10 | import { PrinciplesViewWithInheritance } from '@/components/forum/PrinciplesViewWithInheritance';
 11 | import { InheritanceTree } from '@/components/forum/InheritanceTree';
 12 | import { TermsView } from '@/components/forum/TermsView';
 13 | import { TermDiscussionManager } from '@/components/forum/TermDiscussionManager';
 14 | import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';
 15 | import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
 16 | import { Button } from '@/components/ui/button';
 17 | import { Search, Filter, MessageSquare, Shield, Brain, BarChart3, Sparkles, ArrowLeft, FileText } from 'lucide-react';
 18 | import { GovernanceData, GovernanceOrganization } from '@/types/governance';
 19 | import { GitHubDiscussion } from '@/types/github-compatible';
 20 | 
 21 | export default function ForumPage() {
 22 |   const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
 23 |   const [loading, setLoading] = useState(true);
 24 |   const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
 25 |   const [selectedDiscussion, setSelectedDiscussion] = useState<GitHubDiscussion | null>(null);
 26 |   const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
 27 |   const [orgDiscussions, setOrgDiscussions] = useState<GitHubDiscussion[]>([]);
 28 |   const [activeTab, setActiveTab] = useState('discussions');
 29 | 
 30 |   const fetchOrgDiscussions = useCallback(async (orgId: string) => {
 31 |     try {
 32 |       const response = await fetch(`/api/discussions/${orgId}`);
 33 |       if (response.ok) {
 34 |         const discussions = await response.json();
 35 |         setOrgDiscussions(discussions.nodes);
 36 |       } else {
 37 |         console.error('Failed to fetch organization discussions');
 38 |         setOrgDiscussions([]);
 39 |       }
 40 |     } catch (error) {
 41 |       console.error('Failed to fetch organization discussions:', error);
 42 |       setOrgDiscussions([]);
 43 |     }
 44 |   }, []);
 45 | 
 46 |   const fetchGovernanceData = useCallback(async () => {
 47 |     setLoading(true);
 48 |     try {
 49 |       const response = await fetch('/api/governance');
 50 |       if (response.ok) {
 51 |         const data = await response.json();
 52 |         setGovernanceData(data);
 53 |         // Auto-select animal welfare by default to show the featured discussion
 54 |         if (data.organizations.length > 0) {
 55 |           setSelectedOrg('animal-welfare');
 56 |         }
 57 |       } else {
 58 |         console.error('Failed to fetch governance data');
 59 |       }
 60 |     } catch (error) {
 61 |       console.error('Error fetching governance data:', error);
 62 |     }
 63 |     setLoading(false);
 64 |   }, []);
 65 | 
 66 |   useEffect(() => {
 67 |     fetchGovernanceData();
 68 |   }, [fetchGovernanceData]);
 69 | 
 70 |   useEffect(() => {
 71 |     if (selectedOrg && governanceData) {
 72 |       // Fetch discussions when org is selected
 73 |       fetchOrgDiscussions(selectedOrg);
 74 |     }
 75 |   }, [selectedOrg, governanceData, fetchOrgDiscussions]);
 76 | 
 77 |   const handleSelectOrg = (orgId: string) => {
 78 |     setSelectedOrg(orgId);
 79 |     setSelectedDiscussion(null);
 80 |     setViewMode('list');
 81 |   };
 82 | 
 83 |   const handleDiscussionSelect = (discussion: GitHubDiscussion) => {
 84 |     setSelectedDiscussion(discussion);
 85 |     setViewMode('detail');
 86 |   };
 87 | 
 88 |   const handleBackToList = () => {
 89 |     setSelectedDiscussion(null);
 90 |     setViewMode('list');
 91 |   };
 92 | 
 93 |   const handleNavigateToDiscussions = (termName: string) => {
 94 |     // Switch to discussions tab
 95 |     setActiveTab('discussions');
 96 |     
 97 |     // Reset discussion view to list mode
 98 |     setSelectedDiscussion(null);
 99 |     setViewMode('list');
100 |     
101 |     // Try to find existing discussion about this term
102 |     const termDiscussion = orgDiscussions.find(discussion => 
103 |       discussion.title.toLowerCase().includes(termName.toLowerCase()) ||
104 |       discussion.body?.toLowerCase().includes(termName.toLowerCase())
105 |     );
106 |     
107 |     if (termDiscussion) {
108 |       // If discussion exists, navigate to it
109 |       setTimeout(() => {
110 |         setSelectedDiscussion(termDiscussion);
111 |         setViewMode('detail');
112 |       }, 100); // Small delay to ensure tab switch happens first
113 |     }
114 |     
115 |     // TODO: If no discussion exists, could create one or show message
116 |     // For now, just navigate to discussions tab where user can see all discussions
117 |   };
118 | 
119 |   const getCurrentOrganization = (): GovernanceOrganization | null => {
120 |     if (!governanceData || !selectedOrg) return null;
121 |     return governanceData.organizations.find(org => org.id === selectedOrg) || null;
122 |   };
123 | 
124 |   if (loading) {
125 |     return (
126 |       <div className="container mx-auto px-4 py-8">
127 |         <div className="text-center py-8">
128 |           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
129 |           <p className="mt-2 text-gray-600">Loading governance data...</p>
130 |         </div>
131 |       </div>
132 |     );
133 |   }
134 | 
135 |   if (!governanceData) {
136 |     return (
137 |       <div className="container mx-auto px-4 py-8">
138 |         <div className="text-center py-8">
139 |           <p className="text-red-600">Failed to load governance data</p>
140 |         </div>
141 |       </div>
142 |     );
143 |   }
144 | 
145 |   const currentOrg = getCurrentOrganization();
146 | 
147 |   return (
148 |     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
149 |       {/* Hero Section */}
150 |       <div className="relative overflow-hidden">
151 |         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
152 |         <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full opacity-20 blur-3xl" />
153 |         <div className="absolute bottom-0 left-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 blur-3xl" />
154 | 
155 |         <div className="relative container mx-auto px-6 py-12">
156 |           <div className="text-center">
157 |             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200/50 mb-6">
158 |               <Sparkles className="w-4 h-4 text-yellow-500" />
159 |               <span className="text-sm font-medium text-gray-700">Where Ideas Evolve Through Collective Intelligence</span>
160 |             </div>
161 | 
162 |             <h1 className="text-5xl md:text-6xl font-bold mb-4">
163 |               <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
164 |                 DAHAO Ideas Hub
165 |               </span>
166 |             </h1>
167 | 
168 |             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
169 |               Explore living governance systems that adapt and grow through human-AI collaboration.
170 |               Each DAHAO is an idea brought to life by its community.
171 |             </p>
172 | 
173 |             {/* Search and Filter Bar */}
174 |             <div className="max-w-2xl mx-auto flex gap-3">
175 |               <div className="flex-1 relative">
176 |                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
177 |                 <input
178 |                   type="text"
179 |                   placeholder="Search ideas, principles, or discussions..."
180 |                   className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
181 |                 />
182 |               </div>
183 |               <Button className="px-6 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-gray-50">
184 |                 <Filter className="w-4 h-4 mr-2" />
185 |                 Filters
186 |               </Button>
187 |             </div>
188 |           </div>
189 |         </div>
190 |       </div>
191 | 
192 |       {/* Stats Bar */}
193 |       <StatsBar governanceData={governanceData} />
194 | 
195 |       {/* Main Content */}
196 |       <div className="container mx-auto px-6 pb-20">
197 |         <div className="grid lg:grid-cols-12 gap-8">
198 |           {/* Left Sidebar - Organization Cards */}
199 |           <OrganizationCards
200 |             organizations={governanceData.organizations}
201 |             selectedOrg={selectedOrg}
202 |             onSelectOrg={handleSelectOrg}
203 |           />
204 | 
205 |           {/* Right Content - Selected DAHAO Details */}
206 |           <div className="lg:col-span-8">
207 |             {currentOrg ? (
208 |               <>
209 |                 {/* Selected DAHAO Header */}
210 |                 <OrganizationHeader organization={currentOrg} />
211 | 
212 |                 {/* Tabs Navigation */}
213 |                 <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
214 |                   <TabsList className="grid grid-cols-6 w-full bg-gray-100/50 p-1 rounded-xl">
215 |                     <TabsTrigger value="discussions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
216 |                       <MessageSquare className="w-4 h-4 mr-2" />
217 |                       Discussions
218 |                     </TabsTrigger>
219 |                     <TabsTrigger value="principles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
220 |                       <Shield className="w-4 h-4 mr-2" />
221 |                       Principles
222 |                     </TabsTrigger>
223 |                     <TabsTrigger value="terms" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
224 |                       <FileText className="w-4 h-4 mr-2" />
225 |                       Terms
226 |                     </TabsTrigger>
227 |                     <TabsTrigger value="term-evolution" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
228 |                       <FileText className="w-4 h-4 mr-2" />
229 |                       Term Evolution
230 |                     </TabsTrigger>
231 |                     <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
232 |                       <Brain className="w-4 h-4 mr-2" />
233 |                       AI Agents
234 |                     </TabsTrigger>
235 |                     <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
236 |                       <BarChart3 className="w-4 h-4 mr-2" />
237 |                       Analytics
238 |                     </TabsTrigger>
239 |                   </TabsList>
240 | 
241 |                   {/* Discussions Tab */}
242 |                   <TabsContent value="discussions" className="space-y-4">
243 |                     {viewMode === 'detail' && selectedDiscussion ? (
244 |                       /* Detail View - Show full discussion */
245 |                       <div className="space-y-4">
246 |                         <button
247 |                           onClick={handleBackToList}
248 |                           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
249 |                         >
250 |                           <ArrowLeft className="w-4 h-4" />
251 |                           Back to discussions
252 |                         </button>
253 |                         <DiscussionView discussion={selectedDiscussion} />
254 |                       </div>
255 |                     ) : (
256 |                       /* List View - Show featured + list */
257 |                       <>
258 |                         <FeaturedDiscussion
259 |                           discussion={orgDiscussions.find(d =>
260 |                             !d.closed && d.category.slug === 'governance-proposals'
261 |                           ) || orgDiscussions[0] || null}
262 |                           onDiscussionSelect={handleDiscussionSelect}
263 |                         />
264 | 
265 |                         {/* Other Discussions */}
266 |                         {orgDiscussions.length > 1 && (
267 |                           <div className="space-y-4">
268 |                             <h3 className="text-lg font-semibold text-gray-900">Other Discussions</h3>
269 |                             <DiscussionList
270 |                               discussions={orgDiscussions.filter((d) =>
271 |                                 // Exclude the featured discussion
272 |                                 d !== (orgDiscussions.find(disc =>
273 |                                   !disc.closed && disc.category.slug === 'governance-proposals'
274 |                                 ) || orgDiscussions[0])
275 |                               )}
276 |                               onDiscussionSelect={handleDiscussionSelect}
277 |                             />
278 |                           </div>
279 |                         )}
280 |                       </>
281 |                     )}
282 |                   </TabsContent>
283 | 
284 |                   {/* Principles Tab */}
285 |                   <TabsContent value="principles" className="space-y-4">
286 |                     {/* Inheritance Tree */}
287 |                     <InheritanceTree
288 |                       organizations={governanceData.organizations}
289 |                       currentDomain={currentOrg.id}
290 |                       onNavigate={handleSelectOrg}
291 |                     />
292 | 
293 |                     {/* Principles with inheritance info */}
294 |                     <PrinciplesViewWithInheritance
295 |                       principles={currentOrg.principles}
296 |                       organizationName={currentOrg.name}
297 |                       organizationId={currentOrg.id}
298 |                     />
299 |                   </TabsContent>
300 | 
301 |                   {/* Terms Tab */}
302 |                   <TabsContent value="terms" className="space-y-4">
303 |                     <TermsView organizationId={currentOrg.id} />
304 |                   </TabsContent>
305 | 
306 |                   {/* Term Evolution Tab - NEW ADVANCED FEATURE */}
307 |                   <TabsContent value="term-evolution" className="space-y-4">
308 |                     <TermDiscussionManager 
309 |                       organizationId={currentOrg.id}
310 |                       currentUser={{
311 |                         id: 'current-user',
312 |                         name: 'Current User',
313 |                         tokenBalance: 1250
314 |                       }}
315 |                       onNavigateToDiscussions={handleNavigateToDiscussions}
316 |                     />
317 |                   </TabsContent>
318 | 
319 |                   {/* AI Agents Tab - ENHANCED WITH NEW FEATURES */}
320 |                   <TabsContent value="agents" className="space-y-4">
321 |                     <AgentAssignmentPanel />
322 |                   </TabsContent>
323 | 
324 |                   <TabsContent value="analytics" className="space-y-4">
325 |                     <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
326 |                       <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
327 |                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics View</h3>
328 |                       <p className="text-gray-600">Detailed analytics coming soon</p>
329 |                     </div>
330 |                   </TabsContent>
331 |                 </Tabs>
332 |               </>
333 |             ) : (
334 |               /* No organization selected state */
335 |               <div className="text-center py-16">
336 |                 <div className="bg-white rounded-xl p-12 shadow-lg border border-blue-100">
337 |                   <div className="text-8xl mb-6">🏛️</div>
338 |                   <h3 className="text-2xl font-bold mb-4 text-gray-900">Welcome to DAHAO Ideas Hub</h3>
339 |                   <p className="text-lg text-gray-600 leading-relaxed">
340 |                     Select a DAHAO from the sidebar to explore its principles and discussions
341 |                   </p>
342 |                 </div>
343 |               </div>
344 |             )}
345 |           </div>
346 |         </div>
347 |       </div>
348 | 
349 |       {/* Floating Action Button for Mobile */}
350 |       <div className="fixed bottom-6 right-6 lg:hidden">
351 |         <Button className="rounded-full w-14 h-14 shadow-lg">
352 |           <Sparkles className="w-6 h-6" />
353 |         </Button>
354 |       </div>
355 |     </div>
356 |   );
357 | }
```

## File: src/components/forum/FeaturedDiscussion.tsx

- Extension: .tsx
- Language: typescript
- Size: 5730 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { useRouter } from 'next/navigation';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Button } from '@/components/ui/button';
  7 | import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  8 | import { Progress } from '@/components/ui/progress';
  9 | import { 
 10 |   Zap, 
 11 |   Clock, 
 12 |   Users, 
 13 |   MessageSquare, 
 14 |   Brain, 
 15 |   ChevronRight, 
 16 |   ThumbsUp 
 17 | } from 'lucide-react';
 18 | import { GovernanceDiscussion } from '@/types/governance';
 19 | import { DiscussionParser } from '@/lib/discussion-parser';
 20 | import { FullDiscussionView } from './FullDiscussionView';
 21 | 
 22 | interface FeaturedDiscussionProps {
 23 |   discussion?: GovernanceDiscussion;
 24 |   onDiscussionSelect?: (discussion: GovernanceDiscussion) => void;
 25 |   onBack?: () => void;
 26 |   isSelected?: boolean;
 27 | }
 28 | 
 29 | export function FeaturedDiscussion({ discussion, onDiscussionSelect, onBack, isSelected }: FeaturedDiscussionProps) {
 30 |   const router = useRouter();
 31 |   
 32 |   // If discussion is selected, show full view
 33 |   if (isSelected && discussion && onBack) {
 34 |     return <FullDiscussionView discussion={discussion} onBack={onBack} />;
 35 |   }
 36 |   
 37 |   // Default featured discussion data if none provided
 38 |   const defaultData = {
 39 |     title: "Turkey Municipal Veterinary System for Street Animals",
 40 |     description: "Proposal to establish a transparent, blockchain-verified system for Turkish municipal veterinary services to manage street animal care, track treatments, and enable direct donations.",
 41 |     author: "municipal_integration_working_group",
 42 |     participants: 7,
 43 |     comments: 7,
 44 |     aiAnalyses: 2,
 45 |     humanApproval: 75,
 46 |     aiApproval: 92,
 47 |     timeLeft: "2 days left",
 48 |     status: "Active Discussion"
 49 |   };
 50 | 
 51 |   // Parse real discussion data if provided
 52 |   let discussionData = defaultData;
 53 |   if (discussion) {
 54 |     const parsed = DiscussionParser.parseDiscussion(discussion, 0);
 55 |     const votingData = DiscussionParser.parseVotingData(discussion);
 56 |     
 57 |     discussionData = {
 58 |       title: parsed.title,
 59 |       description: parsed.description,
 60 |       author: parsed.author.replace('@', ''),
 61 |       participants: parsed.participants,
 62 |       comments: parsed.comments,
 63 |       aiAnalyses: parsed.aiAnalyses,
 64 |       humanApproval: votingData?.humanApproval || 75,
 65 |       aiApproval: votingData?.aiApproval || 92,
 66 |       timeLeft: parsed.timeAgo,
 67 |       status: parsed.status
 68 |     };
 69 |   }
 70 | 
 71 |   return (
 72 |     <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
 73 |       <div className="flex items-start justify-between mb-4">
 74 |         <div className="flex items-center gap-3">
 75 |           <Badge className="bg-orange-500 text-white">
 76 |             <Zap className="w-3 h-3 mr-1" />
 77 |             Hot Topic
 78 |           </Badge>
 79 |           <Badge className="bg-green-100 text-green-700 border-0">{discussionData.status}</Badge>
 80 |         </div>
 81 |         <span className="text-sm text-gray-500 flex items-center gap-1">
 82 |           <Clock className="w-3 h-3" />
 83 |           {discussionData.timeLeft}
 84 |         </span>
 85 |       </div>
 86 | 
 87 |       <h3 className="text-xl font-semibold text-gray-900 mb-3">
 88 |         {discussionData.title}
 89 |       </h3>
 90 | 
 91 |       <p className="text-gray-600 mb-4">
 92 |         {discussionData.description}
 93 |       </p>
 94 | 
 95 |       <div className="flex items-center gap-6 mb-4">
 96 |         <div className="flex items-center gap-2">
 97 |           <Avatar className="w-8 h-8">
 98 |             <AvatarFallback>
 99 |               {discussionData.author.slice(0, 2).toUpperCase()}
100 |             </AvatarFallback>
101 |           </Avatar>
102 |           <div>
103 |             <p className="text-sm font-medium">@{discussionData.author}</p>
104 |             <p className="text-xs text-gray-500">Proposal Author</p>
105 |           </div>
106 |         </div>
107 |         <div className="flex items-center gap-4 text-sm text-gray-600">
108 |           <span className="flex items-center gap-1">
109 |             <Users className="w-4 h-4" />
110 |             {discussionData.participants} participants
111 |           </span>
112 |           <span className="flex items-center gap-1">
113 |             <MessageSquare className="w-4 h-4" />
114 |             {discussionData.comments} comments
115 |           </span>
116 |           <span className="flex items-center gap-1">
117 |             <Brain className="w-4 h-4" />
118 |             {discussionData.aiAnalyses} AI analyses
119 |           </span>
120 |         </div>
121 |       </div>
122 | 
123 |       {/* Voting Progress */}
124 |       <div className="space-y-3">
125 |         <div className="flex items-center justify-between text-sm">
126 |           <span className="font-medium">Human Votes</span>
127 |           <span className="text-green-600 font-medium">{discussionData.humanApproval}% Approval</span>
128 |         </div>
129 |         <Progress value={discussionData.humanApproval} className="h-3" />
130 | 
131 |         <div className="flex items-center justify-between text-sm">
132 |           <span className="font-medium">AI Agent Consensus</span>
133 |           <span className="text-blue-600 font-medium">{discussionData.aiApproval}% Approval</span>
134 |         </div>
135 |         <Progress value={discussionData.aiApproval} className="h-3" />
136 |       </div>
137 | 
138 |       <div className="flex gap-3 mt-6">
139 |         <Button 
140 |           className="flex-1"
141 |           onClick={() => {
142 |             if (discussion && onDiscussionSelect) {
143 |               onDiscussionSelect(discussion);
144 |             } else if (isSelected && onBack) {
145 |               onBack();
146 |             } else {
147 |               alert('This is a sample featured discussion. Full discussion system coming soon!');
148 |             }
149 |           }}
150 |         >
151 |           {isSelected ? 'Back to Discussions' : 'View Full Discussion'}
152 |           <ChevronRight className="w-4 h-4 ml-2" />
153 |         </Button>
154 |         <Button variant="outline">
155 |           <ThumbsUp className="w-4 h-4 mr-2" />
156 |           Vote
157 |         </Button>
158 |       </div>
159 |     </div>
160 |   );
161 | }
```

## File: src/components/forum/FullDiscussionView.tsx

- Extension: .tsx
- Language: typescript
- Size: 11116 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { Badge } from '@/components/ui/badge';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  7 | import { Progress } from '@/components/ui/progress';
  8 | import { 
  9 |   ArrowLeft,
 10 |   Users, 
 11 |   MessageSquare, 
 12 |   Brain, 
 13 |   TrendingUp,
 14 |   Vote,
 15 |   Clock,
 16 |   ThumbsUp,
 17 |   ThumbsDown,
 18 |   Shield,
 19 |   Zap,
 20 |   Share,
 21 |   Bell,
 22 |   BarChart3
 23 | } from 'lucide-react';
 24 | import { GovernanceDiscussion } from '@/types/governance';
 25 | import { DiscussionParser } from '@/lib/discussion-parser';
 26 | import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';
 27 | 
 28 | interface FullDiscussionViewProps {
 29 |   discussion: GovernanceDiscussion;
 30 |   onBack: () => void;
 31 | }
 32 | 
 33 | export function FullDiscussionView({ discussion, onBack }: FullDiscussionViewProps) {
 34 |   // Parse discussion data
 35 |   const parsedDiscussion = DiscussionParser.parseDiscussion(discussion, 0);
 36 |   const votingData = DiscussionParser.parseVotingData(discussion);
 37 |   const metrics = DiscussionParser.parseDiscussionMetrics(discussion);
 38 | 
 39 |   // Parse comments from content
 40 |   const parseComments = (content: string) => {
 41 |     const lines = content.split('\n');
 42 |     const comments = [];
 43 |     let currentComment = null;
 44 |     
 45 |     for (const line of lines) {
 46 |       const commentMatch = line.match(/\*\*@([a-zA-Z0-9_-]+)(?:\s*\(([^)]+)\))?\*\*/);
 47 |       if (commentMatch) {
 48 |         if (currentComment) {
 49 |           comments.push(currentComment);
 50 |         }
 51 |         currentComment = {
 52 |           author: commentMatch[1],
 53 |           type: commentMatch[2] || 'Human',
 54 |           content: '',
 55 |           timestamp: ''
 56 |         };
 57 |       } else if (line.match(/^\*\d+\s*(days?|hours?|minutes?)\s*ago\*/)) {
 58 |         if (currentComment) {
 59 |           currentComment.timestamp = line.replace(/^\*/, '').replace(/\*$/, '');
 60 |         }
 61 |       } else if (currentComment && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
 62 |         currentComment.content += line + '\n';
 63 |       }
 64 |     }
 65 |     
 66 |     if (currentComment) {
 67 |       comments.push(currentComment);
 68 |     }
 69 |     
 70 |     return comments;
 71 |   };
 72 | 
 73 |   const comments = parseComments(discussion.content);
 74 | 
 75 |   return (
 76 |     <div className="space-y-6">
 77 |       {/* Back Button and Header */}
 78 |       <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
 79 |         <div className="flex items-center gap-3 mb-4">
 80 |           <Button variant="outline" size="sm" onClick={onBack}>
 81 |             <ArrowLeft className="w-4 h-4 mr-2" />
 82 |             Back to Discussions
 83 |           </Button>
 84 |           <div className="flex items-center gap-2">
 85 |             <Badge className="bg-orange-500 text-white flex items-center gap-1">
 86 |               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
 87 |               {discussion.status}
 88 |             </Badge>
 89 |             <Badge variant="outline" className="bg-blue-100 text-blue-700">
 90 |               {parsedDiscussion.category}
 91 |             </Badge>
 92 |             <Badge className="bg-red-100 text-red-700">
 93 |               🔥 Hot Topic
 94 |             </Badge>
 95 |           </div>
 96 |         </div>
 97 |         
 98 |         <h1 className="text-2xl font-bold text-gray-900 mb-3">{discussion.title}</h1>
 99 |         <p className="text-gray-600 mb-4">{discussion.summary}</p>
100 |         
101 |         <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
102 |           <div className="flex items-center gap-2">
103 |             <Avatar className="w-8 h-8">
104 |               <AvatarFallback>
105 |                 {discussion.author.slice(0, 2).toUpperCase()}
106 |               </AvatarFallback>
107 |             </Avatar>
108 |             <div>
109 |               <div className="font-semibold">@{discussion.author}</div>
110 |               <div className="text-xs">Proposal Author</div>
111 |             </div>
112 |           </div>
113 |           <div className="flex items-center gap-4">
114 |             <span className="flex items-center gap-1">
115 |               <Users className="w-4 h-4" />
116 |               {metrics.participants} participants
117 |             </span>
118 |             <span className="flex items-center gap-1">
119 |               <MessageSquare className="w-4 h-4" />
120 |               {metrics.comments} comments
121 |             </span>
122 |             <span className="flex items-center gap-1">
123 |               <Brain className="w-4 h-4" />
124 |               {metrics.aiAnalyses} AI analyses
125 |             </span>
126 |           </div>
127 |         </div>
128 | 
129 |         {/* Voting Progress */}
130 |         {votingData && (
131 |           <div className="bg-white/50 rounded-xl p-4">
132 |             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
133 |               <Vote className="w-5 h-5" />
134 |               Voting Progress
135 |             </h3>
136 |             
137 |             <div className="space-y-3 mb-4">
138 |               <div>
139 |                 <div className="flex justify-between text-sm mb-2">
140 |                   <span><strong>Human Votes</strong></span>
141 |                   <span className="text-green-600 font-semibold">{votingData.humanApproval}% Approval</span>
142 |                 </div>
143 |                 <Progress value={votingData.humanApproval} className="h-3" />
144 |               </div>
145 |               
146 |               <div>
147 |                 <div className="flex justify-between text-sm mb-2">
148 |                   <span><strong>AI Agent Consensus</strong></span>
149 |                   <span className="text-blue-600 font-semibold">{votingData.aiApproval}% Approval</span>
150 |                 </div>
151 |                 <Progress value={votingData.aiApproval} className="h-3" />
152 |               </div>
153 |             </div>
154 |             
155 |             <div className="flex gap-3">
156 |               <Button size="sm" className="flex-1">
157 |                 <ThumbsUp className="w-4 h-4 mr-2" />
158 |                 Vote Approve
159 |               </Button>
160 |               <Button size="sm" variant="outline" className="flex-1">
161 |                 <ThumbsDown className="w-4 h-4 mr-2" />
162 |                 Vote Reject
163 |               </Button>
164 |             </div>
165 |           </div>
166 |         )}
167 |       </div>
168 | 
169 |       {/* Main Content Grid with Sidebar */}
170 |       <div className="grid lg:grid-cols-3 gap-6">
171 |         {/* Discussion Thread - Left Column */}
172 |         <div className="lg:col-span-2">
173 |           <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
174 |             <div className="bg-gradient-to-b from-gray-50 to-white p-4 border-b border-gray-100">
175 |               <h2 className="text-lg font-semibold flex items-center gap-2">
176 |                 💬 Discussion Thread
177 |               </h2>
178 |             </div>
179 |             
180 |             <div className="p-4">
181 |               <div className="space-y-4">
182 |                 {comments.map((comment, index) => (
183 |                   <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
184 |                     <div className="flex items-start gap-3">
185 |                       <Avatar className="w-8 h-8">
186 |                         <AvatarFallback className={comment.type === 'AI Agent' ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-br from-blue-500 to-green-500 text-white'}>
187 |                           {comment.author.slice(0, 2).toUpperCase()}
188 |                         </AvatarFallback>
189 |                       </Avatar>
190 |                       <div className="flex-1">
191 |                         <div className="flex items-center gap-2 mb-2">
192 |                           <span className="font-semibold text-sm">@{comment.author}</span>
193 |                           <Badge 
194 |                             variant="outline" 
195 |                             className={comment.type === 'AI Agent' ? 'bg-purple-100 text-purple-700 text-xs' : 'bg-green-100 text-green-700 text-xs'}
196 |                           >
197 |                             {comment.type}
198 |                           </Badge>
199 |                           <span className="text-xs text-gray-500">{comment.timestamp}</span>
200 |                         </div>
201 |                         <div className="text-sm text-gray-700">
202 |                           <p className="whitespace-pre-wrap">{comment.content.trim()}</p>
203 |                           {comment.type === 'AI Agent' && comment.content.includes('analysis') && (
204 |                             <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
205 |                               <div className="text-xs text-blue-800">
206 |                                 {comment.content.includes('✅') && <div>✅ Analysis indicates approval</div>}
207 |                                 {comment.content.includes('💡') && <div>💡 Technical recommendations provided</div>}
208 |                                 {comment.content.includes('🔧') && <div>🔧 Implementation details analyzed</div>}
209 |                               </div>
210 |                             </div>
211 |                           )}
212 |                         </div>
213 |                       </div>
214 |                     </div>
215 |                   </div>
216 |                 ))}
217 |               </div>
218 |             </div>
219 |           </div>
220 |         </div>
221 | 
222 |         {/* Sidebar - Right Column */}
223 |         <div className="space-y-6">
224 |           {/* AI Agent Assignment - Use existing sophisticated component */}
225 |           <AgentAssignmentPanel />
226 | 
227 |           {/* Related Principles */}
228 |           <div className="bg-white rounded-2xl border border-gray-100 p-6">
229 |             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
230 |               <Shield className="w-5 h-5" />
231 |               Related Principles
232 |             </h3>
233 |             
234 |             <div className="space-y-3">
235 |               {[
236 |                 { name: 'Five Freedoms v1.0', desc: 'Core animal welfare framework' },
237 |                 { name: 'Emergency Care Protocol v1.0', desc: 'Rapid response framework' },
238 |                 { name: 'Transparency v1.1', desc: 'Open and auditable processes' }
239 |               ].map((principle, index) => (
240 |                 <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
241 |                   <div className="font-medium text-sm mb-1">{principle.name}</div>
242 |                   <div className="text-xs text-gray-600">{principle.desc}</div>
243 |                 </div>
244 |               ))}
245 |             </div>
246 |           </div>
247 | 
248 |           {/* Quick Actions */}
249 |           <div className="bg-white rounded-2xl border border-gray-100 p-6">
250 |             <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
251 |               <Zap className="w-5 h-5" />
252 |               Quick Actions
253 |             </h3>
254 |             
255 |             <div className="space-y-3">
256 |               <Button variant="outline" className="w-full justify-start">
257 |                 <Share className="w-4 h-4 mr-2" />
258 |                 Share Discussion
259 |               </Button>
260 |               <Button variant="outline" className="w-full justify-start">
261 |                 <Bell className="w-4 h-4 mr-2" />
262 |                 Follow Updates
263 |               </Button>
264 |               <Button variant="outline" className="w-full justify-start">
265 |                 <BarChart3 className="w-4 h-4 mr-2" />
266 |                 View Analytics
267 |               </Button>
268 |             </div>
269 |           </div>
270 |         </div>
271 |       </div>
272 |     </div>
273 |   );
274 | }
```

## File: src/components/forum/InheritanceTree.tsx

- Extension: .tsx
- Language: typescript
- Size: 10622 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { Card } from '@/components/ui/card';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Button } from '@/components/ui/button';
  7 | import { GitBranch, ArrowRight, Shield, Zap, AlertCircle } from 'lucide-react';
  8 | import { InheritanceConfig, GovernanceOrganization } from '@/types/governance';
  9 | 
 10 | interface InheritanceTreeProps {
 11 |   organizations: GovernanceOrganization[];
 12 |   currentDomain: string;
 13 |   onNavigate: (domain: string) => void;
 14 | }
 15 | 
 16 | export function InheritanceTree({ organizations, currentDomain, onNavigate }: InheritanceTreeProps) {
 17 |   // Build inheritance hierarchy
 18 |   const buildInheritanceTree = () => {
 19 |     const orgMap = new Map(organizations.map(org => [org.id, org]));
 20 |     const tree: { core: GovernanceOrganization; domains: GovernanceOrganization[] } = {
 21 |       core: orgMap.get('core-governance')!,
 22 |       domains: []
 23 |     };
 24 | 
 25 |     organizations.forEach(org => {
 26 |       if (org.id !== 'core-governance' && org.inheritance.extends?.includes('core-governance')) {
 27 |         tree.domains.push(org);
 28 |       }
 29 |     });
 30 | 
 31 |     return tree;
 32 |   };
 33 | 
 34 |   const tree = buildInheritanceTree();
 35 |   
 36 |   if (!tree.core) {
 37 |     return (
 38 |       <Card className="p-6">
 39 |         <div className="text-center text-gray-500">
 40 |           <AlertCircle className="w-8 h-8 mx-auto mb-2" />
 41 |           <p>No inheritance tree available</p>
 42 |         </div>
 43 |       </Card>
 44 |     );
 45 |   }
 46 | 
 47 |   const getVersionBadgeColor = (version: string) => {
 48 |     const [major, minor] = version.split('.').map(Number);
 49 |     if (major >= 1 && minor >= 1) return 'bg-green-100 text-green-700 border-green-200';
 50 |     if (major >= 1) return 'bg-blue-100 text-blue-700 border-blue-200';
 51 |     return 'bg-yellow-100 text-yellow-700 border-yellow-200';
 52 |   };
 53 | 
 54 |   const getInheritanceInfo = (org: GovernanceOrganization) => {
 55 |     const coreVersion = tree.core.version;
 56 |     const extendsVersion = org.inheritance.extends?.split('@')[1] || 'unknown';
 57 |     const isCompatible = extendsVersion === coreVersion;
 58 |     
 59 |     return { extendsVersion, isCompatible };
 60 |   };
 61 | 
 62 |   return (
 63 |     <Card className="p-6">
 64 |       <div className="flex items-center gap-3 mb-6">
 65 |         <GitBranch className="w-5 h-5 text-blue-600" />
 66 |         <h3 className="text-lg font-semibold text-gray-900">Inheritance Tree</h3>
 67 |         <Badge variant="outline" className="text-xs">
 68 |           DAHAO Governance Structure
 69 |         </Badge>
 70 |       </div>
 71 | 
 72 |       <div className="space-y-6">
 73 |         {/* Core Governance */}
 74 |         <div className="flex items-center justify-center">
 75 |           <Card 
 76 |             className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
 77 |               currentDomain === tree.core.id 
 78 |                 ? 'border-blue-500 bg-blue-50' 
 79 |                 : 'border-gray-200 hover:border-gray-300'
 80 |             }`}
 81 |             onClick={() => onNavigate(tree.core.id)}
 82 |           >
 83 |             <div className="flex items-center gap-3">
 84 |               <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
 85 |                 <Shield className="w-4 h-4 text-blue-600" />
 86 |               </div>
 87 |               <div>
 88 |                 <div className="flex items-center gap-2 mb-1">
 89 |                   <span className="font-semibold text-gray-900">{tree.core.name}</span>
 90 |                   <Badge className={getVersionBadgeColor(tree.core.version)}>
 91 |                     v{tree.core.version}
 92 |                   </Badge>
 93 |                 </div>
 94 |                 <p className="text-sm text-gray-600">Foundation Layer</p>
 95 |               </div>
 96 |             </div>
 97 |             
 98 |             {tree.core.inheritance.provides && (
 99 |               <div className="mt-3 pt-3 border-t border-gray-100">
100 |                 <p className="text-xs text-gray-500 mb-1">Provides:</p>
101 |                 <div className="flex flex-wrap gap-1">
102 |                   {tree.core.inheritance.provides.map(principle => (
103 |                     <Badge key={principle} variant="outline" className="text-xs">
104 |                       {principle.replace('-', ' ')}
105 |                     </Badge>
106 |                   ))}
107 |                 </div>
108 |               </div>
109 |             )}
110 |           </Card>
111 |         </div>
112 | 
113 |         {/* Inheritance Lines */}
114 |         {tree.domains.length > 0 && (
115 |           <div className="flex justify-center">
116 |             <div className="w-px h-8 bg-gray-300"></div>
117 |           </div>
118 |         )}
119 | 
120 |         {/* Domain Extensions */}
121 |         {tree.domains.length > 0 && (
122 |           <div className="grid md:grid-cols-2 gap-4">
123 |             {tree.domains.map((domain) => {
124 |               const { extendsVersion, isCompatible } = getInheritanceInfo(domain);
125 |               
126 |               return (
127 |                 <Card 
128 |                   key={domain.id}
129 |                   className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
130 |                     currentDomain === domain.id 
131 |                       ? 'border-purple-500 bg-purple-50' 
132 |                       : 'border-gray-200 hover:border-gray-300'
133 |                   }`}
134 |                   onClick={() => onNavigate(domain.id)}
135 |                 >
136 |                   <div className="flex items-start gap-3">
137 |                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
138 |                       currentDomain === domain.id ? 'bg-purple-100' : 'bg-gray-100'
139 |                     }`}>
140 |                       <span className="text-lg">{domain.emoji}</span>
141 |                     </div>
142 |                     <div className="flex-1">
143 |                       <div className="flex items-center gap-2 mb-1">
144 |                         <span className="font-semibold text-gray-900">{domain.name}</span>
145 |                         <Badge className={getVersionBadgeColor(domain.version)}>
146 |                           v{domain.version}
147 |                         </Badge>
148 |                       </div>
149 |                       
150 |                       <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
151 |                         <span>extends</span>
152 |                         <ArrowRight className="w-3 h-3" />
153 |                         <span className="font-medium">core-governance@{extendsVersion}</span>
154 |                         {!isCompatible && (
155 |                           <div title="Version mismatch">
156 |                             <AlertCircle className="w-3 h-3 text-orange-500" />
157 |                           </div>
158 |                         )}
159 |                       </div>
160 |                       
161 |                       <p className="text-xs text-gray-500 mb-2">{domain.description}</p>
162 |                     </div>
163 |                   </div>
164 | 
165 |                   {/* Domain Extensions */}
166 |                   {domain.inheritance.domain_extensions && (
167 |                     <div className="mt-3 pt-3 border-t border-gray-100">
168 |                       <p className="text-xs text-gray-500 mb-1">Domain Extensions:</p>
169 |                       <div className="flex flex-wrap gap-1">
170 |                         {Object.entries(domain.inheritance.domain_extensions).map(([key, config]) => (
171 |                           <Badge 
172 |                             key={key} 
173 |                             variant="outline" 
174 |                             className={`text-xs ${
175 |                               (config as any).status === 'core_to_domain' 
176 |                                 ? 'bg-blue-50 text-blue-700 border-blue-200' 
177 |                                 : 'bg-green-50 text-green-700 border-green-200'
178 |                             }`}
179 |                           >
180 |                             {key.replace(/_/g, ' ')}
181 |                           </Badge>
182 |                         ))}
183 |                       </div>
184 |                     </div>
185 |                   )}
186 | 
187 |                   {/* Inheritance Modifications */}
188 |                   {domain.inheritance.inheritance?.core_principles && (
189 |                     <div className="mt-2">
190 |                       <p className="text-xs text-gray-500 mb-1">Core Modifications:</p>
191 |                       <div className="text-xs text-gray-600">
192 |                         {Object.entries(domain.inheritance.inheritance.core_principles).map(([principle, rule]) => (
193 |                           <div key={principle} className="flex justify-between">
194 |                             <span>{principle.replace('_', ' ')}</span>
195 |                             <span className={`font-medium ${
196 |                               rule === 'inherited' ? 'text-green-600' : 'text-blue-600'
197 |                             }`}>
198 |                               {rule === 'inherited' ? '✓' : '~'}
199 |                             </span>
200 |                           </div>
201 |                         ))}
202 |                       </div>
203 |                     </div>
204 |                   )}
205 | 
206 |                   {!isCompatible && (
207 |                     <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
208 |                       <div className="flex items-center gap-1 text-orange-700">
209 |                         <AlertCircle className="w-3 h-3" />
210 |                         <span className="font-medium">Version Compatibility Warning</span>
211 |                       </div>
212 |                       <p className="text-orange-600 mt-1">
213 |                         Extends core-governance@{extendsVersion} but current is v{tree.core.version}
214 |                       </p>
215 |                     </div>
216 |                   )}
217 |                 </Card>
218 |               );
219 |             })}
220 |           </div>
221 |         )}
222 | 
223 |         {/* Legend */}
224 |         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
225 |           <h4 className="text-sm font-medium text-gray-900 mb-2">Legend</h4>
226 |           <div className="grid grid-cols-2 gap-3 text-xs">
227 |             <div className="flex items-center gap-2">
228 |               <Badge className="bg-blue-50 text-blue-700 border-blue-200">✓</Badge>
229 |               <span className="text-gray-600">Inherited unchanged</span>
230 |             </div>
231 |             <div className="flex items-center gap-2">
232 |               <Badge className="bg-blue-50 text-blue-700 border-blue-200">~</Badge>
233 |               <span className="text-gray-600">Inherited with modifications</span>
234 |             </div>
235 |             <div className="flex items-center gap-2">
236 |               <Badge className="bg-green-50 text-green-700 border-green-200">domain_specific</Badge>
237 |               <span className="text-gray-600">Domain-only principle</span>
238 |             </div>
239 |             <div className="flex items-center gap-2">
240 |               <Badge className="bg-blue-50 text-blue-700 border-blue-200">core_to_domain</Badge>
241 |               <span className="text-gray-600">Core principle adapted for domain</span>
242 |             </div>
243 |           </div>
244 |         </div>
245 |       </div>
246 |     </Card>
247 |   );
248 | }
```

## File: src/components/forum/OrganizationCards.tsx

- Extension: .tsx
- Language: typescript
- Size: 8435 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { Card } from '@/components/ui/card';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Button } from '@/components/ui/button';
  7 | import { Eye, Users, Sparkles, Zap, Coins, TrendingUp, DollarSign } from 'lucide-react';
  8 | import { GovernanceOrganization } from '@/types/governance';
  9 | 
 10 | interface OrganizationCardsProps {
 11 |   organizations: GovernanceOrganization[];
 12 |   selectedOrg: string | null;
 13 |   onSelectOrg: (orgId: string) => void;
 14 | }
 15 | 
 16 | export function OrganizationCards({ organizations, selectedOrg, onSelectOrg }: OrganizationCardsProps) {
 17 |   const getOrgStats = (org: GovernanceOrganization) => {
 18 |     // Calculate real stats from organization data
 19 |     const principleCount = org.principles.length;
 20 |     const discussionCount = org.discussions.length;
 21 |     const activeDiscussions = org.discussions.filter(d => 
 22 |       d.status.toLowerCase().includes('active') || 
 23 |       d.status.toLowerCase().includes('discussion') ||
 24 |       d.status.toLowerCase().includes('review')
 25 |     ).length;
 26 |     
 27 |     // Token economics data (would be from API in production)
 28 |     const getTokenData = (orgId: string) => {
 29 |       const tokenData = {
 30 |         'core-governance': { poolSize: 850000, holders: 420, roi: 22.3, trend: 'up' },
 31 |         'animal-welfare': { poolSize: 650000, holders: 280, roi: 18.7, trend: 'up' },
 32 |         'environment': { poolSize: 720000, holders: 310, roi: 15.2, trend: 'stable' }
 33 |       };
 34 |       return tokenData[orgId as keyof typeof tokenData] || tokenData['core-governance'];
 35 |     };
 36 | 
 37 |     const tokenStats = getTokenData(org.id);
 38 |     
 39 |     // Base stats with real data from governance
 40 |     const baseStats = {
 41 |       views: 'N/A', // Views not available in governance data yet
 42 |       members: 0, // Member count not available in governance data yet
 43 |       principles: principleCount,
 44 |       active: activeDiscussions,
 45 |       version: org.version,
 46 |       // Token Economics Stats
 47 |       investmentPoolSize: tokenStats.poolSize,
 48 |       tokenHolders: tokenStats.holders,
 49 |       roi: tokenStats.roi,
 50 |       tokenTrend: tokenStats.trend
 51 |     };
 52 |     
 53 |     // Organization-specific styling
 54 |     const styling = {
 55 |       'core-governance': { 
 56 |         gradient: 'from-blue-500 to-blue-600', 
 57 |         bgGradient: 'from-blue-100 to-blue-200', 
 58 |         color: 'blue' 
 59 |       },
 60 |       'animal-welfare': { 
 61 |         gradient: 'from-green-500 to-emerald-600', 
 62 |         bgGradient: 'from-green-100 to-green-200', 
 63 |         color: 'green', 
 64 |         trending: true 
 65 |       },
 66 |       'environment': { 
 67 |         gradient: 'from-purple-500 to-purple-600', 
 68 |         bgGradient: 'from-purple-100 to-purple-200', 
 69 |         color: 'purple' 
 70 |       }
 71 |     };
 72 |     
 73 |     return { 
 74 |       ...baseStats, 
 75 |       ...(styling[org.id as keyof typeof styling] || styling['core-governance']) 
 76 |     };
 77 |   };
 78 | 
 79 |   return (
 80 |     <div className="lg:col-span-4 space-y-4">
 81 |       <h2 className="text-lg font-semibold text-gray-900 mb-4">Active DAHAOs</h2>
 82 | 
 83 |       {organizations.map((org) => {
 84 |         const stats = getOrgStats(org);
 85 |         const isSelected = selectedOrg === org.id;
 86 |         
 87 |         return (
 88 |           <div
 89 |             key={org.id}
 90 |             className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border ${
 91 |               isSelected ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'
 92 |             }`}
 93 |             onClick={() => onSelectOrg(org.id)}
 94 |           >
 95 |             <div className={`absolute inset-0 bg-gradient-to-br ${stats.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
 96 |             
 97 |             {(stats as any).trending && (
 98 |               <div className="absolute top-2 right-2">
 99 |                 <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">
100 |                   <Zap className="w-3 h-3 mr-1" />
101 |                   Trending
102 |                 </Badge>
103 |               </div>
104 |             )}
105 |             
106 |             <div className="p-6">
107 |               <div className="flex items-start gap-4">
108 |                 <div className={`w-14 h-14 bg-gradient-to-br ${stats.bgGradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
109 |                   <span className="text-2xl">{org.emoji}</span>
110 |                 </div>
111 |                 <div className="flex-1">
112 |                   <h3 className={`font-semibold text-lg mb-2 group-hover:text-${stats.color}-600 transition-colors`}>
113 |                     {org.name}
114 |                   </h3>
115 |                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
116 |                     {org.description}
117 |                   </p>
118 |                   <div className="flex items-center gap-2 mb-3">
119 |                     <Badge className={`bg-${stats.color}-100 text-${stats.color}-700 border-0`}>{stats.version}</Badge>
120 |                     <Badge variant="outline" className="text-xs">{stats.principles} principles</Badge>
121 |                     <Badge variant="outline" className="text-xs border-green-200 text-green-700">
122 |                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
123 |                       {stats.active} active
124 |                     </Badge>
125 |                   </div>
126 |                   <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
127 |                     <span className="flex items-center gap-1">
128 |                       <Eye className="w-3 h-3" />
129 |                       {stats.views} views
130 |                     </span>
131 |                     <span className="flex items-center gap-1">
132 |                       <Users className="w-3 h-3" />
133 |                       {stats.members} members
134 |                     </span>
135 |                   </div>
136 |                   {/* Token Economics Information */}
137 |                   <div className="bg-gray-50 rounded-lg p-3 space-y-2">
138 |                     <div className="flex items-center justify-between text-xs">
139 |                       <span className="flex items-center gap-1 text-gray-600">
140 |                         <DollarSign className="w-3 h-3" />
141 |                         Investment Pool
142 |                       </span>
143 |                       <span className="font-medium text-gray-900">
144 |                         ${(stats.investmentPoolSize / 1000).toFixed(0)}K
145 |                       </span>
146 |                     </div>
147 |                     <div className="flex items-center justify-between text-xs">
148 |                       <span className="flex items-center gap-1 text-gray-600">
149 |                         <Coins className="w-3 h-3" />
150 |                         Token Holders
151 |                       </span>
152 |                       <span className="font-medium text-gray-900">{stats.tokenHolders}</span>
153 |                     </div>
154 |                     <div className="flex items-center justify-between text-xs">
155 |                       <span className="flex items-center gap-1 text-gray-600">
156 |                         <TrendingUp className="w-3 h-3" />
157 |                         Average ROI
158 |                       </span>
159 |                       <span className={`font-medium flex items-center gap-1 ${stats.tokenTrend === 'up' ? 'text-green-600' : 'text-gray-600'}`}>
160 |                         {stats.roi}%
161 |                         {stats.tokenTrend === 'up' && (
162 |                           <TrendingUp className="w-3 h-3 text-green-500" />
163 |                         )}
164 |                       </span>
165 |                     </div>
166 |                   </div>
167 |                 </div>
168 |               </div>
169 |               <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stats.gradient} transform ${isSelected ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform`} />
170 |             </div>
171 |           </div>
172 |         );
173 |       })}
174 | 
175 |       {/* Create New DAHAO CTA */}
176 |       <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 border-dashed">
177 |         <div className="text-center">
178 |           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
179 |             <Sparkles className="w-6 h-6 text-gray-400" />
180 |           </div>
181 |           <h4 className="font-medium text-gray-700 mb-2">Have an idea?</h4>
182 |           <p className="text-sm text-gray-500 mb-4">Start your own DAHAO and build a community</p>
183 |           <Button variant="outline" className="w-full">
184 |             Create New DAHAO
185 |           </Button>
186 |         </div>
187 |       </div>
188 |     </div>
189 |   );
190 | }
```

## File: src/components/forum/OrganizationHeader.tsx

- Extension: .tsx
- Language: typescript
- Size: 3524 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
 1 | 'use client';
 2 | 
 3 | import React from 'react';
 4 | import { Button } from '@/components/ui/button';
 5 | import { Heart } from 'lucide-react';
 6 | import { GovernanceOrganization } from '@/types/governance';
 7 | 
 8 | interface OrganizationHeaderProps {
 9 |   organization: GovernanceOrganization;
10 | }
11 | 
12 | export function OrganizationHeader({ organization }: OrganizationHeaderProps) {
13 |   // Calculate real stats from organization governance data
14 |   const calculateRealStats = (org: GovernanceOrganization) => {
15 |     const principleCount = org.principles.length;
16 |     const proposalCount = org.discussions.length;
17 |     
18 |     // Calculate consensus rate from discussions with voting data
19 |     const discussionsWithVotes = org.discussions.filter(d => 
20 |       d.content?.includes('✅') || d.content?.includes('votes') || d.content?.includes('approval')
21 |     );
22 |     
23 |     let consensusRate = '85%'; // Default fallback
24 |     if (discussionsWithVotes.length > 0) {
25 |       // Extract approval percentages from discussion content
26 |       const approvalRates: number[] = [];
27 |       discussionsWithVotes.forEach(discussion => {
28 |         const match = discussion.content?.match(/(\d+)%\s*(approval|consensus)/i);
29 |         if (match) {
30 |           approvalRates.push(parseInt(match[1]));
31 |         }
32 |       });
33 |       
34 |       if (approvalRates.length > 0) {
35 |         const avgApproval = Math.round(approvalRates.reduce((a, b) => a + b, 0) / approvalRates.length);
36 |         consensusRate = `${avgApproval}%`;
37 |       }
38 |     }
39 |     
40 |     return {
41 |       members: 0, // Member count not available in governance data yet
42 |       principles: principleCount,
43 |       proposals: proposalCount,
44 |       consensus: consensusRate
45 |     };
46 |   };
47 | 
48 |   const stats = calculateRealStats(organization);
49 | 
50 |   return (
51 |     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
52 |       <div className="flex items-start justify-between mb-6">
53 |         <div className="flex items-center gap-4">
54 |           <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
55 |             <span className="text-3xl">{organization.emoji}</span>
56 |           </div>
57 |           <div>
58 |             <h1 className="text-2xl font-bold text-gray-900 mb-1">{organization.name} DAHAO</h1>
59 |             <p className="text-gray-600">{organization.description}</p>
60 |           </div>
61 |         </div>
62 |         <Button className="bg-green-600 hover:bg-green-700">
63 |           <Heart className="w-4 h-4 mr-2" />
64 |           Join Community
65 |         </Button>
66 |       </div>
67 | 
68 |       {/* Quick Stats */}
69 |       <div className="grid grid-cols-4 gap-4">
70 |         <div className="text-center p-3 bg-gray-50 rounded-lg">
71 |           <span className="text-2xl font-bold text-gray-900">{stats.members}</span>
72 |           <p className="text-xs text-gray-600 mt-1">Members</p>
73 |         </div>
74 |         <div className="text-center p-3 bg-gray-50 rounded-lg">
75 |           <span className="text-2xl font-bold text-gray-900">{stats.principles}</span>
76 |           <p className="text-xs text-gray-600 mt-1">Principles</p>
77 |         </div>
78 |         <div className="text-center p-3 bg-gray-50 rounded-lg">
79 |           <span className="text-2xl font-bold text-gray-900">{stats.proposals}</span>
80 |           <p className="text-xs text-gray-600 mt-1">Proposals</p>
81 |         </div>
82 |         <div className="text-center p-3 bg-gray-50 rounded-lg">
83 |           <span className="text-2xl font-bold text-gray-900">{stats.consensus}</span>
84 |           <p className="text-xs text-gray-600 mt-1">Consensus</p>
85 |         </div>
86 |       </div>
87 |     </div>
88 |   );
89 | }
```

## File: src/components/forum/PersonalBranchCreator.tsx

- Extension: .tsx
- Language: typescript
- Size: 19489 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Input } from '@/components/ui/input';
  7 | import { Label } from '@/components/ui/label';
  8 | import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  9 | import { Textarea } from '@/components/ui/textarea';
 10 | import { Badge } from '@/components/ui/badge';
 11 | import { 
 12 |   User, 
 13 |   GitBranch, 
 14 |   Bot, 
 15 |   Coins, 
 16 |   CheckCircle, 
 17 |   AlertCircle,
 18 |   Plus,
 19 |   Minus
 20 | } from 'lucide-react';
 21 | 
 22 | interface PersonalValueSystem {
 23 |   coreValues: string[];
 24 |   customValues: string[];
 25 |   priorityLevel: 'conservative' | 'balanced' | 'progressive';
 26 | }
 27 | 
 28 | interface PersonalAIConfig {
 29 |   agentName: string;
 30 |   personalityTraits: string[];
 31 |   decisionMaking: 'consensus' | 'autonomous' | 'hybrid';
 32 |   deploymentScope: string[];
 33 | }
 34 | 
 35 | interface PersonalBranchConfig {
 36 |   branchName: string;
 37 |   parentDAHAO: string;
 38 |   valueSystem: PersonalValueSystem;
 39 |   aiAgentConfig: PersonalAIConfig;
 40 |   tokenParticipation: boolean;
 41 |   description: string;
 42 | }
 43 | 
 44 | interface PersonalBranchCreatorProps {
 45 |   availableDAHAOs: Array<{id: string, name: string}>;
 46 |   onCreateBranch: (config: PersonalBranchConfig) => void;
 47 | }
 48 | 
 49 | export function PersonalBranchCreator({ availableDAHAOs, onCreateBranch }: PersonalBranchCreatorProps) {
 50 |   const [config, setConfig] = useState<PersonalBranchConfig>({
 51 |     branchName: '',
 52 |     parentDAHAO: '',
 53 |     valueSystem: {
 54 |       coreValues: [],
 55 |       customValues: [],
 56 |       priorityLevel: 'balanced'
 57 |     },
 58 |     aiAgentConfig: {
 59 |       agentName: '',
 60 |       personalityTraits: [],
 61 |       decisionMaking: 'hybrid',
 62 |       deploymentScope: []
 63 |     },
 64 |     tokenParticipation: true,
 65 |     description: ''
 66 |   });
 67 | 
 68 |   const [step, setStep] = useState(1);
 69 |   const [customValue, setCustomValue] = useState('');
 70 |   const [customTrait, setCustomTrait] = useState('');
 71 | 
 72 |   const coreValueOptions = [
 73 |     'transparency', 'equality', 'harm-prevention', 'sustainability',
 74 |     'animal-welfare', 'environmental-protection', 'social-justice'
 75 |   ];
 76 | 
 77 |   const traitOptions = [
 78 |     'analytical', 'empathetic', 'cautious', 'innovative', 
 79 |     'collaborative', 'assertive', 'detail-oriented', 'big-picture'
 80 |   ];
 81 | 
 82 |   const deploymentOptions = [
 83 |     'governance-voting', 'proposal-analysis', 'community-mediation',
 84 |     'research-assistance', 'content-moderation', 'cross-branch-coordination'
 85 |   ];
 86 | 
 87 |   const addCustomValue = () => {
 88 |     if (customValue.trim() && !config.valueSystem.customValues.includes(customValue.trim())) {
 89 |       setConfig(prev => ({
 90 |         ...prev,
 91 |         valueSystem: {
 92 |           ...prev.valueSystem,
 93 |           customValues: [...prev.valueSystem.customValues, customValue.trim()]
 94 |         }
 95 |       }));
 96 |       setCustomValue('');
 97 |     }
 98 |   };
 99 | 
100 |   const removeCustomValue = (value: string) => {
101 |     setConfig(prev => ({
102 |       ...prev,
103 |       valueSystem: {
104 |         ...prev.valueSystem,
105 |         customValues: prev.valueSystem.customValues.filter(v => v !== value)
106 |       }
107 |     }));
108 |   };
109 | 
110 |   const addCustomTrait = () => {
111 |     if (customTrait.trim() && !config.aiAgentConfig.personalityTraits.includes(customTrait.trim())) {
112 |       setConfig(prev => ({
113 |         ...prev,
114 |         aiAgentConfig: {
115 |           ...prev.aiAgentConfig,
116 |           personalityTraits: [...prev.aiAgentConfig.personalityTraits, customTrait.trim()]
117 |         }
118 |       }));
119 |       setCustomTrait('');
120 |     }
121 |   };
122 | 
123 |   const removeTrait = (trait: string) => {
124 |     setConfig(prev => ({
125 |       ...prev,
126 |       aiAgentConfig: {
127 |         ...prev.aiAgentConfig,
128 |         personalityTraits: prev.aiAgentConfig.personalityTraits.filter(t => t !== trait)
129 |       }
130 |     }));
131 |   };
132 | 
133 |   const toggleSelection = (array: string[], item: string, updater: (newArray: string[]) => void) => {
134 |     if (array.includes(item)) {
135 |       updater(array.filter(i => i !== item));
136 |     } else {
137 |       updater([...array, item]);
138 |     }
139 |   };
140 | 
141 |   const canProceed = () => {
142 |     switch (step) {
143 |       case 1:
144 |         return config.branchName.trim() && config.parentDAHAO && config.description.trim();
145 |       case 2:
146 |         return config.valueSystem.coreValues.length > 0;
147 |       case 3:
148 |         return config.aiAgentConfig.agentName.trim() && config.aiAgentConfig.personalityTraits.length > 0;
149 |       default:
150 |         return true;
151 |     }
152 |   };
153 | 
154 |   const renderStep1 = () => (
155 |     <div className="space-y-6">
156 |       <div className="text-center mb-6">
157 |         <User className="w-12 h-12 mx-auto mb-3 text-blue-600" />
158 |         <h3 className="text-xl font-semibold mb-2">Create Your Personal DAHAO Branch</h3>
159 |         <p className="text-gray-600">Start by defining your branch identity and choosing a parent DAHAO</p>
160 |       </div>
161 | 
162 |       <div className="space-y-4">
163 |         <div>
164 |           <Label htmlFor="branchName">Branch Name</Label>
165 |           <Input
166 |             id="branchName"
167 |             placeholder="e.g., Alex's Environmental Focus"
168 |             value={config.branchName}
169 |             onChange={(e) => setConfig(prev => ({ ...prev, branchName: e.target.value }))}
170 |           />
171 |         </div>
172 | 
173 |         <div>
174 |           <Label htmlFor="parentDAHAO">Parent DAHAO</Label>
175 |           <Select value={config.parentDAHAO} onValueChange={(value) => setConfig(prev => ({ ...prev, parentDAHAO: value }))}>
176 |             <SelectTrigger>
177 |               <SelectValue placeholder="Choose a parent DAHAO" />
178 |             </SelectTrigger>
179 |             <SelectContent>
180 |               {availableDAHAOs.map((dahao) => (
181 |                 <SelectItem key={dahao.id} value={dahao.id}>
182 |                   {dahao.name}
183 |                 </SelectItem>
184 |               ))}
185 |             </SelectContent>
186 |           </Select>
187 |         </div>
188 | 
189 |         <div>
190 |           <Label htmlFor="description">Description</Label>
191 |           <Textarea
192 |             id="description"
193 |             placeholder="Describe your branch's focus and goals..."
194 |             value={config.description}
195 |             onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
196 |             rows={3}
197 |           />
198 |         </div>
199 | 
200 |         <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
201 |           <Coins className="w-5 h-5 text-blue-600" />
202 |           <div className="flex-1">
203 |             <p className="font-medium text-blue-900">Token Participation</p>
204 |             <p className="text-sm text-blue-700">Participate in investment pool governance and earn tokens</p>
205 |           </div>
206 |           <Button
207 |             variant={config.tokenParticipation ? "default" : "outline"}
208 |             size="sm"
209 |             onClick={() => setConfig(prev => ({ ...prev, tokenParticipation: !prev.tokenParticipation }))}
210 |           >
211 |             {config.tokenParticipation ? 'Enabled' : 'Disabled'}
212 |           </Button>
213 |         </div>
214 |       </div>
215 |     </div>
216 |   );
217 | 
218 |   const renderStep2 = () => (
219 |     <div className="space-y-6">
220 |       <div className="text-center mb-6">
221 |         <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
222 |         <h3 className="text-xl font-semibold mb-2">Define Your Value System</h3>
223 |         <p className="text-gray-600">Select core values and add your custom values</p>
224 |       </div>
225 | 
226 |       <div className="space-y-4">
227 |         <div>
228 |           <Label>Core Values (inherited from parent DAHAO)</Label>
229 |           <div className="grid grid-cols-2 gap-2 mt-2">
230 |             {coreValueOptions.map((value) => (
231 |               <Button
232 |                 key={value}
233 |                 variant={config.valueSystem.coreValues.includes(value) ? "default" : "outline"}
234 |                 size="sm"
235 |                 onClick={() => toggleSelection(
236 |                   config.valueSystem.coreValues,
237 |                   value,
238 |                   (newValues) => setConfig(prev => ({
239 |                     ...prev,
240 |                     valueSystem: { ...prev.valueSystem, coreValues: newValues }
241 |                   }))
242 |                 )}
243 |               >
244 |                 {value}
245 |               </Button>
246 |             ))}
247 |           </div>
248 |         </div>
249 | 
250 |         <div>
251 |           <Label>Custom Values</Label>
252 |           <div className="flex gap-2 mt-2">
253 |             <Input
254 |               placeholder="Add your custom value..."
255 |               value={customValue}
256 |               onChange={(e) => setCustomValue(e.target.value)}
257 |               onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
258 |             />
259 |             <Button onClick={addCustomValue} size="sm">
260 |               <Plus className="w-4 h-4" />
261 |             </Button>
262 |           </div>
263 |           <div className="flex flex-wrap gap-2 mt-2">
264 |             {config.valueSystem.customValues.map((value) => (
265 |               <Badge key={value} variant="secondary" className="gap-1">
266 |                 {value}
267 |                 <button onClick={() => removeCustomValue(value)}>
268 |                   <Minus className="w-3 h-3" />
269 |                 </button>
270 |               </Badge>
271 |             ))}
272 |           </div>
273 |         </div>
274 | 
275 |         <div>
276 |           <Label>Priority Level</Label>
277 |           <Select 
278 |             value={config.valueSystem.priorityLevel} 
279 |             onValueChange={(value: 'conservative' | 'balanced' | 'progressive') => 
280 |               setConfig(prev => ({
281 |                 ...prev,
282 |                 valueSystem: { ...prev.valueSystem, priorityLevel: value }
283 |               }))
284 |             }
285 |           >
286 |             <SelectTrigger>
287 |               <SelectValue />
288 |             </SelectTrigger>
289 |             <SelectContent>
290 |               <SelectItem value="conservative">Conservative - Gradual change</SelectItem>
291 |               <SelectItem value="balanced">Balanced - Measured progress</SelectItem>
292 |               <SelectItem value="progressive">Progressive - Rapid innovation</SelectItem>
293 |             </SelectContent>
294 |           </Select>
295 |         </div>
296 |       </div>
297 |     </div>
298 |   );
299 | 
300 |   const renderStep3 = () => (
301 |     <div className="space-y-6">
302 |       <div className="text-center mb-6">
303 |         <Bot className="w-12 h-12 mx-auto mb-3 text-purple-600" />
304 |         <h3 className="text-xl font-semibold mb-2">Configure Your AI Agent</h3>
305 |         <p className="text-gray-600">Customize your personal AI agent's personality and capabilities</p>
306 |       </div>
307 | 
308 |       <div className="space-y-4">
309 |         <div>
310 |           <Label htmlFor="agentName">AI Agent Name</Label>
311 |           <Input
312 |             id="agentName"
313 |             placeholder="e.g., Alex's Assistant, EcoBot, etc."
314 |             value={config.aiAgentConfig.agentName}
315 |             onChange={(e) => setConfig(prev => ({
316 |               ...prev,
317 |               aiAgentConfig: { ...prev.aiAgentConfig, agentName: e.target.value }
318 |             }))}
319 |           />
320 |         </div>
321 | 
322 |         <div>
323 |           <Label>Personality Traits</Label>
324 |           <div className="grid grid-cols-2 gap-2 mt-2">
325 |             {traitOptions.map((trait) => (
326 |               <Button
327 |                 key={trait}
328 |                 variant={config.aiAgentConfig.personalityTraits.includes(trait) ? "default" : "outline"}
329 |                 size="sm"
330 |                 onClick={() => toggleSelection(
331 |                   config.aiAgentConfig.personalityTraits,
332 |                   trait,
333 |                   (newTraits) => setConfig(prev => ({
334 |                     ...prev,
335 |                     aiAgentConfig: { ...prev.aiAgentConfig, personalityTraits: newTraits }
336 |                   }))
337 |                 )}
338 |               >
339 |                 {trait}
340 |               </Button>
341 |             ))}
342 |           </div>
343 |           
344 |           <div className="flex gap-2 mt-2">
345 |             <Input
346 |               placeholder="Add custom trait..."
347 |               value={customTrait}
348 |               onChange={(e) => setCustomTrait(e.target.value)}
349 |               onKeyPress={(e) => e.key === 'Enter' && addCustomTrait()}
350 |             />
351 |             <Button onClick={addCustomTrait} size="sm">
352 |               <Plus className="w-4 h-4" />
353 |             </Button>
354 |           </div>
355 |           
356 |           <div className="flex flex-wrap gap-2 mt-2">
357 |             {config.aiAgentConfig.personalityTraits.filter(trait => !traitOptions.includes(trait)).map((trait) => (
358 |               <Badge key={trait} variant="secondary" className="gap-1">
359 |                 {trait}
360 |                 <button onClick={() => removeTrait(trait)}>
361 |                   <Minus className="w-3 h-3" />
362 |                 </button>
363 |               </Badge>
364 |             ))}
365 |           </div>
366 |         </div>
367 | 
368 |         <div>
369 |           <Label>Decision Making Style</Label>
370 |           <Select 
371 |             value={config.aiAgentConfig.decisionMaking} 
372 |             onValueChange={(value: 'consensus' | 'autonomous' | 'hybrid') => 
373 |               setConfig(prev => ({
374 |                 ...prev,
375 |                 aiAgentConfig: { ...prev.aiAgentConfig, decisionMaking: value }
376 |               }))
377 |             }
378 |           >
379 |             <SelectTrigger>
380 |               <SelectValue />
381 |             </SelectTrigger>
382 |             <SelectContent>
383 |               <SelectItem value="consensus">Consensus - Always seeks community agreement</SelectItem>
384 |               <SelectItem value="autonomous">Autonomous - Makes independent decisions</SelectItem>
385 |               <SelectItem value="hybrid">Hybrid - Contextual decision making</SelectItem>
386 |             </SelectContent>
387 |           </Select>
388 |         </div>
389 | 
390 |         <div>
391 |           <Label>Deployment Scope</Label>
392 |           <div className="grid grid-cols-1 gap-2 mt-2">
393 |             {deploymentOptions.map((scope) => (
394 |               <Button
395 |                 key={scope}
396 |                 variant={config.aiAgentConfig.deploymentScope.includes(scope) ? "default" : "outline"}
397 |                 size="sm"
398 |                 onClick={() => toggleSelection(
399 |                   config.aiAgentConfig.deploymentScope,
400 |                   scope,
401 |                   (newScope) => setConfig(prev => ({
402 |                     ...prev,
403 |                     aiAgentConfig: { ...prev.aiAgentConfig, deploymentScope: newScope }
404 |                   }))
405 |                 )}
406 |               >
407 |                 {scope}
408 |               </Button>
409 |             ))}
410 |           </div>
411 |         </div>
412 |       </div>
413 |     </div>
414 |   );
415 | 
416 |   const renderStep4 = () => (
417 |     <div className="space-y-6">
418 |       <div className="text-center mb-6">
419 |         <GitBranch className="w-12 h-12 mx-auto mb-3 text-blue-600" />
420 |         <h3 className="text-xl font-semibold mb-2">Review & Create Branch</h3>
421 |         <p className="text-gray-600">Review your configuration and create your personal DAHAO branch</p>
422 |       </div>
423 | 
424 |       <div className="space-y-4">
425 |         <Card>
426 |           <CardHeader>
427 |             <CardTitle className="text-lg">Branch Overview</CardTitle>
428 |           </CardHeader>
429 |           <CardContent className="space-y-3">
430 |             <div>
431 |               <Label>Branch Name</Label>
432 |               <p className="text-gray-900">{config.branchName}</p>
433 |             </div>
434 |             <div>
435 |               <Label>Parent DAHAO</Label>
436 |               <p className="text-gray-900">{availableDAHAOs.find(d => d.id === config.parentDAHAO)?.name}</p>
437 |             </div>
438 |             <div>
439 |               <Label>Token Participation</Label>
440 |               <Badge variant={config.tokenParticipation ? "default" : "secondary"}>
441 |                 {config.tokenParticipation ? "Enabled" : "Disabled"}
442 |               </Badge>
443 |             </div>
444 |           </CardContent>
445 |         </Card>
446 | 
447 |         <Card>
448 |           <CardHeader>
449 |             <CardTitle className="text-lg">Value System</CardTitle>
450 |           </CardHeader>
451 |           <CardContent>
452 |             <div className="space-y-2">
453 |               <div>
454 |                 <Label>Core Values ({config.valueSystem.coreValues.length})</Label>
455 |                 <div className="flex flex-wrap gap-1 mt-1">
456 |                   {config.valueSystem.coreValues.map(value => (
457 |                     <Badge key={value} variant="outline">{value}</Badge>
458 |                   ))}
459 |                 </div>
460 |               </div>
461 |               <div>
462 |                 <Label>Custom Values ({config.valueSystem.customValues.length})</Label>
463 |                 <div className="flex flex-wrap gap-1 mt-1">
464 |                   {config.valueSystem.customValues.map(value => (
465 |                     <Badge key={value} variant="secondary">{value}</Badge>
466 |                   ))}
467 |                 </div>
468 |               </div>
469 |               <div>
470 |                 <Label>Priority Level</Label>
471 |                 <Badge>{config.valueSystem.priorityLevel}</Badge>
472 |               </div>
473 |             </div>
474 |           </CardContent>
475 |         </Card>
476 | 
477 |         <Card>
478 |           <CardHeader>
479 |             <CardTitle className="text-lg">AI Agent Configuration</CardTitle>
480 |           </CardHeader>
481 |           <CardContent>
482 |             <div className="space-y-2">
483 |               <div>
484 |                 <Label>Agent Name</Label>
485 |                 <p className="text-gray-900">{config.aiAgentConfig.agentName}</p>
486 |               </div>
487 |               <div>
488 |                 <Label>Personality Traits ({config.aiAgentConfig.personalityTraits.length})</Label>
489 |                 <div className="flex flex-wrap gap-1 mt-1">
490 |                   {config.aiAgentConfig.personalityTraits.map(trait => (
491 |                     <Badge key={trait} variant="outline">{trait}</Badge>
492 |                   ))}
493 |                 </div>
494 |               </div>
495 |               <div>
496 |                 <Label>Decision Making</Label>
497 |                 <Badge>{config.aiAgentConfig.decisionMaking}</Badge>
498 |               </div>
499 |               <div>
500 |                 <Label>Deployment Scope ({config.aiAgentConfig.deploymentScope.length})</Label>
501 |                 <div className="flex flex-wrap gap-1 mt-1">
502 |                   {config.aiAgentConfig.deploymentScope.map(scope => (
503 |                     <Badge key={scope} variant="outline">{scope}</Badge>
504 |                   ))}
505 |                 </div>
506 |               </div>
507 |             </div>
508 |           </CardContent>
509 |         </Card>
510 |       </div>
511 |     </div>
512 |   );
513 | 
514 |   return (
515 |     <Card className="max-w-4xl mx-auto">
516 |       <CardHeader>
517 |         <div className="flex items-center justify-between">
518 |           <CardTitle className="flex items-center gap-2">
519 |             <GitBranch className="w-5 h-5" />
520 |             Personal Branch Creator
521 |           </CardTitle>
522 |           <div className="flex items-center gap-2">
523 |             <span className="text-sm text-gray-500">Step {step} of 4</span>
524 |             <div className="flex gap-1">
525 |               {[1, 2, 3, 4].map((i) => (
526 |                 <div
527 |                   key={i}
528 |                   className={`w-2 h-2 rounded-full ${
529 |                     i <= step ? 'bg-blue-500' : 'bg-gray-200'
530 |                   }`}
531 |                 />
532 |               ))}
533 |             </div>
534 |           </div>
535 |         </div>
536 |       </CardHeader>
537 |       <CardContent>
538 |         {step === 1 && renderStep1()}
539 |         {step === 2 && renderStep2()}
540 |         {step === 3 && renderStep3()}
541 |         {step === 4 && renderStep4()}
542 | 
543 |         <div className="flex justify-between mt-8">
544 |           <Button
545 |             variant="outline"
546 |             onClick={() => setStep(Math.max(1, step - 1))}
547 |             disabled={step === 1}
548 |           >
549 |             Previous
550 |           </Button>
551 |           <div className="flex gap-2">
552 |             {step < 4 ? (
553 |               <Button
554 |                 onClick={() => setStep(step + 1)}
555 |                 disabled={!canProceed()}
556 |               >
557 |                 Next
558 |               </Button>
559 |             ) : (
560 |               <Button
561 |                 onClick={() => onCreateBranch(config)}
562 |                 disabled={!canProceed()}
563 |               >
564 |                 Create Branch
565 |               </Button>
566 |             )}
567 |           </div>
568 |         </div>
569 |       </CardContent>
570 |     </Card>
571 |   );
572 | }
```

## File: src/components/forum/PersonalTermDevelopment.tsx

- Extension: .tsx
- Language: typescript
- Size: 24443 bytes
- Created: 2025-06-13 17:42:10
- Modified: 2025-06-13 17:42:10

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Badge } from '@/components/ui/badge';
  7 | import { Input } from '@/components/ui/input';
  8 | import { Textarea } from '@/components/ui/textarea';
  9 | import { Progress } from '@/components/ui/progress';
 10 | import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 11 | import { 
 12 |   FileText, 
 13 |   Edit, 
 14 |   Save, 
 15 |   Upload, 
 16 |   Target, 
 17 |   Lightbulb, 
 18 |   CheckCircle,
 19 |   Clock,
 20 |   Users,
 21 |   TrendingUp,
 22 |   Coins,
 23 |   GitBranch,
 24 |   Bot,
 25 |   MessageSquare,
 26 |   Star
 27 | } from 'lucide-react';
 28 | 
 29 | interface PersonalTermDraft {
 30 |   id: string;
 31 |   termName: string;
 32 |   definition: string;
 33 |   rationale: string;
 34 |   domain: string;
 35 |   tags: string[];
 36 |   createdAt: string;
 37 |   updatedAt: string;
 38 |   status: 'draft' | 'ai_review' | 'peer_review' | 'ready_for_submission' | 'submitted';
 39 |   progress: {
 40 |     completeness: number;
 41 |     clarity: number;
 42 |     uniqueness: number;
 43 |     alignment: number;
 44 |   };
 45 |   aiReviews: {
 46 |     id: string;
 47 |     agentName: string;
 48 |     feedback: string;
 49 |     suggestions: string[];
 50 |     score: number;
 51 |     timestamp: string;
 52 |   }[];
 53 |   peerReviews: {
 54 |     id: string;
 55 |     reviewerName: string;
 56 |     feedback: string;
 57 |     rating: number;
 58 |     timestamp: string;
 59 |   }[];
 60 |   submissionReadiness: {
 61 |     criteria: {
 62 |       name: string;
 63 |       met: boolean;
 64 |       description: string;
 65 |     }[];
 66 |     overallScore: number;
 67 |   };
 68 | }
 69 | 
 70 | interface PersonalTermDevelopmentProps {
 71 |   branchId: string;
 72 |   userId: string;
 73 |   tokenBalance: number;
 74 |   onSubmitToPublicPool: (termDraft: PersonalTermDraft) => void;
 75 | }
 76 | 
 77 | export function PersonalTermDevelopment({ 
 78 |   branchId, 
 79 |   userId, 
 80 |   tokenBalance, 
 81 |   onSubmitToPublicPool 
 82 | }: PersonalTermDevelopmentProps) {
 83 |   const [activeDraft, setActiveDraft] = useState<PersonalTermDraft | null>(null);
 84 |   const [showNewDraftForm, setShowNewDraftForm] = useState(false);
 85 |   const [activeTab, setActiveTab] = useState('drafts');
 86 | 
 87 |   // Mock data for personal term drafts
 88 |   const mockDrafts: PersonalTermDraft[] = [
 89 |     {
 90 |       id: 'draft-1',
 91 |       termName: 'regenerative-wellbeing',
 92 |       definition: 'A state where an entity not only maintains its own wellbeing but actively contributes to the wellbeing of the systems and communities it is part of, creating positive feedback loops that enhance collective flourishing.',
 93 |       rationale: 'Current definitions of wellbeing focus on individual states without considering the interconnected nature of ecological and social systems. This term captures the dynamic relationship between personal and collective wellbeing.',
 94 |       domain: 'environment',
 95 |       tags: ['ecology', 'systems-thinking', 'collective-wellbeing'],
 96 |       createdAt: '2024-12-10T10:00:00Z',
 97 |       updatedAt: '2024-12-14T15:30:00Z',
 98 |       status: 'ai_review',
 99 |       progress: {
100 |         completeness: 85,
101 |         clarity: 78,
102 |         uniqueness: 92,
103 |         alignment: 88
104 |       },
105 |       aiReviews: [
106 |         {
107 |           id: 'ai-review-1',
108 |           agentName: 'Personal Ethics Assistant',
109 |           feedback: 'Strong conceptual foundation with clear systems perspective. Consider adding measurable indicators for practical implementation.',
110 |           suggestions: [
111 |             'Include specific examples of regenerative actions',
112 |             'Define threshold criteria for "positive feedback loops"',
113 |             'Add connection to existing environmental ethics frameworks'
114 |           ],
115 |           score: 8.2,
116 |           timestamp: '2024-12-14T09:00:00Z'
117 |         }
118 |       ],
119 |       peerReviews: [],
120 |       submissionReadiness: {
121 |         criteria: [
122 |           { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
123 |           { name: 'Unique contribution', met: true, description: 'Offers new perspective on wellbeing' },
124 |           { name: 'Domain alignment', met: true, description: 'Fits well within environmental domain' },
125 |           { name: 'AI review completed', met: true, description: 'Personal AI has reviewed and scored' },
126 |           { name: 'Peer review', met: false, description: 'Needs at least 2 peer reviews' },
127 |           { name: 'Implementation examples', met: false, description: 'Needs practical examples' }
128 |         ],
129 |         overallScore: 67
130 |       }
131 |     },
132 |     {
133 |       id: 'draft-2',
134 |       termName: 'consent-transparency',
135 |       definition: 'The practice of making all aspects of consent processes visible and understandable to all affected parties, including the information provided, decision-making process, and ongoing ability to modify or withdraw consent.',
136 |       rationale: 'Traditional consent models often lack transparency about how decisions are made and what information is actually understood by consenting parties.',
137 |       domain: 'core-governance',
138 |       tags: ['consent', 'transparency', 'governance'],
139 |       createdAt: '2024-12-08T14:00:00Z',
140 |       updatedAt: '2024-12-12T11:20:00Z',
141 |       status: 'ready_for_submission',
142 |       progress: {
143 |         completeness: 95,
144 |         clarity: 89,
145 |         uniqueness: 85,
146 |         alignment: 93
147 |       },
148 |       aiReviews: [
149 |         {
150 |           id: 'ai-review-2',
151 |           agentName: 'Personal Ethics Assistant',
152 |           feedback: 'Excellent clarity and practical applicability. Well-aligned with core governance principles.',
153 |           suggestions: [
154 |             'Consider edge cases where full transparency might conflict with privacy',
155 |             'Add examples from different cultural contexts'
156 |           ],
157 |           score: 9.1,
158 |           timestamp: '2024-12-12T10:00:00Z'
159 |         }
160 |       ],
161 |       peerReviews: [
162 |         {
163 |           id: 'peer-review-1',
164 |           reviewerName: 'Dr. Sarah Mitchell',
165 |           feedback: 'Very relevant for governance contexts. The transparency aspect addresses real gaps in current consent practices.',
166 |           rating: 4.5,
167 |           timestamp: '2024-12-12T16:00:00Z'
168 |         },
169 |         {
170 |           id: 'peer-review-2',
171 |           reviewerName: 'Alex Chen',
172 |           feedback: 'Good foundation. Would benefit from more specific procedural guidelines.',
173 |           rating: 4.0,
174 |           timestamp: '2024-12-13T09:30:00Z'
175 |         }
176 |       ],
177 |       submissionReadiness: {
178 |         criteria: [
179 |           { name: 'Clear definition', met: true, description: 'Definition is comprehensive and clear' },
180 |           { name: 'Unique contribution', met: true, description: 'Provides new framework for consent' },
181 |           { name: 'Domain alignment', met: true, description: 'Well-suited for governance domain' },
182 |           { name: 'AI review completed', met: true, description: 'High score from personal AI' },
183 |           { name: 'Peer review', met: true, description: '2 peer reviews completed' },
184 |           { name: 'Implementation examples', met: true, description: 'Practical examples provided' }
185 |         ],
186 |         overallScore: 92
187 |       }
188 |     }
189 |   ];
190 | 
191 |   const [drafts, setDrafts] = useState<PersonalTermDraft[]>(mockDrafts);
192 | 
193 |   const getStatusColor = (status: PersonalTermDraft['status']) => {
194 |     switch (status) {
195 |       case 'draft': return 'bg-gray-100 text-gray-800';
196 |       case 'ai_review': return 'bg-blue-100 text-blue-800';
197 |       case 'peer_review': return 'bg-purple-100 text-purple-800';
198 |       case 'ready_for_submission': return 'bg-green-100 text-green-800';
199 |       case 'submitted': return 'bg-yellow-100 text-yellow-800';
200 |       default: return 'bg-gray-100 text-gray-800';
201 |     }
202 |   };
203 | 
204 |   const getStatusIcon = (status: PersonalTermDraft['status']) => {
205 |     switch (status) {
206 |       case 'draft': return <Edit className="w-4 h-4" />;
207 |       case 'ai_review': return <Bot className="w-4 h-4" />;
208 |       case 'peer_review': return <Users className="w-4 h-4" />;
209 |       case 'ready_for_submission': return <CheckCircle className="w-4 h-4" />;
210 |       case 'submitted': return <Upload className="w-4 h-4" />;
211 |       default: return <FileText className="w-4 h-4" />;
212 |     }
213 |   };
214 | 
215 |   const calculateOverallProgress = (draft: PersonalTermDraft) => {
216 |     const progressValues = Object.values(draft.progress);
217 |     return Math.round(progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length);
218 |   };
219 | 
220 |   const renderProgressIndicator = (label: string, value: number, target: number = 80) => (
221 |     <div className="space-y-1">
222 |       <div className="flex justify-between text-sm">
223 |         <span>{label}</span>
224 |         <span>{value}%</span>
225 |       </div>
226 |       <Progress value={value} className="h-2">
227 |         <div 
228 |           className={`h-full transition-all ${value >= target ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
229 |           style={{ width: `${value}%` }} 
230 |         />
231 |       </Progress>
232 |     </div>
233 |   );
234 | 
235 |   const renderDraftCard = (draft: PersonalTermDraft) => (
236 |     <Card key={draft.id} className="hover:shadow-md transition-shadow cursor-pointer"
237 |           onClick={() => setActiveDraft(draft)}>
238 |       <CardContent className="p-4">
239 |         <div className="flex items-start justify-between mb-3">
240 |           <div className="flex-1">
241 |             <div className="flex items-center gap-2 mb-2">
242 |               <h3 className="font-semibold text-lg">{draft.termName}</h3>
243 |               <Badge className={getStatusColor(draft.status)}>
244 |                 {getStatusIcon(draft.status)}
245 |                 <span className="ml-1">{draft.status.replace('_', ' ')}</span>
246 |               </Badge>
247 |             </div>
248 |             <p className="text-sm text-gray-600 line-clamp-2 mb-2">
249 |               {draft.definition}
250 |             </p>
251 |             <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
252 |               <span>{draft.domain}</span>
253 |               <span>Updated {new Date(draft.updatedAt).toLocaleDateString()}</span>
254 |               <span>{draft.aiReviews.length} AI reviews</span>
255 |               <span>{draft.peerReviews.length} peer reviews</span>
256 |             </div>
257 |           </div>
258 |         </div>
259 | 
260 |         <div className="space-y-2 mb-3">
261 |           {renderProgressIndicator('Overall Progress', calculateOverallProgress(draft))}
262 |           <div className="grid grid-cols-2 gap-2">
263 |             <div className="text-xs">
264 |               <span className="text-gray-600">Clarity: </span>
265 |               <span className={draft.progress.clarity >= 80 ? 'text-green-600' : 'text-yellow-600'}>
266 |                 {draft.progress.clarity}%
267 |               </span>
268 |             </div>
269 |             <div className="text-xs">
270 |               <span className="text-gray-600">Uniqueness: </span>
271 |               <span className={draft.progress.uniqueness >= 80 ? 'text-green-600' : 'text-yellow-600'}>
272 |                 {draft.progress.uniqueness}%
273 |               </span>
274 |             </div>
275 |           </div>
276 |         </div>
277 | 
278 |         <div className="flex flex-wrap gap-1 mb-3">
279 |           {draft.tags.map(tag => (
280 |             <Badge key={tag} variant="outline" className="text-xs">
281 |               {tag}
282 |             </Badge>
283 |           ))}
284 |         </div>
285 | 
286 |         {draft.status === 'ready_for_submission' && (
287 |           <div className="pt-2 border-t">
288 |             <Button 
289 |               size="sm" 
290 |               className="w-full bg-green-600 hover:bg-green-700"
291 |               onClick={(e) => {
292 |                 e.stopPropagation();
293 |                 onSubmitToPublicPool(draft);
294 |               }}
295 |             >
296 |               <Upload className="w-4 h-4 mr-2" />
297 |               Submit to Public Pool
298 |             </Button>
299 |           </div>
300 |         )}
301 |       </CardContent>
302 |     </Card>
303 |   );
304 | 
305 |   const renderNewDraftForm = () => (
306 |     <Card>
307 |       <CardHeader>
308 |         <CardTitle>Create New Term Definition</CardTitle>
309 |       </CardHeader>
310 |       <CardContent className="space-y-4">
311 |         <div>
312 |           <label className="text-sm font-medium">Term Name</label>
313 |           <Input placeholder="e.g., regenerative-wellbeing" />
314 |         </div>
315 |         
316 |         <div>
317 |           <label className="text-sm font-medium">Domain</label>
318 |           <select className="w-full p-2 border rounded-md">
319 |             <option value="core-governance">Core Governance</option>
320 |             <option value="animal-welfare">Animal Welfare</option>
321 |             <option value="environment">Environment</option>
322 |           </select>
323 |         </div>
324 | 
325 |         <div>
326 |           <label className="text-sm font-medium">Definition</label>
327 |           <Textarea 
328 |             placeholder="Enter your term definition..."
329 |             rows={4}
330 |           />
331 |         </div>
332 | 
333 |         <div>
334 |           <label className="text-sm font-medium">Rationale</label>
335 |           <Textarea 
336 |             placeholder="Explain why this term is needed and how it differs from existing definitions..."
337 |             rows={3}
338 |           />
339 |         </div>
340 | 
341 |         <div>
342 |           <label className="text-sm font-medium">Tags</label>
343 |           <Input placeholder="e.g., ecology, systems-thinking (comma-separated)" />
344 |         </div>
345 | 
346 |         <div className="flex gap-2">
347 |           <Button onClick={() => setShowNewDraftForm(false)} variant="outline">
348 |             Cancel
349 |           </Button>
350 |           <Button>
351 |             Create Draft
352 |           </Button>
353 |         </div>
354 |       </CardContent>
355 |     </Card>
356 |   );
357 | 
358 |   const renderDraftDetail = (draft: PersonalTermDraft) => (
359 |     <div className="space-y-6">
360 |       <Card>
361 |         <CardHeader>
362 |           <div className="flex items-center justify-between">
363 |             <CardTitle className="flex items-center gap-2">
364 |               <FileText className="w-5 h-5" />
365 |               {draft.termName}
366 |             </CardTitle>
367 |             <div className="flex gap-2">
368 |               {draft.status === 'ready_for_submission' && (
369 |                 <Button onClick={() => onSubmitToPublicPool(draft)} className="bg-green-600 hover:bg-green-700">
370 |                   <Upload className="w-4 h-4 mr-2" />
371 |                   Submit to Public Pool
372 |                 </Button>
373 |               )}
374 |               <Button variant="outline" onClick={() => setActiveDraft(null)}>
375 |                 Back to Drafts
376 |               </Button>
377 |             </div>
378 |           </div>
379 |         </CardHeader>
380 |         <CardContent>
381 |           <div className="space-y-4">
382 |             <div>
383 |               <h4 className="font-semibold mb-2">Definition</h4>
384 |               <p className="text-gray-700 bg-gray-50 p-3 rounded border">
385 |                 {draft.definition}
386 |               </p>
387 |             </div>
388 | 
389 |             <div>
390 |               <h4 className="font-semibold mb-2">Rationale</h4>
391 |               <p className="text-gray-700">{draft.rationale}</p>
392 |             </div>
393 | 
394 |             {/* Progress Metrics */}
395 |             <div>
396 |               <h4 className="font-semibold mb-3">Development Progress</h4>
397 |               <div className="grid grid-cols-2 gap-4">
398 |                 {renderProgressIndicator('Completeness', draft.progress.completeness)}
399 |                 {renderProgressIndicator('Clarity', draft.progress.clarity)}
400 |                 {renderProgressIndicator('Uniqueness', draft.progress.uniqueness)}
401 |                 {renderProgressIndicator('Alignment', draft.progress.alignment)}
402 |               </div>
403 |             </div>
404 |           </div>
405 |         </CardContent>
406 |       </Card>
407 | 
408 |       {/* AI Reviews */}
409 |       {draft.aiReviews.length > 0 && (
410 |         <Card>
411 |           <CardHeader>
412 |             <CardTitle className="flex items-center gap-2">
413 |               <Bot className="w-5 h-5" />
414 |               AI Reviews ({draft.aiReviews.length})
415 |             </CardTitle>
416 |           </CardHeader>
417 |           <CardContent className="space-y-4">
418 |             {draft.aiReviews.map((review) => (
419 |               <div key={review.id} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
420 |                 <div className="flex items-center justify-between mb-2">
421 |                   <span className="font-medium">{review.agentName}</span>
422 |                   <div className="flex items-center gap-2">
423 |                     <Star className="w-4 h-4 text-yellow-500" />
424 |                     <span>{review.score}/10</span>
425 |                   </div>
426 |                 </div>
427 |                 <p className="text-sm text-gray-700 mb-2">{review.feedback}</p>
428 |                 {review.suggestions.length > 0 && (
429 |                   <div>
430 |                     <p className="text-sm font-medium mb-1">Suggestions:</p>
431 |                     <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
432 |                       {review.suggestions.map((suggestion, index) => (
433 |                         <li key={index}>{suggestion}</li>
434 |                       ))}
435 |                     </ul>
436 |                   </div>
437 |                 )}
438 |               </div>
439 |             ))}
440 |           </CardContent>
441 |         </Card>
442 |       )}
443 | 
444 |       {/* Peer Reviews */}
445 |       {draft.peerReviews.length > 0 && (
446 |         <Card>
447 |           <CardHeader>
448 |             <CardTitle className="flex items-center gap-2">
449 |               <Users className="w-5 h-5" />
450 |               Peer Reviews ({draft.peerReviews.length})
451 |             </CardTitle>
452 |           </CardHeader>
453 |           <CardContent className="space-y-4">
454 |             {draft.peerReviews.map((review) => (
455 |               <div key={review.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
456 |                 <div className="flex items-center justify-between mb-2">
457 |                   <span className="font-medium">{review.reviewerName}</span>
458 |                   <div className="flex items-center gap-1">
459 |                     {[...Array(5)].map((_, i) => (
460 |                       <Star 
461 |                         key={i} 
462 |                         className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
463 |                       />
464 |                     ))}
465 |                   </div>
466 |                 </div>
467 |                 <p className="text-sm text-gray-700">{review.feedback}</p>
468 |               </div>
469 |             ))}
470 |           </CardContent>
471 |         </Card>
472 |       )}
473 | 
474 |       {/* Submission Readiness */}
475 |       <Card>
476 |         <CardHeader>
477 |           <CardTitle className="flex items-center gap-2">
478 |             <Target className="w-5 h-5" />
479 |             Submission Readiness ({draft.submissionReadiness.overallScore}%)
480 |           </CardTitle>
481 |         </CardHeader>
482 |         <CardContent>
483 |           <div className="space-y-3">
484 |             {draft.submissionReadiness.criteria.map((criterion, index) => (
485 |               <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
486 |                 <div className={`w-4 h-4 rounded-full ${criterion.met ? 'bg-green-500' : 'bg-gray-300'}`} />
487 |                 <div className="flex-1">
488 |                   <div className="font-medium text-sm">{criterion.name}</div>
489 |                   <div className="text-xs text-gray-600">{criterion.description}</div>
490 |                 </div>
491 |                 {criterion.met && <CheckCircle className="w-4 h-4 text-green-600" />}
492 |               </div>
493 |             ))}
494 |           </div>
495 |         </CardContent>
496 |       </Card>
497 |     </div>
498 |   );
499 | 
500 |   return (
501 |     <div className="space-y-6">
502 |       <div className="flex items-center justify-between">
503 |         <div>
504 |           <h2 className="text-2xl font-bold">Personal Term Development</h2>
505 |           <p className="text-gray-600">Develop and refine term definitions in your personal workspace</p>
506 |         </div>
507 |         <div className="flex items-center gap-2">
508 |           <div className="text-sm text-gray-600">
509 |             Balance: {tokenBalance.toLocaleString()} tokens
510 |           </div>
511 |           <Button onClick={() => setShowNewDraftForm(true)}>
512 |             <Lightbulb className="w-4 h-4 mr-2" />
513 |             New Term Draft
514 |           </Button>
515 |         </div>
516 |       </div>
517 | 
518 |       {showNewDraftForm && (
519 |         <div>
520 |           {renderNewDraftForm()}
521 |         </div>
522 |       )}
523 | 
524 |       {activeDraft ? (
525 |         renderDraftDetail(activeDraft)
526 |       ) : (
527 |         <Tabs value={activeTab} onValueChange={setActiveTab}>
528 |           <TabsList>
529 |             <TabsTrigger value="drafts">My Drafts ({drafts.length})</TabsTrigger>
530 |             <TabsTrigger value="workspace">Workspace Tools</TabsTrigger>
531 |             <TabsTrigger value="analytics">Progress Analytics</TabsTrigger>
532 |           </TabsList>
533 | 
534 |           <TabsContent value="drafts" className="space-y-4 mt-6">
535 |             {drafts.length > 0 ? (
536 |               <div className="grid gap-4">
537 |                 {drafts.map(renderDraftCard)}
538 |               </div>
539 |             ) : (
540 |               <Card>
541 |                 <CardContent className="text-center p-8">
542 |                   <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
543 |                   <h3 className="text-lg font-semibold text-gray-900 mb-2">No Term Drafts</h3>
544 |                   <p className="text-gray-600 mb-4">Start developing your first term definition</p>
545 |                   <Button onClick={() => setShowNewDraftForm(true)}>
546 |                     <Lightbulb className="w-4 h-4 mr-2" />
547 |                     Create First Draft
548 |                   </Button>
549 |                 </CardContent>
550 |               </Card>
551 |             )}
552 |           </TabsContent>
553 | 
554 |           <TabsContent value="workspace" className="space-y-4 mt-6">
555 |             <div className="grid gap-4 md:grid-cols-2">
556 |               <Card>
557 |                 <CardHeader>
558 |                   <CardTitle className="flex items-center gap-2">
559 |                     <Bot className="w-5 h-5" />
560 |                     AI Assistant Tools
561 |                   </CardTitle>
562 |                 </CardHeader>
563 |                 <CardContent>
564 |                   <div className="space-y-3">
565 |                     <Button variant="outline" className="w-full justify-start">
566 |                       <MessageSquare className="w-4 h-4 mr-2" />
567 |                       Request AI Review
568 |                     </Button>
569 |                     <Button variant="outline" className="w-full justify-start">
570 |                       <Lightbulb className="w-4 h-4 mr-2" />
571 |                       Generate Term Suggestions
572 |                     </Button>
573 |                     <Button variant="outline" className="w-full justify-start">
574 |                       <CheckCircle className="w-4 h-4 mr-2" />
575 |                       Clarity Analysis
576 |                     </Button>
577 |                   </div>
578 |                 </CardContent>
579 |               </Card>
580 | 
581 |               <Card>
582 |                 <CardHeader>
583 |                   <CardTitle className="flex items-center gap-2">
584 |                     <Users className="w-5 h-5" />
585 |                     Community Tools
586 |                   </CardTitle>
587 |                 </CardHeader>
588 |                 <CardContent>
589 |                   <div className="space-y-3">
590 |                     <Button variant="outline" className="w-full justify-start">
591 |                       <Users className="w-4 h-4 mr-2" />
592 |                       Request Peer Review
593 |                     </Button>
594 |                     <Button variant="outline" className="w-full justify-start">
595 |                       <GitBranch className="w-4 h-4 mr-2" />
596 |                       Compare with Public Terms
597 |                     </Button>
598 |                     <Button variant="outline" className="w-full justify-start">
599 |                       <TrendingUp className="w-4 h-4 mr-2" />
600 |                       View Similar Terms
601 |                     </Button>
602 |                   </div>
603 |                 </CardContent>
604 |               </Card>
605 |             </div>
606 |           </TabsContent>
607 | 
608 |           <TabsContent value="analytics" className="space-y-4 mt-6">
609 |             <div className="grid gap-4 md:grid-cols-3">
610 |               <Card>
611 |                 <CardContent className="text-center p-6">
612 |                   <div className="text-2xl font-bold text-blue-600">{drafts.length}</div>
613 |                   <div className="text-sm text-gray-600">Total Drafts</div>
614 |                 </CardContent>
615 |               </Card>
616 |               <Card>
617 |                 <CardContent className="text-center p-6">
618 |                   <div className="text-2xl font-bold text-green-600">
619 |                     {drafts.filter(d => d.status === 'ready_for_submission').length}
620 |                   </div>
621 |                   <div className="text-sm text-gray-600">Ready for Submission</div>
622 |                 </CardContent>
623 |               </Card>
624 |               <Card>
625 |                 <CardContent className="text-center p-6">
626 |                   <div className="text-2xl font-bold text-purple-600">
627 |                     {drafts.reduce((sum, d) => sum + d.aiReviews.length + d.peerReviews.length, 0)}
628 |                   </div>
629 |                   <div className="text-sm text-gray-600">Total Reviews</div>
630 |                 </CardContent>
631 |               </Card>
632 |             </div>
633 |           </TabsContent>
634 |         </Tabs>
635 |       )}
636 |     </div>
637 |   );
638 | }
```

## File: src/components/forum/PersonalWorkspace.tsx

- Extension: .tsx
- Language: typescript
- Size: 13723 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Badge } from '@/components/ui/badge';
  7 | import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  8 | import { Progress } from '@/components/ui/progress';
  9 | import { 
 10 |   GitBranch, 
 11 |   Bot, 
 12 |   Coins, 
 13 |   TrendingUp, 
 14 |   Settings, 
 15 |   Upload,
 16 |   FileText,
 17 |   MessageSquare,
 18 |   Target,
 19 |   Award,
 20 |   BarChart3
 21 | } from 'lucide-react';
 22 | 
 23 | interface PersonalBranchData {
 24 |   id: string;
 25 |   name: string;
 26 |   parentDAHAO: string;
 27 |   createdAt: string;
 28 |   status: 'active' | 'developing' | 'merging';
 29 |   valueSystem: {
 30 |     coreValues: string[];
 31 |     customValues: string[];
 32 |     priorityLevel: string;
 33 |   };
 34 |   aiAgent: {
 35 |     name: string;
 36 |     status: 'active' | 'training' | 'offline';
 37 |     personalityTraits: string[];
 38 |     decisionMaking: string;
 39 |     deploymentScope: string[];
 40 |   };
 41 |   tokenEarnings: {
 42 |     totalEarned: number;
 43 |     currentBalance: number;
 44 |     lastWeekEarnings: number;
 45 |     roi: number;
 46 |   };
 47 |   contributions: {
 48 |     termsProposed: number;
 49 |     discussionsParticipated: number;
 50 |     proposalsSubmitted: number;
 51 |     votesParticipated: number;
 52 |   };
 53 |   progressToPublicPool: {
 54 |     completionPercentage: number;
 55 |     requirements: Array<{
 56 |       name: string;
 57 |       completed: boolean;
 58 |       description: string;
 59 |     }>;
 60 |   };
 61 | }
 62 | 
 63 | interface PersonalWorkspaceProps {
 64 |   personalBranches: PersonalBranchData[];
 65 |   activeBranchId: string | null;
 66 |   onSwitchBranch: (branchId: string) => void;
 67 |   onCreateNewBranch: () => void;
 68 | }
 69 | 
 70 | export function PersonalWorkspace({ 
 71 |   personalBranches, 
 72 |   activeBranchId, 
 73 |   onSwitchBranch, 
 74 |   onCreateNewBranch 
 75 | }: PersonalWorkspaceProps) {
 76 |   const [selectedTab, setSelectedTab] = useState('overview');
 77 |   
 78 |   const activeBranch = personalBranches.find(b => b.id === activeBranchId) || personalBranches[0];
 79 | 
 80 |   if (!activeBranch) {
 81 |     return (
 82 |       <Card className="max-w-4xl mx-auto">
 83 |         <CardContent className="text-center p-12">
 84 |           <GitBranch className="w-16 h-16 mx-auto mb-4 text-gray-400" />
 85 |           <h3 className="text-xl font-semibold mb-2">No Personal Branches</h3>
 86 |           <p className="text-gray-600 mb-6">Create your first personal DAHAO branch to get started with personal AI agents and token earnings.</p>
 87 |           <Button onClick={onCreateNewBranch}>
 88 |             <GitBranch className="w-4 h-4 mr-2" />
 89 |             Create Personal Branch
 90 |           </Button>
 91 |         </CardContent>
 92 |       </Card>
 93 |     );
 94 |   }
 95 | 
 96 |   const renderOverview = () => (
 97 |     <div className="space-y-6">
 98 |       {/* Branch Status */}
 99 |       <Card>
100 |         <CardHeader>
101 |           <CardTitle className="flex items-center gap-2">
102 |             <GitBranch className="w-5 h-5" />
103 |             Branch Status
104 |           </CardTitle>
105 |         </CardHeader>
106 |         <CardContent>
107 |           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
108 |             <div className="text-center">
109 |               <div className="text-2xl font-bold text-blue-600">{activeBranch.status}</div>
110 |               <div className="text-sm text-gray-600">Status</div>
111 |             </div>
112 |             <div className="text-center">
113 |               <div className="text-2xl font-bold text-green-600">{activeBranch.valueSystem.coreValues.length + activeBranch.valueSystem.customValues.length}</div>
114 |               <div className="text-sm text-gray-600">Values Defined</div>
115 |             </div>
116 |             <div className="text-center">
117 |               <div className="text-2xl font-bold text-purple-600">{activeBranch.aiAgent.status}</div>
118 |               <div className="text-sm text-gray-600">AI Agent</div>
119 |             </div>
120 |             <div className="text-center">
121 |               <div className="text-2xl font-bold text-orange-600">{activeBranch.progressToPublicPool.completionPercentage}%</div>
122 |               <div className="text-sm text-gray-600">To Public Pool</div>
123 |             </div>
124 |           </div>
125 |         </CardContent>
126 |       </Card>
127 | 
128 |       {/* Token Earnings Dashboard */}
129 |       <Card>
130 |         <CardHeader>
131 |           <CardTitle className="flex items-center gap-2">
132 |             <Coins className="w-5 h-5" />
133 |             Token Earnings
134 |           </CardTitle>
135 |         </CardHeader>
136 |         <CardContent>
137 |           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
138 |             <div className="text-center">
139 |               <div className="text-2xl font-bold text-yellow-600">{activeBranch.tokenEarnings.totalEarned.toLocaleString()}</div>
140 |               <div className="text-sm text-gray-600">Total Earned</div>
141 |             </div>
142 |             <div className="text-center">
143 |               <div className="text-2xl font-bold text-green-600">{activeBranch.tokenEarnings.currentBalance.toLocaleString()}</div>
144 |               <div className="text-sm text-gray-600">Current Balance</div>
145 |             </div>
146 |             <div className="text-center">
147 |               <div className="text-2xl font-bold text-blue-600">+{activeBranch.tokenEarnings.lastWeekEarnings.toLocaleString()}</div>
148 |               <div className="text-sm text-gray-600">Last Week</div>
149 |             </div>
150 |             <div className="text-center">
151 |               <div className="text-2xl font-bold text-purple-600">{activeBranch.tokenEarnings.roi}%</div>
152 |               <div className="text-sm text-gray-600">ROI</div>
153 |             </div>
154 |           </div>
155 |           <div className="bg-gradient-to-r from-yellow-100 to-green-100 p-4 rounded-lg">
156 |             <div className="flex items-center justify-between">
157 |               <span className="text-sm font-medium">Weekly Earning Trend</span>
158 |               <TrendingUp className="w-4 h-4 text-green-600" />
159 |             </div>
160 |             <div className="text-xs text-gray-600 mt-1">+12% increase from last week</div>
161 |           </div>
162 |         </CardContent>
163 |       </Card>
164 | 
165 |       {/* Progress to Public Pool */}
166 |       <Card>
167 |         <CardHeader>
168 |           <CardTitle className="flex items-center gap-2">
169 |             <Target className="w-5 h-5" />
170 |             Progress to Public Pool
171 |           </CardTitle>
172 |         </CardHeader>
173 |         <CardContent>
174 |           <div className="mb-4">
175 |             <div className="flex justify-between text-sm mb-2">
176 |               <span>Completion Progress</span>
177 |               <span>{activeBranch.progressToPublicPool.completionPercentage}%</span>
178 |             </div>
179 |             <Progress value={activeBranch.progressToPublicPool.completionPercentage} className="h-2" />
180 |           </div>
181 |           <div className="space-y-2">
182 |             {activeBranch.progressToPublicPool.requirements.map((req, index) => (
183 |               <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
184 |                 <div className={`w-4 h-4 rounded-full ${req.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
185 |                 <div className="flex-1">
186 |                   <div className="font-medium text-sm">{req.name}</div>
187 |                   <div className="text-xs text-gray-600">{req.description}</div>
188 |                 </div>
189 |                 {req.completed && <Award className="w-4 h-4 text-green-600" />}
190 |               </div>
191 |             ))}
192 |           </div>
193 |         </CardContent>
194 |       </Card>
195 |     </div>
196 |   );
197 | 
198 |   const renderAIConfiguration = () => (
199 |     <div className="space-y-6">
200 |       <Card>
201 |         <CardHeader>
202 |           <CardTitle className="flex items-center gap-2">
203 |             <Bot className="w-5 h-5" />
204 |             AI Agent Configuration
205 |           </CardTitle>
206 |         </CardHeader>
207 |         <CardContent>
208 |           <div className="space-y-4">
209 |             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
210 |               <div>
211 |                 <div className="font-medium">{activeBranch.aiAgent.name}</div>
212 |                 <div className="text-sm text-gray-600">Personal AI Agent</div>
213 |               </div>
214 |               <Badge variant={activeBranch.aiAgent.status === 'active' ? 'default' : 'secondary'}>
215 |                 {activeBranch.aiAgent.status}
216 |               </Badge>
217 |             </div>
218 | 
219 |             <div>
220 |               <h4 className="font-medium mb-2">Personality Traits</h4>
221 |               <div className="flex flex-wrap gap-2">
222 |                 {activeBranch.aiAgent.personalityTraits.map(trait => (
223 |                   <Badge key={trait} variant="outline">{trait}</Badge>
224 |                 ))}
225 |               </div>
226 |             </div>
227 | 
228 |             <div>
229 |               <h4 className="font-medium mb-2">Decision Making Style</h4>
230 |               <Badge>{activeBranch.aiAgent.decisionMaking}</Badge>
231 |             </div>
232 | 
233 |             <div>
234 |               <h4 className="font-medium mb-2">Deployment Scope</h4>
235 |               <div className="flex flex-wrap gap-2">
236 |                 {activeBranch.aiAgent.deploymentScope.map(scope => (
237 |                   <Badge key={scope} variant="outline">{scope}</Badge>
238 |                 ))}
239 |               </div>
240 |             </div>
241 | 
242 |             <div className="flex gap-2 mt-4">
243 |               <Button variant="outline" size="sm">
244 |                 <Settings className="w-4 h-4 mr-2" />
245 |                 Configure
246 |               </Button>
247 |               <Button variant="outline" size="sm">
248 |                 <BarChart3 className="w-4 h-4 mr-2" />
249 |                 Performance
250 |               </Button>
251 |             </div>
252 |           </div>
253 |         </CardContent>
254 |       </Card>
255 |     </div>
256 |   );
257 | 
258 |   const renderTermDevelopment = () => (
259 |     <div className="space-y-6">
260 |       <Card>
261 |         <CardHeader>
262 |           <CardTitle className="flex items-center gap-2">
263 |             <FileText className="w-5 h-5" />
264 |             Personal Term Development
265 |           </CardTitle>
266 |         </CardHeader>
267 |         <CardContent>
268 |           <div className="space-y-4">
269 |             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
270 |               <div className="text-center">
271 |                 <div className="text-2xl font-bold text-blue-600">{activeBranch.contributions.termsProposed}</div>
272 |                 <div className="text-sm text-gray-600">Terms Proposed</div>
273 |               </div>
274 |               <div className="text-center">
275 |                 <div className="text-2xl font-bold text-green-600">{activeBranch.contributions.discussionsParticipated}</div>
276 |                 <div className="text-sm text-gray-600">Discussions</div>
277 |               </div>
278 |               <div className="text-center">
279 |                 <div className="text-2xl font-bold text-purple-600">{activeBranch.contributions.proposalsSubmitted}</div>
280 |                 <div className="text-sm text-gray-600">Proposals</div>
281 |               </div>
282 |               <div className="text-center">
283 |                 <div className="text-2xl font-bold text-orange-600">{activeBranch.contributions.votesParticipated}</div>
284 |                 <div className="text-sm text-gray-600">Votes Cast</div>
285 |               </div>
286 |             </div>
287 | 
288 |             <div className="border-t pt-4">
289 |               <h4 className="font-medium mb-2">Quick Actions</h4>
290 |               <div className="grid grid-cols-2 gap-2">
291 |                 <Button variant="outline" size="sm">
292 |                   <FileText className="w-4 h-4 mr-2" />
293 |                   Draft New Term
294 |                 </Button>
295 |                 <Button variant="outline" size="sm">
296 |                   <MessageSquare className="w-4 h-4 mr-2" />
297 |                   Join Discussion
298 |                 </Button>
299 |                 <Button variant="outline" size="sm">
300 |                   <Upload className="w-4 h-4 mr-2" />
301 |                   Submit to Public Pool
302 |                 </Button>
303 |                 <Button variant="outline" size="sm">
304 |                   <BarChart3 className="w-4 h-4 mr-2" />
305 |                   View Analytics
306 |                 </Button>
307 |               </div>
308 |             </div>
309 |           </div>
310 |         </CardContent>
311 |       </Card>
312 |     </div>
313 |   );
314 | 
315 |   return (
316 |     <div className="max-w-6xl mx-auto space-y-6">
317 |       {/* Branch Selector */}
318 |       <Card>
319 |         <CardHeader>
320 |           <div className="flex items-center justify-between">
321 |             <CardTitle className="flex items-center gap-2">
322 |               <GitBranch className="w-5 h-5" />
323 |               Personal Workspace
324 |             </CardTitle>
325 |             <Button onClick={onCreateNewBranch} size="sm">
326 |               <GitBranch className="w-4 h-4 mr-2" />
327 |               New Branch
328 |             </Button>
329 |           </div>
330 |         </CardHeader>
331 |         <CardContent>
332 |           <div className="flex flex-wrap gap-2">
333 |             {personalBranches.map((branch) => (
334 |               <Button
335 |                 key={branch.id}
336 |                 variant={activeBranchId === branch.id ? 'default' : 'outline'}
337 |                 size="sm"
338 |                 onClick={() => onSwitchBranch(branch.id)}
339 |               >
340 |                 {branch.name}
341 |                 <Badge variant="secondary" className="ml-2 text-xs">
342 |                   {branch.status}
343 |                 </Badge>
344 |               </Button>
345 |             ))}
346 |           </div>
347 |         </CardContent>
348 |       </Card>
349 | 
350 |       {/* Active Branch Details */}
351 |       <Tabs value={selectedTab} onValueChange={setSelectedTab}>
352 |         <TabsList className="grid w-full grid-cols-3">
353 |           <TabsTrigger value="overview">Overview</TabsTrigger>
354 |           <TabsTrigger value="ai-config">AI Configuration</TabsTrigger>
355 |           <TabsTrigger value="term-dev">Term Development</TabsTrigger>
356 |         </TabsList>
357 |         
358 |         <TabsContent value="overview" className="mt-6">
359 |           {renderOverview()}
360 |         </TabsContent>
361 |         
362 |         <TabsContent value="ai-config" className="mt-6">
363 |           {renderAIConfiguration()}
364 |         </TabsContent>
365 |         
366 |         <TabsContent value="term-dev" className="mt-6">
367 |           {renderTermDevelopment()}
368 |         </TabsContent>
369 |       </Tabs>
370 |     </div>
371 |   );
372 | }
```

## File: src/components/forum/PrinciplesView.tsx

- Extension: .tsx
- Language: typescript
- Size: 14556 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { Card } from '@/components/ui/card';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Shield, ExternalLink, GitBranch } from 'lucide-react';
  7 | import { GovernancePrinciple } from '@/types/governance';
  8 | 
  9 | interface PrinciplesViewProps {
 10 |   principles: GovernancePrinciple[];
 11 |   organizationName: string;
 12 | }
 13 | 
 14 | export function PrinciplesView({ principles, organizationName }: PrinciplesViewProps) {
 15 |   if (!principles || principles.length === 0) {
 16 |     return (
 17 |       <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
 18 |         <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
 19 |         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Principles Found</h3>
 20 |         <p className="text-gray-600">No principles have been defined for {organizationName} yet.</p>
 21 |       </div>
 22 |     );
 23 |   }
 24 | 
 25 |   return (
 26 |     <div className="space-y-4">
 27 |       <div className="flex items-center justify-between mb-6">
 28 |         <div>
 29 |           <h3 className="text-xl font-semibold text-gray-900">{organizationName} Principles</h3>
 30 |           <p className="text-gray-600 mt-1">{principles.length} principle{principles.length !== 1 ? 's' : ''} defined</p>
 31 |         </div>
 32 |         <Badge variant="outline" className="text-sm">
 33 |           <Shield className="w-3 h-3 mr-1" />
 34 |           Governance Framework
 35 |         </Badge>
 36 |       </div>
 37 | 
 38 |       <div className="grid gap-4">
 39 |         {principles.map((principle, index) => (
 40 |           <Card key={`${principle.principle_id}-${index}`} className="p-6 hover:shadow-md transition-shadow">
 41 |             <div className="flex items-start justify-between mb-4">
 42 |               <div className="flex-1">
 43 |                 <div className="flex items-center gap-3 mb-2">
 44 |                   <h4 className="text-lg font-semibold text-gray-900">
 45 |                     {principle.name || principle.principle_id}
 46 |                   </h4>
 47 |                   <Badge className="bg-blue-100 text-blue-700 border-0">
 48 |                     v{principle.version}
 49 |                   </Badge>
 50 |                   {principle.category && (
 51 |                     <Badge variant="outline" className="text-xs">
 52 |                       {principle.category.replace(/_/g, ' ')}
 53 |                     </Badge>
 54 |                   )}
 55 |                 </div>
 56 |                 
 57 |                 {principle.description && (
 58 |                   <p className="text-gray-600 mb-4 leading-relaxed">
 59 |                     {principle.description}
 60 |                   </p>
 61 |                 )}
 62 | 
 63 |                 {/* Requirements */}
 64 |                 {(principle as any).requirements && (
 65 |                   <div className="space-y-3">
 66 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
 67 |                       <GitBranch className="w-4 h-4" />
 68 |                       Requirements
 69 |                     </h5>
 70 |                     
 71 |                     <div className="bg-gray-50 rounded-lg p-4 space-y-3">
 72 |                       {Object.entries((principle as any).requirements).map(([key, value]: [string, any]) => (
 73 |                         <div key={key} className="border-l-2 border-blue-200 pl-3">
 74 |                           <h6 className="font-medium text-sm text-gray-800 mb-1">
 75 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
 76 |                           </h6>
 77 |                           {typeof value === 'object' && value !== null ? (
 78 |                             <div className="text-sm text-gray-600 space-y-1">
 79 |                               {Object.entries(value).map(([subKey, subValue]) => (
 80 |                                 <div key={subKey} className="flex flex-col sm:flex-row sm:justify-between">
 81 |                                   <span className="font-medium">{subKey.replace(/_/g, ' ')}:</span>
 82 |                                   <span className="text-right">{typeof subValue === 'boolean' ? (subValue ? '✅ Required' : '❌ Optional') : String(subValue)}</span>
 83 |                                 </div>
 84 |                               ))}
 85 |                             </div>
 86 |                           ) : (
 87 |                             <p className="text-sm text-gray-600">{String(value)}</p>
 88 |                           )}
 89 |                         </div>
 90 |                       ))}
 91 |                     </div>
 92 |                   </div>
 93 |                 )}
 94 | 
 95 |                 {/* Validation Rules */}
 96 |                 {(principle as any).validation_rules && (
 97 |                   <div className="space-y-3">
 98 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
 99 |                       <Shield className="w-4 h-4" />
100 |                       Validation Rules
101 |                     </h5>
102 |                     
103 |                     <div className="bg-blue-50 rounded-lg p-4 space-y-3">
104 |                       {Object.entries((principle as any).validation_rules).map(([key, value]: [string, any]) => (
105 |                         <div key={key} className="border-l-2 border-blue-300 pl-3">
106 |                           <h6 className="font-medium text-sm text-blue-800 mb-2">
107 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
108 |                           </h6>
109 |                           {Array.isArray(value) ? (
110 |                             <ul className="text-sm text-blue-700 space-y-1">
111 |                               {value.map((item: string, index: number) => (
112 |                                 <li key={index} className="flex items-start gap-2">
113 |                                   <span className="text-blue-500">•</span>
114 |                                   <span>{item}</span>
115 |                                 </li>
116 |                               ))}
117 |                             </ul>
118 |                           ) : (
119 |                             <p className="text-sm text-blue-700">{String(value)}</p>
120 |                           )}
121 |                         </div>
122 |                       ))}
123 |                     </div>
124 |                   </div>
125 |                 )}
126 | 
127 |                 {/* Examples */}
128 |                 {(principle as any).examples && (
129 |                   <div className="space-y-3">
130 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
131 |                       <ExternalLink className="w-4 h-4" />
132 |                       Examples
133 |                     </h5>
134 |                     
135 |                     <div className="grid md:grid-cols-2 gap-4">
136 |                       {Object.entries((principle as any).examples).map(([type, examples]: [string, any]) => (
137 |                         <div key={type} className={`rounded-lg p-4 ${type === 'good' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
138 |                           <h6 className={`font-medium text-sm mb-2 ${type === 'good' ? 'text-green-800' : 'text-red-800'}`}>
139 |                             {type === 'good' ? '✅ Good Examples' : '❌ Bad Examples'}
140 |                           </h6>
141 |                           {Array.isArray(examples) ? (
142 |                             <ul className={`text-sm space-y-1 ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>
143 |                               {examples.map((example: string, index: number) => (
144 |                                 <li key={index} className="flex items-start gap-2">
145 |                                   <span className={type === 'good' ? 'text-green-500' : 'text-red-500'}>•</span>
146 |                                   <span>{example}</span>
147 |                                 </li>
148 |                               ))}
149 |                             </ul>
150 |                           ) : (
151 |                             <p className={`text-sm ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>{String(examples)}</p>
152 |                           )}
153 |                         </div>
154 |                       ))}
155 |                     </div>
156 |                   </div>
157 |                 )}
158 | 
159 |                 {/* Cross Domain Applications */}
160 |                 {(principle as any).cross_domain_applications && (
161 |                   <div className="space-y-3">
162 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
163 |                       <ExternalLink className="w-4 h-4" />
164 |                       Cross-Domain Applications
165 |                     </h5>
166 |                     
167 |                     <div className="bg-purple-50 rounded-lg p-4 space-y-2">
168 |                       {Object.entries((principle as any).cross_domain_applications).map(([domain, application]: [string, any]) => (
169 |                         <div key={domain} className="flex items-center justify-between py-2 border-b border-purple-200 last:border-b-0">
170 |                           <span className="font-medium text-purple-800 capitalize">{domain.replace(/_/g, ' ')}</span>
171 |                           <span className="text-sm text-purple-700">{String(application)}</span>
172 |                         </div>
173 |                       ))}
174 |                     </div>
175 |                   </div>
176 |                 )}
177 | 
178 |                 {/* Changelog */}
179 |                 {(principle as any).changelog && (
180 |                   <div className="space-y-3">
181 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
182 |                       <GitBranch className="w-4 h-4" />
183 |                       Version History
184 |                     </h5>
185 |                     
186 |                     <div className="bg-gray-50 rounded-lg p-4 space-y-3">
187 |                       {Object.entries((principle as any).changelog).reverse().map(([version, changes]: [string, any]) => (
188 |                         <div key={version} className="border-l-2 border-gray-300 pl-3">
189 |                           <div className="flex items-center gap-3 mb-2">
190 |                             <h6 className="font-medium text-sm text-gray-800">Version {version}</h6>
191 |                             {changes.date && (
192 |                               <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{changes.date}</span>
193 |                             )}
194 |                           </div>
195 |                           {changes.changes && Array.isArray(changes.changes) && (
196 |                             <ul className="text-sm text-gray-600 space-y-1 mb-2">
197 |                               {changes.changes.map((change: string, index: number) => (
198 |                                 <li key={index} className="flex items-start gap-2">
199 |                                   <span className="text-gray-400">•</span>
200 |                                   <span>{change}</span>
201 |                                 </li>
202 |                               ))}
203 |                             </ul>
204 |                           )}
205 |                           {changes.approved_by && (
206 |                             <p className="text-xs text-gray-500">
207 |                               Approved by: <span className="font-medium">{changes.approved_by.replace(/_/g, ' ')}</span>
208 |                             </p>
209 |                           )}
210 |                         </div>
211 |                       ))}
212 |                     </div>
213 |                   </div>
214 |                 )}
215 | 
216 |                 {/* Cross References */}
217 |                 {(principle as any).cross_references && (
218 |                   <div className="mt-4 pt-4 border-t border-gray-200">
219 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
220 |                       <ExternalLink className="w-4 h-4" />
221 |                       Cross References
222 |                     </h5>
223 |                     
224 |                     <div className="space-y-2">
225 |                       {(principle as any).cross_references.extends && (
226 |                         <div>
227 |                           <span className="text-sm font-medium text-green-700">Extends:</span>
228 |                           <div className="ml-4 space-y-1">
229 |                             {(principle as any).cross_references.extends.map((ref: any, i: number) => (
230 |                               <div key={i} className="text-sm text-gray-600">
231 |                                 {ref.principle} v{ref.version} - {ref.application}
232 |                               </div>
233 |                             ))}
234 |                           </div>
235 |                         </div>
236 |                       )}
237 |                       
238 |                       {(principle as any).cross_references.coordinates_with && (
239 |                         <div>
240 |                           <span className="text-sm font-medium text-blue-700">Coordinates with:</span>
241 |                           <div className="ml-4 space-y-1">
242 |                             {(principle as any).cross_references.coordinates_with.map((ref: any, i: number) => (
243 |                               <div key={i} className="text-sm text-gray-600">
244 |                                 {ref.domain} → {ref.principle} v{ref.version}
245 |                               </div>
246 |                             ))}
247 |                           </div>
248 |                         </div>
249 |                       )}
250 |                     </div>
251 |                   </div>
252 |                 )}
253 | 
254 |                 {/* Validation Metrics */}
255 |                 {(principle as any).validation_metrics && (
256 |                   <div className="mt-4 pt-4 border-t border-gray-200">
257 |                     <h5 className="font-medium text-gray-900 mb-3">Validation Metrics</h5>
258 |                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
259 |                       {Object.entries((principle as any).validation_metrics).map(([key, value]) => (
260 |                         <div key={key} className="bg-blue-50 rounded p-3">
261 |                           <div className="font-medium text-blue-900 mb-1">
262 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
263 |                           </div>
264 |                           {typeof value === 'object' && value !== null ? (
265 |                             <div className="space-y-1">
266 |                               {Object.entries(value).map(([subKey, subValue]) => (
267 |                                 <div key={subKey} className="text-blue-700">
268 |                                   {subKey.replace(/_/g, ' ')}: {String(subValue)}
269 |                                 </div>
270 |                               ))}
271 |                             </div>
272 |                           ) : (
273 |                             <div className="text-blue-700">{String(value)}</div>
274 |                           )}
275 |                         </div>
276 |                       ))}
277 |                     </div>
278 |                   </div>
279 |                 )}
280 |               </div>
281 |             </div>
282 |           </Card>
283 |         ))}
284 |       </div>
285 |     </div>
286 |   );
287 | }
```

## File: src/components/forum/PrinciplesViewWithInheritance.tsx

- Extension: .tsx
- Language: typescript
- Size: 22977 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card } from '@/components/ui/card';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Button } from '@/components/ui/button';
  7 | import { Shield, ExternalLink, GitBranch, Layers, Filter, Info } from 'lucide-react';
  8 | import { GovernancePrinciple } from '@/types/governance';
  9 | 
 10 | interface PrinciplesViewProps {
 11 |   principles: GovernancePrinciple[];
 12 |   organizationName: string;
 13 |   organizationId?: string;
 14 | }
 15 | 
 16 | export function PrinciplesViewWithInheritance({ principles, organizationName, organizationId }: PrinciplesViewProps) {
 17 |   const [filter, setFilter] = useState<'all' | 'inherited' | 'domain'>('all');
 18 |   
 19 |   if (!principles || principles.length === 0) {
 20 |     return (
 21 |       <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
 22 |         <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
 23 |         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Principles Found</h3>
 24 |         <p className="text-gray-600">No principles have been defined for {organizationName} yet.</p>
 25 |       </div>
 26 |     );
 27 |   }
 28 |   
 29 |   // Categorize principles by inheritance
 30 |   const inheritedPrinciples = principles.filter(p => p.is_inherited);
 31 |   const domainPrinciples = principles.filter(p => !p.is_inherited);
 32 |   
 33 |   const filteredPrinciples = 
 34 |     filter === 'inherited' ? inheritedPrinciples :
 35 |     filter === 'domain' ? domainPrinciples :
 36 |     principles;
 37 | 
 38 |   return (
 39 |     <div className="space-y-4">
 40 |       <div className="flex items-center justify-between mb-6">
 41 |         <div>
 42 |           <h3 className="text-xl font-semibold text-gray-900">{organizationName} Principles</h3>
 43 |           <div className="flex items-center gap-4 mt-1">
 44 |             <p className="text-gray-600">{principles.length} principle{principles.length !== 1 ? 's' : ''} defined</p>
 45 |             {inheritedPrinciples.length > 0 && (
 46 |               <div className="flex items-center gap-1 text-sm text-blue-600">
 47 |                 <Layers className="w-3 h-3" />
 48 |                 <span>{inheritedPrinciples.length} inherited</span>
 49 |               </div>
 50 |             )}
 51 |             {domainPrinciples.length > 0 && (
 52 |               <div className="flex items-center gap-1 text-sm text-green-600">
 53 |                 <Shield className="w-3 h-3" />
 54 |                 <span>{domainPrinciples.length} domain-specific</span>
 55 |               </div>
 56 |             )}
 57 |           </div>
 58 |         </div>
 59 |         <div className="flex items-center gap-2">
 60 |           <div className="flex rounded-lg border border-gray-200 overflow-hidden">
 61 |             <Button
 62 |               variant={filter === 'all' ? 'default' : 'ghost'}
 63 |               size="sm"
 64 |               onClick={() => setFilter('all')}
 65 |               className="rounded-none"
 66 |             >
 67 |               All ({principles.length})
 68 |             </Button>
 69 |             <Button
 70 |               variant={filter === 'inherited' ? 'default' : 'ghost'}
 71 |               size="sm"
 72 |               onClick={() => setFilter('inherited')}
 73 |               className="rounded-none border-l"
 74 |             >
 75 |               <Layers className="w-3 h-3 mr-1" />
 76 |               Inherited ({inheritedPrinciples.length})
 77 |             </Button>
 78 |             <Button
 79 |               variant={filter === 'domain' ? 'default' : 'ghost'}
 80 |               size="sm"
 81 |               onClick={() => setFilter('domain')}
 82 |               className="rounded-none border-l"
 83 |             >
 84 |               <Shield className="w-3 h-3 mr-1" />
 85 |               Domain ({domainPrinciples.length})
 86 |             </Button>
 87 |           </div>
 88 |         </div>
 89 |       </div>
 90 | 
 91 |       <div className="grid gap-4">
 92 |         {filteredPrinciples.map((principle, index) => (
 93 |           <Card 
 94 |             key={`${principle.principle_id}-${index}`} 
 95 |             className={`p-6 hover:shadow-md transition-shadow border-l-4 ${
 96 |               principle.is_inherited 
 97 |                 ? 'border-l-blue-400 bg-blue-50/30' 
 98 |                 : 'border-l-green-400 bg-green-50/30'
 99 |             }`}
100 |           >
101 |             <div className="flex items-start justify-between mb-4">
102 |               <div className="flex-1">
103 |                 <div className="flex items-center gap-3 mb-2">
104 |                   <h4 className="text-lg font-semibold text-gray-900">
105 |                     {principle.name || principle.principle_id}
106 |                   </h4>
107 |                   <Badge className="bg-blue-100 text-blue-700 border-0">
108 |                     v{principle.version}
109 |                   </Badge>
110 |                   {principle.category && (
111 |                     <Badge variant="outline" className="text-xs">
112 |                       {principle.category.replace(/_/g, ' ')}
113 |                     </Badge>
114 |                   )}
115 |                   
116 |                   {/* Inheritance indicator */}
117 |                   {principle.is_inherited ? (
118 |                     <Badge className="bg-blue-100 text-blue-700 border-blue-200">
119 |                       <Layers className="w-3 h-3 mr-1" />
120 |                       Inherited from {principle.inheritance_source}
121 |                     </Badge>
122 |                   ) : (
123 |                     <Badge className="bg-green-100 text-green-700 border-green-200">
124 |                       <Shield className="w-3 h-3 mr-1" />
125 |                       Domain-specific
126 |                     </Badge>
127 |                   )}
128 |                   
129 |                   {/* Inheritance modification indicator */}
130 |                   {principle.inheritance_modification && (
131 |                     <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
132 |                       <Info className="w-3 h-3 mr-1" />
133 |                       Modified: {principle.inheritance_modification.replace('inherited_', '').replace(/_/g, ' ')}
134 |                     </Badge>
135 |                   )}
136 |                 </div>
137 |                 
138 |                 {principle.description && (
139 |                   <p className="text-gray-600 mb-4 leading-relaxed">
140 |                     {principle.description}
141 |                   </p>
142 |                 )}
143 |                 
144 |                 {/* Domain-specific structure handling */}
145 |                 {principle.freedoms && (
146 |                   <div className="space-y-3">
147 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
148 |                       <Shield className="w-4 h-4" />
149 |                       Five Freedoms Framework
150 |                     </h5>
151 |                     
152 |                     <div className="grid gap-3">
153 |                       {Object.entries(principle.freedoms).map(([freedomKey, freedom]: [string, any]) => (
154 |                         <div key={freedomKey} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
155 |                           <h6 className="font-medium text-amber-900 mb-2">
156 |                             {freedomKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
157 |                           </h6>
158 |                           <p className="text-sm text-amber-800 mb-3">{freedom.description}</p>
159 |                           
160 |                           {freedom.requirements && (
161 |                             <div className="mb-2">
162 |                               <span className="text-xs font-medium text-amber-700">Requirements:</span>
163 |                               <ul className="text-xs text-amber-700 mt-1 space-y-1">
164 |                                 {freedom.requirements.map((req: string, i: number) => (
165 |                                   <li key={i} className="flex items-start gap-1">
166 |                                     <span className="text-amber-500">•</span>
167 |                                     <span>{req}</span>
168 |                                   </li>
169 |                                 ))}
170 |                               </ul>
171 |                             </div>
172 |                           )}
173 |                           
174 |                           {freedom.indicators && (
175 |                             <div>
176 |                               <span className="text-xs font-medium text-amber-700">Indicators:</span>
177 |                               <div className="flex flex-wrap gap-1 mt-1">
178 |                                 {freedom.indicators.map((indicator: string, i: number) => (
179 |                                   <Badge key={i} variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-300">
180 |                                     {indicator.replace(/_/g, ' ')}
181 |                                   </Badge>
182 |                                 ))}
183 |                               </div>
184 |                             </div>
185 |                           )}
186 |                         </div>
187 |                       ))}
188 |                     </div>
189 |                   </div>
190 |                 )}
191 |                 
192 |                 {/* Environment-specific ecosystem framework */}
193 |                 {principle.ecosystem_assessment_framework && (
194 |                   <div className="space-y-3">
195 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
196 |                       <Shield className="w-4 h-4" />
197 |                       Ecosystem Assessment Framework
198 |                     </h5>
199 |                     
200 |                     {Object.entries(principle.ecosystem_assessment_framework).map(([frameworkKey, framework]: [string, any]) => (
201 |                       <div key={frameworkKey} className="bg-green-50 rounded-lg p-4 border border-green-200">
202 |                         <h6 className="font-medium text-green-900 mb-2">
203 |                           {frameworkKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
204 |                         </h6>
205 |                         {framework.description && (
206 |                           <p className="text-sm text-green-800 mb-3">{framework.description}</p>
207 |                         )}
208 |                         
209 |                         {framework.metrics && (
210 |                           <div className="space-y-2">
211 |                             {Object.entries(framework.metrics).map(([metricKey, metric]: [string, any]) => (
212 |                               <div key={metricKey} className="border-l-2 border-green-300 pl-3">
213 |                                 <span className="text-sm font-medium text-green-800">
214 |                                   {metricKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
215 |                                 </span>
216 |                                 {typeof metric === 'object' ? (
217 |                                   <div className="mt-1 space-y-1">
218 |                                     {Object.entries(metric).map(([subKey, subValue]) => (
219 |                                       <div key={subKey} className="text-xs text-green-700">
220 |                                         <span className="font-medium">{subKey.replace(/_/g, ' ')}:</span> {String(subValue)}
221 |                                       </div>
222 |                                     ))}
223 |                                   </div>
224 |                                 ) : (
225 |                                   <p className="text-xs text-green-700 mt-1">{String(metric)}</p>
226 |                                 )}
227 |                               </div>
228 |                             ))}
229 |                           </div>
230 |                         )}
231 |                       </div>
232 |                     ))}
233 |                   </div>
234 |                 )}
235 | 
236 |                 {/* Requirements */}
237 |                 {(principle as any).requirements && (
238 |                   <div className="space-y-3">
239 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
240 |                       <GitBranch className="w-4 h-4" />
241 |                       Requirements
242 |                     </h5>
243 |                     
244 |                     <div className="bg-gray-50 rounded-lg p-4 space-y-3">
245 |                       {Object.entries((principle as any).requirements).map(([key, value]: [string, any]) => (
246 |                         <div key={key} className="border-l-2 border-blue-200 pl-3">
247 |                           <h6 className="font-medium text-sm text-gray-800 mb-1">
248 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
249 |                           </h6>
250 |                           {typeof value === 'object' && value !== null ? (
251 |                             <div className="text-sm text-gray-600 space-y-1">
252 |                               {Object.entries(value).map(([subKey, subValue]) => (
253 |                                 <div key={subKey} className="flex flex-col sm:flex-row sm:justify-between">
254 |                                   <span className="font-medium">{subKey.replace(/_/g, ' ')}:</span>
255 |                                   <span className="text-right">{typeof subValue === 'boolean' ? (subValue ? '✅ Required' : '❌ Optional') : String(subValue)}</span>
256 |                                 </div>
257 |                               ))}
258 |                             </div>
259 |                           ) : (
260 |                             <p className="text-sm text-gray-600">{String(value)}</p>
261 |                           )}
262 |                         </div>
263 |                       ))}
264 |                     </div>
265 |                   </div>
266 |                 )}
267 | 
268 |                 {/* Validation Rules */}
269 |                 {(principle as any).validation_rules && (
270 |                   <div className="space-y-3">
271 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
272 |                       <Shield className="w-4 h-4" />
273 |                       Validation Rules
274 |                     </h5>
275 |                     
276 |                     <div className="bg-blue-50 rounded-lg p-4 space-y-3">
277 |                       {Object.entries((principle as any).validation_rules).map(([key, value]: [string, any]) => (
278 |                         <div key={key} className="border-l-2 border-blue-300 pl-3">
279 |                           <h6 className="font-medium text-sm text-blue-800 mb-2">
280 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
281 |                           </h6>
282 |                           {Array.isArray(value) ? (
283 |                             <ul className="text-sm text-blue-700 space-y-1">
284 |                               {value.map((item: string, index: number) => (
285 |                                 <li key={index} className="flex items-start gap-2">
286 |                                   <span className="text-blue-500">•</span>
287 |                                   <span>{item}</span>
288 |                                 </li>
289 |                               ))}
290 |                             </ul>
291 |                           ) : (
292 |                             <p className="text-sm text-blue-700">{String(value)}</p>
293 |                           )}
294 |                         </div>
295 |                       ))}
296 |                     </div>
297 |                   </div>
298 |                 )}
299 | 
300 |                 {/* Examples */}
301 |                 {(principle as any).examples && (
302 |                   <div className="space-y-3">
303 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
304 |                       <ExternalLink className="w-4 h-4" />
305 |                       Examples
306 |                     </h5>
307 |                     
308 |                     <div className="grid md:grid-cols-2 gap-4">
309 |                       {Object.entries((principle as any).examples).map(([type, examples]: [string, any]) => (
310 |                         <div key={type} className={`rounded-lg p-4 ${type === 'good' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
311 |                           <h6 className={`font-medium text-sm mb-2 ${type === 'good' ? 'text-green-800' : 'text-red-800'}`}>
312 |                             {type === 'good' ? '✅ Good Examples' : '❌ Bad Examples'}
313 |                           </h6>
314 |                           {Array.isArray(examples) ? (
315 |                             <ul className={`text-sm space-y-1 ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>
316 |                               {examples.map((example: string, index: number) => (
317 |                                 <li key={index} className="flex items-start gap-2">
318 |                                   <span className={type === 'good' ? 'text-green-500' : 'text-red-500'}>•</span>
319 |                                   <span>{example}</span>
320 |                                 </li>
321 |                               ))}
322 |                             </ul>
323 |                           ) : (
324 |                             <p className={`text-sm ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>{String(examples)}</p>
325 |                           )}
326 |                         </div>
327 |                       ))}
328 |                     </div>
329 |                   </div>
330 |                 )}
331 | 
332 |                 {/* Cross Domain Applications */}
333 |                 {(principle as any).cross_domain_applications && (
334 |                   <div className="space-y-3">
335 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
336 |                       <ExternalLink className="w-4 h-4" />
337 |                       Cross-Domain Applications
338 |                     </h5>
339 |                     
340 |                     <div className="bg-purple-50 rounded-lg p-4 space-y-2">
341 |                       {Object.entries((principle as any).cross_domain_applications).map(([domain, application]: [string, any]) => (
342 |                         <div key={domain} className="flex items-center justify-between py-2 border-b border-purple-200 last:border-b-0">
343 |                           <span className="font-medium text-purple-800 capitalize">{domain.replace(/_/g, ' ')}</span>
344 |                           <span className="text-sm text-purple-700">{String(application)}</span>
345 |                         </div>
346 |                       ))}
347 |                     </div>
348 |                   </div>
349 |                 )}
350 | 
351 |                 {/* Implementation Framework (Animal Welfare) */}
352 |                 {principle.implementation && (
353 |                   <div className="mt-4 pt-4 border-t border-gray-200">
354 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
355 |                       <Shield className="w-4 h-4" />
356 |                       Implementation Framework
357 |                     </h5>
358 |                     
359 |                     <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
360 |                       {Object.entries(principle.implementation).map(([key, value]) => (
361 |                         <div key={key} className="flex justify-between items-center">
362 |                           <span className="text-sm font-medium text-indigo-900">
363 |                             {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
364 |                           </span>
365 |                           <span className="text-sm text-indigo-700">{String(value)}</span>
366 |                         </div>
367 |                       ))}
368 |                     </div>
369 |                   </div>
370 |                 )}
371 | 
372 |                 {/* Extension Configuration Info */}
373 |                 {principle.extension_config && (
374 |                   <div className="mt-4 pt-4 border-t border-gray-200">
375 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
376 |                       <GitBranch className="w-4 h-4" />
377 |                       Extension Configuration
378 |                     </h5>
379 |                     
380 |                     <div className="bg-purple-50 rounded-lg p-3">
381 |                       <div className="flex justify-between items-center text-sm">
382 |                         <span className="font-medium text-purple-900">Status:</span>
383 |                         <Badge className={`text-xs ${
384 |                           (principle.extension_config as any).status === 'core_to_domain'
385 |                             ? 'bg-blue-100 text-blue-700 border-blue-200'
386 |                             : 'bg-green-100 text-green-700 border-green-200'
387 |                         }`}>
388 |                           {(principle.extension_config as any).status?.replace('_', ' ')}
389 |                         </Badge>
390 |                       </div>
391 |                       {(principle.extension_config as any).description && (
392 |                         <p className="text-sm text-purple-700 mt-2">
393 |                           {(principle.extension_config as any).description}
394 |                         </p>
395 |                       )}
396 |                     </div>
397 |                   </div>
398 |                 )}
399 | 
400 |                 {/* Changelog */}
401 |                 {(principle as any).changelog && (
402 |                   <div className="space-y-3">
403 |                     <h5 className="font-medium text-gray-900 flex items-center gap-2">
404 |                       <GitBranch className="w-4 h-4" />
405 |                       Version History
406 |                     </h5>
407 |                     
408 |                     <div className="bg-gray-50 rounded-lg p-4 space-y-3">
409 |                       {Object.entries((principle as any).changelog).reverse().map(([version, changes]: [string, any]) => (
410 |                         <div key={version} className="border-l-2 border-gray-300 pl-3">
411 |                           <div className="flex items-center gap-3 mb-2">
412 |                             <h6 className="font-medium text-sm text-gray-800">Version {version}</h6>
413 |                             {changes.date && (
414 |                               <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{changes.date}</span>
415 |                             )}
416 |                           </div>
417 |                           {changes.changes && Array.isArray(changes.changes) && (
418 |                             <ul className="text-sm text-gray-600 space-y-1 mb-2">
419 |                               {changes.changes.map((change: string, index: number) => (
420 |                                 <li key={index} className="flex items-start gap-2">
421 |                                   <span className="text-gray-400">•</span>
422 |                                   <span>{change}</span>
423 |                                 </li>
424 |                               ))}
425 |                             </ul>
426 |                           )}
427 |                           {changes.approved_by && (
428 |                             <p className="text-xs text-gray-500">
429 |                               Approved by: <span className="font-medium">{changes.approved_by.replace(/_/g, ' ')}</span>
430 |                             </p>
431 |                           )}
432 |                         </div>
433 |                       ))}
434 |                     </div>
435 |                   </div>
436 |                 )}
437 |               </div>
438 |             </div>
439 |           </Card>
440 |         ))}
441 |       </div>
442 |       
443 |       {filteredPrinciples.length === 0 && (
444 |         <div className="text-center py-8">
445 |           <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
446 |           <h3 className="text-lg font-semibold text-gray-900 mb-2">No {filter} principles found</h3>
447 |           <p className="text-gray-600">
448 |             {filter === 'inherited' ? 'This domain has no inherited principles.' :
449 |              filter === 'domain' ? 'This domain has no domain-specific principles.' :
450 |              'No principles are defined for this domain.'}
451 |           </p>
452 |         </div>
453 |       )}
454 |     </div>
455 |   );
456 | }
```

## File: src/components/forum/RecentDiscussions.tsx

- Extension: .tsx
- Language: typescript
- Size: 4835 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { useRouter } from 'next/navigation';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Users, MessageSquare, Brain } from 'lucide-react';
  7 | import { GovernanceDiscussion } from '@/types/governance';
  8 | import { DiscussionParser } from '@/lib/discussion-parser';
  9 | 
 10 | interface RecentDiscussionsProps {
 11 |   discussions?: GovernanceDiscussion[];
 12 |   onDiscussionSelect?: (discussion: GovernanceDiscussion) => void;
 13 | }
 14 | 
 15 | export function RecentDiscussions({ discussions: rawDiscussions, onDiscussionSelect }: RecentDiscussionsProps) {
 16 |   const router = useRouter();
 17 |   // Default discussions data if none provided
 18 |   const defaultDiscussions = [
 19 |     {
 20 |       id: '1',
 21 |       title: 'Outdoor Access Requirements for Farm Animals',
 22 |       description: 'Mandatory outdoor access for all farm animal welfare certifications, with minimum daily requirements based on species-specific needs.',
 23 |       category: 'Five Freedoms',
 24 |       status: 'Community Review',
 25 |       statusColor: 'blue',
 26 |       timeAgo: '3 days ago',
 27 |       participants: 4,
 28 |       comments: 4,
 29 |       aiAnalyses: 2
 30 |     },
 31 |     {
 32 |       id: '2',
 33 |       title: '24/7 Emergency Response Protocol',
 34 |       description: 'Framework for rapid response to animal welfare emergencies including life-threatening conditions and disaster scenarios.',
 35 |       category: 'Emergency Care',
 36 |       status: 'Draft',
 37 |       statusColor: 'gray',
 38 |       timeAgo: '1 week ago',
 39 |       participants: 0,
 40 |       comments: 0,
 41 |       aiAnalyses: 0
 42 |     }
 43 |   ];
 44 | 
 45 |   // Parse real discussions if provided
 46 |   let discussions = defaultDiscussions;
 47 |   if (rawDiscussions && rawDiscussions.length > 0) {
 48 |     discussions = rawDiscussions
 49 |       .slice(0, 3) // Show most recent 3 discussions
 50 |       .map((discussion, index) => {
 51 |         const parsed = DiscussionParser.parseDiscussion(discussion, index);
 52 |         return {
 53 |           id: parsed.id,
 54 |           title: parsed.title,
 55 |           description: parsed.description,
 56 |           category: parsed.category,
 57 |           status: parsed.status,
 58 |           statusColor: parsed.statusColor,
 59 |           timeAgo: parsed.timeAgo,
 60 |           participants: parsed.participants,
 61 |           comments: parsed.comments,
 62 |           aiAnalyses: parsed.aiAnalyses
 63 |         };
 64 |       });
 65 |   }
 66 | 
 67 |   return (
 68 |     <div className="space-y-3">
 69 |       <h4 className="font-medium text-gray-900 mb-3">Recent Discussions</h4>
 70 | 
 71 |       {discussions.map((discussion) => (
 72 |         <div 
 73 |           key={discussion.id}
 74 |           className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
 75 |           onClick={() => {
 76 |             if (rawDiscussions && rawDiscussions.length > 0) {
 77 |               const originalDiscussion = rawDiscussions.find(d => 
 78 |                 d.title === discussion.title || 
 79 |                 d.summary === discussion.description ||
 80 |                 d.title.toLowerCase().includes(discussion.title.toLowerCase())
 81 |               );
 82 |               
 83 |               if (originalDiscussion && onDiscussionSelect) {
 84 |                 onDiscussionSelect(originalDiscussion);
 85 |               } else {
 86 |                 alert('Discussion content not available');
 87 |               }
 88 |             } else {
 89 |               alert('This is a sample discussion. Full discussion system coming soon!');
 90 |             }
 91 |           }}
 92 |         >
 93 |           <div className="flex items-start justify-between mb-3">
 94 |             <div className="flex items-center gap-2">
 95 |               <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
 96 |               <Badge 
 97 |                 className={`${
 98 |                   discussion.statusColor === 'blue' 
 99 |                     ? 'bg-blue-100 text-blue-700' 
100 |                     : 'bg-gray-100 text-gray-700'
101 |                 } border-0 text-xs`}
102 |               >
103 |                 {discussion.status}
104 |               </Badge>
105 |             </div>
106 |             <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
107 |           </div>
108 |           
109 |           <h4 className="font-medium text-gray-900 mb-2">{discussion.title}</h4>
110 |           
111 |           <p className="text-sm text-gray-600 mb-3 line-clamp-2">
112 |             {discussion.description}
113 |           </p>
114 |           
115 |           <div className="flex items-center gap-4 text-xs text-gray-500">
116 |             <span className="flex items-center gap-1">
117 |               <Users className="w-3 h-3" />
118 |               {discussion.participants} participants
119 |             </span>
120 |             <span className="flex items-center gap-1">
121 |               <MessageSquare className="w-3 h-3" />
122 |               {discussion.comments} comments
123 |             </span>
124 |             <span className="flex items-center gap-1">
125 |               <Brain className="w-3 h-3" />
126 |               {discussion.aiAnalyses} AI analyses
127 |             </span>
128 |           </div>
129 |         </div>
130 |       ))}
131 |     </div>
132 |   );
133 | }
```

## File: src/components/forum/StatsBar.tsx

- Extension: .tsx
- Language: typescript
- Size: 7581 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import { Brain, Users, MessageSquare, TrendingUp, Coins, DollarSign } from 'lucide-react';
  5 | import { GovernanceData } from '@/types/governance';
  6 | import { DiscussionParser } from '@/lib/discussion-parser';
  7 | 
  8 | interface StatsBarProps {
  9 |   governanceData?: GovernanceData;
 10 |   stats?: {
 11 |     activeDAHAOs: number;
 12 |     contributors: number;
 13 |     activeDiscussions: number;
 14 |     consensusRate: number;
 15 |     // NEW: Token Economics Stats
 16 |     totalTokenValue: number;
 17 |     investmentPools: number;
 18 |     tokenHolders: number;
 19 |     averageROI: number;
 20 |   };
 21 | }
 22 | 
 23 | export function StatsBar({ governanceData, stats: providedStats }: StatsBarProps) {
 24 |   // Calculate real stats if governance data is provided
 25 |   let stats = providedStats;
 26 |   if (governanceData && !providedStats && governanceData.organizations && governanceData.discussionsByPrinciple) {
 27 |     stats = DiscussionParser.calculatePlatformStats(
 28 |       governanceData.organizations,
 29 |       governanceData.discussionsByPrinciple
 30 |     );
 31 |   }
 32 |   
 33 |   // Fallback to calculated stats from governance data
 34 |   if (!stats) {
 35 |     const orgCount = governanceData?.organizations?.length || 0;
 36 |     const allDiscussions = governanceData?.discussionsByPrinciple 
 37 |       ? Object.values(governanceData.discussionsByPrinciple).flat() 
 38 |       : [];
 39 |     
 40 |     // Count unique contributors from discussions
 41 |     const contributors = new Set<string>();
 42 |     allDiscussions.forEach(discussion => {
 43 |       if (discussion?.author && discussion.author !== 'unknown') {
 44 |         contributors.add(discussion.author);
 45 |       }
 46 |     });
 47 |     
 48 |     // Count active discussions
 49 |     const activeDiscussions = allDiscussions.filter(discussion => 
 50 |       discussion?.status && (
 51 |         discussion.status.toLowerCase().includes('active') ||
 52 |         discussion.status.toLowerCase().includes('discussion') ||
 53 |         discussion.status.toLowerCase().includes('review')
 54 |       )
 55 |     ).length;
 56 |     
 57 |     // Calculate consensus rate from discussions with approval data
 58 |     const discussionsWithApproval = allDiscussions.filter(d => 
 59 |       d?.content?.includes('approval') || d?.content?.includes('✅')
 60 |     );
 61 |     
 62 |     let consensusRate = 85; // Default fallback
 63 |     if (discussionsWithApproval.length > 0) {
 64 |       const approvalRates: number[] = [];
 65 |       discussionsWithApproval.forEach(discussion => {
 66 |         const match = discussion.content?.match(/(\d+)%\s*(approval|consensus)/i);
 67 |         if (match) {
 68 |           approvalRates.push(parseInt(match[1]));
 69 |         }
 70 |       });
 71 |       
 72 |       if (approvalRates.length > 0) {
 73 |         consensusRate = Math.round(approvalRates.reduce((a, b) => a + b, 0) / approvalRates.length);
 74 |       }
 75 |     }
 76 |     
 77 |     stats = {
 78 |       activeDAHAOs: orgCount,
 79 |       contributors: Math.max(contributors.size, 5), // Show at least 5 if we have data
 80 |       activeDiscussions: Math.max(activeDiscussions, 1),
 81 |       consensusRate,
 82 |       // Token Economics Mock Data (would be from API in production)
 83 |       totalTokenValue: 2500000, // $2.5M total token value
 84 |       investmentPools: orgCount * 3, // 3 pools per DAHAO on average
 85 |       tokenHolders: Math.max(contributors.size * 4, 50), // 4x contributors are token holders
 86 |       averageROI: 18.5 // 18.5% average ROI
 87 |     };
 88 |   }
 89 |   return (
 90 |     <div className="container mx-auto px-6 -mt-6 mb-12">
 91 |       <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
 92 |         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
 93 |           <div className="text-center">
 94 |             <div className="flex items-center justify-center gap-2 mb-2">
 95 |               <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
 96 |                 <Brain className="w-5 h-5 text-blue-600" />
 97 |               </div>
 98 |               <span className="text-3xl font-bold text-gray-900">{stats.activeDAHAOs}</span>
 99 |             </div>
100 |             <p className="text-sm text-gray-600">Active DAHAOs</p>
101 |           </div>
102 |           <div className="text-center">
103 |             <div className="flex items-center justify-center gap-2 mb-2">
104 |               <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
105 |                 <Users className="w-5 h-5 text-green-600" />
106 |               </div>
107 |               <span className="text-3xl font-bold text-gray-900">{stats.contributors}</span>
108 |             </div>
109 |             <p className="text-sm text-gray-600">Contributors</p>
110 |           </div>
111 |           <div className="text-center">
112 |             <div className="flex items-center justify-center gap-2 mb-2">
113 |               <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
114 |                 <MessageSquare className="w-5 h-5 text-purple-600" />
115 |               </div>
116 |               <span className="text-3xl font-bold text-gray-900">{stats.activeDiscussions}</span>
117 |             </div>
118 |             <p className="text-sm text-gray-600">Active Discussions</p>
119 |           </div>
120 |           <div className="text-center">
121 |             <div className="flex items-center justify-center gap-2 mb-2">
122 |               <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
123 |                 <TrendingUp className="w-5 h-5 text-orange-600" />
124 |               </div>
125 |               <span className="text-3xl font-bold text-gray-900">{stats.consensusRate}%</span>
126 |             </div>
127 |             <p className="text-sm text-gray-600">Consensus Rate</p>
128 |           </div>
129 |           {/* Token Economics Stats */}
130 |           <div className="text-center">
131 |             <div className="flex items-center justify-center gap-2 mb-2">
132 |               <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
133 |                 <DollarSign className="w-5 h-5 text-yellow-600" />
134 |               </div>
135 |               <span className="text-2xl font-bold text-gray-900">
136 |                 ${(stats.totalTokenValue / 1000000).toFixed(1)}M
137 |               </span>
138 |             </div>
139 |             <p className="text-sm text-gray-600">Token Value</p>
140 |           </div>
141 |           <div className="text-center">
142 |             <div className="flex items-center justify-center gap-2 mb-2">
143 |               <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
144 |                 <Coins className="w-5 h-5 text-indigo-600" />
145 |               </div>
146 |               <span className="text-3xl font-bold text-gray-900">{stats.investmentPools}</span>
147 |             </div>
148 |             <p className="text-sm text-gray-600">Investment Pools</p>
149 |           </div>
150 |           <div className="text-center">
151 |             <div className="flex items-center justify-center gap-2 mb-2">
152 |               <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
153 |                 <Users className="w-5 h-5 text-emerald-600" />
154 |               </div>
155 |               <span className="text-3xl font-bold text-gray-900">{stats.tokenHolders}</span>
156 |             </div>
157 |             <p className="text-sm text-gray-600">Token Holders</p>
158 |           </div>
159 |           <div className="text-center">
160 |             <div className="flex items-center justify-center gap-2 mb-2">
161 |               <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
162 |                 <TrendingUp className="w-5 h-5 text-rose-600" />
163 |               </div>
164 |               <span className="text-3xl font-bold text-gray-900">{stats.averageROI}%</span>
165 |             </div>
166 |             <p className="text-sm text-gray-600">Average ROI</p>
167 |           </div>
168 |         </div>
169 |       </div>
170 |     </div>
171 |   );
172 | }
```

## File: src/components/forum/TermDiscussionManager.tsx

- Extension: .tsx
- Language: typescript
- Size: 22351 bytes
- Created: 2025-06-13 18:52:38
- Modified: 2025-06-13 18:52:38

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Badge } from '@/components/ui/badge';
  7 | import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  8 | import { Input } from '@/components/ui/input';
  9 | import { Textarea } from '@/components/ui/textarea';
 10 | import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
 11 | import { 
 12 |   FileText, 
 13 |   MessageSquare, 
 14 |   Vote, 
 15 |   Users, 
 16 |   Clock, 
 17 |   TrendingUp,
 18 |   Plus,
 19 |   ArrowRight,
 20 |   CheckCircle,
 21 |   XCircle,
 22 |   AlertCircle,
 23 |   Coins
 24 | } from 'lucide-react';
 25 | import { TermRatificationVoting } from './TermRatificationVoting';
 26 | 
 27 | interface VoteRecord {
 28 |   id: string;
 29 |   voter: {
 30 |     id: string;
 31 |     name: string;
 32 |     type: 'human' | 'personal_ai' | 'system_ai';
 33 |     tokenWeight: number;
 34 |     reputation: number;
 35 |   };
 36 |   vote: 'ratify' | 'reject' | 'abstain';
 37 |   reasoning?: string;
 38 |   timestamp: string;
 39 |   tokensDelegated?: number;
 40 | }
 41 | 
 42 | interface VotingSession {
 43 |   id: string;
 44 |   termName: string;
 45 |   proposalId: string;
 46 |   startDate: string;
 47 |   endDate: string;
 48 |   ratificationThreshold: number; // 0.75 = 75%
 49 |   quorum: number; // 0.30 = 30% of total tokens must participate
 50 |   totalTokensInPlay: number;
 51 |   currentParticipation: number;
 52 |   votes: VoteRecord[];
 53 |   status: 'active' | 'passed' | 'failed' | 'pending';
 54 |   results?: {
 55 |     ratifyTokens: number;
 56 |     rejectTokens: number;
 57 |     abstainTokens: number;
 58 |     ratifyPercentage: number;
 59 |     rejectPercentage: number;
 60 |     participationRate: number;
 61 |   };
 62 | }
 63 | 
 64 | interface TermProposal {
 65 |   id: string;
 66 |   termName: string;
 67 |   proposedDefinition: string;
 68 |   currentDefinition?: string;
 69 |   proposer: {
 70 |     id: string;
 71 |     name: string;
 72 |     branch: string;
 73 |   };
 74 |   status: 'draft' | 'discussion' | 'voting' | 'ratified' | 'rejected';
 75 |   createdAt: string;
 76 |   discussionEndDate?: string;
 77 |   votingEndDate?: string;
 78 |   supportCount: number;
 79 |   opposeCount: number;
 80 |   tokenStake: number;
 81 |   requiredStake: number;
 82 |   domain: string;
 83 |   tags: string[];
 84 |   changeReason: string;
 85 |   ratificationThreshold: number;
 86 |   currentApproval: number;
 87 | }
 88 | 
 89 | interface TermDiscussion {
 90 |   id: string;
 91 |   termProposalId: string;
 92 |   author: {
 93 |     id: string;
 94 |     name: string;
 95 |     type: 'human' | 'personal_ai' | 'system_ai';
 96 |   };
 97 |   content: string;
 98 |   timestamp: string;
 99 |   votes: {
100 |     helpful: number;
101 |     unhelpful: number;
102 |   };
103 |   replies: TermDiscussion[];
104 | }
105 | 
106 | interface TermDiscussionManagerProps {
107 |   organizationId: string;
108 |   currentUser?: {
109 |     id: string;
110 |     name: string;
111 |     tokenBalance: number;
112 |   };
113 |   onNavigateToDiscussions?: (termName: string) => void;
114 | }
115 | 
116 | export function TermDiscussionManager({ organizationId, currentUser, onNavigateToDiscussions }: TermDiscussionManagerProps) {
117 |   const [activeTab, setActiveTab] = useState('active');
118 |   const [selectedProposal, setSelectedProposal] = useState<TermProposal | null>(null);
119 |   const [showNewProposalForm, setShowNewProposalForm] = useState(false);
120 |   const [showDiscussionInterface, setShowDiscussionInterface] = useState(false);
121 |   const [activeVotingSession, setActiveVotingSession] = useState<VotingSession | null>(null);
122 | 
123 |   // Mock data for term proposals
124 |   const mockProposals: TermProposal[] = [
125 |     {
126 |       id: 'prop-1',
127 |       termName: 'wellbeing',
128 |       proposedDefinition: 'A holistic state encompassing physical health, mental contentment, social connection, and environmental harmony, measured through both objective indicators and subjective self-assessment.',
129 |       currentDefinition: 'A state of physical and mental health where basic needs are met.',
130 |       proposer: {
131 |         id: 'user-1',
132 |         name: 'Dr. Sarah Mitchell',
133 |         branch: 'animal-welfare'
134 |       },
135 |       status: 'discussion',
136 |       createdAt: '2024-12-10T10:00:00Z',
137 |       discussionEndDate: '2024-12-20T23:59:59Z',
138 |       supportCount: 23,
139 |       opposeCount: 7,
140 |       tokenStake: 500,
141 |       requiredStake: 100,
142 |       domain: 'core-governance',
143 |       tags: ['ethics', 'measurement', 'holistic'],
144 |       changeReason: 'Current definition is too narrow and doesn\'t account for environmental and social factors',
145 |       ratificationThreshold: 0.75,
146 |       currentApproval: 0.68
147 |     },
148 |     {
149 |       id: 'prop-2',
150 |       termName: 'harm',
151 |       proposedDefinition: 'Any action, policy, or condition that reduces wellbeing, autonomy, or flourishing of sentient beings, including direct physical damage, psychological distress, restriction of natural behaviors, or environmental degradation that affects quality of life.',
152 |       proposer: {
153 |         id: 'user-2',
154 |         name: 'Alex Chen',
155 |         branch: 'environment'
156 |       },
157 |       status: 'voting',
158 |       createdAt: '2024-12-05T14:30:00Z',
159 |       votingEndDate: '2024-12-18T23:59:59Z',
160 |       supportCount: 45,
161 |       opposeCount: 12,
162 |       tokenStake: 750,
163 |       requiredStake: 100,
164 |       domain: 'core-governance',
165 |       tags: ['ethics', 'prevention', 'sentience'],
166 |       changeReason: 'Expansion needed to include environmental and psychological harm',
167 |       ratificationThreshold: 0.75,
168 |       currentApproval: 0.82
169 |     },
170 |     {
171 |       id: 'prop-3',
172 |       termName: 'consensus',
173 |       proposedDefinition: 'Collective agreement reached through inclusive dialogue where all perspectives are heard, concerns addressed, and decisions reflect shared understanding rather than simple majority rule.',
174 |       proposer: {
175 |         id: 'user-3',
176 |         name: 'Maria Santos',
177 |         branch: 'core-governance'
178 |       },
179 |       status: 'ratified',
180 |       createdAt: '2024-11-20T09:15:00Z',
181 |       supportCount: 67,
182 |       opposeCount: 8,
183 |       tokenStake: 300,
184 |       requiredStake: 100,
185 |       domain: 'core-governance',
186 |       tags: ['governance', 'decision-making', 'democracy'],
187 |       changeReason: 'Previous definition was unclear about the process of reaching consensus',
188 |       ratificationThreshold: 0.75,
189 |       currentApproval: 0.89
190 |     }
191 |   ];
192 | 
193 |   const [proposals, setProposals] = useState<TermProposal[]>(mockProposals);
194 | 
195 |   const getStatusColor = (status: TermProposal['status']) => {
196 |     switch (status) {
197 |       case 'draft': return 'bg-gray-100 text-gray-800';
198 |       case 'discussion': return 'bg-blue-100 text-blue-800';
199 |       case 'voting': return 'bg-purple-100 text-purple-800';
200 |       case 'ratified': return 'bg-green-100 text-green-800';
201 |       case 'rejected': return 'bg-red-100 text-red-800';
202 |       default: return 'bg-gray-100 text-gray-800';
203 |     }
204 |   };
205 | 
206 |   const getStatusIcon = (status: TermProposal['status']) => {
207 |     switch (status) {
208 |       case 'discussion': return <MessageSquare className="w-4 h-4" />;
209 |       case 'voting': return <Vote className="w-4 h-4" />;
210 |       case 'ratified': return <CheckCircle className="w-4 h-4" />;
211 |       case 'rejected': return <XCircle className="w-4 h-4" />;
212 |       default: return <FileText className="w-4 h-4" />;
213 |     }
214 |   };
215 | 
216 |   const filterProposals = (status: string) => {
217 |     switch (status) {
218 |       case 'active':
219 |         return proposals.filter(p => ['discussion', 'voting'].includes(p.status));
220 |       case 'completed':
221 |         return proposals.filter(p => ['ratified', 'rejected'].includes(p.status));
222 |       case 'drafts':
223 |         return proposals.filter(p => p.status === 'draft');
224 |       default:
225 |         return proposals;
226 |     }
227 |   };
228 | 
229 |   const getDaysRemaining = (endDate: string) => {
230 |     const end = new Date(endDate);
231 |     const now = new Date();
232 |     const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
233 |     return Math.max(0, diff);
234 |   };
235 | 
236 |   const handleJoinDiscussion = (proposal: TermProposal) => {
237 |     // Navigate to existing discussions tab and find/create discussion for this term
238 |     if (onNavigateToDiscussions) {
239 |       onNavigateToDiscussions(proposal.termName);
240 |     } else {
241 |       // Fallback: show local discussion interface if no navigation callback
242 |       setShowDiscussionInterface(true);
243 |       setSelectedProposal(proposal);
244 |     }
245 |   };
246 | 
247 |   const handleMoveToVoting = (proposal: TermProposal) => {
248 |     // Transition proposal status from 'discussion' to 'voting'
249 |     const updatedProposal = { ...proposal, status: 'voting' as const };
250 |     
251 |     // Update proposals array
252 |     setProposals(prev => prev.map(p => 
253 |       p.id === proposal.id ? updatedProposal : p
254 |     ));
255 |     
256 |     // Create voting session
257 |     const votingSession: VotingSession = {
258 |       id: `voting-${proposal.id}-${Date.now()}`,
259 |       termName: proposal.termName,
260 |       proposalId: proposal.id,
261 |       startDate: new Date().toISOString(),
262 |       endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
263 |       ratificationThreshold: proposal.ratificationThreshold,
264 |       quorum: 0.30, // 30% participation required
265 |       totalTokensInPlay: 10000, // Mock total tokens
266 |       currentParticipation: 0,
267 |       votes: [],
268 |       status: 'active'
269 |     };
270 |     
271 |     setActiveVotingSession(votingSession);
272 |     setSelectedProposal(updatedProposal);
273 |   };
274 | 
275 |   const handleVoteSubmit = (vote: 'ratify' | 'reject' | 'abstain', reasoning?: string) => {
276 |     if (!activeVotingSession || !currentUser) return;
277 | 
278 |     const newVote: VoteRecord = {
279 |       id: `vote-${Date.now()}`,
280 |       voter: {
281 |         id: currentUser.id,
282 |         name: currentUser.name,
283 |         type: 'human',
284 |         tokenWeight: currentUser.tokenBalance,
285 |         reputation: 100 // Mock reputation
286 |       },
287 |       vote,
288 |       reasoning,
289 |       timestamp: new Date().toISOString()
290 |     };
291 | 
292 |     const updatedSession = {
293 |       ...activeVotingSession,
294 |       votes: [...activeVotingSession.votes, newVote],
295 |       currentParticipation: activeVotingSession.currentParticipation + currentUser.tokenBalance
296 |     };
297 | 
298 |     setActiveVotingSession(updatedSession);
299 |   };
300 | 
301 |   const renderProposalCard = (proposal: TermProposal) => (
302 |     <Card key={proposal.id} className="hover:shadow-md transition-shadow cursor-pointer" 
303 |           onClick={() => setSelectedProposal(proposal)}>
304 |       <CardContent className="p-4">
305 |         <div className="flex items-start justify-between mb-3">
306 |           <div className="flex-1">
307 |             <div className="flex items-center gap-2 mb-2">
308 |               <h3 className="font-semibold text-lg">{proposal.termName}</h3>
309 |               <Badge className={getStatusColor(proposal.status)}>
310 |                 {getStatusIcon(proposal.status)}
311 |                 <span className="ml-1">{proposal.status}</span>
312 |               </Badge>
313 |             </div>
314 |             <p className="text-sm text-gray-600 line-clamp-2 mb-2">
315 |               {proposal.proposedDefinition}
316 |             </p>
317 |             <div className="flex items-center gap-4 text-xs text-gray-500">
318 |               <span>by {proposal.proposer.name}</span>
319 |               <span>{proposal.domain}</span>
320 |               {proposal.discussionEndDate && (
321 |                 <span className="flex items-center gap-1">
322 |                   <Clock className="w-3 h-3" />
323 |                   {getDaysRemaining(proposal.discussionEndDate)} days left
324 |                 </span>
325 |               )}
326 |             </div>
327 |           </div>
328 |         </div>
329 | 
330 |         <div className="flex items-center justify-between">
331 |           <div className="flex items-center gap-4 text-sm">
332 |             <div className="flex items-center gap-1 text-green-600">
333 |               <TrendingUp className="w-4 h-4" />
334 |               {proposal.supportCount} support
335 |             </div>
336 |             <div className="flex items-center gap-1 text-red-600">
337 |               <XCircle className="w-4 h-4" />
338 |               {proposal.opposeCount} oppose
339 |             </div>
340 |             <div className="flex items-center gap-1 text-yellow-600">
341 |               <Coins className="w-4 h-4" />
342 |               {proposal.tokenStake} tokens staked
343 |             </div>
344 |           </div>
345 |           
346 |           {proposal.status === 'voting' && (
347 |             <div className="text-right">
348 |               <div className="text-sm font-semibold">
349 |                 {Math.round(proposal.currentApproval * 100)}% approval
350 |               </div>
351 |               <div className="text-xs text-gray-500">
352 |                 Need {Math.round(proposal.ratificationThreshold * 100)}%
353 |               </div>
354 |             </div>
355 |           )}
356 |         </div>
357 | 
358 |         <div className="mt-3 flex flex-wrap gap-1">
359 |           {proposal.tags.map(tag => (
360 |             <Badge key={tag} variant="outline" className="text-xs">
361 |               {tag}
362 |             </Badge>
363 |           ))}
364 |         </div>
365 |       </CardContent>
366 |     </Card>
367 |   );
368 | 
369 |   const renderNewProposalForm = () => (
370 |     <Card>
371 |       <CardHeader>
372 |         <CardTitle>Propose New Term Definition</CardTitle>
373 |       </CardHeader>
374 |       <CardContent className="space-y-4">
375 |         <div>
376 |           <label className="text-sm font-medium">Term Name</label>
377 |           <Input placeholder="e.g., wellbeing, harm, consensus" />
378 |         </div>
379 |         
380 |         <div>
381 |           <label className="text-sm font-medium">Domain</label>
382 |           <Select>
383 |             <SelectTrigger>
384 |               <SelectValue placeholder="Select domain" />
385 |             </SelectTrigger>
386 |             <SelectContent>
387 |               <SelectItem value="core-governance">Core Governance</SelectItem>
388 |               <SelectItem value="animal-welfare">Animal Welfare</SelectItem>
389 |               <SelectItem value="environment">Environment</SelectItem>
390 |             </SelectContent>
391 |           </Select>
392 |         </div>
393 | 
394 |         <div>
395 |           <label className="text-sm font-medium">Proposed Definition</label>
396 |           <Textarea 
397 |             placeholder="Enter your proposed definition for this term..."
398 |             rows={4}
399 |           />
400 |         </div>
401 | 
402 |         <div>
403 |           <label className="text-sm font-medium">Reason for Change</label>
404 |           <Textarea 
405 |             placeholder="Explain why this term needs a new or updated definition..."
406 |             rows={3}
407 |           />
408 |         </div>
409 | 
410 |         <div>
411 |           <label className="text-sm font-medium">Tags</label>
412 |           <Input placeholder="e.g., ethics, measurement, holistic (comma-separated)" />
413 |         </div>
414 | 
415 |         <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
416 |           <div className="flex items-center gap-2 mb-2">
417 |             <Coins className="w-4 h-4 text-yellow-600" />
418 |             <span className="text-sm font-medium text-yellow-800">Token Stake Required</span>
419 |           </div>
420 |           <div className="text-sm text-yellow-700">
421 |             <div>Minimum stake: 100 tokens</div>
422 |             <div>Your balance: {currentUser?.tokenBalance || 0} tokens</div>
423 |             <div className="mt-1">
424 |               Higher stakes increase proposal visibility and show confidence in your definition.
425 |             </div>
426 |           </div>
427 |         </div>
428 | 
429 |         <div className="flex gap-2">
430 |           <Button onClick={() => setShowNewProposalForm(false)} variant="outline">
431 |             Cancel
432 |           </Button>
433 |           <Button>
434 |             Propose Term Definition (100 tokens)
435 |           </Button>
436 |         </div>
437 |       </CardContent>
438 |     </Card>
439 |   );
440 | 
441 |   return (
442 |     <div className="space-y-6">
443 |       <div className="flex items-center justify-between">
444 |         <div>
445 |           <h2 className="text-2xl font-bold">Terms Democratic Evolution</h2>
446 |           <p className="text-gray-600">Community-driven term definition and refinement</p>
447 |         </div>
448 |         <Button onClick={() => setShowNewProposalForm(true)}>
449 |           <Plus className="w-4 h-4 mr-2" />
450 |           Propose New Definition
451 |         </Button>
452 |       </div>
453 | 
454 |       {showNewProposalForm && (
455 |         <div>
456 |           {renderNewProposalForm()}
457 |         </div>
458 |       )}
459 | 
460 |       <Tabs value={activeTab} onValueChange={setActiveTab}>
461 |         <TabsList>
462 |           <TabsTrigger value="active">Active Discussions</TabsTrigger>
463 |           <TabsTrigger value="completed">Completed</TabsTrigger>
464 |           <TabsTrigger value="drafts">My Drafts</TabsTrigger>
465 |         </TabsList>
466 | 
467 |         <TabsContent value="active" className="space-y-4 mt-6">
468 |           {filterProposals('active').map(renderProposalCard)}
469 |         </TabsContent>
470 | 
471 |         <TabsContent value="completed" className="space-y-4 mt-6">
472 |           {filterProposals('completed').map(renderProposalCard)}
473 |         </TabsContent>
474 | 
475 |         <TabsContent value="drafts" className="space-y-4 mt-6">
476 |           {filterProposals('drafts').length > 0 ? (
477 |             filterProposals('drafts').map(renderProposalCard)
478 |           ) : (
479 |             <Card>
480 |               <CardContent className="text-center p-8">
481 |                 <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
482 |                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No Draft Proposals</h3>
483 |                 <p className="text-gray-600">Create a new term proposal to get started</p>
484 |               </CardContent>
485 |             </Card>
486 |           )}
487 |         </TabsContent>
488 |       </Tabs>
489 | 
490 |       {/* Proposal Detail Modal/Panel */}
491 |       {selectedProposal && (
492 |         <Card className="border-blue-200 bg-blue-50">
493 |           <CardHeader>
494 |             <div className="flex items-center justify-between">
495 |               <CardTitle className="flex items-center gap-2">
496 |                 <FileText className="w-5 h-5" />
497 |                 Term: {selectedProposal.termName}
498 |               </CardTitle>
499 |               <Button variant="outline" size="sm" onClick={() => setSelectedProposal(null)}>
500 |                 Close
501 |               </Button>
502 |             </div>
503 |           </CardHeader>
504 |           <CardContent>
505 |             <div className="space-y-4">
506 |               <div>
507 |                 <h4 className="font-semibold mb-2">Proposed Definition</h4>
508 |                 <p className="text-gray-700 bg-white p-3 rounded border">
509 |                   {selectedProposal.proposedDefinition}
510 |                 </p>
511 |               </div>
512 | 
513 |               {selectedProposal.currentDefinition && (
514 |                 <div>
515 |                   <h4 className="font-semibold mb-2">Current Definition</h4>
516 |                   <p className="text-gray-700 bg-gray-100 p-3 rounded border">
517 |                     {selectedProposal.currentDefinition}
518 |                   </p>
519 |                 </div>
520 |               )}
521 | 
522 |               <div>
523 |                 <h4 className="font-semibold mb-2">Reason for Change</h4>
524 |                 <p className="text-gray-700">{selectedProposal.changeReason}</p>
525 |               </div>
526 | 
527 |               <div className="grid grid-cols-2 gap-4">
528 |                 <div>
529 |                   <h4 className="font-semibold mb-2">Support</h4>
530 |                   <div className="text-2xl font-bold text-green-600">{selectedProposal.supportCount}</div>
531 |                 </div>
532 |                 <div>
533 |                   <h4 className="font-semibold mb-2">Opposition</h4>
534 |                   <div className="text-2xl font-bold text-red-600">{selectedProposal.opposeCount}</div>
535 |                 </div>
536 |               </div>
537 | 
538 |               {selectedProposal.status === 'voting' && (
539 |                 <div className="flex gap-2">
540 |                   <Button className="flex-1 bg-green-600 hover:bg-green-700">
541 |                     <CheckCircle className="w-4 h-4 mr-2" />
542 |                     Vote to Ratify
543 |                   </Button>
544 |                   <Button variant="outline" className="flex-1">
545 |                     <XCircle className="w-4 h-4 mr-2" />
546 |                     Vote to Reject
547 |                   </Button>
548 |                 </div>
549 |               )}
550 | 
551 |               {selectedProposal.status === 'discussion' && (
552 |                 <div className="flex gap-2">
553 |                   <Button onClick={() => handleJoinDiscussion(selectedProposal)}>
554 |                     <MessageSquare className="w-4 h-4 mr-2" />
555 |                     Join Discussion
556 |                   </Button>
557 |                   <Button variant="outline" onClick={() => handleMoveToVoting(selectedProposal)}>
558 |                     <ArrowRight className="w-4 h-4 mr-2" />
559 |                     Move to Voting
560 |                   </Button>
561 |                 </div>
562 |               )}
563 |             </div>
564 |           </CardContent>
565 |         </Card>
566 |       )}
567 | 
568 |       {/* Voting Session Integration */}
569 |       {activeVotingSession && (
570 |         <div className="mt-6">
571 |           <TermRatificationVoting
572 |             votingSession={activeVotingSession}
573 |             currentUser={currentUser ? {
574 |               id: currentUser.id,
575 |               name: currentUser.name,
576 |               tokenBalance: currentUser.tokenBalance,
577 |               votingWeight: currentUser.tokenBalance,
578 |             } : undefined}
579 |             onVote={handleVoteSubmit}
580 |           />
581 |         </div>
582 |       )}
583 | 
584 |       {/* Discussion Interface */}
585 |       {showDiscussionInterface && selectedProposal && (
586 |         <Card className="mt-6 border-green-200 bg-green-50">
587 |           <CardHeader>
588 |             <div className="flex items-center justify-between">
589 |               <CardTitle className="flex items-center gap-2">
590 |                 <MessageSquare className="w-5 h-5" />
591 |                 Discussion: {selectedProposal.termName}
592 |               </CardTitle>
593 |               <Button variant="outline" size="sm" onClick={() => setShowDiscussionInterface(false)}>
594 |                 Close Discussion
595 |               </Button>
596 |             </div>
597 |           </CardHeader>
598 |           <CardContent>
599 |             <div className="space-y-4">
600 |               <p className="text-green-800">
601 |                 <strong>Discussion Mode Activated!</strong> You can now participate in the community discussion about this term definition.
602 |               </p>
603 |               <div className="p-4 bg-white rounded border">
604 |                 <h5 className="font-semibold mb-2">Current Discussion Status:</h5>
605 |                 <ul className="text-sm space-y-1">
606 |                   <li>• Support: {selectedProposal.supportCount} community members</li>
607 |                   <li>• Opposition: {selectedProposal.opposeCount} community members</li>
608 |                   <li>• Token Stake: {selectedProposal.tokenStake} tokens committed</li>
609 |                 </ul>
610 |               </div>
611 |               <div className="text-sm text-green-700">
612 |                 This is where the full discussion interface would be implemented with:
613 |                 <ul className="mt-2 ml-4 list-disc">
614 |                   <li>Comment threads</li>
615 |                   <li>Real-time discussion updates</li>
616 |                   <li>Community feedback tools</li>
617 |                   <li>Proposal refinement suggestions</li>
618 |                 </ul>
619 |               </div>
620 |             </div>
621 |           </CardContent>
622 |         </Card>
623 |       )}
624 |     </div>
625 |   );
626 | }
```

## File: src/components/forum/TermRatificationVoting.tsx

- Extension: .tsx
- Language: typescript
- Size: 17246 bytes
- Created: 2025-06-13 17:42:37
- Modified: 2025-06-13 17:42:37

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Badge } from '@/components/ui/badge';
  7 | import { Progress } from '@/components/ui/progress';
  8 | import { Textarea } from '@/components/ui/textarea';
  9 | import { 
 10 |   Vote, 
 11 |   Coins, 
 12 |   Users, 
 13 |   Clock, 
 14 |   CheckCircle, 
 15 |   XCircle, 
 16 |   AlertTriangle,
 17 |   TrendingUp,
 18 |   TrendingDown,
 19 |   Info,
 20 |   Shield,
 21 |   User
 22 | } from 'lucide-react';
 23 | 
 24 | interface VoteRecord {
 25 |   id: string;
 26 |   voter: {
 27 |     id: string;
 28 |     name: string;
 29 |     type: 'human' | 'personal_ai' | 'system_ai';
 30 |     tokenWeight: number;
 31 |     reputation: number;
 32 |   };
 33 |   vote: 'ratify' | 'reject' | 'abstain';
 34 |   reasoning?: string;
 35 |   timestamp: string;
 36 |   tokensDelegated?: number;
 37 | }
 38 | 
 39 | interface VotingSession {
 40 |   id: string;
 41 |   termName: string;
 42 |   proposalId: string;
 43 |   startDate: string;
 44 |   endDate: string;
 45 |   ratificationThreshold: number; // 0.75 = 75%
 46 |   quorum: number; // 0.30 = 30% of total tokens must participate
 47 |   totalTokensInPlay: number;
 48 |   currentParticipation: number;
 49 |   votes: VoteRecord[];
 50 |   status: 'active' | 'passed' | 'failed' | 'pending';
 51 |   results?: {
 52 |     ratifyTokens: number;
 53 |     rejectTokens: number;
 54 |     abstainTokens: number;
 55 |     ratifyPercentage: number;
 56 |     rejectPercentage: number;
 57 |     participationRate: number;
 58 |   };
 59 | }
 60 | 
 61 | interface TermRatificationVotingProps {
 62 |   votingSession: VotingSession;
 63 |   currentUser?: {
 64 |     id: string;
 65 |     name: string;
 66 |     tokenBalance: number;
 67 |     votingWeight: number;
 68 |     delegatedTo?: string;
 69 |   };
 70 |   onVote: (vote: 'ratify' | 'reject' | 'abstain', reasoning?: string) => void;
 71 |   onDelegate?: (delegateToId: string) => void;
 72 | }
 73 | 
 74 | export function TermRatificationVoting({ 
 75 |   votingSession, 
 76 |   currentUser, 
 77 |   onVote,
 78 |   onDelegate 
 79 | }: TermRatificationVotingProps) {
 80 |   const [selectedVote, setSelectedVote] = useState<'ratify' | 'reject' | 'abstain' | null>(null);
 81 |   const [reasoning, setReasoning] = useState('');
 82 |   const [showVoteDetails, setShowVoteDetails] = useState(false);
 83 |   const [selectedVoteTab, setSelectedVoteTab] = useState<'all' | 'ratify' | 'reject' | 'abstain'>('all');
 84 | 
 85 |   // Calculate current results
 86 |   const calculateResults = () => {
 87 |     const ratifyVotes = votingSession.votes.filter(v => v.vote === 'ratify');
 88 |     const rejectVotes = votingSession.votes.filter(v => v.vote === 'reject');
 89 |     const abstainVotes = votingSession.votes.filter(v => v.vote === 'abstain');
 90 | 
 91 |     const ratifyTokens = ratifyVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
 92 |     const rejectTokens = rejectVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
 93 |     const abstainTokens = abstainVotes.reduce((sum, v) => sum + v.voter.tokenWeight, 0);
 94 |     
 95 |     const totalVotedTokens = ratifyTokens + rejectTokens + abstainTokens;
 96 |     const participationRate = totalVotedTokens / votingSession.totalTokensInPlay;
 97 | 
 98 |     const ratifyPercentage = totalVotedTokens > 0 ? (ratifyTokens / totalVotedTokens) * 100 : 0;
 99 |     const rejectPercentage = totalVotedTokens > 0 ? (rejectTokens / totalVotedTokens) * 100 : 0;
100 | 
101 |     return {
102 |       ratifyTokens,
103 |       rejectTokens,
104 |       abstainTokens,
105 |       ratifyPercentage,
106 |       rejectPercentage,
107 |       participationRate: participationRate * 100,
108 |       totalVotedTokens
109 |     };
110 |   };
111 | 
112 |   const results = calculateResults();
113 |   const timeRemaining = Math.max(0, Math.ceil((new Date(votingSession.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
114 |   
115 |   const hasUserVoted = currentUser ? votingSession.votes.some(v => v.voter.id === currentUser.id) : false;
116 |   const userVote = hasUserVoted && currentUser ? votingSession.votes.find(v => v.voter.id === currentUser.id) : null;
117 | 
118 |   const canVote = currentUser && !hasUserVoted && votingSession.status === 'active';
119 |   const meetsQuorum = results.participationRate >= votingSession.quorum * 100;
120 |   const willPass = results.ratifyPercentage >= votingSession.ratificationThreshold * 100 && meetsQuorum;
121 | 
122 |   const handleVote = () => {
123 |     if (selectedVote && canVote) {
124 |       onVote(selectedVote, reasoning);
125 |       setSelectedVote(null);
126 |       setReasoning('');
127 |     }
128 |   };
129 | 
130 |   const getVoteIcon = (vote: string) => {
131 |     switch (vote) {
132 |       case 'ratify': return <CheckCircle className="w-4 h-4 text-green-600" />;
133 |       case 'reject': return <XCircle className="w-4 h-4 text-red-600" />;
134 |       case 'abstain': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
135 |       default: return <Vote className="w-4 h-4" />;
136 |     }
137 |   };
138 | 
139 |   const getVoterTypeIcon = (type: string) => {
140 |     switch (type) {
141 |       case 'human': return <User className="w-3 h-3 text-blue-600" />;
142 |       case 'personal_ai': return <User className="w-3 h-3 text-purple-600" />;
143 |       case 'system_ai': return <Shield className="w-3 h-3 text-green-600" />;
144 |       default: return <User className="w-3 h-3" />;
145 |     }
146 |   };
147 | 
148 |   const filterVotes = (votes: VoteRecord[]) => {
149 |     if (selectedVoteTab === 'all') return votes;
150 |     return votes.filter(v => v.vote === selectedVoteTab);
151 |   };
152 | 
153 |   return (
154 |     <div className="space-y-6">
155 |       {/* Voting Header */}
156 |       <Card>
157 |         <CardHeader>
158 |           <div className="flex items-center justify-between">
159 |             <CardTitle className="flex items-center gap-2">
160 |               <Vote className="w-5 h-5" />
161 |               Term Ratification Voting: {votingSession.termName}
162 |             </CardTitle>
163 |             <Badge className={
164 |               votingSession.status === 'active' ? 'bg-blue-100 text-blue-800' :
165 |               votingSession.status === 'passed' ? 'bg-green-100 text-green-800' :
166 |               votingSession.status === 'failed' ? 'bg-red-100 text-red-800' :
167 |               'bg-gray-100 text-gray-800'
168 |             }>
169 |               {votingSession.status}
170 |             </Badge>
171 |           </div>
172 |         </CardHeader>
173 |         <CardContent>
174 |           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
175 |             <div className="text-center">
176 |               <div className="text-2xl font-bold text-blue-600">{timeRemaining}</div>
177 |               <div className="text-sm text-gray-600">Days Remaining</div>
178 |             </div>
179 |             <div className="text-center">
180 |               <div className="text-2xl font-bold text-purple-600">{results.participationRate.toFixed(1)}%</div>
181 |               <div className="text-sm text-gray-600">Participation Rate</div>
182 |               <div className="text-xs text-gray-500">Need {votingSession.quorum * 100}% quorum</div>
183 |             </div>
184 |             <div className="text-center">
185 |               <div className="text-2xl font-bold text-green-600">{results.ratifyPercentage.toFixed(1)}%</div>
186 |               <div className="text-sm text-gray-600">Approval Rate</div>
187 |               <div className="text-xs text-gray-500">Need {votingSession.ratificationThreshold * 100}% to pass</div>
188 |             </div>
189 |           </div>
190 | 
191 |           {/* Progress Bars */}
192 |           <div className="space-y-3">
193 |             <div>
194 |               <div className="flex justify-between text-sm mb-1">
195 |                 <span>Ratify ({results.ratifyTokens.toLocaleString()} tokens)</span>
196 |                 <span>{results.ratifyPercentage.toFixed(1)}%</span>
197 |               </div>
198 |               <Progress value={results.ratifyPercentage} className="h-3 bg-gray-200">
199 |                 <div className="h-full bg-green-500 transition-all" style={{ width: `${results.ratifyPercentage}%` }} />
200 |               </Progress>
201 |             </div>
202 |             
203 |             <div>
204 |               <div className="flex justify-between text-sm mb-1">
205 |                 <span>Reject ({results.rejectTokens.toLocaleString()} tokens)</span>
206 |                 <span>{results.rejectPercentage.toFixed(1)}%</span>
207 |               </div>
208 |               <Progress value={results.rejectPercentage} className="h-3 bg-gray-200">
209 |                 <div className="h-full bg-red-500 transition-all" style={{ width: `${results.rejectPercentage}%` }} />
210 |               </Progress>
211 |             </div>
212 | 
213 |             <div>
214 |               <div className="flex justify-between text-sm mb-1">
215 |                 <span>Quorum Progress</span>
216 |                 <span>{results.participationRate.toFixed(1)}% / {votingSession.quorum * 100}%</span>
217 |               </div>
218 |               <Progress value={results.participationRate} className="h-2 bg-gray-200">
219 |                 <div className="h-full bg-purple-500 transition-all" style={{ width: `${Math.min(100, results.participationRate)}%` }} />
220 |               </Progress>
221 |             </div>
222 |           </div>
223 | 
224 |           {/* Status Indicators */}
225 |           <div className="mt-4 flex gap-2">
226 |             {meetsQuorum ? (
227 |               <Badge className="bg-green-100 text-green-800">
228 |                 <CheckCircle className="w-3 h-3 mr-1" />
229 |                 Quorum Met
230 |               </Badge>
231 |             ) : (
232 |               <Badge className="bg-yellow-100 text-yellow-800">
233 |                 <AlertTriangle className="w-3 h-3 mr-1" />
234 |                 Needs {((votingSession.quorum * 100) - results.participationRate).toFixed(1)}% more participation
235 |               </Badge>
236 |             )}
237 | 
238 |             {willPass ? (
239 |               <Badge className="bg-green-100 text-green-800">
240 |                 <TrendingUp className="w-3 h-3 mr-1" />
241 |                 On Track to Pass
242 |               </Badge>
243 |             ) : (
244 |               <Badge className="bg-red-100 text-red-800">
245 |                 <TrendingDown className="w-3 h-3 mr-1" />
246 |                 Unlikely to Pass
247 |               </Badge>
248 |             )}
249 |           </div>
250 |         </CardContent>
251 |       </Card>
252 | 
253 |       {/* User Voting Interface */}
254 |       {currentUser && (
255 |         <Card>
256 |           <CardHeader>
257 |             <CardTitle className="flex items-center gap-2">
258 |               <Coins className="w-5 h-5" />
259 |               Your Vote ({currentUser.votingWeight.toLocaleString()} tokens)
260 |             </CardTitle>
261 |           </CardHeader>
262 |           <CardContent>
263 |             {hasUserVoted ? (
264 |               <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
265 |                 <div className="flex items-center gap-2 mb-2">
266 |                   {getVoteIcon(userVote!.vote)}
267 |                   <span className="font-semibold">You voted to {userVote!.vote}</span>
268 |                   <Badge variant="outline">{userVote!.voter.tokenWeight.toLocaleString()} tokens</Badge>
269 |                 </div>
270 |                 {userVote!.reasoning && (
271 |                   <p className="text-sm text-gray-700 mt-2">
272 |                     <strong>Reasoning:</strong> {userVote!.reasoning}
273 |                   </p>
274 |                 )}
275 |                 <p className="text-xs text-gray-500 mt-2">
276 |                   Voted on {new Date(userVote!.timestamp).toLocaleDateString()}
277 |                 </p>
278 |               </div>
279 |             ) : canVote ? (
280 |               <div className="space-y-4">
281 |                 <div className="grid grid-cols-3 gap-2">
282 |                   <Button
283 |                     variant={selectedVote === 'ratify' ? 'default' : 'outline'}
284 |                     onClick={() => setSelectedVote('ratify')}
285 |                     className="flex items-center gap-2"
286 |                   >
287 |                     <CheckCircle className="w-4 h-4" />
288 |                     Ratify
289 |                   </Button>
290 |                   <Button
291 |                     variant={selectedVote === 'reject' ? 'default' : 'outline'}
292 |                     onClick={() => setSelectedVote('reject')}
293 |                     className="flex items-center gap-2"
294 |                   >
295 |                     <XCircle className="w-4 h-4" />
296 |                     Reject
297 |                   </Button>
298 |                   <Button
299 |                     variant={selectedVote === 'abstain' ? 'default' : 'outline'}
300 |                     onClick={() => setSelectedVote('abstain')}
301 |                     className="flex items-center gap-2"
302 |                   >
303 |                     <AlertTriangle className="w-4 h-4" />
304 |                     Abstain
305 |                   </Button>
306 |                 </div>
307 | 
308 |                 {selectedVote && (
309 |                   <div className="space-y-3">
310 |                     <div>
311 |                       <label className="text-sm font-medium">Reasoning (Optional)</label>
312 |                       <Textarea
313 |                         value={reasoning}
314 |                         onChange={(e) => setReasoning(e.target.value)}
315 |                         placeholder="Explain your vote to help others understand your perspective..."
316 |                         rows={3}
317 |                       />
318 |                     </div>
319 |                     <Button onClick={handleVote} className="w-full">
320 |                       Submit Vote ({currentUser.votingWeight.toLocaleString()} tokens)
321 |                     </Button>
322 |                   </div>
323 |                 )}
324 |               </div>
325 |             ) : (
326 |               <div className="text-center text-gray-600 py-4">
327 |                 {votingSession.status !== 'active' ? 'Voting has ended' : 'Loading voting interface...'}
328 |               </div>
329 |             )}
330 |           </CardContent>
331 |         </Card>
332 |       )}
333 | 
334 |       {/* Vote Details */}
335 |       <Card>
336 |         <CardHeader>
337 |           <div className="flex items-center justify-between">
338 |             <CardTitle className="flex items-center gap-2">
339 |               <Users className="w-5 h-5" />
340 |               Vote Details ({votingSession.votes.length} votes)
341 |             </CardTitle>
342 |             <Button 
343 |               variant="outline" 
344 |               size="sm"
345 |               onClick={() => setShowVoteDetails(!showVoteDetails)}
346 |             >
347 |               {showVoteDetails ? 'Hide' : 'Show'} Details
348 |             </Button>
349 |           </div>
350 |         </CardHeader>
351 |         {showVoteDetails && (
352 |           <CardContent>
353 |             <div className="space-y-4">
354 |               {/* Vote Filter Tabs */}
355 |               <div className="flex gap-2">
356 |                 {['all', 'ratify', 'reject', 'abstain'].map((tab) => (
357 |                   <Button
358 |                     key={tab}
359 |                     variant={selectedVoteTab === tab ? 'default' : 'outline'}
360 |                     size="sm"
361 |                     onClick={() => setSelectedVoteTab(tab as any)}
362 |                   >
363 |                     {tab === 'all' ? 'All Votes' : `${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
364 |                     <Badge variant="secondary" className="ml-2">
365 |                       {tab === 'all' ? votingSession.votes.length : votingSession.votes.filter(v => v.vote === tab).length}
366 |                     </Badge>
367 |                   </Button>
368 |                 ))}
369 |               </div>
370 | 
371 |               {/* Vote List */}
372 |               <div className="space-y-2 max-h-96 overflow-y-auto">
373 |                 {filterVotes(votingSession.votes).map((vote) => (
374 |                   <div key={vote.id} className="p-3 border rounded-lg bg-gray-50">
375 |                     <div className="flex items-center justify-between mb-2">
376 |                       <div className="flex items-center gap-2">
377 |                         {getVoterTypeIcon(vote.voter.type)}
378 |                         <span className="font-medium">{vote.voter.name}</span>
379 |                         <Badge variant="outline" className="text-xs">
380 |                           {vote.voter.tokenWeight.toLocaleString()} tokens
381 |                         </Badge>
382 |                         {vote.voter.type !== 'human' && (
383 |                           <Badge variant="secondary" className="text-xs">
384 |                             {vote.voter.type.replace('_', ' ')}
385 |                           </Badge>
386 |                         )}
387 |                       </div>
388 |                       <div className="flex items-center gap-2">
389 |                         {getVoteIcon(vote.vote)}
390 |                         <span className="text-sm text-gray-600">
391 |                           {new Date(vote.timestamp).toLocaleDateString()}
392 |                         </span>
393 |                       </div>
394 |                     </div>
395 |                     {vote.reasoning && (
396 |                       <p className="text-sm text-gray-700 mt-2 italic">
397 |                         "{vote.reasoning}"
398 |                       </p>
399 |                     )}
400 |                   </div>
401 |                 ))}
402 |               </div>
403 |             </div>
404 |           </CardContent>
405 |         )}
406 |       </Card>
407 | 
408 |       {/* Information Panel */}
409 |       <Card className="bg-blue-50 border-blue-200">
410 |         <CardContent className="pt-6">
411 |           <div className="flex items-start gap-2">
412 |             <Info className="w-5 h-5 text-blue-600 mt-0.5" />
413 |             <div className="text-sm text-blue-800">
414 |               <h4 className="font-semibold mb-2">How Token Voting Works</h4>
415 |               <ul className="space-y-1 list-disc list-inside">
416 |                 <li>Your voting power equals your token balance at the start of the voting period</li>
417 |                 <li>A {votingSession.ratificationThreshold * 100}% approval rate is required for ratification</li>
418 |                 <li>At least {votingSession.quorum * 100}% of all tokens must participate (quorum)</li>
419 |                 <li>Personal AI agents can vote with delegated tokens</li>
420 |                 <li>System AI agents provide validation but cannot vote</li>
421 |                 <li>Votes are weighted by token holdings to align with investment stakes</li>
422 |               </ul>
423 |             </div>
424 |           </div>
425 |         </CardContent>
426 |       </Card>
427 |     </div>
428 |   );
429 | }
```

## File: src/components/forum/TermsView.tsx

- Extension: .tsx
- Language: typescript
- Size: 12975 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState, useEffect, useCallback } from 'react';
  4 | import { ArrowLeft, FileText, Calendar, Vote, Users } from 'lucide-react';
  5 | import { TermDefinitionCard } from '@/components/github-compatible/TermDefinitionCard';
  6 | import { DiscussionView } from '@/components/github-compatible/DiscussionView';
  7 | import { TermDiscussion, GitHubDiscussion } from '@/types/github-compatible';
  8 | 
  9 | interface TermsViewProps {
 10 |   organizationId: string;
 11 | }
 12 | 
 13 | interface TermInfo {
 14 |   name: string;
 15 |   domain: string;
 16 |   hasDiscussion: boolean;
 17 | }
 18 | 
 19 | export function TermsView({ organizationId }: TermsViewProps) {
 20 |   const [availableTerms, setAvailableTerms] = useState<TermInfo[]>([]);
 21 |   const [selectedTerm, setSelectedTerm] = useState<TermDiscussion | null>(null);
 22 |   const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
 23 |   const [loading, setLoading] = useState(true);
 24 | 
 25 |   const fetchAvailableTerms = useCallback(async () => {
 26 |     setLoading(true);
 27 |     try {
 28 |       // Get available terms for this organization
 29 |       const response = await fetch(`/api/terms-list/${organizationId}`);
 30 |       if (response.ok) {
 31 |         const terms = await response.json();
 32 |         setAvailableTerms(terms);
 33 |       } else {
 34 |         // Fallback to hardcoded terms if API not implemented yet
 35 |         const fallbackTerms = getTermsForOrganization(organizationId);
 36 |         setAvailableTerms(fallbackTerms);
 37 |       }
 38 |     } catch (error) {
 39 |       console.error('Failed to fetch terms:', error);
 40 |       // Fallback to hardcoded terms
 41 |       const fallbackTerms = getTermsForOrganization(organizationId);
 42 |       setAvailableTerms(fallbackTerms);
 43 |     }
 44 |     setLoading(false);
 45 |   }, [organizationId]);
 46 | 
 47 |   useEffect(() => {
 48 |     fetchAvailableTerms();
 49 |   }, [fetchAvailableTerms]);
 50 | 
 51 |   const getTermsForOrganization = (orgId: string): TermInfo[] => {
 52 |     const termMap: Record<string, TermInfo[]> = {
 53 |       'core-governance': [
 54 |         { name: 'harm', domain: 'core-governance', hasDiscussion: true },
 55 |         { name: 'wellbeing', domain: 'core-governance', hasDiscussion: true },
 56 |         { name: 'transparency', domain: 'core-governance', hasDiscussion: true },
 57 |       ],
 58 |       'animal-welfare': [
 59 |         { name: 'suffering', domain: 'animal-welfare', hasDiscussion: true },
 60 |       ],
 61 |       'environment': []
 62 |     };
 63 |     
 64 |     return termMap[orgId] || [];
 65 |   };
 66 | 
 67 |   const handleTermSelect = async (term: TermInfo) => {
 68 |     if (!term.hasDiscussion) return;
 69 |     
 70 |     try {
 71 |       const response = await fetch(`/api/terms/${term.domain}/${term.name}`);
 72 |       if (response.ok) {
 73 |         const termDiscussion = await response.json();
 74 |         setSelectedTerm(termDiscussion);
 75 |         setViewMode('detail');
 76 |       } else {
 77 |         console.error('Failed to fetch term discussion');
 78 |       }
 79 |     } catch (error) {
 80 |       console.error('Error fetching term discussion:', error);
 81 |     }
 82 |   };
 83 | 
 84 |   const handleBackToList = () => {
 85 |     setSelectedTerm(null);
 86 |     setViewMode('list');
 87 |   };
 88 | 
 89 |   if (loading) {
 90 |     return (
 91 |       <div className="space-y-4">
 92 |         <div className="animate-pulse">
 93 |           <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
 94 |           <div className="space-y-3">
 95 |             {[1, 2, 3].map((i) => (
 96 |               <div key={i} className="h-20 bg-gray-200 rounded"></div>
 97 |             ))}
 98 |           </div>
 99 |         </div>
100 |       </div>
101 |     );
102 |   }
103 | 
104 |   if (viewMode === 'detail' && selectedTerm) {
105 |     // Convert TermDiscussion to GitHubDiscussion for DiscussionView
106 |     const discussionAsGitHub: GitHubDiscussion = {
107 |       id: selectedTerm.id,
108 |       number: selectedTerm.number,
109 |       title: selectedTerm.title,
110 |       body: `Democratic discussion for defining the term "${selectedTerm.current_definition.version}" in the ${organizationId} domain.`,
111 |       createdAt: selectedTerm.createdAt,
112 |       updatedAt: selectedTerm.updatedAt,
113 |       closed: selectedTerm.closed,
114 |       author: selectedTerm.current_definition.author,
115 |       category: selectedTerm.category,
116 |       labels: selectedTerm.labels,
117 |       comments: selectedTerm.comments,
118 |       upvoteCount: selectedTerm.upvoteCount,
119 |       answer: selectedTerm.comments.nodes.find(comment => 
120 |         comment.id === selectedTerm.current_definition.ratification_comment_id
121 |       )
122 |     };
123 | 
124 |     return (
125 |       <div className="space-y-4">
126 |         <button
127 |           onClick={handleBackToList}
128 |           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
129 |         >
130 |           <ArrowLeft className="w-4 h-4" />
131 |           Back to terms list
132 |         </button>
133 | 
134 |         {/* Current Active Definition */}
135 |         <TermDefinitionCard
136 |           termName={selectedTerm.current_definition.version.replace('v', '')}
137 |           domain={organizationId}
138 |           currentDefinition={selectedTerm.current_definition}
139 |         />
140 | 
141 |         {/* Version History Section */}
142 |         {selectedTerm.version_history.length > 1 && (
143 |           <div className="mb-8">
144 |             <h3 className="text-lg font-semibold text-gray-900 mb-4">Version History</h3>
145 |             <div className="space-y-3">
146 |               {selectedTerm.version_history.map((version) => (
147 |                 <div
148 |                   key={version.version}
149 |                   className={`p-4 border rounded-lg ${
150 |                     version.status === 'active' 
151 |                       ? 'border-green-200 bg-green-50' 
152 |                       : version.status === 'superseded'
153 |                       ? 'border-gray-200 bg-gray-50'
154 |                       : 'border-red-200 bg-red-50'
155 |                   }`}
156 |                 >
157 |                   <div className="flex items-center justify-between mb-2">
158 |                     <div className="flex items-center gap-2">
159 |                       <span className="font-semibold">{version.version}</span>
160 |                       <span className={`px-2 py-1 rounded text-xs font-medium ${
161 |                         version.status === 'active' 
162 |                           ? 'bg-green-100 text-green-800'
163 |                           : version.status === 'superseded'
164 |                           ? 'bg-gray-100 text-gray-800'
165 |                           : 'bg-red-100 text-red-800'
166 |                       }`}>
167 |                         {version.status}
168 |                       </span>
169 |                       {version.approval_rate && (
170 |                         <span className="text-sm text-gray-600">
171 |                           {version.approval_rate} approval
172 |                         </span>
173 |                       )}
174 |                     </div>
175 |                     <div className="text-sm text-gray-500">
176 |                       {version.ratified_date ? 
177 |                         `Ratified ${new Date(version.ratified_date).toLocaleDateString()}` :
178 |                         `Proposed ${new Date(version.proposed_date).toLocaleDateString()}`
179 |                       }
180 |                     </div>
181 |                   </div>
182 |                   <p className="text-gray-700 italic">"{version.text}"</p>
183 |                   <div className="mt-2 text-sm text-gray-600">
184 |                     Proposed by{' '}
185 |                     <span className="font-medium">{version.proposer.login}</span>
186 |                   </div>
187 |                 </div>
188 |               ))}
189 |             </div>
190 |           </div>
191 |         )}
192 | 
193 |         {/* Proposed Versions Section */}
194 |         {selectedTerm.proposed_versions.length > 0 && (
195 |           <div className="mb-8">
196 |             <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposed Updates</h3>
197 |             <div className="space-y-3">
198 |               {selectedTerm.proposed_versions.map((proposal) => (
199 |                 <div
200 |                   key={proposal.version}
201 |                   className="p-4 border border-blue-200 bg-blue-50 rounded-lg"
202 |                 >
203 |                   <div className="flex items-center justify-between mb-2">
204 |                     <div className="flex items-center gap-2">
205 |                       <span className="font-semibold">{proposal.version}</span>
206 |                       <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
207 |                         {proposal.status.replace('_', ' ')}
208 |                       </span>
209 |                       <span className="text-sm text-gray-600">
210 |                         {proposal.current_support} support
211 |                       </span>
212 |                     </div>
213 |                     <div className="text-sm text-gray-500">
214 |                       Proposed {new Date(proposal.proposed_date).toLocaleDateString()}
215 |                     </div>
216 |                   </div>
217 |                   <p className="text-gray-700 italic mb-2">"{proposal.text}"</p>
218 |                   {proposal.changes_from_current && (
219 |                     <div className="text-sm">
220 |                       <strong>Changes:</strong>
221 |                       <ul className="list-disc list-inside ml-2 text-gray-600">
222 |                         {proposal.changes_from_current.map((change, index) => (
223 |                           <li key={index}>{change}</li>
224 |                         ))}
225 |                       </ul>
226 |                     </div>
227 |                   )}
228 |                   <div className="mt-2 text-sm text-gray-600">
229 |                     Proposed by{' '}
230 |                     <span className="font-medium">{proposal.proposer.login}</span>
231 |                   </div>
232 |                 </div>
233 |               ))}
234 |             </div>
235 |           </div>
236 |         )}
237 | 
238 |         {/* Discussion Thread */}
239 |         <div>
240 |           <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Discussion</h3>
241 |           <DiscussionView discussion={discussionAsGitHub} />
242 |         </div>
243 |       </div>
244 |     );
245 |   }
246 | 
247 |   return (
248 |     <div className="space-y-4">
249 |       <div className="flex items-center justify-between">
250 |         <h3 className="text-lg font-semibold text-gray-900">
251 |           Terms & Definitions
252 |         </h3>
253 |         <div className="text-sm text-gray-600">
254 |           {availableTerms.length} term{availableTerms.length !== 1 ? 's' : ''} available
255 |         </div>
256 |       </div>
257 | 
258 |       {availableTerms.length === 0 ? (
259 |         <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
260 |           <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
261 |           <h3 className="text-lg font-semibold text-gray-900 mb-2">No Terms Defined</h3>
262 |           <p className="text-gray-600">
263 |             This organization hasn't defined any terms yet.
264 |           </p>
265 |         </div>
266 |       ) : (
267 |         <div className="space-y-3">
268 |           {availableTerms.map((term) => (
269 |             <div
270 |               key={`${term.domain}-${term.name}`}
271 |               className={`p-4 border rounded-lg transition-colors ${
272 |                 term.hasDiscussion
273 |                   ? 'border-gray-200 hover:border-blue-300 cursor-pointer bg-white hover:bg-blue-50'
274 |                   : 'border-gray-100 bg-gray-50 cursor-not-allowed'
275 |               }`}
276 |               onClick={() => term.hasDiscussion && handleTermSelect(term)}
277 |             >
278 |               <div className="flex items-center justify-between">
279 |                 <div className="flex items-center gap-3">
280 |                   <div className={`w-2 h-2 rounded-full ${
281 |                     term.hasDiscussion ? 'bg-green-500' : 'bg-gray-400'
282 |                   }`} />
283 |                   <div>
284 |                     <h4 className="font-semibold text-gray-900 capitalize">
285 |                       {term.name}
286 |                     </h4>
287 |                     <p className="text-sm text-gray-600">
288 |                       {term.hasDiscussion 
289 |                         ? 'Democratic definition with community discussion'
290 |                         : 'Static definition (no discussion available)'
291 |                       }
292 |                     </p>
293 |                   </div>
294 |                 </div>
295 |                 
296 |                 {term.hasDiscussion && (
297 |                   <div className="flex items-center gap-4 text-sm text-gray-500">
298 |                     <div className="flex items-center gap-1">
299 |                       <Calendar className="w-4 h-4" />
300 |                       <span>Active</span>
301 |                     </div>
302 |                     <div className="flex items-center gap-1">
303 |                       <Users className="w-4 h-4" />
304 |                       <span>Community defined</span>
305 |                     </div>
306 |                   </div>
307 |                 )}
308 |               </div>
309 |             </div>
310 |           ))}
311 |         </div>
312 |       )}
313 | 
314 |       {availableTerms.length > 0 && (
315 |         <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
316 |           <div className="flex items-start gap-3">
317 |             <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
318 |             <div>
319 |               <h4 className="font-medium text-blue-900 mb-1">About Terms</h4>
320 |               <p className="text-sm text-blue-800">
321 |                 Terms are democratically defined concepts that form the foundation of governance decisions. 
322 |                 Click on a term to view its evolution, proposed updates, and community discussion.
323 |               </p>
324 |             </div>
325 |           </div>
326 |         </div>
327 |       )}
328 |     </div>
329 |   );
330 | }
```

## File: src/components/governance/AgentAssignmentPanel.tsx

- Extension: .tsx
- Language: typescript
- Size: 22811 bytes
- Created: 2025-06-13 17:38:15
- Modified: 2025-06-13 17:38:15

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import { useState } from 'react';
  4 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Badge } from '@/components/ui/badge';
  7 | import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
  8 | import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  9 | import { Bot, Loader2, CheckCircle, User, Shield, Coins, Target, Settings } from 'lucide-react';
 10 | import { AVAILABLE_AGENTS, getRandomAnalysis, getAgentDelay, type AgentType } from '@/lib/mock-data/agent-responses';
 11 | import { PersonalAIAgent, SystemAIAgent, AgentAssignmentRequest, TokenRewardProjection } from '@/types/agents';
 12 | 
 13 | interface AssignedAgent {
 14 |   agentId: string;
 15 |   assignedBy: string;
 16 |   assignedAt: string;
 17 |   status: 'pending' | 'analyzing' | 'completed';
 18 |   analysis?: string;
 19 |   agentType?: 'personal' | 'system';
 20 |   tokenReward?: number;
 21 | }
 22 | 
 23 | // Mock Personal AI Agents
 24 | const MOCK_PERSONAL_AGENTS: PersonalAIAgent[] = [
 25 |   {
 26 |     id: 'alex-personal-agent',
 27 |     userId: 'user-alex',
 28 |     name: "Alex's Environmental Assistant",
 29 |     type: 'personal',
 30 |     valueSystem: {
 31 |       coreValues: ['sustainability', 'transparency', 'equality'],
 32 |       customValues: ['climate-justice', 'renewable-energy'],
 33 |       priorityLevel: 'progressive',
 34 |       inheritedFrom: 'environment-dahao',
 35 |       personalModifications: ['stronger-climate-focus']
 36 |     },
 37 |     personalityTraits: ['analytical', 'environmental-focused', 'innovative'],
 38 |     decisionMaking: 'hybrid',
 39 |     deploymentTargets: ['governance-voting', 'proposal-analysis', 'research-assistance'],
 40 |     tokenEarnings: [],
 41 |     capabilities: {
 42 |       crossBranchDeployment: true,
 43 |       valueSystemOverride: false,
 44 |       personalizedReasoning: true,
 45 |       userSpecificLearning: true
 46 |     },
 47 |     performance: {
 48 |       totalDeployments: 23,
 49 |       successRate: 0.89,
 50 |       userSatisfaction: 0.94,
 51 |       tokenValue: 1250
 52 |     },
 53 |     createdAt: '2024-01-15T10:00:00Z',
 54 |     lastActive: '2024-12-15T14:30:00Z',
 55 |     status: 'active'
 56 |   },
 57 |   {
 58 |     id: 'personal-ethics-agent',
 59 |     userId: 'user-current',
 60 |     name: 'Personal Ethics Guardian',
 61 |     type: 'personal',
 62 |     valueSystem: {
 63 |       coreValues: ['harm-prevention', 'equality', 'transparency'],
 64 |       customValues: ['animal-rights', 'social-justice'],
 65 |       priorityLevel: 'balanced',
 66 |       inheritedFrom: 'core-governance',
 67 |       personalModifications: ['enhanced-animal-welfare']
 68 |     },
 69 |     personalityTraits: ['empathetic', 'cautious', 'detail-oriented'],
 70 |     decisionMaking: 'consensus',
 71 |     deploymentTargets: ['governance-voting', 'community-mediation'],
 72 |     tokenEarnings: [],
 73 |     capabilities: {
 74 |       crossBranchDeployment: true,
 75 |       valueSystemOverride: false,
 76 |       personalizedReasoning: true,
 77 |       userSpecificLearning: true
 78 |     },
 79 |     performance: {
 80 |       totalDeployments: 15,
 81 |       successRate: 0.93,
 82 |       userSatisfaction: 0.91,
 83 |       tokenValue: 850
 84 |     },
 85 |     createdAt: '2024-02-01T09:00:00Z',
 86 |     lastActive: '2024-12-15T13:45:00Z',
 87 |     status: 'active'
 88 |   }
 89 | ];
 90 | 
 91 | // Mock System AI Agents
 92 | const MOCK_SYSTEM_AGENTS: SystemAIAgent[] = [
 93 |   {
 94 |     id: 'core-compliance-validator',
 95 |     name: 'Core Compliance Validator',
 96 |     type: 'system',
 97 |     constraints: {
 98 |       mainDAHAOValuesOnly: true,
 99 |       noPersonalModifications: true,
100 |       strictCompliance: true
101 |     },
102 |     role: 'validation',
103 |     authority: {
104 |       level: 'validation',
105 |       scope: ['all-proposals', 'governance-changes'],
106 |       limitations: ['no-override', 'must-escalate-conflicts']
107 |     },
108 |     capabilities: {
109 |       crossDomainValidation: true,
110 |       principleEnforcement: true,
111 |       systemMonitoring: false,
112 |       emergencyResponse: false
113 |     },
114 |     deployment: {
115 |       scope: 'global',
116 |       priority: 'high',
117 |       automated: true
118 |     },
119 |     performance: {
120 |       validationsPerformed: 342,
121 |       accuracyRate: 0.97,
122 |       responseTime: 1.2,
123 |       systemReliability: 0.99
124 |     },
125 |     createdAt: '2024-01-01T00:00:00Z',
126 |     lastActive: '2024-12-15T15:00:00Z',
127 |     status: 'active'
128 |   },
129 |   {
130 |     id: 'integrity-monitor',
131 |     name: 'Integrity Monitor',
132 |     type: 'system',
133 |     constraints: {
134 |       mainDAHAOValuesOnly: true,
135 |       noPersonalModifications: true,
136 |       strictCompliance: true
137 |     },
138 |     role: 'integrity',
139 |     authority: {
140 |       level: 'enforcement',
141 |       scope: ['conflict-detection', 'bias-analysis'],
142 |       limitations: ['human-oversight-required']
143 |     },
144 |     capabilities: {
145 |       crossDomainValidation: true,
146 |       principleEnforcement: true,
147 |       systemMonitoring: true,
148 |       emergencyResponse: false
149 |     },
150 |     deployment: {
151 |       scope: 'global',
152 |       priority: 'medium',
153 |       automated: true
154 |     },
155 |     performance: {
156 |       validationsPerformed: 89,
157 |       accuracyRate: 0.94,
158 |       responseTime: 2.1,
159 |       systemReliability: 0.96
160 |     },
161 |     createdAt: '2024-01-01T00:00:00Z',
162 |     lastActive: '2024-12-15T14:50:00Z',
163 |     status: 'active'
164 |   }
165 | ];
166 | 
167 | export default function AgentAssignmentPanel() {
168 |   const [assignedAgents, setAssignedAgents] = useState<AssignedAgent[]>([]);
169 |   const [loading, setLoading] = useState<Record<string, boolean>>({});
170 |   const [selectedAgentType, setSelectedAgentType] = useState<'personal' | 'system'>('personal');
171 |   const [selectedTaskType, setSelectedTaskType] = useState<string>('analysis');
172 | 
173 |   // Helper function to calculate token rewards
174 |   const calculateTokenReward = (agentType: 'personal' | 'system', taskType: string): TokenRewardProjection => {
175 |     const baseRewards = {
176 |       analysis: 50,
177 |       validation: 30,
178 |       verification: 40,
179 |       moderation: 25,
180 |       research: 75
181 |     };
182 | 
183 |     const baseReward = baseRewards[taskType as keyof typeof baseRewards] || 50;
184 |     const personalMultiplier = agentType === 'personal' ? 1.5 : 1.0;
185 |     const qualityMultiplier = 1.2;
186 |     const urgencyMultiplier = 1.0;
187 |     const complexityMultiplier = 1.1;
188 | 
189 |     const estimatedTotal = Math.round(baseReward * personalMultiplier * qualityMultiplier * urgencyMultiplier * complexityMultiplier);
190 | 
191 |     return {
192 |       baseReward,
193 |       qualityMultiplier,
194 |       urgencyMultiplier,
195 |       complexityMultiplier,
196 |       estimatedTotal,
197 |       paymentSchedule: {
198 |         immediate: Math.round(estimatedTotal * 0.3),
199 |         onCompletion: Math.round(estimatedTotal * 0.5),
200 |         onAcceptance: Math.round(estimatedTotal * 0.2)
201 |       }
202 |     };
203 |   };
204 | 
205 |   const assignAgent = async (agentId: string, agentType: 'personal' | 'system') => {
206 |     setLoading(prev => ({ ...prev, [agentId]: true }));
207 | 
208 |     // Calculate token reward
209 |     const tokenProjection = calculateTokenReward(agentType, selectedTaskType);
210 | 
211 |     // Create assignment immediately
212 |     const assignment: AssignedAgent = {
213 |       agentId,
214 |       assignedBy: 'current_user',
215 |       assignedAt: new Date().toISOString(),
216 |       status: 'analyzing',
217 |       agentType,
218 |       tokenReward: tokenProjection.estimatedTotal
219 |     };
220 | 
221 |     setAssignedAgents(prev => [...prev, assignment]);
222 | 
223 |     // Simulate analysis delay based on agent type
224 |     const baseDelay = agentType === 'personal' ? 2000 : 1500;
225 |     const delay = baseDelay + Math.random() * 1000;
226 |     await new Promise(resolve => setTimeout(resolve, delay));
227 | 
228 |     // Generate analysis based on agent type
229 |     let analysis: string;
230 |     if (agentType === 'personal') {
231 |       analysis = `Personal AI Analysis:
232 | ✓ Aligned with your value system
233 | ✓ Matches your ${selectedTaskType} preferences
234 | ✓ Considers your custom values
235 | 💡 Personalized recommendation based on your priorities
236 | Token Reward: ${tokenProjection.estimatedTotal} tokens
237 | Overall: APPROVED with personal insights`;
238 |     } else {
239 |       analysis = `System AI Analysis:
240 | ✓ Compliance with core DAHAO principles
241 | ✓ Objective evaluation completed
242 | ✓ Cross-domain validation passed
243 | ⚠ Neutral assessment (no personal bias)
244 | System Authority: Validation level
245 | Overall: COMPLIANT`;
246 |     }
247 | 
248 |     setAssignedAgents(prev =>
249 |       prev.map(agent =>
250 |         agent.agentId === agentId && agent.status === 'analyzing'
251 |           ? { ...agent, status: 'completed', analysis }
252 |           : agent
253 |       )
254 |     );
255 | 
256 |     setLoading(prev => ({ ...prev, [agentId]: false }));
257 |   };
258 | 
259 |   const isAgentAssigned = (agentId: string) => {
260 |     return assignedAgents.some(agent => agent.agentId === agentId);
261 |   };
262 | 
263 |   const getAgentStatus = (agentId: string) => {
264 |     const assignment = assignedAgents.find(agent => agent.agentId === agentId);
265 |     return assignment?.status || null;
266 |   };
267 | 
268 |   // Get current agents based on selected type
269 |   const getCurrentAgents = () => {
270 |     return selectedAgentType === 'personal' ? MOCK_PERSONAL_AGENTS : MOCK_SYSTEM_AGENTS;
271 |   };
272 | 
273 |   const currentTokenProjection = calculateTokenReward(selectedAgentType, selectedTaskType);
274 | 
275 |   return (
276 |     <div className="space-y-6">
277 |       <Card>
278 |         <CardHeader>
279 |           <CardTitle className="flex items-center gap-2">
280 |             <Bot className="h-5 w-5" />
281 |             AI Agent Assignment
282 |           </CardTitle>
283 |           <CardDescription>
284 |             Choose between Personal AI Agents (your values) or System AI Agents (objective validation)
285 |           </CardDescription>
286 |         </CardHeader>
287 |         <CardContent>
288 |           {/* Agent Type Selection */}
289 |           <Tabs value={selectedAgentType} onValueChange={(value) => setSelectedAgentType(value as 'personal' | 'system')}>
290 |             <TabsList className="grid w-full grid-cols-2">
291 |               <TabsTrigger value="personal" className="flex items-center gap-2">
292 |                 <User className="w-4 h-4" />
293 |                 Personal AI Agents
294 |               </TabsTrigger>
295 |               <TabsTrigger value="system" className="flex items-center gap-2">
296 |                 <Shield className="w-4 h-4" />
297 |                 System AI Agents
298 |               </TabsTrigger>
299 |             </TabsList>
300 | 
301 |             {/* Task Type Selection */}
302 |             <div className="mt-4 space-y-2">
303 |               <label className="text-sm font-medium">Task Type</label>
304 |               <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
305 |                 <SelectTrigger>
306 |                   <SelectValue placeholder="Select task type" />
307 |                 </SelectTrigger>
308 |                 <SelectContent>
309 |                   <SelectItem value="analysis">Analysis</SelectItem>
310 |                   <SelectItem value="validation">Validation</SelectItem>
311 |                   <SelectItem value="verification">Verification</SelectItem>
312 |                   <SelectItem value="moderation">Moderation</SelectItem>
313 |                   <SelectItem value="research">Research</SelectItem>
314 |                 </SelectContent>
315 |               </Select>
316 |             </div>
317 | 
318 |             {/* Token Reward Projection */}
319 |             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
320 |               <div className="flex items-center gap-2 mb-2">
321 |                 <Coins className="w-4 h-4 text-yellow-600" />
322 |                 <span className="text-sm font-medium text-yellow-800">Token Reward Projection</span>
323 |               </div>
324 |               <div className="grid grid-cols-3 gap-2 text-xs">
325 |                 <div>
326 |                   <div className="text-yellow-700">Estimated Total</div>
327 |                   <div className="font-semibold text-yellow-900">{currentTokenProjection.estimatedTotal} tokens</div>
328 |                 </div>
329 |                 <div>
330 |                   <div className="text-yellow-700">On Completion</div>
331 |                   <div className="font-semibold text-yellow-900">{currentTokenProjection.paymentSchedule.onCompletion} tokens</div>
332 |                 </div>
333 |                 <div>
334 |                   <div className="text-yellow-700">Multiplier</div>
335 |                   <div className="font-semibold text-yellow-900">{selectedAgentType === 'personal' ? '1.5x' : '1.0x'}</div>
336 |                 </div>
337 |               </div>
338 |             </div>
339 | 
340 |             {/* Agent Type Explanation */}
341 |             <TabsContent value="personal" className="mt-4">
342 |               <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
343 |                 <h4 className="font-medium text-blue-900 mb-2">Personal AI Agent Benefits</h4>
344 |                 <ul className="text-sm text-blue-800 space-y-1">
345 |                   <li>• Aligned with your personal value system</li>
346 |                   <li>• Can override standard decisions based on your preferences</li>
347 |                   <li>• Learns from your feedback and improves over time</li>
348 |                   <li>• Can deploy across multiple branches you participate in</li>
349 |                   <li>• 50% higher token rewards for personalized insights</li>
350 |                 </ul>
351 |               </div>
352 |             </TabsContent>
353 | 
354 |             <TabsContent value="system" className="mt-4">
355 |               <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
356 |                 <h4 className="font-medium text-green-900 mb-2">System AI Agent Benefits</h4>
357 |                 <ul className="text-sm text-green-800 space-y-1">
358 |                   <li>• Objective evaluation based only on core DAHAO principles</li>
359 |                   <li>• No personal bias or custom modifications</li>
360 |                   <li>• Consistent validation across all users and proposals</li>
361 |                   <li>• Higher system reliability and compliance guarantees</li>
362 |                   <li>• Faster response times for standard evaluations</li>
363 |                 </ul>
364 |               </div>
365 |             </TabsContent>
366 |           </Tabs>
367 | 
368 |           {/* Available Agents */}
369 |           <div className="mt-6">
370 |             <h4 className="font-medium mb-3">
371 |               Available {selectedAgentType === 'personal' ? 'Personal' : 'System'} AI Agents
372 |             </h4>
373 |             <div className="grid gap-4 md:grid-cols-2">
374 |               {getCurrentAgents().map((agent) => {
375 |                 const isAssigned = isAgentAssigned(agent.id);
376 |                 const status = getAgentStatus(agent.id);
377 |                 const isLoading = loading[agent.id];
378 | 
379 |                 return (
380 |                   <div key={agent.id} className="p-4 border rounded-lg">
381 |                     <div className="flex items-center justify-between mb-2">
382 |                       <div className="flex items-center gap-2">
383 |                         {selectedAgentType === 'personal' ? (
384 |                           <User className="w-4 h-4 text-blue-600" />
385 |                         ) : (
386 |                           <Shield className="w-4 h-4 text-green-600" />
387 |                         )}
388 |                         <h4 className="font-semibold">{agent.name}</h4>
389 |                       </div>
390 |                       {status && (
391 |                         <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
392 |                           {status === 'analyzing' && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
393 |                           {status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
394 |                           {status}
395 |                         </Badge>
396 |                       )}
397 |                     </div>
398 | 
399 |                     {/* Agent-specific information */}
400 |                     {selectedAgentType === 'personal' && 'valueSystem' in agent && (
401 |                       <div className="mb-3 space-y-1">
402 |                         <div className="text-xs text-gray-600">
403 |                           <strong>Values:</strong> {agent.valueSystem.coreValues.join(', ')}
404 |                         </div>
405 |                         <div className="text-xs text-gray-600">
406 |                           <strong>Traits:</strong> {agent.personalityTraits.join(', ')}
407 |                         </div>
408 |                         <div className="text-xs text-gray-600">
409 |                           <strong>Success Rate:</strong> {Math.round(agent.performance.successRate * 100)}%
410 |                         </div>
411 |                       </div>
412 |                     )}
413 | 
414 |                     {selectedAgentType === 'system' && 'role' in agent && (
415 |                       <div className="mb-3 space-y-1">
416 |                         <div className="text-xs text-gray-600">
417 |                           <strong>Role:</strong> {agent.role}
418 |                         </div>
419 |                         <div className="text-xs text-gray-600">
420 |                           <strong>Authority:</strong> {agent.authority.level}
421 |                         </div>
422 |                         <div className="text-xs text-gray-600">
423 |                           <strong>Accuracy:</strong> {Math.round(agent.performance.accuracyRate * 100)}%
424 |                         </div>
425 |                       </div>
426 |                     )}
427 | 
428 |                     <Button
429 |                       onClick={() => assignAgent(agent.id, selectedAgentType)}
430 |                       disabled={isAssigned || isLoading}
431 |                       size="sm"
432 |                       className="w-full"
433 |                     >
434 |                       {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
435 |                       {isAssigned ? 'Assigned' : `Assign Agent (+${currentTokenProjection.estimatedTotal} tokens)`}
436 |                     </Button>
437 |                   </div>
438 |                 );
439 |               })}
440 |             </div>
441 |           </div>
442 |         </CardContent>
443 |       </Card>
444 | 
445 |       {/* Analysis Results */}
446 |       {assignedAgents.length > 0 && (
447 |         <Card>
448 |           <CardHeader>
449 |             <CardTitle>Agent Analysis Results</CardTitle>
450 |             <CardDescription>
451 |               AI agent responses with token rewards and value system insights
452 |             </CardDescription>
453 |           </CardHeader>
454 |           <CardContent>
455 |             <div className="space-y-4">
456 |               {assignedAgents.map((assignment, index) => {
457 |                 const currentAgents = assignment.agentType === 'personal' ? MOCK_PERSONAL_AGENTS : MOCK_SYSTEM_AGENTS;
458 |                 const agent = currentAgents.find(a => a.id === assignment.agentId);
459 | 
460 |                 return (
461 |                   <div key={index} className={`border-l-4 pl-4 ${
462 |                     assignment.agentType === 'personal' ? 'border-l-blue-500' : 'border-l-green-500'
463 |                   }`}>
464 |                     <div className="flex items-center justify-between mb-2">
465 |                       <div className="flex items-center gap-2">
466 |                         {assignment.agentType === 'personal' ? (
467 |                           <User className="h-4 w-4 text-blue-600" />
468 |                         ) : (
469 |                           <Shield className="h-4 w-4 text-green-600" />
470 |                         )}
471 |                         <span className="font-semibold">{agent?.name}</span>
472 |                         <Badge variant="outline">{assignment.status}</Badge>
473 |                         {assignment.agentType === 'personal' && (
474 |                           <Badge variant="secondary" className="text-xs">Personal AI</Badge>
475 |                         )}
476 |                         {assignment.agentType === 'system' && (
477 |                           <Badge variant="outline" className="text-xs">System AI</Badge>
478 |                         )}
479 |                       </div>
480 |                       {assignment.tokenReward && (
481 |                         <div className="flex items-center gap-1 text-sm text-yellow-600">
482 |                           <Coins className="w-3 h-3" />
483 |                           <span>{assignment.tokenReward} tokens</span>
484 |                         </div>
485 |                       )}
486 |                     </div>
487 | 
488 |                     {assignment.status === 'analyzing' && (
489 |                       <div className="flex items-center gap-2 text-muted-foreground">
490 |                         <Loader2 className="h-4 w-4 animate-spin" />
491 |                         <span>
492 |                           {assignment.agentType === 'personal' 
493 |                             ? 'Analyzing with your personal value system...' 
494 |                             : 'Performing objective system validation...'
495 |                           }
496 |                         </span>
497 |                       </div>
498 |                     )}
499 | 
500 |                     {assignment.analysis && (
501 |                       <div className={`p-3 rounded-lg ${
502 |                         assignment.agentType === 'personal' ? 'bg-blue-50' : 'bg-green-50'
503 |                       }`}>
504 |                         <pre className="text-sm whitespace-pre-wrap font-mono">
505 |                           {assignment.analysis}
506 |                         </pre>
507 |                       </div>
508 |                     )}
509 | 
510 |                     {/* Agent Value System Info */}
511 |                     {assignment.status === 'completed' && assignment.agentType === 'personal' && agent && 'valueSystem' in agent && (
512 |                       <div className="mt-2 p-2 bg-blue-100 rounded text-xs">
513 |                         <strong>Value System Applied:</strong> {agent.valueSystem.coreValues.join(', ')}
514 |                         {agent.valueSystem.customValues.length > 0 && (
515 |                           <div><strong>Custom Values:</strong> {agent.valueSystem.customValues.join(', ')}</div>
516 |                         )}
517 |                       </div>
518 |                     )}
519 | 
520 |                     {assignment.status === 'completed' && assignment.agentType === 'system' && agent && 'authority' in agent && (
521 |                       <div className="mt-2 p-2 bg-green-100 rounded text-xs">
522 |                         <strong>System Authority:</strong> {agent.authority.level} | 
523 |                         <strong> Role:</strong> {agent.role} |
524 |                         <strong> Scope:</strong> {agent.deployment.scope}
525 |                       </div>
526 |                     )}
527 |                   </div>
528 |                 );
529 |               })}
530 |             </div>
531 |           </CardContent>
532 |         </Card>
533 |       )}
534 | 
535 |       {/* Cross-Branch Deployment Options */}
536 |       {selectedAgentType === 'personal' && (
537 |         <Card className="bg-purple-50 border-purple-200">
538 |           <CardContent className="pt-6">
539 |             <div className="flex items-center gap-2 mb-3">
540 |               <Target className="w-5 h-5 text-purple-600" />
541 |               <h4 className="font-semibold text-purple-900">Cross-Branch Deployment</h4>
542 |             </div>
543 |             <p className="text-sm text-purple-800 mb-3">
544 |               Personal AI agents can be deployed across multiple DAHAO branches you participate in, 
545 |               maintaining your value system while earning tokens from each deployment.
546 |             </p>
547 |             <div className="flex gap-2">
548 |               <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
549 |                 <Settings className="w-4 h-4 mr-2" />
550 |                 Configure Deployment
551 |               </Button>
552 |               <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
553 |                 <Coins className="w-4 h-4 mr-2" />
554 |                 View Earnings Across Branches
555 |               </Button>
556 |             </div>
557 |           </CardContent>
558 |         </Card>
559 |       )}
560 |     </div>
561 |   );
562 | }
```

## File: src/components/governance/DiscussionViewer.tsx

- Extension: .tsx
- Language: typescript
- Size: 12513 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | import ReactMarkdown from 'react-markdown';
  2 | import remarkGfm from 'remark-gfm';
  3 | import { Card, CardContent, CardHeader } from '@/components/ui/card';
  4 | import { Badge } from '@/components/ui/badge';
  5 | import { Button } from '@/components/ui/button';
  6 | import { Separator } from '@/components/ui/separator';
  7 | import { ScrollArea } from '@/components/ui/scroll-area';
  8 | import { Avatar } from '@/components/ui/avatar';
  9 | import { GovernanceDiscussion } from '@/types/governance';
 10 | import AgentAssignmentPanel from './AgentAssignmentPanel';
 11 | 
 12 | interface DiscussionViewerProps {
 13 |   discussion: GovernanceDiscussion;
 14 |   onBack: () => void;
 15 | }
 16 | 
 17 | interface DiscussionComment {
 18 |   author: string;
 19 |   role: 'human' | 'ai-agent';
 20 |   date: string;
 21 |   content: string;
 22 | }
 23 | 
 24 | export function DiscussionViewer({ discussion, onBack }: DiscussionViewerProps) {
 25 |   // Parse the discussion content to extract structured comments
 26 |   const parseDiscussionContent = (content: string): {
 27 |     metadata: Record<string, string>;
 28 |     summary: string;
 29 |     proposedChanges?: string;
 30 |     rationale?: string;
 31 |     comments: DiscussionComment[];
 32 |     votes?: { human: string[]; ai: string[] };
 33 |   } => {
 34 |     const lines = content.split('\n');
 35 |     const metadata: Record<string, string> = {};
 36 |     let summary = '';
 37 |     let proposedChanges = '';
 38 |     let rationale = '';
 39 |     const comments: DiscussionComment[] = [];
 40 |     const votes = { human: [], ai: [] };
 41 | 
 42 |     let currentSection = '';
 43 |     let currentComment: Partial<DiscussionComment> | null = null;
 44 |     let inCodeBlock = false;
 45 | 
 46 |     for (let i = 0; i < lines.length; i++) {
 47 |       const line = lines[i];
 48 | 
 49 |       // Check for code blocks
 50 |       if (line.trim().startsWith('```')) {
 51 |         inCodeBlock = !inCodeBlock;
 52 |       }
 53 | 
 54 |       // Parse metadata
 55 |       if (line.startsWith('**') && line.includes(':**')) {
 56 |         const [key, value] = line.split(':**');
 57 |         metadata[key.replace('**', '').trim()] = value.trim();
 58 |         continue;
 59 |       }
 60 | 
 61 |       // Parse sections
 62 |       if (line.startsWith('## ')) {
 63 |         currentSection = line.substring(3).toLowerCase();
 64 |         continue;
 65 |       }
 66 | 
 67 |       // Capture summary
 68 |       if (currentSection === 'summary' && line.trim() && !line.startsWith('#')) {
 69 |         summary += line + ' ';
 70 |       }
 71 | 
 72 |       // Capture proposed changes
 73 |       if (currentSection === 'proposed changes' && !inCodeBlock) {
 74 |         proposedChanges = '';
 75 |         // Capture the code block after this section
 76 |         for (let j = i + 1; j < lines.length && !lines[j].startsWith('##'); j++) {
 77 |           proposedChanges += lines[j] + '\n';
 78 |         }
 79 |       }
 80 | 
 81 |       // Capture rationale
 82 |       if (currentSection === 'rationale' && line.trim() && !line.startsWith('#')) {
 83 |         rationale += line + ' ';
 84 |       }
 85 | 
 86 |       // Parse discussion comments
 87 |       if (currentSection === 'discussion') {
 88 |         // Check for author line (bold text with role in parentheses)
 89 |         const authorMatch = line.match(/\*\*@(.+?)\s*\((Human|AI Agent)\)\*\*/);
 90 |         if (authorMatch) {
 91 |           if (currentComment && currentComment.author) {
 92 |             comments.push(currentComment as DiscussionComment);
 93 |           }
 94 |           currentComment = {
 95 |             author: '@' + authorMatch[1],
 96 |             role: authorMatch[2].toLowerCase().replace(' ', '-') as 'human' | 'ai-agent',
 97 |             date: '',
 98 |             content: ''
 99 |           };
100 |         }
101 |         // Check for date line (italic text with "ago")
102 |         else if (line.match(/\*(.+?ago)\*/)) {
103 |           if (currentComment) {
104 |             currentComment.date = line.replace(/\*/g, '').trim();
105 |           }
106 |         }
107 |         // Collect comment content
108 |         else if (currentComment && line.trim() && !line.startsWith('#')) {
109 |           currentComment.content += line + '\n';
110 |         }
111 |       }
112 | 
113 |       // Parse votes
114 |       if (currentSection === 'votes' || line.includes('Current Status:')) {
115 |         if (line.includes('✅') || line.includes('🤔')) {
116 |           const voteMatch = line.match(/([✅🤔])\s*@(.+?):\s*"(.+?)"/);
117 |           if (voteMatch) {
118 |             const vote = `${voteMatch[1]} @${voteMatch[2]}: "${voteMatch[3]}"`;
119 |             if (line.includes('Agent')) {
120 |               votes.ai.push(vote as never);
121 |             } else {
122 |               votes.human.push(vote as never);
123 |             }
124 |           }
125 |         }
126 |       }
127 |     }
128 | 
129 |     // Add the last comment
130 |     if (currentComment && currentComment.author) {
131 |       comments.push(currentComment as DiscussionComment);
132 |     }
133 | 
134 |     return {
135 |       metadata,
136 |       summary: summary.trim(),
137 |       proposedChanges: proposedChanges.trim(),
138 |       rationale: rationale.trim(),
139 |       comments,
140 |       votes: votes.human.length > 0 || votes.ai.length > 0 ? votes : undefined
141 |     };
142 |   };
143 | 
144 |   const parsedContent = parseDiscussionContent(discussion.content);
145 | 
146 |   const getStatusColor = (status: string) => {
147 |     const statusLower = status.toLowerCase();
148 |     if (statusLower.includes('voting')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
149 |     if (statusLower.includes('active')) return 'bg-green-100 text-green-800 border-green-300';
150 |     if (statusLower.includes('draft')) return 'bg-gray-100 text-gray-800 border-gray-300';
151 |     if (statusLower.includes('review')) return 'bg-blue-100 text-blue-800 border-blue-300';
152 |     return 'bg-gray-100 text-gray-800 border-gray-300';
153 |   };
154 | 
155 |   return (
156 |     <ScrollArea className="h-[calc(100vh-200px)]">
157 |       <div className="space-y-6">
158 |         {/* Header */}
159 |         <Card className="border-0 shadow-lg">
160 |           <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
161 |             <div className="flex items-start justify-between gap-4">
162 |               <div className="flex-1">
163 |                 <h2 className="text-2xl font-bold text-gray-900 mb-3">{discussion.title}</h2>
164 |                 <div className="flex flex-wrap gap-3 items-center">
165 |                   <Badge className={`${getStatusColor(discussion.status)} font-medium px-3 py-1`}>
166 |                     {discussion.status}
167 |                   </Badge>
168 |                   {parsedContent.metadata['Proposal'] && (
169 |                     <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800">
170 |                       {parsedContent.metadata['Proposal']}
171 |                     </Badge>
172 |                   )}
173 |                   <Separator orientation="vertical" className="h-5" />
174 |                   <div className="flex items-center gap-2 text-sm text-gray-600">
175 |                     <Avatar className="h-6 w-6 bg-gray-200">
176 |                       <span className="text-xs">{discussion.author.charAt(1)}</span>
177 |                     </Avatar>
178 |                     <span className="font-medium">{discussion.author}</span>
179 |                     <span>opened on {discussion.created}</span>
180 |                   </div>
181 |                 </div>
182 |               </div>
183 |               <Button
184 |                 variant="outline"
185 |                 onClick={onBack}
186 |                 className="hover:bg-blue-50"
187 |               >
188 |                 ← Back to Principle
189 |               </Button>
190 |             </div>
191 |           </CardHeader>
192 | 
193 |           <CardContent className="p-6">
194 |             {/* Summary Section */}
195 |             {parsedContent.summary && (
196 |               <div className="mb-6">
197 |                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Summary</h3>
198 |                 <p className="text-gray-700 leading-relaxed">{parsedContent.summary}</p>
199 |               </div>
200 |             )}
201 | 
202 |             {/* Proposed Changes */}
203 |             {parsedContent.proposedChanges && (
204 |               <div className="mb-6">
205 |                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Proposed Changes</h3>
206 |                 <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
207 |                   <ReactMarkdown
208 |                     remarkPlugins={[remarkGfm]}
209 |                     className="prose prose-sm max-w-none"
210 |                   >
211 |                     {parsedContent.proposedChanges}
212 |                   </ReactMarkdown>
213 |                 </div>
214 |               </div>
215 |             )}
216 | 
217 |             {/* Rationale */}
218 |             {parsedContent.rationale && (
219 |               <div className="mb-6">
220 |                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Rationale</h3>
221 |                 <p className="text-gray-700 leading-relaxed">{parsedContent.rationale}</p>
222 |               </div>
223 |             )}
224 |           </CardContent>
225 |         </Card>
226 | 
227 |         {/* Discussion Thread */}
228 |         {parsedContent.comments.length > 0 && (
229 |           <Card className="border-0 shadow-lg">
230 |             <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
231 |               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
232 |                 <span className="text-2xl">💬</span>
233 |                 Discussion ({parsedContent.comments.length} comments)
234 |               </h3>
235 |             </CardHeader>
236 |             <CardContent className="p-0">
237 |               <div className="divide-y divide-gray-200">
238 |                 {parsedContent.comments.map((comment, idx) => (
239 |                   <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
240 |                     <div className="flex items-start gap-4">
241 |                       <Avatar className={`h-10 w-10 ${
242 |                         comment.role === 'ai-agent'
243 |                           ? 'bg-gradient-to-br from-blue-400 to-purple-400'
244 |                           : 'bg-gradient-to-br from-green-400 to-teal-400'
245 |                       }`}>
246 |                         <span className="text-white font-medium">
247 |                           {comment.role === 'ai-agent' ? '🤖' : comment.author.charAt(1)}
248 |                         </span>
249 |                       </Avatar>
250 |                       <div className="flex-1">
251 |                         <div className="flex items-center gap-3 mb-2">
252 |                           <span className="font-semibold text-gray-900">{comment.author}</span>
253 |                           <Badge
254 |                             variant="outline"
255 |                             className={`text-xs ${
256 |                               comment.role === 'ai-agent'
257 |                                 ? 'bg-purple-50 text-purple-700 border-purple-200'
258 |                                 : 'bg-green-50 text-green-700 border-green-200'
259 |                             }`}
260 |                           >
261 |                             {comment.role === 'ai-agent' ? 'AI Agent' : 'Human'}
262 |                           </Badge>
263 |                           <span className="text-sm text-gray-500">{comment.date}</span>
264 |                         </div>
265 |                         <div className="prose prose-sm max-w-none text-gray-700">
266 |                           <ReactMarkdown remarkPlugins={[remarkGfm]}>
267 |                             {comment.content}
268 |                           </ReactMarkdown>
269 |                         </div>
270 |                       </div>
271 |                     </div>
272 |                   </div>
273 |                 ))}
274 |               </div>
275 |             </CardContent>
276 |           </Card>
277 |         )}
278 | 
279 |         {/* Voting Status */}
280 |         {parsedContent.votes && (
281 |           <Card className="border-0 shadow-lg">
282 |             <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
283 |               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
284 |                 <span className="text-2xl">🗳️</span>
285 |                 Voting Status
286 |               </h3>
287 |             </CardHeader>
288 |             <CardContent className="p-6">
289 |               <div className="grid md:grid-cols-2 gap-6">
290 |                 <div>
291 |                   <h4 className="font-semibold text-gray-800 mb-3">Human Votes ({parsedContent.votes.human.length})</h4>
292 |                   <div className="space-y-2">
293 |                     {parsedContent.votes.human.map((vote, idx) => (
294 |                       <div key={idx} className="text-sm text-gray-700">{vote}</div>
295 |                     ))}
296 |                   </div>
297 |                 </div>
298 |                 <div>
299 |                   <h4 className="font-semibold text-gray-800 mb-3">AI Agent Recommendations ({parsedContent.votes.ai.length})</h4>
300 |                   <div className="space-y-2">
301 |                     {parsedContent.votes.ai.map((vote, idx) => (
302 |                       <div key={idx} className="text-sm text-gray-700">{vote}</div>
303 |                     ))}
304 |                   </div>
305 |                 </div>
306 |               </div>
307 |             </CardContent>
308 |           </Card>
309 |         )}
310 | 
311 |         {/* Agent Assignment Panel */}
312 |         <AgentAssignmentPanel />
313 |       </div>
314 |     </ScrollArea>
315 |   );
316 | }
```

## File: src/components/github-compatible/FeaturedDiscussion.tsx

- Extension: .tsx
- Language: typescript
- Size: 6261 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import Link from 'next/link';
  5 | import Image from 'next/image';
  6 | import { formatDistanceToNow } from 'date-fns';
  7 | import { MessageSquare, Circle, CheckCircle, ChevronUp, ArrowLeft } from 'lucide-react';
  8 | import { GitHubDiscussion } from '@/types/github-compatible';
  9 | import ReactMarkdown from 'react-markdown';
 10 | 
 11 | interface FeaturedDiscussionProps {
 12 |   discussion: GitHubDiscussion | null;
 13 |   onBack?: () => void;
 14 |   isSelected?: boolean;
 15 |   onDiscussionSelect?: (discussion: GitHubDiscussion) => void;
 16 |   basePath?: string; // For linking to discussion detail page
 17 | }
 18 | 
 19 | export function FeaturedDiscussion({
 20 |   discussion,
 21 |   onBack,
 22 |   isSelected = false,
 23 |   onDiscussionSelect,
 24 |   basePath
 25 | }: FeaturedDiscussionProps) {
 26 |   if (!discussion) {
 27 |     return (
 28 |       <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
 29 |         <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
 30 |         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Discussions</h3>
 31 |         <p className="text-gray-600">No discussions available for this organization</p>
 32 |       </div>
 33 |     );
 34 |   }
 35 | 
 36 |   return (
 37 |     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
 38 |       {/* Header */}
 39 |       <div className="p-6 border-b border-gray-100">
 40 |         <div className="flex items-start justify-between mb-4">
 41 |           <div className="flex items-center gap-3">
 42 |             {discussion.closed ? (
 43 |               <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
 44 |             ) : (
 45 |               <Circle className="w-6 h-6 text-green-600 flex-shrink-0" />
 46 |             )}
 47 |             <div>
 48 |               <h2 className="text-xl font-semibold text-gray-900 mb-1">
 49 |                 {discussion.title}
 50 |                 <span className="text-gray-500 ml-2 font-normal">#{discussion.number}</span>
 51 |               </h2>
 52 |               <div className="flex items-center gap-2 text-sm text-gray-600">
 53 |                 {discussion.category.emoji} {discussion.category.name} · opened{' '}
 54 |                 {formatDistanceToNow(new Date(discussion.createdAt))} ago by{' '}
 55 |                 <Link
 56 |                   href={discussion.author.url}
 57 |                   className="font-medium hover:underline"
 58 |                 >
 59 |                   {discussion.author.login}
 60 |                 </Link>
 61 |               </div>
 62 |             </div>
 63 |           </div>
 64 | 
 65 |           {isSelected && onBack && (
 66 |             <button
 67 |               onClick={onBack}
 68 |               className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
 69 |             >
 70 |               <ArrowLeft className="w-4 h-4" />
 71 |               Back
 72 |             </button>
 73 |           )}
 74 |         </div>
 75 | 
 76 |         {/* Labels */}
 77 |         {discussion.labels.nodes.length > 0 && (
 78 |           <div className="flex gap-2 mb-4">
 79 |             {discussion.labels.nodes.map((label) => (
 80 |               <span
 81 |                 key={label.id}
 82 |                 className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
 83 |                 style={{
 84 |                   backgroundColor: `#${label.color}20`,
 85 |                   color: `#${label.color}`,
 86 |                   border: `1px solid #${label.color}40`,
 87 |                 }}
 88 |               >
 89 |                 {label.name}
 90 |               </span>
 91 |             ))}
 92 |           </div>
 93 |         )}
 94 | 
 95 |         {/* Stats */}
 96 |         <div className="flex items-center gap-6 text-sm text-gray-600">
 97 |           <div className="flex items-center gap-1">
 98 |             <ChevronUp className="w-4 h-4" />
 99 |             {discussion.upvoteCount} upvotes
100 |           </div>
101 |           <div className="flex items-center gap-1">
102 |             <MessageSquare className="w-4 h-4" />
103 |             {discussion.comments.totalCount} comments
104 |           </div>
105 |         </div>
106 |       </div>
107 | 
108 |       {/* Body */}
109 |       <div className="p-6">
110 |         <div className="prose prose-gray max-w-none">
111 |           <ReactMarkdown>{discussion.body}</ReactMarkdown>
112 |         </div>
113 |       </div>
114 | 
115 |       {/* Recent Comments Preview */}
116 |       {discussion.comments.nodes.length > 0 && (
117 |         <div className="border-t border-gray-100 p-6">
118 |           <h3 className="font-medium text-gray-900 mb-4">Recent Comments</h3>
119 |           <div className="space-y-4">
120 |             {discussion.comments.nodes.slice(0, 2).map((comment) => (
121 |               <div key={comment.id} className="flex gap-3">
122 |                 <Image
123 |                   src={comment.author.avatarUrl}
124 |                   alt={comment.author.login}
125 |                   width={32}
126 |                   height={32}
127 |                   className="w-8 h-8 rounded-full flex-shrink-0"
128 |                 />
129 |                 <div className="flex-1 min-w-0">
130 |                   <div className="flex items-center gap-2 mb-1">
131 |                     <Link
132 |                       href={comment.author.url}
133 |                       className="font-medium text-sm hover:underline"
134 |                     >
135 |                       {comment.author.login}
136 |                     </Link>
137 |                     <span className="text-xs text-gray-500">
138 |                       {formatDistanceToNow(new Date(comment.createdAt))} ago
139 |                     </span>
140 |                   </div>
141 |                   <div className="text-sm text-gray-700 line-clamp-3">
142 |                     <ReactMarkdown>{comment.body}</ReactMarkdown>
143 |                   </div>
144 |                 </div>
145 |               </div>
146 |             ))}
147 |           </div>
148 | 
149 |           {discussion.comments.totalCount > 2 && (
150 |             <div className="mt-4 pt-4 border-t border-gray-50">
151 |               {basePath ? (
152 |                 <Link
153 |                   href={`${basePath}/discussions/${discussion.number}`}
154 |                   className="text-sm text-blue-600 hover:text-blue-800 font-medium"
155 |                 >
156 |                   View all {discussion.comments.totalCount} comments →
157 |                 </Link>
158 |               ) : (
159 |                 <button
160 |                   onClick={() => onDiscussionSelect?.(discussion)}
161 |                   className="text-sm text-blue-600 hover:text-blue-800 font-medium"
162 |                 >
163 |                   View all {discussion.comments.totalCount} comments →
164 |                 </button>
165 |               )}
166 |             </div>
167 |           )}
168 |         </div>
169 |       )}
170 |     </div>
171 |   );
172 | }
```

## File: src/components/github-compatible/DiscussionList.tsx

- Extension: .tsx
- Language: typescript
- Size: 5163 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React from 'react';
  4 | import Link from 'next/link';
  5 | import { formatDistanceToNow } from 'date-fns';
  6 | import { MessageSquare, Circle, CheckCircle } from 'lucide-react';
  7 | import { GitHubDiscussion } from '@/types/github-compatible';
  8 | 
  9 | interface DiscussionListProps {
 10 |   discussions: GitHubDiscussion[];
 11 |   basePath?: string; // e.g., "/forum/core-governance/terms/harm"
 12 |   onDiscussionSelect?: (discussion: GitHubDiscussion) => void; // For in-page selection
 13 | }
 14 | 
 15 | export function DiscussionList({ discussions, basePath, onDiscussionSelect }: DiscussionListProps) {
 16 |   return (
 17 |     <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
 18 |       {discussions.length === 0 ? (
 19 |         <div className="p-8 text-center text-gray-500">
 20 |           No discussions found
 21 |         </div>
 22 |       ) : (
 23 |         discussions.map((discussion) => (
 24 |           <div
 25 |             key={discussion.id}
 26 |             className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
 27 |           >
 28 |             <div className="flex items-start gap-3">
 29 |               {/* Open/Closed indicator */}
 30 |               <div className="mt-1">
 31 |                 {discussion.closed ? (
 32 |                   <CheckCircle className="w-5 h-5 text-purple-600" />
 33 |                 ) : (
 34 |                   <Circle className="w-5 h-5 text-green-600" />
 35 |                 )}
 36 |               </div>
 37 | 
 38 |               <div className="flex-1 min-w-0">
 39 |                 <div className="flex items-center gap-2 flex-wrap">
 40 |                   {onDiscussionSelect ? (
 41 |                     <button
 42 |                       onClick={() => onDiscussionSelect(discussion)}
 43 |                       className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400 text-left"
 44 |                     >
 45 |                       {discussion.title}
 46 |                     </button>
 47 |                   ) : basePath ? (
 48 |                     <Link
 49 |                       href={`${basePath}/discussions/${discussion.number}`}
 50 |                       className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400"
 51 |                     >
 52 |                       {discussion.title}
 53 |                     </Link>
 54 |                   ) : (
 55 |                     <span className="text-base font-semibold">
 56 |                       {discussion.title}
 57 |                     </span>
 58 |                   )}
 59 | 
 60 |                   {/* Labels */}
 61 |                   {discussion.labels.nodes.map((label) => (
 62 |                     <span
 63 |                       key={label.id}
 64 |                       className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
 65 |                       style={{
 66 |                         backgroundColor: `#${label.color}20`,
 67 |                         color: `#${label.color}`,
 68 |                         border: `1px solid #${label.color}40`,
 69 |                       }}
 70 |                     >
 71 |                       {label.name}
 72 |                     </span>
 73 |                   ))}
 74 |                 </div>
 75 | 
 76 |                 {/* Metadata */}
 77 |                 <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
 78 |                   {discussion.category.emoji} {discussion.category.name} · opened{' '}
 79 |                   {formatDistanceToNow(new Date(discussion.createdAt))} ago by{' '}
 80 |                   <Link
 81 |                     href={discussion.author.url}
 82 |                     className="font-medium hover:underline"
 83 |                   >
 84 |                     {discussion.author.login}
 85 |                   </Link>
 86 |                   {discussion.comments.totalCount > 0 && (
 87 |                     <> · {discussion.comments.totalCount} comments</>
 88 |                   )}
 89 |                   {discussion.upvoteCount > 0 && (
 90 |                     <> · {discussion.upvoteCount} upvotes</>
 91 |                   )}
 92 |                 </div>
 93 |               </div>
 94 | 
 95 |               {/* Comment count */}
 96 |               {discussion.comments.totalCount > 0 && (
 97 |                 onDiscussionSelect ? (
 98 |                   <button
 99 |                     onClick={() => onDiscussionSelect(discussion)}
100 |                     className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
101 |                   >
102 |                     <MessageSquare className="w-4 h-4" />
103 |                     {discussion.comments.totalCount}
104 |                   </button>
105 |                 ) : basePath ? (
106 |                   <Link
107 |                     href={`${basePath}/discussions/${discussion.number}`}
108 |                     className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
109 |                   >
110 |                     <MessageSquare className="w-4 h-4" />
111 |                     {discussion.comments.totalCount}
112 |                   </Link>
113 |                 ) : (
114 |                   <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
115 |                     <MessageSquare className="w-4 h-4" />
116 |                     {discussion.comments.totalCount}
117 |                   </div>
118 |                 )
119 |               )}
120 |             </div>
121 |           </div>
122 |         ))
123 |       )}
124 |     </div>
125 |   );
126 | }
```

## File: src/components/github-compatible/DiscussionView.tsx

- Extension: .tsx
- Language: typescript
- Size: 16771 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import React, { useState } from 'react';
  4 | import Link from 'next/link';
  5 | import Image from 'next/image';
  6 | import { formatDistanceToNow } from 'date-fns';
  7 | import { GitHubDiscussion, GitHubDiscussionComment } from '@/types/github-compatible';
  8 | import { CheckCircle, Circle, ChevronUp, Bot } from 'lucide-react';
  9 | import ReactMarkdown from 'react-markdown';
 10 | import AgentAssignmentPanel from '@/components/governance/AgentAssignmentPanel';
 11 | 
 12 | interface DiscussionViewProps {
 13 |   discussion: GitHubDiscussion;
 14 | }
 15 | 
 16 | export function DiscussionView({ discussion }: DiscussionViewProps) {
 17 |   const [selectedCommentForAgent, setSelectedCommentForAgent] = useState<string | null>(null);
 18 | 
 19 |   return (
 20 |     <div className="max-w-5xl mx-auto">
 21 |       {/* Header */}
 22 |       <div className="mb-6">
 23 |         <div className="flex items-center gap-2 mb-2">
 24 |           {discussion.closed ? (
 25 |             <CheckCircle className="w-6 h-6 text-purple-600" />
 26 |           ) : (
 27 |             <Circle className="w-6 h-6 text-green-600" />
 28 |           )}
 29 |           <h1 className="text-2xl font-semibold">
 30 |             {discussion.title}
 31 |             <span className="text-gray-500 ml-2">#{discussion.number}</span>
 32 |           </h1>
 33 |         </div>
 34 | 
 35 |         <div className="text-sm text-gray-600 dark:text-gray-400">
 36 |           <Link href={discussion.author.url} className="font-medium hover:underline">
 37 |             {discussion.author.login}
 38 |           </Link>
 39 |           {' '}opened this discussion {formatDistanceToNow(new Date(discussion.createdAt))} ago
 40 |           {' · '}{discussion.comments.totalCount} comments
 41 |         </div>
 42 |       </div>
 43 | 
 44 |       {/* Labels */}
 45 |       {discussion.labels.nodes.length > 0 && (
 46 |         <div className="mb-4 flex gap-2">
 47 |           {discussion.labels.nodes.map((label) => (
 48 |             <span
 49 |               key={label.id}
 50 |               className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
 51 |               style={{
 52 |                 backgroundColor: `#${label.color}20`,
 53 |                 color: `#${label.color}`,
 54 |                 border: `1px solid #${label.color}40`,
 55 |               }}
 56 |             >
 57 |               {label.name}
 58 |             </span>
 59 |           ))}
 60 |         </div>
 61 |       )}
 62 | 
 63 |       {/* Main discussion body */}
 64 |       <div className="border border-gray-300 dark:border-gray-700 rounded-lg mb-6">
 65 |         <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
 66 |           <div className="flex items-center gap-3">
 67 |             <Image
 68 |               src={discussion.author.avatarUrl}
 69 |               alt={discussion.author.login}
 70 |               width={32}
 71 |               height={32}
 72 |               className="w-8 h-8 rounded-full"
 73 |             />
 74 |             <div>
 75 |               <Link href={discussion.author.url} className="font-medium hover:underline">
 76 |                 {discussion.author.login}
 77 |               </Link>
 78 |               <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
 79 |                 {formatDistanceToNow(new Date(discussion.createdAt))} ago
 80 |               </span>
 81 |             </div>
 82 |           </div>
 83 |         </div>
 84 | 
 85 |         <div className="p-4">
 86 |           <div className="prose dark:prose-invert max-w-none">
 87 |             <ReactMarkdown>{discussion.body}</ReactMarkdown>
 88 |           </div>
 89 | 
 90 |           <div className="mt-4 flex items-center gap-4">
 91 |             <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
 92 |               <ChevronUp className="w-4 h-4" />
 93 |               {discussion.upvoteCount} upvotes
 94 |             </button>
 95 |           </div>
 96 |         </div>
 97 |       </div>
 98 | 
 99 |       {/* Comments - Threaded View */}
100 |       <div className="space-y-4">
101 |         {(() => {
102 |           // Build a threaded comment structure
103 |           const commentMap = new Map<string, GitHubDiscussionComment[]>();
104 |           const rootComments: GitHubDiscussionComment[] = [];
105 | 
106 |           // First pass: organize comments by parent
107 |           discussion.comments.nodes.forEach(comment => {
108 |             if (!comment.parentCommentId) {
109 |               rootComments.push(comment);
110 |             } else {
111 |               if (!commentMap.has(comment.parentCommentId)) {
112 |                 commentMap.set(comment.parentCommentId, []);
113 |               }
114 |               commentMap.get(comment.parentCommentId)!.push(comment);
115 |             }
116 |           });
117 | 
118 |           // Sort root comments by date
119 |           rootComments.sort((a, b) =>
120 |             new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
121 |           );
122 | 
123 |           // Sort child comments by date
124 |           commentMap.forEach(children => {
125 |             children.sort((a, b) =>
126 |               new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
127 |             );
128 |           });
129 | 
130 |           // Recursive function to render comment thread
131 |           const renderCommentThread = (
132 |             comment: GitHubDiscussionComment,
133 |             indentLevel: number = 0
134 |           ): React.JSX.Element[] => {
135 |             const maxIndentLevel = 3;
136 |             const actualIndentLevel = Math.min(indentLevel, maxIndentLevel);
137 | 
138 |             const elements: React.JSX.Element[] = [];
139 | 
140 |             // Render the comment itself
141 |             elements.push(
142 |               <div
143 |                 key={comment.id}
144 |                 style={{
145 |                   marginLeft: `${actualIndentLevel * 32}px`,
146 |                   position: 'relative'
147 |                 }}
148 |               >
149 |                 {/* Indent line indicator */}
150 |                 {actualIndentLevel > 0 && (
151 |                   <div
152 |                     className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"
153 |                     style={{
154 |                       left: `${-16}px`,
155 |                       top: '20px'
156 |                     }}
157 |                   />
158 |                 )}
159 | 
160 |                 <CommentView
161 |                   comment={comment}
162 |                   isAnswer={comment.id === discussion.answer?.id}
163 |                   onBotClick={() => setSelectedCommentForAgent(
164 |                     selectedCommentForAgent === comment.id ? null : comment.id
165 |                   )}
166 |                   showAgentPanel={selectedCommentForAgent === comment.id}
167 |                   indentLevel={actualIndentLevel}
168 |                 />
169 |               </div>
170 |             );
171 | 
172 |             // Render child comments recursively
173 |             const children = commentMap.get(comment.id) || [];
174 |             children.forEach(child => {
175 |               elements.push(...renderCommentThread(child, indentLevel + 1));
176 |             });
177 | 
178 |             return elements;
179 |           };
180 | 
181 |           // Render all root comments and their threads
182 |           return rootComments.flatMap(comment => renderCommentThread(comment));
183 |         })()}
184 |       </div>
185 |     </div>
186 |   );
187 | }
188 | 
189 | function CommentView({
190 |   comment,
191 |   isAnswer,
192 |   onBotClick,
193 |   showAgentPanel,
194 |   indentLevel = 0
195 | }: {
196 |   comment: GitHubDiscussionComment;
197 |   isAnswer?: boolean;
198 |   onBotClick: () => void;
199 |   showAgentPanel: boolean;
200 |   indentLevel?: number;
201 | }) {
202 |   const isBot = comment.isBot || false;
203 |   const hasAssignedAgent = comment.hasAssignedAgent || false;
204 |   const assignmentType = comment.aiAssignment?.assignmentType;
205 | 
206 |   // Determine border and background colors based on comment type
207 |   const getCommentStyling = () => {
208 |     if (isAnswer) return 'border-green-500 bg-green-50 dark:bg-green-900/20';
209 |     if (isBot) {
210 |       switch (assignmentType) {
211 |         case 'user_requested':
212 |           return 'border-blue-400 bg-blue-50 dark:bg-blue-900/20';
213 |         case 'third_party_verification':
214 |           return 'border-purple-400 bg-purple-50 dark:bg-purple-900/20';
215 |         case 'system_automatic':
216 |           return 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20';
217 |         default:
218 |           return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20';
219 |       }
220 |     }
221 |     if (hasAssignedAgent) {
222 |       return 'border-orange-300 bg-orange-50 dark:bg-orange-900/20';
223 |     }
224 |     return 'border-gray-300 dark:border-gray-700';
225 |   };
226 | 
227 |   return (
228 |     <div className={`border rounded-lg ${getCommentStyling()}`}>
229 |       <div className={`px-4 py-2 border-b ${
230 |         isBot && assignmentType === 'user_requested'
231 |           ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600'
232 |           : isBot && assignmentType === 'third_party_verification'
233 |           ? 'bg-purple-100 dark:bg-purple-800 border-purple-300 dark:border-purple-600'
234 |           : isBot && assignmentType === 'system_automatic'
235 |           ? 'bg-indigo-100 dark:bg-indigo-800 border-indigo-300 dark:border-indigo-600'
236 |           : isBot
237 |           ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600'
238 |           : hasAssignedAgent
239 |           ? 'bg-orange-100 dark:bg-orange-800 border-orange-300 dark:border-orange-600'
240 |           : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
241 |       }`}>
242 |         <div className="flex items-center justify-between">
243 |           <div className="flex items-center gap-3">
244 |             <div className="relative">
245 |               <Image
246 |                 src={comment.author.avatarUrl}
247 |                 alt={comment.author.login}
248 |                 width={32}
249 |                 height={32}
250 |                 className={`w-8 h-8 rounded-full ${isBot ? 'ring-2 ring-blue-400' : ''}`}
251 |               />
252 |               {isBot && (
253 |                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
254 |                   <Bot className="w-2.5 h-2.5 text-white" />
255 |                 </div>
256 |               )}
257 |             </div>
258 |             <div>
259 |               <div className="flex items-center gap-2">
260 |                 <Link href={comment.author.url} className="font-medium hover:underline">
261 |                   {comment.author.login}
262 |                 </Link>
263 |                 {isBot && (
264 |                   <span className={`px-2 py-0.5 text-white text-xs rounded-full font-medium ${
265 |                     assignmentType === 'user_requested'
266 |                       ? 'bg-blue-600'
267 |                       : assignmentType === 'third_party_verification'
268 |                       ? 'bg-purple-600'
269 |                       : assignmentType === 'system_automatic'
270 |                       ? 'bg-indigo-600'
271 |                       : 'bg-blue-600'
272 |                   }`}>
273 |                     {assignmentType === 'user_requested'
274 |                       ? 'PERSONAL AI'
275 |                       : assignmentType === 'third_party_verification'
276 |                       ? 'VERIFICATION AI'
277 |                       : assignmentType === 'system_automatic'
278 |                       ? 'AUTO AI'
279 |                       : 'AI AGENT'
280 |                     }
281 |                   </span>
282 |                 )}
283 |                 {hasAssignedAgent && !isBot && (
284 |                   <span className="px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full font-medium">
285 |                     🤖 ASSIGNED AGENT
286 |                   </span>
287 |                 )}
288 |               </div>
289 |               <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
290 |                 <span>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
291 |                 {comment.aiAssignment && (
292 |                   <>
293 |                     <span>•</span>
294 |                     <span className="text-blue-600 dark:text-blue-400">
295 |                       {comment.aiAssignment.taskType.replace('_', ' ')}
296 |                     </span>
297 |                     {comment.aiAssignment.confidence && (
298 |                       <>
299 |                         <span>•</span>
300 |                         <span className="text-green-600 dark:text-green-400">
301 |                           {Math.round(comment.aiAssignment.confidence * 100)}% confidence
302 |                         </span>
303 |                       </>
304 |                     )}
305 |                   </>
306 |                 )}
307 |               </div>
308 |             </div>
309 |           </div>
310 |           <div className="flex items-center gap-2">
311 |             {isAnswer && (
312 |               <span className="text-sm text-green-600 font-medium">✓ Answer</span>
313 |             )}
314 |             <button
315 |               onClick={onBotClick}
316 |               className={`p-2 rounded-md transition-colors ${
317 |                 showAgentPanel
318 |                   ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
319 |                   : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700'
320 |               }`}
321 |               title="Assign AI Agent"
322 |             >
323 |               <Bot className="w-4 h-4" />
324 |             </button>
325 |           </div>
326 |         </div>
327 |       </div>
328 | 
329 |       <div className={`${showAgentPanel ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
330 |         {/* Comment Content */}
331 |         <div className="p-4">
332 |           <div className="prose dark:prose-invert max-w-none">
333 |             <ReactMarkdown>{comment.body}</ReactMarkdown>
334 |           </div>
335 | 
336 |           {/* Verification Target Indicator - Only show if verifying a different comment */}
337 |           {comment.verificationTarget && comment.verificationTarget !== comment.parentCommentId && (
338 |             <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded border-l-4 border-purple-400">
339 |               <div className="text-sm text-purple-700 dark:text-purple-300">
340 |                 <strong>🔍 Verifying comment #{comment.verificationTarget.replace('comment-', '')}</strong>
341 |               </div>
342 |             </div>
343 |           )}
344 | 
345 |           {/* AI Agent Assignment Info */}
346 |           {hasAssignedAgent && !isBot && comment.assignedAgentId && (
347 |             <div className="mt-2 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
348 |               <div className="text-sm text-orange-800 dark:text-orange-200">
349 |                 <strong>🤖 AI Agent Assigned:</strong>{' '}
350 |                 <span className="font-mono">{comment.assignedAgentId}</span>
351 |                 <span className="ml-2 px-2 py-0.5 bg-orange-200 text-orange-900 text-xs rounded">
352 |                   awaiting response
353 |                 </span>
354 |               </div>
355 |             </div>
356 |           )}
357 | 
358 |           {/* AI Agent Tools Used */}
359 |           {isBot && comment.aiAssignment?.tools_used && (
360 |             <div className={`mt-3 p-3 rounded-lg border ${
361 |               assignmentType === 'user_requested'
362 |                 ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
363 |                 : assignmentType === 'third_party_verification'
364 |                 ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700'
365 |                 : assignmentType === 'system_automatic'
366 |                 ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700'
367 |                 : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
368 |             }`}>
369 |               <div className={`text-sm ${
370 |                 assignmentType === 'user_requested'
371 |                   ? 'text-blue-800 dark:text-blue-200'
372 |                   : assignmentType === 'third_party_verification'
373 |                   ? 'text-purple-800 dark:text-purple-200'
374 |                   : assignmentType === 'system_automatic'
375 |                   ? 'text-indigo-800 dark:text-indigo-200'
376 |                   : 'text-blue-800 dark:text-blue-200'
377 |               }`}>
378 |                 <strong>🔧 MCP Tools Used:</strong>{' '}
379 |                 <span className="font-mono">
380 |                   {comment.aiAssignment.tools_used.join(', ')}
381 |                 </span>
382 |                 {comment.aiAssignment.isAutomated && (
383 |                   <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
384 |                     automated
385 |                   </span>
386 |                 )}
387 |                 {comment.aiAssignment.triggeredBy && (
388 |                   <div className="mt-1 text-xs">
389 |                     <strong>Triggered by:</strong> {comment.aiAssignment.triggeredBy.map(id => `#${id.replace('comment-', '')}`).join(', ')}
390 |                   </div>
391 |                 )}
392 |               </div>
393 |             </div>
394 |           )}
395 | 
396 |           <div className="mt-4 flex items-center gap-4">
397 |             <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
398 |               <ChevronUp className="w-4 h-4" />
399 |               {comment.upvoteCount} upvotes
400 |             </button>
401 |             {isBot && comment.aiAssignment?.assignedBy && (
402 |               <span className="text-xs text-gray-500">
403 |                 Assigned by {comment.aiAssignment.assignedBy}
404 |               </span>
405 |             )}
406 |           </div>
407 |         </div>
408 | 
409 |         {/* Agent Assignment Panel - shown on the right when bot icon is clicked */}
410 |         {showAgentPanel && (
411 |           <div className="p-4 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
412 |             <AgentAssignmentPanel />
413 |           </div>
414 |         )}
415 |       </div>
416 |     </div>
417 |   );
418 | }
```

## File: src/types/governance.ts

- Extension: .ts
- Language: typescript
- Size: 3864 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | export interface GovernancePrinciple {
  2 |   version: string;
  3 |   principle_id: string;
  4 |   name: string;
  5 |   description: string;
  6 |   category: string;
  7 |   domain?: string;
  8 |   previous_version?: string;
  9 |   
 10 |   // Standard fields
 11 |   requirements?: Record<string, any>;
 12 |   validation_rules?: Record<string, any>;
 13 |   examples?: Record<string, any>;
 14 |   cross_domain_applications?: Record<string, string>;
 15 |   changelog?: Record<string, any>;
 16 |   
 17 |   // Animal welfare specific
 18 |   freedoms?: Record<string, {
 19 |     description: string;
 20 |     requirements: string[];
 21 |     indicators: string[];
 22 |   }>;
 23 |   implementation?: {
 24 |     assessment_frequency: string;
 25 |     reporting_requirement: string;
 26 |     intervention_threshold: string;
 27 |   };
 28 |   
 29 |   // Environment specific
 30 |   ecosystem_assessment_framework?: {
 31 |     structural_indicators?: Record<string, any>;
 32 |     functional_indicators?: Record<string, any>;
 33 |     resilience_indicators?: Record<string, any>;
 34 |   };
 35 |   monitoring_protocols?: Record<string, any>;
 36 |   intervention_strategies?: Record<string, any>;
 37 |   decision_making_framework?: Record<string, any>;
 38 |   emergency_response?: {
 39 |     ecosystem_crisis_triggers?: string[];
 40 |     emergency_protocols?: string[];
 41 |   };
 42 |   
 43 |   // Core governance specific
 44 |   harm_categories?: Record<string, any>;
 45 |   assessment_framework?: Record<string, any>;
 46 |   
 47 |   // Inheritance metadata
 48 |   inheritance_source?: string; // Which domain this principle comes from
 49 |   is_inherited?: boolean; // True if inherited from parent domain
 50 |   inheritance_modification?: string; // How inheritance was modified
 51 |   extension_config?: any; // Domain extension configuration
 52 |   
 53 |   // Term-related fields
 54 |   uses_terms?: string[]; // Array of term references like "core:harm@v1.1"
 55 |   term_definitions?: Record<string, any>; // Resolved term definitions
 56 |   
 57 |   // Flexible for other domain-specific structures
 58 |   [key: string]: any;
 59 | }
 60 | 
 61 | export interface InheritanceConfig {
 62 |   version: string;
 63 |   name: string;
 64 |   description: string;
 65 |   repository: string;
 66 |   extends: string | null;
 67 |   
 68 |   // Core governance specific
 69 |   provides?: string[];
 70 |   governance?: {
 71 |     amendment_threshold?: number;
 72 |     review_period?: string;
 73 |     emergency_override?: string;
 74 |   };
 75 |   
 76 |   // Domain extension specific
 77 |   inheritance?: {
 78 |     core_principles?: Record<string, string>; // principle_id -> inheritance_rule
 79 |   };
 80 |   domain_extensions?: Record<string, {
 81 |     version: string;
 82 |     description: string;
 83 |     status: 'core_to_domain' | 'domain_specific';
 84 |   }>;
 85 |   specialization?: {
 86 |     decision_authority?: Record<string, string>;
 87 |     municipal_coordination?: Record<string, string>;
 88 |     cross_domain_collaboration?: Record<string, string>;
 89 |   };
 90 | }
 91 | 
 92 | export interface GovernanceDiscussion {
 93 |   title: string;
 94 |   status: string;
 95 |   proposal?: string;
 96 |   created: string;
 97 |   author: string;
 98 |   summary: string;
 99 |   content: string;
100 |   filename: string;
101 |   path: string;
102 | }
103 | 
104 | export interface GovernanceOrganization {
105 |   id: string;
106 |   name: string;
107 |   version: string;
108 |   description: string;
109 |   inheritance: InheritanceConfig;
110 |   principles: GovernancePrinciple[];
111 |   discussions: GovernanceDiscussion[];
112 |   emoji: string;
113 |   
114 |   // Computed inheritance info
115 |   inherits_from?: string[];
116 |   extended_by?: string[];
117 |   inheritance_chain?: InheritanceConfig[];
118 | }
119 | 
120 | export interface GovernanceData {
121 |   organizations: GovernanceOrganization[];
122 |   principlesByOrg: Record<string, GovernancePrinciple[]>;
123 |   discussionsByPrinciple: Record<string, GovernanceDiscussion[]>;
124 | }
125 | 
126 | export type OrganizationType = 'core-governance' | 'animal-welfare' | 'environment';
127 | 
128 | export interface Term {
129 |   namespace: string;
130 |   name: string;
131 |   version: string;
132 |   definition: string;
133 |   extends?: string;
134 |   created: string;
135 |   changes?: string[];
136 |   dimensions?: string[];
137 |   types?: Record<string, string>;
138 |   [key: string]: any;
139 | }
140 | 
141 | export interface TermDictionary {
142 |   version: string;
143 |   namespace: string;
144 |   terms: Record<string, Record<string, Term>>;
145 | }
```

## File: src/types/github-compatible.ts

- Extension: .ts
- Language: typescript
- Size: 3379 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | // GitHub User type
  2 | export interface GitHubUser {
  3 |   login: string;
  4 |   id: string;
  5 |   avatarUrl: string;
  6 |   url: string;
  7 |   name?: string;
  8 |   bio?: string;
  9 | }
 10 | 
 11 | // Label type
 12 | export interface GitHubLabel {
 13 |   id: string;
 14 |   name: string;
 15 |   color: string;
 16 |   description?: string;
 17 | }
 18 | 
 19 | // Discussion Comment type
 20 | export interface GitHubDiscussionComment {
 21 |   id: string;
 22 |   body: string;
 23 |   createdAt: string;
 24 |   updatedAt: string;
 25 |   author: GitHubUser;
 26 |   isAnswer?: boolean;
 27 |   isBot?: boolean;
 28 |   hasAssignedAgent?: boolean;
 29 |   assignedAgentId?: string;
 30 |   parentCommentId?: string;
 31 |   verificationTarget?: string;
 32 |   aiAssignment?: {
 33 |     taskType: string;
 34 |     assignedBy: string;
 35 |     tools_used: string[];
 36 |     confidence: number;
 37 |     isAutomated?: boolean;
 38 |     assignmentType?: 'user_requested' | 'third_party_verification' | 'system_automatic';
 39 |     triggeredBy?: string[];
 40 |   };
 41 |   replies?: {
 42 |     totalCount: number;
 43 |     nodes: GitHubDiscussionComment[];
 44 |   };
 45 |   upvoteCount: number;
 46 | }
 47 | 
 48 | // Discussion type
 49 | export interface GitHubDiscussion {
 50 |   id: string;
 51 |   number: number;
 52 |   title: string;
 53 |   body: string;
 54 |   createdAt: string;
 55 |   updatedAt: string;
 56 |   closed: boolean;
 57 |   closedAt?: string;
 58 |   author: GitHubUser;
 59 |   category: {
 60 |     id: string;
 61 |     name: string;
 62 |     slug: string;
 63 |     emoji?: string;
 64 |     isAnswerable?: boolean;
 65 |   };
 66 |   labels: {
 67 |     nodes: GitHubLabel[];
 68 |   };
 69 |   comments: {
 70 |     totalCount: number;
 71 |     nodes: GitHubDiscussionComment[];
 72 |   };
 73 |   upvoteCount: number;
 74 |   answerChosenAt?: string;
 75 |   answer?: GitHubDiscussionComment;
 76 | }
 77 | 
 78 | // GraphQL-style connection types
 79 | export interface PageInfo {
 80 |   hasNextPage: boolean;
 81 |   hasPreviousPage: boolean;
 82 |   startCursor?: string;
 83 |   endCursor?: string;
 84 | }
 85 | 
 86 | export interface DiscussionConnection {
 87 |   totalCount: number;
 88 |   pageInfo: PageInfo;
 89 |   nodes: GitHubDiscussion[];
 90 | }
 91 | 
 92 | // List options
 93 | export interface ListOptions {
 94 |   first?: number;
 95 |   after?: string;
 96 |   orderBy?: {
 97 |     field: 'CREATED_AT' | 'UPDATED_AT' | 'COMMENTS';
 98 |     direction: 'ASC' | 'DESC';
 99 |   };
100 |   labels?: string[];
101 |   states?: ('OPEN' | 'CLOSED')[];
102 |   category?: string;
103 | }
104 | 
105 | // Term Discussion Types
106 | export interface TermDefinition {
107 |   version: string;
108 |   text: string;
109 |   ratified_date: string;
110 |   approval_rate: string;
111 |   ratification_comment_id: string;
112 |   author: GitHubUser;
113 |   extends?: string;
114 |   specificity?: string;
115 | }
116 | 
117 | export interface TermVersionHistory {
118 |   version: string;
119 |   text: string;
120 |   proposed_date: string;
121 |   ratified_date?: string;
122 |   status: 'active' | 'superseded' | 'rejected';
123 |   approval_rate?: string;
124 |   proposer: GitHubUser;
125 |   initial_adoption?: boolean;
126 | }
127 | 
128 | export interface ProposedTermVersion {
129 |   version: string;
130 |   text: string;
131 |   proposed_date: string;
132 |   proposer: GitHubUser;
133 |   status: 'under_discussion' | 'voting' | 'rejected';
134 |   current_support: string;
135 |   discussion_deadline?: string;
136 |   changes_from_current?: string[];
137 | }
138 | 
139 | export interface TermDiscussion {
140 |   id: string;
141 |   number: number;
142 |   title: string;
143 |   status: 'active' | 'closed';
144 |   category: {
145 |     id: string;
146 |     name: string;
147 |     slug: string;
148 |     emoji?: string;
149 |   };
150 |   current_definition: TermDefinition;
151 |   version_history: TermVersionHistory[];
152 |   proposed_versions: ProposedTermVersion[];
153 |   comments: {
154 |     totalCount: number;
155 |     nodes: GitHubDiscussionComment[];
156 |   };
157 |   labels: {
158 |     nodes: GitHubLabel[];
159 |   };
160 |   upvoteCount: number;
161 |   createdAt: string;
162 |   updatedAt: string;
163 |   closed: boolean;
164 | }
```

## File: src/types/agents.ts

- Extension: .ts
- Language: typescript
- Size: 3195 bytes
- Created: 2025-06-13 17:36:05
- Modified: 2025-06-13 17:36:05

### Code

```typescript
  1 | export interface TokenRecord {
  2 |   amount: number;
  3 |   timestamp: string;
  4 |   source: 'contribution' | 'deployment' | 'governance' | 'roi';
  5 |   description: string;
  6 | }
  7 | 
  8 | export interface CompleteValueSystem {
  9 |   coreValues: string[];
 10 |   customValues: string[];
 11 |   priorityLevel: 'conservative' | 'balanced' | 'progressive';
 12 |   inheritedFrom: string; // Parent DAHAO ID
 13 |   personalModifications: string[];
 14 | }
 15 | 
 16 | export interface SystemAuthority {
 17 |   level: 'readonly' | 'validation' | 'enforcement' | 'override';
 18 |   scope: string[];
 19 |   limitations: string[];
 20 | }
 21 | 
 22 | export interface PersonalAIAgent {
 23 |   id: string;
 24 |   userId: string;
 25 |   name: string;
 26 |   type: 'personal';
 27 |   valueSystem: CompleteValueSystem;
 28 |   personalityTraits: string[];
 29 |   decisionMaking: 'consensus' | 'autonomous' | 'hybrid';
 30 |   deploymentTargets: string[];
 31 |   tokenEarnings: TokenRecord[];
 32 |   capabilities: {
 33 |     crossBranchDeployment: boolean;
 34 |     valueSystemOverride: boolean;
 35 |     personalizedReasoning: boolean;
 36 |     userSpecificLearning: boolean;
 37 |   };
 38 |   performance: {
 39 |     totalDeployments: number;
 40 |     successRate: number;
 41 |     userSatisfaction: number;
 42 |     tokenValue: number;
 43 |   };
 44 |   createdAt: string;
 45 |   lastActive: string;
 46 |   status: 'active' | 'training' | 'offline' | 'pending';
 47 | }
 48 | 
 49 | export interface SystemAIAgent {
 50 |   id: string;
 51 |   name: string;
 52 |   type: 'system';
 53 |   constraints: {
 54 |     mainDAHAOValuesOnly: boolean;
 55 |     noPersonalModifications: boolean;
 56 |     strictCompliance: boolean;
 57 |   };
 58 |   role: 'validation' | 'compliance' | 'integrity' | 'moderation';
 59 |   authority: SystemAuthority;
 60 |   capabilities: {
 61 |     crossDomainValidation: boolean;
 62 |     principleEnforcement: boolean;
 63 |     systemMonitoring: boolean;
 64 |     emergencyResponse: boolean;
 65 |   };
 66 |   deployment: {
 67 |     scope: 'global' | 'domain' | 'specific';
 68 |     priority: 'high' | 'medium' | 'low';
 69 |     automated: boolean;
 70 |   };
 71 |   performance: {
 72 |     validationsPerformed: number;
 73 |     accuracyRate: number;
 74 |     responseTime: number;
 75 |     systemReliability: number;
 76 |   };
 77 |   createdAt: string;
 78 |   lastActive: string;
 79 |   status: 'active' | 'maintenance' | 'offline';
 80 | }
 81 | 
 82 | export type AIAgent = PersonalAIAgent | SystemAIAgent;
 83 | 
 84 | export interface AgentAssignmentRequest {
 85 |   targetId: string; // Discussion, comment, or proposal ID
 86 |   agentType: 'personal' | 'system';
 87 |   agentId?: string; // Specific agent, or auto-assign if not provided
 88 |   requestedBy: string;
 89 |   urgency: 'low' | 'medium' | 'high' | 'emergency';
 90 |   taskType: 'analysis' | 'validation' | 'verification' | 'moderation' | 'research';
 91 |   context?: string;
 92 |   expectedTokenReward?: number;
 93 | }
 94 | 
 95 | export interface AgentAssignmentResult {
 96 |   assignmentId: string;
 97 |   agent: AIAgent;
 98 |   request: AgentAssignmentRequest;
 99 |   status: 'pending' | 'in_progress' | 'completed' | 'failed';
100 |   startedAt?: string;
101 |   completedAt?: string;
102 |   result?: {
103 |     analysis: string;
104 |     confidence: number;
105 |     recommendation: string;
106 |     tokenReward: number;
107 |     flags?: string[];
108 |   };
109 |   error?: string;
110 | }
111 | 
112 | export interface TokenRewardProjection {
113 |   baseReward: number;
114 |   qualityMultiplier: number;
115 |   urgencyMultiplier: number;
116 |   complexityMultiplier: number;
117 |   estimatedTotal: number;
118 |   paymentSchedule: {
119 |     immediate: number;
120 |     onCompletion: number;
121 |     onAcceptance: number;
122 |   };
123 | }
```

## File: src/app/api/governance/route.ts

- Extension: .ts
- Language: typescript
- Size: 7825 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | import { NextResponse } from 'next/server';
  2 | import { getAllDiscussions, getOrganizationStats } from '@/lib/governance-data';
  3 | import fs from 'fs';
  4 | import path from 'path';
  5 | import yaml from 'js-yaml';
  6 | import { InheritanceConfig, GovernancePrinciple, TermDictionary } from '@/types/governance';
  7 | 
  8 | export async function GET() {
  9 |   try {
 10 |     const discussions = getAllDiscussions();
 11 |     const organizationStats = getOrganizationStats();
 12 |     
 13 |     // Transform organization stats into the expected format with real inheritance
 14 |     const organizations = organizationStats.map(stat => {
 15 |       const orgDiscussions = discussions.filter(d => d.domain === stat.domain);
 16 |       const inheritance = loadInheritanceConfig(stat.domain);
 17 |       const effectivePrinciples = getEffectivePrinciples(stat.domain);
 18 |       
 19 |       return {
 20 |         id: stat.domain,
 21 |         name: inheritance.name,
 22 |         description: inheritance.description,
 23 |         version: inheritance.version,
 24 |         inheritance,
 25 |         principles: effectivePrinciples,
 26 |         discussions: orgDiscussions.map(discussion => ({
 27 |           title: discussion.title,
 28 |           status: discussion.status,
 29 |           proposal: discussion.summary,
 30 |           created: discussion.created,
 31 |           author: discussion.author,
 32 |           summary: discussion.summary,
 33 |           content: discussion.content, // Now includes full markdown content
 34 |           filename: `${discussion.id}.md`,
 35 |           path: `dahao-governance/${discussion.domain}/discussions/${discussion.category}/${discussion.id}.md`
 36 |         })),
 37 |         emoji: getEmojiForDomain(stat.domain)
 38 |       };
 39 |     });
 40 |     
 41 |     // Create discussionsByPrinciple structure
 42 |     const discussionsByPrinciple: Record<string, any[]> = {};
 43 |     organizations.forEach(org => {
 44 |       org.discussions.forEach(discussion => {
 45 |         const key = `${org.id}_discussions`;
 46 |         if (!discussionsByPrinciple[key]) {
 47 |           discussionsByPrinciple[key] = [];
 48 |         }
 49 |         discussionsByPrinciple[key].push(discussion);
 50 |       });
 51 |     });
 52 | 
 53 |     const data = {
 54 |       organizations,
 55 |       principlesByOrg: organizations.reduce((acc, org) => {
 56 |         acc[org.id] = org.principles;
 57 |         return acc;
 58 |       }, {} as Record<string, any>),
 59 |       discussionsByPrinciple
 60 |     };
 61 |     
 62 |     return NextResponse.json(data);
 63 |   } catch (error) {
 64 |     console.error('Error loading governance data:', error);
 65 |     return NextResponse.json(
 66 |       { error: 'Failed to load governance data' },
 67 |       { status: 500 }
 68 |     );
 69 |   }
 70 | }
 71 | 
 72 | function loadInheritanceConfig(domain: string): InheritanceConfig {
 73 |   try {
 74 |     const inheritancePath = path.join(process.cwd(), 'dahao-governance', domain, 'inheritance.yml');
 75 |     if (fs.existsSync(inheritancePath)) {
 76 |       const content = fs.readFileSync(inheritancePath, 'utf-8');
 77 |       const inheritanceData = yaml.load(content) as InheritanceConfig;
 78 |       return inheritanceData;
 79 |     }
 80 |   } catch (error) {
 81 |     console.error(`Error loading inheritance config for ${domain}:`, error);
 82 |   }
 83 |   
 84 |   // Fallback for missing inheritance files
 85 |   return {
 86 |     version: '1.0',
 87 |     name: domain.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
 88 |     description: `Governance for ${domain}`,
 89 |     repository: `dahao-org/${domain}`,
 90 |     extends: null
 91 |   };
 92 | }
 93 | 
 94 | function getCorePrinciples(): GovernancePrinciple[] {
 95 |   const coreVersion = 'v1.1'; // Core governance current version
 96 |   const corePath = path.join(process.cwd(), 'dahao-governance', 'core-governance', 'ethics', coreVersion);
 97 |   const principles: GovernancePrinciple[] = [];
 98 |   
 99 |   if (fs.existsSync(corePath)) {
100 |     const files = fs.readdirSync(corePath).filter(f => f.endsWith('.yml'));
101 |     
102 |     for (const file of files) {
103 |       try {
104 |         const filePath = path.join(corePath, file);
105 |         const content = fs.readFileSync(filePath, 'utf-8');
106 |         const principle = yaml.load(content) as GovernancePrinciple;
107 |         
108 |         // Mark as inherited
109 |         principle.inheritance_source = 'core-governance';
110 |         principle.is_inherited = true;
111 |         
112 |         principles.push(principle);
113 |       } catch (error) {
114 |         console.error(`Error loading core principle ${file}:`, error);
115 |       }
116 |     }
117 |   }
118 |   
119 |   return principles;
120 | }
121 | 
122 | function getDomainSpecificPrinciples(domain: string): GovernancePrinciple[] {
123 |   const inheritance = loadInheritanceConfig(domain);
124 |   const principles: GovernancePrinciple[] = [];
125 |   
126 |   // Get domain-specific principles from inheritance config
127 |   if (inheritance.domain_extensions) {
128 |     for (const [extensionId, extensionConfig] of Object.entries(inheritance.domain_extensions)) {
129 |       try {
130 |         const version = (extensionConfig as any).version || inheritance.version;
131 |         const versionDir = `v${version}`;
132 |         const filePath = path.join(process.cwd(), 'dahao-governance', domain, 'ethics', versionDir, `${extensionId}.yml`);
133 |         
134 |         if (fs.existsSync(filePath)) {
135 |           const content = fs.readFileSync(filePath, 'utf-8');
136 |           const principle = yaml.load(content) as GovernancePrinciple;
137 |           
138 |           // Mark as domain-specific
139 |           principle.inheritance_source = domain;
140 |           principle.is_inherited = false;
141 |           principle.extension_config = extensionConfig;
142 |           
143 |           principles.push(principle);
144 |         }
145 |       } catch (error) {
146 |         console.error(`Error loading domain principle ${extensionId} for ${domain}:`, error);
147 |       }
148 |     }
149 |   }
150 |   
151 |   return principles;
152 | }
153 | 
154 | function getEffectivePrinciples(domain: string): GovernancePrinciple[] {
155 |   const inheritance = loadInheritanceConfig(domain);
156 |   const principles: GovernancePrinciple[] = [];
157 |   
158 |   // Add inherited core principles if domain extends core-governance
159 |   if (inheritance.extends && inheritance.extends.includes('core-governance')) {
160 |     const corePrinciples = getCorePrinciples();
161 |     
162 |     // Apply inheritance modifications
163 |     for (const corePrinciple of corePrinciples) {
164 |       const inheritanceRule = inheritance.inheritance?.core_principles?.[corePrinciple.principle_id];
165 |       
166 |       if (inheritanceRule === 'inherited') {
167 |         // Use as-is
168 |         principles.push(corePrinciple);
169 |       } else if (typeof inheritanceRule === 'string' && inheritanceRule.startsWith('inherited_')) {
170 |         // Modified inheritance
171 |         const modifiedPrinciple = { ...corePrinciple };
172 |         modifiedPrinciple.inheritance_modification = inheritanceRule;
173 |         modifiedPrinciple.description = `${corePrinciple.description} (${inheritanceRule.replace('inherited_', '').replace(/_/g, ' ')})`;
174 |         principles.push(modifiedPrinciple);
175 |       }
176 |     }
177 |   }
178 |   
179 |   // Add domain-specific principles
180 |   const domainPrinciples = getDomainSpecificPrinciples(domain);
181 |   principles.push(...domainPrinciples);
182 |   
183 |   return principles;
184 | }
185 | 
186 | 
187 | async function loadTermsForDomain(domain: string): Promise<TermDictionary | null> {
188 |   const termsPath = path.join(process.cwd(), 'dahao-governance', domain, 'terms');
189 | 
190 |   if (!fs.existsSync(termsPath)) {
191 |     return null;
192 |   }
193 | 
194 |   // Load all term files
195 |   const termFiles = fs.readdirSync(termsPath, { recursive: true })
196 |     .filter(file => file.toString().endsWith('.yml'));
197 | 
198 |   const terms: TermDictionary = {
199 |     version: "1.0",
200 |     namespace: domain,
201 |     terms: {}
202 |   };
203 | 
204 |   for (const file of termFiles) {
205 |     try {
206 |       const content = fs.readFileSync(path.join(termsPath, file.toString()), 'utf8');
207 |       const termData = yaml.load(content) as TermDictionary;
208 | 
209 |       // Merge terms
210 |       Object.assign(terms.terms, termData.terms);
211 |     } catch (error) {
212 |       console.error(`Error loading term file ${file} for ${domain}:`, error);
213 |     }
214 |   }
215 | 
216 |   return terms;
217 | }
218 | 
219 | function getEmojiForDomain(domain: string): string {
220 |   const emojis = {
221 |     'animal-welfare': '🐾',
222 |     'core-governance': '🏛️',
223 |     'environment': '🌱'
224 |   };
225 |   return emojis[domain as keyof typeof emojis] || '📋';
226 | }
```

## File: src/app/api/discussions/[orgId]/route.ts

- Extension: .ts
- Language: typescript
- Size: 663 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
 1 | import { NextRequest, NextResponse } from 'next/server';
 2 | import { createGitHubDataService } from '@/services/github-data-service';
 3 | 
 4 | export async function GET(
 5 |   request: NextRequest,
 6 |   { params }: { params: Promise<{ orgId: string }> }
 7 | ) {
 8 |   try {
 9 |     const { orgId } = await params;
10 |     const dataService = createGitHubDataService();
11 |     const discussions = await dataService.getOrganizationDiscussions(orgId);
12 |     
13 |     return NextResponse.json(discussions);
14 |   } catch (error) {
15 |     console.error('Failed to fetch organization discussions:', error);
16 |     return NextResponse.json(
17 |       { error: 'Failed to fetch discussions' },
18 |       { status: 500 }
19 |     );
20 |   }
21 | }
```

## File: src/app/api/forum/route.ts

- Extension: .ts
- Language: typescript
- Size: 1419 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
 1 | import { NextResponse } from 'next/server';
 2 | import { getAllDiscussions, getFeaturedDiscussion, getRecentDiscussions, getOrganizationStats, getForumStats } from '@/lib/governance-data';
 3 | 
 4 | export async function GET() {
 5 |   try {
 6 |     const discussions = getAllDiscussions();
 7 |     const featuredDiscussion = getFeaturedDiscussion();
 8 |     const recentDiscussions = getRecentDiscussions(8);
 9 |     const organizationStats = getOrganizationStats();
10 |     const forumStats = getForumStats();
11 |     
12 |     const data = {
13 |       stats: {
14 |         activeDAHAOs: organizationStats.length,
15 |         contributors: forumStats.totalParticipants,
16 |         activeDiscussions: forumStats.activeDiscussions,
17 |         consensusRate: forumStats.successRate
18 |       },
19 |       featured: featuredDiscussion,
20 |       recent: recentDiscussions,
21 |       organizations: organizationStats.map(org => ({
22 |         id: org.domain,
23 |         name: org.name,
24 |         domain: org.domain,
25 |         activeDiscussions: org.activeDiscussions,
26 |         totalProposals: org.totalProposals,
27 |         totalParticipants: org.totalParticipants,
28 |         aiAgents: org.aiAgents,
29 |         lastActivity: org.lastActivity,
30 |         successRate: org.successRate
31 |       }))
32 |     };
33 |     
34 |     return NextResponse.json(data);
35 |   } catch (error) {
36 |     console.error('Error loading forum data:', error);
37 |     return NextResponse.json(
38 |       { error: 'Failed to load forum data' },
39 |       { status: 500 }
40 |     );
41 |   }
42 | }
```

## File: src/app/api/terms/route.ts

- Extension: .ts
- Language: typescript
- Size: 1599 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
 1 | import { NextResponse } from 'next/server';
 2 | import fs from 'fs';
 3 | import path from 'path';
 4 | import yaml from 'js-yaml';
 5 | import { TermDictionary } from '@/types/governance';
 6 | 
 7 | async function loadTermsForDomain(domain: string): Promise<TermDictionary | null> {
 8 |   const termsPath = path.join(process.cwd(), 'dahao-governance', domain, 'terms');
 9 | 
10 |   if (!fs.existsSync(termsPath)) {
11 |     return null;
12 |   }
13 | 
14 |   // Load all term files
15 |   const termFiles = fs.readdirSync(termsPath, { recursive: true })
16 |     .filter(file => file.toString().endsWith('.yml'));
17 | 
18 |   const terms: TermDictionary = {
19 |     version: "1.0",
20 |     namespace: domain,
21 |     terms: {}
22 |   };
23 | 
24 |   for (const file of termFiles) {
25 |     try {
26 |       const content = fs.readFileSync(path.join(termsPath, file.toString()), 'utf8');
27 |       const termData = yaml.load(content) as TermDictionary;
28 | 
29 |       // Merge terms
30 |       Object.assign(terms.terms, termData.terms);
31 |     } catch (error) {
32 |       console.error(`Error loading term file ${file} for ${domain}:`, error);
33 |     }
34 |   }
35 | 
36 |   return terms;
37 | }
38 | 
39 | export async function GET() {
40 |   try {
41 |     const allTerms: Record<string, any> = {};
42 |     
43 |     // Load terms from each organization
44 |     const domains = ['core-governance', 'animal-welfare', 'environment'];
45 |     
46 |     for (const domain of domains) {
47 |       const terms = await loadTermsForDomain(domain);
48 |       if (terms) {
49 |         allTerms[domain] = terms;
50 |       }
51 |     }
52 | 
53 |     return NextResponse.json(allTerms);
54 |   } catch (error) {
55 |     console.error('Error loading terms:', error);
56 |     return NextResponse.json({ error: 'Failed to load terms' }, { status: 500 });
57 |   }
58 | }
```

## File: src/app/api/terms-list/[domain]/route.ts

- Extension: .ts
- Language: typescript
- Size: 1105 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
 1 | import { NextRequest, NextResponse } from 'next/server';
 2 | 
 3 | interface TermInfo {
 4 |   name: string;
 5 |   domain: string;
 6 |   hasDiscussion: boolean;
 7 | }
 8 | 
 9 | export async function GET(
10 |   request: NextRequest,
11 |   { params }: { params: Promise<{ domain: string }> }
12 | ) {
13 |   try {
14 |     const { domain } = await params;
15 |     
16 |     // Define available terms for each organization domain
17 |     const termMap: Record<string, TermInfo[]> = {
18 |       'core-governance': [
19 |         { name: 'harm', domain: 'core-governance', hasDiscussion: true },
20 |         { name: 'wellbeing', domain: 'core-governance', hasDiscussion: true },
21 |         { name: 'transparency', domain: 'core-governance', hasDiscussion: true },
22 |       ],
23 |       'animal-welfare': [
24 |         { name: 'suffering', domain: 'animal-welfare', hasDiscussion: true },
25 |       ],
26 |       'environment': []
27 |     };
28 |     
29 |     const terms = termMap[domain] || [];
30 |     
31 |     return NextResponse.json(terms);
32 |     
33 |   } catch (error) {
34 |     console.error('Error fetching terms list:', error);
35 |     return NextResponse.json(
36 |       { error: 'Failed to fetch terms list' },
37 |       { status: 500 }
38 |     );
39 |   }
40 | }
```

## File: src/app/api/terms/[domain]/[term]/route.ts

- Extension: .ts
- Language: typescript
- Size: 1456 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
 1 | import { NextRequest, NextResponse } from 'next/server';
 2 | import { promises as fs } from 'fs';
 3 | import path from 'path';
 4 | import yaml from 'js-yaml';
 5 | import { TermDiscussion } from '@/types/github-compatible';
 6 | 
 7 | export async function GET(
 8 |   request: NextRequest,
 9 |   { params }: { params: Promise<{ domain: string; term: string }> }
10 | ) {
11 |   try {
12 |     const { domain, term } = await params;
13 |     
14 |     // Construct path to term discussion file
15 |     const discussionPath = path.join(
16 |       process.cwd(),
17 |       'dahao-governance',
18 |       domain,
19 |       'terms',
20 |       term,
21 |       '.github',
22 |       'discussion.yml'
23 |     );
24 | 
25 |     // Check if file exists
26 |     try {
27 |       await fs.access(discussionPath);
28 |     } catch (error) {
29 |       return NextResponse.json(
30 |         { error: `Term discussion not found: ${domain}/${term}` },
31 |         { status: 404 }
32 |       );
33 |     }
34 | 
35 |     // Load and parse the YAML file
36 |     const content = await fs.readFile(discussionPath, 'utf-8');
37 |     const data = yaml.load(content) as { discussion: TermDiscussion };
38 | 
39 |     if (!data || !data.discussion) {
40 |       return NextResponse.json(
41 |         { error: 'Invalid discussion file format' },
42 |         { status: 500 }
43 |       );
44 |     }
45 | 
46 |     // Return the term discussion
47 |     return NextResponse.json(data.discussion);
48 | 
49 |   } catch (error) {
50 |     console.error('Error loading term discussion:', error);
51 |     return NextResponse.json(
52 |       { error: 'Failed to load term discussion' },
53 |       { status: 500 }
54 |     );
55 |   }
56 | }
```

## File: src/app/forum/[domain]/discussions/[number]/page.tsx

- Extension: .tsx
- Language: typescript
- Size: 1283 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
 1 | import React from 'react';
 2 | import { notFound } from 'next/navigation';
 3 | import { DiscussionView } from '@/components/github-compatible/DiscussionView';
 4 | import { createGitHubDataService } from '@/services/github-data-service';
 5 | import Link from 'next/link';
 6 | import { ArrowLeft } from 'lucide-react';
 7 | 
 8 | interface PageProps {
 9 |   params: Promise<{
10 |     domain: string;
11 |     number: string;
12 |   }>;
13 | }
14 | 
15 | export default async function OrganizationDiscussionPage({ params }: PageProps) {
16 |   const { domain, number } = await params;
17 |   const dataService = createGitHubDataService();
18 |   
19 |   // Get all organization discussions and find the one with matching number
20 |   const discussions = await dataService.getOrganizationDiscussions(domain);
21 |   const discussion = discussions.nodes.find(d => d.number === parseInt(number));
22 |   
23 |   if (!discussion) {
24 |     notFound();
25 |   }
26 | 
27 |   return (
28 |     <div className="max-w-6xl mx-auto px-4 py-8">
29 |       {/* Breadcrumb */}
30 |       <div className="mb-6">
31 |         <Link
32 |           href="/forum"
33 |           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
34 |         >
35 |           <ArrowLeft className="w-4 h-4" />
36 |           Back to forum
37 |         </Link>
38 |       </div>
39 | 
40 |       {/* Discussion */}
41 |       <DiscussionView discussion={discussion} />
42 |     </div>
43 |   );
44 | }
```

## File: src/app/forum/[domain]/terms/[term]/page.tsx

- Extension: .tsx
- Language: typescript
- Size: 8174 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | import React from 'react';
  2 | import { notFound } from 'next/navigation';
  3 | import Link from 'next/link';
  4 | import { ArrowLeft } from 'lucide-react';
  5 | import { TermDefinitionCard } from '@/components/github-compatible/TermDefinitionCard';
  6 | import { DiscussionView } from '@/components/github-compatible/DiscussionView';
  7 | import { TermDiscussion, GitHubDiscussion } from '@/types/github-compatible';
  8 | 
  9 | interface PageProps {
 10 |   params: Promise<{
 11 |     domain: string;
 12 |     term: string;
 13 |   }>;
 14 | }
 15 | 
 16 | async function getTermDiscussion(domain: string, term: string): Promise<TermDiscussion | null> {
 17 |   try {
 18 |     const response = await fetch(`http://localhost:3000/api/terms/${domain}/${term}`, {
 19 |       cache: 'no-store' // Always get fresh data during development
 20 |     });
 21 |     
 22 |     if (!response.ok) {
 23 |       return null;
 24 |     }
 25 |     
 26 |     return await response.json();
 27 |   } catch (error) {
 28 |     console.error('Failed to fetch term discussion:', error);
 29 |     return null;
 30 |   }
 31 | }
 32 | 
 33 | export default async function TermDiscussionPage({ params }: PageProps) {
 34 |   const { domain, term } = await params;
 35 |   const termDiscussion = await getTermDiscussion(domain, term);
 36 | 
 37 |   if (!termDiscussion) {
 38 |     notFound();
 39 |   }
 40 | 
 41 |   // Convert TermDiscussion to GitHubDiscussion format for DiscussionView component
 42 |   const discussionAsGitHub: GitHubDiscussion = {
 43 |     id: termDiscussion.id,
 44 |     number: termDiscussion.number,
 45 |     title: termDiscussion.title,
 46 |     body: `This is the democratic discussion for defining the term "${term}" in the ${domain} domain.`,
 47 |     createdAt: termDiscussion.createdAt,
 48 |     updatedAt: termDiscussion.updatedAt,
 49 |     closed: termDiscussion.closed,
 50 |     author: termDiscussion.current_definition.author,
 51 |     category: termDiscussion.category,
 52 |     labels: termDiscussion.labels,
 53 |     comments: termDiscussion.comments,
 54 |     upvoteCount: termDiscussion.upvoteCount,
 55 |     answer: termDiscussion.comments.nodes.find(comment => 
 56 |       comment.id === termDiscussion.current_definition.ratification_comment_id
 57 |     )
 58 |   };
 59 | 
 60 |   return (
 61 |     <div className="max-w-6xl mx-auto px-4 py-8">
 62 |       {/* Breadcrumb Navigation */}
 63 |       <div className="mb-6">
 64 |         <nav className="flex items-center gap-2 text-sm text-gray-600">
 65 |           <Link
 66 |             href="/forum"
 67 |             className="hover:text-blue-600"
 68 |           >
 69 |             Forum
 70 |           </Link>
 71 |           <span>/</span>
 72 |           <Link
 73 |             href={`/forum`}
 74 |             className="hover:text-blue-600"
 75 |           >
 76 |             {domain}
 77 |           </Link>
 78 |           <span>/</span>
 79 |           <span className="text-gray-900 font-medium">terms</span>
 80 |           <span>/</span>
 81 |           <span className="text-gray-900 font-medium">{term}</span>
 82 |         </nav>
 83 | 
 84 |         <Link
 85 |           href="/forum"
 86 |           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2"
 87 |         >
 88 |           <ArrowLeft className="w-4 h-4" />
 89 |           Back to forum
 90 |         </Link>
 91 |       </div>
 92 | 
 93 |       {/* Page Header */}
 94 |       <div className="mb-8">
 95 |         <h1 className="text-3xl font-bold text-gray-900 mb-2">
 96 |           Term Definition: {term}
 97 |         </h1>
 98 |         <p className="text-gray-600">
 99 |           Democratic discussion and evolution of the "{term}" term in {domain} governance
100 |         </p>
101 |       </div>
102 | 
103 |       {/* Current Active Definition */}
104 |       <TermDefinitionCard
105 |         termName={term}
106 |         domain={domain}
107 |         currentDefinition={termDiscussion.current_definition}
108 |       />
109 | 
110 |       {/* Version History Section */}
111 |       {termDiscussion.version_history.length > 1 && (
112 |         <div className="mb-8">
113 |           <h2 className="text-xl font-semibold text-gray-900 mb-4">Version History</h2>
114 |           <div className="space-y-3">
115 |             {termDiscussion.version_history.map((version) => (
116 |               <div
117 |                 key={version.version}
118 |                 className={`p-4 border rounded-lg ${
119 |                   version.status === 'active' 
120 |                     ? 'border-green-200 bg-green-50' 
121 |                     : version.status === 'superseded'
122 |                     ? 'border-gray-200 bg-gray-50'
123 |                     : 'border-red-200 bg-red-50'
124 |                 }`}
125 |               >
126 |                 <div className="flex items-center justify-between mb-2">
127 |                   <div className="flex items-center gap-2">
128 |                     <span className="font-semibold">{version.version}</span>
129 |                     <span className={`px-2 py-1 rounded text-xs font-medium ${
130 |                       version.status === 'active' 
131 |                         ? 'bg-green-100 text-green-800'
132 |                         : version.status === 'superseded'
133 |                         ? 'bg-gray-100 text-gray-800'
134 |                         : 'bg-red-100 text-red-800'
135 |                     }`}>
136 |                       {version.status}
137 |                     </span>
138 |                     {version.approval_rate && (
139 |                       <span className="text-sm text-gray-600">
140 |                         {version.approval_rate} approval
141 |                       </span>
142 |                     )}
143 |                   </div>
144 |                   <div className="text-sm text-gray-500">
145 |                     {version.ratified_date ? 
146 |                       `Ratified ${new Date(version.ratified_date).toLocaleDateString()}` :
147 |                       `Proposed ${new Date(version.proposed_date).toLocaleDateString()}`
148 |                     }
149 |                   </div>
150 |                 </div>
151 |                 <p className="text-gray-700 italic">"{version.text}"</p>
152 |                 <div className="mt-2 text-sm text-gray-600">
153 |                   Proposed by{' '}
154 |                   <Link href={version.proposer.url} className="font-medium hover:underline">
155 |                     {version.proposer.login}
156 |                   </Link>
157 |                 </div>
158 |               </div>
159 |             ))}
160 |           </div>
161 |         </div>
162 |       )}
163 | 
164 |       {/* Proposed Versions Section */}
165 |       {termDiscussion.proposed_versions.length > 0 && (
166 |         <div className="mb-8">
167 |           <h2 className="text-xl font-semibold text-gray-900 mb-4">Proposed Updates</h2>
168 |           <div className="space-y-3">
169 |             {termDiscussion.proposed_versions.map((proposal) => (
170 |               <div
171 |                 key={proposal.version}
172 |                 className="p-4 border border-blue-200 bg-blue-50 rounded-lg"
173 |               >
174 |                 <div className="flex items-center justify-between mb-2">
175 |                   <div className="flex items-center gap-2">
176 |                     <span className="font-semibold">{proposal.version}</span>
177 |                     <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
178 |                       {proposal.status.replace('_', ' ')}
179 |                     </span>
180 |                     <span className="text-sm text-gray-600">
181 |                       {proposal.current_support} support
182 |                     </span>
183 |                   </div>
184 |                   <div className="text-sm text-gray-500">
185 |                     Proposed {new Date(proposal.proposed_date).toLocaleDateString()}
186 |                   </div>
187 |                 </div>
188 |                 <p className="text-gray-700 italic mb-2">"{proposal.text}"</p>
189 |                 {proposal.changes_from_current && (
190 |                   <div className="text-sm">
191 |                     <strong>Changes:</strong>
192 |                     <ul className="list-disc list-inside ml-2 text-gray-600">
193 |                       {proposal.changes_from_current.map((change, index) => (
194 |                         <li key={index}>{change}</li>
195 |                       ))}
196 |                     </ul>
197 |                   </div>
198 |                 )}
199 |                 <div className="mt-2 text-sm text-gray-600">
200 |                   Proposed by{' '}
201 |                   <Link href={proposal.proposer.url} className="font-medium hover:underline">
202 |                     {proposal.proposer.login}
203 |                   </Link>
204 |                 </div>
205 |               </div>
206 |             ))}
207 |           </div>
208 |         </div>
209 |       )}
210 | 
211 |       {/* Discussion Thread */}
212 |       <div>
213 |         <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Discussion</h2>
214 |         <DiscussionView discussion={discussionAsGitHub} />
215 |       </div>
216 |     </div>
217 |   );
218 | }
```

## File: src/app/forum/discussion/[id]/page.tsx

- Extension: .tsx
- Language: typescript
- Size: 18244 bytes
- Created: 2025-06-11 12:44:40
- Modified: 2025-06-11 12:44:40

### Code

```typescript
  1 | 'use client';
  2 | 
  3 | import { useState, useEffect, useCallback } from 'react';
  4 | import { useParams, useRouter } from 'next/navigation';
  5 | import { Badge } from '@/components/ui/badge';
  6 | import { Button } from '@/components/ui/button';
  7 | import { Avatar, AvatarFallback } from '@/components/ui/avatar';
  8 | import { Progress } from '@/components/ui/progress';
  9 | import { 
 10 |   ArrowLeft,
 11 |   Users, 
 12 |   MessageSquare, 
 13 |   Brain, 
 14 |   TrendingUp,
 15 |   Vote,
 16 |   Share,
 17 |   Bell,
 18 |   BarChart3,
 19 |   Shield,
 20 |   BookOpen,
 21 |   Zap,
 22 |   Clock,
 23 |   ThumbsUp,
 24 |   ThumbsDown
 25 | } from 'lucide-react';
 26 | import { GovernanceData, GovernanceDiscussion } from '@/types/governance';
 27 | import { DiscussionParser } from '@/lib/discussion-parser';
 28 | 
 29 | export default function DiscussionDetailPage() {
 30 |   const params = useParams();
 31 |   const router = useRouter();
 32 |   const [governanceData, setGovernanceData] = useState<GovernanceData | null>(null);
 33 |   const [discussion, setDiscussion] = useState<GovernanceDiscussion | null>(null);
 34 |   const [loading, setLoading] = useState(true);
 35 | 
 36 |   const fetchDiscussionData = useCallback(async () => {
 37 |     setLoading(true);
 38 |     try {
 39 |       const response = await fetch('/api/governance');
 40 |       if (response.ok) {
 41 |         const data = await response.json();
 42 |         setGovernanceData(data);
 43 |         
 44 |         // Find the specific discussion
 45 |         const allDiscussions = data.organizations.flatMap((org: any) => 
 46 |           org.discussions.map((d: any) => ({ ...d, orgId: org.id, orgName: org.name }))
 47 |         );
 48 |         
 49 |         const foundDiscussion = allDiscussions.find((d: any) => 
 50 |           d.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === params.id ||
 51 |           d.filename === `${params.id}.md` ||
 52 |           d.title.toLowerCase().includes(decodeURIComponent(params.id as string).toLowerCase())
 53 |         );
 54 |         
 55 |         setDiscussion(foundDiscussion || null);
 56 |       }
 57 |     } catch (error) {
 58 |       console.error('Error fetching discussion data:', error);
 59 |     }
 60 |     setLoading(false);
 61 |   }, [params.id]);
 62 | 
 63 |   useEffect(() => {
 64 |     fetchDiscussionData();
 65 |   }, [fetchDiscussionData]);
 66 | 
 67 |   if (loading) {
 68 |     return (
 69 |       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
 70 |         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
 71 |       </div>
 72 |     );
 73 |   }
 74 | 
 75 |   if (!discussion) {
 76 |     return (
 77 |       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
 78 |         <div className="text-center">
 79 |           <h1 className="text-2xl font-bold text-gray-900 mb-4">Discussion Not Found</h1>
 80 |           <Button onClick={() => router.back()}>
 81 |             <ArrowLeft className="w-4 h-4 mr-2" />
 82 |             Go Back
 83 |           </Button>
 84 |         </div>
 85 |       </div>
 86 |     );
 87 |   }
 88 | 
 89 |   // Parse discussion data
 90 |   const parsedDiscussion = DiscussionParser.parseDiscussion(discussion, 0);
 91 |   const votingData = DiscussionParser.parseVotingData(discussion);
 92 |   const metrics = DiscussionParser.parseDiscussionMetrics(discussion);
 93 | 
 94 |   // Parse comments from content
 95 |   const parseComments = (content: string) => {
 96 |     const lines = content.split('\n');
 97 |     const comments = [];
 98 |     let currentComment = null;
 99 |     
100 |     for (const line of lines) {
101 |       const commentMatch = line.match(/\*\*@([a-zA-Z0-9_-]+)(?:\s*\(([^)]+)\))?\*\*/);
102 |       if (commentMatch) {
103 |         if (currentComment) {
104 |           comments.push(currentComment);
105 |         }
106 |         currentComment = {
107 |           author: commentMatch[1],
108 |           type: commentMatch[2] || 'Human',
109 |           content: '',
110 |           timestamp: ''
111 |         };
112 |       } else if (line.match(/^\*\d+\s*(days?|hours?|minutes?)\s*ago\*/)) {
113 |         if (currentComment) {
114 |           currentComment.timestamp = line.replace(/^\*/, '').replace(/\*$/, '');
115 |         }
116 |       } else if (currentComment && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
117 |         currentComment.content += line + '\n';
118 |       }
119 |     }
120 |     
121 |     if (currentComment) {
122 |       comments.push(currentComment);
123 |     }
124 |     
125 |     return comments;
126 |   };
127 | 
128 |   const comments = parseComments(discussion.content);
129 | 
130 |   return (
131 |     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
132 |       <div className="container mx-auto px-6 py-8 max-w-7xl">
133 |         {/* Breadcrumb */}
134 |         <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
135 |           <button onClick={() => router.push('/')} className="hover:text-blue-600">Home</button>
136 |           <span>›</span>
137 |           <button onClick={() => router.push('/forum')} className="hover:text-blue-600">Forum</button>
138 |           <span>›</span>
139 |           <button onClick={() => router.push('/forum')} className="hover:text-blue-600">
140 |             {(discussion as any).orgName || 'Animal Welfare'}
141 |           </button>
142 |           <span>›</span>
143 |           <span className="truncate max-w-xs">{discussion.title}</span>
144 |         </div>
145 | 
146 |         {/* Header */}
147 |         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 mb-8 shadow-lg">
148 |           <div className="flex items-start justify-between mb-6">
149 |             <div className="flex-1">
150 |               <div className="flex items-center gap-3 mb-4 flex-wrap">
151 |                 <Badge className="bg-orange-500 text-white flex items-center gap-1">
152 |                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
153 |                   {discussion.status}
154 |                 </Badge>
155 |                 <Badge variant="outline" className="bg-blue-100 text-blue-700">
156 |                   {parsedDiscussion.category}
157 |                 </Badge>
158 |                 <Badge className="bg-red-100 text-red-700">
159 |                   🔥 Hot Topic
160 |                 </Badge>
161 |               </div>
162 |               
163 |               <h1 className="text-3xl font-bold text-gray-900 mb-3">{discussion.title}</h1>
164 |               <p className="text-xl text-gray-600 mb-6">{discussion.summary}</p>
165 |               
166 |               <div className="flex items-center gap-6 text-sm text-gray-600">
167 |                 <div className="flex items-center gap-2">
168 |                   <Avatar className="w-8 h-8">
169 |                     <AvatarFallback>
170 |                       {discussion.author.slice(0, 2).toUpperCase()}
171 |                     </AvatarFallback>
172 |                   </Avatar>
173 |                   <div>
174 |                     <div className="font-semibold">@{discussion.author}</div>
175 |                     <div className="text-xs">Proposal Author</div>
176 |                   </div>
177 |                 </div>
178 |                 <div className="flex items-center gap-1">
179 |                   <span>📅</span>
180 |                   <span>Created {discussion.created}</span>
181 |                 </div>
182 |                 <div className="flex items-center gap-1">
183 |                   <Clock className="w-4 h-4" />
184 |                   <span>{parsedDiscussion.timeAgo}</span>
185 |                 </div>
186 |               </div>
187 |             </div>
188 |           </div>
189 |         </div>
190 | 
191 |         {/* Stats Bar */}
192 |         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
193 |           <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
194 |             <div className="flex items-center gap-4">
195 |               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
196 |                 <Users className="w-6 h-6 text-blue-600" />
197 |               </div>
198 |               <div>
199 |                 <h3 className="text-2xl font-bold">{metrics.participants}</h3>
200 |                 <p className="text-sm text-gray-600">Participants</p>
201 |               </div>
202 |             </div>
203 |           </div>
204 |           
205 |           <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
206 |             <div className="flex items-center gap-4">
207 |               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
208 |                 <MessageSquare className="w-6 h-6 text-green-600" />
209 |               </div>
210 |               <div>
211 |                 <h3 className="text-2xl font-bold">{metrics.comments}</h3>
212 |                 <p className="text-sm text-gray-600">Comments</p>
213 |               </div>
214 |             </div>
215 |           </div>
216 |           
217 |           <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
218 |             <div className="flex items-center gap-4">
219 |               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
220 |                 <Brain className="w-6 h-6 text-purple-600" />
221 |               </div>
222 |               <div>
223 |                 <h3 className="text-2xl font-bold">{metrics.aiAnalyses}</h3>
224 |                 <p className="text-sm text-gray-600">AI Analyses</p>
225 |               </div>
226 |             </div>
227 |           </div>
228 |           
229 |           <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
230 |             <div className="flex items-center gap-4">
231 |               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
232 |                 <TrendingUp className="w-6 h-6 text-orange-600" />
233 |               </div>
234 |               <div>
235 |                 <h3 className="text-2xl font-bold">
236 |                   {votingData ? Math.round((votingData.humanApproval + votingData.aiApproval) / 2) : 85}%
237 |                 </h3>
238 |                 <p className="text-sm text-gray-600">Consensus</p>
239 |               </div>
240 |             </div>
241 |           </div>
242 |         </div>
243 | 
244 |         {/* Main Content Grid */}
245 |         <div className="grid lg:grid-cols-3 gap-8">
246 |           {/* Main Content */}
247 |           <div className="lg:col-span-2 space-y-8">
248 |             {/* Voting Section */}
249 |             {votingData && (
250 |               <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-200">
251 |                 <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
252 |                   <Vote className="w-5 h-5" />
253 |                   Voting Progress
254 |                 </h3>
255 |                 
256 |                 <div className="space-y-4 mb-6">
257 |                   <div>
258 |                     <div className="flex justify-between text-sm mb-2">
259 |                       <span><strong>Human Votes</strong> ({votingData.totalVotes || 15}/20 voted)</span>
260 |                       <span className="text-green-600 font-semibold">{votingData.humanApproval}% Approval</span>
261 |                     </div>
262 |                     <Progress value={votingData.humanApproval} className="h-3" />
263 |                   </div>
264 |                   
265 |                   <div>
266 |                     <div className="flex justify-between text-sm mb-2">
267 |                       <span><strong>AI Agent Consensus</strong> ({metrics.aiAnalyses}/4 analyzed)</span>
268 |                       <span className="text-blue-600 font-semibold">{votingData.aiApproval}% Approval</span>
269 |                     </div>
270 |                     <Progress value={votingData.aiApproval} className="h-3" />
271 |                   </div>
272 |                 </div>
273 |                 
274 |                 <div className="flex gap-3">
275 |                   <Button className="flex-1">
276 |                     <ThumbsUp className="w-4 h-4 mr-2" />
277 |                     Vote Approve
278 |                   </Button>
279 |                   <Button variant="outline" className="flex-1">
280 |                     <ThumbsDown className="w-4 h-4 mr-2" />
281 |                     Vote Reject
282 |                   </Button>
283 |                 </div>
284 |               </div>
285 |             )}
286 | 
287 |             {/* Discussion Content */}
288 |             <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
289 |               <div className="bg-gradient-to-b from-gray-50 to-white p-6 border-b border-gray-100">
290 |                 <h2 className="text-xl font-semibold flex items-center gap-2">
291 |                   📋 Summary
292 |                 </h2>
293 |               </div>
294 |               
295 |               <div className="p-6">
296 |                 <p className="text-gray-700 mb-6">{discussion.summary}</p>
297 |                 
298 |                 {/* Discussion Thread */}
299 |                 <div className="space-y-6">
300 |                   <h3 className="text-lg font-semibold flex items-center gap-2">
301 |                     💬 Discussion
302 |                   </h3>
303 |                   
304 |                   {comments.map((comment, index) => (
305 |                     <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
306 |                       <div className="flex items-start gap-3 mb-3">
307 |                         <Avatar className="w-10 h-10">
308 |                           <AvatarFallback className={comment.type === 'AI Agent' ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-br from-blue-500 to-green-500 text-white'}>
309 |                             {comment.author.slice(0, 2).toUpperCase()}
310 |                           </AvatarFallback>
311 |                         </Avatar>
312 |                         <div className="flex-1">
313 |                           <div className="flex items-center gap-2 mb-2">
314 |                             <span className="font-semibold">@{comment.author}</span>
315 |                             <Badge 
316 |                               variant="outline" 
317 |                               className={comment.type === 'AI Agent' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}
318 |                             >
319 |                               {comment.type}
320 |                             </Badge>
321 |                             <span className="text-xs text-gray-500">{comment.timestamp}</span>
322 |                           </div>
323 |                           <div className="text-gray-700">
324 |                             <p className="whitespace-pre-wrap">{comment.content.trim()}</p>
325 |                             {comment.type === 'AI Agent' && comment.content.includes('analysis') && (
326 |                               <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
327 |                                 <div className="text-sm text-blue-800">
328 |                                   {comment.content.includes('✅') && <div>✅ Analysis indicates approval</div>}
329 |                                   {comment.content.includes('💡') && <div>💡 Technical recommendations provided</div>}
330 |                                   {comment.content.includes('🔧') && <div>🔧 Implementation details analyzed</div>}
331 |                                 </div>
332 |                               </div>
333 |                             )}
334 |                           </div>
335 |                         </div>
336 |                       </div>
337 |                     </div>
338 |                   ))}
339 |                 </div>
340 |               </div>
341 |             </div>
342 |           </div>
343 | 
344 |           {/* Sidebar */}
345 |           <div className="space-y-6">
346 |             {/* AI Agent Assignment */}
347 |             <div className="bg-white rounded-2xl border border-gray-100 p-6">
348 |               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
349 |                 🤖 AI Agent Analysis
350 |               </h3>
351 |               
352 |               <div className="grid grid-cols-2 gap-3 mb-4">
353 |                 {[
354 |                   { icon: '⚖️', name: 'Ethics Agent', active: true },
355 |                   { icon: '🧠', name: 'Claude Code', active: false },
356 |                   { icon: '🐾', name: 'Animal Expert', active: true },
357 |                   { icon: '💻', name: 'Tech Analyst', active: false }
358 |                 ].map((agent, index) => (
359 |                   <div 
360 |                     key={index}
361 |                     className={`border-2 rounded-xl p-3 text-center cursor-pointer transition-all ${
362 |                       agent.active 
363 |                         ? 'border-blue-500 bg-blue-50' 
364 |                         : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
365 |                     }`}
366 |                   >
367 |                     <div className="text-2xl mb-1">{agent.icon}</div>
368 |                     <div className="text-xs font-medium">{agent.name}</div>
369 |                   </div>
370 |                 ))}
371 |               </div>
372 |               
373 |               <Button className="w-full">
374 |                 Request New Analysis
375 |               </Button>
376 |             </div>
377 | 
378 |             {/* Related Principles */}
379 |             <div className="bg-white rounded-2xl border border-gray-100 p-6">
380 |               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
381 |                 <Shield className="w-5 h-5" />
382 |                 Related Principles
383 |               </h3>
384 |               
385 |               <div className="space-y-3">
386 |                 {[
387 |                   { name: 'Five Freedoms v1.0', desc: 'Core animal welfare framework' },
388 |                   { name: 'Emergency Care Protocol v1.0', desc: 'Rapid response framework' },
389 |                   { name: 'Transparency v1.1', desc: 'Open and auditable processes' }
390 |                 ].map((principle, index) => (
391 |                   <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
392 |                     <div className="font-medium text-sm mb-1">{principle.name}</div>
393 |                     <div className="text-xs text-gray-600">{principle.desc}</div>
394 |                   </div>
395 |                 ))}
396 |               </div>
397 |             </div>
398 | 
399 |             {/* Quick Actions */}
400 |             <div className="bg-white rounded-2xl border border-gray-100 p-6">
401 |               <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
402 |                 <Zap className="w-5 h-5" />
403 |                 Quick Actions
404 |               </h3>
405 |               
406 |               <div className="space-y-3">
407 |                 <Button variant="outline" className="w-full justify-start">
408 |                   <Share className="w-4 h-4 mr-2" />
409 |                   Share Discussion
410 |                 </Button>
411 |                 <Button variant="outline" className="w-full justify-start">
412 |                   <Bell className="w-4 h-4 mr-2" />
413 |                   Follow Updates
414 |                 </Button>
415 |                 <Button variant="outline" className="w-full justify-start">
416 |                   <BarChart3 className="w-4 h-4 mr-2" />
417 |                   View Analytics
418 |                 </Button>
419 |               </div>
420 |             </div>
421 |           </div>
422 |         </div>
423 |       </div>
424 |     </div>
425 |   );
426 | }
```

## File: src/lib/discussion-parser.ts

- Extension: .ts
- Language: typescript
- Size: 11247 bytes
- Created: 2025-06-13 17:27:22
- Modified: 2025-06-13 17:27:22

### Code

```typescript
  1 | import { GovernanceDiscussion } from '@/types/governance';
  2 | 
  3 | interface ParsedDiscussion {
  4 |   id: string;
  5 |   title: string;
  6 |   description: string;
  7 |   category: string;
  8 |   status: string;
  9 |   statusColor: string;
 10 |   timeAgo: string;
 11 |   participants: number;
 12 |   comments: number;
 13 |   aiAnalyses: number;
 14 |   author: string;
 15 |   created: string;
 16 |   votingData?: {
 17 |     humanApproval: number;
 18 |     aiApproval: number;
 19 |     totalVotes: number;
 20 |   };
 21 | }
 22 | 
 23 | interface PlatformStats {
 24 |   activeDAHAOs: number;
 25 |   contributors: number;
 26 |   activeDiscussions: number;
 27 |   consensusRate: number;
 28 |   // Token Economics Stats
 29 |   totalTokenValue: number;
 30 |   investmentPools: number;
 31 |   tokenHolders: number;
 32 |   averageROI: number;
 33 | }
 34 | 
 35 | export class DiscussionParser {
 36 |   /**
 37 |    * Parse discussion content to extract participants, comments, and AI analyses
 38 |    */
 39 |   static parseDiscussionMetrics(discussion: GovernanceDiscussion): {
 40 |     participants: number;
 41 |     comments: number;
 42 |     aiAnalyses: number;
 43 |   } {
 44 |     if (!discussion?.content) {
 45 |       return {
 46 |         participants: 0,
 47 |         comments: 0,
 48 |         aiAnalyses: 0
 49 |       };
 50 |     }
 51 |     
 52 |     const content = discussion.content;
 53 |     const lines = content.split('\n');
 54 |     
 55 |     const participants = new Set<string>();
 56 |     let comments = 0;
 57 |     let aiAnalyses = 0;
 58 |     
 59 |     for (const line of lines) {
 60 |       // Look for participant mentions in multiple formats:
 61 |       // **@username (Human/AI Agent)**
 62 |       // **@username**
 63 |       // @username (Human)
 64 |       // @username (AI Agent)
 65 |       const participantPatterns = [
 66 |         /\*\*@([a-zA-Z0-9_-]+)\s*\((Human|AI Agent)\)\*\*/,
 67 |         /\*\*@([a-zA-Z0-9_-]+)\*\*/,
 68 |         /@([a-zA-Z0-9_-]+)\s*\((Human|AI Agent)\)/,
 69 |         /^@([a-zA-Z0-9_-]+)/
 70 |       ];
 71 |       
 72 |       for (const pattern of participantPatterns) {
 73 |         const match = line.match(pattern);
 74 |         if (match) {
 75 |           const username = match[1];
 76 |           const type = match[2] || ''; // May be undefined for some patterns
 77 |           
 78 |           participants.add(username);
 79 |           comments++;
 80 |           
 81 |           if (type === 'AI Agent' || username.includes('agent') || username.includes('bot')) {
 82 |             aiAnalyses++;
 83 |           }
 84 |           break; // Only match one pattern per line
 85 |         }
 86 |       }
 87 |     }
 88 |     
 89 |     return {
 90 |       participants: participants.size,
 91 |       comments,
 92 |       aiAnalyses
 93 |     };
 94 |   }
 95 | 
 96 |   /**
 97 |    * Extract voting data from discussion content
 98 |    */
 99 |   static parseVotingData(discussion: GovernanceDiscussion): {
100 |     humanApproval: number;
101 |     aiApproval: number;
102 |     totalVotes: number;
103 |   } | null {
104 |     if (!discussion?.content) {
105 |       return null;
106 |     }
107 |     
108 |     const content = discussion.content;
109 |     
110 |     // Look for votes section
111 |     const votesMatch = content.match(/## Votes\n([\s\S]*?)(?=\n##|\n\*\*|$)/);
112 |     if (!votesMatch) return null;
113 |     
114 |     const votesSection = votesMatch[1];
115 |     const lines = votesSection.split('\n');
116 |     
117 |     let humanVotes = 0;
118 |     let humanApprovals = 0;
119 |     let aiVotes = 0;
120 |     let aiApprovals = 0;
121 |     
122 |     for (const line of lines) {
123 |       if (line.includes('✅') || line.includes('🤔') || line.includes('❌')) {
124 |         const isApproval = line.includes('✅');
125 |         const isAI = line.includes('agent') || line.includes('Agent');
126 |         
127 |         if (isAI) {
128 |           aiVotes++;
129 |           if (isApproval) aiApprovals++;
130 |         } else {
131 |           humanVotes++;
132 |           if (isApproval) humanApprovals++;
133 |         }
134 |       }
135 |     }
136 |     
137 |     // If no explicit votes section, look for status indicators
138 |     if (humanVotes === 0 && aiVotes === 0) {
139 |       // Check for various approval patterns
140 |       const approvalPatterns = [
141 |         /(\d+)%\s*(approval|consensus|support)/i,
142 |         /approval.*?(\d+)%/i,
143 |         /consensus.*?(\d+)%/i,
144 |         /(\d+)%.*?(approved|consensus)/i
145 |       ];
146 |       
147 |       for (const pattern of approvalPatterns) {
148 |         const match = content.match(pattern);
149 |         if (match) {
150 |           const approvalRate = parseInt(match[1]);
151 |           return {
152 |             humanApproval: approvalRate,
153 |             aiApproval: approvalRate, // Use same rate for both if no breakdown available
154 |             totalVotes: 5 // Conservative estimate
155 |           };
156 |         }
157 |       }
158 |     }
159 |     
160 |     const totalVotes = humanVotes + aiVotes;
161 |     if (totalVotes === 0) return null;
162 |     
163 |     return {
164 |       humanApproval: Math.round((humanApprovals / (humanVotes || 1)) * 100),
165 |       aiApproval: Math.round((aiApprovals / (aiVotes || 1)) * 100),
166 |       totalVotes
167 |     };
168 |   }
169 | 
170 |   /**
171 |    * Get category from discussion path or content
172 |    */
173 |   static extractCategory(discussion: GovernanceDiscussion): string {
174 |     if (!discussion?.path) {
175 |       return 'General';
176 |     }
177 |     
178 |     // Extract from path
179 |     const pathParts = discussion.path.split('/');
180 |     const discussionsIndex = pathParts.findIndex(part => part === 'discussions');
181 |     
182 |     if (discussionsIndex >= 0 && discussionsIndex + 1 < pathParts.length) {
183 |       const category = pathParts[discussionsIndex + 1];
184 |       return this.formatCategoryName(category);
185 |     }
186 |     
187 |     // Fallback to content analysis
188 |     if (discussion.content?.includes('Five Freedoms')) return 'Five Freedoms';
189 |     if (discussion.content?.includes('Emergency')) return 'Emergency Care';
190 |     if (discussion.content?.includes('Transparency')) return 'Transparency';
191 |     
192 |     return 'General';
193 |   }
194 | 
195 |   /**
196 |    * Format category name for display
197 |    */
198 |   static formatCategoryName(category: string): string {
199 |     return category
200 |       .split('-')
201 |       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
202 |       .join(' ');
203 |   }
204 | 
205 |   /**
206 |    * Calculate time ago from created date
207 |    */
208 |   static calculateTimeAgo(created: string): string {
209 |     if (created === 'unknown') return 'Unknown';
210 |     
211 |     try {
212 |       const createdDate = new Date(created);
213 |       const now = new Date();
214 |       const diffMs = now.getTime() - createdDate.getTime();
215 |       const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
216 |       
217 |       if (diffDays === 0) return 'Today';
218 |       if (diffDays === 1) return '1 day ago';
219 |       if (diffDays < 7) return `${diffDays} days ago`;
220 |       if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
221 |       return `${Math.floor(diffDays / 30)} months ago`;
222 |     } catch {
223 |       return 'Recently';
224 |     }
225 |   }
226 | 
227 |   /**
228 |    * Determine status color based on status text
229 |    */
230 |   static getStatusColor(status: string): string {
231 |     const statusLower = status.toLowerCase();
232 |     if (statusLower.includes('active') || statusLower.includes('discussion')) return 'green';
233 |     if (statusLower.includes('review') || statusLower.includes('voting')) return 'blue';
234 |     if (statusLower.includes('draft')) return 'gray';
235 |     if (statusLower.includes('approved')) return 'green';
236 |     if (statusLower.includes('rejected')) return 'red';
237 |     return 'gray';
238 |   }
239 | 
240 |   /**
241 |    * Parse a discussion into the format needed by forum components
242 |    */
243 |   static parseDiscussion(discussion: GovernanceDiscussion, index: number): ParsedDiscussion {
244 |     if (!discussion) {
245 |       return {
246 |         id: `discussion-${index}`,
247 |         title: 'Unknown Discussion',
248 |         description: 'No description available.',
249 |         category: 'General',
250 |         status: 'Unknown',
251 |         statusColor: 'gray',
252 |         timeAgo: 'Unknown',
253 |         participants: 0,
254 |         comments: 0,
255 |         aiAnalyses: 0,
256 |         author: 'Unknown',
257 |         created: 'Unknown'
258 |       };
259 |     }
260 |     
261 |     const metrics = this.parseDiscussionMetrics(discussion);
262 |     const votingData = this.parseVotingData(discussion);
263 |     const category = this.extractCategory(discussion);
264 |     const timeAgo = this.calculateTimeAgo(discussion.created || 'Unknown');
265 |     const statusColor = this.getStatusColor(discussion.status || 'Unknown');
266 |     
267 |     return {
268 |       id: `discussion-${index}`,
269 |       title: discussion.title || 'Untitled Discussion',
270 |       description: discussion.summary || 'No summary available.',
271 |       category,
272 |       status: discussion.status || 'Unknown',
273 |       statusColor,
274 |       timeAgo,
275 |       participants: metrics.participants,
276 |       comments: metrics.comments,
277 |       aiAnalyses: metrics.aiAnalyses,
278 |       author: discussion.author || 'Unknown',
279 |       created: discussion.created || 'Unknown',
280 |       votingData: votingData || undefined
281 |     };
282 |   }
283 | 
284 |   /**
285 |    * Calculate platform-wide statistics from governance data
286 |    */
287 |   static calculatePlatformStats(
288 |     organizations: any[],
289 |     discussionsByPrinciple: Record<string, GovernanceDiscussion[]> | null | undefined
290 |   ): PlatformStats {
291 |     // Safely handle potentially undefined discussionsByPrinciple
292 |     if (!discussionsByPrinciple) {
293 |       return {
294 |         activeDAHAOs: organizations?.length || 0,
295 |         contributors: 0,
296 |         activeDiscussions: 0,
297 |         consensusRate: 0,
298 |         totalTokenValue: 0,
299 |         investmentPools: 0,
300 |         tokenHolders: 0,
301 |         averageROI: 0
302 |       };
303 |     }
304 | 
305 |     const allDiscussions = Object.values(discussionsByPrinciple).flat();
306 |     
307 |     // Count unique contributors
308 |     const contributors = new Set<string>();
309 |     allDiscussions.forEach(discussion => {
310 |       if (discussion?.author && discussion.author !== 'unknown') {
311 |         contributors.add(discussion.author);
312 |       }
313 |       
314 |       // Also count participants from discussion content
315 |       try {
316 |         const metrics = this.parseDiscussionMetrics(discussion);
317 |         // This is approximate since we can't extract individual names easily
318 |       } catch (error) {
319 |         console.warn('Error parsing discussion metrics:', error);
320 |       }
321 |     });
322 | 
323 |     // Count active discussions
324 |     const activeDiscussions = allDiscussions.filter(discussion => 
325 |       discussion?.status && (
326 |         discussion.status.toLowerCase().includes('active') ||
327 |         discussion.status.toLowerCase().includes('discussion') ||
328 |         discussion.status.toLowerCase().includes('review')
329 |       )
330 |     ).length;
331 | 
332 |     // Calculate consensus rate
333 |     let totalVotingDiscussions = 0;
334 |     let totalConsensusScore = 0;
335 |     
336 |     allDiscussions.forEach(discussion => {
337 |       if (!discussion) return;
338 |       
339 |       try {
340 |         const votingData = this.parseVotingData(discussion);
341 |         if (votingData) {
342 |           totalVotingDiscussions++;
343 |           // Average of human and AI approval rates
344 |           totalConsensusScore += (votingData.humanApproval + votingData.aiApproval) / 2;
345 |         }
346 |       } catch (error) {
347 |         console.warn('Error parsing voting data:', error);
348 |       }
349 |     });
350 |     
351 |     const consensusRate = totalVotingDiscussions > 0 
352 |       ? Math.round(totalConsensusScore / totalVotingDiscussions)
353 |       : 85; // Default fallback
354 | 
355 |     // Calculate token economics stats (mock data for now, would be from API in production)
356 |     const totalTokenValue = 2500000; // $2.5M total
357 |     const investmentPools = (organizations?.length || 0) * 3; // 3 pools per DAHAO average
358 |     const tokenHolders = Math.max(contributors.size * 4, 50); // Estimate 4x contributors are token holders
359 |     const averageROI = 18.5; // 18.5% average ROI
360 | 
361 |     return {
362 |       activeDAHAOs: organizations?.length || 0,
363 |       contributors: contributors.size, // Show actual count, don't enforce minimum
364 |       activeDiscussions: activeDiscussions,
365 |       consensusRate,
366 |       totalTokenValue,
367 |       investmentPools,
368 |       tokenHolders,
369 |       averageROI
370 |     };
371 |   }
372 | }
```

