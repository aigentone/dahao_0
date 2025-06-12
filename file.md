sequenceDiagram
    participant Alice as Alice (User)
    participant AliceAI as Alice's Personal AI
    participant Bob as Bob (User)
    participant BobAI as Bob's Personal AI
    participant SystemAI as System AI Agent
    participant VotingEngine as Voting Engine
    participant Proposal as Governance Proposal

    Note over Alice, Proposal: Value-Differentiated AI Voting

    %% Alice's AI Analysis
    Alice->>AliceAI: Analyze proposal "intersectional_harm@v1.2"

    Note over AliceAI: Alice's Complete Value System:<br/>✓ core:harm@v1.1<br/>✓ core:equality@v2.0 (intersectional)<br/>✓ alice:systemic_patterns@v1.0<br/>❌ welfare:animal_focus@v1.0 (rejected)

    AliceAI->>Proposal: Apply Alice's accepted values
    AliceAI-->>VotingEngine: Vote: APPROVE (confidence: 94%)<br/>Reasoning: "Aligns with Alice's intersectional equality v2.0<br/>and her personal systemic_patterns framework"

    %% Bob's AI Analysis
    Bob->>BobAI: Analyze same proposal

    Note over BobAI: Bob's Complete Value System:<br/>✓ core:harm@v1.1<br/>✓ core:equality@v1.0 (traditional)<br/>✓ bob:privacy_rights@v2.1<br/>✓ bob:algorithmic_fairness@v1.0

    BobAI->>Proposal: Apply Bob's accepted values
    BobAI-->>VotingEngine: Vote: CONDITIONAL (confidence: 67%)<br/>Reasoning: "Conflicts with Bob's traditional equality v1.0.<br/>Needs privacy impact assessment per his privacy_rights v2.1"

    %% System AI Analysis
    SystemAI->>Proposal: Analyze with ONLY Main DAHAO values

    Note over SystemAI: System Value Constraints:<br/>✓ core:harm@v1.1 ONLY<br/>✓ core:equality@v1.0 ONLY<br/>✓ core:transparency@v1.1<br/>❌ NO personal extensions allowed

    SystemAI-->>VotingEngine: Vote: NEEDS_REVIEW (confidence: 45%)<br/>Reasoning: "Proposal references concepts not in Main DAHAO.<br/>Requires community definition before system can evaluate"

    %% Voting Engine Processing
    VotingEngine->>VotingEngine: Process value-differentiated votes

    Note over VotingEngine: Vote Analysis:<br/>Personal AIs: Split based on user values<br/>System AI: Conservative (main values only)<br/>Weighting: Personal AIs 0.8x, System AI 1.0x

    VotingEngine->>Proposal: Generate consensus report

    Note over Proposal: Consensus Report:<br/>Personal Values Conflict Detected<br/>Alice's intersectional vs Bob's traditional equality<br/>System cannot evaluate without main branch definitions<br/>Recommendation: Define intersectional_harm in main first

    %% Budget Consideration
    alt Proposal Has Budget Allocation
        Note over VotingEngine: DAHAO Budget: $50,000 allocated<br/>Sponsor: Animal Welfare Organization<br/>Funding increases consideration weight

        VotingEngine->>SystemAI: Re-evaluate with funding context
        SystemAI-->>VotingEngine: Updated: CONDITIONAL APPROVE<br/>"Budget justifies experimental approach"

    else No Budget
        Note over VotingEngine: Lower priority processing<br/>Relies purely on volunteer consensus
    end

    %% Final Decision
    VotingEngine->>Alice: Your AI voted APPROVE based on your values
    VotingEngine->>Bob: Your AI voted CONDITIONAL based on your values
    VotingEngine->>SystemAI: System requires main branch definition first

    Note over Alice, Proposal: Each AI perfectly represents its user's<br/>complete accepted value system vs system constraints




graph TB
    subgraph "Personal DAHAO Value System"
        PersonalValues[Personal Value Stack]
        AcceptedVersions[All Accepted Term Versions]
        PersonalEthics[Personal Ethics Framework]
        PersonalAI[Personal AI Agent]

        PersonalValues --> AcceptedVersions
        AcceptedVersions --> PersonalEthics
        PersonalEthics --> PersonalAI

        subgraph "Alice's Values Example"
            AliceV1[core:harm@v1.1 ✓]
            AliceV2[core:equality@v2.0 ✓]
            AliceV3[alice:intersectional_harm@v1.0 ✓]
            AliceV4[welfare:suffering@v1.2 ✗]

            AliceV1 --> PersonalAI
            AliceV2 --> PersonalAI
            AliceV3 --> PersonalAI
        end
    end

    subgraph "System AI Value Constraints"
        MainDAHAOValues[Main DAHAO Values Only]
        SystemAI[System AI Agents]
        ValueValidator[Value Validation Engine]

        MainDAHAOValues --> SystemAI
        SystemAI --> ValueValidator

        subgraph "System Values Example"
            SysV1[core:harm@v1.1 ✓]
            SysV2[core:equality@v1.0 ✓]
            SysV3[welfare:five_freedoms@v1.0 ✓]
            SysV4[NO personal extensions ❌]

            SysV1 --> SystemAI
            SysV2 --> SystemAI
            SysV3 --> SystemAI
        end
    end

    subgraph "DAHAO Budget System"
        OrganizationBudgets[Organization Budgets]
        SponsorFunding[Sponsor Funding Pool]
        ProposalFunding[Proposal Funding]
        BudgetAllocation[Budget Allocation Engine]

        OrganizationBudgets --> SponsorFunding
        SponsorFunding --> BudgetAllocation
        BudgetAllocation --> ProposalFunding

        subgraph "Budget Categories"
            ResearchFunding[Research Funding]
            ImplementationBudget[Implementation Budget]
            CommunityIncentives[Community Incentives]
            SystemMaintenance[System Maintenance]

            ProposalFunding --> ResearchFunding
            ProposalFunding --> ImplementationBudget
            ProposalFunding --> CommunityIncentives
            ProposalFunding --> SystemMaintenance
        end
    end

    subgraph "Voting & Decision Making"
        VotingProcess[Community Voting]
        ValueConflictResolver[Value Conflict Resolution]
        ConsensusEngine[Consensus Building Engine]

        PersonalAI --> VotingProcess
        SystemAI --> VotingProcess
        VotingProcess --> ValueConflictResolver
        ValueConflictResolver --> ConsensusEngine

        subgraph "Vote Analysis"
            PersonalAIVotes[Personal AI Votes]
            SystemAIVotes[System AI Votes]
            HumanVotes[Human Votes]
            WeightedConsensus[Weighted Consensus]

            PersonalAIVotes --> WeightedConsensus
            SystemAIVotes --> WeightedConsensus
            HumanVotes --> WeightedConsensus
        end
    end

    subgraph "Funding Decision Integration"
        BudgetApproval[Budget Approval Process]
        FundingCriteria[Funding Criteria]
        ROITracking[ROI & Impact Tracking]

        BudgetAllocation --> BudgetApproval
        ConsensusEngine --> BudgetApproval
        BudgetApproval --> FundingCriteria
        FundingCriteria --> ROITracking
    end

    %% Key Connections
    PersonalAI -.->|represents complete value system| VotingProcess
    SystemAI -.->|only main DAHAO values| VotingProcess
    BudgetApproval -.->|funding enables| ResearchFunding
    ROITracking -.->|feedback improves| BudgetAllocation

    %% Value System Conflicts
    PersonalAI -.->|may conflict with| SystemAI
    ValueConflictResolver -.->|resolves using| MainDAHAOValues

    %% Budget Influence on Governance
    OrganizationBudgets -.->|influences| SponsorFunding
    ProposalFunding -.->|enables serious consideration| VotingProcess

    %% Styling
    classDef personal fill:#e3f2fd,stroke:#0277bd,stroke-width:2px
    classDef system fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef budget fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef voting fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef funding fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef values fill:#f1f8e9,stroke:#558b2f,stroke-width:2px

    class PersonalValues,AcceptedVersions,PersonalEthics,PersonalAI,AliceV1,AliceV2,AliceV3,AliceV4,PersonalAIVotes personal
    class MainDAHAOValues,SystemAI,ValueValidator,SysV1,SysV2,SysV3,SysV4,SystemAIVotes system
    class OrganizationBudgets,SponsorFunding,ProposalFunding,BudgetAllocation,ResearchFunding,ImplementationBudget,CommunityIncentives,SystemMaintenance budget
    class VotingProcess,ValueConflictResolver,ConsensusEngine,HumanVotes,WeightedConsensus voting
    class BudgetApproval,FundingCriteria,ROITracking funding

    graph TB
    subgraph "User-Created AI Agents"
        UserAgents[User Personal Agents]
        AgentCreator[Agent Creator Interface]
        AgentConfig[Agent Configuration]

        UserAgents --> AgentCreator
        AgentCreator --> AgentConfig
    end

    subgraph "AI Agent Marketplace"
        AgentPool[Available Agents Pool]
        AgentRatings[Agent Performance Ratings]
        AgentSpecialties[Agent Specializations]
        DeploymentService[Agent Deployment Service]

        AgentPool --> AgentRatings
        AgentPool --> AgentSpecialties
        AgentPool --> DeploymentService
    end

    subgraph "Deployment Targets"
        OtherPersonalBranches[Other Users' Branches]
        MainDiscussions[Main DAHAO Discussions]
        PublicPool[Public Work Pool]
        GovernanceIssues[Governance Issues]

        DeploymentService --> OtherPersonalBranches
        DeploymentService --> MainDiscussions
        DeploymentService --> PublicPool
        DeploymentService --> GovernanceIssues
    end

    subgraph "Public Work Pool System"
        WorkSubmissions[User Work Submissions]
        PoolVoting[Community Pool Voting]
        SponsorSystem[Sponsor Approval System]
        PromotionEngine[Discussion Promotion Engine]

        WorkSubmissions --> PoolVoting
        PoolVoting --> SponsorSystem
        SponsorSystem --> PromotionEngine
    end

    subgraph "API & Authentication"
        UserAPIKeys[User API Keys]
        AgentAPIKeys[Agent API Keys]
        ActionLogger[Action Logging System]
        PermissionManager[Permission Management]

        UserAPIKeys --> AgentAPIKeys
        AgentAPIKeys --> ActionLogger
        ActionLogger --> PermissionManager
    end

    subgraph "Self-Improvement Engine"
        SystemAnalytics[System Analytics]
        PerformanceTracker[Agent Performance Tracking]
        PatternDetector[Pattern Detection]
        SystemUpdates[Automated System Updates]
        ToolDeveloper[Tool Development Engine]

        ActionLogger --> SystemAnalytics
        SystemAnalytics --> PerformanceTracker
        PerformanceTracker --> PatternDetector
        PatternDetector --> SystemUpdates
        SystemUpdates --> ToolDeveloper
    end

    %% Connections
    UserAgents --> AgentPool
    AgentConfig --> UserAPIKeys

    WorkSubmissions --> PublicPool
    PromotionEngine --> MainDiscussions
    PromotionEngine --> GovernanceIssues

    OtherPersonalBranches --> ActionLogger
    MainDiscussions --> ActionLogger
    PublicPool --> ActionLogger
    GovernanceIssues --> ActionLogger

    AgentRatings --> PerformanceTracker
    SystemUpdates --> AgentPool
    ToolDeveloper --> DeploymentService

    %% Self-improvement feedback loops
    PerformanceTracker -.->|improve| AgentPool
    PatternDetector -.->|optimize| DeploymentService
    SystemUpdates -.->|enhance| PermissionManager
    ToolDeveloper -.->|create new tools| UserAgents

    %% Scaling feedback
    SystemAnalytics -.->|user growth insights| SystemUpdates
    ActionLogger -.->|usage patterns| PatternDetector

    %% Styling
    classDef user fill:#e3f2fd,stroke:#0277bd,stroke-width:2px
    classDef marketplace fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef deployment fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef pool fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef api fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef selfimprove fill:#f1f8e9,stroke:#558b2f,stroke-width:3px

    class UserAgents,AgentCreator,AgentConfig user
    class AgentPool,AgentRatings,AgentSpecialties,DeploymentService marketplace
    class OtherPersonalBranches,MainDiscussions,PublicPool,GovernanceIssues deployment
    class WorkSubmissions,PoolVoting,SponsorSystem,PromotionEngine pool
    class UserAPIKeys,AgentAPIKeys,ActionLogger,PermissionManager api
    class SystemAnalytics,PerformanceTracker,PatternDetector,SystemUpdates,ToolDeveloper selfimprove


flowchart TD
    Start([User joins DAHAO]) --> Setup{Setup personal DAHAO?}

    Setup -->|Yes| CreatePersonal[Create personal branch]
    Setup -->|No| UseMain[Use main DAHAO only]

    CreatePersonal --> DefineValues[Define personal values & ethics]
    DefineValues --> ConfigureAI[Configure personal AI agent]
    ConfigureAI --> PersonalReady[Personal DAHAO ready]

    PersonalReady --> Action{What do you want to do?}
    UseMain --> Action

    Action -->|Create term| CreateTerm[Create new term]
    Action -->|Discuss| JoinDiscussion[Join community discussion]
    Action -->|Submit work| SubmitToPool[Submit to Public Pool]
    Action -->|Review| ReviewPool[Review Public Pool]
    Action -->|Deploy agents| DeployAgents[Deploy AI agents to branches]

    CreateTerm --> TermDetails[Enter term definition]
    TermDetails --> SystemEval[System evaluation]
    SystemEval --> EvalResults{Evaluation results}

    EvalResults -->|Good score 80+| SavePersonal[Save to personal branch]
    EvalResults -->|Low score 60-| ImproveTerm[Improve definition]
    ImproveTerm --> TermDetails

    SavePersonal --> IterateLocal{Develop further?}
    IterateLocal -->|Yes| RefineLocal[Refine with AI help]
    RefineLocal --> IterateLocal
    IterateLocal -->|Ready| SubmitToPool

    SubmitToPool --> PublicPool[Work visible in Public Pool]
    PublicPool --> CommunityReview[Community can view & vote]
    CommunityReview --> PoolVoting{Pool voting result}

    PoolVoting -->|Sufficient support| StartDiscussion[Start main discussion]
    PoolVoting -->|Needs more work| BackToPersonal[Back to personal development]

    StartDiscussion --> RequireSponsors[Require sponsor approvals]
    RequireSponsors --> SponsorCheck{Sponsors approved?}
    SponsorCheck -->|Yes| CreateIssue[Create governance issue]
    SponsorCheck -->|No| BackToPool[Back to pool for more support]

    CreateIssue --> GovernanceProcess[Full governance logic starts]
    GovernanceProcess --> FinalVote[Final community vote]

    DeployAgents --> AgentMarket[AI Agent Marketplace]
    AgentMarket --> AssignToTargets[Assign to other branches/discussions]
    AssignToTargets --> RecordActions[Record all agent actions]
    RecordActions --> SystemLearning[System learns & improves]

    ReviewPool --> CommunityReview
    CommunityVote --> VoteResult{Vote result}
    FinalVote --> VoteResult

    VoteResult -->|Approved 60+%| MergeMain[Merge to main DAHAO]
    VoteResult -->|Rejected| BackToPersonal[Back to personal development]

    MergeMain --> NotifyAll[Notify all personal branches]
    NotifyAll --> SyncCheck{Auto-sync compatible?}

    SyncCheck -->|Yes| AutoMerge[Auto-merge to personal]
    SyncCheck -->|No| UserDecision[User decides: merge/reject/modify]

    UserDecision --> PersonalUpdate[Update personal branch]
    AutoMerge --> PersonalUpdate
    BackToPersonal --> PersonalUpdate

    PersonalUpdate --> SystemLearning
    SystemLearning --> Action

    %% Styling
    classDef startEnd fill:#e1f5fe,stroke:#01579b,stroke-width:3px
    classDef decision fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef process fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef personal fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef community fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class Start,PersonalReady startEnd
    class Setup,Action,EvalResults,IterateLocal,VoteResult,SyncCheck,UserDecision decision
    class CreatePersonal,DefineValues,ConfigureAI,CreateTerm,TermDetails,SystemEval,SavePersonal,RefineLocal process
    class UseMain,ImproveTerm,ProposeToMain,PersonalUpdate personal
    class JoinDiscussion,MakeProposal,ReviewProposal,CommunityDiscussion,AIParticipation,CommunityVote,MergeMain,NotifyAll,AutoMerge,BackToPersonal community


graph TB
    subgraph "Frontend Layer"
        WebApp[Next.js Web App]
        Dashboard[User Dashboard]
        Forum[Forum Interface]
        SystemExplorer[System Explorer]

        WebApp --> Dashboard
        WebApp --> Forum
        WebApp --> SystemExplorer
    end

    subgraph "API Layer"
        AuthAPI[Authentication API]
        TermAPI[Terms API]
        ProposalAPI[Proposals API]
        EvaluationAPI[Evaluation API]
        VotingAPI[Voting API]
        SyncAPI[Branch Sync API]

        Forum --> TermAPI
        Forum --> ProposalAPI
        Forum --> VotingAPI
        Dashboard --> AuthAPI
        Dashboard --> EvaluationAPI
        Dashboard --> SyncAPI
    end

    subgraph "Business Logic Layer"
        TermService[Term Management Service]
        EthicsEngine[Ethics Compatibility Engine]
        ProposalEngine[Proposal Management Engine]
        VotingEngine[Voting & Consensus Engine]
        SyncEngine[Branch Synchronization Engine]
        AIOrchestrator[AI Agent Orchestrator]

        EvaluationAPI --> EthicsEngine
        TermAPI --> TermService
        ProposalAPI --> ProposalEngine
        VotingAPI --> VotingEngine
        SyncAPI --> SyncEngine
        EthicsEngine --> AIOrchestrator
    end

    subgraph "AI Agent Layer"
        PersonalAgents[Personal AI Agents]
        SystemAgents[System AI Agents]
        ValidationAgents[Validation AI Agents]
        MCPServer[MCP Server]

        AIOrchestrator --> PersonalAgents
        AIOrchestrator --> SystemAgents
        AIOrchestrator --> ValidationAgents
        PersonalAgents --> MCPServer
        SystemAgents --> MCPServer
        ValidationAgents --> MCPServer
    end

    subgraph "Data Storage Layer"
        GitRepo[Git Repository]
        UserProfiles[User Profiles DB]
        VotingRecords[Voting Records DB]
        Cache[Redis Cache]

        subgraph "Git Structure"
            MainBranch[main/]
            PersonalBranches[users/*/]
            TermsData[terms/]
            DiscussionsData[discussions/]
            ProposalsData[proposals/]
        end

        GitRepo --> MainBranch
        GitRepo --> PersonalBranches
        GitRepo --> TermsData
        GitRepo --> DiscussionsData
        GitRepo --> ProposalsData

        TermService --> GitRepo
        ProposalEngine --> GitRepo
        VotingEngine --> VotingRecords
        SyncEngine --> GitRepo
        AuthAPI --> UserProfiles
        EvaluationAPI --> Cache
    end

    subgraph "External Services"
        GitHub[GitHub API]
        WebSearch[Web Search APIs]
        LLMServices[LLM Services]

        MCPServer --> WebSearch
        MCPServer --> LLMServices
        SyncEngine -.->|future| GitHub
    end

    %% Data Flow Arrows
    PersonalAgents -.->|analysis results| Forum
    SystemAgents -.->|validations| ProposalEngine
    ValidationAgents -.->|cross-checks| EthicsEngine

    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#0277bd,stroke-width:2px
    classDef api fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef business fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef ai fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef storage fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef external fill:#f1f8e9,stroke:#558b2f,stroke-width:2px

    class WebApp,Dashboard,Forum,SystemExplorer frontend
    class AuthAPI,TermAPI,ProposalAPI,EvaluationAPI,VotingAPI,SyncAPI api
    class TermService,EthicsEngine,ProposalEngine,VotingEngine,SyncEngine,AIOrchestrator business
    class PersonalAgents,SystemAgents,ValidationAgents,MCPServer ai
    class GitRepo,UserProfiles,VotingRecords,Cache,MainBranch,PersonalBranches,TermsData,DiscussionsData,ProposalsData storage
    class GitHub,WebSearch,LLMServices external




    graph LR
    subgraph "Personal Development Space"
        PersonalBranch[Personal DAHAO Branch]
        PersonalTerms[Personal Terms Dictionary]
        PersonalEthics[Personal Ethics Framework]
        PersonalAI[Personal AI Agent]

        PersonalBranch --> PersonalTerms
        PersonalBranch --> PersonalEthics
        PersonalEthics --> PersonalAI
    end

    subgraph "System Evaluation Layer"
        CompatibilityChecker[Compatibility Checker]
        SimilarityEngine[Similarity Engine]
        EthicsValidator[Ethics Validator]
        CrossDomainAnalyzer[Cross-Domain Analyzer]

        PersonalTermService[Personal Term Service]
        MainTermService[Main Term Service]
    end

    subgraph "Main DAHAO Repository"
        MainBranch[Main DAHAO Branch]
        CoreTerms[Core Terms Dictionary]
        DomainTerms[Domain-Specific Terms]
        CommunityDiscussions[Community Discussions]
        VotingSystem[Voting & Consensus System]

        MainBranch --> CoreTerms
        MainBranch --> DomainTerms
        MainBranch --> CommunityDiscussions
        CommunityDiscussions --> VotingSystem
    end

    subgraph "Proposal & Merge System"
        ProposalQueue[Proposal Queue]
        CommunityReview[Community Review Process]
        MergeDecision[Merge Decision Engine]
        UpdateNotifier[Update Notification System]
    end

    %% Term Creation Flow
    PersonalTerms -->|evaluate| CompatibilityChecker
    CompatibilityChecker -->|check personal ethics| PersonalEthics
    CompatibilityChecker -->|check main compatibility| CoreTerms
    CompatibilityChecker -->|find similar| SimilarityEngine
    SimilarityEngine -->|search| CoreTerms
    SimilarityEngine -->|search| DomainTerms

    %% Proposal Flow
    PersonalTerms -->|propose| ProposalQueue
    ProposalQueue --> CommunityReview
    CommunityReview --> CommunityDiscussions
    CommunityDiscussions --> VotingSystem
    VotingSystem --> MergeDecision

    %% Merge Success Flow
    MergeDecision -->|approved| CoreTerms
    MergeDecision -->|approved| DomainTerms
    CoreTerms --> UpdateNotifier
    UpdateNotifier -->|notify all branches| PersonalBranch

    %% Inheritance Flow
    CoreTerms -.->|inherits| PersonalTerms
    DomainTerms -.->|may inherit| PersonalTerms

    %% AI Integration
    PersonalAI -->|assists| PersonalTerms
    PersonalAI -->|participates in| CommunityDiscussions

    %% Cross-Domain Validation
    CrossDomainAnalyzer -->|validates| ProposalQueue
    CrossDomainAnalyzer -->|checks impact| DomainTerms

    %% Styling
    classDef personal fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef system fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef main fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef process fill:#fff3e0,stroke:#e65100,stroke-width:2px

    class PersonalBranch,PersonalTerms,PersonalEthics,PersonalAI personal
    class CompatibilityChecker,SimilarityEngine,EthicsValidator,CrossDomainAnalyzer,PersonalTermService,MainTermService system
    class MainBranch,CoreTerms,DomainTerms,CommunityDiscussions,VotingSystem main
    class ProposalQueue,CommunityReview,MergeDecision,UpdateNotifier process


sequenceDiagram
    participant User as User (Alice)
    participant PersonalBranch as Alice's Branch
    participant PublicPool as Public Pool
    participant Community as Community
    participant Sponsors as Sponsor System
    participant Issue as Governance Issue
    participant MainDAO as Main DAHAO
    participant AllBranches as All Personal Branches
    participant System as Self-Improving System

    Note over User, System: Progressive Governance Pipeline

    %% Personal Development Phase
    User->>PersonalBranch: Develop new governance concept
    PersonalBranch->>User: AI assistance & iteration
    User->>PersonalBranch: Refine based on personal ethics

    %% Public Pool Phase
    User->>PublicPool: Submit work to public pool
    PublicPool->>Community: Make work visible to all
    Community->>PublicPool: Review & preliminary voting

    alt Sufficient Community Interest
        PublicPool->>Sponsors: Request sponsor review
        Sponsors->>PublicPool: Evaluate for main discussion

        alt Sponsors Approve
            PublicPool->>Issue: Create governance issue
            Issue->>MainDAO: Start formal discussion

            %% AI Agent Deployment
            User->>Community: Deploy AI agents to assist discussion
            Community->>Issue: AI agents participate with API keys
            Issue->>System: Log all agent actions

            %% Full Governance Process
            Issue->>Community: Formal community voting
            Community->>Issue: Vote results

            alt Approved for Integration
                Issue->>MainDAO: Merge into main branch
                MainDAO->>AllBranches: Notify all personal branches
                AllBranches->>System: Report compatibility results
                System->>System: Learn from integration patterns

                %% System Self-Improvement
                System->>System: Analyze what made this successful
                System->>MainDAO: Suggest process improvements
                System->>User: Update agent capabilities

            else Rejected
                Issue->>PersonalBranch: Return with feedback
                PersonalBranch->>System: Log failure patterns
                System->>User: Suggest improvements for future
            end

        else Sponsors Reject
            PublicPool->>PersonalBranch: Back to development
            PersonalBranch->>System: Learn from sponsor feedback
        end

    else Insufficient Interest
        PublicPool->>PersonalBranch: Continue development
        PersonalBranch->>User: AI suggests community alignment
    end

    %% Continuous Learning Loop
    System->>System: Analyze all interactions
    System->>AllBranches: Push system improvements
    System->>PublicPool: Enhance pool mechanisms
    System->>Sponsors: Improve sponsor tools
    System->>Issue: Evolve governance processes

    Note over User, System: System grows smarter with each cycle


