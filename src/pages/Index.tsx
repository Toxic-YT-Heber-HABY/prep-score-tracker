import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import AddCategoryForm from '@/components/AddCategoryForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import GradeNeededCalculator from '@/components/GradeNeededCalculator';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner";
import { Info, RefreshCw, MoonIcon, SunIcon, HelpCircle, BookOpen, LayoutDashboard, MessageCircle } from 'lucide-react';
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
      {showIntro && <IntroPanel onClose={handleCloseIntro} />}
      
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-6xl relative z-10">
        {/* App Introduction with animations */}
        <motion.div className="mb-8 p-8 rounded-3xl glass-card hover-glow border-2 border-education-primary/20" initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}>
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            {t('appName') || 'HABY Score Tracker'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-lg leading-relaxed">
            {language === 'es' ? "Calculadora de calificaciones que te permite organizar tus evaluaciones por categorías y actividades, asignando importancia específica para obtener tu calificación final de manera precisa." : "Grade calculator that allows you to organize your evaluations by categories and activities, assigning specific importance to obtain your final grade accurately."}
          </p>
          <motion.div className="flex flex-wrap gap-3 mt-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }}>
            <Link to="/guide">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button variant="outline" className="flex items-center gap-2 btn-hover border-education-primary/30 hover:bg-education-light/50 dark:hover:bg-education-dark/30">
                  <BookOpen size={16} />
                  {language === 'es' ? "Ver guía completa" : "View complete guide"}
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" className="flex items-center gap-2 btn-hover border-education-primary/30 hover:bg-education-light/50 dark:hover:bg-education-dark/30" onClick={() => setShowIntro(true)}>
                <HelpCircle size={16} />
                {language === 'es' ? "Mostrar introducción" : "Show introduction"}
              </Button>
            </motion.div>
            <Link to="/chat-calculator">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button className="flex items-center gap-2 btn-glow gradient-primary text-white border-0">
                  <MessageCircle size={16} />
                  {language === 'es' ? "Usa nuestro ChatIA" : "Use our ChatAI"}
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Chat Calculator highlight section with animations */}
        <motion.div className="mb-8 p-6 rounded-2xl glass-card border-2 border-dashed border-education-primary/40 hover-lift" initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div className="gradient-primary h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg" animate={{
              rotate: [0, 5, -5, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                <MessageCircle size={28} className="text-white" />
              </motion.div>
              <div>
                <h2 className="font-bold text-xl gradient-text">
                  {language === 'es' ? '¡Prueba la nueva calculadora por ChatIA!' : 'Try the new ChatAI calculator!'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'es' ? 'Una forma conversacional y sencilla de calcular tu calificación.' : 'A conversational and simple way to calculate your grade.'}
                </p>
              </div>
            </div>
            <Link to="/chat-calculator">
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Button className="gradient-primary text-white btn-glow shadow-xl">
                  {language === 'es' ? 'Ir al ChatIA' : 'Go to ChatAI'}
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Header with action buttons - with animations */}
        <motion.div className="flex flex-wrap justify-between items-center mb-8 gap-3" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.6,
        duration: 0.5
      }}>
          <h2 className="text-3xl font-bold gradient-text">
            {t('categories')}
          </h2>
          <div className="flex flex-wrap gap-2">
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" onClick={toggleTheme} className="text-sm btn-hover shadow-sm hover:shadow-md border-education-primary/20">
                {theme === 'dark' ? <SunIcon className="h-4 w-4 mr-1" /> : <MoonIcon className="h-4 w-4 mr-1" />}
                {theme === 'dark' ? t('lightMode') : t('darkMode')}
              </Button>
            </motion.div>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" onClick={toggleLanguage} className="text-sm btn-hover shadow-sm hover:shadow-md border-education-primary/20">
                <LayoutDashboard className="h-4 w-4 mr-1" />
                {language === 'es' ? "EN" : "ES"}
              </Button>
            </motion.div>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" onClick={handleLoadExample} className="text-sm btn-hover shadow-sm hover:shadow-md border-education-primary/20">
                <Info className="h-4 w-4 mr-1" />
                {t('loadExample')}
              </Button>
            </motion.div>
            <motion.div whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Button variant="outline" onClick={handleReset} className="text-sm text-destructive hover:text-destructive-foreground hover:bg-destructive/10 border-destructive/20">
                <RefreshCw className="h-4 w-4 mr-1" />
                {t('reset')}
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Categories */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('categories')}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t('categoryWeightExplanation')}</span>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('finalResults')}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{t('gradeWeightExplanation')}</span>
            </div>
            
            {/* Results Display */}
            <div className="mb-8">
              <ResultsDisplay categories={categories} />
            </div>
            
            {/* Grade Needed Calculator */}
            <div className="mt-8">
              <GradeNeededCalculator categories={categories} />
            </div>
          </div>
        </div>
      </main>
      
      {/* Toast notifications */}
      <Toaster />
    </div>;
};
export default Index;