/**
 * Bot Comparison Utilities
 * 
 * Functions for comparing multiple bots and generating comparative analysis
 */

import type { BotComparison, PSLResult, DimensionScores } from '@psl/types';
import { calculateMogging } from './mogging';

/**
 * Compare two bots with complete analysis
 * 
 * @param botA - First bot identifier
 * @param pslA - PSL result for bot A
 * @param botB - Second bot identifier
 * @param pslB - PSL result for bot B
 * @returns Complete comparison result
 */
export function compareBots(
  botA: string,
  pslA: PSLResult,
  botB: string,
  pslB: PSLResult
): BotComparison {
  // Calculate mogging coefficient (A mogging B)
  const mogging = calculateMogging(
    {
      psl: pslA.pslScore,
      marketPresence: pslA.dimensions.marketPresence,
      featureProminence: pslA.dimensions.featureProminence,
    },
    {
      psl: pslB.pslScore,
    }
  );
  
  // Compare dimensions
  const dimensionComparison = compareDimensions(
    pslA.dimensions,
    pslB.dimensions
  );
  
  // Determine overall winner
  const pslDiff = pslA.pslScore - pslB.pslScore;
  const winner =
    Math.abs(pslDiff) < 0.1 ? 'tie' : pslDiff > 0 ? 'A' : 'B';
  
  return {
    botA,
    botB,
    pslA,
    pslB,
    mogging,
    dimensionComparison,
    winner,
  };
}

/**
 * Compare dimension scores between two bots
 */
function compareDimensions(
  dimensionsA: DimensionScores,
  dimensionsB: DimensionScores
) {
  const dimensions: Array<keyof DimensionScores> = [
    'architecturalSymmetry',
    'featureProminence',
    'harmonicCohesion',
    'marketPresence',
    'scalabilityPotential',
  ];
  
  return dimensions.map((dimension) => {
    const scoreA = dimensionsA[dimension];
    const scoreB = dimensionsB[dimension];
    const difference = scoreA - scoreB;
    
    return {
      dimension,
      scoreA,
      scoreB,
      difference,
      winner:
        Math.abs(difference) < 0.1
          ? ('tie' as const)
          : difference > 0
          ? ('A' as const)
          : ('B' as const),
    };
  });
}

/**
 * Rank multiple bots by PSL score
 * 
 * @param results - Map of bot IDs to PSL results
 * @returns Sorted array of rankings
 */
export function rankBots(results: Map<string, PSLResult>) {
  const rankings = Array.from(results.entries())
    .map(([botId, result]) => ({
      botId,
      psl: result.pslScore,
      classification: result.classification,
      percentile: result.percentile,
    }))
    .sort((a, b) => b.psl - a.psl);
  
  return rankings.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}

/**
 * Find the strongest and weakest dimensions for a bot
 * 
 * @param dimensions - Dimension scores
 * @returns Strongest and weakest dimensions
 */
export function findExtremes(dimensions: DimensionScores) {
  const entries = Object.entries(dimensions) as Array<
    [keyof DimensionScores, number]
  >;
  
  entries.sort((a, b) => b[1] - a[1]);
  
  return {
    strongest: {
      dimension: entries[0][0],
      score: entries[0][1],
    },
    weakest: {
      dimension: entries[entries.length - 1][0],
      score: entries[entries.length - 1][1],
    },
  };
}

/**
 * Calculate average PSL across multiple bots
 * 
 * @param results - Array of PSL results
 * @returns Average PSL score
 */
export function calculateAverage(results: PSLResult[]): number {
  if (results.length === 0) return 0;
  
  const sum = results.reduce((acc, result) => acc + result.pslScore, 0);
  return sum / results.length;
}

/**
 * Generate a formatted comparison report
 * 
 * @param comparison - Bot comparison result
 * @returns Markdown-formatted report
 */
export function generateComparisonReport(comparison: BotComparison): string {
  const { botA, botB, pslA, pslB, mogging, dimensionComparison, winner } =
    comparison;
  
  let report = `# Bot Comparison: ${botA} vs ${botB}\n\n`;
  
  // Overall scores
  report += `## Overall PSL Scores\n\n`;
  report += `- **${botA}**: ${pslA.pslScore.toFixed(1)} (${pslA.classification})\n`;
  report += `- **${botB}**: ${pslB.pslScore.toFixed(1)} (${pslB.classification})\n`;
  report += `- **Winner**: ${winner === 'tie' ? 'Tie' : winner === 'A' ? botA : botB}\n\n`;
  
  // Mogging analysis
  report += `## Mogging Analysis\n\n`;
  report += `- **Coefficient**: μ=${mogging.coefficient.toFixed(0)}\n`;
  report += `- **Classification**: ${mogging.classification}\n`;
  report += `- **Description**: ${mogging.description}\n\n`;
  
  // Dimension comparison
  report += `## Dimension Breakdown\n\n`;
  report += `| Dimension | ${botA} | ${botB} | Diff | Winner |\n`;
  report += `|-----------|---------|---------|------|--------|\n`;
  
  for (const dim of dimensionComparison) {
    const winnerName =
      dim.winner === 'tie' ? 'Tie' : dim.winner === 'A' ? botA : botB;
    report += `| ${formatDimensionName(dim.dimension)} | ${dim.scoreA.toFixed(1)} | ${dim.scoreB.toFixed(1)} | ${dim.difference > 0 ? '+' : ''}${dim.difference.toFixed(1)} | ${winnerName} |\n`;
  }
  
  return report;
}

/**
 * Format dimension name for display
 */
function formatDimensionName(dimension: keyof DimensionScores): string {
  const names: Record<keyof DimensionScores, string> = {
    architecturalSymmetry: 'Architectural Symmetry',
    featureProminence: 'Feature Prominence',
    harmonicCohesion: 'Harmonic Cohesion',
    marketPresence: 'Market Presence',
    scalabilityPotential: 'Scalability Potential',
  };
  return names[dimension];
}
