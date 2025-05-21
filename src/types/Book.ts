export enum BookFormat {
  EPUB = 'epub',
  PDF = 'pdf',
  MOBI = 'mobi',
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  format: BookFormat;
  totalPages: number;
  currentPage: number;
  addedDate: string;
  lastOpenedDate: string;
  description: string;
  fileSize: string;
  readingProgress: number;
  totalReadingTime: number;
  categories: string[];
}