'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check if there's a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme') as Theme;
    // Check if there's a system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const root = window.document.documentElement;
    if (storedTheme) {
      setTheme(storedTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(storedTheme);
    } else {
      setTheme(systemTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    }
  }, []);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      const root = window.document.documentElement;
      localStorage.setItem('theme', newTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
      setTheme(newTheme);
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}