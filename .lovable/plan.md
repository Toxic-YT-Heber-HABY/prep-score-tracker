

# Rediseño de HABY: Moderno y Minimalista con Sidebar

## Vision General

Transformar HABY de un layout vertical con header pesado a un diseño tipo aplicacion moderna con sidebar de navegacion fija y area de contenido limpia. Menos decoracion, mas espacio en blanco, tipografia clara.

```text
┌──────────┬─────────────────────────────────┐
│          │  Breadcrumb / Titulo            │
│  Logo    ├─────────────────────────────────┤
│          │                                 │
│  Nav     │     Contenido principal         │
│  links   │     (categorias, resultados,    │
│          │      calculadora segun ruta)    │
│  ──────  │                                 │
│  Theme   │                                 │
│  Lang    │                                 │
│  Social  │                                 │
│          │                                 │
└──────────┴─────────────────────────────────┘
```

En movil: sidebar colapsada (offcanvas), trigger visible en header minimo.

---

## Cambios Principales

### 1. Sidebar de navegacion (nuevo componente)
- Logo HABY arriba
- Links: Inicio, ChatIA, Guia, Historial, Contacto
- Separador, luego: toggle tema, toggle idioma
- Links sociales en la parte inferior (iconos pequenos)
- Boton de Asistente IA destacado
- Colapsable a iconos en desktop, offcanvas en movil
- Usar el componente Shadcn `Sidebar` ya disponible

### 2. Eliminar el Header actual
- Reemplazar por un header minimo dentro del area de contenido (solo breadcrumb/titulo de pagina + SidebarTrigger)
- Sin duplicar links de navegacion

### 3. Redisenar Index (pagina principal)
- Quitar el bloque de introduccion grande superior
- Layout limpio: titulo + subtitulo simples
- Seccion de categorias y resultados en grid de 2 columnas (desktop), 1 columna (movil)
- Tarjetas con menos bordes decorativos, sombras sutiles, mas padding
- Formulario de agregar categoria integrado de forma mas limpia
- Botones "Cargar ejemplo" y "Reset" como acciones secundarias discretas

### 4. Simplificar paleta visual
- Reducir uso de gradientes (reservar solo para acentos puntuales)
- Fondos solidos limpios en lugar de glassmorphism
- Bordes mas finos y sutiles
- Tipografia con mejor jerarquia (titulo grande, subtitulos medianos, cuerpo normal)

### 5. Actualizar todas las paginas secundarias
- ChatCalculator, Guide, Contact, Privacy, Terms, VersionHistory: reemplazar `<Header />` por el nuevo layout con sidebar
- Cada pagina envuelta en el SidebarProvider

### 6. App.tsx: Layout global con Sidebar
- Mover SidebarProvider + AppSidebar al nivel de App
- Cada ruta renderiza solo su contenido (sin Header propio)

---

## Archivos a crear/modificar

| Archivo | Accion |
|---------|--------|
| `src/components/AppSidebar.tsx` | Crear - sidebar con nav, tema, idioma, social |
| `src/components/AppLayout.tsx` | Crear - layout wrapper con SidebarProvider + header minimo |
| `src/App.tsx` | Modificar - usar AppLayout como wrapper de rutas |
| `src/pages/Index.tsx` | Modificar - quitar Header, simplificar intro, layout limpio |
| `src/pages/ChatCalculator.tsx` | Modificar - quitar Header |
| `src/pages/Guide.tsx` | Modificar - quitar Header |
| `src/pages/Contact.tsx` | Modificar - quitar Header |
| `src/pages/Privacy.tsx` | Modificar - quitar Header |
| `src/pages/Terms.tsx` | Modificar - quitar Header |
| `src/pages/VersionHistory.tsx` | Modificar - quitar Header |
| `src/components/CategoryCard.tsx` | Modificar - estilo mas limpio y minimalista |
| `src/components/ActivityItem.tsx` | Modificar - simplificar bordes y sombras |
| `src/components/ResultsDisplay.tsx` | Modificar - estilo mas limpio |
| `src/index.css` | Modificar - simplificar utilidades, reducir glassmorphism |

---

## Detalle Tecnico

- Usar `Sidebar` de shadcn con `collapsible="icon"` para colapsar a mini-sidebar en desktop
- `SidebarTrigger` siempre visible en el header del area de contenido
- Reutilizar `useI18n` y `useTheme` desde el sidebar
- Mover la logica de AISidebar trigger al sidebar
- Footer se simplifica o se integra como links en el sidebar

