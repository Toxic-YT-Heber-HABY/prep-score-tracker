import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AnimatedBackground = React.lazy(() => import("@/components/AnimatedBackground"));
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";

/**
 * Deferred background component - loads after initial paint to avoid critical chain
 */
const DeferredBackground: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(() => setShow(true));
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setShow(true), 200);
      return () => clearTimeout(id);
    }
  }, []);
  if (!show) return null;
  return (
    <React.Suspense fallback={null}>
      <AnimatedBackground />
    </React.Suspense>
  );
};

const NotFound = React.lazy(() => import("./pages/NotFound"));
const Guide = React.lazy(() => import("./pages/Guide"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Contact = React.lazy(() => import("./pages/Contact"));
const VersionHistory = React.lazy(() => import("./pages/VersionHistory"));
const ChatCalculator = React.lazy(() => import("./pages/ChatCalculator"));

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

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system"
        enableSystem={true}
        storageKey="haby-theme-preference"
        disableTransitionOnChange={false}
      >
        <BrowserRouter>
          <DeferredBackground />
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
          <React.Suspense fallback={<div className="min-h-screen" />}>
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
          </React.Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
