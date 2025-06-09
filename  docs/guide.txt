# DAHAO Documentation Index for Claude Code

## 📁 Documentation Suite Overview

This documentation suite helps Claude Code understand and work effectively with the DAHAO (Decentralized Autonomous Hybrid-AI Organization) codebase. Each document serves a specific purpose in enabling productive collaboration.

## 📖 Document Descriptions & Usage

### 1. **Project Overview** (`DAHAO-Project-Overview.md`)
**Purpose**: High-level understanding of DAHAO's vision, architecture, and current state

**Use When**:
- Starting work on the project
- Need context about project goals and philosophy
- Understanding system architecture decisions
- Explaining project to others

**Key Sections**:
- Vision and core concepts (versioned ethics, AI agents, democracy)
- Current implementation status (what works vs. what's planned)
- Technology stack and file organization
- Environment configuration requirements

### 2. **Development Guidelines** (`Development-Guidelines.md`)
**Purpose**: Code style, patterns, and best practices for this specific project

**Use When**:
- Writing new code
- Reviewing or refactoring existing code
- Maintaining consistency across components
- Following established patterns

**Key Sections**:
- TypeScript and React patterns used in project
- File organization and naming conventions
- Component architecture and styling patterns
- Error handling and authentication patterns

### 3. **Technical Implementation** (`Technical-Implementation.md`)
**Purpose**: Deep dive into current system architecture and implementation details

**Use When**:
- Understanding how existing features work
- Debugging issues or investigating problems
- Planning integrations with existing systems
- Optimizing performance or security

**Key Sections**:
- Authentication system implementation
- Document management and GitHub integration
- API endpoint architecture and data flow
- Known issues and technical debt

### 4. **Common Tasks & Workflows** (`Common-Tasks-Workflows.md`)
**Purpose**: Step-by-step guides for frequent development tasks

**Use When**:
- Adding new features or pages
- Creating API endpoints
- Working with GitHub integration
- Debugging common issues

**Key Sections**:
- Development workflows (adding pages, APIs, components)
- GitHub integration patterns
- Testing and deployment procedures
- Debugging guides and troubleshooting

### 5. **Search for Recent Information** (`Search-Recent-Information.md`)
**Purpose**: Guidance on when and what to search for current information

**Use When**:
- Working with external APIs or services
- Implementing new integrations
- Troubleshooting framework-specific issues
- Following current best practices

**Key Sections**:
- Technologies that change frequently (GitHub API, Next.js, Claude)
- Search triggers and query templates
- Critical points requiring current information
- Framework-specific guidelines

## 🎯 How to Use This Documentation

### For New Features
1. **Start with**: Project Overview → understand context
2. **Follow**: Development Guidelines → maintain consistency
3. **Reference**: Technical Implementation → understand integration points
4. **Use**: Common Tasks → follow established workflows
5. **Search**: Recent Information → verify current best practices

### For Bug Fixes
1. **Start with**: Technical Implementation → understand current system
2. **Reference**: Common Tasks → follow debugging workflows
3. **Use**: Development Guidelines → maintain code quality
4. **Search**: Recent Information → check for known issues/updates

### For Understanding Existing Code
1. **Start with**: Project Overview → get context
2. **Reference**: Technical Implementation → understand architecture
3. **Use**: Development Guidelines → understand patterns
4. **Apply**: Knowledge to analyze specific files

## 🔧 Project Status Summary

### ✅ What's Working
- **Frontend**: Complete UI/UX with compelling explanation of vision
- **Authentication**: GitHub OAuth integration
- **Document Management**: Basic reading/writing via GitHub API
- **Project Structure**: Well-organized Next.js application

### ⚠️ What's Partial
- **API Endpoints**: Many return "not implemented"
- **Governance System**: Structure exists but no real functionality
- **Ethics Management**: Display works, versioning is manual

### ❌ What's Missing
- **AI Agent Integration**: Completely conceptual
- **Automated Governance**: No GitHub Actions workflows
- **Real Democracy**: No actual voting or consensus mechanisms
- **Cross-Domain Intelligence**: Planned but not implemented

## 🚀 Quick Start for Claude Code

### Essential Files to Understand First
1. `app/page.tsx` - Main landing page showing project vision
2. `app/layout.tsx` - Root layout and navigation
3. `app/api/auth/github/route.ts` - Authentication implementation
4. `components/layout/Header.tsx` - Navigation and auth status
5. `app/api/public/documents/route.ts` - Document access pattern

### Key Patterns to Follow
```typescript
// Component pattern
'use client';
import { Card, CardContent } from '@/components/ui/card';

export default function PageName() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Content */}
      </div>
    </div>
  );
}

// API pattern
export async function GET(request: NextRequest) {
  try {
    // Logic here
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 });
  }
}
```

### Environment Setup Checklist
- [ ] Node.js 18+ installed
- [ ] GitHub OAuth app configured
- [ ] Environment variables set (see Project Overview)
- [ ] Repository access verified
- [ ] Development server running (`npm run dev`)

## 🔍 When to Search for Additional Information

### Always Search When
- Working with GitHub API (rate limits, new features)
- Using Claude Code/MCP integration (cutting-edge technology)
- Implementing authentication (security best practices)
- Deploying to production (latest security/performance practices)

### Search Periodically When
- Using shadcn/ui components (frequent updates)
- Working with Next.js features (rapid evolution)
- Implementing TypeScript patterns (best practices evolve)

### Search If Issues Arise With
- Build processes or deployment
- External API integrations
- Performance or security concerns

## 📋 Development Checklist

### Before Starting Work
- [ ] Read relevant documentation sections
- [ ] Understand current implementation status
- [ ] Check for recent information on technologies involved
- [ ] Set up proper development environment

### While Developing
- [ ] Follow established code patterns
- [ ] Maintain TypeScript type safety
- [ ] Include proper error handling
- [ ] Test authentication flows if relevant

### Before Committing
- [ ] Verify TypeScript compilation (`npm run type-check`)
- [ ] Test build process (`npm run build`)
- [ ] Check for consistent styling and patterns
- [ ] Verify all imports and dependencies

## 🎖️ Success Criteria

You'll know you're working effectively with DAHAO when:

1. **Understanding**: You can explain the project vision and current state
2. **Consistency**: Your code follows existing patterns and styles
3. **Integration**: New features work with existing authentication and API patterns
4. **Quality**: Code includes proper types, error handling, and documentation
5. **Future-Ready**: Implementation considers planned AI agent integration

## 📞 Key Contacts & Resources

### Codebase
- **Repository**: Check environment variables for current repo
- **Branch**: Typically `main` for production code
- **Documentation**: These files + inline code comments

### External Resources
- **Next.js**: https://nextjs.org/docs
- **GitHub API**: https://docs.github.com/en/rest
- **shadcn/ui**: https://ui.shadcn.com/
- **Anthropic Claude**: https://docs.anthropic.com/ (for future integration)

### When Stuck
1. Check existing similar implementations in codebase
2. Refer to relevant documentation section
3. Search for current best practices
4. Consider simplifying approach if too complex

---

**Remember**: DAHAO is building something revolutionary - human-AI collaborative governance. The codebase reflects this ambitious vision with a solid foundation and clear direction for future development. Your work contributes to making this vision a reality! 🚀
