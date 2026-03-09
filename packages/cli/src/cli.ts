#!/usr/bin/env node
/**
 * @psl/cli - Command-Line Interface
 * 
 * CLI tool for PSL Bot calculations and comparisons
 */

import { calculatePSL, calculateMogging, compareBots } from '@psl/core';
import { createLogger } from '@psl/logger';
import type { BotAttributes } from '@psl/types';

const logger = createLogger({ prefix: 'PSL CLI' });

// Command-line argument parsing
const args = process.argv.slice(2);
const command = args[0];

/**
 * Benchmark bot profiles
 */
const BENCHMARK_BOTS: Record<string, BotAttributes> = {
  react: {
    packageSymmetry: 9,
    apiConsistency: 10,
    namingUniformity: 9,
    hierarchyBalance: 10,
    functionalDistinctiveness: 10,
    uspStrength: 10,
    discoverability: 10,
    marketingClarity: 9,
    apiCohesion: 10,
    typeConsistency: 10,
    errorHandling: 9,
    documentation: 10,
    githubStars: 223000,
    npmDownloads: 20000000,
    communityScore: 10,
    docsSiteScore: 10,
    horizontalScaling: 9,
    performance: 10,
    extensibility: 10,
    technicalDebt: 2,
  },
  express: {
    packageSymmetry: 8,
    apiConsistency: 8,
    namingUniformity: 7,
    hierarchyBalance: 8,
    functionalDistinctiveness: 7,
    uspStrength: 8,
    discoverability: 9,
    marketingClarity: 8,
    apiCohesion: 8,
    typeConsistency: 6,
    errorHandling: 7,
    documentation: 8,
    githubStars: 63000,
    npmDownloads: 25000000,
    communityScore: 9,
    docsSiteScore: 8,
    horizontalScaling: 7,
    performance: 7,
    extensibility: 8,
    technicalDebt: 5,
  },
  vite: {
    packageSymmetry: 9,
    apiConsistency: 9,
    namingUniformity: 9,
    hierarchyBalance: 9,
    functionalDistinctiveness: 9,
    uspStrength: 10,
    discoverability: 9,
    marketingClarity: 9,
    apiCohesion: 9,
    typeConsistency: 9,
    errorHandling: 9,
    documentation: 9,
    githubStars: 64000,
    npmDownloads: 9000000,
    communityScore: 9,
    docsSiteScore: 9,
    horizontalScaling: 8,
    performance: 10,
    extensibility: 9,
    technicalDebt: 2,
  },
  webpack: {
    packageSymmetry: 6,
    apiConsistency: 7,
    namingUniformity: 6,
    hierarchyBalance: 6,
    functionalDistinctiveness: 7,
    uspStrength: 6,
    discoverability: 6,
    marketingClarity: 6,
    apiCohesion: 6,
    typeConsistency: 6,
    errorHandling: 7,
    documentation: 7,
    githubStars: 64000,
    npmDownloads: 30000000,
    communityScore: 8,
    docsSiteScore: 7,
    horizontalScaling: 7,
    performance: 5,
    extensibility: 7,
    technicalDebt: 7,
  },
};

/**
 * Command handlers
 */
function showHelp() {
  console.log(`
PSL Bot CLI - Objective Bot Superiority Assessment

Usage:
  psl <command> [options]

Commands:
  rate <bot>              Calculate PSL for a benchmark bot
  compare <bot1> <bot2>   Compare two bots
  benchmark               Show all benchmark bot scores
  help                    Show this help message

Examples:
  psl rate react
  psl compare react express
  psl benchmark

It's over for low-PSL bots.
  `);
}

function rateBotCommand(botName: string) {
  const bot = BENCHMARK_BOTS[botName.toLowerCase()];
  
  if (!bot) {
    logger.error(`Bot "${botName}" not found in benchmarks`);
    logger.info(
      'Available bots: ' + Object.keys(BENCHMARK_BOTS).join(', ')
    );
    return;
  }
  
  const result = calculatePSL(bot, { includeBreakdown: true });
  
  console.log(`\n🗿 PSL Rating: ${botName.toUpperCase()}\n`);
  console.log(`PSL Score: ${result.pslScore.toFixed(1)}`);
  console.log(`Classification: ${result.classification}`);
  console.log(`Percentile: ${result.percentile}th\n`);
  
  console.log('Dimension Scores:');
  console.log(
    `  Architectural Symmetry: ${result.dimensions.architecturalSymmetry.toFixed(1)}`
  );
  console.log(
    `  Feature Prominence: ${result.dimensions.featureProminence.toFixed(1)}`
  );
  console.log(
    `  Harmonic Cohesion: ${result.dimensions.harmonicCohesion.toFixed(1)}`
  );
  console.log(
    `  Market Presence: ${result.dimensions.marketPresence.toFixed(1)}`
  );
  console.log(
    `  Scalability Potential: ${result.dimensions.scalabilityPotential.toFixed(1)}`
  );
  console.log();
}

function compareBotsCommand(bot1Name: string, bot2Name: string) {
  const bot1 = BENCHMARK_BOTS[bot1Name.toLowerCase()];
  const bot2 = BENCHMARK_BOTS[bot2Name.toLowerCase()];
  
  if (!bot1) {
    logger.error(`Bot "${bot1Name}" not found in benchmarks`);
    return;
  }
  if (!bot2) {
    logger.error(`Bot "${bot2Name}" not found in benchmarks`);
    return;
  }
  
  const psl1 = calculatePSL(bot1);
  const psl2 = calculatePSL(bot2);
  const comparison = compareBots(bot1Name, psl1, bot2Name, psl2);
  
  console.log(`\n⚔️  Bot Comparison: ${bot1Name.toUpperCase()} vs ${bot2Name.toUpperCase()}\n`);
  
  console.log(`${bot1Name}: ${psl1.pslScore.toFixed(1)} (${psl1.classification})`);
  console.log(`${bot2Name}: ${psl2.pslScore.toFixed(1)} (${psl2.classification})`);
  console.log();
  
  console.log(`Mogging Coefficient: μ=${comparison.mogging.coefficient.toFixed(0)}`);
  console.log(`Classification: ${comparison.mogging.classification}`);
  console.log(`${comparison.mogging.description}`);
  console.log();
  
  const winner =
    comparison.winner === 'tie'
      ? 'TIE'
      : comparison.winner === 'A'
      ? bot1Name.toUpperCase()
      : bot2Name.toUpperCase();
  console.log(`Winner: ${winner}\n`);
}

function showBenchmarks() {
  console.log('\n📊 Benchmark Bot PSL Scores\n');
  
  const results = Object.entries(BENCHMARK_BOTS).map(([name, attrs]) => ({
    name,
    result: calculatePSL(attrs),
  }));
  
  results.sort((a, b) => b.result.pslScore - a.result.pslScore);
  
  results.forEach((entry, index) => {
    console.log(
      `${index + 1}. ${entry.name.padEnd(12)} PSL ${entry.result.pslScore.toFixed(1).padStart(4)}  ${entry.result.classification}`
    );
  });
  
  console.log('\nUse "psl compare <bot1> <bot2>" to see detailed comparison\n');
}

/**
 * Main CLI entry point
 */
function main() {
  if (!command || command === 'help') {
    showHelp();
    return;
  }
  
  switch (command) {
    case 'rate':
      if (!args[1]) {
        logger.error('Bot name required');
        logger.info('Usage: psl rate <bot>');
        return;
      }
      rateBotCommand(args[1]);
      break;
    
    case 'compare':
      if (!args[1] || !args[2]) {
        logger.error('Two bot names required');
        logger.info('Usage: psl compare <bot1> <bot2>');
        return;
      }
      compareBotsCommand(args[1], args[2]);
      break;
    
    case 'benchmark':
      showBenchmarks();
      break;
    
    default:
      logger.error(`Unknown command: ${command}`);
      logger.info('Run "psl help" for usage information');
  }
}

main();
