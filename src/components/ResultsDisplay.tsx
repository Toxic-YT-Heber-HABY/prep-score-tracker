
import React from 'react';
import { Category, CalculationResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { validateCategoryWeights, calculateResults } from '@/lib/calculator';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import ExportOptions from './ExportOptions';

interface ResultsDisplayProps {
  categories: Category[];
}

const ResultsDisplay = ({ categories }: ResultsDisplayProps) => {
  const hasCategories = categories.length > 0;
  const hasActivities = categories.some(category => category.activities.length > 0);
  const isWeightValid = validateCategoryWeights(categories);
  
  // Early returns for invalid states
  if (!hasCategories) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl dark:text-gray-100">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400 dark:text-gray-500 py-4">
            Añade categorías para ver los resultados
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (!hasActivities) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl dark:text-gray-100">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400 dark:text-gray-500 py-4">
            Añade actividades a tus categorías para ver los resultados
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (!isWeightValid) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl dark:text-gray-100">Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Las ponderaciones de las categorías deben sumar exactamente 100%
              {` (Actual: ${categories.reduce((sum, cat) => sum + cat.weight, 0)}%)`}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  const { results, totalPoints } = calculateResults(categories);
  
  // Determine color based on totalPoints (0-10 scale)
  const getGradeColor = (points: number) => {
    if (points < 6) return 'text-red-500';
    if (points < 8) return 'text-amber-500';
    if (points < 9) return 'text-blue-500';
    return 'text-green-500';
  };
  
  // Convert to percentage for progress bar
  const progressPercentage = (totalPoints * 10);
  
  return (
    <Card className="shadow-md dark:border-gray-700 animate-fade-in" id="results-card">
      <CardHeader className="pb-2 bg-education-light dark:bg-education-dark/30">
        <CardTitle className="text-xl text-education-dark dark:text-education-light">
          Calificación Final
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-6 text-center">
          <span className={`text-5xl font-bold ${getGradeColor(totalPoints)}`}>
            {totalPoints.toFixed(1)}
          </span>
          <span className="text-lg text-gray-500 ml-1">/ 10</span>
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2 dark:text-gray-300">Categoría</th>
                <th className="text-center py-2 dark:text-gray-300">Peso</th>
                <th className="text-center py-2 dark:text-gray-300">Promedio</th>
                <th className="text-center py-2 dark:text-gray-300">Puntos (100)</th>
                <th className="text-center py-2 dark:text-gray-300">Puntos (10)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result: CalculationResult) => (
                <tr key={result.categoryId} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-2 dark:text-gray-300">{result.categoryName}</td>
                  <td className="text-center py-2 dark:text-gray-300">{result.categoryWeight}%</td>
                  <td className="text-center py-2 dark:text-gray-300">{result.average.toFixed(2)}</td>
                  <td className="text-center py-2 dark:text-gray-300">{result.points.toFixed(2)}</td>
                  <td className="text-center py-2 dark:text-gray-300">{result.base10Points.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50 dark:bg-gray-800/50">
                <td colSpan={3} className="py-3 text-right dark:text-gray-300">Calificación Total:</td>
                <td className="text-center py-3 dark:text-gray-300">{(totalPoints * 10).toFixed(2)}</td>
                <td className="text-center py-3 dark:text-gray-300">{totalPoints.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-md">
          <h3 className="font-medium mb-2 dark:text-gray-300">Explicación del cálculo:</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Para cada categoría con múltiples actividades, se calcula un promedio ponderado.</li>
            <li>Para categorías con una sola actividad, se usa directamente la calificación.</li>
            <li>Se multiplica el promedio por el peso de la categoría y se divide entre 100.</li>
            <li>Se suman los puntos de todas las categorías para obtener la calificación final.</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end dark:border-gray-700">
        <ExportOptions />
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;
