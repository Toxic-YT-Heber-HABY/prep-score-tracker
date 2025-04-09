
export interface Activity {
  id: string;
  name: string;
  weight: number;
  grade: number;
}

export interface Category {
  id: string;
  name: string;
  weight: number;
  activities: Activity[];
}

export interface CalculationResult {
  categoryId: string;
  categoryName: string;
  categoryWeight: number;
  average: number;
  points: number;
  base10Points: number;
}
