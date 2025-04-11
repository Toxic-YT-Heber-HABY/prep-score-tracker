
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Copy, ArrowLeft, ArrowUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/lib/i18n';

/**
 * User guide page with detailed information about using the HABY Score Tracker
 */
const Guide = () => {
  const { language, t } = useI18n();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Separate translation types to fix type issues
  const spanishSteps = [
    "Crear categorías",
    "Agregar actividades",
    "Configurar pesos",
    "Ver resultados"
  ];
  
  const englishSteps = [
    "Create categories",
    "Add activities",
    "Configure weights",
    "View results"
  ];

  // FAQ data as arrays, not strings
  const spanishFaq = [
    { 
      question: "¿Cómo agrego una nueva categoría?", 
      answer: "Para agregar una nueva categoría, completa el formulario 'Agregar categoría' con el nombre y el peso deseados, luego haz clic en 'Agregar'." 
    },
    { 
      question: "¿Cómo puedo eliminar una actividad?", 
      answer: "Para eliminar una actividad, haz clic en el botón con el icono de papelera junto a la actividad que deseas eliminar." 
    },
    { 
      question: "¿Qué sucede si el total de los pesos no suma 100%?", 
      answer: "El sistema mostrará un error y no podrá calcular la calificación final hasta que los pesos sumen exactamente 100%." 
    },
    { 
      question: "¿Puedo exportar mis resultados?", 
      answer: "Sí, puedes exportar tus resultados en formato PDF o imagen usando los botones de exportación en la sección de resultados." 
    },
    { 
      question: "¿Los datos se guardan automáticamente?", 
      answer: "Sí, todos los datos se guardan automáticamente en el almacenamiento local de tu navegador." 
    }
  ];
  
  const englishFaq = [
    { 
      question: "How do I add a new category?", 
      answer: "To add a new category, fill out the 'Add category' form with the desired name and weight, then click 'Add'." 
    },
    { 
      question: "How can I delete an activity?", 
      answer: "To delete an activity, click on the trash icon button next to the activity you want to remove." 
    },
    { 
      question: "What happens if the total weights don't add up to 100%?", 
      answer: "The system will display an error and won't be able to calculate the final grade until the weights add up to exactly 100%." 
    },
    { 
      question: "Can I export my results?", 
      answer: "Yes, you can export your results in PDF or image format using the export buttons in the results section." 
    },
    { 
      question: "Is data saved automatically?", 
      answer: "Yes, all data is automatically saved in your browser's local storage." 
    }
  ];

  // Features data as arrays, not strings
  const spanishFeatures = [
    { 
      title: "Categorías personalizables", 
      description: "Organiza tus calificaciones en categorías como exámenes, tareas, proyectos, etc." 
    },
    { 
      title: "Ponderación flexible", 
      description: "Asigna diferentes pesos a categorías y actividades según su importancia." 
    },
    { 
      title: "Cálculo automático", 
      description: "Obtén tu calificación final calculada automáticamente según los pesos asignados." 
    },
    { 
      title: "Exportación de resultados", 
      description: "Guarda o comparte tus resultados en formato PDF o imagen." 
    },
    { 
      title: "Interfaz intuitiva", 
      description: "Diseño simple y fácil de usar para administrar tus calificaciones eficientemente." 
    }
  ];
  
  const englishFeatures = [
    { 
      title: "Customizable categories", 
      description: "Organize your grades into categories such as exams, assignments, projects, etc." 
    },
    { 
      title: "Flexible weighting", 
      description: "Assign different weights to categories and activities based on their importance." 
    },
    { 
      title: "Automatic calculation", 
      description: "Get your final grade calculated automatically based on the assigned weights." 
    },
    { 
      title: "Results export", 
      description: "Save or share your results in PDF or image format." 
    },
    { 
      title: "Intuitive interface", 
      description: "Simple and easy-to-use design to manage your grades efficiently." 
    }
  ];

  // Tutorial steps
  const spanishTutorialSteps = [
    { title: "Paso 1: Crear categorías", content: "Comienza creando las categorías para tus calificaciones (exámenes, tareas, etc.) y asignando el porcentaje que cada categoría representa en tu calificación final. Recuerda que la suma debe ser exactamente 100%." },
    { title: "Paso 2: Agregar actividades", content: "Dentro de cada categoría, agrega las actividades específicas (por ejemplo: 'Examen parcial 1', 'Tarea semanal', etc.) y asigna el peso que cada actividad tiene dentro de su categoría." },
    { title: "Paso 3: Ingresar calificaciones", content: "Ingresa las calificaciones obtenidas en cada actividad en una escala de 0 a 100." },
    { title: "Paso 4: Revisar resultados", content: "Revisa la sección de resultados para ver tu calificación final calculada, junto con el desglose por categorías." }
  ];
  
  const englishTutorialSteps = [
    { title: "Step 1: Create categories", content: "Start by creating categories for your grades (exams, assignments, etc.) and assigning the percentage that each category represents in your final grade. Remember that the sum must be exactly 100%." },
    { title: "Step 2: Add activities", content: "Within each category, add specific activities (e.g., 'Midterm exam 1', 'Weekly assignment', etc.) and assign the weight that each activity has within its category." },
    { title: "Step 3: Enter grades", content: "Enter the grades obtained for each activity on a scale of 0 to 100." },
    { title: "Step 4: Review results", content: "Check the results section to see your calculated final grade, along with the breakdown by category." }
  ];

  // Use the correct type of data based on language
  const steps = language === 'es' ? spanishSteps : englishSteps;
  const faq = language === 'es' ? spanishFaq : englishFaq;
  const features = language === 'es' ? spanishFeatures : englishFeatures;
  const tutorialSteps = language === 'es' ? spanishTutorialSteps : englishTutorialSteps;

  // For table of contents navigation
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // For copying examples
  const handleCopyExample = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: language === 'es' ? "Copiado" : "Copied",
      description: language === 'es' ? "Ejemplo copiado al portapapeles" : "Example copied to clipboard",
    });
  };
  
  // Handle search filtering
  const filterContent = (content: any[], term: string) => {
    if (!term) return content;
    
    return content.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(term.toLowerCase());
      } else if (item.question) { // FAQ item
        return item.question.toLowerCase().includes(term.toLowerCase()) || 
               item.answer.toLowerCase().includes(term.toLowerCase());
      } else if (item.title) { // Feature or tutorial item
        return item.title.toLowerCase().includes(term.toLowerCase()) || 
               item.description?.toLowerCase().includes(term.toLowerCase()) ||
               item.content?.toLowerCase().includes(term.toLowerCase());
      }
      return false;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Guide Header */}
        <div className="mb-8 bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <BookOpen className="mr-2" /> 
                {language === 'es' ? 'Guía de Usuario HABY' : 'HABY User Guide'}
              </h1>
              <p className="text-white/80 max-w-2xl">
                {language === 'es' 
                  ? 'Aprende a utilizar todas las funciones de la calculadora de calificaciones HABY para obtener el máximo provecho.' 
                  : 'Learn how to use all the features of the HABY grade calculator to get the most out of it.'}
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === 'es' ? 'Volver a la calculadora' : 'Back to calculator'}
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setShowTutorial(!showTutorial)}
              >
                {showTutorial 
                  ? (language === 'es' ? 'Cerrar tutorial' : 'Close tutorial') 
                  : (language === 'es' ? 'Iniciar tutorial' : 'Start tutorial')}
              </Button>
            </div>
          </div>
        </div>

        {/* Tutorial Overlay */}
        {showTutorial && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                {tutorialSteps[currentStep].title}
              </h3>
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  {tutorialSteps[currentStep].content}
                </p>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  {language === 'es' ? 'Anterior' : 'Previous'}
                </Button>
                <div className="flex gap-1">
                  {tutorialSteps.map((_, idx) => (
                    <span 
                      key={idx}
                      className={`h-2 w-2 rounded-full ${idx === currentStep ? 'bg-education-primary' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                {currentStep < tutorialSteps.length - 1 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    {language === 'es' ? 'Siguiente' : 'Next'}
                  </Button>
                ) : (
                  <Button onClick={() => setShowTutorial(false)}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {language === 'es' ? 'Finalizar' : 'Finish'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Navigation Bar & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => scrollToSection('overview')}>
                {language === 'es' ? 'Vista general' : 'Overview'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollToSection('features')}>
                {language === 'es' ? 'Características' : 'Features'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollToSection('how-to')}>
                {language === 'es' ? 'Cómo usar' : 'How to use'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollToSection('faq')}>
                {language === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => scrollToSection('examples')}>
                {language === 'es' ? 'Ejemplos' : 'Examples'}
              </Button>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder={language === 'es' ? "Buscar en la guía..." : "Search guide..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - Table of Contents */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md sticky top-4">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                {language === 'es' ? 'Tabla de contenido' : 'Table of Contents'}
              </h2>
              <nav className="space-y-1">
                <a 
                  href="#overview" 
                  className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}
                >
                  {language === 'es' ? 'Vista general' : 'Overview'}
                </a>
                <a 
                  href="#features" 
                  className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                >
                  {language === 'es' ? 'Características principales' : 'Main features'}
                </a>
                <a 
                  href="#how-to" 
                  className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('how-to'); }}
                >
                  {language === 'es' ? 'Cómo usar HABY' : 'How to use HABY'}
                </a>
                <div className="pl-4 border-l border-gray-200 dark:border-gray-700 ml-2 mt-1">
                  {steps.map((step, index) => (
                    <a
                      key={index}
                      href={`#step-${index + 1}`}
                      className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors"
                      onClick={(e) => { e.preventDefault(); scrollToSection(`step-${index + 1}`); }}
                    >
                      {step}
                    </a>
                  ))}
                </div>
                <a 
                  href="#faq" 
                  className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                >
                  {language === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
                </a>
                <a 
                  href="#examples" 
                  className="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={(e) => { e.preventDefault(); scrollToSection('examples'); }}
                >
                  {language === 'es' ? 'Ejemplos prácticos' : 'Practical examples'}
                </a>
              </nav>
              
              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">
                  {language === 'es' ? 'Acciones rápidas' : 'Quick actions'}
                </h3>
                <div className="space-y-2">
                  <Link to="/" className="flex items-center text-sm text-education-primary hover:underline">
                    <ArrowLeft className="mr-2 h-3 w-3" />
                    {language === 'es' ? 'Volver a la calculadora' : 'Back to calculator'}
                  </Link>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center text-sm text-education-primary hover:underline"
                  >
                    <ArrowUp className="mr-2 h-3 w-3" />
                    {language === 'es' ? 'Volver arriba' : 'Back to top'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-8">
            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="guide">
                  {language === 'es' ? 'Guía de uso' : 'User guide'}
                </TabsTrigger>
                <TabsTrigger value="examples">
                  {language === 'es' ? 'Ejemplos prácticos' : 'Practical examples'}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="guide" className="space-y-6">
                {/* Overview Section */}
                <section id="overview" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-education-primary">
                    {language === 'es' ? 'Vista general' : 'Overview'}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es'
                      ? 'HABY Score Tracker es una calculadora de calificaciones que te permite organizar tus evaluaciones por categorías y actividades, asignando pesos específicos para obtener tu calificación final de manera precisa. Con HABY, puedes calcular fácilmente tus calificaciones finales basadas en diferentes criterios de evaluación y ponderaciones.'
                      : 'HABY Score Tracker is a grade calculator that allows you to organize your evaluations by categories and activities, assigning specific weights to obtain your final grade accurately. With HABY, you can easily calculate your final grades based on different evaluation criteria and weightings.'}
                  </p>
                </section>
                
                {/* Features Section */}
                <section id="features" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-education-primary">
                    {language === 'es' ? 'Características principales' : 'Main features'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterContent(features, searchTerm).map((feature, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* How to Use Section */}
                <section id="how-to" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-education-primary">
                    {language === 'es' ? 'Cómo usar HABY' : 'How to use HABY'}
                  </h2>
                  
                  {steps.map((step, index) => (
                    <div id={`step-${index + 1}`} key={index} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Badge variant="outline" className="mr-2 bg-education-primary/10 text-education-primary border-education-primary/20">
                          {index + 1}
                        </Badge>
                        {step}
                      </h3>
                      <div className="pl-9">
                        <p className="text-gray-700 dark:text-gray-300">
                          {tutorialSteps[index].content}
                        </p>
                      </div>
                    </div>
                  ))}
                </section>
                
                {/* FAQ Section */}
                <section id="faq" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-education-primary">
                    {language === 'es' ? 'Preguntas frecuentes' : 'Frequently Asked Questions'}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {filterContent(faq, searchTerm).map((item, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              </TabsContent>
              
              {/* Examples Tab */}
              <TabsContent value="examples" className="space-y-6">
                <section id="examples" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-education-primary">
                    {language === 'es' ? 'Ejemplos prácticos' : 'Practical examples'}
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Example 1 */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'es' ? 'Ejemplo 1: Curso universitario estándar' : 'Example 1: Standard university course'}
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded relative">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => handleCopyExample(language === 'es' ? 'Ejemplo 1 - Categorías:\n\nExámenes (40%)\n- Examen parcial 1 (50%): 85\n- Examen parcial 2 (50%): 92\n\nTrabajos (30%)\n- Trabajo 1 (30%): 88\n- Trabajo 2 (30%): 76\n- Trabajo 3 (40%): 95\n\nParticipación (10%)\n- Asistencia (50%): 100\n- Participación en clase (50%): 80\n\nProyecto final (20%)\n- Proyecto (100%): 90' : 'Example 1 - Categories:\n\nExams (40%)\n- Midterm 1 (50%): 85\n- Midterm 2 (50%): 92\n\nAssignments (30%)\n- Assignment 1 (30%): 88\n- Assignment 2 (30%): 76\n- Assignment 3 (40%): 95\n\nParticipation (10%)\n- Attendance (50%): 100\n- Class participation (50%): 80\n\nFinal project (20%)\n- Project (100%): 90')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="whitespace-pre-wrap text-sm font-mono">
{language === 'es' ? `Categorías:

Exámenes (40%)
- Examen parcial 1 (50%): 85
- Examen parcial 2 (50%): 92

Trabajos (30%)
- Trabajo 1 (30%): 88
- Trabajo 2 (30%): 76
- Trabajo 3 (40%): 95

Participación (10%)
- Asistencia (50%): 100
- Participación en clase (50%): 80

Proyecto final (20%)
- Proyecto (100%): 90` : `Categories:

Exams (40%)
- Midterm 1 (50%): 85
- Midterm 2 (50%): 92

Assignments (30%)
- Assignment 1 (30%): 88
- Assignment 2 (30%): 76
- Assignment 3 (40%): 95

Participation (10%)
- Attendance (50%): 100
- Class participation (50%): 80

Final project (20%)
- Project (100%): 90`}
                        </pre>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === 'es' 
                            ? 'Calificación final calculada: 88.5 / 100 = 8.85 / 10' 
                            : 'Final calculated grade: 88.5 / 100 = 8.85 / 10'}
                        </p>
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // This would load the example in the calculator
                              toast({
                                title: language === 'es' ? "Ejemplo cargado" : "Example loaded",
                                description: language === 'es' ? "Vuelve a la calculadora para ver el ejemplo" : "Go back to the calculator to see the example",
                              });
                            }}
                          >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {language === 'es' ? 'Cargar este ejemplo' : 'Load this example'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Example 2 */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {language === 'es' ? 'Ejemplo 2: Curso con laboratorio' : 'Example 2: Course with laboratory'}
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded relative">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => handleCopyExample(language === 'es' ? 'Ejemplo 2 - Categorías:\n\nTeoría (50%)\n- Examen teórico 1 (25%): 78\n- Examen teórico 2 (25%): 82\n- Examen final (50%): 88\n\nLaboratorio (40%)\n- Práctica 1 (20%): 90\n- Práctica 2 (20%): 85\n- Práctica 3 (20%): 92\n- Proyecto de laboratorio (40%): 95\n\nAsistencia (10%)\n- Asistencia (100%): 90' : 'Example 2 - Categories:\n\nTheory (50%)\n- Theory exam 1 (25%): 78\n- Theory exam 2 (25%): 82\n- Final exam (50%): 88\n\nLaboratory (40%)\n- Lab 1 (20%): 90\n- Lab 2 (20%): 85\n- Lab 3 (20%): 92\n- Lab project (40%): 95\n\nAttendance (10%)\n- Attendance (100%): 90')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <pre className="whitespace-pre-wrap text-sm font-mono">
{language === 'es' ? `Categorías:

Teoría (50%)
- Examen teórico 1 (25%): 78
- Examen teórico 2 (25%): 82
- Examen final (50%): 88

Laboratorio (40%)
- Práctica 1 (20%): 90
- Práctica 2 (20%): 85
- Práctica 3 (20%): 92
- Proyecto de laboratorio (40%): 95

Asistencia (10%)
- Asistencia (100%): 90` : `Categories:

Theory (50%)
- Theory exam 1 (25%): 78
- Theory exam 2 (25%): 82
- Final exam (50%): 88

Laboratory (40%)
- Lab 1 (20%): 90
- Lab 2 (20%): 85
- Lab 3 (20%): 92
- Lab project (40%): 95

Attendance (10%)
- Attendance (100%): 90`}
                        </pre>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === 'es' 
                            ? 'Calificación final calculada: 87.8 / 100 = 8.78 / 10' 
                            : 'Final calculated grade: 87.8 / 100 = 8.78 / 10'}
                        </p>
                        <div className="mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // This would load the example in the calculator
                              toast({
                                title: language === 'es' ? "Ejemplo cargado" : "Example loaded",
                                description: language === 'es' ? "Vuelve a la calculadora para ver el ejemplo" : "Go back to the calculator to see the example",
                              });
                            }}
                          >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {language === 'es' ? 'Cargar este ejemplo' : 'Load this example'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
            
            {/* Back to top button (fixed) */}
            <button 
              className="fixed bottom-6 right-6 bg-education-primary text-white rounded-full p-3 shadow-lg hover:bg-education-secondary transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
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
                &copy; {new Date().getFullYear()} HABY Score Tracker - {language === 'es' ? 'Desarrollado por' : 'Developed by'} <span className="font-medium">Heber Zadkiel García Pérez</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Guide;

