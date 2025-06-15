// Service for creating and managing GitHub Issues for term development
import { 
  createTermDevelopmentIssue,
  createAIReviewIssue,
  createPeerReviewIssue,
  createSubmissionReadyIssue,
  type TermDraftData,
  type IssueTemplate,
  type TermDevelopmentTemplateType,
  TERM_DEVELOPMENT_TEMPLATES
} from '@/lib/issue-templates/term-development';
import { createGitHubDataService } from '@/services/github-data-service';
import { GitHubIssue } from '@/types/github-compatible';

export class IssueCreationService {
  private githubService = createGitHubDataService();

  /**
   * Create a new term development issue from term draft data
   */
  async createTermDevelopmentIssue(
    owner: string,
    repo: string,
    termData: TermDraftData
  ): Promise<GitHubIssue> {
    const template = createTermDevelopmentIssue(termData);
    
    const issue = await this.githubService.createIssue(
      owner,
      repo,
      template.title,
      template.body,
      template.assignees,
      template.labels
    );

    // Add term draft data to the issue
    const termDraftData = {
      termName: termData.termName,
      definition: termData.definition,
      rationale: termData.rationale,
      domain: termData.domain,
      tags: termData.tags,
      status: termData.initialStatus || 'draft' as const,
      progress: {
        completeness: 70, // Initial completion based on having definition and rationale
        clarity: 60,      // Will be improved through AI review
        uniqueness: 50,   // Needs uniqueness check
        alignment: 65     // Domain alignment to be verified
      },
      submissionReadiness: {
        overallScore: this.calculateInitialReadinessScore(termData),
        criteria: this.getInitialCriteria()
      }
    };

    // Update the issue with term draft data
    const updatedIssue = await this.githubService.updateIssue(
      owner,
      repo,
      issue.number,
      { termDraft: termDraftData }
    );

    return updatedIssue;
  }

  /**
   * Create AI review sub-issue for a term development issue
   */
  async createAIReviewSubIssue(
    owner: string,
    repo: string,
    termName: string,
    reviewType: string,
    parentIssueNumber: number
  ): Promise<GitHubIssue> {
    const template = createAIReviewIssue(termName, reviewType, parentIssueNumber);
    
    return await this.githubService.createIssue(
      owner,
      repo,
      template.title,
      template.body,
      template.assignees,
      template.labels
    );
  }

  /**
   * Create peer review request issue
   */
  async createPeerReviewRequest(
    owner: string,
    repo: string,
    termName: string,
    domain: string,
    parentIssueNumber: number
  ): Promise<GitHubIssue> {
    const template = createPeerReviewIssue(termName, domain, parentIssueNumber);
    
    return await this.githubService.createIssue(
      owner,
      repo,
      template.title,
      template.body,
      template.assignees,
      template.labels
    );
  }

  /**
   * Create submission ready notification issue
   */
  async createSubmissionReadyNotification(
    owner: string,
    repo: string,
    termName: string,
    parentIssueNumber: number
  ): Promise<GitHubIssue> {
    const template = createSubmissionReadyIssue(termName, parentIssueNumber);
    
    return await this.githubService.createIssue(
      owner,
      repo,
      template.title,
      template.body,
      template.assignees,
      template.labels
    );
  }

  /**
   * Update term development issue with progress
   */
  async updateTermDevelopmentProgress(
    owner: string,
    repo: string,
    issueNumber: number,
    progressUpdates: {
      completeness?: number;
      clarity?: number;
      uniqueness?: number;
      alignment?: number;
      status?: 'draft' | 'ai_review' | 'peer_review' | 'ready_for_submission' | 'submitted';
    }
  ): Promise<GitHubIssue> {
    const issue = await this.githubService.getIssue(owner, repo, issueNumber);
    if (!issue || !issue.termDraft) {
      throw new Error('Issue not found or not a term development issue');
    }

    const updatedTermDraft = {
      ...issue.termDraft,
      progress: {
        ...issue.termDraft.progress,
        ...progressUpdates
      }
    };

    // Update status if provided
    if (progressUpdates.status) {
      updatedTermDraft.status = progressUpdates.status;
    }

    // Recalculate submission readiness
    updatedTermDraft.submissionReadiness = {
      overallScore: this.calculateSubmissionReadiness(updatedTermDraft),
      criteria: this.updateCriteria(updatedTermDraft)
    };

    return await this.githubService.updateIssue(
      owner,
      repo,
      issueNumber,
      { termDraft: updatedTermDraft }
    );
  }

  /**
   * Add AI review results to term development issue
   */
  async addAIReviewResults(
    owner: string,
    repo: string,
    issueNumber: number,
    agentId: string,
    reviewResults: {
      score: number;
      feedback: string;
      suggestions: string[];
      taskType: string;
    }
  ): Promise<GitHubIssue> {
    const issue = await this.githubService.getIssue(owner, repo, issueNumber);
    if (!issue) {
      throw new Error('Issue not found');
    }

    // Create comment with AI review results
    const reviewComment = this.formatAIReviewComment(agentId, reviewResults);
    
    await this.githubService.addIssueComment(
      owner,
      repo,
      issueNumber,
      reviewComment,
      {
        login: agentId,
        id: `agent-${agentId}`,
        avatarUrl: `https://github.com/${agentId}.png`,
        url: `https://github.com/${agentId}`,
        name: `AI Agent: ${agentId}`
      }
    );

    // Update issue progress based on review results
    const progressUpdates = this.calculateProgressFromAIReview(reviewResults);
    
    return await this.updateTermDevelopmentProgress(
      owner,
      repo,
      issueNumber,
      progressUpdates
    );
  }

  /**
   * Check if term is ready for submission
   */
  isReadyForSubmission(issue: GitHubIssue): boolean {
    if (!issue.termDraft) return false;
    
    const readiness = issue.termDraft.submissionReadiness;
    return readiness.overallScore >= 85 && 
           readiness.criteria.every(c => c.met);
  }

  /**
   * Get next recommended action for term development
   */
  getNextRecommendedAction(issue: GitHubIssue): {
    action: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  } {
    if (!issue.termDraft) {
      return {
        action: 'complete_definition',
        description: 'Complete the term definition and rationale',
        priority: 'high'
      };
    }

    const { progress, status, submissionReadiness } = issue.termDraft;

    if (status === 'draft') {
      if (progress.completeness < 80) {
        return {
          action: 'improve_definition',
          description: 'Improve and complete the term definition',
          priority: 'high'
        };
      } else {
        return {
          action: 'request_ai_review',
          description: 'Request AI review for definition quality',
          priority: 'high'
        };
      }
    }

    if (status === 'ai_review') {
      if (progress.clarity < 80 || progress.uniqueness < 80) {
        return {
          action: 'incorporate_ai_feedback',
          description: 'Incorporate AI feedback to improve clarity and uniqueness',
          priority: 'high'
        };
      } else {
        return {
          action: 'request_peer_review',
          description: 'Request peer reviews from domain experts',
          priority: 'medium'
        };
      }
    }

    if (status === 'peer_review') {
      const peerReviewCriteria = submissionReadiness.criteria.find(c => c.name === 'Peer review');
      if (!peerReviewCriteria?.met) {
        return {
          action: 'complete_peer_review',
          description: 'Complete peer review process',
          priority: 'medium'
        };
      } else {
        return {
          action: 'prepare_submission',
          description: 'Prepare for submission to public pool',
          priority: 'low'
        };
      }
    }

    if (status === 'ready_for_submission') {
      return {
        action: 'submit_to_public',
        description: 'Submit term to public governance discussion',
        priority: 'low'
      };
    }

    return {
      action: 'review_status',
      description: 'Review current status and next steps',
      priority: 'low'
    };
  }

  // Private helper methods
  private calculateInitialReadinessScore(termData: TermDraftData): number {
    let score = 0;
    
    // Basic definition exists: +20
    if (termData.definition && termData.definition.length > 10) score += 20;
    
    // Rationale provided: +15
    if (termData.rationale && termData.rationale.length > 10) score += 15;
    
    // Domain assigned: +10
    if (termData.domain) score += 10;
    
    // Tags provided: +5
    if (termData.tags && termData.tags.length > 0) score += 5;
    
    return Math.min(score, 50); // Initial score caps at 50%
  }

  private getInitialCriteria() {
    return [
      { name: 'Clear definition', met: true, description: 'Initial definition provided' },
      { name: 'Unique contribution', met: false, description: 'Needs uniqueness verification' },
      { name: 'Domain alignment', met: false, description: 'Needs domain validation' },
      { name: 'AI review completed', met: false, description: 'Needs AI analysis' },
      { name: 'Peer review', met: false, description: 'Needs peer feedback' },
      { name: 'Implementation examples', met: false, description: 'Needs practical examples' }
    ];
  }

  private calculateSubmissionReadiness(termDraft: any): number {
    const weights = {
      completeness: 0.25,
      clarity: 0.25,
      uniqueness: 0.25,
      alignment: 0.25
    };

    return Math.round(
      termDraft.progress.completeness * weights.completeness +
      termDraft.progress.clarity * weights.clarity +
      termDraft.progress.uniqueness * weights.uniqueness +
      termDraft.progress.alignment * weights.alignment
    );
  }

  private updateCriteria(termDraft: any) {
    return [
      { 
        name: 'Clear definition', 
        met: termDraft.progress.clarity >= 80, 
        description: termDraft.progress.clarity >= 80 ? 'Definition is clear and comprehensive' : 'Definition needs clarity improvement' 
      },
      { 
        name: 'Unique contribution', 
        met: termDraft.progress.uniqueness >= 80, 
        description: termDraft.progress.uniqueness >= 80 ? 'Term provides unique value' : 'Needs uniqueness validation' 
      },
      { 
        name: 'Domain alignment', 
        met: termDraft.progress.alignment >= 80, 
        description: termDraft.progress.alignment >= 80 ? 'Well-aligned with domain' : 'Needs domain validation' 
      },
      { 
        name: 'AI review completed', 
        met: termDraft.status !== 'draft', 
        description: termDraft.status !== 'draft' ? 'AI analysis completed' : 'Needs AI review' 
      },
      { 
        name: 'Peer review', 
        met: termDraft.status === 'ready_for_submission' || termDraft.status === 'submitted', 
        description: termDraft.status === 'ready_for_submission' ? 'Peer reviews completed' : 'Needs peer feedback' 
      },
      { 
        name: 'Implementation examples', 
        met: termDraft.progress.completeness >= 90, 
        description: termDraft.progress.completeness >= 90 ? 'Examples provided' : 'Needs practical examples' 
      }
    ];
  }

  private formatAIReviewComment(agentId: string, results: any): string {
    return `## AI Review Results - ${agentId}

**Task Type**: ${results.taskType}
**Overall Score**: ${results.score}/10

### Analysis
${results.feedback}

### Recommendations
${results.suggestions.map((s: string) => `- ${s}`).join('\n')}

### Impact on Development
This review updates the term development progress and provides guidance for next steps.

---
*Automated AI Review completed*`;
  }

  private calculateProgressFromAIReview(results: any): any {
    const updates: any = {};
    
    // Map task types to progress attributes
    switch (results.taskType) {
      case 'definition_review':
        updates.completeness = Math.min(100, results.score * 10);
        updates.status = 'ai_review';
        break;
      case 'clarity_analysis':
        updates.clarity = Math.min(100, results.score * 10);
        break;
      case 'uniqueness_check':
        updates.uniqueness = Math.min(100, results.score * 10);
        break;
      case 'domain_alignment':
        updates.alignment = Math.min(100, results.score * 10);
        break;
    }
    
    return updates;
  }
}

// Singleton instance
export const issueCreationService = new IssueCreationService();