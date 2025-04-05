import Goal from "../models/goal.model";

import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { errorResponse, successResponse } from "../utils/Response";
import { AppError } from "../utils/ApiError";
import { EGoalType } from "../interfaces/models";
import { goalSchema } from "../schemas/goal";

const createGoal = async (req: Request, res: Response) => {
	const result = goalSchema.safeParse(req.body);
	if (!result.success) {
		return res
			.status(400)
			.json(
				errorResponse("Please provide correct field", result.error.flatten()),
			);
	}
	const { targetValue, progress, goalType, startDate, endDate, description } =
		result.data;
	const userId = req.user._id;
	const goal = await Goal.create({
		userId,
		targetValue,
		progress,
		goalType,
		startDate,
		endDate,
		description,
	});
	return res.status(201).json(successResponse("Goal created", goal));
}

export { createGoal };
