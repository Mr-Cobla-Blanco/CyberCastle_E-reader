import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../types/Book';
import { mockBooks } from '../data/mockBooks';

interface LibraryContextType {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  getBook: (id: string) => Book | undefined;
  updateBook: (id: string, updates: Partial<Book>) => void;
  loading: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load books from localStorage or use mock data
    const loadBooks = () => {
      try {
        const savedBooks = localStorage.getItem('books');
        if (savedBooks) {
          setBooks(JSON.parse(savedBooks));
        } else {
          // Use mock data for demo
          setBooks(mockBooks);
        }
      } catch (error) {
        console.error('Error loading books:', error);
        setBooks(mockBooks);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    // Save books to localStorage whenever they change
    if (!loading) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books, loading]);

  const addBook = (book: Book) => {
    setBooks(prevBooks => [...prevBooks, book]);
  };

  const removeBook = (id: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const getBook = (id: string) => {
    return books.find(book => book.id === id);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, ...updates } : book
      )
    );
  };

  return (
    <LibraryContext.Provider 
      value={{ 
        books, 
        addBook, 
        removeBook, 
        getBook, 
        updateBook,
        loading
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};