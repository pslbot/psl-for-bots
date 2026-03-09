# Contributing to PSL Bot

Thank you for considering contributing to PSL Bot! Whether you're here for the satire, the substance, or both, we appreciate your interest.

## Code of Conduct

PSL Bot embraces **satirical software engineering**. We expect contributors to:
- Maintain the satirical tone while delivering functional code
- Respect that this project mocks tech industry tribalism, not individual developers
- Engage critically with the absurd premise (yes, comparing bots to human attractiveness is ridiculous)
- Focus contributions on the software, not personal attacks

## How to Contribute

### Reporting Issues

**Bug Reports**:
- Use GitHub Issues
- Include: steps to reproduce, expected behavior, actual behavior
- Provide PSL calculation examples if relevant

**Feature Requests**:
- Describe the use case
- Explain how it fits the satirical framework
- Bonus points for looksmaxxing terminology

**Research Contributions**:
- Fictional statistics are welcome (maintain satirical voice)
- Real empirical data also welcome (clearly document methodology)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**:
   - Follow existing code style (TypeScript, ESLint, Prettier)
   - Add tests for new functionality
   - Update documentation
   - Maintain satirical tone in comments/docs where appropriate
4. **Commit**: Use conventional commits (`feat:`, `fix:`, `docs:`, etc.)
5. **Push and open PR**: Describe changes, link related issues

**PR Review Process**:
- Maintainers review within 1 week
- Two approvals required for merge
- CI must pass (build, tests, linting)

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/psl-bot.git
cd psl-bot

# Install dependencies (requires pnpm)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint
pnpm lint

# Format
pnpm format
```

### Project Structure

```
psl-bot/
├── packages/
│   ├── types/          # TypeScript type definitions
│   ├── core/           # PSL calculation engine
│   ├── utils/          # Utility functions
│   ├── logger/         # Logging utilities
│   ├── react/          # React hooks and components
│   └── cli/            # Command-line interface
├── docs/               # GitHub Pages website
├── research/           # Research papers and data
│   ├── research/       # Methodology, case studies, whitepaper
│   ├── data/           # Bot profiles, mogging matrix
│   └── docs/           # Rating criteria
└── examples/           # Usage examples
```

### Coding Conventions

**TypeScript Style**:
```typescript
// ✅ Good: Descriptive names, explicit types
export function calculatePSL(
  attributes: BotAttributes,
  weights: DimensionWeights = DEFAULT_WEIGHTS
): PSLResult {
  // Implementation
}

// ❌ Bad: Unclear names, implicit types
export function calc(a, w = {}) {
  // Implementation
}
```

**Testing**:
```typescript
// Test structure using Vitest
describe('calculatePSL', () => {
  it('should calculate React PSL as 9.7', () => {
    const result = calculatePSL(REACT_ATTRIBUTES)
    expect(result.psl).toBeCloseTo(9.7, 1)
    expect(result.classification).toBe('Legendary (Gigachad)')
  })
  
  it('should handle edge cases (all zeros)', () => {
    const result = calculatePSL(ZERO_ATTRIBUTES)
    expect(result.psl).toBe(0)
  })
})
```

**Documentation**:
- Public APIs require JSDoc comments
- Include `@example` blocks
- Satirical asides welcome in comments

```typescript
/**
 * Calculates mogging coefficient between two bots.
 * 
 * Mogging requires visibility - you can't mog what nobody sees.
 * Formula: μ = ΔPSL × V × 100
 * 
 * @param bot1 - First bot's PSL result (the mogger)
 * @param bot2 - Second bot's PSL result (the moggee)
 * @returns Mogging result with coefficient and classification
 * 
 * @example
 * ```typescript
 * const react = calculatePSL(reactAttrs)
 * const webpack = calculatePSL(webpackAttrs)
 * const mogging = calculateMogging(react, webpack)
 * // { coefficient: 627, classification: 'Nuclear Mogging' }
 * // It's over for webpackcels
 * ```
 */
export function calculateMogging(
  bot1: PSLResult,
  bot2: PSLResult
): MoggingResult {
  // Implementation
}
```

### Adding New Bots to Profiles

Want to add a bot to `research/data/bot-profiles.json`?

1. Rate all 20 attributes (0-10 scale) using [rating criteria](research/docs/rating-criteria.md)
2. Calculate PSL using `@psl/core`
3. Add to JSON with metadata:

```json
{
  "id": "your-bot",
  "name": "Your Bot",
  "description": "What it does",
  "category": "Category",
  "psl": 7.5,
  "classification": "Above Average (HTN)",
  "percentile": 70,
  "dimensions": { ... },
  "attributes": { ... },
  "metadata": {
    "githubUrl": "...",
    "npmUrl": "...",
    "docsUrl": "..."
  }
}
```

4. Update mogging matrix with pairwise comparisons

### Research Contributions

**Expanding the Satire**:
- More case studies welcome (maintain analytical rigor + satirical voice)
- Additional bots in mogging matrix
- New attribute mappings (e.g., vocal tonality → API verbosity?)

**Fictional Statistics**:
- Keep them plausible (ICC=0.89 feels real, ICC=0.99 feels fake)
- Use proper statistical terminology
- Include appropriate caveats/disclaimers

**Real Empirical Studies**:
- Actually survey developers? Wild.
- Document methodology rigorously
- Clearly separate fiction from fact

### Website Improvements

The GitHub Pages site (`docs/`) welcomes:
- Design improvements (maintain "clinical precision" aesthetic)
- Interactive calculators/visualizations
- Mobile responsiveness fixes
- Accessibility enhancements

### CLI Enhancements

Ideas for `@psl/cli`:
- `psl-bot init` - Interactive setup for new projects
- `psl-bot track` - Track PSL over time from git history
- `psl-bot leaderboard` - Display top bots by category

### React Component Library

Ideas for `@psl/react`:
- `<DimensionRadar />` - Radar chart for dimensions
- `<MoggingVisualizer />` - Interactive mogging comparison
- `<PSLTimeline />` - Historical PSL evolution chart

## Architectural Decisions

### Why the Satirical Framing?

1. **Accessibility**: Looksmaxxing memes make technical content shareable
2. **Critique**: Framework wars ARE beauty contests; PSL makes it explicit
3. **Memorability**: "React is Gigachad-tier" stickier than "React has excellent metrics"
4. **Engagement**: Satire invites critical thinking, not passive consumption

### Why TypeScript?

- Type safety critical for score calculations (prevent invalid attribute ranges)
- Better DX for library consumers
- Self-documenting APIs via types

### Why Monorepo?

- Shared types across packages
- Coordinated releases
- Easier cross-package refactoring

### Why pnpm?

- Faster installs than npm/yarn
- Efficient disk usage (content-addressed storage)
- Strict dependency resolution (prevents phantom dependencies)

## Release Process

**Versioning**: Semantic versioning (semver)
- Major: Breaking changes
- Minor: New features (backward compatible)
- Patch: Bug fixes

**Release Steps** (maintainers only):
1. Update CHANGELOGs
2. Bump versions: `pnpm changeset version`
3. Build: `pnpm build`
4. Test: `pnpm test`
5. Publish: `pnpm changeset publish`
6. Tag: `git tag v1.2.3`
7. Push: `git push --tags`

## Recognition

Contributors will be acknowledged in:
- README.md Contributors section
- CHANGELOG.md for specific contributions
- Shoutouts in release notes

**Top Contributors** may earn flair:
- 🗿 Gigachad Contributor (10+ merged PRs)
- 📊 Research Contributor (published case studies/data)
- 🎨 Design Contributor (website/visualization improvements)

## Questions?

- **GitHub Discussions**: For questions, ideas, general discussion
- **GitHub Issues**: For bugs, feature requests
- **Twitter/X**: [@pslbot](https://twitter.com/pslbot) (fictional)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**"Contributing is mogging entropy. Be the Gigachad."** 🗿
