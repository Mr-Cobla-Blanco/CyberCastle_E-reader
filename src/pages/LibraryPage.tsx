import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X, ChevronDown, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navigation/Navbar';
import BookCard from '../components/Library/BookCard';
import BookUpload from '../components/Library/BookUpload';
import { useLibrary } from '../contexts/LibraryContext';
import { BookFormat } from '../types/Book';
import { motion, AnimatePresence } from 'framer-motion';

const LibraryPage: React.FC = () => {
  const location = useLocation();
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showUpload, setShowUpload] = useState(location.search.includes('upload=true'));
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'author' | 'progress'>('recent');
  
  // Filter and sort books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFormat = selectedFormat === 'all' || book.format === selectedFormat;
    
    return matchesSearch && matchesFormat;
  });
  
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'progress':
        return b.readingProgress - a.readingProgress;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-0 md:pt-20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Library</h1>
          
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
            
            <button 
              onClick={() => setShowUpload(!showUpload)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors"
            >
              <UploadCloud className="h-4 w-4" />
              Upload
            </button>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="recent">Recently Added</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="progress">Reading Progress</option>
            </select>
          </div>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedFormat('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFormat === 'all'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  All Formats
                </button>
                <button
                  onClick={() => setSelectedFormat(BookFormat.EPUB)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFormat === BookFormat.EPUB
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  EPUB
                </button>
                <button
                  onClick={() => setSelectedFormat(BookFormat.PDF)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFormat === BookFormat.PDF
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  PDF
                </button>
                <button
                  onClick={() => setSelectedFormat(BookFormat.MOBI)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFormat === BookFormat.MOBI
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  MOBI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showUpload && (
            <motion.div 
              className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upload New Books</h2>
                <button 
                  onClick={() => setShowUpload(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <BookUpload />
            </motion.div>
          )}
        </AnimatePresence>
        
        {sortedBooks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <UploadCloud className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No books found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery || selectedFormat !== 'all' 
                ? "No books match your search criteria. Try adjusting your filters."
                : "Your library is empty. Upload ebooks to get started."}
            </p>
            {!showUpload && (
              <button 
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md inline-flex items-center gap-1"
              >
                <UploadCloud className="h-4 w-4" />
                Upload Books
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryPage;