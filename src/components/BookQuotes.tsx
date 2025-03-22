
import React from 'react';
import { QuoteIcon } from 'lucide-react';

// Beautiful quotes about books and reading
const quotes = [
  {
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin"
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King"
  },
  {
    text: "I do believe something very magical can happen when you read a good book.",
    author: "J.K. Rowling"
  },
  {
    text: "That's the thing about books. They let you travel without moving your feet.",
    author: "Jhumpa Lahiri"
  },
  {
    text: "You can never get a cup of tea large enough or a book long enough to suit me.",
    author: "C.S. Lewis"
  }
];

const BookQuotes = () => {
  // Select a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section className="py-16 bg-gradient-to-r from-amber-100 to-amber-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-md">
          <div className="relative">
            <QuoteIcon className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <p className="text-xl md:text-2xl italic text-gray-800 mb-6 font-serif">
              "{randomQuote.text}"
            </p>
            <p className="text-md font-medium text-amber-800">― {randomQuote.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookQuotes;