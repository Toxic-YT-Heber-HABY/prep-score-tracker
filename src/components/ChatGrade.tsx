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
    "Hola, quiero calcular mis calificaciones",
    "Tengo tres exámenes con notas 85, 90 y 78",
    "Necesito saber mi promedio final",
    "¿Cuánto necesito sacar en mi examen final?"
  ],
  en: [
    "Hi, I want to calculate my grades",
    "I have three exams with grades 85, 90 and 78",
    "I need to know my final average",
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

  // Inicializa el chat con un mensaje de bienvenida más amigable
  useEffect(() => {
    const initialMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: language === 'es' 
        ? '¡Hola! 👋 Soy tu asistente personal para calcular calificaciones. Para empezar, simplemente dime "Hola, quiero calcular mis calificaciones" y te guiaré paso a paso. ¿Empezamos?' 
        : 'Hi there! 👋 I\'m your personal grade calculation assistant. To get started, just tell me "Hi, I want to calculate my grades" and I\'ll guide you step by step. Shall we begin?',
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
    
    const typingMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: '...',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);
    
    const typingTime = Math.min(Math.max(text.length * 15, 800), 2500);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
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
   * Procesa la entrada del usuario y genera respuestas más naturales
   */
  const processUserInput = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    setTimeout(() => {
      generateResponse(userMessage.content);
      setIsProcessing(false);
    }, 300);
  };

  /**
   * Genera respuesta más conversacional basada en entrada del usuario
   */
  const generateResponse = (userInput: string) => {
    const lowercaseInput = userInput.toLowerCase();
    let responseText: string;
    
    // Detectar si el usuario quiere calcular calificaciones
    if (chatState.currentStep === 'idle') {
      if (lowercaseInput.includes('calcular') || lowercaseInput.includes('calificacion') || 
          lowercaseInput.includes('nota') || lowercaseInput.includes('promedio') ||
          lowercaseInput.includes('grade') || lowercaseInput.includes('calculate')) {
        
        responseText = language === 'es'
          ? '¡Perfecto! 🎯 Te ayudo a calcular tus calificaciones. Primero necesito conocer las categorías de evaluación de tu materia.\n\nPor ejemplo: Exámenes, Tareas, Proyectos, Participación, etc.\n\n📝 Dime el nombre de la primera categoría:'
          : 'Perfect! 🎯 I\'ll help you calculate your grades. First I need to know the evaluation categories for your subject.\n\nFor example: Exams, Assignments, Projects, Participation, etc.\n\n📝 Tell me the name of the first category:';
        
        setChatState({
          ...chatState,
          currentStep: 'collecting_categories',
          waitingFor: 'category_name',
        });
      } else {
        responseText = language === 'es'
          ? '¡Hola! 😊 Para calcular tus calificaciones, simplemente dime "Quiero calcular mis calificaciones" y comenzamos. ¿Te parece bien?'
          : 'Hello! 😊 To calculate your grades, just tell me "I want to calculate my grades" and we\'ll start. Sound good?';
      }
      
      simulateTyping(responseText);
      return;
    }
    
    // Procesando categorías con mejor UX
    else if (chatState.currentStep === 'collecting_categories') {
      processCategoryCollection(lowercaseInput, userInput);
      return;
    }
    
    // Procesando actividades con mejor UX
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
        ? '✨ ¡Excelente! Si necesitas calcular otra calificación, solo dime "Quiero calcular mis calificaciones" y empezamos de nuevo.'
        : '✨ Excellent! If you need to calculate another grade, just tell me "I want to calculate my grades" and we\'ll start again.';
      
      simulateTyping(responseText);
      return;
    }
  };

  /**
   * Procesa la recolección de categorías con mejor experiencia
   */
  const processCategoryCollection = (lowercaseInput: string, originalInput: string) => {
    let responseText: string;
    
    if (chatState.waitingFor === 'category_name') {
      if (containsFinishKeyword(lowercaseInput) && chatState.categories.length > 0) {
        processCategoriesComplete();
        return;
      }
      
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
        ? `✅ Perfecto, registré la categoría "${newCategory.name}".\n\n💯 Ahora dime, ¿qué porcentaje del total vale esta categoría?\n\n(Ejemplo: si vale 30%, solo escribe "30")`
        : `✅ Perfect, I registered the category "${newCategory.name}".\n\n💯 Now tell me, what percentage of the total is this category worth?\n\n(Example: if it's worth 30%, just write "30")`;
    } 
    else if (chatState.waitingFor === 'category_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        responseText = language === 'es'
          ? '🤔 No pude identificar el porcentaje. Por favor, solo escribe el número (ejemplo: 30 para 30%)'
          : '🤔 I couldn\'t identify the percentage. Please just write the number (example: 30 for 30%)';
        
        simulateTyping(responseText);
        return;
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        responseText = language === 'es'
          ? '⚠️ El porcentaje debe estar entre 1 y 100. Intenta de nuevo.'
          : '⚠️ The percentage must be between 1 and 100. Try again.';
        
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
        
        if (totalWeight >= 100) {
          processTotalWeightComplete(updatedCategories);
          return;
        }
        
        responseText = language === 'es'
          ? `✅ Listo! "${updatedCategory.name}" = ${weight}%\n\n📊 Total hasta ahora: ${totalWeight}%\n\n¿Hay otra categoría? Dime su nombre, o escribe "listo" si no hay más.`
          : `✅ Done! "${updatedCategory.name}" = ${weight}%\n\n📊 Total so far: ${totalWeight}%\n\nIs there another category? Tell me its name, or write "done" if there are no more.`;
      }
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando se completan las categorías
   */
  const processCategoriesComplete = () => {
    const totalWeight = chatState.categories.reduce((sum, cat) => sum + cat.weight, 0);
    let responseText: string;
    
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
        ? `🔧 Ajusté los porcentajes para que sumen 100%.\n\n📚 Ahora registremos las actividades de "${adjustedCategories[0].name}".\n\n¿Cuál es el nombre de la primera actividad? (Ejemplo: Examen 1, Tarea de casa, etc.)`
        : `🔧 I adjusted the percentages to add up to 100%.\n\n📚 Now let's register the activities for "${adjustedCategories[0].name}".\n\nWhat's the name of the first activity? (Example: Exam 1, Homework, etc.)`;
    } else {
      setChatState({
        ...chatState,
        currentCategory: chatState.categories[0],
        currentStep: 'collecting_activities',
        waitingFor: 'activity_name'
      });
      
      responseText = language === 'es'
        ? `🎉 ¡Perfecto! Las categorías suman exactamente 100%.\n\n📚 Ahora registremos las actividades de "${chatState.categories[0].name}".\n\n¿Cuál es el nombre de la primera actividad?`
        : `🎉 Perfect! The categories add up to exactly 100%.\n\n📚 Now let's register the activities for "${chatState.categories[0].name}".\n\nWhat's the name of the first activity?`;
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando el peso total alcanza 100%
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
      ? `🎯 ¡Excelente! Ya tenemos el 100% distribuido.\n\n📚 Ahora registremos las actividades de "${categories[0].name}".\n\n¿Cuál es el nombre de la primera actividad?`
      : `🎯 Excellent! We now have 100% distributed.\n\n📚 Now let's register the activities for "${categories[0].name}".\n\nWhat's the name of the first activity?`;
    
    simulateTyping(responseText);
  };

  /**
   * Procesa la recolección de actividades con mejor UX
   */
  const processActivityCollection = (lowercaseInput: string, originalInput: string) => {
    if (!chatState.currentCategory) {
      const responseText = language === 'es'
        ? '❌ Hubo un error. Empecemos de nuevo.'
        : '❌ There was an error. Let\'s start over.';
      
      simulateTyping(responseText);
      return;
    }
    
    const currentCategory = chatState.currentCategory;
    let responseText: string;
    
    if (chatState.waitingFor === 'activity_name') {
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
        ? `✅ Registré "${newActivity.name}".\n\n⚖️ ¿Qué valor tiene esta actividad dentro de "${currentCategory.name}"?\n\n(Ejemplo: si vale 25% de la categoría, escribe "25")`
        : `✅ I registered "${newActivity.name}".\n\n⚖️ What value does this activity have within "${currentCategory.name}"?\n\n(Example: if it's worth 25% of the category, write "25")`;
    }
    else if (chatState.waitingFor === 'activity_weight') {
      const weightMatch = lowercaseInput.match(/\d+/);
      
      if (!weightMatch) {
        responseText = language === 'es'
          ? '🤔 No identifiqué el valor. Solo escribe el número (ejemplo: 25)'
          : '🤔 I didn\'t identify the value. Just write the number (example: 25)';
        
        simulateTyping(responseText);
        return;
      }
      
      const weight = parseInt(weightMatch[0]);
      
      if (weight <= 0 || weight > 100) {
        responseText = language === 'es'
          ? '⚠️ El valor debe estar entre 1 y 100. Intenta de nuevo.'
          : '⚠️ The value must be between 1 and 100. Try again.';
        
        simulateTyping(responseText);
        return;
      }
      
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
        ? `📊 Valor registrado: ${weight}%\n\n🎯 ¿Qué calificación obtuviste en "${activities[activities.length - 1].name}"?\n\n(Escribe tu nota del 0 al 100)`
        : `📊 Value registered: ${weight}%\n\n🎯 What grade did you get in "${activities[activities.length - 1].name}"?\n\n(Write your grade from 0 to 100)`;
    }
    else if (chatState.waitingFor === 'activity_grade') {
      const gradeMatch = lowercaseInput.match(/\d+(\.\d+)?/);
      
      if (!gradeMatch) {
        responseText = language === 'es'
          ? '🤔 No identifiqué la calificación. Solo escribe el número (ejemplo: 85)'
          : '🤔 I didn\'t identify the grade. Just write the number (example: 85)';
        
        simulateTyping(responseText);
        return;
      }
      
      const grade = parseFloat(gradeMatch[0]);
      
      if (grade < 0 || grade > 100) {
        responseText = language === 'es'
          ? '⚠️ La calificación debe estar entre 0 y 100. Intenta de nuevo.'
          : '⚠️ The grade must be between 0 and 100. Try again.';
        
        simulateTyping(responseText);
        return;
      }
      
      const activities = [...currentCategory.activities];
      activities[activities.length - 1] = {
        ...activities[activities.length - 1],
        grade
      };
      
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
      
      if (totalWeight >= 100) {
        responseText = language === 'es'
          ? `✅ Calificación registrada: ${grade}\n\n🎉 Ya tenemos el 100% de "${currentCategory.name}".\n\n¿Quieres continuar con otra categoría o revisar resultados? (Escribe "continuar" o "revisar")`
          : `✅ Grade registered: ${grade}\n\n🎉 We now have 100% of "${currentCategory.name}".\n\nWant to continue with another category or review results? (Write "continue" or "review")`;
      } else {
        responseText = language === 'es'
          ? `✅ Calificación registrada: ${grade}\n\n📝 ¿Hay otra actividad en "${currentCategory.name}"? Dime su nombre, o escribe "listo" si terminamos con esta categoría.`
          : `✅ Grade registered: ${grade}\n\n📝 Is there another activity in "${currentCategory.name}"? Tell me its name, or write "done" if we're finished with this category.`;
      }
    }
    
    simulateTyping(responseText);
  };

  /**
   * Procesa cuando se han completado las actividades para una categoría
   */
  const processActivitiesForCategoryComplete = () => {
    if (!chatState.currentCategory) {
      const responseText = language === 'es'
        ? '❌ Hubo un error. Empecemos de nuevo.'
        : '❌ There was an error. Let\'s start over.';
      
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
        ? '¡Hola! 👋 Soy tu asistente personal para calcular calificaciones. Para empezar, simplemente dime "Hola, quiero calcular mis calificaciones" y te guiaré paso a paso. ¿Empezamos?' 
        : 'Hi there! 👋 I\'m your personal grade calculation assistant. To get started, just tell me "Hi, I want to calculate my grades" and I\'ll guide you step by step. Shall we begin?',
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
            className="bg-white/10 hover:bg-white/20 text-white border-none rounded-xl transition-all duration-200"
            title={language === 'es' ? "Descargar conversación" : "Download conversation"}
          >
            <Download size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-white border-none rounded-xl transition-all duration-200"
            title={language === 'es' ? "Compartir" : "Share"}
          >
            <Share size={18} />
          </Button>
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
        {messages.map(message => (
          <div 
            key={message.id}
            className={`flex items-start gap-4 mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'} ${
              message.isTyping ? 'animate-pulse' : 'animate-fade-in'
            }`}
          >
            {/* Avatar para asistente */}
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-education-primary to-education-secondary flex items-center justify-center text-white shadow-lg">
                <Bot size={20} />
              </div>
            )}
            
            {/* Contenido del mensaje con bordes redondeados */}
            <div 
              className={`rounded-2xl p-4 max-w-[80%] relative shadow-md ${
                message.role === 'user' 
                  ? 'bg-gradient-to-r from-education-primary/10 to-education-secondary/10 border-2 border-education-primary/20'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
              } ${message.isTyping ? 'animate-pulse' : ''}`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
              
              {/* Timestamp */}
              <span className="text-xs text-gray-500 mt-2 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {/* Avatar para usuario */}
            {message.role === 'user' && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-lg">
                <User size={20} />
              </div>
            )}
          </div>
        ))}
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
        <Info size={18} className="text-education-primary" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'es' 
            ? 'Funciona sin conexión y calcula tus calificaciones automáticamente.'
            : 'Works offline and calculates your grades automatically.'}
        </p>
      </div>
      
      {/* Controles del chat con bordes redondeados */}
      <div className="p-6 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon"
          className="flex-shrink-0 text-gray-500 hover:text-education-primary rounded-xl border-2"
          title={language === 'es' ? 'Ayuda' : 'Help'}
        >
          <HelpCircle size={20} />
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
          className="flex-grow rounded-xl border-2 focus:border-education-primary"
          disabled={isProcessing || isTyping}
        />
        
        <Button 
          onClick={processUserInput} 
          disabled={!input.trim() || isProcessing || isTyping}
          className="flex-shrink-0 bg-education-primary hover:bg-education-dark text-white rounded-xl"
        >
          {isProcessing || isTyping ? 
            <Sparkles size={18} className="mr-1 animate-pulse" /> : 
            <Send size={18} />
          }
        </Button>
      </div>
      
      {/* Indicador offline con bordes redondeados */}
      <div className="bg-green-100 dark:bg-green-900/30 border-t-2 border-green-200 dark:border-green-800/50 py-2 px-6 rounded-b-2xl">
        <p className="text-xs text-green-800 dark:text-green-400 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          {language === 'es' ? 'Funcionando sin conexión' : 'Working offline'}
        </p>
      </div>
    </Card>
  );
};

export default ChatGrade;
