
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  BookOpen, 
  Calculator, 
  ChevronRight, 
  GraduationCap, 
  Lightbulb, 
  List, 
  Percent, 
  PlusCircle, 
  Settings
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

/**
 * Comprehensive guide page that explains how to use the HABY Score Tracker application
 */
const Guide = () => {
  const { language } = useI18n();
  
  // Translation function for this component
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        title: "Guía completa de uso",
        subtitle: "Aprende a utilizar HABY Score Tracker paso a paso",
        backToApp: "Volver a la aplicación",
        basicUsage: "Uso básico",
        categoriesSection: "Categorías",
        activitiesSection: "Actividades",
        calculationSection: "Cálculo de calificaciones",
        tipsSection: "Consejos y trucos",
        faqSection: "Preguntas frecuentes",
        categoriesExplanation: "Las categorías representan los diferentes componentes de evaluación de un curso o asignatura. Por ejemplo: exámenes, tareas, proyectos, participación, etc.",
        activitiesExplanation: "Las actividades son las evaluaciones específicas dentro de cada categoría. Por ejemplo, dentro de la categoría 'Exámenes' podrías tener: Examen parcial 1, Examen parcial 2, Examen final.",
        calculationExplanation: "HABY Score Tracker calcula tu calificación final basándose en el peso asignado a cada categoría y a cada actividad dentro de las categorías. Para una calificación precisa, asegúrate de que los pesos de las categorías sumen exactamente 100%.",
        addCategorySteps: [
          "Haz clic en el formulario 'Añadir nueva categoría'",
          "Ingresa el nombre de la categoría (por ejemplo, 'Exámenes')",
          "Asigna un peso porcentual a la categoría (por ejemplo, '40')",
          "Haz clic en el botón 'Añadir'"
        ],
        addActivitySteps: [
          "Localiza la categoría a la que deseas añadir una actividad",
          "En el formulario 'Añadir actividad', ingresa el nombre",
          "Asigna un peso dentro de la categoría",
          "Ingresa la calificación obtenida (de 0 a 100)",
          "Haz clic en 'Añadir'"
        ],
        weightConsiderations: "El peso de cada categoría determina su importancia en la calificación final. Por ejemplo, si 'Exámenes' tiene un peso de 40%, contribuirá con hasta 40% de la calificación final.",
        activityWeights: "Los pesos de las actividades dentro de una categoría deben sumar 100% para una representación precisa.",
        faqQuestions: [
          {
            question: "¿Qué significa el porcentaje de peso?",
            answer: "El porcentaje de peso representa la importancia relativa de una categoría o actividad en el cálculo de la calificación final. Cuanto mayor sea el porcentaje, más influencia tendrá en el resultado final."
          },
          {
            question: "¿Cómo se calcula la calificación final?",
            answer: "La calificación final se calcula obteniendo primero el promedio ponderado de las actividades dentro de cada categoría. Luego, estos promedios se multiplican por el peso de su categoría y se suman todos los resultados. El sistema muestra el resultado tanto en escala de 100 como de 10 puntos."
          },
          {
            question: "¿Puedo modificar o eliminar categorías y actividades?",
            answer: "Sí, puedes editar o eliminar cualquier categoría o actividad haciendo clic en los iconos correspondientes junto a cada elemento."
          },
          {
            question: "¿Se guardan mis datos automáticamente?",
            answer: "Sí, todos los datos se guardan automáticamente en el almacenamiento local de tu navegador. Sin embargo, si limpias los datos del navegador, perderás esta información."
          }
        ],
        tips: [
          {
            title: "Usa el ejemplo",
            description: "Si es tu primera vez, utiliza la función 'Cargar ejemplo' para entender cómo funciona la aplicación con datos de muestra."
          },
          {
            title: "Mantén los pesos en 100%",
            description: "Asegúrate de que los pesos de todas las categorías sumen exactamente 100% para obtener un cálculo preciso."
          },
          {
            title: "Actividades sin calificación",
            description: "Para actividades futuras que aún no tienes calificación, puedes añadirlas con calificación 0 o esperar a tenerlas para mantener precisos los cálculos."
          },
          {
            title: "Simulación de escenarios",
            description: "Usa HABY para simular diferentes escenarios y conocer qué calificaciones necesitas en evaluaciones futuras para alcanzar tu meta."
          }
        ],
        stepByStepTitle: "Guía paso a paso",
        step1Title: "Añade categorías",
        step2Title: "Añade actividades",
        step3Title: "Revisa los resultados",
        step1Detail: "Crea las categorías de evaluación con sus respectivos pesos. Por ejemplo: Exámenes (40%), Proyectos (30%), Tareas (20%), Participación (10%).",
        step2Detail: "Dentro de cada categoría, agrega las actividades evaluadas con su peso y calificación. Por ejemplo, en Exámenes: Parcial 1 (30%, 85 pts), Parcial 2 (30%, 90 pts), Final (40%, 78 pts).",
        step3Detail: "Observa tu calificación final calculada automáticamente en base a los pesos y calificaciones asignadas. La explicación detallada del cálculo aparece en el panel de resultados.",
      },
      en: {
        title: "Complete User Guide",
        subtitle: "Learn how to use HABY Score Tracker step by step",
        backToApp: "Back to application",
        basicUsage: "Basic Usage",
        categoriesSection: "Categories",
        activitiesSection: "Activities",
        calculationSection: "Grade Calculation",
        tipsSection: "Tips and Tricks",
        faqSection: "Frequently Asked Questions",
        categoriesExplanation: "Categories represent the different evaluation components of a course or subject. For example: exams, assignments, projects, participation, etc.",
        activitiesExplanation: "Activities are the specific evaluations within each category. For example, within the 'Exams' category you might have: Midterm 1, Midterm 2, Final Exam.",
        calculationExplanation: "HABY Score Tracker calculates your final grade based on the weight assigned to each category and each activity within categories. For accurate grading, ensure that the category weights add up to exactly 100%.",
        addCategorySteps: [
          "Click on the 'Add new category' form",
          "Enter the category name (e.g., 'Exams')",
          "Assign a percentage weight to the category (e.g., '40')",
          "Click the 'Add' button"
        ],
        addActivitySteps: [
          "Locate the category where you want to add an activity",
          "In the 'Add activity' form, enter the name",
          "Assign a weight within the category",
          "Enter the grade obtained (from 0 to 100)",
          "Click 'Add'"
        ],
        weightConsiderations: "The weight of each category determines its importance in the final grade. For example, if 'Exams' has a weight of 40%, it will contribute up to 40% of the final grade.",
        activityWeights: "The weights of activities within a category should add up to 100% for accurate representation.",
        faqQuestions: [
          {
            question: "What does the weight percentage mean?",
            answer: "The weight percentage represents the relative importance of a category or activity in calculating the final grade. The higher the percentage, the more influence it will have on the final result."
          },
          {
            question: "How is the final grade calculated?",
            answer: "The final grade is calculated by first obtaining the weighted average of activities within each category. Then, these averages are multiplied by the weight of their category and all results are added together. The system displays the result in both 100 and 10-point scales."
          },
          {
            question: "Can I modify or delete categories and activities?",
            answer: "Yes, you can edit or delete any category or activity by clicking on the corresponding icons next to each item."
          },
          {
            question: "Are my data automatically saved?",
            answer: "Yes, all data is automatically saved in your browser's local storage. However, if you clear your browser data, you will lose this information."
          }
        ],
        tips: [
          {
            title: "Use the example",
            description: "If it's your first time, use the 'Load example' function to understand how the application works with sample data."
          },
          {
            title: "Keep weights at 100%",
            description: "Make sure that the weights of all categories add up to exactly 100% for an accurate calculation."
          },
          {
            title: "Ungraded activities",
            description: "For future activities that you don't have a grade for yet, you can add them with a grade of 0 or wait until you have them to keep calculations accurate."
          },
          {
            title: "Scenario simulation",
            description: "Use HABY to simulate different scenarios and know what grades you need in future evaluations to reach your goal."
          }
        ],
        stepByStepTitle: "Step by step guide",
        step1Title: "Add categories",
        step2Title: "Add activities",
        step3Title: "Review results",
        step1Detail: "Create evaluation categories with their respective weights. For example: Exams (40%), Projects (30%), Assignments (20%), Participation (10%).",
        step2Detail: "Within each category, add evaluated activities with their weight and grade. For example, in Exams: Midterm 1 (30%, 85 pts), Midterm 2 (30%, 90 pts), Final (40%, 78 pts).",
        step3Detail: "Observe your final grade automatically calculated based on the assigned weights and grades. Detailed explanation of the calculation appears in the results panel.",
      }
    };
    
    return translations[language]?.[key] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:px-6 max-w-5xl">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('backToApp')}
              </Button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Step by step guide */}
        <section className="mb-12 p-6 rounded-lg bg-gradient-to-r from-education-primary/10 to-education-secondary/10 border border-education-primary/20">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-education-primary" />
            {t('stepByStepTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-education-primary text-white flex items-center justify-center font-medium">1</div>
                  {t('step1Title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('step1Detail')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-education-secondary text-white flex items-center justify-center font-medium">2</div>
                  {t('step2Title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('step2Detail')}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-education-dark text-white flex items-center justify-center font-medium">3</div>
                  {t('step3Title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('step3Detail')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Detailed categories section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <List className="h-5 w-5 text-education-primary" />
            {t('categoriesSection')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t('categoriesExplanation')}
              </p>
              
              <h3 className="text-lg font-medium mb-3 text-education-primary">
                {language === 'es' ? 'Cómo añadir una categoría:' : 'How to add a category:'}
              </h3>
              
              <ol className="space-y-2 mb-4">
                {t('addCategorySteps').map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-education-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
              <h3 className="text-lg font-medium mb-3 text-education-primary">
                {language === 'es' ? 'Consideraciones sobre el peso:' : 'Weight considerations:'}
              </h3>
              
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t('weightConsiderations')}
              </p>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800/30 mb-3">
                <div className="flex gap-2">
                  <Percent className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    {language === 'es' 
                      ? 'Importante: La suma de los pesos de todas las categorías debe ser exactamente 100%.'
                      : 'Important: The sum of all category weights must be exactly 100%.'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <strong className="text-education-primary text-sm">
                  {language === 'es' ? 'Ejemplo:' : 'Example:'}
                </strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Exámenes: 40%' : 'Exams: 40%'}</li>
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Proyectos: 30%' : 'Projects: 30%'}</li>
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Tareas: 20%' : 'Assignments: 20%'}</li>
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Participación: 10%' : 'Participation: 10%'}</li>
                  <li className="font-medium text-education-primary mt-1">= 100%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Activities section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-education-primary" />
            {t('activitiesSection')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700 order-2 md:order-1">
              <h3 className="text-lg font-medium mb-3 text-education-primary">
                {language === 'es' ? 'Ejemplo de actividades:' : 'Example activities:'}
              </h3>
              
              <div className="mb-5">
                <div className="font-medium text-education-secondary mb-1">
                  {language === 'es' ? 'Categoría: Exámenes (40%)' : 'Category: Exams (40%)'}
                </div>
                <ul className="pl-5 space-y-1 text-sm">
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Parcial 1: 30%, 85 pts' : 'Midterm 1: 30%, 85 pts'}</li>
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Parcial 2: 30%, 90 pts' : 'Midterm 2: 30%, 90 pts'}</li>
                  <li className="text-gray-700 dark:text-gray-300">• {language === 'es' ? 'Final: 40%, 78 pts' : 'Final: 40%, 78 pts'}</li>
                </ul>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800/30">
                <div className="flex gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {language === 'es' 
                      ? 'Consejo: Los pesos de las actividades dentro de cada categoría también deben sumar 100%.'
                      : 'Tip: Activity weights within each category should also add up to 100%.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t('activitiesExplanation')}
              </p>
              
              <h3 className="text-lg font-medium mb-3 text-education-primary">
                {language === 'es' ? 'Cómo añadir una actividad:' : 'How to add an activity:'}
              </h3>
              
              <ol className="space-y-2">
                {t('addActivitySteps').map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-education-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{step}</span>
                  </li>
                ))}
              </ol>
              
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {t('activityWeights')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Calculation section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-education-primary" />
            {t('calculationSection')}
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle>{language === 'es' ? 'Cálculo de la calificación final' : 'Final grade calculation'}</CardTitle>
              <CardDescription>
                {language === 'es' 
                  ? 'Entendiendo cómo HABY calcula tu calificación final'
                  : 'Understanding how HABY calculates your final grade'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t('calculationExplanation')}
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
                <h4 className="font-medium mb-2 text-education-secondary">
                  {language === 'es' ? 'Fórmula de cálculo:' : 'Calculation formula:'}
                </h4>
                
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <span className="font-medium text-education-primary">1.</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'es' 
                        ? 'Para cada categoría, se calcula el promedio ponderado de las actividades:'
                        : 'For each category, calculate the weighted average of activities:'}
                      <br />
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                        {language === 'es' 
                          ? 'PromedioCategoria = Σ(Calificación × Peso) ÷ 100'
                          : 'CategoryAverage = Σ(Grade × Weight) ÷ 100'}
                      </code>
                    </span>
                  </li>
                  
                  <li className="flex gap-2">
                    <span className="font-medium text-education-primary">2.</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'es' 
                        ? 'Se multiplica el promedio de cada categoría por su peso:'
                        : 'Multiply each category average by its weight:'}
                      <br />
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                        {language === 'es' 
                          ? 'PuntosCategoria = PromedioCategoria × PesoCategoria ÷ 100'
                          : 'CategoryPoints = CategoryAverage × CategoryWeight ÷ 100'}
                      </code>
                    </span>
                  </li>
                  
                  <li className="flex gap-2">
                    <span className="font-medium text-education-primary">3.</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'es' 
                        ? 'Se suman todos los puntos de las categorías para obtener la calificación final:'
                        : 'Add up all category points to get the final grade:'}
                      <br />
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                        {language === 'es' 
                          ? 'CalificaciónFinal = Σ(PuntosCategoria)'
                          : 'FinalGrade = Σ(CategoryPoints)'}
                      </code>
                    </span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Tips section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-education-primary" />
            {t('tipsSection')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t('tips').map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                <h3 className="font-medium mb-2 text-education-primary flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-education-light dark:bg-education-primary/20 text-education-primary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Settings className="h-5 w-5 text-education-primary" />
            {t('faqSection')}
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {t('faqQuestions').map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-700 dark:text-gray-300 py-2">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>
        
        {/* Back to app button */}
        <div className="flex justify-center mb-12">
          <Link to="/">
            <Button className="bg-education-primary hover:bg-education-dark text-white flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {language === 'es' ? 'Volver a la calculadora' : 'Back to calculator'}
            </Button>
          </Link>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 transition-colors duration-300">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guide;
