
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddActivityFormProps {
  onAddActivity: (activity: Activity) => void;
}

const AddActivityForm = ({ onAddActivity }: AddActivityFormProps) => {
  const [activityName, setActivityName] = useState('');
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityName || !weight || !grade) {
      return;
    }
    
    const newActivity: Activity = {
      id: uuidv4(),
      name: activityName,
      weight: parseFloat(weight),
      grade: parseFloat(grade)
    };
    
    onAddActivity(newActivity);
    setActivityName('');
    setWeight('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex flex-wrap gap-2">
      <Input
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        placeholder="Nombre de la actividad"
        className="flex-1 min-w-[150px]"
      />
      <Input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Peso (%)"
        min="0"
        max="100"
        className="w-20"
      />
      <Input
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        placeholder="Calif."
        min="0"
        max="100"
        className="w-20"
      />
      <Button type="submit" className="bg-education-secondary hover:bg-education-primary">
        <Plus className="h-4 w-4 mr-1" /> Añadir
      </Button>
    </form>
  );
};

export default AddActivityForm;
