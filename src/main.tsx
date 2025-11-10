
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root");
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

// Renderizado estándar de React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registro del Service Worker mejorado
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado exitosamente:', registration.scope);
        
        // Escuchar actualizaciones del service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Hay una nueva versión disponible
                if (confirm('Nueva versión disponible. ¿Recargar para actualizar?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('Error al registrar Service Worker:', error);
      });

    // Limpiar cache dinámico cada hora para optimizar rendimiento
    setInterval(() => {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CLEAR_DYNAMIC_CACHE'
        });
      }
    }, 3600000); // 1 hora
  });
}

// Optimizaciones adicionales para dispositivos móviles
if ('connection' in navigator) {
  const connection = (navigator as any).connection;
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    // Para conexiones lentas, priorizar recursos críticos
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
  }
}

// Precargar recursos críticos para mejor rendimiento
const preloadCriticalResources = () => {
  const criticalResources = [
    '/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.png') ? 'image' : 'fetch';
    document.head.appendChild(link);
  });
};

// Ejecutar precarga cuando el documento esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
  preloadCriticalResources();
}
