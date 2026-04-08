import { Router, type Request, type Response } from "express";
import { catchAsync } from "../middleware/errorHandler.js";
import { AppError } from "../utils/appError.js";
import { compareSecretKey } from "../utils/hashSecretKey.js";
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/login", catchAsync(async (req: Request, res: Response) => {
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    const AdminId = process.env.ADMIN_ID
    const JwtSecret = process.env.JWT_SECRET

    if (!hashedPassword || !AdminId || !JwtSecret) {
        throw new AppError("admin credentials not found", 500);
    }

    const { password } = req.body;
    if(!password) {
        throw new AppError("password is required", 400);
    }

    const checkPassword =await compareSecretKey(password, hashedPassword);

    if (!checkPassword) {
        return res.status(401).json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign({ id: AdminId }, JwtSecret!, { expiresIn: "1h" });
    res.setHeader("authorization", `Bearer ${token}`);
    res.status(200).json({ success: true, message: "Admin authenticated successfully" });
}));

export default router;
