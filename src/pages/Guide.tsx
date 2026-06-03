import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import SEO from '@/components/SEO';
import { Calculator, BookOpen, Target, Lightbulb, Brain } from 'lucide-react';

const Guide = () => {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Guía de uso - HABY Score Tracker"
        description="Aprende a usar HABY Score Tracker: categorías, actividades, ejemplos prácticos y consejos para calcular tus calificaciones."
        path="/guide"
      />
      <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'es' ? 'Guía de Uso' : 'User Guide'}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {language === 'es' 
              ? 'Aprende a usar HABY Score Tracker para calcular tus calificaciones de manera precisa'
              : 'Learn how to use HABY Score Tracker to calculate your grades accurately'}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Conceptos básicos */}
          <Card className="border border-border">
            <CardHeader className="bg-education-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <BookOpen className="h-5 w-5 text-education-primary" />
                {language === 'es' ? 'Conceptos Básicos' : 'Basic Concepts'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {[
                { emoji: '📊', titleEs: 'Categorías', titleEn: 'Categories',
                  descEs: 'Son los tipos de evaluación en tu materia. Ejemplos: Exámenes (40%), Tareas (30%), Proyectos (20%), Participación (10%).',
                  descEn: 'These are the types of evaluation in your subject. Examples: Exams (40%), Assignments (30%), Projects (20%), Participation (10%).',
                  color: 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10' },
                { emoji: '📝', titleEs: 'Actividades', titleEn: 'Activities',
                  descEs: 'Son las evaluaciones específicas dentro de cada categoría.',
                  descEn: 'These are the specific evaluations within each category.',
                  color: 'border-l-green-500 bg-green-50 dark:bg-green-900/10' },
                { emoji: '⚖️', titleEs: 'Valor (%)', titleEn: 'Value (%)',
                  descEs: 'Es cuánto vale cada elemento del total.',
                  descEn: 'This is how much each element is worth of the total.',
                  color: 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/10' },
                { emoji: '🎯', titleEs: 'Calificación', titleEn: 'Grade',
                  descEs: 'Es la nota que sacaste, expresada del 0 al 100.',
                  descEn: 'This is the grade you got, expressed from 0 to 100.',
                  color: 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10' },
              ].map(({ emoji, titleEs, titleEn, descEs, descEn, color }) => (
                <div key={titleEn} className={`p-4 rounded-lg border-l-4 ${color}`}>
                  <h3 className="font-medium mb-1 text-foreground text-sm">{emoji} {language === 'es' ? titleEs : titleEn}</h3>
                  <p className="text-sm text-muted-foreground">{language === 'es' ? descEs : descEn}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat IA */}
          <Card className="border border-border">
            <CardHeader className="bg-education-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <Brain className="h-5 w-5 text-education-primary" />
                {language === 'es' ? 'Calculadora con Chat IA' : 'AI Chat Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {[1,2,3,4].map(step => {
                const texts: Record<number, {es: string; en: string}> = {
                  1: { es: 'Ve a "Chat IA" y saluda al asistente', en: 'Go to "AI Chat" and greet the assistant' },
                  2: { es: 'Proporciona tus categorías y sus valores', en: 'Provide your categories and their values' },
                  3: { es: 'Indica las actividades y calificaciones', en: 'Indicate activities and grades' },
                  4: { es: '¡Listo! Obtén tu calificación final', en: 'Done! Get your final grade' },
                };
                return (
                  <div key={step} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-education-primary text-white rounded-full flex items-center justify-center text-sm font-medium">{step}</span>
                    <p className="text-sm text-muted-foreground pt-1">{language === 'es' ? texts[step].es : texts[step].en}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Calculadora tradicional */}
          <Card className="border border-border">
            <CardHeader className="bg-education-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <Calculator className="h-5 w-5 text-education-primary" />
                {language === 'es' ? 'Calculadora Tradicional' : 'Traditional Calculator'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {[
                { es: 'Crea tus categorías y su valor del total (deben sumar 100%)', en: 'Create your categories and their total value (must add up to 100%)' },
                { es: 'Agrega actividades con su valor y calificación', en: 'Add activities with their value and grade' },
                { es: 'Revisa tu calificación final calculada automáticamente', en: 'Review your automatically calculated final grade' },
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-education-secondary text-white rounded-full flex items-center justify-center text-sm font-medium">{i+1}</span>
                  <p className="text-sm text-muted-foreground pt-1">{language === 'es' ? text.es : text.en}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ejemplo práctico */}
          <Card className="border border-border">
            <CardHeader className="bg-education-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <Target className="h-5 w-5 text-education-primary" />
                {language === 'es' ? 'Ejemplo Práctico' : 'Practical Example'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium text-foreground">{language === 'es' ? 'Materia: Matemáticas' : 'Subject: Mathematics'}</h3>
                {[
                  { color: 'border-l-blue-500', title: language === 'es' ? 'Exámenes - 50%' : 'Exams - 50%', items: [language === 'es' ? 'Parcial 1 (50%): 85' : 'Midterm 1 (50%): 85', language === 'es' ? 'Parcial 2 (50%): 90' : 'Midterm 2 (50%): 90'] },
                  { color: 'border-l-green-500', title: language === 'es' ? 'Tareas - 30%' : 'Assignments - 30%', items: [language === 'es' ? 'Tarea 1 (100%): 95' : 'Assignment 1 (100%): 95'] },
                  { color: 'border-l-purple-500', title: language === 'es' ? 'Participación - 20%' : 'Participation - 20%', items: [language === 'es' ? 'Participación (100%): 88' : 'Participation (100%): 88'] },
                ].map(({ color, title, items }) => (
                  <div key={title} className={`border-l-4 ${color} pl-3`}>
                    <h4 className="font-medium text-sm text-foreground">{title}</h4>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      {items.map(item => <li key={item}>• {item}</li>)}
                    </ul>
                  </div>
                ))}
                <div className="p-3 bg-education-primary/10 rounded-lg">
                  <p className="font-medium text-sm text-education-primary">
                    🎯 {language === 'es' ? 'Calificación Final: 88.75/100' : 'Final Grade: 88.75/100'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consejos */}
          <Card className="border border-border">
            <CardHeader className="bg-education-primary/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <Lightbulb className="h-5 w-5 text-education-primary" />
                {language === 'es' ? 'Consejos Útiles' : 'Useful Tips'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {[
                { es: 'Los valores de las categorías deben sumar exactamente 100%', en: 'Category values must add up to exactly 100%' },
                { es: 'Los valores de actividades dentro de cada categoría deben sumar 100%', en: 'Activity values within each category must add up to 100%' },
                { es: 'Usa el Chat IA para una experiencia más rápida', en: 'Use the AI Chat for a faster experience' },
                { es: 'Puedes exportar tus resultados en PDF o imagen', en: 'You can export your results as PDF or image' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">💡</span>
                  <p className="text-sm text-muted-foreground">{language === 'es' ? tip.es : tip.en}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Guide;
