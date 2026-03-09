/**
 * Mogging Coefficient Calculation
 * 
 * Calculates the mogging coefficient (μ) to quantify competitive dominance
 * between bots. Mogging requires visibility - a superior bot that no one knows
 * cannot effectively mog.
 */

import type {
  MoggingResult,
  MoggingClassification,
  DimensionScores,
} from '@psl/types';

/**
 * Calculate mogging coefficient between two bots
 * 
 * The mogging coefficient quantifies competitive dominance adjusted for visibility.
 * 
 * Formula: μ = (PSL_self - PSL_target) × V(bot) × 100
 * where V = (MarketPresence/10) × (1 + FeatureProminence/10)
 * 
 * The visibility factor accounts for:
 * - Market Presence: How many people see the bot
 * - Feature Prominence: How noticeable the features are
 * 
 * @param selfBot - The mogging bot's data
 * @param targetBot - The target bot being mogged
 * @returns Complete mogging calculation result
 * 
 * @example
 * ```typescript
 * const result = calculateMogging(
 *   { psl: 9.7, marketPresence: 9.8, featureProminence: 9.8 }, // React
 *   { psl: 7.7 } // Express
 * );
 * console.log(`μ=${result.coefficient.toFixed(0)}`); // μ=394 (Nuclear Mogging)
 * ```
 */
export function calculateMogging(
  selfBot: {
    psl: number;
    marketPresence: number;
    featureProminence: number;
  },
  targetBot: {
    psl: number;
  }
): MoggingResult {
  // Calculate PSL difference
  const pslDifference = selfBot.psl - targetBot.psl;
  
  // Calculate visibility factor
  // V = (MP/10) × (1 + FP/10)
  const visibilityFactor =
    (selfBot.marketPresence / 10) * (1 + selfBot.featureProminence / 10);
  
  // Calculate mogging coefficient
  // μ = ΔPSL × V × 100
  const coefficient = pslDifference * visibilityFactor * 100;
  
  // Classify the mogging intensity
  const classification = classifyMogging(coefficient);
  
  // Determine direction
  const direction: 'mogging' | 'mogged' | 'equal' =
    Math.abs(coefficient) <= 5
      ? 'equal'
      : coefficient > 0
      ? 'mogging'
      : 'mogged';
  
  // Generate description
  const description = describeMogging(coefficient, classification);
  
  return {
    coefficient,
    classification,
    description,
    pslDifference,
    visibilityFactor,
    direction,
    self: selfBot,
    target: targetBot,
  };
}

/**
 * Classify mogging coefficient intensity
 */
export function classifyMogging(coefficient: number): MoggingClassification {
  const absCoeff = Math.abs(coefficient);
  
  if (absCoeff > 200) return 'Nuclear Mogging';
  if (absCoeff > 100) return 'Brutal Mogging';
  if (absCoeff > 50) return 'Absolute Mogging';
  if (absCoeff > 20) return 'Significant Mogging';
  if (absCoeff > 5) return 'Marginal Mogging';
  return 'Looksmatch';
}

/**
 * Generate human-readable description of mogging
 */
export function describeMogging(
  coefficient: number,
  classification: MoggingClassification
): string {
  const absCoeff = Math.abs(coefficient);
  const isMogging = coefficient > 0;
  
  if (classification === 'Looksmatch') {
    return 'Roughly equal. Similar tier with different trade-offs.';
  }
  
  const descriptions: Record<MoggingClassification, string> = {
    'Nuclear Mogging':
      'Complete obliteration. Target bot is rendered irrelevant in direct comparison.',
    'Brutal Mogging':
      'Overwhelming superiority across all dimensions. Market share dominance.',
    'Absolute Mogging':
      'Decisive advantage. Clear winner in head-to-head evaluation.',
    'Significant Mogging':
      'Notable superiority. Visible quality gap that developers recognize.',
    'Marginal Mogging':
      'Slight edge. Minor advantage that may not matter in all contexts.',
    'Looksmatch': 'Equal', // Won't be used due to early return
    'Getting Mogged': 'Being mogged',
  };
  
  const baseDescription = descriptions[classification];
  
  if (!isMogging) {
    return `Getting Mogged (μ=${coefficient.toFixed(0)}): ${baseDescription}`;
  }
  
  return `${classification} (μ=${coefficient.toFixed(0)}): ${baseDescription}`;
}

/**
 * Calculate bidirectional mogging between two bots
 * 
 * Returns mogging coefficients in both directions for complete analysis
 */
export function calculateBidirectionalMogging(
  botA: {
    psl: number;
    marketPresence: number;
    featureProminence: number;
  },
  botB: {
    psl: number;
    marketPresence: number;
    featureProminence: number;
  }
) {
  return {
    aMoggingB: calculateMogging(botA, { psl: botB.psl }),
    bMoggingA: calculateMogging(botB, { psl: botA.psl }),
  };
}

/**
 * Calculate mogging network for multiple bots
 * 
 * Creates a complete mogging matrix showing all pairwise relationships
 */
export function calculateMoggingMatrix(
  bots: Array<{
    id: string;
    psl: number;
    marketPresence: number;
    featureProminence: number;
  }>
): Map<
  string,
  Map<string, { coefficient: number; classification: MoggingClassification }>
> {
  const matrix = new Map();
  
  for (const bot1 of bots) {
    const row = new Map();
    
    for (const bot2 of bots) {
      if (bot1.id === bot2.id) {
        row.set(bot2.id, {
          coefficient: 0,
          classification: 'Looksmatch' as MoggingClassification,
        });
      } else {
        const result = calculateMogging(bot1, { psl: bot2.psl });
        row.set(bot2.id, {
          coefficient: result.coefficient,
          classification: result.classification,
        });
      }
    }
    
    matrix.set(bot1.id, row);
  }
  
  return matrix;
}

/**
 * Find bots that are "looksmatches" (within mogging threshold)
 * 
 * @param targetPSL - Target PSL score
 * @param bots - Array of bots to search
 * @param threshold - Maximum coefficient difference for looksmatch (default: 5)
 * @returns Array of looksmatch bots
 */
export function findLooksmatches(
  targetPSL: number,
  bots: Array<{ id: string; psl: number }>,
  threshold: number = 5
) {
  return bots.filter((bot) => {
    const diff = Math.abs(bot.psl - targetPSL);
    return diff * 100 <= threshold; // Simplified calculation without visibility
  });
}
