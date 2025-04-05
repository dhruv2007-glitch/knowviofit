import { editProfileSchema, profileSchema } from "../schemas/profile.js";
import { successResponse } from "../utils/Response.js";
import { Profile } from "../models/profile.model.js";
import { AppError } from "../utils/ApiError.js";
import logger from "../utils/logger.js";
const createProfile = async (req, res) => {
    const result = profileSchema.safeParse(req.body);
    const userId = req?.user._id;
    if (!result.success) {
        return res
            .status(400)
            .json(new AppError("Please provide correct fields", 400));
    }
    const isProfileExist = await Profile.findOne({ userId });
    if (isProfileExist) {
        return res.status(400).json(new AppError("Profile already exist", 400));
    }
    const { age, weight, fitnessGoal, height } = result.data;
    try {
        await Profile.create({ userId, age, weight, fitnessGoal, height });
    }
    catch (err) {
        const error = err;
        logger.error(error.message);
        return res.status(500).json(new AppError(error.message, 500));
    }
    res.status(201).json(successResponse("Profile created successfully"));
};
const editProfile = async (req, res) => {
    const result = editProfileSchema.safeParse(req.body);
    const userId = req?.user._id;
    if (!result.success) {
        return res
            .status(400)
            .json(new AppError("Please provide correct fields", 400));
    }
    const { age, weight, height, fitnessGoal } = result.data;
    const data = {};
    if (age)
        data.age = age;
    if (weight)
        data.weight = weight;
    if (height)
        data.height = height;
    if (fitnessGoal)
        data.fitnessGoal = fitnessGoal;
    const profileEdited = await Profile.findOneAndUpdate({ userId }, data);
    if (!profileEdited) {
        return res.status(400).json(new AppError("Profile not found", 400));
    }
    res.status(200).json(successResponse("Profile edited successfully"));
};
const getProfile = async (req, res) => {
    try {
        const userId = req?.user?._id;
        if (!userId) {
            return res.status(401).json(new AppError("Unauthorized", 401));
        }
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json(new AppError("Profile not found", 404));
        }
        res.status(200).json(successResponse("Profile fetched successfully", profile));
    }
    catch (error) {
        logger.error("Error fetching profile:", error);
        res.status(500).json(new AppError("Internal Server Error", 500));
    }
};
export { createProfile, editProfile, getProfile };
