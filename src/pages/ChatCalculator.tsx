
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
        {/* Introducción con bordes redondeados */}
        <div className="mb-8 p-8 rounded-3xl bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 border-2 border-education-primary/20 dark:border-education-secondary/20 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-education-primary/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-education-primary animate-pulse" />
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
                  {language === 'es' ? 'Calcula tu nota con IA' : 'Calculate your grade with AI'}
                </h1>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                {language === 'es' 
                  ? 'Conversa naturalmente con nuestro asistente. Solo dile "Hola, quiero calcular mis calificaciones" y te guiará paso a paso para obtener tu resultado final.'
                  : 'Chat naturally with our assistant. Just tell it "Hi, I want to calculate my grades" and it will guide you step by step to get your final result.'}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-education-primary to-education-secondary rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3">
                <Calculator className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Instrucciones rápidas con bordes redondeados */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-education-primary/30">
            <div className="flex items-center gap-3 mb-3 text-education-primary">
              <MessageCircle className="h-6 w-6" />
              <h3 className="font-semibold text-lg">{language === 'es' ? 'Conversa naturalmente' : 'Talk naturally'}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'es' 
                ? 'Solo di "Quiero calcular mis calificaciones" y el asistente te guiará paso a paso.'
                : 'Just say "I want to calculate my grades" and the assistant will guide you step by step.'}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-education-primary/30">
            <div className="flex items-center gap-3 mb-3 text-education-primary">
              <Calculator className="h-6 w-6" />
              <h3 className="font-semibold text-lg">{language === 'es' ? 'Proporciona tus datos' : 'Provide your data'}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'es' 
                ? 'Indica las categorías, sus valores y las calificaciones que obtuviste en cada actividad.'
                : 'Indicate the categories, their values, and the grades you got in each activity.'}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-education-primary/30">
            <div className="flex items-center gap-3 mb-3 text-education-primary">
              <Sparkles className="h-6 w-6" />
              <h3 className="font-semibold text-lg">{language === 'es' ? 'Obtén resultados' : 'Get results'}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {language === 'es' 
                ? 'Recibe un cálculo automático de tu calificación final con un desglose detallado.'
                : 'Receive an automatic calculation of your final grade with a detailed breakdown.'}
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
