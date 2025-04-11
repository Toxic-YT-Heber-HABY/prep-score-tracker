
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Check, Calculator, PlusCircle, BarChart } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface IntroPanelProps {
  onClose: () => void;
}

const IntroPanel: React.FC<IntroPanelProps> = ({ onClose }) => {
  const { language } = useI18n();
  
  // Translation function for this component
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        title: "¡Bienvenido a HABY Score Tracker!",
        description: "La herramienta perfecta para calcular tus calificaciones finales de manera precisa y organizada.",
        howToUse: "Cómo usar HABY:",
        step1: "Añade categorías con su respectivo peso (ej. Exámenes 40%, Proyectos 30%, Actividades 30%)",
        step2: "Dentro de cada categoría, añade actividades con su calificación y peso",
        step3: "Observa tu calificación final calculada automáticamente en base a los pesos asignados",
        tip1: "Asegúrate de que los pesos de tus categorías sumen 100%",
        tip2: "Puedes ajustar los pesos de las actividades dentro de cada categoría",
        tip3: "Usa el modo oscuro para reducir la fatiga visual",
        getStarted: "Comenzar",
        tipsTitle: "Consejos útiles:",
      },
      en: {
        title: "Welcome to HABY Score Tracker!",
        description: "The perfect tool to calculate your final grades accurately and in an organized way.",
        howToUse: "How to use HABY:",
        step1: "Add categories with their respective weight (e.g. Exams 40%, Projects 30%, Activities 30%)",
        step2: "Within each category, add activities with their grade and weight",
        step3: "View your final grade automatically calculated based on the assigned weights",
        tip1: "Make sure your category weights add up to 100%",
        tip2: "You can adjust activity weights within each category",
        tip3: "Use dark mode to reduce eye strain",
        getStarted: "Get Started",
        tipsTitle: "Useful tips:",
      }
    };
    
    return translations[language]?.[key] || key;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl animate-fade-in">
        <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{t('title')}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X size={20} />
            </Button>
          </div>
          <p className="mt-2 text-white/90">{t('description')}</p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-education-primary" />
                {t('howToUse')}
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-primary text-white flex items-center justify-center font-medium">1</div>
                  <p className="text-gray-700 dark:text-gray-300">{t('step1')}</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-secondary text-white flex items-center justify-center font-medium">2</div>
                  <p className="text-gray-700 dark:text-gray-300">{t('step2')}</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-dark text-white flex items-center justify-center font-medium">3</div>
                  <p className="text-gray-700 dark:text-gray-300">{t('step3')}</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-education-primary" />
                {t('tipsTitle')}
              </h3>
              
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{t('tip1')}</p>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{t('tip2')}</p>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{t('tip3')}</p>
                </li>
              </ul>
              
              <div className="mt-6 mb-2">
                <div className="p-3 bg-education-light dark:bg-education-primary/20 rounded-lg border border-education-primary/20 flex items-center gap-3">
                  <PlusCircle className="h-6 w-6 text-education-primary flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? "¿Comenzando? Prueba la función 'Cargar ejemplo' para ver cómo funciona con datos de muestra."
                      : "Just starting? Try the 'Load Example' function to see how it works with sample data."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t p-4">
          <Button 
            onClick={onClose}
            className="bg-education-primary hover:bg-education-dark text-white px-6"
          >
            {t('getStarted')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntroPanel;
