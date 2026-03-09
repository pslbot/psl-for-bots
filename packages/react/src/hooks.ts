/**
 * React Hooks for PSL Bot
 */

import { useState, useEffect, useMemo } from 'react';
import { calculatePSL, calculateMogging, compareBots } from '@psl/core';
import type {
  BotAttributes,
  PSLResult,
  MoggingResult,
  BotComparison,
  PSLConfig,
} from '@psl/types';

/**
 * Hook for PSL calculation
 * 
 * @param attributes - Bot attributes
 * @param config - Optional PSL calculation config
 * @returns PSL calculation result
 * 
 * @example
 * ```tsx
 * function BotRating({ attributes }) {
 *   const result = usePSL(attributes);
 *   
 *   if (!result) return <div>Loading...</div>;
 *   
 *   return <div>PSL: {result.pslScore.toFixed(1)}</div>;
 * }
 * ```
 */
export function usePSL(
  attributes: BotAttributes | null,
  config?: PSLConfig
): PSLResult | null {
  const [result, setResult] = useState<PSLResult | null>(null);
  
  useEffect(() => {
    if (attributes) {
      const calculated = calculatePSL(attributes, config);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [attributes, config]);
  
  return result;
}

/**
 * Hook for mogging coefficient calculation
 * 
 * @param selfBot - Self bot data
 * @param targetBot - Target bot data
 * @returns Mogging calculation result
 */
export function useMogging(
  selfBot: {
    psl: number;
    marketPresence: number;
    featureProminence: number;
  } | null,
  targetBot: { psl: number } | null
): MoggingResult | null {
  const [result, setResult] = useState<MoggingResult | null>(null);
  
  useEffect(() => {
    if (selfBot && targetBot) {
      const calculated = calculateMogging(selfBot, targetBot);
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [selfBot, targetBot]);
  
  return result;
}

/**
 * Hook for bot comparison
 * 
 * @param botA - First bot identifier
 * @param pslA - PSL result for bot A
 * @param botB - Second bot identifier
 * @param pslB - PSL result for bot B
 * @returns Bot comparison result
 */
export function useBotComparison(
  botA: string | null,
  pslA: PSLResult | null,
  botB: string | null,
  pslB: PSLResult | null
): BotComparison | null {
  return useMemo(() => {
    if (botA && pslA && botB && pslB) {
      return compareBots(botA, pslA, botB, pslB);
    }
    return null;
  }, [botA, pslA, botB, pslB]);
}

/**
 * Hook for debounced PSL calculation
 * 
 * Useful for real-time calculation as user inputs attributes
 * 
 * @param attributes - Bot attributes
 * @param delay - Debounce delay in ms (default: 300)
 * @returns PSL calculation result
 */
export function useDebouncedPSL(
  attributes: BotAttributes | null,
  delay: number = 300
): PSLResult | null {
  const [debouncedAttributes, setDebouncedAttributes] =
    useState<BotAttributes | null>(attributes);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAttributes(attributes);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [attributes, delay]);
  
  return usePSL(debouncedAttributes);
}

/**
 * Hook for managing PSL calculation state with loading
 * 
 * @param attributes - Bot attributes
 * @returns Object with result, loading state, and error
 */
export function usePSLState(attributes: BotAttributes | null) {
  const [result, setResult] = useState<PSLResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (!attributes) {
      setResult(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const calculated = calculatePSL(attributes);
      setResult(calculated);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [attributes]);
  
  return { result, loading, error };
}
