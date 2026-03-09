# Rating Criteria for PSL Bot Components

## Overview

This guide provides detailed 0-10 scoring rubrics for all 20 PSL components across 5 dimensions. Each component includes definition, measurement protocol, common pitfalls, and example anchors for calibration.

---

## Dimension 1: Architectural Symmetry (AS)

### 1.1 Package Symmetry (0-10)

**Definition**: Consistency and balance in module/folder organization and dependency structure.

**Measurement Protocol**:
1. Examine project structure (folders, files, naming patterns)
2. Analyze dependency graph (circular dependencies, depth distribution)
3. Review package subdivision (monorepo organization)
4. Score based on rubric below

**Scoring Rubric**:

- **10/10 - Exemplary Symmetry**
  - Perfect folder hierarchy (max 3-4 levels deep)
  - Zero circular dependencies
  - Logical module grouping (components, utils, types)
  - Clear separation of concerns
  - *Example: React core library - minimal, focused structure*

- **8-9/10 - Strong Symmetry**
  - Consistent folder patterns
  - 1-2 minor circular dependencies
  - Mostly logical grouping
  - *Example: Vue.js - well-organized with minor legacy compromises*

- **6-7/10 - Adequate Symmetry**
  - Recognizable structure but some inconsistencies
  - 3-5 circular dependencies
  - Some misplaced modules
  - *Example: Express - functional but aging patterns*

- **4-5/10 - Weak Symmetry**
  - Inconsistent patterns (mix of flat/nested)
  - 5-10 circular dependencies
  - Unclear module boundaries
  - *Example: Large legacy codebases*

- **2-3/10 - Poor Symmetry**
  - Chaotic structure
  - >10 circular dependencies
  - No clear organizing principle
  - *Example: Abandoned projects grown organically*

- **0-1/10 - Critical Failure**
  - Unfathomable chaos
  - Massive circular dependency web
  - *Example: Worst possible state*

**Common Pitfalls**:
- Halo effect: Popular bots assumed symmetric
- Monorepo confusion: Multiple packages ≠ asymmetry if well-organized
- Legacy tolerance: Old ≠ automatically asymmetric

---

### 1.2 API Consistency (0-10)

**Definition**: Uniformity in function signatures, naming patterns, and parameter ordering across API surface.

**Measurement Protocol**:
1. Review API documentation
2. Analyze function signature patterns
3. Check parameter ordering consistency (options object vs ordered params)
4. Evaluate naming conventions

**Scoring Rubric**:

- **10/10 - Perfect Consistency**
  - Uniform function signatures (either all options objects OR all ordered params)
  - Consistent naming (all camelCase, clear verb-noun patterns)
  - Predictable return types
  - *Example: React Hooks - useState, useEffect, useContext all follow same pattern*

- **8-9/10 - Strong Consistency**
  - Minor inconsistencies (1-2 exceptions)
  - Mostly predictable patterns
  - *Example: Lodash - functions follow patterns but _ prefix convention can confuse*

- **6-7/10 - Adequate Consistency**
  - Multiple patterns coexist (mix of styles)
  - Some functions break conventions
  - *Example: Express - middleware signature vs router signature differ*

- **4-5/10 - Weak Consistency**
  - Inconsistent patterns dominate
  - Parameter ordering varies wildly
  - *Example: jQuery - $ namespace has wildly different signatures*

- **2-3/10 - Poor Consistency**
  - No apparent consistency
  - Each function unique snowflake
  - *Example: Legacy codebases with multiple contribu authors, no style guide*

- **0-1/10 - Chaotic**
  - Actively misleading naming
  - Incomprehensible inconsistency

**Common Pitfalls**:
- Private API inclusion: Score public API only
- Documentation vs reality: Test actual behavior
- Framework vs library: Libraries need higher consistency

---

### 1.3 Naming Uniformity (0-10)

**Definition**: Standardization of naming conventions (camelCase, PascalCase, kebab-case) across codebase.

**Measurement Protocol**:
1. Browser code browsing tool for variables, functions, classes
2. Count convention violations
3. Assess clarity and predictability

**Scoring Rubric**:

- **10/10 - Perfect Uniformity**
  - Zero convention violations
  - Clear rules: camelCase functions, PascalCase classes, UPPER_CASE constants
  - *Example: TypeScript projects with strict linting*

- **8-9/10 - Strong Uniformity**
  - 1-3% violation rate
  - Legacy exceptions documented
  - *Example: Well-maintained projects mid-migration*

- **6-7/10 - Adequate Uniformity**
  - 5-10% violations
  - Multiple conventions coexist
  - *Example: Projects without enforcement*

- **4-5/10 - Weak Uniformity**
  - 10-20% violations
  - Inconsistent patterns common
  - *Example: Projects with multiple contributors, no style guide*

- **2-3/10 - Poor Uniformity**
  - 20-40% violations
  - Naming chaos
  - *Example: Abandoned projects with multiple rewrites*

- **0-1/10 - Anarchic**
  - No conventions
  - Every file different style

**Common Pitfalls**:
- Language differences: Python snake_case vs JS camelCase not a violation
- Legacy burden: Old code shouldn't tank score if isolated
- Framework conventions: React Components (PascalCase) are consistent, not violations

---

### 1.4 Hierarchy Balance (0-10)

**Definition**: Evenness of dependency tree depth and breadth; avoidance of deep nesting or flat chaos.

**Measurement Protocol**:
1. Generate dependency graph
2. Calculate depth distribution (mean, std dev)
3. Check for balanced fan-out (Goldilocks: 3-7 children per node)

**Scoring Rubric**:

- **10/10 - Optimal Balance**
  - Depth: 3-5 levels average
  - Fan-out: 3-7 children per parent
  - Standard deviation: < 1.0
  - *Example: React - components, hooks, reconciler clearly layered*

- **8-9/10 - Good Balance**
  - Depth: 2-6 levels
  - Some nodes with 8-10 children
  - Std dev: 1.0-1.5
  - *Example: Vue - mostly balanced with some wider nodes*

- **6-7/10 - Acceptable Balance**
  - Depth: varies 1-8 levels
  - Mix of deep and flat
  - Std dev: 1.5-2.5
  - *Example: Express - middleware chains can nest deeply*

- **4-5/10 - Poor Balance**
  - Extreme depth (>10 levels) OR extreme flatness
  - Std dev: 2.5-4.0
  - *Example: Webpack - plugin dependencies create deep nests*

- **2-3/10 - Critical Imbalance**
  - Pathological trees (>15 levels)
  - OR completely flat (100+ modules at root)
  - *Example: Legacy monoliths*

- **0-1/10 - Catastrophic**
  - Unusable structure

**Common Pitfalls**:
- Monorepo packages: Measure within packages, not across
- Tool vs library: Build tools may need more depth
- Optional dependencies: Count required dependencies only

---

## Dimension 2: Feature Prominence (FP)

### 2.1 Functional Distinctiveness (0-10)

**Definition**: Uniqueness and memorability of core functionality compared to alternatives.

**Measurement Protocol**:
1. Identify 2-3 core features
2. Compare to 3-5 competitors
3. Assess "elevator pitch" clarity
4. Measure recognition in blind tests (fictional)

**Scoring Rubric**:

- **10/10 - Revolutionary**
  - Pioneered new paradigm
  - "Name recognition" instant
  - *Example: React - Virtual DOM invented category*

- **8-9/10 - Highly Distinctive**
  - Clear differentiation from competitors
  - Strong USP
  - *Example: Vite - instant dev server is killer feature*

- **6-7/10 - Somewhat Distinctive**
  - Identifiable differences but incremental
  - *Example: Fastify - "faster Express" is clear but not revolutionary*

- **4-5/10 - Weakly Distinctive**
  - Minor differences from competition
  - Struggles to articulate USP
  - *Example: Many me-too frameworks*

- **2-3/10 - Generic**
  - No meaningful differentiation
  - Commodity functionality
  - *Example: Generic utility libraries*

- **0-1/10 - Indistinguishable**
  - Exact clone of existing tool

  **Common Pitfalls**:
- Confusing features with distinctiveness: Many features ≠ distinctive
- Implementation vs concept: TypeScript ≠ distinctive, gradual typing concept = distinctive
- Market vs product: Popular ≠ distinctive (score product, not reach)

---

### 2.2 USP Strength (0-10)

**Definition**: Clarity and compelling nature of Unique Selling Proposition.

**Measurement Protocol**:
1. Extract USP from homepage/README
2. Test against "So what?" question
3. Compare to competitor USPs
4. Assess quantifiable claims

**Scoring Rubric**:

- **10/10 - Killer USP**
  - Solves critical pain point clearly
  - Quantifiable benefits
  - *Example: Vite - "Instant dev server startup" (measurable: 0.1s vs 30s)*

- **8-9/10 - Strong USP**
  - Clear value proposition
  - Verifiable claims
  - *Example: Fastify - "Fast HTTP server" (benchmarks included)*

- **6-7/10 - Moderate USP**
  - Identifiable but not compelling
  - *Example: Lodash - "Utility library" (true but generic)*

- **4-5/10 - Weak USP**
  - Vague claims ("better", "modern")
  - Unquantified benefits
  - *Example: Many "modern" frameworks without specifics*

- **2-3/10 - Absent USP**
  - No clear differentiation
  - Buzzword soup
  - *Example: Generic wrappers*

- **0-1/10 - Negative USP**
  - Anti-features promoted

**Common Pitfalls**:
- Confusing claims with proof: "10x faster" needs benchmarks
- Feature lists ≠ USP: 100 features without theme = weak USP
- Jargon opacity: USP must be clear to target audience

---

### 2.3 Discoverability (0-10)

**Definition**: Ease of finding the bot via search, recommendations, and community visibility.

**Measurement Protocol**:
1. Google search rank for category keywords
2. Presence in "awesome" lists, curated directories
3. StackOverflow mentions
4. Tutorial/course availability

**Scoring Rubric**:

- **10/10 - Dominant Presence**
  - First result for category search
  - Featured in all major lists
  - 10,000+ SO questions
  - *Example: React - "UI framework" returns React first*

- **8-9/10 - Highly Discoverable**
  - Top 3 results
  - In major awesome lists
  - 1,000-10,000 SO questions
  - *Example: Vue, Vite - well known, easily found*

- **6-7/10 - Moderately Discoverable**
  - Top 10 results
  - Some curated list presence
  - 100-1,000 SO questions
  - *Example: Fastify, Hono - known in community but not mainstream*

- **4-5/10 - Weakly Discoverable**
  - Page 2+ in search
  - Obscure list presence only
  - <100 SO questions
  - *Example: Niche tools*

- **2-3/10 - Obscure**
  - Difficult to find even with specific search
  - No list presence
  - *Example: Personal projects, early stage*

- **0-1/10 - Invisible**
  - Cannot be found via normal channels

**Common Pitfalls**:
- SEO gaming: Paid ads ≠ organic discoverability
- Temporal bias: New bots legitimately less discoverable
- Category saturation: Harder to discover in crowded categories (not a penalty)

---

### 2.4 Marketing Clarity (0-10)

**Definition**: Effectiveness of homepage, README, and pitch in communicating value proposition.

**Measurement Protocol**:
1. Review homepage/README first impression
2. Assess "5-second test" (can visitor explain purpose?)
3. Check for jargon density, examples, visual aids
4. Evaluate call-to-action clarity

**Scoring Rubric**:

- **10/10 - Crystal Clear**
  - Purpose obvious in 5 seconds
  - Visual examples on homepage
  - Zero jargon in opening pitch
  - *Example: React.dev - "A JavaScript library for building user interfaces" + interactive demo*

- **8-9/10 - Very Clear**
  - Purpose clear in 10-15 seconds
  - Good examples
  - Minimal jargon
  - *Example: Vite - "Next Generation Frontend Tooling" + feature highlights*

- **6-7/10 - Adequate Clarity**
  - Purpose discernible but requires reading
  - Some jargon
  - *Example: Many npm packages - README explains but not immediately*

- **4-5/10 - Unclear**
  - Jargon-heavy
  - Purpose buried in text
  - No examples
  - *Example: Academic projects with theory-first explanations*

- **2-3/10 - Opaque**
  - Cannot determine purpose without deep reading
  - Indecipherable jargon
  - *Example: Internal tools open-sourced without context*

- **0-1/10 - Incomprehensible**
  - Actively misleading messaging

**Common Pitfalls**:
- Insider curse: What's obvious to maintainers ≠ obvious to newcomers
- Feature dumping: Listing 50 features ≠ clarity
- Assuming context: "Modern X for Y" requires knowing X and Y

---

## Dimension 3: Harmonic Cohesion (HC)

### 3.1 API Cohesion (0-10)

**Definition**: Integration quality between different API features; how well parts work together.

**Measurement Protocol**:
1. Try combining 3-4 features in single use case
2. Check for impedance mismatches (type conversions, adapters needed)
3. Assess composition elegance
4. Review cross-feature documentation

**Scoring Rubric**:

- **10/10 - Seamless Integration**
  - Features compose naturally
  - No adapters needed
  - Shared types/concepts
  - *Example: React Hooks - useState/useEffect/useContext compose perfectly*

- **8-9/10 - Strong Integration**
  - Features work well together
  - Minor type massaging needed
  - *Example: Lodash - chain() composes functions elegantly*

- **6-7/10 - Adequate Integration**
  - Features work but with glue code
  - Some type incompatibilities
  - *Example: Express - middleware sometimes needs wrappers for async*

- **4-5/10 - Weak Integration**
  - Features feel siloed
  - Significant adapter code needed
  - *Example: jQuery - plugins often conflict*

- **2-3/10 - Poor Integration**
  - Features don't compose
  - Conflicts common
  - *Example: Legacy projects with multiple paradigms*

- **0-1/10 - Hostile**
  - Features actively conflict

**Common Pitfalls**:
- Confusing breadth with cohesion: Many features ≠ cohesive
- Missing nuance: Partial integration (6/10) often better than forcing (4/10)
- Framework vs library: Libraries need higher cohesion

---

### 3.2 Type Consistency (0-10)

**Definition**: TypeScript/Flow type coverage, accuracy, and consistency across codebase.

**Measurement Protocol**:
1. Check TypeScript support (native vs @types)
2. Audit type coverage percentage
3. Test type safety (any usage rate)
4. Verify type exports

**Scoring Rubric**:

- **10/10 - Exemplary Types**
  - 100% TypeScript native
  - Zero any escapes
  - Full generics support
  - *Example: Modern TS-first libraries*

- **8-9/10 - Strong Types**
  - Native TS or excellent @types
  - <5% any usage
  - Good generics
  - *Example: React - @types/react is comprehensive*

- **6-7/10 - Adequate Types**
  - @types available but incomplete
  - 5-15% any usage
  - *Example: Express - @types exists but some gaps*

- **4-5/10 - Weak Types**
  - Partial @types coverage
  - 15-30% any usage
  - *Example: Older libraries with retrofitted types*

- **2-3/10 - Minimal Types**
  - Barely usable @types
  - 30-50% any
  - *Example: Legacy JavaScript libraries*

- **0-1/10 - No Types**
  - No TypeScript support
  - Pure JavaScript without type hints

**Common Pitfalls**:
- Native bias: Excellent @types/pkg (9/10) ≈ native TS
- JavaScript projects: Score based on available support, not language choice
- Coverage vs quality: 100% coverage with any everywhere = poor types

---

### 3.3 Error Handling (0-10)

**Definition**: Quality of error messages, error recovery, and debugging ergonomics.

**Measurement Protocol**:
1. Trigger 3-5 common errors deliberately
2. Assess error message clarity
3. Check stack trace quality
4. Review error recovery documentation

**Scoring Rubric**:

- **10/10 - Exemplary Handling**
  - Errors include fix suggestions
  - Stack traces clean and relevant
  - Error codes documented
  - *Example: Rust compiler errors - gold standard*

- **8-9/10 - Excellent Handling**
  - Clear error messages
  - Actionable information
  - Good stack traces
  - *Example: React - component errors show source location*

- **6-7/10 - Adequate**
  - Errors comprehensible
  - Stack traces present but noisy
  - *Example: Most frameworks*

- **4-5/10 - Poor Handling**
  - Vague error messages
  - Stack traces unhelpful
  - *Example: Webpack - infamous cryptic errors*

- **2-3/10 - Critical Failures**
  - Silent failures OR
  - Error messages provide no actionable info
  - *Example: Legacy systems*

- **0-1/10 - Catastrophic**
  - Crashes without messages
  - Stack traces corrupted

**Common Pitfalls**:
- Language limitations: JavaScript stack traces inherently noisier than Rust
- Framework vs library: Frameworks need better error UX
- Error frequency: Rare errors with poor messages ≠ critical issue

---

### 3.4 Documentation (0-10)

**Definition**: Completeness, accuracy, and accessibility of documentation.

**Measurement Protocol**:
1. Check for: API reference, guides, examples, migration docs
2. Test search functionality
3. Verify code examples run
4. Assess up-to-dateness (last updated)

**Scoring Rubric**:

- **10/10 - Exemplary Docs**
  - Interactive examples
  - Comprehensive API reference
  - Guides for all levels
  - Searchable site
  - Updated regularly
  - *Example: React.dev, Vite.dev*

- **8-9/10 - Excellent Docs**
  - Good API coverage
  - Multiple guides
  - Examples present
  - *Example: Vue, Fastify*

- **6-7/10 - Adequate Docs**
  - API reference complete
  - Basic guides
  - Some examples outdated
  - *Example: Express - docs exist but aging*

- **4-5/10 - Poor Docs**
  - Incomplete API reference
  - Few examples
  - Outdated
  - *Example: Many npm packages*

- **2-3/10 - Minimal Docs**
  - README only
  - No examples
  - *Example: Early projects*

- **0-1/10 - No Docs**
  - Code is documentation (worst case)

**Common Pitfalls**:
- Length ≠ quality: 1000 pages of generated API docs < 50 pages of guided tutorials
- Freshness matters: Outdated docs actively harmful
- Examples critical: API reference without runnable examples = 7/10 max

---

## Dimension 4: Market Presence (MP)

### 4.1 GitHub Stars (logarithmic 0-10)

**Definition**: Repository popularity measured by GitHub stars, normalized logarithmically.

**Measurement Formula**:
```
score = log₁₀(stars + 1) / 5.5 × 10
```

**Interpretation**:
- 100 stars: ~4.0
- 1,000 stars: ~5.5
- 10,000 stars: ~7.3
- 50,000 stars: ~8.5
- 100,000 stars: ~9.1
- 200,000 stars: ~9.5
- 1,000,000 stars: ~10.0

**Examples**:
- React (223K stars): 9.8/10
- Vite (64K stars): 8.9/10  
- Express (63K stars): 8.9/10
- Lodash (58K stars): 8.8/10

**Common Pitfalls**:
- Star inflation: Bots gaming GitHub stars detectable via velocity analysis
- Temporal bias: Older bots accumulated stars longer (not inherently unfair)
- Monorepo counting: Count main package, not meta-repo

---

### 4.2 NPM Weekly Downloads (logarithmic 0-10)

**Definition**: Package adoption measured by NPM weekly downloads, normalized logarithmically.

**Measurement Formula**:
```
score = log₁₀(downloads + 1) / 7.5 × 10
```

**Interpretation**:
- 1K downloads/week: ~4.0
- 10K downloads/week: ~5.3
- 100K downloads/week: ~6.7
- 1M downloads/week: ~8.0
- 10M downloads/week: ~9.3
- 50M downloads/week: ~10.0

**Examples**:
- React (20M downloads): 9.7/10
- Lodash (50M downloads): 10/10
- Express (25M downloads): 9.8/10
- Vite (9M downloads): 9.2/10

**Common Pitfalls**:
- Bot downloads: CI/CD bots inflate numbers (adjust if obvious)
- Dependency inflation: Transitive dependencies counted (feature, not bug)
- Temporal: Weekly fluctuations (use 90-day moving average)

---

### 4.3 Community Score (0-10)

**Definition**: Activity and health of community (Discord, forums, conferences, tutorials).

**Measurement Protocol**:
1. Check Discord/Slack member count
2. Review conference presence (talks, booths)
3. Count tutorials (YouTube, blogs, courses)
4. Assess responsiveness (GitHub issues, Discord)

**Scoring Rubric**:

- **10/10 - Thriving Community**
  - 50K+ Discord members
  - Annual conference
  - 1000+ tutorials
  - *Example: React - massive community*

- **8-9/10 - Strong Community**
  - 10-50K Discord
  - Major conference tracks
  - 500-1000 tutorials
  - *Example: Vue, Svelte*

- **6-7/10 - Moderate Community**
  - 1-10K Discord
  - Conference talks
  - 100-500 tutorials
  - *Example: Fastify, Zustand*

- **4-5/10 - Small Community**
  - <1K Discord
  - Some tutorials
  - *Example: Emerging tools*

- **2-3/10 - Minimal Community**
  - GitHub issues only
  - Few tutorials
  - *Example: Niche libraries*

- **0-1/10 - Ghost Town**
  - No community presence

**Common Pitfalls**:
- Size vs health: 100K inactive Discord < 5K active
- Paid community: Gated communities count if active
- GitHub-only acceptable: Some projects thrive without Discord

---

### 4.4 Docs Site Score (0-10)

**Definition**: Quality of dedicated documentation website (not README).

**Measurement Protocol**:
1. Check for dedicated site (docs.example.com)
2. Assess design quality (modern, accessible)
3. Test search functionality
4. Review mobile experience
5. Check for interactive examples

**Scoring Rubric**:

- **10/10 - Exemplary Site**
  - Beautiful design
  - Fast search
  - Interactive playgrounds
  - Mobile optimized
  - *Example: react.dev, vitejs.dev*

- **8-9/10 - Excellent Site**
  - Professional design
  - Good search
  - Code examples
  - *Example: vuejs.org, fastify.io*

- **6-7/10 - Good Site**
  - Functional design
  - Basic search
  - Static examples
  - *Example: expressjs.com (aging but functional)*

- **4-5/10 - Basic Site**
  - Simple design
  - No search
  - Limited examples
  - *Example: Many GitHub Pages sites*

- **2-3/10 - Minimal Site**
  - Barely more than README
  - Poor navigation
  - *Example: Auto-generated sites*

- **0-1/10 - No Site**
  - README only (defaults to 0)

**Common Pitfalls**:
- Design bias: Ugly but complete > beautiful but incomplete
- README sites: GitHub README as "site" = 0/10 (use 4.4 Documentation for content)
- Hosting matters: Fast CDN > slow self-hosted

---

## Dimension 5: Scalability Potential (SP)

### 5.1 Horizontal Scaling (0-10)

**Definition**: Ability to scale across multiple instances, servers, or compute units.

**Measurement Protocol**:
1. Check for stateless design
2. Review distributed system support (clustering, sharding)
3. Test multi-instance scenarios
4. Assess edge deployment support

**Scoring Rubric**:

- **10/10 - Infinite Scaling**
  - Fully stateless
  - Native clustering support
  - Edge-ready
  - *Example: Cloudflare Workers compatible bots*

- **8-9/10 - Excellent Scaling**
  - Mostly stateless
  - Clustering available
  - Multi-region capable
  - *Example: Fastify, Hono*

- **6-7/10 - Good Scaling**
  - Scales with external state management
  - Basic clustering
  - *Example: Express with Redis*

- **4-5/10 - Limited Scaling**
  - Requires sticky sessions
  - Vertical scaling primarily
  - *Example: Stateful frameworks*

- **2-3/10 - Poor Scaling**
  - Single instance design
  - State embedded
  - *Example: Desktop apps ported to web*

- **0-1/10 - No Scaling**
  - Cannot scale horizontally

**Common Pitfalls**:
- Client vs server: UI libraries (React) score on component scalability, not server scaling
- Scaling abstraction: Library + scaling tool (e.g., PM2) counts
- Edge: Edge-first (10/10) vs edge-compatible (8/10) distinction

---

### 5.2 Performance (0-10)

**Definition**: Speed and efficiency measured via benchmarks relative to category average.

**Measurement Protocol**:
1. Run standard benchmarks (TechEmpower, JS Framework Benchmark)
2. Calculate percentile rank within category
3. Assess bundle size (for client libs)
4. Review memory efficiency

**Scoring Rubric**:

- **10/10 - Elite Performance**
  - Top 5% in category benchmarks
  - Minimal overhead
  - *Example: frameworks with near-native speed*

- **8-9/10 - Excellent Performance**
  - Top 10-20% in category
  - Low overhead
  - *Example: Vite (fast builds), Fastify (fast server)*

- **6-7/10 - Good Performance**
  - Above average (40-60th percentile)
  - Acceptable overhead
  - *Example: React (good but not fastest)*

- **4-5/10 - Below Average**
  - 20-40th percentile
  - Noticeable overhead
  - *Example: Express (functional but not fast)*

- **2-3/10 - Poor Performance**
  - Bottom 20%
  - Significant overhead
  - *Example: Heavy frameworks, large bundles*

- **0-1/10 - Unusable**
  - Pathologically slow

**Common Pitfalls**:
- Microbenchmarks: Real-world > synthetic
- Category comparison: Compare within category only (UI vs server invalid)
- Bundle size for libs: <50KB good, 50-150KB acceptable, >150KB poor

---

### 5.3 Extensibility (0-10)

**Definition**: Quality of plugin/extension API and ecosystem richness.

**Measurement Protocol**:
1. Review plugin API documentation
2. Count plugins/extensions (quality over quantity)
3. Test plugin development experience
4. Assess plugin conflicts

**Scoring Rubric**:

- **10/10 - Exemplary Ecosystem**
  - Rich plugin API
  - 1000+ plugins
  - Well-documented extension points
  - *Example: Webpack (ironically, plugin system good despite overall AS issues)*

- **8-9/10 - Strong Ecosystem**
  - Good plugin API
  - 100-1000 plugins
  - Examples available
  - *Example: Vite, Rollup*

- **6-7/10 - Moderate Ecosystem**
  - Basic plugin support
  - 20-100 plugins
  - *Example: Fastify (growing ecosystem)*

- **4-5/10 - Limited Ecosystem**
  - Minimal plugin API
  - <20 plugins
  - *Example: New frameworks*

- **2-3/10 - Poor Ecosystem**
  - No plugin system OR
  - Broken plugin system
  - *Example: Abandoned projects*

- **0-1/10 - No Extensibility**
  - Closed system

**Common Pitfalls**:
- Quantity ≠ quality: 10 good plugins > 100 abandoned
- Monolithic acceptable: React core doesn't need plugins (extensibility via composition)
- Version fragmentation: Plugins requiring specific versions = extensibility penalty

---

### 5.4 Technical Debt (inverted 0-10)

**Definition**: Code smells, outdated dependencies, security issues, and maintenance burden. **Note: This score is inverted for PSL calculation** (high debt = low score contribution).

**Measurement Protocol**:
1. Run linter (count errors/warnings)
2. Check dependency freshness (outdated count)
3. Review security advisories
4. Assess test coverage
5. Calculate complexity metrics (cyclomatic complexity)

**Scoring Formula (debt level)**:
```
debt_level = 0-10 (0 = no debt, 10 = maximum debt)
contribution_to_SP = 10 - debt_level
```

**Debt Rubric**:

- **0-1 Debt (9-10 SP Contribution) - Pristine**
  - Zero security advisories
  - All deps current
  - 90%+ test coverage
  - Low complexity
  - *Example: Recently refactored modern projects*

- **2-3 Debt (7-8 SP Contribution) - Clean**
  - 1-2 low-severity advisories
  - Most deps current
  - 70-90% test coverage
  - *Example: Well-maintained projects*

- **4-5 Debt (5-6 SP Contribution) - Moderate**
  - 3-5 advisories
  - Some outdated deps
  - 50-70% test coverage
  - *Example: Average npm packages*

- **6-7 Debt (3-4 SP Contribution) - High**
  - 5-10 advisories
  - Many outdated deps
  - <50% test coverage
  - *Example: Aging projects*

- **8-9 Debt (1-2 SP Contribution) - Critical**
  - 10+ advisories
  - Critical security issues
  - No tests
  - *Example: Abandoned projects, Moment.js*

- **10 Debt (0 SP Contribution) - Terminal**
  - Actively harmful to use
  - *Example: Malware*

**Common Pitfalls**:
- False positives: Outdated deps with no breaking changes ≠ heavy debt
- Test coverage: 100% coverage ≠ good tests (but correlated)
- Advisories: Fixed advisories ≠ debt (score unfixed only)
- Language differences: JavaScript naturally more dependency-heavy

---

## Inter-Rater Reliability Protocol

### Calibration Training

To achieve ICC > 0.85:

**Phase 1: Anchoring (Day 1)**
- Rate 3 reference bots together (React, Express, Webpack)
- Discuss each score
- Resolve >1 point disagreements
- Codify local conventions

**Phase 2: Practice (Day 2-3)**
- Rate 5 practice bots independently
- Compare scores
- Identify systematic biases
- Iterate scoring guidelines

**Phase 3: Certification (Day 4)**
- Rate 3 holdout bots independently
- Calculate ICC
- If ICC < 0.80, repeat Phase 2
- If ICC ≥ 0.80, certified to rate

### Common Systematic Biases

1. **Halo Effect**: High MP → inflated AS/HC
   - Mitigation: Score dimensions in random order

2. **Recency Bias**: Recently used → higher scores
   - Mitigation: Include mix of familiar/unfamiliar bots

3. **Feature Counting**: More features → higher FP
   - Mitigation: Distinguish features from distinctiveness

4. **Scale Compression**: Reluctance to use 0-2, 9-10
   - Mitigation: Explicit anchors on extremes

5. **Category Confusion**: Comparing incomparable types
   - Mitigation: Compare within-category first

---

## Quick Reference: Score Thresholds

| Component | 9-10 | 7-8 | 5-6 | 3-4 | 0-2 |
|-----------|------|-----|-----|-----|-----|
| **Package Symmetry** | Perfect hierarchy | Consistent | Some patterns | Chaotic | Critical |
| **API Consistency** | Uniform signatures | Minor exceptions | Mixed patterns | Inconsistent | Chaotic |
| **Naming Uniformity** | Zero violations | <5% violations | 5-15% violations | 15-30% violations | No convention |
| **Hierarchy Balance** | 3-5 levels balanced | Mostly balanced | Mixed depth | Extreme depth/flat | Pathological |
| **Functional Distinctiveness** | Revolutionary | Highly unique | Somewhat unique | Generic | Clone |
| **USP Strength** | Killer USP | Strong claims | Moderate claims | Vague | None |
| **Discoverability** | Top 3 search | Top 10 search | Findable | Obscure | Invisible |
| **Marketing Clarity** | 5-sec clarity | 15-sec clarity | Readable | Unclear | Opaque |
| **API Cohesion** | Seamless | Strong integration | Adequate | Siloed | Hostile |
| **Type Consistency** | 100% TS native | Native or excellent @types | Adequate @types | Weak @types | No types |
| **Error Handling** | Fix suggestions | Clear messages | Adequate | Vague | Silent failures |
| **Documentation** | Interactive + complete | Comprehensive | API reference | Incomplete | README only |
| **GitHub Stars** | >100K | 10-100K | 1-10K | <1K | <100 |
| **NPM Downloads** | >10M/wk | 1-10M/wk | 100K-1M/wk | <100K/wk | <10K/wk |
| **Community Score** | 50K+ Discord, conference | 10-50K Discord | 1-10K Discord | <1K Discord | Ghost town |
| **Docs Site** | Interactive playground | Professional | Functional | Basic | None |
| **Horizontal Scaling** | Edge-ready stateless | Clustering support | External state mgmt | Sticky sessions | No scaling |
| **Performance** | Top 5% | Top 20% | Average (40-60%) | Below avg (20-40%) | Bottom 20% |
| **Extensibility** | 1000+ plugins | 100-1000 plugins | 20-100 plugins | <20 plugins | None |
| **Technical Debt (inverted)** | Pristine (0-1 debt) | Clean (2-3 debt) | Moderate (4-5 debt) | High (6-7 debt) | Critical (8-10 debt) |

---

**Disclaimer**: These rubrics provide structured guidance but require judgment. When in doubt, compare to benchmark bots (React 9.7, Express 7.7, Webpack 6.5) and apply relative scoring. Inter-rater reliability improves with practice and calibration.

**"Rate objectively, mog honestly."** 🗿
