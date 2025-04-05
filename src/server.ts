import { app } from "./app";
import { conf } from "./config/conf";
import { connectDB } from "./db/db";
import logger from "./utils/logger";

const port = conf.port;

const isDBConnected = await connectDB();

if (isDBConnected) {
	app.listen(port, () => {
		logger.info(`Server is listening on port ${port}`);
		console.log("Server started");
	});
}