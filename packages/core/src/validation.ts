/**
 * Bot Attribute Validation
 * 
 * Validates bot attributes to ensure they meet PSL calculation requirements
 */

import type { BotAttributes, ValidationResult } from '@psl/types';

/**
 * Validate bot attributes
 * 
 * Checks that all attributes are present and within valid ranges
 * 
 * @param attributes - Bot attributes to validate
 * @returns Validation result with errors and warnings
 */
export function validateAttributes(
  attributes: BotAttributes
): ValidationResult {
  const errors: ValidationResult['errors'] = [];
  const warnings: ValidationResult['warnings'] = [];
  
  // Check 0-10 scale attributes
  const scaleAttributes: Array<keyof BotAttributes> = [
    'packageSymmetry',
    'apiConsistency',
    'namingUniformity',
    'hierarchyBalance',
    'functionalDistinctiveness',
    'uspStrength',
    'discoverability',
    'marketingClarity',
    'apiCohesion',
    'typeConsistency',
    'errorHandling',
    'documentation',
    'communityScore',
    'docsSiteScore',
    'horizontalScaling',
    'performance',
    'extensibility',
    'technicalDebt',
  ];
  
  for (const attr of scaleAttributes) {
    const value = attributes[attr];
    
    if (typeof value !== 'number') {
      errors.push({
        field: attr,
        message: `Must be a number`,
        value,
      });
      continue;
    }
    
    if (value < 0 || value > 10) {
      errors.push({
        field: attr,
        message: `Must be between 0 and 10`,
        value,
      });
    }
    
    // Warnings for extreme values
    if (value === 10) {
      warnings.push({
        field: attr,
        message: `Perfect score of 10 is rare. Consider if this is truly exceptional.`,
        value,
      });
    }
    if (value === 0) {
      warnings.push({
        field: attr,
        message: `Score of 0 indicates complete absence. Verify this is accurate.`,
        value,
      });
    }
  }
  
  // Check market metrics (non-negative)
  if (attributes.githubStars < 0) {
    errors.push({
      field: 'githubStars',
      message: 'Cannot be negative',
      value: attributes.githubStars,
    });
  }
  
  if (attributes.npmDownloads < 0) {
    errors.push({
      field: 'npmDownloads',
      message: 'Cannot be negative',
      value: attributes.npmDownloads,
    });
  }
  
  // Warnings for suspicious values
  if (attributes.githubStars === 0 && attributes.npmDownloads === 0) {
    warnings.push({
      field: 'githubStars',
      message: 'Zero stars and downloads suggests no public presence',
      value: 0,
    });
  }
  
  if (
    attributes.githubStars > 100000 &&
    attributes.npmDownloads < 10000
  ) {
    warnings.push({
      field: 'npmDownloads',
      message: 'High GitHub stars but low NPM downloads is unusual',
      value: attributes.npmDownloads,
    });
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Check if attributes are complete (all fields present)
 * 
 * @param attributes - Partial bot attributes
 * @returns True if all fields are present
 */
export function isComplete(attributes: Partial<BotAttributes>): boolean {
  const requiredFields: Array<keyof BotAttributes> = [
    'packageSymmetry',
    'apiConsistency',
    'namingUniformity',
    'hierarchyBalance',
    'functionalDistinctiveness',
    'uspStrength',
    'discoverability',
    'marketingClarity',
    'apiCohesion',
    'typeConsistency',
    'errorHandling',
    'documentation',
    'githubStars',
    'npmDownloads',
    'communityScore',
    'docsSiteScore',
    'horizontalScaling',
    'performance',
    'extensibility',
    'technicalDebt',
  ];
  
  return requiredFields.every((field) => field in attributes);
}

/**
 * Normalize attributes (clamp to valid ranges)
 * 
 * @param attributes - Bot attributes
 * @returns Normalized attributes
 */
export function normalizeAttributes(
  attributes: BotAttributes
): BotAttributes {
  const normalized = { ...attributes };
  
  // Clamp 0-10 attributes
  const scaleAttributes: Array<keyof BotAttributes> = [
    'packageSymmetry',
    'apiConsistency',
    'namingUniformity',
    'hierarchyBalance',
    'functionalDistinctiveness',
    'uspStrength',
    'discoverability',
    'marketingClarity',
    'apiCohesion',
    'typeConsistency',
    'errorHandling',
    'documentation',
    'communityScore',
    'docsSiteScore',
    'horizontalScaling',
    'performance',
    'extensibility',
    'technicalDebt',
  ];
  
  for (const attr of scaleAttributes) {
    normalized[attr] = Math.max(0, Math.min(10, normalized[attr]));
  }
  
  // Ensure market metrics are non-negative
  normalized.githubStars = Math.max(0, normalized.githubStars);
  normalized.npmDownloads = Math.max(0, normalized.npmDownloads);
  
  return normalized;
}
