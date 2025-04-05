import express from "express";
import cookieParser from "cookie-parser";
import { conf } from "./config/conf.js";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morganMiddleware from "./middleware/morganMiddleware.js";
// import xss from "xss-clean";
import { healthCheck, hello, notFound } from "./controllers/server.controller.js";
import userRoute from "./routes/user.route.js";
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
app.use('/api/v1/user', userRoute);
// app.use('/')
// default server routes
app.get("/healthCheck", healthCheck);
app.get("/", hello);
app.use(notFound);
export { app };
