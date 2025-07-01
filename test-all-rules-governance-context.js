#!/usr/bin/env node

// Comprehensive Test Script for All 10 DAHAO Rule Types with Governance Context
// Validates that tool executor integration enables governance-aware analysis across all rules

const fs = require('fs');
const path = require('path');

// Test configuration
const API_BASE_URL = 'http://localhost:3001/api/ai/analyze';
const RESULTS_FILE = 'rule-validation-results.json';
const RESULTS_SUMMARY_FILE = 'rule-validation-summary.md';

// All 10 rule types to test
const RULE_TYPES = [
  'definition-clarity',
  'usage-consistency', 
  'evolution-analysis',
  'philosophical-consistency',
  'implementation-feasibility',
  'cross-domain-impact',
  'enforcement-mechanism',
  'compliance-framework',
  'implementation-requirements',
  'general-analysis'
];

// Test data variations for comprehensive coverage
const TEST_SCENARIOS = [
  {
    name: 'John Personal Branch - Term Analysis',
    user: {
      id: 'user-john-123',
      name: 'John',
      branch: 'john-main-branch',
      values: ['transparency', 'fairness']
    },
    governanceItem: {
      id: 'harm',
      name: 'Harm',
      type: 'term',
      version: '1.2.0',
      data: { definition: 'Physical damage to beings, psychological distress' }
    },
    branch: {
      id: 'john-main-branch',
      name: 'Johns Main Branch'
    },
    agentType: 'personal'
  },
  {
    name: 'Core DAHAO - Principle Analysis',
    user: {
      id: 'user-sarah-456',
      name: 'Sarah',
      branch: 'core-dahao',
      values: ['equality', 'harm-prevention']
    },
    governanceItem: {
      id: 'transparency',
      name: 'Transparency',
      type: 'principle',
      version: '2.1.0',
      data: { statement: 'All governance processes must be open and accountable' }
    },
    branch: {
      id: 'core-dahao',
      name: 'Core DAHAO'
    },
    agentType: 'system'
  },
  {
    name: 'Animal Welfare Branch - Rule Analysis',
    user: {
      id: 'user-alex-004',
      name: 'Alex',
      branch: 'animal-welfare-dahao',
      values: ['animal-welfare', 'species-protection']
    },
    governanceItem: {
      id: 'minimize-harm',
      name: 'Minimize Harm',
      type: 'rule',
      version: '1.0.0',
      data: { requirements: ['Prevent physical harm', 'Prevent emotional harm'] }
    },
    branch: {
      id: 'animal-welfare-dahao',
      name: 'Animal Welfare DAHAO'
    },
    agentType: 'personal'
  }
];

// Utility functions
async function makeAPIRequest(data) {
  const fetch = (await import('node-fetch')).default;
  
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}

function extractGovernanceIndicators(analysis) {
  const indicators = {
    hasToolExecution: false,
    toolsUsed: [],
    branchSpecific: false,
    governanceAware: false,
    personalizedContent: false,
    confidenceScore: 0,
    analysisLength: 0,
    governanceKeywords: [],
    branchMentions: [],
    versionMentions: []
  };

  if (!analysis || !analysis.analysis) return indicators;

  const analysisText = analysis.analysis.result?.analysis || '';
  const execution = analysis.analysis.execution || {};
  
  // Check tool execution
  indicators.hasToolExecution = !!(execution.mcpToolsUsed && execution.mcpToolsUsed.length > 0);
  indicators.toolsUsed = execution.mcpToolsUsed || [];
  
  // Basic metrics
  indicators.confidenceScore = analysis.analysis.result?.confidence || 0;
  indicators.analysisLength = analysisText.length;
  
  // Governance awareness indicators
  const governanceKeywords = [
    'branch', 'version', 'governance', 'element', 'usage', 'philosophy',
    'customization', 'inheritance', 'override', 'principle', 'rule',
    'transparency', 'values', 'requirements'
  ];
  
  const personalKeywords = [
    'your', 'you', 'personal', 'individualized', 'customized',
    'your branch', 'your values', 'your principles'
  ];
  
  const branchPatterns = [
    /branch/gi, /version.*\d+\.\d+\.\d+/gi, /core.*dahao/gi,
    /john.*branch/gi, /animal.*welfare/gi
  ];
  
  const versionPatterns = [
    /v?\d+\.\d+\.\d+/gi, /version.*\d+/gi
  ];
  
  // Count governance keywords
  governanceKeywords.forEach(keyword => {
    const matches = analysisText.toLowerCase().match(new RegExp(keyword, 'gi'));
    if (matches) {
      indicators.governanceKeywords.push({ keyword, count: matches.length });
    }
  });
  
  // Check for personalization
  personalKeywords.forEach(keyword => {
    if (analysisText.toLowerCase().includes(keyword)) {
      indicators.personalizedContent = true;
    }
  });
  
  // Check for branch-specific content
  branchPatterns.forEach(pattern => {
    const matches = analysisText.match(pattern);
    if (matches) {
      indicators.branchSpecific = true;
      indicators.branchMentions.push(...matches);
    }
  });
  
  // Check for version mentions
  versionPatterns.forEach(pattern => {
    const matches = analysisText.match(pattern);
    if (matches) {
      indicators.versionMentions.push(...matches);
    }
  });
  
  // Overall governance awareness
  indicators.governanceAware = 
    indicators.hasToolExecution && 
    (indicators.branchSpecific || indicators.governanceKeywords.length > 2);
  
  return indicators;
}

async function testRuleType(ruleType, scenario) {
  const testData = {
    ...scenario,
    task: {
      agentType: scenario.agentType,
      taskType: ruleType,
      context: `Testing ${ruleType} rule with governance context`
    }
  };
  
  console.log(`🔧 Testing ${ruleType} with ${scenario.name}...`);
  const startTime = Date.now();
  
  try {
    const result = await makeAPIRequest(testData);
    const duration = Date.now() - startTime;
    
    const indicators = extractGovernanceIndicators(result);
    
    const testResult = {
      ruleType,
      scenario: scenario.name,
      agentType: scenario.agentType,
      status: 'success',
      duration,
      governance: indicators,
      analysis: {
        id: result.analysis?.id,
        confidence: result.analysis?.result?.confidence,
        tokensUsed: result.analysis?.usage?.tokenUsage?.total,
        cost: result.analysis?.usage?.cost?.amount,
        analysisLength: result.analysis?.result?.analysis?.length || 0
      },
      execution: result.analysis?.execution || {},
      timestamp: new Date().toISOString()
    };
    
    // Success indicators
    const success = indicators.hasToolExecution && indicators.governanceAware;
    console.log(`${success ? '✅' : '⚠️'} ${ruleType}: ${success ? 'SUCCESS' : 'LIMITED'} (${indicators.toolsUsed.length} tools, ${indicators.confidenceScore}% confidence, ${duration}ms)`);
    
    return testResult;
    
  } catch (error) {
    console.log(`❌ ${ruleType}: FAILED - ${error.message}`);
    
    return {
      ruleType,
      scenario: scenario.name,
      agentType: scenario.agentType,
      status: 'error',
      error: error.message,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString()
    };
  }
}

async function runAllTests() {
  console.log('🚀 DAHAO Rule Types Governance Context Validation');
  console.log('=' .repeat(60));
  console.log(`Testing ${RULE_TYPES.length} rule types across ${TEST_SCENARIOS.length} scenarios\n`);
  
  const allResults = [];
  let successCount = 0;
  let totalTests = 0;
  
  // Test each rule type with each scenario
  for (const scenario of TEST_SCENARIOS) {
    console.log(`\n📋 Testing scenario: ${scenario.name}`);
    console.log('-'.repeat(40));
    
    for (const ruleType of RULE_TYPES) {
      const result = await testRuleType(ruleType, scenario);
      allResults.push(result);
      totalTests++;
      
      if (result.status === 'success' && result.governance?.governanceAware) {
        successCount++;
      }
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Generate summary statistics
  const summary = generateSummary(allResults, successCount, totalTests);
  
  // Save detailed results
  const detailedResults = {
    metadata: {
      testDate: new Date().toISOString(),
      totalTests,
      successCount,
      successRate: (successCount / totalTests * 100).toFixed(1),
      scenarios: TEST_SCENARIOS.length,
      ruleTypes: RULE_TYPES.length
    },
    summary,
    results: allResults
  };
  
  // Save to files
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(detailedResults, null, 2));
  console.log(`\n💾 Detailed results saved to: ${RESULTS_FILE}`);
  
  // Generate and save markdown summary
  const markdownSummary = generateMarkdownSummary(detailedResults);
  fs.writeFileSync(RESULTS_SUMMARY_FILE, markdownSummary);
  console.log(`📄 Summary report saved to: ${RESULTS_SUMMARY_FILE}`);
  
  // Final status
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}/${totalTests} (${(successCount/totalTests*100).toFixed(1)}%)`);
  console.log(`⚠️  Limited: ${totalTests - successCount}/${totalTests}`);
  console.log(`🔧 Average Response Time: ${summary.averageResponseTime}ms`);
  console.log(`💰 Total Cost: $${summary.totalCost.toFixed(4)}`);
  
  if (successCount / totalTests >= 0.8) {
    console.log('\n🎉 GOVERNANCE CONTEXT VALIDATION: PASSED!');
    console.log('✅ Rule-based analysis successfully provides governance context');
  } else {
    console.log('\n⚠️  GOVERNANCE CONTEXT VALIDATION: NEEDS IMPROVEMENT');
    console.log('❌ Some rules not providing expected governance context');
  }
  
  return detailedResults;
}

function generateSummary(results, successCount, totalTests) {
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'error');
  
  // Rule type performance
  const ruleTypeStats = {};
  RULE_TYPES.forEach(ruleType => {
    const ruleResults = results.filter(r => r.ruleType === ruleType);
    const ruleSuccesses = ruleResults.filter(r => r.status === 'success' && r.governance?.governanceAware);
    
    ruleTypeStats[ruleType] = {
      total: ruleResults.length,
      successful: ruleSuccesses.length,
      successRate: (ruleSuccesses.length / ruleResults.length * 100).toFixed(1),
      averageConfidence: ruleSuccesses.length > 0 ? 
        (ruleSuccesses.reduce((sum, r) => sum + (r.governance?.confidenceScore || 0), 0) / ruleSuccesses.length).toFixed(1) : 0,
      averageTools: ruleSuccesses.length > 0 ?
        (ruleSuccesses.reduce((sum, r) => sum + (r.governance?.toolsUsed?.length || 0), 0) / ruleSuccesses.length).toFixed(1) : 0
    };
  });
  
  return {
    totalTests,
    successful: successful.length,
    failed: failed.length,
    successRate: (successCount / totalTests * 100).toFixed(1),
    averageResponseTime: successful.length > 0 ? Math.round(successful.reduce((sum, r) => sum + r.duration, 0) / successful.length) : 0,
    totalCost: successful.reduce((sum, r) => sum + (r.analysis?.cost || 0), 0),
    averageConfidence: successful.length > 0 ? (successful.reduce((sum, r) => sum + (r.governance?.confidenceScore || 0), 0) / successful.length).toFixed(1) : 0,
    totalTokens: successful.reduce((sum, r) => sum + (r.analysis?.tokensUsed || 0), 0),
    ruleTypeStats
  };
}

function generateMarkdownSummary(data) {
  const { metadata, summary, results } = data;
  
  return `# DAHAO Rule Types Governance Context Validation Report

**Test Date**: ${new Date(metadata.testDate).toLocaleString()}  
**Total Tests**: ${metadata.totalTests}  
**Success Rate**: ${metadata.successRate}%  

## Executive Summary

${metadata.successRate >= 80 ? '✅ **PASSED**' : '⚠️ **NEEDS IMPROVEMENT**'}: Rule-based analysis governance context validation

- **Successful Tests**: ${summary.successful}/${metadata.totalTests}
- **Average Response Time**: ${summary.averageResponseTime}ms
- **Average Confidence**: ${summary.averageConfidence}%
- **Total API Cost**: $${summary.totalCost.toFixed(4)}
- **Total Tokens Used**: ${summary.totalTokens.toLocaleString()}

## Rule Type Performance

| Rule Type | Success Rate | Avg Confidence | Avg Tools Used |
|-----------|--------------|----------------|----------------|
${Object.entries(summary.ruleTypeStats).map(([rule, stats]) => 
  `| ${rule} | ${stats.successRate}% | ${stats.averageConfidence}% | ${stats.averageTools} |`
).join('\n')}

## Test Scenarios

${TEST_SCENARIOS.map(scenario => `### ${scenario.name}
- **Agent Type**: ${scenario.agentType}
- **Branch**: ${scenario.branch.name}
- **Element**: ${scenario.governanceItem.name} (${scenario.governanceItem.type})
`).join('\n')}

## Detailed Results

### Successful Tests with Governance Context

${results.filter(r => r.status === 'success' && r.governance?.governanceAware).map(r => `#### ${r.ruleType} - ${r.scenario}
- **Confidence**: ${r.governance.confidenceScore}%
- **Tools Used**: ${r.governance.toolsUsed.join(', ')}
- **Response Time**: ${r.duration}ms
- **Cost**: $${(r.analysis?.cost || 0).toFixed(4)}
- **Governance Indicators**: ${r.governance.branchSpecific ? '✅ Branch-specific' : '❌'} | ${r.governance.personalizedContent ? '✅ Personalized' : '❌'} | ${r.governance.versionMentions.length > 0 ? '✅ Version-aware' : '❌'}
`).join('\n')}

### Failed or Limited Tests

${results.filter(r => r.status === 'error' || !r.governance?.governanceAware).map(r => `#### ${r.ruleType} - ${r.scenario}
- **Status**: ${r.status === 'error' ? 'ERROR' : 'LIMITED GOVERNANCE CONTEXT'}
- **Issue**: ${r.error || 'Analysis lacks expected governance context'}
- **Tools Used**: ${r.governance?.toolsUsed?.join(', ') || 'None'}
`).join('\n')}

## Recommendations

${metadata.successRate >= 80 ? `### ✅ System Ready for Production
- Rule-based analysis successfully provides governance context
- Most rule types working with tool executor integration
- Performance and cost metrics within acceptable ranges

### Next Steps
- Begin 24-hour monitoring for production deployment
- Consider enabling enhanced analysis for all users
- Monitor for any edge cases or performance issues` : 
`### ⚠️ System Needs Improvement
- Some rule types not providing expected governance context
- Tool executor integration may need refinement
- Consider investigating failed test cases

### Required Actions
- Debug failing rule types
- Verify tool execution for limited cases
- Ensure all MCP tools are functioning correctly`}

---
*Generated by DAHAO Rule Validation Test Suite*  
*Results saved to: ${RESULTS_FILE}*
`;
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests, testRuleType, extractGovernanceIndicators };