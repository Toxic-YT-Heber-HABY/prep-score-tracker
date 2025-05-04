
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
  CalculatorIcon, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { Category, Activity } from '@/types';
import { calculateResults } from '@/lib/calculator';
import { toast } from "sonner";
import { useI18n } from '@/lib/i18n';

/**
 * Tipos de mensajes en el chat
 */
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

/**
 * Estado interno del chat para seguimiento conversacional
 */
interface ChatState {
  categories: Category[];
  currentCategory?: {
    id: string;
    name: string;
    weight: number;
    activities: Activity[];
  };
  currentStep: 'idle' | 'collecting_categories' | 'collecting_activities' | 'reviewing' | 'completed';
  waitingFor?: 'category_name' | 'category_weight' | 'activity_name' | 'activity_weight' | 'activity_grade' | 'confirmation';
}

/**
 * Componente principal para la interacción de chat
 */
const ChatGrade: React.FC = () => {
  const { language } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    categories: [],
    currentStep: 'idle',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa el chat con un mensaje de bienvenida
  useEffect(() => {
    const initialMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: language === 'es' 
        ? '👋 ¡Hola! Soy el asistente de HABY para cálculo de calificaciones. ¿Te gustaría calcular tu nota final? Puedo ayudarte paso a paso.' 
        : '👋 Hi there! I\'m the HABY grade calculation assistant. Would you like to calculate your final grade? I can help you step by step.',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
  }, [language]);

  // Hacer scroll automático hacia el último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /**
   * Procesa la entrada del usuario y genera respuestas
   */
  const processUserInput = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Agregar mensaje del usuario al chat
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Pequeño delay para simular procesamiento
    setTimeout(() => {
      generateResponse(userMessage.content);
      setIsProcessing(false);
    }, 300);
  };

  /**
   * Genera respuesta basada en entrada del usuario y estado actual del chat
   */
  const generateResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    let response: Message;
    
    // Si es la primera interacción o está en estado idle
    if (chatState.currentStep === 'idle') {
      // Verificar si el usuario quiere comenzar
      if (containsAffirmation(lowercaseInput)) {
        response = createAssistantMessage(language === 'es'
          ? '¡Genial! Vamos a calcular tu calificación. Para empezar, necesito saber las categorías de evaluación (por ejemplo: tareas, exámenes, proyectos, etc). Por favor, dime el nombre de la primera categoría.'
          : 'Great! Let\'s calculate your grade. To start, I need to know your evaluation categories (e.g., assignments, exams, projects, etc). Please tell me the name of the first category.');
        
        setChatState({
          ...chatState,
          currentStep: 'collecting_categories',
          waitingFor: 'category_name',
        });
      } else if (containsNegation(lowercaseInput)) {
        response = createAssistantMessage(language === 'es'
          ? 'Está bien. Si cambias de opinión y quieres calcular tu calificación, házmelo saber. También puedes usar la calculadora tradicional desde la página principal.'
          : 'That\'s okay. If you change your mind and want to calculate your grade, let me know. You can also use the traditional calculator from the main page.');
      } else {
        response = createAssistantMessage(language === 'es'
          ? '¿Te gustaría que te ayude a calcular tu calificación final? Puedo guiarte paso a paso preguntándote sobre tus categorías y actividades.'
          : 'Would you like me to help you calculate your final grade? I can guide you step by step by asking about your categories and activities.');
      }
    }
    // Procesando categorías
    else if (chatState.currentStep === 'collecting_categories') {
      response = processCategoryCollection(lowercaseInput, userInput);
    }
    // Procesando actividades
    else if (chatState.currentStep === 'collecting_activities') {
      response = processActivityCollection(lowercaseInput, userInput);
    }
    // Revisando resultados
    else if (chatState.currentStep === 'reviewing') {
      response = processReviewStep(lowercaseInput);
    }
    // Paso final
    else {
      response = createAssistantMessage(language === 'es'
        ? 'Si necesitas calcular otra calificación, solo dímelo y podemos comenzar de nuevo.'
        : 'If you need to calculate another grade, just let me know and we can start again.');
    }
    
    setMessages(prev => [...prev, response]);
  };

  /**
   * Procesa la recolección de datos de categorías
   */
  const processCategoryCollection = (lowercaseInput: string, originalInput: string): Message => {
    if (chatState.waitingFor === 'category_name') {
      // Si el usuario menciona terminar o finalizar
      if (containsFinishKeyword(lowercaseInput) && chatState.categories.length > 0) {
        return processCategoriesComplete();
      }
      
      // Crear nueva categoría
      const newCategory = {
        id: uuidv4(),
        name: originalInput.trim(),
        weight: 0,
        activities: []
      };
      
      setChatState({
        ...chatState,
        currentCategory: newCategory,
        waitingFor: 'category_weight'
      });
      
      return createAssistantMessage(language === 'es'
        ? `He registrado la categoría "${newCategory.name}". ¿Qué porcentaje del total representa esta categoría? (por ejemplo: 30 para 30%)`
        : `I've registered the category "${newCategory.name}". What percentage of the total does this category represent? (e.g., 30 for 30%)`);
    } 
    else if (chatState.waitingFor === 'category_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        return createAssistantMessage(language === 'es'
          ? 'No pude identificar el porcentaje. Por favor, ingresa solo el número (por ejemplo: 30).'
          : 'I couldn\'t identify the percentage. Please enter just the number (e.g., 30).');
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        return createAssistantMessage(language === 'es'
          ? 'El porcentaje debe estar entre 1 y 100. Por favor, intenta de nuevo.'
          : 'The percentage must be between 1 and 100. Please try again.');
      }
      
      if (chatState.currentCategory) {
        const updatedCategory = {
          ...chatState.currentCategory,
          weight
        };
        
        const updatedCategories = [...chatState.categories, updatedCategory];
        const totalWeight = updatedCategories.reduce((sum, cat) => sum + cat.weight, 0);
        
        setChatState({
          ...chatState,
          categories: updatedCategories,
          currentCategory: undefined,
          waitingFor: 'category_name'
        });
        
        // Si ya tenemos suficiente peso, pasamos a actividades
        if (totalWeight >= 100) {
          return processTotalWeightComplete(updatedCategories);
        }
        
        return createAssistantMessage(language === 'es'
          ? `He registrado la categoría "${updatedCategory.name}" con un peso de ${weight}%. ${
            totalWeight < 100 
              ? `Hasta ahora llevamos ${totalWeight}% del total. Por favor, dime el nombre de otra categoría, o escribe "terminar" si no hay más categorías.` 
              : ''}`
          : `I've registered the category "${updatedCategory.name}" with a weight of ${weight}%. ${
            totalWeight < 100 
              ? `So far we have ${totalWeight}% of the total. Please tell me the name of another category, or type "finish" if there are no more categories.` 
              : ''}`);
      }
      
      return createAssistantMessage(language === 'es'
        ? 'Hubo un error al procesar la categoría. Intentemos de nuevo. ¿Cuál es el nombre de la categoría?'
        : 'There was an error processing the category. Let\'s try again. What is the category name?');
    }
    
    return createAssistantMessage(language === 'es'
      ? 'No entendí tu respuesta. Por favor, intenta de nuevo.'
      : 'I didn\'t understand your response. Please try again.');
  };

  /**
   * Procesa cuando se han completado las categorías
   */
  const processCategoriesComplete = (): Message => {
    const totalWeight = chatState.categories.reduce((sum, cat) => sum + cat.weight, 0);
    
    // Si el peso total es menor a 100%, ajustamos proporcionalmente
    if (totalWeight < 100) {
      const adjustedCategories = chatState.categories.map(cat => ({
        ...cat,
        weight: Math.round((cat.weight / totalWeight) * 100)
      }));
      
      setChatState({
        ...chatState,
        categories: adjustedCategories,
        currentCategory: adjustedCategories[0],
        currentStep: 'collecting_activities',
        waitingFor: 'activity_name'
      });
      
      return createAssistantMessage(language === 'es'
        ? `He ajustado los porcentajes para que sumen 100%. Ahora, vamos a registrar las actividades para la categoría "${adjustedCategories[0].name}". Por favor, dime el nombre de la primera actividad.`
        : `I've adjusted the percentages to add up to 100%. Now, let's register the activities for the "${adjustedCategories[0].name}" category. Please tell me the name of the first activity.`);
    }
    
    // Si el peso total es exactamente 100%, continuamos con actividades
    setChatState({
      ...chatState,
      currentCategory: chatState.categories[0],
      currentStep: 'collecting_activities',
      waitingFor: 'activity_name'
    });
    
    return createAssistantMessage(language === 'es'
      ? `Perfecto. Ahora, vamos a registrar las actividades para la categoría "${chatState.categories[0].name}". Por favor, dime el nombre de la primera actividad.`
      : `Perfect. Now, let's register the activities for the "${chatState.categories[0].name}" category. Please tell me the name of the first activity.`);
  };

  /**
   * Procesa cuando el peso total ha alcanzado 100%
   */
  const processTotalWeightComplete = (categories: Category[]): Message => {
    setChatState({
      ...chatState,
      categories: categories,
      currentCategory: categories[0],
      currentStep: 'collecting_activities',
      waitingFor: 'activity_name'
    });
    
    return createAssistantMessage(language === 'es'
      ? `Perfecto, ya tenemos el 100% distribuido entre tus categorías. Ahora, vamos a registrar las actividades para la categoría "${categories[0].name}". Por favor, dime el nombre de la primera actividad.`
      : `Perfect, we've now distributed 100% among your categories. Now, let's register the activities for the "${categories[0].name}" category. Please tell me the name of the first activity.`);
  };

  /**
   * Procesa la recolección de datos de actividades
   */
  const processActivityCollection = (lowercaseInput: string, originalInput: string): Message => {
    // Si no hay categoría actual, algo salió mal
    if (!chatState.currentCategory) {
      return createAssistantMessage(language === 'es'
        ? 'Hubo un error al procesar las actividades. Intentemos de nuevo desde el principio.'
        : 'There was an error processing the activities. Let\'s try again from the beginning.');
    }
    
    const currentCategory = chatState.currentCategory;
    
    // Procesando nombre de actividad
    if (chatState.waitingFor === 'activity_name') {
      // Si el usuario quiere terminar con esta categoría
      if (containsFinishKeyword(lowercaseInput) && currentCategory.activities.length > 0) {
        return processActivitiesForCategoryComplete();
      }
      
      const newActivity = {
        id: uuidv4(),
        name: originalInput.trim(),
        weight: 0,
        grade: ''
      };
      
      // Actualizar estado
      const updatedCategory = {
        ...currentCategory,
        activities: [...currentCategory.activities, newActivity]
      };
      
      setChatState({
        ...chatState,
        currentCategory: updatedCategory,
        waitingFor: 'activity_weight'
      });
      
      return createAssistantMessage(language === 'es'
        ? `He registrado la actividad "${newActivity.name}". ¿Qué porcentaje representa esta actividad dentro de la categoría "${currentCategory.name}"? (por ejemplo: 20 para 20%)`
        : `I've registered the activity "${newActivity.name}". What percentage does this activity represent within the "${currentCategory.name}" category? (e.g., 20 for 20%)`);
    }
    // Procesando peso de actividad
    else if (chatState.waitingFor === 'activity_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        return createAssistantMessage(language === 'es'
          ? 'No pude identificar el porcentaje. Por favor, ingresa solo el número (por ejemplo: 30).'
          : 'I couldn\'t identify the percentage. Please enter just the number (e.g., 30).');
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        return createAssistantMessage(language === 'es'
          ? 'El porcentaje debe estar entre 1 y 100. Por favor, intenta de nuevo.'
          : 'The percentage must be between 1 and 100. Please try again.');
      }
      
      // Actualizar la última actividad con su peso
      const activities = [...currentCategory.activities];
      activities[activities.length - 1] = {
        ...activities[activities.length - 1],
        weight
      };
      
      const updatedCategory = {
        ...currentCategory,
        activities
      };
      
      setChatState({
        ...chatState,
        currentCategory: updatedCategory,
        waitingFor: 'activity_grade'
      });
      
      return createAssistantMessage(language === 'es'
        ? `¿Cuál es la calificación que obtuviste en "${activities[activities.length - 1].name}"? (del 0 al 100)`
        : `What grade did you get for "${activities[activities.length - 1].name}"? (from 0 to 100)`);
    }
    // Procesando calificación de actividad
    else if (chatState.waitingFor === 'activity_grade') {
      const gradeMatch = lowercaseInput.match(/\d+(\.\d+)?/);
      
      if (!gradeMatch) {
        return createAssistantMessage(language === 'es'
          ? 'No pude identificar la calificación. Por favor, ingresa solo el número (por ejemplo: 85).'
          : 'I couldn\'t identify the grade. Please enter just the number (e.g., 85).');
      }
      
      const grade = parseFloat(gradeMatch[0]);
      
      if (grade < 0 || grade > 100) {
        return createAssistantMessage(language === 'es'
          ? 'La calificación debe estar entre 0 y 100. Por favor, intenta de nuevo.'
          : 'The grade must be between 0 and 100. Please try again.');
      }
      
      // Actualizar la última actividad con su calificación
      const activities = [...currentCategory.activities];
      activities[activities.length - 1] = {
        ...activities[activities.length - 1],
        grade
      };
      
      // Calcular peso total de actividades
      const totalWeight = activities.reduce((sum, act) => sum + act.weight, 0);
      
      const updatedCategory = {
        ...currentCategory,
        activities
      };
      
      setChatState({
        ...chatState,
        currentCategory: updatedCategory,
        waitingFor: 'activity_name'
      });
      
      // Si ya tenemos suficiente peso en actividades, preguntar si hay más
      if (totalWeight >= 100) {
        return createAssistantMessage(language === 'es'
          ? `He registrado tu calificación de ${grade} para "${activities[activities.length - 1].name}". Ya tenemos el 100% distribuido para esta categoría. ¿Quieres continuar con otra categoría o revisar tus resultados? (Escribe "continuar" o "revisar")`
          : `I've registered your grade of ${grade} for "${activities[activities.length - 1].name}". We now have 100% distributed for this category. Would you like to continue with another category or review your results? (Type "continue" or "review")`);
      }
      
      return createAssistantMessage(language === 'es'
        ? `He registrado tu calificación de ${grade} para "${activities[activities.length - 1].name}". Por favor, dime el nombre de otra actividad para la categoría "${currentCategory.name}", o escribe "terminar" si no hay más actividades.`
        : `I've registered your grade of ${grade} for "${activities[activities.length - 1].name}". Please tell me the name of another activity for the "${currentCategory.name}" category, or type "finish" if there are no more activities.`);
    }
    
    return createAssistantMessage(language === 'es'
      ? 'No entendí tu respuesta. Por favor, intenta de nuevo.'
      : 'I didn\'t understand your response. Please try again.');
  };

  /**
   * Procesa cuando se han completado las actividades para una categoría
   */
  const processActivitiesForCategoryComplete = (): Message => {
    if (!chatState.currentCategory) {
      return createAssistantMessage(language === 'es'
        ? 'Hubo un error al procesar las actividades. Vamos a intentar de nuevo.'
        : 'There was an error processing the activities. Let\'s try again.');
    }
    
    const currentCategoryIndex = chatState.categories.findIndex(
      c => c.id === chatState.currentCategory?.id
    );
    
    const activities = chatState.currentCategory.activities;
    const totalWeight = activities.reduce((sum, act) => sum + act.weight, 0);
    
    // Si el peso total es menor a 100%, ajustamos proporcionalmente
    let updatedActivities = activities;
    if (totalWeight < 100) {
      updatedActivities = activities.map(act => ({
        ...act,
        weight: Math.round((act.weight / totalWeight) * 100)
      }));
    }
    
    // Actualizar categoría con actividades ajustadas
    const updatedCategories = [...chatState.categories];
    updatedCategories[currentCategoryIndex] = {
      ...updatedCategories[currentCategoryIndex],
      activities: updatedActivities
    };
    
    // Si hay más categorías por procesar
    if (currentCategoryIndex < updatedCategories.length - 1) {
      const nextCategory = updatedCategories[currentCategoryIndex + 1];
      
      setChatState({
        ...chatState,
        categories: updatedCategories,
        currentCategory: nextCategory,
        waitingFor: 'activity_name'
      });
      
      return createAssistantMessage(language === 'es'
        ? `Perfecto. Ahora, vamos a registrar las actividades para la categoría "${nextCategory.name}". Por favor, dime el nombre de la primera actividad.`
        : `Perfect. Now, let's register the activities for the "${nextCategory.name}" category. Please tell me the name of the first activity.`);
    }
    
    // Si ya procesamos todas las categorías
    setChatState({
      ...chatState,
      categories: updatedCategories,
      currentCategory: undefined,
      currentStep: 'reviewing',
      waitingFor: 'confirmation'
    });
    
    // Calcular calificación final
    const { totalPoints } = calculateResults(updatedCategories);
    
    return createAssistantMessage(language === 'es'
      ? `He completado todos los registros. Con base en la información proporcionada, tu calificación final es: ${totalPoints.toFixed(2)}/10 o ${(totalPoints * 10).toFixed(2)}/100. ¿Te gustaría revisar el desglose por categorías? (Responde "sí" o "no")`
      : `I've completed all registrations. Based on the information provided, your final grade is: ${totalPoints.toFixed(2)}/10 or ${(totalPoints * 10).toFixed(2)}/100. Would you like to review the breakdown by category? (Answer "yes" or "no")`);
  };

  /**
   * Procesa el paso de revisión
   */
  const processReviewStep = (lowercaseInput: string): Message => {
    if (containsAffirmation(lowercaseInput)) {
      // Calcular resultados detallados
      const { results, totalPoints } = calculateResults(chatState.categories);
      
      let detailMessage = language === 'es' 
        ? 'Aquí está el desglose por categoría:\n\n' 
        : 'Here\'s the breakdown by category:\n\n';
      
      results.forEach(result => {
        detailMessage += language === 'es'
          ? `- ${result.categoryName} (${result.categoryWeight}%): Promedio ${result.average.toFixed(2)}, Aporta ${result.points.toFixed(2)} puntos\n`
          : `- ${result.categoryName} (${result.categoryWeight}%): Average ${result.average.toFixed(2)}, Contributes ${result.points.toFixed(2)} points\n`;
      });
      
      detailMessage += language === 'es'
        ? `\nCalificación final: ${totalPoints.toFixed(2)}/10 o ${(totalPoints * 10).toFixed(2)}/100`
        : `\nFinal grade: ${totalPoints.toFixed(2)}/10 or ${(totalPoints * 10).toFixed(2)}/100`;
      
      setChatState({
        ...chatState,
        currentStep: 'completed'
      });
      
      return createAssistantMessage(detailMessage);
    } else if (containsNegation(lowercaseInput)) {
      setChatState({
        ...chatState,
        currentStep: 'completed'
      });
      
      return createAssistantMessage(language === 'es'
        ? '¡Perfecto! Espero haberte ayudado a calcular tu calificación. Si necesitas hacer otro cálculo, solo dímelo.'
        : 'Perfect! I hope I helped you calculate your grade. If you need to make another calculation, just let me know.');
    }
    
    return createAssistantMessage(language === 'es'
      ? '¿Quieres ver el desglose detallado de tus calificaciones? Por favor responde "sí" o "no".'
      : 'Do you want to see the detailed breakdown of your grades? Please answer "yes" or "no".');
  };

  /**
   * Helper para crear mensajes del asistente
   */
  const createAssistantMessage = (content: string): Message => {
    return {
      id: uuidv4(),
      role: 'assistant',
      content,
      timestamp: new Date()
    };
  };

  /**
   * Reinicia el chat
   */
  const resetChat = () => {
    setChatState({
      categories: [],
      currentStep: 'idle',
    });
    
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: language === 'es' 
        ? '👋 ¡Hola! Soy el asistente de HABY para cálculo de calificaciones. ¿Te gustaría calcular tu nota final? Puedo ayudarte paso a paso.' 
        : '👋 Hi there! I\'m the HABY grade calculation assistant. Would you like to calculate your final grade? I can help you step by step.',
      timestamp: new Date()
    }]);
    
    toast.success(language === 'es' ? "Chat reiniciado" : "Chat reset");
  };

  /**
   * Helpers para detectar afirmaciones/negaciones
   */
  const containsAffirmation = (text: string): boolean => {
    const affirmations = language === 'es'
      ? ['sí', 'si', 'claro', 'ok', 'okay', 'vale', 'bueno', 'por supuesto', 'adelante', 'continuar', 'seguir', 'quiero', 'me gustaría', 'deseo']
      : ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'alright', 'of course', 'proceed', 'continue', 'i want', 'i would like'];
    
    return affirmations.some(word => text.includes(word));
  };

  const containsNegation = (text: string): boolean => {
    const negations = language === 'es'
      ? ['no', 'nope', 'negativo', 'paso', 'mejor no', 'ahora no']
      : ['no', 'nope', 'negative', 'pass', 'better not', 'not now'];
    
    return negations.some(word => text.includes(word));
  };

  const containsFinishKeyword = (text: string): boolean => {
    const finishWords = language === 'es'
      ? ['terminar', 'finalizar', 'acabar', 'listo', 'completo', 'terminado', 'fin', 'ya no hay más']
      : ['finish', 'end', 'done', 'complete', 'completed', 'that\'s all', 'no more'];
    
    return finishWords.some(word => text.includes(word));
  };

  /**
   * Renderizado del componente de chat
   */
  return (
    <Card className="rounded-lg overflow-hidden border border-education-primary/20 shadow-lg">
      {/* Cabecera del chat */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-education-primary to-education-secondary p-4 text-white">
        <CalculatorIcon className="h-6 w-6" />
        <h2 className="text-lg font-semibold">{language === 'es' ? 'Asistente de Calificaciones' : 'Grade Assistant'}</h2>
      </div>

      {/* Mensajes del chat */}
      <div className="h-[500px] overflow-y-auto p-4 bg-white dark:bg-gray-900/50">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex items-start gap-3 mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Icono/Avatar */}
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-education-primary flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
            )}
            
            {/* Contenido del mensaje */}
            <div 
              className={`rounded-lg p-3 max-w-[80%] relative ${
                message.role === 'user' 
                  ? 'bg-education-primary/10 dark:bg-education-primary/20 border border-education-primary/20'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              
              {/* Timestamp */}
              <span className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {/* Icono/Avatar para usuario */}
            {message.role === 'user' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Información de uso */}
      <div className="bg-education-light/20 dark:bg-education-dark/20 px-4 py-2 flex items-center gap-2">
        <Info size={16} className="text-education-primary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es' 
            ? 'Este asistente te ayuda a calcular tu nota final a través de preguntas sencillas.'
            : 'This assistant helps you calculate your final grade through simple questions.'}
        </p>
      </div>
      
      {/* Controles del chat */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetChat} 
          className="flex-shrink-0"
          title={language === 'es' ? 'Reiniciar conversación' : 'Reset conversation'}
        >
          <RefreshCw size={16} />
        </Button>
        
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              processUserInput();
            }
          }}
          placeholder={language === 'es' ? 'Escribe tu respuesta...' : 'Type your response...'}
          className="flex-grow"
          disabled={isProcessing}
        />
        
        <Button 
          onClick={processUserInput} 
          disabled={!input.trim() || isProcessing}
          className="flex-shrink-0 bg-education-primary hover:bg-education-dark text-white"
        >
          {isProcessing ? <Sparkles size={16} className="mr-1 animate-pulse" /> : <Send size={16} />}
        </Button>
      </div>
    </Card>
  );
};

export default ChatGrade;
