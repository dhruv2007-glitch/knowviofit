import dotenv from "dotenv"
dotenv.config();

export const conf = {
    port: String(process.env.PORT),
    dbUri: String(process.env.DB_URI),
    clientUrl: String(process.env.CLIENT_URL),
    dbName: "knowvioFit",
    extraDbUri: "?retryWrites=true&w=majority",
    cookierSecret: process.env.COOKIE_SECRET,
}