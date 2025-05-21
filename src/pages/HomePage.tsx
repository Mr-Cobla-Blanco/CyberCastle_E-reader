import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Clock, Upload, BarChart2 } from 'lucide-react';
import Navbar from '../components/Navigation/Navbar';
import { useLibrary } from '../contexts/LibraryContext';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { books } = useLibrary();
  
  // Calculate statistics
  const totalBooks = books.length;
  const finishedBooks = books.filter(book => book.readingProgress >= 0.98).length;
  const inProgressBooks = books.filter(book => book.readingProgress > 0 && book.readingProgress < 0.98).length;
  
  // Get current book (most recently opened)
  const currentBook = books.length > 0 
    ? [...books].sort((a, b) => {
        if (!a.lastOpenedDate) return 1;
        if (!b.lastOpenedDate) return -1;
        return new Date(b.lastOpenedDate).getTime() - new Date(a.lastOpenedDate).getTime();
      })[0]
    : null;
  
  // Recently added books
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Literary Insights</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-primary-100 dark:bg-primary-900/20 rounded-xl p-6 flex items-center gap-4"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 bg-primary-200 dark:bg-primary-800 rounded-full">
              <BookOpen className="h-6 w-6 text-primary-700 dark:text-primary-300" />
            </div>
            <div>
              <p className="text-sm text-primary-600 dark:text-primary-400">Total Books</p>
              <p className="text-2xl font-bold text-primary-800 dark:text-primary-200">{totalBooks}</p>
              <div className="flex gap-1 mt-1">
                <span className="text-xs text-primary-600 dark:text-primary-400">{finishedBooks} finished</span>
                <span className="text-xs text-primary-600 dark:text-primary-400">•</span>
                <span className="text-xs text-primary-600 dark:text-primary-400">{inProgressBooks} in progress</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-accent-100 dark:bg-accent-900/20 rounded-xl p-6 flex items-center gap-4"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="p-3 bg-accent-200 dark:bg-accent-800 rounded-full">
              <Clock className="h-6 w-6 text-accent-700 dark:text-accent-300" />
            </div>
            <div>
              <p className="text-sm text-accent-600 dark:text-accent-400">Reading Time</p>
              <p className="text-2xl font-bold text-accent-800 dark:text-accent-200">
                {books.reduce((total, book) => total + book.totalReadingTime, 0) / 60 < 1 
                  ? '< 1 hour' 
                  : `${Math.floor(books.reduce((total, book) => total + book.totalReadingTime, 0) / 60)} hours`}
              </p>
              <p className="text-xs text-accent-600 dark:text-accent-400 mt-1">
                Across all your books
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-secondary-100 dark:bg-secondary-900/20 rounded-xl p-6 flex items-center gap-4"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="p-3 bg-secondary-200 dark:bg-secondary-800 rounded-full">
              <BarChart2 className="h-6 w-6 text-secondary-700 dark:text-secondary-300" />
            </div>
            <div>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Reading Streak</p>
              <p className="text-2xl font-bold text-secondary-800 dark:text-secondary-200">3 days</p>
              <p className="text-xs text-secondary-600 dark:text-secondary-400 mt-1">
                Keep it going!
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Current book */}
        {currentBook && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Continue Reading</h2>
              <Link to="/library" className="text-sm text-primary-600 dark:text-primary-400 flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Link to={`/reader/${currentBook.id}`}>
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex">
                  <div className="w-1/4 md:w-1/6">
                    <div className="relative pb-[150%]">
                      <img 
                        src={currentBook.coverUrl} 
                        alt={currentBook.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{currentBook.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{currentBook.author}</p>
                    
                    <div className="mb-3">
                      <div className="relative pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {currentBook.currentPage} of {currentBook.totalPages} pages
                          </div>
                          <div className="text-xs font-medium text-gray-900 dark:text-white">
                            {Math.round(currentBook.readingProgress * 100)}%
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                          <div 
                            style={{ width: `${currentBook.readingProgress * 100}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors">
                        Continue Reading
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        )}
        
        {/* Quick actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/library">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-3" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Browse Library</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">View all your books</p>
              </motion.div>
            </Link>
            
            <Link to="/library?upload=true">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Upload className="h-8 w-8 text-accent-600 dark:text-accent-400 mb-3" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">Upload Book</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Add a new ebook</p>
              </motion.div>
            </Link>
            
            <Link to="/analytics">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <BarChart2 className="h-8 w-8 text-secondary-600 dark:text-secondary-400 mb-3" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">View Analytics</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Track your reading habits</p>
              </motion.div>
            </Link>
          </div>
        </div>
        
        {/* Recently added */}
        {recentBooks.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recently Added</h2>
              <Link to="/library" className="text-sm text-primary-600 dark:text-primary-400 flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recentBooks.map((book, index) => (
                <Link to={`/reader/${book.id}`} key={book.id}>
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="relative pb-[140%]">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{book.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">{book.author}</p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>{book.format.toUpperCase()}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;