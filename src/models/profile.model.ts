import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";
import type { IProfile } from "../interfaces/models";

const profileSchema = new Schema<IProfile>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "user id required"],
	},
	age: {
		type: Number,
		required: [true, "age required"],
		min: 1,
		max: 150,
	},
	weight: {
		type: Number,
		required: [true, "weight required"],
		min: 1,
		max: 200,
	},
	height: {
		ype: Number,
		required: [true, "height required"],
		min: 1,
		max: 200,
	},
	fitnessGoals: {
		type: String,
	},
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export { Profile };
