import type { IUser } from "../interfaces/models";
import mongoose, { Schema, type Model } from "mongoose";
import argon2 from "argon2";

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			maxlength: 50,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			unique: true,
		},
		verificationToken: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verificationId: {
			type: String,
		},
		password: {
			type: String,
			minlength: 2,
			required: [true, "Passowrd is required"],
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await argon2.hash(this.password);
});

userSchema.methods.verifyPassword = async function (
	password: string,
): Promise<boolean> {
	return await argon2.verify(this.password, password);
};

const User: Model<IUser> =
	mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { User };
