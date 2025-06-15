'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Scale, 
  FileText,
  Clock,
  Target,
  Gavel,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Filter
} from 'lucide-react';
import { GovernanceRule } from '@/types/governance';

interface RulesViewProps {
  rules: GovernanceRule[];
  organizationName: string;
  onRuleSelect?: (rule: GovernanceRule) => void;
}

export default function RulesView({ rules, organizationName, onRuleSelect }: RulesViewProps) {
  const [filter, setFilter] = useState<'all' | 'implementation' | 'compliance' | 'enforcement'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter rules by type and category
  const filteredRules = useMemo(() => {
    let filtered = rules;

    // Filter by main category
    if (filter !== 'all') {
      filtered = filtered.filter(rule => {
        switch (filter) {
          case 'implementation':
            return rule.implementation_requirements || rule.assessment_framework;
          case 'compliance':
            return rule.compliance_monitoring || rule.measurement_protocols;
          case 'enforcement':
            return rule.enforcement_mechanisms || rule.violation_responses;
          default:
            return true;
        }
      });
    }

    // Filter by rule category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(rule => rule.category === selectedCategory);
    }

    return filtered;
  }, [rules, filter, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(rules.map(rule => rule.category));
    return Array.from(cats).sort();
  }, [rules]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'implementation': return <Settings className="w-4 h-4" />;
      case 'core_implementation': return <Shield className="w-4 h-4" />;
      case 'compliance': return <CheckCircle className="w-4 h-4" />;
      case 'enforcement': return <Gavel className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'implementation': return 'bg-blue-100 text-blue-800';
      case 'core_implementation': return 'bg-purple-100 text-purple-800';
      case 'compliance': return 'bg-green-100 text-green-800';
      case 'enforcement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderRuleCard = (rule: GovernanceRule) => (
    <Card 
      key={rule.rule_id} 
      className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-400"
      onClick={() => onRuleSelect?.(rule)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-lg">{rule.name}</CardTitle>
              <Badge className="bg-blue-100 text-blue-700 border-0">
                v{rule.version}
              </Badge>
              <Badge className={getCategoryColor(rule.category)}>
                {getCategoryIcon(rule.category)}
                <span className="ml-1">{rule.category.replace('_', ' ')}</span>
              </Badge>
            </div>
            <CardDescription className="text-sm">{rule.description}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Derived from principles */}
        {rule.derives_from_principles && rule.derives_from_principles.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Derived from Principles:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {rule.derives_from_principles.map(principleRef => (
                <Badge key={principleRef} variant="outline" className="text-xs">
                  {principleRef.split(':').pop()?.split('@')[0]}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Implementation requirements summary */}
        {rule.implementation_requirements && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Implementation Areas:</span>
            </div>
            <div className="text-xs text-gray-600">
              {Object.keys(rule.implementation_requirements).length} implementation requirements
            </div>
          </div>
        )}

        {/* Compliance monitoring */}
        {rule.compliance_monitoring && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Compliance Monitoring:</span>
            </div>
            <div className="text-xs text-gray-600">
              {rule.compliance_monitoring.audit_frequency && (
                <div>Audit: {rule.compliance_monitoring.audit_frequency}</div>
              )}
            </div>
          </div>
        )}

        {/* Enforcement mechanisms */}
        {rule.enforcement_mechanisms && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gavel className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Enforcement:</span>
            </div>
            <div className="text-xs text-gray-600">
              {Object.keys(rule.enforcement_mechanisms).length} enforcement mechanisms
            </div>
          </div>
        )}

        {/* Personal branch support */}
        {rule.personal_branch_support?.custom_rule_variations && (
          <div className="flex items-center gap-2 text-xs text-purple-600">
            <TrendingUp className="w-3 h-3" />
            <span>Supports personal rule variations</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Operational Rules</h3>
          <p className="text-gray-600">
            Implementation requirements and enforcement mechanisms for {organizationName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50">
            {filteredRules.length} rules
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Rule type filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          <div className="flex gap-1">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="rounded-none border-r-0"
            >
              All ({rules.length})
            </Button>
            <Button
              variant={filter === 'implementation' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('implementation')}
              className="rounded-none border-r-0"
            >
              <Settings className="w-3 h-3 mr-1" />
              Implementation ({rules.filter(r => r.implementation_requirements).length})
            </Button>
            <Button
              variant={filter === 'compliance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('compliance')}
              className="rounded-none border-r-0"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Compliance ({rules.filter(r => r.compliance_monitoring).length})
            </Button>
            <Button
              variant={filter === 'enforcement' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('enforcement')}
              className="rounded-none"
            >
              <Gavel className="w-3 h-3 mr-1" />
              Enforcement ({rules.filter(r => r.enforcement_mechanisms).length})
            </Button>
          </div>
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <div className="flex gap-1">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="text-xs"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category.replace('_', ' ')}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rules Grid */}
      <div className="grid gap-4">
        {filteredRules.map(renderRuleCard)}
      </div>

      {/* Empty state */}
      {filteredRules.length === 0 && (
        <Card>
          <CardContent className="text-center p-8">
            <Scale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Rules Found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all' 
                ? 'No operational rules have been defined for this organization yet.'
                : `No rules match the selected filter: ${filter}.`
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
              <span>Rules are derived from principles</span>
              <ArrowRight className="w-4 h-4" />
              <span>Visit the Principles tab to see the philosophical foundations</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rule Hierarchy Explanation */}
      {rules.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Understanding Rule Hierarchy</h4>
                <p className="text-sm text-blue-800 mb-2">
                  Operational rules are derived from governance principles, creating a clear hierarchy:
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <span className="bg-blue-100 px-2 py-1 rounded">Terms</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-blue-100 px-2 py-1 rounded">Principles</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="bg-blue-200 px-2 py-1 rounded font-semibold">Rules</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}