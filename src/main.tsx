
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Añadimos un poco de código para asegurar que la aplicación se cargue con animaciones
const container = document.getElementById("root")!;
const root = createRoot(container);

// Función para suavizar la carga de la aplicación
const renderApp = () => {
  root.render(<App />);
};

// Pequeño retraso para asegurar que la aplicación se cargue suavemente
window.addEventListener('load', () => {
  // Mejora la accesibilidad
  document.documentElement.lang = 'es';
  document.documentElement.setAttribute('dir', 'ltr');
  
  // Renderizar la aplicación
  renderApp();
});

// Si la página ya está cargada, renderizamos inmediatamente
if (document.readyState === 'complete') {
  renderApp();
}
