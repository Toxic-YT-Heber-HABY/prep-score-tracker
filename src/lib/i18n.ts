
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Type definition for supported languages in the application
 * Currently supporting Spanish (es) and English (en)
 */
type Language = 'es' | 'en';

/**
 * Comprehensive list of all translatable keys in the application.
 * This type ensures type safety when accessing translations.
 */
export type TranslationKey = 
  | 'appName'
  | 'categories'
  | 'addCategory'
  | 'categoryName'
  | 'categoryWeight' 
  | 'activities'
  | 'addActivity'
  | 'activityName'
  | 'activityWeight'
  | 'grade'
  | 'finalResults'
  | 'finalGrade'
  | 'loading'
  | 'noCategories'
  | 'noActivities'
  | 'invalidWeights'
  | 'weightTotal'
  | 'calculation'
  | 'calculationExplanation1'
  | 'calculationExplanation2'
  | 'calculationExplanation3'
  | 'calculationExplanation4'
  | 'calculationNote'
  | 'category'
  | 'weight'
  | 'average'
  | 'points100'
  | 'points10'
  | 'totalGrade'
  | 'loadExample'
  | 'reset'
  | 'darkMode'
  | 'lightMode'
  | 'gradeWeightExplanation'
  | 'categoryWeightExplanation'
  | 'appDescription'
  | 'emailSupport'
  | 'technicalSupport'
  | 'reportBugs';

/**
 * Translation dictionary containing all text content in both supported languages.
 * Structured as a nested record with language as the first key and translation key as the second.
 */
const translations: Record<Language, Record<TranslationKey, string>> = {
  es: {
    appName: 'HABY Score Tracker',
    categories: 'Categorías',
    addCategory: 'Añadir nueva categoría',
    categoryName: 'Nombre de la categoría',
    categoryWeight: 'Importancia de la categoría (%)',
    activities: 'Actividades',
    addActivity: 'Añadir',
    activityName: 'Nombre de la actividad',
    activityWeight: 'Importancia (%)',
    grade: 'Calificación',
    finalResults: 'Resultado Final',
    finalGrade: 'Calificación Final',
    loading: 'Cargando...',
    noCategories: 'Añade categorías para ver los resultados',
    noActivities: 'Añade actividades a tus categorías para ver los resultados',
    invalidWeights: 'La importancia de las categorías debe sumar exactamente 100%',
    weightTotal: 'Total actual',
    calculation: 'Explicación del cálculo:',
    calculationExplanation1: 'Para cada categoría con múltiples actividades, se calcula un promedio ponderado.',
    calculationExplanation2: 'Para categorías con una sola actividad, se usa directamente la calificación.',
    calculationExplanation3: 'Se multiplica el promedio por la importancia de la categoría y se divide entre 100.',
    calculationExplanation4: 'Se suman los puntos de todas las categorías para obtener la calificación final.',
    calculationNote: 'Nota: La calificación final se expresa en una escala de 0 a 10.',
    category: 'Categoría',
    weight: 'Importancia',
    average: 'Promedio',
    points100: 'Puntos (100)',
    points10: 'Puntos (10)',
    totalGrade: 'Calificación Total:',
    loadExample: 'Cargar Ejemplo',
    reset: 'Reiniciar',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    gradeWeightExplanation: 'Calificación: Puntuación obtenida en la actividad o categoría, expresada en una escala de 0 a 100.',
    categoryWeightExplanation: 'Importancia de la categoría (%): Porcentaje que determina qué tanto influye esta categoría en el cálculo de la calificación final. La suma de todas las importancias debe ser igual al 100%.',
    appDescription: 'Calcula tu calificación de forma precisa',
    emailSupport: 'Soporte por correo electrónico',
    technicalSupport: 'Soporte técnico',
    reportBugs: 'Reportar errores'
  },
  en: {
    appName: 'HABY Score Tracker',
    categories: 'Categories',
    addCategory: 'Add new category',
    categoryName: 'Category name',
    categoryWeight: 'Category importance (%)',
    activities: 'Activities',
    addActivity: 'Add',
    activityName: 'Activity name',
    activityWeight: 'Importance (%)',
    grade: 'Grade',
    finalResults: 'Final Results',
    finalGrade: 'Final Grade',
    loading: 'Loading...',
    noCategories: 'Add categories to see results',
    noActivities: 'Add activities to your categories to see results',
    invalidWeights: 'Category importance values must add up to exactly 100%',
    weightTotal: 'Current total',
    calculation: 'Calculation explanation:',
    calculationExplanation1: 'For each category with multiple activities, a weighted average is calculated.',
    calculationExplanation2: 'For categories with a single activity, the grade is used directly.',
    calculationExplanation3: 'The average is multiplied by the category importance and divided by 100.',
    calculationExplanation4: 'The points from all categories are added to obtain the final grade.',
    calculationNote: 'Note: The final grade is expressed on a scale from 0 to 10.',
    category: 'Category',
    weight: 'Importance',
    average: 'Average',
    points100: 'Points (100)',
    points10: 'Points (10)',
    totalGrade: 'Total Grade:',
    loadExample: 'Load Example',
    reset: 'Reset',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    gradeWeightExplanation: 'Grade: Score obtained in the activity or category, expressed on a scale from 0 to 100.',
    categoryWeightExplanation: 'Category importance (%): Percentage that determines how much this category influences the final grade calculation. The sum of all importance values must equal 100%.',
    appDescription: 'Calculate your grade accurately',
    emailSupport: 'Email support',
    technicalSupport: 'Technical support',
    reportBugs: 'Report bugs'
  }
};

/**
 * Interface defining the state and methods for the internationalization store.
 */
interface I18nState {
  /** Current language selection */
  language: Language;
  /** Translation function that returns text for a given key in the current language */
  t: (key: TranslationKey) => string;
  /** Function to explicitly set a specific language */
  setLanguage: (lang: Language) => void;
  /** Function to toggle between available languages */
  toggleLanguage: () => void;
}

/**
 * Zustand store for managing internationalization state.
 * Uses the persist middleware to save language preference to localStorage.
 */
export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'es', // Default language is Spanish (Mexico)
      
      /**
       * Translation function - retrieves text for the given key in the current language
       * Falls back to the key itself if translation is missing
       */
      t: (key: TranslationKey) => {
        const currentLanguage = get().language;
        return translations[currentLanguage][key] || key;
      },
      
      /**
       * Sets the active language explicitly
       */
      setLanguage: (language: Language) => set({ language }),
      
      /**
       * Toggles between available languages (es <-> en)
       */
      toggleLanguage: () => set(state => ({ 
        language: state.language === 'es' ? 'en' : 'es' 
      })),
    }),
    {
      name: 'i18n-storage', // Local storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage with proper JSON serialization
    }
  )
);
