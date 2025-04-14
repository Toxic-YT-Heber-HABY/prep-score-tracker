import { Activity, Category, CalculationResult } from "@/types";

/**
 * Calculate category average based on activities
 */
export const calculateCategoryAverage = (activities: Activity[]): number => {
  if (activities.length === 0) return 0;
  
  // Filter out activities with empty grade values
  const gradedActivities = activities.filter(activity => 
    activity.grade !== undefined && 
    activity.grade !== null && 
    activity.grade !== ''
  );
  
  if (gradedActivities.length === 0) return 0;
  
  const totalWeight = gradedActivities.reduce((sum, activity) => sum + activity.weight, 0);
  
  if (totalWeight === 0) return 0;
  
  const weightedSum = gradedActivities.reduce(
    (sum, activity) => {
      const grade = typeof activity.grade === 'string' 
        ? parseFloat(activity.grade) 
        : activity.grade;
      return sum + (isNaN(grade) ? 0 : grade * activity.weight);
    }, 
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
    let average = 0;
    
    if (category.activities.length === 1) {
      const onlyActivity = category.activities[0];
      average = typeof onlyActivity.grade === 'string' 
        ? (onlyActivity.grade === '' ? 0 : parseFloat(onlyActivity.grade))
        : onlyActivity.grade;
      
      if (isNaN(average)) average = 0;
    } else {
      average = calculateCategoryAverage(category.activities);
    }
    
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
