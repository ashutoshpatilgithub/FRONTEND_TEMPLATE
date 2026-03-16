import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, BookOpen, FileEdit, Search, Trash2, Link, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { BOOK_CATEGORIES } from '@/types';

const Books = () => {
  const { user } = useAuth();
  const { books, addBook, deleteBook, searchBooks } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddBook, setShowAddBook] = useState(false);
  const [showViewBook, setShowViewBook] = useState<string | null>(null);
  const [showRecordBook, setShowRecordBook] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [newBook, setNewBook] = useState({ title: '', author: '', price: '', quantity: '', description: '', genre: '', cover_url: '' });
  const [recordForm, setRecordForm] = useState({ title: '', author: '', price: '', quantity: '', description: '', genre: '', cover_url: '' });
  const addFileRef = useRef<HTMLInputElement>(null);
  const recordFileRef = useRef<HTMLInputElement>(null);

  // Compress image to max 400px wide, 70% quality — keeps uploads fast
  const compressImage = (file: File, onDone: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 400;
        const scale = img.width > MAX ? MAX / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        onDone(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (user?.role !== 'librarian') {
    return <Navigate to="/catalog" replace />;
  }

  const filteredBooks = searchQuery ? searchBooks(searchQuery) : books;
  const viewBook = showViewBook ? books.find(b => b.id === showViewBook) : null;



  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.price || !newBook.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }
    addBook({
      title: newBook.title,
      author: newBook.author,
      price: parseFloat(newBook.price),
      quantity: parseInt(newBook.quantity),
      description: newBook.description,
      genre: newBook.genre || undefined,
      cover_url: newBook.cover_url || undefined,
    });
    toast.success('Book added successfully!');
    setNewBook({ title: '', author: '', price: '', quantity: '', description: '', genre: '', cover_url: '' });
    setShowAddBook(false);
  };

  const handleRecordBook = () => {
    if (!recordForm.title || !recordForm.author || !recordForm.price || !recordForm.quantity) {
      toast.error('Please fill in all required fields');
      return;
    }
    addBook({
      title: recordForm.title,
      author: recordForm.author,
      price: parseFloat(recordForm.price),
      quantity: parseInt(recordForm.quantity),
      description: recordForm.description,
      genre: recordForm.genre || undefined,
      cover_url: recordForm.cover_url || undefined,
    });
    toast.success('Book recorded successfully!');
    setRecordForm({ title: '', author: '', price: '', quantity: '', description: '', genre: '', cover_url: '' });
    setShowRecordBook(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteBook(deleteId);
    toast.success('Book deleted successfully!');
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground font-display">Book Management</h1>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowAddBook(true)} className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
            <Plus className="h-4 w-4" /> Add Book
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-48 transition-all duration-200 focus:w-64"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold">ID</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Cover</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Name</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Author</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Category</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Quantity</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Price</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Availability</TableHead>
              <TableHead className="text-primary-foreground font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book, idx) => (
              <TableRow key={book.id} className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="h-10 w-8 object-cover rounded shadow-sm" />
                  ) : (
                    <div className="h-10 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  {book.genre && <Badge variant="outline" className="text-xs">{book.genre}</Badge>}
                </TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>₹{book.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={book.available ? 'default' : 'destructive'} className={book.available ? 'bg-primary/10 text-foreground border border-border' : ''}>
                    {book.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <button onClick={() => setShowViewBook(book.id)} className="p-1.5 rounded hover:bg-muted transition-all duration-200 hover:scale-110" title="View">
                      <BookOpen className="h-4 w-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => {
                        setRecordForm({
                          title: book.title, author: book.author, price: String(book.price),
                          quantity: String(book.quantity), description: book.description,
                          genre: book.genre || '', cover_url: book.cover_url || '',
                        });
                        setShowRecordBook(true);
                      }}
                      className="p-1.5 rounded hover:bg-muted transition-all duration-200 hover:scale-110" title="Record"
                    >
                      <FileEdit className="h-4 w-4 text-foreground" />
                    </button>
                    <button onClick={() => setDeleteId(book.id)} className="p-1.5 rounded hover:bg-destructive/10 transition-all duration-200 hover:scale-110" title="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this book? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Book Dialog */}
      <Dialog open={showAddBook} onOpenChange={setShowAddBook}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>Add a new book to the library collection.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Link className="h-3.5 w-3.5" /> Cover Image</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL here..."
                  value={newBook.cover_url.startsWith('data:') ? '' : newBook.cover_url}
                  onChange={(e) => setNewBook(p => ({ ...p, cover_url: e.target.value }))}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 gap-1.5"
                  onClick={() => addFileRef.current?.click()}
                >
                  <Upload className="h-3.5 w-3.5" /> Browse
                </Button>
                <input
                  ref={addFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) compressImage(file, (url) => setNewBook(p => ({ ...p, cover_url: url })));
                    e.target.value = '';
                  }}
                />
              </div>
              {newBook.cover_url && (
                <img src={newBook.cover_url} alt="Preview" className="h-24 object-contain rounded border" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div className="space-y-2">
              <Label>Book Title *</Label>
              <Input placeholder="Book Title" value={newBook.title} onChange={(e) => setNewBook(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Book Author *</Label>
              <Input placeholder="Book Author" value={newBook.author} onChange={(e) => setNewBook(p => ({ ...p, author: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newBook.genre} onValueChange={(v) => setNewBook(p => ({ ...p, genre: v }))}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {BOOK_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input placeholder="0.00" type="number" value={newBook.price} onChange={(e) => setNewBook(p => ({ ...p, price: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Quantity *</Label>
                <Input placeholder="0" type="number" value={newBook.quantity} onChange={(e) => setNewBook(p => ({ ...p, quantity: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Book's Description" value={newBook.description} onChange={(e) => setNewBook(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBook(false)}>Close</Button>
            <Button onClick={handleAddBook} className="transition-all duration-200 hover:scale-105 active:scale-95">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Book Info Dialog */}
      <Dialog open={!!showViewBook} onOpenChange={() => setShowViewBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Book Info</DialogTitle>
            <DialogDescription>Book details and description.</DialogDescription>
          </DialogHeader>
          {viewBook && (
            <div className="space-y-4">
              {viewBook.cover_url && (
                <div className="flex justify-center">
                  <img src={viewBook.cover_url} alt={viewBook.title} className="h-40 object-contain rounded-lg shadow-md" />
                </div>
              )}
              <div className="space-y-2">
                <Label>Book Title</Label>
                <Input value={viewBook.title} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={viewBook.author} readOnly className="bg-muted" />
              </div>
              {viewBook.genre && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={viewBook.genre} readOnly className="bg-muted" />
                </div>
              )}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={viewBook.description} readOnly className="bg-muted" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewBook(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Book Dialog */}
      <Dialog open={showRecordBook} onOpenChange={setShowRecordBook}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Record Book</DialogTitle>
            <DialogDescription>Record a book borrowing for walk-in users.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Link className="h-3.5 w-3.5" /> Cover Image</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste image URL here..."
                  value={recordForm.cover_url.startsWith('data:') ? '' : recordForm.cover_url}
                  onChange={(e) => setRecordForm(p => ({ ...p, cover_url: e.target.value }))}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 gap-1.5"
                  onClick={() => recordFileRef.current?.click()}
                >
                  <Upload className="h-3.5 w-3.5" /> Browse
                </Button>
                <input
                  ref={recordFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) compressImage(file, (url) => setRecordForm(p => ({ ...p, cover_url: url })));
                    e.target.value = '';
                  }}
                />
              </div>
              {recordForm.cover_url && (
                <img src={recordForm.cover_url} alt="Preview" className="h-24 object-contain rounded border" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div className="space-y-2">
              <Label>Book Title *</Label>
              <Input placeholder="Book Title" value={recordForm.title} onChange={(e) => setRecordForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Book Author *</Label>
              <Input placeholder="Book Author" value={recordForm.author} onChange={(e) => setRecordForm(p => ({ ...p, author: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={recordForm.genre} onValueChange={(v) => setRecordForm(p => ({ ...p, genre: v }))}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {BOOK_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price *</Label>
                <Input placeholder="0.00" type="number" value={recordForm.price} onChange={(e) => setRecordForm(p => ({ ...p, price: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Quantity *</Label>
                <Input placeholder="0" type="number" value={recordForm.quantity} onChange={(e) => setRecordForm(p => ({ ...p, quantity: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Book's Description" value={recordForm.description} onChange={(e) => setRecordForm(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecordBook(false)}>Close</Button>
            <Button onClick={handleRecordBook} className="transition-all duration-200 hover:scale-105 active:scale-95">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Books;
