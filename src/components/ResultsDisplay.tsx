
import React from 'react';
import { Category, CalculationResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { validateCategoryWeights, calculateResults } from '@/lib/calculator';
import { AlertCircle, Info, Download, Printer, Share2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import ExportOptions from './ExportOptions';
import { useI18n } from '@/lib/i18n';

interface ResultsDisplayProps {
  categories: Category[];
}

// Función para determinar el color basado en la puntuación
const getProgressColorClass = (points: number): string => {
  if (points < 6) return 'bg-red-500';
  if (points < 7) return 'bg-amber-500';
  if (points < 8.5) return 'bg-education-primary';
  return 'bg-green-500';
};

/**
 * Component that calculates and displays the final results based on all categories and activities
 */
const ResultsDisplay = ({ categories }: ResultsDisplayProps) => {
  const { t } = useI18n();
  
  const hasCategories = categories.length > 0;
  const hasActivities = categories.some(category => category.activities.length > 0);
  const isWeightValid = validateCategoryWeights(categories);
  
  // Early returns for invalid states
  if (!hasCategories) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in rounded-lg overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <CardTitle className="text-xl dark:text-gray-100">{t('finalResults')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
              <Info className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-400 dark:text-gray-500 max-w-xs">
              {t('noCategories')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!hasActivities) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in rounded-lg overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <CardTitle className="text-xl dark:text-gray-100">{t('finalResults')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
              <Info className="h-10 w-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-400 dark:text-gray-500 max-w-xs">
              {t('noActivities')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!isWeightValid) {
    return (
      <Card className="shadow-md dark:border-gray-700 animate-fade-in rounded-lg overflow-hidden">
        <CardHeader className="pb-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <CardTitle className="text-xl dark:text-gray-100">{t('finalResults')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {t('invalidWeights')}
              {` (${t('actual')}: ${categories.reduce((sum, cat) => sum + cat.weight, 0)}%)`}
            </AlertDescription>
          </Alert>
          <div className="p-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 rounded-md mt-4">
            <p className="text-sm text-red-700 dark:text-red-400">
              {t('language') === 'es' 
                ? "Para calcular correctamente la calificación final, es necesario que la suma de los pesos de todas las categorías sea exactamente 100%." 
                : "To correctly calculate the final grade, the sum of all category weights must be exactly 100%."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { results, totalPoints } = calculateResults(categories);
  
  // Determine color based on totalPoints (0-10 scale)
  const getGradeColor = (points: number) => {
    if (points < 6) return 'text-red-500';
    if (points < 7) return 'text-amber-500';
    if (points < 8.5) return 'text-blue-500';
    return 'text-green-500';
  };
  
  // Convert to percentage for progress bar
  const progressPercentage = (totalPoints * 10);
  const progressColorClass = getProgressColorClass(totalPoints);
  
  // Determine pass/fail status
  const isPassing = totalPoints >= 6;
  const statusText = isPassing 
    ? (t('language') === 'es' ? 'Aprobado' : 'Passing') 
    : (t('language') === 'es' ? 'Reprobado' : 'Failing');
  const statusClass = isPassing ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  
  return (
    <Card className="shadow-xl dark:border-gray-700 animate-fade-in rounded-lg" id="results-card">
      <CardHeader className="pb-4 bg-gradient-to-r from-education-primary to-education-secondary text-white dark:from-education-dark dark:to-education-primary">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            {t('finalGrade')}
          </CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
            {statusText}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="mb-6 text-center">
          <span className={`text-6xl font-bold ${getGradeColor(totalPoints)}`}>
            {totalPoints.toFixed(1)}
          </span>
          <span className="text-lg text-gray-500 ml-1">/ 10</span>
          <div className="mt-4 max-w-md mx-auto">
            <Progress 
              value={progressPercentage} 
              className="h-3 rounded-full" 
              indicatorClassName={progressColorClass}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      
        <div className="rounded-lg border overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-gray-800/50">
              <TableRow>
                <TableHead className="w-[200px] py-2 dark:text-gray-300">{t('category')}</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">{t('weight')}</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">{t('average')}</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">{t('points100')}</TableHead>
                <TableHead className="text-center py-2 dark:text-gray-300">{t('points10')}</TableHead>
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
                <TableCell colSpan={3} className="py-3 text-right dark:text-gray-300">{t('totalGrade')}</TableCell>
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
              <h3 className="font-medium mb-2 dark:text-gray-300">{t('calculation')}</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-2">
                <li>{t('calculationExplanation1')}</li>
                <li>{t('calculationExplanation2')}</li>
                <li>{t('calculationExplanation3')}</li>
                <li>{t('calculationExplanation4')}</li>
              </ol>
              <p className="mt-3 text-sm italic text-gray-500 dark:text-gray-400">
                {t('calculationNote')}
              </p>
              
              <div className="mt-4 space-y-2 border-t pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('grade')}:</span> {t('gradeWeightExplanation')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('categoryWeight')}:</span> {t('categoryWeightExplanation')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between items-center dark:border-gray-700 bg-gray-50 dark:bg-gray-800/10">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('language') === 'es' 
            ? "Última actualización: " 
            : "Last update: "}{new Date().toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Printer size={16} />
            {t('language') === 'es' ? "Imprimir" : "Print"}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download size={16} />
            {t('language') === 'es' ? "Descargar PDF" : "Download PDF"}
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 size={16} />
            {t('language') === 'es' ? "Compartir" : "Share"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;
