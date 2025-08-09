'use client';

import { Moon, Sun, Settings, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

export default function Header({ onClearChat, messageCount }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('neurachat-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('neurachat-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('neurachat-theme', 'light');
    }
  };

  return (
    <header className="glass border-b border-glass-border">
      <div className="flex items-center justify-between p-3 sm:p-4">
        {/* Logo and title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo size="md" className="transition-transform duration-300 hover:scale-105" />
          <div className="hidden xs:block">
            <h1 className="text-base sm:text-lg font-semibold text-foreground">NeuraChat</h1>
            <p className="text-xs opacity-60 hidden sm:block">AI Assistant</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Message count - hidden on small screens when space is tight */}
          {messageCount > 0 && (
            <div className="hidden sm:block glass px-2 sm:px-3 py-1 rounded-full">
              <span className="text-xs font-medium">{messageCount} messages</span>
            </div>
          )}

          {/* Clear chat button */}
          {messageCount > 0 && (
            <button
              onClick={onClearChat}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass glass-button flex items-center justify-center group"
              title="Clear chat"
            >
              <RotateCcw size={14} className="sm:w-4 sm:h-4 text-red-400 group-hover:text-red-300 transition-colors" />
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass glass-button flex items-center justify-center group"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? 
              <Sun size={14} className="sm:w-4 sm:h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" /> : 
              <Moon size={14} className="sm:w-4 sm:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
            }
          </button>

          {/* Settings button - hidden on very small screens */}
          <button
            className="hidden xs:flex w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass glass-button items-center justify-center group"
            title="Settings"
          >
            <Settings size={14} className="sm:w-4 sm:h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
