/**
 * @psl/types - TypeScript type definitions for PSL Bot
 * 
 * The Phenotype Standard List (PSL) for objective bot superiority assessment.
 * Adapted from human looksmaxxing methodology to quantify bot quality across
 * five weighted dimensions.
 */

/**
 * Bot attributes for PSL calculation (20 components across 5 dimensions)
 * Each attribute is scored 0-10 unless otherwise specified
 */
export interface BotAttributes {
  // ============================================
  // Architectural Symmetry (25% weight)
  // ============================================
  
  /** Uniformity of package/module organization (0-10) */
  packageSymmetry: number;
  
  /** Consistency of API design patterns (0-10) */
  apiConsistency: number;
  
  /** Uniformity of naming conventions (0-10) */
  namingUniformity: number;
  
  /** Balance of code hierarchy and structure (0-10) */
  hierarchyBalance: number;
  
  // ============================================
  // Feature Prominence (25% weight)
  // ============================================
  
  /** Distinctiveness of core functionality (0-10) */
  functionalDistinctiveness: number;
  
  /** Strength of unique selling proposition (0-10) */
  uspStrength: number;
  
  /** Ease of feature discovery (0-10) */
  discoverability: number;
  
  /** Clarity of marketing and positioning (0-10) */
  marketingClarity: number;
  
  // ============================================
  // Harmonic Cohesion (20% weight)
  // ============================================
  
  /** Cohesiveness of API surface (0-10) */
  apiCohesion: number;
  
  /** Consistency of type system usage (0-10) */
  typeConsistency: number;
  
  /** Quality of error handling (0-10) */
  errorHandling: number;
  
  /** Completeness and quality of documentation (0-10) */
  documentation: number;
  
  // ============================================
  // Market Presence (15% weight)
  // ============================================
  
  /** GitHub stars (absolute number) */
  githubStars: number;
  
  /** NPM weekly downloads (absolute number) */
  npmDownloads: number;
  
  /** Community engagement score (0-10) */
  communityScore: number;
  
  /** Documentation website quality (0-10) */
  docsSiteScore: number;
  
  // ============================================
  // Scalability Potential (15% weight)
  // ============================================
  
  /** Horizontal scaling capability (0-10) */
  horizontalScaling: number;
  
  /** Performance benchmarks (0-10) */
  performance: number;
  
  /** Plugin/extension system quality (0-10) */
  extensibility: number;
  
  /** Technical debt level (0-10, higher = worse, will be inverted) */
  technicalDebt: number;
}

/**
 * Dimension scores after aggregation (0-10 each)
 */
export interface DimensionScores {
  /** Architectural Symmetry: code structure uniformity */
  architecturalSymmetry: number;
  
  /** Feature Prominence: market distinctiveness */
  featureProminence: number;
  
  /** Harmonic Cohesion: API consistency */
  harmonicCohesion: number;
  
  /** Market Presence: ecosystem dominance */
  marketPresence: number;
  
  /** Scalability Potential: growth capacity */
  scalabilityPotential: number;
}

/**
 * PSL classification tiers
 */
export type PSLClassification =
  | 'Legendary (Gigachad)'      // 9.0-10.0
  | 'Exceptional (Chad)'        // 8.0-8.9
  | 'Above Average (HTN)'       // 7.0-7.9
  | 'Average (Normie)'          // 6.0-6.9
  | 'Below Average (LTN)'       // 5.0-5.9
  | 'Poor (Subhuman)'           // 3.0-4.9
  | 'Terminal (Truecel)';       // 0.0-2.9

/**
 * Detailed breakdown of dimension calculation
 */
export interface DimensionBreakdown {
  dimension: keyof DimensionScores;
  score: number;
  weight: number;
  weightedScore: number;
  components: {
    name: string;
    value: number;
    normalized?: number;
  }[];
}

/**
 * Complete PSL calculation result
 */
export interface PSLResult {
  /** Final PSL score (0-10) */
  pslScore: number;
  
  /** Scores for each dimension */
  dimensions: DimensionScores;
  
  /** PSL classification tier */
  classification: PSLClassification;
  
  /** Percentile ranking (0-100) */
  percentile: number;
  
  /** Detailed breakdown of calculations */
  breakdown: DimensionBreakdown[];
  
  /** Raw attributes used for calculation */
  attributes?: BotAttributes;
}

/**
 * Mogging coefficient classification
 */
export type MoggingClassification =
  | 'Nuclear Mogging'      // μ > 200
  | 'Brutal Mogging'       // 100 < μ ≤ 200
  | 'Absolute Mogging'     // 50 < μ ≤ 100
  | 'Significant Mogging'  // 20 < μ ≤ 50
  | 'Marginal Mogging'     // 5 < μ ≤ 20
  | 'Looksmatch'           // -5 ≤ μ ≤ 5
  | 'Getting Mogged';      // μ < -5 (reverse)

/**
 * Mogging coefficient calculation result
 */
export interface MoggingResult {
  /** Mogging coefficient (μ) */
  coefficient: number;
  
  /** Classification of mogging intensity */
  classification: MoggingClassification;
  
  /** Human-readable description */
  description: string;
  
  /** PSL difference (self - target) */
  pslDifference: number;
  
  /** Visibility factor multiplier */
  visibilityFactor: number;
  
  /** Direction: 'mogging' | 'mogged' | 'equal' */
  direction: 'mogging' | 'mogged' | 'equal';
  
  /** Self bot data */
  self: {
    psl: number;
    marketPresence: number;
    featureProminence: number;
  };
  
  /** Target bot data */
  target: {
    psl: number;
  };
}

/**
 * Bot comparison result
 */
export interface BotComparison {
  /** Bot A identifier */
  botA: string;
  
  /** Bot B identifier */
  botB: string;
  
  /** PSL result for bot A */
  pslA: PSLResult;
  
  /** PSL result for bot B */
  pslB: PSLResult;
  
  /** Mogging coefficient (A mogging B) */
  mogging: MoggingResult;
  
  /** Dimension comparison */
  dimensionComparison: {
    dimension: keyof DimensionScores;
    scoreA: number;
    scoreB: number;
    difference: number;
    winner: 'A' | 'B' | 'tie';
  }[];
  
  /** Overall winner */
  winner: 'A' | 'B' | 'tie';
}

/**
 * Bot profile with metadata
 */
export interface BotProfile {
  /** Bot identifier */
  id: string;
  
  /** Display name */
  name: string;
  
  /** Short description */
  description: string;
  
  /** Category/type */
  category: string;
  
  /** Bot attributes */
  attributes: BotAttributes;
  
  /** Pre-calculated PSL result */
  psl?: PSLResult;
  
  /** Metadata */
  metadata?: {
    githubUrl?: string;
    npmUrl?: string;
    docsUrl?: string;
    version?: string;
    lastUpdated?: string;
  };
}

/**
 * PSL distribution statistics
 */
export interface PSLDistribution {
  /** Mean PSL score */
  mean: number;
  
  /** Median PSL score */
  median: number;
  
  /** Standard deviation */
  standardDeviation: number;
  
  /** Minimum score */
  min: number;
  
  /** Maximum score */
  max: number;
  
  /** Percentile breakpoints */
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
    p95: number;
    p99: number;
  };
  
  /** Classification distribution */
  classificationCounts: Partial<Record<PSLClassification, number>>;
}

/**
 * Temporal PSL analysis
 */
export interface PSLTemporalAnalysis {
  /** Bot identifier */
  botId: string;
  
  /** Time series of PSL scores */
  timeline: {
    date: string;
    pslScore: number;
    dimensions: DimensionScores;
    notes?: string;
  }[];
  
  /** PSL decay rate (per year) */
  decayRate: number;
  
  /** Trend direction */
  trend: 'increasing' | 'stable' | 'declining';
  
  /** Predicted future PSL */
  predictions?: {
    date: string;
    predictedPSL: number;
    confidence: number;
  }[];
}

/**
 * Mogging network analysis
 */
export interface MoggingNetwork {
  /** Nodes (bots) in the network */
  nodes: {
    id: string;
    name: string;
    psl: number;
    classification: PSLClassification;
  }[];
  
  /** Edges (mogging relationships) */
  edges: {
    source: string;
    target: string;
    moggingCoefficient: number;
    classification: MoggingClassification;
  }[];
  
  /** Network statistics */
  statistics: {
    totalBots: number;
    avgMoggingCoefficient: number;
    mostMoggingBot: string;
    mostMoggedBot: string;
  };
}

/**
 * Configuration options for PSL calculation
 */
export interface PSLConfig {
  /** Custom dimension weights (must sum to 1.0) */
  weights?: {
    architecturalSymmetry?: number;
    featureProminence?: number;
    harmonicCohesion?: number;
    marketPresence?: number;
    scalabilityPotential?: number;
  };
  
  /** Use logarithmic scaling for market metrics */
  useLogScale?: boolean;
  
  /** Include detailed breakdown in results */
  includeBreakdown?: boolean;
  
  /** Include raw attributes in results */
  includeAttributes?: boolean;
}

/**
 * Validation result for bot attributes
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  
  /** Validation errors */
  errors: {
    field: keyof BotAttributes;
    message: string;
    value: number;
  }[];
  
  /** Validation warnings */
  warnings: {
    field: keyof BotAttributes;
    message: string;
    value: number;
  }[];
}

/**
 * Batch PSL calculation result
 */
export interface BatchPSLResult {
  /** Individual results */
  results: Map<string, PSLResult>;
  
  /** Distribution statistics */
  distribution: PSLDistribution;
  
  /** Rankings */
  rankings: {
    botId: string;
    rank: number;
    psl: number;
  }[];
  
  /** Processing metadata */
  metadata: {
    totalBots: number;
    processingTime: number;
    timestamp: string;
  };
}

/**
 * Export utility type for partial attributes (for updates)
 */
export type PartialBotAttributes = Partial<BotAttributes>;

/**
 * Export utility type for required attributes only
 */
export type RequiredBotAttributes = Required<BotAttributes>;
