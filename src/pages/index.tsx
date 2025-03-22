import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BookQuotes from '@/components/BookQuotes';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Sparkles, BookMarked, Search, Bookmark, Book, Library, BookText, Heart, ImagePlus, Link2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const bookGenres = [
    { id: 'classics', name: 'Classic Tales', color: 'bg-red-600' },
    { id: 'adventure', name: 'Adventures', color: 'bg-blue-700' },
    { id: 'mystery', name: 'Mystery', color: 'bg-green-600' },
    { id: 'fantasy', name: 'Fantasy', color: 'bg-yellow-600' },
    { id: 'romance', name: 'Romance', color: 'bg-purple-600' },
    { id: 'biography', name: 'Biography', color: 'bg-pink-600' },
    { id: 'science', name: 'Science', color: 'bg-amber-700' },
    { id: 'history', name: 'History', color: 'bg-teal-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 paper-texture">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
                Your Journey Through
                <span className="text-primary"> the World of Books</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:200ms]">
                Discover stories, organize your reading life, and connect with fellow book lovers at KitaabGhar - 
                where every page turns into an adventure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:400ms]">
                <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700">
                  <Link to="/dashboard">
                    Explore the Library
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                  <Link to="/search">
                    Browse Books
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Floating books decoration */}
          <div className="hidden md:block absolute -bottom-8 left-10 w-24 h-32 bg-oldPaper rounded-lg shadow-bookCover transform rotate-12 animate-book-tilt"></div>
          <div className="hidden md:block absolute -bottom-4 right-10 w-20 h-28 bg-cafeAuLait/30 rounded-lg shadow-bookCover transform -rotate-6 animate-book-tilt"></div>
        </section>
        
        {/* Book Genres Section - Updated to be clickable and bigger */}
        <section className="py-12 overflow-hidden bg-oldPaper">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
              Explore <span className="text-primary">Book Genres</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {bookGenres.map((genre) => (
                <Link 
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="transition-transform hover:scale-105"
                >
                  <div className={`${genre.color} h-40 rounded-lg shadow-lg flex items-center justify-center p-4 cursor-pointer`}>
                    <span className="text-white font-serif text-xl md:text-2xl text-center">
                      {genre.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* 3D Book Display - Enhanced */}
        <section className="py-16 bg-gradient-to-b from-oldPaper to-amber-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-6">
              Discover <span className="text-primary">Literary Treasures</span>
            </h2>
            <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              Immerse yourself in captivating worlds through our curated collection of literary masterpieces. Each book offers a unique adventure waiting to be explored.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* 3D Book 1 */}
              <div className="book relative w-48 h-64 perspective-1000 group">
                <div className="absolute inset-0 book-cover transition-transform duration-500 transform group-hover:rotate-y-30 shadow-bookStack">
                  <div className="absolute inset-0 bg-amber-700 rounded-md border-r-8 border-amber-900">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                      <span className="font-serif text-xl text-center font-bold mb-2">The Great Adventures</span>
                      <span className="text-xs opacity-80">An epic journey through time</span>
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-amber-900 to-amber-800"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-center">
                    <span>J.R. Martin</span>
                    <div className="flex gap-1">
                      <span className="px-1 py-0.5 bg-green-600 rounded-sm text-xs">Fantasy</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 3D Book 2 */}
              <div className="book relative w-48 h-64 perspective-1000 group">
                <div className="absolute inset-0 book-cover transition-transform duration-500 transform group-hover:rotate-y-30 shadow-bookStack">
                  <div className="absolute inset-0 bg-blue-700 rounded-md border-r-8 border-blue-900">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                      <span className="font-serif text-xl text-center font-bold mb-2">Mystery of the Ages</span>
                      <span className="text-xs opacity-80">A thrilling detective story</span>
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-blue-900 to-blue-800"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-center">
                    <span>A. Christie</span>
                    <div className="flex gap-1">
                      <span className="px-1 py-0.5 bg-red-600 rounded-sm text-xs">Mystery</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 3D Book 3 */}
              <div className="book relative w-48 h-64 perspective-1000 group">
                <div className="absolute inset-0 book-cover transition-transform duration-500 transform group-hover:rotate-y-30 shadow-bookStack">
                  <div className="absolute inset-0 bg-green-700 rounded-md border-r-8 border-green-900">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                      <span className="font-serif text-xl text-center font-bold mb-2">Forest of Whispers</span>
                      <span className="text-xs opacity-80">Nature's secrets revealed</span>
                    </div>
                  </div>
                  <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-green-900 to-green-800"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-center">
                    <span>T. Tolkien</span>
                    <div className="flex gap-1">
                      <span className="px-1 py-0.5 bg-green-600 rounded-sm text-xs">Nature</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote Section - Using the new BookQuotes component */}
        <BookQuotes />
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-oldPaper">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
              The Joy of Reading, <span className="text-primary">Organized</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-6 shadow-bookCover border border-amber-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-2">Discover Books</h3>
                <p className="text-muted-foreground">
                  Explore millions of books through our extensive collection. Find your next great read based on your interests.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-6 shadow-bookCover border border-amber-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Library className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-2">Build Your Library</h3>
                <p className="text-muted-foreground">
                  Create a personalized collection of books you've read, want to read, or are currently reading.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-6 shadow-bookCover border border-amber-100 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif mb-2">Curate Collections</h3>
                <p className="text-muted-foreground">
                  Organize your books into custom lists, track your reading progress, and share your recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Feature Highlight - Improved Alignment */}
        <section className="py-16 bg-gradient-to-b from-amber-50 to-oldPaper">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-left">
                  Share Your <span className="text-primary">Reading Journey</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6 text-left">
                  Join our community of book lovers in the Reader's Corner. Share your thoughts, write reviews, and discuss your favorite books.
                </p>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-5 w-5 mt-1 text-amber-600" />
                    <div>
                      <h3 className="font-medium">Write Blog Posts</h3>
                      <p className="text-sm text-muted-foreground">Share your thoughts on books, authors, and literary themes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="h-5 w-5 mt-1 text-amber-600" />
                    <div>
                      <h3 className="font-medium">Engage with Others</h3>
                      <p className="text-sm text-muted-foreground">Like and comment on posts from fellow readers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ImagePlus className="h-5 w-5 mt-1 text-amber-600" />
                    <div>
                      <h3 className="font-medium">Add Photos & Media</h3>
                      <p className="text-sm text-muted-foreground">Enhance your notes with photos and meaningful links</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Link2 className="h-5 w-5 mt-1 text-amber-600" />
                    <div>
                      <h3 className="font-medium">Share Resources</h3>
                      <p className="text-sm text-muted-foreground">Add links to related resources and insightful articles</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="mt-6 gap-2 bg-gradient-to-r from-amber-600 to-amber-700">
                  <Link to="/blog">
                    Visit the Blog
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative z-10 bg-white p-4 rounded-lg shadow-bookCover rotate-3 max-w-md mx-auto">
                  <div className="p-2 border border-amber-100 rounded-md">
                    <h3 className="font-serif text-lg text-amber-800 mb-2">The Magic of Reading Fantasy</h3>
                    <p className="text-sm text-muted-foreground mb-3">Fantasy literature has always been a window into our own reality, using magical elements to explore very human experiences...</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>By Aisha Singh</span>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>24</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-6 -left-4 bg-white p-4 rounded-lg shadow-bookCover -rotate-6 w-40 h-48 hidden md:block"></div>
                <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-bookCover rotate-12 w-48 h-32 hidden md:block"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Open Book Section */}
        <section className="py-16 bg-oldPaper overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative max-w-4xl mx-auto">
              <div className="flex">
                {/* Left Page */}
                <div className="w-1/2 bg-parchment shadow-page page-edge p-8 rounded-tl-lg rounded-bl-lg">
                  <h3 className="text-2xl font-serif text-inkBlue mb-4">Welcome to KitaabGhar</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    At KitaabGhar, we believe that books have the power to transform lives. Our mission is to connect readers with the stories that inspire, entertain, and enlighten.
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Whether you're a casual reader or a devoted bibliophile, KitaabGhar offers tools to enhance your reading experience and discover new literary treasures.
                  </p>
                </div>
                
                {/* Right Page */}
                <div className="w-1/2 bg-parchment shadow-page p-8 rounded-tr-lg rounded-br-lg">
                  <h3 className="text-2xl font-serif text-inkBlue mb-4">Start Your Journey</h3>
                  <ul className="text-sm text-gray-700 space-y-3">
                    <li className="flex items-start gap-2">
                      <BookOpen className="h-4 w-4 mt-1 text-primary" />
                      <span>Browse our vast collection of books across genres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BookMarked className="h-4 w-4 mt-1 text-primary" />
                      <span>Create personalized lists of favorites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 mt-1 text-primary" />
                      <span>Discover new authors and recommendations</span>
                    </li>
                  </ul>
                  <Button asChild className="mt-6" variant="outline">
                    <Link to="/search">Start Exploring</Link>
                  </Button>
                </div>
              </div>
              
              {/* Book Binding */}
              <div className="absolute top-0 bottom-0 left-1/2 w-3 -ml-1.5 bg-gradient-to-r from-amber-700 to-amber-800 z-10"></div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-oldPaper">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join KitaabGhar today and start building your personal digital library. 
              Discover new books, track your reading, and connect with a community of readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700">
                <Link to="/dashboard">
                  Visit the Library
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                <Link to="/search">
                  Find Your Next Read
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Enhanced Footer */}
      <footer className="bg-inkBlue text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-amber-400" />
                <span className="text-xl font-serif">KitaabGhar</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your digital reading companion. Discover, organize, and share your literary journey.
              </p>
            </div>
            
            <div>
              <h3 className="text-amber-400 font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">Your Library</Link></li>
                <li><Link to="/search" className="text-gray-300 hover:text-white transition-colors text-sm">Search Books</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Reader's Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-amber-400 font-medium mb-4">Book Categories</h3>
              <ul className="space-y-2">
                {bookGenres.slice(0, 4).map(genre => (
                  <li key={genre.id}>
                    <Link to={`/genre/${genre.id}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-amber-400 font-medium mb-4">Reading Status</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-900/30 text-green-300 hover:bg-green-900/50">Purchased</Badge>
                <Badge variant="outline" className="bg-gray-700/30 text-gray-300 hover:bg-gray-700/50">Not Purchased</Badge>
                <Badge variant="outline" className="bg-blue-900/30 text-blue-300 hover:bg-blue-900/50">Reading</Badge>
                <Badge variant="outline" className="bg-amber-900/30 text-amber-300 hover:bg-amber-900/50">Planning</Badge>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 sm:mb-0">
              © {new Date().getFullYear()} KitaabGhar. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <
