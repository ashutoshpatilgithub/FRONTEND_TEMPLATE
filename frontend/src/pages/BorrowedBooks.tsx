import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const BorrowedBooks = () => {
  const { user } = useAuth();
  const { books, borrowedBooks, users, borrowBook, returnBook } = useLibrary();
  const [activeTab, setActiveTab] = useState<'borrowed' | 'overdue'>('borrowed');

  // Modal State
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [dueDate, setDueDate] = useState('');

  if (user?.role !== 'librarian') {
    return <Navigate to="/catalog" replace />;
  }

  const now = new Date();
  const activeBorrows = borrowedBooks.filter(b => !b.returned);
  const overdueBorrows = borrowedBooks.filter(b => !b.returned && new Date(b.due_date) < now);
  const displayData = activeTab === 'borrowed' ? activeBorrows : overdueBorrows;

  const handleReturn = (borrowId: string) => {
    returnBook(borrowId);
    toast.success('Book returned successfully!');
  };

  const handleRecordBorrow = () => {
    if (!selectedUserId || !selectedBookId || !rentPrice || !dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    const selectedUser = users.find(u => u.id === selectedUserId);
    if (!selectedUser) {
      toast.error('Invalid user selected');
      return;
    }

    // Pass custom dates and prices to the context wrapper
    borrowBook(
      selectedBookId,
      selectedUserId,
      selectedUser.name,
      selectedUser.email,
      new Date(dueDate).toISOString(),
      parseFloat(rentPrice)
    );

    toast.success('Borrow recorded successfully!');
    setShowBorrowModal(false);
    setSelectedUserId('');
    setSelectedBookId('');
    setRentPrice('');
    setDueDate('');
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formatDateTime = (dateStr: string) => `${formatDate(dateStr)} ${new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;

  // Filter out users who are admins, just readers
  const readers = users.filter(u => u.role === 'reader');
  // Filter available books
  const availableBooks = books.filter(b => b.available && b.quantity > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground font-display">Borrow Management</h1>
        <Button onClick={() => setShowBorrowModal(true)} className="gap-2 transition-all duration-200 hover:scale-105 active:scale-95">
          <Plus className="h-4 w-4" /> Record Borrow
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex">
        {(['borrowed', 'overdue'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 text-sm font-medium transition-all duration-200 ${tab === 'borrowed' ? 'rounded-l-md' : 'rounded-r-md'
              } ${activeTab === tab
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
          >
            {tab === 'borrowed' ? 'Borrowed Books' : 'Overdue Borrowers'}
            {tab === 'overdue' && overdueBorrows.length > 0 && (
              <Badge variant="destructive" className="ml-2 text-[10px] px-1.5">{overdueBorrows.length}</Badge>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold">ID</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Username</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Email</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Book</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Rent Price</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Due Date</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Borrow Date</TableHead>
              <TableHead className="text-primary-foreground font-semibold text-center">Return</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((borrow, idx) => {
              const overdue = new Date(borrow.due_date) < now;
              return (
                <TableRow key={borrow.id} className={`transition-colors duration-150 hover:bg-accent/50 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{borrow.borrower_name}</TableCell>
                  <TableCell>{borrow.borrower_email}</TableCell>
                  <TableCell className="font-medium">{borrow.book_title}</TableCell>
                  <TableCell>₹{borrow.price.toFixed(2)}</TableCell>
                  <TableCell className={overdue ? 'text-destructive font-bold' : ''}>
                    {formatDate(borrow.due_date)}
                    {overdue && <Badge variant="destructive" className="ml-2 text-[10px] px-1.5 leading-none">OVERDUE</Badge>}
                  </TableCell>
                  <TableCell>{formatDateTime(borrow.borrow_date)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      variant={overdue ? "destructive" : "default"}
                      onClick={() => handleReturn(borrow.id)}
                      disabled={borrow.returned}
                      className="h-8 transition-transform duration-200 hover:scale-105"
                    >
                      Mark Returned
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {displayData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {activeTab === 'borrowed' ? 'No active borrows' : 'No overdue borrowers'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Record Borrow Dialog */}
      <Dialog open={showBorrowModal} onOpenChange={setShowBorrowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record New Borrow</DialogTitle>
            <DialogDescription>Select a reader, an available book, and set terms.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Select Reader</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger><SelectValue placeholder="Search reader by name/email" /></SelectTrigger>
                <SelectContent>
                  {readers.length === 0 ? (
                    <SelectItem value="none" disabled>No readers found</SelectItem>
                  ) : readers.map(r => (
                    <SelectItem key={r.id} value={r.id}>{r.name} ({r.email})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Book</Label>
              <Select value={selectedBookId} onValueChange={(val) => {
                setSelectedBookId(val);
                // Auto-fill rent price with book's default price
                const book = books.find(b => b.id === val);
                if (book) setRentPrice(String(book.price));
              }}>
                <SelectTrigger><SelectValue placeholder="Search available books" /></SelectTrigger>
                <SelectContent>
                  {availableBooks.length === 0 ? (
                    <SelectItem value="none" disabled>No books available</SelectItem>
                  ) : availableBooks.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.title} - ({b.quantity} left)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rent Price (₹)</Label>
                <Input type="number" step="0.01" min="0" placeholder="0.00" value={rentPrice} onChange={(e) => setRentPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input type="date" min={format(new Date(), 'yyyy-MM-dd')} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBorrowModal(false)}>Cancel</Button>
            <Button onClick={handleRecordBorrow}>Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowedBooks;
