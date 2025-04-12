
import React, { lazy, Suspense } from 'react';
import { Category, CalculationResult } from '@/types';
import { Loader } from 'lucide-react';
import { calculateResults } from '@/lib/calculator';

// Lazy load the ProgressChart component
const ProgressChart = lazy(() => import('./ProgressChart'));

// Props interface for ResultsContent component
interface ResultsContentProps {
  categories: Category[];
  showCharts?: boolean;
}

/**
 * Component that displays the detailed results table and charts
 * This is loaded lazily to improve initial page load performance
 */
const LazyResultsContent = ({ categories, showCharts = true }: ResultsContentProps) => {
  const { results, totalPoints } = calculateResults(categories);
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Results table will be kept in ResultsDisplay.tsx */}
      
      {/* Visual charts - only show if requested and there's data */}
      {showCharts && categories.length > 0 && categories.some(c => c.activities.length > 0) && (
        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-education-primary" />
            <span className="sr-only">Cargando gráficos</span>
          </div>
        }>
          <ProgressChart categories={categories} results={results} />
        </Suspense>
      )}
    </div>
  );
};

export default LazyResultsContent;
