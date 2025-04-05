import { app } from "./app.js";
import { conf } from "./config/conf.js";
import { connectDB } from "./db/db.js";
import logger from "./utils/logger.js";
const port = conf.port;
const isDBConnected = await connectDB();
if (isDBConnected) {
    app.listen(port, () => {
        logger.info(`Server is listening on port ${port}`);
        console.log("Server started");
    });
}
const hi = "dd";
