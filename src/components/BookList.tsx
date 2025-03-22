
import React from 'react';
import { Book } from '@/context/LibraryContext';
import BookCard from '@/components/BookCard';
import { BookOpen } from 'lucide-react';

interface BookListProps {
  books: Book[];
  loading?: boolean;
  emptyMessage?: string;
  inLibrary?: boolean;
  minimal?: boolean;
  className?: string;
}

const BookList: React.FC<BookListProps> = ({
  books,
  loading = false,
  emptyMessage = "No books found",
  inLibrary = false,
  minimal = false,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground">Loading books<span className="loading-dots"></span></p>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${className}`}>
      {books.map((book) => (
        <div key={book.id} className="animate-scale-in">
          <BookCard book={book} inLibrary={inLibrary} minimal={minimal} />
        </div>
      ))}
    </div>
  );
};

export default BookList;