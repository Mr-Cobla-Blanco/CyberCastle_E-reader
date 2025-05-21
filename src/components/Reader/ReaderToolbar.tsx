import React, { useState, useEffect } from 'react';
import { Heart, BookmarkPlus, Highlighter, Share2, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReaderToolbarProps {
  onAddBookmark: () => void;
  onAddHighlight: () => void;
  onShare: () => void;
}

const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  onAddBookmark,
  onAddHighlight,
  onShare,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const handleActivity = () => {
      setIsVisible(true);
      setLastActivity(Date.now());
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    const hideTimer = setInterval(() => {
      if (Date.now() - lastActivity > 3000) {
        setIsVisible(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(hideTimer);
    };
  }, [lastActivity]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 space-y-4"
        >
          <button
            onClick={onAddBookmark}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="Add Bookmark"
          >
            <BookmarkPlus className="h-5 w-5" />
          </button>

          <button
            onClick={onAddHighlight}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="Highlight Text"
          >
            <Highlighter className="h-5 w-5" />
          </button>

          <button
            onClick={onShare}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>

          <div className="w-full h-px bg-gray-200 dark:bg-gray-700" />

          <a
            href="https://ko-fi.com/literaryinsights"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 transition-colors flex flex-col items-center"
            title="Support Us"
          >
            <Coffee className="h-5 w-5" />
            <Heart className="h-3 w-3 mt-1" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReaderToolbar;