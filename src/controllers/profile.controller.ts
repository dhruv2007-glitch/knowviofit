import type { Request, Response } from "express";
import { editProfileSchema, profileSchema } from "../schemas/profile";
import { asyncHandler } from "../utils/asyncHandler";
import { errorResponse, successResponse } from "../utils/Response";
import { Profile } from "../models/profile.model";
import { AppError } from "../utils/ApiError";
import logger from "../utils/logger";

const createProfile = async (req: Request, res: Response) => {
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
	} catch (err) {
		const error = err as Error;
		logger.error(error.message);
		return res.status(500).json(new AppError(error.message, 500));
	}
	res.status(201).json(successResponse("Profile created successfully"));
}

const editProfile = async (req: Request, res: Response) => {
	const result = editProfileSchema.safeParse(req.body);
	const userId = req?.user._id;

	if (!result.success) {
		return res
			.status(400)
			.json(new AppError("Please provide correct fields", 400));
	}

	const { age, weight, height, fitnessGoal } = result.data;

	const data: Record<string, any> = {};
	if (age) data.age = age;
	if (weight) data.weight = weight;
	if (height) data.height = height;
	if (fitnessGoal) data.fitnessGoal = fitnessGoal;

	const profileEdited = await Profile.findOneAndUpdate({ userId }, data);

	if (!profileEdited) {
		return res.status(400).json(new AppError("Profile not found", 400));
	}
	res.status(200).json(successResponse("Profile edited successfully"));
}

const getProfile = async (req: Request, res: Response) => {
	const userId = req?.user._id;

	await Profile.findOne({ userId })
		.then((profile) => {
			if (!profile) {
				return res.status(404).json(new AppError("Profile not found", 404));
			}
			res
				.status(200)
				.json(successResponse("Profile fetched successfully", profile));
		})
		.catch((err) => {
			const error = err as Error;
			logger.error(error.message);
			return res.status(500).json(new AppError(error.message, 500));
		});
}

export { createProfile, editProfile, getProfile };
