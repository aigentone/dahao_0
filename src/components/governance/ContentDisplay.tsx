import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GovernancePrinciple, GovernanceDiscussion } from '@/types/governance';
import { DiscussionViewer } from './DiscussionViewer';

interface ContentDisplayProps {
  selectedPrinciple: GovernancePrinciple | null;
  discussions: GovernanceDiscussion[];
  selectedDiscussion: GovernanceDiscussion | null;
  onSelectDiscussion: (discussion: GovernanceDiscussion | null) => void;
}

export function ContentDisplay({ 
  selectedPrinciple, 
  discussions, 
  selectedDiscussion,
  onSelectDiscussion 
}: ContentDisplayProps) {
  if (!selectedPrinciple) {
    return (
      <div className="w-2/3 pl-6">
        <Card className="h-96 flex items-center justify-center border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
          <CardContent>
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Select a Principle</h3>
              <p className="text-gray-600">Choose a principle from the left to view its details and community discussions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedDiscussion) {
    return (
      <div className="w-2/3 pl-6">
        <DiscussionViewer 
          discussion={selectedDiscussion} 
          onBack={() => onSelectDiscussion(null)} 
        />
      </div>
    );
  }

  return (
    <div className="w-2/3 pl-6">
      <Tabs defaultValue="details" className="w-full">
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
            <div className="space-y-4">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                <span className="text-2xl">⚖️</span>
                {selectedPrinciple.name}
                <Badge className="bg-green-100 text-green-800 font-medium">v{selectedPrinciple.version}</Badge>
              </CardTitle>
              <p className="text-gray-700 text-lg leading-relaxed">{selectedPrinciple.description}</p>
              <TabsList className="bg-gray-100">
                <TabsTrigger value="details" className="data-[state=active]:bg-white">
                  📋 Details
                </TabsTrigger>
                <TabsTrigger value="requirements" className="data-[state=active]:bg-white">
                  ✅ Requirements
                </TabsTrigger>
                <TabsTrigger value="validation" className="data-[state=active]:bg-white">
                  🔍 Validation
                </TabsTrigger>
                <TabsTrigger value="discussions" className="data-[state=active]:bg-white">
                  💬 Discussions ({discussions.length})
                </TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
        </Card>

        <ScrollArea className="h-[calc(100vh-350px)]">
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-0">
            {/* Category and Metadata */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Category</h5>
                    <Badge className="bg-blue-100 text-blue-800">{selectedPrinciple.category}</Badge>
                  </div>
                  {selectedPrinciple.domain && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Domain</h5>
                      <Badge className="bg-purple-100 text-purple-800">{selectedPrinciple.domain}</Badge>
                    </div>
                  )}
                  {selectedPrinciple.previous_version && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Previous Version</h5>
                      <Badge variant="outline">v{selectedPrinciple.previous_version}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cross-domain Applications */}
            {selectedPrinciple.cross_domain_applications && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <span className="text-xl">🌐</span>
                    Cross-Domain Applications
                  </h4>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(selectedPrinciple.cross_domain_applications).map(([domain, application]) => (
                      <div key={domain} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5">{domain.replace(/_/g, ' ')}</Badge>
                        <span className="text-gray-700">{application as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Examples */}
            {selectedPrinciple.examples && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <span className="text-xl">📚</span>
                    Examples
                  </h4>
                </CardHeader>
                <CardContent>
                  {Object.entries(selectedPrinciple.examples).map(([type, examples]) => (
                    <div key={type} className="mb-4">
                      <h5 className="font-semibold text-gray-700 mb-2 capitalize">{type} Examples</h5>
                      <div className="space-y-2">
                        {Array.isArray(examples) && examples.map((example, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className={type === 'good' ? '✅' : '❌'}></span>
                            <span className="text-gray-700">{example}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6 mt-0">
            {selectedPrinciple.requirements ? (
              Object.entries(selectedPrinciple.requirements).map(([key, value]: [string, any]) => (
                <Card key={key} className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h4 className="font-semibold text-lg text-blue-900 capitalize">
                      {key.replace(/_/g, ' ')}
                    </h4>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-gray-700 leading-relaxed">
                      {typeof value === 'object' ? (
                        <div className="space-y-3">
                          {value.description && (
                            <p className="mb-3">{value.description}</p>
                          )}
                          {value.mandatory !== undefined && (
                            <Badge className={value.mandatory ? 'bg-red-100 text-red-800' : 'bg-gray-100'}>
                              {value.mandatory ? 'Mandatory' : 'Optional'}
                            </Badge>
                          )}
                          {value.implementation && (
                            <div>
                              <span className="font-medium">Implementation: </span>
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">{value.implementation}</code>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">📋</div>
                  <p>No requirements defined for this principle</p>
                </CardContent>
              </Card>
            )}

            {/* Five Freedoms (for animal welfare) */}
            {selectedPrinciple.freedoms && (
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <span className="text-xl">🐾</span>
                    Five Freedoms
                  </h4>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {Object.entries(selectedPrinciple.freedoms).map(([key, value]: [string, any]) => (
                    <div key={key} className="p-4 bg-white rounded-lg border border-green-200">
                      <h5 className="font-semibold text-green-900 mb-2">{value.description}</h5>
                      {value.requirements && (
                        <ul className="text-gray-700 ml-4 space-y-1">
                          {value.requirements.map((req: string, idx: number) => (
                            <li key={idx} className="list-disc">{req}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Validation Tab */}
          <TabsContent value="validation" className="space-y-6 mt-0">
            {selectedPrinciple.validation_rules ? (
              Object.entries(selectedPrinciple.validation_rules).map(([key, value]: [string, any]) => (
                <Card key={key} className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <h4 className="font-semibold text-lg text-purple-900 capitalize">
                      {key.replace(/_/g, ' ')}
                    </h4>
                  </CardHeader>
                  <CardContent className="p-6">
                    {Array.isArray(value) ? (
                      <ul className="space-y-2">
                        {value.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-600 mt-0.5">✓</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700">{value}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No validation rules defined for this principle</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="mt-0">
            {discussions.length > 0 ? (
              <div className="space-y-3">
                {discussions.map((discussion, idx) => (
                  <Card 
                    key={idx} 
                    className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => onSelectDiscussion(discussion)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-2">{discussion.title}</h5>
                          <div className="flex gap-2 flex-wrap">
                            <Badge className="text-xs bg-orange-100 text-orange-800">
                              {discussion.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {discussion.author}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {discussion.created}
                            </Badge>
                          </div>
                          {discussion.summary && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {discussion.summary}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-md">
                <CardContent className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">💬</div>
                  <p>No discussions yet for this principle</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}