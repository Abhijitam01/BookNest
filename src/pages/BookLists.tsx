
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBookLists, BookList } from '@/context/BookListsContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Trash, Edit, Globe, Lock, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const BookLists = () => {
  const { user } = useAuth();
  const { lists, createList, deleteList, isLoading } = useBookLists();
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [newListIsPublic, setNewListIsPublic] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    
    setIsCreating(true);
    const listId = await createList(newListName, newListDescription, newListIsPublic);
    setIsCreating(false);
    
    if (listId) {
      setIsCreateModalOpen(false);
      setNewListName('');
      setNewListDescription('');
      setNewListIsPublic(false);
      navigate(`/list/${listId}`);
    }
  };

  const handleDeleteList = async (id: string) => {
    if (confirm('Are you sure you want to delete this list?')) {
      await deleteList(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Loading your lists<span className="loading-dots"></span></p>
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
          {/* Header */}
          <div className="mb-10 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-medium">Your Book Lists</h1>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create List
              </Button>
            </div>
            <p className="text-muted-foreground">
              Organize your books into themed collections or reading lists.
            </p>
          </div>

          {/* Empty state */}
          {lists.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted mb-6">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-3">No lists yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first reading list to organize your books by theme, genre, or reading goals.
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First List
              </Button>
            </div>
          )}

          {/* Lists grid */}
          {lists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {lists.map((list) => (
                <Card key={list.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="mr-2">{list.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        {list.isPublic ? (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <CardDescription className="flex items-center text-xs">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      Created {format(new Date(list.createdAt), 'MMM d, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {list.description || 'No description'}
                    </p>
                    <div className="mt-3 text-sm">
                      <span className="font-medium">{list.bookCount || 0}</span> {(list.bookCount === 1) ? 'book' : 'books'}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => handleDeleteList(list.id)}>
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                    <Button onClick={() => navigate(`/list/${list.id}`)}>
                      <Edit className="h-4 w-4 mr-1" /> View & Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create List Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Book List</DialogTitle>
            <DialogDescription>
              Create a collection to organize your books by theme, genre, or reading goal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input
                id="name"
                placeholder="e.g., Summer Reading, Sci-Fi Favorites"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="What is this list about?"
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="public"
                checked={newListIsPublic}
                onCheckedChange={setNewListIsPublic}
              />
              <Label htmlFor="public">Make this list public</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateList} disabled={!newListName.trim() || isCreating}>
              {isCreating ? 'Creating...' : 'Create List'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookLists;