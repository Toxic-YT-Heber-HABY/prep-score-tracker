
import React, { useState } from 'react';
import { Category, Activity } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ActivityItem from './ActivityItem';
import AddActivityForm from './AddActivityForm';
import { calculateCategoryAverage } from '@/lib/calculator';
import { Trash2, Edit2, Save, X, PlusCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CategoryCardProps {
  category: Category;
  onUpdate: (updatedCategory: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard = ({ category, onUpdate, onDelete }: CategoryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryWeight, setCategoryWeight] = useState(category.weight.toString());
  const [isOpen, setIsOpen] = useState(true);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryWeight(value);
  };
  
  const handleSaveCategory = () => {
    onUpdate({
      ...category,
      name: categoryName,
      weight: parseFloat(categoryWeight) || 0
    });
    setIsEditing(false);
  };
  
  const handleAddActivity = (activity: Activity) => {
    onUpdate({
      ...category,
      activities: [...category.activities, activity]
    });
  };
  
  const handleUpdateActivity = (updatedActivity: Activity) => {
    const updatedActivities = category.activities.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    
    onUpdate({
      ...category,
      activities: updatedActivities
    });
  };
  
  const handleDeleteActivity = (activityId: string) => {
    onUpdate({
      ...category,
      activities: category.activities.filter(activity => activity.id !== activityId)
    });
  };
  
  const average = calculateCategoryAverage(category.activities);

  return (
    <Card className="mb-6 shadow-md border-t-4 border-t-education-primary dark:border-gray-700 animate-scale-in hover:shadow-lg transition-all duration-300">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-2">
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Nombre de la categoría</label>
                <Input
                  value={categoryName}
                  onChange={handleNameChange}
                  placeholder="Nombre de la categoría"
                  className="input-focused"
                />
              </div>
              <div className="w-24">
                <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Peso (%)</label>
                <Input
                  type="number"
                  min="0"
                  max="100" 
                  value={categoryWeight}
                  onChange={handleWeightChange}
                  placeholder="Peso %"
                  className="input-focused"
                />
              </div>
              <div className="flex items-end mt-2 gap-2">
                <Button onClick={handleSaveCategory} className="bg-education-primary hover:bg-education-dark btn-hover">
                  <Save className="h-4 w-4 mr-1" />
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="btn-hover">
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <CollapsibleTrigger className="flex items-center text-left w-full cursor-pointer">
                <div>
                  <CardTitle className="text-xl font-semibold flex items-center dark:text-gray-100">
                    {category.name}
                    <span className="ml-2 text-sm bg-education-light text-education-dark dark:bg-education-dark/30 dark:text-education-light px-2 py-1 rounded-full">
                      {category.weight}%
                    </span>
                  </CardTitle>
                  {category.activities.length > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Promedio: {average.toFixed(2)}
                    </p>
                  )}
                </div>
              </CollapsibleTrigger>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(true)} size="sm" className="btn-hover">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground btn-hover"
                  onClick={() => onDelete(category.id)}
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent>
            {category.activities.length > 0 ? (
              category.activities.map(activity => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                  onUpdate={handleUpdateActivity}
                  onDelete={handleDeleteActivity}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 dark:text-gray-500 py-4">
                No hay actividades aún. Añade una actividad usando el formulario debajo.
              </p>
            )}
          </CardContent>
          
          <CardFooter className="border-t pt-4 dark:border-gray-700">
            <AddActivityForm onAddActivity={handleAddActivity} />
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CategoryCard;
