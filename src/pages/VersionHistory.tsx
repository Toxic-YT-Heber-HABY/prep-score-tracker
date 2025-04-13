
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
        "Implementación de la calculadora básica de calificaciones",
        "Sistema de categorías y actividades con pesos específicos",
        "Cálculo de promedio final ponderado",
        "Interfaz de usuario intuitiva"
      ],
      en: [
        "Basic grade calculator implementation",
        "Category and activity system with specific weights",
        "Weighted final average calculation",
        "Intuitive user interface"
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
        "Modo oscuro y claro",
        "Soporte para múltiples idiomas (español e inglés)",
        "Mejoras en la accesibilidad",
        "Diseño responsivo para todos los dispositivos"
      ],
      en: [
        "Dark and light mode",
        "Support for multiple languages (Spanish and English)",
        "Accessibility improvements",
        "Responsive design for all devices"
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
        "Panel de introducción para nuevos usuarios",
        "Ejemplos precargados para facilitar el uso",
        "Página de guía de usuario detallada",
        "Términos y condiciones, política de privacidad"
      ],
      en: [
        "Introduction panel for new users",
        "Preloaded examples for easier use",
        "Detailed user guide page",
        "Terms and conditions, privacy policy"
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
        "Diseño mejorado de términos y privacidad",
        "Corrección de errores menores",
        "Logo clickeable para navegación mejorada",
        "Historial de versiones",
        "Optimización de rendimiento"
      ],
      en: [
        "Improved terms and privacy design",
        "Minor bug fixes",
        "Clickable logo for improved navigation",
        "Version history",
        "Performance optimization"
      ]
    },
    icon: Bug
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
              ? "Un registro detallado de todas las actualizaciones y cambios realizados en HABY Score Tracker, mostrando su evolución continua."
              : "A detailed record of all updates and changes made to HABY Score Tracker, showing its continuous evolution."}
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

                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    {language === 'es' ? version.title.es : version.title.en}
                  </h2>

                  <div className="flex items-start gap-4">
                    <div className="bg-education-primary/10 p-3 rounded-full shrink-0 hidden md:block">
                      <version.icon className="h-6 w-6 text-education-primary" />
                    </div>
                    <div>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {(language === 'es' ? version.description.es : version.description.en).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 select-none">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
