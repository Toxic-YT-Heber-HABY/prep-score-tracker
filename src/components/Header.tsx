import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, HelpCircle, Facebook, Instagram, Youtube, Twitter, MessageSquare, Mail, History, MessageCircle, Sparkles, Moon, Sun, Menu, X } from 'lucide-react';
import { toast } from "sonner";
import { useTheme } from 'next-themes';
import AISidebar from './AISidebar';

const Header = () => {
  const { language, toggleLanguage, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    toggleLanguage();
    const message = language === 'es' ? 'Language changed to English' : 'Idioma cambiado a Español';
    toast.success(message);
  };

  const handleEmailSupport = () => {
    window.location.href = "mailto:habyopenthedoors@gmail.com";
    toast.success(language === 'es' ? 'Abriendo cliente de correo electrónico' : 'Opening email client');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <AISidebar isOpen={isAISidebarOpen} onClose={() => setIsAISidebarOpen(false)} />
      <motion.header
        className="glass-effect border-b border-white/10 text-white py-3 px-4 sm:py-4 sm:px-6 shadow-xl backdrop-blur-xl relative z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 gradient-primary opacity-80 -z-10"></div>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <motion.img
              src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png"
              alt="HABY Logo"
              className="h-8 sm:h-10 w-auto filter drop-shadow-lg"
              width={28}
              height={40}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">HABY</h1>
              <p className="text-[10px] sm:text-xs text-white/90 hidden sm:block">
                {language === 'es' ? "Calculadora de calificaciones" : "Grade calculator"}
              </p>
            </div>
          </Link>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button onClick={toggleTheme} variant="outline" size="sm"
              className="bg-white/10 hover:bg-white/30 text-white border-white/30"
              title={theme === 'dark' ? (language === 'es' ? 'Modo claro' : 'Light mode') : (language === 'es' ? 'Modo oscuro' : 'Dark mode')}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex gap-2 mr-1">
              {[
                { href: "https://www.facebook.com/zadkiel.garcia.31", icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/habydoors/", icon: Instagram, label: "Instagram" },
                { href: "https://www.youtube.com/@HABYOpenDoors?themeRefresh=1", icon: Youtube, label: "YouTube" },
                { href: "https://x.com/Haby_Open_Doors", icon: Twitter, label: "Twitter" },
                { href: "https://wa.me/5256536812377", icon: MessageSquare, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-white hover:text-white transition-all" title={label} aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <Button onClick={() => setIsAISidebarOpen(true)} size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 btn-glow shadow-lg">
              <Sparkles className="h-4 w-4 mr-1" />
              {language === 'es' ? 'Asistente IA' : 'AI Assistant'}
            </Button>
            <Link to="/chat-calculator">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/30 text-white border-white/30 btn-glow">
                <MessageCircle className="h-4 w-4 mr-1" />
                {language === 'es' ? 'ChatIA' : 'ChatAI'}
              </Button>
            </Link>
            <Link to="/version-history" aria-label={language === 'es' ? 'Historial de versiones' : 'Version history'}>
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/30 text-white border-white/30">
                <History className="h-4 w-4 mr-1" />
                {language === 'es' ? 'Historial' : 'History'}
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={handleEmailSupport}
              className="bg-white/10 hover:bg-white/30 text-white border-white/30"
              title={language === 'es' ? "Soporte técnico" : "Technical support"}>
              <Mail className="h-4 w-4 mr-1" />
              {language === 'es' ? 'Soporte' : 'Support'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLanguageToggle}
              className="bg-white/10 hover:bg-white/30 text-white border-white/30">
              <Globe className="h-4 w-4 mr-1" />
              {language === 'es' ? 'English' : 'Español'}
            </Button>
            <Link to="/guide">
              <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/30 text-white border-white/30">
                <HelpCircle className="h-4 w-4 mr-1" />
                {language === 'es' ? 'Guía' : 'Guide'}
              </Button>
            </Link>
          </div>

          {/* Mobile: key actions + hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <Button onClick={() => setIsAISidebarOpen(true)} size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 h-8 px-2 text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              IA
            </Button>
            <Link to="/chat-calculator">
              <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/30 h-8 px-2 text-xs">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Chat
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white/10 text-white border-white/30 h-8 w-8 p-0"
              aria-label={language === 'es' ? 'Abrir menú' : 'Open menu'}>
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-3 pb-1 flex flex-col gap-2 border-t border-white/20 mt-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => { toggleTheme(); closeMobileMenu(); }}
                    className="bg-white/10 text-white border-white/30 h-8 text-xs flex-1 min-w-[80px]">
                    {theme === 'dark' ? <Sun className="h-3.5 w-3.5 mr-1" /> : <Moon className="h-3.5 w-3.5 mr-1" />}
                    {theme === 'dark' ? (language === 'es' ? 'Claro' : 'Light') : (language === 'es' ? 'Oscuro' : 'Dark')}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { handleLanguageToggle(); closeMobileMenu(); }}
                    className="bg-white/10 text-white border-white/30 h-8 text-xs flex-1 min-w-[80px]">
                    <Globe className="h-3.5 w-3.5 mr-1" />
                    {language === 'es' ? 'English' : 'Español'}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/guide" className="flex-1 min-w-[80px]" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/30 h-8 text-xs w-full">
                      <HelpCircle className="h-3.5 w-3.5 mr-1" />
                      {language === 'es' ? 'Guía' : 'Guide'}
                    </Button>
                  </Link>
                  <Link to="/version-history" className="flex-1 min-w-[80px]" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/30 h-8 text-xs w-full">
                      <History className="h-3.5 w-3.5 mr-1" />
                      {language === 'es' ? 'Historial' : 'History'}
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => { handleEmailSupport(); closeMobileMenu(); }}
                    className="bg-white/10 text-white border-white/30 h-8 text-xs flex-1 min-w-[80px]">
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    {language === 'es' ? 'Soporte' : 'Support'}
                  </Button>
                </div>
                {/* Social links row */}
                <div className="flex justify-center gap-4 py-1">
                  {[
                    { href: "https://www.facebook.com/zadkiel.garcia.31", icon: Facebook, label: "Facebook" },
                    { href: "https://www.instagram.com/habydoors/", icon: Instagram, label: "Instagram" },
                    { href: "https://www.youtube.com/@HABYOpenDoors?themeRefresh=1", icon: Youtube, label: "YouTube" },
                    { href: "https://x.com/Haby_Open_Doors", icon: Twitter, label: "Twitter" },
                    { href: "https://wa.me/5256536812377", icon: MessageSquare, label: "WhatsApp" },
                  ].map(({ href, icon: Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="text-white/80 hover:text-white transition-colors" title={label} aria-label={label}>
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
