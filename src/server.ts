import { app } from "./app.js";
import { conf } from "./config/conf.js";


app.listen(conf.port, ()=> console.log("hello server PORT", conf.port))