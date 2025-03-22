
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "@/context/LibraryContext";
import { BookListsProvider } from "@/context/BookListsContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";
import NotFound from "./pages/NotFound";
import BookLists from "./pages/BookLists";
import BookListDetail from "./pages/BookListDetail";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import GenreDetail from "./pages/GenreDetail";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <LibraryProvider>
              <BookListsProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/book/:id" element={<BookDetail />} />
                  <Route path="/lists" element={<BookLists />} />
                  <Route path="/list/:id" element={<BookListDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPostDetail />} />
                  <Route path="/genre/:genreId" element={<GenreDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BookListsProvider>
            </LibraryProvider>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;