import NodeCache from "node-cache";
import logger from "../utils/logger.js";
const myCache = new NodeCache({ stdTTL: 60 * 5, checkperiod: 120 });
const setCache = (key, data) => {
    try {
        myCache.set(key, data);
    }
    catch (error) {
        const err = error;
        logger.error(err.message);
    }
};
const getCache = (key) => {
    try {
        return myCache.get(key);
    }
    catch (error) {
        const err = error;
        logger.error(err.message);
    }
};
const delCache = (key) => {
    try {
        return myCache.del(key);
    }
    catch (error) {
        const err = error;
        logger.error(err.message);
    }
};
export { setCache, getCache, delCache, };
