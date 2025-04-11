
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { toast } from "sonner";

interface AddCategoryFormProps {
  onAddCategory: (category: Category) => void;
}

/**
 * Form component for adding new categories to the grade tracker
 */
const AddCategoryForm = ({ onAddCategory }: AddCategoryFormProps) => {
  const { t, language } = useI18n();
  const [categoryName, setCategoryName] = useState('');
  const [categoryWeight, setCategoryWeight] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission, validates inputs and creates a new category
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form inputs
    if (!categoryName.trim()) {
      setError(language === 'es' ? 'El nombre de la categoría es obligatorio' : 'Category name is required');
      return;
    }
    
    if (!categoryWeight || isNaN(parseFloat(categoryWeight))) {
      setError(language === 'es' ? 'El peso debe ser un número válido' : 'Weight must be a valid number');
      return;
    }
    
    const weightValue = parseFloat(categoryWeight);
    if (weightValue <= 0 || weightValue > 100) {
      setError(language === 'es' 
        ? 'El peso debe estar entre 1 y 100' 
        : 'Weight must be between 1 and 100');
      return;
    }
    
    // Create new category object
    const newCategory: Category = {
      id: uuidv4(),
      name: categoryName.trim(),
      weight: weightValue,
      activities: []
    };
    
    // Add category and reset form
    onAddCategory(newCategory);
    setCategoryName('');
    setCategoryWeight('');
  };

  return (
    <Card className="mb-6 border-dashed border-2 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <h3 className="font-medium text-gray-500 dark:text-gray-400">{t('addCategory')}</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder={t('categoryName')}
              className="w-full dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
            />
          </div>
          <div className="w-32">
            <Input
              type="number"
              value={categoryWeight}
              onChange={(e) => setCategoryWeight(e.target.value)}
              placeholder={t('categoryWeight')}
              min="0"
              max="100"
              step="0.1"
              className="w-full dark:bg-gray-700 dark:border-gray-600 focus:ring-education-primary"
            />
          </div>
          <div>
            <Button type="submit" className="bg-education-primary hover:bg-education-secondary transition-colors">
              <Plus className="h-4 w-4 mr-1" /> {t('categories')}
            </Button>
          </div>
          
          {error && (
            <div className="w-full mt-2 flex items-center text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;
