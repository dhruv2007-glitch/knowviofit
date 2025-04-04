import type { Document, Types } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	otp: number;
	isVerified: boolean;
	verificationId: number | string;
}

export interface IProfile extends Document {
	userId: Types.ObjectId;
	age?: number;
	weight?: number;
	height?: number;
	fitnessGoals?: string;
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
}

export interface IAiInsights extends Document {
	userId: Types.ObjectId;
	workOutSuggestion: string;
	progressiveAnalysis: string;
	motivationalMessage: string;
	timestamp: Date;
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
