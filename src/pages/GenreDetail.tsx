
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for the top books by genre
const genreData = {
  classics: {
    name: 'Classic Tales',
    description: 'Timeless literary works that have stood the test of time and continue to captivate readers across generations.',
    books: [
      { id: 'c1', title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://source.unsplash.com/random/200x300?pride+prejudice', year: '1813' },
      { id: 'c2', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://source.unsplash.com/random/200x300?mockingbird', year: '1960' },
      { id: 'c3', title: 'Great Expectations', author: 'Charles Dickens', cover: 'https://source.unsplash.com/random/200x300?expectations', year: '1861' },
      { id: 'c4', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', cover: 'https://source.unsplash.com/random/200x300?crime', year: '1866' },
      { id: 'c5', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://source.unsplash.com/random/200x300?gatsby', year: '1925' },
      { id: 'c6', title: 'Moby Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/random/200x300?whale', year: '1851' },
      { id: 'c7', title: 'Jane Eyre', author: 'Charlotte Brontë', cover: 'https://source.unsplash.com/random/200x300?jane', year: '1847' },
      { id: 'c8', title: 'Wuthering Heights', author: 'Emily Brontë', cover: 'https://source.unsplash.com/random/200x300?heights', year: '1847' },
      { id: 'c9', title: 'Anna Karenina', author: 'Leo Tolstoy', cover: 'https://source.unsplash.com/random/200x300?anna', year: '1878' },
      { id: 'c10', title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', cover: 'https://source.unsplash.com/random/200x300?scarlet', year: '1850' }
    ]
  },
  adventure: {
    name: 'Adventures',
    description: 'Thrilling tales of journeys, exploration, and daring quests that take readers on exciting escapades around the world and beyond.',
    books: [
      { id: 'a1', title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: 'https://source.unsplash.com/random/200x300?hobbit', year: '1937' },
      { id: 'a2', title: 'Treasure Island', author: 'Robert Louis Stevenson', cover: 'https://source.unsplash.com/random/200x300?treasure', year: '1883' },
      { id: 'a3', title: 'Around the World in 80 Days', author: 'Jules Verne', cover: 'https://source.unsplash.com/random/200x300?world', year: '1873' },
      { id: 'a4', title: 'Robinson Crusoe', author: 'Daniel Defoe', cover: 'https://source.unsplash.com/random/200x300?island', year: '1719' },
      { id: 'a5', title: 'The Three Musketeers', author: 'Alexandre Dumas', cover: 'https://source.unsplash.com/random/200x300?musketeer', year: '1844' },
      { id: 'a6', title: 'Journey to the Center of the Earth', author: 'Jules Verne', cover: 'https://source.unsplash.com/random/200x300?center+earth', year: '1864' },
      { id: 'a7', title: 'The Call of the Wild', author: 'Jack London', cover: 'https://source.unsplash.com/random/200x300?wild', year: '1903' },
      { id: 'a8', title: 'King Solomon\'s Mines', author: 'H. Rider Haggard', cover: 'https://source.unsplash.com/random/200x300?mines', year: '1885' },
      { id: 'a9', title: 'The Odyssey', author: 'Homer', cover: 'https://source.unsplash.com/random/200x300?odyssey', year: '8th century BC' },
      { id: 'a10', title: 'Moby Dick', author: 'Herman Melville', cover: 'https://source.unsplash.com/random/200x300?moby', year: '1851' }
    ]
  },
  mystery: {
    name: 'Mystery',
    description: 'Intriguing stories filled with suspense, clues, and unexpected twists that challenge readers to solve complex puzzles alongside clever detectives.',
    books: [
      { id: 'm1', title: 'The Hound of the Baskervilles', author: 'Arthur Conan Doyle', cover: 'https://source.unsplash.com/random/200x300?hound', year: '1902' },
      { id: 'm2', title: 'Murder on the Orient Express', author: 'Agatha Christie', cover: 'https://source.unsplash.com/random/200x300?orient', year: '1934' },
      { id: 'm3', title: 'The Maltese Falcon', author: 'Dashiell Hammett', cover: 'https://source.unsplash.com/random/200x300?falcon', year: '1930' },
      { id: 'm4', title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', cover: 'https://source.unsplash.com/random/200x300?dragon+tattoo', year: '2005' },
      { id: 'm5', title: 'Gone Girl', author: 'Gillian Flynn', cover: 'https://source.unsplash.com/random/200x300?gone', year: '2012' },
      { id: 'm6', title: 'The Da Vinci Code', author: 'Dan Brown', cover: 'https://source.unsplash.com/random/200x300?vinci', year: '2003' },
      { id: 'm7', title: 'In the Woods', author: 'Tana French', cover: 'https://source.unsplash.com/random/200x300?woods', year: '2007' },
      { id: 'm8', title: 'The Big Sleep', author: 'Raymond Chandler', cover: 'https://source.unsplash.com/random/200x300?sleep', year: '1939' },
      { id: 'm9', title: 'The Woman in White', author: 'Wilkie Collins', cover: 'https://source.unsplash.com/random/200x300?woman+white', year: '1859' },
      { id: 'm10', title: 'The Silent Patient', author: 'Alex Michaelides', cover: 'https://source.unsplash.com/random/200x300?silent', year: '2019' }
    ]
  },
  fantasy: {
    name: 'Fantasy',
    description: 'Imaginative tales set in magical worlds with extraordinary beings, mythical creatures, and epic battles between good and evil forces.',
    books: [
      { id: 'f1', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', cover: 'https://source.unsplash.com/random/200x300?lord+rings', year: '1954' },
      { id: 'f2', title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', cover: 'https://source.unsplash.com/random/200x300?harry+potter', year: '1997' },
      { id: 'f3', title: 'A Game of Thrones', author: 'George R.R. Martin', cover: 'https://source.unsplash.com/random/200x300?thrones', year: '1996' },
      { id: 'f4', title: 'The Name of the Wind', author: 'Patrick Rothfuss', cover: 'https://source.unsplash.com/random/200x300?wind', year: '2007' },
      { id: 'f5', title: 'The Way of Kings', author: 'Brandon Sanderson', cover: 'https://source.unsplash.com/random/200x300?kings', year: '2010' },
      { id: 'f6', title: 'Mistborn: The Final Empire', author: 'Brandon Sanderson', cover: 'https://source.unsplash.com/random/200x300?mistborn', year: '2006' },
      { id: 'f7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', cover: 'https://source.unsplash.com/random/200x300?wardrobe', year: '1950' },
      { id: 'f8', title: 'American Gods', author: 'Neil Gaiman', cover: 'https://source.unsplash.com/random/200x300?gods', year: '2001' },
      { id: 'f9', title: 'The Fifth Season', author: 'N.K. Jemisin', cover: 'https://source.unsplash.com/random/200x300?season', year: '2015' },
      { id: 'f10', title: 'Good Omens', author: 'Terry Pratchett & Neil Gaiman', cover: 'https://source.unsplash.com/random/200x300?omens', year: '1990' }
    ]
  },
  romance: {
    name: 'Romance',
    description: 'Heartwarming stories of love, relationships, and emotional connections that explore the complexities of human affection.',
    books: [
      { id: 'r1', title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://source.unsplash.com/random/200x300?pride', year: '1813' },
      { id: 'r2', title: 'Outlander', author: 'Diana Gabaldon', cover: 'https://source.unsplash.com/random/200x300?outlander', year: '1991' },
      { id: 'r3', title: 'Me Before You', author: 'Jojo Moyes', cover: 'https://source.unsplash.com/random/200x300?before+you', year: '2012' },
      { id: 'r4', title: 'The Notebook', author: 'Nicholas Sparks', cover: 'https://source.unsplash.com/random/200x300?notebook', year: '1996' },
      { id: 'r5', title: 'Jane Eyre', author: 'Charlotte Brontë', cover: 'https://source.unsplash.com/random/200x300?jane+eyre', year: '1847' },
      { id: 'r6', title: 'The Fault in Our Stars', author: 'John Green', cover: 'https://source.unsplash.com/random/200x300?stars', year: '2012' },
      { id: 'r7', title: 'Wuthering Heights', author: 'Emily Brontë', cover: 'https://source.unsplash.com/random/200x300?wuthering', year: '1847' },
      { id: 'r8', title: 'The Time Traveler\'s Wife', author: 'Audrey Niffenegger', cover: 'https://source.unsplash.com/random/200x300?time+traveler', year: '2003' },
      { id: 'r9', title: 'Call Me by Your Name', author: 'André Aciman', cover: 'https://source.unsplash.com/random/200x300?call+me', year: '2007' },
      { id: 'r10', title: 'The Bridgerton Series', author: 'Julia Quinn', cover: 'https://source.unsplash.com/random/200x300?bridgerton', year: '2000-2013' }
    ]
  },
  biography: {
    name: 'Biography',
    description: 'True accounts of remarkable lives, documenting the experiences, achievements, and challenges of real people throughout history.',
    books: [
      { id: 'b1', title: 'Steve Jobs', author: 'Walter Isaacson', cover: 'https://source.unsplash.com/random/200x300?steve+jobs', year: '2011' },
      { id: 'b2', title: 'Becoming', author: 'Michelle Obama', cover: 'https://source.unsplash.com/random/200x300?michelle+obama', year: '2018' },
      { id: 'b3', title: 'A Promised Land', author: 'Barack Obama', cover: 'https://source.unsplash.com/random/200x300?barack+obama', year: '2020' },
      { id: 'b4', title: 'Alexander Hamilton', author: 'Ron Chernow', cover: 'https://source.unsplash.com/random/200x300?hamilton', year: '2004' },
      { id: 'b5', title: 'Unbroken', author: 'Laura Hillenbrand', cover: 'https://source.unsplash.com/random/200x300?unbroken', year: '2010' },
      { id: 'b6', title: 'Born a Crime', author: 'Trevor Noah', cover: 'https://source.unsplash.com/random/200x300?trevor+noah', year: '2016' },
      { id: 'b7', title: 'The Diary of a Young Girl', author: 'Anne Frank', cover: 'https://source.unsplash.com/random/200x300?anne+frank', year: '1947' },
      { id: 'b8', title: 'Einstein: His Life and Universe', author: 'Walter Isaacson', cover: 'https://source.unsplash.com/random/200x300?einstein', year: '2007' },
      { id: 'b9', title: 'Long Walk to Freedom', author: 'Nelson Mandela', cover: 'https://source.unsplash.com/random/200x300?mandela', year: '1994' },
      { id: 'b10', title: 'Leonardo da Vinci', author: 'Walter Isaacson', cover: 'https://source.unsplash.com/random/200x300?leonardo', year: '2017' }
    ]
  },
  science: {
    name: 'Science',
    description: 'Fascinating explorations of scientific discoveries, theories, and innovations that have shaped our understanding of the natural world.',
    books: [
      { id: 's1', title: 'A Brief History of Time', author: 'Stephen Hawking', cover: 'https://source.unsplash.com/random/200x300?time+history', year: '1988' },
      { id: 's2', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', cover: 'https://source.unsplash.com/random/200x300?sapiens', year: '2011' },
      { id: 's3', title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', cover: 'https://source.unsplash.com/random/200x300?gene', year: '2016' },
      { id: 's4', title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', cover: 'https://source.unsplash.com/random/200x300?henrietta', year: '2010' },
      { id: 's5', title: 'Cosmos', author: 'Carl Sagan', cover: 'https://source.unsplash.com/random/200x300?cosmos', year: '1980' },
      { id: 's6', title: 'The Origin of Species', author: 'Charles Darwin', cover: 'https://source.unsplash.com/random/200x300?species', year: '1859' },
      { id: 's7', title: 'Silent Spring', author: 'Rachel Carson', cover: 'https://source.unsplash.com/random/200x300?spring', year: '1962' },
      { id: 's8', title: 'The Elegant Universe', author: 'Brian Greene', cover: 'https://source.unsplash.com/random/200x300?universe', year: '1999' },
      { id: 's9', title: 'The Structure of Scientific Revolutions', author: 'Thomas S. Kuhn', cover: 'https://source.unsplash.com/random/200x300?scientific', year: '1962' },
      { id: 's10', title: 'The Selfish Gene', author: 'Richard Dawkins', cover: 'https://source.unsplash.com/random/200x300?selfish', year: '1976' }
    ]
  },
  history: {
    name: 'History',
    description: 'Compelling accounts of past events, civilizations, and influential figures that have shaped the course of human civilization.',
    books: [
      { id: 'h1', title: 'Guns, Germs, and Steel', author: 'Jared Diamond', cover: 'https://source.unsplash.com/random/200x300?guns', year: '1997' },
      { id: 'h2', title: 'The Silk Roads', author: 'Peter Frankopan', cover: 'https://source.unsplash.com/random/200x300?silk', year: '2015' },
      { id: 'h3', title: '1776', author: 'David McCullough', cover: 'https://source.unsplash.com/random/200x300?1776', year: '2005' },
      { id: 'h4', title: 'A People\'s History of the United States', author: 'Howard Zinn', cover: 'https://source.unsplash.com/random/200x300?peoples', year: '1980' },
      { id: 'h5', title: 'The Crusades', author: 'Thomas Asbridge', cover: 'https://source.unsplash.com/random/200x300?crusades', year: '2010' },
      { id: 'h6', title: 'SPQR: A History of Ancient Rome', author: 'Mary Beard', cover: 'https://source.unsplash.com/random/200x300?rome', year: '2015' },
      { id: 'h7', title: 'The Rise and Fall of the Third Reich', author: 'William L. Shirer', cover: 'https://source.unsplash.com/random/200x300?reich', year: '1960' },
      { id: 'h8', title: 'Genghis Khan and the Making of the Modern World', author: 'Jack Weatherford', cover: 'https://source.unsplash.com/random/200x300?genghis', year: '2004' },
      { id: 'h9', title: 'The Warmth of Other Suns', author: 'Isabel Wilkerson', cover: 'https://source.unsplash.com/random/200x300?warmth', year: '2010' },
      { id: 'h10', title: 'The Devil in the White City', author: 'Erik Larson', cover: 'https://source.unsplash.com/random/200x300?white+city', year: '2003' }
    ]
  }
};

const GenreDetail = () => {
  const { genreId } = useParams<{ genreId: string }>();
  
  // Find the genre data or use a default if not found
  const genre = genreId && genreData[genreId as keyof typeof genreData] 
    ? genreData[genreId as keyof typeof genreData] 
    : { name: 'Unknown Genre', description: 'No description available', books: [] };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" className="mb-4">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-serif mb-3">Top Books in {genre.name}</h1>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              {genre.description}
            </p>
          </div>
          
          {/* Book Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {genre.books.map((book) => (
              <div key={book.id} className="animate-scale-in">
                <Link to={`/book/${book.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
                    <div className="relative aspect-[2/3]">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {book.year}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {genre.books.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-muted mb-6">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-3">No books found</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any books in this genre. Try exploring other genres instead.
              </p>
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GenreDetail;
