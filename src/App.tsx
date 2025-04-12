
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
import { useI18n } from "@/lib/i18n";
import Footer from "./components/Footer";

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

