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
		distance: {                 // in meters
			type: Number,
		},
		weightUsed: {              // in kgs
			type: Number,
		},
		reps: {
			type: Number,
		},
		sets: {
			type: Number,
		},
		time: {
			type: Number,    // intensity
			required: true,
		}
	},
	{ timestamps: true },
);

const Activity = mongoose.model<IActivity>("Activity", activitySchema);

export { Activity };
