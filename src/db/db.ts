import mongoose from "mongoose";
import { conf } from "../config/conf";
import logger from "../utils/logger";

export const connectDB = async () => {
	try {
		await mongoose.connect(`${conf.dbUri}/${conf.dbName}${conf.extraDbUri}`);
		logger.info("DB connected successfully");
		return true
	} catch (error: unknown) {
		const err = error as Error;
		logger.error(err.message);
		return false
	}
};
