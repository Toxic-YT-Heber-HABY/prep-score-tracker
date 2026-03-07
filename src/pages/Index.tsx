import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import CategoryCard from '@/components/CategoryCard';
import AddCategoryForm from '@/components/AddCategoryForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Info, RefreshCw } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
import { useI18n } from '@/lib/i18n';

const IntroPanel = React.lazy(() => import('@/components/IntroPanel'));
const GradeNeededCalculator = React.lazy(() => import('@/components/GradeNeededCalculator'));

const LOCAL_STORAGE_KEY = 'haby-score-tracker-data';

const Index = () => {
  const { t, language } = useI18n();
  const { theme, setTheme } = useTheme();

  const [showIntro, setShowIntro] = useState(() => !localStorage.getItem(LOCAL_STORAGE_KEY));

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try { return JSON.parse(savedData); } catch { /* ignore */ }
    }
    return [];
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    toast.success(language === 'es' ? `Categoría "${category.name}" añadida` : `Category "${category.name}" added`);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };

  const handleDeleteCategory = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    if (cat) toast.success(language === 'es' ? `Categoría "${cat.name}" eliminada` : `Category "${cat.name}" deleted`);
  };

  const handleLoadExample = () => {
    const exampleCategories: Category[] = [
      {
        id: uuidv4(), name: language === 'es' ? "Actividades" : "Activities", weight: 50,
        activities: [
          { id: uuidv4(), name: language === 'es' ? "Actividad A" : "Activity A", weight: 25, grade: 100 },
          { id: uuidv4(), name: language === 'es' ? "Actividad B" : "Activity B", weight: 25, grade: 100 },
          { id: uuidv4(), name: language === 'es' ? "Actividad C" : "Activity C", weight: 25, grade: 100 },
          { id: uuidv4(), name: language === 'es' ? "Actividad D" : "Activity D", weight: 25, grade: 60 },
        ]
      },
      {
        id: uuidv4(), name: language === 'es' ? "Proyecto" : "Project", weight: 20,
        activities: [{ id: uuidv4(), name: language === 'es' ? "Proyecto Final" : "Final Project", weight: 100, grade: 80 }]
      },
      {
        id: uuidv4(), name: language === 'es' ? "Examen" : "Exam", weight: 30,
        activities: [{ id: uuidv4(), name: language === 'es' ? "Examen Final" : "Final Exam", weight: 100, grade: 70 }]
      }
    ];
    setCategories(exampleCategories);
    toast.success(language === 'es' ? "Ejemplo cargado correctamente" : "Example loaded successfully");
  };

  const handleReset = () => {
    if (window.confirm(language === 'es' ? "¿Estás seguro de que deseas eliminar todas las categorías y actividades?" : "Are you sure you want to delete all categories and activities?")) {
      setCategories([]);
      toast.success(language === 'es' ? "Datos reiniciados correctamente" : "Data reset successfully");
    }
  };

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {showIntro && <React.Suspense fallback={null}><IntroPanel onClose={() => setShowIntro(false)} /></React.Suspense>}

      <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-6xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {t('appName') || 'HABY Score Tracker'}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {language === 'es'
              ? "Organiza tus evaluaciones por categorías y actividades para obtener tu calificación final."
              : "Organize your evaluations by categories and activities to get your final grade."}
          </p>
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <h2 className="text-xl font-semibold text-foreground">{t('categories')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleLoadExample} className="text-xs h-8">
              <Info className="h-3.5 w-3.5 mr-1" />
              {t('loadExample')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="text-xs text-destructive border-destructive/20 h-8">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              {t('reset')}
            </Button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Categories */}
          <div className="lg:col-span-7 space-y-4">
            {categories.length > 0
              ? categories.map(category => (
                  <CategoryCard key={category.id} category={category} onUpdate={handleUpdateCategory} onDelete={handleDeleteCategory} />
                ))
              : (
                <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/30">
                  <p className="text-muted-foreground">
                    {language === 'es' ? "No hay categorías. Añade una para empezar." : "No categories. Add one to get started."}
                  </p>
                </div>
              )}
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>

          {/* Results */}
          <div className="lg:col-span-5 space-y-6">
            <ResultsDisplay categories={categories} />
            <React.Suspense fallback={<div className="h-32" />}>
              <GradeNeededCalculator categories={categories} />
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
