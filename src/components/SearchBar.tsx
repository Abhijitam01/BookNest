
import React, { useState } from 'react';
import { Search, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '', className }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    { id: 'purchased', label: 'Purchased', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    { id: 'not-purchased', label: 'Not Purchased', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
    { id: 'reading', label: 'Reading', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
    { id: 'planning', label: 'Planning to Purchase', color: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() || selectedTags.length > 0) {
      const searchParams = {
        query: query.trim(),
        tags: selectedTags
      };
      onSearch(JSON.stringify(searchParams));
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className={`relative transition-all duration-300 ${className} ${
          isFocused ? 'scale-[1.02]' : 'scale-100'
        }`}
      >
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          
          <Input
            type="search"
            placeholder="Search for books, authors, or genres..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pl-10 pr-20 py-6 w-full glass rounded-full border border-border/50 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300"
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-[70px] p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          
          <Button 
            type="submit" 
            className="absolute right-1 rounded-full px-4 text-sm transition-all duration-300 hover:shadow-md"
          >
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 pl-2">
          <div className="flex items-center mr-1">
            <Tag className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>
          
          {availableTags.map(tag => (
            <Badge 
              key={tag.id}
              variant={selectedTags.includes(tag.id) ? "default" : "outline"}
              className={`cursor-pointer ${selectedTags.includes(tag.id) ? '' : tag.color}`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;