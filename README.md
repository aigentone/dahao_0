# DAHAO - Decentralized Autonomous Hybrid-AI Organization

A revolutionary platform where humans and AI agents collaborate to evolve ethical systems through versioned governance.

## 🎯 Project Overview

DAHAO (道) represents "The Way" - a hybrid human-AI organizational framework where:

- **Versioned Ethics**: Moral principles evolve like code through Git workflows
- **AI Agent Partners**: Personal agents embody user values and provide ethical analysis
- **Hybrid Decision-Making**: Humans and AI collaborate on proposals and governance
- **GitHub-Native**: Built on Git infrastructure for transparency and auditability
- **Community Evolution**: From forum-style beginnings to fully autonomous organizations
- **Domain Specialization**: Focused communities around animal welfare, music industry, environment, etc.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   Human-AI Interface Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Web UI  │  │AI Agents │  │   API    │  │  Mobile  │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Ethics & Agent Manager                          │
│  - Personal Agent Configs   - Ethics Version Control           │
│  - Agent-to-Agent Comm     - Governance Workflows              │
│  - Domain Specialization   - Conflict Resolution               │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Git-Based Storage                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Core Ethics│  │Domain    │  │Personal  │  │System    │      │
│  │Versions   │  │Ethics    │  │Agents    │  │Agents    │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0+ (LTS recommended)
- Git 2.30+
- GitHub account (for GitHub provider)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/dahao_0.git
   cd dahao_0
   ```

2. **Run the setup script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Configure environment**
   ```bash
   # Edit .env file with your settings
   nano .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 💻 Development Setup

### Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

3. **Configure GitHub OAuth App**
   - Go to GitHub Settings > Developer Settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/github/callback`
   - Copy Client ID and Client Secret to `.env`

4. **Initialize DAHAO Template**
   ```bash
   npm run init:template
   ```

### Project Structure

```
dahao_0/
├── src/                    # Source code
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/              # Core libraries
│   │   ├── git/          # Git operations
│   │   ├── yaml/         # YAML processing
│   │   └── validation/   # Schema validation
│   ├── hooks/            # React hooks
│   └── types/            # TypeScript types
├── dahao-template/        # DAHAO template structure
│   ├── constitution/     # Constitutional documents
│   ├── governance/       # Governance rules
│   ├── terms/           # Term definitions
│   └── tokens/          # Token economics
├── scripts/              # Utility scripts
└── docs/                # Documentation
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# GitHub OAuth (Required for GitHub provider)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Session Secret (Required)
SESSION_SECRET=your_secure_session_secret_min_32_chars

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GIT_PROVIDER=github

# Optional: Custom Git Server
GIT_SERVER_URL=https://git.example.com
GIT_SERVER_TOKEN=your_git_server_token

# Optional: Feature Flags
ENABLE_AI_AGENTS=false
ENABLE_TOKEN_ECONOMICS=false
```

## 🏃 Running Locally

### Development Mode

```bash
# Start development server with hot reload
npm run dev

# Run in specific port
PORT=4000 npm run dev
```

### Production Mode

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run E2E tests
npm run test:e2e
```

### Validation

```bash
# Validate all YAML files
npm run validate

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**

### Docker

1. **Build image**
   ```bash
   docker build -t dahao .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 --env-file .env dahao
   ```

### Self-Hosted

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed self-hosting instructions.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md) - Detailed technical architecture
- [API Reference](docs/API.md) - REST API documentation
- [Git Operations](docs/GIT_OPERATIONS.md) - Git integration details
- [YAML Schemas](docs/SCHEMAS.md) - Data structure documentation

## 🛡️ Security

- All data is stored in Git repositories
- Authentication via GitHub OAuth
- Authorization through Git permissions
- Complete audit trail via Git history

For security issues, please email security@dahao.org

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by decentralized governance principles
- Built on the shoulders of Git
- Powered by the open-source community

## 🔗 Links

- [Website](https://dahao.org)
- [Documentation](https://docs.dahao.org)
- [Community Forum](https://forum.dahao.org)
- [Discord](https://discord.gg/dahao)

---

<p align="center">
  Made with ❤️ by the DAHAO Community
</p>