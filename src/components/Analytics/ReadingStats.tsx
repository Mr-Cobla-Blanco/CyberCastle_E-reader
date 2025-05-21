import React from 'react';
import { BookOpen, FileText, Zap, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingStatsProps {
  minutesRead: number;
  pagesRead: number;
  wordsRead: number;
  averageWpm: number;
  period: string;
}

const ReadingStats: React.FC<ReadingStatsProps> = ({
  minutesRead,
  pagesRead,
  wordsRead,
  averageWpm,
  period,
}) => {
  const stats = [
    {
      label: 'Pages Read',
      value: pagesRead,
      icon: BookOpen,
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/40',
    },
    {
      label: 'Words Read',
      value: wordsRead.toLocaleString(),
      icon: FileText,
      color: 'text-secondary-600 dark:text-secondary-400',
      bgColor: 'bg-secondary-100 dark:bg-secondary-900/40',
    },
    {
      label: 'Average Speed',
      value: `${averageWpm} WPM`,
      icon: Zap,
      color: 'text-accent-600 dark:text-accent-400',
      bgColor: 'bg-accent-100 dark:bg-accent-900/40',
    },
    {
      label: 'Reading Time',
      value: `${Math.round(minutesRead)}m`,
      icon: Clock,
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/40',
    },
  ];

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
        {period} Reading Summary
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg p-3 bg-white dark:bg-gray-750 border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${stat.bgColor} mr-3`}>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingStats;