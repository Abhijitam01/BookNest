import React, { useState } from 'react';
import { useBookLists, BookList } from '@/context/BookListsContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  BookmarkPlus,
  Check,
  ListPlus,
  Plus,
} from 'lucide-react';

interface AddToListButtonProps {
  bookId: string;
}

const AddToListButton: React.FC<AddToListButtonProps> = ({ bookId }) => {
  const { lists, addBookToList, createList } = useBookLists();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');
  
  const handleAddToList = async (listId: string) => {
    await addBookToList(listId, bookId);
    setIsDialogOpen(false);
  };
  
  const handleCreateAndAddToList = async () => {
    if (!newListName.trim()) return;
    
    setIsCreatingList(true);
    const listId = await createList(newListName, '', false);
    
    if (listId) {
      await addBookToList(listId, bookId);
      toast.success(`Added to new list "${newListName}"`);
    }
    
    setIsCreatingList(false);
    setNewListName('');
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsDialogOpen(true)}
        className="w-full gap-2"
      >
        <BookmarkPlus className="h-4 w-4" />
        <span>Add to List</span>
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Reading List</DialogTitle>
            <DialogDescription>
              Choose an existing list or create a new one.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {lists.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {lists.map(list => (
                  <div 
                    key={list.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleAddToList(list.id)}
                  >
                    <div>
                      <h3 className="font-medium">{list.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {list.bookCount || 0} {list.bookCount === 1 ? 'book' : 'books'}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-2">You don't have any lists yet</p>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-3">Create a new list</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New list name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <Button 
                  onClick={handleCreateAndAddToList} 
                  disabled={!newListName.trim() || isCreatingList}
                >
                  <ListPlus className="h-4 w-4 mr-2" />
                  Create
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToListButton;
