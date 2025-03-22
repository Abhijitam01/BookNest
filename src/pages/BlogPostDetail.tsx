
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Heart, ArrowLeft, Send, Calendar, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for a blog post - in a real app, this would come from the database
const SAMPLE_POST = {
  id: '1',
  title: 'The Magic of Reading Fantasy',
  content: `
    <p>Fantasy literature has always been a window into our own reality, using magical elements to explore very human experiences. When we read stories of dragons and wizards, we're not just escaping our world—we're exploring it through a different lens.</p>
    
    <p>The best fantasy novels are those that, beneath their magical trappings, speak to universal human experiences: love, loss, growth, and the search for meaning. J.R.R. Tolkien's "The Lord of the Rings" isn't just about a quest to destroy a ring; it's about friendship, sacrifice, and the corrupting influence of power.</p>
    
    <p>Similarly, J.K. Rowling's "Harry Potter" series deals with themes of prejudice, family, and coming of age—all set against the backdrop of a magical world that captivates readers of all ages.</p>
    
    <h3>Why Fantasy Resonates</h3>
    
    <p>Fantasy allows writers to explore complex social and philosophical issues in ways that might be too direct or uncomfortable in realistic fiction. By displacing these issues to a magical realm, authors can examine them more freely, and readers can engage with them more openly.</p>
    
    <p>In a world increasingly dominated by technology and rational thought, fantasy reminds us of the importance of wonder and imagination. It encourages us to see the world not just as it is, but as it could be.</p>
    
    <p>As readers, we're drawn to fantasy not just for escapism, but for the profound truths it can reveal about our own world and ourselves.</p>
  `,
  author: {
    id: 'user1',
    name: 'Aisha Singh',
    avatar: 'AS'
  },
  publishedAt: new Date('2023-11-15'),
  likes: 24,
  comments: [
    {
      id: 'c1',
      author: {
        id: 'user2',
        name: 'Marco Jimenez',
        avatar: 'MJ'
      },
      content: 'I completely agree! Fantasy novels have always helped me process real-world issues through a different lens.',
      publishedAt: new Date('2023-11-16'),
      likes: 5
    },
    {
      id: 'c2',
      author: {
        id: 'user3',
        name: 'Sarah Lee',
        avatar: 'SL'
      },
      content: 'Great article! Would love to see your thoughts on science fiction as well.',
      publishedAt: new Date('2023-11-17'),
      likes: 3
    }
  ],
  tags: ['fantasy', 'reading', 'literature']
};

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [post] = useState(SAMPLE_POST);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
    
    // In a real app, you would send this to your API
    console.log(`Post ${id} like toggled to:`, !isLiked);
  };
  
  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    
    // In a real app, you would send this to your API
    console.log(`Adding comment to post ${id}:`, comment);
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
    
    setComment('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-oldPaper">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            asChild 
            variant="ghost" 
            className="mb-6 text-amber-700"
          >
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
          
          <article className="bg-white rounded-lg shadow-md border border-amber-200 overflow-hidden mb-8">
            {/* Post Header */}
            <div className="p-6 md:p-8 border-b border-amber-100">
              <h1 className="text-2xl md:text-3xl font-serif text-amber-800 mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-amber-600" />
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-600" />
                  <span>{post.publishedAt.toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-amber-600" />
                  <div className="flex gap-1">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Post Content */}
            <div 
              className="prose prose-amber max-w-none p-6 md:p-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Post Actions */}
            <div className="px-6 md:px-8 py-4 border-t border-amber-100 flex justify-between items-center">
              <Button 
                variant="ghost" 
                className={`gap-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                <span>{likeCount} likes</span>
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                {post.comments.length} comments
              </Button>
            </div>
          </article>
          
          {/* Comments Section */}
          <section id="comments-section" className="mb-8">
            <h2 className="text-xl font-serif text-amber-800 mb-4">Comments ({post.comments.length})</h2>
            
            {user && (
              <Card className="mb-6 border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <Textarea 
                    placeholder="Share your thoughts..." 
                    className="border-amber-200 focus-visible:ring-amber-500 min-h-[100px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="justify-end">
                  <Button 
                    className="gap-2 bg-gradient-to-r from-amber-600 to-amber-700"
                    onClick={handleSubmitComment}
                    disabled={!comment.trim()}
                  >
                    Post Comment
                    <Send className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {!user && (
              <Card className="mb-6 border-amber-200 bg-amber-50">
                <CardContent className="py-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-muted-foreground">Sign in to join the conversation</p>
                    <Button asChild size="sm">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Comment List */}
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <Card key={comment.id} className="border-amber-100">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {comment.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {comment.publishedAt.toLocaleDateString()}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Heart className={`h-4 w-4`} />
                      </Button>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
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

export default BlogPostDetail;