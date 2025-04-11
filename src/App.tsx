
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Facebook, Instagram, Youtube, Twitter, MessageSquare } from 'lucide-react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";

/**
 * Create React Query client with optimized configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes cache time
      retry: 1, // Only retry failed queries once
      refetchOnWindowFocus: false, // Don't refetch when window regains focus
    },
  },
});

/**
 * Footer component with social media links
 */
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
              alt="HABY Logo" 
              className="h-8 w-auto mr-2" 
            />
            <span className="text-education-primary font-semibold dark:text-education-secondary">HABY</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-3">
              <a href="https://www.facebook.com/zadkiel.garcia.31" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/habydoors/" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@HABYOpenDoors?themeRefresh=1" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://x.com/Haby_Open_Doors" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/522204372038" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="WhatsApp">
                <MessageSquare size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} HABY Score Tracker - Desarrollado por <span className="font-medium">Heber Zadkiel García Pérez</span>
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="text-xs text-education-primary hover:underline">
                Términos y condiciones
              </a>
              <a href="#" className="text-xs text-education-primary hover:underline">
                Política de privacidad
              </a>
              <a href="#" className="text-xs text-education-primary hover:underline">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main application component with providers for:
 * - State management (React Query)
 * - Theming (dark/light mode)
 * - UI components (tooltips, toasts)
 * - Routing
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system"
      enableSystem={true}
      storageKey="haby-theme-preference"
      disableTransitionOnChange={false} // Enable smooth transitions between themes
    >
      <TooltipProvider>
        <Toaster />
        <Sonner richColors closeButton position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
