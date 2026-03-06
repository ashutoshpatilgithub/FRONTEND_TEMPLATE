import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { prisma } from "../lib/prisma.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;
  if (!title || !author || !description || !price || !quantity) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      availability: parseInt(quantity) > 0,
    },
  });

  res.status(201).json({
    success: true,
    message: "Book added successfully.",
    book,
  });
});

export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await prisma.book.findMany();
  res.status(200).json({
    success: true,
    books,
  });
});

export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    return next(new ErrorHandler("Book not found.", 404));
  }

  await prisma.book.delete({ where: { id } });

  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});