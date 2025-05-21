import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart2, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg md:top-0 md:bottom-auto z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">Literary Insights</span>
            </Link>
          </div>
          
          <div className="flex items-center justify-around w-full md:w-auto">
            <Link 
              to="/" 
              className={`flex flex-col items-center px-4 py-2 text-sm font-medium 
                ${isActive('/') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              <Home className="h-5 w-5" />
              <span className="mt-1">Home</span>
              {isActive('/') && (
                <motion.div 
                  className="h-0.5 w-full bg-primary-600 dark:bg-primary-400 absolute bottom-0"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
            
            <Link 
              to="/library" 
              className={`flex flex-col items-center px-4 py-2 text-sm font-medium 
                ${isActive('/library') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="mt-1">Library</span>
              {isActive('/library') && (
                <motion.div 
                  className="h-0.5 w-full bg-primary-600 dark:bg-primary-400 absolute bottom-0"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
            
            <Link 
              to="/analytics" 
              className={`flex flex-col items-center px-4 py-2 text-sm font-medium 
                ${isActive('/analytics') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              <BarChart2 className="h-5 w-5" />
              <span className="mt-1">Analytics</span>
              {isActive('/analytics') && (
                <motion.div 
                  className="h-0.5 w-full bg-primary-600 dark:bg-primary-400 absolute bottom-0"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex flex-col items-center px-4 py-2 text-sm font-medium 
                ${isActive('/settings') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
            >
              <Settings className="h-5 w-5" />
              <span className="mt-1">Settings</span>
              {isActive('/settings') && (
                <motion.div 
                  className="h-0.5 w-full bg-primary-600 dark:bg-primary-400 absolute bottom-0"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;