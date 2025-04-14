import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface AddActivityFormProps {
  onAddActivity: (activity: Activity) => void;
}

/**
 * Form component for adding new activities to a category
 */
const AddActivityForm = ({ onAddActivity }: AddActivityFormProps) => {
  const { t, language } = useI18n();
  const [activityName, setActivityName] = useState('');
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission, validates inputs and creates a new activity
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form inputs
    if (!activityName.trim()) {
      setError(language === 'es' ? 'El nombre de la actividad es obligatorio' : 'Activity name is required');
      return;
    }
    
    if (!weight || isNaN(parseFloat(weight))) {
      setError(language === 'es' ? 'El peso debe ser un número válido' : 'Weight must be a valid number');
      return;
    }
    
    // La calificación puede estar vacía ahora
    let gradeValue: number | string = '';
    if (grade !== '') {
      if (isNaN(parseFloat(grade))) {
        setError(language === 'es' ? 'La calificación debe ser un número válido' : 'Grade must be a valid number');
        return;
      }
      gradeValue = parseFloat(grade);
      
      if (gradeValue < 0 || gradeValue > 100) {
        setError(language === 'es' 
          ? 'La calificación debe estar entre 0 y 100' 
          : 'Grade must be between 0 and 100');
        return;
      }
    }
    
    const weightValue = parseFloat(weight);
    
    if (weightValue <= 0 || weightValue > 100) {
      setError(language === 'es' 
        ? 'El peso debe estar entre 1 y 100' 
        : 'Weight must be between 1 and 100');
      return;
    }
    
    // Create new activity object
    const newActivity: Activity = {
      id: uuidv4(),
      name: activityName.trim(),
      weight: weightValue,
      grade: gradeValue
    };
    
    // Add activity and reset form
    onAddActivity(newActivity);
    setActivityName('');
    setWeight('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-3">
      <div className="flex flex-wrap gap-2">
        <Input
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder={t('activityName')}
          className="flex-1 min-w-[150px] dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
        />
        <Input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={t('activityWeight')}
          min="0"
          max="100"
          step="0.1"
          className="w-24 dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
        />
        <Input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder={t('grade')}
          min="0"
          max="100"
          step="0.1"
          className="w-24 dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
        />
        <Button 
          type="submit" 
          className="bg-education-secondary hover:bg-education-primary transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" /> {t('addActivity')}
        </Button>
      </div>
      
      {error && (
        <div className="w-full flex items-center text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </form>
  );
};

export default AddActivityForm;
