import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, HelpCircle, Facebook, Instagram, Youtube, Twitter, MessageSquare, Mail, History, MessageCircle, Sparkles, Moon, Sun } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
import AISidebar from './AISidebar';

/**
 * Header component with application title, logo and language switcher.
 * Displays at the top of every page.
 */
const Header = () => {
  const { language, toggleLanguage, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  
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

  /**
   * Toggle theme between light and dark mode
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <>
      <AISidebar isOpen={isAISidebarOpen} onClose={() => setIsAISidebarOpen(false)} />
      <motion.header 
        className="glass-effect border-b border-white/10 text-white py-4 px-6 shadow-xl backdrop-blur-xl relative z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 gradient-primary opacity-80 -z-10"></div>
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 mb-2 sm:mb-0 group">
            <motion.img 
              src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
              alt="HABY Logo" 
              className="h-10 w-auto filter drop-shadow-lg"
              width={28}
              height={40}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:scale-105 transition-transform">HABY</h1>
              <p className="text-xs text-white/90">
                {language === 'es' ? "Calculadora de calificaciones" : "Grade calculator"}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all"
                title={theme === 'dark' ? (language === 'es' ? 'Modo claro' : 'Light mode') : (language === 'es' ? 'Modo oscuro' : 'Dark mode')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </motion.div>
            <div className="hidden sm:flex gap-3 mr-2">
              <motion.a 
                href="https://www.facebook.com/zadkiel.garcia.31" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white transition-all" 
                title="Facebook"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/habydoors/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white transition-all" 
                title="Instagram"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@HABYOpenDoors?themeRefresh=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white transition-all" 
                title="YouTube"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube size={18} />
              </motion.a>
              <motion.a 
                href="https://x.com/Haby_Open_Doors" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white transition-all" 
                title="Twitter"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="https://wa.me/5256536812377" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-white transition-all" 
                title="WhatsApp"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageSquare size={18} />
              </motion.a>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsAISidebarOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 btn-glow shadow-lg"
                size="sm"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{language === 'es' ? 'Asistente IA' : 'AI Assistant'}</span>
                <span className="sm:hidden">IA</span>
              </Button>
            </motion.div>
            <Link to="/chat-calculator">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all btn-glow"
                  title={language === 'es' ? "Calculadora por chat" : "Chat calculator"}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {language === 'es' ? 'ChatIA' : 'ChatAI'}
                </Button>
              </motion.div>
            </Link>
            <Link to="/version-history">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all hidden sm:flex"
                >
                  <History className="h-4 w-4 mr-1" />
                  {language === 'es' ? 'Historial' : 'History'}
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEmailSupport}
                className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all"
                title={language === 'es' ? "Soporte técnico" : "Technical support"}
              >
                <Mail className="h-4 w-4 mr-1" />
                {language === 'es' ? 'Soporte' : 'Support'}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLanguageToggle}
                className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all"
              >
                <Globe className="h-4 w-4 mr-1" />
                {language === 'es' ? 'English' : 'Español'}
              </Button>
            </motion.div>
            <Link to="/guide">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-white/10 hover:bg-white/30 text-white border-white/30 transition-all"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {language === 'es' ? 'Guía de uso' : 'User guide'}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
