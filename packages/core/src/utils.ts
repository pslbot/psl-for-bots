/**
 * Core Utilities
 * 
 * Helper functions and utilities for PSL calculations
 */

import type { BotAttributes, DimensionScores } from '@psl/types';

/**
 * Round number to specified decimal places
 */
export function round(value: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate percentage
 */
export function toPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Format PSL score for display
 */
export function formatPSL(score: number): string {
  return score.toFixed(1);
}

/**
 * Format mogging coefficient for display
 */
export function formatMogging(coefficient: number): string {
  return `μ=${coefficient.toFixed(0)}`;
}

/**
 * Create default bot attributes (all zeroes)
 */
export function createDefaultAttributes(): BotAttributes {
  return {
    packageSymmetry: 0,
    apiConsistency: 0,
    namingUniformity: 0,
    hierarchyBalance: 0,
    functionalDistinctiveness: 0,
    uspStrength: 0,
    discoverability: 0,
    marketingClarity: 0,
    apiCohesion: 0,
    typeConsistency: 0,
    errorHandling: 0,
    documentation: 0,
    githubStars: 0,
    npmDownloads: 0,
    communityScore: 0,
    docsSiteScore: 0,
    horizontalScaling: 0,
    performance: 0,
    extensibility: 0,
    technicalDebt: 0,
  };
}

/**
 * Merge partial attributes with defaults
 */
export function mergeAttributes(
  partial: Partial<BotAttributes>
): BotAttributes {
  return {
    ...createDefaultAttributes(),
    ...partial,
  };
}

/**
 * Calculate standard deviation of dimension scores
 */
export function calculateStdDev(dimensions: DimensionScores): number {
  const values = Object.values(dimensions);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  return Math.sqrt(variance);
}

/**
 * Check if dimensions are balanced (low standard deviation)
 */
export function areBalanced(dimensions: DimensionScores): boolean {
  const stdDev = calculateStdDev(dimensions);
  return stdDev < 1.0; // Less than 1 point standard deviation
}

/**
 * Deep clone bot attributes
 */
export function cloneAttributes(attributes: BotAttributes): BotAttributes {
  return { ...attributes };
}

/**
 * Get dimension weight by name
 */
export function getDimensionWeight(
  dimension: keyof DimensionScores
): number {
  const weights: Record<keyof DimensionScores, number> = {
    architecturalSymmetry: 0.25,
    featureProminence: 0.25,
    harmonicCohesion: 0.2,
    marketPresence: 0.15,
    scalabilityPotential: 0.15,
  };
  return weights[dimension];
}

/**
 * Calculate contribution of each dimension to final PSL
 */
export function calculateContributions(dimensions: DimensionScores) {
  return {
    architecturalSymmetry:
      dimensions.architecturalSymmetry *
      getDimensionWeight('architecturalSymmetry'),
    featureProminence:
      dimensions.featureProminence *
      getDimensionWeight('featureProminence'),
    harmonicCohesion:
      dimensions.harmonicCohesion * getDimensionWeight('harmonicCohesion'),
    marketPresence:
      dimensions.marketPresence * getDimensionWeight('marketPresence'),
    scalabilityPotential:
      dimensions.scalabilityPotential *
      getDimensionWeight('scalabilityPotential'),
  };
}
