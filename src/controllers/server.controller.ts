import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/Response";

export const healthCheck = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		res.status(200).json(successResponse("Health check done"));
	},
);

export const notFound = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	res.status(404).json({
		status: "fail",
		message: "Route not found",
	});
};

export const hello = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		res.status(200).json(successResponse("Hi there :-)"));
	},
);
