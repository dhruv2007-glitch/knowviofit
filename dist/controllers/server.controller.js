import { successResponse } from "../utils/Response.js";
export const healthCheck = async (req, res) => {
    res.status(200).json(successResponse("Health check done"));
};
export const notFound = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Route not found",
    });
};
export const hello = async (req, res) => {
    res.status(200).json(successResponse("Hi there :-)"));
};
