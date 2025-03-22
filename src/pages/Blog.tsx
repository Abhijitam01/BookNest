
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { BookOpen, Heart, MessageCircle, Edit, Clock, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import BlogPostForm from '@/components/BlogPostForm';

// Mock data for blog posts - in a real app, this would come from the database
const SAMPLE_POSTS = [
  {
    id: '1',
    title: 'The Magic of Reading Fantasy',
    excerpt: 'Exploring how fantasy literature helps us understand our own reality through magical metaphors...',
    content: 'Fantasy literature has always been a window into our own reality, using magical elements to explore very human experiences...',
    author: {
      id: 'user1',
      name: 'Aisha Singh',
      avatar: 'AS'
    },
    publishedAt: new Date('2023-11-15'),
    likes: 24,
    comments: 7,
    tags: ['fantasy', 'reading']
  },
  {
    id: '2',
    title: 'Why Classic Literature Still Matters',
    excerpt: 'Discussing the timeless nature of classic books and their relevance in our modern world...',
    content: 'In an age of constant innovation and technological advancement, the works of Shakespeare, Austen, and Dickens continue to resonate...',
    author: {
      id: 'user2',
      name: 'Marco Jimenez',
      avatar: 'MJ'
    },
    publishedAt: new Date('2023-11-10'),
    likes: 42,
    comments: 15,
    tags: ['classics', 'literature']
  }
];

const Blog = () => {
  const { user } = useAuth();
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts] = useState(SAMPLE_POSTS);

  return (
    <div className="min-h-screen flex flex-col bg-oldPaper">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-amber-800">Reader's Corner</h1>
              <p className="text-muted-foreground mt-2">Thoughts, reviews, and literary musings from our community</p>
            </div>
            
            {user && (
              <Button 
                onClick={() => setShowPostForm(!showPostForm)} 
                className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700"
              >
                {showPostForm ? 'Cancel' : 'Write a Post'}
                {!showPostForm && <Edit className="h-4 w-4" />}
              </Button>
            )}
          </div>
          
          {showPostForm && (
            <div className="mb-10">
              <BlogPostForm onCancel={() => setShowPostForm(false)} />
            </div>
          )}
          
          {!user && !showPostForm && (
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Join the conversation</h3>
                    <p className="text-muted-foreground">Sign in to share your thoughts and connect with fellow readers</p>
                  </div>
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="border-amber-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-serif hover:text-amber-700 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="bg-primary/20 text-primary text-xs">
                              {post.author.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span>{post.author.name}</span>
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.publishedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-amber-100 pt-4">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-amber-700">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-amber-700">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-amber-700">
                    <Link to={`/blog/${post.id}`}>
                      Read More
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination className="mt-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-inkBlue text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-serif">KitaabGhar</span>
            </div>
            <div className="text-sm text-gray-300">
              © {new Date().getFullYear()} KitaabGhar. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;