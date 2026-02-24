
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity } from "@/types";
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface ActivityItemProps {
  activity: Activity;
  onUpdate: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, onUpdate, onDelete }) => {
  const { language } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState(activity);

  const handleSave = () => {
    onUpdate(editedActivity);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedActivity(activity);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-education-primary/30 shadow-md space-y-4">
        <Input
          value={editedActivity.name}
          onChange={(e) => setEditedActivity({...editedActivity, name: e.target.value})}
          placeholder={language === 'es' ? "Nombre de la actividad" : "Activity name"}
          className="rounded-lg border-2 focus:border-education-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
              {language === 'es' ? 'Valor (%)' : 'Value (%)'}
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              value={editedActivity.weight}
              onChange={(e) => setEditedActivity({...editedActivity, weight: Number(e.target.value)})}
              className="rounded-lg border-2 focus:border-education-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
              {language === 'es' ? 'Calificación obtenida' : 'Grade obtained'}
            </label>
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={editedActivity.grade}
              onChange={(e) => setEditedActivity({...editedActivity, grade: e.target.value})}
              className="rounded-lg border-2 focus:border-education-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button 
            onClick={handleSave} 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            <Check size={16} />
            <span className="sr-only">{language === 'es' ? 'Guardar' : 'Save'}</span>
          </Button>
          <Button 
            onClick={handleCancel} 
            size="sm" 
            variant="outline"
            className="rounded-lg border-2"
            aria-label={language === 'es' ? 'Cancelar edición' : 'Cancel editing'}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-200 hover:border-education-primary/30">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {activity.name}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                {language === 'es' ? 'Valor:' : 'Value:'}
              </span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-lg font-semibold">
                {activity.weight}%
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                {language === 'es' ? 'Calificación:' : 'Grade:'}
              </span>
              <span className={`px-2 py-1 rounded-lg font-semibold ${
                activity.grade === '' || activity.grade === null || activity.grade === undefined
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  : Number(activity.grade) >= 70 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              }`}>
                {activity.grade === '' || activity.grade === null || activity.grade === undefined 
                  ? (language === 'es' ? 'Sin calificar' : 'Not graded')
                  : `${activity.grade}/100`}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 ml-4">
          <Button 
            onClick={() => setIsEditing(true)}
            size="sm" 
            variant="outline"
            className="text-education-primary hover:bg-education-primary hover:text-white rounded-lg border-2"
            aria-label={language === 'es' ? `Editar ${activity.name}` : `Edit ${activity.name}`}
          >
            <Edit2 size={16} />
          </Button>
          <Button 
            onClick={() => onDelete(activity.id)}
            size="sm" 
            variant="outline"
            className="text-red-600 hover:bg-red-600 hover:text-white rounded-lg border-2"
            aria-label={language === 'es' ? `Eliminar ${activity.name}` : `Delete ${activity.name}`}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
