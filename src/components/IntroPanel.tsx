
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calculator, PlusCircle, BarChart, BookOpen, Menu, LightbulbIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';

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
        step1: "Añade categorías con su respectiva importancia (ej. Exámenes 40%, Proyectos 30%, Actividades 30%)",
        step2: "Dentro de cada categoría, añade actividades con su calificación e importancia",
        step3: "Observa tu calificación final calculada automáticamente",
        tip1: "Asegúrate de que la importancia de tus categorías sume 100%",
        tip2: "Puedes ajustar la importancia de las actividades dentro de cada categoría",
        tip3: "Usa el modo oscuro para reducir la fatiga visual",
        getStarted: "Comenzar",
        tipsTitle: "Consejos útiles:",
      },
      en: {
        title: "Welcome to HABY Score Tracker!",
        description: "The perfect tool to calculate your final grades accurately and in an organized way.",
        howToUse: "How to use HABY:",
        step1: "Add categories with their respective importance (e.g. Exams 40%, Projects 30%, Activities 30%)",
        step2: "Within each category, add activities with their grade and importance",
        step3: "View your final grade automatically calculated",
        tip1: "Make sure your category importance values add up to 100%",
        tip2: "You can adjust activity importance within each category",
        tip3: "Use dark mode to reduce eye strain",
        getStarted: "Get Started",
        tipsTitle: "Useful tips:",
      }
    };
    
    return translations[language]?.[key] || key;
  };

  // Animation variants for the elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-xl border-t-4 border-t-education-primary overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <LightbulbIcon className="h-6 w-6" />
                {t('title')}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <span className="sr-only">Cerrar</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
            <p className="mt-2 text-white/90">{t('description')}</p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Menu className="h-5 w-5 text-education-primary" />
                  {t('howToUse')}
                </h3>
                
                <ul className="space-y-4">
                  <motion.li 
                    className="flex gap-3 items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-primary text-white flex items-center justify-center font-medium mt-1">1</div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{t('step1')}</p>
                      <div className="mt-2 p-2 bg-education-light/50 dark:bg-education-dark/10 rounded-md text-sm border border-education-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="text-education-dark dark:text-education-light">Exámenes:</span>
                          <span className="font-semibold text-education-primary">40%</span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="flex gap-3 items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-secondary text-white flex items-center justify-center font-medium mt-1">2</div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{t('step2')}</p>
                      <div className="mt-2 p-2 bg-education-light/50 dark:bg-education-dark/10 rounded-md text-sm border border-education-primary/10">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-education-dark dark:text-education-light">Examen parcial:</span>
                          <span className="font-semibold text-education-secondary">85/100</span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                  <motion.li 
                    className="flex gap-3 items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-education-dark text-white flex items-center justify-center font-medium mt-1">3</div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300">{t('step3')}</p>
                      <div className="mt-2 py-1 px-3 bg-education-primary/10 dark:bg-education-primary/30 rounded-md inline-block border border-education-primary/20">
                        <span className="font-semibold text-education-primary">85.5</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
                      </div>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-education-primary" />
                  {t('tipsTitle')}
                </h3>
                
                <ul className="space-y-3">
                  <motion.li 
                    className="flex gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/20 rounded-md transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{t('tip1')}</p>
                  </motion.li>
                  <motion.li 
                    className="flex gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/20 rounded-md transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{t('tip2')}</p>
                  </motion.li>
                  <motion.li 
                    className="flex gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/20 rounded-md transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{t('tip3')}</p>
                  </motion.li>
                </ul>
                
                <motion.div 
                  className="mt-6"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="p-3 bg-gradient-to-r from-education-light to-education-light/30 dark:from-education-primary/20 dark:to-education-primary/5 rounded-lg border border-education-primary/20 flex items-center gap-3 shadow-sm">
                    <PlusCircle className="h-6 w-6 text-education-primary flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {language === 'es' 
                        ? "¿Comenzando? Prueba la función 'Cargar ejemplo' para ver cómo funciona con datos de muestra."
                        : "Just starting? Try the 'Load Example' function to see how it works with sample data."}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="flex justify-end border-t p-4 bg-gray-50 dark:bg-gray-800/20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onClose}
                className="bg-education-primary hover:bg-education-dark text-white px-6 shadow-md"
              >
                {t('getStarted')}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default IntroPanel;
