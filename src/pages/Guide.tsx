
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { 
  Calculator, 
  BookOpen, 
  Target, 
  Lightbulb, 
  MessageSquare,
  Brain
} from 'lucide-react';

const Guide = () => {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {language === 'es' ? 'Guía de Uso' : 'User Guide'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Aprende a usar HABY Score Tracker para calcular tus calificaciones de manera precisa'
              : 'Learn how to use HABY Score Tracker to calculate your grades accurately'}
          </p>
        </div>

        <div className="grid gap-8">
          {/* Conceptos básicos */}
          <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-xl">
                <BookOpen className="h-6 w-6" />
                {language === 'es' ? 'Conceptos Básicos' : 'Basic Concepts'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">
                    {language === 'es' ? '📊 Categorías' : '📊 Categories'}
                  </h3>
                  <p className="text-blue-800 dark:text-blue-300">
                    {language === 'es' 
                      ? 'Son los tipos de evaluación en tu materia. Ejemplos: Exámenes (40%), Tareas (30%), Proyectos (20%), Participación (10%).'
                      : 'These are the types of evaluation in your subject. Examples: Exams (40%), Assignments (30%), Projects (20%), Participation (10%).'}
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-semibold text-green-900 dark:text-green-400 mb-2">
                    {language === 'es' ? '📝 Actividades' : '📝 Activities'}
                  </h3>
                  <p className="text-green-800 dark:text-green-300">
                    {language === 'es' 
                      ? 'Son las evaluaciones específicas dentro de cada categoría. Ejemplo: En "Exámenes" puedes tener "Parcial 1", "Parcial 2", "Final".'
                      : 'These are the specific evaluations within each category. Example: In "Exams" you can have "Midterm 1", "Midterm 2", "Final".'}
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-400 mb-2">
                    {language === 'es' ? '⚖️ Valor (%)' : '⚖️ Value (%)'}
                  </h3>
                  <p className="text-purple-800 dark:text-purple-300">
                    {language === 'es' 
                      ? 'Es cuánto vale cada elemento del total. Para categorías: del 100% total. Para actividades: del 100% de su categoría.'
                      : 'This is how much each element is worth of the total. For categories: of the total 100%. For activities: of the 100% of their category.'}
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-400 mb-2">
                    {language === 'es' ? '🎯 Calificación que obtuviste' : '🎯 Grade you obtained'}
                  </h3>
                  <p className="text-orange-800 dark:text-orange-300">
                    {language === 'es' 
                      ? 'Es la nota que sacaste en cada actividad, expresada del 0 al 100. Ejemplo: 85, 92, 78.'
                      : 'This is the grade you got in each activity, expressed from 0 to 100. Example: 85, 92, 78.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora con Chat IA */}
          <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Brain className="h-6 w-6" />
                {language === 'es' ? 'Calculadora con Chat IA (Recomendado)' : 'AI Chat Calculator (Recommended)'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-xl">
                <h3 className="font-semibold text-green-900 dark:text-green-400 mb-2">
                  {language === 'es' ? '🚀 Forma más fácil y rápida' : '🚀 Easiest and fastest way'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {language === 'es' 
                    ? 'Solo di "Hola, quiero calcular mis calificaciones" y el asistente te guiará paso a paso.'
                    : 'Just say "Hi, I want to calculate my grades" and the assistant will guide you step by step.'}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Ve a la sección "Chat IA" y saluda al asistente'
                      : 'Go to the "AI Chat" section and greet the assistant'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Proporciona tus categorías y sus valores cuando te lo pida'
                      : 'Provide your categories and their values when asked'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Indica las actividades de cada categoría y las calificaciones que obtuviste'
                      : 'Indicate the activities in each category and the grades you obtained'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? '¡Listo! El asistente calculará automáticamente tu calificación final'
                      : 'Done! The assistant will automatically calculate your final grade'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora tradicional */}
          <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Calculator className="h-6 w-6" />
                {language === 'es' ? 'Calculadora Tradicional' : 'Traditional Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {language === 'es' ? 'Crea tus categorías' : 'Create your categories'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'es' 
                        ? 'Agrega cada tipo de evaluación y su valor del total (deben sumar 100%)'
                        : 'Add each type of evaluation and its value of the total (must add up to 100%)'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {language === 'es' ? 'Agrega actividades' : 'Add activities'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'es' 
                        ? 'En cada categoría, agrega las actividades específicas con su valor y calificación'
                        : 'In each category, add the specific activities with their value and grade'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-education-secondary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {language === 'es' ? 'Revisa resultados' : 'Review results'}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'es' 
                        ? 'Ve tu calificación final calculada automáticamente y exporta si necesitas'
                        : 'See your final grade calculated automatically and export if needed'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ejemplo práctico */}
          <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Target className="h-6 w-6" />
                {language === 'es' ? 'Ejemplo Práctico' : 'Practical Example'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  {language === 'es' ? 'Materia: Matemáticas' : 'Subject: Mathematics'}
                </h3>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-400">
                      {language === 'es' ? 'Exámenes - Valor: 50%' : 'Exams - Value: 50%'}
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <li>• {language === 'es' ? 'Parcial 1 (50% de Exámenes): Calificación 85' : 'Midterm 1 (50% of Exams): Grade 85'}</li>
                      <li>• {language === 'es' ? 'Parcial 2 (50% de Exámenes): Calificación 90' : 'Midterm 2 (50% of Exams): Grade 90'}</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-900 dark:text-green-400">
                      {language === 'es' ? 'Tareas - Valor: 30%' : 'Assignments - Value: 30%'}
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <li>• {language === 'es' ? 'Tarea 1 (100% de Tareas): Calificación 95' : 'Assignment 1 (100% of Assignments): Grade 95'}</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium text-purple-900 dark:text-purple-400">
                      {language === 'es' ? 'Participación - Valor: 20%' : 'Participation - Value: 20%'}
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <li>• {language === 'es' ? 'Participación en clase (100%): Calificación 88' : 'Class participation (100%): Grade 88'}</li>
                    </ul>
                  </div>
                  
                  <div className="mt-4 p-3 bg-education-primary/10 rounded-lg">
                    <p className="font-semibold text-education-primary">
                      {language === 'es' 
                        ? '🎯 Calificación Final: 88.75/100' 
                        : '🎯 Final Grade: 88.75/100'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consejos */}
          <Card className="rounded-2xl border-2 border-education-primary/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-education-primary to-education-secondary text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Lightbulb className="h-6 w-6" />
                {language === 'es' ? 'Consejos Útiles' : 'Useful Tips'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <span className="text-yellow-600">💡</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Los valores de las categorías deben sumar exactamente 100%'
                      : 'Category values must add up to exactly 100%'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <span className="text-blue-600">💡</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Los valores de las actividades dentro de cada categoría deben sumar 100%'
                      : 'Activity values within each category must add up to 100%'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <span className="text-green-600">💡</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Usa el Chat IA para una experiencia más rápida y guiada'
                      : 'Use the AI Chat for a faster and guided experience'}
                  </p>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <span className="text-purple-600">💡</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    {language === 'es' 
                      ? 'Puedes exportar tus resultados en PDF o imagen para guardarlos'
                      : 'You can export your results as PDF or image to save them'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guide;
