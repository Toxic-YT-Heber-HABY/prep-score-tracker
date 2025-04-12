
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Category, CalculationResult } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';

interface ProgressChartProps {
  categories: Category[];
  results: CalculationResult[];
}

const ProgressChart = ({ categories, results }: ProgressChartProps) => {
  const { language } = useI18n();

  // Generate colors for each category
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#FF6B6B'];
  
  // Format data for pie chart
  const pieChartData = useMemo(() => {
    return results.map((result, index) => ({
      name: result.categoryName,
      value: result.categoryWeight,
      earned: result.points,
      points: result.base10Points,
      fill: COLORS[index % COLORS.length]
    }));
  }, [results]);

  // Format data for category comparison chart
  const categoryComparisonData = useMemo(() => {
    return results.map((result, index) => ({
      name: result.categoryName,
      percentage: (result.average / 100) * 100,
      fill: COLORS[index % COLORS.length]
    }));
  }, [results]);

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">
            <span className="font-medium">{language === 'es' ? 'Peso:' : 'Weight:'}</span> {payload[0].value}%
          </p>
          <p className="text-sm">
            <span className="font-medium">{language === 'es' ? 'Puntos ganados:' : 'Earned points:'}</span> {payload[0].payload.earned.toFixed(2)}
          </p>
          <p className="text-sm">
            <span className="font-medium">{language === 'es' ? 'Contribución:' : 'Contribution:'}</span> {payload[0].payload.points.toFixed(2)} / 10
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-md overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        <CardTitle className="text-xl dark:text-gray-100">
          {language === 'es' ? 'Análisis de Categorías' : 'Category Analysis'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pie chart showing distribution of weights */}
          <div className="bg-white dark:bg-gray-800/30 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium mb-2 text-center dark:text-gray-200">
              {language === 'es' ? 'Distribución de Pesos' : 'Weight Distribution'}
            </h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {pieChartData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.fill }}
                  />
                  <span className="text-xs dark:text-gray-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bar chart showing performance per category */}
          <div className="bg-white dark:bg-gray-800/30 rounded-lg p-4 shadow-sm">
            <h4 className="text-sm font-medium mb-2 text-center dark:text-gray-200">
              {language === 'es' ? 'Rendimiento por Categoría' : 'Performance by Category'}
            </h4>
            <div className="space-y-3 mt-4">
              {results.map((result, index) => (
                <div key={`bar-${index}`} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700 dark:text-gray-300">{result.categoryName}</span>
                    <span className="text-gray-700 dark:text-gray-300">{result.average.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${result.average}%`, 
                        backgroundColor: COLORS[index % COLORS.length] 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;
