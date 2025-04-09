
import React from 'react';
import { Category, CalculationResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { validateCategoryWeights, calculateResults } from '@/lib/calculator';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400 py-4">
            Añade categorías para ver los resultados
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (!hasActivities) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400 py-4">
            Añade actividades a tus categorías para ver los resultados
          </p>
        </CardContent>
      </Card>
    );
  }
  
  if (!isWeightValid) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
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
  
  return (
    <Card className="shadow-md" id="results-card">
      <CardHeader className="pb-2 bg-education-light">
        <CardTitle className="text-education-dark">Calificación Final</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Categoría</th>
                <th className="text-center py-2">Peso</th>
                <th className="text-center py-2">Promedio</th>
                <th className="text-center py-2">Puntos (100)</th>
                <th className="text-center py-2">Puntos (10)</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result: CalculationResult) => (
                <tr key={result.categoryId} className="border-b">
                  <td className="py-2">{result.categoryName}</td>
                  <td className="text-center py-2">{result.categoryWeight}%</td>
                  <td className="text-center py-2">{result.average.toFixed(2)}</td>
                  <td className="text-center py-2">{result.points.toFixed(2)}</td>
                  <td className="text-center py-2">{result.base10Points.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td colSpan={3} className="py-3 text-right">Calificación Total:</td>
                <td className="text-center py-3">{(totalPoints * 10).toFixed(2)}</td>
                <td className="text-center py-3">{totalPoints.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium mb-2">Explicación del cálculo:</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600">
            <li>Para cada categoría con múltiples actividades, se calcula un promedio ponderado.</li>
            <li>Para categorías con una sola actividad, se usa directamente la calificación.</li>
            <li>Se multiplica el promedio por el peso de la categoría y se divide entre 100.</li>
            <li>Se suman los puntos de todas las categorías para obtener la calificación final.</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <ExportOptions />
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;
