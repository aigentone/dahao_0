import { GitOperationsManager } from './operations';
import { ProviderConfig } from './providers';
import { getEnvConfig, validateEnvConfig, getProviderToken } from '../../config/env';

// Example usage of GitOperationsManager
async function exampleUsage() {
  // Load environment configuration
  const envConfig = getEnvConfig();
  validateEnvConfig(envConfig);

  // Create provider configuration
  const providerConfig: ProviderConfig = {
    type: envConfig.GIT_PROVIDER || 'github',
    token: getProviderToken(envConfig),
    baseUrl: envConfig.GIT_BASE_URL,
  };

  // Initialize GitOperationsManager
  const gitOps = new GitOperationsManager(providerConfig, envConfig.GIT_OWNER!);

  try {
    // Example 1: Create a new repository
    console.log('Creating new repository...');
    const newRepo = await gitOps.createRepository({
      name: 'test-repo',
      description: 'A test repository created via API',
      private: false,
      autoInit: true,
    });
    console.log('Repository created:', newRepo.fullName);

    // Example 2: Create a new branch
    console.log('\nCreating new branch...');
    const newBranch = await gitOps.createBranch('test-repo', 'feature/new-feature', 'main');
    console.log('Branch created:', newBranch.name);

    // Example 3: Create a new file
    console.log('\nCreating new file...');
    const fileCommit = await gitOps.writeFile(
      'test-repo',
      'src/hello.ts',
      'console.log("Hello, World!");',
      {
        message: 'Add hello.ts file',
        branch: 'feature/new-feature',
      }
    );
    console.log('File created with commit:', fileCommit.commit.sha);

    // Example 4: Update the file
    console.log('\nUpdating file...');
    const updateCommit = await gitOps.updateFile(
      'test-repo',
      'src/hello.ts',
      'console.log("Hello, Updated World!");',
      'Update hello.ts message',
      'feature/new-feature'
    );
    console.log('File updated with commit:', updateCommit.commit.sha);

    // Example 5: Read file content
    console.log('\nReading file content...');
    const content = await gitOps.readFileContent('test-repo', 'src/hello.ts', 'feature/new-feature');
    console.log('File content:', content);

    // Example 6: Create multiple files and commit
    console.log('\nCreating multiple files...');
    const commits = await gitOps.commitAndPush(
      'test-repo',
      [
        { path: 'src/index.ts', content: 'export * from "./hello";' },
        { path: 'README.md', content: '# Test Repository\n\nThis is a test repository.' },
      ],
      'Add index.ts and README.md',
      'feature/new-feature'
    );
    console.log('Created files with commits:', commits.map(c => c.sha));

    // Example 7: List branches
    console.log('\nListing branches...');
    const branches = await gitOps.listBranches('test-repo');
    console.log('Branches:', branches.map(b => b.name));

    // Example 8: Create a pull request
    console.log('\nCreating pull request...');
    const pullRequest = await gitOps.createPullRequestFromBranch(
      'test-repo',
      'feature/new-feature',
      'Add new feature',
      'This PR adds a new feature with hello.ts file and documentation.',
      'main'
    );
    console.log('Pull request created:', pullRequest.number, pullRequest.title);

    // Example 9: List commits
    console.log('\nListing commits...');
    const recentCommits = await gitOps.listCommits('test-repo', {
      perPage: 5,
    });
    console.log('Recent commits:');
    recentCommits.forEach(commit => {
      console.log(`  - ${commit.sha.substring(0, 7)}: ${commit.message}`);
    });

    // Example 10: Merge pull request
    console.log('\nMerging pull request...');
    await gitOps.mergePullRequest('test-repo', pullRequest.number, {
      mergeMethod: 'squash',
    });
    console.log('Pull request merged!');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Working with existing repository
async function workWithExistingRepo() {
  const envConfig = getEnvConfig();
  validateEnvConfig(envConfig);

  const providerConfig: ProviderConfig = {
    type: envConfig.GIT_PROVIDER || 'github',
    token: getProviderToken(envConfig),
  };

  const gitOps = new GitOperationsManager(providerConfig, envConfig.GIT_OWNER!);

  try {
    // Get repository information
    const repo = await gitOps.getRepository('existing-repo');
    console.log('Repository:', repo.fullName);
    console.log('Default branch:', repo.defaultBranch);
    console.log('Description:', repo.description);

    // List open pull requests
    const openPRs = await gitOps.listPullRequests('existing-repo', {
      state: 'open',
    });
    console.log('\nOpen Pull Requests:');
    openPRs.forEach(pr => {
      console.log(`  - #${pr.number}: ${pr.title} (by ${pr.user.login})`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Fork and contribute workflow
async function forkAndContribute() {
  const envConfig = getEnvConfig();
  validateEnvConfig(envConfig);

  const providerConfig: ProviderConfig = {
    type: envConfig.GIT_PROVIDER || 'github',
    token: getProviderToken(envConfig),
  };

  const gitOps = new GitOperationsManager(providerConfig, envConfig.GIT_OWNER!);

  try {
    // Fork a repository
    console.log('Forking repository...');
    const forkedRepo = await gitOps.forkRepository('original-owner', 'awesome-project');
    console.log('Forked to:', forkedRepo.fullName);

    // Create a feature branch in the fork
    const branch = await gitOps.createBranch(forkedRepo.name, 'fix/typo', 'main');
    console.log('Created branch:', branch.name);

    // Make changes
    await gitOps.updateFile(
      forkedRepo.name,
      'README.md',
      '# Awesome Project\n\nFixed typo in README.',
      'Fix typo in README',
      'fix/typo'
    );

    // Create pull request
    const pr = await gitOps.createPullRequest(forkedRepo.name, {
      title: 'Fix typo in README',
      body: 'This PR fixes a small typo in the README file.',
      head: `${envConfig.GIT_OWNER}:fix/typo`,
      base: 'main',
    });
    console.log('Pull request created:', pr.url);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Export example functions for testing
export {
  exampleUsage,
  workWithExistingRepo,
  forkAndContribute,
};

// Run examples if this file is executed directly
if (require.main === module) {
  console.log('Running Git Operations Examples...\n');
  
  // Uncomment the example you want to run:
  // exampleUsage();
  // workWithExistingRepo();
  // forkAndContribute();
}