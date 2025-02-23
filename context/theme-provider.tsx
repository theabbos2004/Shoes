'use client';

import { screenType } from '@/types';
import React, { createContext, useEffect, useState } from 'react';

interface ValueType {
  theme: 'light' | 'dark',
  switchTheme:()=>Promise<'light' | 'dark'>,
  screen:screenType
}

export const ThemeContext = createContext<ValueType>({ theme: 'light',switchTheme:async ()=>'light',screen:{width: 0, height: 0}});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [screen, setScreen] = useState<screenType>({width: 0, height: 0});

  useEffect(() => {
    const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);
  
  useEffect(() => {
    const handleScreen = () => {
      setScreen({ width: window.innerWidth, height: window.innerHeight });
    };
    handleScreen();
    window.addEventListener("resize", handleScreen);
    return () => {
      window.removeEventListener("resize", handleScreen);
    };
  }, []);
  
  const switchTheme = async () => {
    const newTheme = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    return newTheme;
  };
  
  const value: ValueType = { theme , switchTheme, screen };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
