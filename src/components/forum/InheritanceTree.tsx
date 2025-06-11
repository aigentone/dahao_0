'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitBranch, ArrowRight, Shield, Zap, AlertCircle } from 'lucide-react';
import { InheritanceConfig, GovernanceOrganization } from '@/types/governance';

interface InheritanceTreeProps {
  organizations: GovernanceOrganization[];
  currentDomain: string;
  onNavigate: (domain: string) => void;
}

export function InheritanceTree({ organizations, currentDomain, onNavigate }: InheritanceTreeProps) {
  // Build inheritance hierarchy
  const buildInheritanceTree = () => {
    const orgMap = new Map(organizations.map(org => [org.id, org]));
    const tree: { core: GovernanceOrganization; domains: GovernanceOrganization[] } = {
      core: orgMap.get('core-governance')!,
      domains: []
    };

    organizations.forEach(org => {
      if (org.id !== 'core-governance' && org.inheritance.extends?.includes('core-governance')) {
        tree.domains.push(org);
      }
    });

    return tree;
  };

  const tree = buildInheritanceTree();
  
  if (!tree.core) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>No inheritance tree available</p>
        </div>
      </Card>
    );
  }

  const getVersionBadgeColor = (version: string) => {
    const [major, minor] = version.split('.').map(Number);
    if (major >= 1 && minor >= 1) return 'bg-green-100 text-green-700 border-green-200';
    if (major >= 1) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const getInheritanceInfo = (org: GovernanceOrganization) => {
    const coreVersion = tree.core.version;
    const extendsVersion = org.inheritance.extends?.split('@')[1] || 'unknown';
    const isCompatible = extendsVersion === coreVersion;
    
    return { extendsVersion, isCompatible };
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <GitBranch className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Inheritance Tree</h3>
        <Badge variant="outline" className="text-xs">
          DAHAO Governance Structure
        </Badge>
      </div>

      <div className="space-y-6">
        {/* Core Governance */}
        <div className="flex items-center justify-center">
          <Card 
            className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
              currentDomain === tree.core.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onNavigate(tree.core.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{tree.core.name}</span>
                  <Badge className={getVersionBadgeColor(tree.core.version)}>
                    v{tree.core.version}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Foundation Layer</p>
              </div>
            </div>
            
            {tree.core.inheritance.provides && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Provides:</p>
                <div className="flex flex-wrap gap-1">
                  {tree.core.inheritance.provides.map(principle => (
                    <Badge key={principle} variant="outline" className="text-xs">
                      {principle.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Inheritance Lines */}
        {tree.domains.length > 0 && (
          <div className="flex justify-center">
            <div className="w-px h-8 bg-gray-300"></div>
          </div>
        )}

        {/* Domain Extensions */}
        {tree.domains.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {tree.domains.map((domain) => {
              const { extendsVersion, isCompatible } = getInheritanceInfo(domain);
              
              return (
                <Card 
                  key={domain.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md border-2 ${
                    currentDomain === domain.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onNavigate(domain.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      currentDomain === domain.id ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      <span className="text-lg">{domain.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{domain.name}</span>
                        <Badge className={getVersionBadgeColor(domain.version)}>
                          v{domain.version}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <span>extends</span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="font-medium">core-governance@{extendsVersion}</span>
                        {!isCompatible && (
                          <AlertCircle className="w-3 h-3 text-orange-500" title="Version mismatch" />
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2">{domain.description}</p>
                    </div>
                  </div>

                  {/* Domain Extensions */}
                  {domain.inheritance.domain_extensions && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Domain Extensions:</p>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(domain.inheritance.domain_extensions).map(([key, config]) => (
                          <Badge 
                            key={key} 
                            variant="outline" 
                            className={`text-xs ${
                              (config as any).status === 'core_to_domain' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-green-50 text-green-700 border-green-200'
                            }`}
                          >
                            {key.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inheritance Modifications */}
                  {domain.inheritance.inheritance?.core_principles && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Core Modifications:</p>
                      <div className="text-xs text-gray-600">
                        {Object.entries(domain.inheritance.inheritance.core_principles).map(([principle, rule]) => (
                          <div key={principle} className="flex justify-between">
                            <span>{principle.replace('_', ' ')}</span>
                            <span className={`font-medium ${
                              rule === 'inherited' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {rule === 'inherited' ? '✓' : '~'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isCompatible && (
                    <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                      <div className="flex items-center gap-1 text-orange-700">
                        <AlertCircle className="w-3 h-3" />
                        <span className="font-medium">Version Compatibility Warning</span>
                      </div>
                      <p className="text-orange-600 mt-1">
                        Extends core-governance@{extendsVersion} but current is v{tree.core.version}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Legend</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">✓</Badge>
              <span className="text-gray-600">Inherited unchanged</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">~</Badge>
              <span className="text-gray-600">Inherited with modifications</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-50 text-green-700 border-green-200">domain_specific</Badge>
              <span className="text-gray-600">Domain-only principle</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">core_to_domain</Badge>
              <span className="text-gray-600">Core principle adapted for domain</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}