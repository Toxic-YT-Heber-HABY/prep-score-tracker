
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddCategoryFormProps {
  onAddCategory: (category: Category) => void;
}

const AddCategoryForm = ({ onAddCategory }: AddCategoryFormProps) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryWeight, setCategoryWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName || !categoryWeight) {
      return;
    }
    
    const newCategory: Category = {
      id: uuidv4(),
      name: categoryName,
      weight: parseFloat(categoryWeight),
      activities: []
    };
    
    onAddCategory(newCategory);
    setCategoryName('');
    setCategoryWeight('');
  };

  return (
    <Card className="mb-6 border-dashed border-2 shadow-sm">
      <CardHeader className="pb-2">
        <h3 className="font-medium text-gray-500">Añadir nueva categoría</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-[200px]">
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="w-full"
            />
          </div>
          <div className="w-32">
            <Input
              type="number"
              value={categoryWeight}
              onChange={(e) => setCategoryWeight(e.target.value)}
              placeholder="Peso (%)"
              min="0"
              max="100"
              className="w-full"
            />
          </div>
          <div>
            <Button type="submit" className="bg-education-primary">
              <Plus className="h-4 w-4 mr-1" /> Categoría
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;
