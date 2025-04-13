
import React from "react";
import { Facebook, Instagram, Youtube, Twitter, MessageSquare, Mail } from 'lucide-react';
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { Link } from "react-router-dom";

/**
 * Footer component with social media links
 */
const Footer = () => {
  const { language } = useI18n();
  
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
    <footer className="bg-white dark:bg-gray-800 py-6 border-t dark:border-gray-700 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
              alt="HABY Logo" 
              className="h-8 w-auto mr-2" 
            />
            <span className="text-education-primary font-semibold dark:text-education-secondary">HABY</span>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-3">
              <a href="https://www.facebook.com/zadkiel.garcia.31" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/habydoors/" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@HABYOpenDoors?themeRefresh=1" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://x.com/Haby_Open_Doors" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/5221565368123" target="_blank" rel="noopener noreferrer" 
                className="text-education-primary hover:text-education-secondary transition-colors" title="WhatsApp">
                <MessageSquare size={20} />
              </a>
              <button onClick={handleEmailSupport} 
                className="text-education-primary hover:text-education-secondary transition-colors" title={language === 'es' ? "Soporte técnico" : "Technical support"}>
                <Mail size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} HABY Score Tracker - Desarrollado por <span className="font-medium">Heber Zadkiel García Pérez</span>
            </p>
            <div className="flex gap-3 mt-2">
              <Link to="/terms" className="text-xs text-education-primary hover:underline">
                {language === 'es' ? "Términos y condiciones" : "Terms and conditions"}
              </Link>
              <Link to="/privacy" className="text-xs text-education-primary hover:underline">
                {language === 'es' ? "Política de privacidad" : "Privacy policy"}
              </Link>
              <Link to="/contact" className="text-xs text-education-primary hover:underline">
                {language === 'es' ? "Contacto" : "Contact"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
