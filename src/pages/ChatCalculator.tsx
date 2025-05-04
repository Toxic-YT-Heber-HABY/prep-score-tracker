
import React from 'react';
import Header from '@/components/Header';
import ChatGrade from '@/components/ChatGrade';
import { useI18n } from '@/lib/i18n';
import { Sparkles, Calculator, MessageCircle, Brain } from 'lucide-react';

/**
 * Página de calculadora interactiva por chat
 * Permite a los estudiantes calcular su calificación mediante un diálogo
 */
const ChatCalculator = () => {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-6xl">
        {/* Introducción */}
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 border border-education-primary/20 dark:border-education-secondary/20 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-education-primary animate-pulse" />
                <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
                  {language === 'es' ? 'Calcula tu nota con IA' : 'Calculate your grade with AI'}
                </h1>
              </div>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
                {language === 'es' 
                  ? 'Conversa con nuestro asistente para calcular tu calificación final. Sólo dile cuáles son tus categorías, actividades y notas. Nuestro asistente de IA te guiará paso a paso.'
                  : 'Chat with our assistant to calculate your final grade. Just tell it what your categories, activities and grades are. Our AI assistant will guide you step by step.'}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-education-primary to-education-secondary rounded-full flex items-center justify-center shadow-lg">
                <Calculator className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Instrucciones rápidas */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 text-education-primary">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">{language === 'es' ? 'Conversa naturalmente' : 'Talk naturally'}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'es' 
                ? 'Habla con el asistente como lo harías con un amigo. Entenderá lo que necesitas.'
                : 'Talk to the assistant like you would with a friend. It will understand what you need.'}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 text-education-primary">
              <Calculator className="h-5 w-5" />
              <h3 className="font-medium">{language === 'es' ? 'Menciona tus notas' : 'Mention your grades'}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'es' 
                ? 'Indica las categorías, sus pesos y las calificaciones de cada actividad.'
                : 'Indicate the categories, their weights, and the grades for each activity.'}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 text-education-primary">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-medium">{language === 'es' ? 'Obtén resultados' : 'Get results'}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'es' 
                ? 'Recibe un cálculo preciso de tu calificación final y un desglose detallado.'
                : 'Receive an accurate calculation of your final grade and a detailed breakdown.'}
            </p>
          </div>
        </div>
        
        {/* Componente principal de chat */}
        <ChatGrade />
      </main>
    </div>
  );
};

export default ChatCalculator;
