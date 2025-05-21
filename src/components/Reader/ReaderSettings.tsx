import React from 'react';
import { X, Type, AlignLeft, Sun, Moon, Palette } from 'lucide-react';
import { useReader } from '../../contexts/ReaderContext';
import { motion } from 'framer-motion';

interface ReaderSettingsProps {
  onClose: () => void;
}

const ReaderSettings: React.FC<ReaderSettingsProps> = ({ onClose }) => {
  const { readingPreferences, updateReadingPreferences } = useReader();
  
  const fontSizes = [
    { label: 'Small', value: 'reading-sm' },
    { label: 'Medium', value: 'reading-base' },
    { label: 'Large', value: 'reading-lg' },
    { label: 'X-Large', value: 'reading-xl' },
    { label: '2X-Large', value: 'reading-2xl' },
  ];
  
  const lineHeights = [
    { label: 'Tight', value: '1.4' },
    { label: 'Normal', value: '1.6' },
    { label: 'Relaxed', value: '1.8' },
    { label: 'Loose', value: '2.0' },
  ];
  
  const themes = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'Sepia', value: 'sepia', icon: Palette },
  ];
  
  const margins = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-20 bg-white dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="container mx-auto p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Reading Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Font</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Family
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateReadingPreferences({ fontFamily: 'serif' })}
                    className={`px-4 py-2 rounded-md text-sm flex-1 ${
                      readingPreferences.fontFamily === 'serif'
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <span className="font-serif">Serif</span>
                  </button>
                  
                  <button
                    onClick={() => updateReadingPreferences({ fontFamily: 'sans' })}
                    className={`px-4 py-2 rounded-md text-sm flex-1 ${
                      readingPreferences.fontFamily === 'sans'
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <span className="font-sans">Sans-serif</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => updateReadingPreferences({ fontSize: size.value })}
                      className={`px-3 py-2 rounded-md text-xs ${
                        readingPreferences.fontSize === size.value
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlignLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Layout</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Line Spacing
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {lineHeights.map((lineHeight) => (
                    <button
                      key={lineHeight.value}
                      onClick={() => updateReadingPreferences({ lineHeight: lineHeight.value })}
                      className={`px-3 py-2 rounded-md text-xs ${
                        readingPreferences.lineHeight === lineHeight.value
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {lineHeight.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Margins
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {margins.map((margin) => (
                    <button
                      key={margin.value}
                      onClick={() => updateReadingPreferences({ margins: margin.value })}
                      className={`px-3 py-2 rounded-md text-xs ${
                        readingPreferences.margins === margin.value
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {margin.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => {
                const IconComponent = theme.icon;
                return (
                  <button
                    key={theme.value}
                    onClick={() => updateReadingPreferences({ theme: theme.value as any })}
                    className={`p-3 rounded-md flex flex-col items-center ${
                      readingPreferences.theme === theme.value
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mb-1" />
                    <span className="text-xs">{theme.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default ReaderSettings;