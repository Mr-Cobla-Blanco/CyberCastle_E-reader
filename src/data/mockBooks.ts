import { Book, BookFormat } from '../types/Book';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverUrl: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=600',
    format: BookFormat.EPUB,
    totalPages: 432,
    currentPage: 156,
    addedDate: '2023-12-01',
    lastOpenedDate: '2023-12-15',
    description: 'Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome the titular sins of pride and prejudice in order to fall in love and marry.',
    fileSize: '2.4 MB',
    readingProgress: 0.36,
    totalReadingTime: 345,
    categories: ['Classic', 'Romance'],
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600',
    format: BookFormat.PDF,
    totalPages: 281,
    currentPage: 281,
    addedDate: '2023-11-15',
    lastOpenedDate: '2023-12-10',
    description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
    fileSize: '3.1 MB',
    readingProgress: 1,
    totalReadingTime: 412,
    categories: ['Classic', 'Fiction'],
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=600',
    format: BookFormat.MOBI,
    totalPages: 180,
    currentPage: 24,
    addedDate: '2023-12-05',
    lastOpenedDate: '2023-12-07',
    description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    fileSize: '1.8 MB',
    readingProgress: 0.13,
    totalReadingTime: 45,
    categories: ['Classic', 'Fiction'],
  },
  {
    id: '4',
    title: 'Hamlet',
    author: 'William Shakespeare',
    coverUrl: 'https://images.pexels.com/photos/2228555/pexels-photo-2228555.jpeg?auto=compress&cs=tinysrgb&w=600',
    format: BookFormat.EPUB,
    totalPages: 342,
    currentPage: 104,
    addedDate: '2023-10-20',
    lastOpenedDate: '2023-12-12',
    description: 'The Tragedy of Hamlet, Prince of Denmark, often shortened to Hamlet, is a tragedy written by William Shakespeare sometime between 1599 and 1601. It is Shakespeare\'s longest play, with 29,551 words.',
    fileSize: '2.1 MB',
    readingProgress: 0.30,
    totalReadingTime: 210,
    categories: ['Classic', 'Drama'],
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverUrl: 'https://images.pexels.com/photos/3747446/pexels-photo-3747446.jpeg?auto=compress&cs=tinysrgb&w=600',
    format: BookFormat.PDF,
    totalPages: 234,
    currentPage: 0,
    addedDate: '2023-12-10',
    lastOpenedDate: '',
    description: 'The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society.',
    fileSize: '2.7 MB',
    readingProgress: 0,
    totalReadingTime: 0,
    categories: ['Fiction', 'Coming-of-age'],
  },
];

// Sample reading sessions data for analytics
export const mockReadingSessions = [
  {
    id: 'session1',
    bookId: '1',
    date: '2023-12-15',
    startTime: '2023-12-15T19:30:00Z',
    endTime: '2023-12-15T20:15:00Z',
    duration: 45 * 60, // 45 minutes in seconds
    pagesRead: 18,
    wordsRead: 5400,
    wpm: 120,
  },
  {
    id: 'session2',
    bookId: '1',
    date: '2023-12-14',
    startTime: '2023-12-14T20:00:00Z',
    endTime: '2023-12-14T21:00:00Z',
    duration: 60 * 60, // 60 minutes in seconds
    pagesRead: 22,
    wordsRead: 6600,
    wpm: 110,
  },
  {
    id: 'session3',
    bookId: '2',
    date: '2023-12-13',
    startTime: '2023-12-13T18:15:00Z',
    endTime: '2023-12-13T19:00:00Z',
    duration: 45 * 60, // 45 minutes in seconds
    pagesRead: 25,
    wordsRead: 7500,
    wpm: 167,
  },
  {
    id: 'session4',
    bookId: '3',
    date: '2023-12-12',
    startTime: '2023-12-12T21:30:00Z',
    endTime: '2023-12-12T22:15:00Z',
    duration: 45 * 60, // 45 minutes in seconds
    pagesRead: 24,
    wordsRead: 7200,
    wpm: 160,
  },
  {
    id: 'session5',
    bookId: '4',
    date: '2023-12-11',
    startTime: '2023-12-11T19:00:00Z',
    endTime: '2023-12-11T20:30:00Z',
    duration: 90 * 60, // 90 minutes in seconds
    pagesRead: 45,
    wordsRead: 13500,
    wpm: 150,
  },
];

export const mockGoals = [
  {
    id: 'goal1',
    type: 'daily',
    target: 30, // minutes per day
    progress: 45,
    unit: 'minutes',
  },
  {
    id: 'goal2',
    type: 'weekly',
    target: 20000, // words per week
    progress: 12500,
    unit: 'words',
  },
  {
    id: 'goal3',
    type: 'monthly',
    target: 5, // books per month
    progress: 2,
    unit: 'books',
  }
];