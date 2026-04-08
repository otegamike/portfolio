import bcrypt from "bcryptjs";
import { AppError } from "./appError.js";

export const hashSecretKey = async (secretKey: string) => {
    try {
        const hashedSecretKey = await bcrypt.hash(secretKey, 10);
        return hashedSecretKey;
    } catch (error) {
        throw new AppError("couldn't encrypt secret key", 500);
    }
}

export const compareSecretKey = async (secretKey: string, hashedSecretKey: string) => {
    try {
        const isMatch = await bcrypt.compare(secretKey, hashedSecretKey);
        return isMatch;
    } catch (error) {
        throw new AppError("couldn't compare secret key", 500);
    }
}