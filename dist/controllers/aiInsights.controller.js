import { AiInsights } from "../models/aiInsights.model.js";
import { getCache, setCache } from "../cache/cache.js";
import { errorResponse, successResponse } from "../utils/Response.js";
import Goal from "../models/goal.model.js";
import { getMotivationalMessage } from "../helpers/ai.js";
import { Activity } from "../models/activity.model.js";
import { Profile } from "../models/profile.model.js";
const getAiInsights = async (req, res) => {
    const userId = req.user._id;
    const key = `${userId}:ai`;
    const getAiCache = String(getCache(key));
    if (getAiCache) {
        return res
            .status(200)
            .json(successResponse("Activities fetched from cache", JSON.parse(getAiCache)));
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
    const motivationalMessage = await getMotivationalMessage(JSON.stringify(goal));
    const progressiveAnalysis = await getMotivationalMessage(`\n user's goal: ${JSON.stringify(goal)}\n user's activity: ${JSON.stringify(activity)}`);
    const workOutSuggestion = await getMotivationalMessage(`\n user's goal: ${JSON.stringify(goal)}\n user's profile: ${JSON.stringify(profile)}`);
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
