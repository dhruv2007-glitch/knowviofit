import { EActivityTypeMET } from "../interfaces/models.js";
export const calculateBurnedCalories = (activityType, weight, time) => {
    const metValue = EActivityTypeMET[activityType];
    if (typeof weight === "number" && typeof time === "number") {
        const timeInHours = time / 60;
        return metValue * weight * timeInHours;
    }
    if (typeof weight === "undefined") {
        return 0;
    }
    return 0;
};
