import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings, Bookmark, XCircle, BookOpen } from 'lucide-react';
import { useReader } from '../../contexts/ReaderContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ReaderControlsProps {
  title: string;
  onToggleReaderSettings: () => void;
}

const ReaderControls: React.FC<ReaderControlsProps> = ({ 
  title,
  onToggleReaderSettings,
}) => {
  const navigate = useNavigate();
  const { 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    bookmarks,
    toggleBookmark
  } = useReader();
  const [showControls, setShowControls] = useState(true);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleExitReader = () => {
    navigate('/library');
  };

  const isCurrentPageBookmarked = bookmarks.includes(currentPage);

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-x-0 z-10"
        >
          {/* Top bar */}
          <div className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-3 px-4 z-10">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleExitReader}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <XCircle className="h-5 w-5" />
              </button>
              
              <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate mx-2">{title}</h2>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleBookmark(currentPage)}
                  className={`p-2 rounded-full ${
                    isCurrentPageBookmarked 
                      ? 'text-accent-500 dark:text-accent-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button 
                  onClick={onToggleReaderSettings}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm py-3 px-4 z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <BookOpen className="h-3 w-3 mr-1" />
                {Math.round((currentPage / totalPages) * 100)}% complete
              </span>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex-1 mx-2">
                <input
                  type="range"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <button 
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReaderControls;