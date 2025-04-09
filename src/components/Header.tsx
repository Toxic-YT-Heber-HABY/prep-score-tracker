import React from 'react';
const Header = () => {
  return <header className="bg-gradient-to-r from-education-primary to-education-secondary text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" alt="HABY Logo" className="h-10 w-auto filter drop-shadow-md" />
          <h1 className="text-2xl font-bold tracking-tight">HABY 
Introduces Qualification Calculator</h1>
        </div>
        <p className="text-sm md:text-base opacity-90">Calcula tu calificación de forma precisa</p>
      </div>
    </header>;
};
export default Header;