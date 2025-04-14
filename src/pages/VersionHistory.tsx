
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag, BookOpen, Code, Bug, Zap, LucideIcon } from 'lucide-react';
import Header from "@/components/Header";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface Version {
  version: string;
  date: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string[];
    en: string[];
  };
  icon: LucideIcon;
  technicalDetails?: {
    es: string[];
    en: string[];
  };
  improvements?: {
    es: string[];
    en: string[];
  };
  bugFixes?: {
    es: string[];
    en: string[];
  };
}

const versions: Version[] = [
  {
    version: "1.0.0",
    date: "2025-04-01",
    title: {
      es: "Lanzamiento inicial",
      en: "Initial Release"
    },
    description: {
      es: [
        "Primera versión oficial de HABY Score Tracker con funcionalidades básicas para el cálculo de calificaciones"
      ],
      en: [
        "First official version of HABY Score Tracker with basic grade calculation functionalities"
      ]
    },
    technicalDetails: {
      es: [
        "Implementación de la calculadora básica de calificaciones usando React y TypeScript",
        "Sistema de categorías con pesos específicos para cada una",
        "Actividades individuales dentro de cada categoría con pesos personalizables",
        "Cálculo automático del promedio final ponderado"
      ],
      en: [
        "Implementation of the basic grade calculator using React and TypeScript",
        "Category system with specific weights for each one",
        "Individual activities within each category with customizable weights",
        "Automatic calculation of the weighted final average"
      ]
    },
    improvements: {
      es: [
        "Interfaz de usuario intuitiva y fácil de usar",
        "Navegación simple entre componentes",
        "Estructura clara para la organización de calificaciones"
      ],
      en: [
        "Intuitive and easy-to-use user interface",
        "Simple navigation between components",
        "Clear structure for grade organization"
      ]
    },
    icon: BookOpen
  },
  {
    version: "1.1.0",
    date: "2025-04-05",
    title: {
      es: "Mejora de la experiencia de usuario",
      en: "User Experience Enhancement"
    },
    description: {
      es: [
        "Actualización centrada en mejorar la experiencia del usuario con nuevas características de accesibilidad y personalización"
      ],
      en: [
        "Update focused on improving the user experience with new accessibility and customization features"
      ]
    },
    technicalDetails: {
      es: [
        "Implementación de modos claro y oscuro con detección automática según preferencias del sistema",
        "Internacionalización completa con soporte para español e inglés",
        "Mejoras en la accesibilidad según estándares WCAG 2.1",
        "Optimización de rendimiento en dispositivos de gama baja"
      ],
      en: [
        "Implementation of light and dark modes with automatic detection according to system preferences",
        "Complete internationalization with support for Spanish and English",
        "Accessibility improvements according to WCAG 2.1 standards",
        "Performance optimization on low-end devices"
      ]
    },
    improvements: {
      es: [
        "Transiciones suaves entre modos claro y oscuro",
        "Alternancia de idiomas en tiempo real sin recargar la página",
        "Diseño completamente responsivo para todos los tamaños de pantalla",
        "Mejor contraste y legibilidad para usuarios con discapacidades visuales"
      ],
      en: [
        "Smooth transitions between light and dark modes",
        "Real-time language switching without page reloading",
        "Fully responsive design for all screen sizes",
        "Better contrast and readability for users with visual disabilities"
      ]
    },
    icon: Zap
  },
  {
    version: "1.2.0",
    date: "2025-04-10",
    title: {
      es: "Nuevas funcionalidades",
      en: "New Features"
    },
    description: {
      es: [
        "Ampliación significativa de características con nuevas herramientas para mejorar la experiencia del usuario"
      ],
      en: [
        "Significant feature expansion with new tools to enhance the user experience"
      ]
    },
    technicalDetails: {
      es: [
        "Desarrollo de un panel de introducción interactivo para nuevos usuarios",
        "Creación de ejemplos precargados con distintos escenarios educativos",
        "Implementación de una página de guía de usuario completa",
        "Desarrollo e integración de términos y condiciones, y política de privacidad",
        "Sistema de almacenamiento local para guardar datos del usuario"
      ],
      en: [
        "Development of an interactive introduction panel for new users",
        "Creation of preloaded examples with different educational scenarios",
        "Implementation of a complete user guide page",
        "Development and integration of terms and conditions, and privacy policy",
        "Local storage system to save user data"
      ]
    },
    improvements: {
      es: [
        "Tutorial interactivo para usuarios que usan la aplicación por primera vez",
        "Funcionalidad de reinicio de datos con confirmación",
        "Ejemplos realistas para diferentes situaciones educativas",
        "Documentación detallada sobre el uso de cada función"
      ],
      en: [
        "Interactive tutorial for users using the application for the first time",
        "Data reset functionality with confirmation",
        "Realistic examples for different educational situations",
        "Detailed documentation on the use of each function"
      ]
    },
    bugFixes: {
      es: [
        "Corrección de cálculos incorrectos en situaciones específicas",
        "Arreglo de problemas de visualización en pantallas muy pequeñas",
        "Solución a errores en la validación de datos"
      ],
      en: [
        "Correction of incorrect calculations in specific situations",
        "Fix for display issues on very small screens",
        "Solution to data validation errors"
      ]
    },
    icon: Code
  },
  {
    version: "1.3.0",
    date: "2025-04-13",
    title: {
      es: "Perfeccionamiento y optimización",
      en: "Refinement and Optimization"
    },
    description: {
      es: [
        "Versión enfocada en pulir la experiencia general y optimizar el rendimiento de la aplicación"
      ],
      en: [
        "Version focused on polishing the general experience and optimizing application performance"
      ]
    },
    technicalDetails: {
      es: [
        "Rediseño completo de las páginas de términos y privacidad",
        "Implementación de logo clickeable para mejorar la navegación",
        "Creación detallada del historial de versiones",
        "Optimización del rendimiento para tiempos de carga más rápidos",
        "Mejoras en la estructura del código para mayor mantenibilidad"
      ],
      en: [
        "Complete redesign of terms and privacy pages",
        "Implementation of clickable logo for improved navigation",
        "Detailed creation of version history",
        "Performance optimization for faster loading times",
        "Improvements in code structure for greater maintainability"
      ]
    },
    improvements: {
      es: [
        "Interfaz más elegante y moderna para las páginas legales",
        "Navegación más intuitiva con el logo como enlace a la página principal",
        "Documentación completa de cambios y actualizaciones",
        "Reducción de tiempo de carga en un 30%",
        "Mayor consistencia visual en todas las páginas"
      ],
      en: [
        "More elegant and modern interface for legal pages",
        "More intuitive navigation with the logo as a link to the main page",
        "Complete documentation of changes and updates",
        "30% reduction in loading time",
        "Greater visual consistency across all pages"
      ]
    },
    bugFixes: {
      es: [
        "Corrección de errores en el cálculo de porcentajes en casos extremos",
        "Solución a problemas de interacción en dispositivos táctiles",
        "Arreglo de errores de visualización en navegadores antiguos",
        "Corrección de problemas con el almacenamiento local"
      ],
      en: [
        "Bug fixes in percentage calculation in extreme cases",
        "Solution to interaction problems on touch devices",
        "Fix for display errors in older browsers",
        "Correction of problems with local storage"
      ]
    },
    icon: Bug
  },
  {
    version: "1.4.0",
    date: "2025-04-14",
    title: {
      es: "Mejoras en la experiencia del usuario y correcciones",
      en: "User Experience Improvements and Fixes"
    },
    description: {
      es: [
        "Actualización centrada en resolver problemas de usabilidad y mejorar la interacción del usuario"
      ],
      en: [
        "Update focused on solving usability issues and improving user interaction"
      ]
    },
    technicalDetails: {
      es: [
        "Implementación de campos de calificación que pueden quedar vacíos",
        "Limitación del número de notificaciones mostradas simultáneamente a 3",
        "Reducción del tiempo de permanencia de las notificaciones a 5 segundos",
        "Mejora detallada de la página de historial de versiones",
        "Cambio de nombre del apartado 'Historial' a 'Historial de versiones'"
      ],
      en: [
        "Implementation of grade fields that can be left empty",
        "Limitation of the number of notifications shown simultaneously to 3",
        "Reduction of notification duration to 5 seconds",
        "Detailed improvement of the version history page",
        "Renaming of the 'History' section to 'Version History'"
      ]
    },
    improvements: {
      es: [
        "Mayor flexibilidad al permitir campos de calificación vacíos",
        "Experiencia de notificaciones más limpia y menos intrusiva",
        "Documentación más detallada y transparente sobre el desarrollo",
        "Mejor organización y claridad en la página de historial"
      ],
      en: [
        "Greater flexibility by allowing empty grade fields",
        "Cleaner and less intrusive notification experience",
        "More detailed and transparent documentation on development",
        "Better organization and clarity on the history page"
      ]
    },
    bugFixes: {
      es: [
        "Solución al problema de no poder eliminar valores de calificación",
        "Corrección del exceso de notificaciones simultáneas",
        "Mejora de la información ambigua en el historial de versiones"
      ],
      en: [
        "Solution to the problem of not being able to delete grade values",
        "Correction of excessive simultaneous notifications",
        "Improvement of ambiguous information in version history"
      ]
    },
    icon: Zap
  }
];

/**
 * Version History page component showing the development timeline
 * with detailed information about each release.
 */
const VersionHistory = () => {
  const { language } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="container px-4 py-8 md:px-6 mx-auto max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4 flex items-center gap-2">
              <ArrowLeft size={16} />
              {language === 'es' ? "Volver al inicio" : "Back to home"}
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {language === 'es' ? "Historial de versiones" : "Version History"}
          </h1>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {language === 'es' 
              ? "Un registro detallado de todas las actualizaciones y cambios realizados en HABY Score Tracker, mostrando su evolución continua y mejoras implementadas."
              : "A detailed record of all updates and changes made to HABY Score Tracker, showing its continuous evolution and implemented improvements."}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-education-primary/30 dark:bg-education-primary/20"></div>

          {/* Version entries */}
          <div className="space-y-8">
            {versions.map((version, index) => (
              <div key={version.version} className="relative pl-12 md:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 w-5 h-5 rounded-full bg-education-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>

                {/* Version card */}
                <div className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={16} className="text-education-primary" />
                    <span className="text-sm font-mono text-education-primary">
                      v{version.version}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {version.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                    {language === 'es' ? version.title.es : version.title.en}
                  </h2>

                  <div className="mb-4 text-gray-600 dark:text-gray-300 italic">
                    {(language === 'es' ? version.description.es : version.description.en).map((desc, i) => (
                      <p key={i} className="mb-1">{desc}</p>
                    ))}
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full shrink-0 hidden md:block">
                      <version.icon className="h-6 w-6 text-education-primary" />
                    </div>
                    <div className="space-y-4 w-full">
                      {/* Detalles técnicos */}
                      {version.technicalDetails && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1">
                            {language === 'es' ? "Detalles técnicos" : "Technical Details"}
                          </h3>
                          <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                            {(language === 'es' ? version.technicalDetails.es : version.technicalDetails.en).map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 select-none text-education-primary">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Mejoras */}
                      {version.improvements && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1">
                            {language === 'es' ? "Mejoras" : "Improvements"}
                          </h3>
                          <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                            {(language === 'es' ? version.improvements.es : version.improvements.en).map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 select-none text-green-500">+</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Correcciones de errores */}
                      {version.bugFixes && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-1">
                            {language === 'es' ? "Correcciones de errores" : "Bug Fixes"}
                          </h3>
                          <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                            {(language === 'es' ? version.bugFixes.es : version.bugFixes.en).map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 select-none text-red-500">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VersionHistory;
