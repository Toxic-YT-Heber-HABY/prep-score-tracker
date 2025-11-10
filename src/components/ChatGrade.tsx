import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Send, 
  Bot, 
  User, 
  Info, 
  Sparkles, 
  RefreshCw,
  Brain,
  Loader2
} from 'lucide-react';
import { toast } from "sonner";
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestionExamples = {
  es: [
    "Hola, quiero calcular mis calificaciones",
    "Tengo tres categorías: exámenes 40%, tareas 30%, proyecto 30%",
    "¿Cómo calculo mi promedio final?",
    "¿Qué nota necesito en mi examen final para aprobar?"
  ],
  en: [
    "Hi, I want to calculate my grades",
    "I have three categories: exams 40%, homework 30%, project 30%",
    "How do I calculate my final average?",
    "What grade do I need on my final exam to pass?"
  ]
};

const ChatGrade: React.FC = () => {
  const { language } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { 
          messages: [...messages, { role: 'user', content: userMessage }],
          type: 'grades'
        }
      });

      if (error) {
        throw error;
      }

      if (!data || !data.body) {
        throw new Error('No response body');
      }

      const reader = data.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      let streamDone = false;

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error en chat:', error);
      toast.error(language === 'es' ? "Error al conectar con el asistente" : "Error connecting to assistant");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    await streamChat(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    toast.success(language === 'es' ? "Chat reiniciado" : "Chat reset");
  };

  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  /**
   * Renderizado del componente de chat con bordes redondeados
   */
  return (
    <Card className="rounded-2xl overflow-hidden border-2 border-education-primary/20 shadow-2xl transition-all duration-300 hover:shadow-xl hover:border-education-primary/30">
      {/* Cabecera del chat con bordes redondeados */}
      <div className="flex items-center justify-between bg-gradient-to-r from-education-primary to-education-secondary p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-lg">
            <Brain className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{language === 'es' ? 'Asistente de Calificaciones' : 'Grade Assistant'}</h2>
            <p className="text-sm text-white/80">{language === 'es' ? 'Powered by HABY AI' : 'Powered by HABY AI'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetChat} 
            className="bg-white/10 hover:bg-white/20 text-white border-none rounded-xl transition-all duration-200"
            title={language === 'es' ? "Reiniciar conversación" : "Reset conversation"}
          >
            <RefreshCw size={18} />
          </Button>
        </div>
      </div>

      {/* Mensajes del chat con bordes redondeados */}
      <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Brain className="h-16 w-16 text-education-primary mb-4 opacity-50" />
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg font-semibold">
              {language === 'es' ? '¡Hola! Soy tu asistente de calificaciones' : 'Hi! I\'m your grade assistant'}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {language === 'es' 
                ? 'Pregúntame sobre cómo calcular tus calificaciones o usa una de las sugerencias de abajo'
                : 'Ask me about how to calculate your grades or use one of the suggestions below'}
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, idx) => (
              <div 
                key={idx}
                className={`flex items-start gap-4 mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-education-primary to-education-secondary flex items-center justify-center text-white shadow-lg">
                    <Bot size={20} />
                  </div>
                )}
                
                <div 
                  className={`rounded-2xl p-4 max-w-[80%] relative shadow-md ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-education-primary/10 to-education-secondary/10 border-2 border-education-primary/20 text-gray-900 dark:text-gray-100'
                      : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {message.role === 'user' && (
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-lg">
                    <User size={20} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4 mb-6 animate-pulse">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-education-primary to-education-secondary flex items-center justify-center text-white shadow-lg">
                  <Bot size={20} />
                </div>
                <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                  <Loader2 className="h-4 w-4 animate-spin text-education-primary" />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Sugerencias con bordes redondeados */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 px-6 py-4 flex flex-wrap items-center gap-3 border-t-2 border-gray-100 dark:border-gray-800">
        {suggestionExamples[language === 'es' ? 'es' : 'en'].map((suggestion, index) => (
          <Button 
            key={index}
            variant="outline"
            size="sm" 
            onClick={() => useSuggestion(suggestion)}
            className="bg-white dark:bg-gray-800 text-sm border-2 border-gray-200 dark:border-gray-700 hover:border-education-primary hover:bg-education-primary/5 transition-all duration-200 rounded-xl"
          >
            {suggestion}
          </Button>
        ))}
      </div>
      
      {/* Información de uso con bordes redondeados */}
      <div className="bg-education-light/20 dark:bg-education-dark/20 px-6 py-3 flex items-center gap-3 border-t-2 border-gray-100 dark:border-gray-700">
        <Sparkles size={18} className="text-education-primary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es' 
            ? 'Asistente IA que te ayuda a calcular tus calificaciones paso a paso.'
            : 'AI assistant that helps you calculate your grades step by step.'}
        </p>
      </div>
      
      {/* Controles del chat con bordes redondeados */}
      <div className="p-6 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
          className="flex-grow rounded-xl border-2 focus:border-education-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          disabled={isLoading}
        />
        
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading}
          className="flex-shrink-0 bg-education-primary hover:bg-education-dark text-white rounded-xl"
        >
          {isLoading ? 
            <Loader2 size={18} className="animate-spin" /> : 
            <Send size={18} />
          }
        </Button>
      </div>
    </Card>
  );
};

export default ChatGrade;
