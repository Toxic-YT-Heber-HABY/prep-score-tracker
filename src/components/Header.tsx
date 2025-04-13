
import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, HelpCircle, Facebook, Instagram, Youtube, Twitter, MessageSquare, Mail } from 'lucide-react';
import { toast } from "sonner";

/**
 * Header component with application title, logo and language switcher.
 * Displays at the top of every page.
 */
const Header = () => {
  const { language, toggleLanguage, t } = useI18n();
  
  /**
   * Handles language toggle with feedback to the user
   */
  const handleLanguageToggle = () => {
    toggleLanguage();
    // Show notification about language change
    const newLanguage = language === 'es' ? 'English' : 'Español';
    const message = language === 'es' 
      ? 'Language changed to English' 
      : 'Idioma cambiado a Español';
    toast.success(message);
  };

  /**
   * Handle email support click
   */
  const handleEmailSupport = () => {
    window.location.href = "mailto:habyopenthedoors@gmail.com";
    toast.success(language === 'es' 
      ? 'Abriendo cliente de correo electrónico' 
      : 'Opening email client');
  };
  
  return (
    <header className="bg-gradient-to-r from-education-primary to-education-secondary text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <img 
            src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
            alt="HABY Logo" 
            className="h-10 w-auto filter drop-shadow-md" 
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">HABY</h1>
            <p className="text-xs text-white/80">
              {language === 'es' ? "Calculadora de calificaciones" : "Grade calculator"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-3 mr-4">
            <a href="https://www.facebook.com/zadkiel.garcia.31" target="_blank" rel="noopener noreferrer" 
              className="text-white hover:text-white/80 transition-colors" title="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/habydoors/" target="_blank" rel="noopener noreferrer" 
              className="text-white hover:text-white/80 transition-colors" title="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@HABYOpenDoors?themeRefresh=1" target="_blank" rel="noopener noreferrer" 
              className="text-white hover:text-white/80 transition-colors" title="YouTube">
              <Youtube size={18} />
            </a>
            <a href="https://x.com/Haby_Open_Doors" target="_blank" rel="noopener noreferrer" 
              className="text-white hover:text-white/80 transition-colors" title="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://wa.me/5256536812377" target="_blank" rel="noopener noreferrer" 
              className="text-white hover:text-white/80 transition-colors" title="WhatsApp">
              <MessageSquare size={18} />
            </a>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleEmailSupport}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all"
            title={language === 'es' ? "Soporte técnico" : "Technical support"}
          >
            <Mail className="h-4 w-4 mr-1" />
            {language === 'es' ? 'Soporte' : 'Support'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLanguageToggle}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === 'es' ? 'English' : 'Español'}
          </Button>
          <Link to="/guide">
            <Button 
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {language === 'es' ? 'Guía de uso' : 'User guide'}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
