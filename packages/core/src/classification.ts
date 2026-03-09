/**
 * PSL Classification and Percentile Calculation
 * 
 * Maps PSL scores to classification tiers and calculates percentile rankings
 * based on empirical distribution.
 */

import type { PSLClassification } from '@psl/types';

/**
 * Classify PSL score into tier
 * 
 * @param pslScore - PSL score (0-10)
 * @returns Classification tier
 */
export function classify(pslScore: number): PSLClassification {
  if (pslScore >= 9.0) return 'Legendary (Gigachad)';
  if (pslScore >= 8.0) return 'Exceptional (Chad)';
  if (pslScore >= 7.0) return 'Above Average (HTN)';
  if (pslScore >= 6.0) return 'Average (Normie)';
  if (pslScore >= 5.0) return 'Below Average (LTN)';
  if (pslScore >= 3.0) return 'Poor (Subhuman)';
  return 'Terminal (Truecel)';
}

/**
 * Get numeric tier value from classification
 * 
 * @param classification - PSL classification
 * @returns Numeric tier (1-7, where 7 is best)
 */
export function getTier(classification: PSLClassification): number {
  const tierMap: Record<PSLClassification, number> = {
    'Legendary (Gigachad)': 7,
    'Exceptional (Chad)': 6,
    'Above Average (HTN)': 5,
    'Average (Normie)': 4,
    'Below Average (LTN)': 3,
    'Poor (Subhuman)': 2,
    'Terminal (Truecel)': 1,
  };
  return tierMap[classification];
}

/**
 * Calculate percentile ranking based on score
 * 
 * Uses an empirical distribution model based on observed bot PSL scores.
 * Most bots cluster in the 5.0-7.5 range with a slight right skew.
 * 
 * Distribution assumptions:
 * - Mean: 6.5
 * - Std Dev: 1.2
 * - Approximate normal distribution with slight right skew
 * 
 * @param pslScore - PSL score (0-10)
 * @returns Percentile (0-100)
 */
export function getPercentile(pslScore: number): number {
  // Simplified percentile mapping based on empirical distribution
  // This would ideally be calculated from actual data
  const percentileMap: Array<[number, number]> = [
    [0.0, 0],
    [2.0, 1],
    [3.0, 3],
    [4.0, 8],
    [5.0, 16],
    [5.5, 23],
    [6.0, 32],
    [6.5, 45],
    [7.0, 60],
    [7.5, 74],
    [8.0, 85],
    [8.5, 92],
    [9.0, 96],
    [9.5, 99],
    [10.0, 100],
  ];
  
  // Linear interpolation between mapped points
  for (let i = 0; i < percentileMap.length - 1; i++) {
    const [score1, percentile1] = percentileMap[i];
    const [score2, percentile2] = percentileMap[i + 1];
    
    if (pslScore >= score1 && pslScore <= score2) {
      const ratio = (pslScore - score1) / (score2 - score1);
      return Math.round(percentile1 + ratio * (percentile2 - percentile1));
    }
  }
  
  // Edge cases
  if (pslScore < 0) return 0;
  if (pslScore > 10) return 100;
  
  return 50; // Fallback
}

/**
 * Get color code for PSL score (for UI rendering)
 * 
 * @param pslScore - PSL score (0-10)
 * @returns Hex color code
 */
export function getScoreColor(pslScore: number): string {
  if (pslScore >= 9.0) return '#27ae60'; // Green - Legendary
  if (pslScore >= 8.0) return '#2ecc71'; // Light green - Exceptional
  if (pslScore >= 7.0) return '#3498db'; // Blue - Above Average
  if (pslScore >= 6.0) return '#95a5a6'; // Gray - Average
  if (pslScore >= 5.0) return '#f39c12'; // Orange - Below Average
  if (pslScore >= 3.0) return '#e67e22'; // Dark orange - Poor
  return '#e74c3c'; // Red - Terminal
}

/**
 * Get descriptive label for percentile
 * 
 * @param percentile - Percentile (0-100)
 * @returns Descriptive label
 */
export function getPercentileLabel(percentile: number): string {
  if (percentile >= 99) return 'Top 1%';
  if (percentile >= 95) return 'Top 5%';
  if (percentile >= 90) return 'Top 10%';
  if (percentile >= 75) return 'Top 25%';
  if (percentile >= 50) return 'Above Average';
  if (percentile >= 25) return 'Below Average';
  if (percentile >= 10) return 'Bottom 25%';
  return 'Bottom 10%';
}

/**
 * Check if a score is considered "high PSL" (gigachad/chad tier)
 * 
 * @param pslScore - PSL score (0-10)
 * @returns True if score is 8.0 or higher
 */
export function isHighPSL(pslScore: number): boolean {
  return pslScore >= 8.0;
}

/**
 * Check if a score is considered "low PSL" (below average or worse)
 * 
 * @param pslScore - PSL score (0-10)
 * @returns True if score is below 6.0
 */
export function isLowPSL(pslScore: number): boolean {
  return pslScore < 6.0;
}

/**
 * Get recommendation based on PSL score
 * 
 * @param pslScore - PSL score (0-10)
 * @returns Recommendation text
 */
export function getRecommendation(pslScore: number): string {
  if (pslScore >= 9.0) {
    return 'Gigachad tier. Market domination achieved. Maintain excellence.';
  }
  if (pslScore >= 8.0) {
    return 'Chad tier. Highly competitive. Minor optimizations could reach legendary status.';
  }
  if (pslScore >= 7.0) {
    return 'Above average. Solid fundamentals. Focus on differentiation and market presence.';
  }
  if (pslScore >= 6.0) {
    return 'Average tier. Functional but unremarkable. Consider architectural improvements.';
  }
  if (pslScore >= 5.0) {
    return 'Below average. Significant weaknesses present. Prioritize core quality improvements.';
  }
  if (pslScore >= 3.0) {
    return 'Poor tier. Major refactoring needed. Consider deprecation or complete redesign.';
  }
  return "Terminal tier. It's over. Abandon or rebuild from scratch.";
}
