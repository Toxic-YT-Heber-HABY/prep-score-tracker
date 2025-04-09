
import React from 'react';
import { Activity } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface ActivityItemProps {
  activity: Activity;
  onUpdate: (updatedActivity: Activity) => void;
  onDelete: (id: string) => void;
}

const ActivityItem = ({ activity, onUpdate, onDelete }: ActivityItemProps) => {
  const handleChange = (field: keyof Activity, value: string) => {
    let parsedValue: string | number = value;
    
    if (field === 'weight' || field === 'grade') {
      parsedValue = value === '' ? 0 : Math.min(100, Math.max(0, parseFloat(value)));
    }
    
    onUpdate({
      ...activity,
      [field]: parsedValue
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 border rounded-md bg-white mb-2">
      <div className="flex-1 min-w-[150px]">
        <label className="text-xs text-gray-500 block">Nombre</label>
        <Input
          value={activity.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="mt-1"
          placeholder="Nombre de la actividad"
        />
      </div>
      <div className="w-20">
        <label className="text-xs text-gray-500 block">Peso (%)</label>
        <Input
          type="number"
          min="0"
          max="100"
          value={activity.weight}
          onChange={(e) => handleChange('weight', e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-20">
        <label className="text-xs text-gray-500 block">Calif.</label>
        <Input
          type="number"
          min="0"
          max="100"
          value={activity.grade}
          onChange={(e) => handleChange('grade', e.target.value)}
          className="mt-1"
        />
      </div>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onDelete(activity.id)}
        className="h-8 w-8 mt-4"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ActivityItem;
