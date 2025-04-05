export const successResponse = (message, data) => {
    return { status: "success", message, data };
};
export const errorResponse = (message, error) => {
    return { status: "error", message, error: error || null };
};
