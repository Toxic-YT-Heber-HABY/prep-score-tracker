
import React from 'react';
import { Link } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useI18n } from '@/lib/i18n';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useI18n();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-6xl">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            HABY
          </span>
        </Link>
        <nav className="flex gap-2 md:gap-3 items-center">
          <Link to="/chat-calculator">
            <Button variant="outline" className="hidden sm:flex hover:bg-education-light dark:hover:bg-education-dark/30 transition-colors duration-300">
              {language === 'es' ? 'Calculadora por Chat' : 'Chat Calculator'}
            </Button>
          </Link>
          <Link to="/guide">
            <Button variant="outline" className="hidden sm:flex hover:bg-education-light dark:hover:bg-education-dark/30 transition-colors duration-300">
              {language === 'es' ? 'Guía' : 'Guide'}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => toggleLanguage()} aria-label={language === 'es' ? "Switch to English" : "Cambiar a Español"} className="hidden sm:flex">
            <span className="font-semibold">{language === 'es' ? 'EN' : 'ES'}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
