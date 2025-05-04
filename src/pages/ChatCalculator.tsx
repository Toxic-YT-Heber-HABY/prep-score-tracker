
import React from 'react';
import Header from '@/components/Header';
import ChatGrade from '@/components/ChatGrade';
import { useI18n } from '@/lib/i18n';

const ChatCalculator = () => {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-6xl">
        {/* Intro section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {language === 'es' ? 'Calculadora de calificaciones por Chat' : 'Chat Grade Calculator'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
            {language === 'es' 
              ? 'Interactúa con nuestro asistente para calcular tu calificación final de manera conversacional. Simplemente responde las preguntas y obtén tu resultado.'
              : 'Interact with our assistant to calculate your final grade in a conversational way. Simply answer the questions and get your result.'}
          </p>
        </div>
        
        {/* Chat component */}
        <div className="mb-8">
          <ChatGrade />
        </div>
        
        {/* Instructions */}
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20 border border-education-primary/20">
          <h2 className="text-xl font-semibold mb-3">
            {language === 'es' ? '¿Cómo usar el chat?' : 'How to use the chat?'}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {language === 'es'
                ? 'El chat te guiará paso a paso para ingresar tus categorías de evaluación.'
                : 'The chat will guide you step by step to enter your evaluation categories.'}
            </li>
            <li>
              {language === 'es'
                ? 'Para cada categoría, deberás proporcionar su nombre e importancia (%).'
                : 'For each category, you\'ll need to provide its name and importance (%).'}
            </li>
            <li>
              {language === 'es'
                ? 'Luego, agregará actividades a cada categoría con su respectiva importancia y calificación.'
                : 'Then, you\'ll add activities to each category with their respective importance and grade.'}
            </li>
            <li>
              {language === 'es'
                ? 'Escribe "listo" o "terminar" cuando hayas terminado de agregar actividades a una categoría.'
                : 'Type "done" or "finish" when you\'ve finished adding activities to a category.'}
            </li>
            <li>
              {language === 'es'
                ? 'Escribe "calcular" en cualquier momento para obtener tu calificación final.'
                : 'Type "calculate" at any time to get your final grade.'}
            </li>
            <li>
              {language === 'es'
                ? 'Después de obtener tu resultado, escribe "guardar" para transferir los datos a la calculadora principal.'
                : 'After getting your result, type "save" to transfer the data to the main calculator.'}
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ChatCalculator;
