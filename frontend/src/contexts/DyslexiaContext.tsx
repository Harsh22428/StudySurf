'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DyslexiaContextType {
  isDyslexiaMode: boolean;
  toggleDyslexiaMode: (enabled: boolean) => void;
}

const DyslexiaContext = createContext<DyslexiaContextType | undefined>(undefined);

export const DyslexiaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDyslexiaMode, setIsDyslexiaMode] = useState(true); // Default from user preferences

  const toggleDyslexiaMode = (enabled: boolean) => {
    setIsDyslexiaMode(enabled);
  };

  return (
    <DyslexiaContext.Provider value={{ isDyslexiaMode, toggleDyslexiaMode }}>
      {children}
    </DyslexiaContext.Provider>
  );
};

export const useDyslexia = () => {
  const context = useContext(DyslexiaContext);
  if (!context) {
    throw new Error('useDyslexia must be used within DyslexiaProvider');
  }
  return context;
};