
import React, { useState } from 'react';
import { Category, Activity } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ActivityItem from './ActivityItem';
import AddActivityForm from './AddActivityForm';
import { calculateCategoryAverage } from '@/lib/calculator';
import { Trash2 } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onUpdate: (updatedCategory: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard = ({ category, onUpdate, onDelete }: CategoryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState(category.name);
  const [categoryWeight, setCategoryWeight] = useState(category.weight.toString());
  
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
    <Card className="mb-6 shadow-md border-t-4 border-t-education-primary">
      <CardHeader className="pb-2">
        {isEditing ? (
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 block mb-1">Nombre de la categoría</label>
              <Input
                value={categoryName}
                onChange={handleNameChange}
                placeholder="Nombre de la categoría"
              />
            </div>
            <div className="w-24">
              <label className="text-xs text-gray-500 block mb-1">Peso (%)</label>
              <Input
                type="number"
                min="0"
                max="100" 
                value={categoryWeight}
                onChange={handleWeightChange}
                placeholder="Peso %"
              />
            </div>
            <div className="flex items-end mt-2 gap-2">
              <Button onClick={handleSaveCategory} className="bg-education-primary">
                Guardar
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center">
                {category.name}
                <span className="ml-2 text-sm bg-education-light text-education-dark px-2 py-1 rounded-full">
                  {category.weight}%
                </span>
              </CardTitle>
              {category.activities.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Promedio: {average.toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                Editar
              </Button>
              <Button 
                variant="outline" 
                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => onDelete(category.id)}
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      
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
          <p className="text-center text-gray-400 py-4">No hay actividades aún</p>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <AddActivityForm onAddActivity={handleAddActivity} />
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
