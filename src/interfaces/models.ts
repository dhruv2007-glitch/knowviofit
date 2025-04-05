import type { Document, Types } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	verificationToken: string;
	isVerified: boolean;
	verificationId: number | string;
	otpExpire: Date;
	verifyPassword: (password: string) => Promise<boolean>
}

export interface IProfile extends Document {
	userId: Types.ObjectId;
	age?: number;
	weight?: number;
	height?: number;
	fitnessGoal?: string;
}

export interface IActivity extends Document {
	userId: Types.ObjectId;
	activityType: EActivityType;
	caloriesBurned: number;
	distance?: number;
	weightUsed?: number;
	reps?: number;
	sets?: number;
	intensity?: "Low" | "Medium" | "High";
	time: number; // in minutes
}

export interface IAiInsights extends Document {
	userId: Types.ObjectId;
	workOutSuggestion: string;
	progressiveAnalysis: string;
	motivationalMessage: string;
}

export interface IGoal extends Document {
	userId: Types.ObjectId;
	targetValue: number;
	progress: number;
	goalType: EGoalType;
	startDate: Date;
	endDate: Date;
	description?: string;
	completed: boolean;
}

export enum EGoalType {
	WeightLoss = "WEIGHT_LOSS",
	MuscleGain = "MUSCLE_GAIN",
	Endurance = "ENDURANCE",
	Flexibility = "FLEXIBILITY",
	GeneralFitness = "GENERAL_FITNESS",
	StrengthTraining = "STRENGTH_TRAINING",
}

export enum EActivityType {
	Running = "RUNNING",
	Cycling = "CYCLING",
	Weightlifting = "WEIGHTLIFTING",
	Swimming = "SWIMMING",
	Walking = "WALKING",
	Yoga = "YOGA",
	Hiking = "HIKING",
	Rowing = "ROWING",
	Elliptical = "ELLIPTICAL",
	Pilates = "PILATES",
	CrossFit = "CROSSFIT",
	Zumba = "ZUMBA",
}

export enum EActivityTypeMET {
	RUNNING = 9.8,
	CYCLING = 7.5,
	WEIGHTLIFTING = 6.0,
	SWIMMING = 8.0,
	WALKING = 3.5,
	YOGA = 2.5,
	HIKING = 6.0,
	ROWING = 7.0,
	ELLIPTICAL = 5.0,
	PILATES = 3.0,
	CROSSFIT = 8.0,
	ZUMBA = 6.5,
}
