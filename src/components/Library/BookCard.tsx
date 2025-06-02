import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, MoreVertical } from 'lucide-react';
import { Book as BookType } from '../../types/Book';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: BookType;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const formatReadingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div 
      className="book-card"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="book-spine" />
      <Link to={`/reader/${book.id}`} className="block h-full">
        <div className="relative pb-[140%]">
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex gap-1 items-center text-xs mb-1">
                <Book className="h-3 w-3" />
                <span>{book.format.toUpperCase()}</span>
                <span className="mx-1">•</span>
                <span>{book.fileSize}</span>
              </div>
              
              <div className="flex gap-1 items-center text-xs">
                <Clock className="h-3 w-3" />
                <span>{formatReadingTime(book.totalReadingTime)}</span>
                <span className="mx-1">•</span>
                <span>{Math.round(book.readingProgress * 100)}% complete</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-primary-900 dark:text-primary-100 line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 mt-1 font-display italic">
            {book.author}
          </p>
          
          <div className="mt-3 bg-primary-100 dark:bg-primary-900/30 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 dark:bg-primary-500 rounded-full"
              style={{ width: `${book.readingProgress * 100}%` }}
            ></div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-primary-500 dark:text-primary-400 font-display">
              {book.currentPage} of {book.totalPages} pages
            </span>
            
            <button 
              className="p-1 text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                // Add book options menu handler here
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};