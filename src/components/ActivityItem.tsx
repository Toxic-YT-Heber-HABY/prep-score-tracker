import React from 'react';
import { Activity } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { toast } from "sonner";

interface ActivityItemProps {
  activity: Activity;
  onUpdate: (updatedActivity: Activity) => void;
  onDelete: (id: string) => void;
}

/**
 * Component for displaying and editing a single activity within a category
 */
const ActivityItem = ({ activity, onUpdate, onDelete }: ActivityItemProps) => {
  const { t, language } = useI18n();
  
  /**
   * Handles changes to activity fields
   * @param field The field to update (name, weight, grade)
   * @param value The new value for the field
   */
  const handleChange = (field: keyof Activity, value: string) => {
    // Handle empty name
    if (field === 'name' && !value.trim()) {
      toast.error(language === 'es' 
        ? 'El nombre de la actividad no puede estar vacío' 
        : 'Activity name cannot be empty');
      return;
    }
    
    let parsedValue: string | number = value;
    
    if (field === 'weight' || field === 'grade') {
      // Allow empty values for weight and grade fields
      if (value === '') {
        parsedValue = '';
      } else if (isNaN(parseFloat(value))) {
        // Only show error if input is not empty and not a number
        toast.error(language === 'es' 
          ? 'Por favor ingresa un número válido' 
          : 'Please enter a valid number');
        return;
      } else {
        // Parse and limit numerical values
        parsedValue = Math.min(100, Math.max(0, parseFloat(value)));
        
        // Provide feedback on capped values
        if (parseFloat(value) > 100) {
          toast.info(language === 'es' 
            ? 'El valor máximo permitido es 100' 
            : 'Maximum allowed value is 100');
        } else if (parseFloat(value) < 0) {
          toast.info(language === 'es' 
            ? 'El valor mínimo permitido es 0' 
            : 'Minimum allowed value is 0');
        }
      }
    }
    
    // Update the activity with the validated value
    onUpdate({
      ...activity,
      [field]: parsedValue
    });
  };

  /**
   * Handles activity deletion with confirmation
   */
  const confirmDelete = () => {
    if (window.confirm(language === 'es' 
      ? `¿Estás seguro de que deseas eliminar la actividad "${activity.name}"?` 
      : `Are you sure you want to delete the activity "${activity.name}"?`)) {
      onDelete(activity.id);
      toast.success(language === 'es' 
        ? `Actividad "${activity.name}" eliminada` 
        : `Activity "${activity.name}" deleted`);
    }
  };

  // Determine color class based on grade value for visual feedback
  const getGradeColorClass = () => {
    if (activity.grade === '' || activity.grade === undefined) return "";
    if (typeof activity.grade === 'string') return "";
    if (activity.grade < 60) return "text-red-600 dark:text-red-400";
    if (activity.grade < 70) return "text-amber-600 dark:text-amber-400";
    if (activity.grade < 85) return "text-blue-600 dark:text-blue-400";
    return "text-green-600 dark:text-green-400";
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border rounded-md bg-white dark:bg-gray-800 mb-2 hover:shadow-md transition-all">
      <div className="flex-1 min-w-[150px]">
        <label className="text-xs text-gray-500 dark:text-gray-400 block">{t('activityName')}</label>
        <Input
          value={activity.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
          placeholder={t('activityName')}
        />
      </div>
      <div className="w-24">
        <label className="text-xs text-gray-500 dark:text-gray-400 block">{t('activityWeight')}</label>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={activity.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          className="mt-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
        />
      </div>
      <div className="w-24">
        <label className="text-xs text-gray-500 dark:text-gray-400 block">{t('grade')}</label>
        <Input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={activity.grade}
          onChange={(e) => handleChange('grade', e.target.value)}
          className={`mt-1 dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary ${getGradeColorClass()}`}
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={confirmDelete}
        className="h-8 w-8 mt-4 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
        title={language === 'es' ? "Eliminar actividad" : "Delete activity"}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActivityItem;
