export interface ReadingPreferences {
  fontSize: string;
  fontFamily: 'serif' | 'sans';
  lineHeight: string;
  theme: 'light' | 'dark' | 'sepia';
  margins: 'small' | 'medium' | 'large';
}

export interface Highlight {
  id: string;
  bookId: string;
  page: number;
  text: string;
  color: string;
  createdAt: string;
  note?: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  createdAt: string;
  note?: string;
}

export interface ReadingSession {
  id: string;
  bookId: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: number; // in seconds
  startPage?: number;
  pagesRead: number;
  wordsRead: number;
  wpm: number; // words per minute
}

export interface ReadingGoal {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  unit: 'minutes' | 'pages' | 'words' | 'books';
}

export interface ReadingStats {
  day: string;
  minutesRead: number;
  pagesRead: number;
  wordsRead: number;
  averageWpm: number;
}