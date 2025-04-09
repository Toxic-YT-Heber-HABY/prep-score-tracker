
import React from 'react';

const Header = () => {
  return (
    <header className="bg-education-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prep Score Tracker</h1>
        <p className="text-sm md:text-base">Calcula tu calificación de forma precisa</p>
      </div>
    </header>
  );
};

export default Header;
