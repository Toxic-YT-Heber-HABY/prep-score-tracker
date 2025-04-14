import React, { useState, useMemo } from 'react';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { calculateResults } from '@/lib/calculator';
import { Trophy, Calculator } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface GradeNeededCalculatorProps {
  categories: Category[];
}

const GradeNeededCalculator: React.FC<GradeNeededCalculatorProps> = ({ categories }) => {
  const { language } = useI18n();
  const [targetGrade, setTargetGrade] = useState<string>('70');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');
  const [calculatedGrade, setCalculatedGrade] = useState<number | null>(null);
  
  // Get the selected category based on the ID
  const selectedCategory = useMemo(() => {
    return categories.find(cat => cat.id === selectedCategoryId);
  }, [categories, selectedCategoryId]);
  
  // Reset activity selection when category changes
  React.useEffect(() => {
    setSelectedActivityId('');
    setCalculatedGrade(null);
  }, [selectedCategoryId]);
  
  // Calculate what grade is needed to reach the target
  const calculateNeededGrade = () => {
    if (!selectedCategory || !selectedActivityId || !targetGrade || isNaN(parseFloat(targetGrade))) {
      toast.error(language === 'es' 
        ? 'Por favor, completa todos los campos correctamente' 
        : 'Please fill out all fields correctly');
      return;
    }
    
    const targetGradeNum = parseFloat(targetGrade);
    if (targetGradeNum <= 0 || targetGradeNum > 100) {
      toast.error(language === 'es' 
        ? 'La calificación objetivo debe estar entre 1 y 100' 
        : 'Target grade must be between 1 and 100');
      return;
    }
    
    // Create a deep copy of the categories to simulate changes
    const categoriesCopy = JSON.parse(JSON.stringify(categories)) as Category[];
    const categoryIndex = categoriesCopy.findIndex(cat => cat.id === selectedCategoryId);
    
    if (categoryIndex === -1) return;
    
    const activityIndex = categoriesCopy[categoryIndex].activities.findIndex(
      act => act.id === selectedActivityId
    );
    
    if (activityIndex === -1) return;
    
    // Try different grade values using a binary search approach
    let minGrade = 0;
    let maxGrade = 100;
    let neededGrade = 0;
    let closestGrade = { grade: 0, difference: Number.MAX_VALUE };
    
    for (let i = 0; i < 20; i++) { // 20 iterations should be enough for precision
      const midGrade = (minGrade + maxGrade) / 2;
      
      // Set the test grade
      categoriesCopy[categoryIndex].activities[activityIndex].grade = midGrade;
      
      // Calculate results with this test grade
      const { totalPoints } = calculateResults(categoriesCopy);
      const finalGrade = totalPoints * 10; // Convert to 100 scale
      
      const difference = Math.abs(finalGrade - targetGradeNum);
      
      // Keep track of closest solution
      if (difference < closestGrade.difference) {
        closestGrade = { grade: midGrade, difference };
      }
      
      if (Math.abs(finalGrade - targetGradeNum) < 0.01) {
        neededGrade = midGrade;
        break;
      } else if (finalGrade < targetGradeNum) {
        minGrade = midGrade;
      } else {
        maxGrade = midGrade;
      }
    }
    
    // Use the closest solution if we didn't converge
    if (neededGrade === 0) {
      neededGrade = closestGrade.grade;
    }
    
    // Round to 2 decimal places
    neededGrade = Math.round(neededGrade * 100) / 100;
    
    // Check if the needed grade is achievable
    if (neededGrade > 100) {
      toast.error(language === 'es' 
        ? 'No es posible alcanzar la calificación objetivo, incluso con 100 en esta actividad' 
        : 'It is not possible to reach the target grade, even with 100 in this activity');
      setCalculatedGrade(null);
    } else {
      setCalculatedGrade(neededGrade);
      toast.success(language === 'es' 
        ? `Necesitas obtener ${neededGrade} en esta actividad para alcanzar ${targetGrade}` 
        : `You need to get ${neededGrade} in this activity to reach ${targetGrade}`);
    }
  };
  
  // Check if the form can be submitted
  const canSubmit = selectedCategoryId && selectedActivityId && targetGrade && !isNaN(parseFloat(targetGrade));
  
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg border-t-4 border-t-education-primary">
      <CardHeader className="bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 rounded-t-lg pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5 text-education-primary" />
          {language === 'es' ? '¿Qué necesito para aprobar?' : 'What do I need to pass?'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="target-grade">
              {language === 'es' ? 'Calificación objetivo' : 'Target grade'}
            </Label>
            <Input
              id="target-grade"
              type="number"
              min="1"
              max="100"
              step="0.1"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value)}
              placeholder="70"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="category-select">
              {language === 'es' ? 'Categoría' : 'Category'}
            </Label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <SelectTrigger id="category-select" className="mt-1">
                <SelectValue placeholder={language === 'es' ? 'Selecciona una categoría' : 'Select a category'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedCategory && (
            <div>
              <Label htmlFor="activity-select">
                {language === 'es' ? 'Actividad' : 'Activity'}
              </Label>
              <Select
                value={selectedActivityId}
                onValueChange={setSelectedActivityId}
              >
                <SelectTrigger id="activity-select" className="mt-1">
                  <SelectValue placeholder={language === 'es' ? 'Selecciona una actividad' : 'Select an activity'} />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory.activities.map((activity) => (
                    <SelectItem key={activity.id} value={activity.id}>
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <Button 
            onClick={calculateNeededGrade}
            disabled={!canSubmit}
            className="w-full bg-education-primary hover:bg-education-dark transition-colors"
          >
            {language === 'es' ? 'Calcular' : 'Calculate'}
          </Button>
          
          {calculatedGrade !== null && (
            <div className="mt-4 p-3 bg-education-light dark:bg-education-dark/20 rounded-md border border-education-primary/20 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-education-primary flex-shrink-0" />
              <p>
                {language === 'es' 
                  ? `Necesitas obtener ${calculatedGrade} en esta actividad para alcanzar una calificación final de ${targetGrade}.` 
                  : `You need to get ${calculatedGrade} in this activity to reach a final grade of ${targetGrade}.`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeNeededCalculator;
