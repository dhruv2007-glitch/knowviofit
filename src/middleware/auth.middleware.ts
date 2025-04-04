import type {
	NextFunction,
	Request,
	Response,
} from "express";
import jwt from "jsonwebtoken";
import { conf } from "../config/conf";
import { AppError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { getCache, setCache } from "../cache/cache";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const accessToken = req.cookies.accessToken;

	if (!accessToken || accessToken.trim() === "") {
		  res.status(400).json(new AppError("invalid token", 400));
	}

	const decodedToken = await jwt.verify(accessToken, conf.accessTokenSecret);

	if (!decodedToken) {
		  res.status(400).json(new AppError("invalid token", 400));
	}

	const { email } = decodedToken as { email: string };

	const userCache = getCache(email);
	let user = userCache ? JSON.parse(userCache as string) : null;

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
	(req as any).user = user;

	return next();
};
