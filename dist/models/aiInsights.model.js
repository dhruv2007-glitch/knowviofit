import mongoose, { Schema } from "mongoose";
const aiInsightsSchema = new Schema({
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
}, { timestamps: true });
const AiInsights = mongoose.model("AiInsights", aiInsightsSchema);
export { AiInsights };
