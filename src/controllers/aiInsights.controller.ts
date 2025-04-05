import type { Request, Response } from "express";
import { User } from "../models/user.model";
import { AiInsights } from "../models/aiInsights.model";
import { getCache, setCache } from "../cache/cache";
import { errorResponse, successResponse } from "../utils/Response";
import Goal from "../models/goal.model";
import { getMotivationalMessage } from "../helpers/ai";
import { Activity } from "../models/activity.model";
import { Profile } from "../models/profile.model";

const getAiInsights = async (req: Request, res: Response) => {
	const userId = req.user._id;

	const key = `${userId}:ai`;

	const getAiCache = String(getCache(key));

	if (getAiCache) {
		return res
			.status(200)
			.json(
				successResponse(
					"Activities fetched from cache",
					JSON.parse(getAiCache),
				),
			);
	}

	const aiData = await AiInsights.findOne({ userId });

	if (aiData) {
		setCache(key, JSON.stringify(aiData));
		return res
			.status(200)
			.json(successResponse("AI Insights data fetched successfully", aiData));
	}

	// Main ai functionality

	const goal = await Goal.findOne({ userId });
	const activity = await Activity.find({ userId });
	const profile = await Profile.findOne({ userId });
	if (!profile) {
		return res.status(404).json(errorResponse("Please first create a profile"));
	}
	if (!activity || activity.length === 0) {
		return res
			.status(404)
			.json(errorResponse("Please first create an activity"));
	}

	if (!goal) {
		return res.status(404).json(errorResponse("Please first create a goal"));
	}

	const motivationalMessage = await getMotivationalMessage(
		JSON.stringify(goal),
	);
	const progressiveAnalysis = await getMotivationalMessage(
		`\n user's goal: ${JSON.stringify(goal)}\n user's activity: ${JSON.stringify(
			activity,
		)}`,
	);
	const workOutSuggestion = await getMotivationalMessage(
		`\n user's goal: ${JSON.stringify(goal)}\n user's profile: ${JSON.stringify(
			profile,
		)}`,
	);
	if (!motivationalMessage || !progressiveAnalysis || !workOutSuggestion) {
		return res
			.status(500)
			.json(errorResponse("Error generating AI insights, please try again"));
	}

	const aiInsights = await AiInsights.create({
		userId,
		workOutSuggestion,
		progressiveAnalysis,
		motivationalMessage,
	});
	setCache(key, JSON.stringify(aiInsights));

	return res
		.status(200)
		.json(successResponse("AI Insights data fetched successfully", aiInsights));
};

export { getAiInsights };
