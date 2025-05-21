import React from 'react';
import { User, Bell, Eye, Book, Lock, Download, UploadCloud, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navigation/Navbar';
import SettingsSection from '../components/Settings/SettingsSection';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>
        
        <SettingsSection 
          title="Appearance" 
          icon={<Eye className="h-5 w-5" />}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Switch between light and dark themes
                  </p>
                </div>
                
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle" 
                    id="theme-toggle" 
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  />
                  <label 
                    htmlFor="theme-toggle" 
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Font Size</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Adjust interface text size
                  </p>
                </div>
                
                <select className="rounded-md text-sm py-1 px-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
        </SettingsSection>
        
        <SettingsSection 
          title="Reading Preferences" 
          icon={<Book className="h-5 w-5" />}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Default View</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Choose default reading layout
                  </p>
                </div>
                
                <select className="rounded-md text-sm py-1 px-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option selected>Single Page</option>
                  <option>Two Pages</option>
                  <option>Scrolling</option>
                </select>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Auto-sync Progress</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Automatically sync reading position
                  </p>
                </div>
                
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle-sync" 
                    id="toggle-sync" 
                    checked={true}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  />
                  <label 
                    htmlFor="toggle-sync" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-600 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Analytics Tracking</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Collect reading activity data
                  </p>
                </div>
                
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle-analytics" 
                    id="toggle-analytics" 
                    checked={true}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  />
                  <label 
                    htmlFor="toggle-analytics" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-600 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>
        
        <SettingsSection 
          title="Notifications" 
          icon={<Bell className="h-5 w-5" />}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Reading Reminders</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Get reminders to reach your goals
                  </p>
                </div>
                
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle-reminders" 
                    id="toggle-reminders" 
                    checked={true}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  />
                  <label 
                    htmlFor="toggle-reminders" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-600 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Achievement Alerts</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Notifications when you reach milestones
                  </p>
                </div>
                
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    name="toggle-achievements" 
                    id="toggle-achievements" 
                    checked={true}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" 
                  />
                  <label 
                    htmlFor="toggle-achievements" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-600 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </SettingsSection>
        
        <SettingsSection 
          title="Data Management" 
          icon={<Download className="h-5 w-5" />}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="py-4 px-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Export Data</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                  Download your reading data in CSV format
                </p>
                <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-md inline-flex items-center">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Export Reading Data
                </button>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Backup Library</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                  Create a backup of your entire ebook collection
                </p>
                <button className="px-3 py-1.5 bg-secondary-600 hover:bg-secondary-700 text-white text-xs font-medium rounded-md inline-flex items-center">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Backup Library
                </button>
              </div>
            </div>
            
            <div className="py-4 px-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Import Data</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                  Restore from a previous backup
                </p>
                <button className="px-3 py-1.5 bg-accent-600 hover:bg-accent-700 text-white text-xs font-medium rounded-md inline-flex items-center">
                  <UploadCloud className="h-3.5 w-3.5 mr-1" />
                  Import Backup
                </button>
              </div>
            </div>
          </div>
        </SettingsSection>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Literary Insights v0.1.0 • © 2025 • <a href="#" className="text-primary-600 dark:text-primary-400">Privacy Policy</a> • <a href="#" className="text-primary-600 dark:text-primary-400">Terms of Service</a>
          </p>
        </div>
      </main>
      
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3b82f6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3b82f6;
        }
        .toggle-checkbox {
          right: 0;
          z-index: 1;
          border-color: #d1d5db;
          top: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;