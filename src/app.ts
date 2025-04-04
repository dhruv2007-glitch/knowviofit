import express from "express";
import cookieParser from "cookie-parser";
import { conf } from "./config/conf";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morganMiddleware from "./middleware/morganMiddleware";
// import xss from "xss-clean";
import { healthCheck, hello, notFound } from "./controllers/server.controller";

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Too many requests from this IP, please try again later.",
});

// MiddleWares

app.use(cookieParser(conf.cookierSecret));
app.use(helmet());
app.use(hpp());
app.use(express.json({ limit: "10kb" }));
app.use("/api", limiter);
app.use(morganMiddleware);
// app.use(xss());

// Routes

// default server routes
app.get("/healthCheck", healthCheck);
app.get("/", hello);
app.use(notFound);

export { app };
