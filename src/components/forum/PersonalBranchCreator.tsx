'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  GitBranch, 
  Bot, 
  Coins, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';

interface PersonalValueSystem {
  coreValues: string[];
  customValues: string[];
  priorityLevel: 'conservative' | 'balanced' | 'progressive';
}

interface PersonalAIConfig {
  agentName: string;
  personalityTraits: string[];
  decisionMaking: 'consensus' | 'autonomous' | 'hybrid';
  deploymentScope: string[];
}

interface PersonalBranchConfig {
  branchName: string;
  parentDAHAO: string;
  valueSystem: PersonalValueSystem;
  aiAgentConfig: PersonalAIConfig;
  tokenParticipation: boolean;
  description: string;
}

interface PersonalBranchCreatorProps {
  availableDAHAOs: Array<{id: string, name: string}>;
  onCreateBranch: (config: PersonalBranchConfig) => void;
}

export function PersonalBranchCreator({ availableDAHAOs, onCreateBranch }: PersonalBranchCreatorProps) {
  const [config, setConfig] = useState<PersonalBranchConfig>({
    branchName: '',
    parentDAHAO: '',
    valueSystem: {
      coreValues: [],
      customValues: [],
      priorityLevel: 'balanced'
    },
    aiAgentConfig: {
      agentName: '',
      personalityTraits: [],
      decisionMaking: 'hybrid',
      deploymentScope: []
    },
    tokenParticipation: true,
    description: ''
  });

  const [step, setStep] = useState(1);
  const [customValue, setCustomValue] = useState('');
  const [customTrait, setCustomTrait] = useState('');

  const coreValueOptions = [
    'transparency', 'equality', 'harm-prevention', 'sustainability',
    'animal-welfare', 'environmental-protection', 'social-justice'
  ];

  const traitOptions = [
    'analytical', 'empathetic', 'cautious', 'innovative', 
    'collaborative', 'assertive', 'detail-oriented', 'big-picture'
  ];

  const deploymentOptions = [
    'governance-voting', 'proposal-analysis', 'community-mediation',
    'research-assistance', 'content-moderation', 'cross-branch-coordination'
  ];

  const addCustomValue = () => {
    if (customValue.trim() && !config.valueSystem.customValues.includes(customValue.trim())) {
      setConfig(prev => ({
        ...prev,
        valueSystem: {
          ...prev.valueSystem,
          customValues: [...prev.valueSystem.customValues, customValue.trim()]
        }
      }));
      setCustomValue('');
    }
  };

  const removeCustomValue = (value: string) => {
    setConfig(prev => ({
      ...prev,
      valueSystem: {
        ...prev.valueSystem,
        customValues: prev.valueSystem.customValues.filter(v => v !== value)
      }
    }));
  };

  const addCustomTrait = () => {
    if (customTrait.trim() && !config.aiAgentConfig.personalityTraits.includes(customTrait.trim())) {
      setConfig(prev => ({
        ...prev,
        aiAgentConfig: {
          ...prev.aiAgentConfig,
          personalityTraits: [...prev.aiAgentConfig.personalityTraits, customTrait.trim()]
        }
      }));
      setCustomTrait('');
    }
  };

  const removeTrait = (trait: string) => {
    setConfig(prev => ({
      ...prev,
      aiAgentConfig: {
        ...prev.aiAgentConfig,
        personalityTraits: prev.aiAgentConfig.personalityTraits.filter(t => t !== trait)
      }
    }));
  };

  const toggleSelection = (array: string[], item: string, updater: (newArray: string[]) => void) => {
    if (array.includes(item)) {
      updater(array.filter(i => i !== item));
    } else {
      updater([...array, item]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return config.branchName.trim() && config.parentDAHAO && config.description.trim();
      case 2:
        return config.valueSystem.coreValues.length > 0;
      case 3:
        return config.aiAgentConfig.agentName.trim() && config.aiAgentConfig.personalityTraits.length > 0;
      default:
        return true;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <h3 className="text-xl font-semibold mb-2">Create Your Personal DAHAO Branch</h3>
        <p className="text-gray-600">Start by defining your branch identity and choosing a parent DAHAO</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            placeholder="e.g., Alex's Environmental Focus"
            value={config.branchName}
            onChange={(e) => setConfig(prev => ({ ...prev, branchName: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="parentDAHAO">Parent DAHAO</Label>
          <Select value={config.parentDAHAO} onValueChange={(value) => setConfig(prev => ({ ...prev, parentDAHAO: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a parent DAHAO" />
            </SelectTrigger>
            <SelectContent>
              {availableDAHAOs.map((dahao) => (
                <SelectItem key={dahao.id} value={dahao.id}>
                  {dahao.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your branch's focus and goals..."
            value={config.description}
            onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Coins className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <p className="font-medium text-blue-900">Token Participation</p>
            <p className="text-sm text-blue-700">Participate in investment pool governance and earn tokens</p>
          </div>
          <Button
            variant={config.tokenParticipation ? "default" : "outline"}
            size="sm"
            onClick={() => setConfig(prev => ({ ...prev, tokenParticipation: !prev.tokenParticipation }))}
          >
            {config.tokenParticipation ? 'Enabled' : 'Disabled'}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
        <h3 className="text-xl font-semibold mb-2">Define Your Value System</h3>
        <p className="text-gray-600">Select core values and add your custom values</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Core Values (inherited from parent DAHAO)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {coreValueOptions.map((value) => (
              <Button
                key={value}
                variant={config.valueSystem.coreValues.includes(value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSelection(
                  config.valueSystem.coreValues,
                  value,
                  (newValues) => setConfig(prev => ({
                    ...prev,
                    valueSystem: { ...prev.valueSystem, coreValues: newValues }
                  }))
                )}
              >
                {value}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Custom Values</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add your custom value..."
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
            />
            <Button onClick={addCustomValue} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {config.valueSystem.customValues.map((value) => (
              <Badge key={value} variant="secondary" className="gap-1">
                {value}
                <button onClick={() => removeCustomValue(value)}>
                  <Minus className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Priority Level</Label>
          <Select 
            value={config.valueSystem.priorityLevel} 
            onValueChange={(value: 'conservative' | 'balanced' | 'progressive') => 
              setConfig(prev => ({
                ...prev,
                valueSystem: { ...prev.valueSystem, priorityLevel: value }
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservative">Conservative - Gradual change</SelectItem>
              <SelectItem value="balanced">Balanced - Measured progress</SelectItem>
              <SelectItem value="progressive">Progressive - Rapid innovation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Bot className="w-12 h-12 mx-auto mb-3 text-purple-600" />
        <h3 className="text-xl font-semibold mb-2">Configure Your AI Agent</h3>
        <p className="text-gray-600">Customize your personal AI agent's personality and capabilities</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="agentName">AI Agent Name</Label>
          <Input
            id="agentName"
            placeholder="e.g., Alex's Assistant, EcoBot, etc."
            value={config.aiAgentConfig.agentName}
            onChange={(e) => setConfig(prev => ({
              ...prev,
              aiAgentConfig: { ...prev.aiAgentConfig, agentName: e.target.value }
            }))}
          />
        </div>

        <div>
          <Label>Personality Traits</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {traitOptions.map((trait) => (
              <Button
                key={trait}
                variant={config.aiAgentConfig.personalityTraits.includes(trait) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSelection(
                  config.aiAgentConfig.personalityTraits,
                  trait,
                  (newTraits) => setConfig(prev => ({
                    ...prev,
                    aiAgentConfig: { ...prev.aiAgentConfig, personalityTraits: newTraits }
                  }))
                )}
              >
                {trait}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Add custom trait..."
              value={customTrait}
              onChange={(e) => setCustomTrait(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomTrait()}
            />
            <Button onClick={addCustomTrait} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {config.aiAgentConfig.personalityTraits.filter(trait => !traitOptions.includes(trait)).map((trait) => (
              <Badge key={trait} variant="secondary" className="gap-1">
                {trait}
                <button onClick={() => removeTrait(trait)}>
                  <Minus className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label>Decision Making Style</Label>
          <Select 
            value={config.aiAgentConfig.decisionMaking} 
            onValueChange={(value: 'consensus' | 'autonomous' | 'hybrid') => 
              setConfig(prev => ({
                ...prev,
                aiAgentConfig: { ...prev.aiAgentConfig, decisionMaking: value }
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consensus">Consensus - Always seeks community agreement</SelectItem>
              <SelectItem value="autonomous">Autonomous - Makes independent decisions</SelectItem>
              <SelectItem value="hybrid">Hybrid - Contextual decision making</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Deployment Scope</Label>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {deploymentOptions.map((scope) => (
              <Button
                key={scope}
                variant={config.aiAgentConfig.deploymentScope.includes(scope) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSelection(
                  config.aiAgentConfig.deploymentScope,
                  scope,
                  (newScope) => setConfig(prev => ({
                    ...prev,
                    aiAgentConfig: { ...prev.aiAgentConfig, deploymentScope: newScope }
                  }))
                )}
              >
                {scope}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <GitBranch className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <h3 className="text-xl font-semibold mb-2">Review & Create Branch</h3>
        <p className="text-gray-600">Review your configuration and create your personal DAHAO branch</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Branch Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Branch Name</Label>
              <p className="text-gray-900">{config.branchName}</p>
            </div>
            <div>
              <Label>Parent DAHAO</Label>
              <p className="text-gray-900">{availableDAHAOs.find(d => d.id === config.parentDAHAO)?.name}</p>
            </div>
            <div>
              <Label>Token Participation</Label>
              <Badge variant={config.tokenParticipation ? "default" : "secondary"}>
                {config.tokenParticipation ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Value System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Core Values ({config.valueSystem.coreValues.length})</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.valueSystem.coreValues.map(value => (
                    <Badge key={value} variant="outline">{value}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Custom Values ({config.valueSystem.customValues.length})</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.valueSystem.customValues.map(value => (
                    <Badge key={value} variant="secondary">{value}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Priority Level</Label>
                <Badge>{config.valueSystem.priorityLevel}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Agent Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label>Agent Name</Label>
                <p className="text-gray-900">{config.aiAgentConfig.agentName}</p>
              </div>
              <div>
                <Label>Personality Traits ({config.aiAgentConfig.personalityTraits.length})</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.aiAgentConfig.personalityTraits.map(trait => (
                    <Badge key={trait} variant="outline">{trait}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Decision Making</Label>
                <Badge>{config.aiAgentConfig.decisionMaking}</Badge>
              </div>
              <div>
                <Label>Deployment Scope ({config.aiAgentConfig.deploymentScope.length})</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.aiAgentConfig.deploymentScope.map(scope => (
                    <Badge key={scope} variant="outline">{scope}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Personal Branch Creator
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Step {step} of 4</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={() => onCreateBranch(config)}
                disabled={!canProceed()}
              >
                Create Branch
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}