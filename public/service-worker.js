
const CACHE_NAME = 'haby-score-tracker-v1.5.0';
const STATIC_CACHE = 'haby-static-v1.5.0';
const DYNAMIC_CACHE = 'haby-dynamic-v1.5.0';

// Recursos esenciales para funcionamiento offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png',
  '/favicon.ico'
];

// Recursos dinámicos que se cachearán automáticamente
const cacheableExtensions = ['.js', '.css', '.woff', '.woff2', '.ttf', '.png', '.jpg', '.jpeg', '.svg', '.ico'];

// Instalación del Service Worker con caché mejorado
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando v1.5.0');
  event.waitUntil(
    Promise.all([
      // Cache estático
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Cacheando archivos estáticos');
        return cache.addAll(urlsToCache);
      }),
      // Cache dinámico inicial vacío
      caches.open(DYNAMIC_CACHE).then(() => {
        console.log('Service Worker: Cache dinámico inicializado');
      })
    ])
  );
  // Activar inmediatamente el nuevo service worker
  self.skipWaiting();
});

// Activación del Service Worker con limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando v1.5.0');
  const currentCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches obsoletos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('Service Worker: Eliminando cache obsoleto', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar control inmediato de todas las páginas
      self.clients.claim()
    ])
  );
});

// Estrategia de caché mejorada con fallbacks
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Ignorar requests que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Ignorar requests de desarrollo y externos
  if (url.pathname.includes('/_vite/') || 
      url.pathname.includes('/node_modules/') ||
      !url.pathname.startsWith('/') && !url.origin.includes('lovableproject.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si está en cache, devolver inmediatamente
      if (cachedResponse) {
        // Para recursos críticos, también intentar actualizar en background
        if (isStaticResource(event.request.url)) {
          fetchAndCache(event.request);
        }
        return cachedResponse;
      }

      // Si no está en cache, intentar fetch y cachear
      return fetchAndCache(event.request);
    }).catch(() => {
      // Si falla todo, devolver página offline para navegación
      if (event.request.destination === 'document') {
        return caches.match('/index.html');
      }
      
      // Para imágenes, devolver placeholder si existe
      if (event.request.destination === 'image') {
        return caches.match('/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png');
      }
    })
  );
});

// Función auxiliar para fetch y cache
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Solo cachear respuestas exitosas
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    // Determinar el cache apropiado
    const cache = isStaticResource(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
    
    // Cachear la respuesta
    const responseToCache = response.clone();
    caches.open(cache).then((cacheStorage) => {
      cacheStorage.put(request, responseToCache);
    });

    return response;
  } catch (error) {
    console.log('Service Worker: Error en fetch', error);
    throw error;
  }
}

// Función auxiliar para determinar si es recurso estático
function isStaticResource(url) {
  return cacheableExtensions.some(ext => url.includes(ext)) || 
         url.includes('/lovable-uploads/') ||
         url.endsWith('/') ||
         url.includes('/manifest.json');
}

// Limpiar cache dinámico periódicamente para evitar que crezca demasiado
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_DYNAMIC_CACHE') {
    caches.delete(DYNAMIC_CACHE).then(() => {
      console.log('Service Worker: Cache dinámico limpiado');
      caches.open(DYNAMIC_CACHE);
    });
  }
});

// Notificar a la aplicación sobre actualizaciones disponibles
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
