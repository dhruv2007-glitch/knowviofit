import mongoose, { Schema } from "mongoose";
import type { IAiInsights } from "../interfaces/models";

const aiInsightsSchema = new Schema<IAiInsights>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},

		workOutSuggestion: {
			type: String,
			required: true,
		},
		progressiveAnalysis: {
			type: String,
			required: true,
		},
		motivationalMessage: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const AiInsights = mongoose.model<IAiInsights>("AiInsights", aiInsightsSchema);

export { AiInsights };
