
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import AddCategoryForm from '@/components/AddCategoryForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner";
import { Info, RefreshCw, MoonIcon, SunIcon, HelpCircle, BookOpen } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
import { useI18n } from '@/lib/i18n';
import IntroPanel from '@/components/IntroPanel';

// Local storage key for persisting user data
const LOCAL_STORAGE_KEY = 'haby-score-tracker-data';

/**
 * Main page component for the HABY Score Tracker application.
 * Handles category management, theme switching, and language selection.
 */
const Index = () => {
  const { t, language } = useI18n();
  
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
  const { theme, setTheme } = useTheme();
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
    toast.success(language === 'es' 
      ? `Categoría "${category.name}" añadida` 
      : `Category "${category.name}" added`);
  };
  
  /**
   * Updates an existing category with new data
   * @param updatedCategory The updated category object
   */
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
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
      toast.success(language === 'es'
        ? `Categoría "${categoryToDelete.name}" eliminada`
        : `Category "${categoryToDelete.name}" deleted`);
    }
  };
  
  /**
   * Loads example data for demonstration purposes
   */
  const handleLoadExample = () => {
    const exampleCategories: Category[] = [
      {
        id: uuidv4(),
        name: language === 'es' ? "Actividades" : "Activities",
        weight: 50,
        activities: [
          { id: uuidv4(), name: "Activity A", weight: 25, grade: 100 },
          { id: uuidv4(), name: "Activity B", weight: 25, grade: 100 },
          { id: uuidv4(), name: "Activity C", weight: 25, grade: 100 },
          { id: uuidv4(), name: "Activity D", weight: 25, grade: 60 }
        ]
      },
      {
        id: uuidv4(),
        name: language === 'es' ? "Proyecto" : "Project", 
        weight: 20,
        activities: [
          { id: uuidv4(), name: language === 'es' ? "Proyecto Final" : "Final Project", weight: 100, grade: 80 }
        ]
      },
      {
        id: uuidv4(),
        name: language === 'es' ? "Examen" : "Exam",
        weight: 30,
        activities: [
          { id: uuidv4(), name: language === 'es' ? "Examen Final" : "Final Exam", weight: 100, grade: 70 }
        ]
      }
    ];
    
    setCategories(exampleCategories);
    toast.success(language === 'es' 
      ? "Ejemplo cargado correctamente" 
      : "Example loaded successfully");
  };
  
  /**
   * Resets all data after confirmation
   */
  const handleReset = () => {
    if (window.confirm(language === 'es' 
      ? "¿Estás seguro de que deseas eliminar todas las categorías y actividades?" 
      : "Are you sure you want to delete all categories and activities?")) {
      setCategories([]);
      toast.success(language === 'es' 
        ? "Datos reiniciados correctamente" 
        : "Data reset successfully");
    }
  };

  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    toast.success(theme === 'dark'
      ? (language === 'es' ? "Tema cambiado a modo claro" : "Theme changed to light mode")
      : (language === 'es' ? "Tema cambiado a modo oscuro" : "Theme changed to dark mode"));
  };

  /**
   * Opens the guide in a new tab
   */
  const openGuide = () => {
    window.open('https://docs.haby-calculator.com/guia', '_blank');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      {/* Intro Panel - shown only on first visit */}
      {showIntro && <IntroPanel onClose={handleCloseIntro} />}
      
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-6xl">
        {/* App Introduction */}
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 border border-education-primary/20 dark:border-education-secondary/20">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {t('appName') || 'HABY Score Tracker'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            {language === 'es' 
              ? "Calculadora de calificaciones que te permite organizar tus evaluaciones por categorías y actividades, asignando pesos específicos para obtener tu calificación final de manera precisa."
              : "Grade calculator that allows you to organize your evaluations by categories and activities, assigning specific weights to obtain your final grade accurately."}
          </p>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-education-light dark:hover:bg-education-dark/30"
              onClick={openGuide}
            >
              <BookOpen size={16} />
              {language === 'es' ? "Ver guía completa" : "View complete guide"}
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-education-light dark:hover:bg-education-dark/30"
              onClick={() => setShowIntro(true)}
            >
              <HelpCircle size={16} />
              {language === 'es' ? "Mostrar introducción" : "Show introduction"}
            </Button>
          </div>
        </div>

        {/* Header with action buttons */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-3">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent pb-1">
            {t('categories')}
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={toggleTheme} 
              className="text-sm transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
            >
              {theme === 'dark' ? 
                <SunIcon className="h-4 w-4 mr-1" /> : 
                <MoonIcon className="h-4 w-4 mr-1" />
              }
              {theme === 'dark' ? t('lightMode') : t('darkMode')}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLoadExample} 
              className="text-sm transition-all hover:bg-education-light dark:hover:bg-education-dark/30"
            >
              <Info className="h-4 w-4 mr-1" />
              {t('loadExample')}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset} 
              className="text-sm text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {t('reset')}
            </Button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Categories */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('categories')}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t('categoryWeightExplanation')}</span>
            </div>
            
            {/* Category list */}
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onUpdate={handleUpdateCategory}
                onDelete={handleDeleteCategory}
              />
            ))}
            
            {/* Form to add new categories */}
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>
          
          {/* Right side - Results */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('finalResults')}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t('gradeWeightExplanation')}</span>
            </div>
            <ResultsDisplay categories={categories} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
                alt="HABY Logo" 
                className="h-8 w-auto mr-2" 
              />
              <span className="text-education-primary font-semibold dark:text-education-secondary">HABY</span>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} HABY Score Tracker - Desarrollado por <span className="font-medium">Heber Zadkiel García Pérez</span>
              </p>
              <div className="flex gap-3 mt-2">
                <a href="#" className="text-xs text-education-primary hover:underline">
                  {language === 'es' ? "Términos y condiciones" : "Terms and conditions"}
                </a>
                <a href="#" className="text-xs text-education-primary hover:underline">
                  {language === 'es' ? "Política de privacidad" : "Privacy policy"}
                </a>
                <a href="#" className="text-xs text-education-primary hover:underline">
                  {language === 'es' ? "Contacto" : "Contact"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
