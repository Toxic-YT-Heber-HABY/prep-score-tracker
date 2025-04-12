
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowRight, Lightbulb, Calculator, Settings, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * Guided tour for new users to understand how to use the application
 */
const GuidedTour = ({ onComplete }: { onComplete: () => void }) => {
  const { language } = useI18n();
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Tour steps - language-aware
  const steps = [
    {
      title: language === 'es' ? 'Bienvenido a HABY Score Tracker' : 'Welcome to HABY Score Tracker',
      description: language === 'es' 
        ? 'Esta guía rápida te ayudará a entender cómo usar esta calculadora de calificaciones.'
        : 'This quick guide will help you understand how to use this grade calculator.',
      icon: <Lightbulb className="h-10 w-10 text-education-primary" />,
      position: 'center',
    },
    {
      title: language === 'es' ? 'Añade Categorías' : 'Add Categories',
      description: language === 'es'
        ? 'Primero, crea categorías para tus evaluaciones (exámenes, proyectos, actividades) con un peso específico.'
        : 'First, create categories for your evaluations (exams, projects, activities) with a specific weight.',
      icon: <FileText className="h-10 w-10 text-education-primary" />,
      position: 'left',
      highlight: 'categories',
    },
    {
      title: language === 'es' ? 'Añade Actividades' : 'Add Activities',
      description: language === 'es'
        ? 'Dentro de cada categoría, añade actividades específicas con sus respectivas calificaciones.'
        : 'Within each category, add specific activities with their respective grades.',
      icon: <Settings className="h-10 w-10 text-education-primary" />,
      position: 'left',
      highlight: 'activities',
    },
    {
      title: language === 'es' ? 'Visualiza tus Resultados' : 'View Your Results',
      description: language === 'es'
        ? 'Tu calificación final se calcula automáticamente basada en los pesos asignados a cada categoría.'
        : 'Your final grade is automatically calculated based on the weights assigned to each category.',
      icon: <Calculator className="h-10 w-10 text-education-primary" />,
      position: 'right',
      highlight: 'results',
    },
    {
      title: language === 'es' ? 'Exporta tus Calificaciones' : 'Export Your Grades',
      description: language === 'es'
        ? 'Puedes exportar tus resultados en diferentes formatos como PDF, imagen o CSV.'
        : 'You can export your results in different formats such as PDF, image or CSV.',
      icon: <BarChart3 className="h-10 w-10 text-education-primary" />,
      position: 'right',
      highlight: 'export',
    },
    {
      title: language === 'es' ? '¡Listo para comenzar!' : 'Ready to Start!',
      description: language === 'es'
        ? 'Ahora puedes comenzar a usar HABY Score Tracker para calcular tus calificaciones.'
        : 'Now you can start using HABY Score Tracker to calculate your grades.',
      icon: <ArrowRight className="h-10 w-10 text-education-primary" />,
      position: 'center',
    },
  ];
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevious();
      } else if (e.key === 'Escape') {
        onComplete();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep]);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Position the tour card based on the current step
  const getPosition = () => {
    const { position } = steps[currentStep];
    
    if (isMobile) {
      return "fixed bottom-4 left-4 right-4 z-50";
    }
    
    switch (position) {
      case 'left':
        return "fixed top-1/3 left-8 z-50 max-w-md";
      case 'right':
        return "fixed top-1/3 right-8 z-50 max-w-md";
      case 'center':
      default:
        return "fixed top-1/3 left-1/2 -translate-x-1/2 z-50 max-w-md";
    }
  };
  
  // Determine if we should highlight an element
  useEffect(() => {
    const { highlight } = steps[currentStep] || {};
    
    // Remove any existing highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
      el.classList.remove('tour-highlight');
    });
    
    if (highlight) {
      let selector;
      switch (highlight) {
        case 'categories':
          selector = 'form[class*="space-y-"]';
          break;
        case 'activities':
          selector = '[data-accordion-item]';
          break;
        case 'results':
          selector = '#results-card';
          break;
        case 'export':
          selector = '#results-card button[class*="flex gap-2"]';
          break;
        default:
          selector = null;
      }
      
      if (selector) {
        const element = document.querySelector(selector);
        if (element) {
          element.classList.add('tour-highlight');
          
          // Scroll the element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [currentStep]);
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <AnimatePresence>
      <motion.div 
        className={getPosition()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Card className="shadow-xl border-education-primary/20">
          <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {steps[currentStep].title}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onComplete}
                className="text-white hover:bg-white/20"
                aria-label={language === 'es' ? 'Cerrar guía' : 'Close guide'}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-1 w-full bg-white/30 rounded-full mt-2">
              <div 
                className="h-1 bg-white rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              {steps[currentStep].icon}
              <CardDescription className="text-base">
                {steps[currentStep].description}
              </CardDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              {language === 'es' ? 'Anterior' : 'Previous'}
            </Button>
            
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} / {steps.length}
            </div>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-1 bg-education-primary hover:bg-education-secondary"
            >
              {currentStep < steps.length - 1 ? 
                (language === 'es' ? 'Siguiente' : 'Next') : 
                (language === 'es' ? 'Finalizar' : 'Finish')
              }
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default GuidedTour;
