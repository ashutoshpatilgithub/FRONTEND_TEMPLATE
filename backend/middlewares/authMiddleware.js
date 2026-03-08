import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // Check for token in: cookies, Authorization header, or query param
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with this role (${req.user.role}) not allowed to access this resource.`,
          400
        )
      );
    }
    next();
  };
};