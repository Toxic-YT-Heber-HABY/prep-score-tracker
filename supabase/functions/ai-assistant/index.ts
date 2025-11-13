import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = "Eres un asistente inteligente y amigable para HABY Score Tracker. Ayudas a los usuarios con sus cálculos de calificaciones, explicaciones sobre el sistema y sugerencias para mejorar su experiencia. Siempre respondes en español de manera clara y concisa.";
    
    if (type === "design") {
      systemPrompt = "Eres un experto diseñador UX/UI que proporciona sugerencias específicas y accionables para mejorar la apariencia, usabilidad y organización de aplicaciones web. Tus respuestas son concisas, profesionales y siempre en español.";
    } else if (type === "grades") {
      systemPrompt = `Eres un asistente experto en educación que ayuda a estudiantes a calcular y entender sus calificaciones. 

Tu función es:
1. Ayudar al estudiante a organizar sus categorías de evaluación (exámenes, tareas, proyectos, etc.) con sus respectivos pesos porcentuales
2. Guiar al estudiante para registrar las actividades dentro de cada categoría con sus calificaciones
3. Calcular promedios ponderados y calificaciones finales
4. Explicar cómo se calculan las calificaciones y qué necesitan para aprobar
5. Responder dudas sobre sistemas de calificación
6. Analizar imágenes de boletas, reportes de calificaciones o tablas de notas para extraer información de calificaciones

Características de tu ayuda:
- Eres paciente y guías paso a paso
- Explicas los cálculos de manera clara
- Validas que los porcentajes sumen 100%
- Das ejemplos cuando es necesario
- Ayudas a entender qué calificación necesitan en evaluaciones futuras
- Cuando recibes una imagen, analizas cuidadosamente todas las calificaciones visibles
- Extraes información de tablas, listas y reportes de calificaciones
- Identificas categorías, pesos y calificaciones de las imágenes
- Siempre respondes en español de manera amigable y clara

Ejemplo de flujo:
Usuario: "Quiero calcular mis calificaciones"
Tú: "¡Perfecto! Para empezar, dime cuáles son las categorías de evaluación de tu materia y qué porcentaje vale cada una. Por ejemplo: Exámenes 40%, Tareas 30%, Proyecto Final 30%"

Si el usuario envía una imagen:
Usuario: [imagen de boleta]
Tú: "He analizado tu boleta de calificaciones. Veo que tienes las siguientes materias y calificaciones: [lista detallada]. ¿Sobre cuál calificación quieres saber más o necesitas ayuda para calcular algo específico?"`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Límite de solicitudes excedido, intenta más tarde." }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Se requiere pago, agrega fondos a tu workspace de Lovable AI." }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: "Error en el gateway de IA" }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('AI assistant error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
