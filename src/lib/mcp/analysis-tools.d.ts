import { z } from 'zod';
interface BranchInfo {
    branchId: string;
    branchName: string;
    branchType: string;
    parentBranch?: string;
    customizations: any;
    elementCount: number;
    elements: ElementSummary[];
}
interface ElementSummary {
    id: string;
    name: string;
    version: string;
    type: 'term' | 'principle' | 'rule' | 'metarule';
    usage: number;
    lastModified?: string;
}
interface ElementUsage {
    elementId: string;
    elementName: string;
    totalReferences: number;
    referencingElements: ElementReference[];
    consistencyScore: number;
    commonPatterns: string[];
    contextVariations: string[];
}
interface ElementReference {
    id: string;
    name: string;
    type: string;
    context: string;
    relationship: string;
}
interface BranchPhilosophy {
    branchId: string;
    branchName: string;
    corePhilosophy: string;
    keyPrinciples: string[];
    valuePriorities: string[];
    philosophicalApproach: string;
    inheritedFrom?: string;
    customizations: string[];
}
export declare const getBranchElementsTool: import("ai").Tool<z.ZodObject<{
    branchId: z.ZodString;
    elementType: z.ZodOptional<z.ZodEnum<["term", "principle", "rule", "metarule"]>>;
}, "strip", z.ZodTypeAny, {
    branchId: string;
    elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
}, {
    branchId: string;
    elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
}>, BranchInfo> & {
    execute: (args: {
        branchId: string;
        elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
    }, options: import("ai").ToolExecutionOptions) => PromiseLike<BranchInfo>;
};
export declare const getElementUsageTool: import("ai").Tool<z.ZodObject<{
    elementId: z.ZodString;
    branchId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    branchId: string;
}, {
    elementId: string;
    branchId: string;
}>, ElementUsage> & {
    execute: (args: {
        elementId: string;
        branchId: string;
    }, options: import("ai").ToolExecutionOptions) => PromiseLike<ElementUsage>;
};
export declare const getBranchPhilosophyTool: import("ai").Tool<z.ZodObject<{
    branchId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    branchId: string;
}, {
    branchId: string;
}>, BranchPhilosophy> & {
    execute: (args: {
        branchId: string;
    }, options: import("ai").ToolExecutionOptions) => PromiseLike<BranchPhilosophy>;
};
export declare const getElementVersionTool: import("ai").Tool<z.ZodObject<{
    elementId: z.ZodString;
    branchId: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    elementId: string;
    branchId: string;
    version?: string | undefined;
}, {
    elementId: string;
    branchId: string;
    version?: string | undefined;
}>, {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    usedBy: {
        principles: string[];
    };
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    usedBy: {
        metaRules: string[];
        rules: string[];
    };
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
        "1.1.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            changelog: string;
            previousVersion: string;
            status: string;
            additions: {
                "welfare-indicators": {
                    mammals: string[];
                    birds: string[];
                    aquatic: string[];
                };
            };
        };
    };
    branchVersions: {
        "animal-welfare-dahao": string;
    };
    usedBy: {
        principles: string[];
        rules: string[];
    };
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "john-main-branch": string;
    };
    parentTerms: {
        harm: string;
    };
    usedBy: {
        principles: string[];
        rules: string[];
    };
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            definition: string;
            brief: string;
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "animal-welfare-dahao": string;
    };
    parentTerms: {
        harm: string;
    };
    usedBy: {
        principles: string[];
        rules: string[];
    };
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                harm: string;
                being: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
        "1.1.0-animal": {
            statement: string;
            termDependencies: {
                harm: string;
                being: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            parentVersion: string;
            githubIssue: number;
            changelog: string;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
        "animal-welfare-dahao": string;
        "environmental-dahao": string;
        "john-main-branch": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                transparency: string;
                governance: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
        "1.1.0": {
            statement: string;
            termDependencies: {
                transparency: string;
                governance: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            changelog: string;
            ratifiedAt: string;
            previousVersion: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
        "john-main-branch": string;
        "sarah-main-branch": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                participant: string;
                equality: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                dignity: string;
                being: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                consensus: string;
                deliberation: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                participant: string;
                branch: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                governance: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                proposal: string;
                deliberation: string;
                ratification: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                "ai-agent": string;
                participant: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
        "2.0.0-ai": {
            statement: string;
            termDependencies: {
                "ai-agent": string;
                participant: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            parentVersion: string;
            githubIssue: number;
            changelog: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
        "experimental-ai-branch": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            statement: string;
            termDependencies: {
                wellbeing: string;
                being: string;
            };
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implementedBy: {
        rules: string[];
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            purpose: string;
            keyRequirements: string[];
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    implements: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            purpose: string;
            requirements: string[];
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            ratifiedAt: string;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
    };
    uses: string[];
    domain: string;
} | {
    branchContext: string;
    usage: number;
    id: string;
    type: string;
    name: string;
    currentVersion: string;
    versions: {
        "1.0.0": {
            purpose: string;
            requirements: string[];
            createdAt: string;
            createdBy: string;
            branchId: string;
            githubIssue: number;
            status: string;
        };
    };
    branchVersions: {
        "core-dahao": string;
        "core-governance-v2": string;
    };
    domain: string;
}> & {
    execute: (args: {
        elementId: string;
        branchId: string;
        version?: string | undefined;
    }, options: import("ai").ToolExecutionOptions) => PromiseLike<{
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        usedBy: {
            principles: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        usedBy: {
            metaRules: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
            "1.1.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                changelog: string;
                previousVersion: string;
                status: string;
                additions: {
                    "welfare-indicators": {
                        mammals: string[];
                        birds: string[];
                        aquatic: string[];
                    };
                };
            };
        };
        branchVersions: {
            "animal-welfare-dahao": string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "john-main-branch": string;
        };
        parentTerms: {
            harm: string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "animal-welfare-dahao": string;
        };
        parentTerms: {
            harm: string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    harm: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
            "1.1.0-animal": {
                statement: string;
                termDependencies: {
                    harm: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                parentVersion: string;
                githubIssue: number;
                changelog: string;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "animal-welfare-dahao": string;
            "environmental-dahao": string;
            "john-main-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    transparency: string;
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
            "1.1.0": {
                statement: string;
                termDependencies: {
                    transparency: string;
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                changelog: string;
                ratifiedAt: string;
                previousVersion: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "john-main-branch": string;
            "sarah-main-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    participant: string;
                    equality: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    dignity: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    consensus: string;
                    deliberation: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    participant: string;
                    branch: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    proposal: string;
                    deliberation: string;
                    ratification: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    "ai-agent": string;
                    participant: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
            "2.0.0-ai": {
                statement: string;
                termDependencies: {
                    "ai-agent": string;
                    participant: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                parentVersion: string;
                githubIssue: number;
                changelog: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "experimental-ai-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    wellbeing: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                keyRequirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implements: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                requirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                requirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "core-governance-v2": string;
        };
        domain: string;
    }>;
};
export declare const mcpAnalysisTools: {
    getBranchElements: import("ai").Tool<z.ZodObject<{
        branchId: z.ZodString;
        elementType: z.ZodOptional<z.ZodEnum<["term", "principle", "rule", "metarule"]>>;
    }, "strip", z.ZodTypeAny, {
        branchId: string;
        elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
    }, {
        branchId: string;
        elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
    }>, BranchInfo> & {
        execute: (args: {
            branchId: string;
            elementType?: "term" | "principle" | "rule" | "metarule" | undefined;
        }, options: import("ai").ToolExecutionOptions) => PromiseLike<BranchInfo>;
    };
    getElementUsage: import("ai").Tool<z.ZodObject<{
        elementId: z.ZodString;
        branchId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        branchId: string;
    }, {
        elementId: string;
        branchId: string;
    }>, ElementUsage> & {
        execute: (args: {
            elementId: string;
            branchId: string;
        }, options: import("ai").ToolExecutionOptions) => PromiseLike<ElementUsage>;
    };
    getBranchPhilosophy: import("ai").Tool<z.ZodObject<{
        branchId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        branchId: string;
    }, {
        branchId: string;
    }>, BranchPhilosophy> & {
        execute: (args: {
            branchId: string;
        }, options: import("ai").ToolExecutionOptions) => PromiseLike<BranchPhilosophy>;
    };
    getElementVersion: import("ai").Tool<z.ZodObject<{
        elementId: z.ZodString;
        branchId: z.ZodString;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        elementId: string;
        branchId: string;
        version?: string | undefined;
    }, {
        elementId: string;
        branchId: string;
        version?: string | undefined;
    }>, {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        usedBy: {
            principles: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        usedBy: {
            metaRules: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
            "1.1.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                changelog: string;
                previousVersion: string;
                status: string;
                additions: {
                    "welfare-indicators": {
                        mammals: string[];
                        birds: string[];
                        aquatic: string[];
                    };
                };
            };
        };
        branchVersions: {
            "animal-welfare-dahao": string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "john-main-branch": string;
        };
        parentTerms: {
            harm: string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                definition: string;
                brief: string;
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "animal-welfare-dahao": string;
        };
        parentTerms: {
            harm: string;
        };
        usedBy: {
            principles: string[];
            rules: string[];
        };
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    harm: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
            "1.1.0-animal": {
                statement: string;
                termDependencies: {
                    harm: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                parentVersion: string;
                githubIssue: number;
                changelog: string;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "animal-welfare-dahao": string;
            "environmental-dahao": string;
            "john-main-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    transparency: string;
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
            "1.1.0": {
                statement: string;
                termDependencies: {
                    transparency: string;
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                changelog: string;
                ratifiedAt: string;
                previousVersion: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "john-main-branch": string;
            "sarah-main-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    participant: string;
                    equality: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    dignity: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    consensus: string;
                    deliberation: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    participant: string;
                    branch: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    governance: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    proposal: string;
                    deliberation: string;
                    ratification: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    "ai-agent": string;
                    participant: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
            "2.0.0-ai": {
                statement: string;
                termDependencies: {
                    "ai-agent": string;
                    participant: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                parentVersion: string;
                githubIssue: number;
                changelog: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "experimental-ai-branch": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                statement: string;
                termDependencies: {
                    wellbeing: string;
                    being: string;
                };
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implementedBy: {
            rules: string[];
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                keyRequirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        implements: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                requirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                ratifiedAt: string;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
        };
        uses: string[];
        domain: string;
    } | {
        branchContext: string;
        usage: number;
        id: string;
        type: string;
        name: string;
        currentVersion: string;
        versions: {
            "1.0.0": {
                purpose: string;
                requirements: string[];
                createdAt: string;
                createdBy: string;
                branchId: string;
                githubIssue: number;
                status: string;
            };
        };
        branchVersions: {
            "core-dahao": string;
            "core-governance-v2": string;
        };
        domain: string;
    }> & {
        execute: (args: {
            elementId: string;
            branchId: string;
            version?: string | undefined;
        }, options: import("ai").ToolExecutionOptions) => PromiseLike<{
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            usedBy: {
                principles: string[];
            };
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            usedBy: {
                metaRules: string[];
                rules: string[];
            };
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
                "1.1.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    changelog: string;
                    previousVersion: string;
                    status: string;
                    additions: {
                        "welfare-indicators": {
                            mammals: string[];
                            birds: string[];
                            aquatic: string[];
                        };
                    };
                };
            };
            branchVersions: {
                "animal-welfare-dahao": string;
            };
            usedBy: {
                principles: string[];
                rules: string[];
            };
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "john-main-branch": string;
            };
            parentTerms: {
                harm: string;
            };
            usedBy: {
                principles: string[];
                rules: string[];
            };
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    definition: string;
                    brief: string;
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "animal-welfare-dahao": string;
            };
            parentTerms: {
                harm: string;
            };
            usedBy: {
                principles: string[];
                rules: string[];
            };
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        harm: string;
                        being: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
                "1.1.0-animal": {
                    statement: string;
                    termDependencies: {
                        harm: string;
                        being: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    parentVersion: string;
                    githubIssue: number;
                    changelog: string;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
                "animal-welfare-dahao": string;
                "environmental-dahao": string;
                "john-main-branch": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        transparency: string;
                        governance: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
                "1.1.0": {
                    statement: string;
                    termDependencies: {
                        transparency: string;
                        governance: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    changelog: string;
                    ratifiedAt: string;
                    previousVersion: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
                "john-main-branch": string;
                "sarah-main-branch": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        participant: string;
                        equality: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        dignity: string;
                        being: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        consensus: string;
                        deliberation: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        participant: string;
                        branch: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        governance: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        proposal: string;
                        deliberation: string;
                        ratification: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        "ai-agent": string;
                        participant: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
                "2.0.0-ai": {
                    statement: string;
                    termDependencies: {
                        "ai-agent": string;
                        participant: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    parentVersion: string;
                    githubIssue: number;
                    changelog: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
                "experimental-ai-branch": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    statement: string;
                    termDependencies: {
                        wellbeing: string;
                        being: string;
                    };
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implementedBy: {
                rules: string[];
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    purpose: string;
                    keyRequirements: string[];
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            implements: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    purpose: string;
                    requirements: string[];
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    ratifiedAt: string;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
            };
            uses: string[];
            domain: string;
        } | {
            branchContext: string;
            usage: number;
            id: string;
            type: string;
            name: string;
            currentVersion: string;
            versions: {
                "1.0.0": {
                    purpose: string;
                    requirements: string[];
                    createdAt: string;
                    createdBy: string;
                    branchId: string;
                    githubIssue: number;
                    status: string;
                };
            };
            branchVersions: {
                "core-dahao": string;
                "core-governance-v2": string;
            };
            domain: string;
        }>;
    };
};
export {};
