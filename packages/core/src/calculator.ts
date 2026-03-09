/**
 * Main PSL Calculator
 * 
 * Calculates the Phenotype Standard List (PSL) score for bots based on
 * five weighted dimensions adapted from human looksmaxxing methodology.
 */

import type {
  BotAttributes,
  PSLResult,
  DimensionScores,
  DimensionBreakdown,
  PSLConfig,
} from '@psl/types';
import {
  calculateArchitecturalSymmetry,
  calculateFeatureProminence,
  calculateHarmonicCohesion,
  calculateMarketPresence,
  calculateScalabilityPotential,
} from './dimensions';
import { classify, getPercentile } from './classification';

/**
 * Default dimension weights (must sum to 1.0)
 */
const DEFAULT_WEIGHTS = {
  architecturalSymmetry: 0.25,
  featureProminence: 0.25,
  harmonicCohesion: 0.20,
  marketPresence: 0.15,
  scalabilityPotential: 0.15,
};

/**
 * Calculate PSL score for a bot
 * 
 * @param attributes - Bot attributes across 20 components
 * @param config - Optional configuration for calculation
 * @returns Complete PSL calculation result
 * 
 * @example
 * ```typescript
 * const result = calculatePSL({
 *   packageSymmetry: 9,
 *   apiConsistency: 10,
 *   // ... other attributes
 * });
 * console.log(`PSL: ${result.pslScore.toFixed(1)}`);
 * console.log(`Classification: ${result.classification}`);
 * ```
 */
export function calculatePSL(
  attributes: BotAttributes,
  config: PSLConfig = {}
): PSLResult {
  const weights = { ...DEFAULT_WEIGHTS, ...config.weights };
  
  // Calculate each dimension score (0-10)
  const dimensions: DimensionScores = {
    architecturalSymmetry: calculateArchitecturalSymmetry(attributes),
    featureProminence: calculateFeatureProminence(attributes),
    harmonicCohesion: calculateHarmonicCohesion(attributes),
    marketPresence: calculateMarketPresence(attributes, config.useLogScale),
    scalabilityPotential: calculateScalabilityPotential(attributes),
  };
  
  // Calculate weighted aggregate PSL score
  const pslScore = weightedAggregate(dimensions, weights);
  
  // Classify the score
  const classification = classify(pslScore);
  
  // Calculate percentile ranking
  const percentile = getPercentile(pslScore);
  
  // Generate detailed breakdown if requested
  const breakdown = config.includeBreakdown !== false
    ? generateBreakdown(dimensions, weights, attributes)
    : [];
  
  return {
    pslScore,
    dimensions,
    classification,
    percentile,
    breakdown,
    ...(config.includeAttributes && { attributes }),
  };
}

/**
 * Calculate weighted aggregate PSL score
 * 
 * Formula: PSL = Σ(dimension_i × weight_i)
 */
function weightedAggregate(
  dimensions: DimensionScores,
  weights: typeof DEFAULT_WEIGHTS
): number {
  const psl =
    dimensions.architecturalSymmetry * weights.architecturalSymmetry +
    dimensions.featureProminence * weights.featureProminence +
    dimensions.harmonicCohesion * weights.harmonicCohesion +
    dimensions.marketPresence * weights.marketPresence +
    dimensions.scalabilityPotential * weights.scalabilityPotential;
  
  // Clamp to [0, 10] range
  return Math.max(0, Math.min(10, psl));
}

/**
 * Generate detailed breakdown of dimension calculations
 */
function generateBreakdown(
  dimensions: DimensionScores,
  weights: typeof DEFAULT_WEIGHTS,
  attributes: BotAttributes
): DimensionBreakdown[] {
  return [
    {
      dimension: 'architecturalSymmetry',
      score: dimensions.architecturalSymmetry,
      weight: weights.architecturalSymmetry,
      weightedScore: dimensions.architecturalSymmetry * weights.architecturalSymmetry,
      components: [
        { name: 'Package Symmetry', value: attributes.packageSymmetry },
        { name: 'API Consistency', value: attributes.apiConsistency },
        { name: 'Naming Uniformity', value: attributes.namingUniformity },
        { name: 'Hierarchy Balance', value: attributes.hierarchyBalance },
      ],
    },
    {
      dimension: 'featureProminence',
      score: dimensions.featureProminence,
      weight: weights.featureProminence,
      weightedScore: dimensions.featureProminence * weights.featureProminence,
      components: [
        { name: 'Functional Distinctiveness', value: attributes.functionalDistinctiveness },
        { name: 'USP Strength', value: attributes.uspStrength },
        { name: 'Discoverability', value: attributes.discoverability },
        { name: 'Marketing Clarity', value: attributes.marketingClarity },
      ],
    },
    {
      dimension: 'harmonicCohesion',
      score: dimensions.harmonicCohesion,
      weight: weights.harmonicCohesion,
      weightedScore: dimensions.harmonicCohesion * weights.harmonicCohesion,
      components: [
        { name: 'API Cohesion', value: attributes.apiCohesion },
        { name: 'Type Consistency', value: attributes.typeConsistency },
        { name: 'Error Handling', value: attributes.errorHandling },
        { name: 'Documentation', value: attributes.documentation },
      ],
    },
    {
      dimension: 'marketPresence',
      score: dimensions.marketPresence,
      weight: weights.marketPresence,
      weightedScore: dimensions.marketPresence * weights.marketPresence,
      components: [
        { 
          name: 'GitHub Stars', 
          value: attributes.githubStars,
          normalized: Math.log10(attributes.githubStars + 1)
        },
        { 
          name: 'NPM Downloads', 
          value: attributes.npmDownloads,
          normalized: Math.log10(attributes.npmDownloads + 1)
        },
        { name: 'Community Score', value: attributes.communityScore },
        { name: 'Docs Site Score', value: attributes.docsSiteScore },
      ],
    },
    {
      dimension: 'scalabilityPotential',
      score: dimensions.scalabilityPotential,
      weight: weights.scalabilityPotential,
      weightedScore: dimensions.scalabilityPotential * weights.scalabilityPotential,
      components: [
        { name: 'Horizontal Scaling', value: attributes.horizontalScaling },
        { name: 'Performance', value: attributes.performance },
        { name: 'Extensibility', value: attributes.extensibility },
        { name: 'Technical Debt', value: attributes.technicalDebt, normalized: 10 - attributes.technicalDebt },
      ],
    },
  ];
}

/**
 * Recalculate PSL with custom weights
 * 
 * @param result - Existing PSL result
 * @param weights - Custom dimension weights
 * @returns New PSL score with custom weights
 */
export function recalculateWithWeights(
  result: PSLResult,
  weights: Partial<typeof DEFAULT_WEIGHTS>
): number {
  const finalWeights = { ...DEFAULT_WEIGHTS, ...weights };
  return weightedAggregate(result.dimensions, finalWeights);
}
