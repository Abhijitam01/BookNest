
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLibrary, Book } from '@/context/LibraryContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BookList from '@/components/BookList';
import BookFilters from '@/components/BookFilters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, BookMarked, Library } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const { books, isLoading } = useLibrary();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  
  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
      toast.error('Please sign in to access your dashboard');
    }
  }, [user, isLoading, navigate]);
  
  // Filter and sort books
  const filteredBooks = books.filter((book) => {
    if (filter === 'read') return book.isRead;
    if (filter === 'unread') return !book.isRead;
    return true; // 'all'
  }).filter((book) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      (book.authors && book.authors.some(author => author.toLowerCase().includes(query))) ||
      (book.categories && book.categories.some(category => category.toLowerCase().includes(query)))
    );
  });
  
  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      const authorA = a.authors && a.authors[0] ? a.authors[0] : '';
      const authorB = b.authors && b.authors[0] ? b.authors[0] : '';
      return authorA.localeCompare(authorB);
    } else { // dateAdded (default)
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
      return dateB - dateA; // newest first
    }
  });
  
  // Get unique categories from books
  const categories = Array.from(
    new Set(
      books.flatMap(book => book.categories || [])
    )
  ).sort();
  
  // Group books by category
  const booksByCategory: Record<string, Book[]> = {};
  
  // Initialize with "Uncategorized"
  booksByCategory["Uncategorized"] = [];
  
  // Add all categories from our list
  categories.forEach(category => {
    booksByCategory[category] = [];
  });
  
  // Put books into their categories
  sortedBooks.forEach(book => {
    if (!book.categories || book.categories.length === 0) {
      booksByCategory["Uncategorized"].push(book);
    } else {
      book.categories.forEach(category => {
        if (booksByCategory[category]) {
          booksByCategory[category].push(book);
        }
      });
    }
  });
  
  // Remove empty categories
  Object.keys(booksByCategory).forEach(category => {
    if (booksByCategory[category].length === 0) {
      delete booksByCategory[category];
    }
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <BookOpen className="h-10 w-10 text-muted-foreground animate-pulse" />
          <p className="mt-4 text-muted-foreground">Loading your library<span className="loading-dots"></span></p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium mb-3">Your Library</h1>
            <p className="text-muted-foreground mb-8">
              Manage and explore your collection of {books.length} book{books.length !== 1 ? 's' : ''}
            </p>
            
            {/* Filters */}
            <BookFilters 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filter={filter}
              onFilterChange={setFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              className="mb-8"
            />
          </div>
          
          {/* Empty State */}
          {books.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted mb-6">
                <Library className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-3">Your library is empty</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start building your collection by searching for books and adding them to your library.
              </p>
              <Button asChild>
                <a href="/search">
                  <Search className="mr-2 h-4 w-4" />
                  Search Books
                </a>
              </Button>
            </div>
          )}
          
          {/* Books Display */}
          {books.length > 0 && (
            <Tabs defaultValue="all" className="w-full animate-fade-in">
              <TabsList className="mb-8">
                <TabsTrigger value="all" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>All Books</span>
                </TabsTrigger>
                <TabsTrigger value="categories" className="gap-2">
                  <BookMarked className="h-4 w-4" />
                  <span>By Category</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <BookList 
                  books={sortedBooks} 
                  emptyMessage="No books match your filters" 
                  inLibrary={true}
                />
              </TabsContent>
              
              <TabsContent value="categories" className="mt-0">
                {Object.keys(booksByCategory).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No books match your filters</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {Object.entries(booksByCategory).map(([category, categoryBooks]) => (
                      <div key={category} className="animate-fade-in">
                        <h2 className="text-xl font-medium mb-4 flex items-center">
                          <span>{category}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            ({categoryBooks.length})
                          </span>
                        </h2>
                        
                        <BookList books={categoryBooks} inLibrary={true} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;