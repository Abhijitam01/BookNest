
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBookLists } from '@/context/BookListsContext';
import { useLibrary, Book } from '@/context/LibraryContext';
import Navbar from '@/components/Navbar';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ChevronLeft, Edit, Save, Globe, Lock, Trash, Share } from 'lucide-react';
import { toast } from 'sonner';

const BookListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lists, updateList, getListBooks, removeBookFromList, isLoading: listsLoading } = useBookLists();
  const { books, isLoading: booksLoading } = useLibrary();
  
  const [listBooks, setListBooks] = useState<Book[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  
  // Get the current list
  const currentList = lists.find(list => list.id === id);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user && !listsLoading) {
      navigate('/login');
    }
  }, [user, listsLoading, navigate]);
  
  // Redirect if list doesn't exist
  useEffect(() => {
    if (!listsLoading && !currentList && id) {
      toast.error('List not found');
      navigate('/lists');
    }
  }, [currentList, listsLoading, id, navigate]);
  
  // Set initial form values
  useEffect(() => {
    if (currentList) {
      setName(currentList.name);
      setDescription(currentList.description);
      setIsPublic(currentList.isPublic);
    }
  }, [currentList]);
  
  // Load books in the list
  useEffect(() => {
    const loadListBooks = async () => {
      if (!id || booksLoading) return;
      
      setIsLoadingBooks(true);
      try {
        const bookIds = await getListBooks(id);
        const filteredBooks = books.filter(book => bookIds.includes(book.id));
        setListBooks(filteredBooks);
      } catch (error) {
        console.error('Error loading list books:', error);
      } finally {
        setIsLoadingBooks(false);
      }
    };
    
    loadListBooks();
  }, [id, books, booksLoading, getListBooks]);
  
  const handleSave = async () => {
    if (!id || !name.trim()) return;
    
    await updateList(id, {
      name,
      description,
      isPublic
    });
    
    setIsEditing(false);
  };
  
  const handleRemoveBook = async (bookId: string) => {
    if (!id) return;
    
    if (confirm('Remove this book from the list?')) {
      await removeBookFromList(id, bookId);
      setListBooks(prev => prev.filter(book => book.id !== bookId));
    }
  };
  
  const shareList = () => {
    if (!navigator.share) {
      // Fallback for browsers that don't support the Web Share API
      const url = `${window.location.origin}/list/${id}`;
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
      return;
    }
    
    navigator.share({
      title: `Book List: ${currentList?.name}`,
      text: currentList?.description || `Check out this book list: ${currentList?.name}`,
      url: window.location.href
    }).catch(err => {
      console.error('Error sharing:', err);
    });
  };
  
  if (listsLoading || !currentList) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Loading list<span className="loading-dots"></span></p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/lists')}
            className="mb-6 -ml-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Lists
          </Button>
          
          {/* List Header */}
          <div className="mb-10 animate-fade-in">
            {isEditing ? (
              <div className="space-y-4 max-w-2xl">
                <div>
                  <Label htmlFor="name">List Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your list"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public">Public list</Label>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <h1 className="text-3xl md:text-4xl font-medium mr-3">{currentList.name}</h1>
                    {isPublic ? (
                      <Globe className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit List
                    </Button>
                    
                    {isPublic && (
                      <Button variant="outline" onClick={shareList}>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    )}
                  </div>
                </div>
                
                {description && (
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {description}
                  </p>
                )}
                
                <div className="text-sm text-muted-foreground">
                  {listBooks.length} {listBooks.length === 1 ? 'book' : 'books'} in this list
                </div>
              </div>
            )}
          </div>
          
          {/* Books Content */}
          <Tabs defaultValue="books" className="animate-fade-in">
            <TabsList>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="manage">Manage Books</TabsTrigger>
            </TabsList>
            
            <TabsContent value="books" className="pt-6">
              {isLoadingBooks ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading books<span className="loading-dots"></span></p>
                  </div>
                </div>
              ) : listBooks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-muted mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No books in this list yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You can add books from your library to this list from the "Manage Books" tab.
                  </p>
                </div>
              ) : (
                <BookList books={listBooks} inLibrary={true} />
              )}
            </TabsContent>
            
            <TabsContent value="manage" className="pt-6">
              {isLoadingBooks ? (
                <div className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading books<span className="loading-dots"></span></p>
                  </div>
                </div>
              ) : listBooks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No books in this list yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add books to this list from your book details page.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Remove books from this list or manage them by clicking on a book.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {listBooks.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          {book.imageLinks.thumbnail !== '/placeholder.svg' ? (
                            <img 
                              src={book.imageLinks.thumbnail} 
                              alt={book.title}
                              className="w-12 h-16 object-cover rounded mr-4"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gray-100 flex items-center justify-center rounded mr-4">
                              <BookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          
                          <div>
                            <h3 className="font-medium line-clamp-1">{book.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {book.authors && book.authors.join(', ')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/book/${book.id}`)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleRemoveBook(book.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BookListDetail;