
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  categories: string[];
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
  publishedDate: string;
  publisher: string;
  pageCount: number;
  isRead: boolean;
  dateAdded: string;
  notes?: string;
  rating?: number;
}

interface LibraryContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'isRead' | 'dateAdded'>) => void;
  removeBook: (bookId: string) => void;
  toggleReadStatus: (bookId: string) => void;
  updateBookNotes: (bookId: string, notes: string) => void;
  rateBook: (bookId: string, rating: number) => void;
  getBook: (bookId: string) => Book | undefined;
  isInLibrary: (bookId: string) => boolean;
  isLoading: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch books from Supabase when user changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) {
        setBooks([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('user_books')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          // Convert Supabase data to Book format
          const convertedBooks: Book[] = data.map(item => ({
            id: item.book_id,
            title: item.title,
            authors: item.authors,
            description: item.description || '',
            categories: item.categories || [],
            imageLinks: {
              thumbnail: item.image_url || '/placeholder.svg',
              smallThumbnail: item.image_url || '/placeholder.svg',
            },
            publishedDate: item.date_added || new Date().toISOString(),
            publisher: '', // Not stored in our schema
            pageCount: 0, // Not stored in our schema
            isRead: item.is_read || false,
            dateAdded: item.date_added || new Date().toISOString(),
            notes: item.notes,
            rating: item.rating,
          }));
          
          setBooks(convertedBooks);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load your books');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, [user]);

  const addBook = async (newBook: Omit<Book, 'isRead' | 'dateAdded'>) => {
    if (!user) {
      toast.error('You must be logged in to add books');
      return;
    }

    // Check if book already exists
    if (books.some(book => book.id === newBook.id)) {
      toast.error('This book is already in your library');
      return;
    }
    
    try {
      // Prepare book data for Supabase
      const bookData = {
        user_id: user.id,
        book_id: newBook.id,
        title: newBook.title,
        authors: newBook.authors,
        description: newBook.description,
        categories: newBook.categories,
        image_url: newBook.imageLinks.thumbnail,
        is_read: false,
        date_added: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('user_books')
        .insert(bookData);
        
      if (error) throw error;
      
      // Add to local state
      const bookWithDefaults: Book = {
        ...newBook,
        isRead: false,
        dateAdded: new Date().toISOString(),
      };
      
      setBooks(prevBooks => [...prevBooks, bookWithDefaults]);
      toast.success('Book added to your library');
    } catch (error: any) {
      console.error('Error adding book:', error);
      toast.error(error.message || 'Failed to add book');
    }
  };

  const removeBook = async (bookId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_books')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);
        
      if (error) throw error;
      
      // Update local state
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      toast.success('Book removed from your library');
    } catch (error) {
      console.error('Error removing book:', error);
      toast.error('Failed to remove book');
    }
  };

  const toggleReadStatus = async (bookId: string) => {
    if (!user) return;
    
    // Find the book to get its current read status
    const book = books.find(book => book.id === bookId);
    if (!book) return;
    
    const newReadStatus = !book.isRead;
    
    try {
      const { error } = await supabase
        .from('user_books')
        .update({ is_read: newReadStatus })
        .eq('user_id', user.id)
        .eq('book_id', bookId);
        
      if (error) throw error;
      
      // Update local state
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId
            ? { ...book, isRead: newReadStatus }
            : book
        )
      );
      
      toast.success(`Book marked as ${newReadStatus ? 'read' : 'unread'}`);
    } catch (error) {
      console.error('Error updating read status:', error);
      toast.error('Failed to update book status');
    }
  };

  const updateBookNotes = async (bookId: string, notes: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_books')
        .update({ notes })
        .eq('user_id', user.id)
        .eq('book_id', bookId);
        
      if (error) throw error;
      
      // Update local state
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId
            ? { ...book, notes }
            : book
        )
      );
      toast.success('Notes updated');
    } catch (error) {
      console.error('Error updating notes:', error);
      toast.error('Failed to update notes');
    }
  };

  const rateBook = async (bookId: string, rating: number) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_books')
        .update({ rating })
        .eq('user_id', user.id)
        .eq('book_id', bookId);
        
      if (error) throw error;
      
      // Update local state
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId
            ? { ...book, rating }
            : book
        )
      );
      toast.success(`Book rated ${rating} stars`);
    } catch (error) {
      console.error('Error rating book:', error);
      toast.error('Failed to rate book');
    }
  };

  const getBook = (bookId: string) => {
    return books.find(book => book.id === bookId);
  };

  const isInLibrary = (bookId: string) => {
    return books.some(book => book.id === bookId);
  };

  const value = {
    books,
    addBook,
    removeBook,
    toggleReadStatus,
    updateBookNotes,
    rateBook,
    getBook,
    isInLibrary,
    isLoading,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};