import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '../contexts/LibraryContext';
import { useReader } from '../contexts/ReaderContext';
import ReaderControls from '../components/Reader/ReaderControls';
import ReaderSettings from '../components/Reader/ReaderSettings';
import ReaderToolbar from '../components/Reader/ReaderToolbar';
import { motion, AnimatePresence } from 'framer-motion';

const ReaderPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { getBook, updateBook } = useLibrary();
  const { 
    currentPage, 
    setCurrentPage, 
    setTotalPages, 
    readingPreferences, 
    startSession, 
    endSession,
    updateReadingTime,
    updateWordsRead,
    toggleBookmark,
  } = useReader();
  
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(getBook(bookId || ''));
  const [showSettings, setShowSettings] = useState(false);
  const [lastTimeUpdate, setLastTimeUpdate] = useState(Date.now());
  const [selectedText, setSelectedText] = useState('');
  
  // Mock content for demonstration
  const sampleText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
    
    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
  `;
  
  useEffect(() => {
    if (!book) {
      navigate('/library');
      return;
    }
    
    setCurrentPage(book.currentPage || 1);
    setTotalPages(book.totalPages);
    setIsLoading(false);
    
    startSession(book.id);
    
    updateBook(book.id, {
      lastOpenedDate: new Date().toISOString().split('T')[0]
    });
    
    const interval = setInterval(() => {
      const now = Date.now();
      const secondsElapsed = Math.floor((now - lastTimeUpdate) / 1000);
      
      if (secondsElapsed > 0) {
        updateReadingTime(secondsElapsed);
        setLastTimeUpdate(now);
        
        const wordsRead = Math.floor((secondsElapsed / 60) * 200);
        if (wordsRead > 0) {
          updateWordsRead(wordsRead);
        }
      }
    }, 5000);
    
    return () => {
      clearInterval(interval);
      endSession();
      
      if (book) {
        updateBook(book.id, {
          currentPage,
          readingProgress: currentPage / book.totalPages,
          totalReadingTime: book.totalReadingTime + Math.floor((Date.now() - lastTimeUpdate) / 1000)
        });
      }
    };
  }, [book?.id]);
  
  useEffect(() => {
    if (book) {
      setBook({
        ...book,
        currentPage,
        readingProgress: currentPage / book.totalPages
      });
    }
  }, [currentPage]);

  const handleAddBookmark = () => {
    toggleBookmark(currentPage);
  };

  const handleAddHighlight = () => {
    if (selectedText) {
      // Add highlight logic here
      console.log('Highlighting:', selectedText);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: `Check out "${book?.title}" by ${book?.author}`,
        url: window.location.href,
      });
    }
  };
  
  const getReaderThemeClasses = () => {
    switch (readingPreferences.theme) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'sepia':
        return 'bg-amber-50 text-gray-900';
      default:
        return 'bg-gray-50 text-gray-900';
    }
  };
  
  const getMarginClasses = () => {
    switch (readingPreferences.margins) {
      case 'small':
        return 'px-4 md:px-8';
      case 'large':
        return 'px-8 md:px-32';
      default:
        return 'px-6 md:px-20';
    }
  };

  if (isLoading || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getReaderThemeClasses()}`}>
      <ReaderControls
        title={book.title}
        onToggleReaderSettings={() => setShowSettings(true)}
      />
      
      <ReaderToolbar
        onAddBookmark={handleAddBookmark}
        onAddHighlight={handleAddHighlight}
        onShare={handleShare}
      />
      
      <AnimatePresence>
        {showSettings && (
          <ReaderSettings onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
      
      <div 
        className={`container mx-auto py-24 ${getMarginClasses()}`}
        onMouseUp={() => setSelectedText(window.getSelection()?.toString() || '')}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 
            className={`text-2xl mb-2 font-${readingPreferences.fontFamily} font-bold`}
          >
            {book.title}
          </h1>
          <h2 
            className={`text-lg mb-8 font-${readingPreferences.fontFamily} text-gray-600 dark:text-gray-400`}
          >
            {book.author}
          </h2>
          
          <div 
            className={`
              font-${readingPreferences.fontFamily}
              text-${readingPreferences.fontSize}
              leading-[${readingPreferences.lineHeight}]
              mb-16
            `}
          >
            {sampleText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReaderPage;