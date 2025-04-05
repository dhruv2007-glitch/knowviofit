import { Activity } from "../models/activity.model.js";
import { errorResponse, successResponse } from "../utils/Response.js";
import { activitySchema } from "../schemas/activity.js";
import { calculateBurnedCalories } from "../helpers/algorithms.js";
import { Profile } from "../models/profile.model.js";
const createActivity = async (req, res) => {
    const result = activitySchema.safeParse(req.body);
    if (!result.success) {
        return res
            .status(400)
            .json(errorResponse("Please provide correct field", result.error.flatten()));
    }
    const { activityType, distance, weightUsed, reps, sets, time } = result.data;
    const data = {};
    if (activityType)
        data.activityType = activityType;
    // if (caloriesBurned) data.caloriesBurned = caloriesBurned;
    if (distance)
        data.distance = distance;
    if (weightUsed)
        data.weightUsed = weightUsed;
    if (reps)
        data.reps = reps;
    if (sets)
        data.sets = sets;
    if (time)
        data.time = time;
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });
    const calories = calculateBurnedCalories(activityType, profile?.weight, time);
    data.userId = userId;
    data.caloriesBurned = calories;
    try {
        const activity = await Activity.create(data);
        return res.status(201).json(successResponse("Activity created", activity));
    }
    catch (error) {
        const err = error;
        return res
            .status(500)
            .json(errorResponse("Error creating activity", err.message));
    }
};
export { createActivity };
