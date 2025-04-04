import { z } from "zod";

export const signUpSchema = z.object({
	name: z.string().trim().max(20),
	email: z.string().email().toLowerCase(),
	password: z.string().min(6).max(15),
});

export const verificationShema = z.object({
	id: z.string().min(1),
});

export const loginSchema = z.object({
	email: z.string().email().toLowerCase(),
	password: z.string().min(6).max(15),
});
