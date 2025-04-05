import jwt from "jsonwebtoken";
import { conf } from "../config/conf.js";
import { AppError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { getCache, setCache } from "../cache/cache.js";
export const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken || accessToken.trim() === "") {
        res.status(400).json(new AppError("invalid token", 400));
    }
    const decodedToken = await jwt.verify(accessToken, conf.accessTokenSecret);
    if (!decodedToken) {
        res.status(400).json(new AppError("invalid token", 400));
    }
    const { email } = decodedToken;
    const userCache = getCache(email);
    let user = userCache ? JSON.parse(userCache) : null;
    if (!user) {
        user = await User.findOne({ email });
        if (!user) {
            res.status(400).json(new AppError("user not found", 400));
        }
        setCache(email, JSON.stringify(user));
    }
    if (!user.isVerified) {
        res.status(400).json(new AppError("user not Verified", 400));
    }
    req.user = user;
    return next();
};
