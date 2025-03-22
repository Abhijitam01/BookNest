

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/toooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibraryProvider } from "@/context/LibraryContext";
import { BookListsProvider } from "@/context/BookListContext.tsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Search from "./pages/Search.tsx";
import BookDetail from "./pages/BookDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import BookLists from "./pages/BookLists.tsx";
import BookListDetail from "./pages/BookListDetail.tsx";
import Login from "./pages/Login.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPostDetail from "./pages/BlogPostDetail.tsx";
import GenreDetail from "./pages/GenreDetail.tsx";

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