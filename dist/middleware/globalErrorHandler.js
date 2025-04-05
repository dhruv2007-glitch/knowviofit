export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "Error";
    res.status(statusCode).json({
        message: err.message || "internal server error",
    });
};
