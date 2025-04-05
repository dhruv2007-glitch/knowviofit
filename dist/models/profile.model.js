import mongoose, { Schema } from "mongoose";
const profileSchema = new Schema({
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
        type: Number,
        required: [true, "height required"],
        min: 1,
        max: 200,
    },
    fitnessGoal: {
        type: String,
    },
});
const Profile = mongoose.model("Profile", profileSchema);
export { Profile };
