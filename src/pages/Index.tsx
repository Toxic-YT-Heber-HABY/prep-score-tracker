import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import AddCategoryForm from '@/components/AddCategoryForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner";
import { Info, RefreshCw, HelpCircle, BookOpen, MessageCircle } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
import { useI18n } from '@/lib/i18n';

const IntroPanel = React.lazy(() => import('@/components/IntroPanel'));
const GradeNeededCalculator = React.lazy(() => import('@/components/GradeNeededCalculator'));

// Local storage key for persisting user data
const LOCAL_STORAGE_KEY = 'haby-score-tracker-data';

/**
 * Main page component for the HABY Score Tracker application.
 * Handles category management, theme switching, and language selection.
 */
const Index = () => {
  const {
    t,
    language,
    toggleLanguage
  } = useI18n();

  // State for showing intro panel
  const [showIntro, setShowIntro] = useState(() => {
    return !localStorage.getItem(LOCAL_STORAGE_KEY);
  });

  // State for storing categories with initial data from localStorage
  const [categories, setCategories] = useState<Category[]>(() => {
    // Try to load from localStorage on initial render
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }

    // Default to empty array if no saved data exists
    return [];
  });

  // Theme handling with hydration protection
  const {
    theme,
    setTheme
  } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Effect to ensure hydration is complete before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  /**
   * Adds a new category to the tracker
   * @param category The category object to add
   */
  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    // Show confirmation toast in the current language
    toast.success(language === 'es' ? `Categoría "${category.name}" añadida` : `Category "${category.name}" added`);
  };

  /**
   * Updates an existing category with new data
   * @param updatedCategory The updated category object
   */
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => prev.map(category => category.id === updatedCategory.id ? updatedCategory : category));
  };

  /**
   * Removes a category from the tracker
   * @param categoryId ID of the category to delete
   */
  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(category => category.id !== categoryId));

    // Show confirmation toast if category was found
    if (categoryToDelete) {
      toast.success(language === 'es' ? `Categoría "${categoryToDelete.name}" eliminada` : `Category "${categoryToDelete.name}" deleted`);
    }
  };

  /**
   * Loads example data for demonstration purposes
   */
  const handleLoadExample = () => {
    const exampleCategories: Category[] = [{
      id: uuidv4(),
      name: language === 'es' ? "Actividades" : "Activities",
      weight: 50,
      activities: [{
        id: uuidv4(),
        name: language === 'es' ? "Actividad A" : "Activity A",
        weight: 25,
        grade: 100
      }, {
        id: uuidv4(),
        name: language === 'es' ? "Actividad B" : "Activity B",
        weight: 25,
        grade: 100
      }, {
        id: uuidv4(),
        name: language === 'es' ? "Actividad C" : "Activity C",
        weight: 25,
        grade: 100
      }, {
        id: uuidv4(),
        name: language === 'es' ? "Actividad D" : "Activity D",
        weight: 25,
        grade: 60
      }]
    }, {
      id: uuidv4(),
      name: language === 'es' ? "Proyecto" : "Project",
      weight: 20,
      activities: [{
        id: uuidv4(),
        name: language === 'es' ? "Proyecto Final" : "Final Project",
        weight: 100,
        grade: 80
      }]
    }, {
      id: uuidv4(),
      name: language === 'es' ? "Examen" : "Exam",
      weight: 30,
      activities: [{
        id: uuidv4(),
        name: language === 'es' ? "Examen Final" : "Final Exam",
        weight: 100,
        grade: 70
      }]
    }];
    setCategories(exampleCategories);
    toast.success(language === 'es' ? "Ejemplo cargado correctamente" : "Example loaded successfully");
  };

  /**
   * Resets all data after confirmation
   */
  const handleReset = () => {
    if (window.confirm(language === 'es' ? "¿Estás seguro de que deseas eliminar todas las categorías y actividades?" : "Are you sure you want to delete all categories and activities?")) {
      setCategories([]);
      toast.success(language === 'es' ? "Datos reiniciados correctamente" : "Data reset successfully");
    }
  };

  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast.success(theme === 'dark' ? language === 'es' ? "Tema cambiado a modo claro" : "Theme changed to light mode" : language === 'es' ? "Tema cambiado a modo oscuro" : "Theme changed to dark mode");
  };

  /**
   * Closes the intro panel
   */
  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  // If not mounted yet, don't render theme-dependent UI to prevent flash
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;
  }
  return <div className="min-h-screen transition-colors duration-500 relative overflow-hidden">
      <Header />
      
      {/* Intro Panel - shown only on first visit */}
      {showIntro && <React.Suspense fallback={null}><IntroPanel onClose={handleCloseIntro} /></React.Suspense>}
      
      <main className="container px-3 py-4 sm:px-4 sm:py-8 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* App Introduction */}
        <div className="mb-4 sm:mb-8 p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass-card hover-glow border-2 border-education-primary/20">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 gradient-text">
            {t('appName') || 'HABY Score Tracker'}
          </h1>
          <p className="text-sm sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
            {language === 'es' ? "Organiza tus evaluaciones por categorías y actividades para obtener tu calificación final de manera precisa." : "Organize your evaluations by categories and activities to get your final grade accurately."}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 sm:mt-6">
            <Link to="/chat-calculator">
              <Button size="sm" className="flex items-center gap-1.5 btn-glow gradient-primary text-white border-0 text-xs sm:text-sm">
                <MessageCircle size={14} />
                {language === 'es' ? "ChatIA" : "ChatAI"}
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-education-primary/30 text-xs sm:text-sm" onClick={() => setShowIntro(true)}>
              <HelpCircle size={14} />
              {language === 'es' ? "Introducción" : "Introduction"}
            </Button>
            <Link to="/guide" className="hidden sm:block">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 border-education-primary/30 text-xs sm:text-sm">
                <BookOpen size={14} />
                {language === 'es' ? "Guía completa" : "Full guide"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Action buttons row */}
        <div className="flex flex-wrap justify-between items-center mb-4 sm:mb-8 gap-2">
          <h2 className="text-xl sm:text-3xl font-bold gradient-text">
            {t('categories')}
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Button variant="outline" size="sm" onClick={handleLoadExample} className="text-xs sm:text-sm border-education-primary/20 h-8">
              <Info className="h-3.5 w-3.5 mr-1" />
              {t('loadExample')}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="text-xs sm:text-sm text-destructive border-destructive/20 h-8">
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              {t('reset')}
            </Button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
          {/* Left side - Categories */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">{t('categories')}</h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('categoryWeightExplanation')}</span>
            </div>
            
            {/* Category list */}
            {categories.length > 0 ? categories.map(category => <CategoryCard key={category.id} category={category} onUpdate={handleUpdateCategory} onDelete={handleDeleteCategory} />) : <div className="text-center py-10 border border-dashed rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="text-gray-500 dark:text-gray-400">
                  {language === 'es' ? "No hay categorías. Añade una para empezar." : "No categories. Add one to get started."}
                </p>
              </div>}
            
            {/* Form to add new categories */}
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>
          
          {/* Right side - Results and Calculator */}
          <div className="lg:col-span-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">{t('finalResults')}</h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t('gradeWeightExplanation')}</span>
            </div>
            
            {/* Results Display */}
            <div className="mb-8">
              <ResultsDisplay categories={categories} />
            </div>
            
            {/* Grade Needed Calculator */}
            <div className="mt-8">
              <React.Suspense fallback={<div className="h-32" />}>
                <GradeNeededCalculator categories={categories} />
              </React.Suspense>
            </div>
          </div>
        </div>
      </main>
      
      {/* Toast notifications */}
      <Toaster />
    </div>;
};
export default Index;