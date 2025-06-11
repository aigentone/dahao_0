'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ExternalLink, GitBranch } from 'lucide-react';
import { GovernancePrinciple } from '@/types/governance';

interface PrinciplesViewProps {
  principles: GovernancePrinciple[];
  organizationName: string;
}

export function PrinciplesView({ principles, organizationName }: PrinciplesViewProps) {
  if (!principles || principles.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Principles Found</h3>
        <p className="text-gray-600">No principles have been defined for {organizationName} yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{organizationName} Principles</h3>
          <p className="text-gray-600 mt-1">{principles.length} principle{principles.length !== 1 ? 's' : ''} defined</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Shield className="w-3 h-3 mr-1" />
          Governance Framework
        </Badge>
      </div>

      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <Card key={`${principle.principle_id}-${index}`} className="p-6 hover:shadow-md transition-shadow">
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
                </div>
                
                {principle.description && (
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {principle.description}
                  </p>
                )}

                {/* Requirements */}
                {(principle as any).requirements && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Requirements
                    </h5>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {Object.entries((principle as any).requirements).map(([key, value]: [string, any]) => (
                        <div key={key} className="border-l-2 border-blue-200 pl-3">
                          <h6 className="font-medium text-sm text-gray-800 mb-1">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h6>
                          {typeof value === 'object' && value !== null ? (
                            <div className="text-sm text-gray-600 space-y-1">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey} className="flex flex-col sm:flex-row sm:justify-between">
                                  <span className="font-medium">{subKey.replace(/_/g, ' ')}:</span>
                                  <span className="text-right">{typeof subValue === 'boolean' ? (subValue ? '✅ Required' : '❌ Optional') : String(subValue)}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600">{String(value)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation Rules */}
                {(principle as any).validation_rules && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Validation Rules
                    </h5>
                    
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                      {Object.entries((principle as any).validation_rules).map(([key, value]: [string, any]) => (
                        <div key={key} className="border-l-2 border-blue-300 pl-3">
                          <h6 className="font-medium text-sm text-blue-800 mb-2">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h6>
                          {Array.isArray(value) ? (
                            <ul className="text-sm text-blue-700 space-y-1">
                              {value.map((item: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-blue-700">{String(value)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {(principle as any).examples && (
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Examples
                    </h5>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries((principle as any).examples).map(([type, examples]: [string, any]) => (
                        <div key={type} className={`rounded-lg p-4 ${type === 'good' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                          <h6 className={`font-medium text-sm mb-2 ${type === 'good' ? 'text-green-800' : 'text-red-800'}`}>
                            {type === 'good' ? '✅ Good Examples' : '❌ Bad Examples'}
                          </h6>
                          {Array.isArray(examples) ? (
                            <ul className={`text-sm space-y-1 ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>
                              {examples.map((example: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className={type === 'good' ? 'text-green-500' : 'text-red-500'}>•</span>
                                  <span>{example}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className={`text-sm ${type === 'good' ? 'text-green-700' : 'text-red-700'}`}>{String(examples)}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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

                {/* Cross References */}
                {(principle as any).cross_references && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <ExternalLink className="w-4 h-4" />
                      Cross References
                    </h5>
                    
                    <div className="space-y-2">
                      {(principle as any).cross_references.extends && (
                        <div>
                          <span className="text-sm font-medium text-green-700">Extends:</span>
                          <div className="ml-4 space-y-1">
                            {(principle as any).cross_references.extends.map((ref: any, i: number) => (
                              <div key={i} className="text-sm text-gray-600">
                                {ref.principle} v{ref.version} - {ref.application}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(principle as any).cross_references.coordinates_with && (
                        <div>
                          <span className="text-sm font-medium text-blue-700">Coordinates with:</span>
                          <div className="ml-4 space-y-1">
                            {(principle as any).cross_references.coordinates_with.map((ref: any, i: number) => (
                              <div key={i} className="text-sm text-gray-600">
                                {ref.domain} → {ref.principle} v{ref.version}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Validation Metrics */}
                {(principle as any).validation_metrics && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-3">Validation Metrics</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {Object.entries((principle as any).validation_metrics).map(([key, value]) => (
                        <div key={key} className="bg-blue-50 rounded p-3">
                          <div className="font-medium text-blue-900 mb-1">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          {typeof value === 'object' && value !== null ? (
                            <div className="space-y-1">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey} className="text-blue-700">
                                  {subKey.replace(/_/g, ' ')}: {String(subValue)}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-blue-700">{String(value)}</div>
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
    </div>
  );
}