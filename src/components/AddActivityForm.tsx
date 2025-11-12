
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { useI18n } from '@/lib/i18n';
import { PlusCircle } from 'lucide-react';

interface AddActivityFormProps {
  onAdd: (activity: Activity) => void;
}

const AddActivityForm: React.FC<AddActivityFormProps> = ({ onAdd }) => {
  const { language } = useI18n();
  const [activityName, setActivityName] = useState('');
  const [weight, setWeight] = useState<number>(0);
  const [grade, setGrade] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityName.trim()) return;

    const newActivity: Activity = {
      id: uuidv4(),
      name: activityName,
      weight: weight,
      grade: grade
    };

    onAdd(newActivity);
    
    // Reset form
    setActivityName('');
    setWeight(0);
    setGrade('');
  };

  return (
    <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="activity-name" className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {language === 'es' ? 'Nombre de la actividad' : 'Activity name'}
            </Label>
            <Input
              id="activity-name"
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder={language === 'es' ? 'Ej: Examen parcial, Tarea 1, Proyecto final...' : 'E.g.: Midterm exam, Assignment 1, Final project...'}
              className="rounded-xl border-2 focus:border-education-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-weight" className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {language === 'es' ? 'Valor (%)' : 'Value (%)'}
            </Label>
            <Input
              id="activity-weight"
              type="number"
              min="0"
              max="100"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder={language === 'es' ? 'Ej: 25 (significa 25% del total)' : 'E.g.: 25 (means 25% of total)'}
              className="rounded-xl border-2 focus:border-education-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-grade" className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {language === 'es' ? 'Calificación que obtuviste' : 'Grade you obtained'}
            </Label>
            <Input
              id="activity-grade"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder={language === 'es' ? 'Ej: 85 (tu calificación del 0 al 100)' : 'E.g.: 85 (your grade from 0 to 100)'}
              className="rounded-xl border-2 focus:border-education-primary dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-education-primary hover:bg-education-dark text-white rounded-xl py-3 text-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            {language === 'es' ? 'Agregar actividad' : 'Add activity'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddActivityForm;
