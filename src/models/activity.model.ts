import mongoose, { Schema, Model } from "mongoose";
import type { IActivity } from "../interfaces/models";
import { EActivityType } from "../interfaces/models";

const activitySchema = new Schema<IActivity>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		activityType: {
			type: String,
			required: true,
			enum: Object.values(EActivityType),
		},
		caloriesBurned: {
			type: Number,
			required: true,
		},
		distance: {
			type: Number,
		},
		weightUsed: {
			type: Number,
		},
		reps: {
			type: Number,
		},
		sets: {
			type: Number,
		},
		intensity: {
			type: String,
			enum: ["Low", "Medium", "High"],
		},
	},
	{ timestamps: true },
);

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export { Activity };
