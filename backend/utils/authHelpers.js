import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Generate JWT for a given userId
 */
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

/**
 * Generate a random 5-digit verification code and its expiry
 * Returns { verificationCode, verificationCodeExpire }
 */
export const generateVerificationCode = () => {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    const verificationCode = parseInt(firstDigit + remainingDigits);
    const verificationCodeExpire = new Date(Date.now() + 15 * 60 * 1000);
    return { verificationCode, verificationCodeExpire };
};

/**
 * Generate a reset password token.
 * Returns { resetToken, resetPasswordToken (hashed), resetPasswordExpire }
 */
export const getResetPasswordToken = () => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    const resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    return { resetToken, resetPasswordToken, resetPasswordExpire };
};
