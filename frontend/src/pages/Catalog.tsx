import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { BOOK_CATEGORIES } from '@/types';

const Catalog = () => {
  const { user } = useAuth();
  const { books, borrowBook, borrowedBooks, searchBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('all');

  let filteredBooks = searchQuery ? searchBooks(searchQuery) : books;
  if (genreFilter && genreFilter !== 'all') {
    filteredBooks = filteredBooks.filter(b => b.genre === genreFilter);
  }

  const userActiveBorrows = borrowedBooks.filter(b => b.user_id === user?.id && !b.returned).length;

  const handleBorrow = (bookId: string) => {
    if (!user) return;
    if (userActiveBorrows >= 3) {
      toast.error('You have reached the maximum borrowing limit (3 books)');
      return;
    }
    const success = borrowBook(bookId, user.id, user.name, user.email);
    if (success) toast.success('Book borrowed successfully! Due in 14 days.');
    else toast.error('Unable to borrow this book');
  };

  const isBookBorrowedByUser = (bookId: string) =>
    borrowedBooks.some(b => b.book_id === bookId && b.user_id === user?.id && !b.returned);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground font-display">Catalog</h1>
        <div className="flex items-center gap-3 flex-wrap">
          {user?.role === 'reader' && (
            <Badge variant="outline" className="text-xs">{userActiveBorrows}/3 borrowed</Badge>
          )}
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-36 h-9 text-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {BOOK_CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 transition-all duration-200 focus:w-80"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredBooks.map((book, idx) => (
          <Card
            key={book.id}
            className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-default"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <CardContent className="p-0">
              <div className="h-48 bg-muted overflow-hidden relative">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground/30 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                )}
                {book.genre && (
                  <Badge variant="secondary" className="absolute top-2 right-2 text-[10px] backdrop-blur-sm bg-background/80">
                    {book.genre}
                  </Badge>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">₹{book.price.toFixed(2)}</span>
                  <Badge variant={book.available ? 'default' : 'destructive'} className={book.available ? 'bg-primary/10 text-foreground border border-border text-xs' : 'text-xs'}>
                    {book.available ? `${book.quantity} left` : 'Unavailable'}
                  </Badge>
                </div>
                {user?.role === 'reader' && (
                  <Button
                    size="sm"
                    className="w-full mt-2 gap-1.5 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    disabled={!book.available || isBookBorrowedByUser(book.id)}
                    onClick={() => handleBorrow(book.id)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {isBookBorrowedByUser(book.id) ? 'Already Borrowed' : 'Borrow'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
