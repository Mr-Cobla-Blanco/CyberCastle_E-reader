import React, { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-gray-700 dark:text-gray-300">
          {icon}
        </div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;