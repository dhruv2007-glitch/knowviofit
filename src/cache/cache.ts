import NodeCache from "node-cache";
import logger from "../utils/logger";

const myCache = new NodeCache({ stdTTL: 60 * 5, checkperiod: 120 });

const setCache =  (key: string, data: string) => {
	try {
		 myCache.set(key, data);
	} catch (error) {
		const err = error as Error;
		logger.error(err.message);
	}
};
const getCache = (key: string) => {
    try {
        return myCache.get(key);
   } catch (error) {
       const err = error as Error;
       logger.error(err.message);
   }
};

const delCache = (key: string) => {
    try {
        return myCache.del(key);
   } catch (error) {
       const err = error as Error;
       logger.error(err.message);
   }
}

export {
    setCache,
    getCache,
    delCache,
}