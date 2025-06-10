'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Settings, Bot, Key, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [llmProvider, setLlmProvider] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // Mock save operation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Settings className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-4">
            Configure your AI agents and LLM providers
          </p>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            🚧 Mock Implementation - No real API connections
          </Badge>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Settings saved successfully! (Mock implementation - not actually saved)
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          {/* LLM Provider Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Agent Configuration
              </CardTitle>
              <CardDescription>
                Choose your preferred LLM provider for AI agent intelligence. This is a mock interface - no real connections are made.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="llm-provider">LLM Provider</Label>
                <Select value={llmProvider} onValueChange={setLlmProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your LLM provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="github-copilot">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        GitHub Copilot Agent Mode
                      </div>
                    </SelectItem>
                    <SelectItem value="claude-code">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Claude Code
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Custom LLM API
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {llmProvider && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold">Provider Information</h4>
                  {llmProvider === 'github-copilot' && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        GitHub Copilot Agent Mode provides autonomous task execution and code generation capabilities.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Agent Mode support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>GitHub Actions integration</span>
                      </div>
                    </div>
                  )}
                  {llmProvider === 'claude-code' && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Claude Code provides deep reasoning and ethical analysis capabilities.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Ethical reasoning</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Code analysis</span>
                      </div>
                    </div>
                  )}
                  {llmProvider === 'custom' && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Configure your own LLM API endpoint for custom AI agent capabilities.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>Requires technical configuration</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Key Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Key Configuration
              </CardTitle>
              <CardDescription>
                Securely store your API keys for agent communication. Keys are encrypted and never shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-muted-foreground">
                  API key input is disabled in this mock implementation
                </p>
              </div>

              <Alert className="border-blue-200 bg-blue-50">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Security Note:</strong> In the real implementation, API keys are encrypted end-to-end and never stored in plain text.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Agent Behavior Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Behavior Settings</CardTitle>
              <CardDescription>
                Configure how your personal AI agent behaves and analyzes proposals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Analysis Style</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative - Focus on risks</SelectItem>
                      <SelectItem value="balanced">Balanced - Consider all aspects</SelectItem>
                      <SelectItem value="progressive">Progressive - Favor innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Response Frequency</Label>
                  <Select defaultValue="selective">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">Minimal - Only when mentioned</SelectItem>
                      <SelectItem value="selective">Selective - High impact only</SelectItem>
                      <SelectItem value="active">Active - Participate frequently</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Preview Agent Personality</h4>
                <p className="text-sm text-muted-foreground">
                  "I analyze proposals with a balanced approach, considering both innovation potential and risk factors. 
                  I participate selectively in discussions, focusing on high-impact decisions that align with our shared values."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>

          {/* Phase 3 Notice */}
          <Alert className="border-purple-200 bg-purple-50">
            <Bot className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>Coming in Phase 3:</strong> Real API integrations, blockchain identity verification, 
              and advanced agent coordination across DAHAOs.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}