import mongoose, { Schema } from "mongoose";
import { EActivityType } from "../interfaces/models.js";
const activitySchema = new Schema({
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
    time: {
        type: Number, // intensity
        required: true,
    }
}, { timestamps: true });
const Activity = mongoose.model("Activity", activitySchema);
export { Activity };
