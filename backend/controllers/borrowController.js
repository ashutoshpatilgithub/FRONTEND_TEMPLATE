import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { prisma } from "../lib/prisma.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { email } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await prisma.user.findFirst({
        where: { email, accountVerified: true },
    });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    if (book.quantity === 0) {
        return next(new ErrorHandler("Book not available.", 400));
    }

    const isAlreadyBorrowed = user.borrowedBooks.find(
        (b) => b.bookId === id && b.returned === false
    );
    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("Book already borrowed.", 400));
    }

    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Update book quantity
    await prisma.book.update({
        where: { id },
        data: {
            quantity: book.quantity - 1,
            availability: book.quantity - 1 > 0,
        },
    });

    // Push to user's embedded borrowedBooks array
    await prisma.user.update({
        where: { id: user.id },
        data: {
            borrowedBooks: {
                push: {
                    bookId: book.id,
                    bookTitel: book.title,
                    borrowedDate: new Date(),
                    dueDate,
                    returned: false,
                },
            },
        },
    });

    // Create a Borrow record
    await prisma.borrow.create({
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            book: book.id,
            dueDate,
            price: book.price,
        },
    });

    res.status(200).json({
        success: true,
        message: "Borrowed book recorded successfully.",
    });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { email } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await prisma.user.findFirst({
        where: { email, accountVerified: true },
    });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    const borrowedBookEntry = user.borrowedBooks.find(
        (b) => b.bookId === id && b.returned === false
    );
    if (!borrowedBookEntry) {
        return next(new ErrorHandler("You have not borrowed this book.", 400));
    }

    // Mark as returned in user's embedded array
    const updatedBorrowedBooks = user.borrowedBooks.map((b) => {
        if (b.bookId === id && b.returned === false) {
            return { ...b, returned: true };
        }
        return b;
    });

    await prisma.user.update({
        where: { id: user.id },
        data: { borrowedBooks: updatedBorrowedBooks },
    });

    // Restore book quantity
    await prisma.book.update({
        where: { id },
        data: {
            quantity: book.quantity + 1,
            availability: true,
        },
    });

    // Find and update the Borrow record
    const borrow = await prisma.borrow.findFirst({
        where: {
            book: id,
            user: { is: { email } },
            returnDate: null,
        },
    });

    if (!borrow) {
        return next(new ErrorHandler("Borrow record not found.", 400));
    }

    const fine = calculateFine(borrow.dueDate);

    await prisma.borrow.update({
        where: { id: borrow.id },
        data: {
            returnDate: new Date(),
            fine,
        },
    });

    res.status(200).json({
        success: true,
        message:
            fine === 0
                ? `The book has been returned successfully. The total charges are ${book.price}`
                : `The book has been returned successfully. The total charges including fine are ${fine + book.price}`,
    });
});

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
    const { borrowedBooks } = req.user;

    res.status(200).json({
        success: true,
        borrowedBooks,
    });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
    async (req, res, next) => {
        const borrowedBooks = await prisma.borrow.findMany();

        res.status(200).json({
            success: true,
            borrowedBooks,
        });
    }
);
