import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType, CheckCircle, X } from 'lucide-react';
import { BookFormat } from '../../types/Book';
import { motion, AnimatePresence } from 'framer-motion';
import { useLibrary } from '../../contexts/LibraryContext';

const BookUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { addBook } = useLibrary();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/epub+zip': ['.epub'],
      'application/pdf': ['.pdf'],
      'application/x-mobipocket-ebook': ['.mobi'],
    },
    maxFiles: 5,
  });

  const getFileFormat = (filename: string): BookFormat => {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return BookFormat.PDF;
    if (extension === 'mobi') return BookFormat.MOBI;
    return BookFormat.EPUB;
  };

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload and processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add books to library
    uploadedFiles.forEach((file) => {
      const format = getFileFormat(file.name);
      const randomId = Math.floor(Math.random() * 10000).toString();
      
      addBook({
        id: randomId,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        author: 'Unknown Author',
        coverUrl: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600',
        format,
        totalPages: Math.floor(Math.random() * (500 - 100) + 100),
        currentPage: 0,
        addedDate: new Date().toISOString().split('T')[0],
        lastOpenedDate: '',
        description: 'No description available.',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        readingProgress: 0,
        totalReadingTime: 0,
        categories: [],
      });
    });
    
    setIsUploading(false);
    setUploadComplete(true);
    
    // Reset after a few seconds
    setTimeout(() => {
      setUploadedFiles([]);
      setUploadComplete(false);
    }, 3000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
          <p className="text-center text-gray-600 dark:text-gray-400">
            {isDragActive 
              ? "Drop the ebooks here ..." 
              : "Drag & drop ebooks here, or click to select files"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Supported formats: EPUB, PDF, MOBI
          </p>
        </div>
      </div>
      
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {uploadedFiles.length} file(s) selected
            </h3>
            
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <div className="flex items-center">
                    <FileType className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-xs">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button
                onClick={handleUpload}
                disabled={isUploading || uploadComplete}
                className={`w-full py-2 px-4 rounded-md font-medium text-white 
                  ${isUploading || uploadComplete
                    ? 'bg-primary-400 dark:bg-primary-700 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700'
                  }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                        fill="none"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </span>
                ) : uploadComplete ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Upload Complete
                  </span>
                ) : (
                  'Upload Files'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookUpload;