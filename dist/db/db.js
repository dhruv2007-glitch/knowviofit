import mongoose from "mongoose";
import { conf } from "../config/conf.js";
import logger from "../utils/logger.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(`${conf.dbUri}/${conf.dbName}${conf.extraDbUri}`);
        logger.info("DB connected successfully");
        return true;
    }
    catch (error) {
        const err = error;
        logger.error(err.message);
        return false;
    }
};
