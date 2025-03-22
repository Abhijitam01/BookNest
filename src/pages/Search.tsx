
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { searchBooks } from '@/services/api';
import { toast } from 'sonner';
import { Book as BookIcon, ChevronDown } from 'lucide-react';
import { Book } from '@/context/LibraryContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Omit<Book, 'isRead' | 'dateAdded' | 'notes' | 'rating'>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Handle search submission
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);
    setBooks([]);
    setPage(0);
    
    try {
      const result = await searchBooks(searchQuery);
      setBooks(result.books);
      setTotalItems(result.totalItems);
      setHasMore(result.books.length < result.totalItems);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search books. Please try again.');
      toast.error('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load more books when scrolling
  const loadMoreBooks = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    const nextPage = page + 1;
    
    try {
      const result = await searchBooks(query, nextPage * 20);
      setBooks(prevBooks => [...prevBooks, ...result.books]);
      setPage(nextPage);
      setHasMore(books.length + result.books.length < totalItems);
    } catch (err) {
      console.error('Load more error:', err);
      toast.error('Failed to load more books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreBooks();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(loadMoreRef.current);
    
    return () => observer.disconnect();
  }, [hasMore, isLoading, books]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-10 text-center animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-medium mb-3">Discover Books</h1>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Search millions of books from the Google Books database and add your favorites to your personal library.
            </p>
            
            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch} 
              initialQuery={query} 
              className="mb-8" 
            />
          </div>
          
          {/* Initial Empty State */}
          {!query && !isLoading && books.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted mb-6">
                <BookIcon className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-3">Search for books</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Enter a title, author, or genre to start discovering books for your collection.
              </p>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && books.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted mb-6">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
              <h2 className="text-2xl font-medium mb-3">Searching for books<span className="loading-dots"></span></h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're looking through millions of books to find what you're searching for.
              </p>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="text-center py-12 animate-fade-in">
              <h2 className="text-2xl font-medium mb-3 text-destructive">Search Error</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => handleSearch(query)}>Try Again</Button>
            </div>
          )}
          
          {/* Results */}
          {books.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-medium mb-4">
                Search Results
                {totalItems > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    ({books.length} of {totalItems})
                  </span>
                )}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {books.map((book) => (
                  <div key={book.id} className="animate-scale-in">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
              
              {/* Load More / Infinite Scroll */}
              <div 
                ref={loadMoreRef} 
                className="py-8 text-center"
              >
                {isLoading && books.length > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-2" />
                    <p className="text-muted-foreground">Loading more books<span className="loading-dots"></span></p>
                  </div>
                )}
                
                {!isLoading && hasMore && (
                  <Button 
                    variant="outline" 
                    onClick={loadMoreBooks}
                    className="mt-4"
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Load More
                  </Button>
                )}
                
                {!isLoading && !hasMore && books.length > 0 && (
                  <p className="text-muted-foreground mt-4">
                    That's all the books we found for "{query}"
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
