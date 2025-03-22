import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '@/context/LibraryContext';
import { getBookById } from '@/services/api';
import Navbar from '@/components/Navbar';
import AddToListButton from '@/components/AddToListButton';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { BookOpen, ChevronLeft, Check, Plus, Edit, Save, Star, Calendar, Layers, BookMarked } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getBook, 
    addBook, 
    removeBook, 
    toggleReadStatus, 
    updateBookNotes,
    rateBook,
    isInLibrary 
  } = useLibrary();
  
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [userRating, setUserRating] = useState(0);
  
  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const libraryBook = getBook(id);
        
        if (libraryBook) {
          setBook(libraryBook);
          setNotes(libraryBook.notes || '');
          setUserRating(libraryBook.rating || 0);
        } else {
          const fetchedBook = await getBookById(id);
          setBook(fetchedBook);
        }
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book details. Please try again.');
        toast.error('Failed to load book details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBook();
  }, [id, getBook]);
  
  const handleAddToLibrary = () => {
    if (!book) return;
    addBook(book);
  };
  
  const handleRemoveFromLibrary = () => {
    if (!book || !id) return;
    
    if (confirm('Are you sure you want to remove this book from your library?')) {
      removeBook(id);
      toast.success('Book removed from your library');
      navigate('/dashboard');
    }
  };
  
  const handleToggleReadStatus = () => {
    if (!book || !id) return;
    toggleReadStatus(id);
  };
  
  const handleSaveNotes = () => {
    if (!book || !id) return;
    updateBookNotes(id, notes);
    setIsEditingNotes(false);
  };
  
  const handleRating = (rating: number) => {
    if (!book || !id) return;
    setUserRating(rating);
    rateBook(id, rating);
  };
  
  const inLibrary = book ? isInLibrary(book.id) : false;
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    
    if (dateString.length === 4) return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Loading book details<span className="loading-dots"></span></p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-3 text-destructive">Error</h2>
            <p className="text-muted-foreground mb-6">{error || 'Book not found'}</p>
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 -ml-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="col-span-1 flex flex-col items-center md:items-start animate-fade-in">
              <div className="book w-64 max-w-full mb-6 rounded-lg overflow-hidden shadow-lg">
                {book.imageLinks.thumbnail !== '/placeholder.svg' ? (
                  <img 
                    src={book.imageLinks.thumbnail}
                    alt={book.title}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="aspect-[2/3] bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="w-64 max-w-full space-y-3">
                {inLibrary ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={handleToggleReadStatus}
                      className="w-full gap-2"
                    >
                      {book.isRead ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Marked as Read</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4" />
                          <span>Mark as Read</span>
                        </>
                      )}
                    </Button>
                    
                    <AddToListButton bookId={book.id} />
                    
                    <Button 
                      variant="outline" 
                      onClick={handleRemoveFromLibrary}
                      className="w-full text-destructive hover:text-destructive"
                    >
                      Remove from Library
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleAddToLibrary}
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add to Library</span>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-6 animate-fade-in [animation-delay:200ms]">
              <div>
                <h1 className="text-3xl md:text-4xl font-medium mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground">
                  {book.authors && book.authors.join(', ')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p>{formatDate(book.publishedDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Layers className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p>{book.pageCount || 'Unknown'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <BookMarked className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p>{book.publisher || 'Unknown'}</p>
                  </div>
                </div>
              </div>
              
              {book.categories && book.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {book.categories.map((category: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
              
              {book.description && (
                <div>
                  <h2 className="text-xl font-medium mb-3">Description</h2>
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: book.description }}
                  />
                </div>
              )}
              
              {inLibrary && (
                <div className="pt-2 mt-6 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-medium">Your Notes</h2>
                    {!isEditingNotes ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsEditingNotes(true)}
                        className="gap-1.5"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Notes
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleSaveNotes}
                        className="gap-1.5"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    )}
                  </div>
                  
                  {isEditingNotes ? (
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add your notes about this book..."
                      className="min-h-[120px]"
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      {notes ? (
                        <p>{notes}</p>
                      ) : (
                        <p className="text-muted-foreground italic">No notes yet. Click edit to add your thoughts about this book.</p>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Your Rating</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className="text-2xl focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= userRating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {userRating > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground">
                          {userRating}/5
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;