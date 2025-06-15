'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, ExternalLink, GitBranch, Layers, Filter, Info } from 'lucide-react';
import { GovernancePrinciple } from '@/types/governance';

interface PrinciplesViewProps {
  principles: GovernancePrinciple[];
  organizationName: string;
  organizationId?: string;
}

export function PrinciplesViewWithInheritance({ principles, organizationName, organizationId }: PrinciplesViewProps) {
  const [filter, setFilter] = useState<'all' | 'inherited' | 'domain'>('all');
  
  if (!principles || principles.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Principles Found</h3>
        <p className="text-gray-600">No principles have been defined for {organizationName} yet.</p>
      </div>
    );
  }
  
  // Categorize principles by inheritance
  const inheritedPrinciples = principles.filter(p => p.is_inherited);
  const domainPrinciples = principles.filter(p => !p.is_inherited);
  
  const filteredPrinciples = 
    filter === 'inherited' ? inheritedPrinciples :
    filter === 'domain' ? domainPrinciples :
    principles;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{organizationName} Principles</h3>
          <div className="flex items-center gap-4 mt-1">
            <p className="text-gray-600">{principles.length} principle{principles.length !== 1 ? 's' : ''} defined</p>
            {inheritedPrinciples.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Layers className="w-3 h-3" />
                <span>{inheritedPrinciples.length} inherited</span>
              </div>
            )}
            {domainPrinciples.length > 0 && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Shield className="w-3 h-3" />
                <span>{domainPrinciples.length} domain-specific</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className="rounded-none"
            >
              All ({principles.length})
            </Button>
            <Button
              variant={filter === 'inherited' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('inherited')}
              className="rounded-none border-l"
            >
              <Layers className="w-3 h-3 mr-1" />
              Inherited ({inheritedPrinciples.length})
            </Button>
            <Button
              variant={filter === 'domain' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('domain')}
              className="rounded-none border-l"
            >
              <Shield className="w-3 h-3 mr-1" />
              Domain ({domainPrinciples.length})
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredPrinciples.map((principle, index) => (
          <Card 
            key={`${principle.principle_id}-${index}`} 
            className={`p-6 hover:shadow-md transition-shadow border-l-4 ${
              principle.is_inherited 
                ? 'border-l-blue-400 bg-blue-50/30' 
                : 'border-l-green-400 bg-green-50/30'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {principle.name || principle.principle_id}
                  </h4>
                  <Badge className="bg-blue-100 text-blue-700 border-0">
                    v{principle.version}
                  </Badge>
                  {principle.category && (
                    <Badge variant="outline" className="text-xs">
                      {principle.category.replace(/_/g, ' ')}
                    </Badge>
                  )}
                  
                  {/* Inheritance indicator */}
                  {principle.is_inherited ? (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      <Layers className="w-3 h-3 mr-1" />
                      Inherited from {principle.inheritance_source}
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      <Shield className="w-3 h-3 mr-1" />
                      Domain-specific
                    </Badge>
                  )}
                  
                  {/* Inheritance modification indicator */}
                  {principle.inheritance_modification && (
                    <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Info className="w-3 h-3 mr-1" />
                      Modified: {principle.inheritance_modification.replace('inherited_', '').replace(/_/g, ' ')}
                    </Badge>
                  )}
                </div>
                
                {principle.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {principle.description}
                  </p>
                )}
                
                {/* Domain-specific structure handling */}
                {principle.freedoms && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Five Freedoms Framework
                    </h5>
                    
                    <div className="grid gap-3">
                      {Object.entries(principle.freedoms).map(([freedomKey, freedom]: [string, any]) => (
                        <div key={freedomKey} className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                          <h6 className="font-medium text-amber-900 mb-2">
                            {freedomKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h6>
                          <p className="text-sm text-amber-800 mb-3">{freedom.description}</p>
                          
                          {freedom.philosophical_basis && (
                            <div className="mb-2">
                              <span className="text-xs font-medium text-amber-700">Philosophical Basis:</span>
                              <p className="text-xs text-amber-700 mt-1">{freedom.philosophical_basis}</p>
                            </div>
                          )}
                          
                          {freedom.ethical_considerations && (
                            <div>
                              <span className="text-xs font-medium text-amber-700">Ethical Considerations:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {freedom.ethical_considerations.map((consideration: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-300">
                                    {consideration}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Reference to operational rules */}
                          <div className="mt-3 pt-2 border-t border-amber-200">
                            <div className="flex items-center gap-1 text-xs text-amber-600">
                              <span>📋</span>
                              <span>Implementation details available in Rules tab</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Environment-specific ecosystem philosophy */}
                {principle.ecosystem_philosophy && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Ecosystem Philosophy
                    </h5>
                    
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      {principle.ecosystem_philosophy.guiding_principles && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-green-800">Guiding Principles:</span>
                          <ul className="text-sm text-green-700 mt-1 space-y-1">
                            {principle.ecosystem_philosophy.guiding_principles.map((principle_text: string, i: number) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-green-500">•</span>
                                <span>{principle_text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {principle.ecosystem_philosophy.ethical_considerations && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-green-800">Ethical Considerations:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {principle.ecosystem_philosophy.ethical_considerations.map((consideration: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                                {consideration}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {principle.ecosystem_philosophy.value_framework && (
                        <div>
                          <span className="text-sm font-medium text-green-800">Value Framework:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(principle.ecosystem_philosophy.value_framework).map(([key, value]) => (
                              <div key={key} className="text-xs text-green-700">
                                <span className="font-medium">{key.replace(/_/g, ' ')}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Reference to operational rules */}
                      <div className="mt-3 pt-2 border-t border-green-200">
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <span>📋</span>
                          <span>Implementation protocols available in Rules tab</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ethical Foundation */}
                {principle.ethical_foundation && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Ethical Foundation
                    </h5>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {Object.entries(principle.ethical_foundation).map(([key, value]: [string, any]) => (
                        <div key={key} className="border-l-2 border-blue-200 pl-3">
                          <h6 className="font-medium text-sm text-gray-800 mb-1">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h6>
                          <p className="text-sm text-gray-600">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Value System */}
                {principle.value_system && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Value System
                    </h5>
                    
                    <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                      {Object.entries(principle.value_system).map(([key, value]: [string, any]) => (
                        <div key={key} className="border-l-2 border-purple-200 pl-3">
                          <h6 className="font-medium text-sm text-purple-800 mb-1">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h6>
                          <p className="text-sm text-purple-700">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Philosophical Foundation */}
                {principle.philosophical_foundation && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Philosophical Foundation
                    </h5>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">{principle.philosophical_foundation}</p>
                    </div>
                  </div>
                )}
                
                {/* Ethical Framework */}
                {principle.ethical_framework && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Ethical Framework
                    </h5>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800">{principle.ethical_framework}</p>
                    </div>
                  </div>
                )}

                {/* Operational Implementation Reference */}
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">📋</span>
                    </div>
                    <div>
                      <h6 className="font-medium text-amber-900 mb-1">Implementation Details</h6>
                      <p className="text-sm text-amber-800 mb-2">
                        This principle provides philosophical guidance. For specific operational requirements, 
                        validation rules, and enforcement mechanisms, visit the <strong>Rules</strong> tab.
                      </p>
                      <div className="flex items-center gap-2 text-xs text-amber-700">
                        <span>Terms</span>
                        <span>→</span>
                        <span className="bg-amber-200 px-2 py-1 rounded font-semibold">Principles</span>
                        <span>→</span>
                        <span>Rules</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cross Domain Applications */}
                {(principle as any).cross_domain_applications && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Cross-Domain Applications
                    </h5>
                    
                    <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                      {Object.entries((principle as any).cross_domain_applications).map(([domain, application]: [string, any]) => (
                        <div key={domain} className="flex items-center justify-between py-2 border-b border-purple-200 last:border-b-0">
                          <span className="font-medium text-purple-800 capitalize">{domain.replace(/_/g, ' ')}</span>
                          <span className="text-sm text-purple-700">{String(application)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Implementation Framework (Animal Welfare) */}
                {principle.implementation && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4" />
                      Implementation Framework
                    </h5>
                    
                    <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                      {Object.entries(principle.implementation).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-indigo-900">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                          </span>
                          <span className="text-sm text-indigo-700">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extension Configuration Info */}
                {principle.extension_config && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <GitBranch className="w-4 h-4" />
                      Extension Configuration
                    </h5>
                    
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-purple-900">Status:</span>
                        <Badge className={`text-xs ${
                          (principle.extension_config as any).status === 'core_to_domain'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-green-100 text-green-700 border-green-200'
                        }`}>
                          {(principle.extension_config as any).status?.replace('_', ' ')}
                        </Badge>
                      </div>
                      {(principle.extension_config as any).description && (
                        <p className="text-sm text-purple-700 mt-2">
                          {(principle.extension_config as any).description}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Changelog */}
                {(principle as any).changelog && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Version History
                    </h5>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {Object.entries((principle as any).changelog).reverse().map(([version, changes]: [string, any]) => (
                        <div key={version} className="border-l-2 border-gray-300 pl-3">
                          <div className="flex items-center gap-3 mb-2">
                            <h6 className="font-medium text-sm text-gray-800">Version {version}</h6>
                            {changes.date && (
                              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{changes.date}</span>
                            )}
                          </div>
                          {changes.changes && Array.isArray(changes.changes) && (
                            <ul className="text-sm text-gray-600 space-y-1 mb-2">
                              {changes.changes.map((change: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-gray-400">•</span>
                                  <span>{change}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {changes.approved_by && (
                            <p className="text-xs text-gray-500">
                              Approved by: <span className="font-medium">{changes.approved_by.replace(/_/g, ' ')}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredPrinciples.length === 0 && (
        <div className="text-center py-8">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No {filter} principles found</h3>
          <p className="text-gray-600">
            {filter === 'inherited' ? 'This domain has no inherited principles.' :
             filter === 'domain' ? 'This domain has no domain-specific principles.' :
             'No principles are defined for this domain.'}
          </p>
        </div>
      )}
    </div>
  );
}