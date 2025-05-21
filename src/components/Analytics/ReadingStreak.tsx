import React from 'react';
import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingStreakProps {
  currentStreak: number;
  longestStreak: number;
  streakDays: string[];
}

const ReadingStreak: React.FC<ReadingStreakProps> = ({
  currentStreak,
  longestStreak,
  streakDays,
}) => {
  // Get the current week's days
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Organize days with their status (read or not)
  const days = weekDays.map((day, index) => {
    const dayDate = new Date(today);
    dayDate.setDate(today.getDate() - dayOfWeek + index);
    const dateString = dayDate.toISOString().split('T')[0];
    
    return {
      name: day,
      date: dateString,
      isToday: index === dayOfWeek,
      hasActivity: streakDays.includes(dateString),
      isPast: index < dayOfWeek,
      isFuture: index > dayOfWeek,
    };
  });

  const variant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-accent-100 dark:bg-accent-900/30">
          <Flame className="h-5 w-5 text-accent-600 dark:text-accent-400" />
        </div>
        <h3 className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
          Reading Streak
        </h3>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-600 dark:text-accent-500">
            {currentStreak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Current Streak
          </div>
        </div>
        
        <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {longestStreak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Longest Streak
          </div>
        </div>
      </div>
      
      <div className="flex justify-between px-1">
        {days.map((day, i) => (
          <motion.div 
            key={day.name}
            className="flex flex-col items-center"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={variant}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {day.name}
            </div>
            
            <div 
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${day.isToday ? 'border-2 border-primary-500 dark:border-primary-400' : ''}
                ${day.hasActivity 
                  ? 'bg-accent-100 dark:bg-accent-900/30' 
                  : day.isPast 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-gray-50 dark:bg-gray-800'
                }
              `}
            >
              {day.hasActivity && (
                <Flame className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReadingStreak;