import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";
import {
    generateVerificationCode,
    getResetPasswordToken,
} from "../utils/authHelpers.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isRegistered = await prisma.user.findFirst({
        where: { email, accountVerified: true },
    });

    if (isRegistered) {
        return next(new ErrorHandler("User already exists.", 400));
    }

    const registerationAttemptsByUser = await prisma.user.findMany({
        where: { email, accountVerified: false },
    });

    if (registerationAttemptsByUser.length >= 5) {
        return next(
            new ErrorHandler(
                "You exceeded registration attempts. Contact support.",
                400
            )
        );
    }

    if (password.length < 8 || password.length > 16) {
        return next(
            new ErrorHandler("Password must be between 8 and 16 characters.", 400)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { verificationCode, verificationCodeExpire } =
        generateVerificationCode();

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpire,
        },
    });

    sendVerificationCode(verificationCode, email, res);
});

export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new ErrorHandler("Email or OTP is missing.", 400));
    }

    const userAllEntries = await prisma.user.findMany({
        where: { email, accountVerified: false },
        orderBy: { createdAt: "desc" },
    });

    if (userAllEntries.length === 0) {
        return next(new ErrorHandler("User not found.", 404));
    }

    const user = userAllEntries[0];

    if (user.verificationCode !== Number(otp)) {
        return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

    if (currentTime > verificationCodeExpire) {
        return next(new ErrorHandler("OTP expired.", 400));
    }

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            accountVerified: true,
            verificationCode: null,
            verificationCodeExpire: null,
        },
    });

    sendToken(updatedUser, 200, "Account Verified.", res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const user = await prisma.user.findFirst({
        where: { email, accountVerified: true },
    });

    if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendToken(user, 200, "User login successfully.", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully.",
        });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    if (!req.body.email) {
        return next(new ErrorHandler("Email is required.", 400));
    }

    const user = await prisma.user.findFirst({
        where: { email: req.body.email, accountVerified: true },
    });

    if (!user) {
        return next(new ErrorHandler("Invalid email.", 400));
    }

    const { resetToken, resetPasswordToken, resetPasswordExpire } =
        getResetPasswordToken();

    await prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordToken, resetPasswordExpire },
    });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "Bookworm Library Management System Password Recovery",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`,
        });
    } catch (error) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: null,
                resetPasswordExpire: null,
            },
        });
        return next(new ErrorHandler(error.message, 500));
    }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken,
            resetPasswordExpire: { gt: new Date() },
        },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset password token is invalid or has been expired.",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(
            new ErrorHandler("Password & confirm password do not match.", 400)
        );
    }

    if (
        req.body.password.length < 8 ||
        req.body.password.length > 16 ||
        req.body.confirmPassword.length < 8 ||
        req.body.confirmPassword.length > 16
    ) {
        return next(
            new ErrorHandler("Password must be between 8 and 16 characters.", 400)
        );
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpire: null,
        },
    });

    sendToken(updatedUser, 200, "Password reset successfully.", res);
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Current password is incorrect.", 400));
    }

    if (
        newPassword.length < 8 ||
        newPassword.length > 16 ||
        confirmNewPassword.length < 8 ||
        confirmNewPassword.length > 16
    ) {
        return next(
            new ErrorHandler("Password must be between 8 and 16 characters.", 400)
        );
    }

    if (newPassword !== confirmNewPassword) {
        return next(
            new ErrorHandler(
                "New password and confirm new password do not match.",
                400
            )
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    res.status(200).json({
        success: true,
        message: "Password updated",
    });
});