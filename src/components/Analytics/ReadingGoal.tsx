import React from 'react';
import { Trophy, Target, Check, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReadingGoalProps {
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  unit: 'minutes' | 'words' | 'pages' | 'books';
}

const ReadingGoal: React.FC<ReadingGoalProps> = ({
  type,
  target,
  progress,
  unit,
}) => {
  const percentage = Math.min(Math.round((progress / target) * 100), 100);
  
  const getIcon = () => {
    switch (type) {
      case 'daily':
        return <Target className="h-5 w-5 text-accent-500" />;
      case 'weekly':
        return <Calendar className="h-5 w-5 text-secondary-500" />;
      case 'monthly':
        return <Trophy className="h-5 w-5 text-primary-500" />;
      default:
        return <Target className="h-5 w-5 text-accent-500" />;
    }
  };
  
  const getTypeName = () => {
    switch (type) {
      case 'daily':
        return 'Daily';
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      default:
        return 'Custom';
    }
  };
  
  const getUnitLabel = () => {
    switch (unit) {
      case 'minutes':
        return 'minutes';
      case 'words':
        return 'words';
      case 'pages':
        return 'pages';
      case 'books':
        return 'books';
      default:
        return unit;
    }
  };
  
  const isComplete = percentage >= 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {getTypeName()} Goal
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {target} {getUnitLabel()}
            </p>
          </div>
        </div>
        
        {isComplete && (
          <div className="p-1 rounded-full bg-success-100 dark:bg-success-900/30">
            <Check className="h-4 w-4 text-success-600 dark:text-success-400" />
          </div>
        )}
      </div>
      
      <div className="relative pt-1">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {progress} of {target} {getUnitLabel()}
          </div>
          <div className="text-xs font-medium text-gray-900 dark:text-white">
            {percentage}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div 
            className={`h-2 rounded-full ${
              isComplete ? 'bg-success-500' : 'bg-primary-500'
            }`}
            style={{ width: '0%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingGoal;