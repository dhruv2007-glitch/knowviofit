import type { EActivityType as activityType } from "../interfaces/models";
import { EActivityTypeMET } from "../interfaces/models";

export const calculateBurnedCalories = (
	activityType: activityType,
	weight: number | undefined,
	time: number | undefined,
): number => {
    
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
