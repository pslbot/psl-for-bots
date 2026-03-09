# Security Policy

## Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not open public GitHub issues for security vulnerabilities.**

Instead, report security vulnerabilities via:

### GitHub Security Advisories (Preferred)

1. Navigate to the [Security tab](https://github.com/yourusername/psl-bot/security)
2. Click "Report a vulnerability"
3. Fill out the vulnerability report form

### Email (Alternative)

Send details to: **security@psl-bot.dev** (fictional - use GitHub in practice)

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Status Updates**: Every 14 days until resolved
- **Disclosure Timeline**: Coordinated disclosure after fix is released

### Public Disclosure

We follow **coordinated disclosure**:

1. Reporter notifies maintainers privately
2. Maintainers develop and test fix
3. Fix deployed to npm packages
4. Security advisory published on GitHub
5. Reporter credited (unless anonymity requested)

**Timeline**: Typically 30-90 days from report to public disclosure.

## Security Best Practices for Users

### Dependency Management

PSL Bot packages have minimal dependencies, but you should still:

```bash
# Audit your project dependencies
pnpm audit

# Update PSL Bot packages regularly
pnpm update @psl/core @psl/types
```

### Input Validation

If accepting user input for bot attributes (e.g., in web form):

```typescript
import { validateBotAttributes } from '@psl/core'

// Validate user input before calculation
const isValid = validateBotAttributes(userInput)
if (!isValid) {
  throw new Error('Invalid bot attributes')
}

const result = calculatePSL(userInput)
```

**Why?**: Prevents malicious input causing calculation errors or DoS.

### API Rate Limiting

If exposing PSL calculations via API:

```typescript
// Example using Express + rate-limit
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use('/api/psl', limiter)
```

**Why?**: Prevents abuse of compute-intensive PSL calculations.

### Sanitize External Data

If fetching bot data from external APIs (GitHub, NPM):

```typescript
// Sanitize GitHub stars (could be spoofed in response)
const stars = Math.max(0, Math.min(10000000, parseInt(data.stars)))

// Sanitize downloads (prevent logarithm of negative number)
const downloads = Math.max(0, parseInt(data.downloads))
```

**Why?**: External API responses could be manipulated to cause crashes.

## Known Security Considerations

### 1. Logarithmic Calculations

```typescript
// Market presence uses log₁₀(stars + 1)
// Edge case: stars = -1 would cause log(0) = -Infinity
```

**Mitigation**: Input validation ensures stars >= 0.

### 2. Floating Point Precision

```typescript
// PSL scores are 0-10 floats
// Edge case: Rounding errors could cause PSL > 10 or < 0
```

**Mitigation**: Clamp PSL scores: `Math.max(0, Math.min(10, psl))`

### 3. Mogging Coefficient Overflow

```typescript
// μ = ΔPSL × V × 100 could theoretically overflow
// Edge case: ΔPSL = 10, V = 2.0 → μ = 2000
```

**Mitigation**: Acceptable (mogging coefficient unbounded by design). No integer overflow in JavaScript (uses IEEE 754 doubles).

### 4. Dependency Chain

PSL Bot has minimal dependencies to reduce attack surface:

- `@psl/types`: Zero dependencies
- `@psl/core`: Zero runtime dependencies (dev: TypeScript, Vitest)
- `@psl/react`: Dependencies: React (peer)
- `@psl/cli`: Dependencies: Commander

**Regular audits**: `pnpm audit` run on CI for every commit.

## Vulnerability Disclosure Examples

### Example: Denial of Service via Large Numbers

**Report**:
> Passing extremely large values for `githubStars` (e.g., 10^308) causes `log₁₀()` calculation to return Infinity, breaking PSL calculation.

**Fix**:
```typescript
// Cap stars at realistic maximum
const MAX_STARS = 10_000_000 // 10 million
const sanitizedStars = Math.min(stars, MAX_STARS)
```

**Advisory**:
> PSL Bot 1.0.1 fixes denial of service via uncapped logarithmic inputs. Users should upgrade to v1.0.1+.

### Example: Prototype Pollution

**Report**:
> Passing object with `__proto__` in bot attributes could pollute Object prototype.

**Fix**:
```typescript
// Use null-prototype object for attributes
const attrs = Object.create(null)
Object.assign(attrs, userInput)
```

**Advisory**:
> PSL Bot 1.0.2 fixes prototype pollution via malicious attribute input.

## Security Tooling

### Automated Scanning

We use:
- **Dependabot**: Automated dependency updates
- **CodeQL**: Automated code scanning for vulnerabilities
- **npm audit**: Run on every CI build

### Manual Review

- Security-sensitive PRs reviewed by 2+ maintainers
- External security audit requested for v1.0 release (fictional)

## Bug Bounty

**Status**: No formal bug bounty program (yet).

**Recognition**:
- Security researchers credited in SECURITY.md and release notes
- Severe vulnerabilities: Hall of Fame entry (coming soon)

**Future**: Considering bug bounty program if funding secured.

## Severity Classification

We use CVSS 3.1 scoring:

- **Critical (9.0-10.0)**: Immediate patch release
- **High (7.0-8.9)**: Patch within 7 days
- **Medium (4.0-6.9)**: Patch within 30 days
- **Low (0.1-3.9)**: Patch in next regular release

## Incident Response Plan

In case of active exploit:

1. **Assess severity** (CVSS score)
2. **Develop fix** (within 24 hours for critical)
3. **Test fix** (automated + manual)
4. **Emergency release** (bypass normal release schedule)
5. **Publish advisory** (GitHub Security Advisory)
6. **Notify users** (GitHub Releases, Twitter, npm deprecation notice if severe)

## Security Contacts

- **GitHub Security Advisories**: Preferred method
- **Email**: security@psl-bot.dev (fictional)
- **Maintainers**: Listed in [MAINTAINERS.md](./MAINTAINERS.md) (fictional file)

## PGP Key (Optional)

For highly sensitive reports, encrypt email with:

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
[Fictional PGP key would go here]
-----END PGP PUBLIC KEY BLOCK-----
```

Key fingerprint: `XXXX XXXX XXXX XXXX XXXX` (fictional)

## Questions?

- **General security questions**: Open GitHub Discussion
- **Specific vulnerability**: Use private reporting methods above

---

**Remember**: Security is everyone's responsibility. If you see something, say something (privately).

**"It's over for unpatched bots."** 🔒🗿
