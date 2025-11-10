import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import VersionHistory from "./pages/VersionHistory";
import ChatCalculator from "./pages/ChatCalculator";

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
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system"
        enableSystem={true}
        storageKey="haby-theme-preference"
        disableTransitionOnChange={false}
      >
        <>
          <AnimatedBackground />
          <Toaster />
          <Sonner 
            richColors 
            closeButton 
            position="top-right" 
            theme="system"
            toastOptions={{
              duration: 5000,
              className: "max-w-md"
            }}
            visibleToasts={3}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/guide" element={<PageTransition><Guide /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/version-history" element={<PageTransition><VersionHistory /></PageTransition>} />
              <Route path="/chat-calculator" element={<PageTransition><ChatCalculator /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </BrowserRouter>
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
