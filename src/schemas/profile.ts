import { z } from "zod";

export const profileSchema = z.object({
	age: z.number().min(1),
	weight: z.number().min(1),
	height: z.number().min(1),
	fitnessGoal: z.string(),
});

export const editProfileSchema = z.object({
	age: z.number().min(1).optional(),
	weight: z.number().min(1).optional(),
	height: z.number().min(1).optional(),
	fitnessGoal: z.string().optional(),
});
