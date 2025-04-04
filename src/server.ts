import { app } from "./app";
import { conf } from "./config/conf";
import logger from "./utils/logger";

app.listen(conf.port, () => {
	logger.info(`Server is listening on port ${conf.port}`);
    console.log("Server started")
});
