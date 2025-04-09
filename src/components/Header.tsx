
import React from 'react';

const Header = () => {
  return (
    <header className="bg-education-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png" 
            alt="HABY Logo" 
            className="h-10 w-auto" 
          />
          <h1 className="text-2xl font-bold">HABY Score Tracker</h1>
        </div>
        <p className="text-sm md:text-base">Calcula tu calificación de forma precisa</p>
      </div>
    </header>
  );
};

export default Header;
