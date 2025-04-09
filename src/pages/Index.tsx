
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '@/types';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import AddCategoryForm from '@/components/AddCategoryForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner";
import { Info, RefreshCw, MoonIcon, SunIcon } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';

const LOCAL_STORAGE_KEY = 'prep-score-tracker-data';

const Index = () => {
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
    
    // Default starting categories
    return [];
  });
  
  // Theme toggle
  const { theme, setTheme } = useTheme();
  
  // Save to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);
  
  const handleAddCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    toast.success(`Categoría "${category.name}" añadida`);
  };
  
  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };
  
  const handleDeleteCategory = (categoryId: string) => {
    const categoryToDelete = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(category => category.id !== categoryId));
    
    if (categoryToDelete) {
      toast.success(`Categoría "${categoryToDelete.name}" eliminada`);
    }
  };
  
  const handleLoadExample = () => {
    const exampleCategories: Category[] = [
      {
        id: uuidv4(),
        name: "Activities",
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
        name: "Project",
        weight: 20,
        activities: [
          { id: uuidv4(), name: "Final Project", weight: 100, grade: 80 }
        ]
      },
      {
        id: uuidv4(),
        name: "Exam",
        weight: 30,
        activities: [
          { id: uuidv4(), name: "Final Exam", weight: 100, grade: 70 }
        ]
      }
    ];
    
    setCategories(exampleCategories);
    toast.success("Ejemplo cargado correctamente");
  };
  
  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar todas las categorías y actividades?")) {
      setCategories([]);
      toast.success("Datos reiniciados correctamente");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container px-4 py-6 md:px-6 mx-auto max-w-5xl">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Calculadora de Calificaciones</h2>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={toggleTheme} className="text-sm">
              {theme === 'dark' ? <SunIcon className="h-4 w-4 mr-1" /> : <MoonIcon className="h-4 w-4 mr-1" />}
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </Button>
            <Button variant="outline" onClick={handleLoadExample} className="text-sm">
              <Info className="h-4 w-4 mr-1" />
              Cargar Ejemplo
            </Button>
            <Button variant="outline" onClick={handleReset} className="text-sm text-destructive hover:text-destructive-foreground">
              <RefreshCw className="h-4 w-4 mr-1" />
              Reiniciar
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Categorías</h3>
            
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onUpdate={handleUpdateCategory}
                onDelete={handleDeleteCategory}
              />
            ))}
            
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>
          
          <div className="w-full lg:w-5/12">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Resultado Final</h3>
            <ResultsDisplay categories={categories} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-800 py-4 border-t dark:border-gray-700 mt-6 transition-colors duration-300">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Prep Score Tracker - Calculadora de Calificaciones
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
