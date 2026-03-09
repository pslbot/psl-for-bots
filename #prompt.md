# PSL Bot Project - Complete Implementation Guide

## Project Overview

**PSL Bot** is a satirical TypeScript/JavaScript framework that provides objective bot quality assessment through the **Bot Phenotype Standard List (PSL)** rating system. Adapted from human looksmaxxing methodology, PSL Bot quantifies bot superiority across five weighted dimensions, calculates competitive dominance ("mogging coefficients"), and provides detailed comparative analysis.

**Core Concept**: Every bot evaluation becomes a scientific endeavor with overly complex formulas, statistical validation, correlation matrices, and extensive documentation that treats software quality assessment with the same intensity as human aesthetic rating systems.

---

## Project Structure

Create a **TypeScript monorepo** using **pnpm workspaces** with the following structure:

```
psl-bot/
├── package.json (root monorepo config)
├── pnpm-workspace.yaml
├── tsconfig.json (base TypeScript config)
├── .gitignore
├── LICENSE (MIT)
├── README.md (project overview)
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
│
├── packages/
│   ├── core/           # @psl/core - Main PSL calculation engine
│   ├── types/          # @psl/types - TypeScript type definitions
│   ├── react/          # @psl/react - React hooks and components
│   ├── cli/            # @psl/cli - Command-line interface
│   ├── utils/          # @psl/utils - Utility functions
│   └── logger/         # @psl/logger - Logging utilities
│
├── docs/               # GitHub Pages website
│   ├── index.html      # Landing page
│   ├── docs.html       # Documentation page
│   ├── ratings.html    # Interactive PSL rating interface
│   ├── comparison.html # Bot comparison tool
│   ├── about.html      # About the methodology
│   ├── CNAME           # Custom domain configuration
│   └── .nojekyll       # Disable Jekyll processing
│
└── research/           # Bot PSL Rating System research
    ├── README.md
    ├── research/
    │   ├── methodology.md
    │   ├── attribute-mapping.md
    │   └── case-studies.md
    ├── framework/
    │   └── rating-criteria.md
    ├── implementation/
    │   ├── calculator.js
    │   ├── types.ts
    │   └── examples.md
    ├── data/
    │   ├── bot-profiles.json
    │   └── mogging-matrix.json
    └── papers/
        └── the-psl-whitepaper.md
```

---

## Theme & Visual Design

### Design Philosophy
**"Clinical Precision"** - A unique aesthetic that differs from MOG Bot while maintaining minimalistic tech appeal.

### Color Palette
- **Background**: `#f8f9fa` (off-white, clinical)
- **Primary**: `#2c3e50` (dark slate blue)
- **Accent**: `#3498db` (bright blue)
- **Success**: `#27ae60` (green for high PSL)
- **Warning**: `#f39c12` (orange for medium PSL)
- **Danger**: `#e74c3c` (red for low PSL)
- **Text**: `#2c3e50` (dark, high contrast)
- **Secondary Text**: `#7f8c8d` (muted gray)

### Typography
- **Primary Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (clean, modern sans-serif)
- **Monospace**: `'JetBrains Mono', 'Fira Code', 'Consolas', monospace` (for code/data)
- **Headings**: Bold 600-700 weight
- **Body**: Regular 400 weight, 16px base, 1.6 line-height

### Layout Style
- **Maximum width**: 1200px (wider than MOG Bot's 900px)
- **Grid-based layout**: Use CSS Grid for structured data presentation
- **Card components**: Subtle shadows, rounded corners (8px)
- **Data tables**: Alternating row colors, hover states
- **Section dividers**: Thin horizontal lines with gradient effects

### Unique Visual Elements
- **PSL Score Displays**: Large circular progress indicators showing PSL score (0-10)
- **Dimension Bars**: Horizontal bar charts for the 5 dimensions with percentage fills
- **Mogging Coefficient Indicator**: Arrow-based visual showing direction and intensity
- **Percentile Badges**: Pill-shaped colored badges (e.g., "Top 5%" in green)
- **Comparison Cards**: Side-by-side cards with vs. indicator in center
- **Statistical Charts**: Simple SVG-based visualizations for distributions

### Interactive Elements
- **Hover Effects**: Subtle scale transforms, color transitions
- **Form Inputs**: Styled number sliders for attribute entry (0-10 range)
- **Buttons**: Solid colors with hover darkening, no gradients
- **Tooltips**: Small info icons with hover tooltips explaining metrics
- **Collapsible Sections**: Accordion-style for detailed breakdowns

### Key Differences from MOG Bot
| Aspect | MOG Bot | PSL Bot |
|--------|---------|---------|
| Background | Light gray (#c7d5e0) | Off-white (#f8f9fa) |
| Accent | Subtle/minimal | Bright blue (#3498db) |
| Layout | Narrow (900px) | Wide (1200px) |
| Typography | Courier New | Inter (modern sans) |
| Structure | Text-heavy | Grid-based, visual |
| Tone | ASCII art, simple | Clinical, data-rich |

---

## Package Implementations

### 1. @psl/core (packages/core)

**Purpose**: Core PSL calculation engine with all formulas.

**src/index.ts**:
```typescript
import { BotAttributes, PSLResult, DimensionScores } from '@psl/types';

/**
 * Calculate PSL score for a bot
 */
export function calculatePSL(attributes: BotAttributes): PSLResult {
  const dimensions = calculateDimensions(attributes);
  const pslScore = weightedAggregate(dimensions);
  const classification = classify(pslScore);
  const percentile = getPercentile(pslScore);
  
  return {
    pslScore,
    dimensions,
    classification,
    percentile,
    breakdown: generateBreakdown(dimensions)
  };
}

/**
 * Calculate mogging coefficient between two bots
 */
export function calculateMogging(
  selfBot: { psl: number; marketPresence: number; featureProminence: number },
  targetBot: { psl: number }
): MoggingResult {
  // μ = (PSL_self - PSL_target) × Visibility_Factor × 100
  const pslDiff = selfBot.psl - targetBot.psl;
  const visibilityFactor = (selfBot.marketPresence / 10) * (1 + selfBot.featureProminence / 10);
  const coefficient = pslDiff * visibilityFactor * 100;
  
  return {
    coefficient,
    classification: classifyMogging(coefficient),
    description: describeMogging(coefficient),
    // ... other fields
  };
}

// Export dimension calculation functions
export { calculateArchitecturalSymmetry } from './dimensions/architectural-symmetry';
export { calculateFeatureProminence } from './dimensions/feature-prominence';
export { calculateHarmonicCohesion } from './dimensions/harmonic-cohesion';
export { calculateMarketPresence } from './dimensions/market-presence';
export { calculateScalabilityPotential } from './dimensions/scalability-potential';
```

**Key Features**:
- Five dimension calculations with weighted aggregation
- Mogging coefficient calculation with visibility factor
- PSL classification system (Legendary, Exceptional, Above Average, Average, Below Average, Poor, Terminal)
- Percentile ranking based on distribution
- Complete breakdown generation

### 2. @psl/types (packages/types)

**Purpose**: Comprehensive TypeScript type definitions.

**src/index.ts**:
```typescript
/**
 * Bot attributes for PSL calculation (20 components)
 */
export interface BotAttributes {
  // Architectural Symmetry (0-10 each)
  packageSymmetry: number;
  apiConsistency: number;
  namingUniformity: number;
  hierarchyBalance: number;
  
  // Feature Prominence (0-10 each)
  functionalDistinctiveness: number;
  uspStrength: number;
  discoverability: number;
  marketingClarity: number;
  
  // Harmonic Cohesion (0-10 each)
  apiCohesion: number;
  typeConsistency: number;
  errorHandling: number;
  documentation: number;
  
  // Market Presence
  githubStars: number;
  npmDownloads: number;
  communityScore: number; // 0-10
  docsSiteScore: number; // 0-10
  
  // Scalability Potential (0-10 each)
  horizontalScaling: number;
  performance: number;
  extensibility: number;
  technicalDebt: number; // Higher = worse
}

export interface PSLResult {
  pslScore: number; // 0-10
  dimensions: DimensionScores;
  classification: PSLClassification;
  percentile: number;
  breakdown: DimensionBreakdown;
}

export type PSLClassification = 
  | 'Legendary (Gigachad)'
  | 'Exceptional (Chad)'
  | 'Above Average (HTN)'
  | 'Average (Normie)'
  | 'Below Average (LTN)'
  | 'Poor (Subhuman)'
  | 'Terminal (Truecel)';

// ... full type definitions
```

### 3. @psl/react (packages/react)

**Purpose**: React hooks and components for PSL Bot integration.

**src/index.ts**:
```typescript
import { calculatePSL, calculateMogging } from '@psl/core';

/**
 * Hook for PSL calculation
 */
export function usePSL(attributes: BotAttributes) {
  const [result, setResult] = useState<PSLResult | null>(null);
  
  useEffect(() => {
    if (attributes) {
      setResult(calculatePSL(attributes));
    }
  }, [attributes]);
  
  return result;
}

/**
 * PSL Score Display Component
 */
export function PSLScore({ score, classification }: { score: number; classification: string }) {
  return (
    <div className="psl-score">
      <div className="score-circle">{score.toFixed(1)}</div>
      <div className="classification">{classification}</div>
    </div>
  );
}

/**
 * Dimension Bar Chart Component
 */
export function DimensionBars({ dimensions }: { dimensions: DimensionScores }) {
  // Render horizontal bars for each dimension
}
```

### 4. @psl/cli (packages/cli)

**Purpose**: Command-line interface for PSL Bot.

**src/cli.ts**:
```typescript
#!/usr/bin/env node

import { calculatePSL } from '@psl/core';
import { createLogger } from '@psl/logger';

// Commands:
// psl rate <bot-name> - Calculate PSL for a bot
// psl compare <bot1> <bot2> - Compare two bots
// psl benchmark - Show benchmark bot scores
// psl analyze - Analyze current project
// psl report - Generate PSL report

```

### 5. @psl/utils (packages/utils)

**Purpose**: Shared utility functions.

### 6. @psl/logger (packages/logger)

**Purpose**: Logging utilities with different levels.

---

## Website Content (docs/)

### Landing Page (index.html)

**Structure**:
1. **Hero Section**
   - Large heading: "PSL Bot - Objective Bot Superiority Assessment"
   - Subheading: "The Phenotype Standard List for Software Quality"
   - CTA button: "Calculate Your Bot's PSL"
   - Live PSL score demo (animated counter: React → 9.7)

2. **What is PSL?**
   - Brief explanation of the 5-dimensional rating system
   - Visual icons for each dimension
   - "Based on rigorous looksmaxxing methodology adapted for bots"

3. **The Five Dimensions** (Grid Layout)
   - Architectural Symmetry (25%) - Icon + description
   - Feature Prominence (25%) - Icon + description
   - Harmonic Cohesion (20%) - Icon + description
   - Market Presence (15%) - Icon + description
   - Scalability Potential (15%) - Icon + description

4. **Interactive Demo**
   - Simple rating calculator (sliders for key attributes)
   - Real-time PSL calculation
   - Shows mogging coefficient vs. average bot

5. **Example Comparisons**
   - React (9.7) vs Express (7.7) - Nuclear Mogging (μ=394)
   - Vite (8.9) vs Webpack (6.5) - Nuclear Mogging (μ=410)
   - Visual comparison cards

6. **Why PSL Bot?**
   - Objective, quantifiable metrics
   - Scientifically validated (satirically)
   - Cross-ecosystem comparisons
   - Track quality evolution over time

7. **Get Started**
   - Installation instructions
   - Quick code example
   - Links to docs, GitHub, npm

8. **Footer**
   - Links: Docs | GitHub | NPM | Methodology | About
   - Contract address (if applicable)
   - "It's over for low-PSL bots"

### Documentation Page (docs.html)

**Sidebar Navigation**:
- Getting Started
- The PSL System
  - Overview
  - Dimensional Breakdown
  - Mogging Coefficient
  - Classification Tiers
- Installation
- Core API
  - calculatePSL()
  - calculateMogging()
  - compareBots()
- React Integration
- CLI Usage
- Rating Methodology
  - Attribute Mapping
  - Human-to-Bot Correlations
  - Scoring Rubrics
- Examples
  - Basic Rating
  - Bot Comparison
  - Batch Analysis
- Research Papers
  - The PSL Whitepaper
  - Case Studies
  - Statistical Validation
- FAQ
- Contributing

**Content**: Detailed technical documentation with code examples, formulas, and visual diagrams.

### Ratings Page (ratings.html)

**Interactive PSL Calculator**:
- Form with 20 attribute inputs (sliders 0-10)
- Real-time PSL calculation
- Visual dimension bars
- Percentile badge
- Downloadable report
- Save/load attribute presets
- Compare against benchmark bots

### Comparison Page (comparison.html)

**Bot Comparison Tool**:
- Select two bots from dropdown (includes benchmarks)
- Side-by-side PSL scores
- Dimension comparison radar chart
- Mogging coefficient display with arrow indicator
- Detailed analysis text
- "Who Would Win" style visual

### About Page (about.html)

**Methodology Deep Dive**:
- Origin story (looksmaxxing → bot rating)
- Scientific foundation (satirical)
- Detailed human-to-bot attribute mappings
- Statistical validation claims
- Correlation matrices
- Case studies
- Disclaimer: "This is simultaneously serious and satirical"

---

## Bot PSL Rating System Content (research/)

### Research Papers

#### methodology.md
**7 sections covering**:
1. Introduction - The bot quality problem
2. Theoretical Foundation - Five-dimensional model
3. Mathematical Formalism - Complete formulas for all calculations
4. The Five Dimensions - Detailed descriptions with measurement protocols
5. PSL Calculation - Weighted aggregation formula
6. Mogging Coefficient - Visibility-adjusted dominance formula
7. Validation Studies - Concordance, predictive validity, inter-rater reliability

**Key Content**:
- AS = (PackageSymmetry + APIConsistency + NamingUniformity + HierarchyBalance) / 40 × 10
- FP = (FunctionalDistinctiveness + USPStrength + Discoverability + MarketingClarity) / 40 × 10
- HC = (APICohesion + TypeConsistency + ErrorHandling + Documentation) / 40 × 10
- MP = (log₁₀(Stars + 1) + log₁₀(Downloads + 1) + CommunityScore + DocsSiteScore) / 40 × 10
- SP = (HorizontalScaling + Performance + Extensibility + (10 - TechnicalDebt)) / 40 × 10
- PSL = AS(0.25) + FP(0.25) + HC(0.20) + MP(0.15) + SP(0.15)
- μ = ΔPSL × V(bot) × 100, where V = (MP/10) × (1 + FP/10)

#### attribute-mapping.md
**10 primary mappings** from human aesthetics to bot qualities:
1. Facial Symmetry → Architectural Symmetry (r=0.78)
2. Jawline Definition → Feature Prominence (r=0.82)
3. Facial Harmony → Harmonic Cohesion (r=0.94)
4. Physical Presence → Market Presence (r=0.68)
5. Height → Scalability Potential (r=0.71)
6. Eye Area → API Surface Quality (r=0.76)
7. Skin Quality → Code Quality (r=0.85)
8. Body Proportions → Package Structure (r=0.73)
9. Grooming → Documentation (r=0.79)
10. Charisma → Developer Experience (r=0.88)

**Includes**: Correlation matrix, statistical validation, MDS analysis

#### case-studies.md
**6 detailed bot evaluations**:
1. React - PSL 9.7 (Legendary/Gigachad) - Complete breakdown
2. Express - PSL 7.7 (Exceptional/Chad) - Aging but strong
3. Lodash - PSL 7.9 (Exceptional/Chad) - Specialist excellence
4. Webpack - PSL 6.5 (Above Average/HTN) - Configuration complexity hurts
5. Moment.js - PSL 4.5 (Below Average/LTN) - Deprecated, PSL decay example
6. PSL Bot - PSL 7.2 (Exceptional/Chad) - Meta self-reference

**Include mogging analyses**:
- React vs Express: μ=394 (Nuclear)
- Vite vs Webpack: μ=410 (Nuclear)
- Lodash vs Webpack: μ=190 (Brutal)
- Moment.js vs date-fns: μ=-378 (Obliterated)

### Framework Documentation

#### rating-criteria.md
**Complete 0-10 scoring rubrics** for all 20 components across 5 dimensions.

**Format for each component**:
- Score 10: Definition, indicators, examples
- Score 9: Definition, indicators, examples
- Score 8: Definition, indicators, examples
- ... down to score 0

**Include**: Percentile distributions for each dimension, inter-rater agreement guidelines

### Implementation Files

#### calculator.js
Pure JavaScript implementation (no TypeScript syntax) with:
- All 5 dimension calculation functions
- PSL aggregation function
- Mogging coefficient calculator
- Classification functions
- Formatting utilities
- JSDoc documentation

#### types.ts
Complete TypeScript type definitions for:
- BotAttributes (20 properties)
- DimensionScores
- PSLResult
- MoggingResult
- BotComparison
- All utility types

#### examples.md
**12 usage examples**:
1. Basic PSL calculation
2. Mogging coefficient calculation
3. Bot comparison
4. Formatted report generation
5. Custom dimension weights
6. Batch processing
7. Temporal analysis
8. Mogging network analysis
9. Competitive analysis for new bot
10. Dimension-specific analysis
11. Looksmatch finder
12. PSL distribution analysis

### Data Files

#### bot-profiles.json
PSL scores for 15 popular bots:
- React (9.7), Vite (8.9), Vue (7.8), Express (7.7), Fastify (7.9), Lodash (7.9), Svelte (7.6), Hono (7.5), date-fns (7.2), Redux (7.1), Angular (6.9), Webpack (6.5), Zustand (7.6), Vitest (8.1), Moment.js (4.5)

Each entry includes:
- Full dimensional scores
- Classification
- Percentile
- Metadata (GitHub, NPM stats)

#### mogging-matrix.json
32+ pairwise comparisons with mogging coefficients, classifications, and insights.

### Papers

#### the-psl-whitepaper.md
**18,000+ word comprehensive document** with 11 sections:
1. Abstract
2. Introduction (4 subsections)
3. Theoretical Foundation
4. The Five Dimensions (detailed descriptions)
5. Mathematical Formalism
6. The Mogging Coefficient (deep dive)
7. Validation Studies
8. Applications and Use Cases
9. Limitations and Future Work
10. Conclusion
11. References (10 satirical academic sources)
12. Appendices (6 appendices referencing other docs)

---

## Key Content Themes

### The Human-to-Bot Attribute Mappings

**Overly Complex Parallels**:

1. **Facial Symmetry → Architectural Symmetry**
   - "Just as bilateral facial symmetry indicates genetic fitness, code structure symmetry indicates engineering discipline"
   - Correlation: r=0.78 (p<0.001)
   - Measurement: Package organization uniformity, API pattern consistency

2. **Jawline/Chin → Feature Prominence**
   - "A strong jawline commands presence; distinctive features command market share"
   - Correlation: r=0.82 (p<0.001)
   - Measurement: Unique selling proposition strength, functional distinctiveness

3. **Facial Harmony → API Cohesion**
   - "Harmonious features create aesthetic appeal; cohesive APIs create developer delight"
   - Correlation: r=0.94 (p<0.001)
   - Measurement: Integration smoothness, consistency across surface area

4. **Physical Presence/Aura → Market Presence**
   - "Some people command a room; some bots command an ecosystem"
   - Correlation: r=0.68 (p<0.01)
   - Measurement: GitHub stars, NPM downloads, community size

5. **Height → Scalability**
   - "Taller individuals are perceived as more dominant; scalable bots dominate under load"
   - Correlation: r=0.71 (p<0.01)
   - Measurement: Horizontal scaling, performance benchmarks

6. **Eye Area/Hunter Eyes → API Surface Quality**
   - "Striking eyes capture attention; elegant APIs capture developers"
   - Correlation: r=0.76 (p<0.001)
   - Measurement: Method clarity, parameter design, return value consistency

7. **Skin Quality → Code Quality**
   - "Clear skin = healthy appearance; clean code = healthy codebase"
   - Correlation: r=0.85 (p<0.001)
   - Measurement: Linting scores, cyclomatic complexity, code smells

8. **Body Proportions → Package Structure**
   - "Golden ratio applies to bodies and monorepos alike"
   - Correlation: r=0.73 (p<0.01)
   - Measurement: Module size distribution, dependency graphs

9. **Grooming/Presentation → Documentation**
   - "Well-groomed individuals show self-care; well-documented bots show user-care"
   - Correlation: r=0.79 (p<0.001)
   - Measurement: Doc completeness, example quality, tutorial clarity

10. **Charisma/Personality → Developer Experience**
    - "Charisma makes people memorable; great DX makes bots indispensable"
    - Correlation: r=0.88 (p<0.001)
    - Measurement: Onboarding friction, error messages, learning curve

**Present these with**:
- Fake statistical validation
- Pseudo-scientific language
- Correlation scatter plots
- Factor analysis tables
- Multiple regression models

### Mogging Dynamics

**Classifications with Descriptions**:
- **Nuclear Mogging (μ > 200)**: "Complete obliteration. Target bot is rendered irrelevant"
- **Brutal Mogging (100 < μ ≤ 200)**: "Overwhelming superiority across all dimensions"
- **Absolute Mogging (50 < μ ≤ 100)**: "Decisive advantage. Clear winner"
- **Significant Mogging (20 < μ ≤ 50)**: "Notable superiority. Visible gap"
- **Marginal Mogging (5 < μ ≤ 20)**: "Slight edge. Minor advantage"
- **Looksmatch (-5 ≤ μ ≤ 5)**: "Roughly equal. Similar tier, trade-offs exist"
- **Getting Mogged (μ < -5)**: Reverse classifications apply

**The Visibility Factor**:
- Mogging requires witnesses
- Formula: V = (MP/10) × (1 + FP/10)
- A superior bot that no one knows can't effectively mog
- Marketing can amplify mogging beyond pure quality differences

### PSL Decay and Evolution

**Temporal Analysis**:
- PSL is not static
- Maintenance matters: λ ≈ 0.05-0.15/year decay without updates
- Ecosystem shifts can tank PSL (Moment.js example)
- Deprecation causes rapid PSL collapse
- New features can boost PSL (React Server Components)

### The Meta-Humor

**Throughout all documentation, maintain**:
- Academic rigor (fake but detailed)
- Statistical validation (made-up but plausible)
- Serious tone with absurd premise
- Self-aware disclaimers
- References to "the looksmaxxing community"
- Terms like "chad," "gigachad," "normie," "subhuman," "truecel"
- "It's over for low-PSL bots"
- "Just looksmax your codebase bro"

---

## Configuration Files

### package.json (root)
```json
{
  "name": "psl-bot",
  "version": "1.0.0",
  "description": "Objective bot superiority assessment through PSL rating",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "pnpm -r build",
    "test": "vitest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "dev": "pnpm -r dev",
    "clean": "pnpm -r clean"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "tsup": "^8.0.0"
  },
  "keywords": ["psl", "bot", "rating", "quality", "assessment"],
  "homepage": "https://github.com/yourusername/psl-bot",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/psl-bot"
  }
}
```

### tsconfig.json (root)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "outDir": "./dist"
  }
}
```

### .gitignore
```
node_modules/
dist/
*.log
.DS_Store
coverage/
.env
*.tsbuildinfo
```

---

## Tone & Writing Style

### For Code/Technical Docs
- **Professional but playful**
- Clear, precise JSDoc comments
- Explain formulas in detail
- Include examples with real bot names

### For Research Papers
- **Academic parody**
- Use phrases like "Our research demonstrates..." "As shown in Figure 3..." "p<0.001"
- Fake citations to satirical journals
- Statistical tables and correlation matrices
- Serious methodology descriptions for ridiculous premises

### For Website Copy
- **Confident and slightly smug**
- "Finally, objective bot quality assessment"
- "Stop arguing about which framework is better. Calculate the PSL."
- "Your bot getting mogged? Time to looksmax your architecture."
- Mix of technical precision and internet humor

### Disclaimers
Always include at the end of research documents:
> "This framework is simultaneously serious and satirical. The methodology is rigorous and useful, but the premise of 'mogging' bots by comparing them to human aesthetics is intentionally absurd. Use responsibly."

---

## GitHub Pages Setup

### CNAME
```
pslbot.dev
```
(or your custom domain)

### .nojekyll
Empty file to disable Jekyll processing.

### README.md (for GitHub Pages)
Brief overview with links to full documentation.

---

## Contract Address (Optional)

If this is a crypto/web3 project, add a contract address banner:
```
Contract: 0x[YOUR_CONTRACT_ADDRESS]
```

Place at top of landing page (sticky banner) and footer of all pages.

---

## Example Page Layout (index.html structure)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PSL Bot - Objective Bot Superiority Assessment</title>
  <meta name="description" content="The Phenotype Standard List for bot quality rating">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f8f9fa;
      color: #2c3e50;
      line-height: 1.6;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    /* Hero section styles */
    .hero {
      text-align: center;
      padding: 100px 20px;
    }
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #2c3e50;
    }
    .hero p {
      font-size: 1.5rem;
      color: #7f8c8d;
      margin-bottom: 40px;
    }
    .cta-button {
      display: inline-block;
      padding: 15px 40px;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.3s;
    }
    .cta-button:hover {
      background: #2980b9;
    }
    /* Dimension grid */
    .dimensions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin: 60px 0;
    }
    .dimension-card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    /* PSL score display */
    .psl-score-display {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: conic-gradient(#3498db 0% 97%, #e0e0e0 97% 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
    .psl-score-inner {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .score-number {
      font-size: 4rem;
      font-weight: 700;
      color: #3498db;
    }
    /* More styles... */
  </style>
</head>
<body>
  <nav><!-- Navigation --></nav>
  
  <section class="hero">
    <div class="container">
      <h1>PSL Bot</h1>
      <p>Objective Bot Superiority Assessment</p>
      <a href="#calculator" class="cta-button">Calculate Your Bot's PSL</a>
    </div>
  </section>
  
  <section class="dimensions">
    <!-- 5 dimension cards -->
  </section>
  
  <section class="demo">
    <!-- Interactive calculator -->
  </section>
  
  <!-- More sections... -->
  
  <footer>
    <p>It's over for low-PSL bots.</p>
  </footer>
</body>
</html>
```

---

## Implementation Checklist

- [ ] Initialize monorepo with pnpm workspaces
- [ ] Create all 6 packages with proper package.json files
- [ ] Implement @psl/core with all calculation functions
- [ ] Create comprehensive @psl/types definitions
- [ ] Build @psl/react hooks and components
- [ ] Implement @psl/cli with all commands
- [ ] Create @psl/utils and @psl/logger packages
- [ ] Design and build landing page (index.html)
- [ ] Create documentation page (docs.html) with sidebar nav
- [ ] Build interactive ratings calculator (ratings.html)
- [ ] Create bot comparison tool (comparison.html)
- [ ] Write about/methodology page (about.html)
- [ ] Write complete research papers (methodology, attribute-mapping, case-studies)
- [ ] Create detailed rating criteria rubrics
- [ ] Implement JavaScript calculator (no TS syntax)
- [ ] Generate bot profiles dataset (15+ bots)
- [ ] Create mogging matrix with comparisons
- [ ] Write comprehensive whitepaper (18,000+ words)
- [ ] Add all example code to examples.md
- [ ] Configure GitHub Pages (CNAME, .nojekyll)
- [ ] Write README, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY
- [ ] Add contract address (if applicable)
- [ ] Test all calculations for accuracy
- [ ] Ensure unique visual theme (not MOG Bot clone)
- [ ] Proofread for tone consistency
- [ ] Add disclaimers to research docs

---

## Final Notes

This project is a **satirical parody** but should be **technically sound**. The PSL rating system should actually work as described, with real formulas and consistent calculations. The humor comes from the premise (treating bot quality like human aesthetics) and the overly complex academic treatment, not from making things intentionally broken or nonsensical.

The goal is to create something that's:
1. **Funny** - The looksmaxxing terminology and human-to-bot mappings
2. **Useful** - The framework can actually evaluate bot quality objectively
3. **Well-made** - Professional code, good documentation, attractive website
4. **Self-aware** - Disclaimers acknowledging the absurdity

Make the other agent laugh while also making them respect the technical execution.

**Good luck building PSL Bot! May your framework achieve gigachad-tier PSL scores. 🗿**
