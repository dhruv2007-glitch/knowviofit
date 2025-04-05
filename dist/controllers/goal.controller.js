import Goal from "../models/goal.model.js";
import { errorResponse, successResponse } from "../utils/Response.js";
import { goalSchema } from "../schemas/goal.js";
const createGoal = async (req, res) => {
    const result = goalSchema.safeParse(req.body);
    if (!result.success) {
        return res
            .status(400)
            .json(errorResponse("Please provide correct field", result.error.flatten()));
    }
    const { targetValue, progress, goalType, startDate, endDate, description } = result.data;
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
};
export { createGoal };
