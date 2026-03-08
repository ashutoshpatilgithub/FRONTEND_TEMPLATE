import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addBook as addBookAction, deleteBook as deleteBookAction } from '@/store/slices/bookSlice.js';
import { fetchAdminBorrowedBooks, fetchMyBorrowedBooks, recordBorrowedBook, returnBorrowedBook } from '@/store/slices/borrowSlice.js';
import { fetchAllUsers } from '@/store/slices/userSlice.js';
import { Book, BorrowedBook, UserProfile, Notification } from '@/types';

interface LibraryContextType {
    books: Book[];
    borrowedBooks: BorrowedBook[];
    users: UserProfile[];
    notifications: Notification[];
    loading: boolean;
    addBook: (book: Omit<Book, 'id' | 'created_at' | 'available'>) => void;
    deleteBook: (id: string) => void;
    updateBook: (id: string, updates: Partial<Book>) => void;
    borrowBook: (bookId: string, userId: string, userName: string, userEmail: string, customDueDate?: string, customPrice?: number) => boolean;
    returnBook: (borrowId: string) => void;
    addUser: (user: any) => void;
    searchBooks: (query: string) => Book[];
    markNotificationRead: (id: string) => void;
    unreadNotificationCount: number;
    refreshBooks: () => void;
    refreshBorrowedBooks: () => void;
    refreshUsers: () => void;
}

const LibraryContext = createContext<LibraryContextType>({} as LibraryContextType);

export const useLibrary = () => useContext(LibraryContext);

// Map backend book to loveable Book type
function mapBook(b: any): Book {
    return {
        id: b.id,
        title: b.title,
        author: b.author,
        description: b.description || '',
        price: b.price,
        quantity: b.quantity,
        available: b.availability ?? b.quantity > 0,
        genre: b.genre || undefined,
        cover_url: b.coverUrl || undefined,
        created_at: b.createdAt || new Date().toISOString(),
    };
}

// Map backend borrow to loveable BorrowedBook type
function mapBorrow(b: any): BorrowedBook {
    return {
        id: b.id,
        book_id: b.bookId,
        user_id: b.userId,
        book_title: b.bookTitle || b.book?.title || '',
        book_author: b.book?.author || '',
        borrower_name: b.user?.name || '',
        borrower_email: b.user?.email || '',
        price: b.price,
        borrow_date: b.borrowDate || b.createdAt,
        due_date: b.dueDate,
        returned: b.returned,
        return_date: b.returnDate || undefined,
    };
}

// Map backend user to loveable UserProfile type
function mapUser(u: any): UserProfile {
    return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role === 'Admin' ? 'librarian' : 'reader',
        created_at: u.createdAt || new Date().toISOString(),
        books_borrowed: u._count?.borrows || 0,
        libraries_visited: 0,
        total_books_read: 0,
    };
}

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<any>();
    const bookState = useSelector((state: any) => state.book);
    const borrowState = useSelector((state: any) => state.borrow);
    const userState = useSelector((state: any) => state.user);
    const authState = useSelector((state: any) => state.auth);

    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', user_id: '', message: 'Welcome to BookWorm Library!', type: 'info', read: false, created_at: new Date().toISOString() },
    ]);

    const loading = bookState?.loading || borrowState?.loading || userState?.loading;

    // Fetch data on mount
    useEffect(() => {
        if (authState?.isAuthenticated) {
            dispatch(fetchBooks());
            if (authState?.user?.role === 'Admin') {
                dispatch(fetchAdminBorrowedBooks());
                dispatch(fetchAllUsers());
            } else {
                dispatch(fetchMyBorrowedBooks());
            }
        }
    }, [dispatch, authState?.isAuthenticated, authState?.user?.role]);


    const books: Book[] = (bookState?.books || []).map(mapBook);
    const borrowedBooks: BorrowedBook[] = (
        authState?.user?.role === 'Admin'
            ? borrowState?.adminBorrowedBooks || []
            : borrowState?.myBorrowedBooks || []
    ).map(mapBorrow);
    const users: UserProfile[] = (userState?.users || []).map(mapUser);

    const refreshBooks = useCallback(() => { dispatch(fetchBooks()); }, [dispatch]);
    const refreshBorrowedBooks = useCallback(() => {
        if (authState?.user?.role === 'Admin') {
            dispatch(fetchAdminBorrowedBooks());
        } else {
            dispatch(fetchMyBorrowedBooks());
        }
    }, [dispatch, authState?.user?.role]);
    const refreshUsers = useCallback(() => { dispatch(fetchAllUsers()); }, [dispatch]);

    const addBook = useCallback((book: Omit<Book, 'id' | 'created_at' | 'available'>) => {
        dispatch(addBookAction({
            title: book.title,
            author: book.author,
            description: book.description,
            price: String(book.price),
            quantity: String(book.quantity),
            genre: book.genre || '',
            cover_url: book.cover_url || '',
        })).then(() => dispatch(fetchBooks()));
    }, [dispatch]);

    const deleteBook = useCallback((id: string) => {
        dispatch(deleteBookAction(id)).then(() => dispatch(fetchBooks()));
    }, [dispatch]);

    const updateBook = useCallback((_id: string, _updates: Partial<Book>) => {
        // TODO: implement update book API
    }, []);

    const borrowBook = useCallback((bookId: string, _userId: string, _userName: string, userEmail: string, customDueDate?: string, customPrice?: number): boolean => {
        dispatch(recordBorrowedBook({ id: bookId, email: userEmail, customDueDate, customPrice })).then(() => {
            dispatch(fetchBooks());
            dispatch(fetchAdminBorrowedBooks());
        });
        return true;
    }, [dispatch]);

    const returnBook = useCallback((borrowId: string) => {
        // Find the borrow to get bookId and email
        const borrow = borrowedBooks.find(b => b.id === borrowId);
        if (!borrow) return;
        dispatch(returnBorrowedBook({ id: borrow.book_id, email: borrow.borrower_email })).then(() => {
            dispatch(fetchBooks());
            dispatch(fetchAdminBorrowedBooks());
        });
    }, [dispatch, borrowedBooks]);

    const addUser = useCallback((_user: any) => {
        // Users are added via registration
    }, []);

    const searchBooks = useCallback((query: string) => {
        const q = query.toLowerCase();
        return books.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.genre?.toLowerCase().includes(q)
        );
    }, [books]);

    const markNotificationRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);

    const unreadNotificationCount = notifications.filter(n => !n.read).length;

    return (
        <LibraryContext.Provider value={{
            books, borrowedBooks, users, notifications, loading,
            addBook, deleteBook, updateBook, borrowBook, returnBook,
            addUser, searchBooks, markNotificationRead, unreadNotificationCount,
            refreshBooks, refreshBorrowedBooks, refreshUsers,
        }}>
            {children}
        </LibraryContext.Provider>
    );
};
