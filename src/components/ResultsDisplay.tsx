
import React from 'react';
import { Category, CalculationResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { validateCategoryWeights, calculateResults } from '@/lib/calculator';
import { AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
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
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">
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
          <p className="text-center text-gray-400 dark:text-gray-500 py-8">
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
    <Card className="shadow-xl dark:border-gray-700 animate-fade-in rounded-lg" id="results-card">
      <CardHeader className="pb-2 bg-gradient-to-r from-education-primary to-education-secondary text-white dark:from-education-dark dark:to-education-primary">
        <CardTitle className="text-xl">
          Calificación Final
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="mb-6 text-center">
          <span className={`text-6xl font-bold ${getGradeColor(totalPoints)}`}>
            {totalPoints.toFixed(1)}
          </span>
          <span className="text-lg text-gray-500 ml-1">/ 10</span>
          <div className="mt-4 max-w-md mx-auto">
            <Progress value={progressPercentage} className="h-3 rounded-full" />
            <div className="mt-1 text-xs text-gray-500 text-right">{progressPercentage.toFixed(1)}%</div>
          </div>
        </div>
      
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
              <TableRow>
                <TableHead className="w-[200px] py-2 dark:text-gray-300">Categoría</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">Peso</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">Promedio</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">Puntos (100)</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">Puntos (10)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result: CalculationResult) => (
                <TableRow key={result.categoryId} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <TableCell className="font-medium py-2 dark:text-gray-300">{result.categoryName}</TableCell>
                  <TableCell className="text-center py-2 dark:text-gray-300">{result.categoryWeight}%</TableCell>
                  <TableCell className="text-center py-2 dark:text-gray-300">{result.average.toFixed(2)}</TableCell>
                  <TableCell className="text-center py-2 dark:text-gray-300">{result.points.toFixed(2)}</TableCell>
                  <TableCell className="text-center py-2 dark:text-gray-300">{result.base10Points.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-gray-50 dark:bg-gray-800/50">
                <TableCell colSpan={3} className="py-3 text-right dark:text-gray-300">Calificación Total:</TableCell>
                <TableCell className="text-center py-3 dark:text-gray-300">{(totalPoints * 10).toFixed(2)}</TableCell>
                <TableCell className="text-center py-3 dark:text-gray-300">{totalPoints.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-800/30">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-education-primary mt-0.5" />
            <div>
              <h3 className="font-medium mb-2 dark:text-gray-300">Explicación del cálculo:</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
                <li>Para cada categoría con múltiples actividades, se calcula un promedio ponderado.</li>
                <li>Para categorías con una sola actividad, se usa directamente la calificación.</li>
                <li>Se multiplica el promedio por el peso de la categoría y se divide entre 100.</li>
                <li>Se suman los puntos de todas las categorías para obtener la calificación final.</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end dark:border-gray-700 bg-gray-50 dark:bg-gray-800/10">
        <ExportOptions />
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;
