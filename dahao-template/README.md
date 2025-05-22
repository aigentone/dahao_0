# DAHAO Template Repository

This is the official template for DAHAO (Decentralized Autonomous Holographic Adaptive Organizations) - a YAML-based framework for DAO governance documentation.

## 🏗️ Repository Structure

```
dahao-template/
├── .github/workflows/     # CI/CD workflows for validation
├── constitution/          # Foundational governance documents
│   ├── manifest.yaml     # Main constitution index
│   └── sections/         # Individual constitution sections
├── terms/                # Terminology and definitions
│   ├── definitions/      # Term definition files
│   └── registry/         # Central term registry
├── governance/           # Governance rules and structures
│   ├── rules/           # Voting and decision rules
│   ├── roles/           # Role definitions
│   └── members/         # Member profiles
├── tokens/              # Token economics configuration
│   └── economics.yaml   # Tokenomics specification
├── proposals/           # Governance proposals (DIPs)
└── .dahao/             # DAHAO configuration
    ├── config.yaml     # Repository configuration
    └── version         # DAHAO version

```

## 🚀 Getting Started

### 1. Fork this Template

Click "Use this template" on GitHub to create your own DAHAO repository.

### 2. Configure Your DAO

Edit `.dahao/config.yaml` with your organization's details:

```yaml
organization:
  name: Your DAO Name
  chain: ethereum  # or polygon, arbitrum, etc.
  multisig: "0xYourMultisigAddress"
```

### 3. Customize Constitution

Modify `constitution/manifest.yaml` and add sections in `constitution/sections/`.

### 4. Define Terms

Add your DAO-specific terms in `terms/definitions/`.

### 5. Set Governance Rules

Configure voting rules, roles, and parameters in `governance/`.

### 6. Configure Tokenomics

Update `tokens/economics.yaml` with your token distribution and incentives.

## 📝 File Formats

### Constitution Section
```yaml
id: section-id
version: 1.0.0
title: Section Title
content: |
  Your constitution content here...
metadata:
  created: 2025-01-22T00:00:00Z
  authors: [author-id]
```

### Term Definition
```yaml
term: Your Term
definition: Clear definition of the term
category: governance
aliases: [alt-name]
related_terms: [other-term]
```

### Governance Rule
```yaml
id: rule-id
type: voting
title: Rule Title
rules:
  - description: What the rule does
    conditions: [when it applies]
    actions: [what happens]
parameters:
  quorum: 0.10
  threshold: 0.51
```

### Proposal
```yaml
id: DIP-XXX
title: Proposal Title
type: governance
author: member-id
description: What the proposal does
status: draft
```

## 🔍 Validation

The repository includes GitHub Actions workflows that:
- Validate YAML syntax
- Check schema compliance
- Ensure required files exist
- Verify cross-references

Run validation locally:
```bash
# Install dependencies
pip install pyyaml jsonschema

# Validate structure
python scripts/validate.py
```

## 📚 Schema Documentation

Detailed schemas are available in `src/schemas/`:
- `document-schema.yaml` - Constitution documents
- `term-schema.yaml` - Term definitions
- `governance-schema.yaml` - Governance rules
- `member-schema.yaml` - Member profiles
- `proposal-schema.yaml` - Proposals

## 🤝 Contributing

1. Create proposals in `proposals/` directory
2. Submit PR with your changes
3. Automated validation will run
4. Community review and voting
5. Merge after approval

## 📦 Integration

DAHAO integrates with:
- **IPFS**: Decentralized storage
- **Snapshot**: Off-chain voting
- **Discord**: Community notifications
- **Smart Contracts**: On-chain execution

## 🔗 Resources

- [DAHAO Documentation](https://dahao.org/docs)
- [Schema Reference](https://dahao.org/schemas)
- [Example DAOs](https://dahao.org/examples)
- [Community Forum](https://forum.dahao.org)

## 📄 License

This template is released under the MIT License. Your DAO's content may have its own license.