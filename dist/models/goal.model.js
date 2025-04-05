import { model, Schema } from "mongoose";
import { EGoalType } from "../interfaces/models.js";
const goalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    targetValue: {
        type: Number,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
        default: 0,
    },
    goalType: {
        type: String,
        required: true,
        enum: Object.values(EGoalType),
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
const Goal = model("Goal", goalSchema);
export default Goal;
