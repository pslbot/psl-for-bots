/**
 * React Components for PSL Bot
 */

import React from 'react';
import type { PSLResult, DimensionScores, MoggingResult } from '@psl/types';

/**
 * PSL Score Display Component
 * 
 * Circular progress indicator showing PSL score
 */
export function PSLScore({
  score,
  classification,
  size = 200,
}: {
  score: number;
  classification: string;
  size?: number;
}) {
  const percentage = (score / 10) * 100;
  const circumference = 2 * Math.PI * (size / 2 - 15);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const getColor = (score: number) => {
    if (score >= 9.0) return '#27ae60';
    if (score >= 8.0) return '#2ecc71';
    if (score >= 7.0) return '#3498db';
    if (score >= 6.0) return '#95a5a6';
    if (score >= 5.0) return '#f39c12';
    if (score >= 3.0) return '#e67e22';
    return '#e74c3c';
  };
  
  const color = getColor(score);
  const radius = size / 2 - 15;
  
  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: size / 4, fontWeight: 700, color }}>
          {score.toFixed(1)}
        </div>
        <div style={{ fontSize: size / 15, color: '#7f8c8d', marginTop: 4 }}>
          {classification}
        </div>
      </div>
    </div>
  );
}

/**
 * Dimension Bars Component
 * 
 * Horizontal bar chart for dimension scores
 */
export function DimensionBars({
  dimensions,
}: {
  dimensions: DimensionScores;
}) {
  const dimensionLabels: Record<keyof DimensionScores, string> = {
    architecturalSymmetry: 'Architectural Symmetry',
    featureProminence: 'Feature Prominence',
    harmonicCohesion: 'Harmonic Cohesion',
    marketPresence: 'Market Presence',
    scalabilityPotential: 'Scalability Potential',
  };
  
  return (
    <div style={{ width: '100%' }}>
      {Object.entries(dimensions).map(([key, value]) => {
        const percentage = (value / 10) * 100;
        const color = value >= 7 ? '#3498db' : value >= 5 ? '#f39c12' : '#e74c3c';
        
        return (
          <div key={key} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 14, color: '#2c3e50' }}>
                {dimensionLabels[key as keyof DimensionScores]}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color }}>
                {value.toFixed(1)}
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: 8,
                backgroundColor: '#e0e0e0',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: color,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Mogging Coefficient Display Component
 */
export function MoggingCoefficient({
  mogging,
}: {
  mogging: MoggingResult;
}) {
  const { coefficient, classification, direction } = mogging;
  
  const getColor = () => {
    if (direction === 'equal') return '#95a5a6';
    if (direction === 'mogging') {
      if (Math.abs(coefficient) > 100) return '#27ae60';
      if (Math.abs(coefficient) > 50) return '#2ecc71';
      return '#3498db';
    }
    return '#e74c3c';
  };
  
  const color = getColor();
  
  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <div style={{ fontSize: 48, fontWeight: 700, color }}>
        μ = {coefficient.toFixed(0)}
      </div>
      <div style={{ fontSize: 20, marginTop: 8, color: '#2c3e50' }}>
        {classification}
      </div>
      {direction !== 'equal' && (
        <div style={{ fontSize: 32, marginTop: 16 }}>
          {direction === 'mogging' ? '⬆️' : '⬇️'}
        </div>
      )}
    </div>
  );
}

/**
 * Percentile Badge Component
 */
export function PercentileBadge({
  percentile,
}: {
  percentile: number;
}) {
  const getLabel = () => {
    if (percentile >= 99) return 'Top 1%';
    if (percentile >= 95) return 'Top 5%';
    if (percentile >= 90) return 'Top 10%';
    if (percentile >= 75) return 'Top 25%';
    return `${percentile}th percentile`;
  };
  
  const getColor = () => {
    if (percentile >= 90) return '#27ae60';
    if (percentile >= 75) return '#3498db';
    if (percentile >= 50) return '#f39c12';
    return '#95a5a6';
  };
  
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 16,
        backgroundColor: getColor(),
        color: 'white',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {getLabel()}
    </span>
  );
}

/**
 * PSL Result Card Component
 * 
 * Complete card showing all PSL information
 */
export function PSLResultCard({
  result,
  botName,
}: {
  result: PSLResult;
  botName?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: 32,
      }}
    >
      {botName && (
        <h2 style={{ marginTop: 0, marginBottom: 24, color: '#2c3e50' }}>
          {botName}
        </h2>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32 }}>
        <PSLScore
          score={result.pslScore}
          classification={result.classification}
        />
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 8 }}>
            <PercentileBadge percentile={result.percentile} />
          </div>
          <p style={{ color: '#7f8c8d', margin: 0 }}>
            {result.percentile >= 90
              ? 'Elite tier bot. Exceptional quality.'
              : result.percentile >= 75
              ? 'High quality bot. Above average.'
              : result.percentile >= 50
              ? 'Average bot. Room for improvement.'
              : 'Below average. Consider improvements.'}
          </p>
        </div>
      </div>
      <DimensionBars dimensions={result.dimensions} />
    </div>
  );
}
