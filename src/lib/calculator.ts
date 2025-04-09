
import { Activity, Category, CalculationResult } from "@/types";

/**
 * Calculate category average based on activities
 */
export const calculateCategoryAverage = (activities: Activity[]): number => {
  if (activities.length === 0) return 0;
  
  const totalWeight = activities.reduce((sum, activity) => sum + activity.weight, 0);
  
  if (totalWeight === 0) return 0;
  
  const weightedSum = activities.reduce(
    (sum, activity) => sum + (activity.grade * activity.weight), 
    0
  );
  
  return weightedSum / totalWeight;
};

/**
 * Calculate category points based on average and category weight
 */
export const calculateCategoryPoints = (average: number, categoryWeight: number): number => {
  return (average * categoryWeight) / 100;
};

/**
 * Calculate all results for all categories
 */
export const calculateResults = (categories: Category[]): {
  results: CalculationResult[];
  totalPoints: number;
} => {
  const results: CalculationResult[] = categories.map(category => {
    // For categories with only one activity, use direct rule of three
    // For categories with multiple activities, calculate weighted average first
    const average = category.activities.length === 1 
      ? category.activities[0].grade 
      : calculateCategoryAverage(category.activities);
    
    const points = calculateCategoryPoints(average, category.weight);
    
    return {
      categoryId: category.id,
      categoryName: category.name,
      categoryWeight: category.weight,
      average,
      points,
      base10Points: points / 10
    };
  });
  
  const totalPoints = results.reduce((sum, result) => sum + result.points, 0) / 10;
  
  return { results, totalPoints };
};

/**
 * Validate if total category weights sum to 100%
 */
export const validateCategoryWeights = (categories: Category[]): boolean => {
  const totalWeight = categories.reduce((sum, category) => sum + category.weight, 0);
  return totalWeight === 100;
};

/**
 * Validate if activity weights within a category sum to 100%
 */
export const validateActivityWeights = (activities: Activity[]): boolean => {
  if (activities.length === 0) return true;
  if (activities.length === 1) return activities[0].weight === 100;
  
  const totalWeight = activities.reduce((sum, activity) => sum + activity.weight, 0);
  return totalWeight === 100;
};
