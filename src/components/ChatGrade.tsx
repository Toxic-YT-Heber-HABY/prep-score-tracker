
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Calculator } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useI18n } from '@/lib/i18n';
import { Category, Activity } from '@/types';
import { calculateResults } from '@/lib/calculator';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const ChatGrade: React.FC = () => {
  const { language, t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [stage, setStage] = useState<'welcome' | 'category_name' | 'category_weight' | 'activity' | 'done'>('welcome');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // First welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = language === 'es' 
        ? '👋 ¡Hola! Soy tu asistente para calcular calificaciones. Te guiaré paso a paso para obtener tu calificación final. ¿Listo para comenzar? Primero, dime el nombre de una categoría de evaluación (por ejemplo: "Tareas", "Exámenes", etc).'
        : '👋 Hello! I\'m your grade calculation assistant. I\'ll guide you step by step to get your final grade. Ready to start? First, tell me the name of an evaluation category (for example: "Homework", "Exams", etc).';
      
      addMessage('assistant', welcomeMessage);
      setStage('category_name');
    }
  }, [language]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      role,
      content
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage('user', input);
    setIsProcessing(true);

    // Process the input based on current stage
    processInput(input);

    // Clear input
    setInput('');
  };

  const processInput = (userInput: string) => {
    const cleanInput = userInput.trim();
    
    // Handle different stages of the conversation
    switch (stage) {
      case 'category_name':
        handleCategoryName(cleanInput);
        break;
      case 'category_weight':
        handleCategoryWeight(cleanInput);
        break;
      case 'activity':
        handleActivityInput(cleanInput);
        break;
      default:
        // Fallback response
        setTimeout(() => {
          addMessage('assistant', language === 'es' 
            ? 'Lo siento, no entendí. ¿Puedes intentar de nuevo?' 
            : 'Sorry, I didn\'t understand. Can you try again?');
          setIsProcessing(false);
        }, 500);
    }
  };

  const handleCategoryName = (name: string) => {
    // Create a new category
    const newCategory: Category = {
      id: uuidv4(),
      name,
      weight: 0,
      activities: []
    };
    
    setCurrentCategory(newCategory);
    
    setTimeout(() => {
      addMessage('assistant', language === 'es' 
        ? `He registrado la categoría "${name}". Ahora, ¿qué importancia (%) tiene esta categoría en la calificación final? (Ingresa un número del 1 al 100)`
        : `I've registered the "${name}" category. Now, what importance (%) does this category have in the final grade? (Enter a number from 1 to 100)`);
      setStage('category_weight');
      setIsProcessing(false);
    }, 500);
  };

  const handleCategoryWeight = (weightInput: string) => {
    const weight = parseFloat(weightInput);
    
    if (isNaN(weight) || weight <= 0 || weight > 100) {
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? 'Por favor ingresa un número válido entre 1 y 100 para la importancia de esta categoría.'
          : 'Please enter a valid number between 1 and 100 for this category\'s importance.');
        setIsProcessing(false);
      }, 500);
      return;
    }

    if (currentCategory) {
      const updatedCategory = { ...currentCategory, weight };
      setCurrentCategory(updatedCategory);
      
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? `Perfecto. Ahora necesito información sobre una actividad en la categoría "${updatedCategory.name}". Por favor ingresa el nombre de la actividad, su importancia (%) y calificación en este formato: "nombre, importancia, calificación" (Ejemplo: "Tarea 1, 50, 85")`
          : `Perfect. Now I need information about an activity in the "${updatedCategory.name}" category. Please enter the activity name, importance (%) and grade in this format: "name, importance, grade" (Example: "Homework 1, 50, 85")`);
        setStage('activity');
        setIsProcessing(false);
      }, 500);
    }
  };

  const handleActivityInput = (activityInput: string) => {
    // Check if user wants to finish this category
    if (activityInput.toLowerCase() === (language === 'es' ? 'listo' : 'done') || 
        activityInput.toLowerCase() === (language === 'es' ? 'terminar' : 'finish')) {
      
      finishCategory();
      return;
    }
    
    // Parse activity information (name, weight, grade)
    const parts = activityInput.split(',').map(part => part.trim());
    
    if (parts.length < 3) {
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? 'Por favor ingresa la información completa en el formato: "nombre, importancia, calificación"'
          : 'Please enter the complete information in the format: "name, importance, grade"');
        setIsProcessing(false);
      }, 500);
      return;
    }
    
    const name = parts[0];
    const weight = parseFloat(parts[1]);
    const grade = parseFloat(parts[2]);
    
    if (isNaN(weight) || isNaN(grade) || weight <= 0 || grade < 0 || grade > 100) {
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? 'Por favor ingresa valores numéricos válidos para la importancia (mayor a 0) y la calificación (entre 0 y 100).'
          : 'Please enter valid numeric values for importance (greater than 0) and grade (between 0 and 100).');
        setIsProcessing(false);
      }, 500);
      return;
    }
    
    // Add the activity to the current category
    if (currentCategory) {
      const newActivity = {
        id: uuidv4(),
        name,
        weight,
        grade
      };
      
      const updatedCategory = {
        ...currentCategory,
        activities: [...currentCategory.activities, newActivity]
      };
      
      setCurrentCategory(updatedCategory);
      
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? `He registrado la actividad "${name}" con importancia ${weight}% y calificación ${grade}. ¿Deseas agregar otra actividad? Ingresa la información en el mismo formato o escribe "listo" para terminar con esta categoría.`
          : `I've registered the "${name}" activity with importance ${weight}% and grade ${grade}. Do you want to add another activity? Enter the information in the same format or type "done" to finish with this category.`);
        setIsProcessing(false);
      }, 500);
    }
  };

  const finishCategory = () => {
    if (currentCategory && currentCategory.activities.length > 0) {
      // Check if total activity weights sum to 100%
      const totalActivityWeight = currentCategory.activities.reduce(
        (sum, activity) => sum + activity.weight, 0);
      
      if (Math.abs(totalActivityWeight - 100) > 0.1) {
        setTimeout(() => {
          addMessage('assistant', language === 'es' 
            ? `La suma de las importancias de las actividades es ${totalActivityWeight}%, no 100%. Vamos a ajustarlas automáticamente.`
            : `The sum of activity importance is ${totalActivityWeight}%, not 100%. We'll adjust them automatically.`);
          
          // Adjust activity weights
          const adjustedActivities = currentCategory.activities.map(activity => ({
            ...activity,
            weight: (activity.weight / totalActivityWeight) * 100
          }));
          
          const adjustedCategory = {
            ...currentCategory,
            activities: adjustedActivities
          };
          
          setCurrentCategory(adjustedCategory);
          setCategories(prev => [...prev, adjustedCategory]);
        }, 500);
      } else {
        setCategories(prev => [...prev, currentCategory]);
      }
      
      checkCategoriesCompletion();
    } else {
      setTimeout(() => {
        addMessage('assistant', language === 'es' 
          ? 'Necesitas agregar al menos una actividad a esta categoría antes de continuar.'
          : 'You need to add at least one activity to this category before continuing.');
        setIsProcessing(false);
      }, 500);
    }
  };

  const checkCategoriesCompletion = () => {
    const updatedCategories = [...categories];
    if (currentCategory) updatedCategories.push(currentCategory);
    
    const totalCategoryWeight = updatedCategories.reduce(
      (sum, category) => sum + category.weight, 0);
    
    setTimeout(() => {
      if (Math.abs(totalCategoryWeight - 100) < 0.1) {
        // All categories sum to 100%, calculate final grade
        calculateFinalGrade(updatedCategories);
      } else {
        addMessage('assistant', language === 'es' 
          ? `La categoría ha sido agregada. La suma total de importancias de las categorías es ${totalCategoryWeight}%. ${totalCategoryWeight < 100 
              ? `¿Quieres agregar otra categoría? Si es así, dime su nombre, o escribe "calcular" para ajustar automáticamente y obtener el resultado.` 
              : `Has excedido el 100%. Por favor escribe "calcular" para ajustar y obtener el resultado.`}`
          : `The category has been added. The total sum of category importance is ${totalCategoryWeight}%. ${totalCategoryWeight < 100 
              ? `Do you want to add another category? If so, tell me its name, or type "calculate" to automatically adjust and get the result.` 
              : `You have exceeded 100%. Please type "calculate" to adjust and get the result.`}`);
        
        if (totalCategoryWeight < 100) {
          setStage('category_name');
          setCurrentCategory(null);
        } else {
          setStage('done');
        }
        
        setIsProcessing(false);
      }
    }, 700);
  };

  const calculateFinalGrade = (categoriesList: Category[]) => {
    const { totalPoints } = calculateResults(categoriesList);
    const finalGrade = totalPoints * 10; // Convert to 100 scale
    
    setTimeout(() => {
      let resultMessage = '';
      
      if (language === 'es') {
        resultMessage = `🎉 **Resultado del cálculo**\n\n`;
        categoriesList.forEach(category => {
          const { results } = calculateResults([category]);
          const categoryAverage = results[0]?.average || 0;
          resultMessage += `📊 **${category.name}** (${category.weight}%): Promedio ${categoryAverage.toFixed(2)}\n`;
          
          category.activities.forEach(activity => {
            resultMessage += `   - ${activity.name}: ${activity.grade} (${activity.weight}%)\n`;
          });
          resultMessage += '\n';
        });
        
        resultMessage += `\n**Tu calificación final es: ${finalGrade.toFixed(2)}**\n\n`;
        resultMessage += `¿Quieres guardar estos datos en la calculadora principal? Escribe "guardar" para transferir estos datos a la calculadora.`;
      } else {
        resultMessage = `🎉 **Calculation Result**\n\n`;
        categoriesList.forEach(category => {
          const { results } = calculateResults([category]);
          const categoryAverage = results[0]?.average || 0;
          resultMessage += `📊 **${category.name}** (${category.weight}%): Average ${categoryAverage.toFixed(2)}\n`;
          
          category.activities.forEach(activity => {
            resultMessage += `   - ${activity.name}: ${activity.grade} (${activity.weight}%)\n`;
          });
          resultMessage += '\n';
        });
        
        resultMessage += `\n**Your final grade is: ${finalGrade.toFixed(2)}**\n\n`;
        resultMessage += `Do you want to save this data to the main calculator? Type "save" to transfer this data to the calculator.`;
      }
      
      addMessage('assistant', resultMessage);
      setStage('done');
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const saveToCalculator = () => {
    if (categories.length > 0) {
      localStorage.setItem('haby-score-tracker-data', JSON.stringify(categories));
      toast.success(language === 'es' 
        ? 'Datos guardados correctamente en la calculadora principal' 
        : 'Data successfully saved to the main calculator');
      
      // Redirect to home after a brief delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  };

  const handleSpecialCommands = (text: string) => {
    const lowerText = text.toLowerCase().trim();
    
    if ((lowerText === 'calcular' && language === 'es') || (lowerText === 'calculate' && language !== 'es')) {
      calculateFinalGrade(categories);
      return true;
    }
    
    if ((lowerText === 'guardar' && language === 'es') || (lowerText === 'save' && language !== 'es')) {
      if (stage === 'done') {
        saveToCalculator();
        return true;
      }
    }
    
    return false;
  };

  return (
    <Card className="w-full h-[80vh] flex flex-col shadow-md hover:shadow-lg transition-all duration-300 border-education-primary/20">
      <CardHeader className="py-3 px-4 bg-gradient-to-r from-education-primary/10 to-education-secondary/10 dark:from-education-primary/20 dark:to-education-secondary/20">
        <CardTitle className="text-lg flex items-center gap-2 text-education-primary">
          <Calculator className="h-5 w-5" />
          {language === 'es' ? 'Calculadora por Chat' : 'Chat Calculator'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 flex flex-col overflow-hidden">
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                  message.role === 'user'
                    ? 'bg-education-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }`}
              >
                {message.content.split('**').map((text, index) => 
                  index % 2 === 0 ? (
                    text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))
                  ) : (
                    <strong key={index}>{text}</strong>
                  )
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'es' ? "Escribe tu mensaje..." : "Type your message..."}
              className="min-h-[60px] max-h-[150px] resize-none"
              disabled={isProcessing}
            />
            <Button
              onClick={() => {
                if (!handleSpecialCommands(input)) {
                  handleSend();
                }
              }}
              disabled={isProcessing || !input.trim()}
              className="bg-education-primary hover:bg-education-dark transition-colors"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatGrade;
