import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { conf } from "../config/conf";
import { AppError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { getCache, setCache } from "../cache/cache";
import { asyncHandler } from "../utils/asyncHandler";

export const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = req.cookies.accessToken;

			if (!accessToken || accessToken.trim() === "") {
				return res.status(400).json(new AppError("Invalid token", 400));
			}

			const decodedToken = jwt.verify(accessToken, conf.accessTokenSecret);
			if (!decodedToken) {
				return res.status(400).json(new AppError("Invalid token", 400));
			}

			const { email } = decodedToken as { email: string };
			const userCache = getCache(email);
			let user = userCache ? JSON.parse(userCache as string) : null;

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

			(req as any).user = user;
			return next();
		} catch (err) {
			return res.status(401).json(new AppError("Unauthorized", 401));
		}
	},
);
