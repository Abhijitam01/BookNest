
// Google Books API integration

interface GoogleBookVolume {
    id: string;
    volumeInfo: {
      title: string;
      subtitle?: string;
      authors?: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
      pageCount?: number;
      categories?: string[];
      averageRating?: number;
      ratingsCount?: number;
      imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
      };
      language?: string;
      previewLink?: string;
      infoLink?: string;
      canonicalVolumeLink?: string;
    };
  }
  
  interface GoogleBookResponse {
    items: GoogleBookVolume[];
    totalItems: number;
    kind: string;
  }
  
  // Convert Google Books API response to our Book model
  export const mapGoogleBookToBook = (googleBook: GoogleBookVolume) => {
    return {
      id: googleBook.id,
      title: googleBook.volumeInfo.title || 'Unknown Title',
      authors: googleBook.volumeInfo.authors || ['Unknown Author'],
      description: googleBook.volumeInfo.description || 'No description available.',
      categories: googleBook.volumeInfo.categories || ['Uncategorized'],
      imageLinks: {
        thumbnail: googleBook.volumeInfo.imageLinks?.thumbnail || '/placeholder.svg',
        smallThumbnail: googleBook.volumeInfo.imageLinks?.smallThumbnail || '/placeholder.svg',
      },
      publishedDate: googleBook.volumeInfo.publishedDate || 'Unknown',
      publisher: googleBook.volumeInfo.publisher || 'Unknown Publisher',
      pageCount: googleBook.volumeInfo.pageCount || 0,
    };
  };
  
  // Search for books using Google Books API
  export const searchBooks = async (query: string, startIndex = 0, maxResults = 20) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data: GoogleBookResponse = await response.json();
      
      // Return empty array if no items are found
      if (!data.items) {
        return { books: [], totalItems: 0 };
      }
  
      const books = data.items.map(mapGoogleBookToBook);
      
      return {
        books,
        totalItems: data.totalItems,
      };
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  };
  
  // Get a specific book by its ID
  export const getBookById = async (id: string) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data: GoogleBookVolume = await response.json();
      return mapGoogleBookToBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  };