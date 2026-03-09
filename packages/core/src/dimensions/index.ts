/**
 * Dimension Calculations
 * 
 * Individual calculation functions for each of the five PSL dimensions.
 * Each dimension aggregates multiple component attributes into a 0-10 score.
 */

import type { BotAttributes } from '@psl/types';

/**
 * Calculate Architectural Symmetry dimension (25% weight)
 * 
 * Measures code structure uniformity and pattern consistency.
 * Based on the human aesthetic principle of facial symmetry indicating
 * genetic fitness translated to engineering discipline.
 * 
 * Formula: AS = (PackageSymmetry + APIConsistency + NamingUniformity + HierarchyBalance) / 40 × 10
 * 
 * @param attributes - Bot attributes
 * @returns Architectural Symmetry score (0-10)
 */
export function calculateArchitecturalSymmetry(attributes: BotAttributes): number {
  const sum =
    attributes.packageSymmetry +
    attributes.apiConsistency +
    attributes.namingUniformity +
    attributes.hierarchyBalance;
  
  return (sum / 40) * 10;
}

/**
 * Calculate Feature Prominence dimension (25% weight)
 * 
 * Measures market distinctiveness and functional standout.
 * Just as a strong jawline commands presence, distinctive features command market share.
 * 
 * Formula: FP = (FunctionalDistinctiveness + USPStrength + Discoverability + MarketingClarity) / 40 × 10
 * 
 * @param attributes - Bot attributes
 * @returns Feature Prominence score (0-10)
 */
export function calculateFeatureProminence(attributes: BotAttributes): number {
  const sum =
    attributes.functionalDistinctiveness +
    attributes.uspStrength +
    attributes.discoverability +
    attributes.marketingClarity;
  
  return (sum / 40) * 10;
}

/**
 * Calculate Harmonic Cohesion dimension (20% weight)
 * 
 * Measures API consistency and integration smoothness.
 * Harmonious features create aesthetic appeal; cohesive APIs create developer delight.
 * 
 * Formula: HC = (APICohesion + TypeConsistency + ErrorHandling + Documentation) / 40 × 10
 * 
 * @param attributes - Bot attributes
 * @returns Harmonic Cohesion score (0-10)
 */
export function calculateHarmonicCohesion(attributes: BotAttributes): number {
  const sum =
    attributes.apiCohesion +
    attributes.typeConsistency +
    attributes.errorHandling +
    attributes.documentation;
  
  return (sum / 40) * 10;
}

/**
 * Calculate Market Presence dimension (15% weight)
 * 
 * Measures ecosystem dominance and community engagement.
 * Some people command a room; some bots command an ecosystem.
 * 
 * Uses logarithmic scaling for star/download counts to prevent
 * extreme values from dominating the score.
 * 
 * Formula: MP = (log₁₀(Stars + 1) + log₁₀(Downloads + 1) + CommunityScore + DocsSiteScore) / M × 10
 * where M = max normalizer based on typical ranges
 * 
 * @param attributes - Bot attributes
 * @param useLogScale - Whether to use logarithmic scaling (default: true)
 * @returns Market Presence score (0-10)
 */
export function calculateMarketPresence(
  attributes: BotAttributes,
  useLogScale: boolean = true
): number {
  // Logarithmic scaling for metrics that can vary by orders of magnitude
  const starsScore = useLogScale
    ? Math.log10(attributes.githubStars + 1)
    : attributes.githubStars / 1000; // Normalize to ~10 at 10k stars
  
  const downloadsScore = useLogScale
    ? Math.log10(attributes.npmDownloads + 1)
    : attributes.npmDownloads / 1000000; // Normalize to ~10 at 10M downloads
  
  // Typical ranges for log scaling:
  // 100k stars → log₁₀(100001) ≈ 5.0
  // 1M downloads → log₁₀(1000001) ≈ 6.0
  // We normalize these to 0-10 range
  const maxLogStars = 5.5; // ~316k stars = 10
  const maxLogDownloads = 7.5; // ~31.6M downloads = 10
  
  const normalizedStars = useLogScale
    ? Math.min((starsScore / maxLogStars) * 10, 10)
    : Math.min(starsScore, 10);
  
  const normalizedDownloads = useLogScale
    ? Math.min((downloadsScore / maxLogDownloads) * 10, 10)
    : Math.min(downloadsScore, 10);
  
  // Average of four components
  const sum =
    normalizedStars +
    normalizedDownloads +
    attributes.communityScore +
    attributes.docsSiteScore;
  
  return (sum / 40) * 10;
}

/**
 * Calculate Scalability Potential dimension (15% weight)
 * 
 * Measures growth capacity and performance under load.
 * Taller individuals are perceived as more dominant; scalable bots dominate under load.
 * 
 * Note: Technical debt is inverted (10 - value) since higher debt is worse.
 * 
 * Formula: SP = (HorizontalScaling + Performance + Extensibility + (10 - TechnicalDebt)) / 40 × 10
 * 
 * @param attributes - Bot attributes
 * @returns Scalability Potential score (0-10)
 */
export function calculateScalabilityPotential(attributes: BotAttributes): number {
  const sum =
    attributes.horizontalScaling +
    attributes.performance +
    attributes.extensibility +
    (10 - attributes.technicalDebt); // Invert technical debt
  
  return (sum / 40) * 10;
}

/**
 * Get all dimension scores at once
 * 
 * @param attributes - Bot attributes
 * @param useLogScale - Whether to use logarithmic scaling for market presence
 * @returns Object with all five dimension scores
 */
export function calculateAllDimensions(
  attributes: BotAttributes,
  useLogScale: boolean = true
) {
  return {
    architecturalSymmetry: calculateArchitecturalSymmetry(attributes),
    featureProminence: calculateFeatureProminence(attributes),
    harmonicCohesion: calculateHarmonicCohesion(attributes),
    marketPresence: calculateMarketPresence(attributes, useLogScale),
    scalabilityPotential: calculateScalabilityPotential(attributes),
  };
}
