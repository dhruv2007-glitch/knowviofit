import type { Request, Response, NextFunction } from "express";
import type { AppError } from "../utils/ApiError";

export const globalErrorHandler = (
	err: Error | AppError,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const statusCode = (err as AppError).statusCode || 500;
	const status = (err as AppError).status || "Error";
	res.status(statusCode).json({
		message: err.message || "internal server error",
	});
};
