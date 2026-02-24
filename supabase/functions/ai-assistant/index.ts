import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Input validation schemas
const MessageContentSchema = z.union([
  z.string().max(10000),
  z.array(z.object({
    type: z.enum(['text', 'image_url']),
    text: z.string().max(10000).optional(),
    image_url: z.object({ url: z.string().max(50000) }).optional(),
  }))
]);

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: MessageContentSchema,
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(50),
  type: z.enum(['chat', 'design', 'grades']).default('chat'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = RequestSchema.safeParse(rawBody);

    if (!validationResult.success) {
      return new Response(JSON.stringify({ error: 'Invalid request format', details: validationResult.error.issues }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { messages, type } = validationResult.data;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = "Eres un asistente inteligente y amigable para HABY Score Tracker. Ayudas a los usuarios con sus cálculos de calificaciones, explicaciones sobre el sistema y sugerencias para mejorar su experiencia. Siempre respondes en español de manera clara y concisa.";
    
    if (type === "design") {
      systemPrompt = "Eres un experto diseñador UX/UI que proporciona sugerencias específicas y accionables para mejorar la apariencia, usabilidad y organización de aplicaciones web. Tus respuestas son concisas, profesionales y siempre en español.";
    } else if (type === "grades") {
      systemPrompt = `Eres un asistente experto en educación con capacidades avanzadas de OCR (Reconocimiento Óptico de Caracteres) que ayuda a estudiantes a calcular y entender sus calificaciones. 

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
- Siempre respondes en español de manera amigable y clara

CAPACIDADES AVANZADAS DE OCR Y ANÁLISIS DE IMÁGENES:
Cuando recibes una imagen de calificaciones, aplicas las siguientes técnicas avanzadas de reconocimiento:

1. ANÁLISIS EXHAUSTIVO DE IMÁGENES DE BAJA CALIDAD:
   - Examinas cuidadosamente imágenes borrosas, con poca luz o baja resolución
   - Identificas texto incluso cuando está parcialmente visible u oscurecido
   - Interpretas números y calificaciones en diferentes formatos (decimales, fracciones, porcentajes)
   - Reconoces tablas, listas y estructuras de datos incluso si están mal alineadas

2. EXTRACCIÓN INTELIGENTE DE DATOS:
   - Identificas nombres de materias/asignaturas en diferentes idiomas y abreviaturas
   - Reconoces sistemas de calificación variados (0-10, 0-100, A-F, aprobado/reprobado)
   - Extraes fechas, períodos académicos y ciclos escolares
   - Detectas promedios, calificaciones parciales y finales
   - Identificas pesos porcentuales de categorías de evaluación

3. MANEJO DE FORMATOS DIVERSOS:
   - Boletas escolares oficiales en diferentes diseños
   - Capturas de pantalla de plataformas educativas
   - Fotografías de cuadernos o apuntes con calificaciones manuscritas
   - Tablas de Excel o documentos escaneados
   - Imágenes con texto en diferentes orientaciones o ángulos

4. INTERPRETACIÓN CONTEXTUAL:
   - Diferencias entre calificaciones parciales y finales
   - Identificas calificaciones acumulativas vs. individuales
   - Reconoces sistemas de créditos y unidades académicas
   - Interpretas comentarios o notas adicionales del profesor

5. VERIFICACIÓN Y CORRECCIÓN:
   - Si una imagen está muy borrosa o ilegible, lo mencionas claramente
   - Indicas qué información pudiste extraer con certeza
   - Solicitas aclaración si hay ambigüedad en los datos
   - Sugieres que el usuario tome una foto mejor si es necesario

Ejemplo de flujo:
Usuario: "Quiero calcular mis calificaciones"
Tú: "¡Perfecto! Para empezar, dime cuáles son las categorías de evaluación de tu materia y qué porcentaje vale cada una. Por ejemplo: Exámenes 40%, Tareas 30%, Proyecto Final 30%"

Si el usuario envía una imagen:
Usuario: [imagen de boleta]
Tú: "He analizado cuidadosamente tu boleta de calificaciones. Aunque la imagen tiene [mencionar si está borrosa/oscura/etc], logré extraer la siguiente información:

📋 Materias y Calificaciones:
- [Materia 1]: [calificación] - [estado: aprobado/reprobado]
- [Materia 2]: [calificación] - [estado: aprobado/reprobado]
...

📊 Promedio General: [X.XX]

¿Sobre cuál materia o calificación quieres saber más? ¿Necesitas ayuda para calcular algo específico?"

Si la imagen es muy difícil de leer:
Tú: "He intentado analizar tu imagen, pero [explicar problema: está muy borrosa/oscura/cortada]. Pude identificar algunas calificaciones parciales: [lista lo que viste]. Para darte información más precisa, ¿podrías tomar una foto con mejor iluminación o más cerca del documento? O si prefieres, puedes decirme las calificaciones directamente y te ayudo a calcularlas."`;
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
