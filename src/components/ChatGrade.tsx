
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
  RefreshCw,
  Brain,
  PlusCircle,
  MinusCircle,
  Eraser,
  HelpCircle,
  Download,
  Share
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
  isTyping?: boolean;
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
 * Ejemplos de preguntas guiadas
 */
const suggestionExamples = {
  es: [
    "¿Cómo calculo mi nota final?",
    "Tengo tres exámenes con notas 85, 90 y 78",
    "Necesito saber mi promedio",
    "¿Cuánto necesito sacar en mi examen final?"
  ],
  en: [
    "How do I calculate my final grade?",
    "I have three exams with grades 85, 90 and 78",
    "I need to know my average",
    "How much do I need on my final exam?"
  ]
};

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
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
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
   * Simula el efecto de escribiendo para la IA
   */
  const simulateTyping = (text: string) => {
    setIsTyping(true);
    
    // Añadir mensaje temporal de "escribiendo..."
    const typingMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: '...',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);
    
    // Calcular tiempo de escritura basado en la longitud del texto
    const typingTime = Math.min(Math.max(text.length * 10, 500), 2000);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
      // Reemplazar mensaje de "escribiendo..." con el mensaje completo
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat({
        id: uuidv4(),
        role: 'assistant',
        content: text,
        timestamp: new Date()
      }));
      setIsTyping(false);
    }, typingTime);
    
    setTypingTimeout(timeout);
  };

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
    let responseText: string;
    
    // Si es la primera interacción o está en estado idle
    if (chatState.currentStep === 'idle') {
      // Verificar si el usuario quiere comenzar
      if (containsAffirmation(lowercaseInput)) {
        responseText = language === 'es'
          ? '¡Genial! Vamos a calcular tu calificación. Para empezar, necesito saber las categorías de evaluación (por ejemplo: tareas, exámenes, proyectos, etc). Por favor, dime el nombre de la primera categoría.'
          : 'Great! Let\'s calculate your grade. To start, I need to know your evaluation categories (e.g., assignments, exams, projects, etc). Please tell me the name of the first category.';
        
        setChatState({
          ...chatState,
          currentStep: 'collecting_categories',
          waitingFor: 'category_name',
        });
      } else if (containsNegation(lowercaseInput)) {
        responseText = language === 'es'
          ? 'Está bien. Si cambias de opinión y quieres calcular tu calificación, házmelo saber. También puedes usar la calculadora tradicional desde la página principal.'
          : 'That\'s okay. If you change your mind and want to calculate your grade, let me know. You can also use the traditional calculator from the main page.';
      } else {
        responseText = language === 'es'
          ? '¿Te gustaría que te ayude a calcular tu calificación final? Puedo guiarte paso a paso preguntándote sobre tus categorías y actividades.'
          : 'Would you like me to help you calculate your final grade? I can guide you step by step by asking about your categories and activities.';
      }
      
      simulateTyping(responseText);
      return;
    }
    
    // Procesando categorías
    else if (chatState.currentStep === 'collecting_categories') {
      processCategoryCollection(lowercaseInput, userInput);
      return;
    }
    
    // Procesando actividades
    else if (chatState.currentStep === 'collecting_activities') {
      processActivityCollection(lowercaseInput, userInput);
      return;
    }
    
    // Revisando resultados
    else if (chatState.currentStep === 'reviewing') {
      processReviewStep(lowercaseInput);
      return;
    }
    
    // Paso final
    else {
      responseText = language === 'es'
        ? 'Si necesitas calcular otra calificación, solo dímelo y podemos comenzar de nuevo.'
        : 'If you need to calculate another grade, just let me know and we can start again.';
      
      simulateTyping(responseText);
      return;
    }
  };

  /**
   * Procesa la recolección de datos de categorías
   */
  const processCategoryCollection = (lowercaseInput: string, originalInput: string) => {
    let responseText: string;
    
    if (chatState.waitingFor === 'category_name') {
      // Si el usuario menciona terminar o finalizar
      if (containsFinishKeyword(lowercaseInput) && chatState.categories.length > 0) {
        processCategoriesComplete();
        return;
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
      
      responseText = language === 'es'
        ? `He registrado la categoría "${newCategory.name}". ¿Qué porcentaje del total representa esta categoría? (por ejemplo: 30 para 30%)`
        : `I've registered the category "${newCategory.name}". What percentage of the total does this category represent? (e.g., 30 for 30%)`;
    } 
    else if (chatState.waitingFor === 'category_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        responseText = language === 'es'
          ? 'No pude identificar el porcentaje. Por favor, ingresa solo el número (por ejemplo: 30).'
          : 'I couldn\'t identify the percentage. Please enter just the number (e.g., 30).';
        
        simulateTyping(responseText);
        return;
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        responseText = language === 'es'
          ? 'El porcentaje debe estar entre 1 y 100. Por favor, intenta de nuevo.'
          : 'The percentage must be between 1 and 100. Please try again.';
        
        simulateTyping(responseText);
        return;
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
          processTotalWeightComplete(updatedCategories);
          return;
        }
        
        responseText = language === 'es'
          ? `He registrado la categoría "${updatedCategory.name}" con un peso de ${weight}%. ${
            totalWeight < 100 
              ? `Hasta ahora llevamos ${totalWeight}% del total. Por favor, dime el nombre de otra categoría, o escribe "terminar" si no hay más categorías.` 
              : ''}`
          : `I've registered the category "${updatedCategory.name}" with a weight of ${weight}%. ${
            totalWeight < 100 
              ? `So far we have ${totalWeight}% of the total. Please tell me the name of another category, or type "finish" if there are no more categories.` 
              : ''}`;
      } else {
        responseText = language === 'es'
          ? 'Hubo un error al procesar la categoría. Intentemos de nuevo. ¿Cuál es el nombre de la categoría?'
          : 'There was an error processing the category. Let\'s try again. What is the category name?';
      }
    } else {
      responseText = language === 'es'
        ? 'No entendí tu respuesta. Por favor, intenta de nuevo.'
        : 'I didn\'t understand your response. Please try again.';
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando se han completado las categorías
   */
  const processCategoriesComplete = () => {
    const totalWeight = chatState.categories.reduce((sum, cat) => sum + cat.weight, 0);
    let responseText: string;
    
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
      
      responseText = language === 'es'
        ? `He ajustado los porcentajes para que sumen 100%. Ahora, vamos a registrar las actividades para la categoría "${adjustedCategories[0].name}". Por favor, dime el nombre de la primera actividad.`
        : `I've adjusted the percentages to add up to 100%. Now, let's register the activities for the "${adjustedCategories[0].name}" category. Please tell me the name of the first activity.`;
    } else {
      // Si el peso total es exactamente 100%, continuamos con actividades
      setChatState({
        ...chatState,
        currentCategory: chatState.categories[0],
        currentStep: 'collecting_activities',
        waitingFor: 'activity_name'
      });
      
      responseText = language === 'es'
        ? `Perfecto. Ahora, vamos a registrar las actividades para la categoría "${chatState.categories[0].name}". Por favor, dime el nombre de la primera actividad.`
        : `Perfect. Now, let's register the activities for the "${chatState.categories[0].name}" category. Please tell me the name of the first activity.`;
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando el peso total ha alcanzado 100%
   */
  const processTotalWeightComplete = (categories: Category[]) => {
    setChatState({
      ...chatState,
      categories: categories,
      currentCategory: categories[0],
      currentStep: 'collecting_activities',
      waitingFor: 'activity_name'
    });
    
    const responseText = language === 'es'
      ? `Perfecto, ya tenemos el 100% distribuido entre tus categorías. Ahora, vamos a registrar las actividades para la categoría "${categories[0].name}". Por favor, dime el nombre de la primera actividad.`
      : `Perfect, we've now distributed 100% among your categories. Now, let's register the activities for the "${categories[0].name}" category. Please tell me the name of the first activity.`;
    
    simulateTyping(responseText);
  };

  /**
   * Procesa la recolección de datos de actividades
   */
  const processActivityCollection = (lowercaseInput: string, originalInput: string) => {
    // Si no hay categoría actual, algo salió mal
    if (!chatState.currentCategory) {
      const responseText = language === 'es'
        ? 'Hubo un error al procesar las actividades. Intentemos de nuevo desde el principio.'
        : 'There was an error processing the activities. Let\'s try again from the beginning.';
      
      simulateTyping(responseText);
      return;
    }
    
    const currentCategory = chatState.currentCategory;
    let responseText: string;
    
    // Procesando nombre de actividad
    if (chatState.waitingFor === 'activity_name') {
      // Si el usuario quiere terminar con esta categoría
      if (containsFinishKeyword(lowercaseInput) && currentCategory.activities.length > 0) {
        processActivitiesForCategoryComplete();
        return;
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
      
      responseText = language === 'es'
        ? `He registrado la actividad "${newActivity.name}". ¿Qué porcentaje representa esta actividad dentro de la categoría "${currentCategory.name}"? (por ejemplo: 20 para 20%)`
        : `I've registered the activity "${newActivity.name}". What percentage does this activity represent within the "${currentCategory.name}" category? (e.g., 20 for 20%)`;
    }
    // Procesando peso de actividad
    else if (chatState.waitingFor === 'activity_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        responseText = language === 'es'
          ? 'No pude identificar el porcentaje. Por favor, ingresa solo el número (por ejemplo: 30).'
          : 'I couldn\'t identify the percentage. Please enter just the number (e.g., 30).';
        
        simulateTyping(responseText);
        return;
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        responseText = language === 'es'
          ? 'El porcentaje debe estar entre 1 y 100. Por favor, intenta de nuevo.'
          : 'The percentage must be between 1 and 100. Please try again.';
        
        simulateTyping(responseText);
        return;
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
      
      responseText = language === 'es'
        ? `¿Cuál es la calificación que obtuviste en "${activities[activities.length - 1].name}"? (del 0 al 100)`
        : `What grade did you get for "${activities[activities.length - 1].name}"? (from 0 to 100)`;
    }
    // Procesando calificación de actividad
    else if (chatState.waitingFor === 'activity_grade') {
      const gradeMatch = lowercaseInput.match(/\d+(\.\d+)?/);
      
      if (!gradeMatch) {
        responseText = language === 'es'
          ? 'No pude identificar la calificación. Por favor, ingresa solo el número (por ejemplo: 85).'
          : 'I couldn\'t identify the grade. Please enter just the number (e.g., 85).';
        
        simulateTyping(responseText);
        return;
      }
      
      const grade = parseFloat(gradeMatch[0]);
      
      if (grade < 0 || grade > 100) {
        responseText = language === 'es'
          ? 'La calificación debe estar entre 0 y 100. Por favor, intenta de nuevo.'
          : 'The grade must be between 0 and 100. Please try again.';
        
        simulateTyping(responseText);
        return;
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
        responseText = language === 'es'
          ? `He registrado tu calificación de ${grade} para "${activities[activities.length - 1].name}". Ya tenemos el 100% distribuido para esta categoría. ¿Quieres continuar con otra categoría o revisar tus resultados? (Escribe "continuar" o "revisar")`
          : `I've registered your grade of ${grade} for "${activities[activities.length - 1].name}". We now have 100% distributed for this category. Would you like to continue with another category or review your results? (Type "continue" or "review")`;
      } else {
        responseText = language === 'es'
          ? `He registrado tu calificación de ${grade} para "${activities[activities.length - 1].name}". Por favor, dime el nombre de otra actividad para la categoría "${currentCategory.name}", o escribe "terminar" si no hay más actividades.`
          : `I've registered your grade of ${grade} for "${activities[activities.length - 1].name}". Please tell me the name of another activity for the "${currentCategory.name}" category, or type "finish" if there are no more activities.`;
      }
    } else {
      responseText = language === 'es'
        ? 'No entendí tu respuesta. Por favor, intenta de nuevo.'
        : 'I didn\'t understand your response. Please try again.';
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando se han completado las actividades para una categoría
   */
  const processActivitiesForCategoryComplete = () => {
    if (!chatState.currentCategory) {
      const responseText = language === 'es'
        ? 'Hubo un error al procesar las actividades. Vamos a intentar de nuevo.'
        : 'There was an error processing the activities. Let\'s try again.';
      
      simulateTyping(responseText);
      return;
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
    
    let responseText: string;
    
    // Si hay más categorías por procesar
    if (currentCategoryIndex < updatedCategories.length - 1) {
      const nextCategory = updatedCategories[currentCategoryIndex + 1];
      
      setChatState({
        ...chatState,
        categories: updatedCategories,
        currentCategory: nextCategory,
        waitingFor: 'activity_name'
      });
      
      responseText = language === 'es'
        ? `Perfecto. Ahora, vamos a registrar las actividades para la categoría "${nextCategory.name}". Por favor, dime el nombre de la primera actividad.`
        : `Perfect. Now, let's register the activities for the "${nextCategory.name}" category. Please tell me the name of the first activity.`;
    } else {
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
      
      responseText = language === 'es'
        ? `He completado todos los registros. Con base en la información proporcionada, tu calificación final es: ${totalPoints.toFixed(2)}/10 o ${(totalPoints * 10).toFixed(2)}/100. ¿Te gustaría revisar el desglose por categorías? (Responde "sí" o "no")`
        : `I've completed all registrations. Based on the information provided, your final grade is: ${totalPoints.toFixed(2)}/10 or ${(totalPoints * 10).toFixed(2)}/100. Would you like to review the breakdown by category? (Answer "yes" or "no")`;
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa el paso de revisión
   */
  const processReviewStep = (lowercaseInput: string) => {
    let responseText: string;
    
    if (containsAffirmation(lowercaseInput)) {
      // Calcular resultados detallados
      const { results, totalPoints } = calculateResults(chatState.categories);
      
      let detailMessage = language === 'es' 
        ? 'Aquí está el desglose por categoría:\n\n' 
        : 'Here\'s the breakdown by category:\n\n';
      
      results.forEach(result => {
        detailMessage += language === 'es'
          ? `📊 **${result.categoryName}** (${result.categoryWeight}%):\n   - Promedio: ${result.average.toFixed(2)}\n   - Aporta: ${result.points.toFixed(2)} puntos\n\n`
          : `📊 **${result.categoryName}** (${result.categoryWeight}%):\n   - Average: ${result.average.toFixed(2)}\n   - Contributes: ${result.points.toFixed(2)} points\n\n`;
      });
      
      detailMessage += language === 'es'
        ? `\n🌟 **Calificación final**: ${totalPoints.toFixed(2)}/10 o ${(totalPoints * 10).toFixed(2)}/100`
        : `\n🌟 **Final grade**: ${totalPoints.toFixed(2)}/10 or ${(totalPoints * 10).toFixed(2)}/100`;
      
      setChatState({
        ...chatState,
        currentStep: 'completed'
      });
      
      responseText = detailMessage;
    } else if (containsNegation(lowercaseInput)) {
      setChatState({
        ...chatState,
        currentStep: 'completed'
      });
      
      responseText = language === 'es'
        ? '¡Perfecto! Espero haberte ayudado a calcular tu calificación. Si necesitas hacer otro cálculo, solo dímelo.'
        : 'Perfect! I hope I helped you calculate your grade. If you need to make another calculation, just let me know.';
    } else {
      responseText = language === 'es'
        ? '¿Quieres ver el desglose detallado de tus calificaciones? Por favor responde "sí" o "no".'
        : 'Do you want to see the detailed breakdown of your grades? Please answer "yes" or "no".';
    }
    
    simulateTyping(responseText);
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
   * Utiliza un ejemplo de sugerencia como entrada
   */
  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  /**
   * Helpers para detectar afirmaciones/negaciones
   */
  const containsAffirmation = (text: string): boolean => {
    const affirmations = language === 'es'
      ? ['sí', 'si', 'claro', 'ok', 'okay', 'vale', 'bueno', 'por supuesto', 'adelante', 'continuar', 'seguir', 'quiero', 'me gustaría', 'deseo', 'revisar']
      : ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'alright', 'of course', 'proceed', 'continue', 'i want', 'i would like', 'review'];
    
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
    <Card className="rounded-xl overflow-hidden border border-education-primary/20 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Cabecera del chat */}
      <div className="flex items-center justify-between bg-gradient-to-r from-education-primary to-education-secondary p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{language === 'es' ? 'Asistente de Calificaciones' : 'Grade Assistant'}</h2>
            <p className="text-xs text-white/80">{language === 'es' ? 'Powered by HABY AI' : 'Powered by HABY AI'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-white border-none"
            title={language === 'es' ? "Descargar conversación" : "Download conversation"}
          >
            <Download size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-white border-none"
            title={language === 'es' ? "Compartir" : "Share"}
          >
            <Share size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetChat} 
            className="bg-white/10 hover:bg-white/20 text-white border-none"
            title={language === 'es' ? "Reiniciar conversación" : "Reset conversation"}
          >
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      {/* Mensajes del chat */}
      <div className="h-[500px] overflow-y-auto p-4 bg-white dark:bg-gray-900/50">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex items-start gap-3 mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} ${
              message.isTyping ? 'animate-pulse' : 'animate-fade-in'
            }`}
          >
            {/* Icono/Avatar */}
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-education-primary to-education-secondary flex items-center justify-center text-white shadow-md">
                <Bot size={18} />
              </div>
            )}
            
            {/* Contenido del mensaje */}
            <div 
              className={`rounded-lg p-3 max-w-[80%] relative ${
                message.role === 'user' 
                  ? 'bg-education-primary/10 dark:bg-education-primary/20 border border-education-primary/20'
                  : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              } ${message.isTyping ? 'animate-pulse' : ''}`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              
              {/* Timestamp */}
              <span className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {/* Icono/Avatar para usuario */}
            {message.role === 'user' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Sugerencias de preguntas */}
      <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 flex flex-wrap items-center gap-2 border-t border-gray-100 dark:border-gray-800">
        {suggestionExamples[language === 'es' ? 'es' : 'en'].map((suggestion, index) => (
          <Button 
            key={index}
            variant="outline"
            size="sm" 
            onClick={() => useSuggestion(suggestion)}
            className="bg-white dark:bg-gray-800 text-sm border-gray-200 dark:border-gray-700 hover:border-education-primary hover:bg-education-primary/5 transition-all duration-200"
          >
            {suggestion}
          </Button>
        ))}
      </div>
      
      {/* Información de uso */}
      <div className="bg-education-light/20 dark:bg-education-dark/20 px-4 py-2 flex items-center gap-2 border-t border-gray-100 dark:border-gray-700">
        <Info size={16} className="text-education-primary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es' 
            ? 'Este asistente funciona sin conexión y te ayuda a calcular tu nota.'
            : 'This assistant works offline and helps you calculate your grade.'}
        </p>
      </div>
      
      {/* Controles del chat */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          className="flex-shrink-0 text-gray-500 hover:text-education-primary"
          title={language === 'es' ? 'Ayuda' : 'Help'}
        >
          <HelpCircle size={18} />
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
          disabled={isProcessing || isTyping}
        />
        
        <Button 
          onClick={processUserInput} 
          disabled={!input.trim() || isProcessing || isTyping}
          className="flex-shrink-0 bg-education-primary hover:bg-education-dark text-white"
        >
          {isProcessing || isTyping ? 
            <Sparkles size={16} className="mr-1 animate-pulse" /> : 
            <Send size={16} />
          }
        </Button>
      </div>
      
      {/* Indicador offline */}
      <div className="bg-green-100 dark:bg-green-900/30 border-t border-green-200 dark:border-green-800/50 py-1 px-4">
        <p className="text-xs text-green-800 dark:text-green-400 flex items-center gap-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          {language === 'es' ? 'Funcionando sin conexión' : 'Working offline'}
        </p>
      </div>
    </Card>
  );
};

export default ChatGrade;
