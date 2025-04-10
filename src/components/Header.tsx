
import React from 'react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage } = useI18n();
  
  return (
    <header className="bg-gradient-to-r from-education-primary to-education-secondary text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <img src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" alt="HABY Logo" className="h-10 w-auto filter drop-shadow-md" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">HABY</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleLanguage}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            <Globe className="h-4 w-4 mr-1" />
            {language === 'es' ? 'English' : 'Español'}
          </Button>
          <p className="text-sm md:text-base opacity-90">
            {language === 'es' ? 'Calcula tu calificación de forma precisa' : 'Calculate your grade accurately'}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
