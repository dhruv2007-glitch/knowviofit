import morgan from "morgan";
import logger from "../utils/logger.js";
const stream = {
    write: (message) => {
        logger.http(message.trim());
    },
};
const morganMiddleware = morgan("combined", { stream });
export default morganMiddleware;
