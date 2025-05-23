# Contributing to DAHAO

Thank you for your interest in contributing to DAHAO! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Git Commit Conventions](#git-commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be Respectful**: Treat everyone with respect and consideration
- **Be Inclusive**: Welcome people of all backgrounds and identities
- **Be Collaborative**: Work together to resolve conflicts and improve the project
- **Be Professional**: Maintain professionalism in all interactions

## 🚀 Getting Started

1. **Fork the Repository**
   ```bash
   # Via GitHub UI: Click the "Fork" button
   # Or use GitHub CLI:
   gh repo fork aigentone/dahao_0
   aigentone/dahao_0
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dahao_0.git
   cd dahao_0
   ```

3. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/aigentone/dahao_0.git
   ```

4. **Set Up Development Environment**
   ```bash
   ./scripts/setup.sh
   ```

## 💻 Development Workflow

### 1. Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
# Or for bugs:
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write clean, documented code
- Follow the code style guidelines
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --testPathPattern=git

# Run linting
npm run lint

# Type checking
npm run type-check
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add new feature description"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to GitHub and create a PR from your fork
- Fill out the PR template completely
- Link any related issues

## 📝 Code Style Guidelines

### TypeScript/JavaScript

```typescript
// ✅ Good: Clear, typed, documented
/**
 * Validates a DAHAO constitution section
 * @param section - The section to validate
 * @returns Validation result with any errors
 */
export function validateSection(section: ConstitutionSection): ValidationResult {
  // Implementation
}

// ❌ Bad: No types, no docs
export function validate(s) {
  // Implementation
}
```

### React Components

```tsx
// ✅ Good: Typed props, clear structure
interface DocumentViewerProps {
  document: Document;
  onEdit?: (id: string) => void;
  className?: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onEdit,
  className
}) => {
  // Component logic
  return (
    <div className={cn("document-viewer", className)}>
      {/* Component JSX */}
    </div>
  );
};

// ❌ Bad: No types, unclear props
export const DocViewer = (props) => {
  return <div>{/* ... */}</div>;
};
```

### File Organization

```
src/
├── components/          # React components
│   └── ComponentName/   # Component folder
│       ├── index.tsx    # Component export
│       ├── ComponentName.tsx
│       ├── ComponentName.test.tsx
│       └── ComponentName.module.css
├── lib/                 # Core libraries
│   └── feature/         # Feature folder
│       ├── index.ts     # Public API
│       ├── implementation.ts
│       └── types.ts
└── hooks/              # Custom React hooks
```

### Naming Conventions

- **Components**: PascalCase (e.g., `DocumentEditor`)
- **Functions**: camelCase (e.g., `validateDocument`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Files**: kebab-case (e.g., `git-operations.ts`)
- **Types/Interfaces**: PascalCase (e.g., `GitOperation`)

## 📋 Git Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes

### Examples

```bash
# Feature
feat(git): add support for GitLab provider

# Bug fix
fix(auth): resolve GitHub OAuth callback issue

# Documentation
docs(readme): update installation instructions

# Refactoring
refactor(components): simplify DocumentEditor logic

# With scope and body
feat(governance): implement voting system

Adds the ability for members to vote on proposals through
the UI. Votes are recorded as Git commits with special
metadata.

Closes #123
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update from upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

3. **Update documentation**
   - Add/update relevant documentation
   - Update README if needed
   - Add JSDoc comments to new functions

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)

## Related Issues
Closes #(issue number)

## Screenshots (if applicable)
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: At least one maintainer reviews
3. **Discussion**: Address feedback and questions
4. **Approval**: Maintainer approves
5. **Merge**: PR is merged (usually squash-merged)

## 🧪 Testing Guidelines

### Unit Tests

```typescript
// Example test file
describe('GitOperationsManager', () => {
  describe('createBranch', () => {
    it('should create a new branch from main', async () => {
      const manager = new GitOperationsManager();
      const branch = await manager.createBranch('feature/test', 'main');
      
      expect(branch.name).toBe('feature/test');
      expect(branch.baseBranch).toBe('main');
    });

    it('should throw error for invalid branch name', async () => {
      const manager = new GitOperationsManager();
      
      await expect(
        manager.createBranch('invalid name', 'main')
      ).rejects.toThrow('Invalid branch name');
    });
  });
});
```

### Integration Tests

```typescript
// Test real Git operations
describe('Git Integration', () => {
  it('should create and merge a pull request', async () => {
    // Test the full flow
  });
});
```

### E2E Tests

```typescript
// Test user workflows
describe('Document Editing', () => {
  it('should allow user to edit and submit changes', async () => {
    // Test UI interactions
  });
});
```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments to all exported functions
- Include parameter descriptions and return types
- Add examples for complex functions

```typescript
/**
 * Merges a pull request using the specified strategy
 * 
 * @param repo - Repository name
 * @param prNumber - Pull request number
 * @param strategy - Merge strategy ('merge', 'squash', or 'rebase')
 * @returns The resulting merge commit
 * 
 * @example
 * const merge = await mergePR('dahao-core', 123, 'squash');
 * console.log(`Merged as ${merge.sha}`);
 */
export async function mergePR(
  repo: string,
  prNumber: number,
  strategy: MergeStrategy
): Promise<MergeResult> {
  // Implementation
}
```

### README Updates

Update the README when:
- Adding new features
- Changing setup procedures
- Modifying configuration options
- Adding new dependencies

### Architecture Documentation

Update architecture docs when:
- Adding new components
- Changing data flow
- Modifying core algorithms
- Updating dependencies

## 👥 Community

### Getting Help

- **Discord**: Join our [Discord server](https://discord.gg/dahao)
- **GitHub Issues**: Search existing issues or create new ones
- **Documentation**: Check our [docs](https://docs.dahao.org)

### Communication Channels

- **GitHub Discussions**: General discussions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time chat and support
- **Forum**: Long-form discussions

### Recognition

Contributors are recognized in:
- The repository's Contributors page
- Release notes
- Project documentation
- Community highlights

## 🎯 What We're Looking For

### High Priority

- Git provider integrations (GitLab, Gitea)
- Performance optimizations
- Accessibility improvements
- Security enhancements
- Documentation improvements

### Good First Issues

Look for issues labeled `good first issue` for:
- Documentation fixes
- Simple bug fixes
- Small feature additions
- Test improvements

### Feature Requests

Before implementing new features:
1. Check existing issues/discussions
2. Open an issue to discuss the feature
3. Get feedback from maintainers
4. Implement after approval

## 🙏 Thank You!

Your contributions make DAHAO better for everyone. We appreciate your time and effort in improving this project!

---

**Questions?** Feel free to ask in Discord or open a GitHub Discussion.