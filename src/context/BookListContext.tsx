
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface BookList {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  bookCount?: number;
}

interface BookListsContextType {
  lists: BookList[];
  createList: (name: string, description: string, isPublic: boolean) => Promise<string | null>;
  updateList: (id: string, data: Partial<BookList>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  addBookToList: (listId: string, bookId: string) => Promise<void>;
  removeBookFromList: (listId: string, bookId: string) => Promise<void>;
  getListBooks: (listId: string) => Promise<string[]>;
  isLoading: boolean;
}

const BookListsContext = createContext<BookListsContextType | undefined>(undefined);

export const useBookLists = () => {
  const context = useContext(BookListsContext);
  if (!context) {
    throw new Error('useBookLists must be used within a BookListsProvider');
  }
  return context;
};

export const BookListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<BookList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch lists when user changes
  useEffect(() => {
    const fetchLists = async () => {
      if (!user) {
        setLists([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        // Fetch lists
        const { data, error } = await supabase
          .from('book_lists')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          // Convert Supabase data to BookList format
          const lists: BookList[] = await Promise.all(data.map(async (item) => {
            // Count books in each list
            const { count, error: countError } = await supabase
              .from('list_books')
              .select('*', { count: 'exact', head: true })
              .eq('list_id', item.id);
              
            if (countError) {
              console.error('Error counting books:', countError);
            }
            
            return {
              id: item.id,
              name: item.name,
              description: item.description || '',
              isPublic: item.is_public,
              createdAt: item.created_at,
              updatedAt: item.updated_at,
              bookCount: count || 0
            };
          }));
          
          setLists(lists);
        }
      } catch (error) {
        console.error('Error fetching lists:', error);
        toast.error('Failed to load your lists');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLists();
  }, [user]);

  const createList = async (name: string, description: string, isPublic: boolean): Promise<string | null> => {
    if (!user) {
      toast.error('You must be logged in to create lists');
      return null;
    }
    
    try {
      const newList = {
        user_id: user.id,
        name,
        description,
        is_public: isPublic,
      };
      
      const { data, error } = await supabase
        .from('book_lists')
        .insert(newList)
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        // Add to local state
        const formattedList: BookList = {
          id: data.id,
          name: data.name,
          description: data.description || '',
          isPublic: data.is_public,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          bookCount: 0
        };
        
        setLists(prev => [...prev, formattedList]);
        toast.success('List created successfully');
        return data.id;
      }
      
      return null;
    } catch (error: any) {
      console.error('Error creating list:', error);
      toast.error(error.message || 'Failed to create list');
      return null;
    }
  };

  const updateList = async (id: string, data: Partial<BookList>) => {
    if (!user) return;
    
    try {
      // Convert to snake_case for Supabase
      const supabaseData = {
        name: data.name,
        description: data.description,
        is_public: data.isPublic,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('book_lists')
        .update(supabaseData)
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setLists(prev => prev.map(list => 
        list.id === id 
          ? { ...list, ...data, updatedAt: new Date().toISOString() } 
          : list
      ));
      
      toast.success('List updated successfully');
    } catch (error: any) {
      console.error('Error updating list:', error);
      toast.error(error.message || 'Failed to update list');
    }
  };

  const deleteList = async (id: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('book_lists')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setLists(prev => prev.filter(list => list.id !== id));
      toast.success('List deleted successfully');
    } catch (error: any) {
      console.error('Error deleting list:', error);
      toast.error(error.message || 'Failed to delete list');
    }
  };

  const addBookToList = async (listId: string, bookId: string) => {
    if (!user) return;
    
    try {
      // Check if book is already in the list
      const { data: existingEntry, error: checkError } = await supabase
        .from('list_books')
        .select('*')
        .eq('list_id', listId)
        .eq('book_id', bookId)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      if (existingEntry) {
        toast.info('Book is already in this list');
        return;
      }
      
      // Add book to list
      const { error } = await supabase
        .from('list_books')
        .insert({
          list_id: listId,
          book_id: bookId
        });
        
      if (error) throw error;
      
      // Update book count in local state
      setLists(prev => prev.map(list => 
        list.id === listId 
          ? { ...list, bookCount: (list.bookCount || 0) + 1 } 
          : list
      ));
      
      toast.success('Book added to list');
    } catch (error: any) {
      console.error('Error adding book to list:', error);
      toast.error(error.message || 'Failed to add book to list');
    }
  };

  const removeBookFromList = async (listId: string, bookId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('list_books')
        .delete()
        .eq('list_id', listId)
        .eq('book_id', bookId);
        
      if (error) throw error;
      
      // Update book count in local state
      setLists(prev => prev.map(list => 
        list.id === listId 
          ? { ...list, bookCount: Math.max(0, (list.bookCount || 1) - 1) } 
          : list
      ));
      
      toast.success('Book removed from list');
    } catch (error: any) {
      console.error('Error removing book from list:', error);
      toast.error(error.message || 'Failed to remove book from list');
    }
  };

  const getListBooks = async (listId: string): Promise<string[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('list_books')
        .select('book_id')
        .eq('list_id', listId);
        
      if (error) throw error;
      
      return data?.map(item => item.book_id) || [];
    } catch (error) {
      console.error('Error fetching list books:', error);
      toast.error('Failed to load list books');
      return [];
    }
  };

  const value = {
    lists,
    createList,
    updateList,
    deleteList,
    addBookToList,
    removeBookFromList,
    getListBooks,
    isLoading
  };

  return <BookListsContext.Provider value={value}>{children}</BookListsContext.Provider>;
};
