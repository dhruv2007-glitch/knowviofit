import express from "express";
import cookieParser from "cookie-parser";
import { conf } from "./config/conf";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import morganMiddleware from "./middleware/morganMiddleware";
import xss from "xss-clean"

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
app.use(morganMiddleware)
app.use(xss())

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
} else{
    app.use(morgan(''))
}

export { app };
