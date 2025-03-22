import React from 'react';
import { Link } from 'react-router-dom';
import { Book, useLibrary } from '@/context/LibraryContext';
import { cn } from '@/lib/utils';
import { Check, Plus, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Omit<Book, 'isRead' | 'dateAdded' | 'notes' | 'rating'> & {
    isRead?: boolean;
    dateAdded?: string;
    notes?: string;
    rating?: number;
  };
  inLibrary?: boolean;
  minimal?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, inLibrary, minimal = false }) => {
  const { addBook, removeBook, toggleReadStatus, isInLibrary } = useLibrary();
  
  const isBookInLibrary = inLibrary !== undefined ? inLibrary : isInLibrary(book.id);
  
  const handleAddBook = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addBook(book);
  };
  
  const handleToggleReadStatus = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleReadStatus(book.id);
  };
  
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // For placeholder images
  const placeholderColors = [
    'bg-blue-100', 'bg-green-100', 'bg-purple-100', 
    'bg-yellow-100', 'bg-red-100', 'bg-indigo-100'
  ];
  
  const randomColor = () => {
    return placeholderColors[Math.floor(Math.random() * placeholderColors.length)];
  };

  if (minimal) {
    return (
      <Link to={`/book/${book.id}`} className="group">
        <div className="book transition-all duration-500 hover:shadow-xl rounded-lg overflow-hidden">
          <div className="relative aspect-[2/3] overflow-hidden">
            {book.imageLinks.thumbnail !== '/placeholder.svg' ? (
              <img 
                src={book.imageLinks.thumbnail} 
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className={cn("w-full h-full flex items-center justify-center", randomColor())}>
                <BookOpen className="w-10 h-10 text-gray-500" />
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/book/${book.id}`} className="group">
      <div className="book h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-book transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-[2/3] overflow-hidden">
          {book.imageLinks.thumbnail !== '/placeholder.svg' ? (
            <img 
              src={book.imageLinks.thumbnail} 
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className={cn("w-full h-full flex items-center justify-center", randomColor())}>
              <BookOpen className="w-12 h-12 text-gray-500" />
            </div>
          )}
          
          {/* Category badge */}
          {book.categories && book.categories[0] && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-normal"
            >
              {truncateText(book.categories[0], 15)}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col flex-grow p-4">
          <h3 className="font-medium text-base mb-1 line-clamp-1">{book.title}</h3>
          
          <p className="text-xs text-gray-500 mb-2 line-clamp-1">
            {book.authors && book.authors.join(', ')}
          </p>
          
          <div className="mt-auto flex justify-between items-center pt-2">
            <div className="text-xs text-gray-500">
              {book.publishedDate && book.publishedDate.substring(0, 4)}
            </div>
            
            {isBookInLibrary ? (
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 gap-1"
                onClick={handleToggleReadStatus}
              >
                {book.isRead ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-xs">Read</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="text-xs">Unread</span>
                  </>
                )}
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 gap-1"
                onClick={handleAddBook}
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="text-xs">Add</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;