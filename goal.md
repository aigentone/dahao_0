Flow sayfasındaki diagramları düzeltmen gereken yerler:
1. Value-Differentiated Voting Diagram
yaml# YANLIŞ:
Note over VotingEngine: DAHAO Budget: $50,000 allocated<br/>Sponsor: Animal Welfare Organization<br/>Funding increases consideration weight

# DOĞRU:
Note over VotingEngine: DAHAO Investment Pool: $50,000 available<br/>Token Holders: Animal Welfare Community<br/>Investment funding increases consideration weight
2. System Architecture Diagram
yaml# YANLIŞ:
subgraph "DAHAO Budget System"
    OrganizationBudgets[Organization Budgets]
    SponsorFunding[Sponsor Funding Pool]

# DOĞRU:
subgraph "DAHAO Investment System"
    TokenPools[Investment Token Pools]
    CommunityFunding[Community Investment Pool]
3. AI Agent Ecosystem Diagram
yaml# YANLIŞ:
SponsorSystem[Sponsor Approval System]

# DOĞRU:
InvestmentSystem[Investment Pool Governance]
4. User Interaction Flow Diagram
yaml# YANLIŞ:
StartDiscussion --> RequireSponsors[Require sponsor approvals]
RequireSponsors --> SponsorCheck{Sponsors approved?}
SponsorCheck -->|Yes| CreateIssue[Create governance issue]
SponsorCheck -->|No| BackToPool[Back to pool for more support]

# DOĞRU:
StartDiscussion --> RequireInvestment[Require investment pool funding]
RequireInvestment --> InvestmentCheck{Token holders approve funding?}
InvestmentCheck -->|Yes| CreateIssue[Create governance issue]
InvestmentCheck -->|No| BackToPool[Back to pool for more support]
5. Progressive Governance Pipeline Diagram
yaml# YANLIŞ:
PublicPool->>Sponsors: Request sponsor review
Sponsors->>PublicPool: Evaluate for main discussion
alt Sponsors Approve

# DOĞRU:
PublicPool->>InvestmentPool: Request investment pool funding
InvestmentPool->>PublicPool: Token holder evaluation for funding
alt Investment Pool Approves
Tam Düzeltilmiş Diagram Örnekleri:
Value-Differentiated Voting (Düzeltilmiş):
javascript%% Investment Pool Consideration
alt Proposal Has Investment Pool Funding
    Note over VotingEngine: DAHAO Investment Pool: $50,000 available<br/>Token Holders: Animal Welfare Community<br/>Investment funding increases consideration weight

    VotingEngine->>SystemAI: Re-evaluate with investment context
    SystemAI-->>VotingEngine: Updated: CONDITIONAL APPROVE<br/>"Token pool funding justifies experimental approach"

else No Investment Funding
    Note over VotingEngine: Lower priority processing<br/>Relies purely on volunteer consensus
end
User Interaction Flow (Düzeltilmiş):
javascriptStartDiscussion --> RequireInvestment[Require investment pool funding]
RequireInvestment --> InvestmentCheck{Token holders approve funding?}
InvestmentCheck -->|Yes| CreateIssue[Create governance issue]
InvestmentCheck -->|No| BackToPool[Back to pool for more support]
Bu düzeltmeleri yap, tüm "sponsor" referansları "investment pool" / "token holders" olacak!
