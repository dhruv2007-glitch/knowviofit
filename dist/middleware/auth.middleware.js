import jwt from "jsonwebtoken";
import { conf } from "../config/conf.js";
import { AppError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { getCache, setCache } from "../cache/cache.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken || accessToken.trim() === "") {
            return res.status(400).json(new AppError("Invalid token", 400));
        }
        const decodedToken = jwt.verify(accessToken, conf.accessTokenSecret);
        if (!decodedToken) {
            return res.status(400).json(new AppError("Invalid token", 400));
        }
        const { email } = decodedToken;
        const userCache = getCache(email);
        let user = userCache ? JSON.parse(userCache) : null;
        if (!user) {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json(new AppError("User not found", 400));
            }
            setCache(email, JSON.stringify(user));
        }
        if (!user.isVerified) {
            return res.status(400).json(new AppError("User not verified", 400));
        }
        req.user = user;
        return next();
    }
    catch (err) {
        return res.status(401).json(new AppError("Unauthorized", 401));
    }
});
