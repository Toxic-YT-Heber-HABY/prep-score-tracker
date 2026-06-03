import React from 'react';
import ChatGrade from '@/components/ChatGrade';
import { useI18n } from '@/lib/i18n';
import SEO from '@/components/SEO';
import { Sparkles, Calculator, MessageCircle, Brain } from 'lucide-react';

const ChatCalculator = () => {
  const { language } = useI18n();
  
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <SEO
        title="Calculadora con IA - HABY Score Tracker"
        description="Conversa con el asistente IA para calcular tus calificaciones paso a paso. Soporta análisis de imágenes de boletas con OCR."
        path="/chat-calculator"
      />
      <div className="px-4 py-6 sm:px-8 sm:py-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-7 w-7 text-education-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'es' ? 'Calcula tu nota con IA' : 'Calculate your grade with AI'}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {language === 'es' 
              ? 'Conversa naturalmente con nuestro asistente. Solo dile "Hola, quiero calcular mis calificaciones" y te guiará paso a paso.'
              : 'Chat naturally with our assistant. Just tell it "Hi, I want to calculate my grades" and it will guide you step by step.'}
          </p>
        </div>
        
        {/* Quick instructions */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MessageCircle, titleEs: 'Conversa naturalmente', titleEn: 'Talk naturally',
              descEs: 'Solo di "Quiero calcular mis calificaciones" y el asistente te guiará paso a paso.',
              descEn: 'Just say "I want to calculate my grades" and the assistant will guide you step by step.' },
            { icon: Calculator, titleEs: 'Proporciona tus datos', titleEn: 'Provide your data',
              descEs: 'Indica las categorías, sus valores y las calificaciones que obtuviste en cada actividad.',
              descEn: 'Indicate the categories, their values, and the grades you got in each activity.' },
            { icon: Sparkles, titleEs: 'Obtén resultados', titleEn: 'Get results',
              descEs: 'Recibe un cálculo automático de tu calificación final con un desglose detallado.',
              descEn: 'Receive an automatic calculation of your final grade with a detailed breakdown.' },
          ].map(({ icon: Icon, titleEs, titleEn, descEs, descEn }) => (
            <div key={titleEn} className="bg-card border border-border p-5 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-education-primary">
                <Icon className="h-5 w-5" />
                <h2 className="font-medium text-base">{language === 'es' ? titleEs : titleEn}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'es' ? descEs : descEn}
              </p>
            </div>
          ))}
        </div>
        
        <ChatGrade />
      </div>
    </div>
  );
};

export default ChatCalculator;
