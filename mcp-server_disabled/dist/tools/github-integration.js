import { Octokit } from '@octokit/rest';
export class GitHubIntegration {
    octokit;
    owner;
    repo;
    constructor(token, owner, repo) {
        this.octokit = new Octokit({ auth: token });
        this.owner = owner;
        this.repo = repo;
    }
    async createProposalIssue(proposal) {
        const issueBody = this.formatProposalAsIssue(proposal);
        const response = await this.octokit.rest.issues.create({
            owner: this.owner,
            repo: this.repo,
            title: `[${proposal.type.toUpperCase()}] ${proposal.title}`,
            body: issueBody,
            labels: [
                'governance-proposal',
                `domain-${proposal.domain}`,
                `type-${proposal.type}`,
                'status-discussion'
            ]
        });
        return response.data.number;
    }
    async updateProposalStatus(issueNumber, status) {
        const labels = await this.octokit.rest.issues.listLabelsOnIssue({
            owner: this.owner,
            repo: this.repo,
            issue_number: issueNumber
        });
        // Remove old status labels and add new one
        const labelsToKeep = labels.data
            .map(l => l.name)
            .filter(name => !name.startsWith('status-'));
        await this.octokit.rest.issues.setLabels({
            owner: this.owner,
            repo: this.repo,
            issue_number: issueNumber,
            labels: [...labelsToKeep, `status-${status}`]
        });
    }
    async getProposalDiscussion(issueNumber) {
        const comments = await this.octokit.rest.issues.listComments({
            owner: this.owner,
            repo: this.repo,
            issue_number: issueNumber
        });
        return comments.data.map(comment => ({
            author: comment.user?.login,
            body: comment.body,
            createdAt: comment.created_at,
            reactions: comment.reactions
        }));
    }
    async getActiveProposals() {
        const issues = await this.octokit.rest.issues.listForRepo({
            owner: this.owner,
            repo: this.repo,
            labels: 'governance-proposal',
            state: 'open'
        });
        return issues.data.map(issue => ({
            number: issue.number,
            title: issue.title,
            body: issue.body,
            labels: issue.labels.map(l => typeof l === 'string' ? l : l.name),
            createdAt: issue.created_at,
            author: issue.user?.login,
            comments: issue.comments
        }));
    }
    formatProposalAsIssue(proposal) {
        return `
## 📋 Proposal Summary
**Type:** ${proposal.type}
**Domain:** ${proposal.domain}
**Author:** ${proposal.author}

## 📝 Description
${proposal.description}

## 🔍 Ethics Compatibility Analysis
${proposal.ethicsCompatibility ? this.formatEthicsCompatibility(proposal.ethicsCompatibility) : '_Analysis pending_'}

## 🌐 Cross-Domain Impact
${proposal.crossDomainImpact ? this.formatCrossDomainImpact(proposal.crossDomainImpact) : '_Analysis pending_'}

## 💬 Discussion Guidelines
- Focus on ethics framework compatibility
- Consider cross-domain implications
- Provide constructive feedback
- Reference specific ethics principles when relevant

## 🗳️ Next Steps
1. Community discussion (7 days)
2. Ethics compatibility review
3. Cross-domain impact assessment
4. Voting phase (if approved for voting)

---
*This proposal was created via DAHAO MCP Server and will be automatically updated as the governance process progresses.*
`;
    }
    formatEthicsCompatibility(compatibility) {
        if (compatibility.compatible) {
            return '✅ **Compatible** with current ethics framework';
        }
        else {
            return `❌ **Conflicts detected:**\n${compatibility.conflicts.map((c) => `- ${c}`).join('\n')}`;
        }
    }
    formatCrossDomainImpact(impact) {
        return `
**Affected Domains:** ${impact.affectedDomains.join(', ')}
**Impact Level:** ${impact.impacts.map((i) => `${i.domain} (${i.impactLevel})`).join(', ')}
${impact.synergies.length > 0 ? `\n**Synergies:** ${impact.synergies.join(', ')}` : ''}
${impact.risks.length > 0 ? `\n**Risks:** ${impact.risks.join(', ')}` : ''}
`;
    }
}
