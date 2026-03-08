import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { prisma } from "../lib/prisma.js";
import { calculateFine } from "../utils/fineCalculator.js";

export const recordBorrowedBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // bookId
    const { email, customDueDate, customPrice } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await prisma.user.findFirst({
        where: { email },
    });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    if (book.quantity === 0) {
        return next(new ErrorHandler("Book not available.", 400));
    }

    // Check if user already has this book borrowed and not returned
    const isAlreadyBorrowed = await prisma.borrow.findFirst({
        where: { userId: user.id, bookId: id, returned: false },
    });
    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("Book already borrowed.", 400));
    }

    const dueDate = customDueDate ? new Date(customDueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const finalPrice = customPrice !== undefined ? parseFloat(customPrice) : book.price;

    // Update book quantity
    await prisma.book.update({
        where: { id },
        data: {
            quantity: book.quantity - 1,
            availability: book.quantity - 1 > 0,
        },
    });

    // Create a single Borrow record
    await prisma.borrow.create({
        data: {
            userId: user.id,
            bookId: book.id,
            bookTitle: book.title,
            dueDate,
            price: finalPrice,
        },
    });

    res.status(200).json({
        success: true,
        message: "Borrowed book recorded successfully.",
    });
});

export const returnBorrowBook = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // bookId
    const { email } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
        return next(new ErrorHandler("Book not found.", 404));
    }

    const user = await prisma.user.findFirst({
        where: { email },
    });
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    // Find the active borrow record
    const borrow = await prisma.borrow.findFirst({
        where: { userId: user.id, bookId: id, returned: false },
    });
    if (!borrow) {
        return next(new ErrorHandler("You have not borrowed this book.", 400));
    }

    const fine = calculateFine(borrow.dueDate);

    // Mark as returned
    await prisma.borrow.update({
        where: { id: borrow.id },
        data: {
            returned: true,
            returnDate: new Date(),
            fine,
        },
    });

    // Restore book quantity
    await prisma.book.update({
        where: { id },
        data: {
            quantity: book.quantity + 1,
            availability: true,
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
    const borrowedBooks = await prisma.borrow.findMany({
        where: { userId: req.user.id },
        include: { book: { select: { title: true, author: true } } },
        orderBy: { borrowDate: "desc" },
    });

    res.status(200).json({
        success: true,
        borrowedBooks,
    });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
    async (req, res, next) => {
        const borrowedBooks = await prisma.borrow.findMany({
            include: {
                user: { select: { name: true, email: true } },
                book: { select: { title: true, author: true } },
            },
            orderBy: { borrowDate: "desc" },
        });

        res.status(200).json({
            success: true,
            borrowedBooks,
        });
    }
);
