
import React from 'react';
import Header from '@/components/Header';
import ChatGrade from '@/components/ChatGrade';
import { useI18n } from '@/lib/i18n';

/**
 * Página de calculadora interactiva por chat
 * Permite a los estudiantes calcular su calificación mediante un diálogo
 */
const ChatCalculator = () => {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-5xl">
        {/* Introducción */}
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 border border-education-primary/20 dark:border-education-secondary/20 shadow-md">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {language === 'es' ? 'Calcula tu nota con IA' : 'Calculate your grade with AI'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {language === 'es' 
              ? 'Conversa con nuestro asistente para calcular tu calificación final. Sólo dile cuáles son tus categorías, actividades y notas.'
              : 'Chat with our assistant to calculate your final grade. Just tell it what your categories, activities and grades are.'}
          </p>
        </div>
        
        {/* Componente principal de chat */}
        <ChatGrade />
      </main>
    </div>
  );
};

export default ChatCalculator;
