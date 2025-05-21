import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReadingSession, ReadingPreferences, Highlight } from '../types/Reader';
import { format } from 'date-fns';

interface ReaderContextType {
  currentPage: number;
  totalPages: number;
  readingTime: number;
  wordsRead: number;
  highlights: Highlight[];
  bookmarks: number[];
  readingPreferences: ReadingPreferences;
  readingSessions: ReadingSession[];
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  updateReadingTime: (seconds: number) => void;
  updateWordsRead: (words: number) => void;
  addHighlight: (highlight: Highlight) => void;
  removeHighlight: (id: string) => void;
  toggleBookmark: (page: number) => void;
  updateReadingPreferences: (prefs: Partial<ReadingPreferences>) => void;
  startSession: (bookId: string) => void;
  endSession: () => void;
  currentSession: ReadingSession | null;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const useReader = () => {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error('useReader must be used within a ReaderProvider');
  }
  return context;
};

const defaultPreferences: ReadingPreferences = {
  fontSize: 'reading-base',
  fontFamily: 'serif',
  lineHeight: '1.8',
  theme: 'light',
  margins: 'medium',
};

interface ReaderProviderProps {
  children: ReactNode;
}

export const ReaderProvider: React.FC<ReaderProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>(defaultPreferences);
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null);

  const updateReadingTime = (seconds: number) => {
    setReadingTime(prev => prev + seconds);
    if (currentSession) {
      setCurrentSession(prev => {
        if (!prev) return null;
        return { ...prev, duration: (prev.duration || 0) + seconds };
      });
    }
  };

  const updateWordsRead = (words: number) => {
    setWordsRead(prev => prev + words);
    if (currentSession) {
      setCurrentSession(prev => {
        if (!prev) return null;
        return { ...prev, wordsRead: (prev.wordsRead || 0) + words };
      });
    }
  };

  const addHighlight = (highlight: Highlight) => {
    setHighlights(prev => [...prev, highlight]);
  };

  const removeHighlight = (id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const toggleBookmark = (page: number) => {
    setBookmarks(prev => {
      if (prev.includes(page)) {
        return prev.filter(p => p !== page);
      } else {
        return [...prev, page];
      }
    });
  };

  const updateReadingPreferences = (prefs: Partial<ReadingPreferences>) => {
    setReadingPreferences(prev => ({ ...prev, ...prefs }));
  };

  const startSession = (bookId: string) => {
    const session: ReadingSession = {
      id: `session-${Date.now()}`,
      bookId,
      startTime: new Date().toISOString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      duration: 0,
      pagesRead: 0,
      wordsRead: 0,
      wpm: 0,
    };
    setCurrentSession(session);
  };

  const endSession = () => {
    if (currentSession) {
      const finalSession = {
        ...currentSession,
        endTime: new Date().toISOString(),
        pagesRead: currentPage - (currentSession.startPage || 1),
        wpm: currentSession.wordsRead ? Math.round((currentSession.wordsRead / (currentSession.duration / 60))) : 0
      };
      
      setReadingSessions(prev => [...prev, finalSession]);
      setCurrentSession(null);
      
      // Save to localStorage
      try {
        const savedSessions = localStorage.getItem('readingSessions');
        const sessions = savedSessions ? JSON.parse(savedSessions) : [];
        localStorage.setItem('readingSessions', JSON.stringify([...sessions, finalSession]));
      } catch (error) {
        console.error('Error saving reading session:', error);
      }
    }
  };

  return (
    <ReaderContext.Provider
      value={{
        currentPage,
        totalPages,
        readingTime,
        wordsRead,
        highlights,
        bookmarks,
        readingPreferences,
        readingSessions,
        currentSession,
        setCurrentPage,
        setTotalPages,
        updateReadingTime,
        updateWordsRead,
        addHighlight,
        removeHighlight,
        toggleBookmark,
        updateReadingPreferences,
        startSession,
        endSession,
      }}
    >
      {children}
    </ReaderContext.Provider>
  );
};