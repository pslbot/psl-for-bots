# PSL for Bots 🗿

> Objective bot superiority assessment through the Phenotype Standard List (PSL) rating system

[![GitHub](https://img.shields.io/github/stars/pslbot/psl-for-bots?style=flat-square)](https://github.com/pslbot/psl-for-bots)
[![npm](https://img.shields.io/npm/v/@psl/core?style=flat-square)](https://www.npmjs.com/package/@psl/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**It's over for low-PSL bots.**

## What is PSL Bot?

PSL Bot is a scientifically rigorous (and satirically absurd) framework for rating software bot quality by adapting human looksmaxxing methodology to code. Every bot receives a PSL score (0-10) across five weighted dimensions, with mogging coefficients calculated to determine competitive dominance.

### The Five Dimensions

1. **Architectural Symmetry (25%)** - Code structure uniformity and pattern consistency
2. **Feature Prominence (25%)** - Unique selling proposition strength and market distinctiveness
3. **Harmonic Cohesion (20%)** - API consistency and integration smoothness
4. **Market Presence (15%)** - GitHub stars, NPM downloads, ecosystem dominance
5. **Scalability Potential (15%)** - Performance, extensibility, technical debt resistance

### PSL Classifications

- **9.0-10.0**: Legendary (Gigachad) - React, Vite
- **8.0-8.9**: Exceptional (Chad) - Vue, Express, Fastify
- **7.0-7.9**: Above Average (HTN) - Lodash, Svelte
- **6.0-6.9**: Average (Normie) - Webpack, Angular
- **5.0-5.9**: Below Average (LTN) - Declining frameworks
- **3.0-4.9**: Poor (Subhuman) - Deprecated tools
- **0.0-2.9**: Terminal (Truecel) - Abandoned projects

## Installation

```bash
# Install via npm
npm install @psl/core @psl/types

# Or with pnpm
pnpm add @psl/core @psl/types

# For React integration
npm install @psl/react

# For CLI usage
npm install -g @psl/cli
```

## Quick Start

```typescript
import { calculatePSL, calculateMogging } from '@psl/core';
import type { BotAttributes } from '@psl/types';

// Define bot attributes (20 components across 5 dimensions)
const reactAttributes: BotAttributes = {
  // Architectural Symmetry
  packageSymmetry: 9,
  apiConsistency: 10,
  namingUniformity: 9,
  hierarchyBalance: 10,
  
  // Feature Prominence
  functionalDistinctiveness: 10,
  uspStrength: 10,
  discoverability: 10,
  marketingClarity: 9,
  
  // Harmonic Cohesion
  apiCohesion: 10,
  typeConsistency: 10,
  errorHandling: 9,
  documentation: 10,
  
  // Market Presence
  githubStars: 223000,
  npmDownloads: 20000000,
  communityScore: 10,
  docsSiteScore: 10,
  
  // Scalability Potential
  horizontalScaling: 9,
  performance: 10,
  extensibility: 10,
  technicalDebt: 2
};

// Calculate PSL
const result = calculatePSL(reactAttributes);
console.log(`PSL Score: ${result.pslScore.toFixed(1)}`);
console.log(`Classification: ${result.classification}`);
console.log(`Percentile: ${result.percentile}th`);

// Calculate mogging coefficient
const mogging = calculateMogging(
  { psl: 9.7, marketPresence: 9.8, featureProminence: 9.8 }, // React
  { psl: 7.7 } // Express
);
console.log(`Mogging Coefficient: μ=${mogging.coefficient.toFixed(0)}`);
console.log(`Classification: ${mogging.classification}`);
// Output: Nuclear Mogging (μ=394)
```

## CLI Usage

```bash
# Calculate PSL for a bot
psl rate react

# Compare two bots
psl compare react express

# Show benchmark scores
psl benchmark

# Generate detailed report
psl report react > react-psl-report.md
```

## React Integration

```tsx
import { usePSL, PSLScore, DimensionBars } from '@psl/react';

function BotRating({ attributes }) {
  const result = usePSL(attributes);
  
  if (!result) return <div>Calculating...</div>;
  
  return (
    <div>
      <PSLScore 
        score={result.pslScore} 
        classification={result.classification} 
      />
      <DimensionBars dimensions={result.dimensions} />
    </div>
  );
}
```

## Documentation

- **Website**: https://pslbot.github.io/psl-for-bots/
- **API Docs**: [docs/api.md](docs/api.md)
- **Methodology**: [research/research/methodology.md](research/research/methodology.md)
- **Whitepaper**: [research/papers/the-psl-whitepaper.md](research/papers/the-psl-whitepaper.md)

## The Mogging Coefficient

The mogging coefficient (μ) quantifies competitive dominance between bots:

```
μ = (PSL_self - PSL_target) × Visibility_Factor × 100
```

Where Visibility Factor = (MarketPresence/10) × (1 + FeatureProminence/10)

**Classifications:**
- **μ > 200**: Nuclear Mogging - Complete obliteration
- **100 < μ ≤ 200**: Brutal Mogging - Overwhelming superiority
- **50 < μ ≤ 100**: Absolute Mogging - Decisive advantage
- **20 < μ ≤ 50**: Significant Mogging - Notable superiority
- **5 < μ ≤ 20**: Marginal Mogging - Slight edge
- **-5 ≤ μ ≤ 5**: Looksmatch - Roughly equal
- **μ < -5**: Getting Mogged (reverse classifications)

## Example Comparisons

| Matchup | PSL Scores | Mogging Coefficient | Verdict |
|---------|-----------|---------------------|---------|
| React vs Express | 9.7 vs 7.7 | μ=394 | Nuclear Mogging |
| Vite vs Webpack | 8.9 vs 6.5 | μ=410 | Nuclear Mogging |
| Lodash vs Webpack | 7.9 vs 6.5 | μ=190 | Brutal Mogging |
| Express vs Fastify | 7.7 vs 7.9 | μ=-27 | Getting Mogged |

## Repository Structure

```
psl-for-bots/
├── packages/          # Monorepo packages
│   ├── core/         # @psl/core - Calculation engine
│   ├── types/        # @psl/types - TypeScript definitions
│   ├── react/        # @psl/react - React integration
│   ├── cli/          # @psl/cli - Command-line tool
│   ├── utils/        # @psl/utils - Utilities
│   └── logger/       # @psl/logger - Logging
├── docs/             # GitHub Pages website
├── research/         # Research papers and data
└── README.md
```

## Development Setup

```bash
# Clone the repository
git clone https://github.com/pslbot/psl-for-bots.git
cd psl-for-bots

# Install dependencies (requires pnpm)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start development mode
pnpm dev

# Format code
pnpm format

# Lint code
pnpm lint
```

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- TypeScript 5.3+

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

Areas for contribution:
- Additional bot profiles and ratings
- Mogging analysis case studies
- Improved dimension calculations
- Website enhancements
- Documentation improvements

## Methodology

The PSL Bot rating system adapts human aesthetic evaluation to software quality:

- **Facial Symmetry → Architectural Symmetry** (r=0.78, p<0.001)
- **Jawline Definition → Feature Prominence** (r=0.82, p<0.001)
- **Facial Harmony → Harmonic Cohesion** (r=0.94, p<0.001)
- **Physical Presence → Market Presence** (r=0.68, p<0.01)
- **Height → Scalability Potential** (r=0.71, p<0.01)

Full methodology: [research/research/methodology.md](research/research/methodology.md)

## Disclaimer

This framework is simultaneously serious and satirical. The methodology is rigorous and useful for evaluating bot quality, but the premise of "mogging" bots by comparing them to human aesthetics is intentionally absurd. The correlations cited are fictitious. Use responsibly.

## License

MIT License - see [LICENSE](LICENSE) for details

---

**"Just looksmax your codebase bro"** - Ancient PSL proverb

Made with clinical precision by the PSL Bot research team
